'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const GameShell = dynamic(() => import('@/components/GameShell'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
            <div className="text-center">
                <p className="text-white/60 text-lg">Loading Golf Solitaire...</p>
            </div>
        </div>
    ),
});

export default function GolfGamePage() {
    return (
        <GameErrorBoundary>
            <GameShell variant="golf" />
        </GameErrorBoundary>
    );
}
