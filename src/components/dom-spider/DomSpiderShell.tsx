'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDomSpiderStore, domSpiderStore } from '@/lib/dom-spider/useDomSpiderStore';
import DomSpiderBoard from './DomSpiderBoard';
import { SpiderDifficulty } from '@/engine/SpiderEngine';
import Link from 'next/link';
import { Undo2, Lightbulb } from 'lucide-react';
import GameSwitcher from '../GameSwitcher';
import AdUnit from '../AdUnit';

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
      setTimeout(() => setShowWinModal(true), 500);
    }
  }, [isWon, gameNumber]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') { e.preventDefault(); undo(); return; }
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 'z') { e.preventDefault(); undo(); return; }
      if (key === 'n') { e.preventDefault(); newGame(); return; }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, newGame]);

  const suitLabels: Record<SpiderDifficulty, string> = {
    '1-suit': '1 Suit',
    '2-suit': '2 Suits',
    '4-suit': '4 Suits',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--theme-dark, #0a3310)',
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 16px',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          flexWrap: 'wrap',
          gap: '8px',
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
            gap: '24px',
            padding: '8px 24px',
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
            onClick={undo}
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
            Undo
          </button>
          <button onClick={() => newGame()} title="New Game" style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            New Deal
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '16px', overflow: 'hidden' }}>
          <DomSpiderBoard />
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
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
              Time: {formatTime(timerSeconds)} • Difficulty: {suitLabels[difficulty]}
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
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
