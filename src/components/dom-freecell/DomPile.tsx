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
  style?: React.CSSProperties;
}

const DomPile: React.FC<DomPileProps> = ({
  type,
  children,
  isHighlighted = false,
  isHintTarget = false,
  label,
  style,
}) => {
  const hasChildren = React.Children.count(children) > 0;

  const className = [
    'dom-pile',
    `dom-pile--${type}`,
    isHighlighted && 'dom-pile--highlighted',
    isHintTarget && 'dom-pile--hint-target',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={className} style={style}>
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
