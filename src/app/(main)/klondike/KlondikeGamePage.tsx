'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';
import { gameBridge } from '@/game/GameBridge';

type DrawMode = 1 | 3;

const DRAW_MODE_STORAGE_KEY = 'klondike-draw-mode';

const GameShell = dynamic(() => import('@/components/GameShell'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
            <div className="text-center">
                <p className="text-white/60 text-lg">Loading Klondike Solitaire...</p>
            </div>
        </div>
    ),
});

const drawOptions: { value: DrawMode; label: string; shortLabel: string }[] = [
    { value: 1, label: 'Draw 1', shortLabel: '1' },
    { value: 3, label: 'Draw 3', shortLabel: '3' },
];

export default function KlondikeGamePage() {
    const [drawMode, setDrawMode] = useState<DrawMode>(1);
    const [mounted, setMounted] = useState(false);

    // Load saved preference on mount
    useEffect(() => {
        const saved = localStorage.getItem(DRAW_MODE_STORAGE_KEY);
        if (saved && ['1', '3'].includes(saved)) {
            const mode = parseInt(saved, 10) as DrawMode;
            setDrawMode(mode);
            gameBridge.klondikeDrawMode = mode;
        }
        setMounted(true);
    }, []);

    const handleDrawModeChange = (newMode: DrawMode) => {
        if (newMode === drawMode) return;
        setDrawMode(newMode);
        localStorage.setItem(DRAW_MODE_STORAGE_KEY, newMode.toString());
        gameBridge.klondikeDrawMode = newMode;
        // Trigger a new game with the updated draw mode
        gameBridge.emit('newGame');
    };

    return (
        <GameErrorBoundary>
            <div className="relative">
                {/* Draw mode selector bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                    {drawOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleDrawModeChange(opt.value)}
                            className={`
                                px-3 py-1.5 rounded-md text-sm font-medium transition-all
                                ${mounted && drawMode === opt.value
                                    ? 'bg-[#D4AF37]/90 text-black shadow-md'
                                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                                }
                            `}
                            title={`${opt.label} Klondike Solitaire`}
                        >
                            <span className="hidden sm:inline">{opt.label}</span>
                            <span className="sm:hidden">{opt.shortLabel}</span>
                        </button>
                    ))}
                </div>
                <GameShell variant="klondike" />
            </div>
        </GameErrorBoundary>
    );
}
