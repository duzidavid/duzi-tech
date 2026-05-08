import { Container } from './Container';
import { company } from '@/lib/company';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand" />
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-brand">
              Duzi Tech s.r.o.
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-50">
            Stavíme AI software pro profesionály
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-300">
            Duzi Tech s.r.o. vyvíjí praktické AI nástroje pro odborníky, kteří
            potřebují přesnost, rychlost a spolehlivost. Konzultujeme nasazení
            AI ve firmách a vzděláváme týmy.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#sluzby"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-medium text-white transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Co děláme
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-6 py-3.5 text-sm font-medium text-slate-900 transition hover:border-slate-900 dark:border-slate-700 dark:text-slate-100 dark:hover:border-slate-300"
            >
              Kontakt
            </a>
          </div>

          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            Sídlem ve Studénce
            <span aria-hidden="true" className="mx-2">·</span>
            Vyvíjíme od 2026
            <span aria-hidden="true" className="mx-2">·</span>
            IČO {company.ico}
          </p>
        </div>
      </Container>
    </section>
  );
}
