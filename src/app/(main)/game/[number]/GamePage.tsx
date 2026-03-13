'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const GameShell = dynamic(() => import('@/components/GameShell'), {
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
  return (
    <GameErrorBoundary>
      <GameShell initialGameNumber={gameNumber} />
    </GameErrorBoundary>
  );
}
