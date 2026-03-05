import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FreeCell Game';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;

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

        {/* Game number badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 32px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: 40,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: '#D4AF37',
              letterSpacing: '3px',
              fontWeight: 600,
            }}
          >
            DEAL #{number}
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
          FreeCell Game #{number}
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

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 400,
            display: 'flex',
          }}
        >
          Can you solve this deal?
        </div>

        {/* Card suit row */}
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
                width: 48,
                height: 68,
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
                color: i === 1 || i === 2 ? '#c83232' : '#1a1a1a',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
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
          playfreecellonline.com
        </div>
      </div>
    ),
    { ...size }
  );
}
