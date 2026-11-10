import type { NextRequest } from 'next/server';

export type AnalyticsEventType = 'pageview' | 'click';

export interface AnalyticsEvent {
  id: string;
  ip: string;
  event_type: AnalyticsEventType;
  route: string;
  target: string | null;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Click events carry the page section they happened in. Rather than add a
 * column, it is stored at the front of `target` as "[Section] label", so old
 * rows (no prefix) and new rows live side by side in the same table.
 */
export const UNKNOWN_SECTION = 'Other / not tagged';

export function encodeClickTarget(section: string | null, target: string | null): string | null {
  const cleanSection = section?.replace(/[[\]]/g, '').trim();
  if (!cleanSection) return target;
  return `[${cleanSection}] ${target || 'element'}`;
}

// The phone menu button (components/design/DesignHeader.tsx) has no text,
// only an aria-label that lib/design/common.ts flips between these two.
// Show it as the icon people actually tap. It lives in the header, so clicks
// recorded before sections were tracked can safely be filed there too.
const HAMBURGER_LABELS: Record<string, string> = {
  'Open menu': '☰ Hamburger menu · opened',
  'Close menu': '☰ Hamburger menu · closed'
};

export function parseClickTarget(target: string | null): { section: string; label: string; href: string | null } {
  const raw = target || '';
  const match = raw.match(/^\[([^\]]{1,100})\] ([\s\S]*)$/);
  const rest = match ? match[2] : raw;
  if (HAMBURGER_LABELS[rest]) return { section: match ? match[1] : 'Header', label: HAMBURGER_LABELS[rest], href: null };
  const section = match ? match[1] : UNKNOWN_SECTION;
  const arrow = rest.lastIndexOf(' → ');
  if (arrow === -1) return { section, label: rest || 'element', href: null };
  return { section, label: rest.slice(0, arrow) || 'link', href: rest.slice(arrow + 3) || null };
}

const PAGE_NAMES: Record<string, string> = {
  '/': 'Home page',
  '/learn': 'Learn',
  '/nudgeengine': 'Apply (Nudge Engine)',
  '/ai-training': 'AI masterclasses',
  '/ai-role-play': 'AI role play',
  '/insights': 'Insights',
  '/insights/blogs': 'Blogs',
  '/privacy': 'Privacy'
};

/** Path without query string or hash, used to group events by page. */
export function pagePath(route: string): string {
  const path = route.split(/[?#]/)[0] || '/';
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export function pageName(route: string): string {
  const path = pagePath(route);
  if (PAGE_NAMES[path]) return PAGE_NAMES[path];
  if (path.startsWith('/insights/blogs/')) return `Blog post: ${path.slice('/insights/blogs/'.length)}`;
  return path;
}

// Top-to-bottom order of the home page's tagged sections (see
// data-analytics-section in components/design/content/HomeContent.tsx), so
// the dashboard can list them the way a visitor scrolls through the page.
const HOME_SECTION_ORDER = [
  'Header',
  'Header › Mobile menu',
  'Hero',
  'Client logos',
  'Featured explainers',
  'Plan builder',
  'AI masterclasses',
  'AI masterclasses › Founder profile',
  'AI masterclasses › Photo gallery',
  'Nudgeable Apply',
  'Testimonials',
  'Contact form'
];

/**
 * Sort key for a section within a page: header first, footer last, home
 * page sections in on-page order, everything else in between (the
 * dashboard breaks ties by click count).
 */
export function sectionOrder(path: string, section: string): number {
  if (section.startsWith('Header')) return section === 'Header' ? 0 : 1;
  if (section.startsWith('Footer')) return 900 + (section === 'Footer' ? 0 : 1);
  if (section === UNKNOWN_SECTION) return 999;
  if (path === '/') {
    const index = HOME_SECTION_ORDER.indexOf(section);
    if (index !== -1) return 10 + index;
  }
  return 500;
}

/**
 * Best-effort real client IP from a request. Vercel (and most proxies) put the
 * original visitor first in x-forwarded-for; local dev has none of these, so
 * we fall back to 'unknown' rather than a proxy's own address.
 */
export function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-vercel-forwarded-for') || request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    const first = forwardedFor.split(',')[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
