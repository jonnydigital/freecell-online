'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import GenericSolitaireShell from '@/components/dom-generic/GenericSolitaireShell';
import DomCard from '@/components/dom-freecell/DomCard';
import '@/components/dom-freecell/dom-card-styles.css';
import { MonteCarloEngine, MonteCarloPosition } from '@/engine/MonteCarloEngine';
import { dealMonteCarloGame } from '@/engine/Deck';
import { Card } from '@/engine/Card';
import { soundManager } from '@/lib/sounds';

export default function MonteCarloGamePage() {
  const engineRef = useRef<MonteCarloEngine | null>(null);
  const [grid, setGrid] = useState<(Card | null)[][]>(Array.from({ length: 5 }, () => Array(5).fill(null)));
  const [stockCount, setStockCount] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selectedPos, setSelectedPos] = useState<MonteCarloPosition | null>(null);
  const [validPairCount, setValidPairCount] = useState(0);
  const [canConsolidate, setCanConsolidate] = useState(false);
  const [removingCells, setRemovingCells] = useState<Set<string>>(new Set());

  const refresh = useCallback(() => {
    if (!engineRef.current) return;
    const s = engineRef.current.getState();
    setGrid(s.grid.map(row => [...row]));
    setStockCount(s.stock.length);
    setGameNumber(s.gameNumber);
    setMoveCount(s.moveCount);
    setIsWon(s.isWon);
    setIsLost(s.isLost);
    setValidPairCount(engineRef.current.getValidPairs().length);
    setCanConsolidate(engineRef.current.canConsolidate());
  }, []);

  const newGame = useCallback((num?: number) => {
    const gameNum = num ?? Math.floor(Math.random() * 1_000_000) + 1;
    const { grid: g, stock } = dealMonteCarloGame(gameNum);
    engineRef.current = new MonteCarloEngine(gameNum, g, stock);
    setTimerStarted(false);
    setTimerSeconds(0);
    setSelectedPos(null);
    setRemovingCells(new Set());
    refresh();
  }, [refresh]);

  useEffect(() => {
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (!engineRef.current) return;
    const engine = engineRef.current;
    const state = engine.getState();
    const card = state.grid[row]?.[col];
    if (!card) return;

    if (!selectedPos) {
      // First selection
      setSelectedPos({ row, col });
      setTimerStarted(true);
      return;
    }

    // Same cell clicked — deselect
    if (selectedPos.row === row && selectedPos.col === col) {
      setSelectedPos(null);
      return;
    }

    // Try to remove pair
    const pos2 = { row, col };
    if (engine.canRemovePair(selectedPos, pos2)) {
      // Flash animation
      const key1 = `${selectedPos.row}-${selectedPos.col}`;
      const key2 = `${row}-${col}`;
      setRemovingCells(new Set([key1, key2]));

      setTimeout(() => {
        engine.removePair(selectedPos, pos2);
        soundManager.cardPlace();
        setSelectedPos(null);
        setRemovingCells(new Set());
        refresh();
      }, 300);
    } else {
      // Select the new card instead
      setSelectedPos(pos2);
    }
  }, [selectedPos, refresh]);

  const handleConsolidate = useCallback(() => {
    if (!engineRef.current) return;
    if (!engineRef.current.canConsolidate()) return;
    engineRef.current.consolidateAndDeal();
    soundManager.cardPlace();
    setSelectedPos(null);
    refresh();
  }, [refresh]);

  const handleUndo = useCallback(() => {
    if (!engineRef.current) return;
    engineRef.current.undo();
    setSelectedPos(null);
    setRemovingCells(new Set());
    refresh();
  }, [refresh]);

  const handleHint = useCallback(() => {
    if (!engineRef.current) return;
    const pairs = engineRef.current.getValidPairs();
    if (pairs.length > 0) {
      const hint = pairs[0];
      setSelectedPos(hint.pos1);
      setTimerStarted(true);
    }
  }, []);

  if (!engineRef.current) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a3d0a' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</p>
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '5/7',
    fontSize: 'clamp(10px, 2.5vw, 16px)',
    cursor: 'pointer',
  };

  const pairsInfo = (
    <span
      style={{
        padding: '4px 10px',
        borderRadius: 8,
        background: 'rgba(255,255,255,0.06)',
        color: validPairCount > 0 ? 'rgba(212,175,55,0.7)' : 'rgba(239,68,68,0.7)',
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      Pairs: {validPairCount}
    </span>
  );

  const consolidateButton = canConsolidate && validPairCount === 0 ? (
    <button
      onClick={handleConsolidate}
      style={{
        padding: '4px 12px',
        borderRadius: 8,
        background: 'rgba(212,175,55,0.15)',
        border: '1px solid rgba(212,175,55,0.3)',
        color: '#D4AF37',
        fontSize: 12,
        fontWeight: 700,
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      Consolidate & Deal
    </button>
  ) : null;

  return (
    <GenericSolitaireShell
      gameName="Monte Carlo"
      gameIcon="🎰"
      gameHref="/monte-carlo"
      gameNumber={gameNumber}
      moveCount={moveCount}
      isWon={isWon}
      timerSeconds={timerSeconds}
      timerStarted={timerStarted}
      onNewGame={newGame}
      onUndo={handleUndo}
      onHint={handleHint}
      onTickTimer={() => setTimerSeconds(s => s + 1)}
      extraStats={pairsInfo}
      extraToolbar={consolidateButton}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          padding: '12px 8px',
          gap: '12px',
          minHeight: 0,
          background: 'var(--felt-color, #0a3d0a)',
          borderRadius: 12,
        }}
      >
        {/* Stock info */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontWeight: 600,
          }}>
            Stock: {stockCount}
          </span>
          <span style={{
            padding: '4px 12px',
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            color: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            fontWeight: 600,
          }}>
            Cards: {engineRef.current.getGridCardCount()}
          </span>
          {canConsolidate && (
            <button
              onClick={handleConsolidate}
              style={{
                padding: '6px 16px',
                borderRadius: 8,
                background: 'rgba(212,175,55,0.15)',
                border: '1px solid rgba(212,175,55,0.3)',
                color: '#D4AF37',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Consolidate & Deal
            </button>
          )}
        </div>

        {/* 5×5 Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, clamp(48px, 14vw, 90px))',
            gridTemplateRows: 'repeat(5, auto)',
            gap: 'clamp(4px, 1vw, 8px)',
            justifyContent: 'center',
          }}
        >
          {grid.map((row, r) =>
            row.map((card, c) => {
              const key = `${r}-${c}`;
              const isSelected = selectedPos?.row === r && selectedPos?.col === c;
              const isRemoving = removingCells.has(key);

              // Check if this card is part of a valid pair with the selected card
              let isValidTarget = false;
              if (selectedPos && card && !(selectedPos.row === r && selectedPos.col === c)) {
                const selectedCard = grid[selectedPos.row]?.[selectedPos.col];
                if (selectedCard &&
                    selectedCard.rank === card.rank &&
                    MonteCarloEngine.isAdjacent(selectedPos, { row: r, col: c })) {
                  isValidTarget = true;
                }
              }

              return (
                <div
                  key={key}
                  onClick={() => card && handleCellClick(r, c)}
                  style={{
                    aspectRatio: '5/7',
                    borderRadius: 'clamp(3px, 0.8vw, 8px)',
                    border: isSelected
                      ? '2px solid #D4AF37'
                      : isValidTarget
                        ? '2px solid rgba(212,175,55,0.5)'
                        : card
                          ? '1px solid rgba(255,255,255,0.08)'
                          : '1px dashed rgba(255,255,255,0.08)',
                    background: isRemoving
                      ? 'rgba(212,175,55,0.3)'
                      : card
                        ? 'transparent'
                        : 'rgba(255,255,255,0.02)',
                    boxSizing: 'border-box',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: card ? 'pointer' : 'default',
                    boxShadow: isSelected
                      ? '0 0 12px rgba(212,175,55,0.4)'
                      : isValidTarget
                        ? '0 0 8px rgba(212,175,55,0.2)'
                        : 'none',
                    transition: 'all 0.2s ease',
                    opacity: isRemoving ? 0.5 : 1,
                  }}
                >
                  {card && (
                    <div style={{ width: '100%' }}>
                      <DomCard
                        card={card}
                        style={cardStyle}
                        isSelected={isSelected}
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Loss indicator */}
        {isLost && !isWon && (
          <div style={{
            padding: '8px 16px',
            borderRadius: 10,
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: 'rgba(239,68,68,0.9)',
            fontSize: 13,
            fontWeight: 600,
            textAlign: 'center',
          }}>
            No more matching pairs — game over. Try a new game!
          </div>
        )}
      </div>
    </GenericSolitaireShell>
  );
}
