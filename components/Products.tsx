import Image from 'next/image';
import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';

const features = [
  'Jedinečná práce nad kauzou — AI chat propojuje vaše dokumenty, zákony i judikaturu',
  'AI analýza právních dokumentů (PDF) — extrakce lhůt, paragrafů, shrnutí',
  'RAG chat nad 497k paragrafy zákonů a 6 924 rozhodnutími NS / NSS / ÚS',
  'Automatický výpočet odměn dle advokátního tarifu (vyhl. 258/2024 Sb.)',
  'Tvorba smluv s AI asistencí a generování právních podání (DOCX)',
  'Sledování lhůt a správa kauz na jednom místě',
];

export function Products() {
  return (
    <section
      id="produkty"
      className="border-t border-slate-200/70 py-24 sm:py-32 dark:border-slate-800/70"
    >
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Produkty</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Naše produkty
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Co u nás vzniká.
          </p>
        </div>

        <article className="mt-16 rounded-xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-brand hover:shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="sr-only">AktAI</h3>
            <Image
              src="/aktai-logo.svg"
              alt="AktAI"
              width={3162}
              height={1029}
              priority={false}
              className="h-10 w-auto sm:h-12"
            />
            <span className="inline-flex items-center self-start rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 sm:self-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Připravujeme
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            AI asistent pro všechny, kdo pracují s právem. Analýza dokumentů, výpočet odměn,
            sledování lhůt a chat nad kauzami, zákony i judikaturou — vše na jednom místě.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex gap-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1D9E75"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </article>
      </Container>
    </section>
  );
}
