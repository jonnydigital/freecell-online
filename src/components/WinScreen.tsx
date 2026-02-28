'use client';

import { useEffect, useState } from 'react';
import { Shuffle, Calendar, Trophy, Share2 } from 'lucide-react';

interface WinScreenProps {
  gameNumber: number;
  time: number;
  moves: number;
  hintsUsed: number;
  onPlayAgain: () => void;
  onDailyChallenge: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function WinScreen({ gameNumber, time, moves, hintsUsed, onPlayAgain, onDailyChallenge }: WinScreenProps) {
  const [visible, setVisible] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500); // Faster appearance
    return () => clearTimeout(timer);
  }, []);

  const handleShare = async () => {
    const shareText = `I solved FreeCell Game #${gameNumber} in ${moves} moves (${formatTime(time)})! 🃏\nCan you beat it? https://playfreecellonline.com/game/${gameNumber}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FreeCell Online',
          text: shareText,
        });
        return;
      } catch {
        // Fallback to clipboard if share cancelled/fails
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      // Silent fail
    }
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center animate-in fade-in duration-500">
      <div className="bg-[#0d2f0d]/95 border border-[#2a7c2a]/60 rounded-2xl shadow-2xl p-8 max-w-sm w-[90%] text-center backdrop-blur-sm">
        <Trophy size={48} className="mx-auto text-yellow-400 mb-3" />
        <h2 className="text-2xl font-bold text-yellow-400 mb-1">You Win!</h2>
        <p className="text-white/50 text-sm mb-6">Congratulations!</p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <div className="text-2xl font-bold text-white">{formatTime(time)}</div>
            <div className="text-xs text-white/50 mt-1">Time</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{moves}</div>
            <div className="text-xs text-white/50 mt-1">Moves</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{hintsUsed}</div>
            <div className="text-xs text-white/50 mt-1">Hints</div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#1a5c1a] hover:bg-[#2a7c2a] text-white font-semibold rounded-lg transition-colors"
          >
            <Shuffle size={18} />
            Play Again
          </button>
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#D4AF37] hover:bg-[#c9a84c] text-black font-bold rounded-lg transition-colors"
          >
            <Share2 size={18} />
            {shareStatus === 'copied' ? 'Copied!' : 'Share Results'}
          </button>
          <button
            onClick={onDailyChallenge}
            className="flex items-center justify-center gap-2 w-full py-3 bg-yellow-700/80 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors"
          >
            <Calendar size={18} />
            Daily Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
