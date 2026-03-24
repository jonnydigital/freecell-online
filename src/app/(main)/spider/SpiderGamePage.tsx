'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const DomSpiderShell = dynamic(() => import('@/components/dom-spider/DomSpiderShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">♣</div>
        <p className="text-white/60 text-lg">Loading Spider Solitaire...</p>
      </div>
    </div>
  ),
});

export default function SpiderGamePage() {
  return (
    <GameErrorBoundary>
      <DomSpiderShell />
    </GameErrorBoundary>
  );
}
