'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDomKlondikeStore, domKlondikeStore } from '@/lib/dom-klondike/useDomKlondikeStore';
import DomKlondikeBoard from './DomKlondikeBoard';
import { KlondikeDrawMode } from '@/engine/KlondikeEngine';
import Link from 'next/link';
import { isHubSite } from '@/lib/siteConfig';
import { Undo2, RotateCcw, Lightbulb, Home } from 'lucide-react';
import AdUnit from '../AdUnit';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// DomKlondikeShell
// ---------------------------------------------------------------------------

interface DomKlondikeShellProps {
  initialDrawMode?: KlondikeDrawMode;
}

export default function DomKlondikeShell({ initialDrawMode = 1 }: DomKlondikeShellProps) {
  const gameNumber = useDomKlondikeStore((s) => s.gameNumber);
  const moveCount = useDomKlondikeStore((s) => s.moveCount);
  const isWon = useDomKlondikeStore((s) => s.isWon);
  const timerSeconds = useDomKlondikeStore((s) => s.timerSeconds);
  const timerStarted = useDomKlondikeStore((s) => s.timerStarted);
  const tickTimer = useDomKlondikeStore((s) => s.tickTimer);
  const newGame = useDomKlondikeStore((s) => s.newGame);
  const undo = useDomKlondikeStore((s) => s.undo);
  const drawMode = useDomKlondikeStore((s) => s.drawMode);
  const setDrawMode = useDomKlondikeStore((s) => s.setDrawMode);
  const getEngine = useDomKlondikeStore((s) => s.getEngine);

  const [showWinModal, setShowWinModal] = useState(false);

  // Timer
  useEffect(() => {
    if (!timerStarted || isWon) return;
    const id = setInterval(tickTimer, 1000);
    return () => clearInterval(id);
  }, [timerStarted, isWon, tickTimer]);

  // Set draw mode on mount
  useEffect(() => {
    if (initialDrawMode && initialDrawMode !== drawMode) {
      setDrawMode(initialDrawMode);
    }
    newGame();
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

  // Hint
  const handleHint = useCallback(() => {
    const engine = getEngine();
    const hint = engine.getHint();
    if (hint) {
      // For now just auto-execute the hint
      if (hint.from.type === 'stock' && hint.to.type === 'waste') {
        domKlondikeStore.getState().drawFromStock();
      } else {
        domKlondikeStore.getState().tryMove(hint.from, hint.to);
      }
    }
  }, [getEngine]);

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
        {/* Left: Game name + draw mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            href={isHubSite ? '/' : '/klondike'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: '10px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span style={{ fontSize: '15px' }}>♦</span>
            <span style={{
              fontSize: '13px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.02em',
            }}>Klondike</span>
          </Link>

          {/* Draw mode toggle */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {([1, 3] as KlondikeDrawMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setDrawMode(mode)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${drawMode === mode ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  background: drawMode === mode ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                  color: drawMode === mode ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Draw {mode}
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
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Game</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>#{gameNumber}</div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button onClick={undo} title="Undo" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            <Undo2 size={16} />
          </button>
          <button onClick={handleHint} title="Hint" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>
            <Lightbulb size={16} />
          </button>
          <button onClick={() => newGame()} title="New Game" style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>
            New Deal
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Game board */}
        <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
          <DomKlondikeBoard />
        </div>

        {/* Right sidebar (desktop) */}
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
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>You Won!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
              Game #{gameNumber} completed in {moveCount} moves
            </p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
              Time: {formatTime(timerSeconds)}
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
                href={isHubSite ? '/' : '/'}
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
