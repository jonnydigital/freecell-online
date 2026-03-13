'use client';

import { useEffect } from 'react';
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
}

export default function DomFreecellClient({ initialGameNumber }: DomFreecellClientProps) {
  useEffect(() => {
    // Override global overflow so the page can scroll past the game to below-fold content
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.height = 'auto';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.height = '';
    };
  }, []);

  return (
    <GameErrorBoundary>
      <DomGameShell initialGameNumber={initialGameNumber} />
    </GameErrorBoundary>
  );
}
