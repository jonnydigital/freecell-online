'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameErrorBoundary from '../../../components/GameErrorBoundary';
import SplashScreen from '../../../components/SplashScreen';

const GameShell = dynamic(() => import('../../../components/GameShell'), {
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

export default function GamePage({ gameNumber }: { gameNumber: number }) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);

  useEffect(() => {
    let skip = false;
    try {
      skip = !!localStorage.getItem('skipSplash');
    } catch {
      skip = true;
    }
    requestAnimationFrame(() => {
      setShowSplash(!skip);
    });
  }, []);

  if (showSplash === null) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ background: '#062516' }} />
    );
  }

  return (
    <GameErrorBoundary>
      {showSplash && <SplashScreen onStart={() => setShowSplash(false)} />}
      <GameShell initialGameNumber={gameNumber} />
    </GameErrorBoundary>
  );
}
