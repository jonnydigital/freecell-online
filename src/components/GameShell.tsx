'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gameBridge } from '../game/GameBridge';
import { GameStats, createEmptyStats, recordWin, recordLoss } from '../lib/stats';
import { loadStats, saveStats } from '../lib/storage';
import { trackGameStart, trackWin, trackAbandoned, trackHint, trackUndo, trackMove, trackDeadlock, gameSession } from '../lib/analytics';
import { initErrorTracking, setGameContext } from '../lib/errorTracking';
import StatsPanel from './StatsPanel';
import FeedbackModal from './FeedbackModal';

export default function GameShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false);
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [stats, setStats] = useState<GameStats>(createEmptyStats);
  const [showStats, setShowStats] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Load stats on mount
  useEffect(() => {
    setStats(loadStats());
    initErrorTracking();
  }, []);

  const handleWin = useCallback(
    (data: unknown) => {
      const d = data as { time: number; moves: number };
      setIsWon(true);
      trackWin(d.time, d.moves);
      setStats((prev) => {
        const updated = recordWin(prev, d.time, d.moves);
        saveStats(updated);
        return updated;
      });
    },
    []
  );

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const initPhaser = async () => {
      if (!containerRef.current || gameRef.current) return;

      const Phaser = await import('phaser');
      const { createPhaserConfig } = await import('../game/PhaserConfig');

      const config = createPhaserConfig(containerRef.current);
      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    const unsubReady = gameBridge.on('gameReady', (data: unknown) => {
      const d = data as { gameNumber: number };
      // Track abandoned game if we had an active one
      if (gameSession.gameNumber > 0 && gameSession.moveCount > 0) {
        trackAbandoned();
      }
      setGameNumber(d.gameNumber);
      setMoveCount(0);
      setIsWon(false);
      trackGameStart(d.gameNumber);
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number; gameNumber: number };
      setMoveCount(d.moveCount);
      trackMove('tap'); // Default to tap; drag events will override
      setGameContext(d.gameNumber, d.moveCount);
    });

    const unsubWin = gameBridge.on('gameWon', handleWin);

    const unsubDeadlock = gameBridge.on('deadlock', () => {
      trackDeadlock();
    });

    return () => {
      unsubReady();
      unsubMove();
      unsubWin();
      unsubDeadlock();
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, [handleWin]);

  const handleNewGame = () => gameBridge.emit('newGame');
  const handleUndo = () => {
    trackUndo();
    gameBridge.emit('undo');
  };
  const handleRedo = () => gameBridge.emit('redo');
  const handleHint = () => {
    trackHint();
    gameBridge.emit('hint');
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') { e.preventDefault(); handleUndo(); }
        if (e.key === 'y') { e.preventDefault(); handleRedo(); }
      }
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey) handleNewGame();
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey) handleHint();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0a3d0a]">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#072907] border-b border-[#1a5c1a]/30">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleNewGame}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white rounded transition-colors"
          >
            New Game
          </button>
          <button
            onClick={handleUndo}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
            title="Undo"
          >
            ↩
          </button>
          <button
            onClick={handleRedo}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
            title="Redo"
          >
            ↪
          </button>
          <button
            onClick={handleHint}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
            title="Hint"
          >
            💡
          </button>
          <button
            onClick={() => setShowStats(true)}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
            title="Statistics"
          >
            📊
          </button>
          <button
            onClick={() => setShowFeedback(true)}
            className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors"
            title="Feedback"
          >
            💬
          </button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-white/70">
          {gameNumber && <span>#{gameNumber}</span>}
          <span>{moveCount} moves</span>
          {isWon && (
            <span className="text-yellow-400 font-bold animate-pulse">
              🎉 Win!
            </span>
          )}
        </div>
      </div>

      {/* Game Canvas Container */}
      <div ref={containerRef} id="game-container" className="flex-1" />

      {/* Stats Modal */}
      <StatsPanel
        stats={stats}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedback}
        onClose={() => setShowFeedback(false)}
        gameNumber={gameNumber}
        moveCount={moveCount}
      />
    </div>
  );
}
