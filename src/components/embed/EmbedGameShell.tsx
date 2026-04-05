'use client';

import React, { useEffect, useCallback, useRef, useState } from 'react';
import { useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import DomBoard from '@/components/dom-freecell/DomBoard';
import { useHint } from '@/components/dom-freecell/useHint';
import { RotateCcw, RotateCw, Lightbulb, Shuffle, RefreshCw } from 'lucide-react';

// ---------------------------------------------------------------------------
// Helpers (duplicated locally — too small to extract)
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function getStarCount(moves: number): number {
  if (moves <= 60) return 3;
  if (moves <= 90) return 2;
  return 1;
}

// ---------------------------------------------------------------------------
// EmbedGameShell
// ---------------------------------------------------------------------------

export default function EmbedGameShell() {
  // ── Zustand selectors ──
  const gameNumber = useDomFreecellStore((s) => s.gameNumber);
  const moveCount = useDomFreecellStore((s) => s.moveCount);
  const isWon = useDomFreecellStore((s) => s.isWon);
  const timerSeconds = useDomFreecellStore((s) => s.timerSeconds);
  const timerStarted = useDomFreecellStore((s) => s.timerStarted);
  const tickTimer = useDomFreecellStore((s) => s.tickTimer);
  const newGame = useDomFreecellStore((s) => s.newGame);
  const restart = useDomFreecellStore((s) => s.restart);
  const undo = useDomFreecellStore((s) => s.undo);
  const redo = useDomFreecellStore((s) => s.redo);
  const moveHistory = useDomFreecellStore((s) => s.moveHistory);
  const redoStack = useDomFreecellStore((s) => s.redoStack);

  const canUndo = moveHistory.length > 0;
  const canRedo = redoStack.length > 0;

  // ── Hint ──
  const { hint, requestHint, clearHint } = useHint();

  // ── Win state ──
  const [showWin, setShowWin] = useState(false);
  const winProcessedRef = useRef<number | null>(null);

  // ── Timer ──
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerStarted && !isWon) {
      interval = setInterval(() => tickTimer(), 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, isWon, tickTimer]);

  // ── Win detection ──
  useEffect(() => {
    if (isWon && winProcessedRef.current !== gameNumber) {
      winProcessedRef.current = gameNumber;
      setShowWin(true);
    }
  }, [isWon, gameNumber]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Don't capture if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')
      ) {
        e.preventDefault();
        redo();
      } else if (e.key === 'h' || e.key === 'H') {
        e.preventDefault();
        requestHint();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, requestHint]);

  // ── Handlers ──
  const handleNewGame = useCallback(() => {
    setShowWin(false);
    winProcessedRef.current = null;
    clearHint();
    newGame();
  }, [newGame, clearHint]);

  const handleRestart = useCallback(() => {
    setShowWin(false);
    winProcessedRef.current = null;
    clearHint();
    restart();
  }, [restart, clearHint]);

  const handlePlayAgain = useCallback(() => {
    setShowWin(false);
    winProcessedRef.current = null;
    clearHint();
    restart();
  }, [restart, clearHint]);

  const stars = getStarCount(moveCount);

  return (
    <div className="flex flex-col h-screen bg-[#072907] text-white select-none">
      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-black/30 text-sm shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-white/60 font-mono">#{gameNumber}</span>
          <span className="text-white/80 font-mono">{formatTime(timerSeconds)}</span>
          <span className="text-white/80">{moveCount} moves</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-opacity"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-opacity"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw size={16} />
          </button>
          <button
            onClick={requestHint}
            className="p-1.5 rounded hover:bg-white/10 transition-opacity"
            title="Hint (H)"
          >
            <Lightbulb size={16} />
          </button>
          <div className="w-px h-4 bg-white/20 mx-1" />
          <button
            onClick={handleRestart}
            className="p-1.5 rounded hover:bg-white/10 transition-opacity"
            title="Restart"
          >
            <RefreshCw size={16} />
          </button>
          <button
            onClick={handleNewGame}
            className="p-1.5 rounded hover:bg-white/10 transition-opacity"
            title="New Game"
          >
            <Shuffle size={16} />
          </button>
        </div>
      </div>

      {/* ── Board ── */}
      <div className="flex-1 min-h-0 relative overflow-auto">
        <DomBoard hint={hint} />

        {/* ── Win overlay ── */}
        {showWin && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#0a3d0a] border border-[#D4AF37]/30 rounded-xl p-6 text-center max-w-xs mx-4 shadow-2xl">
              {/* Stars */}
              <div className="text-3xl mb-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <span key={i} className={i < stars ? 'opacity-100' : 'opacity-20'}>
                    ★
                  </span>
                ))}
              </div>

              <h2 className="text-xl font-bold text-[#D4AF37] mb-1">
                You Win!
              </h2>
              <p className="text-white/70 text-sm mb-4">
                Game #{gameNumber} — {moveCount} moves — {formatTime(timerSeconds)}
              </p>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={handlePlayAgain}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  Play Again
                </button>
                <button
                  onClick={handleNewGame}
                  className="px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c9a432] text-black text-sm font-medium transition-colors"
                >
                  New Game
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Attribution bar ── */}
      <div className="flex items-center justify-center px-3 py-1 bg-black/30 text-xs text-white/50 shrink-0">
        Powered by{' '}
        <a href="https://playfreecellonline.com?utm_source=embed&utm_medium=widget" target="_blank" rel="noopener" className="text-[#D4AF37]/70 hover:text-[#D4AF37] ml-1 transition-colors">{/* allow-foreign-brand:embed-canonical-owner */}
          PlayFreeCellOnline.com
        </a>
      </div>
    </div>
  );
}
