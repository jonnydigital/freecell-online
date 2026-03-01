'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gameBridge } from '../game/GameBridge';
import { RotateCcw, RotateCw, Lightbulb, Shuffle, Share2, AlertTriangle, Home, Flame, Trophy, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomSolvableGame } from '../lib/solvableDeals';
import { loadStreakData, updateBestStreak } from '../lib/streakStorage';
import { soundManager } from '../lib/sounds';
import { loadSettings } from '../lib/storage';

type Phase = 'playing' | 'won' | 'over';

export default function StreakGameShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('playing');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [moveCount, setMoveCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isDeadlocked, setIsDeadlocked] = useState(false);
  const [autoCompletable, setAutoCompletable] = useState(false);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [winData, setWinData] = useState<{ time: number; moves: number } | null>(null);

  // Load best streak on mount
  useEffect(() => {
    setBestStreak(loadStreakData().bestStreak);
    // Apply sound settings
    const settings = loadSettings();
    soundManager.setMuted(!settings.soundEnabled);
  }, []);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && phase === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, phase]);

  // Orientation detection
  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscapeMobile(window.innerWidth > window.innerHeight && window.innerHeight < 500);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    const onOrientationChange = () => setTimeout(checkOrientation, 200);
    window.addEventListener('orientationchange', onOrientationChange);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', onOrientationChange);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Handle win — increment streak, auto-advance after delay
  const handleWin = useCallback(() => {
    setPhase('won');
    setCurrentStreak(prev => {
      const next = prev + 1;
      const newRecord = updateBestStreak(next);
      if (newRecord) {
        setIsNewRecord(true);
        setBestStreak(next);
      }
      return next;
    });
  }, []);

  // Auto-advance to next deal after win celebration
  useEffect(() => {
    if (phase === 'won') {
      const timer = setTimeout(() => {
        setPhase('playing');
        setIsDeadlocked(false);
        setAutoCompletable(false);
        setIsNewRecord(false);
        setWinData(null);
        gameBridge.emit('newGame', getRandomSolvableGame());
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Handle deadlock — streak over
  const handleStreakOver = useCallback(() => {
    setPhase('over');
    // Persist best if needed
    updateBestStreak(currentStreak);
    setBestStreak(loadStreakData().bestStreak);
  }, [currentStreak]);

  // Initialize Phaser
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const initPhaser = async () => {
      if (!containerRef.current || gameRef.current) return;

      const container = containerRef.current;
      let attempts = 0;
      while ((container.clientWidth === 0 || container.clientHeight === 0) && attempts < 50) {
        await new Promise(r => setTimeout(r, 100));
        attempts++;
      }

      if (container.clientWidth === 0 || container.clientHeight === 0) {
        container.style.width = '100vw';
        container.style.height = '100vh';
        await new Promise(r => setTimeout(r, 200));
      }

      const Phaser = await import('phaser');
      const { createPhaserConfig } = await import('../game/PhaserConfig');

      const config = createPhaserConfig(container);
      gameRef.current = new Phaser.Game(config);
    };

    initPhaser();

    const unsubReady = gameBridge.on('gameReady', (data: unknown) => {
      const d = data as { gameNumber: number };
      setGameNumber(d.gameNumber);
      setMoveCount(0);
      setTimeElapsed(0);
      setIsTimerRunning(false);
      setAutoCompletable(false);
      setIsDeadlocked(false);
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number };
      setMoveCount(d.moveCount);
      if (d.moveCount > 0) setIsTimerRunning(true);
      if (d.moveCount === 0) setIsTimerRunning(false);
    });

    const unsubWin = gameBridge.on('gameWon', (data: unknown) => {
      const d = data as { time: number; moves: number };
      setWinData(d);
      setIsTimerRunning(false);
      // handleWin is called via the ref pattern below
    });

    const unsubDeadlock = gameBridge.on('deadlock', () => {
      setIsDeadlocked(true);
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
  }, []);

  // Use ref to call handleWin from the event listener (avoids stale closure)
  const handleWinRef = useRef(handleWin);
  handleWinRef.current = handleWin;

  const handleStreakOverRef = useRef(handleStreakOver);
  handleStreakOverRef.current = handleStreakOver;

  // React to winData changes
  useEffect(() => {
    if (winData && phase === 'playing') {
      handleWinRef.current();
    }
  }, [winData, phase]);

  // React to deadlock
  useEffect(() => {
    if (isDeadlocked && phase === 'playing') {
      handleStreakOverRef.current();
    }
  }, [isDeadlocked, phase]);

  const handleUndo = () => {
    if (phase !== 'playing') return;
    setIsDeadlocked(false);
    gameBridge.emit('undo');
  };
  const handleRedo = () => {
    if (phase !== 'playing') return;
    gameBridge.emit('redo');
  };
  const handleHint = () => {
    if (phase !== 'playing') return;
    gameBridge.emit('hint');
  };

  const handleRestartStreak = () => {
    setPhase('playing');
    setCurrentStreak(0);
    setIsDeadlocked(false);
    setAutoCompletable(false);
    setIsNewRecord(false);
    setWinData(null);
    setShareStatus('idle');
    gameBridge.emit('newGame', getRandomSolvableGame());
  };

  const handleGiveUp = () => {
    if (phase === 'playing' && currentStreak > 0) {
      setPhase('over');
      updateBestStreak(currentStreak);
      setBestStreak(loadStreakData().bestStreak);
    } else if (phase === 'playing') {
      // No streak yet, just deal a new game
      gameBridge.emit('newGame', getRandomSolvableGame());
    }
  };

  const handleShare = async () => {
    const streakText = currentStreak;
    const shareText = `I solved ${streakText} FreeCell game${streakText !== 1 ? 's' : ''} in a row in Puzzle Streak mode! 🔥\nCan you beat my streak? https://playfreecellonline.com/streak`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'FreeCell Puzzle Streak', text: shareText });
        return;
      } catch { /* fall through to clipboard */ }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch { /* silent fail */ }
  };

  return (
    <div className="flex w-full h-dvh bg-[#0a351a]">
      <div className="flex w-full h-full max-w-[1400px] mx-auto relative overflow-hidden">

        {/* Left Ad Gutter */}
        <div className="hidden lg:flex flex-col flex-1 items-center py-4 px-2 border-r border-white/10 bg-black/10">
          <div className="w-[160px] h-[600px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/20 text-white/30 text-sm font-semibold tracking-widest uppercase">
            Advertisement
          </div>
        </div>

        {/* Center Game Container */}
        <div className="flex flex-col w-full max-w-[1000px] h-full bg-[#0d4a22] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 shrink-0">

          {/* Desktop Top Bar */}
          <div className="hidden md:flex items-center justify-between px-6 py-3 bg-[#072907] border-b border-white/10 z-20 sticky top-0">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
                <h1 className="text-xl font-black text-white leading-none uppercase tracking-tighter">
                  Freecell<span className="text-[#D4AF37]">.</span>
                </h1>
              </Link>
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
                <Flame size={16} className="text-orange-400" />
                <span className="text-sm font-bold text-orange-300">Puzzle Streak</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Streak Counter */}
              <div className="flex items-center gap-3 px-4 py-1.5 bg-black/30 border border-white/5 rounded-full text-xs font-medium text-white/80 shadow-inner">
                <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                  <Flame size={14} className="text-orange-400" />
                  <span className="text-lg font-black text-orange-300 tabular-nums">{currentStreak}</span>
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Streak</span>
                </div>
                <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                  <Trophy size={12} className="text-yellow-500/60" />
                  <span className="tabular-nums font-mono text-[13px]">{bestStreak}</span>
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Best</span>
                </div>
                <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Moves</span>
                  <span className="tabular-nums font-mono text-[13px] text-yellow-400/90">{moveCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Time</span>
                  <span className="tabular-nums font-mono text-[13px]">{formatTime(timeElapsed)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={handleUndo}
                  className="p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95"
                  title="Undo"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={handleRedo}
                  className="p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95"
                  title="Redo"
                >
                  <RotateCw size={18} />
                </button>
                <button
                  onClick={handleHint}
                  className="p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95"
                  title="Hint"
                >
                  <Lightbulb size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Top Bar */}
          {!isLandscapeMobile && (
            <div className="flex md:hidden items-center justify-between px-3 py-1.5 bg-[#072907] border-b border-[#1a5c1a]/30">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-white/50 active:text-white p-1">
                  <ArrowLeft size={16} />
                </Link>
                <div className="flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full px-2 py-0.5">
                  <Flame size={12} className="text-orange-400" />
                  <span className="text-[11px] font-bold text-orange-300">Streak</span>
                </div>
              </div>
              {/* Prominent streak counter */}
              <div className="flex items-center gap-3 text-xs text-white/70">
                <div className="flex items-center gap-1">
                  <Flame size={14} className="text-orange-400" />
                  <span className="text-base font-black text-orange-300 tabular-nums">{currentStreak}</span>
                </div>
                <span className="text-white/30">|</span>
                <span className="tabular-nums font-mono">{formatTime(timeElapsed)}</span>
                <span>{moveCount} moves</span>
              </div>
            </div>
          )}

          {/* Game Canvas Container */}
          <div className="relative flex-1">
            <div ref={containerRef} id="game-container" className="absolute inset-0" />

            {/* Auto-Finish Button */}
            {autoCompletable && phase === 'playing' && (
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

            {/* Win Celebration Overlay (brief, auto-advances) */}
            <AnimatePresence>
              {phase === 'won' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-gradient-to-br from-orange-900/95 to-amber-900/95 border border-orange-500/50 rounded-2xl shadow-2xl shadow-orange-500/20 px-8 py-6 text-center backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ rotate: [-5, 5, -5], scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="text-4xl mb-2"
                    >
                      🔥
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                      className="text-5xl font-black text-orange-300 tabular-nums"
                    >
                      {currentStreak}
                    </motion.div>
                    <p className="text-orange-200/80 text-sm font-medium mt-1">
                      {currentStreak === 1 ? 'First win!' : 'in a row!'}
                    </p>
                    {isNewRecord && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-yellow-300 text-xs font-bold mt-2"
                      >
                        NEW RECORD!
                      </motion.p>
                    )}
                    <p className="text-orange-200/50 text-xs mt-3">Next deal loading...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Streak Over Screen */}
            <AnimatePresence>
              {phase === 'over' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-[#0d2f0d]/95 border border-white/10 rounded-2xl shadow-2xl p-8 max-w-sm w-[90%] text-center backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-3">
                      {currentStreak >= 10 ? '🏆' : currentStreak >= 5 ? '🔥' : currentStreak >= 1 ? '👏' : '💪'}
                    </div>
                    <h2 className="text-2xl font-black text-white mb-1">Streak Over!</h2>

                    {currentStreak > 0 ? (
                      <>
                        <p className="text-white/60 text-sm mb-4">
                          You solved <span className="text-orange-300 font-bold">{currentStreak}</span> game{currentStreak !== 1 ? 's' : ''} in a row
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <Flame size={16} className="text-orange-400" />
                            </div>
                            <div className="text-3xl font-black text-orange-300">{currentStreak}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">This Streak</div>
                          </div>
                          <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <Trophy size={16} className="text-yellow-500" />
                            </div>
                            <div className="text-3xl font-black text-yellow-400">{bestStreak}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Best Streak</div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-white/60 text-sm mb-6">
                        No wins this time. Keep practicing!
                      </p>
                    )}

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleRestartStreak}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white font-semibold rounded-lg transition-colors active:scale-95"
                      >
                        <Shuffle size={18} />
                        Try Again
                      </button>
                      {currentStreak > 0 && (
                        <button
                          onClick={handleShare}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-lg transition-colors active:scale-95"
                        >
                          <Share2 size={18} />
                          {shareStatus === 'copied' ? 'Copied!' : 'Share Streak'}
                        </button>
                      )}
                      <Link
                        href="/"
                        className="mt-2 text-white/40 hover:text-white/60 font-medium text-sm transition-colors py-1 text-center"
                      >
                        Back to FreeCell
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Deadlock handling — in streak mode, deadlock = streak over */}
            {/* (handled by useEffect that watches isDeadlocked) */}

            {/* Floating landscape undo/redo */}
            {isLandscapeMobile && (
              <div className="absolute bottom-2 right-2 z-20 flex gap-1.5 md:hidden">
                <button onClick={handleUndo} className="p-2 bg-black/40 active:bg-black/60 rounded-lg text-white/70" title="Undo">
                  <RotateCcw size={18} />
                </button>
                <button onClick={handleRedo} className="p-2 bg-black/40 active:bg-black/60 rounded-lg text-white/70" title="Redo">
                  <RotateCw size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Bottom Bar — 5 icons: Back, Undo, Redo, Hint, Give Up */}
          {!isLandscapeMobile && (
            <div className="flex md:hidden items-center justify-around px-2 py-2 bg-gradient-to-t from-black/80 to-[#072907]/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-area-bottom z-20">
              <Link
                href="/"
                className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white active:scale-90 transition-all"
              >
                <Home size={20} />
                <span className="text-[10px]">Home</span>
              </Link>
              <button
                onClick={handleUndo}
                className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white active:scale-90 transition-all font-medium"
                title="Undo"
              >
                <RotateCcw size={20} />
                <span className="text-[10px]">Undo</span>
              </button>
              <button
                onClick={handleRedo}
                className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white active:scale-90 transition-all font-medium"
                title="Redo"
              >
                <RotateCw size={20} />
                <span className="text-[10px]">Redo</span>
              </button>
              <button
                onClick={handleHint}
                className="flex flex-col items-center gap-0.5 p-2 text-white/70 active:text-white active:scale-90 transition-all font-medium"
                title="Hint"
              >
                <Lightbulb size={20} />
                <span className="text-[10px]">Hint</span>
              </button>
              <button
                onClick={handleGiveUp}
                className="flex flex-col items-center gap-0.5 p-2 text-red-400/70 active:text-red-300 active:scale-90 transition-all font-medium"
                title="Give Up"
              >
                <AlertTriangle size={20} />
                <span className="text-[10px]">Give Up</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Ad Gutter */}
        <div className="hidden lg:flex flex-col flex-1 items-center py-4 px-2 border-l border-white/10 bg-black/10">
          <div className="w-[160px] h-[600px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/20 text-white/30 text-sm font-semibold tracking-widest uppercase">
            Advertisement
          </div>
        </div>

      </div>
    </div>
  );
}
