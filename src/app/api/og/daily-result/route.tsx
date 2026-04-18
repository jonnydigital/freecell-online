/**
 * Dynamic OG image for a daily-challenge result share.
 *
 * GET /api/og/daily-result?date=YYYY-MM-DD&t=<seconds>&m=<moves>&h=<hints>&s=<streak>
 *
 * `date` is required. All stat params optional — when absent, falls back to a
 * "come play this" card (the same look the convention-based /daily-freecell/
 * share/[date]/opengraph-image.tsx renders).
 *
 * Powers the Wordle-loop share mechanic: the share text links to
 * /daily-freecell/share/{date}?t=...&m=...&h=... and the share page's
 * <meta og:image> points here with the same stats, so every paste into
 * Slack/iMessage/Twitter/etc renders a rich card of the player's run.
 */

import { ImageResponse } from 'next/og';
import { getDailySeed } from '@/lib/dailyChallenge';

export const runtime = 'edge';

const WIDTH = 1200;
const HEIGHT = 630;

function fmtTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function starsFor(moves: number): string {
  if (moves <= 60) return '★★★';
  if (moves <= 90) return '★★';
  return '★';
}

/** Compact emoji grid — matches getEmojiGrid semantics in dailyChallenge.ts. */
function emojiGrid(moves: number, time: number, hints: number): string {
  const row1 = moves <= 60 ? '🟩🟩🟩' : moves <= 90 ? '🟨🟨🟨' : '⬜⬜⬜';
  const row2 = time <= 180 ? '🟩🟩🟩' : time <= 300 ? '🟨🟨🟨' : '⬜⬜⬜';
  const row3 = hints === 0 ? '🟩🟩🟩' : hints <= 2 ? '🟨🟨🟨' : '⬜⬜⬜';
  return `${row1}\n${row2}\n${row3}`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') ?? '';
  const time = Number(searchParams.get('t') ?? NaN);
  const moves = Number(searchParams.get('m') ?? NaN);
  const hints = Number(searchParams.get('h') ?? 0);
  const streak = Number(searchParams.get('s') ?? 0);

  const hasStats = Number.isFinite(time) && Number.isFinite(moves);
  const seed = date ? getDailySeed(date) : 0;

  let displayDate = date;
  try {
    if (date) {
      const d = new Date(date + 'T12:00:00');
      displayDate = d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }
  } catch {
    /* keep raw */
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #0a3d0a 0%, #072907 50%, #0a3d0a 100%)',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            border: '2px solid rgba(212, 175, 55, 0.35)',
            borderRadius: 16,
            display: 'flex',
          }}
        />

        {/* Top badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '8px 24px',
            background: 'rgba(212, 175, 55, 0.15)',
            borderRadius: 40,
            border: '1px solid rgba(212, 175, 55, 0.35)',
            marginBottom: 8,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: '#D4AF37',
              fontWeight: 600,
              letterSpacing: '2px',
            }}
          >
            {hasStats ? 'I SOLVED IT' : 'DAILY CHALLENGE'}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-1px',
            display: 'flex',
            marginTop: 4,
          }}
        >
          FreeCell Daily #{seed}
        </div>

        <div
          style={{
            width: 240,
            height: 3,
            background:
              'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '14px 0 10px',
            display: 'flex',
          }}
        />

        <div
          style={{
            fontSize: 26,
            color: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
          }}
        >
          {displayDate}
        </div>

        {hasStats ? (
          <>
            {/* Stats row */}
            <div
              style={{
                display: 'flex',
                gap: 40,
                marginTop: 26,
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 44, color: '#ffffff', fontWeight: 700 }}>
                  {fmtTime(time)}
                </div>
                <div style={{ fontSize: 18, color: '#D4AF37', letterSpacing: 2 }}>
                  TIME
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 44, color: '#ffffff', fontWeight: 700 }}>
                  {moves}
                </div>
                <div style={{ fontSize: 18, color: '#D4AF37', letterSpacing: 2 }}>
                  MOVES
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 44, color: '#D4AF37', fontWeight: 700 }}>
                  {starsFor(moves)}
                </div>
                <div style={{ fontSize: 18, color: '#D4AF37', letterSpacing: 2 }}>
                  STARS
                </div>
              </div>
            </div>

            {/* Emoji grid */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 22,
                fontSize: 30,
                lineHeight: 1.0,
                letterSpacing: 4,
                color: '#ffffff',
                whiteSpace: 'pre',
              }}
            >
              {emojiGrid(moves, time, hints)}
            </div>

            {streak >= 2 && (
              <div
                style={{
                  fontSize: 20,
                  color: '#D4AF37',
                  marginTop: 14,
                  display: 'flex',
                }}
              >
                🔥 {streak}-day streak
              </div>
            )}
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              gap: 16,
              marginTop: 30,
            }}
          >
            {['♠', '♥', '♦', '♣'].map((suit, i) => (
              <div
                key={i}
                style={{
                  width: 56,
                  height: 72,
                  background: 'rgba(26, 92, 26, 0.8)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 36,
                  color: i === 1 || i === 2 ? '#c83232' : '#e0e0e0',
                  border: '1px solid rgba(42, 124, 42, 0.6)',
                }}
              >
                {suit}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: 30,
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.45)',
            letterSpacing: 2,
            display: 'flex',
          }}
        >
          playfreecellonline.com/daily-freecell
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
