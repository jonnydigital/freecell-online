/**
 * PerfOverlay — live performance metrics overlay for DOM FreeCell prototype.
 *
 * Displays FPS during drag, drag start latency, drop commit latency, and
 * cumulative frame drops. Rendered as a small semi-transparent panel in the
 * top-right corner of the board.
 *
 * Visibility: only shown when ?perf=1 query param is present, or when
 * the parent passes visible={true}.
 */

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { perfMetrics, PerformanceReport } from '@/lib/dom-freecell/instrumentation';
import { useDomFreecellStore } from '@/lib/dom-freecell/useDomFreecellStore';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PerfOverlayProps {
  /** Force visibility regardless of query param. */
  visible?: boolean;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function usePerfQueryParam(): boolean {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.get('perf') === '1');
  }, []);

  return enabled;
}

function fmt(n: number): string {
  return n.toFixed(1);
}

function last(arr: number[]): number | null {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PerfOverlay: React.FC<PerfOverlayProps> = ({ visible }) => {
  const queryEnabled = usePerfQueryParam();
  const show = visible ?? queryEnabled;

  const dragState = useDomFreecellStore((s) => s.dragState);
  const [report, setReport] = useState<PerformanceReport | null>(null);
  const [liveFps, setLiveFps] = useState<number>(0);
  const rafRef = useRef<number>(0);
  const frameCountRef = useRef(0);
  const lastFpsCalcRef = useRef(0);

  // Poll the report and compute live FPS during drag via rAF
  const tick = useCallback((timestamp: number) => {
    frameCountRef.current++;

    // Recalculate FPS every 500ms
    if (timestamp - lastFpsCalcRef.current >= 500) {
      const elapsed = timestamp - lastFpsCalcRef.current;
      const fps = (frameCountRef.current / elapsed) * 1000;
      setLiveFps(fps);
      frameCountRef.current = 0;
      lastFpsCalcRef.current = timestamp;
    }

    setReport(perfMetrics.getReport());
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!show) return;

    // Start polling when overlay is visible
    lastFpsCalcRef.current = performance.now();
    frameCountRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [show, tick]);

  // Also refresh report on drag end
  useEffect(() => {
    if (!dragState && show) {
      setReport(perfMetrics.getReport());
    }
  }, [dragState, show]);

  if (!show || !report) return null;

  const lastDragStart = last(report.dragStartLatencyMs);
  const lastDropCommit = last(report.dropCommitLatencyMs);

  return (
    <div
      style={{
        position: 'fixed',
        top: 8,
        right: 8,
        zIndex: 99999,
        background: 'rgba(0, 0, 0, 0.75)',
        color: '#0f0',
        fontFamily: 'monospace',
        fontSize: 11,
        lineHeight: '16px',
        padding: '6px 10px',
        borderRadius: 6,
        pointerEvents: 'none',
        userSelect: 'none',
        minWidth: 180,
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(0, 255, 0, 0.15)',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: 2, color: '#4f4', fontSize: 10, letterSpacing: '0.05em' }}>
        PERF OVERLAY
      </div>
      <div>
        FPS:{' '}
        <span style={{ color: dragState ? '#0f0' : '#888' }}>
          {dragState ? fmt(liveFps) : '--'}
        </span>
        {dragState && <span style={{ color: '#666', fontSize: 10 }}> (dragging)</span>}
      </div>
      <div>
        Drag start:{' '}
        <span style={{ color: lastDragStart !== null && lastDragStart > 8 ? '#f80' : '#0f0' }}>
          {lastDragStart !== null ? `${fmt(lastDragStart)}ms` : '--'}
        </span>
      </div>
      <div>
        Drop commit:{' '}
        <span style={{ color: lastDropCommit !== null && lastDropCommit > 16 ? '#f80' : '#0f0' }}>
          {lastDropCommit !== null ? `${fmt(lastDropCommit)}ms` : '--'}
        </span>
      </div>
      <div>
        Avg frame: <span>{report.avgFrameTime > 0 ? `${fmt(report.avgFrameTime)}ms` : '--'}</span>
      </div>
      <div>
        Max frame:{' '}
        <span style={{ color: report.maxFrameTime > 20 ? '#f80' : '#0f0' }}>
          {report.maxFrameTime > 0 ? `${fmt(report.maxFrameTime)}ms` : '--'}
        </span>
      </div>
      <div>
        Drops:{' '}
        <span style={{ color: report.droppedFrames > 0 ? '#f80' : '#0f0' }}>
          {report.droppedFrames}
        </span>
        <span style={{ color: '#666' }}> / {report.totalDragFrames} frames</span>
      </div>
    </div>
  );
};
