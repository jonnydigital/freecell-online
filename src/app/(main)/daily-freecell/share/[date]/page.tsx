import { Metadata } from 'next';
import Link from 'next/link';
import { getDailySeed } from '@/lib/dailyChallenge';
import { siteConfig } from '@/lib/siteConfig';

interface Props {
  params: Promise<{ date: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { date } = await params;
  const seed = getDailySeed(date);

  let displayDate = date;
  try {
    const d = new Date(date + 'T12:00:00');
    displayDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    // Use raw date as fallback
  }

  return {
    title: `FreeCell Daily #${seed} — ${displayDate} | ${siteConfig.siteName}`,
    description: `Can you beat FreeCell Daily Challenge #${seed} for ${displayDate}? Play the daily FreeCell challenge and compare your results!`,
    openGraph: {
      title: `FreeCell Daily #${seed} — ${displayDate}`,
      description: `Can you beat FreeCell Daily Challenge #${seed}? Play the daily FreeCell challenge and compare your results!`,
      url: `${siteConfig.url}/daily-freecell/share/${date}`,
      siteName: siteConfig.siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `FreeCell Daily #${seed} — ${displayDate}`,
      description: `Can you beat FreeCell Daily Challenge #${seed}?`,
    },
  };
}

export default async function DailySharePage({ params }: Props) {
  const { date } = await params;
  const seed = getDailySeed(date);

  let displayDate = date;
  try {
    const d = new Date(date + 'T12:00:00');
    displayDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    // Use raw date as fallback
  }

  return (
    <div className="min-h-screen bg-[#0d2f0d] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Card */}
        <div className="bg-[#0a3d0a] border border-[#2a7c2a]/50 rounded-2xl shadow-2xl p-8">
          {/* Daily badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-4">
            <span className="text-sm">📅</span>
            <span className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
              Daily Challenge
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            🃏 FreeCell Daily #{seed}
          </h1>

          <p className="text-white/50 text-sm mb-6">{displayDate}</p>

          {/* Suit indicators */}
          <div className="flex justify-center gap-3 mb-6">
            {['♠', '♥', '♦', '♣'].map((suit, i) => (
              <div
                key={suit}
                className="w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-bold"
                style={{
                  background: '#1a5c1a',
                  color: i === 1 || i === 2 ? '#c83232' : '#e0e0e0',
                }}
              >
                {suit}
              </div>
            ))}
          </div>

          <p className="text-white/60 text-sm mb-8">
            Think you can beat this daily challenge? Play it now and see how you stack up!
          </p>

          {/* CTA */}
          <Link
            href="/daily-freecell"
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-xl transition-colors text-lg"
          >
            Play Today&apos;s Daily Challenge
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 mt-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white font-semibold rounded-xl transition-colors"
          >
            Play Free FreeCell
          </Link>
        </div>

        {/* Footer */}
        <p className="text-white/20 text-xs mt-6">
          {siteConfig.siteName} — Free online FreeCell, no download required.
        </p>
      </div>
    </div>
  );
}
