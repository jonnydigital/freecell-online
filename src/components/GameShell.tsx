'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gameBridge } from '../game/GameBridge';
import { GameStats, createEmptyStats, recordWin, recordLoss } from '../lib/stats';
import { loadStats, saveStats } from '../lib/storage';
import { trackGameStart, trackWin, trackAbandoned, trackHint, trackUndo, trackMove, trackDeadlock, gameSession } from '../lib/analytics';
import { initErrorTracking, setGameContext } from '../lib/errorTracking';
import { getTodaysSeed, getTodayStr, recordDailyCompletion } from '../lib/dailyChallenge';
import { RotateCcw, RotateCw, Lightbulb, BarChart3, MessageSquare, Shuffle, Calendar, Hash, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';
import StatsPanel from './StatsPanel';
import FeedbackModal from './FeedbackModal';
import DailyChallengePanel from './DailyChallengePanel';
import GameNumberInput from './GameNumberInput';
import { soundManager } from '../lib/sounds';

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
  const [showDaily, setShowDaily] = useState(false);
  const [isDailyGame, setIsDailyGame] = useState(false);
  const [autoCompletable, setAutoCompletable] = useState(false);
  const [showGameInput, setShowGameInput] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundManager.muted);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Load stats on mount
  useEffect(() => {
    setStats(loadStats());
    initErrorTracking();
  }, []);

  const winDataRef = useRef<{ time: number; moves: number } | null>(null);

  const handleWin = useCallback(
    (data: unknown) => {
      const d = data as { time: number; moves: number };
      winDataRef.current = d;
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
      if (gameSession.gameNumber > 0 && gameSession.moveCount > 0) {
        trackAbandoned();
      }
      setGameNumber(d.gameNumber);
      setMoveCount(0);
      setIsWon(false);
      setAutoCompletable(false);
      trackGameStart(d.gameNumber);
      setIsDailyGame(d.gameNumber === getTodaysSeed());
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number; gameNumber: number };
      setMoveCount(d.moveCount);
      trackMove('tap');
      setGameContext(d.gameNumber, d.moveCount);
    });

    const unsubWin = gameBridge.on('gameWon', handleWin);

    const unsubDeadlock = gameBridge.on('deadlock', () => {
      trackDeadlock();
    });

    const unsubAutoComplete = gameBridge.on('autoCompletable', (data: unknown) => {
      const d = data as { completable: boolean };
      setAutoCompletable(d.completable);
    });

    return () => {
      unsubReady();
      unsubMove();
      unsubWin();
      unsubDeadlock();
      unsubAutoComplete();
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, [handleWin]);

  // Record daily challenge completion when winning a daily game
  useEffect(() => {
    if (isWon && isDailyGame && winDataRef.current) {
      const todayStr = getTodayStr();
      recordDailyCompletion(todayStr, winDataRef.current.moves, winDataRef.current.time);
    }
  }, [isWon, isDailyGame]);

  const handleNewGame = () => {
    setIsDailyGame(false);
    gameBridge.emit('newGame');
  };
  const handleUndo = () => {
    trackUndo();
    gameBridge.emit('undo');
  };
  const handleRedo = () => gameBridge.emit('redo');
  const handleHint = () => {
    trackHint();
    gameBridge.emit('hint');
  };

  const handlePlayDaily = (seed: number) => {
    setIsDailyGame(true);
    gameBridge.emit('newGame', seed);
  };

  const handlePlayNumber = (num: number) => {
    setIsDailyGame(false);
    gameBridge.emit('newGame', num);
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
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

  const iconBtnClass = "p-2 bg-[#1a5c1a]/60 hover:bg-[#1a5c1a] text-white/80 rounded transition-colors";
  const iconSize = 16;

  return (
    <div className="flex flex-col h-dvh bg-[#0a3d0a]">
      {/* ── Desktop Top Bar (hidden on mobile) ── */}
      <div className="hidden md:flex items-center justify-between px-4 py-2 bg-[#072907] border-b border-[#1a5c1a]/30">
        <div className="flex items-center gap-3">
          <button
            onClick={handleNewGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white rounded transition-colors"
          >
            <Shuffle size={14} />
            New Game
          </button>
          <button
            onClick={() => setShowDaily(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-yellow-700/80 hover:bg-yellow-600 text-white rounded transition-colors"
            title="Daily Challenge"
          >
            <Calendar size={14} />
            Daily
          </button>
          <button onClick={handleUndo} className={iconBtnClass} title="Undo (Ctrl+Z)">
            <RotateCcw size={iconSize} />
          </button>
          <button onClick={handleRedo} className={iconBtnClass} title="Redo (Ctrl+Y)">
            <RotateCw size={iconSize} />
          </button>
          <button onClick={handleHint} className={iconBtnClass} title="Hint (H)">
            <Lightbulb size={iconSize} />
          </button>
          <button onClick={() => setShowStats(true)} className={iconBtnClass} title="Statistics">
            <BarChart3 size={iconSize} />
          </button>
          <button onClick={() => setShowFeedback(true)} className={iconBtnClass} title="Feedback">
            <MessageSquare size={iconSize} />
          </button>
          <button onClick={handleToggleMute} className={iconBtnClass} title={isMuted ? "Unmute" : "Mute"}>
            {isMuted ? <VolumeX size={iconSize} /> : <Volume2 size={iconSize} />}
          </button>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/70">
          {gameNumber && (
            <button
              onClick={() => setShowGameInput(true)}
              className="hover:text-white transition-colors cursor-pointer"
              title="Click to enter a game number"
            >
              {isDailyGame && <span className="text-yellow-400 mr-1" title="Daily Challenge">&#9819;</span>}
              Game #{gameNumber}
            </button>
          )}
          <span>{moveCount} moves</span>
          {isWon && (
            <span className="text-yellow-400 font-bold animate-pulse">Win!</span>
          )}
        </div>
      </div>

      {/* ── Mobile Top Bar (only info, hidden on desktop) ── */}
      <div className="flex md:hidden items-center justify-between px-3 py-1.5 bg-[#072907] border-b border-[#1a5c1a]/30">
        <div className="flex items-center gap-3 text-xs text-white/70">
          {gameNumber && (
            <button
              onClick={() => setShowGameInput(true)}
              className="font-medium hover:text-white transition-colors"
              title="Enter game number"
            >
              {isDailyGame && <span className="text-yellow-400 mr-1">&#9819;</span>}
              Game #{gameNumber}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span>{moveCount} moves</span>
          {isWon && (
            <span className="text-yellow-400 font-bold animate-pulse">Win!</span>
          )}
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="relative flex-1">
        <div ref={containerRef} id="game-container" className="absolute inset-0" />

        {/* Auto-Finish Button */}
        {autoCompletable && !isWon && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={() => {
                setAutoCompletable(false);
                gameBridge.emit('autoFinish');
              }}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg rounded-lg shadow-lg animate-bounce transition-colors"
            >
              Auto-Finish
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Bar (hidden on desktop) ── */}
      <div className="flex md:hidden items-center justify-around px-2 py-2 bg-[#072907] border-t border-[#1a5c1a]/30 safe-area-bottom">
        <button onClick={handleNewGame} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="New Game">
          <Shuffle size={22} />
          <span className="text-[10px]">New</span>
        </button>
        <button onClick={() => setShowDaily(true)} className="flex flex-col items-center gap-0.5 p-2 text-yellow-400/80 active:text-yellow-400" title="Daily">
          <Calendar size={22} />
          <span className="text-[10px]">Daily</span>
        </button>
        <button onClick={handleUndo} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="Undo">
          <RotateCcw size={22} />
          <span className="text-[10px]">Undo</span>
        </button>
        <button onClick={handleRedo} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="Redo">
          <RotateCw size={22} />
          <span className="text-[10px]">Redo</span>
        </button>
        <button onClick={handleHint} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="Hint">
          <Lightbulb size={22} />
          <span className="text-[10px]">Hint</span>
        </button>
        <button onClick={() => setShowStats(true)} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="Stats">
          <BarChart3 size={22} />
          <span className="text-[10px]">Stats</span>
        </button>
        <div className="relative">
          <button onClick={() => setShowMoreMenu(!showMoreMenu)} className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white" title="More">
            <MoreHorizontal size={22} />
            <span className="text-[10px]">More</span>
          </button>
          {showMoreMenu && (
            <div className="absolute bottom-full right-0 mb-2 bg-[#0d2f0d] border border-[#1a5c1a]/50 rounded-lg shadow-xl overflow-hidden min-w-[160px] z-50">
              <button
                onClick={() => { handleToggleMute(); setShowMoreMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/80 hover:bg-[#1a5c1a]/40 active:bg-[#1a5c1a]/60"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </button>
              <button
                onClick={() => { setShowFeedback(true); setShowMoreMenu(false); }}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-white/80 hover:bg-[#1a5c1a]/40 active:bg-[#1a5c1a]/60"
              >
                <MessageSquare size={16} />
                Feedback
              </button>
            </div>
          )}
        </div>
      </div>

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

      {/* Daily Challenge Modal */}
      <DailyChallengePanel
        isOpen={showDaily}
        onClose={() => setShowDaily(false)}
        onPlayDaily={handlePlayDaily}
      />

      {/* Game Number Input Modal */}
      <GameNumberInput
        isOpen={showGameInput}
        onClose={() => setShowGameInput(false)}
        onPlay={handlePlayNumber}
      />
    </div>
  );
}
