'use client';

import React from 'react';
import './dom-card-styles.css';

export type PileType = 'cascade' | 'freecell' | 'foundation';

export interface DomPileProps {
  type: PileType;
  children?: React.ReactNode;
  isHighlighted?: boolean;
  isHintTarget?: boolean;
  /** Label shown in empty slot (e.g. suit symbol for foundation) */
  label?: string;
  /** Accessible label for interactive empty piles/drop targets */
  ariaLabel?: string;
  style?: React.CSSProperties;
  /** Click handler for empty pile (used by click-to-move) */
  onClick?: (e: React.MouseEvent) => void;
}

const DomPile: React.FC<DomPileProps> = ({
  type,
  children,
  isHighlighted = false,
  isHintTarget = false,
  label,
  ariaLabel,
  style,
  onClick,
}) => {
  const hasChildren = React.Children.count(children) > 0;
  const isInteractive = Boolean(onClick);

  const className = [
    'dom-pile',
    `dom-pile--${type}`,
    isInteractive && 'dom-pile--interactive',
    isHighlighted && 'dom-pile--highlighted',
    isHintTarget && 'dom-pile--hint-target',
  ]
    .filter(Boolean)
    .join(' ');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onClick(event as unknown as React.MouseEvent);
  };

  return (
    <div
      className={className}
      style={style}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? ariaLabel ?? label ?? 'Move selected card to pile' : undefined}
    >
      {/* Show empty slot outline for freecell/foundation when no cards */}
      {(type === 'freecell' || type === 'foundation') && !hasChildren && (
        <div className="dom-pile__slot">
          {label && <span className="dom-pile__slot-label">{label}</span>}
        </div>
      )}

      {/* For cascade with no cards, still show the slot outline as a drop target */}
      {type === 'cascade' && !hasChildren && (
        <div className="dom-pile__slot" />
      )}

      {children}
    </div>
  );
};

export default React.memo(DomPile);
