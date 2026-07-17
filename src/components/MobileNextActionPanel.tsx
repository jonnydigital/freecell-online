'use client';

import React from 'react';
import { HelpCircle, Lightbulb, RotateCcw, Shuffle } from 'lucide-react';
import Link from '@/components/NetworkLink';

interface MobileNextActionPanelProps {
  title: string;
  body: string;
  onHint?: () => void;
  onUndo?: () => void;
  onNewGame?: () => void;
  canUndo?: boolean;
  learnHref?: string;
  learnLabel?: string;
  className?: string;
  compact?: boolean;
}

export default function MobileNextActionPanel({
  title,
  body,
  onHint,
  onUndo,
  onNewGame,
  canUndo = true,
  learnHref,
  learnLabel = 'Rules',
  className = '',
  compact = false,
}: MobileNextActionPanelProps) {
  const actionCount = [onHint, onUndo, learnHref || onNewGame].filter(Boolean).length;
  const buttonBase: React.CSSProperties = {
    minWidth: 0,
    minHeight: '42px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '8px 10px',
    fontSize: '11px',
    fontWeight: 800,
    textDecoration: 'none',
    cursor: 'pointer',
  };

  return (
    <div
      data-mobile-next-action
      className={`flex sm:hidden ${className}`}
      style={{
        flexDirection: 'column',
        gap: compact ? '8px' : '10px',
        width: 'min(100%, 420px)',
        margin: compact ? '0 auto' : '10px auto 0',
        padding: compact ? '10px' : '12px',
        borderRadius: '8px',
        background: 'rgba(5, 20, 9, 0.76)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.24)',
        backdropFilter: 'blur(10px)',
        color: 'rgba(255,255,255,0.82)',
      }}
    >
      <div>
        <div style={{ fontSize: '12px', fontWeight: 900, color: '#D4AF37' }}>{title}</div>
        <div style={{ marginTop: '2px', fontSize: '11px', lineHeight: 1.35, color: 'rgba(255,255,255,0.58)' }}>
          {body}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.max(1, actionCount)}, minmax(0, 1fr))`,
          gap: '8px',
        }}
      >
        {onHint && (
          <button
            type="button"
            onClick={onHint}
            style={{
              ...buttonBase,
              background: 'rgba(212,175,55,0.16)',
              border: '1px solid rgba(212,175,55,0.32)',
              color: '#D4AF37',
            }}
          >
            <Lightbulb size={16} />
            Hint
          </button>
        )}
        {onUndo && (
          <button
            type="button"
            onClick={onUndo}
            disabled={!canUndo}
            style={{
              ...buttonBase,
              background: canUndo ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.025)',
              border: `1px solid ${canUndo ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.05)'}`,
              color: canUndo ? 'rgba(255,255,255,0.74)' : 'rgba(255,255,255,0.26)',
              cursor: canUndo ? 'pointer' : 'default',
            }}
          >
            <RotateCcw size={16} />
            Undo
          </button>
        )}
        {learnHref ? (
          <Link
            href={learnHref}
            style={{
              ...buttonBase,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.09)',
              color: 'rgba(255,255,255,0.74)',
            }}
          >
            <HelpCircle size={16} />
            {learnLabel}
          </Link>
        ) : (
          onNewGame && (
            <button
              type="button"
              onClick={onNewGame}
              style={{
                ...buttonBase,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.09)',
                color: 'rgba(255,255,255,0.74)',
              }}
            >
              <Shuffle size={16} />
              New
            </button>
          )
        )}
      </div>
    </div>
  );
}
