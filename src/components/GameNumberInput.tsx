'use client';

import { useState } from 'react';
import { isKnownUnsolvable } from '../lib/solvableDeals';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPlay: (gameNumber: number) => void;
}

export default function GameNumberInput({ isOpen, onClose, onPlay }: Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const num = parseInt(input, 10);
    if (isNaN(num) || num < 1 || num > 9999999) {
      setError('Enter a number between 1 and 9,999,999');
      return;
    }
    if (isKnownUnsolvable(num)) {
      setError(`Game #${num} is known to be unsolvable. Try another!`);
      return;
    }
    setInput('');
    setError('');
    onPlay(num);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#0d2b0d] border border-[#1a5c1a]/50 rounded-xl max-w-xs w-full p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-3">Play Specific Game</h2>
        <p className="text-sm text-white/60 mb-3">Enter a game number (1 - 9,999,999):</p>
        <input
          type="number"
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); }}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          className="w-full px-3 py-2 bg-[#1a5c1a]/30 border border-[#1a5c1a]/50 rounded text-white placeholder-white/30 mb-2 focus:outline-none focus:border-[#2a7c2a]"
          placeholder="e.g. 12345"
          min={1}
          max={9999999}
          autoFocus
        />
        {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
        <div className="flex gap-2 mt-3">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-sm bg-[#1a5c1a]/40 hover:bg-[#1a5c1a]/60 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-3 py-2 text-sm bg-[#1a5c1a] hover:bg-[#2a7c2a] rounded transition-colors font-medium"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}
