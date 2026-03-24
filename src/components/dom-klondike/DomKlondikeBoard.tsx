'use client';

import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { useDomKlondikeStore, domKlondikeStore } from '@/lib/dom-klondike/useDomKlondikeStore';
import { Suit, SUIT_SYMBOLS } from '@/engine/Card';
import type { KlondikeLocation } from '@/engine/KlondikeEngine';
import DomCard from '../dom-freecell/DomCard';
import DomPile from '../dom-freecell/DomPile';
import '../dom-freecell/dom-card-styles.css';

// ---------------------------------------------------------------------------
// Foundation suits order
// ---------------------------------------------------------------------------
const FOUNDATION_SUITS: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];

// ---------------------------------------------------------------------------
// Board component
// ---------------------------------------------------------------------------

export default function DomKlondikeBoard() {
  const boardRef = useRef<HTMLDivElement>(null);

  const cascades = useDomKlondikeStore((s) => s.cascades);
  const foundations = useDomKlondikeStore((s) => s.foundations);
  const stock = useDomKlondikeStore((s) => s.stock);
  const waste = useDomKlondikeStore((s) => s.waste);
  const gameNumber = useDomKlondikeStore((s) => s.gameNumber);
  const getEngine = useDomKlondikeStore((s) => s.getEngine);
  const selection = useDomKlondikeStore((s) => s.selection);
  const drawFromStock = useDomKlondikeStore((s) => s.drawFromStock);
  const tryMove = useDomKlondikeStore((s) => s.tryMove);
  const autoPlace = useDomKlondikeStore((s) => s.autoPlace);

  // Selected card IDs
  const selectedCardIds = useMemo(() => {
    if (!selection) return new Set<string>();
    return new Set(selection.cardIds);
  }, [selection]);

  // Handle click on empty pile for selection-based moves
  const handleEmptyPileClick = useCallback(
    (targetLoc: KlondikeLocation) => {
      const store = domKlondikeStore.getState();
      const sel = store.selection;
      if (!sel) return;
      const moved = store.tryMove(sel.sourceLocation, targetLoc);
      if (moved) {
        store.clearSelection();
      } else {
        store.clearSelection();
      }
    },
    [],
  );

  // Handle card click for selection
  const handleCardClick = useCallback(
    (cardId: string, cardIds: string[], source: KlondikeLocation) => {
      const store = domKlondikeStore.getState();
      const sel = store.selection;

      if (sel) {
        // Try to move selection to this location
        const moved = store.tryMove(sel.sourceLocation, source);
        store.clearSelection();
        if (moved) return;
      }

      // Select this card
      store.selectCards(cardIds, source);
    },
    [],
  );

  // Double-click: auto-place
  const handleDoubleClick = useCallback(
    (cardId: string) => {
      autoPlace(cardId);
    },
    [autoPlace],
  );

  // Click stock to draw
  const handleStockClick = useCallback(() => {
    drawFromStock();
  }, [drawFromStock]);

  // Click board background to deselect
  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      domKlondikeStore.getState().clearSelection();
    }
  }, []);

  // Compute valid runs per cascade
  const validRuns = useMemo(() => {
    const engine = getEngine();
    return cascades.map((_, i) => engine.getValidRun(i));
  }, [cascades, getEngine]);

  // Foundation sparkle state
  const [sparkles, setSparkles] = useState<{ id: number; suit: Suit }[]>([]);
  const prevFoundationSizes = useRef<Map<Suit, number>>(new Map());
  let sparkleId = useRef(0);

  useEffect(() => {
    const newSparkles: { id: number; suit: Suit }[] = [];
    for (const suit of FOUNDATION_SUITS) {
      const currentSize = foundations.get(suit)?.length ?? 0;
      const prevSize = prevFoundationSizes.current.get(suit) ?? 0;
      if (currentSize > prevSize && prevSize >= 0) {
        newSparkles.push({ id: ++sparkleId.current, suit });
      }
      prevFoundationSizes.current.set(suit, currentSize);
    }
    if (newSparkles.length > 0) {
      setSparkles((prev) => [...prev, ...newSparkles]);
      const ids = newSparkles.map((s) => s.id);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !ids.includes(s.id)));
      }, 700);
    }
  }, [foundations]);

  useEffect(() => {
    prevFoundationSizes.current = new Map();
    setSparkles([]);
  }, [gameNumber]);

  // Waste: show top card(s)
  const wasteTopCard = waste.length > 0 ? waste[waste.length - 1] : null;

  return (
    <div
      className="dom-board-surface"
      ref={boardRef}
      onClick={handleBoardClick}
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
      {/* Top row: stock + waste (left), foundations (right) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--pile-gap)',
          marginBottom: 'calc(var(--board-padding-y) + var(--pile-gap))',
        }}
      >
        {/* Stock + Waste */}
        <div style={{ display: 'flex', gap: 'var(--pile-gap)' }}>
          {/* Stock pile */}
          <div
            style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)', cursor: 'pointer' }}
            onClick={handleStockClick}
          >
            <DomPile type="freecell" label="⟲">
              {stock.length > 0 && (
                <div
                  className="dom-card dom-card-back"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 'var(--card-width)',
                    height: 'var(--card-height)',
                    cursor: 'pointer',
                  }}
                />
              )}
            </DomPile>
          </div>

          {/* Waste pile */}
          <div
            style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}
          >
            <DomPile type="freecell" label="W">
              {wasteTopCard && (
                <DomCard
                  card={wasteTopCard as any}
                  style={{ top: 0, left: 0, cursor: 'pointer' }}
                  zIndex={1}
                  isSelected={selectedCardIds.has(wasteTopCard.id)}
                  onPointerDown={() => handleCardClick(wasteTopCard.id, [wasteTopCard.id], { type: 'waste' })}
                  onDoubleClick={() => handleDoubleClick(wasteTopCard.id)}
                />
              )}
            </DomPile>
          </div>
        </div>

        {/* 4 Foundations */}
        <div style={{ display: 'flex', gap: 'var(--pile-gap)' }}>
          {FOUNDATION_SUITS.map((suit) => {
            const pile = foundations.get(suit) ?? [];
            const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
            return (
              <div
                key={`fn-${suit}`}
                data-pile-type="foundation"
                data-pile-suit={suit}
                style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}
              >
                <DomPile
                  type="foundation"
                  label={SUIT_SYMBOLS[suit]}
                  onClick={selection ? () => handleEmptyPileClick({ type: 'foundation', suit }) : undefined}
                >
                  {topCard && (
                    <DomCard
                      card={topCard as any}
                      style={{ top: 0, left: 0 }}
                      zIndex={1}
                    />
                  )}
                </DomPile>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7 Tableau columns */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--pile-gap)',
        }}
      >
        {cascades.map((cascade, colIdx) => {
          const run = validRuns[colIdx];
          const runStartIndex = cascade.length - run.length;
          const cascadeHeight =
            cascade.length > 1
              ? `calc(var(--card-height) + ${(cascade.length - 1)} * var(--cascade-overlap))`
              : 'var(--card-height)';

          return (
            <div
              key={`cas-${colIdx}`}
              data-pile-type="cascade"
              data-pile-index={colIdx}
              style={{
                position: 'relative',
                width: 'var(--card-width)',
                minHeight: 'var(--card-height)',
                height: cascadeHeight,
              }}
            >
              <DomPile
                type="cascade"
                onClick={cascade.length === 0 && selection ? () => handleEmptyPileClick({ type: 'cascade', index: colIdx }) : undefined}
              >
                {cascade.map((card, rowIdx) => {
                  const isFaceUp = card.isFaceUp;
                  const isInRun = rowIdx >= runStartIndex && run.length > 0 && isFaceUp;
                  const isBottomCard = rowIdx === cascade.length - 1;

                  if (!isFaceUp) {
                    // Face-down card
                    return (
                      <div
                        key={card.id}
                        className="dom-card dom-card-back"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: 'var(--card-width)',
                          height: 'var(--card-height)',
                          transform: `translateY(calc(${rowIdx} * var(--cascade-overlap) * 0.6))`,
                          zIndex: rowIdx + 1,
                          pointerEvents: 'none',
                        }}
                      />
                    );
                  }

                  // Calculate offset: face-down cards have smaller overlap
                  const faceDownCount = cascade.slice(0, rowIdx).filter(c => !c.isFaceUp).length;
                  const faceUpBefore = rowIdx - faceDownCount;
                  const yOffset = `calc(${faceDownCount} * var(--cascade-overlap) * 0.6 + ${faceUpBefore} * var(--cascade-overlap))`;

                  // Draggable face-up card
                  const dragCardIds = isInRun ? cascade.slice(rowIdx).filter(c => c.isFaceUp).map(c => c.id) : [card.id];
                  const srcLoc: KlondikeLocation = {
                    type: 'cascade',
                    index: colIdx,
                    cardIndex: rowIdx,
                  };

                  return (
                    <DomCard
                      key={card.id}
                      card={card as any}
                      style={{
                        top: 0,
                        left: 0,
                        transform: `translateY(${yOffset})`,
                        cursor: isInRun ? 'grab' : 'default',
                      }}
                      zIndex={rowIdx + 1}
                      isSelected={selectedCardIds.has(card.id)}
                      onPointerDown={isInRun ? () => handleCardClick(card.id, dragCardIds, srcLoc) : undefined}
                      onDoubleClick={isBottomCard ? () => handleDoubleClick(card.id) : undefined}
                    />
                  );
                })}
              </DomPile>
            </div>
          );
        })}
      </div>
    </div>
  );
}
