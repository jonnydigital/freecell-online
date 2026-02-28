'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameErrorBoundary from '../components/GameErrorBoundary';
import SplashScreen from '../components/SplashScreen';

// Dynamic import with SSR disabled — Phaser needs the browser
const GameShell = dynamic(() => import('../components/GameShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">&#127183;</div>
        <p className="text-white/60 text-lg">Loading FreeCell...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    let skip = false;
    try {
      skip = !!localStorage.getItem('skipSplash');
    } catch {
      skip = true;
    }
    // Skip splash for shared links (?game= parameter)
    if (!skip) {
      const params = new URLSearchParams(window.location.search);
      if (params.has('game')) skip = true;
    }
    // Use requestAnimationFrame to avoid synchronous setState in effect
    requestAnimationFrame(() => {
      setShowSplash(!skip);
    });
  }, []);

  // Don't render anything until we've checked localStorage (prevents flash)
  if (showSplash === null) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: '#062516' }} />
    );
  }

  return (
    <GameErrorBoundary>
      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}
      <GameShell />
    </GameErrorBoundary>
  );
}
