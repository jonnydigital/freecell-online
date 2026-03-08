'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Flame,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Check,
  Star,
} from 'lucide-react';
import {
  loadDailyData,
  getDailySeed,
  getTodayStr,
  getMonthDays,
  getFirstDayOfWeek,
  getCurrentStreak,
} from '@/lib/dailyChallenge';
import type { DailyChallengeData } from '@/lib/dailyChallenge';
import AdUnit from '@/components/AdUnit';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function DailyChallengeCalendar() {
  const today = getTodayStr();
  const todayDate = new Date(today + 'T12:00:00');
  const [year, setYear] = useState(todayDate.getFullYear());
  const [month, setMonth] = useState(todayDate.getMonth());
  const [data, setData] = useState<DailyChallengeData | null>(null);
  const [streak, setStreak] = useState(0);
  const [tooltip, setTooltip] = useState<string | null>(null);

  useEffect(() => {
    setData(loadDailyData());
    setStreak(getCurrentStreak());
  }, []);

  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const firstDow = useMemo(() => getFirstDayOfWeek(year, month), [year, month]);

  const monthStats = useMemo(() => {
    if (!data) return null;
    let completed = 0;
    let bestTime = Infinity;
    let totalMoves = 0;
    let perfectDays = 0;

    for (const dateStr of days) {
      const entry = data.completedDays[dateStr];
      if (entry) {
        completed++;
        if (entry.time < bestTime) bestTime = entry.time;
        totalMoves += entry.moves;
        if (entry.moves <= 52) perfectDays++;
      }
    }

    const pastDays = days.filter((d) => d <= today).length;
    const rate = pastDays > 0 ? Math.round((completed / pastDays) * 100) : 0;

    return {
      completed,
      pastDays,
      rate,
      bestTime: bestTime === Infinity ? null : bestTime,
      avgMoves: completed > 0 ? Math.round(totalMoves / completed) : null,
      perfectDays,
    };
  }, [data, days, today]);

  function prevMonth() {
    if (month === 0) { setYear(year - 1); setMonth(11); }
    else setMonth(month - 1);
  }

  function nextMonth() {
    const todayY = todayDate.getFullYear();
    const todayM = todayDate.getMonth();
    if (year > todayY || (year === todayY && month >= todayM)) return;
    if (month === 11) { setYear(year + 1); setMonth(0); }
    else setMonth(month + 1);
  }

  const isCurrentMonth = year === todayDate.getFullYear() && month === todayDate.getMonth();
  const canGoNext = !isCurrentMonth;

  function handleDayClick(dateStr: string) {
    if (dateStr > today) return;
    const seed = getDailySeed(dateStr);
    window.location.href = '/?game=' + seed;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pb-20">
      {/* Streak Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 mb-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Current
              </span>
            </div>
            <motion.div
              key={streak}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="text-4xl font-bold text-[#D4AF37]"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {streak}
            </motion.div>
            <div className="text-xs text-white/40 mt-0.5">day streak</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Trophy className="w-4 h-4 text-[#D4AF37]/60" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Longest
              </span>
            </div>
            <div
              className="text-3xl font-bold text-white/80"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {data.longestStreak}
            </div>
            <div className="text-xs text-white/40 mt-0.5">days</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Calendar className="w-4 h-4 text-[#D4AF37]/60" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                Completed
              </span>
            </div>
            <div
              className="text-3xl font-bold text-white/80"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {Object.keys(data.completedDays).length}
            </div>
            <div className="text-xs text-white/40 mt-0.5">total days</div>
          </div>

          <div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Star className="w-4 h-4 text-[#D4AF37]/60" />
              <span className="text-xs font-semibold uppercase tracking-wider text-white/40">
                This Month
              </span>
            </div>
            <div
              className="text-3xl font-bold text-white/80"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              {monthStats?.rate ?? 0}%
            </div>
            <div className="text-xs text-white/40 mt-0.5">
              {monthStats ? `${monthStats.completed} of ${monthStats.pastDays} days` : '–'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ad between streak and calendar */}
      <AdUnit className="mb-6" />

      {/* Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 mb-6"
      >
        {/* Month navigation */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-white/[0.06] transition-colors text-white/60 hover:text-white"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2
            className="text-xl sm:text-2xl font-semibold text-white"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {MONTH_NAMES[month]} {year}
          </h2>
          <button
            onClick={nextMonth}
            disabled={!canGoNext}
            className={`p-2 rounded-lg transition-colors ${
              canGoNext
                ? 'hover:bg-white/[0.06] text-white/60 hover:text-white'
                : 'text-white/10 cursor-not-allowed'
            }`}
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((d, i) => (
            <div
              key={i}
              className="text-center text-xs font-semibold uppercase tracking-wider text-white/30 py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1 relative">
          {/* Empty cells before first day */}
          {Array.from({ length: firstDow }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}

          {days.map((dateStr, i) => {
            const entry = data.completedDays[dateStr];
            const isToday = dateStr === today;
            const isFuture = dateStr > today;
            const isPast = dateStr < today;
            const dayNum = i + 1;

            let cellClass =
              'aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all duration-200 text-sm cursor-default select-none';

            if (entry) {
              cellClass +=
                ' bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] cursor-pointer hover:bg-[#D4AF37]/30';
            } else if (isToday) {
              cellClass +=
                ' border-2 border-white/60 text-white animate-pulse cursor-pointer hover:bg-white/[0.06]';
            } else if (isFuture) {
              cellClass += ' text-white/15';
            } else if (isPast) {
              cellClass +=
                ' text-white/30 hover:bg-white/[0.04] cursor-pointer';
            }

            return (
              <motion.div
                key={dateStr}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.01 }}
                className={cellClass}
                onClick={() => !isFuture && handleDayClick(dateStr)}
                onMouseEnter={() =>
                  entry &&
                  setTooltip(
                    `${dateStr}: ${formatTime(entry.time)} / ${entry.moves} moves`
                  )
                }
                onMouseLeave={() => setTooltip(null)}
                title={
                  entry
                    ? `${formatTime(entry.time)} — ${entry.moves} moves`
                    : isToday
                      ? "Today's challenge"
                      : isFuture
                        ? 'Coming soon'
                        : 'Missed — click to play'
                }
              >
                <span className="font-medium">{dayNum}</span>
                {entry && (
                  <Check className="w-3 h-3 absolute top-1 right-1 text-[#D4AF37]" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Tooltip */}
        {tooltip && (
          <div className="mt-3 text-center text-sm text-white/60 bg-white/[0.04] rounded-lg py-2 px-3">
            {tooltip}
          </div>
        )}

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#D4AF37]/20 border border-[#D4AF37]/40" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded border-2 border-white/60" />
            <span>Today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-white/[0.03]" />
            <span>Missed</span>
          </div>
        </div>
      </motion.div>

      {/* Monthly Stats */}
      {monthStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 sm:p-8 mb-6"
        >
          <h3
            className="text-lg font-semibold text-white mb-4"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {MONTH_NAMES[month]} Stats
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white/80">
                {monthStats.bestTime !== null ? formatTime(monthStats.bestTime) : '–'}
              </div>
              <div className="text-xs text-white/40 mt-1">Best Time</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white/80">
                {monthStats.avgMoves ?? '–'}
              </div>
              <div className="text-xs text-white/40 mt-1">Avg Moves</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#D4AF37]">
                {monthStats.perfectDays}
              </div>
              <div className="text-xs text-white/40 mt-1">
                <Star className="w-3 h-3 inline -mt-0.5 mr-0.5" />
                Perfect
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Ad below monthly stats */}
      <AdUnit />
    </div>
  );
}
