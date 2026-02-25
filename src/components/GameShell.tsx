'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gameBridge } from '../game/GameBridge';
import { GameStats, createEmptyStats, recordWin, recordLoss } from '../lib/stats';
import { loadStats, saveStats } from '../lib/storage';
import { trackGameStart, trackWin, trackAbandoned, trackHint, trackUndo, trackMove, trackDeadlock, gameSession } from '../lib/analytics';
import { initErrorTracking, setGameContext } from '../lib/errorTracking';
import { getTodaysSeed, getTodayStr, recordDailyCompletion, isTodayCompleted } from '../lib/dailyChallenge';
import { RotateCcw, RotateCw, Lightbulb, BarChart3, MessageSquare, Shuffle, Calendar, Volume2, VolumeX, Home } from 'lucide-react';
import StatsPanel from './StatsPanel';
import FeedbackModal from './FeedbackModal';
import DailyChallengePanel from './DailyChallengePanel';
import GameNumberInput from './GameNumberInput';
import WinScreen from './WinScreen';
import HomeOverlay from './HomeOverlay';
import DailyBanner from './DailyBanner';
import AchievementsPanel from './AchievementsPanel';
import { soundManager } from '../lib/sounds';
import KeyboardShortcuts from './KeyboardShortcuts';
import Tutorial from './Tutorial';

type HighlightRect = { x: number; y: number; width: number; height: number };

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
  const [showHome, setShowHome] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isLandscapeMobile, setIsLandscapeMobile] = useState(false);
  const [dailyCompleted, setDailyCompleted] = useState(true); // assume completed until checked

  // Tutorial state
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialHighlightRect, setTutorialHighlightRect] = useState<HighlightRect | null>(null);
  const elementPositions = useRef<Record<string, HighlightRect>>({});
  const dailyButtonRef = useRef<HTMLButtonElement>(null);
  const mobileHomeButtonRef = useRef<HTMLButtonElement>(null);


  // Load stats on mount
  useEffect(() => {
    setStats(loadStats());
    setDailyCompleted(isTodayCompleted());
    initErrorTracking();
  }, []);

  // --- Omitted for brevity ---

  const handleWin = useCallback(
    (data: unknown) => {
      // --- Omitted for brevity ---
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
      
      // --- TUTORIAL LOGIC ---
      try {
        const tutorialSeen = !!localStorage.getItem('tutorialSeen');
        if (!tutorialSeen) {
          // Pre-fetch all tutorial element positions
          ['freecells', 'foundations', 'tableau'].forEach(key => {
            gameBridge.emit('requestElementPosition', key);
          });
          setShowTutorial(true);
        }
      } catch (e) {
        console.error("Could not access localStorage", e);
      }
    });

    const unsubMove = gameBridge.on('moveExecuted', (data: unknown) => {
      // --- Omitted for brevity ---
    });

    const unsubWin = gameBridge.on('gameWon', handleWin);

    const unsubDeadlock = gameBridge.on('deadlock', () => {
      trackDeadlock();
    });

    const unsubAutoComplete = gameBridge.on('autoCompletable', (data: unknown) => {
      const d = data as { completable: boolean };
      setAutoCompletable(d.completable);
    });

    // --- TUTORIAL LISTENER ---
    const unsubElementPos = gameBridge.on('elementPositionResponse', (data: unknown) => {
        const d = data as { key: string; rect: HighlightRect };
        if (d.key && d.rect) {
            elementPositions.current[d.key] = d.rect;
            // If this is the currently requested highlight, apply it
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any)._geminiTutorialHighlight === d.key) {
                setTutorialHighlightRect(d.rect);
            }
        }
    });

    const handleTutorialStepChange = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const key = (window as any)._geminiTutorialHighlight;
        if (!key) {
            setTutorialHighlightRect(null);
            return;
        }

        if (elementPositions.current[key]) {
            setTutorialHighlightRect(elementPositions.current[key]);
        } else if (key === 'dailyButton') {
            // The "Daily" button is part of the desktop UI bar
            // On mobile, we point to the "Home" button which leads to it
            const isMobile = window.innerWidth < 768;
            const ref = isMobile ? mobileHomeButtonRef : dailyButtonRef;

            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setTutorialHighlightRect({
                    x: rect.left,
                    y: rect.top,
                    width: rect.width,
                    height: rect.height,
                });
            }
        } else {
            // It's a game element we don't have yet, maybe it was just requested
            setTutorialHighlightRect(null);
        }
    };
    
    window.addEventListener('gemini-tutorial-step-change', handleTutorialStepChange);

    return () => {
      unsubReady();
      unsubMove();
      unsubWin();
      unsubDeadlock();
      unsubAutoComplete();
      unsubElementPos();
      window.removeEventListener('gemini-tutorial-step-change', handleTutorialStepChange);
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
      mountedRef.current = false;
    };
  }, [handleWin]);

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
      if (e.key === '?') setShowShortcuts(true);
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
            ref={dailyButtonRef}
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
          {/* --- Omitted for brevity --- */}
        </div>
        {/* --- Omitted for brevity --- */}
      </div>

      {/* --- Omitted for brevity --- */}
      
      {/* Game Canvas Container */}
      <div className="relative flex-1">
        {/* --- Omitted for brevity --- */}
      </div>

      {/* ── Mobile Bottom Bar — 5 icons: Home, New, Undo, Redo, Hint ── */}
      {!isLandscapeMobile && <div className="flex md:hidden items-center justify-around px-2 py-2 bg-[#072907] border-t border-[#1a5c1a]/30 safe-area-bottom">
        <button ref={mobileHomeButtonRef} onClick={() => setShowHome(true)} className="flex flex-col items-center gap-0.5 p-2 text-[#D4AF37]/80 active:text-[#D4AF37]" title="Home">
          <Home size={22} />
          <span className="text-[10px]">Home</span>
        </button>
        {/* --- Omitted for brevity --- */}
      </div>}

      <Tutorial 
        isOpen={showTutorial}
        onDismiss={() => setShowTutorial(false)}
        highlightRect={tutorialHighlightRect}
      />

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
    </div>
  );
}
