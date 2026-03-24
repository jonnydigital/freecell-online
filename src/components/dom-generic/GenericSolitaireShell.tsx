'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { isHubSite } from '@/lib/siteConfig';
import AdUnit from '../AdUnit';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

interface GenericSolitaireShellProps {
  gameName: string;
  gameIcon: string;
  gameHref: string;
  children: React.ReactNode;
  gameNumber: number;
  moveCount: number;
  isWon: boolean;
  timerSeconds: number;
  timerStarted: boolean;
  onNewGame: () => void;
  onUndo?: () => void;
  onHint?: () => void;
  onTickTimer: () => void;
  extraToolbar?: React.ReactNode;
  extraStats?: React.ReactNode;
}

export default function GenericSolitaireShell({
  gameName,
  gameIcon,
  gameHref,
  children,
  gameNumber,
  moveCount,
  isWon,
  timerSeconds,
  timerStarted,
  onNewGame,
  onUndo,
  onHint,
  onTickTimer,
  extraToolbar,
  extraStats,
}: GenericSolitaireShellProps) {
  const [showWinModal, setShowWinModal] = useState(false);

  // Timer
  useEffect(() => {
    if (!timerStarted || isWon) return;
    const id = setInterval(onTickTimer, 1000);
    return () => clearInterval(id);
  }, [timerStarted, isWon, onTickTimer]);

  // Win detection
  const winProcessedRef = useRef<number | null>(null);
  useEffect(() => {
    if (isWon && winProcessedRef.current !== gameNumber) {
      winProcessedRef.current = gameNumber;
      setTimeout(() => setShowWinModal(true), 500);
    }
  }, [isWon, gameNumber]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--theme-dark, #0a3310)' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href={isHubSite ? '/' : gameHref} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '6px 14px', borderRadius: '10px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: '15px' }}>{gameIcon}</span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.02em' }}>{gameName}</span>
          </Link>
          {extraToolbar}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '8px 24px', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Time</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{formatTime(timerSeconds)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Moves</div>
            <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>{moveCount}</div>
          </div>
          {extraStats}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {onUndo && (
            <button onClick={onUndo} title="Undo" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>↩</button>
          )}
          {onHint && (
            <button onClick={onHint} title="Hint" style={{ padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>💡</button>
          )}
          <button onClick={onNewGame} title="New Game" style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>New Deal</button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1 }}>
        <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>{children}</div>
        <div className="hidden xl:flex" style={{ width: '240px', flexDirection: 'column', gap: '16px', padding: '16px 16px 16px 0' }}>
          <AdUnit slot="5697552640" format="rectangle" />
        </div>
      </div>

      {/* Win Modal */}
      {showWinModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowWinModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(135deg, #0f3a0f, #1a5c1a)', borderRadius: '20px', padding: '40px', textAlign: 'center', border: '2px solid rgba(212,175,55,0.3)', maxWidth: '400px', width: '90%' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ color: '#D4AF37', fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>You Won!</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>{gameName} completed in {moveCount} moves</p>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>Time: {formatTime(timerSeconds)}</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => { setShowWinModal(false); onNewGame(); }} style={{ padding: '10px 24px', borderRadius: '10px', background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37', fontWeight: 600, cursor: 'pointer' }}>New Game</button>
              <Link href="/" style={{ padding: '10px 24px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, textDecoration: 'none' }}>Home</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
