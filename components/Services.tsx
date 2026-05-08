import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';
import { ServiceCard } from './ServiceCard';

const iconCode = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D9E75"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const iconChat = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D9E75"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const iconCap = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#1D9E75"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const services = [
  {
    title: 'AI Software Development',
    description:
      'Vyvíjíme AI aplikace na míru pro specifické profesní domény. Specializace na právo, ale rozšiřujeme do dalších odvětví.',
    icon: iconCode,
  },
  {
    title: 'IT Konzultace',
    description:
      'Pomáháme firmám integrovat AI smysluplně. Architektura, výběr modelů, GDPR a EU AI Act compliance, prompt engineering.',
    icon: iconChat,
  },
  {
    title: 'Školení & vzdělávání',
    description:
      'Praktické kurzy práce s AI nástroji pro odborné týmy. Lektorská činnost.',
    icon: iconCap,
  },
];

export function Services() {
  return (
    <section id="sluzby" className="border-t border-slate-200/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Služby</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Co děláme
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Vyvíjíme, radíme a vzděláváme.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.description} icon={s.icon} />
          ))}
        </div>
      </Container>
    </section>
  );
}
