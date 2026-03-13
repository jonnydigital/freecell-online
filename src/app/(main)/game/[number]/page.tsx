import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { shouldUseDomEngine } from '@/lib/useDomEngine';
import { dealLookup, sitemapGameNumbers } from '@/lib/curatedDeals';
import GamePage from './GamePage';
import GameDealInfo from './GameDealInfo';
import DomFreecellClient from '@/components/DomFreecellClient';
import ScrollUnlock from '@/components/ScrollUnlock';

interface Props {
  params: Promise<{ number: string }>;
}

const MAX_GAME_NUMBER = 9_999_999;

function parseGameNumber(raw: string): number | null {
  const num = parseInt(raw, 10);
  if (isNaN(num) || num < 1 || num > MAX_GAME_NUMBER || String(num) !== raw) return null;
  return num;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const gameNum = parseGameNumber(number);
  if (!gameNum) return {};

  const deal = dealLookup.get(gameNum);
  const title = deal
    ? `FreeCell Game #${gameNum} - ${deal.label} Deal`
    : `FreeCell Game #${gameNum} - Play Deal ${gameNum.toLocaleString()} Online Free`;
  const description = deal
    ? `Play FreeCell Game #${gameNum} online for free — ${deal.label.toLowerCase()}${deal.difficulty ? ` (${deal.difficulty})` : ''}. Share this specific deal with friends. No download required.`
    : `Play FreeCell deal #${gameNum} online. This specific card layout is the same every time — share it with friends, retry after a loss, or compare strategies. 99.999% of deals are solvable.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/game/${gameNum}`),
      siteName: siteConfig.siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return sitemapGameNumbers.map((num) => ({
    number: String(num),
  }));
}

export default async function Page({ params }: Props) {
  const { number } = await params;
  const gameNum = parseGameNumber(number);
  if (!gameNum) notFound();

  const deal = dealLookup.get(gameNum);
  const gameName = deal
    ? `FreeCell Game #${gameNum} - ${deal.label}`
    : `FreeCell Game #${gameNum}`;
  const gameDescription = deal
    ? `FreeCell deal #${gameNum}: ${deal.label.toLowerCase()}${deal.difficulty ? ` (${deal.difficulty})` : ''}. Play online for free.`
    : `Play FreeCell Game #${gameNum} online for free.`;

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Game',
      name: gameName,
      description: gameDescription,
      numberOfPlayers: 1,
      genre: 'Card Game',
      gamePlatform: 'Web Browser',
      url: absoluteUrl(`/game/${gameNum}`),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 2, name: 'FreeCell', item: absoluteUrl('/') },
        { '@type': 'ListItem', position: 3, name: `Game #${gameNum}`, item: absoluteUrl(`/game/${gameNum}`) },
      ],
    },
  ];

  const useDom = shouldUseDomEngine();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {useDom ? <DomFreecellClient initialGameNumber={gameNum} /> : <GamePage gameNumber={gameNum} />}
      <ScrollUnlock />
      <GameDealInfo gameNum={gameNum} deal={deal} />
    </>
  );
}
