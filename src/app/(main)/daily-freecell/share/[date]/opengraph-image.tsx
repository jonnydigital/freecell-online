import { ImageResponse } from 'next/og';
import { getDailySeed } from '@/lib/dailyChallenge';

export const runtime = 'edge';
export const alt = 'FreeCell Daily Challenge Results';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage({ params }: { params: { date: string } }) {
  const dateStr = params.date;
  const seed = getDailySeed(dateStr);

  // Format the date nicely
  let displayDate = dateStr;
  try {
    const d = new Date(dateStr + 'T12:00:00');
    displayDate = d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    // Use raw dateStr as fallback
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
          background: 'linear-gradient(135deg, #0a3d0a 0%, #072907 50%, #0a3d0a 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle border accent */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            right: 16,
            bottom: 16,
            border: '2px solid rgba(212, 175, 55, 0.3)',
            borderRadius: 16,
            display: 'flex',
          }}
        />

        {/* Card suit decorations - top left */}
        <div
          style={{
            position: 'absolute',
            top: 48,
            left: 48,
            fontSize: 48,
            color: 'rgba(212, 175, 55, 0.2)',
            display: 'flex',
            gap: 12,
          }}
        >
          <span>♠</span>
          <span style={{ color: 'rgba(200, 50, 50, 0.2)' }}>♥</span>
        </div>

        {/* Card suit decorations - bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 48,
            fontSize: 48,
            color: 'rgba(212, 175, 55, 0.2)',
            display: 'flex',
            gap: 12,
          }}
        >
          <span style={{ color: 'rgba(200, 50, 50, 0.2)' }}>♦</span>
          <span>♣</span>
        </div>

        {/* Daily badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 16,
            padding: '8px 24px',
            background: 'rgba(212, 175, 55, 0.15)',
            borderRadius: 40,
            border: '1px solid rgba(212, 175, 55, 0.3)',
          }}
        >
          <span style={{ fontSize: 28, color: '#D4AF37' }}>📅</span>
          <span
            style={{
              fontSize: 22,
              color: '#D4AF37',
              fontWeight: 600,
              letterSpacing: '2px',
            }}
          >
            DAILY CHALLENGE
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'serif',
            letterSpacing: '-1px',
            display: 'flex',
          }}
        >
          FreeCell Daily #{seed}
        </div>

        {/* Gold divider */}
        <div
          style={{
            width: 200,
            height: 3,
            background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
            margin: '16px 0',
            display: 'flex',
          }}
        />

        {/* Date */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.7)',
            fontWeight: 400,
            display: 'flex',
          }}
        >
          {displayDate}
        </div>

        {/* Suit row */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 32,
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

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.4)',
            letterSpacing: '2px',
            display: 'flex',
          }}
        >
          playfreecellonline.com/daily-freecell
        </div>
      </div>
    ),
    { ...size }
  );
}
