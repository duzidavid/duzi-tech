import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';

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
      'Stavíme produkty pro odborníky v regulovaných oborech. Přesnost a spolehlivost jsou pro nás nepřekročitelné.',
  },
];

export function About() {
  return (
    <section id="o-firme" className="border-t border-slate-200/70 bg-slate-50/50 py-24 sm:py-32">
      <Container>
        <div className="max-w-3xl">
          <SectionEyebrow>Profil</SectionEyebrow>
          <h2 className="mb-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            O firmě
          </h2>
          <p className="text-lg leading-relaxed text-slate-600">
            Duzi Tech s.r.o. je česká AI software společnost se sídlem ve
            Studénce. Stavíme produkty, které lidem v náročných profesích šetří
            čas a zlepšují výsledky jejich práce. Věříme, že AI má sloužit
            odborníkům — ne je nahrazovat.
          </p>
        </div>

        <dl className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title}>
              <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-500">
                {String(i + 1).padStart(2, '0')}
              </div>
              <dt className="text-lg font-medium text-slate-900">{v.title}</dt>
              <dd className="mt-2 text-base leading-relaxed text-slate-600">{v.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
