/**
 * LocalStorage persistence for Puzzle Streak mode
 */

const STREAK_KEY = 'freecell_puzzle_streak';

export interface PuzzleStreakData {
  bestStreak: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function createEmpty(): PuzzleStreakData {
  return { bestStreak: 0 };
}

export function loadStreakData(): PuzzleStreakData {
  if (!isBrowser()) return createEmpty();
  try {
    const data = localStorage.getItem(STREAK_KEY);
    return data ? JSON.parse(data) : createEmpty();
  } catch {
    return createEmpty();
  }
}

export function saveStreakData(data: PuzzleStreakData): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked
  }
}

/** Update best streak if current is higher. Returns true if new record. */
export function updateBestStreak(current: number): boolean {
  const data = loadStreakData();
  if (current > data.bestStreak) {
    data.bestStreak = current;
    saveStreakData(data);
    return true;
  }
  return false;
}
