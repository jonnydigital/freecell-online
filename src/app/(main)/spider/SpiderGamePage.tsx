'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GameErrorBoundary from '@/components/GameErrorBoundary';
import { gameBridge } from '@/game/GameBridge';

type SpiderDifficulty = '1-suit' | '2-suit' | '4-suit';

const DIFFICULTY_STORAGE_KEY = 'spider-difficulty';

const GameShell = dynamic(() => import('@/components/GameShell'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
            <div className="text-center">
                <p className="text-white/60 text-lg">Loading Spider Solitaire...</p>
            </div>
        </div>
    ),
});

const difficultyOptions: { value: SpiderDifficulty; label: string; suits: string }[] = [
    { value: '1-suit', label: '1 Suit', suits: '\u2660' },
    { value: '2-suit', label: '2 Suits', suits: '\u2660\u2665' },
    { value: '4-suit', label: '4 Suits', suits: '\u2660\u2665\u2666\u2663' },
];

export default function SpiderGamePage() {
    const [difficulty, setDifficulty] = useState<SpiderDifficulty>('1-suit');
    const [mounted, setMounted] = useState(false);

    // Load saved preference on mount
    useEffect(() => {
        const saved = localStorage.getItem(DIFFICULTY_STORAGE_KEY) as SpiderDifficulty | null;
        if (saved && ['1-suit', '2-suit', '4-suit'].includes(saved)) {
            setDifficulty(saved);
            gameBridge.spiderDifficulty = saved;
        }
        setMounted(true);
    }, []);

    const handleDifficultyChange = (newDifficulty: SpiderDifficulty) => {
        if (newDifficulty === difficulty) return;
        setDifficulty(newDifficulty);
        localStorage.setItem(DIFFICULTY_STORAGE_KEY, newDifficulty);
        gameBridge.spiderDifficulty = newDifficulty;
        // Trigger a new game with the updated difficulty
        gameBridge.emit('newGame');
    };

    return (
        <GameErrorBoundary>
            <div className="relative">
                {/* Difficulty selector bar */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                    {difficultyOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => handleDifficultyChange(opt.value)}
                            className={`
                                px-3 py-1.5 rounded-md text-sm font-medium transition-all
                                ${mounted && difficulty === opt.value
                                    ? 'bg-[#D4AF37]/90 text-black shadow-md'
                                    : 'text-white/60 hover:text-white/90 hover:bg-white/10'
                                }
                            `}
                            title={`${opt.label} Spider Solitaire`}
                        >
                            <span className="hidden sm:inline">{opt.label}</span>
                            <span className="sm:hidden">{opt.suits}</span>
                        </button>
                    ))}
                </div>
                <GameShell variant="spider" />
            </div>
        </GameErrorBoundary>
    );
}
