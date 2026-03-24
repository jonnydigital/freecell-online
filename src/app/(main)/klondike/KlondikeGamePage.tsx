'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

type DrawMode = 1 | 3;

const DRAW_MODE_STORAGE_KEY = 'klondike-draw-mode';

const DomKlondikeShell = dynamic(() => import('@/components/dom-klondike/DomKlondikeShell'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
      <div className="text-center">
        <div className="text-4xl mb-4">♦</div>
        <p className="text-white/60 text-lg">Loading Klondike...</p>
      </div>
    </div>
  ),
});

export default function KlondikeGamePage() {
  const [drawMode, setDrawMode] = useState<DrawMode>(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAW_MODE_STORAGE_KEY);
      if (saved === '3') setDrawMode(3);
    } catch {}
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
        <div className="text-center">
          <div className="text-4xl mb-4">♦</div>
          <p className="text-white/60 text-lg">Loading Klondike...</p>
        </div>
      </div>
    );
  }

  return (
    <GameErrorBoundary>
      <DomKlondikeShell initialDrawMode={drawMode} />
    </GameErrorBoundary>
  );
}
