'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';
import { pageName, parseClickTarget, type AnalyticsEvent } from '@/lib/analytics';
import { AnalyticsChart, type TimelineBucket } from './AnalyticsChart';

interface ClickSection {
  section: string;
  order: number;
  clicks: number;
  items: { label: string; href: string | null; count: number }[];
  moreItems: number;
}

interface ClickPage {
  path: string;
  name: string;
  clicks: number;
  sections: ClickSection[];
}

interface Stats {
  sampleSize: number;
  uniqueVisitors: number;
  totalClicks: number;
  pages: { path: string; name: string; views: number; visitors: number }[];
  clickPages: ClickPage[];
  content: ContentItem[];
  timeline: TimelineBucket[];
}

interface ContentItem {
  type: 'Explainer' | 'Video' | 'Blog';
  name: string;
  visitors: number;
}

type ContentFilter = 'all' | 'videos' | 'blogs';

const CONTENT_PAGE_SIZE = 15;

function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

/** Videos and blogs by name, with how many distinct visitors opened each. */
function ContentCard({ items }: { items: ContentItem[] }) {
  const [filter, setFilter] = useState<ContentFilter>('all');
  const [page, setPage] = useState(1);
  const matching = items.filter(item => filter === 'all'
    || (filter === 'blogs' ? item.type === 'Blog' : item.type !== 'Blog'));
  const pageCount = Math.max(1, Math.ceil(matching.length / CONTENT_PAGE_SIZE));
  const current = Math.min(page, pageCount); // data can shrink after a refresh or filter change
  const shown = matching.slice((current - 1) * CONTENT_PAGE_SIZE, current * CONTENT_PAGE_SIZE);
  return <div className="analytics-card">
    <div className="analytics-clicks-head">
      <div>
        <strong>Content</strong>
        <span>Visitors per video and blog.</span>
      </div>
      <div className="analytics-sort" role="group" aria-label="Show content">
        {(['all', 'videos', 'blogs'] as const).map(value => (
          <button key={value} type="button" className={filter === value ? 'is-active' : ''} onClick={() => { setFilter(value); setPage(1); }}>
            {value === 'all' ? 'All' : value === 'videos' ? 'Videos' : 'Blogs'}
          </button>
        ))}
      </div>
    </div>
    <ul className="analytics-content-list">
      {shown.map(item => (
        <li key={`${item.type}|${item.name}`}>
          <span className="analytics-item-label">{item.name}</span>
          <span className="analytics-content-count">{plural(item.visitors, 'visitor')}</span>
        </li>
      ))}
      {!shown.length && <li className="analytics-empty">{filter === 'blogs' ? 'No blog visitors yet.' : filter === 'videos' ? 'No video visitors yet.' : 'No video or blog visitors yet.'}</li>}
    </ul>
    {pageCount > 1 && <div className="analytics-content-pagination">
      <button type="button" className="button button-secondary" disabled={current <= 1} onClick={() => setPage(current - 1)}>Previous</button>
      <span>Page {current} of {pageCount} · {matching.length} items</span>
      <button type="button" className="button button-secondary" disabled={current >= pageCount} onClick={() => setPage(current + 1)}>Next</button>
    </div>}
  </div>;
}

// Sections in the order they appear on the page, top to bottom.
function sortSections(sections: ClickSection[]) {
  return [...sections].sort((a, b) => a.order - b.order || b.clicks - a.clicks);
}

function percent(part: number, whole: number) {
  if (!whole) return '0%';
  const value = (part / whole) * 100;
  return `${value < 10 ? value.toFixed(1) : Math.round(value)}%`;
}

function shortHref(href: string) {
  if (href.startsWith('#')) return `jumps to ${href}`;
  if (href.startsWith('mailto:')) return 'opens email';
  try {
    const url = new URL(href, 'https://nudgeable.ai');
    if (url.hostname === 'nudgeable.ai') return `${url.pathname}${url.search}${url.hash}`;
    return `${url.hostname}${url.pathname === '/' ? '' : url.pathname}`;
  } catch {
    return href;
  }
}

function ClickBreakdown({ pages }: { pages: ClickPage[] }) {
  if (!pages.length) return <p className="analytics-empty">No clicks recorded yet.</p>;
  return <div className="analytics-click-pages">
    {pages.map(page => (
      <details key={page.path} className="analytics-click-page">
        <summary>
          <span className="analytics-click-page-name">{page.name}{page.name !== page.path && <code>{page.path}</code>}</span>
          <span className="analytics-click-page-total">{page.clicks} click{page.clicks === 1 ? '' : 's'}</span>
        </summary>
        <div className="analytics-sections">
          {sortSections(page.sections).map(section => (
            <div key={section.section} className="analytics-section">
              <div className="analytics-section-head">
                <strong>{section.section}</strong>
                <span>{section.clicks} · {percent(section.clicks, page.clicks)}</span>
              </div>
              <div className="analytics-section-bar" aria-hidden="true"><i style={{ width: percent(section.clicks, page.clicks) }} /></div>
              <ul>
                {section.items.map(item => (
                  <li key={`${item.label}|${item.href || ''}`}>
                    <span className="analytics-item-label">
                      {item.label}
                      {item.href && <small title={item.href}>{shortHref(item.href)}</small>}
                    </span>
                    <span>{item.count}</span>
                  </li>
                ))}
                {section.moreItems > 0 && <li className="analytics-item-more">+ {section.moreItems} more</li>}
              </ul>
            </div>
          ))}
        </div>
      </details>
    ))}
  </div>;
}

function EventDetail({ event }: { event: AnalyticsEvent }) {
  if (event.event_type !== 'click') return <span className="analytics-muted">Viewed page</span>;
  const { section, label, href } = parseClickTarget(event.target);
  return <span className="analytics-event-detail">
    <small>{section}</small>
    {label}
    {href && <small title={href}>{shortHref(href)}</small>}
  </span>;
}

interface Visitor {
  ip: string;
  eventCount: number;
  pageviews: number;
  clicks: number;
  firstSeen: string;
  lastSeen: string;
  pages: string[];
  userAgent: string | null;
  events: AnalyticsEvent[];
  hiddenEvents: number;
}

/** Rough "Mobile · Chrome" style hint from a user agent string. */
function deviceLabel(userAgent: string | null) {
  if (!userAgent) return '';
  if (/bot|crawl|spider|slurp|preview/i.test(userAgent)) return 'Bot';
  const device = /iPad|Tablet/i.test(userAgent) ? 'Tablet' : /Mobi|Android|iPhone/i.test(userAgent) ? 'Mobile' : 'Desktop';
  const browser = /Edg\//.test(userAgent) ? 'Edge'
    : /OPR\//.test(userAgent) ? 'Opera'
      : /Firefox\//.test(userAgent) ? 'Firefox'
        : /Chrome\//.test(userAgent) ? 'Chrome'
          : /Safari\//.test(userAgent) ? 'Safari' : '';
  return browser ? `${device} · ${browser}` : device;
}

interface Response {
  visitors: Visitor[];
  total: number;
  page: number;
  pageSize: number;
  stats: Stats | null;
  configured: boolean;
}

function rangeLabel(range: string) {
  switch (range) {
    case '24h': return 'Last 24 hours';
    case '7d': return 'Last 7 days';
    case '15d': return 'Last 15 days';
    case '30d': return 'Last 30 days';
    default: return '';
  }
}

function formatTime(value: string) {
  try {
    return new Date(value).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return value;
  }
}

export function AnalyticsDashboard() {
  const [ready, setReady] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [rangeFilter, setRangeFilter] = useState('');
  const [trafficTab, setTrafficTab] = useState<'pages' | 'clicks'>('pages');

  const load = useCallback(async (pageArg: number) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(pageArg) });
      if (typeFilter) params.set('type', typeFilter);
      if (routeFilter) params.set('route', routeFilter);
      if (rangeFilter) params.set('range', rangeFilter);
      const response = await fetch(`/api/analytics?${params.toString()}`, { cache: 'no-store' });
      if (response.status === 401) {
        setSignedIn(false);
        return;
      }
      const payload = await response.json().catch(() => ({})) as Partial<Response> & { error?: string };
      if (!response.ok) {
        setError(payload.error || 'Could not load analytics.');
        setData(null);
        return;
      }
      setData({
        visitors: Array.isArray(payload.visitors) ? payload.visitors : [],
        total: payload.total ?? 0,
        page: payload.page ?? pageArg,
        pageSize: payload.pageSize ?? 20,
        stats: payload.stats ?? null,
        configured: payload.configured !== false
      });
    } finally {
      setLoading(false);
    }
  }, [typeFilter, routeFilter, rangeFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const response = await fetch('/api/admin/session', { cache: 'no-store' });
      const payload = await response.json().catch(() => ({})) as { configured?: boolean };
      if (cancelled) return;
      setConfigured(payload.configured !== false);
      setSignedIn(response.ok);
      if (response.ok) await load(1);
      setReady(true);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!signedIn) return;
    setPage(1);
    void load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeFilter, routeFilter, rangeFilter, signedIn]);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || 'Could not sign in.');
      return;
    }
    setPassword('');
    setSignedIn(true);
    await load(1);
  }

  async function signOut() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setSignedIn(false);
    setData(null);
  }

  function changePage(next: number) {
    setPage(next);
    void load(next);
  }

  if (!ready) {
    return <div className="blog-write-page"><div className="container"><p>Loading analytics…</p></div></div>;
  }

  if (!configured) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Analytics is not configured.</h1>
      <p>Set <code>ADMIN_PASSWORD</code> in the environment to enable this page.</p>
    </div></div>;
  }

  if (!signedIn) {
    return <div className="blog-write-page"><div className="container blog-login-card">
      <span className="eyebrow">ADMIN</span>
      <h1>Site analytics.</h1>
      <p>Sign in to see how many visitors your pages get and where they click.</p>
      <form className="blog-login-form" onSubmit={signIn}>
        <label><span>Admin password</span><input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required /></label>
        <button className="button button-primary" type="submit">Sign in</button>
        {error && <p className="form-message error">{error}</p>}
      </form>
    </div></div>;
  }

  const stats = data?.stats;
  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.pageSize)) : 1;

  return <div className="blog-write-page">
    <div className="container analytics-layout">
      <div className="blog-write-head">
        <div>
          <span className="eyebrow">ADMIN</span>
          <h1>Site analytics</h1>
        </div>
        <div className="blog-write-actions">
          <button type="button" className="button button-secondary" onClick={() => void load(page)}>{loading ? 'Refreshing…' : 'Refresh'}</button>
          <button type="button" className="button button-secondary" onClick={signOut}>Sign out</button>
        </div>
      </div>

      {error && <p className="form-message error">{error}</p>}
      {data && !data.configured && <p className="form-message error">Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to start recording visits.</p>}

      {stats && <div className="analytics-stats">
        <div className="analytics-stat-card">
          <span>Visitors</span>
          <strong>{stats.uniqueVisitors}</strong>
        </div>
        <div className="analytics-stat-card">
          <span>Clicks</span>
          <strong>{stats.totalClicks}</strong>
        </div>
      </div>}

      {stats && stats.timeline.length > 0 && <div className="analytics-chart-card">
        <div className="analytics-chart-head">
          <div>
            <strong>Unique visitors over time</strong>
            <span>{rangeFilter ? rangeLabel(rangeFilter) : 'Last 30 days'}</span>
          </div>
          <div className="analytics-chart-total">
            <strong>{stats.uniqueVisitors}</strong>
            <span>visitors</span>
          </div>
        </div>
        <AnalyticsChart timeline={stats.timeline} />
      </div>}

      {stats && <div className="analytics-top-lists">
        <div className="analytics-card">
          <div className="analytics-clicks-head">
            <div className="analytics-tabs" role="tablist" aria-label="Pages and clicks">
              <button type="button" role="tab" aria-selected={trafficTab === 'pages'} className={trafficTab === 'pages' ? 'is-active' : ''} onClick={() => setTrafficTab('pages')}>Pages seen</button>
              <button type="button" role="tab" aria-selected={trafficTab === 'clicks'} className={trafficTab === 'clicks' ? 'is-active' : ''} onClick={() => setTrafficTab('clicks')}>Where they clicked</button>
            </div>
          </div>
          {trafficTab === 'pages' ? <ul>
            <li className="analytics-list-head"><span>Page</span><span>Views · visitors</span></li>
            {stats.pages.map(item => (
              <li key={item.path}>
                <span className="analytics-item-label">{item.name}</span>
                <span>{item.views} · {item.visitors}</span>
              </li>
            ))}
            {!stats.pages.length && <li>No visits recorded yet.</li>}
          </ul> : <ClickBreakdown pages={stats.clickPages} />}
        </div>
        <ContentCard items={stats.content || []} />
      </div>}

      <div className="analytics-range-tabs">
        {[
          { value: '', label: 'All time' },
          { value: '24h', label: '24 hours' },
          { value: '7d', label: '7 days' },
          { value: '15d', label: '15 days' },
          { value: '30d', label: '30 days' }
        ].map(option => (
          <button
            key={option.value || 'all'}
            type="button"
            className={`analytics-range-tab${rangeFilter === option.value ? ' is-active' : ''}`}
            onClick={() => setRangeFilter(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="analytics-filters">
        <label>
          <span>Event type</span>
          <select value={typeFilter} onChange={event => setTypeFilter(event.target.value)}>
            <option value="">All events</option>
            <option value="pageview">Page views</option>
            <option value="click">Clicks</option>
          </select>
        </label>
        <label>
          <span>Route contains</span>
          <input value={routeFilter} onChange={event => setRouteFilter(event.target.value)} placeholder="/insights" />
        </label>
        {(typeFilter || routeFilter || rangeFilter) && (
          <button type="button" className="button button-text" onClick={() => { setTypeFilter(''); setRouteFilter(''); setRangeFilter(''); }}>Clear filters</button>
        )}
      </div>

      <div className="analytics-visitors">
        <div className="analytics-visitors-head">
          <strong>Visitors</strong>
          <span>Every event grouped by IP address, most recently active first. Open a visitor to see what they did, latest first.</span>
        </div>
        {(data?.visitors || []).map(visitor => (
          <details key={visitor.ip} className="analytics-visitor">
            <summary>
              <span className="analytics-visitor-ip">
                <strong>{visitor.ip}</strong>
                {deviceLabel(visitor.userAgent) && <small>{deviceLabel(visitor.userAgent)}</small>}
              </span>
              <span className="analytics-visitor-counts">
                <span className="analytics-badge analytics-badge-pageview">{visitor.pageviews} view{visitor.pageviews === 1 ? '' : 's'}</span>
                <span className="analytics-badge analytics-badge-click">{visitor.clicks} click{visitor.clicks === 1 ? '' : 's'}</span>
              </span>
              <span className="analytics-visitor-pages" title={visitor.pages.join(', ')}>{visitor.pages.join(' · ') || '—'}</span>
              <span className="analytics-visitor-time">
                {formatTime(visitor.lastSeen)}
                {visitor.firstSeen !== visitor.lastSeen && <small>since {formatTime(visitor.firstSeen)}</small>}
              </span>
            </summary>
            <div className="analytics-table-wrap analytics-visitor-events">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Page</th>
                    <th>Where</th>
                  </tr>
                </thead>
                <tbody>
                  {visitor.events.map(event => (
                    <tr key={event.id}>
                      <td>{formatTime(event.created_at)}</td>
                      <td><span className={`analytics-badge analytics-badge-${event.event_type}`}>{event.event_type}</span></td>
                      <td><code title={event.route}>{pageName(event.route)}</code></td>
                      <td><EventDetail event={event} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visitor.hiddenEvents > 0 && <p className="analytics-muted">{visitor.hiddenEvents} earlier events not shown.</p>}
            </div>
          </details>
        ))}
        {!loading && data && !data.visitors.length && <p className="analytics-empty">No events match these filters yet.</p>}
      </div>

      {data && data.total > data.pageSize && <div className="analytics-pagination">
        <button type="button" className="button button-secondary" disabled={page <= 1} onClick={() => changePage(page - 1)}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button type="button" className="button button-secondary" disabled={page >= totalPages} onClick={() => changePage(page + 1)}>Next</button>
      </div>}
    </div>
  </div>;
}
