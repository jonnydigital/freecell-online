'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GenericSolitaireShell from '@/components/dom-generic/GenericSolitaireShell';
import DomCard from '@/components/dom-freecell/DomCard';
import DomPile from '@/components/dom-freecell/DomPile';
import { PyramidEngine, PyramidLocation } from '@/engine/PyramidEngine';
import { dealPyramidGame } from '@/engine/Deck';
import { Card } from '@/engine/Card';
import '@/components/dom-freecell/dom-card-styles.css';

type PyramidSelection = {
  card: Card;
  location: PyramidLocation;
};

function createEngine(gameNumber: number) {
  const { pyramid, stock } = dealPyramidGame(gameNumber);
  return new PyramidEngine(gameNumber, pyramid, stock);
}

function snapshot(engine: PyramidEngine) {
  const state = engine.getState();
  return {
    pyramid: state.pyramid.map(row => [...row]),
    stock: [...state.stock],
    waste: [...state.waste],
    removed: [...state.removed],
    gameNumber: state.gameNumber,
    moveCount: state.moveCount,
    isWon: state.isWon,
    recyclesRemaining: state.recyclesRemaining,
  };
}

type PyramidSnapshot = ReturnType<typeof snapshot>;

function sameLocation(a: PyramidLocation, b: PyramidLocation) {
  if (a.type !== b.type) return false;
  if (a.type === 'pyramid' && b.type === 'pyramid') {
    return a.row === b.row && a.col === b.col;
  }
  return true;
}

function PyramidBoard({
  state,
  selected,
  engine,
  onSelect,
  onStockClick,
  onClearSelection,
}: {
  state: PyramidSnapshot;
  selected: PyramidSelection | null;
  engine: PyramidEngine;
  onSelect: (selection: PyramidSelection) => void;
  onStockClick: () => void;
  onClearSelection: () => void;
}) {
  const wasteTopCard = state.waste.length > 0 ? state.waste[state.waste.length - 1] : null;
  const stockAvailable = state.stock.length > 0 || (state.waste.length > 0 && state.recyclesRemaining > 0);

  const isSelected = useCallback((location: PyramidLocation) => {
    return selected ? sameLocation(selected.location, location) : false;
  }, [selected]);

  return (
    <div
      className="dom-board-surface"
      data-game="pyramid"
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
            disabled={!stockAvailable}
            title={state.stock.length > 0 ? 'Draw from stock' : state.recyclesRemaining > 0 ? 'Recycle waste' : 'Stock empty'}
            style={{
              position: 'relative',
              width: 'var(--card-width)',
              height: 'var(--card-height)',
              padding: 0,
              border: 0,
              background: 'transparent',
              cursor: stockAvailable ? 'pointer' : 'default',
            }}
          >
            <DomPile type="freecell" label={state.recyclesRemaining > 0 ? `x${state.recyclesRemaining}` : ''}>
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
                  style={{ top: 0, left: 0, cursor: 'pointer' }}
                  zIndex={1}
                  isSelected={isSelected({ type: 'waste' })}
                  onPointerDown={(event) => {
                    event.stopPropagation();
                    onSelect({ card: wasteTopCard, location: { type: 'waste' } });
                  }}
                  onDoubleClick={(event) => {
                    event.stopPropagation();
                    onSelect({ card: wasteTopCard, location: { type: 'waste' } });
                  }}
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
          <div>{engine.getRemainingCount()} pyramid cards</div>
          <div>{state.recyclesRemaining} recycle{state.recyclesRemaining === 1 ? '' : 's'} left</div>
        </div>
      </div>

      <div
        className="pyramid-layout"
        style={{
          position: 'relative',
          width: 'calc(var(--card-width) * 7)',
          height: 'calc(var(--card-height) + 6 * var(--pyramid-row-step))',
          margin: '0 auto',
        }}
      >
        {state.pyramid.map((row, rowIndex) => (
          row.map((card, colIndex) => {
            const location: PyramidLocation = { type: 'pyramid', row: rowIndex, col: colIndex };
            const exposed = card ? engine.isExposed(rowIndex, colIndex) : false;
            const left = `calc(${(6 - rowIndex) / 2 + colIndex} * var(--card-width))`;
            const top = `calc(${rowIndex} * var(--pyramid-row-step))`;

            if (!card) {
              return (
                <div
                  key={`empty-${rowIndex}-${colIndex}`}
                  className="pyramid-empty-slot"
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

            return (
              <DomCard
                key={card.id}
                card={card as any}
                style={{
                  left,
                  top,
                  cursor: exposed ? 'pointer' : 'default',
                  opacity: exposed ? 1 : 0.84,
                }}
                zIndex={rowIndex + 1}
                isSelected={isSelected(location)}
                onPointerDown={exposed ? (event) => {
                  event.stopPropagation();
                  onSelect({ card, location });
                } : undefined}
                onDoubleClick={exposed ? (event) => {
                  event.stopPropagation();
                  onSelect({ card, location });
                } : undefined}
              />
            );
          })
        ))}
      </div>
    </div>
  );
}

export default function PyramidGamePage() {
  const engineRef = useRef<PyramidEngine | null>(null);
  // Render-safe mirror of engineRef — refs must not be read during render
  // (react-hooks/refs); the engine identity only changes on newGame.
  const [engine, setEngine] = useState<PyramidEngine | null>(null);
  const [state, setState] = useState<PyramidSnapshot | null>(null);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [selection, setSelection] = useState<PyramidSelection | null>(null);

  const refresh = useCallback(() => {
    if (engineRef.current) setState(snapshot(engineRef.current));
  }, []);

  const newGame = useCallback(() => {
    const gameNumber = Math.floor(Math.random() * 1_000_000) + 1;
    engineRef.current = createEngine(gameNumber);
    setEngine(engineRef.current);
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

  const trySelectionMove = useCallback((fromSelection: PyramidSelection, toSelection: PyramidSelection) => {
    const engine = engineRef.current;
    if (!engine) return false;

    try {
      if (fromSelection.location.type === 'pyramid' && toSelection.location.type === 'pyramid') {
        if (!engine.canPair(fromSelection.card, toSelection.card)) return false;
        engine.pairPyramidCards(
          fromSelection.location.row,
          fromSelection.location.col,
          toSelection.location.row,
          toSelection.location.col
        );
        commitMove();
        return true;
      }

      if (fromSelection.location.type === 'pyramid' && toSelection.location.type === 'waste') {
        if (!engine.canPair(fromSelection.card, toSelection.card)) return false;
        engine.pairWithWaste(fromSelection.location.row, fromSelection.location.col);
        commitMove();
        return true;
      }

      if (fromSelection.location.type === 'waste' && toSelection.location.type === 'pyramid') {
        if (!engine.canPair(fromSelection.card, toSelection.card)) return false;
        engine.pairWithWaste(toSelection.location.row, toSelection.location.col);
        commitMove();
        return true;
      }
    } catch {
      return false;
    }

    return false;
  }, [commitMove]);

  const handleSelect = useCallback((nextSelection: PyramidSelection) => {
    const engine = engineRef.current;
    if (!engine) return;

    if (selection && !sameLocation(selection.location, nextSelection.location)) {
      if (trySelectionMove(selection, nextSelection)) return;
    }

    if (engine.isKing(nextSelection.card)) {
      try {
        if (nextSelection.location.type === 'pyramid') {
          engine.removeKing(nextSelection.location.row, nextSelection.location.col);
        } else if (nextSelection.location.type === 'waste') {
          engine.removeWasteKing();
        }
        commitMove();
        return;
      } catch {
        // Fall through to selection if the card cannot be removed.
      }
    }

    setSelection(nextSelection);
  }, [commitMove, selection, trySelectionMove]);

  const handleStockClick = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    const current = engine.getState();
    try {
      if (current.stock.length > 0) {
        engine.drawFromStock();
      } else if (current.waste.length > 0 && current.recyclesRemaining > 0) {
        engine.recycleWaste();
      } else {
        return;
      }
      setTimerStarted(true);
      setSelection(null);
      refresh();
    } catch {
      return;
    }
  }, [refresh]);

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
      switch (hint.type) {
        case 'king': {
          const source = hint.from[0];
          if (source.type === 'pyramid') engine.removeKing(source.row, source.col);
          if (source.type === 'waste') engine.removeWasteKing();
          break;
        }
        case 'pair': {
          const [a, b] = hint.from;
          if (a.type === 'pyramid' && b.type === 'pyramid') {
            engine.pairPyramidCards(a.row, a.col, b.row, b.col);
          } else if (a.type === 'pyramid' && b.type === 'waste') {
            engine.pairWithWaste(a.row, a.col);
          } else if (a.type === 'waste' && b.type === 'pyramid') {
            engine.pairWithWaste(b.row, b.col);
          }
          break;
        }
        case 'draw':
          engine.drawFromStock();
          break;
        case 'recycle':
          engine.recycleWaste();
          break;
      }
      commitMove();
    } catch {
      return;
    }
  }, [commitMove]);

  const extraStats = useMemo(() => {
    if (!state) return null;
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Left</div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', fontFamily: 'monospace' }}>
          {state.pyramid.flat().filter(Boolean).length}
        </div>
      </div>
    );
  }, [state]);

  if (!state || !engine) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0a3d0a]">
        <p className="text-white/60">Loading...</p>
      </div>
    );
  }

  return (
    <GenericSolitaireShell
      gameName="Pyramid"
      gameIcon="△"
      gameHref="/pyramid"
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
      <PyramidBoard
        state={state}
        selected={selection}
        engine={engine}
        onSelect={handleSelect}
        onStockClick={handleStockClick}
        onClearSelection={() => setSelection(null)}
      />
    </GenericSolitaireShell>
  );
}
