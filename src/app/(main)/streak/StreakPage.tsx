'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const StreakGameShell = dynamic(() => import('@/components/StreakGameShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">&#128293;</div>
        <p className="text-white/60 text-lg">Loading Puzzle Streak...</p>
      </div>
    </div>
  ),
});

export default function StreakPage() {
  return (
    <GameErrorBoundary>
      <StreakGameShell />
    </GameErrorBoundary>
  );
}
