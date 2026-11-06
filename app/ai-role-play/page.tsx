import type { Metadata } from 'next';
import '@/styles/design/library.css';
import '@/styles/design/extras.css';
import { ClientLogos } from '@/components/design/ClientLogos';
import { DesignShell } from '@/components/design/DesignShell';
import { VideoPlayerDialog } from '@/components/design/VideoPlayerDialog';

export const metadata: Metadata = {
  title: 'AI Coach for Sales and Leadership',
  description: 'Customized AI voice roleplays for sales and leadership practice with objective, conversation-linked feedback.',
  alternates: { canonical: '/ai-role-play' },
  openGraph: {
    title: 'AI Coach for Sales and Leadership',
    description: 'Customized AI voice roleplays with objective, conversation-linked feedback.',
    url: '/ai-role-play',
    type: 'website',
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: 'Nudgeable' }]
  }
};

const useCases = [
  {
    videoId: '-y5uJ_2ACcM',
    title: 'AI Sales Coach',
    subtitle: 'Practice objections before they are real',
    demoLabel: 'AI Sales Coach demo',
    bullets: ['Onboard new sales reps faster', 'Improve pitches and objection handling', 'Assess and certify sales readiness']
  },
  {
    videoId: 'GBWzcb101HQ',
    title: 'AI Leadership Coach',
    subtitle: 'Practice feedback, conflict and motivation',
    demoLabel: 'AI Leadership Coach demo',
    bullets: ['Apply leadership frameworks to real situations', 'Practise difficult conversations', 'Build confidence in first-time managers']
  }
];

const steps = [
  {
    label: 'STEP 01 · SCENARIO',
    title: 'Realistic scenarios built on deep expertise',
    bullets: [
      'Custom-built with workplace context, behavioral science and subject-matter expertise.',
      'Each scenario is refined, tested and designed around the conversations your teams face.',
      'From scenarios to scoring rubrics, every detail is tailored to your environment.'
    ],
    image: '/assets/coach-scenario.png?v=20260728',
    width: 522,
    height: 458,
    alt: 'Scenario design for AI Coach'
  },
  {
    label: 'STEP 02 · ROLEPLAY',
    title: 'Practice that mirrors your reality',
    bullets: [
      'Human-sounding voices support realistic sales and leadership practice.',
      'Real conversations feel natural, with nuanced prompts and believable responses.',
      'Advanced voice models create immersive rehearsal before high-stakes conversations.'
    ],
    image: '/assets/coach-roleplay.png?v=20260728',
    width: 524,
    height: 453,
    alt: 'Voice roleplay experience in AI Coach'
  },
  {
    label: 'STEP 03 · INSIGHTS',
    title: 'Feedback that drives growth',
    bullets: [
      'Every insight and score is grounded in what was actually said during the conversation.',
      'Teams can see what worked, what to improve and which alternatives to practise next.',
      'Actionable learning resources help employees improve right away.'
    ],
    image: '/assets/coach-insights.png?v=20260728',
    width: 526,
    height: 454,
    alt: 'AI Coach assessment and insights report'
  }
];

const uses = ['Sales onboarding', 'Dealer conversations', 'Leadership feedback', 'Customer service', 'New manager onboarding', 'Assessment and certification'];

export default function AICoachPage() {
  return <DesignShell page="roleplay">
    <section className="inner-hero unified-hero roleplay-hero">
      <div className="container unified-hero-grid">
        <div>
          <div className="eyebrow"><span className="section-dash" />AI ROLE PLAY</div>
          <h1 className="unified-hero-title">
            <span className="hero-title-line">Practice critical</span>
            <span className="hero-title-line"><span className="hero-title-highlight">conversations</span></span>
            <span className="hero-title-line">with AI.</span>
          </h1>
          <p className="hero-description">Employees rehearse real sales and leadership conversations with AI, then receive objective feedback linked to what they actually said.</p>
          <div className="inner-hero-actions">
            <a className="button" href="/#contact">Request a demo</a>
            <a className="text-link" href="#use-cases">See the use cases</a>
          </div>
        </div>
        <div className="roleplay-hero-art">
          <img src="/assets/ai-coach-hero.png" alt="AI Coach roleplay interface showing a live practice conversation and feedback flow" width="1384" height="978" />
        </div>
      </div>
    </section>
    <ClientLogos />
    <section className="section" id="use-cases">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="section-dash" />SALES AND LEADERSHIP</div>
            <h2>Two practice environments for <span className="serif-word">critical conversations.</span></h2>
          </div>
        </div>
        <div className="roleplay-use-grid">
          {useCases.map(item => <article key={item.videoId}>
            <button className="video-launch" data-video-id={item.videoId} data-video-format="landscape" data-video-title={item.demoLabel} aria-label={`Play ${item.demoLabel}`}>
              <img src={`https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="play-button" aria-hidden="true">▶</span>
            </button>
            <div className="roleplay-use-copy">
              <span className="article-category">{item.title}</span>
              <h3>{item.subtitle}</h3>
              <ul>{item.bullets.map(point => <li key={point}>{point}</li>)}</ul>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section roleplay-steps-section" id="how-it-works">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="section-dash" />HOW AI ROLE PLAY WORKS</div>
            <h2>From real scenarios to <span className="serif-word">useful feedback.</span></h2>
          </div>
        </div>
        <div className="roleplay-steps">
          {steps.map(step => <article key={step.label}>
            <div>
              <span className="track-kicker">{step.label}</span>
              <h3>{step.title}</h3>
              <ul>{step.bullets.map(point => <li key={point}>{point}</li>)}</ul>
            </div>
            <img src={step.image} alt={step.alt} width={step.width} height={step.height} loading="lazy" />
          </article>)}
        </div>
      </div>
    </section>
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow"><span className="section-dash" />WHERE IT CAN BE USED</div>
            <h2>Built around the conversations <span className="serif-word">your teams face.</span></h2>
          </div>
        </div>
        <div className="roleplay-chips">{uses.map(item => <span key={item}>{item}</span>)}</div>
      </div>
    </section>
    <section className="academy-callout">
      <div className="container">
        <div>
          <div className="eyebrow"><span className="section-dash" />START WITH A PILOT</div>
          <h2>Create an AI roleplay for a<br /><span className="serif-word">real workplace conversation.</span></h2>
        </div>
        <a className="button" href="/#contact">Discuss a pilot</a>
      </div>
    </section>
    <VideoPlayerDialog />
  </DesignShell>;
}
