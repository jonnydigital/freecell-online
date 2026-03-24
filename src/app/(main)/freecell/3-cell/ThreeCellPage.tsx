'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const DomFreecellClient = dynamic(() => import('@/components/DomFreecellClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">3️⃣</div>
        <p className="text-white/60 text-lg">Loading 3-Cell FreeCell...</p>
      </div>
    </div>
  ),
});

export default function ThreeCellPage() {
  return (
    <GameErrorBoundary>
      <DomFreecellClient variant="freecell-3cell" />
    </GameErrorBoundary>
  );
}
