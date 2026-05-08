import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { company, formattedAddress } from '@/lib/company';

export const metadata: Metadata = {
  title: 'Ochrana osobních údajů',
  description:
    'Zásady ochrany osobních údajů Duzi Tech s.r.o. — jaké údaje zpracováváme a vaše práva podle GDPR.',
  alternates: { canonical: '/ochrana-osobnich-udaju' },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <article className="border-b border-slate-200/70 py-24 sm:py-32">
          <Container>
            <div className="mx-auto max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Ochrana osobních údajů
              </h1>

              <div className="mt-12 space-y-12 text-base leading-relaxed text-slate-600">
                <section>
                  <h2 className="text-xl font-semibold text-slate-900">Správce údajů</h2>
                  <p className="mt-3">
                    {company.name}, IČO {company.ico}, sídlo {formattedAddress},
                    zapsaná {company.spisovaZnacka}.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Jaké údaje zpracováváme
                  </h2>
                  <p className="mt-3">
                    Tato webová prezentace nesbírá žádné osobní údaje
                    návštěvníků. Nepoužíváme analytické nástroje, neukládáme
                    cookies kromě technicky nezbytných (pokud nějaké), nemáme
                    kontaktní formuláře.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Kontakt na správce
                  </h2>
                  <p className="mt-3">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-brand hover:decoration-brand"
                    >
                      {company.email}
                    </a>
                    , <a
                      href={company.telHref}
                      className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-brand hover:decoration-brand"
                    >
                      {company.tel}
                    </a>
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900">Vaše práva</h2>
                  <p className="mt-3">
                    V souladu s GDPR máte právo na přístup k údajům, jejich
                    opravu, výmaz, omezení zpracování, přenositelnost a vznesení
                    námitky. Pro uplatnění práv kontaktujte{' '}
                    <a
                      href={`mailto:${company.email}`}
                      className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-brand hover:decoration-brand"
                    >
                      {company.email}
                    </a>
                    .
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900">Dozorový orgán</h2>
                  <p className="mt-3">
                    Úřad pro ochranu osobních údajů (ÚOOÚ),{' '}
                    <a
                      href="https://www.uoou.cz"
                      className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-brand hover:decoration-brand"
                      rel="noopener noreferrer"
                    >
                      www.uoou.cz
                    </a>
                    , Pplk. Sochora 27, 170 00 Praha 7.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-slate-900">Účinnost</h2>
                  <p className="mt-3">
                    Tyto zásady jsou účinné od spuštění webu. Aktuální verze je
                    vždy dostupná na{' '}
                    <Link
                      href="/ochrana-osobnich-udaju"
                      className="text-slate-900 underline decoration-slate-300 underline-offset-4 transition hover:text-brand hover:decoration-brand"
                    >
                      duzi.tech/ochrana-osobnich-udaju
                    </Link>
                    .
                  </p>
                </section>

                <p className="pt-4">
                  <Link href="/" className="text-sm font-medium text-brand hover:text-brand-dark">
                    ← Zpět na hlavní stránku
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}
