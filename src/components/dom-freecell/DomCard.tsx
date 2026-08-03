'use client';

import React from 'react';
import { type Suit, type Rank, type Color, RANK_NAMES, SUIT_SYMBOLS } from '@/engine/Card';
import './dom-card-styles.css';

const SUIT_NAMES: Record<Suit, string> = {
  S: 'spades',
  H: 'hearts',
  D: 'diamonds',
  C: 'clubs',
};

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
  const isInteractive = Boolean(onPointerDown || onDoubleClick);
  const cardLabel = `${rankLabel} of ${SUIT_NAMES[card.suit]}`;

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    if (onPointerDown) {
      onPointerDown(event as unknown as React.PointerEvent);
      return;
    }

    onDoubleClick?.(event as unknown as React.MouseEvent);
  };

  return (
    <div
      className={className}
      style={mergedStyle}
      onPointerDown={onPointerDown}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? cardLabel : undefined}
      aria-pressed={isInteractive ? isSelected : undefined}
      data-card-id={card.id}
    >
      <div className="dom-card__inner">
        {/* Top-left corner */}
        <div className="dom-card__corner dom-card__corner--tl">
          <span className="dom-card__rank">{rankLabel}</span>
          <span className="dom-card__suit-small">{suitSymbol}</span>
        </div>

        {/* Center suit */}
        <span className="dom-card__center-suit">{suitSymbol}</span>

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
