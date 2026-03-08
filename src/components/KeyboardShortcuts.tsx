// src/components/KeyboardShortcuts.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const sections = [
  {
    title: 'Card Selection & Movement',
    shortcuts: [
      { keys: ['1', '–', '8'], desc: 'Select / move to cascade column' },
      { keys: ['A', 'S', 'D', 'F'], desc: 'Select / move to free cell 1–4' },
      { keys: ['Q', 'W', 'E', 'R'], desc: 'Move card to foundation 1–4' },
      { keys: ['F1', '–', 'F4'], desc: 'Move card to foundation 1–4' },
      { keys: ['Space'], desc: 'Auto-move selected card' },
      { keys: ['Enter'], desc: 'Auto-move selected card' },
      { keys: ['Esc'], desc: 'Deselect card' },
    ],
  },
  {
    title: 'Game Controls',
    shortcuts: [
      { keys: ['Z'], desc: 'Undo' },
      { keys: ['Ctrl', '+', 'Z'], desc: 'Undo' },
      { keys: ['Y'], desc: 'Redo' },
      { keys: ['Ctrl', '+', 'Y'], desc: 'Redo' },
      { keys: ['H'], desc: 'Hint' },
      { keys: ['N'], desc: 'New game' },
      { keys: ['?'], desc: 'This shortcuts guide' },
    ],
  },
];

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            className="relative w-full max-w-lg rounded-2xl border border-yellow-600/30 shadow-2xl overflow-hidden"
            style={{ background: '#072907' }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-5">
                <h2
                  id="shortcuts-title"
                  className="text-2xl font-bold text-[#D4AF37]"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors"
                  aria-label="Close shortcuts"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-5">
                {sections.map((section) => (
                  <div key={section.title}>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-1.5">
                      {section.shortcuts.map((shortcut, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/5"
                        >
                          <span className="text-sm text-white/80">{shortcut.desc}</span>
                          <div className="flex items-center gap-1">
                            {shortcut.keys.map((k, j) =>
                              k === '+' || k === '–' ? (
                                <span key={j} className="text-white/30 text-xs mx-0.5">{k}</span>
                              ) : (
                                <kbd
                                  key={j}
                                  className="px-1.5 py-0.5 text-xs font-mono font-semibold text-[#D4AF37] bg-black/30 border border-white/15 rounded"
                                >
                                  {k}
                                </kbd>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-white/20 text-center mt-5">
                Press <kbd className="px-1 py-0.5 bg-black/30 border border-white/15 rounded text-white/40 font-mono">?</kbd> anytime to show this guide
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
