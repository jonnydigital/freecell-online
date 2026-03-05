import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FreeCell Online - Play Free, No Download, No Signup';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
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

        {/* Card suit row */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginBottom: 24,
          }}
        >
          {['♠', '♥', '♦', '♣'].map((suit, i) => (
            <div
              key={i}
              style={{
                width: 72,
                height: 100,
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 44,
                color: i === 1 || i === 2 ? '#c83232' : '#1a1a1a',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              {suit}
            </div>
          ))}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#ffffff',
            fontFamily: 'serif',
            letterSpacing: '-1px',
            display: 'flex',
          }}
        >
          FreeCell Online
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
            color: '#D4AF37',
            fontWeight: 400,
            letterSpacing: '4px',
            display: 'flex',
          }}
        >
          PLAY FREE • NO DOWNLOAD • NO SIGNUP
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
