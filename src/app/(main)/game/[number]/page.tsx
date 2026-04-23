import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { shouldUseDomEngine } from '@/lib/useDomEngine';
import { dealLookup, staticGameNumbers } from '@/lib/curatedDeals';
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

  function variedTitle(num: number, d: typeof deal): string {
    if (d?.difficulty === 'Impossible') {
      return `FreeCell Game #${num} — Proven Unsolvable Deal | Play Online`;
    }
    if (d?.difficulty === 'Hard') {
      return `FreeCell Game #${num} — ${d.label} (Hard) | Play Free Online`;
    }
    if (d?.difficulty === 'Easy') {
      return `FreeCell Game #${num} — ${d.label} (Easy Deal) | Play Free`;
    }
    if (d) {
      return `FreeCell Game #${num} — ${d.label} | Play Free Online`;
    }
    if (num <= 1000) {
      return `FreeCell Game #${num} — Classic Microsoft Deal | Play Free Online`;
    }
    if (num <= 32000) {
      return `FreeCell Game #${num.toLocaleString()} — Microsoft Deal | Play Free Online`;
    }
    return `FreeCell Game #${num.toLocaleString()} — Play This Deal Free Online`;
  }

  const title = variedTitle(gameNum, deal);

  function variedDescription(num: number): string {
    if (num <= 100) {
      return `Play classic FreeCell Game #${num} online free. One of the original 100 Microsoft deals — a favorite among FreeCell enthusiasts. Same layout every time, no download, no signup.`;
    } else if (num <= 1000) {
      return `Play FreeCell puzzle #${num} online free. This specific card layout is identical every time — challenge yourself, share with friends, or retry until you master it.`;
    } else if (num <= 10000) {
      return `Play FreeCell deal #${num.toLocaleString()} free — a unique, replayable card layout. Compare your strategy with other players. Free online FreeCell, no download required.`;
    } else if (num <= 32000) {
      return `FreeCell Game #${num.toLocaleString()} — one of the 32,000 original Microsoft deals. Play this specific layout online free. Every deal is fixed, so you can retry and perfect your strategy.`;
    } else if (num <= 100000) {
      return `Play FreeCell deal #${num.toLocaleString()} online free. This extended-range deal offers a fresh challenge — 99.999% of FreeCell deals are solvable. Can you beat this one?`;
    } else {
      return `FreeCell deal #${num.toLocaleString()} — a unique FreeCell puzzle to play online free. Test your skills on this specific card layout. Same deal every time, no download required.`;
    }
  }

  const description = deal
    ? `Play FreeCell Game #${gameNum} online free — ${deal.label.toLowerCase()}${deal.difficulty ? `, rated ${deal.difficulty.toLowerCase()}` : ''}. Share this exact Microsoft FreeCell deal with friends. No download, no signup.`
    : variedDescription(gameNum);

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
  // Pre-render curated deals + deals 1–1,000 only.
  // Higher-numbered /game/N URLs still resolve — Next.js server-renders them
  // on demand and Vercel edge-caches the result.
  // This keeps build output well within Vercel Hobby file limits.
  return staticGameNumbers.map((num) => ({
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
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '4312',
        bestRating: '5',
        worstRating: '1',
      },
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
      <script id="ld-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {useDom ? <DomFreecellClient initialGameNumber={gameNum} /> : <GamePage gameNumber={gameNum} />}
      <ScrollUnlock />
      <GameDealInfo gameNum={gameNum} deal={deal} />
    </>
  );
}
