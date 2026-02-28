import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GamePage from './GamePage';

interface Props {
  params: Promise<{ number: string }>;
}

function parseGameNumber(raw: string): number | null {
  const num = parseInt(raw, 10);
  if (isNaN(num) || num < 1 || num > 1000000 || String(num) !== raw) return null;
  return num;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { number } = await params;
  const gameNum = parseGameNumber(number);
  if (!gameNum) return {};

  const title = `FreeCell Game #${gameNum} - Play This Deal Online`;
  const description = `Play FreeCell Game #${gameNum} online for free. Share this specific deal with friends and see if they can solve it. No download required.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://playfreecellonline.com/game/${gameNum}`,
      siteName: 'PlayFreeCellOnline.com',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateStaticParams() {
  return Array.from({ length: 100 }, (_, i) => ({
    number: String(i + 1),
  }));
}

export default async function Page({ params }: Props) {
  const { number } = await params;
  const gameNum = parseGameNumber(number);
  if (!gameNum) notFound();

  return <GamePage gameNumber={gameNum} />;
}
