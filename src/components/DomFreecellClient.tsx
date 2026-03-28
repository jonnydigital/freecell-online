'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from './GameErrorBoundary';

function GameBoardSkeleton() {
  return (
    <div className="flex h-screen bg-[#0a3d0a]">
      {/* Main game area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar skeleton */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="h-8 w-28 rounded-full bg-white/5 animate-pulse" />
          <div className="flex gap-4">
            <div className="h-8 w-20 rounded-full bg-white/5 animate-pulse" />
            <div className="h-8 w-20 rounded-full bg-white/5 animate-pulse" />
            <div className="h-8 w-16 rounded-full bg-white/5 animate-pulse" />
          </div>
          <div className="h-9 w-24 rounded-full bg-white/8 animate-pulse" />
        </div>
        {/* Toolbar skeleton */}
        <div className="flex justify-center gap-3 py-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-5 w-5 rounded-full bg-white/5 animate-pulse" />
          ))}
        </div>
        {/* Free cells + foundations row */}
        <div className="flex justify-center gap-3 px-4 py-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-24 w-16 rounded-lg border border-white/10 bg-white/[0.03] animate-pulse"
            />
          ))}
        </div>
        {/* Cascades skeleton */}
        <div className="flex justify-center gap-2 px-4 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[-40px]">
              {Array.from({ length: 4 + (i < 4 ? 1 : 0) }).map((_, j) => (
                <div
                  key={j}
                  className="h-24 w-16 rounded-lg bg-white/[0.04] animate-pulse"
                  style={{ marginTop: j > 0 ? '-56px' : 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {/* Sidebar skeleton (desktop) */}
      <div className="hidden min-[1180px]:flex flex-col gap-4 w-80 p-4">
        <div className="h-40 rounded-2xl bg-white/[0.03] animate-pulse" />
        <div className="h-64 rounded-2xl bg-white/[0.03] animate-pulse" />
        <div className="h-32 rounded-2xl bg-white/[0.03] animate-pulse" />
      </div>
    </div>
  );
}

const DomGameShell = dynamic(() => import('./dom-freecell/DomGameShell'), {
  ssr: false,
  loading: () => <GameBoardSkeleton />,
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
