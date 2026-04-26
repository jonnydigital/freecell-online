'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { isHubSite, gameUrl } from '@/lib/siteConfig';

// ---------------------------------------------------------------------------
// Game catalog — shared across all shells
// ---------------------------------------------------------------------------

const GAME_PICKER_SOLITAIRE = [
  { label: 'FreeCell', href: gameUrl('/freecell'), icon: '\u2660' },
  { label: 'Spider Solitaire', href: gameUrl('/spider'), icon: '\u2663' },
  { label: 'Klondike', href: gameUrl('/klondike'), icon: '\u2666' },
  { label: "Baker's Game", href: gameUrl('/bakers-game'), icon: '\u2665' },
  { label: 'Eight Off', href: gameUrl('/eight-off'), icon: '\u2660' },
  { label: 'Bristol', href: '/bristol', icon: '\u2663' },
];

const GAME_PICKER_VARIANTS = [
  { label: 'Easy FreeCell', href: gameUrl('/easy-freecell'), icon: '\uD83D\uDFE2' },
  { label: '1-Cell FreeCell', href: gameUrl('/freecell/1-cell'), icon: '1' },
  { label: '2-Cell FreeCell', href: gameUrl('/freecell/2-cell'), icon: '2' },
  { label: '3-Cell FreeCell', href: gameUrl('/freecell/3-cell'), icon: '3' },
  { label: 'Storm Mode', href: gameUrl('/storm'), icon: '\u26A1' },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface GameSwitcherProps {
  /** Display name of the current game (e.g. "Spider", "FreeCell") */
  currentGame: string;
  /** Icon shown on the button (e.g. "♣", "♠") */
  currentIcon: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GameSwitcher({ currentGame, currentIcon }: GameSwitcherProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click — capture phase so card drag stopPropagation doesn't block it
  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', handler, true);
    return () => document.removeEventListener('pointerdown', handler, true);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="group transition-all active:scale-95"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          borderRadius: '10px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ fontSize: '15px' }}>{currentIcon}</span>
        <span
          style={{
            fontSize: '13px',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '0.02em',
          }}
        >
          {currentGame}
        </span>
        <ChevronDown
          size={14}
          style={{ color: 'rgba(255,255,255,0.4)' }}
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-2 z-[80] rounded-xl shadow-2xl border border-white/10 py-2 min-w-[220px]"
          style={{ background: 'linear-gradient(180deg, #0f3a0f 0%, #0a2d0a 100%)' }}
        >
          <div className="px-3 pt-1 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Solitaire Games
            </span>
          </div>
          {GAME_PICKER_SOLITAIRE.map((g) => {
            const isCurrent = g.label === currentGame;
            return (
              <Link
                key={g.label}
                href={g.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  isCurrent
                    ? 'text-[#D4AF37] font-semibold hover:bg-white/5'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-4 text-center">{g.icon}</span> {g.label}
              </Link>
            );
          })}

          <div className="my-1 mx-3 border-t border-white/[0.08]" />

          <div className="px-3 pt-1 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              FreeCell Variants
            </span>
          </div>
          {GAME_PICKER_VARIANTS.map((g) => {
            const isCurrent = g.label === currentGame;
            return (
              <Link
                key={g.label}
                href={g.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                  isCurrent
                    ? 'text-[#D4AF37] font-semibold hover:bg-white/5'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="w-4 text-center text-xs">{g.icon}</span> {g.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
