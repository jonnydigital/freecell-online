'use client';

import React from 'react';
import { type Suit, type Rank, type Color, RANK_NAMES, SUIT_SYMBOLS } from '@/engine/Card';
import './dom-card-styles.css';

export interface DomCardData {
  id: string;
  suit: Suit;
  rank: Rank;
  color: Color;
}

export interface DomCardProps {
  card: DomCardData;
  style?: React.CSSProperties;
  isDragging?: boolean;
  isDealing?: boolean;
  isHintSource?: boolean;
  isSelected?: boolean;
  dealIndex?: number;
  onPointerDown?: (e: React.PointerEvent) => void;
  onDoubleClick?: (e: React.MouseEvent) => void;
  zIndex?: number;
}

/**
 * Pip layouts for number cards (2–10), expressed as [x%, y%] positions
 * within the card's central pip area. Pips in the lower half (y > 52)
 * are rotated 180° to mirror a real playing card.
 */
const PIP_LAYOUTS: Record<number, ReadonlyArray<readonly [number, number]>> = {
  2: [[50, 12], [50, 88]],
  3: [[50, 12], [50, 50], [50, 88]],
  4: [[25, 15], [75, 15], [25, 85], [75, 85]],
  5: [[25, 15], [75, 15], [50, 50], [25, 85], [75, 85]],
  6: [[25, 12], [75, 12], [25, 50], [75, 50], [25, 88], [75, 88]],
  7: [[25, 12], [75, 12], [50, 30], [25, 50], [75, 50], [25, 88], [75, 88]],
  8: [[25, 12], [75, 12], [50, 30], [25, 50], [75, 50], [50, 70], [25, 88], [75, 88]],
  9: [[25, 10], [75, 10], [25, 37], [75, 37], [50, 50], [25, 63], [75, 63], [25, 90], [75, 90]],
  10: [[25, 10], [75, 10], [50, 24], [25, 37], [75, 37], [25, 63], [75, 63], [50, 76], [25, 90], [75, 90]],
};

const DomCard: React.FC<DomCardProps> = ({
  card,
  style,
  isDragging = false,
  isDealing = false,
  isHintSource = false,
  isSelected = false,
  dealIndex = 0,
  onPointerDown,
  onDoubleClick,
  zIndex,
}) => {
  const rankLabel = RANK_NAMES[card.rank];
  const suitSymbol = SUIT_SYMBOLS[card.suit];
  const colorClass = card.color === 'red' ? 'dom-card--red' : 'dom-card--black';

  const className = [
    'dom-card',
    colorClass,
    isDragging && 'dom-card--dragging',
    isDealing && 'dom-card-dealing',
    isHintSource && 'dom-card--hint-source',
    isSelected && 'dom-card--selected',
    !isDragging && !isDealing && 'dom-card-settling',
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: React.CSSProperties = {
    ...style,
    zIndex: zIndex ?? style?.zIndex,
    ...(isDealing ? { '--deal-index': dealIndex } as React.CSSProperties : {}),
  };

  let body: React.ReactNode;
  if (card.rank >= 11) {
    // Court card: J / Q / K
    body = (
      <div className="dom-card__court">
        <span className="dom-card__court-wm">{suitSymbol}</span>
        <span className="dom-card__court-letter">{rankLabel}</span>
      </div>
    );
  } else if (card.rank === 1) {
    // Ace: single elegant centered pip
    body = <span className="dom-card__center-suit">{suitSymbol}</span>;
  } else {
    // Number card: proper pip layout. One uniform pip size across all ranks
    // (set via --pip-size) so every card reads as the same set.
    const layout = PIP_LAYOUTS[card.rank] ?? [];
    body = (
      <div className="dom-card__pips">
        {layout.map(([x, y], i) => (
          <span
            key={i}
            className={`dom-card__pip${y > 52 ? ' dom-card__pip--flip' : ''}`}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {suitSymbol}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      className={className}
      style={mergedStyle}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      data-card-id={card.id}
    >
      <div className="dom-card__inner">
        {/* Top-left corner */}
        <div className="dom-card__corner dom-card__corner--tl">
          <span className="dom-card__rank">{rankLabel}</span>
          <span className="dom-card__suit-small">{suitSymbol}</span>
        </div>

        {/* Card body: pips, ace pip, or court */}
        {body}

        {/* Bottom-right corner (inverted) */}
        <div className="dom-card__corner dom-card__corner--br">
          <span className="dom-card__rank">{rankLabel}</span>
          <span className="dom-card__suit-small">{suitSymbol}</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DomCard);
