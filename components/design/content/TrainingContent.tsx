import { ACADEMY_URL } from '@/lib/siteLinks';

export function TrainingContent() {
  return <>
    <section className="teams-reference-hero unified-hero">
      {' '}
      <div className="container teams-banner-grid unified-hero-grid">
        {' '}
        <div className="teams-banner-copy">
          {' '}
          <div className="eyebrow">
            <span className="section-dash" />
            GENERATIVE AI FOR TEAMS
          </div>
          {' '}
          <h1 className="unified-hero-title">
            <span className="hero-title-line">AI masterclasses.</span>
            <span className="hero-title-line">Built around</span>
            <span className="hero-title-line"><span className="hero-title-highlight">your work.</span></span>
          </h1>
          {' '}
          <p>
            Hands-on AI workshops for your team’s real tasks, with practical guides to keep learning afterward.
          </p>
          {' '}
          <div className="teams-banner-actions">
            <a className="button" href="#tracks">Explore the Workshops</a>
            <a className="text-link" href="#program-process">How a Program Gets Built</a>
          </div>
          {' '}
        </div>
        {' '}
        <div className="teams-academy-card">
          {' '}
          <img src="/assets/workshop-main.webp" alt="Gaurav Patel facilitating a practical AI workshop" width="1303" height="1086" />
          {' '}
          <div className="teams-academy-copy">
            {' '}
            <div className="teams-academy-top">
              <span>NUDGEABLE AI ACADEMY</span>
              <span className="kept-current">
                <i />
                Kept current
              </span>
            </div>
            {' '}
            <h2>
              Keep building
              <br />
              AI capability.
            </h2>
            {' '}
            <a className="academy-reference-link" href={ACADEMY_URL}>Explore the Academy</a>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
      </div>
      {' '}
    </section>
    <section className="clients" aria-label="Corporate teams we have trained">
      <div className="container clients-layout">
        <p>
          CORPORATE TEAMS
          <br />
          <strong>WE’VE TRAINED</strong>
        </p>
        <div className="logo-window">
          <div className="logo-track">
            {' '}
            <div className="logo-set">
              <span className="client-logo"><img src="/assets/logo-atomberg.webp" alt="Atomberg" /></span>
              <span className="client-logo"><img src="/assets/logo-reliance-retail.png" alt="Reliance Retail" /></span>
              <span className="client-logo"><img src="/assets/logo-genentech.webp" alt="Genentech" /></span>
              <span className="client-logo"><img src="/assets/logo-lt-finance.png" alt="L&T Finance" /></span>
              <span className="client-logo"><img src="/assets/logo-roche.webp" alt="Roche" /></span>
              <span className="client-logo"><img src="/assets/logo-iqvia.webp" alt="IQVIA" /></span>
              <span className="client-logo"><img src="/assets/logo-philip-morris.png" alt="Philip Morris International" /></span>
              <span className="client-logo"><img src="/assets/logo-boehringer.svg" alt="Boehringer Ingelheim" /></span>
              <span className="client-logo"><img src="/assets/logo-flipkart.png" alt="Flipkart" /></span>
              <span className="client-logo"><img src="/assets/logo-myntra.svg" alt="Myntra" /></span>
              <span className="client-logo"><img src="/assets/logo-cimpress.webp" alt="Cimpress" /></span>
              <span className="client-logo"><img src="/assets/logo-lactalis.webp" alt="Lactalis" /></span>
            </div>
            <div className="logo-set" aria-hidden="true">
              <span className="client-logo"><img src="/assets/logo-atomberg.webp" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-reliance-retail.png" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-genentech.webp" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-lt-finance.png" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-roche.webp" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-iqvia.webp" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-philip-morris.png" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-boehringer.svg" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-flipkart.png" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-myntra.svg" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-cimpress.webp" alt="" /></span>
              <span className="client-logo"><img src="/assets/logo-lactalis.webp" alt="" /></span>
            </div>
            {' '}
          </div>
        </div>
      </div>
    </section>
    <section className="section" id="tracks">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              CORPORATE AI WORKSHOPS
            </div>
            <h2>
              Six tracks.
              <br />
              {"Built around "}
              <span className="serif-word">your work.</span>
            </h2>
            <p>Six tracks, tailored to your team’s roles and tools.</p>
          </div>
        </div>
        <div className="track-grid">
          <article className="track-card">
            <span className="topic-icon">✧</span>
            <span className="track-kicker">TRACK 01</span>
            <h3>How GenAI Works</h3>
            <p>Understand models, context and hallucinations.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-genai-vs-other-ai.html">How Generative AI Differs From Other AI</a>
                </li>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-tokens.html">What Are Tokens and Why Do They Matter?</a>
                </li>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-context-window.html">What Is an AI Context Window?</a>
                </li>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-image-video.html">How AI Generates Images and Video</a>
                </li>
              </ul>
            </details>
          </article>
          <article className="track-card">
            <span className="topic-icon">▣</span>
            <span className="track-kicker">TRACK 02</span>
            <h3>AI for Everyday Work</h3>
            <p>Use AI for research, writing, meetings and presentations.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/insights/blogs/where-should-you-run-claude-or-chatgpt-browser-desktop-app-or-phone">Browser, Desktop or Phone: Where Should You Use AI?</a>
                </li>
                <li>
                  <a href="/insights/blogs/when-should-you-use-chat-or-work">Chat vs Work: Which One Should You Use?</a>
                </li>
                <li>
                  <a href="/ai-for-work/what-are-ai-projects.html">How AI Projects Keep Your Work and Context Together</a>
                </li>
              </ul>
            </details>
          </article>
          <article className="track-card">
            <span className="topic-icon">▥</span>
            <span className="track-kicker">TRACK 03</span>
            <h3>Data, Dashboards and Design</h3>
            <p>Turn files and data into insights, charts and visuals.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/insights/blogs/you-built-a-dashboard-from-excel-with-ai-why-can-t-your-manager-use-it">Why AI Dashboards Are Harder to Share Than They Look</a>
                </li>
                <li>
                  <a href="/insights/blogs/why-you-can-t-build-a-proper-app-using-only-an-ai-chatbot-yet">What AI Can and Cannot Build Without Coding Knowledge</a>
                </li>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-image-video.html">How AI Generates Images and Video</a>
                </li>
              </ul>
            </details>
          </article>
          <article className="track-card">
            <span className="topic-icon">⌘</span>
            <span className="track-kicker">TRACK 04</span>
            <h3>Workflow Automation</h3>
            <p>Connect tools and reduce repetitive work.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/insights/blogs/apis-mcps-connectors-and-plugins-explained">How AI Connects to Your Apps</a>
                </li>
                <li><a href="/ai-academy/foundations/ai-foundations-api.html">What Is an API?</a></li>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-tool-calling.html">How AI Uses External Tools</a>
                </li>
              </ul>
            </details>
          </article>
          <article className="track-card">
            <span className="topic-icon">✳</span>
            <span className="track-kicker">TRACK 05</span>
            <h3>Building AI Agents</h3>
            <p>Build practical agents with no-code or coding tools.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/ai-academy/foundations/ai-foundations-ai-agents.html">What Is an AI Agent and How Does It Work?</a>
                </li>
                <li><a href="/ai-for-work/what-is-a-work-agent.html">What Is a Work Agent?</a></li>
                <li><a href="/ai-for-work/what-is-a-coding-agent.html">What Is a Coding Agent?</a></li>
              </ul>
            </details>
          </article>
          <article className="track-card">
            <span className="topic-icon">◈</span>
            <span className="track-kicker">TRACK 06</span>
            <h3>Governance and Data Security</h3>
            <p>Protect data, verify outputs and manage permissions.</p>
            <details className="curriculum-guides">
              <summary>Related guides</summary>
              <ul>
                <li>
                  <a href="/insights/blogs/will-ai-kill-all-of-us-three-questions-no-one-can-answer-yet">How Should We Think About Long-Term AI Risk?</a>
                </li>
                <li>
                  <a href="/insights/blogs/what-makes-a-company-ai-native">What Changes When a Company Becomes AI-Native?</a>
                </li>
              </ul>
            </details>
          </article>
        </div>
        <div className="program-band">
          <div>
            <strong>Designed around your team</strong>
            <p>Half-day masterclass · One-day workshop · Multi-session program · Leadership session</p>
          </div>
          <a className="button" href="/#contact">Discuss a program</a>
        </div>
      </div>
    </section>
    <section className="section process-section" id="program-process">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              HOW A PROGRAM GETS BUILT
            </div>
            <h2>
              A program built
              <br />
              <span className="serif-word">with your team.</span>
            </h2>
          </div>
        </div>
        <div className="process-grid">
          <article>
            <span className="track-kicker">STEP 01</span>
            <h3>We look at your work</h3>
            <p>We understand your team’s tasks, AI experience and available tools.</p>
          </article>
          <article>
            <span className="track-kicker">STEP 02</span>
            <h3>Your people learn by doing</h3>
            <p>Your people practise on live tasks, with help in the room.</p>
          </article>
          <article>
            <span className="track-kicker">STEP 03</span>
            <h3>We come back every month</h3>
            <p>Monthly follow-ups cover new tools and problems encountered at work.</p>
          </article>
          <article>
            <span className="track-kicker">STEP 04</span>
            <h3>AI Academy keeps it going</h3>
            <p>Keep learning with current guides after the workshop.</p>
            <a className="text-link" href={ACADEMY_URL}>AI Academy</a>
          </article>
        </div>
      </div>
    </section>
    <section className="section record-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              TRACK RECORD
            </div>
            <h2>
              Built across functions,
              <br />
              {"levels and "}
              <span className="serif-word">industries.</span>
            </h2>
          </div>
        </div>
        <div className="record-stats">
          <div>
            <strong>45+</strong>
            <b>Corporate cohorts</b>
            <p>Customized AI programs</p>
          </div>
          <div>
            <strong>2,500+</strong>
            <b>Professionals trained</b>
            <p>From employees to senior leaders</p>
          </div>
          <div>
            <strong>10+</strong>
            <b>Business functions</b>
            <p>HR, Finance, Sales, Marketing and more</p>
          </div>
          <div>
            <strong>8</strong>
            <b>Industries</b>
            <p>Pharma, retail, finance, manufacturing and more</p>
          </div>
        </div>
        <div className="masterclass-photo-showcase">
          <div className="workshop-gallery masterclass-gallery">
            <div className="gallery-images">
              <img className="gallery-image current" src="/assets/training-photo-1.webp" alt="AI training for an hr team" loading="lazy" width="1071" height="774" />
              <img className="gallery-image" src="/assets/training-photo-2.webp" alt="AI training for senior leadership" loading="lazy" width="1071" height="774" />
              <img className="gallery-image" src="/assets/training-photo-3.webp" alt="AI training for a manufacturing team" loading="lazy" width="1071" height="774" />
              <img className="gallery-image" src="/assets/training-photo-4.webp" alt="AI training for fashion ecommerce" loading="lazy" width="1071" height="774" />
              <img className="gallery-image" src="/assets/training-photo-5.webp" alt="AI training for customer experience" loading="lazy" width="1071" height="774" />
              <img className="gallery-image" src="/assets/training-photo-6.webp" alt="AI training for a finance team" loading="lazy" width="1071" height="774" />
            </div>
            <div className="gallery-overlay">
              <span className="gallery-tag" id="gallery-label">For an HR team</span>
              <div className="gallery-controls">
                <button id="previous-photo" aria-label="Previous training photo">←</button>
                <button id="pause-gallery" aria-label="Pause photo slideshow">Ⅱ</button>
                <span id="gallery-count" aria-live="polite">01 / 06</span>
                <button id="next-photo" aria-label="Next training photo">→</button>
              </div>
            </div>
          </div>
          <p id="masterclass-photo-caption">For an HR team</p>
        </div>
      </div>
    </section>
    <section className="section founder-section">
      <div className="container">
        <div className="founder-profile" id="about">
          {' '}
          <figure className="profile-portrait">
            {' '}
            <img src="/assets/gaurav.webp" alt="Gaurav Patel, founder and AI training facilitator" width="750" height="750" loading="lazy" />
            {' '}
            <figcaption>
              <strong>Gaurav Patel</strong>
              <span>Founder, Nudgeable</span>
            </figcaption>
            {' '}
          </figure>
          {' '}
          <div className="profile-bio">
            {' '}
            <div className="profile-intro">
              <div className="eyebrow">
                <span className="section-dash" />
                FOUNDER AND FACILITATOR
              </div>
              {' '}
              <h2>
                AI for Work, grounded
                <br />
                {"in "}
                <span className="serif-word">corporate reality.</span>
              </h2>
            </div>
            {' '}
            <p>
              {"Gaurav Patel builds practical AI programs around your team’s work. As the founder of "}
              <a href="/learn">Nudgeable Learn</a>
              {" and "}
              <a href="/nudgeengine">Nudgeable Apply</a>
              , he brings product-building experience into every session.
            </p>
            {' '}
            <div className="profile-credentials">
              <span>B.E. in IT · MBA from XLRI</span>
              <span>15+ years across India, Singapore and London</span>
            </div>
            {' '}
            <a className="text-link" href="https://www.linkedin.com/in/gauravpatel25" target="_blank" rel="noopener">More about Gaurav</a>
            {' '}
          </div>
          {' '}
        </div>
        {' '}
      </div>
    </section>
    <section className="teams-resources section" id="after-workshop">
      <div className="container">
        <div className="workshop-continuity">
          <div className="continuity-head">
            <div>
              <div className="eyebrow">
                <span className="section-dash" />
                AFTER THE WORKSHOP
              </div>
              <h2>
                Keep building
                <br />
                <span className="serif-word">your AI capability.</span>
              </h2>
              <p>Current guides and tool updates in the Nudgeable AI Academy.</p>
            </div>
            <a className="button" href={ACADEMY_URL}>Open the AI Academy</a>
          </div>
        </div>
      </div>
    </section>
    <section className="contact-redirect">
      <div className="container">
        <h2>Plan an AI masterclass for your team.</h2>
        <a className="button" href="/#contact">Contact us</a>
      </div>
    </section>
  </>;
}
