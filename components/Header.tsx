import Link from 'next/link';
import { Container } from './Container';
import { Logo } from './Logo';
import { company } from '@/lib/company';

const navLinks = [
  { href: '#sluzby', label: 'Co děláme' },
  { href: '#ai-v-praxi', label: 'AI v praxi' },
  { href: '#o-firme', label: 'O firmě' },
  { href: '#kontakt', label: 'Kontakt' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-0.5 text-lg tracking-tight text-slate-900"
        >
          <Logo size={56} />
          <span>
            <span className="font-bold">Duzi</span>
            <span className="font-light"> Tech</span>
          </span>
        </Link>

        <input id="nav-toggle" type="checkbox" className="peer hidden" aria-label="Otevřít menu" />

        <nav
          aria-label="Hlavní navigace"
          className="absolute left-0 right-0 top-20 hidden flex-col gap-1 border-b border-slate-200 bg-white p-4 peer-checked:flex md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-brand md:px-0 md:py-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <label
          htmlFor="nav-toggle"
          className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </label>
      </Container>
    </header>
  );
}
