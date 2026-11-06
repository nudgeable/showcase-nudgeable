import Image from 'next/image';
import { Icon } from './Icon';

const socials = [
  { href: 'https://x.com/gauravxlri', label: 'X (Twitter)', icon: 'x' as const },
  { href: 'https://www.linkedin.com/in/gauravpatel25', label: 'LinkedIn', icon: 'linkedin' as const },
  { href: 'https://www.youtube.com/@Gaurav-NudgeableAI', label: 'YouTube', icon: 'youtube' as const },
  { href: 'https://www.instagram.com/gaurav.patel_gp', label: 'Instagram', icon: 'instagram' as const },
];

export function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div>
        <a href="/" className="brand footer-brand" aria-label="Nudgeable home">
          <Image src="/brand/nudgeable-white.png" alt="Nudgeable" width={705} height={149} sizes="180px" />
        </a>
        <p>Practical AI for Work training and products for corporate capability building.</p>
        <a href="mailto:team@nudgeable.ai">team@nudgeable.ai</a>
        <div className="footer-socials">
          {socials.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="footer-social">
              <Icon name={social.icon} size={18} />
            </a>
          ))}
        </div>
      </div>
      <div><strong>Training</strong><a href="/#training">Corporate workshops</a><a href="/#contact">Contact</a><a href="/#about">About Gaurav</a></div>
      <div><strong>Products</strong><a href="/ai-academy/index.html">AI Academy</a><a href="/nudgeengine">Actions Engine</a></div>
      <div><strong>Content</strong><a href="/insights">Videos</a><a href="/insights/blogs">Blogs</a></div>
    </div>
    <div className="container footer-bottom">
      <span>© 2026 Nudgeable. All rights reserved.</span>
      <div className="footer-bottom-links">
        <a href="/privacy">Privacy Policy</a>
        <span>AI for Work, made practical.</span>
      </div>
    </div>
  </footer>;
}
