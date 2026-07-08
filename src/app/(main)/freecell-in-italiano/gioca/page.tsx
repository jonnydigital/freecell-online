import type { Metadata } from 'next';
import DomFreecellClient from '@/components/DomFreecellClient';
import HtmlLang from '@/components/HtmlLang';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const PAGE_PATH = '/freecell-in-italiano/gioca';

export const metadata: Metadata = {
  title: 'Gioca a FreeCell in Italiano | Gratis Online',
  description:
    'Gioca a FreeCell in italiano gratis online con controlli tradotti, partite numerate, aiuti, annulla e tavolo mobile.',
  keywords: [
    'gioca freecell in italiano',
    'freecell gratis italiano',
    'freecell online italiano',
    'solitario freecell italiano',
    'gioco freecell gratis',
  ],
  openGraph: {
    title: 'Gioca a FreeCell in Italiano',
    description:
      'Partite gratuite di FreeCell con interfaccia in italiano, aiuti, annulla e gioco mobile senza download.',
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      it: absoluteUrl(PAGE_PATH),
      es: absoluteUrl('/freecell-en-espanol/jugar'),
      fr: absoluteUrl('/freecell-en-francais/jouer'),
      de: absoluteUrl('/freecell-auf-deutsch/spielen'),
      pt: absoluteUrl('/freecell-em-portugues/jogar'),
      en: absoluteUrl('/'),
      'x-default': absoluteUrl('/'),
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function ItalianFreeCellPlayPage() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell in Italiano',
    description:
      'Gioco gratuito di FreeCell online con interfaccia in italiano, aiuti, annulla e partite numerate.',
    url: absoluteUrl(PAGE_PATH),
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    inLanguage: 'it',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell in Italiano', item: absoluteUrl('/freecell-in-italiano') },
      { '@type': 'ListItem', position: 3, name: 'Gioca', item: absoluteUrl(PAGE_PATH) },
    ],
  };

  return (
    <>
      <HtmlLang lang="it" />
      <script id="ld-game-freecell-it" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script id="ld-breadcrumb-freecell-it-play" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <h1 className="sr-only">Gioca a FreeCell in italiano - gratis online</h1>
      <DomFreecellClient locale="it" />
    </>
  );
}
