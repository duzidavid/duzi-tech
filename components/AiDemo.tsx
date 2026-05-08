'use client';

import { useState } from 'react';
import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';

const MAX_INPUT_LENGTH = 500;

type Result = {
  mainIdea: string;
  actions: string[];
  risks: string[];
};

const ERROR_MESSAGES: Record<string, string> = {
  rate_limited: 'Přesáhli jste limit požadavků. Zkuste to za hodinu.',
  daily_limit_exceeded: 'Demo dnes vyčerpáno. Zkuste prosím zítra.',
  too_long: 'Text je příliš dlouhý. Zkraťte ho prosím.',
  invalid_input: 'Vložte prosím text k analýze.',
};

const DEFAULT_ERROR = 'Něco se nepodařilo. Zkuste to prosím znovu.';

export function AiDemo() {
  const [input, setInput] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const remaining = MAX_INPUT_LENGTH - input.length;
  const tooLong = input.length > MAX_INPUT_LENGTH;
  const canSubmit = input.trim().length > 0 && !tooLong && !loading;

  async function handleAnalyze() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/ai-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, website: honeypot }),
      });
      const data: { error?: string } & Partial<Result> = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(ERROR_MESSAGES[data.error ?? ''] ?? DEFAULT_ERROR);
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
    }
  }

  return (
    <section id="ukazka" className="border-t border-slate-200/70 bg-slate-50/50 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Ukázka</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Vyzkoušejte si
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Vložte krátký text — smlouva, zápis z porady, e-mail. AI vrátí
            strukturovanou analýzu za pár sekund.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col">
            <label htmlFor="ai-demo-input" className="sr-only">
              Text k analýze
            </label>
            <textarea
              id="ai-demo-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Sem vložte text k analýze…"
              rows={10}
              maxLength={MAX_INPUT_LENGTH * 2}
              className="w-full flex-1 resize-none rounded-xl border border-slate-200 bg-white p-4 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
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
            <div className="mt-2 flex items-center justify-between">
              <p className={`text-xs ${tooLong ? 'text-red-600' : 'text-slate-500'}`}>
                {input.length} / {MAX_INPUT_LENGTH} znaků
                {tooLong && ` (přesáhli jste o ${-remaining})`}
              </p>
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={!canSubmit}
                className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Analyzuji…' : 'Analyzovat'}
              </button>
            </div>
          </div>

          <div className="min-h-[280px] rounded-xl bg-white p-6 ring-1 ring-slate-200">
            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : loading ? (
              <DemoSkeleton />
            ) : result ? (
              <DemoResult result={result} />
            ) : (
              <DemoPlaceholder />
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

function DemoSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function DemoPlaceholder() {
  return (
    <div className="space-y-6">
      <DemoSection label="Hlavní myšlenka">
        <p className="text-sm leading-relaxed text-slate-400">Vložte text a klikněte na Analyzovat.</p>
      </DemoSection>
      <DemoSection label="Akční kroky">
        <p className="text-sm leading-relaxed text-slate-400">—</p>
      </DemoSection>
      <DemoSection label="Rizika">
        <p className="text-sm leading-relaxed text-slate-400">—</p>
      </DemoSection>
    </div>
  );
}

function DemoSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <DemoSection label="Hlavní myšlenka">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      </DemoSection>
      <DemoSection label="Akční kroky">
        <div className="space-y-2">
          <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
        </div>
      </DemoSection>
      <DemoSection label="Rizika">
        <div className="space-y-2">
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-slate-200" />
        </div>
      </DemoSection>
    </div>
  );
}

function DemoResult({ result }: { result: Result }) {
  return (
    <div className="space-y-6">
      <DemoSection label="Hlavní myšlenka">
        <p className="text-base leading-relaxed text-slate-900">{result.mainIdea}</p>
      </DemoSection>
      <DemoSection label="Akční kroky">
        {result.actions.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
            {result.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-slate-500">Žádné konkrétní akční kroky.</p>
        )}
      </DemoSection>
      <DemoSection label="Rizika">
        {result.risks.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-700">
            {result.risks.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-relaxed text-slate-500">Žádná zjevná rizika.</p>
        )}
      </DemoSection>
    </div>
  );
}
