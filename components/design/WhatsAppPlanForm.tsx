'use client';

import { useState, type FormEvent } from 'react';

export type PlanArea = { key: string; label: string };

// "Get your free plan on WhatsApp": name, number and optional categories go to Learn (through
// /api/learn-signup), which makes the account and a 15-explainer plan in the background.
export function WhatsAppPlanForm({ areas }: { areas: PlanArea[] }) {
  const [chosen, setChosen] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  function toggle(key: string) {
    setChosen(now => now.includes(key) ? now.filter(k => k !== key) : [...now, key]);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''))) return setError('Please enter a 10-digit WhatsApp number.');
    if (!consent) return setError('Please tick the box so we can send you explainers on WhatsApp.');
    setError('');
    setSending(true);
    try {
      const response = await fetch('/api/learn-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.replace(/\D/g, ''), areas: chosen, consent })
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; error?: string; requestId?: string | null } | null;
      if (result?.ok) {
        setRequestId(result.requestId ?? null);
        setDone(true);
      }
      else setError(result?.error || 'Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  }

  if (done) return <div className="wa-plan-card wa-plan-done">
    <div role="status">
      <span className="wa-plan-done-icon" aria-hidden="true">✓</span>
      <h3>{`You're in, ${name.trim().split(/\s+/)[0]}.`}</h3>
      <p>Your free 4-week plan is on its way to your WhatsApp. Explainers come on weekdays at 8:00 AM.</p>
    </div>
    {requestId && <AddEmail requestId={requestId} />}
  </div>;

  return <form className="wa-plan-card" onSubmit={submit} noValidate>
    <h3>Get your free plan on WhatsApp</h3>
    <fieldset className="wa-plan-topics">
      <legend><b>What would you like to learn?</b> <span>(skip to let AI choose)</span></legend>
      <div className="wa-plan-chips">
        {areas.map(area => <button
          key={area.key}
          type="button"
          className="wa-plan-chip"
          aria-pressed={chosen.includes(area.key)}
          onClick={() => toggle(area.key)}
          data-analytics-action={`Topic: ${area.label}`}
        >{area.label}</button>)}
      </div>
    </fieldset>
    <div className="wa-plan-fields">
      <label className="wa-plan-field">
        <span>Your name</span>
        <input type="text" name="name" autoComplete="given-name" placeholder="Asha" maxLength={80} value={name} onChange={event => setName(event.target.value)} />
      </label>
      <div className="wa-plan-field">
        <label htmlFor="wa-plan-phone">WhatsApp number</label>
        <div className="wa-plan-phone">
          <span className="wa-plan-code" aria-label="India, +91">+91</span>
          <input id="wa-plan-phone" type="tel" name="phone" inputMode="numeric" autoComplete="tel-national" placeholder="98765 43210" maxLength={14} value={phone} onChange={event => setPhone(event.target.value)} />
        </div>
      </div>
    </div>
    <label className="wa-plan-consent">
      <input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} />
      <span>Send me my plan and explainers on WhatsApp. I can opt out anytime.</span>
    </label>
    <button className="button wa-plan-submit" type="submit" disabled={sending} data-analytics-action="Send plan to WhatsApp">
      {sending ? 'Sending…' : 'Send it to my WhatsApp →'}
    </button>
    {error && <p className="wa-plan-error" role="alert">{error}</p>}
  </form>;
}

// Optional, after "You're in": an email for signing in to Nudgeable Learn (Google with the same email
// opens the same account) and getting progress by email. WhatsApp works without it.
function AddEmail({ requestId }: { requestId: string }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return setError('Please enter a valid email, like asha@gmail.com.');
    setError('');
    setSending(true);
    try {
      const response = await fetch('/api/learn-signup/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, email: value })
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
      if (result?.ok) setSaved(value.toLowerCase());
      else setError(result?.error || 'Something went wrong. Please try again.');
    } catch {
      setError('Something went wrong. Please check your connection and try again.');
    } finally {
      setSending(false);
    }
  }

  if (saved) return <div className="wa-plan-email wa-plan-email-saved" role="status">
    <strong>{`✓ Email saved: ${saved}`}</strong>
    <p>Sign in to Nudgeable Learn with Google using this email to see your progress.</p>
  </div>;

  return <form className="wa-plan-email" onSubmit={submit} noValidate>
    <label htmlFor="wa-plan-email-input">
      <b>Add your email</b> <span>(optional)</span>
    </label>
    <p>Sign in to Nudgeable Learn with it to track your progress, and get updates by email. WhatsApp works either way.</p>
    <div className="wa-plan-email-row">
      <input id="wa-plan-email-input" type="email" inputMode="email" autoComplete="email" placeholder="asha@gmail.com" value={email} onChange={event => setEmail(event.target.value)} disabled={sending} />
      <button className="button" type="submit" disabled={sending} data-analytics-action="Add email after sign-up">{sending ? 'Saving…' : 'Save'}</button>
    </div>
    {error && <p className="wa-plan-error" role="alert">{error}</p>}
  </form>;
}
