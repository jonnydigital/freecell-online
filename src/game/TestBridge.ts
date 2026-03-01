/**
 * TestBridge — Exposes game state and actions for automated testing.
 * Antigravity's browser agent can call these via execute_browser_javascript.
 * Only active in development mode.
 */

import { FreeCellScene } from './FreeCellScene';
import { gameBridge } from './GameBridge';

interface TestAPI {
  getGameState: () => object;
  getCardPositions: () => object[];
  getClickableCards: () => object[];
  getCanvasBounds: () => DOMRect | null;
  newGame: (seed?: number) => void;
  undo: () => void;
  autoFinish: () => void;
  getStats: () => object;
  healthCheck: () => object;
}

declare global {
  interface Window {
    __FREECELL_TEST?: TestAPI;
  }
}

let sceneRef: FreeCellScene | null = null;

export function registerTestBridge(scene: FreeCellScene): void {
  // Only in development
  if (process.env.NODE_ENV !== 'development') return;

  sceneRef = scene;

  window.__FREECELL_TEST = {
    getGameState: () => {
      if (!sceneRef) return { error: 'No scene loaded' };
      const engine = (sceneRef as any).engine;
      if (!engine) return { error: 'No engine' };
      const state = engine.getState();
      return {
        gameNumber: state.gameNumber,
        moveCount: state.moveCount,
        isWon: state.isWon,
        cascades: state.cascades.map((col: any[]) =>
          col.map((c: any) => ({ suit: c.suit, rank: c.rank }))
        ),
        freeCells: state.freeCells.map((c: any) =>
          c ? { suit: c.suit, rank: c.rank } : null
        ),
        foundations: Object.fromEntries(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          Array.from(state.foundations.entries() as any).map((entry: any) => [
            entry[0],
            entry[1].map((c: any) => ({ suit: c.suit, rank: c.rank }))
          ])
        ),
        hasLegalMoves: engine.hasLegalMoves(),
        isAutoCompletable: engine.isAutoCompletable(),
      };
    },

    getCardPositions: () => {
      if (!sceneRef) return [];
      const sprites = (sceneRef as any).cardSprites;
      if (!sprites) return [];
      const canvas = sceneRef.game.canvas;
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width / canvas.width;
      const scaleY = rect.height / canvas.height;

      const results: object[] = [];
      if (sprites instanceof Map) {
        sprites.forEach((sprite: any, key: string) => {
          results.push({
            key,
            suit: sprite.cardData?.suit,
            rank: sprite.cardData?.rank,
            // Page coordinates (what the browser agent needs for clicking)
            pageX: rect.left + sprite.x * scaleX,
            pageY: rect.top + sprite.y * scaleY,
            // Game coordinates
            gameX: sprite.x,
            gameY: sprite.y,
            width: sprite.displayWidth * scaleX,
            height: sprite.displayHeight * scaleY,
            visible: sprite.visible,
            depth: sprite.depth,
          });
        });
      }
      return results;
    },

    getClickableCards: () => {
      if (!sceneRef) return [];
      const engine = (sceneRef as any).engine;
      if (!engine) return [];
      const state = engine.getState();
      const canvas = sceneRef.game.canvas;
      const rect = canvas.getBoundingClientRect();
      const scaleX = rect.width / canvas.width;
      const scaleY = rect.height / canvas.height;

      const clickable: object[] = [];
      const sprites = (sceneRef as any).cardSprites;
      if (!sprites) return [];

      // Bottom card of each cascade
      state.cascades.forEach((col: any[], colIdx: number) => {
        if (col.length > 0) {
          const card = col[col.length - 1];
          const spriteKey = card.id || `${card.suit}${card.rank}`;
          const sprite = sprites instanceof Map ? sprites.get(spriteKey) : null;
          if (sprite) {
            clickable.push({
              suit: card.suit,
              rank: card.rank,
              location: { type: 'cascade', index: colIdx },
              pageX: rect.left + sprite.x * scaleX,
              pageY: rect.top + sprite.y * scaleY,
              x: rect.left + sprite.x * scaleX, // for puppeteer click alias
              y: rect.top + sprite.y * scaleY,
            });
          }
        }
      });

      // Free cell cards
      state.freeCells.forEach((card: any, idx: number) => {
        if (card) {
          const spriteKey = card.id || `${card.suit}${card.rank}`;
          const sprite = sprites instanceof Map ? sprites.get(spriteKey) : null;
          if (sprite) {
            clickable.push({
              suit: card.suit,
              rank: card.rank,
              location: { type: 'freecell', index: idx },
              pageX: rect.left + sprite.x * scaleX,
              pageY: rect.top + sprite.y * scaleY,
              x: rect.left + sprite.x * scaleX, // for puppeteer click alias
              y: rect.top + sprite.y * scaleY,
            });
          }
        }
      });

      return clickable;
    },

    getCanvasBounds: () => {
      if (!sceneRef) return null;
      return sceneRef.game.canvas.getBoundingClientRect();
    },

    newGame: (seed?: number) => {
      if (seed !== undefined) {
        gameBridge.emit('newGame', seed);
      } else {
        gameBridge.emit('newGame', undefined);
      }
    },

    undo: () => {
      gameBridge.emit('undo', undefined);
    },

    autoFinish: () => {
      gameBridge.emit('autoFinish', undefined);
    },

    getStats: () => {
      try {
        const stats = localStorage.getItem('freecell-stats');
        return stats ? JSON.parse(stats) : { error: 'No stats found' };
      } catch {
        return { error: 'Failed to read stats' };
      }
    },

    healthCheck: () => ({
      sceneActive: !!sceneRef && sceneRef.scene.isActive(),
      engineLoaded: !!(sceneRef as any)?.engine,
      canvasPresent: !!document.querySelector('canvas'),
      timestamp: Date.now(),
    }),
  };

  console.log('[TestBridge] Registered window.__FREECELL_TEST');
}

export function unregisterTestBridge(): void {
  sceneRef = null;
  if (window.__FREECELL_TEST) {
    delete window.__FREECELL_TEST;
    console.log('[TestBridge] Unregistered');
  }
}
