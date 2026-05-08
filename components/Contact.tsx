import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';
import { company } from '@/lib/company';

export function Contact() {
  return (
    <section id="kontakt" className="border-t border-slate-200/70 py-24 sm:py-32">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Spojte se</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Kontakt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Ozvěte se nám e-mailem nebo telefonicky. Rádi probereme váš projekt.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">E-mail</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 inline-block text-3xl font-medium text-slate-900 transition hover:text-brand lg:text-4xl"
            >
              {company.email}
            </a>

            <p className="mt-8 text-xs font-medium uppercase tracking-wider text-slate-500">Telefon</p>
            <a
              href={company.telHref}
              className="mt-2 inline-block text-3xl font-medium text-slate-900 transition hover:text-brand lg:text-4xl"
            >
              {company.tel}
            </a>
          </div>

          <div className="rounded-xl bg-slate-50 p-6">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-500">Adresa</dt>
                <dd className="mt-1 font-medium text-slate-900">
                  {company.address.street}
                  <br />
                  {company.address.zip} {company.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">IČO</dt>
                <dd className="mt-1 font-medium text-slate-900">{company.ico}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Spisová značka</dt>
                <dd className="mt-1 font-medium text-slate-900">{company.spisovaZnacka}</dd>
              </div>
              <div>
                <dt className="text-slate-500">DIČ</dt>
                <dd className="mt-1 font-medium text-slate-900">{company.dic}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
