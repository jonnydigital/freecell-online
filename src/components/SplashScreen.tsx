'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);

  const handleDismiss = useCallback(() => {
    setExiting(true);
    try {
      localStorage.setItem('skipSplash', '1');
    } catch {}
    setTimeout(onStart, 500);
  }, [onStart]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between transition-opacity duration-500 ${
        exiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, #0F3F24 0%, #062516 70%)',
      }}
    >
      {/* Top spacer */}
      <div className="flex-1" />

      {/* Hero section */}
      <div className="flex flex-col items-center gap-6 px-6">
        {/* Fanned cards */}
        <div className="relative w-48 h-56 mb-2 splash-fade-in">
          {/* Left card - King of Spades */}
          <div
            className="absolute left-4 top-2 splash-float splash-card-shadow"
            style={{ transform: 'rotate(-12deg)' }}
          >
            <Image
              src="/cards/spadeKing.png"
              alt="King of Spades"
              width={120}
              height={168}
              className="rounded-lg"
              priority
            />
          </div>
          {/* Right card - Ace of Hearts */}
          <div
            className="absolute right-4 top-0 splash-float-delayed splash-card-shadow"
            style={{ transform: 'rotate(8deg)' }}
          >
            <Image
              src="/cards/heartAce.png"
              alt="Ace of Hearts"
              width={120}
              height={168}
              className="rounded-lg"
              priority
            />
          </div>
        </div>

        {/* Logo */}
        <div className="text-center splash-fade-in-delay-1">
          <h1
            className="text-5xl font-bold tracking-tight text-white"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            FreeCell
          </h1>
          <p
            className="text-xl italic mt-1 tracking-wide"
            style={{
              fontFamily: 'var(--font-playfair), Georgia, serif',
              color: '#D4AF37',
            }}
          >
            Online
          </p>
        </div>

        {/* Tagline */}
        <p
          className="text-sm tracking-widest uppercase splash-fade-in-delay-2"
          style={{ color: 'rgba(255, 255, 255, 0.5)' }}
        >
          The classic game, elegantly refined.
        </p>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Buttons — pinned to bottom for thumb reach */}
      <div className="w-full max-w-sm px-6 pb-10 flex flex-col items-center gap-3 safe-area-bottom">
        {/* Play Now — gold gradient with shimmer */}
        <button
          onClick={handleDismiss}
          className="relative w-full py-4 rounded-2xl text-lg font-semibold tracking-wide
                     splash-shimmer-btn splash-fade-in-delay-3 overflow-hidden
                     active:scale-[0.97] transition-transform duration-150"
          style={{ color: '#1a1a0a' }}
        >
          <span className="relative z-10">Play Now</span>
          {/* Sparkle particles */}
          <span className="splash-sparkle" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
          <span className="splash-sparkle" style={{ top: '60%', right: '20%', animationDelay: '0.7s' }} />
          <span className="splash-sparkle" style={{ top: '30%', right: '10%', animationDelay: '1.4s' }} />
        </button>

        {/* Daily Challenge — glassmorphic */}
        <button
          onClick={handleDismiss}
          className="w-full py-3.5 rounded-2xl text-base font-medium tracking-wide
                     backdrop-blur-md border transition-all duration-150
                     active:scale-[0.97] splash-fade-in-delay-4"
          style={{
            background: 'rgba(255, 255, 255, 0.07)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            color: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          Daily Challenge
        </button>

        {/* How to Play — text link */}
        <a
          href="/how-to-play"
          className="text-sm mt-1 transition-colors duration-150 splash-fade-in-delay-4"
          style={{ color: 'rgba(255, 255, 255, 0.4)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
        >
          How to Play
        </a>
      </div>
    </div>
  );
}
