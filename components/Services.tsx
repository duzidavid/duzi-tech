import { Container } from './Container';
import { ServiceCard } from './ServiceCard';

const services = [
  {
    title: 'AI Software Development',
    description:
      'Vyvíjíme AI aplikace na míru pro specifické profesní domény. Specializace na právo, ale rozšiřujeme do dalších odvětví.',
  },
  {
    title: 'IT Konzultace',
    description:
      'Pomáháme firmám integrovat AI smysluplně. Architektura, výběr modelů, GDPR a EU AI Act compliance, prompt engineering.',
  },
  {
    title: 'Školení & vzdělávání',
    description:
      'Praktické kurzy práce s AI nástroji pro odborné týmy. Lektorská činnost.',
  },
];

export function Services() {
  return (
    <section id="sluzby" className="border-t border-slate-200/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Co děláme
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Tři oblasti, ve kterých přinášíme firmám měřitelnou hodnotu.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}
