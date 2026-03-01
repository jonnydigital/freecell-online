/**
 * LocalStorage persistence for Puzzle Storm mode
 */

const STORM_KEY = 'freecell_puzzle_storm';

export interface PuzzleStormData {
  bestScore: number;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function createEmpty(): PuzzleStormData {
  return { bestScore: 0 };
}

export function loadStormData(): PuzzleStormData {
  if (!isBrowser()) return createEmpty();
  try {
    const data = localStorage.getItem(STORM_KEY);
    return data ? JSON.parse(data) : createEmpty();
  } catch {
    return createEmpty();
  }
}

export function saveStormData(data: PuzzleStormData): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORM_KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked
  }
}

/** Update best score if current is higher. Returns true if new record. */
export function updateBestScore(current: number): boolean {
  const data = loadStormData();
  if (current > data.bestScore) {
    data.bestScore = current;
    saveStormData(data);
    return true;
  }
  return false;
}
