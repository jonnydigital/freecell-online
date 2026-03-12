/**
 * Per-game result history for charts and detailed statistics.
 * Each game result is timestamped so we can chart trends over time.
 */

const HISTORY_KEY = 'freecell_game_history';
const MAX_HISTORY = 500; // cap to avoid localStorage bloat

export interface GameResult {
  ts: number;       // Unix timestamp (ms)
  won: boolean;
  moves: number;    // total moves made
  time: number;     // seconds elapsed
  game?: number;    // game number (if known)
  variant?: string; // 'freecell' | 'klondike' etc.
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function loadGameHistory(): GameResult[] {
  if (!isBrowser()) return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveGameHistory(history: GameResult[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Storage full or blocked
  }
}

export function recordGameResult(
  won: boolean,
  moves: number,
  time: number,
  gameNumber?: number,
  variant?: string,
): void {
  const history = loadGameHistory();
  history.push({
    ts: Date.now(),
    won,
    moves,
    time,
    game: gameNumber,
    variant,
  });
  // Trim to max size (keep most recent)
  if (history.length > MAX_HISTORY) {
    history.splice(0, history.length - MAX_HISTORY);
  }
  saveGameHistory(history);
}
