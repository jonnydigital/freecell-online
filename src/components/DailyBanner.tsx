'use client';

import React, { useState, useEffect } from 'react';
import { X, Trophy } from 'lucide-react';
import { getTodaysSeed, isTodayCompleted, getCurrentStreak } from '../lib/dailyChallenge';

interface DailyBannerProps {
  onPlayDaily: (seed: number) => void;
}

const SESSION_KEY = 'dailyBannerDismissed';

export default function DailyBanner({ onPlayDaily }: DailyBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem(SESSION_KEY) === 'true';
      if (dismissed) return;

      if (!isTodayCompleted()) {
        requestAnimationFrame(() => {
          setIsVisible(true);
          setStreak(getCurrentStreak());
        });
      }
    } catch {
      // sessionStorage blocked
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch {}
    setIsVisible(false);
  };

  const handlePlay = () => {
    onPlayDaily(getTodaysSeed());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-lg z-20 bg-black/70 backdrop-blur-sm text-white flex items-center justify-between px-3 py-2 rounded-lg border-l-4 border-[#D4AF37] shadow-lg">
      <div className="flex items-center gap-2 min-w-0">
        <Trophy className="text-[#D4AF37] flex-shrink-0" size={18} />
        <div className="flex items-center gap-2 text-sm truncate">
          <span className="font-medium">Today&apos;s Challenge</span>
          {streak > 0 && (
            <span className="text-white/50 text-xs">🔥 {streak} day streak</span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
        <button
          onClick={handlePlay}
          className="px-3 py-1 text-xs font-bold bg-[#D4AF37] text-[#0a3d0a] rounded hover:bg-[#c9a84c] transition-colors"
        >
          Play
        </button>
        <button
          onClick={handleDismiss}
          className="text-white/40 hover:text-white p-1"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
