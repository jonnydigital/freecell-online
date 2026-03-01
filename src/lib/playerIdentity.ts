/**
 * Player Identity System
 *
 * Anonymous UUID + optional nickname, persisted in localStorage.
 * Used to identify players on the leaderboard without requiring accounts.
 */

const PLAYER_KEY = 'freecell_player';

export interface PlayerIdentity {
  id: string;       // UUID v4
  nickname: string;  // display name (default: "Anonymous")
}

function generateUUID(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function getPlayerIdentity(): PlayerIdentity {
  if (!isBrowser()) return { id: '', nickname: 'Anonymous' };

  try {
    const raw = localStorage.getItem(PLAYER_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as PlayerIdentity;
      if (parsed.id && parsed.nickname) return parsed;
    }
  } catch {
    // Corrupt data, recreate
  }

  const identity: PlayerIdentity = {
    id: generateUUID(),
    nickname: 'Anonymous',
  };
  try {
    localStorage.setItem(PLAYER_KEY, JSON.stringify(identity));
  } catch {
    // Storage blocked
  }
  return identity;
}

export function setPlayerNickname(nickname: string): PlayerIdentity {
  const identity = getPlayerIdentity();
  const clean = nickname.trim().slice(0, 20).replace(/[^a-zA-Z0-9 _-]/g, '') || 'Anonymous';
  identity.nickname = clean;
  if (isBrowser()) {
    try {
      localStorage.setItem(PLAYER_KEY, JSON.stringify(identity));
    } catch {
      // Storage blocked
    }
  }
  return identity;
}

export function getPlayerId(): string {
  return getPlayerIdentity().id;
}

export function getPlayerNickname(): string {
  return getPlayerIdentity().nickname;
}
