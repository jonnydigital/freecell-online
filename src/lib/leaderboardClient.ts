/**
 * Leaderboard Client
 *
 * Handles submitting scores and fetching leaderboard data.
 * Falls back to localStorage when API is unavailable (no Vercel KV).
 */

import { getPlayerIdentity } from './playerIdentity';

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  playerId: string;
  moves: number;
  time: number;         // seconds
  gameNumber: number;
  date: string;         // YYYY-MM-DD
  timestamp: number;
}

export interface SubmitResult {
  rank: number;
  totalEntries: number;
}

const LOCAL_LEADERBOARD_KEY = 'freecell_leaderboard_local';

// ── localStorage Fallback ──

interface LocalLeaderboardData {
  entries: Record<string, LeaderboardEntry[]>; // keyed by date
}

function loadLocalData(): LocalLeaderboardData {
  if (typeof window === 'undefined') return { entries: {} };
  try {
    const raw = localStorage.getItem(LOCAL_LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : { entries: {} };
  } catch {
    return { entries: {} };
  }
}

function saveLocalData(data: LocalLeaderboardData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_LEADERBOARD_KEY, JSON.stringify(data));
  } catch {
    // Storage blocked
  }
}

function localSubmit(
  gameNumber: number,
  moves: number,
  time: number,
  date: string,
): SubmitResult {
  const player = getPlayerIdentity();
  const data = loadLocalData();
  if (!data.entries[date]) data.entries[date] = [];

  const entry: LeaderboardEntry = {
    rank: 0,
    playerName: player.nickname,
    playerId: player.id,
    moves,
    time,
    gameNumber,
    date,
    timestamp: Date.now(),
  };

  // Remove previous entry from same player on same date
  data.entries[date] = data.entries[date].filter((e) => e.playerId !== player.id);
  data.entries[date].push(entry);

  // Sort by composite score (lower = better)
  data.entries[date].sort((a, b) => {
    const scoreA = a.moves * 10000 + a.time;
    const scoreB = b.moves * 10000 + b.time;
    return scoreA - scoreB;
  });

  // Re-rank
  data.entries[date].forEach((e, i) => (e.rank = i + 1));

  // Keep only top 50
  data.entries[date] = data.entries[date].slice(0, 50);

  // Prune old dates (keep last 30 days)
  const cutoff = Date.now() - 30 * 86400000;
  for (const key of Object.keys(data.entries)) {
    const d = new Date(key + 'T00:00:00').getTime();
    if (d < cutoff) delete data.entries[key];
  }

  saveLocalData(data);

  const rank = data.entries[date].findIndex((e) => e.playerId === player.id) + 1;
  return { rank, totalEntries: data.entries[date].length };
}

/**
 * Generate realistic seed entries so the leaderboard never looks empty.
 * Uses the date as a seed so the same day always shows the same names.
 */
function generateSeedEntries(date: string): LeaderboardEntry[] {
  const names = [
    'SolitaireKing', 'CardShark42', 'FreeCellFan', 'AcePlayer',
    'DailyDealer', 'GreenFelt', 'StackMaster', 'QuietSolver',
    'LuckyDraw', 'PatienceQueen', 'Shuffler99', 'TopDeck',
  ];
  // Simple deterministic hash from date string
  let hash = 0;
  for (let i = 0; i < date.length; i++) {
    hash = ((hash << 5) - hash + date.charCodeAt(i)) | 0;
  }
  const abs = Math.abs(hash);
  const count = 5 + (abs % 4); // 5-8 entries
  const entries: LeaderboardEntry[] = [];
  for (let i = 0; i < count; i++) {
    const seed = abs + i * 7919; // vary per entry
    const nameIdx = ((seed >>> 0) % names.length);
    const moves = 55 + ((seed >>> 3) % 80);     // 55-134 moves
    const time = 90 + ((seed >>> 7) % 420);      // 1:30 - 8:30
    const gameNum = 1 + ((seed >>> 11) % 50000);
    entries.push({
      rank: i + 1,
      playerName: names[nameIdx],
      playerId: `seed_${nameIdx}_${i}`,
      moves,
      time,
      gameNumber: gameNum,
      date,
      timestamp: new Date(date + 'T12:00:00').getTime() + i * 60000,
    });
  }
  // Sort by composite score
  entries.sort((a, b) => {
    const scoreA = a.moves * 10000 + a.time;
    const scoreB = b.moves * 10000 + b.time;
    return scoreA - scoreB;
  });
  entries.forEach((e, i) => (e.rank = i + 1));
  return entries;
}

function localFetch(date: string): LeaderboardEntry[] {
  const data = loadLocalData();
  const entries = data.entries[date] || [];
  // Return seed data if no real entries exist
  if (entries.length === 0) return generateSeedEntries(date);
  return entries;
}

function localFetchAllTime(): LeaderboardEntry[] {
  const data = loadLocalData();
  const all: LeaderboardEntry[] = [];
  for (const entries of Object.values(data.entries)) {
    all.push(...entries);
  }

  // If no real data exists, generate all-time seed entries
  if (all.length === 0) {
    const allTimeNames = [
      'SolitaireKing', 'CardShark42', 'FreeCellFan', 'AcePlayer',
      'DailyDealer', 'GreenFelt', 'StackMaster', 'QuietSolver',
      'LuckyDraw', 'PatienceQueen', 'Shuffler99', 'TopDeck',
      'WildCard', 'DeckRunner', 'RoyalFlush',
    ];
    return allTimeNames.slice(0, 10).map((name, i) => ({
      rank: i + 1,
      playerName: name,
      playerId: `seed_alltime_${i}`,
      moves: 48 + i * 7,
      time: 72 + i * 35,
      gameNumber: 1000 + i * 3117,
      date: '2026-03-01',
      timestamp: Date.now() - i * 86400000,
    }));
  }

  // Sort by composite score, take top 50
  all.sort((a, b) => {
    const scoreA = a.moves * 10000 + a.time;
    const scoreB = b.moves * 10000 + b.time;
    return scoreA - scoreB;
  });
  // Dedupe by playerId (keep best)
  const seen = new Set<string>();
  const deduped: LeaderboardEntry[] = [];
  for (const e of all) {
    if (!seen.has(e.playerId)) {
      seen.add(e.playerId);
      deduped.push(e);
    }
  }
  return deduped.slice(0, 50).map((e, i) => ({ ...e, rank: i + 1 }));
}

// ── API calls ──

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export async function submitScore(
  gameNumber: number,
  moves: number,
  time: number,
): Promise<SubmitResult> {
  const player = getPlayerIdentity();
  const date = getTodayStr();

  try {
    const res = await fetch('/api/leaderboard/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameNumber,
        moves,
        time,
        playerName: player.nickname,
        playerId: player.id,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return { rank: data.rank, totalEntries: data.totalEntries };
    }

    // API returned error (503 = KV not configured, etc) — fall back to local
    return localSubmit(gameNumber, moves, time, date);
  } catch {
    // Network error — fall back to local
    return localSubmit(gameNumber, moves, time, date);
  }
}

export async function fetchDailyLeaderboard(date?: string): Promise<LeaderboardEntry[]> {
  const d = date || getTodayStr();

  try {
    const res = await fetch(`/api/leaderboard/daily?date=${d}`);
    if (res.ok) {
      const data = await res.json();
      if (data.entries && data.entries.length > 0) {
        return data.entries.map((e: LeaderboardEntry, i: number) => ({
          ...e,
          rank: i + 1,
          date: d,
          playerId: e.playerId || '',
        }));
      }
    }
  } catch {
    // Network error
  }

  // Fallback to local
  return localFetch(d);
}

export async function fetchAllTimeLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const res = await fetch('/api/leaderboard/daily?alltime=1');
    if (res.ok) {
      const data = await res.json();
      if (data.entries && data.entries.length > 0) {
        return data.entries.map((e: LeaderboardEntry, i: number) => ({
          ...e,
          rank: i + 1,
          playerId: e.playerId || '',
        }));
      }
    }
  } catch {
    // Network error
  }

  return localFetchAllTime();
}

export function formatLeaderboardTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
