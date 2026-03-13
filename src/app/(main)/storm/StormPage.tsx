'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const StormGameShell = dynamic(() => import('@/components/StormGameShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a1a35]">
      <div className="text-center">
        <div className="text-4xl mb-4">&#9889;</div>
        <p className="text-white/60 text-lg">Loading Puzzle Storm...</p>
      </div>
    </div>
  ),
});

export default function StormPage() {
  return (
    <GameErrorBoundary>
      <StormGameShell />
    </GameErrorBoundary>
  );
}
