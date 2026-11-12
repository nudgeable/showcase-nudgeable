import { HeroAnimation } from '@/components/design/HeroAnimation';
import { ExplainerFeatured } from '@/components/design/explainers/ExplainerFeatured';
import { HeroExplainer } from '@/components/design/explainers/HeroExplainer';
import { featuredExplainers } from '@/components/design/explainers/featured';
import { WhatsAppPlanForm, type PlanArea } from '@/components/design/WhatsAppPlanForm';
import { ExplainerPlanner } from '@/components/design/explainers/ExplainerPlanner';
import type { ExplainerArea } from '@/lib/learnCatalog';
import { LEARN_URL } from '@/lib/siteLinks';

// The four Learn categories, for the WhatsApp form when the catalogue can't be read
const DEFAULT_PLAN_AREAS: PlanArea[] = [
  { key: 'understand', label: 'AI Foundations' },
  { key: 'daily', label: 'AI at Work' },
  { key: 'new', label: 'New in AI' },
  { key: 'research', label: 'AI Research' }
];

export function HomeContent({ areas }: { areas: ExplainerArea[] }) {
  const [hero, ...featured] = featuredExplainers(areas);
  const planAreas = areas.length ? areas.map(({ key, label }) => ({ key, label })) : DEFAULT_PLAN_AREAS;
  return <>
    <section className="hero unified-hero" id="learn" data-analytics-section="Hero">
      <div className="container hero-grid unified-hero-grid">
        {' '}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            {" A LITTLE LEARNING. A LOT OF POSSIBILITY."}
          </div>
          {' '}
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Learn AI in</span>
            <span className="hero-title-line"><span className="hero-title-highlight">3 minutes</span></span>
            <span className="hero-title-line">a day.</span>
          </h1>
          {' '}
          <p className="hero-description">
            One explainer a day. Made for you.
            <br />
            Delivered to your WhatsApp.
          </p>
          {' '}
          <div className="hero-actions">
            <a className="button" href="#plan">{"Build my free plan "}</a>
            <a className="watch-link" href="#featured">
              <span className="small-play" aria-hidden="true">▶</span>
              {" Watch an explainer"}
            </a>
          </div>
          {' '}
          <div className="hero-note">
            <span className="tiny-check">✓</span>
            {" Free 4-week plan "}
            <span className="note-dot">·</span>
            {" Set up in 2 minutes "}
            <span className="note-dot">·</span>
            {" Build a habit"}
          </div>
          {' '}
        </div>
        {' '}
        {hero ? <HeroExplainer explainer={hero} /> : <HeroAnimation className="fluency-animation-art" />}
      </div>
    </section>
    <section className="clients" aria-label="You’re in good company" data-analytics-section="Client logos">
      <div className="container clients-layout">
        <p>
          YOU’RE IN
          <br />
          <strong>GOOD COMPANY</strong>
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
    <section className="featured section" id="featured" data-analytics-section="Featured explainers">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              {" FOR YOUR AI CURIOSITY."}
            </div>
            <h2>
              {"Start with an "}
              <span className="serif-word">aha.</span>
            </h2>
            <p>Four short videos. Four AI questions worth understanding.</p>
          </div>
          <a className="text-link" href={`${LEARN_URL}/`}>{"Explore all explainers "}</a>
        </div>
        {' '}
        <ExplainerFeatured cards={featured} />
      </div>
    </section>
    <section className="planner-section section" id="plan" data-analytics-section="Plan builder">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              {" YOUR CURIOSITY IS THE STARTING POINT."}
            </div>
            <h2>
              {"What do you want to "}
              <span className="serif-word">learn?</span>
            </h2>
            <p>Choose up to 15 explainers for your free 4-week plan.</p>
          </div>
          <div className="ai-plan-callout">
            <span className="ai-plan-label">A PLAN MADE FOR YOU</span>
            <a className="button ai-plan-button" href={`${LEARN_URL}/plan/new?ai=1`}>
              <span aria-hidden="true">✦</span>
              {" Let AI pick for me"}
            </a>
            <span className="ai-plan-detail">Choose your goal. Let AI build your plan.</span>
          </div>
        </div>
        {' '}
        <ExplainerPlanner areas={areas} page="home" />
      </div>
    </section>
    <section className="training section" id="training" data-analytics-section="AI masterclasses">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              {" GENERATIVE AI FOR TEAMS"}
            </div>
            <h2>
              AI masterclasses
              <br />
              {"for "}
              <span className="serif-word">your team.</span>
            </h2>
          </div>
          <a className="text-link masterclass-link" href="#contact" data-interest="AI masterclasses for teams">Discuss a masterclass</a>
        </div>
        {' '}
        <div className="training-compact">
          <div className="founder-profile" id="about" data-analytics-section="AI masterclasses › Founder profile">
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
                  {"Meet "}
                  <span className="serif-word">Gaurav Patel.</span>
                </h2>
              </div>
              {' '}
              <p>
                {"Gaurav designs and delivers practical AI workshops and builds "}
                <a href="/learn">Nudgeable Learn</a>
                {" and "}
                <a href="/nudgeengine">Nudgeable Apply</a>
                , bringing hands-on product experience into the classroom.
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
          <div className="workshop-showcase" data-analytics-section="AI masterclasses › Photo gallery">
            <div className="workshop-gallery">
              <div className="gallery-images">
                <img className="gallery-image current" src="/assets/training-photo-1.webp" alt="AI training for an HR team" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-2.webp" alt="AI training for senior leadership" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-3.webp" alt="AI training for a manufacturing team" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-4.webp" alt="AI training for a fashion ecommerce team" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-5.webp" alt="AI training for a customer experience team" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-6.webp" alt="AI training for a finance team" loading="lazy" width="1071" height="774" />
                <img className="gallery-image" src="/assets/training-photo-7.webp" alt="Gaurav Patel facilitating GenAI training" loading="lazy" width="1071" height="774" />
              </div>
              <div className="gallery-overlay">
                <span className="gallery-tag" id="gallery-label">FOR AN HR TEAM</span>
                <div className="gallery-controls">
                  <button id="previous-photo" aria-label="Previous training photo">←</button>
                  <button id="pause-gallery" aria-label="Pause photo slideshow">Ⅱ</button>
                  <span id="gallery-count" aria-live="polite">01 / 07</span>
                  <button id="next-photo" aria-label="Next training photo">→</button>
                </div>
              </div>
            </div>
            <figure className="workshop-next" hidden>
              <img id="next-gallery-photo" src="/assets/training-photo-2.webp" alt="AI training for senior leadership" loading="lazy" width="1071" height="774" />
              <figcaption id="next-gallery-label">For senior leadership</figcaption>
            </figure>
          </div>
          {' '}
        </div>
        <div className="training-facts">
          <div>
            <strong aria-label="45 plus">
              <span className="stat-counter" data-count="45">45</span>
              <span>+</span>
            </strong>
            <span>Corporate cohorts</span>
          </div>
          <div>
            <strong aria-label="2,500 plus">
              <span className="stat-counter" data-count="2500">2,500</span>
              <span>+</span>
            </strong>
            <span>Professionals trained</span>
          </div>
          <div>
            <strong aria-label="10 plus">
              <span className="stat-counter" data-count="10">10</span>
              <span>+</span>
            </strong>
            <span>Business functions</span>
          </div>
          <div className="formats">
            <span>BUILT AROUND YOUR TEAM</span>
            <p>Half-day masterclass · One-day workshop · Multi-session program · Leadership session</p>
          </div>
        </div>
        {' '}
      </div>
    </section>
    <section className="wa-plan section" id="whatsapp-plan" data-analytics-section="WhatsApp plan form">
      <div className="container wa-plan-grid">
        <div className="wa-plan-copy">
          <div className="eyebrow">
            <span className="section-dash" />
            {" YOUR FREE 4-WEEK PLAN"}
          </div>
          <h2>
            Get AI explainers
            <br />
            {"on "}
            <span className="serif-word">WhatsApp.</span>
          </h2>
          <p className="wa-plan-lede">Pick your topics or let AI choose for you. We&apos;ll send you one short explainer a day on WhatsApp for 4 weeks.</p>
          <ol className="wa-plan-steps">
            <li><b>1</b>Pick your topics.</li>
            <li><b>2</b>Share your name and WhatsApp number.</li>
            <li><b>3</b>Get one 3-minute explainer a day.</li>
          </ol>
          <div className="wa-plan-track">
            <strong>Want to track what you&apos;ve watched?</strong>
            <p>After you join, add your email or sign in with Google to see your own progress page.</p>
          </div>
        </div>
        <WhatsAppPlanForm areas={planAreas} />
      </div>
    </section>
    <section className="testimonials section" data-analytics-section="Testimonials">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              {" FROM THE PEOPLE IN THE ROOM"}
            </div>
            <h2>
              Practical learning.
              <br />
              <span className="serif-word">Lasting impressions.</span>
            </h2>
          </div>
          <span className="testimonial-context">What clients say about our AI training.</span>
        </div>
        <div className="testimonial-grid">
          <figure className="testimonial">
            <div className="quote-mark">“</div>
            <blockquote>
              Our team went from using AI for basic emails to building their own workflows. The workshop was tailored to our industry and roles, not generic theory.
            </blockquote>
            <figcaption>
              <img className="testimonial-photo" src="/assets/testimonial-mohan-monteiro.png" alt="Mohan Monteiro" width="64" height="64" loading="lazy" />
              <span>
                <strong>Mohan Monteiro</strong>
                <small>HR Head · HOH</small>
              </span>
            </figcaption>
          </figure>
          <figure className="testimonial">
            <div className="quote-mark">“</div>
            <blockquote>
              What surprised us was how practical it was. People were solving real work problems during the session itself. We saw adoption jump within weeks.
            </blockquote>
            <figcaption>
              <img className="testimonial-photo" src="/assets/testimonial-garima-pant.png" alt="Garima Pant" width="64" height="64" loading="lazy" />
              <span>
                <strong>Garima Pant</strong>
                <small>CHRO · MLLG</small>
              </span>
            </figcaption>
          </figure>
          <figure className="testimonial">
            <div className="quote-mark">“</div>
            <blockquote>
              The workshop simplified complex concepts and showed practical tools that power everyday work, from prompt engineering through to problem solving.
            </blockquote>
            <figcaption>
              <img className="testimonial-photo" src="/assets/testimonial-shraddha-mudaliar.png" alt="Shraddha Mudaliar" width="64" height="64" loading="lazy" />
              <span>
                <strong>Shraddha Mudaliar</strong>
                <small>{"L&D · Myntra"}</small>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section className="contact-section" id="contact" data-analytics-section="Contact form">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="eyebrow">
            <span className="section-dash" />
            {" CONTACT NUDGEABLE"}
          </div>
          <h2>
            Let’s talk about
            <br />
            <span className="serif-word">your team.</span>
          </h2>
          <p>Tell us what you want your team to learn or apply.</p>
          <a className="contact-email" href="mailto:team@nudgeable.ai">{"team@nudgeable.ai "}</a>
        </div>
        <form className="contact-form" id="contact-form" action="/api/contact" method="post">
          <div className="form-row">
            <label>
              Your name
              <input name="name" placeholder="Alex Sharma" autoComplete="name" required maxLength={100} />
            </label>
            <label>
              Work email
              <input name="email" type="email" placeholder="alex@company.com" autoComplete="email" required maxLength={150} />
            </label>
          </div>
          <label>
            Company
            <input name="company" placeholder="Company name" autoComplete="organization" required maxLength={150} />
          </label>
          <label>
            How can we help?
            <select name="interest" id="interest" required defaultValue="">
              <option value="" disabled>Select an area of interest</option>
              <option>AI masterclasses for teams</option>
              <option>Nudgeable Learn</option>
              <option>Nudgeable Apply</option>
                  <option>AI Role Play</option>
              <option>General enquiry</option>
            </select>
          </label>
          <label>
            Team size
            <select name="teamSize" required defaultValue="">
              <option value="" disabled>Select your team size</option>
              <option>Under 25</option>
              <option>25-100</option>
              <option>101-500</option>
              <option>500+</option>
              <option>Individual enquiry</option>
            </select>
          </label>
          <label>
            Tell us a little about your enquiry
            <textarea name="message" placeholder="What would you like to learn or apply?" rows={3} required maxLength={2000}></textarea>
          </label>
          <div className="form-bottom">
            <span>Sent directly to the Nudgeable team.</span>
            <button className="button button-dark" type="submit">{"Send enquiry "}</button>
          </div>
          <p id="contact-status" role="status" hidden />
        </form>
      </div>
    </section>
  </>;
}
