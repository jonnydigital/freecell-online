/**
 * LocalStorage persistence for stats, settings, and game state
 */

import { GameStats, createEmptyStats } from './stats';

const STATS_KEY = 'freecell_stats';
const SETTINGS_KEY = 'freecell_settings';
const GAME_STATE_KEY = 'freecell_game_state';
const STARS_KEY = 'freecell_stars';

export interface GameSettings {
  soundEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  autoMove: boolean;
  autoHint: boolean;
  autoFinish: boolean;
  viewMode: 'normal' | 'wide' | 'compact';
}

export interface SavedGameState {
  gameNumber: number;
  cascades: string[][];     // card IDs
  freeCells: (string | null)[];
  foundations: Record<string, string[]>;
  moveCount: number;
  elapsedSeconds: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  animationSpeed: 'normal',
  autoMove: true,
  autoHint: true,
  autoFinish: true,
  viewMode: 'normal',
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

// Stats
export function loadStats(): GameStats {
  if (!isBrowser()) return createEmptyStats();
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : createEmptyStats();
  } catch {
    return createEmptyStats();
  }
}

export function saveStats(stats: GameStats): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Storage full or blocked
  }
}

// Settings
export function loadSettings(): GameSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // Storage full or blocked
  }
}

// Game state (for resume on reload)
export function loadGameState(): SavedGameState | null {
  if (!isBrowser()) return null;
  try {
    const data = localStorage.getItem(GAME_STATE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveGameState(state: SavedGameState): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked
  }
}

export function clearGameState(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(GAME_STATE_KEY);
  } catch {
    // Ignore
  }
}

// Star ratings per game number
type StarMap = Record<string, number>;

export function loadStarRating(gameNumber: number): number {
  if (!isBrowser()) return 0;
  try {
    const data = localStorage.getItem(STARS_KEY);
    const map: StarMap = data ? JSON.parse(data) : {};
    return map[String(gameNumber)] ?? 0;
  } catch {
    return 0;
  }
}

/** Load all star ratings as a map of gameNumber → stars */
export function loadAllStarRatings(): Record<string, number> {
  if (!isBrowser()) return {};
  try {
    const data = localStorage.getItem(STARS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/** Save star rating if it's better than existing. Returns true if it was a new best. */
export function saveStarRating(gameNumber: number, stars: number): boolean {
  if (!isBrowser()) return false;
  try {
    const data = localStorage.getItem(STARS_KEY);
    const map: StarMap = data ? JSON.parse(data) : {};
    const key = String(gameNumber);
    const prev = map[key] ?? 0;
    if (stars > prev) {
      map[key] = stars;
      localStorage.setItem(STARS_KEY, JSON.stringify(map));
      return prev > 0; // only "new best" if they had a previous rating
    }
    return false;
  } catch {
    return false;
  }
}
