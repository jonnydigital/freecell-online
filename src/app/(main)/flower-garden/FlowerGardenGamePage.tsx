'use client';

import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';

const GameShell = dynamic(() => import('@/components/GameShell'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
            <div className="text-center">
                <p className="text-white/60 text-lg">Loading Flower Garden Solitaire...</p>
            </div>
        </div>
    ),
});

export default function FlowerGardenGamePage() {
    return (
        <GameErrorBoundary>
            <GameShell variant="flower-garden" />
        </GameErrorBoundary>
    );
}
