'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from './GameErrorBoundary';

const DomGameShell = dynamic(() => import('./dom-freecell/DomGameShell'), {
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

interface DomFreecellClientProps {
  initialGameNumber?: number;
  variant?: import('@/engine/FreeCellEngine').GameVariant;
}

export default function DomFreecellClient({ initialGameNumber, variant }: DomFreecellClientProps) {
  return (
    <GameErrorBoundary>
      <DomGameShell initialGameNumber={initialGameNumber} variant={variant} />
    </GameErrorBoundary>
  );
}
