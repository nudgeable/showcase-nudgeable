import { NextRequest, NextResponse } from 'next/server';
import { LEARN_URL } from '@/lib/siteLinks';

export const runtime = 'nodejs';

// The homepage's "Get your free plan on WhatsApp" form. Passes the form to Learn's /api/signups with the
// shared LEARN_SIGNUP_SECRET (the same value as SIGNUP_SECRET in the Learn project), so the secret never
// reaches the browser. Learn checks the form, applies rate limits and builds the plan in the background.
export async function POST(request: NextRequest) {
  const secret = process.env.LEARN_SIGNUP_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: 'Sign-up is not available right now. Please try again later.' }, { status: 503 });

  const body: unknown = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  const { name, phone, areas, consent } = body as Record<string, unknown>;
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || '';

  try {
    const response = await fetch(`${LEARN_URL}/api/signups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ name, phone, areas, consent, ip }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000)
    });
    const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
    if (response.ok && result?.ok) return NextResponse.json({ ok: true });
    // Learn's 400 and 429 messages are written for the visitor; anything else gets a general one
    const shown = (response.status === 400 || response.status === 429) && result?.error;
    if (!shown) console.error('Learn sign-up failed', response.status, result?.error);
    return NextResponse.json({ ok: false, error: shown || 'Something went wrong. Please try again.' }, { status: shown ? response.status : 502 });
  } catch (error) {
    console.error('Learn sign-up unreachable', error);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 502 });
  }
}
