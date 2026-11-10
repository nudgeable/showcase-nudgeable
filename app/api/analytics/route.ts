import { NextRequest, NextResponse } from 'next/server';
import { isAdminRequest, unauthorized } from '@/lib/adminAuth';
import { getSupabase, supabaseConfigured } from '@/lib/supabase';
import { pageName, pagePath, parseClickTarget, sectionOrder, type AnalyticsEvent } from '@/lib/analytics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Visitors (distinct IPs) per table page, and how many of one visitor's
// most recent events to send back.
const PAGE_SIZE = 20;

type ContentType = 'Explainer' | 'Video' | 'Blog';
const MAX_EVENTS_PER_VISITOR = 200;
const STATS_SAMPLE = 5000;

// Supported time-range filters. 'all' means no lower bound on created_at.
const RANGE_HOURS: Record<string, number> = {
  '24h': 24,
  '7d': 24 * 7,
  '15d': 24 * 15,
  '30d': 24 * 30
};

function rangeCutoffIso(range: string | null): string | null {
  if (!range || !(range in RANGE_HOURS)) return null;
  const ms = RANGE_HOURS[range] * 60 * 60 * 1000;
  return new Date(Date.now() - ms).toISOString();
}

interface TimelineBucket {
  key: string;
  label: string;
  visitors: number;
}

// Buckets the chart into hours (24h range) or days (everything else, capped
// at 30 buckets so "all time" still renders a readable trend rather than an
// unbounded axis). Counts DISTINCT visitor IPs per bucket -- not raw event
// counts -- and only over whatever the caller has already filtered the
// sample down to (event type / route / IP / range), so the chart always
// matches what the stat cards and table are currently showing.
function buildTimeline(sample: { ip: string; created_at: string }[], range: string | null): TimelineBucket[] {
  const hourly = range === '24h';
  const bucketCount = range && range in RANGE_HOURS ? RANGE_HOURS[range] / (hourly ? 1 : 24) : 30;
  const now = new Date();

  function bucketKey(date: Date): string {
    if (hourly) return date.toISOString().slice(0, 13); // YYYY-MM-DDTHH
    return date.toISOString().slice(0, 10); // YYYY-MM-DD
  }

  function bucketLabel(date: Date): string {
    return hourly
      ? date.toLocaleString(undefined, { hour: 'numeric' })
      : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  const bucketOrder: string[] = [];
  const bucketLabels = new Map<string, string>();
  const bucketIps = new Map<string, Set<string>>();
  for (let i = bucketCount - 1; i >= 0; i -= 1) {
    const date = new Date(now);
    if (hourly) date.setHours(date.getHours() - i, 0, 0, 0);
    else date.setDate(date.getDate() - i);
    const key = bucketKey(date);
    bucketOrder.push(key);
    bucketLabels.set(key, bucketLabel(date));
    bucketIps.set(key, new Set());
  }

  for (const row of sample) {
    const key = bucketKey(new Date(row.created_at));
    const ips = bucketIps.get(key);
    if (!ips) continue; // outside the displayed window
    ips.add(row.ip);
  }

  return bucketOrder.map(key => ({
    key,
    label: bucketLabels.get(key) || key,
    visitors: bucketIps.get(key)?.size || 0
  }));
}

export async function GET(request: NextRequest) {
  if (!isAdminRequest(request)) return unauthorized();

  if (!supabaseConfigured()) {
    return NextResponse.json({ visitors: [], total: 0, page: 1, pageSize: PAGE_SIZE, stats: null, configured: false });
  }

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page')) || 1);
  const eventType = searchParams.get('type');
  const routeFilter = searchParams.get('route');
  const range = searchParams.get('range');
  const cutoff = rangeCutoffIso(range);

  const supabase = getSupabase();

  // Rough aggregate stats over the most recent slice of events -- good
  // enough for a dashboard without needing a SQL aggregation function.
  // The visitor table below is grouped from this same sample, so the stat
  // cards, chart and table always reflect exactly what's filtered.
  let statsQuery = supabase
    .from('analytics_events')
    .select('id, ip, route, event_type, target, referrer, user_agent, created_at')
    .neq('ip', '::1')
    .not('route', 'ilike', '/analytics%')
    .order('created_at', { ascending: false })
    .limit(STATS_SAMPLE);
  if (eventType === 'pageview' || eventType === 'click') statsQuery = statsQuery.eq('event_type', eventType);
  if (routeFilter) statsQuery = statsQuery.ilike('route', `%${routeFilter}%`);
  if (cutoff) statsQuery = statsQuery.gte('created_at', cutoff);

  const { data: sample, error: sampleError } = await statsQuery;
  if (sampleError) return NextResponse.json({ error: sampleError.message }, { status: 500 });

  let stats = null;
  if (!sampleError && sample) {
    // Unique visitor IPs are used only to count distinct visitors -- the
    // addresses themselves are never surfaced in the response below.
    const uniqueIps = new Set(sample.map(row => row.ip)).size;

    // Page views grouped by path (query strings folded in), with distinct
    // visitors per page alongside raw views.
    const pageViews = new Map<string, { views: number; ips: Set<string> }>();
    // Clicks grouped page -> section -> clicked element.
    const clickTree = new Map<string, Map<string, Map<string, { label: string; href: string | null; count: number }>>>();
    let totalClicks = 0;
    // Content: videos are counted by clicks on them, blogs by views of
    // their page. Keyed "<type>|<name or slug>".
    const content = new Map<string, { type: ContentType; key: string; count: number; ips: Set<string> }>();
    function countContent(type: ContentType, key: string, ip: string) {
      const id = `${type}|${key}`;
      let entry = content.get(id);
      if (!entry) content.set(id, entry = { type, key, count: 0, ips: new Set() });
      entry.count += 1;
      entry.ips.add(ip);
    }

    for (const row of sample) {
      const path = pagePath(row.route);
      if (row.event_type === 'click') {
        totalClicks += 1;
        const { section, label, href, explainer } = parseClickTarget(row.target);
        if (explainer) countContent('Explainer', explainer.title, row.ip);
        else {
          // Video library on /insights: buttons labelled "Play <title>".
          const video = path === '/insights' ? label.match(/^Play (.+)$/) : null;
          if (video) countContent('Video', video[1], row.ip);
        }
        let sections = clickTree.get(path);
        if (!sections) clickTree.set(path, sections = new Map());
        let items = sections.get(section);
        if (!items) sections.set(section, items = new Map());
        const key = `${label}\u0000${href || ''}`;
        const item = items.get(key);
        if (item) item.count += 1;
        else items.set(key, { label, href, count: 1 });
      } else {
        let entry = pageViews.get(path);
        if (!entry) pageViews.set(path, entry = { views: 0, ips: new Set() });
        entry.views += 1;
        entry.ips.add(row.ip);
        const blogSlug = path.match(/^\/insights\/blogs\/([^/]+)$/)?.[1];
        if (blogSlug && blogSlug !== 'write') countContent('Blog', decodeURIComponent(blogSlug), row.ip);
      }
    }

    // Show blogs by title rather than slug.
    const blogSlugs = [...content.values()].filter(entry => entry.type === 'Blog').map(entry => entry.key);
    const blogTitles = new Map<string, string>();
    if (blogSlugs.length) {
      const { data: posts } = await supabase.from('blog_posts').select('slug, title').in('slug', blogSlugs);
      for (const post of posts || []) blogTitles.set(post.slug, post.title);
    }
    const contentList = [...content.values()]
      .map(entry => ({
        type: entry.type,
        name: entry.type === 'Blog' ? blogTitles.get(entry.key) || entry.key : entry.key,
        count: entry.count,
        visitors: entry.ips.size
      }))
      .sort((a, b) => b.count - a.count);

    const pages = [...pageViews.entries()]
      .map(([path, entry]) => ({ path, name: pageName(path), views: entry.views, visitors: entry.ips.size }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 25);

    const clickPages = [...clickTree.entries()]
      .map(([path, sections]) => {
        const sectionList = [...sections.entries()].map(([section, items]) => {
          const itemList = [...items.values()].sort((a, b) => b.count - a.count);
          return {
            section,
            order: sectionOrder(path, section),
            clicks: itemList.reduce((sum, item) => sum + item.count, 0),
            items: itemList.slice(0, 20),
            moreItems: Math.max(0, itemList.length - 20)
          };
        });
        return {
          path,
          name: pageName(path),
          clicks: sectionList.reduce((sum, section) => sum + section.clicks, 0),
          sections: sectionList
        };
      })
      .sort((a, b) => b.clicks - a.clicks);

    stats = {
      sampleSize: sample.length,
      uniqueVisitors: uniqueIps,
      totalClicks,
      pages,
      clickPages,
      content: contentList,
      timeline: buildTimeline(sample, range)
    };
  }

  // Every event grouped by visitor IP, most recently active visitor first.
  const byIp = new Map<string, AnalyticsEvent[]>();
  for (const row of (sample || []) as AnalyticsEvent[]) {
    let list = byIp.get(row.ip);
    if (!list) byIp.set(row.ip, list = []);
    list.push(row);
  }
  const allVisitors = [...byIp.entries()].map(([ip, rows]) => {
    // Sample is already newest-first, which is how each visitor's events are listed.
    const events = rows;
    const pages = [...new Set(events.filter(e => e.event_type === 'pageview').map(e => pagePath(e.route)))];
    return {
      ip,
      eventCount: events.length,
      pageviews: events.filter(e => e.event_type === 'pageview').length,
      clicks: events.filter(e => e.event_type === 'click').length,
      firstSeen: events[events.length - 1].created_at,
      lastSeen: events[0].created_at,
      pages: pages.map(path => pageName(path)),
      userAgent: rows.find(e => e.user_agent)?.user_agent || null,
      events: events.slice(0, MAX_EVENTS_PER_VISITOR),
      hiddenEvents: Math.max(0, events.length - MAX_EVENTS_PER_VISITOR)
    };
  }).sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));

  return NextResponse.json({
    visitors: allVisitors.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    total: allVisitors.length,
    page,
    pageSize: PAGE_SIZE,
    stats,
    configured: true
  });
}
