'use client';

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import GenericSolitaireShell from '@/components/dom-generic/GenericSolitaireShell';
import DomCard from '@/components/dom-freecell/DomCard';
import '@/components/dom-freecell/dom-card-styles.css';
import { GapsEngine, GapsLocation, GapsMove } from '@/engine/GapsEngine';
import { dealGapsGame } from '@/engine/Deck';
import { Card } from '@/engine/Card';
import { soundManager } from '@/lib/sounds';

export default function GapsGamePage() {
  const engineRef = useRef<GapsEngine | null>(null);
  const [grid, setGrid] = useState<(Card | null)[][] | null>(null);
  const [lockedCells, setLockedCells] = useState<boolean[][]>([]);
  const [redealsRemaining, setRedealsRemaining] = useState(2);
  const [gameNumber, setGameNumber] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedCard, setSelectedCard] = useState<GapsLocation | null>(null);
  const [validTargets, setValidTargets] = useState<Set<string>>(new Set());
  const [canRedeal, setCanRedeal] = useState(false);

  const refresh = useCallback(() => {
    if (!engineRef.current) return;
    const s = engineRef.current.getState();
    setGrid(s.grid.map(row => [...row]));
    setLockedCells(s.lockedCells.map(row => [...row]));
    setRedealsRemaining(s.redealsRemaining);
    setGameNumber(s.gameNumber);
    setMoveCount(s.moveCount);
    setIsWon(s.isWon);
    setCanRedeal(engineRef.current.canRedeal());
  }, []);

  const newGame = useCallback((num?: number) => {
    const gameNum = num ?? Math.floor(Math.random() * 1_000_000) + 1;
    const { grid: dealGrid } = dealGapsGame(gameNum);
    engineRef.current = new GapsEngine(gameNum, dealGrid);
    setTimerStarted(false);
    setTimerSeconds(0);
    setSelectedCard(null);
    setValidTargets(new Set());
    refresh();
  }, [refresh]);

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update valid targets when selection changes
  useEffect(() => {
    if (!engineRef.current || !selectedCard) {
      setValidTargets(new Set());
      return;
    }
    const moves = engineRef.current.getValidMoves();
    const card = engineRef.current.getState().grid[selectedCard.row][selectedCard.col];
    if (!card) {
      setValidTargets(new Set());
      return;
    }
    const targets = new Set<string>();
    for (const m of moves) {
      if (m.from.row === selectedCard.row && m.from.col === selectedCard.col) {
        targets.add(`${m.to.row}-${m.to.col}`);
      }
    }
    setValidTargets(targets);
  }, [selectedCard]);

  const handleCardClick = useCallback((row: number, col: number) => {
    if (!engineRef.current || isWon) return;
    const card = engineRef.current.getState().grid[row][col];

    if (selectedCard) {
      // If clicking a gap, try to move selected card there
      if (!card) {
        const from = selectedCard;
        const to = { row, col };
        if (engineRef.current.isLegalMove(from, to)) {
          engineRef.current.executeMove(from, to);
          setTimerStarted(true);
          soundManager.cardPlace();
          setSelectedCard(null);
          setValidTargets(new Set());
          refresh();
          return;
        }
      }
      // If clicking another card, select it instead
      if (card && !engineRef.current.getState().lockedCells[row][col]) {
        setSelectedCard({ row, col });
        return;
      }
      // Deselect
      setSelectedCard(null);
      setValidTargets(new Set());
      return;
    }

    // First click: select the card (if it's not locked and not null)
    if (card && !engineRef.current.getState().lockedCells[row][col]) {
      // Check if this card has any valid moves
      const moves = engineRef.current.getValidMoves();
      const hasMove = moves.some(m => m.from.row === row && m.from.col === col);
      if (hasMove) {
        setSelectedCard({ row, col });
      }
    }
  }, [selectedCard, isWon, refresh]);

  const handleDoubleClick = useCallback((row: number, col: number) => {
    if (!engineRef.current || isWon) return;
    const card = engineRef.current.getState().grid[row][col];
    if (!card || engineRef.current.getState().lockedCells[row][col]) return;

    // Auto-move: find the first valid gap for this card
    const moves = engineRef.current.getValidMoves();
    const move = moves.find(m => m.from.row === row && m.from.col === col);
    if (move) {
      engineRef.current.executeMove(move.from, move.to);
      setTimerStarted(true);
      soundManager.cardPlace();
      setSelectedCard(null);
      setValidTargets(new Set());
      refresh();
    }
  }, [isWon, refresh]);

  const handleGapClick = useCallback((row: number, col: number) => {
    if (!engineRef.current || isWon) return;

    if (selectedCard) {
      const from = selectedCard;
      const to = { row, col };
      if (engineRef.current.isLegalMove(from, to)) {
        engineRef.current.executeMove(from, to);
        setTimerStarted(true);
        soundManager.cardPlace();
        setSelectedCard(null);
        setValidTargets(new Set());
        refresh();
        return;
      }
    }

    // If no card selected, check if only one card can fill this gap
    const moves = engineRef.current.getValidMoves();
    const gapMoves = moves.filter(m => m.to.row === row && m.to.col === col);
    if (gapMoves.length === 1) {
      engineRef.current.executeMove(gapMoves[0].from, gapMoves[0].to);
      setTimerStarted(true);
      soundManager.cardPlace();
      setSelectedCard(null);
      setValidTargets(new Set());
      refresh();
    }
  }, [selectedCard, isWon, refresh]);

  const handleRedeal = useCallback(() => {
    if (!engineRef.current || !engineRef.current.canRedeal()) return;
    engineRef.current.redeal();
    soundManager.deal();
    setSelectedCard(null);
    setValidTargets(new Set());
    refresh();
  }, [refresh]);

  const handleUndo = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.undoLastMove();
    setSelectedCard(null);
    setValidTargets(new Set());
    refresh();
  }, [refresh]);

  const handleHint = useCallback(() => {
    if (!engineRef.current) return;
    const hint = engineRef.current.getHint();
    if (hint) {
      engineRef.current.executeMove(hint.from, hint.to);
      setTimerStarted(true);
      soundManager.cardPlace();
      setSelectedCard(null);
      setValidTargets(new Set());
      refresh();
    }
  }, [refresh]);

  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedCard(null);
      setValidTargets(new Set());
    }
  }, []);

  if (!grid) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a3d0a' }}><p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</p></div>;

  const redealButton = (
    <button
      onClick={handleRedeal}
      disabled={!canRedeal}
      style={{
        padding: '6px 14px',
        borderRadius: 10,
        background: canRedeal ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${canRedeal ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.06)'}`,
        color: canRedeal ? '#D4AF37' : 'rgba(255,255,255,0.3)',
        fontSize: 13,
        fontWeight: 700,
        cursor: canRedeal ? 'pointer' : 'default',
        letterSpacing: '0.02em',
      }}
    >
      Redeal ({redealsRemaining})
    </button>
  );

  return (
    <GenericSolitaireShell
      gameName="Gaps"
      gameIcon="🔲"
      gameHref="/gaps"
      gameNumber={gameNumber}
      moveCount={moveCount}
      isWon={isWon}
      timerSeconds={timerSeconds}
      timerStarted={timerStarted}
      onNewGame={newGame}
      onUndo={handleUndo}
      onHint={handleHint}
      onTickTimer={() => setTimerSeconds(s => s + 1)}
      extraToolbar={redealButton}
    >
      <div
        onClick={handleBoardClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          padding: '12px 8px',
          gap: '6px',
          minHeight: 0,
          background: 'var(--felt-color, #0a3d0a)',
          borderRadius: 12,
        }}
      >
        {grid.map((row, r) => (
          <div
            key={r}
            style={{
              display: 'flex',
              gap: '3px',
              justifyContent: 'center',
            }}
          >
            {row.map((card, c) => {
              const isLocked = lockedCells[r]?.[c] ?? false;
              const isSelected = selectedCard?.row === r && selectedCard?.col === c;
              const isValidTarget = validTargets.has(`${r}-${c}`);
              const isGap = card === null;
              const isDead = isGap && engineRef.current ? engineRef.current.isDeadGap(r, c) : false;

              if (isGap) {
                return (
                  <div
                    key={`gap-${r}-${c}`}
                    onClick={() => handleGapClick(r, c)}
                    style={{
                      width: 'clamp(22px, calc((100vw - 60px) / 13), 72px)',
                      aspectRatio: '5/7',
                      borderRadius: 'clamp(2px, 0.5vw, 6px)',
                      border: isValidTarget
                        ? '2px solid rgba(212,175,55,0.7)'
                        : isDead
                          ? '1px dashed rgba(255,255,255,0.08)'
                          : '1px dashed rgba(255,255,255,0.15)',
                      background: isValidTarget
                        ? 'rgba(212,175,55,0.12)'
                        : isDead
                          ? 'rgba(0,0,0,0.15)'
                          : 'rgba(255,255,255,0.03)',
                      cursor: isValidTarget ? 'pointer' : isDead ? 'default' : 'pointer',
                      boxSizing: 'border-box',
                      flexShrink: 0,
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  />
                );
              }

              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(r, c)}
                  onDoubleClick={() => handleDoubleClick(r, c)}
                  style={{
                    width: 'clamp(22px, calc((100vw - 60px) / 13), 72px)',
                    position: 'relative',
                    flexShrink: 0,
                  }}
                >
                  <DomCard
                    card={card}
                    isSelected={isSelected}
                    style={{
                      width: '100%',
                      aspectRatio: '5/7',
                      fontSize: 'clamp(7px, calc((100vw - 60px) / 13 * 0.28), 16px)',
                      cursor: isLocked ? 'default' : 'pointer',
                      opacity: isLocked ? 0.85 : 1,
                    }}
                  />
                  {isLocked && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 'clamp(2px, 0.5vw, 6px)',
                        background: 'rgba(34,197,94,0.1)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </GenericSolitaireShell>
  );
}
