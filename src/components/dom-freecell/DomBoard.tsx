'use client';

import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import { Suit, SUIT_SYMBOLS } from '@/engine/Card';
import type { Location } from '@/engine/FreeCellEngine';
import DomCard from './DomCard';
import DomPile from './DomPile';
import { useDrag } from './useDrag';
import { useSoundEffects } from './useSoundEffects';
import type { HintHighlight } from './useHint';
import { announceToScreenReader } from '@/lib/accessibility';

// ---------------------------------------------------------------------------
// Suit ordering for foundations
// ---------------------------------------------------------------------------

const FOUNDATION_SUITS: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs];

// ---------------------------------------------------------------------------
// Draggable card wrapper — calls useDrag per card/run
// ---------------------------------------------------------------------------

interface DraggableCardProps {
  card: { id: string; suit: Suit; rank: number; color: string };
  cardIds: string[];
  sourceLocation: Location;
  boardRef: React.RefObject<HTMLElement>;
  style?: React.CSSProperties;
  zIndex?: number;
  isHintSource?: boolean;
  onDoubleClick?: (e: React.MouseEvent) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = React.memo(
  ({ card, cardIds, sourceLocation, boardRef, style, zIndex, isHintSource, onDoubleClick }) => {
    const { onPointerDown, isDragging } = useDrag({
      cardIds,
      sourceLocation,
      boardRef,
    });

    return (
      <DomCard
        card={card as any}
        style={style}
        isDragging={isDragging}
        isHintSource={isHintSource}
        onPointerDown={onPointerDown}
        onDoubleClick={onDoubleClick}
        zIndex={zIndex}
      />
    );
  },
);
DraggableCard.displayName = 'DraggableCard';

// ---------------------------------------------------------------------------
// Non-draggable card (e.g. foundation top cards, buried cascade cards)
// ---------------------------------------------------------------------------

interface StaticCardProps {
  card: { id: string; suit: Suit; rank: number; color: string };
  style?: React.CSSProperties;
  zIndex?: number;
  isHintSource?: boolean;
}

const StaticCard: React.FC<StaticCardProps> = React.memo(({ card, style, zIndex, isHintSource }) => {
  return <DomCard card={card as any} style={style} zIndex={zIndex} isHintSource={isHintSource} />;
});
StaticCard.displayName = 'StaticCard';

// ---------------------------------------------------------------------------
// Foundation sparkle particles
// ---------------------------------------------------------------------------

const PARTICLE_COUNT = 10;
const SPARKLE_DURATION = 600; // ms — matches CSS animation duration

interface SparkleInstance {
  id: number;
  suit: Suit;
}

let _sparkleId = 0;

/** Generate CSS custom properties for a single particle dot */
function particleStyle(index: number): React.CSSProperties {
  const angle = (Math.PI * 2 * index) / PARTICLE_COUNT + (Math.random() - 0.5) * 0.5;
  const dist = 25 + Math.random() * 40;
  const tx = Math.cos(angle) * dist;
  const ty = Math.sin(angle) * dist;
  const size = 2 + Math.random() * 4;
  const bright = Math.random() > 0.3;
  return {
    '--dot-tx': `${tx}px`,
    '--dot-ty': `${ty}px`,
    '--dot-size': `${size}px`,
    '--dot-color': bright ? '#ffd700' : '#ffaa00',
    '--dot-delay': `${Math.random() * 40}ms`,
  } as React.CSSProperties;
}

// ---------------------------------------------------------------------------
// Board component
// ---------------------------------------------------------------------------

interface DomBoardProps {
  hint?: HintHighlight | null;
}

export default function DomBoard({ hint }: DomBoardProps) {
  useSoundEffects();
  const boardRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>;

  // Build a Set for O(1) hint-source card lookups
  const hintSourceIds = useMemo(() => {
    if (!hint) return new Set<string>();
    return new Set(hint.sourceCardIds);
  }, [hint]);

  // Check if a pile is the hint target
  const isHintTarget = useCallback(
    (type: 'cascade' | 'freecell' | 'foundation', index?: number, suit?: Suit): boolean => {
      if (!hint) return false;
      const t = hint.targetLocation;
      if (t.type !== type) return false;
      if (type === 'foundation') return t.type === 'foundation' && t.suit === suit;
      if (type === 'cascade' || type === 'freecell') return 'index' in t && t.index === index;
      return false;
    },
    [hint],
  );

  const cascades = useDomFreecellStore((s) => s.cascades);
  const freeCells = useDomFreecellStore((s) => s.freeCells);
  const foundations = useDomFreecellStore((s) => s.foundations);
  const gameNumber = useDomFreecellStore((s) => s.gameNumber);
  const getEngine = useDomFreecellStore((s) => s.getEngine);
  const autoPlace = useDomFreecellStore((s) => s.autoPlace);

  // ---------------------------------------------------------------------------
  // Foundation sparkle: detect when a foundation pile grows
  // ---------------------------------------------------------------------------
  const [sparkles, setSparkles] = useState<SparkleInstance[]>([]);
  const prevFoundationSizes = useRef<Map<Suit, number>>(new Map());

  useEffect(() => {
    const newSparkles: SparkleInstance[] = [];
    for (const suit of FOUNDATION_SUITS) {
      const currentSize = foundations.get(suit)?.length ?? 0;
      const prevSize = prevFoundationSizes.current.get(suit) ?? 0;
      if (currentSize > prevSize && prevSize >= 0) {
        // A card was added to this foundation
        newSparkles.push({ id: ++_sparkleId, suit });
      }
      prevFoundationSizes.current.set(suit, currentSize);
    }
    if (newSparkles.length > 0) {
      setSparkles((prev) => [...prev, ...newSparkles]);
      // Auto-clean after animation completes
      const ids = newSparkles.map((s) => s.id);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !ids.includes(s.id)));
      }, SPARKLE_DURATION + 100);
    }
  }, [foundations]);

  // Reset sparkle tracking on new game
  useEffect(() => {
    prevFoundationSizes.current = new Map();
    setSparkles([]);
  }, [gameNumber]);

  // Compute valid runs per cascade for drag eligibility
  const validRuns = useMemo(() => {
    const engine = getEngine();
    return cascades.map((_, i) => engine.getValidRun(i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cascades, getEngine]);

  // Double-click handler: auto-place the card
  const handleDoubleClick = useCallback(
    (cardId: string) => {
      const moved = autoPlace(cardId);
      if (moved) {
        announceToScreenReader('Card moved');
      }
    },
    [autoPlace],
  );

  return (
    <div
      className="dom-board-surface"
      ref={boardRef as React.RefObject<HTMLDivElement>}
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
      {/* Top row: free cells + foundations */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--pile-gap)',
          marginBottom: 'calc(var(--board-padding-y) + var(--pile-gap))',
        }}
      >
        {/* 4 Free cells */}
        <div style={{ display: 'flex', gap: 'var(--pile-gap)' }}>
          {freeCells.map((card, i) => (
            <div
              key={`fc-${i}`}
              data-pile-type="freecell"
              data-pile-index={i}
              style={{ position: 'relative', width: 'var(--card-width)', height: 'var(--card-height)' }}
            >
              <DomPile type="freecell" label="FC" isHintTarget={isHintTarget('freecell', i)}>
                {card && (
                  <DraggableCard
                    card={card}
                    cardIds={[card.id]}
                    sourceLocation={{ type: 'freecell', index: i }}
                    boardRef={boardRef}
                    style={{ top: 0, left: 0 }}
                    zIndex={1}
                    isHintSource={hintSourceIds.has(card.id)}
                    onDoubleClick={() => handleDoubleClick(card.id)}
                  />
                )}
              </DomPile>
            </div>
          ))}
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
                <DomPile type="foundation" label={SUIT_SYMBOLS[suit]} isHintTarget={isHintTarget('foundation', undefined, suit)}>
                  {topCard && (
                    <StaticCard
                      card={topCard}
                      style={{ top: 0, left: 0 }}
                      zIndex={1}
                    />
                  )}
                </DomPile>
                {/* Sparkle particles */}
                {sparkles
                  .filter((s) => s.suit === suit)
                  .map((s) => (
                    <div key={s.id} className="foundation-sparkle-container">
                      {Array.from({ length: PARTICLE_COUNT }, (_, i) => (
                        <div
                          key={i}
                          className="foundation-sparkle-dot"
                          style={particleStyle(i)}
                        />
                      ))}
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* 8 Cascades */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--pile-gap)',
        }}
      >
        {cascades.map((cascade, colIdx) => {
          const run = validRuns[colIdx];
          const runCardIds = run.map((c) => c.id);
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
              <DomPile type="cascade" isHintTarget={isHintTarget('cascade', colIdx)}>
                {cascade.map((card, rowIdx) => {
                  const isInRun = rowIdx >= runStartIndex && run.length > 0;
                  const isBottomCard = rowIdx === cascade.length - 1;
                  // Deal index: simulate dealing across columns (row0 col0, row0 col1, ... row1 col0, ...)
                  // Cards in the valid run are draggable (from their position down)
                  if (isInRun) {
                    // The drag group: from this card to the bottom of the cascade
                    const dragCardIds = cascade.slice(rowIdx).map((c) => c.id);
                    const sourceLocation: Location = {
                      type: 'cascade',
                      index: colIdx,
                      cardIndex: rowIdx,
                    };

                    return (
                      <DraggableCard
                        key={card.id}
                        card={card}
                        cardIds={dragCardIds}
                        sourceLocation={sourceLocation}
                        boardRef={boardRef}
                        style={{
                          top: 0,
                          left: 0,
                          transform: `translateY(calc(${rowIdx} * var(--cascade-overlap)))`,
                        }}
                        zIndex={rowIdx + 1}
                        isHintSource={hintSourceIds.has(card.id)}
                        onDoubleClick={() => handleDoubleClick(card.id)}
                      />
                    );
                  }

                  // Non-draggable cards (buried in cascade)
                  return (
                    <StaticCard
                      key={card.id}
                      card={card}
                      style={{
                        top: 0,
                        left: 0,
                        transform: `translateY(calc(${rowIdx} * var(--cascade-overlap)))`,
                      }}
                      zIndex={rowIdx + 1}
                      isHintSource={hintSourceIds.has(card.id)}
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
