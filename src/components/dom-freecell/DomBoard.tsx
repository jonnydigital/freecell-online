'use client';

import React, { useRef, useMemo, useCallback, useEffect, useState } from 'react';
import { useDomFreecellStore, domFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';
import { Suit, SUIT_SYMBOLS } from '@/engine/Card';
import type { Location } from '@/engine/FreeCellEngine';
import DomCard from './DomCard';
import DomPile from './DomPile';
import { useDrag } from './useDrag';
import { useSoundEffects } from './useSoundEffects';
import type { HintHighlight } from './useHint';
import { announceToScreenReader } from '@/lib/accessibility';
import { playCardSelectSound, playInvalidMoveSound } from './useSoundEffects';

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
  isSelected?: boolean;
  onDoubleClick?: (e: React.MouseEvent) => void;
}

const DraggableCard: React.FC<DraggableCardProps> = React.memo(
  ({ card, cardIds, sourceLocation, boardRef, style, zIndex, isHintSource, isSelected, onDoubleClick }) => {
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
        isSelected={isSelected}
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
// Cascade hit target — transparent overlay that captures pointer events
// for the exposed (visible) area of each card in a valid run.
// This solves the z-index overlap problem: without it, clicking on a
// partially-hidden upper card in a cascade actually hits the lower card's
// DOM element (which has a higher z-index), preventing multi-card drags.
// ---------------------------------------------------------------------------

interface CascadeHitTargetProps {
  cardIds: string[];
  sourceLocation: Location;
  boardRef: React.RefObject<HTMLElement>;
  rowIdx: number;
  isBottomCard: boolean;
  onDoubleClick?: () => void;
}

const CascadeHitTarget: React.FC<CascadeHitTargetProps> = React.memo(
  ({ cardIds, sourceLocation, boardRef, rowIdx, isBottomCard, onDoubleClick }) => {
    const { onPointerDown } = useDrag({ cardIds, sourceLocation, boardRef });

    return (
      <div
        onPointerDown={onPointerDown}
        onDoubleClick={onDoubleClick}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 'var(--card-width)',
          height: isBottomCard ? 'var(--card-height)' : 'var(--cascade-overlap)',
          transform: `translateY(calc(${rowIdx} * var(--cascade-overlap)))`,
          zIndex: 500 + rowIdx,
          cursor: 'grab',
        }}
      />
    );
  },
);
CascadeHitTarget.displayName = 'CascadeHitTarget';

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
  const selection = useDomFreecellStore((s) => s.selection);

  // Build a Set of selected card IDs for O(1) visual lookups
  const selectedCardIds = useMemo(() => {
    if (!selection) return new Set<string>();
    return new Set(selection.cardIds);
  }, [selection]);

  // Handle clicks on empty piles when a selection exists
  const handleEmptyPileClick = useCallback(
    (targetLoc: Location) => {
      const store = domFreecellStore.getState();
      const sel = store.selection;
      if (!sel) return;
      const moved = store.tryMove(sel.sourceLocation, targetLoc);
      if (moved) {
        store.clearSelection();
        announceToScreenReader('Card moved');
      } else {
        playInvalidMoveSound();
        store.clearSelection();
      }
    },
    [],
  );

  // Deselect when clicking the board background
  const handleBoardClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if clicking directly on the board surface (not a child)
    if (e.target === e.currentTarget) {
      domFreecellStore.getState().clearSelection();
    }
  }, []);

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
              <DomPile
                type="freecell"
                label="FC"
                isHintTarget={isHintTarget('freecell', i)}
                onClick={!card && selection ? () => handleEmptyPileClick({ type: 'freecell', index: i }) : undefined}
              >
                {card && (
                  <DraggableCard
                    card={card}
                    cardIds={[card.id]}
                    sourceLocation={{ type: 'freecell', index: i }}
                    boardRef={boardRef}
                    style={{ top: 0, left: 0 }}
                    zIndex={1}
                    isHintSource={hintSourceIds.has(card.id)}
                    isSelected={selectedCardIds.has(card.id)}
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
                <DomPile
                  type="foundation"
                  label={SUIT_SYMBOLS[suit]}
                  isHintTarget={isHintTarget('foundation', undefined, suit)}
                  onClick={selection ? () => handleEmptyPileClick({ type: 'foundation', suit }) : undefined}
                >
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
          flexWrap: 'nowrap',
          overflow: 'hidden',
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
                minWidth: 'var(--card-width)',
                flexShrink: 0,
                minHeight: 'var(--card-height)',
                height: cascadeHeight,
              }}
            >
              <DomPile
                type="cascade"
                isHintTarget={isHintTarget('cascade', colIdx)}
                onClick={cascade.length === 0 && selection ? () => handleEmptyPileClick({ type: 'cascade', index: colIdx }) : undefined}
              >
                {/* Visual cards — rendered without pointer events */}
                {cascade.map((card, rowIdx) => (
                  <DomCard
                    key={card.id}
                    card={card as any}
                    style={{
                      top: 0,
                      left: 0,
                      transform: `translateY(calc(${rowIdx} * var(--cascade-overlap)))`,
                      pointerEvents: 'none',
                      cursor: 'default',
                      transitionDelay: `${rowIdx * 15}ms`,
                    }}
                    zIndex={rowIdx + 1}
                    isHintSource={hintSourceIds.has(card.id)}
                    isSelected={selectedCardIds.has(card.id)}
                  />
                ))}
                {/* Hit targets — transparent overlays sized to each card's
                    exposed area, sitting above all visual cards in z-order.
                    This lets clicking on any visible part of a run card
                    correctly initiate a multi-card drag. */}
                {cascade.map((card, rowIdx) => {
                  const isInRun = rowIdx >= runStartIndex && run.length > 0;
                  if (!isInRun) return null;

                  const isBottomCard = rowIdx === cascade.length - 1;
                  // Always pick up the full valid run — the run moves as a unit
                  const dragCardIds = cascade.slice(runStartIndex).map((c) => c.id);
                  const srcLoc: Location = {
                    type: 'cascade',
                    index: colIdx,
                    cardIndex: runStartIndex,
                  };

                  return (
                    <CascadeHitTarget
                      key={`hit-${card.id}`}
                      cardIds={dragCardIds}
                      sourceLocation={srcLoc}
                      boardRef={boardRef}
                      rowIdx={rowIdx}
                      isBottomCard={isBottomCard}
                      onDoubleClick={() => handleDoubleClick(card.id)}
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
