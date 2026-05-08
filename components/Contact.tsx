import { Container } from './Container';
import { SectionEyebrow } from './SectionEyebrow';
import { company } from '@/lib/company';

export function Contact() {
  return (
    <section id="kontakt" className="border-t border-slate-200/70 py-24 sm:py-32 dark:border-slate-800/70">
      <Container>
        <div className="max-w-2xl">
          <SectionEyebrow>Spojte se</SectionEyebrow>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Kontakt
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            Ozvěte se nám e-mailem nebo telefonicky. Rádi probereme váš projekt.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">E-mail</p>
            <a
              href={`mailto:${company.email}`}
              className="mt-2 inline-block text-3xl font-medium text-slate-900 transition hover:text-brand lg:text-4xl dark:text-slate-100"
            >
              {company.email}
            </a>

            <p className="mt-8 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">Telefon</p>
            <a
              href={company.telHref}
              className="mt-2 inline-block text-3xl font-medium text-slate-900 transition hover:text-brand lg:text-4xl dark:text-slate-100"
            >
              {company.tel}
            </a>
          </div>

          <div className="rounded-xl bg-slate-50 p-6 dark:bg-slate-900">
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Adresa</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">
                  {company.address.street}
                  <br />
                  {company.address.zip} {company.address.city}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">IČO</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">{company.ico}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">Spisová značka</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">{company.spisovaZnacka}</dd>
              </div>
              <div>
                <dt className="text-slate-500 dark:text-slate-400">DIČ</dt>
                <dd className="mt-1 font-medium text-slate-900 dark:text-slate-100">{company.dic}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
