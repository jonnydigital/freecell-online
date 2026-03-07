'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from './GameErrorBoundary';

const GameShell = dynamic(() => import('./GameShell'), {
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

export default function FreecellHomeClient() {
  return (
    <GameErrorBoundary>
      <GameShell />
    </GameErrorBoundary>
  );
}
