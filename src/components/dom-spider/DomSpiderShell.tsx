'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDomSpiderStore, domSpiderStore } from '@/lib/dom-spider/useDomSpiderStore';
import DomSpiderBoard, { type SpiderHintHighlight } from './DomSpiderBoard';
import { SpiderDifficulty } from '@/engine/SpiderEngine';
import Link from '@/components/NetworkLink';
import { Home, Lightbulb, RotateCcw, Undo2 } from 'lucide-react';
import GameSwitcher from '../GameSwitcher';
import AdUnit from '../AdUnit';
import MobileNextActionPanel from '../MobileNextActionPanel';
import { loadStats, saveStats } from '@/lib/storage';
import { recordWin, recordLoss, getWinPercent, type GameStats } from '@/lib/stats';
import {
  trackAbandoned,
  trackGameStart,
  trackHint,
  trackMove,
  trackUndo,
  trackWin,
} from '@/lib/analytics';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface DomSpiderShellProps {
  initialDifficulty?: SpiderDifficulty;
}

export default function DomSpiderShell({ initialDifficulty = '1-suit' }: DomSpiderShellProps) {
  const gameNumber = useDomSpiderStore((s) => s.gameNumber);
  const moveCount = useDomSpiderStore((s) => s.moveCount);
  const isWon = useDomSpiderStore((s) => s.isWon);
  const timerSeconds = useDomSpiderStore((s) => s.timerSeconds);
  const timerStarted = useDomSpiderStore((s) => s.timerStarted);
  const tickTimer = useDomSpiderStore((s) => s.tickTimer);
  const newGame = useDomSpiderStore((s) => s.newGame);
  const difficulty = useDomSpiderStore((s) => s.difficulty);
  const setDifficulty = useDomSpiderStore((s) => s.setDifficulty);
  const foundations = useDomSpiderStore((s) => s.foundations);
  const undo = useDomSpiderStore((s) => s.undo);
  const moveHistory = useDomSpiderStore((s) => s.moveHistory);

  const [showWinModal, setShowWinModal] = useState(false);
  const [winStats, setWinStats] = useState<GameStats | null>(null);
  const [hintHighlight, setHintHighlight] = useState<SpiderHintHighlight | null>(null);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackedGameStartRef = useRef<number | null>(null);
  const trackedMoveCountRef = useRef(moveCount);

  const clearHint = useCallback(() => {
    if (hintTimerRef.current) {
      clearTimeout(hintTimerRef.current);
      hintTimerRef.current = null;
    }
    setHintHighlight(null);
  }, []);

  // Timer
  useEffect(() => {
    if (!timerStarted || isWon) return;
    const id = setInterval(tickTimer, 1000);
    return () => clearInterval(id);
  }, [timerStarted, isWon, tickTimer]);

  // Init
  useEffect(() => {
    if (initialDifficulty !== difficulty) {
      setDifficulty(initialDifficulty);
    } else {
      newGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Win detection
  const winProcessedRef = useRef<number | null>(null);
  useEffect(() => {
    if (isWon && winProcessedRef.current !== gameNumber) {
      winProcessedRef.current = gameNumber;
      trackWin(timerSeconds, moveCount);
      const next = recordWin(loadStats('spider'), timerSeconds, moveCount);
      saveStats(next, 'spider');
      setWinStats(next);
      setTimeout(() => setShowWinModal(true), 500);
    }
  }, [isWon, gameNumber, timerSeconds, moveCount]);

  // Analytics for the DOM Spider engine.
  useEffect(() => {
    if (!gameNumber || trackedGameStartRef.current === gameNumber) return;
    trackedGameStartRef.current = gameNumber;
    trackedMoveCountRef.current = moveCount;
    trackGameStart(gameNumber, 'spider', difficulty);
  }, [gameNumber, moveCount, difficulty]);

  useEffect(() => {
    if (moveCount > trackedMoveCountRef.current) {
      for (let i = trackedMoveCountRef.current; i < moveCount; i++) {
        trackMove('tap');
      }
      clearHint();
    }
    trackedMoveCountRef.current = moveCount;
  }, [moveCount, clearHint]);

  const handleNewGame = useCallback(() => {
    if (timerStarted && !isWon) {
      trackAbandoned();
      // Abandoning an in-progress game counts as a loss so win % stays honest.
      saveStats(recordLoss(loadStats('spider')), 'spider');
    }
    clearHint();
    newGame();
  }, [timerStarted, isWon, newGame, clearHint]);

  const handleUndo = useCallback(() => {
    clearHint();
    undo();
    trackUndo();
  }, [undo, clearHint]);

  const handleHint = useCallback(() => {
    trackHint();
    const hint = domSpiderStore.getState().getEngine().getHint();
    if (!hint) {
      clearHint();
      return;
    }

    clearHint();
    setHintHighlight({
      sourceCardIds: hint.cards.map((card) => card.id),
      sourceLocation: hint.from,
      targetLocation: hint.to,
    });
    hintTimerRef.current = setTimeout(() => setHintHighlight(null), 3500);
  }, [clearHint]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') { e.preventDefault(); handleUndo(); return; }
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'z') { e.preventDefault(); handleUndo(); return; }
      if (key === 'n') { e.preventDefault(); handleNewGame(); return; }
      if (key === 'h') { e.preventDefault(); handleHint(); return; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleUndo, handleNewGame, handleHint]);

  useEffect(() => {
    return () => {
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
      }
    };
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
  const suitLabels: Record<SpiderDifficulty, string> = isMobile
    ? { '1-suit': '1', '2-suit': '2', '4-suit': '4' }
    : { '1-suit': '1 Suit', '2-suit': '2 Suits', '4-suit': '4 Suits' };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--theme-dark, #0a3310)',
      }}
    >
      {/* Mobile top strip.
          Two rows: the switcher + stats pill share row 1, the suit selector owns row 2.
          Keeping them on a single row overflows at <=375px (iPhone SE/8/X), where the
          stats pill lands on top of the 4-suit chip and swallows its taps. */}
      <div
        className="flex sm:hidden"
        style={{
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          columnGap: '10px',
          rowGap: '8px',
          padding: '8px 10px',
          background: 'rgba(0,0,0,0.34)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <GameSwitcher currentGame="Spider Solitaire" currentIcon="♣" />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '5px 9px',
            background: 'rgba(0,0,0,0.24)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '9999px',
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.36)', textTransform: 'uppercase' }}>Time</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.82)', fontFamily: 'monospace' }}>{formatTime(timerSeconds)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.36)', textTransform: 'uppercase' }}>Moves</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.82)', fontFamily: 'monospace' }}>{moveCount}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.36)', textTransform: 'uppercase' }}>Suits</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>{foundations.length}/8</div>
          </div>
        </div>

        {/* Row 2 — full width forces the wrap, so the chips can never sit under the pill */}
        <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
          {(['1-suit', '2-suit', '4-suit'] as SpiderDifficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              aria-label={d === '1-suit' ? 'One suit' : d === '2-suit' ? 'Two suits' : 'Four suits'}
              aria-pressed={difficulty === d}
              style={{
                flex: 1,
                minHeight: '36px',
                borderRadius: '7px',
                border: `1px solid ${difficulty === d ? 'rgba(212,175,55,0.55)' : 'rgba(255,255,255,0.1)'}`,
                background: difficulty === d ? 'rgba(212,175,55,0.16)' : 'rgba(255,255,255,0.04)',
                color: difficulty === d ? '#D4AF37' : 'rgba(255,255,255,0.55)',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {suitLabels[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div
        className="hidden sm:flex"
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
          gap: '8px',
          position: 'relative',
          zIndex: 50,
        }}
      >
        {/* Left: Game name + difficulty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <GameSwitcher currentGame="Spider Solitaire" currentIcon="♣" />

          {/* Difficulty toggle */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {(['1-suit', '2-suit', '4-suit'] as SpiderDifficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${difficulty === d ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  background: difficulty === d ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                  color: difficulty === d ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {suitLabels[d]}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Stats */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '12px' : '24px',
            padding: isMobile ? '6px 12px' : '8px 24px',
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '9999px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Time</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{formatTime(timerSeconds)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Moves</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{moveCount}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Suits</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{foundations.length}/8</div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={handleUndo}
            disabled={moveHistory.length === 0}
            title="Undo (Ctrl+Z)"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: moveHistory.length === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(212,175,55,0.15)',
              border: `1px solid ${moveHistory.length === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(212,175,55,0.3)'}`,
              color: moveHistory.length === 0 ? 'rgba(255,255,255,0.2)' : '#D4AF37',
              fontSize: '12px',
              fontWeight: 600,
              cursor: moveHistory.length === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Undo2 size={14} />
            {!isMobile && 'Undo'}
          </button>
          <button
            onClick={handleHint}
            title="Hint (H)"
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Lightbulb size={14} />
            {!isMobile && 'Hint'}
          </button>
          <button onClick={handleNewGame} title="New Game" style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            New Deal
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div className="p-3 pb-24 sm:p-4 sm:pb-4" style={{ flex: 1, overflow: 'auto' }}>
          <DomSpiderBoard hint={hintHighlight} />
          <MobileNextActionPanel
            /* Coaching + Tips deep-link only. Hint/Undo intentionally omitted:
               the persistent mobile bottom bar (Home/New/Undo/Hint) already
               carries both, so passing them rendered duplicate on-screen
               controls on portrait phones. Mirrors the FreeCell fix (ff5480b,
               logged 2026-07-18/19); Spider confirmed live on 2026-07-20. */
            title="Build a clean run"
            body="Ask for a hint before dealing from stock, or undo moves that bury a suited sequence."
            learnHref="/spider/tips"
            learnLabel="Tips"
          />
        </div>

        {/* Sidebar */}
        <div
          className="hidden xl:flex"
          style={{
            width: '240px',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px 16px 16px 0',
          }}
        >
          <AdUnit slot="5697552640" format="rectangle" />
        </div>
      </div>

      {/* Mobile bottom actions */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex sm:hidden"
        style={{
          justifyContent: 'space-around',
          gap: '8px',
          padding: '8px 10px calc(8px + env(safe-area-inset-bottom))',
          background: 'rgba(7, 27, 12, 0.96)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 -10px 24px rgba(0,0,0,0.22)',
        }}
      >
        <Link
          href="/"
          aria-label="Home"
          style={{
            minWidth: 0,
            flex: 1,
            height: '44px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <Home size={17} />
          Home
        </Link>
        <button
          onClick={handleNewGame}
          title="New Game"
          style={{
            minWidth: 0,
            flex: 1,
            height: '44px',
            borderRadius: '8px',
            background: 'rgba(212,175,55,0.16)',
            border: '1px solid rgba(212,175,55,0.32)',
            color: '#D4AF37',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={17} />
          New
        </button>
        <button
          onClick={handleUndo}
          disabled={moveHistory.length === 0}
          title="Undo"
          style={{
            minWidth: 0,
            flex: 1,
            height: '44px',
            borderRadius: '8px',
            background: moveHistory.length === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${moveHistory.length === 0 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.08)'}`,
            color: moveHistory.length === 0 ? 'rgba(255,255,255,0.26)' : 'rgba(255,255,255,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: moveHistory.length === 0 ? 'default' : 'pointer',
          }}
        >
          <Undo2 size={17} />
          Undo
        </button>
        <button
          onClick={handleHint}
          title="Hint"
          style={{
            minWidth: 0,
            flex: 1,
            height: '44px',
            borderRadius: '8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.72)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Lightbulb size={17} />
          Hint
        </button>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
          }}
          onClick={() => setShowWinModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'linear-gradient(135deg, #0f3a0f, #1a5c1a)',
              borderRadius: '20px',
              padding: '40px',
              textAlign: 'center',
              border: '2px solid rgba(212,175,55,0.3)',
              maxWidth: '400px',
              width: '90%',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🕷️</div>
            <h2 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>You Won!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              Spider Solitaire completed in {moveCount} moves
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: winStats ? '16px' : '24px' }}>
              Time: {formatTime(timerSeconds)} • Difficulty: {suitLabels[difficulty]}
            </p>
            {winStats && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '12px 16px', marginBottom: '24px', background: 'rgba(0,0,0,0.25)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Won</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{winStats.gamesWon}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Win Rate</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{getWinPercent(winStats)}%</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Streak</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{winStats.currentStreak}</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Best Time</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', fontFamily: 'monospace' }}>{winStats.bestTime !== null ? formatTime(winStats.bestTime) : '--'}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={async () => {
                  const diffLabel = difficulty === '1-suit' ? '1-Suit' : difficulty === '2-suit' ? '2-Suit' : '4-Suit';
                  const shareText = `🕷️ Spider Solitaire (${diffLabel}) — Solved!\n⏱️ ${formatTime(timerSeconds)} | 🔄 ${moveCount} moves\n\n${window.location.origin}`;
                  if (navigator.share) {
                    try { await navigator.share({ title: 'Spider Solitaire', text: shareText }); } catch {}
                  } else {
                    await navigator.clipboard.writeText(shareText);
                  }
                }}
                style={{
                  padding: '10px 24px',
                  borderRadius: '10px',
                  background: 'rgba(212,175,55,0.2)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#D4AF37',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Share Result
              </button>
              <button
                onClick={() => { setShowWinModal(false); newGame(); }}
                style={{
                  padding: '10px 24px',
                  borderRadius: '10px',
                  background: 'rgba(212,175,55,0.2)',
                  border: '1px solid rgba(212,175,55,0.4)',
                  color: '#D4AF37',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                New Game
              </button>
              <Link
                href="/"
                style={{
                  padding: '10px 24px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
