import Image from 'next/image';
import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';

const aktaiFeatures = [
  'Jedinečná práce nad kauzou — AI chat propojuje vaše dokumenty, zákony i judikaturu',
  'AI analýza právních dokumentů (PDF) — extrakce lhůt, paragrafů, shrnutí',
  'RAG chat nad 497k paragrafy zákonů a 6 924 rozhodnutími NS / NSS / ÚS',
  'Automatický výpočet odměn dle advokátního tarifu (vyhl. 258/2024 Sb.)',
  'Tvorba smluv s AI asistencí a generování právních podání (DOCX)',
  'Sledování lhůt a správa kauz na jednom místě',
];

const aresFeatures = [
  'Interaktivní graf vazeb — statutární orgán, společníci, propojené firmy',
  'Živé rozklikávání uzlů přímo v konverzaci (MCP Apps)',
  'Data z rejstříku ARES — vždy aktuální',
  'Vyhledání podle názvu i IČO',
  'Pro due diligence, KYC a kontrolu vazeb',
  'Open-source, zdarma — připojíte jako vlastní konektor do Claude',
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
            <a
              href="https://aktai.cz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand/90 sm:self-auto"
            >
              Otevřít aktai.cz
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
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            AI asistent pro všechny, kdo pracují s právem. Analýza dokumentů, výpočet odměn,
            sledování lhůt a chat nad kauzami, zákony i judikaturou — vše na jednom místě.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {aktaiFeatures.map((feature) => (
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

        <article className="mt-8 rounded-xl border border-slate-200 bg-white p-8 transition-all duration-200 hover:border-brand hover:shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-50">
              ARES Explorer
            </h3>
            <a
              href="https://github.com/duzidavid/ares-explorer-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-md bg-brand px-4 py-2 text-sm font-medium text-white transition hover:bg-brand/90 sm:self-auto"
            >
              Zobrazit na GitHubu
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
                <path d="M7 17 17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            MCP aplikace, která přímo v Claude vykreslí vlastnické a personální vazby české firmy
            jako interaktivní graf. Zadáte IČO, rozkliknete uzel — a síť napojených firem a osob se
            před vámi živě rozroste. Otevřený zdroj nad veřejnými daty z rejstříku ARES.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {aresFeatures.map((feature) => (
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

          <p className="mt-8 border-t border-slate-200/70 pt-6 text-sm leading-relaxed text-slate-500 dark:border-slate-800/70 dark:text-slate-400">
            <span className="font-medium text-slate-700 dark:text-slate-300">Jak vyzkoušet:</span> v Claude
            připojte konektor{' '}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.8125rem] text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              https://ares-explorer-mcp.vercel.app/api/mcp
            </code>{' '}
            (Customize → Connectors → Add custom connector, vyžaduje placený plán) a napište „Ukaž graf vazeb firmy s IČO 24261980.“
          </p>
        </article>
      </Container>
    </section>
  );
}
