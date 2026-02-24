'use client';

import { useState, useMemo } from 'react';
import {
  loadDailyData,
  getTodayStr,
  getTodaysSeed,
  getShareText,
  getMonthDays,
  getFirstDayOfWeek,
  getCurrentStreak,
  DailyChallengeData,
} from '../lib/dailyChallenge';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onPlayDaily: (gameNumber: number) => void;
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function DailyChallengePanel({ isOpen, onClose, onPlayDaily }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [copied, setCopied] = useState(false);

  const data: DailyChallengeData = useMemo(() => loadDailyData(), [isOpen]);
  const todayStr = getTodayStr();
  const todaySeed = getTodaysSeed();
  const todayCompleted = !!data.completedDays[todayStr];
  const streak = getCurrentStreak();

  const days = useMemo(() => getMonthDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const firstDay = useMemo(() => getFirstDayOfWeek(viewYear, viewMonth), [viewYear, viewMonth]);

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleShare = async () => {
    const completion = data.completedDays[todayStr];
    if (!completion) return;

    const text = getShareText(todayStr, completion.moves, completion.time);
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-[#0d2b0d] border border-[#1a5c1a]/50 rounded-xl max-w-sm w-full p-5 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Daily Challenge</h2>
          <button onClick={onClose} className="text-white/50 hover:text-white text-xl leading-none">&times;</button>
        </div>

        {/* Today's challenge */}
        <div className="bg-[#1a5c1a]/30 rounded-lg p-3 mb-4 text-center">
          <div className="text-sm text-white/60 mb-1">Today&apos;s Challenge</div>
          <div className="text-xl font-bold mb-2">Game #{todaySeed}</div>
          {todayCompleted ? (
            <div>
              <div className="text-yellow-400 font-bold mb-2">Completed!</div>
              <div className="text-sm text-white/70 mb-2">
                {data.completedDays[todayStr].moves} moves &middot; {Math.floor(data.completedDays[todayStr].time / 60)}:{String(data.completedDays[todayStr].time % 60).padStart(2, '0')}
              </div>
              <button
                onClick={handleShare}
                className="px-4 py-1.5 bg-[#2a7c2a] hover:bg-[#3a9c3a] text-sm rounded transition-colors"
              >
                {copied ? 'Copied!' : 'Share Result'}
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onPlayDaily(todaySeed); onClose(); }}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded transition-colors"
            >
              Play Today&apos;s Challenge
            </button>
          )}
        </div>

        {/* Streaks */}
        <div className="flex gap-4 mb-4 justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold">{streak}</div>
            <div className="text-xs text-white/50">Current Streak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{data.longestStreak}</div>
            <div className="text-xs text-white/50">Longest Streak</div>
          </div>
        </div>

        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <button onClick={prevMonth} className="text-white/50 hover:text-white px-2">&lt;</button>
            <span className="text-sm font-medium">{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="text-white/50 hover:text-white px-2">&gt;</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-white/40 py-1">{d}</div>
            ))}
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {days.map((dateStr) => {
              const day = parseInt(dateStr.split('-')[2]);
              const completed = !!data.completedDays[dateStr];
              const isToday = dateStr === todayStr;
              const isFuture = dateStr > todayStr;

              return (
                <div
                  key={dateStr}
                  className={`py-1 rounded text-xs ${
                    isToday ? 'ring-1 ring-yellow-400/60' : ''
                  } ${isFuture ? 'text-white/20' : completed ? 'bg-yellow-600/30 text-yellow-400' : 'text-white/50'}`}
                >
                  {completed ? (
                    <span title="Completed">&#9819;</span>
                  ) : (
                    day
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
