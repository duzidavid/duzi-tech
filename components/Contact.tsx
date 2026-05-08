import { Container } from './Container';
import { company } from '@/lib/company';

export function Contact() {
  return (
    <section id="kontakt" className="border-t border-slate-200/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Kontakt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Ozvěte se nám e-mailem nebo telefonicky. Rádi probereme váš projekt.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">E-mail</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 inline-block text-2xl font-semibold text-slate-900 transition hover:text-brand sm:text-3xl"
            >
              {company.email}
            </a>

            <p className="mt-10 text-sm font-medium uppercase tracking-wider text-slate-500">Telefon</p>
            <a
              href={company.telHref}
              className="mt-2 inline-block text-2xl font-semibold text-slate-900 transition hover:text-brand sm:text-3xl"
            >
              {company.tel}
            </a>
          </div>

          <div className="text-base leading-relaxed text-slate-600">
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">Sídlo</p>
            <address className="mt-2 not-italic text-slate-900">
              {company.name}
              <br />
              {company.address.street}
              <br />
              {company.address.zip} {company.address.city}
            </address>

            <dl className="mt-10 space-y-3 text-sm">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-slate-500">IČO:</dt>
                <dd className="text-slate-900">{company.ico}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-slate-500">Spisová značka:</dt>
                <dd className="text-slate-900">{company.spisovaZnacka}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium text-slate-500">DIČ:</dt>
                <dd className="text-slate-600">{company.dic}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
