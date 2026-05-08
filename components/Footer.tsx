import Link from 'next/link';
import { Container } from './Container';
import { company } from '@/lib/company';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            © {year} {company.name} | Všechna práva vyhrazena
          </p>
          <nav aria-label="Patička">
            <Link
              href="/ochrana-osobnich-udaju"
              className="text-sm text-slate-600 transition hover:text-brand"
            >
              Ochrana osobních údajů
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          {company.name}, IČO {company.ico}, sídlo {company.address.street},{' '}
          {company.address.zip} {company.address.city}, zapsaná v obchodním
          rejstříku pod sp. zn. {company.spisovaZnacka}.
        </p>
      </Container>
    </footer>
  );
}
