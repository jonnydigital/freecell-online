'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gameBridge } from '../game/GameBridge';
import { GameStats, createEmptyStats, recordWin, recordLoss } from '../lib/stats';
import { loadStats, saveStats } from '../lib/storage';
import { recordGameResult } from '../lib/gameHistory';
import { trackGameStart, trackWin, trackAbandoned, trackHint, trackUndo, trackMove, trackDeadlock, gameSession } from '../lib/analytics';
import { initErrorTracking, setGameContext } from '../lib/errorTracking';
import { checkWinAchievements, recordThemeUsed } from '../lib/achievementTracker';
import type { Achievement } from '../lib/achievements';
import { getTodaysSeed, getTodayStr, recordDailyCompletion, isTodayCompleted } from '../lib/dailyChallenge';
import { RotateCcw, RotateCw, Lightbulb, BarChart3, MessageSquare, Shuffle, Calendar, Volume2, VolumeX, Home, Share2, AlertTriangle, ChevronLeft, Trophy, Settings as SettingsIcon, Flame, Zap, Palette } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import StatsPanel from './StatsPanel';
import FeedbackModal from './FeedbackModal';
import DailyChallengePanel from './DailyChallengePanel';
import GameNumberInput from './GameNumberInput';
import WinScreen from './WinScreen';
import SolutionReplay from './SolutionReplay';
import { useSolver } from '@/hooks/useSolver';
import HomeOverlay from './HomeOverlay';
import DailyBanner from './DailyBanner';
import AchievementsPanel from './AchievementsPanel';
import AchievementToast from './AchievementToast';
import KeyboardShortcuts from './KeyboardShortcuts';
import StreakMilestone, { isMilestone } from './StreakMilestone';
import Leaderboard from './Leaderboard';
import SettingsPanel from './SettingsPanel';
import Tutorial from './Tutorial';
import type { HighlightRect } from './Tutorial';
import { soundManager } from '../lib/sounds';
import { GameSettings, loadSettings, saveSettings } from '../lib/storage';
import { submitScore, fetchDailyLeaderboard, LeaderboardEntry } from '../lib/leaderboardClient';
import { getPlayerId } from '../lib/playerIdentity';

interface GameShellProps {
  initialGameNumber?: number;
  variant?: 'freecell' | 'bakers-game';
}

export default function GameShell({ initialGameNumber, variant = 'freecell' }: GameShellProps = {}) {
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
  const [isDeadlocked, setIsDeadlocked] = useState(false);
  const [streakMilestone, setStreakMilestone] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(() => soundManager.muted);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialRect, setTutorialRect] = useState<HighlightRect | null>(null);
  const undoDesktopRef = useRef<HTMLButtonElement>(null);
  const undoMobileRef = useRef<HTMLButtonElement>(null);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const { status: solverStatus, moves: solverMoves, totalMoveCount: solverTotalMoves, solve: startSolver, reset: resetSolver } = useSolver();
  const [dailyCompleted, setDailyCompleted] = useState(true); // assume completed until checked
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [leaderboardRank, setLeaderboardRank] = useState<number | undefined>();
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && !isWon) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isWon]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  // Load stats on mount + track current theme
  useEffect(() => {
    setStats(loadStats());
    setDailyCompleted(isTodayCompleted());
    initErrorTracking();
    // Record current theme for Theme Collector achievement
    const themeId = localStorage.getItem('theme-id');
    if (themeId) recordThemeUsed(themeId);
    // Listen for theme changes
    const handleThemeChange = () => {
      const id = localStorage.getItem('theme-id');
      if (id) recordThemeUsed(id);
    };
    const unsub = gameBridge.on('themeChanged', handleThemeChange);
    // Show tutorial on first visit (skip if user has any play history)
    try {
      const seen = localStorage.getItem('tutorialSeen');
      const hasStats = localStorage.getItem('freecell-stats');
      if (!seen && !hasStats) {
        const timer = setTimeout(() => setShowTutorial(true), 1200);
        return () => { unsub(); clearTimeout(timer); };
      } else if (!seen) {
        // Existing user, mark as seen so we never check again
        localStorage.setItem('tutorialSeen', '1');
      }
    } catch {
      // localStorage blocked
    }
    return () => { unsub(); };
  }, []);

  // Detect landscape on mobile (hide toolbars to maximize game area)
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

  const winDataRef = useRef<{ time: number; moves: number } | null>(null);

  const handleWin = useCallback(
    (data: unknown) => {
      const d = data as { time: number; moves: number };
      winDataRef.current = d;
      setIsWon(true);
      trackWin(d.time, d.moves);
      recordGameResult(true, d.moves, d.time, gameNumber ?? undefined);
      setStats((prev) => {
        const updated = recordWin(prev, d.time, d.moves);
        saveStats(updated);
        if (isMilestone(updated.currentStreak)) {
          setStreakMilestone(updated.currentStreak);
        }
        // Check achievements with updated stats
        const { newlyUnlocked } = checkWinAchievements(
          updated,
          d.time,
          d.moves,
          gameSession.hintsUsed,
          gameSession.undosUsed,
        );
        if (newlyUnlocked.length > 0) {
          setNewAchievements(newlyUnlocked);
        }
        return updated;
      });
    },
    [gameNumber]
  );

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    // Parse URL ?game= parameter for shared links
    let initialGame: number | null = null;
    let initialGameUsed = false;
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game');
    if (gameParam) {
      const num = parseInt(gameParam, 10);
      if (!isNaN(num) && num >= 1 && num <= 9999999) {
        initialGame = num;
      }
    }

    const initPhaser = async () => {
      if (!containerRef.current || gameRef.current) return;

      // Set initial game number and variant before Phaser creates the scene
      if (initialGameNumber) {
        gameBridge.initialGameNumber = initialGameNumber;
      }
      gameBridge.variant = variant;

      // Wait for container to have dimensions (mobile can be slow to layout)
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

      // If URL has ?game= param, override the first random game
      if (initialGame !== null && !initialGameUsed) {
        initialGameUsed = true;
        gameBridge.emit('newGame', initialGame);
        return;
      }

      if (gameSession.gameNumber > 0 && gameSession.moveCount > 0) {
        trackAbandoned();
      }
      setGameNumber(d.gameNumber);
      setMoveCount(0);
      setTimeElapsed(0);
      setIsTimerRunning(false);
      setIsWon(false);
      setAutoCompletable(false);
      trackGameStart(d.gameNumber);
      setIsDailyGame(d.gameNumber === getTodaysSeed());
      // Update URL to reflect current game number (shareable)
      if (d.gameNumber >= 1 && d.gameNumber <= 1000000) {
        window.history.replaceState(null, '', `/game/${d.gameNumber}`);
      }
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      const d = data as { moveCount: number; gameNumber: number };
      setMoveCount(d.moveCount);
      if (d.moveCount > 0) setIsTimerRunning(true);
      if (d.moveCount === 0) setIsTimerRunning(false);
      trackMove('tap');
      setGameContext(d.gameNumber, d.moveCount);
    });

    const unsubWin = gameBridge.on('gameWon', handleWin);

    const unsubDeadlock = gameBridge.on('deadlock', () => {
      setIsDeadlocked(true);
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
      setDailyCompleted(true);
    }
  }, [isWon, isDailyGame]);

  // Auto-submit score to leaderboard on daily challenge win
  useEffect(() => {
    if (!isWon || !isDailyGame || !winDataRef.current || !gameNumber) return;

    const submit = async () => {
      setLeaderboardLoading(true);
      try {
        const result = await submitScore(gameNumber, winDataRef.current!.moves, winDataRef.current!.time);
        setLeaderboardRank(result.rank);

        // Fetch updated leaderboard
        const entries = await fetchDailyLeaderboard();
        setLeaderboardEntries(entries);
      } catch {
        // Silent fail — leaderboard is non-critical
      }
      setLeaderboardLoading(false);
    };
    submit();
  }, [isWon, isDailyGame, gameNumber]);

  // Start solver analysis when game is won
  useEffect(() => {
    if (isWon && gameNumber) {
      startSolver(gameNumber);
    }
  }, [isWon, gameNumber, startSolver]);

  const handleNewGame = () => {
    setIsDailyGame(false);
    setIsWon(false);
    setIsDeadlocked(false);
    setStreakMilestone(null);
    setShowReplay(false);
    setLeaderboardEntries([]);
    setLeaderboardRank(undefined);
    resetSolver();
    gameBridge.emit('newGame');
  };
  const handleUndo = () => {
    setIsDeadlocked(false);
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

  const handleUpdateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);

    // Sync sound
    soundManager.setMuted(!newSettings.soundEnabled);
    setIsMuted(!newSettings.soundEnabled);

    // Emit to game engine
    gameBridge.emit('updateSettings', newSettings);
  };

  const handleTutorialStepChange = useCallback((highlightKey: string | null) => {
    if (!highlightKey) {
      setTutorialRect(null);
      return;
    }

    // For the undo button, get DOM rect directly
    if (highlightKey === 'undo') {
      const btn = undoDesktopRef.current ?? undoMobileRef.current;
      if (btn) {
        const r = btn.getBoundingClientRect();
        setTutorialRect({ x: r.left, y: r.top, width: r.width, height: r.height });
      } else {
        setTutorialRect(null);
      }
      return;
    }

    // For game elements, ask Phaser for position
    gameBridge.emit('requestElementPosition', highlightKey);
  }, []);

  // Listen for Phaser element position responses (for tutorial spotlight)
  useEffect(() => {
    const unsub = gameBridge.on('elementPositionResponse', (data: unknown) => {
      const d = data as { key: string; rect: HighlightRect };
      if (showTutorial) {
        setTutorialRect(d.rect);
      }
    });
    return unsub;
  }, [showTutorial]);

  const handleDismissTutorial = useCallback(() => {
    setShowTutorial(false);
    setTutorialRect(null);
    try { localStorage.setItem('tutorialSeen', '1'); } catch { }
  }, []);

  const handleShowTutorial = useCallback(() => {
    setShowSettings(false);
    setShowTutorial(true);
  }, []);

  const handleShareGame = async () => {
    if (!gameNumber) return;
    const shareUrl = `${window.location.origin}/?game=${gameNumber}`;
    const shareText = `Can you solve FreeCell #${gameNumber}? 🃏 ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'FreeCell Online', text: shareText });
        return;
      } catch { /* fall through to clipboard */ }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch { /* silent fail */ }
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
      if (e.key === '?') setShowShortcuts(true);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const iconBtnClass = "p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95";
  const iconSize = 16;

  return (
    <div className="flex w-full h-dvh transition-colors duration-500" style={{ backgroundColor: 'var(--theme-base)' }}>
      {/* Structural Wrapper for the Game Area + Ad Sidebars */}
      <div className="flex w-full h-full max-w-[1400px] mx-auto relative overflow-hidden">

        {/* Left Ad Gutter (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex flex-col flex-1 items-center py-4 px-2 border-r border-white/10 bg-black/10">
          <div className="w-[160px] h-[600px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/20 text-white/30 text-sm font-semibold tracking-widest uppercase">
            Advertisement
          </div>
        </div>

        {/* Center Game Container (1000px max) */}
        <div className="flex flex-col w-full max-w-[1000px] h-full shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10 shrink-0 transition-colors duration-500" style={{ backgroundColor: 'var(--theme-mid)' }}>

          {/* ── Desktop Top Bar (Clean & Professional) ── */}
          <div className="hidden md:flex items-center justify-between px-6 py-3 bg-[#072907] border-b border-white/10 z-20 sticky top-0">
            <div className="flex items-center gap-8">
              {/* Logo / Home Trigger */}
              <button
                onClick={() => setShowHome(true)}
                className="group flex flex-col items-start transition-transform hover:opacity-80 active:scale-95"
              >
                <h1 className="text-xl font-black text-white leading-none uppercase tracking-tighter">
                  Freecell<span className="text-[#D4AF37]">.</span>
                </h1>
              </button>

              {/* Direct Navigation Links */}
              <nav className="flex items-center gap-5 text-sm font-medium text-white/60">
                <a href="/how-to-play" className="hover:text-white transition-colors">How to Play</a>
                <a href="/strategy" className="hover:text-white transition-colors">Strategy</a>
                <button onClick={() => setShowDaily(true)} className="flex items-center gap-1.5 text-yellow-500/80 hover:text-yellow-400 transition-colors">
                  <Calendar size={14} />
                  Daily Challenge
                </button>
                <a href="/streak" className="flex items-center gap-1.5 text-orange-400/80 hover:text-orange-300 transition-colors">
                  <Flame size={14} />
                  Puzzle Streak
                </a>
                <a href="/storm" className="flex items-center gap-1.5 text-cyan-400/80 hover:text-cyan-300 transition-colors">
                  <Zap size={14} />
                  Puzzle Storm
                </a>
                <a href="/bakers-game" className="text-purple-400/80 hover:text-purple-300 transition-colors">
                  Baker&apos;s Game
                </a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {/* Game Stats Pill */}
              <div className="flex items-center gap-3 px-4 py-1.5 bg-black/30 border border-white/5 rounded-full text-xs font-medium text-white/80 shadow-inner">
                <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Time</span>
                  <span className="tabular-nums font-mono text-[13px]">{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Moves</span>
                  <span className="tabular-nums font-mono text-[13px] text-yellow-400/90">{moveCount}</span>
                </div>
                {gameNumber && (
                  <button
                    onClick={() => setShowGameInput(true)}
                    className="hover:text-white transition-colors cursor-pointer text-white/60 border-r border-white/10 pr-3"
                    title="Click to enter a game number"
                  >
                    #{gameNumber}
                  </button>
                )}
                <button
                  onClick={handleShareGame}
                  className="p-1 -mr-2 text-white/30 hover:text-[#D4AF37] transition-colors"
                  title={shareStatus === 'copied' ? 'Copied!' : 'Share this game'}
                >
                  <Share2 size={14} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 ml-2">
                <button
                  onClick={handleNewGame}
                  className="px-4 py-1.5 bg-[#1a5c1a] hover:bg-[#257a25] text-white text-xs font-bold rounded-full transition-all shadow-lg active:scale-95 border border-white/10"
                >
                  New Deal
                </button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <button ref={undoDesktopRef} onClick={handleUndo} className={iconBtnClass} title="Undo (Ctrl+Z)">
                  <RotateCcw size={18} />
                </button>
                <button onClick={handleRedo} className={iconBtnClass} title="Redo (Ctrl+Y)">
                  <RotateCw size={18} />
                </button>
                <button onClick={handleHint} className={iconBtnClass} title="Hint (H)">
                  <Lightbulb size={18} />
                </button>
                <button onClick={() => setShowLeaderboard(true)} className={iconBtnClass} title="Leaderboard">
                  <Trophy size={18} />
                </button>
                <button onClick={() => setShowSettings(true)} className={iconBtnClass} title="Settings">
                  <SettingsIcon size={18} />
                </button>
                <button onClick={() => setShowStats(true)} className={iconBtnClass} title="Statistics">
                  <BarChart3 size={18} />
                </button>
                <button onClick={handleToggleMute} className={iconBtnClass} title={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            </div>
          </div>

          {/* ── Mobile Top Bar (only info, hidden on desktop and landscape) ── */}
          {!isLandscapeMobile && (
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
                <span className="tabular-nums font-mono">{formatTime(timeElapsed)}</span>
                <span>{moveCount} moves</span>
                {isWon && (
                  <span className="text-yellow-400 font-bold animate-pulse">Win!</span>
                )}
                <button
                  onClick={handleShareGame}
                  className="p-1 text-white/40 active:text-[#D4AF37] transition-colors"
                  title="Share"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Game Canvas Container */}
          <div className="relative flex-1">
            <div ref={containerRef} id="game-container" className="absolute inset-0" />

            {/* Daily Challenge Banner */}
            {/* Daily Challenge moved to Home overlay — no banner during gameplay */}

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

            {/* Win Screen (appears 5s after win, overlays celebration) */}
            {isWon && winDataRef.current && (
              <WinScreen
                gameNumber={gameNumber || 0}
                time={winDataRef.current.time}
                moves={winDataRef.current.moves}
                hintsUsed={gameSession.hintsUsed}
                onPlayAgain={handleNewGame}
                onDailyChallenge={() => {
                  handlePlayDaily(getTodaysSeed());
                }}
                solverStatus={solverStatus}
                optimalMoves={solverMoves.length}
                onViewSolution={() => setShowReplay(true)}
                isDailyGame={isDailyGame}
                leaderboardEntries={leaderboardEntries}
                leaderboardRank={leaderboardRank}
                leaderboardLoading={leaderboardLoading}
                playerId={getPlayerId()}
              />
            )}

            {/* Solution Replay Overlay */}
            {showReplay && solverStatus === 'solved' && (
              <SolutionReplay
                gameNumber={gameNumber || 0}
                moves={solverMoves}
                totalMoveCount={solverTotalMoves}
                playerMoves={winDataRef.current?.moves ?? 0}
                onClose={() => setShowReplay(false)}
              />
            )}

            {/* Streak Milestone Toast */}
            {streakMilestone !== null && (
              <StreakMilestone
                streak={streakMilestone}
                show={true}
                onDismiss={() => setStreakMilestone(null)}
              />
            )}

            {/* Achievement Toast */}
            {newAchievements.length > 0 && (
              <AchievementToast
                achievements={newAchievements}
                onDone={() => setNewAchievements([])}
              />
            )}

            {/* Deadlock Overlay */}
            {isDeadlocked && !isWon && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
                <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                    <AlertTriangle size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">No More Moves</h2>
                    <p className="text-gray-600 leading-relaxed">
                      The game has reached a state with no legal moves remaining.
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-3">
                    <button
                      onClick={handleUndo}
                      className="w-full py-3 px-6 bg-[#1a5c1a] hover:bg-[#1f6d1f] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                    >
                      <ChevronLeft size={20} />
                      Undo Last Move
                    </button>
                    <button
                      onClick={() => { setIsDeadlocked(false); gameBridge.emit('restart'); }}
                      className="w-full py-3 px-6 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <RotateCcw size={18} />
                      Restart Deal
                    </button>
                    <button
                      onClick={handleNewGame}
                      className="mt-2 text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors py-1"
                    >
                      Give up & New Deal
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Floating landscape overlay: undo/redo when toolbars are hidden */}
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

          {/* ── Mobile Bottom Bar — 5 icons: Home, Streak, Undo, Redo, Hint ── */}
          {!isLandscapeMobile && (
            <div className="flex md:hidden items-center justify-around px-2 py-2 bg-gradient-to-t from-black/80 to-[#072907]/90 backdrop-blur-lg border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] safe-area-bottom z-20">
              <button
                onClick={() => setShowHome(true)}
                className="flex flex-col items-center gap-0.5 p-2 text-[#D4AF37] active:scale-90 transition-transform"
                title="Home"
              >
                <Home size={22} />
                <span className="text-[10px] font-medium">Home</span>
              </button>
              <a
                href="/streak"
                className="flex flex-col items-center gap-0.5 p-2 text-orange-400/80 active:text-orange-300 active:scale-90 transition-all font-medium"
                title="Puzzle Streak"
              >
                <Flame size={20} />
                <span className="text-[10px]">Streak</span>
              </a>
              <button
                ref={undoMobileRef}
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
            </div>
          )}

          {/* Home Overlay */}
          <HomeOverlay
            isOpen={showHome}
            onClose={() => setShowHome(false)}
            onPlayDaily={(seed) => { handlePlayDaily(seed); setShowHome(false); }}
            onNewGame={() => { handleNewGame(); setShowHome(false); }}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onFeedback={() => { setShowFeedback(true); setShowHome(false); }}
            onShowShortcuts={() => { setShowShortcuts(true); setShowHome(false); }}
            onAchievements={() => { setShowAchievements(true); setShowHome(false); }}
          />

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

          {/* Keyboard Shortcuts */}
          <KeyboardShortcuts
            isOpen={showShortcuts}
            onClose={() => setShowShortcuts(false)}
          />

          {/* Achievements */}
          <AchievementsPanel
            isOpen={showAchievements}
            onClose={() => setShowAchievements(false)}
          />

          {/* Leaderboard */}
          <Leaderboard
            isOpen={showLeaderboard}
            onClose={() => setShowLeaderboard(false)}
          />

          {/* Settings Panel */}
          <SettingsPanel
            isOpen={showSettings}
            onClose={() => setShowSettings(false)}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
            onShowTutorial={handleShowTutorial}
          />

          {/* Tutorial Overlay */}
          <Tutorial
            isOpen={showTutorial}
            onDismiss={handleDismissTutorial}
            highlightRect={tutorialRect}
            onStepChange={handleTutorialStepChange}
          />

          {/* New Professional Footer Section */}
          <div className="w-full bg-[#072907] border-t border-white/10 py-8 px-6 mt-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">Gameplay</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><Link href="/how-to-play" className="hover:text-white transition-colors">How to Play</Link></li>
                  <li><Link href="/strategy" className="hover:text-white transition-colors">Winning Strategy</Link></li>
                  <li><Link href="/rules" className="hover:text-white transition-colors">Game Rules</Link></li>
                  <li><Link href="/tips" className="hover:text-white transition-colors">Tips & Tricks</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">Reference</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
                  <li><Link href="/history" className="hover:text-white transition-colors">Game History</Link></li>
                  <li><Link href="/solitaire-types" className="hover:text-white transition-colors">Solitaire Types</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">Special</h4>
                <ul className="space-y-2 text-sm text-white/50">
                  <li><Link href="/winning-deals" className="hover:text-white transition-colors">Winning Deals</Link></li>
                  <li><button onClick={() => setShowDaily(true)} className="hover:text-white transition-colors">Daily Challenge</button></li>
                  <li><Link href="/streak" className="hover:text-white transition-colors">Puzzle Streak</Link></li>
                  <li><Link href="/storm" className="hover:text-white transition-colors">Puzzle Storm</Link></li>
                  <li><Link href="/bakers-game" className="hover:text-white transition-colors">Baker&apos;s Game</Link></li>
                  <li><button onClick={() => setShowLeaderboard(true)} className="hover:text-white transition-colors">World Rankings</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">PlayFreeCellOnline</h4>
                <p className="text-[10px] text-white/30 leading-relaxed mb-4">
                  The ultimate destination for FreeCell Solitaire. Built for enthusiasts who appreciate skill-based play and clean design.
                </p>
                <ul className="space-y-2 text-[11px] text-white/40 flex gap-4">
                  <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                  <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                  <li><Link href="/about" className="hover:text-white">About</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
                © 2026 PlayFreeCellOnline.com • All Rights Reserved
              </p>
            </div>
          </div>
        </div> {/* End Center Game Container */}

        {/* Right Ad Gutter (Hidden on mobile/tablet) */}
        <div className="hidden lg:flex flex-col flex-1 items-center py-4 px-2 border-l border-white/10 bg-black/10">
          <div className="w-[160px] h-[600px] border-2 border-dashed border-white/20 rounded-lg flex items-center justify-center bg-black/20 text-white/30 text-sm font-semibold tracking-widest uppercase">
            Advertisement
          </div>
        </div>

      </div>
    </div>
  );
}
