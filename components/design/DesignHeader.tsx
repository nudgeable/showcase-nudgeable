import './nav.css';
import { ACADEMY_URL, AI_FOR_WORK_URL, LEARN_URL } from '@/lib/siteLinks';

export type NavKey = 'training' | 'learn' | 'apply' | 'videos' | 'blogs';

const links: { key: NavKey; href: string; label: string }[] = [
  { key: 'learn', href: '/learn', label: 'Learn' },
  { key: 'apply', href: '/nudgeengine', label: 'Apply' },
  { key: 'videos', href: '/insights', label: 'Videos' },
  { key: 'blogs', href: '/insights/blogs', label: 'Blogs' }
];

function current(active: NavKey | undefined, key: NavKey) {
  return active === key ? { className: 'active', 'aria-current': 'page' as const } : {};
}

// Site navigation deliberately uses plain anchors: each page loads its own stylesheet bundle.
export function DesignHeader({ active }: { active?: NavKey }) {
  return <header className="header">
    <div className="container nav-wrap">
      <a className="brand official-brand" href="/" aria-label="Nudgeable home">
        <img src="/assets/nudgeable-logo-black.png" alt="Nudgeable" width="704" height="149" />
      </a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <div className="nav-group">
          <button className={`submenu-toggle${active === 'training' ? ' active' : ''}`} aria-expanded="false" aria-controls="teams-submenu">
            AI Masterclass <span aria-hidden="true">+</span>
          </button>
          <div className="nav-dropdown" id="teams-submenu" hidden>
            <a href="/ai-training">AI masterclasses for teams<small>Hands-on learning around real work</small></a>
            <a href={ACADEMY_URL}>AI Academy<small>Practical guides, tools and foundations</small></a>
            <a href={AI_FOR_WORK_URL}>AI for Work<small>Plain-language guides to AI at work</small></a>
          </div>
        </div>
        {links.map(link => <a key={link.key} href={link.href} {...current(active, link.key)}>{link.label}</a>)}
      </nav>
      <div className="nav-actions">
        <a className="login" href={`${LEARN_URL}/login`}>Log in</a>
        <a className="button button-small" href="/learn#plan">Build my free plan</a>
        <button className="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span /><span /></button>
      </div>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation" hidden>
      <details>
        <summary>AI Masterclass</summary>
        <a href="/ai-training">AI masterclasses for teams</a>
        <a href={ACADEMY_URL}>AI Academy</a>
        <a href={AI_FOR_WORK_URL}>AI for Work</a>
      </details>
      {links.map(link => <a key={link.key} href={link.href}>{link.label}</a>)}
      <a href="/learn#plan">Build my free plan</a>
    </nav>
  </header>;
}
