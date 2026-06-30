'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GenericSolitaireShell from '@/components/dom-generic/GenericSolitaireShell';
import DomCard from '@/components/dom-freecell/DomCard';
import DomPile from '@/components/dom-freecell/DomPile';
import { TriPeaksEngine, TriPeaksLocation, ROW_COLS } from '@/engine/TriPeaksEngine';
import { dealTriPeaksGame } from '@/engine/Deck';
import { Card } from '@/engine/Card';
import '@/components/dom-freecell/dom-card-styles.css';

function createEngine(gameNumber: number) {
  const { tableau, stock, waste } = dealTriPeaksGame(gameNumber);
  return new TriPeaksEngine(gameNumber, tableau, stock, waste);
}

function snapshot(engine: TriPeaksEngine) {
  const state = engine.getState();
  return {
    tableau: state.tableau.map(row => [...row]),
    stock: [...state.stock],
    waste: [...state.waste],
    removed: [...state.removed],
    gameNumber: state.gameNumber,
    moveCount: state.moveCount,
    score: state.score,
    streak: state.streak,
    isWon: state.isWon,
  };
}

type TriPeaksSnapshot = ReturnType<typeof snapshot>;

function sameTableauLocation(a: TriPeaksLocation | null, b: TriPeaksLocation) {
  return a?.type === 'tableau' && b.type === 'tableau' && a.row === b.row && a.col === b.col;
}

function TriPeaksBoard({
  state,
  engine,
  selected,
  onCardClick,
  onStockClick,
  onClearSelection,
}: {
  state: TriPeaksSnapshot;
  engine: TriPeaksEngine;
  selected: TriPeaksLocation | null;
  onCardClick: (location: TriPeaksLocation) => void;
  onStockClick: () => void;
  onClearSelection: () => void;
}) {
  const wasteTopCard = state.waste.length > 0 ? state.waste[state.waste.length - 1] : null;
  const remainingTableau = state.tableau.flat().filter(Boolean).length;

  return (
    <div
      className="dom-board-surface"
      data-game="tripeaks"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClearSelection();
      }}
      style={{
        background: 'var(--felt-color, #0a3d0a)',
        borderRadius: 12,
        boxSizing: 'border-box',
        padding: 'var(--board-padding-y) var(--board-padding-x)',
        maxWidth: 'var(--board-max-width)',
        margin: '0 auto',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--pile-gap)', marginBottom: 'calc(var(--board-padding-y) + var(--pile-gap))' }}>
        <div style={{ display: 'flex', gap: 'var(--pile-gap)', alignItems: 'flex-start' }}>
          <button
            type="button"
            onClick={onStockClick}
            disabled={state.stock.length === 0}
            title={state.stock.length > 0 ? 'Draw from stock' : 'Stock empty'}
            style={{
              position: 'relative',
              width: 'var(--card-width)',
              height: 'var(--card-height)',
              padding: 0,
              border: 0,
              background: 'transparent',
              cursor: state.stock.length > 0 ? 'pointer' : 'default',
            }}
          >
            <DomPile type="freecell" label={state.stock.length > 0 ? `${state.stock.length}` : ''}>
              {state.stock.length > 0 && (
                <div className="dom-card dom-card-back" style={{ position: 'absolute', top: 0, left: 0, width: 'var(--card-width)', height: 'var(--card-height)' }} />
              )}
            </DomPile>
          </button>

          <div style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}>
            <DomPile type="freecell">
              {wasteTopCard && (
                <DomCard
                  card={wasteTopCard as any}
                  style={{ top: 0, left: 0, cursor: 'default' }}
                  zIndex={1}
                />
              )}
            </DomPile>
          </div>

          <div style={{ minWidth: '5.5rem', paddingTop: 2, color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 1.45 }}>
            <div>{state.stock.length} stock</div>
            <div>{state.waste.length} waste</div>
            <div>{state.removed.length} cleared</div>
          </div>
        </div>

        <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 12, lineHeight: 1.45, textAlign: 'right', paddingTop: 2 }}>
          <div>{remainingTableau} peak cards</div>
          <div>{state.streak} streak</div>
        </div>
      </div>

      <div
        className="tripeaks-layout"
        style={{
          position: 'relative',
          width: 'calc(var(--card-width) * 10)',
          height: 'calc(var(--card-height) + 3 * var(--tripeaks-row-step))',
          margin: '0 auto',
        }}
      >
        {ROW_COLS.map((cols, rowIndex) => (
          cols.map((colIndex) => {
            const card = state.tableau[rowIndex]?.[colIndex] ?? null;
            const location: TriPeaksLocation = { type: 'tableau', row: rowIndex, col: colIndex };
            const available = card ? engine.isAvailable(rowIndex, colIndex) : false;
            const playable = card ? available && engine.canPlay(card) : false;
            const left = `calc((${colIndex} + ${(3 - rowIndex) / 2}) * var(--card-width))`;
            const top = `calc(${rowIndex} * var(--tripeaks-row-step))`;

            if (!card) {
              return (
                <div
                  key={`empty-${rowIndex}-${colIndex}`}
                  className="tripeaks-empty-slot"
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    zIndex: rowIndex + 1,
                  }}
                />
              );
            }

            if (!card.isFaceUp) {
              return (
                <div
                  key={card.id}
                  className="dom-card dom-card-back"
                  style={{
                    position: 'absolute',
                    left,
                    top,
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    zIndex: rowIndex + 1,
                    opacity: 0.92,
                  }}
                />
              );
            }

            return (
              <DomCard
                key={card.id}
                card={card as any}
                style={{
                  left,
                  top,
                  cursor: playable ? 'pointer' : available ? 'default' : 'not-allowed',
                  opacity: available ? 1 : 0.84,
                }}
                zIndex={rowIndex + 1}
                isSelected={sameTableauLocation(selected, location)}
                onPointerDown={available ? (event) => {
                  event.stopPropagation();
                  onCardClick(location);
                } : undefined}
                onDoubleClick={available ? (event) => {
                  event.stopPropagation();
                  onCardClick(location);
                } : undefined}
              />
            );
          })
        ))}
      </div>
    </div>
  );
}

export default function TriPeaksGamePage() {
  const engineRef = useRef<TriPeaksEngine | null>(null);
  const [state, setState] = useState<TriPeaksSnapshot | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selection, setSelection] = useState<TriPeaksLocation | null>(null);

  const refresh = useCallback(() => {
    if (engineRef.current) setState(snapshot(engineRef.current));
  }, []);

  const newGame = useCallback(() => {
    const gameNumber = Math.floor(Math.random() * 1_000_000) + 1;
    engineRef.current = createEngine(gameNumber);
    setTimerStarted(false);
    setTimerSeconds(0);
    setSelection(null);
    setState(snapshot(engineRef.current));
  }, []);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const commitMove = useCallback(() => {
    setTimerStarted(true);
    setSelection(null);
    refresh();
  }, [refresh]);

  const playCard = useCallback((location: TriPeaksLocation) => {
    const engine = engineRef.current;
    if (!engine || location.type !== 'tableau') return false;

    try {
      const card = engine.getState().tableau[location.row]?.[location.col];
      if (!card || !engine.isAvailable(location.row, location.col) || !engine.canPlay(card)) {
        setSelection(location);
        return false;
      }

      engine.playCard(location.row, location.col);
      commitMove();
      return true;
    } catch {
      setSelection(location);
      return false;
    }
  }, [commitMove]);

  const handleStockClick = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    try {
      engine.drawFromStock();
      commitMove();
    } catch {
      return;
    }
  }, [commitMove]);

  const handleUndo = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.undoLastMove();
    setSelection(null);
    refresh();
  }, [refresh]);

  const handleHint = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const hint = engine.getHint();
    if (!hint) return;

    try {
      if (hint.type === 'draw') {
        engine.drawFromStock();
      } else if (hint.type === 'play') {
        const source = hint.from[0];
        if (source.type !== 'tableau') return;
        engine.playCard(source.row, source.col);
      }
      commitMove();
    } catch {
      return;
    }
  }, [commitMove]);

  const extraStats = useMemo(() => {
    if (!state) return null;
    return (
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Score</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
            {state.score}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Left</div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
            {state.tableau.flat().filter(Boolean).length}
          </div>
        </div>
      </div>
    );
  }, [state]);

  if (!state || !engineRef.current) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <GenericSolitaireShell
      gameName="TriPeaks"
      gameIcon="⛰️"
      gameHref="/tripeaks"
      gameNumber={state.gameNumber}
      moveCount={state.moveCount}
      isWon={state.isWon}
      timerSeconds={timerSeconds}
      timerStarted={timerStarted}
      onNewGame={newGame}
      onUndo={handleUndo}
      onHint={handleHint}
      onTickTimer={() => setTimerSeconds(seconds => seconds + 1)}
      extraStats={extraStats}
    >
      <TriPeaksBoard
        state={state}
        engine={engineRef.current}
        selected={selection}
        onCardClick={playCard}
        onStockClick={handleStockClick}
        onClearSelection={() => setSelection(null)}
      />
    </GenericSolitaireShell>
  );
}
