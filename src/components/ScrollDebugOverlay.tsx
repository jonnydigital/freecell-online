'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type WheelSnapshot = {
  phase: 'capture' | 'bubble';
  target: string;
  scrollParent: string;
  deltaX: number;
  deltaY: number;
  defaultPrevented: boolean;
  time: string;
};

type ScrollSnapshot = {
  target: string;
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
  time: string;
};

type RoleBox = {
  role: string;
  label: string;
  top: number;
  left: number;
  width: number;
  height: number;
  color: string;
};

type OverlayState = {
  boxes: RoleBox[];
  hovered: string;
  hoveredScrollParent: string;
  pointerCapture: string;
  docScrollTop: number;
  docScrollHeight: number;
  docClientHeight: number;
  boardScrollParent: string;
  sidebarScrollTop: number | null;
  sidebarScrollHeight: number | null;
  sidebarClientHeight: number | null;
  lastWheelCapture: WheelSnapshot | null;
  lastWheelBubble: WheelSnapshot | null;
  lastScroll: ScrollSnapshot | null;
};

const ROLE_LABELS: Record<string, string> = {
  'game-page-root': 'Page Root',
  'game-sticky-shell': 'Sticky Shell',
  'game-shell-inner': 'Shell Inner',
  'game-board-region': 'Board Region',
  'sidebar-scroll': 'Sidebar Scroll',
  'freecell-below-fold': 'Below Fold',
  'hub-game-viewport': 'Hub Game Viewport',
  'hub-below-fold-content': 'Hub Below Fold',
};

const BOX_COLORS = ['#f5df97', '#7dd3fc', '#86efac', '#fca5a5', '#c4b5fd', '#f9a8d4', '#fdba74'];

function normalizeTarget(target: EventTarget | Element | null): Element | null {
  return target instanceof Element ? target : null;
}

function describeElement(target: EventTarget | Element | null): string {
  const element = normalizeTarget(target);
  if (!element) return 'none';

  const role = element.getAttribute('data-scroll-role');
  const rolePrefix = role ? `[${role}]` : element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const className =
    typeof element.className === 'string'
      ? element.className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2)
          .map((token) => `.${token}`)
          .join('')
      : '';

  return `${rolePrefix}${id}${className}`;
}

function isScrollable(element: HTMLElement): boolean {
  const style = window.getComputedStyle(element);
  const overflowY = style.overflowY;
  return /(auto|scroll|overlay)/.test(overflowY) && element.scrollHeight > element.clientHeight + 1;
}

function getNearestScrollParent(target: EventTarget | Element | null): HTMLElement | null {
  let current = normalizeTarget(target);
  while (current) {
    if (current instanceof HTMLElement && isScrollable(current)) {
      return current;
    }
    current = current.parentElement;
  }

  const scrollingElement = document.scrollingElement;
  return scrollingElement instanceof HTMLElement ? scrollingElement : document.documentElement;
}

function getRoleLabel(role: string): string {
  return ROLE_LABELS[role] ?? role;
}

function getRoleBoxes(): RoleBox[] {
  const roleNodes = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-role]'));

  return roleNodes
    .map((node, index) => {
      const rect = node.getBoundingClientRect();
      if (rect.width < 12 || rect.height < 12) return null;

      const role = node.dataset.scrollRole ?? `unnamed-${index}`;
      return {
        role,
        label: getRoleLabel(role),
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        color: BOX_COLORS[index % BOX_COLORS.length],
      };
    })
    .filter((box): box is RoleBox => box !== null);
}

function formatScrollNode(node: HTMLElement | null): string {
  if (!node) return 'none';
  if (node === document.scrollingElement || node === document.documentElement || node === document.body) {
    return 'document.scrollingElement';
  }
  return describeElement(node);
}

function formatWheel(snapshot: WheelSnapshot | null): string {
  if (!snapshot) return 'none';
  return `${snapshot.phase} ${snapshot.deltaY.toFixed(1)} on ${snapshot.target} -> ${snapshot.scrollParent} prevented=${snapshot.defaultPrevented}`;
}

function formatScroll(snapshot: ScrollSnapshot | null): string {
  if (!snapshot) return 'none';
  return `${snapshot.target} top=${snapshot.scrollTop.toFixed(0)} h=${snapshot.clientHeight}/${snapshot.scrollHeight}`;
}

const EMPTY_STATE: OverlayState = {
  boxes: [],
  hovered: 'none',
  hoveredScrollParent: 'none',
  pointerCapture: 'none',
  docScrollTop: 0,
  docScrollHeight: 0,
  docClientHeight: 0,
  boardScrollParent: 'none',
  sidebarScrollTop: null,
  sidebarScrollHeight: null,
  sidebarClientHeight: null,
  lastWheelCapture: null,
  lastWheelBubble: null,
  lastScroll: null,
};

export default function ScrollDebugOverlay() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const enabled = useMemo(
    () => searchParams.get('scrolldebug') === '1' || searchParams.get('debugScroll') === '1',
    [searchParams],
  );

  const [state, setState] = useState<OverlayState>(EMPTY_STATE);

  const hoveredTargetRef = useRef<Element | null>(null);
  const pointerCaptureRef = useRef('none');
  const lastWheelCaptureRef = useRef<WheelSnapshot | null>(null);
  const lastWheelBubbleRef = useRef<WheelSnapshot | null>(null);
  const lastScrollRef = useRef<ScrollSnapshot | null>(null);
  const rafRef = useRef<number | null>(null);

  const collectState = useCallback(() => {
    const scrollingElement =
      document.scrollingElement instanceof HTMLElement ? document.scrollingElement : document.documentElement;
    const sidebar = document.querySelector<HTMLElement>('[data-scroll-role="sidebar-scroll"]');
    const board = document.querySelector<HTMLElement>('[data-scroll-role="game-board-region"]');

    setState({
      boxes: getRoleBoxes(),
      hovered: describeElement(hoveredTargetRef.current),
      hoveredScrollParent: formatScrollNode(getNearestScrollParent(hoveredTargetRef.current)),
      pointerCapture: pointerCaptureRef.current,
      docScrollTop: scrollingElement.scrollTop,
      docScrollHeight: scrollingElement.scrollHeight,
      docClientHeight: scrollingElement.clientHeight,
      boardScrollParent: formatScrollNode(getNearestScrollParent(board)),
      sidebarScrollTop: sidebar ? sidebar.scrollTop : null,
      sidebarScrollHeight: sidebar ? sidebar.scrollHeight : null,
      sidebarClientHeight: sidebar ? sidebar.clientHeight : null,
      lastWheelCapture: lastWheelCaptureRef.current,
      lastWheelBubble: lastWheelBubbleRef.current,
      lastScroll: lastScrollRef.current,
    });
  }, []);

  const scheduleCollect = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      collectState();
    });
  }, [collectState]);

  useEffect(() => {
    if (!enabled) {
      setState(EMPTY_STATE);
      return;
    }

    const recordWheel = (phase: 'capture' | 'bubble') => (event: WheelEvent) => {
      hoveredTargetRef.current = normalizeTarget(event.target);
      const snapshot: WheelSnapshot = {
        phase,
        target: describeElement(event.target),
        scrollParent: formatScrollNode(getNearestScrollParent(event.target)),
        deltaX: event.deltaX,
        deltaY: event.deltaY,
        defaultPrevented: event.defaultPrevented,
        time: new Date().toLocaleTimeString(),
      };

      if (phase === 'capture') {
        lastWheelCaptureRef.current = snapshot;
      } else {
        lastWheelBubbleRef.current = snapshot;
      }

      scheduleCollect();
    };

    const handlePointerMove = (event: PointerEvent) => {
      hoveredTargetRef.current = normalizeTarget(event.target);
      scheduleCollect();
    };

    const handleScroll = (event: Event) => {
      const target = normalizeTarget(event.target);
      const scroller =
        target instanceof HTMLElement
          ? target
          : document.scrollingElement instanceof HTMLElement
          ? document.scrollingElement
          : document.documentElement;

      lastScrollRef.current = {
        target: describeElement(scroller),
        scrollTop: scroller.scrollTop,
        scrollHeight: scroller.scrollHeight,
        clientHeight: scroller.clientHeight,
        time: new Date().toLocaleTimeString(),
      };

      scheduleCollect();
    };

    const handleGotPointerCapture = (event: Event) => {
      pointerCaptureRef.current = describeElement(event.target);
      scheduleCollect();
    };

    const handleLostPointerCapture = () => {
      pointerCaptureRef.current = 'none';
      scheduleCollect();
    };

    const handleResize = () => scheduleCollect();

    const onWheelCapture = recordWheel('capture');
    const onWheelBubble = recordWheel('bubble');

    window.addEventListener('pointermove', handlePointerMove, { capture: true, passive: true });
    window.addEventListener('wheel', onWheelCapture, { capture: true, passive: true });
    window.addEventListener('wheel', onWheelBubble, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('scroll', handleScroll, true);
    document.addEventListener('gotpointercapture', handleGotPointerCapture, true);
    document.addEventListener('lostpointercapture', handleLostPointerCapture, true);

    const intervalId = window.setInterval(scheduleCollect, 500);
    scheduleCollect();

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      window.clearInterval(intervalId);
      window.removeEventListener('pointermove', handlePointerMove, true);
      window.removeEventListener('wheel', onWheelCapture, true);
      window.removeEventListener('wheel', onWheelBubble);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('gotpointercapture', handleGotPointerCapture, true);
      document.removeEventListener('lostpointercapture', handleLostPointerCapture, true);
    };
  }, [enabled, pathname, scheduleCollect]);

  if (!enabled) return null;

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[9998]">
        {state.boxes.map((box) => (
          <div
            key={box.role}
            style={{
              position: 'fixed',
              top: `${Math.max(0, box.top)}px`,
              left: `${Math.max(0, box.left)}px`,
              width: `${Math.max(0, box.width)}px`,
              height: `${Math.max(0, box.height)}px`,
              border: `2px dashed ${box.color}`,
              borderRadius: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                background: 'rgba(3, 7, 18, 0.88)',
                color: box.color,
                padding: '3px 6px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {box.label}
            </div>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none fixed left-3 top-3 z-[9999] w-[min(380px,calc(100vw-24px))] rounded-2xl border border-[#f5df97]/40 bg-[rgba(3,7,18,0.88)] p-4 text-[11px] text-white shadow-2xl backdrop-blur-md"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="font-bold uppercase tracking-[0.18em] text-[#f5df97]">Scroll Debug</span>
          <span className="text-white/45">{pathname}</span>
        </div>
        <div className="space-y-1.5 text-white/78">
          <div>Hover target: <span className="text-[#f5df97]">{state.hovered}</span></div>
          <div>Hover scroll parent: <span className="text-[#7dd3fc]">{state.hoveredScrollParent}</span></div>
          <div>Board scroll parent: <span className="text-[#86efac]">{state.boardScrollParent}</span></div>
          <div>Pointer capture: <span className="text-[#fca5a5]">{state.pointerCapture}</span></div>
          <div>
            Document scroll: <span className="text-white">
              {Math.round(state.docScrollTop)} / {Math.max(0, Math.round(state.docScrollHeight - state.docClientHeight))}
            </span>
          </div>
          <div>
            Sidebar scroll: <span className="text-white">
              {state.sidebarScrollTop === null
                ? 'none'
                : `${Math.round(state.sidebarScrollTop)} / ${Math.max(
                    0,
                    Math.round((state.sidebarScrollHeight ?? 0) - (state.sidebarClientHeight ?? 0)),
                  )}`}
            </span>
          </div>
          <div>Wheel capture: <span className="text-white/90">{formatWheel(state.lastWheelCapture)}</span></div>
          <div>Wheel bubble: <span className="text-white/90">{formatWheel(state.lastWheelBubble)}</span></div>
          <div>Last scroll: <span className="text-white/90">{formatScroll(state.lastScroll)}</span></div>
        </div>
        <div className="mt-3 border-t border-white/10 pt-2 text-[10px] leading-4 text-white/48">
          Add <span className="text-[#f5df97]">?scrolldebug=1</span> to the URL, hover the board, then two-finger scroll.
          Watch whether the wheel lands on the board, document, or sidebar and which scrollTop actually changes.
        </div>
      </div>
    </>
  );
}
