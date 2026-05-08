import { Container } from './Container';

const values = [
  {
    title: 'Pragmatičnost',
    description:
      'Stavíme nástroje, které řeší konkrétní problémy v konkrétních profesích. Žádné AI hype.',
  },
  {
    title: 'Privacy by design',
    description:
      'Ochrana dat a GDPR compliance jsou součást architektury, ne addon na konec.',
  },
  {
    title: 'Profesní důvěryhodnost',
    description:
      'Naše produkty používají odborníci v regulovaných oborech. Přesnost a spolehlivost jsou nepřekročitelné.',
  },
];

export function About() {
  return (
    <section id="o-firme" className="border-t border-slate-200/70 bg-slate-50/50 py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            O firmě
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Duzi Tech s.r.o. je česká AI software společnost se sídlem ve
            Studénce. Stavíme produkty, které lidem v náročných profesích šetří
            čas a zlepšují výsledky jejich práce. Věříme, že AI má sloužit
            odborníkům — ne je nahrazovat.
          </p>
        </div>

        <dl className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="border-l-2 border-brand pl-6">
              <dt className="text-base font-semibold text-slate-900">{v.title}</dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-600">{v.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
