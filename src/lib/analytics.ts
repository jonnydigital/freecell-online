/**
 * Analytics abstraction layer
 *
 * Supports GA4 via gtag. All events are typed for the FreeCell game.
 * If no analytics script is loaded, calls are silently dropped.
 */

// Custom game events
export type GameEvent =
  | { name: 'game_start'; params: { game_number: number } }
  | { name: 'game_win'; params: { time_seconds: number; moves: number; hints_used: number; undos_used: number } }
  | { name: 'game_abandoned'; params: { move_count: number; time_played: number; last_action: string } }
  | { name: 'game_restart'; params: { move_count: number } }
  | { name: 'hint_used'; params: { move_count: number; game_number: number } }
  | { name: 'undo_used'; params: { move_count: number; game_number: number } }
  | { name: 'time_to_first_move'; params: { seconds: number } }
  | { name: 'interaction_type'; params: { type: 'drag' | 'tap' } }
  | { name: 'game_deadlock'; params: { move_count: number; game_number: number } };

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Send a custom game event to analytics
 */
export function trackEvent(event: GameEvent): void {
  if (typeof window === 'undefined') return;

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
 * Session-level tracking state for computing aggregate metrics
 */
class GameSession {
  gameNumber: number = 0;
  moveCount: number = 0;
  hintsUsed: number = 0;
  undosUsed: number = 0;
  startTime: number = 0;
  firstMoveTracked: boolean = false;
  lastAction: string = 'none';
  interactionTypes: Set<string> = new Set();

  reset(gameNumber: number): void {
    this.gameNumber = gameNumber;
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
}

export const gameSession = new GameSession();

/**
 * Track game start
 */
export function trackGameStart(gameNumber: number): void {
  gameSession.reset(gameNumber);
  trackEvent({ name: 'game_start', params: { game_number: gameNumber } });
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
    trackEvent({ name: 'time_to_first_move', params: { seconds } });
    trackEvent({ name: 'interaction_type', params: { type: interactionType } });
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
    params: { move_count: gameSession.moveCount, game_number: gameSession.gameNumber },
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
    params: { move_count: gameSession.moveCount, game_number: gameSession.gameNumber },
  });
}

/**
 * Track game win
 */
export function trackWin(timeSeconds: number, moves: number): void {
  trackEvent({
    name: 'game_win',
    params: {
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
  trackEvent({ name: 'game_restart', params: { move_count: gameSession.moveCount } });
}

/**
 * Track deadlock
 */
export function trackDeadlock(): void {
  trackEvent({
    name: 'game_deadlock',
    params: { move_count: gameSession.moveCount, game_number: gameSession.gameNumber },
  });
}
