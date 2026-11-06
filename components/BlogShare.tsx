'use client';

import { useState } from 'react';

export function BlogShare({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai'}${url}`;
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return <aside className="blog-share">
    <span>SHARE</span>
    <a href={linkedIn} target="_blank" rel="noopener noreferrer" aria-label={`Share ${title} on LinkedIn`}>in</a>
    <button type="button" onClick={() => void copyLink()} aria-label={copied ? 'Link copied' : 'Copy link'}>{copied ? '✓' : '↗'}</button>
  </aside>;
}
