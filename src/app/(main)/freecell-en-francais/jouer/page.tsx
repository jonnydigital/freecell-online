import type { Metadata } from 'next';
import DomFreecellClient from '@/components/DomFreecellClient';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const PAGE_PATH = '/freecell-en-francais/jouer';

export const metadata: Metadata = {
  title: 'Jouer a FreeCell en Francais | Gratuit en Ligne',
  description:
    'Jouez a FreeCell en francais gratuitement en ligne avec controles traduits, parties numerotees, indices, annulation et tableau mobile.',
  keywords: [
    'jouer freecell en francais',
    'freecell gratuit francais',
    'freecell en ligne francais',
    'solitaire freecell francais',
    'jeu freecell gratuit',
  ],
  openGraph: {
    title: 'Jouer a FreeCell en Francais',
    description:
      'Parties gratuites de FreeCell avec controles en francais, indices, annulation et jeu mobile sans telechargement.',
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      fr: absoluteUrl(PAGE_PATH),
      es: absoluteUrl('/freecell-en-espanol/jugar'),
      en: absoluteUrl('/'),
      'x-default': absoluteUrl('/'),
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function FrenchFreeCellPlayPage() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell en Francais',
    description:
      'Jeu gratuit de FreeCell en ligne avec interface en francais, indices, annulation et parties numerotees.',
    url: absoluteUrl(PAGE_PATH),
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    inLanguage: 'fr',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell en Francais', item: absoluteUrl('/freecell-en-francais') },
      { '@type': 'ListItem', position: 3, name: 'Jouer', item: absoluteUrl(PAGE_PATH) },
    ],
  };

  return (
    <>
      <script id="ld-game-freecell-fr" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script id="ld-breadcrumb-freecell-fr-play" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <h1 className="sr-only">Jouer a FreeCell en Francais — Gratuit en Ligne</h1>
      <DomFreecellClient locale="fr" />
    </>
  );
}
