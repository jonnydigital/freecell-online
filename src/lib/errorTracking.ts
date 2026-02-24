/**
 * Error tracking abstraction
 *
 * Uses Sentry when DSN is configured and @sentry/nextjs is installed,
 * otherwise logs to console. Captures unhandled errors, promise rejections,
 * and WebGL context loss.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

let sentryLoaded = false;
let SentryModule: any = null;

/**
 * Initialize error tracking. Call once on app startup.
 */
export async function initErrorTracking(): Promise<void> {
  if (typeof window === 'undefined') return;

  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (dsn) {
    try {
      SentryModule = await import('@sentry/nextjs' as string);
      SentryModule.init({
        dsn,
        tracesSampleRate: 0.1,
        replaysSessionSampleRate: 0,
        replaysOnErrorSampleRate: 0.5,
        environment: process.env.NODE_ENV,
      });
      sentryLoaded = true;
    } catch {
      console.warn('Sentry not installed, using console error logging');
    }
  }

  // Listen for WebGL context loss on the game canvas
  waitForCanvas();

  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureError(
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      { source: 'unhandledrejection' }
    );
  });
}

function waitForCanvas(): void {
  // The canvas may not exist yet; observe the game container
  const observer = new MutationObserver(() => {
    const canvas = document.querySelector('#game-container canvas') as HTMLCanvasElement | null;
    if (canvas) {
      observer.disconnect();
      canvas.addEventListener('webglcontextlost', (e) => {
        captureError(new Error('WebGL context lost'), { source: 'webgl' });
        e.preventDefault();
      });
    }
  });
  const container = document.getElementById('game-container');
  if (container) {
    observer.observe(container, { childList: true });
  }
}

/**
 * Capture an error with optional game context
 */
export function captureError(
  error: Error,
  context?: Record<string, string | number>
): void {
  if (sentryLoaded && SentryModule) {
    SentryModule.withScope((scope: any) => {
      if (context) {
        scope.setContext('game', context);
      }
      SentryModule.captureException(error);
    });
  } else {
    console.error('[Error]', error.message, context);
  }
}

/**
 * Set game context for all future error reports
 */
export function setGameContext(gameNumber: number, moveCount: number): void {
  if (sentryLoaded && SentryModule) {
    SentryModule.setContext('game_state', {
      game_number: gameNumber,
      move_count: moveCount,
    });
  }
}
