'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function send(eventType: 'pageview' | 'click', route: string, target?: string | null, section?: string | null) {
  try {
    const payload = JSON.stringify({
      eventType,
      route,
      target: target || undefined,
      section: section || undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined
    });
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/track', blob);
      return;
    }
    void fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true
    });
  } catch {
    // Analytics must never break the page.
  }
}

function describeTarget(el: HTMLElement): string {
  const label = el.getAttribute('aria-label') || el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 120);
  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute('href') || '';
    return label ? `${label} → ${href}` : href || 'link';
  }
  return label || el.tagName.toLowerCase();
}

function cleanText(value: string | null | undefined, max = 60): string {
  return (value || '').replace(/\s+/g, ' ').trim().slice(0, max);
}

function humanizeId(id: string): string {
  const words = id.replace(/[-_]+/g, ' ').trim();
  return words ? words[0].toUpperCase() + words.slice(1) : '';
}

/**
 * Names the part of the page a click happened in, so the admin dashboard can
 * group clicks by section. An explicit data-analytics-section on the element
 * or an ancestor wins; otherwise the nearest landmark (header, footer,
 * dialog, section, nav) is named from its aria-label, heading or id.
 */
function describeSection(el: HTMLElement): string | null {
  const tagged = el.closest('[data-analytics-section]');
  if (tagged) return cleanText(tagged.getAttribute('data-analytics-section'), 80) || null;

  const landmark = el.closest('header, footer, dialog, section, nav, aside');
  if (!landmark) return null;
  const tag = landmark.tagName.toLowerCase();
  if (tag === 'header' && !landmark.closest('main, article')) return 'Header';
  if (tag === 'footer') return 'Footer';

  // innerText (not textContent) so a <br> inside a heading becomes a space.
  const heading = landmark.querySelector<HTMLElement>('h1, h2, h3');
  const name = cleanText(landmark.getAttribute('aria-label'))
    || cleanText(heading?.innerText || heading?.textContent)
    || humanizeId(landmark.id);
  if (name) return tag === 'dialog' ? `Popup › ${name}` : name;
  return tag === 'dialog' ? 'Popup' : null;
}

function AnalyticsTrackerInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname?.startsWith('/analytics')) return;
    const query = searchParams.toString();
    send('pageview', query ? `${pathname}?${query}` : pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (window.location.pathname.startsWith('/analytics')) return;
      const target = event.target as HTMLElement | null;
      const el = target?.closest('a, button, [role="button"]') as HTMLElement | null;
      if (!el) return;
      send('click', window.location.pathname, describeTarget(el), describeSection(el));
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}

export function AnalyticsTracker() {
  return <Suspense fallback={null}>
    <AnalyticsTrackerInner />
  </Suspense>;
}
