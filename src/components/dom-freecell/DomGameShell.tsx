'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import { GameStats, createEmptyStats, recordWin, recordLoss, getWinPercent } from '@/lib/stats';
import { loadStats, saveStats, saveStarRating, GameSettings, loadSettings, saveSettings } from '@/lib/storage';
import { recordGameResult } from '@/lib/gameHistory';
import { getTodaysSeed, getTodayStr, isTodayCompleted, getCurrentStreak, recordDailyCompletion } from '@/lib/dailyChallenge';
import { soundManager } from '@/lib/sounds';
import { useSolver } from '@/hooks/useSolver';
import { describeSolution } from '@/solver/FreeCellSolver';
import { RotateCcw, RotateCw, Lightbulb, Settings, AlertTriangle, ChevronLeft, ChevronRight, Volume2, VolumeX, X, Share2, Home, Shuffle, HelpCircle, Swords, Trophy, Play, Pause, Ghost, Layers } from 'lucide-react';
import { cardBackDesigns, getSelectedCardBack, setSelectedCardBack, type CardBackDesign } from '@/game/CardBacks';
import { checkWinAchievements, recordModePlayed, recordUniqueGame } from '@/lib/achievementTracker';
import type { Achievement } from '@/lib/achievements';
import { submitScore, fetchDailyLeaderboard, LeaderboardEntry } from '@/lib/leaderboardClient';
import { getPlayerId } from '@/lib/playerIdentity';
import KeyboardShortcuts from '../KeyboardShortcuts';
import Tutorial, { HighlightRect } from '../Tutorial';
import StatsPanel from '../StatsPanel';
import AchievementsPanel from '../AchievementsPanel';
import WinScreen from '../WinScreen';
import StreakMilestone, { isMilestone } from '../StreakMilestone';
import AchievementToast from '../AchievementToast';
import DomBoard from './DomBoard';
import { useHint } from './useHint';
import { announceToScreenReader } from '@/lib/accessibility';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface DomGameShellProps {
  initialGameNumber?: number;
}

// ---------------------------------------------------------------------------
// Helpers
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
// DomGameShell
// ---------------------------------------------------------------------------

export default function DomGameShell({ initialGameNumber }: DomGameShellProps) {
  // ── Zustand selectors ──
  const gameNumber = useDomFreecellStore((s) => s.gameNumber);
  const moveCount = useDomFreecellStore((s) => s.moveCount);
  const isWon = useDomFreecellStore((s) => s.isWon);
  const noMovesAvailable = useDomFreecellStore((s) => s.noMovesAvailable);
  const timerSeconds = useDomFreecellStore((s) => s.timerSeconds);
  const timerStarted = useDomFreecellStore((s) => s.timerStarted);
  const tickTimer = useDomFreecellStore((s) => s.tickTimer);
  const newGame = useDomFreecellStore((s) => s.newGame);
  const restart = useDomFreecellStore((s) => s.restart);
  const undo = useDomFreecellStore((s) => s.undo);
  const redo = useDomFreecellStore((s) => s.redo);
  const moveHistory = useDomFreecellStore((s) => s.moveHistory);
  const redoStack = useDomFreecellStore((s) => s.redoStack);
  const getEngine = useDomFreecellStore((s) => s.getEngine);

  // Replay / Ghost Mode selectors
  const replayMode = useDomFreecellStore((s) => s.replayMode);
  const replayMoves = useDomFreecellStore((s) => s.replayMoves);
  const replayIndex = useDomFreecellStore((s) => s.replayIndex);
  const startReplay = useDomFreecellStore((s) => s.startReplay);
  const replayNext = useDomFreecellStore((s) => s.replayNext);
  const replayPrev = useDomFreecellStore((s) => s.replayPrev);
  const stopReplay = useDomFreecellStore((s) => s.stopReplay);

  const canUndo = moveHistory.length > 0;
  const canRedo = redoStack.length > 0;

  // ── Local UI state ──
  const [stats, setStats] = useState<GameStats>(createEmptyStats);
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [isMuted, setIsMuted] = useState(() => soundManager.muted);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialHighlightRect, setTutorialHighlightRect] = useState<HighlightRect | null>(null);
  const [showHome, setShowHome] = useState(false);
  const [showGameInput, setShowGameInput] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [isAutoCompletable, setIsAutoCompletable] = useState(false);
  const [isDailyGame, setIsDailyGame] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [undosUsed, setUndosUsed] = useState(0);
  const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
  const [leaderboardRank, setLeaderboardRank] = useState<number | undefined>();
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const [streakMilestone, setStreakMilestone] = useState<number | null>(null);
  const [showReplay, setShowReplay] = useState(false);

  // Game number input state
  const [gameInputValue, setGameInputValue] = useState('');
  const [gameInputError, setGameInputError] = useState('');

  // ── Hint system ──
  const { hint, requestHint, clearHint } = useHint();

  // ── Idle hint timer ──
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isIdleHintRef = useRef(false);
  const [isIdleHint, setIsIdleHint] = useState(false);

  const isWonRef = useRef(isWon);
  const replayModeRef = useRef(replayMode);
  useEffect(() => { isWonRef.current = isWon; }, [isWon]);
  useEffect(() => { replayModeRef.current = replayMode; }, [replayMode]);

  const resetIdleTimer = useCallback(() => {
    if (isIdleHintRef.current) {
      clearHint();
      isIdleHintRef.current = false;
      setIsIdleHint(false);
    }
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (isWonRef.current || replayModeRef.current) return;
      isIdleHintRef.current = true;
      setIsIdleHint(true);
      requestHint();
    }, 8000);
  }, [requestHint, clearHint]);

  useEffect(() => {
    resetIdleTimer();
  }, [moveCount, resetIdleTimer]);

  useEffect(() => {
    if (!hint) {
      isIdleHintRef.current = false;
      setIsIdleHint(false);
    }
  }, [hint]);

  const boardContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = boardContainerRef.current;
    if (!el) return;
    const handler = () => resetIdleTimer();
    el.addEventListener('pointerdown', handler);
    el.addEventListener('pointermove', handler);
    return () => {
      el.removeEventListener('pointerdown', handler);
      el.removeEventListener('pointermove', handler);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  // ── Solver / Ghost Mode ──
  const solver = useSolver();
  const [ghostPlaying, setGhostPlaying] = useState(false);
  const [ghostSpeed, setGhostSpeed] = useState<1 | 2 | 3>(1);
  const ghostPlayingRef = useRef(false);
  useEffect(() => { ghostPlayingRef.current = ghostPlaying; }, [ghostPlaying]);

  const GHOST_DELAYS: Record<1 | 2 | 3, number> = { 1: 300, 2: 150, 3: 80 };

  const ghostDescriptions = useMemo(() => {
    if (!replayMode || replayMoves.length === 0) return [];
    return describeSolution(gameNumber, replayMoves);
  }, [replayMode, replayMoves, gameNumber]);

  // When solver finishes, start replay
  useEffect(() => {
    if (solver.status === 'solved' && solver.moves.length > 0) {
      startReplay(solver.moves);
      setGhostPlaying(true);
    }
  }, [solver.status, solver.moves, startReplay]);

  // Auto-play loop for ghost mode
  useEffect(() => {
    if (!replayMode || !ghostPlaying) return;
    if (replayIndex >= replayMoves.length) {
      setGhostPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      if (!ghostPlayingRef.current) return;
      const moved = replayNext();
      if (!moved) setGhostPlaying(false);
    }, GHOST_DELAYS[ghostSpeed]);

    return () => clearTimeout(timer);
  }, [replayMode, ghostPlaying, replayIndex, replayMoves.length, ghostSpeed, replayNext]);

  // NOTE: Solver is hardcoded for 4 free cells. If variant support is added
  // to DomGameShell, guard this call: only invoke for standard 'freecell'.
  const handleGhostMode = useCallback(() => {
    if (replayMode) return; // Already in replay
    solver.solve(gameNumber);
  }, [gameNumber, replayMode, solver]);

  const handleGhostPlayPause = useCallback(() => {
    if (replayIndex >= replayMoves.length) {
      // Restart from beginning
      stopReplay();
      startReplay(replayMoves);
      setGhostPlaying(true);
    } else {
      setGhostPlaying((prev) => !prev);
    }
  }, [replayIndex, replayMoves, stopReplay, startReplay]);

  const handleGhostNext = useCallback(() => {
    setGhostPlaying(false);
    replayNext();
  }, [replayNext]);

  const handleGhostPrev = useCallback(() => {
    setGhostPlaying(false);
    replayPrev();
  }, [replayPrev]);

  const handleGhostStop = useCallback(() => {
    setGhostPlaying(false);
    solver.reset();
    stopReplay();
  }, [solver, stopReplay]);

  const handleGhostCycleSpeed = useCallback(() => {
    setGhostSpeed((prev) => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      return 1;
    });
  }, []);

  // ── Win confetti ──
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiPieces = useMemo(() => {
    if (!showConfetti) return [];
    const CONFETTI_COLORS = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#ff9ff3', '#54a0ff'];
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 1.5,
      drift: -60 + Math.random() * 120,
      spin: 360 + Math.random() * 720,
      rotate: Math.random() * 360,
      isCircle: Math.random() > 0.5,
    }));
  }, [showConfetti]);

  // Track whether we've already processed a win for a given game
  const winProcessedRef = useRef<number | null>(null);
  const prevGameNumberRef = useRef(gameNumber);

  // ── Init: start with specified game, load stats, first-visit tutorial ──
  useEffect(() => {
    setStats(loadStats());
    recordModePlayed('freecell');
    // Check if starting game is a daily challenge
    if (initialGameNumber && initialGameNumber === getTodaysSeed()) {
      setIsDailyGame(true);
    }
    if (initialGameNumber) {
      newGame(initialGameNumber);
    }
    // Show tutorial on first visit
    try {
      if (!localStorage.getItem('tutorialSeen')) {
        setShowTutorial(true);
      }
    } catch {
      // Storage blocked
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Timer tick ──
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerStarted && !isWon) {
      interval = setInterval(() => tickTimer(), 1000);
    }
    return () => clearInterval(interval);
  }, [timerStarted, isWon, tickTimer]);

  // ── Landscape detection ──
  useEffect(() => {
    const check = () => {
      setIsLandscapeMobile(window.innerWidth > window.innerHeight && window.innerHeight < 500);
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', () => setTimeout(check, 200));
    return () => {
      window.removeEventListener('resize', check);
    };
  }, []);

  // ── Auto-complete detection ──
  useEffect(() => {
    if (isWon || noMovesAvailable) {
      setIsAutoCompletable(false);
      return;
    }
    try {
      const engine = getEngine();
      setIsAutoCompletable(engine.isAutoCompletable());
    } catch {
      setIsAutoCompletable(false);
    }
  }, [moveCount, isWon, noMovesAvailable, getEngine]);

  // ── Win detection ──
  useEffect(() => {
    if (isWon && winProcessedRef.current !== gameNumber) {
      winProcessedRef.current = gameNumber;
      setShowWin(true);
      setShowConfetti(true);
      // Auto-clear confetti after animation completes
      setTimeout(() => setShowConfetti(false), 5000);
      announceToScreenReader(`Congratulations! You won in ${moveCount} moves.`, 'assertive');

      // Record unique game for achievement tracking
      recordUniqueGame(gameNumber);

      setStats((prev) => {
        const updated = recordWin(prev, timerSeconds, moveCount);
        saveStats(updated);

        // Check streak milestones
        if (isMilestone(updated.currentStreak)) {
          setStreakMilestone(updated.currentStreak);
        }

        // Check achievements
        const { newlyUnlocked } = checkWinAchievements(
          updated,
          timerSeconds,
          moveCount,
          undosUsed,
        );
        if (newlyUnlocked.length > 0) {
          setNewAchievements(newlyUnlocked);
        }

        return updated;
      });

      // Persist per-game history
      recordGameResult(true, moveCount, timerSeconds, gameNumber);
      // Persist star rating (only saves if better than existing)
      const stars = getStarCount(moveCount);
      saveStarRating(gameNumber, stars);
      // Record daily challenge completion if this game matches today's seed
      if (gameNumber === getTodaysSeed()) {
        setIsDailyGame(true);
        recordDailyCompletion(getTodayStr(), moveCount, timerSeconds, hintsUsed);
      }

      // Start solver analysis for optimal move comparison
      // NOTE: Solver is hardcoded for 4 free cells. If variant support is added
      // to DomGameShell, guard this call: only invoke for standard 'freecell'.
      solver.solve(gameNumber);
    }
  }, [isWon, gameNumber, timerSeconds, moveCount, undosUsed, solver]);

  // ── Leaderboard submission on daily challenge win ──
  useEffect(() => {
    if (!isWon || !isDailyGame || !gameNumber) return;

    const submit = async () => {
      setLeaderboardLoading(true);
      try {
        const result = await submitScore(gameNumber, moveCount, timerSeconds);
        setLeaderboardRank(result.rank);
        const entries = await fetchDailyLeaderboard();
        setLeaderboardEntries(entries);
      } catch {
        // Silent fail — leaderboard is non-critical
      }
      setLeaderboardLoading(false);
    };
    submit();
  }, [isWon, isDailyGame, gameNumber, moveCount, timerSeconds]);

  // ── Deadlock announcement ──
  useEffect(() => {
    if (noMovesAvailable && !isWon) {
      announceToScreenReader('No legal moves remaining. Game is deadlocked.', 'assertive');
    }
  }, [noMovesAvailable, isWon]);

  // ── Reset win overlay on new game ──
  useEffect(() => {
    if (gameNumber !== prevGameNumberRef.current) {
      prevGameNumberRef.current = gameNumber;
      setShowWin(false);
    }
  }, [gameNumber]);

  // ── URL history update on new game ──
  // Only update URL on production routes, not /lab/*
  useEffect(() => {
    if (typeof window !== 'undefined' && gameNumber && !replayMode) {
      const isLabRoute = window.location.pathname.startsWith('/lab/');
      if (!isLabRoute) {
        window.history.replaceState({}, '', '/game/' + gameNumber);
      }
    }
  }, [gameNumber, replayMode]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && e.shiftKey) { e.preventDefault(); redo(); return; }
        if (e.key === 'z') { e.preventDefault(); undo(); return; }
        if (e.key === 'y') { e.preventDefault(); redo(); return; }
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'z') { e.preventDefault(); undo(); return; }
      if (key === 'n') { e.preventDefault(); handleNewGame(); return; }
      if (key === 'h') { e.preventDefault(); requestHint(); return; }
      if (e.key === '?') { setShowShortcuts(true); return; }
      if (e.key === 'Escape') {
        setShowHome(false);
        setShowGameInput(false);
        setShowSettings(false);
        return;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Actions ──
  const handleNewGame = useCallback(() => {
    // Record loss if abandoning an in-progress game
    if (timerStarted && !isWon) {
      setStats((prev) => {
        const updated = recordLoss(prev);
        saveStats(updated);
        return updated;
      });
      recordGameResult(false, moveCount, timerSeconds, gameNumber);
    }
    setShowWin(false);
    setShowReplay(false);
    setShowConfetti(false);
    setShowHome(false);
    setIsAutoCompletable(false);
    setIsDailyGame(false);
    setHintsUsed(0);
    setUndosUsed(0);
    setStreakMilestone(null);
    clearHint();
    if (replayMode) { setGhostPlaying(false); solver.reset(); stopReplay(); }
    newGame();
    announceToScreenReader('New game started.');
  }, [newGame, clearHint, replayMode, solver, stopReplay, timerStarted, isWon, moveCount, timerSeconds, gameNumber]);

  const handleRestart = useCallback(() => {
    setShowWin(false);
    setShowReplay(false);
    setShowConfetti(false);
    setShowHome(false);
    setIsAutoCompletable(false);
    setHintsUsed(0);
    setUndosUsed(0);
    setStreakMilestone(null);
    clearHint();
    if (replayMode) { setGhostPlaying(false); solver.reset(); stopReplay(); }
    restart();
    announceToScreenReader('Game restarted.');
  }, [restart, clearHint, replayMode, solver, stopReplay]);

  const handleUndo = useCallback(() => {
    undo();
    setUndosUsed((prev) => prev + 1);
    announceToScreenReader('Move undone');
  }, [undo]);

  const handleRedo = useCallback(() => {
    redo();
    announceToScreenReader('Move redone');
  }, [redo]);

  const handleHint = useCallback(() => {
    requestHint();
    setHintsUsed((prev) => prev + 1);
    announceToScreenReader('Hint shown');
  }, [requestHint]);

  // ── Tutorial highlight resolution ──
  const handleTutorialStepChange = useCallback((_highlightKey: string | null) => {
    setTutorialHighlightRect(null);
  }, []);

  const handleToggleMute = useCallback(() => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  }, []);

  const handleUpdateSettings = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    soundManager.setMuted(!newSettings.soundEnabled);
    setIsMuted(!newSettings.soundEnabled);
  }, []);

  const handleAutoComplete = useCallback(() => {
    const engine = getEngine();
    const store = useDomFreecellStore.getState();
    let moved = true;
    while (moved) {
      moved = false;
      const state = engine.getState();
      for (let i = 0; i < state.freeCells.length; i++) {
        const card = state.freeCells[i];
        if (card && store.autoPlace(card.id)) { moved = true; }
      }
      for (let col = 0; col < state.cascades.length; col++) {
        const cascade = state.cascades[col];
        if (cascade.length > 0) {
          const topCard = cascade[cascade.length - 1];
          if (store.autoPlace(topCard.id)) { moved = true; }
        }
      }
    }
    setIsAutoCompletable(false);
    announceToScreenReader('Auto-completing game');
  }, [getEngine]);

  const handleShareGame = useCallback(async () => {
    const shareUrl = `${window.location.origin}/game/${gameNumber}`;
    const shareText = `I'm playing FreeCell Game #${gameNumber} — can you beat it? ${shareUrl}`;

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
  }, [gameNumber]);

  const handlePlayNumber = useCallback((num: number) => {
    // Record loss if abandoning an in-progress game
    if (timerStarted && !isWon) {
      setStats((prev) => {
        const updated = recordLoss(prev);
        saveStats(updated);
        return updated;
      });
      recordGameResult(false, moveCount, timerSeconds, gameNumber);
    }
    setShowGameInput(false);
    setShowHome(false);
    setShowWin(false);
    setShowReplay(false);
    setIsAutoCompletable(false);
    setIsDailyGame(false);
    setHintsUsed(0);
    setUndosUsed(0);
    setStreakMilestone(null);
    clearHint();
    newGame(num);
  }, [newGame, clearHint, timerStarted, isWon, moveCount, timerSeconds, gameNumber]);

  const handleGameInputSubmit = useCallback(() => {
    const num = parseInt(gameInputValue, 10);
    if (isNaN(num) || num < 1 || num > 9999999) {
      setGameInputError('Enter a number between 1 and 9,999,999');
      return;
    }
    setGameInputValue('');
    setGameInputError('');
    handlePlayNumber(num);
  }, [gameInputValue, handlePlayNumber]);

  const handlePlayDaily = useCallback((seed: number) => {
    // Record loss if abandoning an in-progress game
    if (timerStarted && !isWon) {
      setStats((prev) => {
        const updated = recordLoss(prev);
        saveStats(updated);
        return updated;
      });
      recordGameResult(false, moveCount, timerSeconds, gameNumber);
    }
    setShowHome(false);
    setShowWin(false);
    setShowReplay(false);
    setIsAutoCompletable(false);
    setIsDailyGame(true);
    setHintsUsed(0);
    setUndosUsed(0);
    setStreakMilestone(null);
    clearHint();
    newGame(seed);
  }, [newGame, clearHint, timerStarted, isWon, moveCount, timerSeconds, gameNumber]);

  // ── Timer display ──
  const timerDisplay = useMemo(() => formatTime(timerSeconds), [timerSeconds]);

  // ── Render ──
  return (
    <div className="flex flex-col w-full h-full" style={{ backgroundColor: 'var(--theme-base, #0d2e0d)' }}>

      {/* ── Desktop Top Bar ── */}
      <div
        className="hidden md:flex items-center justify-between z-20"
        style={{
          padding: '12px 28px',
          background: 'linear-gradient(180deg, var(--theme-dark, #051e05) 0%, var(--theme-base, #072907) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Left: Home button */}
        <div style={{ flex: '0 0 140px' }}>
          <button
            onClick={() => setShowHome(true)}
            className="group transition-all active:scale-95"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 16px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
            title="Menu"
          >
            <Home size={18} style={{ color: 'rgba(212,175,55,0.8)' }} />
            <span style={{
              fontSize: '13px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.04em',
            }}>Menu</span>
          </button>
        </div>

        {/* Center: Stats pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '10px 32px',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '9999px',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>Time</span>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.8)',
              fontVariantNumeric: 'tabular-nums',
              minWidth: '52px',
            }}>{timerDisplay}</span>
          </div>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}>Moves</span>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(250,204,21,0.85)',
              fontVariantNumeric: 'tabular-nums',
              minWidth: '28px',
            }}>{moveCount}</span>
          </div>

          <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)' }} />

          <button
            onClick={() => { setShowGameInput(true); setGameInputValue(''); setGameInputError(''); }}
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontVariantNumeric: 'tabular-nums',
              letterSpacing: '0.02em',
            }}
            className="hover:text-white/70 transition-colors"
            title="Click to enter a game number"
          >
            #{gameNumber}
          </button>
        </div>

        {/* Right: New Deal button */}
        <div style={{ flex: '0 0 140px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNewGame}
            className="active:scale-95 transition-all"
            style={{
              padding: '10px 28px',
              background: 'linear-gradient(180deg, var(--felt-color-light, #1f6b1f) 0%, var(--felt-color, #17551a) 100%)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              cursor: 'pointer',
              letterSpacing: '0.03em',
            }}
          >
            New Deal
          </button>
        </div>
      </div>

      {/* ── Desktop Sub-bar: gameplay actions ── */}
      <div
        className="hidden md:flex items-center justify-center z-20"
        style={{
          padding: '6px 28px',
          background: 'rgba(5,20,5,0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.03)',
          gap: '4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <SubBarBtn onClick={handleUndo} title="Undo (Z)" disabled={!canUndo}>
            <RotateCcw size={15} />
          </SubBarBtn>
          <SubBarBtn onClick={handleRedo} title="Redo (Ctrl+Y)" disabled={!canRedo}>
            <RotateCw size={15} />
          </SubBarBtn>
        </div>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.06)', margin: '0 8px' }} />

        <SubBarBtn onClick={handleHint} title="Hint (H)">
          <Lightbulb size={15} />
        </SubBarBtn>

        <SubBarBtn onClick={handleToggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </SubBarBtn>

        <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.06)', margin: '0 8px' }} />

        <SubBarBtn
          onClick={handleGhostMode}
          title="Ghost Mode — watch the solver play"
          disabled={replayMode || solver.status === 'solving'}
        >
          <Ghost size={15} />
        </SubBarBtn>
      </div>

      {/* ── Mobile Top Bar ── */}
      {!isLandscapeMobile && (
        <div
          className="flex md:hidden items-center justify-between z-20"
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(180deg, var(--theme-dark, #051e05) 0%, var(--theme-base, #072907) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <button
            onClick={() => { setShowGameInput(true); setGameInputValue(''); setGameInputError(''); }}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontVariantNumeric: 'tabular-nums',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
            className="active:text-white transition-colors"
            title="Enter game number"
          >
            #{gameNumber}
          </button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.5)',
          }}>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontVariantNumeric: 'tabular-nums',
            }}>{timerDisplay}</span>
            <span style={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontVariantNumeric: 'tabular-nums',
              color: 'rgba(250,204,21,0.7)',
            }}>{moveCount} moves</span>
          </div>
        </div>
      )}

      {/* ── Board Area ── */}
      <div ref={boardContainerRef} className={`relative flex-1 overflow-hidden${isIdleHint ? ' dom-board--idle-hint' : ''}`} role="main" aria-label="FreeCell game board">
        <div
          className="absolute inset-0 overflow-auto px-1 py-2 sm:px-2 sm:py-4"
          style={{ backgroundColor: 'var(--theme-mid, #0d2e0d)' }}
        >
          <DomBoard hint={hint} />
        </div>

        {/* Hint Banner */}
        {hint && !isWon && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg shadow-lg backdrop-blur-sm"
              style={{
                background: 'rgba(30, 30, 10, 0.85)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <Lightbulb size={16} className="text-yellow-400 flex-shrink-0" />
              <span className="text-sm text-yellow-200/90 font-medium">{hint.reason}</span>
              <button
                onClick={clearHint}
                className="ml-1 text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
                aria-label="Dismiss hint"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}

        {/* Auto-Complete Button */}
        {isAutoCompletable && !isWon && !replayMode && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={handleAutoComplete}
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-sm rounded-lg shadow-lg animate-bounce transition-colors"
            >
              Auto-Finish
            </button>
          </div>
        )}

        {/* Solving indicator */}
        {solver.status === 'solving' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="px-5 py-2.5 rounded-lg shadow-lg text-white/80 text-sm font-medium flex items-center gap-2" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-panel) 95%, transparent)', border: '1px solid color-mix(in srgb, var(--theme-border) 60%, transparent)' }}>
              <div className="w-4 h-4 border-2 border-white/30 border-t-emerald-400 rounded-full animate-spin" />
              Solving...
            </div>
          </div>
        )}

        {/* Solver failed indicator */}
        {solver.status === 'failed' && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="px-5 py-2.5 bg-[#2f0d0d]/95 border border-[#7c2a2a]/60 rounded-lg shadow-lg text-white/80 text-sm font-medium">
              Could not find a solution
              <button onClick={() => solver.reset()} className="ml-3 text-white/50 hover:text-white underline">Dismiss</button>
            </div>
          </div>
        )}

        {/* ── Ghost Mode Replay Control Bar ── */}
        {replayMode && (
          <div className="absolute inset-x-0 bottom-0 z-[60] flex justify-center pb-4 sm:pb-6 pointer-events-none">
            <div className="pointer-events-auto rounded-2xl shadow-2xl p-5 sm:p-7 max-w-md w-[92%] backdrop-blur-sm" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-panel) 95%, transparent)', border: '1px solid color-mix(in srgb, var(--theme-border) 60%, transparent)' }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Ghost size={18} className="text-emerald-400" />
                  Ghost Mode
                </h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-white/50">Moves: <span className="text-emerald-400 font-bold">{solver.totalMoveCount}</span></span>
                  <button onClick={handleGhostStop} className="text-white/50 hover:text-white transition-colors ml-1 p-1">
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 bg-white/10 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${replayMoves.length > 0 ? (replayIndex / replayMoves.length) * 100 : 0}%` }}
                />
              </div>

              {/* Move list */}
              <div className="bg-black/30 rounded-xl p-3 mb-4 min-h-[100px] max-h-[160px] overflow-hidden">
                {ghostDescriptions.length === 0 ? (
                  <div className="text-white/30 text-center text-sm py-6">No moves needed</div>
                ) : (
                  <div className="space-y-0.5">
                    {(() => {
                      const windowSize = 5;
                      const halfWindow = Math.floor(windowSize / 2);
                      let windowStart = Math.max(0, replayIndex - halfWindow);
                      const windowEnd = Math.min(ghostDescriptions.length, windowStart + windowSize);
                      if (windowEnd - windowStart < windowSize) {
                        windowStart = Math.max(0, windowEnd - windowSize);
                      }
                      return ghostDescriptions.slice(windowStart, windowEnd).map((desc, i) => {
                        const stepIndex = windowStart + i;
                        const isCurrent = stepIndex === replayIndex - 1;
                        const isPast = stepIndex < replayIndex - 1;
                        return (
                          <div
                            key={stepIndex}
                            className={`text-xs px-2 py-1 rounded transition-all duration-200 font-mono ${
                              isCurrent
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : isPast
                                ? 'text-white/30'
                                : 'text-white/60'
                            }`}
                          >
                            <span className="text-white/30 mr-1.5 inline-block w-4 text-right">{stepIndex + 1}.</span>
                            {desc}
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => { setGhostPlaying(false); stopReplay(); startReplay(replayMoves); }}
                  className="p-2.5 text-white/50 hover:text-white transition-colors active:scale-90"
                  title="Reset"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={handleGhostPrev}
                  disabled={replayIndex === 0}
                  className="p-2.5 text-white/50 hover:text-white disabled:text-white/20 transition-colors active:scale-90"
                  title="Previous (Left Arrow)"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={handleGhostPlayPause}
                  className="p-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-full transition-colors active:scale-90 min-w-[48px] min-h-[48px] flex items-center justify-center"
                  title={ghostPlaying ? 'Pause (Space)' : 'Play (Space)'}
                >
                  {ghostPlaying ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <button
                  onClick={handleGhostNext}
                  disabled={replayIndex >= replayMoves.length}
                  className="p-2.5 text-white/50 hover:text-white disabled:text-white/20 transition-colors active:scale-90"
                  title="Next (Right Arrow)"
                >
                  <ChevronRight size={22} />
                </button>
                <button
                  onClick={handleGhostCycleSpeed}
                  className="ml-1 px-2 py-1 text-xs font-bold tabular-nums rounded bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors active:scale-90 min-w-[3ch]"
                  title="Playback speed"
                >
                  {ghostSpeed}x
                </button>
                <div className="text-xs text-white/40 tabular-nums ml-1 min-w-[4ch] text-right">
                  {replayIndex}/{replayMoves.length}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Win Confetti ── */}
        {showConfetti && (
          <div className="dom-confetti-container">
            {confettiPieces.map((p) => (
              <div
                key={p.id}
                className={`dom-confetti-piece ${p.isCircle ? 'dom-confetti-piece--circle' : 'dom-confetti-piece--rect'}`}
                style={{
                  left: p.left,
                  '--confetti-color': p.color,
                  '--confetti-size': `${p.size}px`,
                  '--confetti-duration': `${p.duration}s`,
                  '--confetti-delay': `${p.delay}s`,
                  '--confetti-drift': `${p.drift}px`,
                  '--confetti-spin': `${p.spin}deg`,
                  '--confetti-rotate': `${p.rotate}deg`,
                  '--confetti-fall-distance': '100vh',
                } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* ── Streak Milestone Toast ── */}
        {streakMilestone !== null && (
          <StreakMilestone
            streak={streakMilestone}
            show={true}
            onDismiss={() => setStreakMilestone(null)}
          />
        )}

        {/* ── Achievement Toast ── */}
        {newAchievements.length > 0 && (
          <AchievementToast
            achievements={newAchievements}
            onDone={() => setNewAchievements([])}
          />
        )}

        {/* ── Win Screen Overlay ── */}
        {showWin && isWon && !showReplay && (
          <WinScreen
            gameNumber={gameNumber}
            time={timerSeconds}
            moves={moveCount}
            hintsUsed={hintsUsed}
            onPlayAgain={handleNewGame}
            onDailyChallenge={() => handlePlayDaily(getTodaysSeed())}
            solverStatus={solver.status}
            optimalMoves={solver.moves.length}
            onViewSolution={() => setShowReplay(true)}
            isDailyGame={isDailyGame}
            streak={isDailyGame ? getCurrentStreak() : undefined}
            leaderboardEntries={leaderboardEntries}
            leaderboardRank={leaderboardRank}
            leaderboardLoading={leaderboardLoading}
            playerId={getPlayerId()}
          />
        )}

        {/* ── Deadlock Overlay ── */}
        {noMovesAvailable && !isWon && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
            <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-md w-[92%] shadow-2xl text-center flex flex-col items-center gap-7 animate-in fade-in zoom-in duration-300">
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
                  className="w-full py-3 px-6 bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
                >
                  <ChevronLeft size={20} />
                  Undo Last Move
                </button>
                <button
                  onClick={handleRestart}
                  className="w-full py-3 px-6 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  <RotateCcw size={18} />
                  Restart Deal
                </button>
                <button
                  onClick={handleNewGame}
                  className="mt-2 text-gray-400 hover:text-gray-600 font-medium text-sm transition-colors py-1"
                >
                  Give up &amp; New Deal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Landscape floating undo/redo ── */}
        {isLandscapeMobile && (
          <div className="absolute bottom-2 right-2 z-20 flex gap-1.5 md:hidden">
            <button onClick={handleUndo} className={`p-2 bg-black/40 active:bg-black/60 rounded-lg ${canUndo ? 'text-white/70' : 'text-white/20'}`} title="Undo" disabled={!canUndo}>
              <RotateCcw size={18} />
            </button>
            <button onClick={handleRedo} className={`p-2 bg-black/40 active:bg-black/60 rounded-lg ${canRedo ? 'text-white/70' : 'text-white/20'}`} title="Redo" disabled={!canRedo}>
              <RotateCw size={18} />
            </button>
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Bar ── */}
      {!isLandscapeMobile && (
        <div
          className="flex md:hidden items-center justify-around safe-area-bottom z-20"
          style={{
            padding: '8px 8px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.85), rgba(7,41,7,0.9))',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
          }}
        >
          <MobileBtn onClick={() => setShowHome(true)} label="Menu" highlight>
            <Home size={20} />
          </MobileBtn>
          <MobileBtn onClick={handleNewGame} label="New">
            <Shuffle size={20} />
          </MobileBtn>
          <MobileBtn onClick={handleUndo} label="Undo" disabled={!canUndo}>
            <RotateCcw size={20} />
          </MobileBtn>
          <MobileBtn onClick={handleRedo} label="Redo" disabled={!canRedo}>
            <RotateCw size={20} />
          </MobileBtn>
          <MobileBtn onClick={handleHint} label="Hint">
            <Lightbulb size={20} />
          </MobileBtn>
        </div>
      )}

      {/* ── Home Overlay ── */}
      {showHome && (
        <DomHomeOverlay
          onClose={() => setShowHome(false)}
          onNewGame={handleNewGame}
          onPlayDaily={handlePlayDaily}
          onShowShortcuts={() => { setShowShortcuts(true); setShowHome(false); }}
          onShowSettings={() => { setShowSettings(true); setShowHome(false); }}
          onShowStats={() => { setShowStats(true); setShowHome(false); }}
          onShowAchievements={() => { setShowAchievements(true); setShowHome(false); }}
          onShareGame={handleShareGame}
          shareStatus={shareStatus}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* ── Game Number Input Modal ── */}
      {showGameInput && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setShowGameInput(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowGameInput(false)}>
            <div
              className="bg-[var(--theme-panel)] border border-white/10 rounded-2xl shadow-2xl max-w-sm w-full p-5 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-bold mb-3">Play Specific Game</h2>
              <p className="text-sm text-white/60 mb-3">Enter a game number (1 - 9,999,999):</p>
              <input
                type="number"
                value={gameInputValue}
                onChange={(e) => { setGameInputValue(e.target.value); setGameInputError(''); }}
                onKeyDown={(e) => e.key === 'Enter' && handleGameInputSubmit()}
                className="w-full px-3 py-2 rounded text-white placeholder-white/30 mb-2 focus:outline-none" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 30%, transparent)', border: '1px solid color-mix(in srgb, var(--theme-accent) 50%, transparent)' }}
                placeholder="e.g. 12345"
                min={1}
                max={9999999}
                autoFocus
              />
              {gameInputError && <p className="text-red-400 text-xs mb-2">{gameInputError}</p>}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setShowGameInput(false)}
                  className="flex-1 px-3 py-2 text-sm rounded transition-colors" style={{ backgroundColor: 'color-mix(in srgb, var(--theme-accent) 40%, transparent)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleGameInputSubmit}
                  className="flex-1 px-3 py-2 text-sm bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] rounded transition-colors font-medium"
                >
                  Play
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Settings Slide-Over ── */}
      {showSettings && (
        <DomSettingsPanel
          settings={settings}
          onUpdateSettings={handleUpdateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* ── Keyboard Shortcuts Modal ── */}
      <KeyboardShortcuts
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />

      {/* ── Tutorial Overlay ── */}
      <Tutorial
        isOpen={showTutorial}
        onDismiss={() => setShowTutorial(false)}
        highlightRect={tutorialHighlightRect}
        onStepChange={handleTutorialStepChange}
      />

      {/* ── Stats Panel ── */}
      <StatsPanel
        stats={stats}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />

      {/* ── Achievements Panel ── */}
      <AchievementsPanel
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small sub-components
// ---------------------------------------------------------------------------

function SubBarBtn({ onClick, title, children, disabled }: { onClick: () => void; title: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      disabled={disabled}
      className="transition-all active:scale-90"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'transparent',
        border: 'none',
        color: disabled ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.45)',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      {children}
    </button>
  );
}

function MobileBtn({ onClick, label, children, disabled, highlight }: { onClick: () => void; label: string; children: React.ReactNode; disabled?: boolean; highlight?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 p-2 active:scale-90 transition-all font-medium ${
        disabled ? 'text-white/20 cursor-default' : highlight ? 'text-[#D4AF37]' : 'text-white/70 active:text-white'
      }`}
      title={label}
      disabled={disabled}
    >
      {children}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Home Overlay (inline, simplified version of production HomeOverlay)
// ---------------------------------------------------------------------------

function DomHomeOverlay({
  onClose,
  onNewGame,
  onPlayDaily,
  onShowShortcuts,
  onShowSettings,
  onShowStats,
  onShowAchievements,
  onShareGame,
  shareStatus,
  isMuted,
  onToggleMute,
}: {
  onClose: () => void;
  onNewGame: () => void;
  onPlayDaily: (seed: number) => void;
  onShowShortcuts: () => void;
  onShowSettings: () => void;
  onShowStats: () => void;
  onShowAchievements: () => void;
  onShareGame: () => void;
  shareStatus: 'idle' | 'copied';
  isMuted: boolean;
  onToggleMute: () => void;
}) {
  const todaySeed = getTodaysSeed();
  const todayCompleted = isTodayCompleted();
  const stats = useMemo(() => loadStats(), []);
  const streak = useMemo(() => getCurrentStreak(), []);
  const winRate = stats.gamesPlayed > 0 ? getWinPercent(stats) : 0;

  const dateDisplay = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed bottom-0 left-0 right-0 max-h-[90vh] text-white rounded-t-3xl shadow-2xl z-50 flex flex-col bg-[var(--theme-panel)]"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 60%)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="home-overlay-title"
      >
        {/* Drag handle indicator */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/15" />
        </div>

        {/* Header */}
        <header className="flex-shrink-0 text-center pt-5 pb-5 px-8 relative">
          <h2
            id="home-overlay-title"
            className="text-3xl font-bold text-[#D4AF37]"
          >
            FreeCell Online
          </h2>
          <p className="text-white/40 text-sm mt-2 tracking-wide">{dateDisplay}</p>
          <button
            onClick={onClose}
            className="absolute top-5 right-6 text-white/30 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 px-8 pb-10">
          <div className="max-w-lg mx-auto space-y-6">

            {/* Daily Challenge */}
            {todayCompleted ? (
              <div className="text-center bg-black/20 border border-[#c9a84c]/30 rounded-2xl py-6 px-6">
                <div className="text-sm text-white/40 mb-1 uppercase tracking-widest">Today&apos;s Challenge</div>
                <div className="text-[#D4AF37] font-bold text-xl mt-1">Completed</div>
              </div>
            ) : (
              <button
                onClick={() => onPlayDaily(todaySeed)}
                className="w-full text-lg font-bold py-4 px-6 rounded-2xl bg-[#D4AF37] text-[var(--theme-dark)] hover:bg-[#e5c04a] transition-all active:scale-[0.98] shadow-lg shadow-[#D4AF37]/20"
              >
                Play Today&apos;s Challenge
              </button>
            )}

            {/* Game modes */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onNewGame}
                className="flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] active:scale-[0.97] transition-all"
              >
                <Shuffle size={20} className="text-[#D4AF37] shrink-0" />
                <span className="text-base font-medium text-white/75">New Game</span>
              </button>
              <button
                onClick={onShareGame}
                className="flex items-center justify-center gap-3 py-4 px-5 rounded-2xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] active:scale-[0.97] transition-all"
              >
                <Share2 size={20} className="text-[#D4AF37] shrink-0" />
                <span className="text-base font-medium text-white/75">
                  {shareStatus === 'copied' ? 'Copied!' : 'Share'}
                </span>
              </button>
            </div>

            {/* Stats row */}
            <button
              onClick={onShowStats}
              className="w-full flex items-center justify-center px-6 py-5 bg-white/[0.04] border border-white/[0.07] rounded-2xl hover:bg-white/[0.07] transition-colors relative"
            >
              <div className="flex items-center gap-8 text-base text-white/60">
                <span><strong className="text-[#D4AF37] text-lg">{stats.gamesPlayed}</strong> Played</span>
                <span><strong className="text-[#D4AF37] text-lg">{winRate}%</strong> Win</span>
                {streak > 0 && <span><strong className="text-[#D4AF37] text-lg">{streak}</strong> Streak</span>}
              </div>
              <span className="absolute right-5 text-white/20">&rarr;</span>
            </button>

            {/* Quick links */}
            <div className="grid grid-cols-4 gap-3 text-center pt-2">
              <button onClick={onShowSettings} className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl hover:bg-white/[0.05] transition-colors">
                <Settings size={26} className="text-[#D4AF37]" />
                <span className="text-xs text-white/50 font-medium">Settings</span>
              </button>
              <a href="/how-to-play" className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl hover:bg-white/[0.05] transition-colors">
                <HelpCircle size={26} className="text-[#D4AF37]" />
                <span className="text-xs text-white/50 font-medium">How to Play</span>
              </a>
              <a href="/strategy" className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl hover:bg-white/[0.05] transition-colors">
                <Swords size={26} className="text-[#D4AF37]" />
                <span className="text-xs text-white/50 font-medium">Strategy</span>
              </a>
              <button onClick={onShowAchievements} className="flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl hover:bg-white/[0.05] transition-colors">
                <Trophy size={26} className="text-[#D4AF37]" />
                <span className="text-xs text-white/50 font-medium">Badges</span>
              </button>
            </div>

            {/* Bottom settings row */}
            <div className="flex justify-center items-center gap-6 pt-5 mt-2 border-t border-white/[0.06]">
              <button
                onClick={onToggleMute}
                className="flex items-center gap-2.5 text-white/40 hover:text-white/70 px-5 py-3 rounded-xl hover:bg-white/[0.04] transition-colors text-sm"
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                <span>{isMuted ? 'Unmute' : 'Mute'}</span>
              </button>
              <button
                onClick={onShowShortcuts}
                className="flex items-center gap-2.5 text-white/40 hover:text-white/70 px-5 py-3 rounded-xl hover:bg-white/[0.04] transition-colors text-sm"
              >
                <span className="font-bold text-lg">?</span>
                <span>Shortcuts</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Simplified Settings Panel (no Phaser/gameBridge dependency)
// ---------------------------------------------------------------------------

function DomSettingsPanel({
  settings,
  onUpdateSettings,
  onClose,
}: {
  settings: GameSettings;
  onUpdateSettings: (s: GameSettings) => void;
  onClose: () => void;
}) {
  const [selectedBack, setSelectedBack] = useState(getSelectedCardBack);
  const cardBackCanvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());

  const handleCardBackSelect = (id: string) => {
    setSelectedBack(id);
    setSelectedCardBack(id);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="fixed right-0 top-0 bottom-0 w-full max-w-md border-l border-white/[0.07] shadow-2xl z-[101] flex flex-col"
        style={{ background: 'var(--theme-panel)', backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 60%)' }}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/[0.07] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="text-[#D4AF37]" size={24} />
            <h2 className="text-xl font-bold text-white">Settings</h2>
          </div>
          <button onClick={onClose} className="p-2 text-white/30 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Card Back */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-[#D4AF37]/60" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">Card Back</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {cardBackDesigns.map((design) => {
                const isActive = design.id === selectedBack;
                return (
                  <button
                    key={design.id}
                    onClick={() => handleCardBackSelect(design.id)}
                    className={`relative rounded-lg overflow-hidden transition-all ${isActive ? 'ring-2 ring-[#D4AF37] scale-105' : 'ring-1 ring-white/10 hover:ring-white/25'}`}
                    title={design.name}
                  >
                    <DomCardBackThumbnail design={design} canvasRefs={cardBackCanvasRefs} />
                    <div className={`text-[8px] text-center py-0.5 truncate px-0.5 ${isActive ? 'text-[#D4AF37] font-bold' : 'text-white/40'}`}>
                      {design.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Sound */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">Audio</h3>
            <ToggleRow
              label="Sound Effects"
              description="Card placement and game sounds"
              enabled={settings.soundEnabled}
              onToggle={() => onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
            />
          </section>

          {/* Animation Speed */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">Animation Speed</h3>
            <div className="grid grid-cols-3 gap-2">
              {(['slow', 'normal', 'fast'] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => onUpdateSettings({ ...settings, animationSpeed: speed })}
                  className={`py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl transition-all ${
                    settings.animationSpeed === speed
                      ? 'bg-[#D4AF37] text-[var(--theme-dark)] shadow-lg'
                      : 'bg-white/[0.04] border border-white/[0.07] text-white/40 hover:bg-white/[0.08] hover:text-white/60'
                  }`}
                >
                  {speed}
                </button>
              ))}
            </div>
          </section>

          {/* Gameplay toggles */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30">Gameplay</h3>
            <ToggleRow
              label="Auto-Finish"
              description="Auto-finish when game is clearly won"
              enabled={settings.autoFinish}
              onToggle={() => onUpdateSettings({ ...settings, autoFinish: !settings.autoFinish })}
            />
            <ToggleRow
              label="One-Tap Moves"
              description="Move cards on single click"
              enabled={settings.autoMove}
              onToggle={() => onUpdateSettings({ ...settings, autoMove: !settings.autoMove })}
            />
          </section>
        </div>
      </div>
    </>
  );
}

function DomCardBackThumbnail({ design, canvasRefs }: {
  design: CardBackDesign;
  canvasRefs: React.MutableRefObject<Map<string, HTMLCanvasElement>>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const thumbW = 48;
    const thumbH = 67;

    let cached = canvasRefs.current.get(design.id);
    if (!cached) {
      cached = design.renderToCanvas(thumbW, thumbH);
      canvasRefs.current.set(design.id, cached);
    }

    cached.style.width = '100%';
    cached.style.height = 'auto';
    cached.style.display = 'block';

    container.innerHTML = '';
    container.appendChild(cached);
  }, [design, canvasRefs]);

  return <div ref={containerRef} className="aspect-[5/7]" />;
}

function ToggleRow({ label, description, enabled, onToggle }: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:bg-white/[0.08] transition-colors text-left"
    >
      <div>
        <div className="text-sm font-semibold text-white/90">{label}</div>
        <div className="text-[10px] text-white/40">{description}</div>
      </div>
      <div className={`w-10 h-5 rounded-full relative transition-colors ${enabled ? 'bg-[#D4AF37]' : 'bg-white/10'}`}>
        <div
          className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-md transition-transform"
          style={{ transform: enabled ? 'translateX(22px)' : 'translateX(2px)' }}
        />
      </div>
    </button>
  );
}
