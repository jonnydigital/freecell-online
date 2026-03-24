'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const DomFreecellClient = dynamic(() => import('@/components/DomFreecellClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">🟢</div>
        <p className="text-white/60 text-lg">Loading Easy FreeCell...</p>
      </div>
    </div>
  ),
});

export default function EasyFreeCellPage() {
  return (
    <GameErrorBoundary>
      <DomFreecellClient variant="easy-freecell" />
    </GameErrorBoundary>
  );
}
