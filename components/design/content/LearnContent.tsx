import { HeroAnimation } from '@/components/design/HeroAnimation';
import { ExplainerPlanner } from '@/components/design/explainers/ExplainerPlanner';
import type { ExplainerArea } from '@/lib/learnCatalog';
import { LEARN_URL } from '@/lib/siteLinks';

export function LearnContent({ areas }: { areas: ExplainerArea[] }) {
  return <>
    <section className="hero unified-hero" id="learn">
      <div className="container hero-grid unified-hero-grid">
        {' '}
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="live-dot" />
            {" NUDGEABLE LEARN"}
          </div>
          {' '}
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Make learning AI</span>
            <span className="hero-title-line"><span className="hero-title-highlight">an everyday</span></span>
            <span className="hero-title-line">habit.</span>
          </h1>
          {' '}
          <p className="hero-description">
            AI keeps changing. Keep learning.
            <br />
            A plan made for you, one short explainer at a time.
          </p>
          {' '}
          <div className="hero-actions">
            <a className="button" href="#plan">{"Build my free plan "}</a>
            <a className="watch-link" href="#categories">Explore the four categories</a>
          </div>
          {' '}
          <div className="hero-note">
            <span className="tiny-check">✓</span>
            {" Free 4-week plan "}
            <span className="note-dot">·</span>
            {" Set up in 2 minutes"}
          </div>
          {' '}
        </div>
        {' '}
        <HeroAnimation className="compact-learn-art" />
      </div>
    </section>
    <section className="section learn-how">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              HOW NUDGEABLE LEARN WORKS
            </div>
            <h2>
              Made for you.
              <br />
              {"Built to "}
              <span className="serif-word">keep going.</span>
            </h2>
          </div>
        </div>
        <div className="learn-how-grid">
          <article>
            <b>1</b>
            <div>
              <h3>A plan made for you</h3>
              <p>Choose what you want to learn, or let AI build a plan around your interests.</p>
            </div>
          </article>
          <article>
            <b>2</b>
            <div>
              <h3>One explainer. Right to you.</h3>
              <p>Get one short explainer a day on WhatsApp, so you can learn wherever you are.</p>
            </div>
          </article>
          <article>
            <b>3</b>
            <div>
              <h3>A habit you can see</h3>
              <p>
                Mark each explainer done in one click. Track your progress and build a streak as AI keeps changing.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
    <section className="section learn-categories" id="categories">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              FOUR EXPLAINER CATEGORIES
            </div>
            <h2>
              AI explained,
              <br />
              <span className="serif-word">one idea at a time.</span>
            </h2>
            <p>
              Original explainers designed to help you understand AI, put it to work and keep up with what’s changing.
            </p>
          </div>
        </div>
        <div className="learn-category-grid">
          <article className="learn-category-card">
            <div className="category-card-top">
              <span className="topic-icon">✧</span>
              <span>01</span>
            </div>
            <h3>AI Foundations</h3>
            <p>Understand the ideas underneath AI: tokens, context windows and how generative AI works.</p>
            <div className="category-examples">
              <span>Tokens</span>
              <span>Context windows</span>
              <span>How GenAI works</span>
            </div>
            <a className="learn-category-link text-link" href="#plan" data-area="understand">Choose AI Foundations</a>
          </article>
          <article className="learn-category-card">
            <div className="category-card-top">
              <span className="topic-icon">▣</span>
              <span>02</span>
            </div>
            <h3>AI at Work</h3>
            <p>Use ChatGPT, Claude, Gemini and Copilot to automate everyday work.</p>
            <div className="category-examples">
              <span>Skills</span>
              <span>Work agents</span>
              <span>Scheduled actions</span>
            </div>
            <a className="learn-category-link text-link" href="#plan" data-area="daily">Choose AI at Work</a>
          </article>
          <article className="learn-category-card">
            <div className="category-card-top">
              <span className="topic-icon">✦</span>
              <span>03</span>
            </div>
            <h3>New in AI</h3>
            <p>Make sense of new models, product launches and emerging capabilities, without the noise.</p>
            <div className="category-examples">
              <span>Latest launches</span>
              <span>New features</span>
              <span>Emerging tools</span>
            </div>
            <a className="learn-category-link text-link" href="#plan" data-area="new">Choose New in AI</a>
          </article>
          <article className="learn-category-card">
            <div className="category-card-top">
              <span className="topic-icon">⌘</span>
              <span>04</span>
            </div>
            <h3>AI Research</h3>
            <p>Explore interesting new studies and findings, explained in plain language.</p>
            <div className="category-examples">
              <span>New studies</span>
              <span>AI behavior</span>
              <span>Research findings</span>
            </div>
            <a className="learn-category-link text-link" href="#plan" data-area="research">Choose AI Research</a>
          </article>
        </div>
      </div>
    </section>
    <section className="section learn-habit">
      <div className="container">
        <div className="habit-panel">
          <div>
            <div className="eyebrow">
              <span className="section-dash" />
              A LITTLE LEARNING, EVERY DAY
            </div>
            <h2>
              A little every day
              <br />
              {"beats a "}
              <span className="serif-word">lot once.</span>
            </h2>
            <p>Your next explainer comes to you. Keep your streak going.</p>
            <div className="streak-example">
              <span className="eyebrow">EXAMPLE</span>
              <h3>4 of 5 days this week</h3>
              <div className="streak-days" aria-label="Monday through Thursday complete; Friday, Saturday and Sunday incomplete">
                <b>M</b>
                <b>T</b>
                <b>W</b>
                <b>T</b>
                <span>F</span>
                <span>S</span>
                <span>S</span>
              </div>
              <small>Level: Starter · 6 more explainers to Practitioner</small>
            </div>
          </div>
          <div className="learn-message">
            <div className="learn-message-header">
              <b>n</b>
              <strong>Nudgeable</strong>
              <small>WhatsApp</small>
            </div>
            <div className="learn-message-body">
              <p>{"Hi Ananya, today's explainer:"}</p>
              <strong>APIs, Connectors and MCPs: How AI Connects to Your Apps (3 min)</strong>
              <a href={`${LEARN_URL}/`}>{"Open today's explainer"}</a>
              <p>One more day keeps your streak going.</p>
              <small>8:00 AM ✓✓</small>
            </div>
            <span className="message-example-label">EXAMPLE MESSAGE</span>
          </div>
        </div>
      </div>
    </section>
    <section className="planner-section section" id="plan">
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
        <ExplainerPlanner areas={areas} page="learn" />
      </div>
    </section>
    <section className="section learn-faq">
      <div className="container">
        <h2>
          {"Questions people "}
          <span className="serif-word">ask.</span>
        </h2>
        <div className="faq-grid">
          <details open>
            <summary>Is it free?</summary>
            <p>Yes. Your first 4-week plan is free. Pro will add new explainers every month.</p>
          </details>
          <details>
            <summary>Do I have to share my phone number?</summary>
            <p>
              WhatsApp delivery needs your WhatsApp number. You can watch 3 free explainers before signing up.
            </p>
          </details>
          <details>
            <summary>How much time does it take?</summary>
            <p>About 3 minutes per explainer, on the days and at the time you choose.</p>
          </details>
          <details>
            <summary>What if I miss a day?</summary>
            <p>Pick up your plan when you can.</p>
          </details>
        </div>
      </div>
    </section>
    <section className="section learn-end">
      <div className="container">
        <div>
          <h2>
            Make your next step
            <br />
            {"a "}
            <span className="serif-word">learning habit.</span>
          </h2>
          <p>Set up your free plan in 2 minutes.</p>
          <a className="button" href="#plan">Build my free plan</a>
        </div>
      </div>
    </section>
  </>;
}
