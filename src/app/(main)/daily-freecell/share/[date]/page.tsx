import { Metadata } from 'next';
import Link from 'next/link';
import { getDailySeed, formatTime } from '@/lib/dailyChallenge';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';

interface Props {
  params: Promise<{ date: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstStr(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v;
}

function parseStats(sp: Record<string, string | string[] | undefined>) {
  const time = Number(firstStr(sp.t) ?? NaN);
  const moves = Number(firstStr(sp.m) ?? NaN);
  const hints = Number(firstStr(sp.h) ?? 0);
  const streak = Number(firstStr(sp.s) ?? 0);
  const hasStats = Number.isFinite(time) && Number.isFinite(moves);
  return { hasStats, time, moves, hints, streak };
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { date } = await params;
  const sp = await searchParams;
  const { hasStats, time, moves, hints, streak } = parseStats(sp);
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

  // Build dynamic OG image URL that bakes in the player's stats so every
  // Wordle-style paste to Slack/iMessage/Twitter renders a rich card.
  const ogParams = new URLSearchParams({ date });
  if (hasStats) {
    ogParams.set('t', String(time));
    ogParams.set('m', String(moves));
    if (hints) ogParams.set('h', String(hints));
    if (streak) ogParams.set('s', String(streak));
  }
  const ogImageUrl = absoluteUrl(`/api/og/daily-result?${ogParams.toString()}`);

  const title = hasStats
    ? `I solved FreeCell Daily #${seed} in ${formatTime(time)}, ${moves} moves`
    : `FreeCell Daily #${seed} — ${displayDate}`;
  const description = hasStats
    ? `Solved in ${formatTime(time)} with ${moves} moves. Can you beat it? Play the daily FreeCell challenge.`
    : `Can you beat FreeCell Daily Challenge #${seed} for ${displayDate}? Play the daily FreeCell challenge and compare your results!`;

  const shareUrl = `${siteConfig.url}/daily-freecell/share/${date}${
    hasStats ? `?${ogParams.toString().replace(/date=[^&]+&?/, '')}` : ''
  }`;

  return {
    title: `${title} | ${siteConfig.siteName}`,
    description,
    openGraph: {
      title,
      description,
      url: shareUrl,
      siteName: siteConfig.siteName,
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function DailySharePage({ params, searchParams }: Props) {
  const { date } = await params;
  const sp = await searchParams;
  const { hasStats, time, moves, hints, streak } = parseStats(sp);
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

          {hasStats ? (
            <div className="mb-6">
              <div className="flex justify-center gap-6 mb-4">
                <div>
                  <div className="text-3xl font-bold text-white">{formatTime(time)}</div>
                  <div className="text-xs text-[#D4AF37] tracking-wider">TIME</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{moves}</div>
                  <div className="text-xs text-[#D4AF37] tracking-wider">MOVES</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#D4AF37]">
                    {moves <= 60 ? '★★★' : moves <= 90 ? '★★' : '★'}
                  </div>
                  <div className="text-xs text-[#D4AF37] tracking-wider">STARS</div>
                </div>
              </div>
              {streak >= 2 && (
                <p className="text-sm text-[#D4AF37]">🔥 {streak}-day streak</p>
              )}
              {hints > 0 && (
                <p className="text-xs text-white/40 mt-1">{hints} hint{hints === 1 ? '' : 's'} used</p>
              )}
            </div>
          ) : (
            <>
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
            </>
          )}

          <p className="text-white/60 text-sm mb-8">
            {hasStats
              ? 'Think you can beat this? Play the same daily challenge now!'
              : 'Think you can beat this daily challenge? Play it now and see how you stack up!'}
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
