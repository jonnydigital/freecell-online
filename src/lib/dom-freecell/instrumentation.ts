/**
 * Lightweight performance instrumentation for DOM FreeCell prototype.
 *
 * All timing is based on performance.now(). No external dependencies.
 * Designed to be wired into useDrag.ts and the Zustand store with
 * minimal overhead — a few performance.now() calls per interaction.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PerformanceReport {
  /** Milliseconds from pointerdown to first visual card lift. */
  dragStartLatencyMs: number[];
  /** Milliseconds from pointerup to move completion (state + visual). */
  dropCommitLatencyMs: number[];
  /** Average frame interval (ms) across all drag frames this session. */
  avgFrameTime: number;
  /** Worst single frame interval (ms) recorded during any drag. */
  maxFrameTime: number;
  /** Frames where interval exceeded 20ms (missed 60fps target). */
  droppedFrames: number;
  /** Total frames recorded during all drags this session. */
  totalDragFrames: number;
  /** Milliseconds taken by each tryMove() execution. */
  moveExecutionMs: number[];
}

// ---------------------------------------------------------------------------
// Internal state
// ---------------------------------------------------------------------------

/** Open measures keyed by name. */
const _open = new Map<string, number>();

/** Completed measure durations keyed by name (appended). */
const _completed = new Map<string, number[]>();

/** Frame timestamps recorded during drag. */
let _frameTimestamps: number[] = [];

/** Cumulative session counters. */
let _totalDragFrames = 0;
let _droppedFrames = 0;
let _maxFrameTime = 0;
let _frameTimeSum = 0;
let _frameTimeCount = 0;

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export const perfMetrics = {
  /**
   * Begin a named timing measure. Call endMeasure(name) to complete it.
   * Nested/overlapping measures with different names are fine.
   */
  startMeasure(name: string): void {
    _open.set(name, performance.now());
  },

  /**
   * End a named measure and return elapsed milliseconds.
   * Returns -1 if no matching startMeasure was found.
   */
  endMeasure(name: string): number {
    const start = _open.get(name);
    if (start === undefined) return -1;
    _open.delete(name);

    const elapsed = performance.now() - start;

    if (!_completed.has(name)) {
      _completed.set(name, []);
    }
    _completed.get(name)!.push(elapsed);

    return elapsed;
  },

  /**
   * Record a frame timestamp during drag. Call once per rAF tick while
   * dragging. Pass the timestamp provided by requestAnimationFrame or
   * use performance.now().
   */
  recordFrame(timestamp: number): void {
    _frameTimestamps.push(timestamp);
    _totalDragFrames++;

    if (_frameTimestamps.length >= 2) {
      const delta =
        _frameTimestamps[_frameTimestamps.length - 1] -
        _frameTimestamps[_frameTimestamps.length - 2];

      _frameTimeSum += delta;
      _frameTimeCount++;

      if (delta > _maxFrameTime) {
        _maxFrameTime = delta;
      }
      if (delta > 20) {
        _droppedFrames++;
      }
    }
  },

  /**
   * Signal that a drag has ended. Resets per-drag frame buffer but keeps
   * cumulative session stats.
   */
  endDrag(): void {
    _frameTimestamps = [];
  },

  /**
   * Build a full performance report from all data collected this session.
   */
  getReport(): PerformanceReport {
    return {
      dragStartLatencyMs: _completed.get('dragStart') ?? [],
      dropCommitLatencyMs: _completed.get('dropCommit') ?? [],
      avgFrameTime: _frameTimeCount > 0 ? _frameTimeSum / _frameTimeCount : 0,
      maxFrameTime: _maxFrameTime,
      droppedFrames: _droppedFrames,
      totalDragFrames: _totalDragFrames,
      moveExecutionMs: _completed.get('moveExecution') ?? [],
    };
  },

  /**
   * Reset all collected data. Call when starting a fresh evaluation session.
   */
  reset(): void {
    _open.clear();
    _completed.clear();
    _frameTimestamps = [];
    _totalDragFrames = 0;
    _droppedFrames = 0;
    _maxFrameTime = 0;
    _frameTimeSum = 0;
    _frameTimeCount = 0;
  },
};
