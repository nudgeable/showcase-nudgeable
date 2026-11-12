import { NextRequest, NextResponse } from 'next/server';
import { LEARN_URL } from '@/lib/siteLinks';

export const runtime = 'nodejs';

// The optional email after "You're in" on the WhatsApp plan form. Passes it to Learn's
// /api/signups/email with the shared LEARN_SIGNUP_SECRET and the requestId from the sign-up, so Learn
// can add it to the new account for signing in (including Google with the same email).
export async function POST(request: NextRequest) {
  const secret = process.env.LEARN_SIGNUP_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: 'This is not available right now. Please try again later.' }, { status: 503 });

  const body = await request.json().catch(() => null) as { requestId?: unknown; email?: unknown } | null;
  if (!body || typeof body.requestId !== 'string' || typeof body.email !== 'string')
    return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });

  try {
    const response = await fetch(`${LEARN_URL}/api/signups/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
      body: JSON.stringify({ requestId: body.requestId, email: body.email }),
      cache: 'no-store',
      signal: AbortSignal.timeout(15_000)
    });
    const result = await response.json().catch(() => null) as { ok?: boolean; error?: string } | null;
    if (response.ok && result?.ok) return NextResponse.json({ ok: true });
    // Learn's 400, 409 and 410 messages are written for the visitor
    const shown = [400, 409, 410].includes(response.status) && result?.error;
    if (!shown) console.error('Learn sign-up email failed', response.status, result?.error);
    return NextResponse.json({ ok: false, error: shown || 'Something went wrong. Please try again.' }, { status: shown ? response.status : 502 });
  } catch (error) {
    console.error('Learn sign-up email unreachable', error);
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 502 });
  }
}
