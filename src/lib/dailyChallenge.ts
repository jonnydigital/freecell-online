/**
 * Daily Challenge System
 *
 * Generates a deterministic game number from today's date,
 * tracks completion, streaks, and sharing.
 */

const DAILY_CHALLENGE_KEY = 'freecell_daily_challenge';

export interface DailyCompletion {
  moves: number;
  time: number;
}

export interface DailyChallengeData {
  completedDays: Record<string, DailyCompletion>; // "2026-02-24" → result
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: string | null;
}

function createEmptyData(): DailyChallengeData {
  return {
    completedDays: {},
    currentStreak: 0,
    longestStreak: 0,
    lastCompletedDate: null,
  };
}

/**
 * Generate a deterministic game number from a date string.
 * Uses a simple hash to map "YYYY-MM-DD" → number in range 1-9999999
 */
export function getDailySeed(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash % 9999999) + 1;
}

/** Get today's date as YYYY-MM-DD */
export function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Get today's daily challenge game number */
export function getTodaysSeed(): number {
  return getDailySeed(getTodayStr());
}

/** Load daily challenge data from localStorage */
export function loadDailyData(): DailyChallengeData {
  if (typeof window === 'undefined') return createEmptyData();
  try {
    const raw = localStorage.getItem(DAILY_CHALLENGE_KEY);
    return raw ? { ...createEmptyData(), ...JSON.parse(raw) } : createEmptyData();
  } catch {
    return createEmptyData();
  }
}

/** Save daily challenge data */
function saveDailyData(data: DailyChallengeData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked
  }
}

/** Get the date string for yesterday relative to a given date */
function getYesterday(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** Record a daily challenge completion */
export function recordDailyCompletion(dateStr: string, moves: number, time: number): DailyChallengeData {
  const data = loadDailyData();

  // Already completed this day
  if (data.completedDays[dateStr]) return data;

  data.completedDays[dateStr] = { moves, time };

  // Calculate streak
  const yesterday = getYesterday(dateStr);
  if (data.lastCompletedDate === yesterday) {
    data.currentStreak += 1;
  } else if (data.lastCompletedDate !== dateStr) {
    data.currentStreak = 1;
  }

  data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
  data.lastCompletedDate = dateStr;

  saveDailyData(data);
  return data;
}

/** Check if today's challenge is completed */
export function isTodayCompleted(): boolean {
  const data = loadDailyData();
  return !!data.completedDays[getTodayStr()];
}

/** Get the current streak (recalculated from data) */
export function getCurrentStreak(): number {
  const data = loadDailyData();
  if (!data.lastCompletedDate) return 0;

  const today = getTodayStr();
  // Streak is valid if last completed was today or yesterday
  if (data.lastCompletedDate !== today && data.lastCompletedDate !== getYesterday(today)) {
    return 0;
  }
  return data.currentStreak;
}

/** Format time as m:ss */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

/** Generate share text for a daily challenge completion */
export function getShareText(dateStr: string, moves: number, time: number): string {
  const seed = getDailySeed(dateStr);
  return `I solved today's FreeCell Daily Challenge #${seed} in ${moves} moves / ${formatTime(time)}! 🃏\n\nhttps://playfreecellonline.com`;
}

/** Get all days in a month as date strings */
export function getMonthDays(year: number, month: number): string[] {
  const days: string[] = [];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(`${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`);
  }
  return days;
}

/** Get the day of week (0=Sun) for the first day of the month */
export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}
