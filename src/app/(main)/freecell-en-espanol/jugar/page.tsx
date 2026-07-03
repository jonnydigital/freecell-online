import type { Metadata } from 'next';
import DomFreecellClient from '@/components/DomFreecellClient';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const PAGE_PATH = '/freecell-en-espanol/jugar';

export const metadata: Metadata = {
  title: 'Jugar FreeCell en Espanol | Gratis Online',
  description:
    'Juega FreeCell en espanol gratis online con controles traducidos, partidas numeradas, pistas, deshacer y tablero movil.',
  keywords: [
    'jugar freecell en espanol',
    'freecell gratis espanol',
    'freecell online espanol',
    'solitario freecell espanol',
    'juego freecell gratis',
  ],
  openGraph: {
    title: 'Jugar FreeCell en Espanol',
    description:
      'Partidas gratis de FreeCell con controles en espanol, pistas, deshacer y juego movil sin descarga.',
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      es: absoluteUrl(PAGE_PATH),
      fr: absoluteUrl('/freecell-en-francais/jouer'),
      en: absoluteUrl('/'),
      'x-default': absoluteUrl('/'),
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function SpanishFreeCellPlayPage() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell en Espanol',
    description:
      'Juego gratis de FreeCell online con interfaz en espanol, pistas, deshacer y partidas numeradas.',
    url: absoluteUrl(PAGE_PATH),
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    inLanguage: 'es',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell en Espanol', item: absoluteUrl('/freecell-en-espanol') },
      { '@type': 'ListItem', position: 3, name: 'Jugar', item: absoluteUrl(PAGE_PATH) },
    ],
  };

  return (
    <>
      <script id="ld-game-freecell-es" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script id="ld-breadcrumb-freecell-es-play" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <h1 className="sr-only">Jugar a FreeCell en Espanol — Gratis Online</h1>
      <DomFreecellClient locale="es" />
    </>
  );
}
