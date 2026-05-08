import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Redis } from '@upstash/redis';

export const runtime = 'nodejs';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const redis = Redis.fromEnv();

const MAX_INPUT_LENGTH = 500;
const PER_IP_LIMIT = 3;
const PER_IP_WINDOW_SECONDS = 3600;
const DAILY_GLOBAL_LIMIT = 500;
const DAILY_WINDOW_SECONDS = 86400;

const ALLOWED_ORIGINS = [
  'https://duzi.tech',
  'https://www.duzi.tech',
  'http://localhost:3000',
];

const SYSTEM_PROMPT = `Jsi asistent pro analýzu krátkých českých textů (smlouvy, e-maily, zápisy z porad). Vrať VŽDY pouze validní JSON objekt v tomto formátu, bez markdown bloků, bez komentářů, bez preambule:

{
  "mainIdea": "jedna věta, max 25 slov",
  "actions": ["akční krok 1", "akční krok 2", "akční krok 3"],
  "risks": ["riziko 1", "riziko 2"]
}

Pravidla:
- mainIdea: jedna věta v češtině, srozumitelná, neutrální tón
- actions: 2 až 4 položky, každá max 15 slov, konkrétní a vykonatelné
- risks: 1 až 3 položky, každá max 15 slov, faktická rizika nebo nejasnosti
- Pokud text neobsahuje akční kroky nebo rizika, vrať prázdné pole []
- Žádný text mimo JSON objekt`;

function getClientIp(req: Request): string {
  const vercelForwarded = req.headers.get('x-vercel-forwarded-for');
  if (vercelForwarded) return vercelForwarded.split(',')[0].trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const ips = forwarded.split(',').map((s) => s.trim()).filter(Boolean);
    if (ips.length > 0) return ips[ips.length - 1];
  }

  return 'unknown';
}

function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (origin) return ALLOWED_ORIGINS.includes(origin);
  const referer = req.headers.get('referer');
  if (referer) return ALLOWED_ORIGINS.some((o) => referer.startsWith(o + '/') || referer === o);
  return false;
}

export async function POST(req: Request) {
  try {
    if (!isAllowedOrigin(req)) {
      return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

    const { text, website } = await req.json();

    if (typeof website === 'string' && website.length > 0) {
      return NextResponse.json({
        mainIdea: 'Analýza dokončena.',
        actions: [],
        risks: [],
      });
    }

    if (typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }
    if (text.length > MAX_INPUT_LENGTH) {
      return NextResponse.json({ error: 'too_long' }, { status: 400 });
    }

    const ip = getClientIp(req);
    const ipKey = `duzi-tech:ai-demo:${ip}`;
    const ipCount = await redis.incr(ipKey);
    if (ipCount === 1) {
      await redis.expire(ipKey, PER_IP_WINDOW_SECONDS);
    }
    if (ipCount > PER_IP_LIMIT) {
      return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
    }

    const today = new Date().toISOString().slice(0, 10);
    const globalKey = `duzi-tech:ai-demo:global:${today}`;
    const globalCount = await redis.incr(globalKey);
    if (globalCount === 1) {
      await redis.expire(globalKey, DAILY_WINDOW_SECONDS);
    }
    if (globalCount > DAILY_GLOBAL_LIMIT) {
      return NextResponse.json({ error: 'daily_limit_exceeded' }, { status: 429 });
    }

    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: text }],
    });

    const block = response.content[0];
    if (!block || block.type !== 'text') {
      return NextResponse.json({ error: 'unexpected_response' }, { status: 500 });
    }

    const cleaned = block.text.trim().replace(/^```json\s*|```$/g, '').trim();
    const parsed = JSON.parse(cleaned);

    if (
      typeof parsed.mainIdea !== 'string' ||
      !Array.isArray(parsed.actions) ||
      !Array.isArray(parsed.risks)
    ) {
      return NextResponse.json({ error: 'invalid_format' }, { status: 500 });
    }

    return NextResponse.json({
      mainIdea: parsed.mainIdea,
      actions: parsed.actions.slice(0, 4),
      risks: parsed.risks.slice(0, 3),
    });
  } catch (err) {
    console.error('[ai-demo] error:', err instanceof Error ? err.name : 'unknown');
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
