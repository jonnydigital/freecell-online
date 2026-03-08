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
  | 'replayMoveExecuted';

export type BridgeEvent = UIToGameEvent | GameToUIEvent;

class GameBridge {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  /** Set before Phaser init to start with a specific game number */
  initialGameNumber: number | null = null;
  /** Game variant: 'freecell' (default), 'bakers-game'/'eight-off' (same-suit stacking), or 'spider' */
  variant: 'freecell' | 'bakers-game' | 'eight-off' | 'spider' = 'freecell';
  /** Spider difficulty level */
  spiderDifficulty: '1-suit' | '2-suit' | '4-suit' = '1-suit';

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
