import type { Metadata } from 'next';
import DomFreecellClient from '@/components/DomFreecellClient';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const PAGE_PATH = '/freecell-auf-deutsch/spielen';

export const metadata: Metadata = {
  title: 'FreeCell auf Deutsch Spielen | Kostenlos Online',
  description:
    'Spielen Sie FreeCell auf Deutsch kostenlos online mit deutschen Bedienelementen, nummerierten Partien, Hinweisen, Rueckgaengig und mobilem Spielfeld.',
  keywords: [
    'freecell auf deutsch spielen',
    'freecell kostenlos deutsch',
    'freecell online deutsch',
    'solitaer freecell deutsch',
    'freecell spiel kostenlos',
  ],
  openGraph: {
    title: 'FreeCell auf Deutsch Spielen',
    description:
      'Kostenlose FreeCell-Partien mit deutscher Oberflaeche, Hinweisen, Rueckgaengig und mobilem Spiel ohne Download.',
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      de: absoluteUrl(PAGE_PATH),
      es: absoluteUrl('/freecell-en-espanol/jugar'),
      fr: absoluteUrl('/freecell-en-francais/jouer'),
      it: absoluteUrl('/freecell-in-italiano/gioca'),
      pt: absoluteUrl('/freecell-em-portugues/jogar'),
      en: absoluteUrl('/'),
      'x-default': absoluteUrl('/'),
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function GermanFreeCellPlayPage() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell auf Deutsch',
    description:
      'Kostenloses FreeCell-Spiel online mit deutscher Oberflaeche, Hinweisen, Rueckgaengig und nummerierten Partien.',
    url: absoluteUrl(PAGE_PATH),
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    inLanguage: 'de',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell auf Deutsch', item: absoluteUrl('/freecell-auf-deutsch') },
      { '@type': 'ListItem', position: 3, name: 'Spielen', item: absoluteUrl(PAGE_PATH) },
    ],
  };

  return (
    <>
      <script id="ld-game-freecell-de" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script id="ld-breadcrumb-freecell-de-play" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <h1 className="sr-only">FreeCell auf Deutsch spielen - kostenlos online</h1>
      <DomFreecellClient locale="de" />
    </>
  );
}
