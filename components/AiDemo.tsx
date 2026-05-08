'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from './Container';

declare global {
  interface Window {
    turnstile?: {
      render: (
        selector: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: () => void;
          'expired-callback'?: () => void;
          appearance?: 'always' | 'execute' | 'interaction-only';
          size?: 'normal' | 'compact' | 'invisible';
        },
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      execute: (widgetId: string) => void;
    };
  }
}

const MAX_INPUT_LENGTH = 500;
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type Result = {
  mainIdea: string;
  actions: string[];
  risks: string[];
};

const DEFAULT_ERROR = 'Něco se nepodařilo. Zkuste to prosím znovu za chvíli.';

function messageForError(code: string | undefined): string {
  switch (code) {
    case 'rate_limited':
      return 'Přesáhli jste limit požadavků. Zkuste to za hodinu.';
    case 'daily_limit_exceeded':
      return 'Demo dnes vyčerpáno. Zkuste prosím zítra.';
    case 'too_long':
      return 'Text je příliš dlouhý. Zkraťte ho prosím pod 500 znaků.';
    default:
      return DEFAULT_ERROR;
  }
}

export function AiDemo() {
  const [input, setInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);
  const turnstileWidgetRef = useRef<string | null>(null);
  const turnstileContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;

    const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

    function renderWidget() {
      if (!window.turnstile || !turnstileContainerRef.current || turnstileWidgetRef.current) return;
      try {
        turnstileWidgetRef.current = window.turnstile.render(turnstileContainerRef.current, {
          sitekey: TURNSTILE_SITE_KEY!,
          appearance: 'interaction-only',
          callback: (token: string) => setTurnstileToken(token),
          'error-callback': () => setTurnstileToken(null),
          'expired-callback': () => setTurnstileToken(null),
        });
        setTurnstileReady(true);
      } catch {
        setTurnstileReady(false);
      }
    }

    if (window.turnstile) {
      renderWidget();
      return;
    }

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', renderWidget);

    return () => {
      script?.removeEventListener('load', renderWidget);
      if (window.turnstile && turnstileWidgetRef.current) {
        try {
          window.turnstile.remove(turnstileWidgetRef.current);
        } catch {
          /* widget may have been removed already */
        }
        turnstileWidgetRef.current = null;
      }
    };
  }, []);

  function resetTurnstile() {
    if (window.turnstile && turnstileWidgetRef.current) {
      try {
        window.turnstile.reset(turnstileWidgetRef.current);
      } catch {
        /* ignore */
      }
    }
    setTurnstileToken(null);
  }

  const tooLong = input.length > MAX_INPUT_LENGTH;
  const turnstileGate = !TURNSTILE_SITE_KEY || Boolean(turnstileToken);
  const canSubmit =
    input.trim().length > 0 && !tooLong && !loading && turnstileGate;

  async function handleAnalyze() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, website: honeypot, turnstileToken }),
      });
      const data: { error?: string } & Partial<Result> = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(messageForError(data.error));
        return;
      }
      if (
        typeof data.mainIdea !== 'string' ||
        !Array.isArray(data.actions) ||
        !Array.isArray(data.risks)
      ) {
        setError(DEFAULT_ERROR);
        return;
      }
      setResult({ mainIdea: data.mainIdea, actions: data.actions, risks: data.risks });
    } catch {
      setError(DEFAULT_ERROR);
    } finally {
      setLoading(false);
      resetTurnstile();
    }
  }

  return (
    <section id="ukazka" className="border-t border-slate-200/70 bg-slate-50/50 py-24 lg:py-32">
      <Container>
        <div className="max-w-3xl">
          <div className="mb-3 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              Ukázka
            </span>
          </div>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-slate-900 lg:text-5xl">
            Vyzkoušejte si
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Vložte krátký text — smlouva, zápis z porady, e-mail. AI vrátí
            strukturovanou analýzu za pár sekund.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="ai-demo-input"
                className="text-xs font-medium uppercase tracking-[0.15em] text-slate-500"
              >
                Vstup
              </label>
              <span className="text-xs tabular-nums text-slate-400">
                {input.length} / {MAX_INPUT_LENGTH}
              </span>
            </div>
            <textarea
              id="ai-demo-input"
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
              placeholder="Sem vložte text k analýze…"
              maxLength={MAX_INPUT_LENGTH}
              className="min-h-[280px] w-full flex-1 resize-none rounded-xl border border-slate-200 bg-white p-5 text-slate-900 placeholder:text-slate-400 transition-shadow focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />
            <div ref={turnstileContainerRef} className="mt-3" />
            {TURNSTILE_SITE_KEY && turnstileReady && !turnstileToken && (
              <p className="mt-2 text-xs text-slate-400">Probíhá ověření…</p>
            )}
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!canSubmit}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  Analyzuji…
                </>
              ) : (
                <>
                  Analyzovat
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          <div className="flex min-h-[280px] flex-col rounded-xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="mb-5 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
              Analýza
            </div>

            {!result && !loading && !error && (
              <div className="flex flex-1 items-center justify-center text-center">
                <p className="text-sm text-slate-400">
                  Vložte text vlevo a klikněte na Analyzovat.
                </p>
              </div>
            )}

            {loading && (
              <div className="space-y-6" aria-busy="true">
                <div>
                  <div className="mb-3 h-3 w-32 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                </div>
                <div>
                  <div className="mb-3 h-3 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-100" />
                    <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>
                <div>
                  <div className="mb-3 h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-brand">
                    Hlavní myšlenka
                  </p>
                  <p className="font-medium leading-relaxed text-slate-900">
                    {result.mainIdea}
                  </p>
                </div>

                {result.actions.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Akční kroky
                    </p>
                    <ul className="space-y-2.5">
                      {result.actions.map((action, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.risks.length > 0 && (
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-slate-500">
                      Rizika
                    </p>
                    <ul className="space-y-2.5">
                      {result.risks.map((risk, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                          <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-slate-500">
          Demo používá Claude Haiku přes Anthropic API. Vaše texty neukládáme.
          Anthropic vstupy zpracovává podle svých podmínek a nepoužívá je
          k trénování.
        </p>
      </Container>
    </section>
  );
}
