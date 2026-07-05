import type { Metadata } from 'next';
import DomFreecellClient from '@/components/DomFreecellClient';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

const PAGE_PATH = '/freecell-em-portugues/jogar';

export const metadata: Metadata = {
  title: 'Jogar FreeCell em Portugues | Gratis Online',
  description:
    'Jogue FreeCell em portugues gratis online com controles traduzidos, partidas numeradas, dicas, desfazer e tabuleiro mobile.',
  keywords: [
    'jogar freecell em portugues',
    'freecell gratis portugues',
    'freecell online portugues',
    'solitario freecell portugues',
    'jogo freecell gratis',
  ],
  openGraph: {
    title: 'Jogar FreeCell em Portugues',
    description:
      'Partidas gratis de FreeCell com interface em portugues, dicas, desfazer e jogo mobile sem download.',
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: 'website',
  },
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
    languages: {
      pt: absoluteUrl(PAGE_PATH),
      it: absoluteUrl('/freecell-in-italiano/gioca'),
      es: absoluteUrl('/freecell-en-espanol/jugar'),
      fr: absoluteUrl('/freecell-en-francais/jouer'),
      de: absoluteUrl('/freecell-auf-deutsch/spielen'),
      en: absoluteUrl('/'),
      'x-default': absoluteUrl('/'),
    },
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function PortugueseFreeCellPlayPage() {
  const gameJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Game',
    name: 'FreeCell em Portugues',
    description:
      'Jogo gratuito de FreeCell online com interface em portugues, dicas, desfazer e partidas numeradas.',
    url: absoluteUrl(PAGE_PATH),
    applicationCategory: 'Game',
    operatingSystem: 'Web Browser',
    inLanguage: 'pt',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'FreeCell em Portugues', item: absoluteUrl('/freecell-em-portugues') },
      { '@type': 'ListItem', position: 3, name: 'Jogar', item: absoluteUrl(PAGE_PATH) },
    ],
  };

  return (
    <>
      <script id="ld-game-freecell-pt" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gameJsonLd) }} />
      <script id="ld-breadcrumb-freecell-pt-play" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <h1 className="sr-only">Jogar FreeCell em portugues - gratis online</h1>
      <DomFreecellClient locale="pt" />
    </>
  );
}
