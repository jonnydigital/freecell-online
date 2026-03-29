'use client';

import React, { useMemo, useCallback, useRef } from 'react';
import { Card, Suit, SUIT_SYMBOLS } from '@/engine/Card';
import DomCard from '../dom-freecell/DomCard';
import DomPile from '../dom-freecell/DomPile';
import '../dom-freecell/dom-card-styles.css';

const FOUNDATION_SUITS: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];

export interface BoardConfig {
  cascades: Card[][];
  foundations: Map<Suit, Card[]>;
  stock?: Card[];
  waste?: Card[];
  reserve?: Card[];
  freeCells?: (Card | null)[];
  validRuns: Card[][];
  selectedCardIds: Set<string>;
  onCardClick: (cardId: string, cardIds: string[], source: any) => void;
  onDoubleClick: (cardId: string) => void;
  onEmptyPileClick: (target: any) => void;
  onStockClick?: () => void;
  onBoardClick: (e: React.MouseEvent) => void;
  topRowLabel?: string;
  showWasteCount?: number; // How many waste cards to show (default 1)
}

export default function GenericCascadeBoard({
  cascades,
  foundations,
  stock,
  waste,
  reserve,
  freeCells,
  validRuns,
  selectedCardIds,
  onCardClick,
  onDoubleClick,
  onEmptyPileClick,
  onStockClick,
  onBoardClick,
  showWasteCount = 1,
}: BoardConfig) {
  const boardRef = useRef<HTMLDivElement>(null);

  const wasteTopCard = waste && waste.length > 0 ? waste[waste.length - 1] : null;
  const reserveTopCard = reserve && reserve.length > 0 ? reserve[reserve.length - 1] : null;

  // Override --card-width CSS variable for wide layouts (>8 cascades, e.g. Bristol's 11).
  // The default formula in dom-card-styles.css is designed for 8 columns; with more columns
  // we scale the divisor proportionally so all cards fit without overflow.
  const cardWidthOverride = useMemo(() => {
    if (cascades.length <= 8) return {};
    const divisor = (cascades.length * 1.08).toFixed(1); // ~1.08× accounts for pile gaps
    return {
      '--card-width': `clamp(60px, calc((100vw - 288px) / ${divisor}), 100px)`,
    } as React.CSSProperties;
  }, [cascades.length]);

  return (
    <div
      className="dom-board-surface"
      ref={boardRef}
      onClick={onBoardClick}
      style={{
        background: 'var(--felt-color, #0a3d0a)',
        borderRadius: 12,
        boxSizing: 'border-box',
        padding: 'var(--board-padding-y) var(--board-padding-x)',
        maxWidth: 'var(--board-max-width)',
        margin: '0 auto',
        position: 'relative',
        userSelect: 'none',
        ...cardWidthOverride,
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--pile-gap)', marginBottom: 'calc(var(--board-padding-y) + var(--pile-gap))' }}>
        {/* Left side: stock + waste (or free cells) */}
        <div style={{ display: 'flex', gap: 'var(--pile-gap)' }}>
          {/* Free cells if present */}
          {freeCells && freeCells.map((card, i) => (
            <div key={`fc-${i}`} style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}>
              <DomPile type="freecell" label="FC" onClick={!card ? () => onEmptyPileClick({ type: 'freecell', index: i }) : undefined}>
                {card && (
                  <DomCard
                    card={card as any}
                    style={{ top: 0, left: 0, cursor: 'pointer' }}
                    zIndex={1}
                    isSelected={selectedCardIds.has(card.id)}
                    onPointerDown={() => onCardClick(card.id, [card.id], { type: 'freecell', index: i })}
                    onDoubleClick={() => onDoubleClick(card.id)}
                  />
                )}
              </DomPile>
            </div>
          ))}

          {/* Stock pile */}
          {stock !== undefined && (
            <div style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)', cursor: stock.length > 0 ? 'pointer' : 'default' }} onClick={onStockClick}>
              <DomPile type="freecell" label="⟲">
                {stock.length > 0 && (
                  <div className="dom-card dom-card-back" style={{ position: 'absolute', top: 0, left: 0, width: 'var(--card-width)', height: 'var(--card-height)', cursor: 'pointer' }} />
                )}
              </DomPile>
            </div>
          )}

          {/* Waste pile */}
          {waste !== undefined && (
            <div style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}>
              <DomPile type="freecell" label="W">
                {wasteTopCard && (
                  <DomCard
                    card={wasteTopCard as any}
                    style={{ top: 0, left: 0, cursor: 'pointer' }}
                    zIndex={1}
                    isSelected={selectedCardIds.has(wasteTopCard.id)}
                    onPointerDown={() => onCardClick(wasteTopCard.id, [wasteTopCard.id], { type: 'waste' })}
                    onDoubleClick={() => onDoubleClick(wasteTopCard.id)}
                  />
                )}
              </DomPile>
            </div>
          )}

          {/* Reserve pile */}
          {reserve !== undefined && (
            <div style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}>
              <DomPile type="freecell" label={`R(${reserve.length})`}>
                {reserveTopCard && (
                  <DomCard
                    card={reserveTopCard as any}
                    style={{ top: 0, left: 0, cursor: 'pointer' }}
                    zIndex={1}
                    isSelected={selectedCardIds.has(reserveTopCard.id)}
                    onPointerDown={() => onCardClick(reserveTopCard.id, [reserveTopCard.id], { type: 'reserve' })}
                    onDoubleClick={() => onDoubleClick(reserveTopCard.id)}
                  />
                )}
              </DomPile>
            </div>
          )}
        </div>

        {/* Right side: Foundations */}
        <div style={{ display: 'flex', gap: 'var(--pile-gap)' }}>
          {FOUNDATION_SUITS.map((suit) => {
            const pile = foundations.get(suit) ?? [];
            const topCard = pile.length > 0 ? pile[pile.length - 1] : null;
            return (
              <div key={`fn-${suit}`} style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}>
                <DomPile type="foundation" label={SUIT_SYMBOLS[suit]} onClick={() => onEmptyPileClick({ type: 'foundation', suit })}>
                  {topCard && <DomCard card={topCard as any} style={{ top: 0, left: 0 }} zIndex={1} />}
                </DomPile>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cascades */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--pile-gap)' }}>
        {cascades.map((cascade, colIdx) => {
          const run = validRuns[colIdx] || [];
          const runStartIndex = cascade.length - run.length;
          const cascadeHeight = cascade.length > 1
            ? `calc(var(--card-height) + ${(cascade.length - 1)} * var(--cascade-overlap))`
            : 'var(--card-height)';

          return (
            <div key={`cas-${colIdx}`} data-pile-type="cascade" data-pile-index={colIdx} style={{ position: 'relative', width: 'var(--card-width)', minHeight: 'var(--card-height)', height: cascadeHeight }}>
              <DomPile type="cascade" onClick={cascade.length === 0 ? () => onEmptyPileClick({ type: 'cascade', index: colIdx }) : undefined}>
                {cascade.map((card, rowIdx) => {
                  const isFaceUp = card.isFaceUp;
                  const isInRun = rowIdx >= runStartIndex && run.length > 0 && isFaceUp;
                  const isBottomCard = rowIdx === cascade.length - 1;

                  if (!isFaceUp) {
                    return (
                      <div key={card.id} className="dom-card dom-card-back" style={{
                        position: 'absolute', top: 0, left: 0, width: 'var(--card-width)', height: 'var(--card-height)',
                        transform: `translateY(calc(${rowIdx} * var(--cascade-overlap) * 0.6))`,
                        zIndex: rowIdx + 1, pointerEvents: 'none',
                      }} />
                    );
                  }

                  const faceDownCount = cascade.slice(0, rowIdx).filter(c => !c.isFaceUp).length;
                  const faceUpBefore = rowIdx - faceDownCount;
                  const yOffset = `calc(${faceDownCount} * var(--cascade-overlap) * 0.6 + ${faceUpBefore} * var(--cascade-overlap))`;

                  const dragCardIds = isInRun ? cascade.slice(rowIdx).filter(c => c.isFaceUp).map(c => c.id) : [card.id];
                  const srcLoc = { type: 'cascade' as const, index: colIdx, cardIndex: rowIdx };

                  return (
                    <DomCard
                      key={card.id}
                      card={card as any}
                      style={{ top: 0, left: 0, transform: `translateY(${yOffset})`, cursor: isInRun ? 'grab' : 'default' }}
                      zIndex={rowIdx + 1}
                      isSelected={selectedCardIds.has(card.id)}
                      onPointerDown={isInRun || isBottomCard ? () => onCardClick(card.id, dragCardIds, srcLoc) : undefined}
                      onDoubleClick={isBottomCard ? () => onDoubleClick(card.id) : undefined}
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
