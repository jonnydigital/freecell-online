/**
 * React ↔ Phaser Communication Bridge
 * 
 * All communication between React UI and Phaser game goes through this.
 * Uses EventEmitter pattern.
 */

type EventCallback = (...args: unknown[]) => void;

export type UIToGameEvent =
  | 'newGame'
  | 'undo'
  | 'redo'
  | 'hint'
  | 'restart'
  | 'settings'
  | 'updateSettings'
  | 'autoFinish'
  | 'requestElementPosition'
  | 'replayMove'
  | 'setReplayMode'
  | 'themeChanged'
  | 'cardBackChanged';

export type GameToUIEvent =
  | 'moveExecuted'
  | 'gameWon'
  | 'timerTick'
  | 'deadlock'
  | 'statsUpdate'
  | 'gameReady'
  | 'hintResult'
  | 'autoCompletable'
  | 'error'
  | 'elementPositionResponse'
  | 'replayMoveExecuted'
  | 'requestNewGame';

export type BridgeEvent = UIToGameEvent | GameToUIEvent;

class GameBridge {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  /** Set before Phaser init to start with a specific game number */
  initialGameNumber: number | null = null;
  /** Game variant: 'freecell' (default), 'bakers-game'/'eight-off' (same-suit stacking), 'easy-freecell' (pre-placed aces+2s), restricted-cell variants, 'spider', or 'klondike' */
  variant: 'freecell' | 'bakers-game' | 'eight-off' | 'easy-freecell' | 'freecell-1cell' | 'freecell-2cell' | 'freecell-3cell' | 'spider' | 'klondike' = 'freecell';
  /** Spider difficulty level */
  spiderDifficulty: '1-suit' | '2-suit' | '4-suit' = '1-suit';
  /** Klondike draw mode */
  klondikeDrawMode: 1 | 3 = 1;

  on(event: BridgeEvent, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  emit(event: BridgeEvent, ...args: unknown[]): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach((cb) => cb(...args));
    }
  }

  off(event: BridgeEvent, callback: EventCallback): void {
    this.listeners.get(event)?.delete(callback);
  }

  removeAll(): void {
    this.listeners.clear();
  }
}

// Singleton instance
export const gameBridge = new GameBridge();
