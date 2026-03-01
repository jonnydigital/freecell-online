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

function localFetch(date: string): LeaderboardEntry[] {
  const data = loadLocalData();
  return data.entries[date] || [];
}

function localFetchAllTime(): LeaderboardEntry[] {
  const data = loadLocalData();
  const all: LeaderboardEntry[] = [];
  for (const entries of Object.values(data.entries)) {
    all.push(...entries);
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
