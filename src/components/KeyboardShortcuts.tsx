// src/components/KeyboardShortcuts.tsx
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Undo, Redo, FilePlus, Lightbulb } from 'lucide-react';

interface KeyboardShortcutsProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { icon: <><Undo size={18} /> + Z</>, key: 'Ctrl/Cmd + Z', action: 'Undo last move' },
  { icon: <><Redo size={18} /> + Y</>, key: 'Ctrl/Cmd + Y', action: 'Redo last move' },
  { icon: <FilePlus size={18} />, key: 'N', action: 'Start a new game' },
  { icon: <Lightbulb size={18} />, key: 'H', action: 'Get a hint' },
  { icon: <span className="text-xl font-bold">?</span>, key: '?', action: 'Show this shortcuts guide' },
];

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({ isOpen, onClose }) => {
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
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            className="relative w-full max-w-md rounded-2xl border border-yellow-600/30 shadow-2xl"
            style={{
                background: 'var(--felt-color-light)',
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
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

              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-8 w-14 bg-black/30 rounded-md text-[#D4AF37] font-mono text-sm">
                            {shortcut.icon}
                        </div>
                      <span className="text-white/90 font-medium">{shortcut.action}</span>
                    </div>
                    <kbd className="px-2 py-1 text-xs font-semibold text-white/60 bg-white/10 border border-white/20 rounded">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default KeyboardShortcuts;
