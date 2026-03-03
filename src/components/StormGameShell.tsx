'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gameBridge } from '../game/GameBridge';
import { RotateCcw, RotateCw, Lightbulb, Share2, Home, Zap, Trophy, ArrowLeft, Timer, Shuffle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomSolvableGame } from '../lib/solvableDeals';
import { loadStormData, updateBestScore } from '../lib/stormStorage';
import { soundManager } from '../lib/sounds';
import { loadSettings } from '../lib/storage';

const STORM_DURATION = 180; // 3 minutes in seconds
const BONUS_FAST = 15;  // < 60s solve
const BONUS_NORMAL = 10; // 60-120s solve
const BONUS_SLOW = 5;   // > 120s solve

type Phase = 'ready' | 'playing' | 'won' | 'over';

export default function StormGameShell() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const mountedRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('ready');
  const [gamesSolved, setGamesSolved] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(STORM_DURATION);
  const [gameTimer, setGameTimer] = useState(0); // per-game timer
  const [isGameTimerRunning, setIsGameTimerRunning] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [autoCompletable, setAutoCompletable] = useState(false);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [lastBonus, setLastBonus] = useState<number | null>(null);
  const [isDeadlocked, setIsDeadlocked] = useState(false);

  // Load best score on mount
  useEffect(() => {
    setBestScore(loadStormData().bestScore);
    const settings = loadSettings();
    soundManager.setMuted(!settings.soundEnabled);
    // Track mode for Explorer achievement
    import('../lib/achievementTracker').then(m => m.recordModePlayed('storm'));
  }, []);

  // Main countdown timer
  useEffect(() => {
    if (phase !== 'playing' && phase !== 'won') return;
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  // Check for time up
  useEffect(() => {
    if (timeRemaining <= 0 && (phase === 'playing' || phase === 'won')) {
      setPhase('over');
      const newRecord = updateBestScore(gamesSolved);
      if (newRecord) {
        setIsNewRecord(true);
        setBestScore(gamesSolved);
      }
    }
  }, [timeRemaining, phase, gamesSolved]);

  // Per-game timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGameTimerRunning && phase === 'playing') {
      interval = setInterval(() => {
        setGameTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameTimerRunning, phase]);

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

  const getTimeBonus = (solveTime: number): number => {
    if (solveTime < 60) return BONUS_FAST;
    if (solveTime < 120) return BONUS_NORMAL;
    return BONUS_SLOW;
  };

  // Handle win — add time bonus, auto-advance
  const handleWin = useCallback(() => {
    setPhase('won');
    setGamesSolved(prev => prev + 1);
    const bonus = getTimeBonus(gameTimer);
    setLastBonus(bonus);
    setTimeRemaining(prev => prev + bonus);
  }, [gameTimer]);

  // Auto-advance after brief win celebration
  useEffect(() => {
    if (phase === 'won') {
      const timer = setTimeout(() => {
        if (timeRemaining <= 0) return; // Time expired during celebration
        setPhase('playing');
        setAutoCompletable(false);
        setIsDeadlocked(false);
        setLastBonus(null);
        gameBridge.emit('newGame', getRandomSolvableGame());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [phase, timeRemaining]);

  // Handle deadlock — just deal a new game (no penalty, time keeps ticking)
  const handleNewDeal = useCallback(() => {
    if (phase !== 'playing') return;
    setIsDeadlocked(false);
    setAutoCompletable(false);
    gameBridge.emit('newGame', getRandomSolvableGame());
  }, [phase]);

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
      setGameTimer(0);
      setIsGameTimerRunning(false);
      setAutoCompletable(false);
      setIsDeadlocked(false);
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number };
      setMoveCount(d.moveCount);
      if (d.moveCount > 0) setIsGameTimerRunning(true);
      if (d.moveCount === 0) setIsGameTimerRunning(false);
    });

    const unsubWin = gameBridge.on('gameWon', () => {
      setIsGameTimerRunning(false);
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

  // Ref pattern for event handlers
  const handleWinRef = useRef(handleWin);
  handleWinRef.current = handleWin;

  // React to win via gameWon event
  useEffect(() => {
    const unsub = gameBridge.on('gameWon', () => {
      handleWinRef.current();
    });
    return unsub;
  }, []);

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

  const handleStart = () => {
    setPhase('playing');
    setGamesSolved(0);
    setTimeRemaining(STORM_DURATION);
    setGameTimer(0);
    setIsDeadlocked(false);
    setAutoCompletable(false);
    setIsNewRecord(false);
    setLastBonus(null);
    setShareStatus('idle');
    gameBridge.emit('newGame', getRandomSolvableGame());
  };

  const handlePlayAgain = () => {
    setPhase('ready');
    setGamesSolved(0);
    setTimeRemaining(STORM_DURATION);
    setGameTimer(0);
    setIsDeadlocked(false);
    setAutoCompletable(false);
    setIsNewRecord(false);
    setLastBonus(null);
    setShareStatus('idle');
    setBestScore(loadStormData().bestScore);
  };

  const handleShare = async () => {
    const shareText = `I solved ${gamesSolved} FreeCell game${gamesSolved !== 1 ? 's' : ''} in Puzzle Storm! ⚡\nCan you beat my score? https://playfreecellonline.com/storm`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'FreeCell Puzzle Storm', text: shareText });
        return;
      } catch { /* fall through to clipboard */ }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch { /* silent fail */ }
  };

  // Timer urgency color
  const timerColor = timeRemaining <= 10
    ? 'text-red-400'
    : timeRemaining <= 30
      ? 'text-yellow-400'
      : 'text-cyan-300';

  const timerBg = timeRemaining <= 10
    ? 'bg-red-500/20 border-red-500/40'
    : timeRemaining <= 30
      ? 'bg-yellow-500/20 border-yellow-500/40'
      : 'bg-cyan-500/20 border-cyan-500/30';

  return (
    <div className="flex w-full h-dvh bg-[#0a1a35]">
      <div className="flex w-full h-full max-w-[1400px] mx-auto relative overflow-hidden">

        {/* Left Ad Gutter */}
        <div className="hidden lg:flex flex-col flex-1 items-center py-4 px-2 border-r border-white/10 bg-black/10">
          <div className="w-[160px] h-[600px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/20 text-white/30 text-sm font-semibold tracking-widest uppercase">
            Advertisement
          </div>
        </div>

        {/* Center Game Container */}
        <div className="flex flex-col w-full max-w-[1000px] h-full bg-[#0d2244] shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 shrink-0">

          {/* Desktop Top Bar */}
          <div className="hidden md:flex items-center justify-between px-6 py-3 bg-[#071529] border-b border-white/10 z-20 sticky top-0">
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
              <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                <Zap size={16} className="text-cyan-400" />
                <span className="text-sm font-bold text-cyan-300">Puzzle Storm</span>
              </div>
            </div>

            {phase !== 'ready' && (
              <div className="flex items-center gap-4">
                {/* Timer + Stats */}
                <div className="flex items-center gap-3 px-4 py-1.5 bg-black/30 border border-white/5 rounded-full text-xs font-medium text-white/80 shadow-inner">
                  <div className={`flex items-center gap-1.5 border-r border-white/10 pr-3 ${timerBg} px-2 py-0.5 rounded-full`}>
                    <Timer size={14} className={timerColor} />
                    <span className={`text-lg font-black tabular-nums ${timerColor}`}>{formatTime(timeRemaining)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                    <Zap size={14} className="text-cyan-400" />
                    <span className="text-lg font-black text-cyan-300 tabular-nums">{gamesSolved}</span>
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Solved</span>
                  </div>
                  <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                    <Trophy size={12} className="text-yellow-500/60" />
                    <span className="tabular-nums font-mono text-[13px]">{bestScore}</span>
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Best</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white/40 uppercase tracking-widest text-[10px]">Game</span>
                    <span className="tabular-nums font-mono text-[13px]">{formatTime(gameTimer)}</span>
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
                  <button
                    onClick={handleNewDeal}
                    className="p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95"
                    title="Skip Deal"
                  >
                    <Shuffle size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Top Bar */}
          {!isLandscapeMobile && (
            <div className="flex md:hidden items-center justify-between px-3 py-1.5 bg-[#071529] border-b border-[#1a3c6a]/30">
              <div className="flex items-center gap-2">
                <Link href="/" className="text-white/50 active:text-white p-1">
                  <ArrowLeft size={16} />
                </Link>
                <div className="flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-full px-2 py-0.5">
                  <Zap size={12} className="text-cyan-400" />
                  <span className="text-[11px] font-bold text-cyan-300">Storm</span>
                </div>
              </div>
              {phase !== 'ready' && (
                <div className="flex items-center gap-3 text-xs text-white/70">
                  <div className={`flex items-center gap-1 ${timerBg} px-1.5 py-0.5 rounded-full`}>
                    <Timer size={12} className={timerColor} />
                    <span className={`text-sm font-black tabular-nums ${timerColor}`}>{formatTime(timeRemaining)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap size={14} className="text-cyan-400" />
                    <span className="text-base font-black text-cyan-300 tabular-nums">{gamesSolved}</span>
                  </div>
                  <span className="text-white/30">|</span>
                  <span className="tabular-nums font-mono">{formatTime(gameTimer)}</span>
                </div>
              )}
            </div>
          )}

          {/* Game Canvas Container */}
          <div className="relative flex-1">
            <div ref={containerRef} id="game-container" className="absolute inset-0" />

            {/* Ready Screen */}
            <AnimatePresence>
              {phase === 'ready' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-[#0d2244]/95 border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 max-w-sm w-[90%] text-center backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-5xl mb-4"
                    >
                      ⚡
                    </motion.div>
                    <h2 className="text-3xl font-black text-white mb-2">Puzzle Storm</h2>
                    <p className="text-white/60 text-sm mb-6">
                      Solve as many games as possible in {STORM_DURATION / 60} minutes. Win bonus time for fast solves!
                    </p>

                    <div className="bg-black/20 border border-white/5 rounded-xl p-4 mb-6 text-left space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <span className="text-green-400 font-bold w-8">+{BONUS_FAST}s</span>
                        <span>Fast solve (&lt; 1 min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <span className="text-yellow-400 font-bold w-8">+{BONUS_NORMAL}s</span>
                        <span>Normal solve (1-2 min)</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <span className="text-orange-400 font-bold w-8">+{BONUS_SLOW}s</span>
                        <span>Slow solve (&gt; 2 min)</span>
                      </div>
                    </div>

                    {bestScore > 0 && (
                      <p className="text-white/40 text-xs mb-4">
                        Your best: <span className="text-cyan-300 font-bold">{bestScore}</span> game{bestScore !== 1 ? 's' : ''}
                      </p>
                    )}

                    <button
                      onClick={handleStart}
                      className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-xl transition-all active:scale-[0.97] shadow-lg shadow-cyan-500/20"
                    >
                      Start Storm
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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

            {/* Deadlock — offer skip in storm mode */}
            <AnimatePresence>
              {isDeadlocked && phase === 'playing' && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="absolute top-4 left-1/2 -translate-x-1/2 z-30"
                >
                  <div className="flex items-center gap-3 bg-red-900/90 border border-red-500/40 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
                    <span className="text-red-300 text-sm font-medium">Stuck?</span>
                    <button
                      onClick={handleNewDeal}
                      className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      Skip Deal
                    </button>
                    <button
                      onClick={handleUndo}
                      className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Undo
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Win Celebration (brief, shows time bonus) */}
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
                    className="bg-gradient-to-br from-cyan-900/95 to-blue-900/95 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 px-8 py-6 text-center backdrop-blur-sm"
                  >
                    <motion.div
                      animate={{ rotate: [-5, 5, -5], scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="text-4xl mb-2"
                    >
                      ⚡
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, type: 'spring', stiffness: 400 }}
                      className="text-5xl font-black text-cyan-300 tabular-nums"
                    >
                      {gamesSolved}
                    </motion.div>
                    <p className="text-cyan-200/80 text-sm font-medium mt-1">
                      {gamesSolved === 1 ? 'First solve!' : 'games solved!'}
                    </p>
                    {lastBonus !== null && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-green-400 text-lg font-black mt-2"
                      >
                        +{lastBonus}s
                      </motion.p>
                    )}
                    <p className="text-cyan-200/50 text-xs mt-3">Next deal loading...</p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Game Over Screen */}
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
                    className="bg-[#0d1f3d]/95 border border-white/10 rounded-2xl shadow-2xl p-8 max-w-sm w-[90%] text-center backdrop-blur-sm"
                  >
                    <div className="text-4xl mb-3">
                      {gamesSolved >= 10 ? '🏆' : gamesSolved >= 5 ? '⚡' : gamesSolved >= 1 ? '👏' : '💪'}
                    </div>
                    <h2 className="text-2xl font-black text-white mb-1">Time&apos;s Up!</h2>

                    {gamesSolved > 0 ? (
                      <>
                        <p className="text-white/60 text-sm mb-4">
                          You solved <span className="text-cyan-300 font-bold">{gamesSolved}</span> game{gamesSolved !== 1 ? 's' : ''}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <Zap size={16} className="text-cyan-400" />
                            </div>
                            <div className="text-3xl font-black text-cyan-300">{gamesSolved}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">This Storm</div>
                          </div>
                          <div className="bg-black/20 border border-white/5 rounded-xl p-3">
                            <div className="flex items-center justify-center gap-1.5 mb-1">
                              <Trophy size={16} className="text-yellow-500" />
                            </div>
                            <div className="text-3xl font-black text-yellow-400">{bestScore}</div>
                            <div className="text-[10px] text-white/40 uppercase tracking-wider mt-1">Best Score</div>
                          </div>
                        </div>

                        {isNewRecord && (
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-yellow-300 text-sm font-bold mb-4"
                          >
                            🎉 NEW RECORD!
                          </motion.p>
                        )}
                      </>
                    ) : (
                      <p className="text-white/60 text-sm mb-6">
                        No wins this time. Keep practicing!
                      </p>
                    )}

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handlePlayAgain}
                        className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                      >
                        <Zap size={18} />
                        Play Again
                      </button>
                      {gamesSolved > 0 && (
                        <button
                          onClick={handleShare}
                          className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-lg transition-colors active:scale-95"
                        >
                          <Share2 size={18} />
                          {shareStatus === 'copied' ? 'Copied!' : 'Share Score'}
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

          {/* Mobile Bottom Bar */}
          {!isLandscapeMobile && (
            <div className="flex md:hidden items-center justify-around px-2 py-2 bg-gradient-to-t from-black/80 to-[#071529]/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-area-bottom z-20">
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
                onClick={handleNewDeal}
                className="flex flex-col items-center gap-0.5 p-2 text-cyan-400/70 active:text-cyan-300 active:scale-90 transition-all font-medium"
                title="Skip"
              >
                <Shuffle size={20} />
                <span className="text-[10px]">Skip</span>
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
