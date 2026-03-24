'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { useDomSpiderStore, domSpiderStore } from '@/lib/dom-spider/useDomSpiderStore';
import { Suit, SUIT_SYMBOLS } from '@/engine/Card';
import type { SpiderLocation } from '@/engine/SpiderEngine';
import DomCard from '../dom-freecell/DomCard';
import DomPile from '../dom-freecell/DomPile';
import '../dom-freecell/dom-card-styles.css';

export default function DomSpiderBoard() {
  const boardRef = useRef<HTMLDivElement>(null);

  const cascades = useDomSpiderStore((s) => s.cascades);
  const stock = useDomSpiderStore((s) => s.stock);
  const foundations = useDomSpiderStore((s) => s.foundations);
  const selection = useDomSpiderStore((s) => s.selection);
  const getEngine = useDomSpiderStore((s) => s.getEngine);
  const dealFromStock = useDomSpiderStore((s) => s.dealFromStock);
  const tryMove = useDomSpiderStore((s) => s.tryMove);

  const selectedCardIds = useMemo(() => {
    if (!selection) return new Set<string>();
    return new Set(selection.cardIds);
  }, [selection]);

  // Valid runs per cascade
  const validRuns = useMemo(() => {
    const engine = getEngine();
    return cascades.map((_, i) => engine.getValidRun(i));
  }, [cascades, getEngine]);

  const handleEmptyPileClick = useCallback(
    (targetLoc: SpiderLocation) => {
      const store = domSpiderStore.getState();
      const sel = store.selection;
      if (!sel) return;
      const moved = store.tryMove(sel.sourceLocation, targetLoc);
      store.clearSelection();
    },
    [],
  );

  const handleCardClick = useCallback(
    (cardId: string, cardIds: string[], source: SpiderLocation) => {
      const store = domSpiderStore.getState();
      const sel = store.selection;

      if (sel) {
        const moved = store.tryMove(sel.sourceLocation, source);
        store.clearSelection();
        if (moved) return;
      }

      store.selectCards(cardIds, source);
    },
    [],
  );

  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      domSpiderStore.getState().clearSelection();
    }
  }, []);

  // Stock piles indicator (5 groups of 10)
  const stockDeals = Math.ceil(stock.length / 10);

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
      {/* Top row: completed foundations (left) + stock (right) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 'var(--pile-gap)',
          marginBottom: 'calc(var(--board-padding-y) + var(--pile-gap))',
        }}
      >
        {/* Completed suit runs */}
        <div style={{ display: 'flex', gap: 'calc(var(--pile-gap) * 0.5)' }}>
          {Array.from({ length: 8 }, (_, i) => {
            const completed = foundations[i];
            return (
              <div
                key={`fn-${i}`}
                style={{
                  position: 'relative',
                  width: 'var(--card-width)',
                  height: 'var(--card-height)',
                  opacity: completed ? 1 : 0.2,
                }}
              >
                <DomPile type="foundation" label={completed ? SUIT_SYMBOLS[completed[0].suit] : '♠'}>
                  {completed && completed.length > 0 && (
                    <DomCard
                      card={completed[completed.length - 1] as any}
                      style={{ top: 0, left: 0 }}
                      zIndex={1}
                    />
                  )}
                </DomPile>
              </div>
            );
          })}
        </div>

        {/* Stock pile */}
        <div
          style={{ display: 'flex', gap: '4px', cursor: stock.length > 0 ? 'pointer' : 'default' }}
          onClick={stock.length > 0 ? dealFromStock : undefined}
        >
          {Array.from({ length: stockDeals }, (_, i) => (
            <div
              key={`stock-${i}`}
              className="dom-card dom-card-back"
              style={{
                width: 'var(--card-width)',
                height: 'var(--card-height)',
                cursor: 'pointer',
                opacity: 0.8 + (i * 0.04),
              }}
            />
          ))}
          {stock.length === 0 && (
            <div style={{
              width: 'var(--card-width)',
              height: 'var(--card-height)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.2)',
              fontSize: '12px',
            }}>
              Empty
            </div>
          )}
        </div>
      </div>

      {/* 10 Tableau columns */}
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

                  if (!isFaceUp) {
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

                  const faceDownCount = cascade.slice(0, rowIdx).filter(c => !c.isFaceUp).length;
                  const faceUpBefore = rowIdx - faceDownCount;
                  const yOffset = `calc(${faceDownCount} * var(--cascade-overlap) * 0.6 + ${faceUpBefore} * var(--cascade-overlap))`;

                  const dragCardIds = isInRun ? cascade.slice(rowIdx).filter(c => c.isFaceUp).map(c => c.id) : [card.id];
                  const srcLoc: SpiderLocation = {
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
