import Link from 'next/link';
import { Container } from './Container';
import { company } from '@/lib/company';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <p className="text-base font-medium text-slate-900 dark:text-slate-100">
              <span className="font-bold">Duzi</span>
              <span className="font-light"> Tech</span>
              <span className="font-medium"> s.r.o.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {company.tagline}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Kontakt
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="text-slate-700 transition hover:text-brand dark:text-slate-300"
                >
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={company.telHref}
                  className="text-slate-700 transition hover:text-brand dark:text-slate-300"
                >
                  {company.tel}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Právní
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/ochrana-osobnich-udaju"
                  className="text-slate-700 transition hover:text-brand dark:text-slate-300"
                >
                  Ochrana osobních údajů
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:text-slate-400">
          <p>© {year} {company.name}</p>
          <p>
            IČO {company.ico}
            <span aria-hidden="true" className="mx-2">·</span>
            {company.spisovaZnacka}
            <span aria-hidden="true" className="mx-2">·</span>
            DIČ {company.dic}
          </p>
        </div>
      </Container>
    </footer>
  );
}
