import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { company, formattedAddress } from '@/lib/company';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.shortName} — ${company.tagline}`,
    template: `%s — ${company.shortName}`,
  },
  description:
    'Duzi Tech s.r.o. vyvíjí praktické AI nástroje pro odborníky, kteří potřebují přesnost, rychlost a spolehlivost. Konzultujeme nasazení AI ve firmách a vzděláváme týmy.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'cs_CZ',
    url: company.url,
    siteName: company.shortName,
    title: `${company.shortName} — ${company.tagline}`,
    description:
      'Vyvíjíme AI software pro profesionály. Konzultace a školení v oblasti AI pro firmy.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.shortName} — ${company.tagline}`,
    description: 'AI software, konzultace a školení pro profesionální týmy.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1D9E75',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: company.url,
  email: company.email,
  telephone: company.tel,
  address: {
    '@type': 'PostalAddress',
    streetAddress: company.address.street,
    postalCode: company.address.zip,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  identifier: company.ico,
  description: `${company.tagline}. ${formattedAddress}.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="bg-white text-slate-900 font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
