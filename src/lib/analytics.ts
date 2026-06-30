/**
 * Analytics abstraction layer
 *
 * Supports GA4 via gtag. All events are typed for solitaire gameplay.
 * If no analytics script is loaded, calls are silently dropped.
 */

const CONSENT_KEY = 'cookie_consent';

type EventParams = Record<string, string | number | boolean | undefined>;

// Custom game events
export type GameEvent =
  | { name: 'game_start'; params: EventParams }
  | { name: 'game_win'; params: EventParams }
  | { name: 'game_abandoned'; params: EventParams }
  | { name: 'game_restart'; params: EventParams }
  | { name: 'hint_used'; params: EventParams }
  | { name: 'undo_used'; params: EventParams }
  | { name: 'time_to_first_move'; params: EventParams }
  | { name: 'interaction_type'; params: EventParams }
  | { name: 'game_deadlock'; params: EventParams }
  | { name: 'daily_room_view'; params: EventParams }
  | { name: 'daily_room_play_click'; params: EventParams }
  | { name: 'daily_room_rankings_click'; params: EventParams }
  | { name: 'daily_room_invite_copy'; params: EventParams };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
}

/**
 * Send a custom game event to analytics
 */
export function trackEvent(event: GameEvent): void {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  // GA4 via gtag
  if (window.gtag) {
    window.gtag('event', event.name, event.params);
    return;
  }

  // Fallback: store in dataLayer for deferred pickup
  if (window.dataLayer) {
    window.dataLayer.push({ event: event.name, ...event.params });
  }
}

/**
 * Track client-side URL changes that use history.replaceState/pushState.
 */
export function trackPageView(path?: string): void {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;

  const pagePath = path ?? `${window.location.pathname}${window.location.search}`;
  const params = {
    page_path: pagePath,
    page_location: `${window.location.origin}${pagePath}`,
    page_title: document.title,
  };

  if (window.gtag) {
    window.gtag('event', 'page_view', params);
    return;
  }

  if (window.dataLayer) {
    window.dataLayer.push({ event: 'page_view', ...params });
  }
}

/**
 * Session-level tracking state for computing aggregate metrics
 */
class GameSession {
  gameNumber: number = 0;
  gameName: string = 'freecell';
  gameVariant: string | undefined;
  moveCount: number = 0;
  hintsUsed: number = 0;
  undosUsed: number = 0;
  startTime: number = 0;
  firstMoveTracked: boolean = false;
  lastAction: string = 'none';
  interactionTypes: Set<string> = new Set();

  reset(gameNumber: number, gameName = 'freecell', gameVariant?: string): void {
    this.gameNumber = gameNumber;
    this.gameName = gameName;
    this.gameVariant = gameVariant;
    this.moveCount = 0;
    this.hintsUsed = 0;
    this.undosUsed = 0;
    this.startTime = Date.now();
    this.firstMoveTracked = false;
    this.lastAction = 'none';
    this.interactionTypes.clear();
  }

  get timePlayedSeconds(): number {
    return Math.round((Date.now() - this.startTime) / 1000);
  }

  get baseParams(): EventParams {
    return {
      game_number: this.gameNumber,
      game_name: this.gameName,
      game_variant: this.gameVariant,
    };
  }
}

export const gameSession = new GameSession();

/**
 * Track game start
 */
export function trackGameStart(gameNumber: number, gameName = 'freecell', gameVariant?: string): void {
  gameSession.reset(gameNumber, gameName, gameVariant);
  trackEvent({ name: 'game_start', params: gameSession.baseParams });
}

/**
 * Track a move (increments counter, tracks first move timing)
 */
export function trackMove(interactionType: 'drag' | 'tap'): void {
  gameSession.moveCount++;
  gameSession.lastAction = 'move';
  gameSession.interactionTypes.add(interactionType);

  if (!gameSession.firstMoveTracked) {
    gameSession.firstMoveTracked = true;
    const seconds = gameSession.timePlayedSeconds;
    trackEvent({
      name: 'time_to_first_move',
      params: { ...gameSession.baseParams, seconds },
    });
    trackEvent({
      name: 'interaction_type',
      params: { ...gameSession.baseParams, type: interactionType },
    });
  }
}

/**
 * Track hint usage
 */
export function trackHint(): void {
  gameSession.hintsUsed++;
  gameSession.lastAction = 'hint';
  trackEvent({
    name: 'hint_used',
    params: { ...gameSession.baseParams, move_count: gameSession.moveCount },
  });
}

/**
 * Track undo usage
 */
export function trackUndo(): void {
  gameSession.undosUsed++;
  gameSession.lastAction = 'undo';
  trackEvent({
    name: 'undo_used',
    params: { ...gameSession.baseParams, move_count: gameSession.moveCount },
  });
}

/**
 * Track game win
 */
export function trackWin(timeSeconds: number, moves: number): void {
  trackEvent({
    name: 'game_win',
    params: {
      ...gameSession.baseParams,
      time_seconds: timeSeconds,
      moves,
      hints_used: gameSession.hintsUsed,
      undos_used: gameSession.undosUsed,
    },
  });
}

/**
 * Track game abandoned (called when starting a new game before winning)
 */
export function trackAbandoned(): void {
  if (gameSession.moveCount === 0) return; // Don't track if they never played
  trackEvent({
    name: 'game_abandoned',
    params: {
      ...gameSession.baseParams,
      move_count: gameSession.moveCount,
      time_played: gameSession.timePlayedSeconds,
      last_action: gameSession.lastAction,
    },
  });
}

/**
 * Track game restart
 */
export function trackRestart(): void {
  trackEvent({
    name: 'game_restart',
    params: { ...gameSession.baseParams, move_count: gameSession.moveCount },
  });
}

/**
 * Track deadlock
 */
export function trackDeadlock(): void {
  trackEvent({
    name: 'game_deadlock',
    params: { ...gameSession.baseParams, move_count: gameSession.moveCount },
  });
}

export function trackDailyRoomView(seed: number, date: string): void {
  trackEvent({
    name: 'daily_room_view',
    params: { game_number: seed, daily_date: date },
  });
}

export function trackDailyRoomPlayClick(seed: number, date: string): void {
  trackEvent({
    name: 'daily_room_play_click',
    params: { game_number: seed, daily_date: date },
  });
}

export function trackDailyRoomRankingsClick(seed: number, date: string): void {
  trackEvent({
    name: 'daily_room_rankings_click',
    params: { game_number: seed, daily_date: date },
  });
}

export function trackDailyRoomInviteCopy(seed: number, date: string, success: boolean): void {
  trackEvent({
    name: 'daily_room_invite_copy',
    params: { game_number: seed, daily_date: date, success },
  });
}
