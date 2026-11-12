import { LEARN_URL } from '@/lib/siteLinks';

// "Learn on WhatsApp. See your progress." from the 12 Nov 2026 design, as a demo: the fields are
// switched off (nothing can be typed or sent here), and "Create my free plan" goes to Nudgeable Learn.
// The working sign-up (WhatsAppPlanForm, posting to Learn through /api/learn-signup) is commented out
// in HomeContent for later.

const TOPICS = ['AI Foundations', 'AI at Work', 'New in AI', 'AI Research'];

const GoogleIcon = () => <svg viewBox="0 0 48 48" aria-hidden="true">
  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
  <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.4c-.5 2.9-2.2 5.3-4.6 6.9l7.4 5.8c4.3-4 6.9-9.9 6.9-17.1z" />
  <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
  <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.8c-2.1 1.4-4.8 2.3-8.5 2.3-6.3 0-11.6-4.1-13.5-9.9l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
</svg>;

export function WhatsAppPlanDemo() {
  return <section className="wp-demo section" id="whatsapp-plan" data-analytics-section="WhatsApp plan (demo)">
    <div className="container wp-grid">
      <div className="wp-copy">
        <div className="eyebrow">
          <span className="section-dash" />
          {' YOUR FREE 4-WEEK LEARNING PLAN'}
        </div>
        <h2>
          Learn on WhatsApp.
          <br />
          See your progress.
        </h2>
        <p className="wp-intro">Choose your interests or let AI choose your topics. We&apos;ll send you short explainers and help you keep track of what you&apos;ve completed.</p>
        <ol className="wp-steps">
          <li><b>1</b>Choose what you want to learn.</li>
          <li><b>2</b>Create your login using your email.</li>
          <li><b>3</b>Receive explainers on WhatsApp.</li>
        </ol>
        <div className="wp-note">
          <strong>Your own My Progress page</strong>
          <span>Sign in to see completed explainers and follow your progress through the plan.</span>
        </div>
      </div>

      <div className="wp-card">
        <h3>Create my free learning plan</h3>
        <form className="wp-form" aria-disabled="true">
          <fieldset disabled className="wp-fieldset">
            <fieldset className="wp-topics">
              <legend>What would you like to learn? <span className="wp-opt">(skip to let AI choose)</span></legend>
              <div className="wp-checks">
                {TOPICS.map(topic => <label key={topic} className="wp-check"><input type="checkbox" name="topic" value={topic} />{topic}</label>)}
              </div>
            </fieldset>
            <button type="button" className="wp-google"><GoogleIcon />Continue with Google</button>
            <div className="wp-or">or use your email</div>
            <label className="wp-field">
              <span>Email <span className="wp-opt">(your login)</span></span>
              <input name="email" type="email" placeholder="you@company.com" />
            </label>
            <label className="wp-field">
              <span>WhatsApp number <span className="wp-opt">(videos arrive here)</span></span>
              <span className="wp-phone">
                <select name="cc" aria-label="Country code" defaultValue="+91">
                  <option>+91</option><option>+65</option><option>+44</option><option>+971</option><option>+1</option>
                </select>
                <input name="phone" type="tel" placeholder="98765 43210" />
              </span>
            </label>
            <label className="wp-consent">
              <input type="checkbox" name="consent" />
              <span>Send me my plan and explainers on WhatsApp. I can opt out anytime.</span>
            </label>
          </fieldset>
          {/* The one live control: goes to Nudgeable Learn, where the plan is made */}
          <a className="wp-submit" href={`${LEARN_URL}/`} data-analytics-action="Create my free plan (to Learn)">Create my free plan →</a>
        </form>
      </div>
    </div>
  </section>;
}
