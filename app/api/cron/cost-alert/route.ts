import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const DAILY_LIMIT = 500;
const ALERT_THRESHOLDS = [0.5, 0.8, 1.0];

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const redis = Redis.fromEnv();

  const today = new Date().toISOString().slice(0, 10);
  const usageKey = `duzi-tech:ai-demo:global:${today}`;
  const count = (await redis.get<number>(usageKey)) ?? 0;
  const usagePercent = count / DAILY_LIMIT;

  let triggeredThreshold: number | null = null;
  for (const threshold of ALERT_THRESHOLDS) {
    if (usagePercent >= threshold) {
      triggeredThreshold = threshold;
    }
  }

  if (triggeredThreshold === null) {
    return NextResponse.json({
      count,
      limit: DAILY_LIMIT,
      percent: Math.round(usagePercent * 100),
      alert: false,
    });
  }

  const alertSentKey = `duzi-tech:ai-demo:alert-sent:${today}:${triggeredThreshold}`;
  const alreadySent = await redis.get(alertSentKey);

  if (alreadySent) {
    return NextResponse.json({
      count,
      limit: DAILY_LIMIT,
      percent: Math.round(usagePercent * 100),
      alert: 'already_sent',
      threshold: triggeredThreshold,
    });
  }

  const subject =
    triggeredThreshold === 1.0
      ? `[Duzi Tech] AI demo: DENNÍ LIMIT VYČERPÁN (${count}/${DAILY_LIMIT})`
      : `[Duzi Tech] AI demo: ${Math.round(triggeredThreshold * 100)} % využito (${count}/${DAILY_LIMIT})`;

  const body =
    triggeredThreshold === 1.0
      ? `Denní limit AI demo na duzi.tech byl vyčerpán.

Počet requestů dnes: ${count}/${DAILY_LIMIT}

Noví uživatelé budou vidět "Demo dnes vyčerpáno" do půlnoci UTC.

Pokud je traffic nečekaný, zkontroluj:
- Anthropic dashboard pro skutečné API náklady
- Vercel logy /api/ai-demo pro vzor requestů
- Cloudflare Turnstile statistiky pro počet bot challengeů

Reset: 00:00 UTC.`
      : `Denní usage AI demo na duzi.tech: ${count}/${DAILY_LIMIT} (${Math.round(usagePercent * 100)} %).

Pokud je to nečekaně vysoké, zkontroluj:
- Anthropic dashboard pro skutečné API náklady
- Vercel logy /api/ai-demo pro vzor requestů

Následující threshold: ${triggeredThreshold === 0.5 ? '80 %' : '100 %'}.`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@aktai.cz',
        to: 'david@duzi.tech',
        subject,
        text: body,
      }),
    });

    if (!res.ok) {
      console.error('[cost-alert] resend failed status:', res.status);
      return NextResponse.json({ error: 'resend_failed' }, { status: 500 });
    }

    await redis.set(alertSentKey, '1', { ex: 86400 });

    return NextResponse.json({
      count,
      limit: DAILY_LIMIT,
      percent: Math.round(usagePercent * 100),
      alert: 'sent',
      threshold: triggeredThreshold,
    });
  } catch (err) {
    console.error('[cost-alert] error:', err instanceof Error ? err.name : 'unknown');
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
