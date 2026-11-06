import { ACADEMY_URL, AI_FOR_WORK_URL } from '@/lib/siteLinks';

function Socials() {
  return <nav className="home-socials" aria-label="Follow Nudgeable">
    <a href="https://www.youtube.com/@Gaurav-NudgeableAI" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" /></svg></a>
    <a href="https://x.com/gauravxlri" target="_blank" rel="noopener noreferrer" aria-label="X" title="X"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 3 16 18M20 3 4 21M4 3h5l11 18h-5Z" /></svg></a>
    <a href="https://www.linkedin.com/company/nudgeable-ai/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" /></svg></a>
    <a href="https://www.instagram.com/gaurav.patel_gp/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg></a>
  </nav>;
}

export function DesignFooter({ socials = false }: { socials?: boolean }) {
  return <footer className="footer">
    <div className="container">
      <div className="footer-top">
        <div>
          <a className="brand official-brand" href="/" aria-label="Nudgeable home">
            <img src="/assets/nudgeable-logo-white.png" alt="Nudgeable" width="704" height="149" />
          </a>
          <p>Learn. Apply. Grow.</p>
          {socials && <Socials />}
        </div>
        <div className="footer-links">
          <div>
            <span>FOR YOUR CURIOSITY</span>
            <a href="/learn#plan">Nudgeable Learn</a>
            <a href={ACADEMY_URL}>AI Academy</a>
            <a href={AI_FOR_WORK_URL}>AI for Work</a>
          </div>
          <div>
            <span>FOR YOUR TEAM</span>
            <a href="/ai-training">AI Masterclasses</a>
            <a href="/nudgeengine">Nudgeable Apply</a>
            <a href="/ai-role-play">AI Role Play</a>
          </div>
          <div>
            <span>KEEP EXPLORING</span>
            <a href="/insights">Videos</a>
            <a href="/insights/blogs">Blogs</a>
            <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Nudgeable. A little better, every day.</span>
        <a href="/privacy">Privacy policy</a>
        <span>MADE FOR THE CURIOUS. <span className="footer-flower">✳</span></span>
      </div>
    </div>
  </footer>;
}
