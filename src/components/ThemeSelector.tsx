'use client';

import React, { useState, useRef, useEffect } from 'react';
import { themes, ThemeDefinition } from '../lib/themes';
import { useTheme } from '../lib/ThemeContext';
import { Palette, Check } from 'lucide-react';

/**
 * Toolbar palette button with dropdown for quick theme switching.
 * Shows felt color swatches with theme names and a checkmark on the active theme.
 */
const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleSelect = (t: ThemeDefinition) => {
    setTheme(t);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(v => !v)}
        className="p-2 hover:bg-white/10 text-white/80 rounded-full transition-all active:scale-95"
        title="Change theme"
        aria-label="Change theme"
      >
        <Palette size={18} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 bg-[var(--theme-panel)]/95 border border-white/10 rounded-xl shadow-2xl backdrop-blur-md z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="px-3 pt-3 pb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">Table Felt</span>
          </div>
          {themes.map((t) => {
            const isActive = t.id === theme.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                  isActive ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-md border-2 shrink-0 transition-all"
                  style={{
                    backgroundColor: t.feltColor,
                    borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                  }}
                />
                <span className={`text-sm font-medium flex-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                  {t.name}
                </span>
                {isActive && <Check size={16} className="text-[#D4AF37] shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
