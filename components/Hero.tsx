import { Container } from './Container';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(29,158,117,0.08),transparent_70%)]"
      />
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Stavíme AI software pro profesionály
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
            Duzi Tech s.r.o. vyvíjí praktické AI nástroje pro odborníky, kteří
            potřebují přesnost, rychlost a spolehlivost. Konzultujeme nasazení
            AI ve firmách a vzděláváme týmy.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#sluzby"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Co děláme
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold text-slate-900 transition hover:text-brand"
            >
              Kontakt <span aria-hidden="true" className="ml-1">→</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
