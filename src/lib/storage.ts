/**
 * LocalStorage persistence for stats, settings, and game state
 */

import { GameStats, createEmptyStats } from './stats';

const STATS_KEY = 'freecell_stats';
const SETTINGS_KEY = 'freecell_settings';
const GAME_STATE_KEY = 'freecell_game_state';

export interface GameSettings {
  soundEnabled: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  autoMove: boolean;
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
