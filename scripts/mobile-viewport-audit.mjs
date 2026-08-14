#!/usr/bin/env node
/**
 * mobile-viewport-audit.mjs
 *
 * Dependency-free Chrome DevTools Protocol audit for true mobile viewport checks.
 *
 * Usage:
 *   npm run qa:mobile -- --base=http://localhost:3000
 *   npm run qa:mobile -- --base=https://playfreecellonline.com --out=docs/analytics/mobile-viewport-audits/latest.json
 *   npm run qa:mobile -- --routes=spider,forty-thieves --widths=375,390,414
 *   npm run qa:mobile -- --viewports=375x812,812x375
 *   npm run qa:mobile -- --base=http://localhost:3000 --screenshots
 *
 * Requires Node 22+ or another runtime with global WebSocket. The project build
 * already requires a modern Node runtime; this script intentionally avoids
 * Playwright/Puppeteer so it can stay lightweight.
 */

import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { constants, existsSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const SCRIPT_DIR = dirname(SCRIPT_PATH);
const PROJECT_ROOT = resolve(SCRIPT_DIR, '..');

function expandHome(path) {
  return path?.replace(/^~(?=$|\/)/, homedir());
}

function getCandidateNodes() {
  return [
    process.env.FREECELL_QA_NODE,
    process.env.FREECELL_BUILD_NODE,
    process.env.NVM_BIN ? join(process.env.NVM_BIN, 'node') : null,
    '~/.nvm/versions/node/v22.19.0/bin/node',
    '~/.nvm/versions/node/v22.18.0/bin/node',
    '/opt/homebrew/bin/node',
    '/usr/local/bin/node',
  ]
    .filter(Boolean)
    .map(expandHome)
    .filter((candidate, index, candidates) => candidates.indexOf(candidate) === index);
}

function supportsAuditRuntime(nodePath) {
  const result = spawnSync(nodePath, ['-p', "typeof WebSocket === 'function'"], {
    encoding: 'utf8',
  });
  return result.status === 0 && result.stdout.trim() === 'true';
}

function reexecWithSupportedNode() {
  if (typeof WebSocket === 'function' || process.env.FREECELL_QA_NODE_REEXEC === '1') {
    return;
  }

  for (const candidate of getCandidateNodes()) {
    if (!existsSync(candidate) || candidate === process.execPath) {
      continue;
    }

    if (supportsAuditRuntime(candidate)) {
      const version = spawnSync(candidate, ['-p', 'process.versions.node'], { encoding: 'utf8' }).stdout.trim();
      console.log(`Using Node ${version} for mobile viewport audit (${candidate})`);
      const result = spawnSync(candidate, [SCRIPT_PATH, ...process.argv.slice(2)], {
        cwd: PROJECT_ROOT,
        env: {
          ...process.env,
          FREECELL_QA_NODE_REEXEC: '1',
        },
        stdio: 'inherit',
      });
      process.exit(result.status ?? 1);
    }
  }
}

const DEFAULT_WIDTHS = [375, 390, 414, 768];
const DEFAULT_HEIGHT_BY_WIDTH = new Map([
  [375, 812],
  [390, 844],
  [414, 896],
  [768, 1024],
]);
const DEFAULT_VIEWPORTS = DEFAULT_WIDTHS.map((width) => ({
  width,
  height: DEFAULT_HEIGHT_BY_WIDTH.get(width) || Math.round(width * 2.16),
}));
const VIEWPORT_PRESETS = new Map([
  ['portrait', DEFAULT_VIEWPORTS],
  ['phone-portrait', DEFAULT_VIEWPORTS.filter((viewport) => viewport.width < 768)],
  ['phone-landscape', [
    { width: 812, height: 375 },
    { width: 844, height: 390 },
    { width: 896, height: 414 },
  ]],
  ['phone-all', [
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 414, height: 896 },
    { width: 812, height: 375 },
    { width: 844, height: 390 },
    { width: 896, height: 414 },
  ]],
]);
const DEFAULT_ROUTES = [
  { label: 'freecell', path: '/game/1' },
  { label: 'klondike', path: '/klondike' },
  { label: 'spider', path: '/spider' },
  { label: 'forty-thieves', path: '/forty-thieves' },
];
const DEFAULT_ROUTE_BY_LABEL = new Map(DEFAULT_ROUTES.map((route) => [route.label, route]));
const DEFAULT_STABILITY_DELAY_MS = 350;
const DEFAULT_READY_TIMEOUT_MS = 10000;
const BOARD_STABILITY_THRESHOLD_PX = 1.5;
const CARD_STABILITY_THRESHOLD_PX = 2;
const COMFORTABLE_TAP_TARGET_PX = 44;
const MIN_TAP_TARGET_EDGE_PX = 32;
const DEAD_SPACE_REVIEW_WIDTH_PX = 768;
const DEAD_SPACE_REVIEW_THRESHOLD_PCT = 45;
const DEAD_SPACE_HIGH_THRESHOLD_PCT = 55;
const DEFAULT_EXPECTATIONS = new Map([
  ['freecell', { minCards: 52, cascades: 8, minFaceCards: 52 }],
  ['klondike', { minCards: 29, cascades: 7, minFaceCards: 7, minBackCards: 22 }],
  ['spider', { minCards: 63, cascades: 10, minFaceCards: 10, minBackCards: 53 }],
  ['forty-thieves', { minCards: 41, cascades: 10, minFaceCards: 40, minBackCards: 1, requireBottomControls: false }],
]);
const NEXT_ACTION_EXPECTATIONS = new Map([
  ['freecell', [{ action: 'strategy', label: 'strategy', pattern: /strategy/i }]],
  ['klondike', [
    { action: 'stock', label: 'stock action', pattern: /\b(draw|recycle)\b/i },
    { action: 'strategy', label: 'strategy', pattern: /strategy/i },
  ]],
  ['spider', [
    { action: 'stock', label: 'stock action', pattern: /\bdeal\b/i },
    { action: 'tips', label: 'tips', pattern: /tips/i },
  ]],
]);

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

function usage() {
  return `Usage:
  npm run qa:mobile -- [options]

Options:
  --base=<url>              Base URL to audit. Default: http://localhost:3000
  --widths=<list>           Comma-separated viewport widths. Default: ${DEFAULT_WIDTHS.join(',')}
                            Each width uses the default portrait height.
  --preset=<name>           Named viewport set. Presets: ${[...VIEWPORT_PRESETS.keys()].join(', ')}
  --viewports=<list>        Comma-separated widthxheight pairs, e.g. 375x812,812x375.
                            Overrides --preset and --widths when provided.
  --routes=<list>           Comma-separated default labels or route specs.
                            Labels: ${DEFAULT_ROUTES.map((route) => route.label).join(', ')}
  --route=<spec>            Add one route. Repeatable. Spec can be a default label,
                            /path, or /path:label.
  --out=<path>              Write JSON plus a sibling Markdown report.
  --screenshots[=<dir>]     Capture one screenshot per route/width.
  --delay=<ms>              Delay after load before auditing. Default: 1200
  --stability-delay=<ms>    Post-ready stability sample delay. Default: ${DEFAULT_STABILITY_DELAY_MS}
  --ready-timeout=<ms>      Wait for expected board/card readiness. Default: ${DEFAULT_READY_TIMEOUT_MS}
  --json                    Print JSON instead of Markdown.
  --help                    Show this help.
`;
}

function viewportLabel(viewport) {
  return `${viewport.width}x${viewport.height}`;
}

function parseViewportSpec(rawSpec) {
  const raw = rawSpec.trim().toLowerCase();
  if (!raw) return null;
  const match = raw.match(/^(\d+)x(\d+)$/);
  if (!match) {
    throw new Error(`Invalid viewport "${rawSpec}". Use widthxheight, for example 375x812.`);
  }
  return {
    width: Number.parseInt(match[1], 10),
    height: Number.parseInt(match[2], 10),
  };
}

function viewportsFromWidths(widths) {
  return widths.map((width) => ({
    width,
    height: DEFAULT_HEIGHT_BY_WIDTH.get(width) || Math.round(width * 2.16),
  }));
}

function cloneViewports(viewports) {
  return viewports.map((viewport) => ({ ...viewport }));
}

function isMobileViewport(viewport) {
  return Math.min(viewport.width, viewport.height) < 768;
}

function isPhonePortraitViewport(viewport) {
  return viewport.width < 768 && viewport.height >= viewport.width;
}

function parseRouteSpec(rawSpec) {
  const raw = rawSpec.trim();
  if (!raw) return null;
  const defaultRoute = DEFAULT_ROUTE_BY_LABEL.get(raw);
  if (defaultRoute) return { ...defaultRoute };

  const [rawPath, rawLabel] = raw.split(':');
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  return {
    path,
    label: rawLabel || DEFAULT_ROUTE_BY_LABEL.get(rawPath)?.label || path.replace(/^\/+/, '') || path,
  };
}

function parseArgs(argv) {
  const args = {
    base: 'http://localhost:3000',
    widths: DEFAULT_WIDTHS,
    preset: null,
    viewports: null,
    routes: DEFAULT_ROUTES,
    delayMs: 1200,
    stabilityDelayMs: DEFAULT_STABILITY_DELAY_MS,
    readyTimeoutMs: DEFAULT_READY_TIMEOUT_MS,
    jsonOnly: false,
    help: false,
    out: null,
    screenshotsDir: null,
  };

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') {
      args.help = true;
    } else if (arg === '--json') {
      args.jsonOnly = true;
    } else if (arg.startsWith('--base=')) {
      args.base = arg.slice('--base='.length).replace(/\/+$/, '');
    } else if (arg.startsWith('--widths=')) {
      args.widths = arg
        .slice('--widths='.length)
        .split(',')
        .map((value) => Number.parseInt(value.trim(), 10))
        .filter(Number.isFinite);
      args.preset = null;
    } else if (arg.startsWith('--preset=')) {
      const preset = arg.slice('--preset='.length).trim();
      if (!VIEWPORT_PRESETS.has(preset)) {
        throw new Error(`Unknown viewport preset "${preset}". Use one of: ${[...VIEWPORT_PRESETS.keys()].join(', ')}.`);
      }
      args.preset = preset;
    } else if (arg.startsWith('--viewports=')) {
      args.viewports = arg
        .slice('--viewports='.length)
        .split(',')
        .map(parseViewportSpec)
        .filter(Boolean);
    } else if (arg.startsWith('--routes=')) {
      args.routes = arg
        .slice('--routes='.length)
        .split(',')
        .map(parseRouteSpec)
        .filter(Boolean);
    } else if (arg.startsWith('--delay=')) {
      args.delayMs = Number.parseInt(arg.slice('--delay='.length), 10);
    } else if (arg.startsWith('--stability-delay=')) {
      args.stabilityDelayMs = Number.parseInt(arg.slice('--stability-delay='.length), 10);
    } else if (arg.startsWith('--ready-timeout=')) {
      args.readyTimeoutMs = Number.parseInt(arg.slice('--ready-timeout='.length), 10);
    } else if (arg.startsWith('--out=')) {
      args.out = arg.slice('--out='.length);
    } else if (arg === '--screenshots') {
      args.screenshotsDir = true;
    } else if (arg.startsWith('--screenshots=')) {
      args.screenshotsDir = arg.slice('--screenshots='.length);
    } else if (arg.startsWith('--route=')) {
      if (args.routes === DEFAULT_ROUTES) args.routes = [];
      const route = parseRouteSpec(arg.slice('--route='.length));
      if (route) args.routes.push(route);
    }
  }

  if (args.help) return args;
  if (args.widths.length === 0) throw new Error('No widths supplied.');
  if (args.viewports?.length === 0) throw new Error('No viewports supplied.');
  if (!args.viewports) {
    args.viewports = args.preset
      ? cloneViewports(VIEWPORT_PRESETS.get(args.preset))
      : viewportsFromWidths(args.widths);
  }
  if (args.routes.length === 0) throw new Error('No routes supplied.');
  if (!Number.isFinite(args.stabilityDelayMs) || args.stabilityDelayMs < 0) {
    throw new Error('Stability delay must be a non-negative number.');
  }
  if (!Number.isFinite(args.readyTimeoutMs) || args.readyTimeoutMs < 0) {
    throw new Error('Ready timeout must be a non-negative number.');
  }
  if (args.screenshotsDir === true) {
    args.screenshotsDir = args.out
      ? args.out.replace(/\.json$/i, '-screenshots')
      : 'docs/analytics/mobile-viewport-audits/screenshots';
  }
  return args;
}

async function exists(path) {
  try {
    await access(path, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (candidate && candidate.startsWith('/') && await exists(candidate)) return candidate;
  }

  return process.env.CHROME_PATH || 'google-chrome';
}

async function waitForJson(url, timeoutMs = 8000) {
  const deadline = Date.now() + timeoutMs;
  let lastError = null;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return await res.json();
    } catch (error) {
      lastError = error;
    }
    await sleep(100);
  }
  throw new Error(`Timed out waiting for Chrome at ${url}${lastError ? `: ${lastError.message}` : ''}`);
}

async function launchChrome() {
  const port = 9400 + Math.floor(Math.random() * 400);
  const userDataDir = await mkdtemp(resolve(tmpdir(), 'freecell-mobile-audit-'));
  const chromePath = await findChrome();
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--hide-scrollbars',
    'about:blank',
  ], {
    stdio: ['ignore', 'ignore', 'pipe'],
  });

  let stderr = '';
  chrome.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  chrome.once('exit', (code) => {
    if (code !== 0 && stderr.trim()) {
      console.error(stderr.trim());
    }
  });

  await waitForJson(`http://127.0.0.1:${port}/json/version`);
  return { chrome, port, userDataDir };
}

async function createTarget(port) {
  const res = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' });
  if (!res.ok) throw new Error(`Unable to create Chrome target: HTTP ${res.status}`);
  return res.json();
}

class CdpClient {
  constructor(webSocketUrl) {
    this.nextId = 1;
    this.pending = new Map();
    this.eventWaiters = new Map();
    this.eventListeners = new Map();
    this.ws = new WebSocket(webSocketUrl);
  }

  static async connect(webSocketUrl) {
    if (typeof WebSocket !== 'function') {
      throw new Error('global WebSocket is unavailable. Run this script with Node 22+.');
    }
    const client = new CdpClient(webSocketUrl);
    await new Promise((resolveOpen, rejectOpen) => {
      client.ws.addEventListener('open', resolveOpen, { once: true });
      client.ws.addEventListener('error', rejectOpen, { once: true });
    });
    client.ws.addEventListener('message', (event) => client.handleMessage(event));
    return client;
  }

  handleMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolveSend, rejectSend } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) rejectSend(new Error(`${message.error.message}: ${message.error.data || ''}`));
      else resolveSend(message.result);
      return;
    }

    if (message.method && this.eventWaiters.has(message.method)) {
      const waiters = this.eventWaiters.get(message.method);
      this.eventWaiters.delete(message.method);
      for (const waiter of waiters) waiter.resolveEvent(message.params);
    }

    if (message.method && this.eventListeners.has(message.method)) {
      for (const listener of this.eventListeners.get(message.method)) {
        listener(message.params);
      }
    }
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveSend, rejectSend) => {
      this.pending.set(id, { resolveSend, rejectSend });
    });
  }

  waitEvent(method, timeoutMs = 15000) {
    return new Promise((resolveEvent, rejectEvent) => {
      const timer = setTimeout(() => {
        const waiters = this.eventWaiters.get(method) || [];
        this.eventWaiters.set(method, waiters.filter((waiter) => waiter.resolveEvent !== resolveEvent));
        rejectEvent(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      const waiters = this.eventWaiters.get(method) || [];
      waiters.push({
        resolveEvent: (params) => {
          clearTimeout(timer);
          resolveEvent(params);
        },
      });
      this.eventWaiters.set(method, waiters);
    });
  }

  on(method, listener) {
    const listeners = this.eventListeners.get(method) || new Set();
    listeners.add(listener);
    this.eventListeners.set(method, listeners);
    return () => {
      const currentListeners = this.eventListeners.get(method);
      if (!currentListeners) return;
      currentListeners.delete(listener);
      if (currentListeners.size === 0) this.eventListeners.delete(method);
    };
  }

  close() {
    this.ws.close();
  }
}

async function evaluate(client, expression) {
  const result = await client.send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || 'Runtime.evaluate failed');
  }
  return result.result.value;
}

function auditExpression(label, path) {
  return `(() => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      devicePixelRatio: window.devicePixelRatio,
    };
    const visible = (rect, style) =>
      rect.width > 0 &&
      rect.height > 0 &&
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      Number(style.opacity || '1') > 0.01 &&
      rect.bottom > 0 &&
      rect.right > 0 &&
      rect.left < viewport.width &&
      rect.top < viewport.height;
    const rectJson = (rect) => ({
      top: Math.round(rect.top * 100) / 100,
      left: Math.round(rect.left * 100) / 100,
      right: Math.round(rect.right * 100) / 100,
      bottom: Math.round(rect.bottom * 100) / 100,
      width: Math.round(rect.width * 100) / 100,
      height: Math.round(rect.height * 100) / 100,
    });
    const board = document.querySelector('.dom-board-surface');
    const boardRect = board ? board.getBoundingClientRect() : null;
    const cards = [...document.querySelectorAll('.dom-card')].map((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return {
        id: el.getAttribute('data-card-id') || '',
        back: el.classList.contains('dom-card-back'),
        visible: visible(rect, style),
        horizontallyClipped: rect.left < -0.5 || rect.right > viewport.width + 0.5,
        verticallyAboveViewport: rect.top < -0.5,
        rect: rectJson(rect),
      };
    });
    const visibleCards = cards.filter((card) => card.visible);
    const visibleWidths = visibleCards.map((card) => card.rect.width).filter((width) => width > 0);
    const minCardWidth = visibleWidths.length ? Math.min(...visibleWidths) : 0;
    const maxCardWidth = visibleWidths.length ? Math.max(...visibleWidths) : 0;
    const clippedCards = cards.filter((card) => card.visible && card.horizontallyClipped);
    const cascades = [...document.querySelectorAll('[data-pile-type="cascade"]')].map((el) => {
      const rect = el.getBoundingClientRect();
      const cardCount = el.querySelectorAll('.dom-card').length;
      return { index: el.getAttribute('data-pile-index'), cardCount, rect: rectJson(rect) };
    });
    const controlSelector = 'button,a,[role="button"]';
    const interactive = [...document.querySelectorAll(controlSelector)].map((el, index) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
      const center = {
        x: Math.round((rect.left + rect.width / 2) * 100) / 100,
        y: Math.round((rect.top + rect.height / 2) * 100) / 100,
      };
      let centerHit = false;
      let hitText = '';
      let hitTag = '';
      let hitClass = '';
      if (visible(rect, style) && center.x >= 0 && center.x <= viewport.width && center.y >= 0 && center.y <= viewport.height) {
        const hit = (document.elementsFromPoint?.(center.x, center.y) || [document.elementFromPoint(center.x, center.y)])
          .find((candidate) => candidate && !candidate.closest?.('nextjs-portal'));
        const hitControl = hit?.closest?.(controlSelector) || null;
        centerHit = hit === el || el.contains(hit) || hitControl === el;
        hitText = (hit?.getAttribute?.('aria-label') || hit?.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
        hitTag = hit?.tagName?.toLowerCase?.() || '';
        hitClass = typeof hit?.className === 'string' ? hit.className.replace(/\\s+/g, ' ').trim().slice(0, 120) : '';
      }
      return {
        index,
        text,
        tag: el.tagName.toLowerCase(),
        disabled: Boolean(el.disabled) || el.getAttribute('aria-disabled') === 'true',
        visible: visible(rect, style),
        centerHit,
        center,
        hitTag,
        hitClass,
        hitText,
        tapTargetWidth: rectJson(rect).width,
        tapTargetHeight: rectJson(rect).height,
        rect: rectJson(rect),
      };
    });
    const blockedInteractive = interactive.filter((item) => item.visible && !item.disabled && !item.centerHit);
    const smallTapTargets = interactive.filter((item) => item.visible && !item.disabled && (
      item.tapTargetWidth < ${COMFORTABLE_TAP_TARGET_PX} || item.tapTargetHeight < ${COMFORTABLE_TAP_TARGET_PX}
    ));
    const crampedTapTargets = smallTapTargets.filter((item) => (
      item.tapTargetWidth < ${MIN_TAP_TARGET_EDGE_PX} ||
      item.tapTargetHeight < ${MIN_TAP_TARGET_EDGE_PX} ||
      (item.tapTargetWidth < ${COMFORTABLE_TAP_TARGET_PX} && item.tapTargetHeight < ${COMFORTABLE_TAP_TARGET_PX})
    ));
    const mobileLandscapeStatus = document.querySelector('[data-mobile-landscape-status="true"]');
    const mobileLandscapeStatusVisible = mobileLandscapeStatus
      ? visible(mobileLandscapeStatus.getBoundingClientRect(), getComputedStyle(mobileLandscapeStatus))
      : false;
    const nextActionPanels = [...document.querySelectorAll('[data-mobile-next-action]')].map((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const actions = [...el.querySelectorAll(controlSelector)].map((actionEl) => {
        const actionRect = actionEl.getBoundingClientRect();
        const actionStyle = getComputedStyle(actionEl);
        return {
          text: (actionEl.getAttribute('aria-label') || actionEl.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80),
          action: actionEl.getAttribute('data-mobile-next-action-control') || '',
          tag: actionEl.tagName.toLowerCase(),
          disabled: Boolean(actionEl.disabled) || actionEl.getAttribute('aria-disabled') === 'true',
          visible: visible(actionRect, actionStyle),
          rect: rectJson(actionRect),
        };
      });
      return {
        visible: visible(rect, style),
        rect: rectJson(rect),
        actionCount: actions.length,
        visibleActionCount: actions.filter((action) => action.visible).length,
        actions,
      };
    });
    const visibleNextActionPanels = nextActionPanels.filter((panel) => panel.visible);
    const topControlsVisible =
      mobileLandscapeStatusVisible ||
      interactive.some((item) => item.visible && item.rect.top < Math.max(180, viewport.height * 0.28));
    const bottomControlsVisible = interactive.some((item) => item.visible && item.rect.bottom > viewport.height * 0.7);
    const unusedVerticalPx = boardRect ? Math.max(0, viewport.height - boardRect.bottom) : null;
    const unusedVerticalPct = unusedVerticalPx === null ? null : Math.round((unusedVerticalPx / viewport.height) * 1000) / 10;
    return {
      label: ${JSON.stringify(label)},
      path: ${JSON.stringify(path)},
      url: location.href,
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.replace(/\\s+/g, ' ').trim() || '',
      viewport,
      boardFound: Boolean(board),
      boardRect: boardRect ? rectJson(boardRect) : null,
      cardCount: cards.length,
      faceCardCount: cards.filter((card) => card.id).length,
      backCardCount: cards.filter((card) => card.back).length,
      visibleCardCount: visibleCards.length,
      minCardWidth,
      maxCardWidth,
      clippedCardCount: clippedCards.length,
      horizontalOverflowPx: Math.max(0, viewport.scrollWidth - viewport.width),
      topControlsVisible,
      bottomControlsVisible,
      unusedVerticalPx,
      unusedVerticalPct,
      cascadeCount: cascades.length,
      cascadeCards: cascades.map((cascade) => cascade.cardCount),
      stabilityCards: visibleCards
        .filter((card) => card.id)
        .map((card) => ({ id: card.id, rect: card.rect })),
      visibleInteractiveCount: interactive.filter((item) => item.visible).length,
      nextActionPanelCount: nextActionPanels.length,
      visibleNextActionPanelCount: visibleNextActionPanels.length,
      nextActionActions: visibleNextActionPanels.flatMap((panel) =>
        panel.actions
          .filter((action) => action.visible)
          .map((action) => ({
            text: action.text,
            action: action.action,
            tag: action.tag,
            disabled: action.disabled,
            rect: action.rect,
          }))
      ),
      blockedInteractiveCount: blockedInteractive.length,
      blockedInteractive: blockedInteractive.map((item) => ({
        index: item.index,
        text: item.text,
        tag: item.tag,
        center: item.center,
        rect: item.rect,
        hitTag: item.hitTag,
        hitClass: item.hitClass,
        hitText: item.hitText,
      })),
      smallTapTargetCount: smallTapTargets.length,
      crampedTapTargetCount: crampedTapTargets.length,
      smallTapTargets: smallTapTargets.map((item) => ({
        index: item.index,
        text: item.text,
        tag: item.tag,
        rect: item.rect,
      })),
      crampedTapTargets: crampedTapTargets.map((item) => ({
        index: item.index,
        text: item.text,
        tag: item.tag,
        rect: item.rect,
      })),
    };
  })()`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'route';
}

async function captureViewportScreenshot(client, args, route, viewport) {
  if (!args.screenshotsDir) return null;

  const screenshotDir = resolve(process.cwd(), args.screenshotsDir);
  await mkdir(screenshotDir, { recursive: true });
  const filename = `${slugify(route.label)}-${viewportLabel(viewport)}.png`;
  const absolutePath = resolve(screenshotDir, filename);
  const capture = await client.send('Page.captureScreenshot', {
    format: 'png',
    captureBeyondViewport: false,
    fromSurface: true,
  });
  await writeFile(absolutePath, Buffer.from(capture.data, 'base64'));
  return `${args.screenshotsDir.replace(/\/+$/, '')}/${filename}`;
}

function formatBool(value) {
  return value ? 'yes' : 'no';
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return 'n/a';
  if (Number.isInteger(value)) return `${value}%`;
  return `${Math.round(value * 10) / 10}%`;
}

function markdownReportPathFor(outPath) {
  return /\.json$/i.test(outPath) ? outPath.replace(/\.json$/i, '.md') : `${outPath}.md`;
}

function rectCenter(rect) {
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function distanceBetweenRects(before, after) {
  if (!before || !after) return 0;
  const beforeCenter = rectCenter(before);
  const afterCenter = rectCenter(after);
  return Math.round(Math.hypot(afterCenter.x - beforeCenter.x, afterCenter.y - beforeCenter.y) * 100) / 100;
}

function measureLayoutStability(before, after, sampleDelayMs) {
  const beforeCards = new Map((before.stabilityCards || []).map((card) => [card.id, card]));
  const afterCards = new Map((after.stabilityCards || []).map((card) => [card.id, card]));
  let maxCardShiftPx = 0;
  let movedCardCount = 0;
  let matchedCardCount = 0;

  for (const [id, beforeCard] of beforeCards.entries()) {
    const afterCard = afterCards.get(id);
    if (!afterCard) continue;
    matchedCardCount += 1;
    const shiftPx = distanceBetweenRects(beforeCard.rect, afterCard.rect);
    maxCardShiftPx = Math.max(maxCardShiftPx, shiftPx);
    if (shiftPx > CARD_STABILITY_THRESHOLD_PX) movedCardCount += 1;
  }

  return {
    sampleDelayMs,
    boardShiftPx: distanceBetweenRects(before.boardRect, after.boardRect),
    maxCardShiftPx,
    movedCardCount,
    matchedCardCount,
    beforeCardCount: before.cardCount,
    afterCardCount: after.cardCount,
    cardCountChanged: before.cardCount !== after.cardCount,
  };
}

function classifyDeadSpace(row) {
  if (row.unusedVerticalPct === null || row.viewport.width >= DEAD_SPACE_REVIEW_WIDTH_PX) {
    return 'n/a';
  }
  if (row.unusedVerticalPct >= DEAD_SPACE_HIGH_THRESHOLD_PCT) return 'high';
  if (row.unusedVerticalPct >= DEAD_SPACE_REVIEW_THRESHOLD_PCT) return 'review';
  return 'ok';
}

function expectedNextActionDiagnostics(row) {
  const expectations = NEXT_ACTION_EXPECTATIONS.get(row.label);
  if (!expectations || !isPhonePortraitViewport(row.viewport)) {
    return { expected: [], missing: [], disabled: [], matches: [] };
  }

  const diagnostics = { expected: expectations.map((expectation) => expectation.label), missing: [], disabled: [], matches: [] };
  for (const expectation of expectations) {
    const matchingAction = (row.nextActionActions || []).find((action) => {
      const actionName = action.action || '';
      const actionText = action.text || action.tag || '';
      return actionName === expectation.action || expectation.pattern.test(actionText);
    });
    if (!matchingAction) {
      diagnostics.missing.push(expectation.label);
    } else if (matchingAction.disabled) {
      diagnostics.disabled.push(expectation.label);
    } else {
      diagnostics.matches.push({
        label: expectation.label,
        action: matchingAction.action || '',
        text: matchingAction.text || matchingAction.tag || '',
      });
    }
  }
  return diagnostics;
}

function stripStabilityCards(row) {
  const { stabilityCards, ...publicRow } = row;
  return publicRow;
}

function formatRemoteObjectValue(value) {
  if ('value' in value) {
    if (typeof value.value === 'string') return value.value;
    if (value.value === null) return 'null';
    return JSON.stringify(value.value);
  }
  return value.description || value.unserializableValue || value.type || '';
}

function createPageDiagnosticsCollector(client) {
  const diagnostics = {
    runtimeExceptions: [],
    consoleErrors: [],
    logErrors: [],
  };

  const offRuntimeException = client.on('Runtime.exceptionThrown', (params) => {
    const details = params.exceptionDetails || {};
    diagnostics.runtimeExceptions.push({
      text: details.exception?.description || details.text || 'Runtime exception',
      url: details.url || '',
      lineNumber: details.lineNumber ?? null,
      columnNumber: details.columnNumber ?? null,
    });
  });

  const offConsole = client.on('Runtime.consoleAPICalled', (params) => {
    if (!['error', 'assert'].includes(params.type)) return;
    diagnostics.consoleErrors.push({
      type: params.type,
      text: (params.args || []).map(formatRemoteObjectValue).filter(Boolean).join(' ').slice(0, 500),
      url: params.stackTrace?.callFrames?.[0]?.url || '',
      lineNumber: params.stackTrace?.callFrames?.[0]?.lineNumber ?? null,
      columnNumber: params.stackTrace?.callFrames?.[0]?.columnNumber ?? null,
    });
  });

  const offLog = client.on('Log.entryAdded', (params) => {
    const entry = params.entry || {};
    if (entry.level !== 'error') return;
    diagnostics.logErrors.push({
      source: entry.source || '',
      text: entry.text || 'Log error',
      url: entry.url || '',
      lineNumber: entry.lineNumber ?? null,
    });
  });

  return {
    diagnostics,
    stop() {
      offRuntimeException();
      offConsole();
      offLog();
      return diagnostics;
    },
  };
}

function rowMeetsReadiness(row) {
  const expected = DEFAULT_EXPECTATIONS.get(row.label);
  if (!row.boardFound) return false;
  if (!expected) return row.cardCount > 0;
  if (row.cardCount < expected.minCards) return false;
  if (row.faceCardCount < expected.minFaceCards) return false;
  if (expected.minBackCards && row.backCardCount < expected.minBackCards) return false;
  if (row.cascadeCount !== expected.cascades) return false;
  return true;
}

function rowMeetsStability(row) {
  if (!row.stability) return true;
  return (
    !row.stability.cardCountChanged &&
    row.stability.boardShiftPx <= BOARD_STABILITY_THRESHOLD_PX &&
    row.stability.maxCardShiftPx <= CARD_STABILITY_THRESHOLD_PX
  );
}

function formatMarkdown(results, args) {
  const lines = [];
  lines.push('# Mobile Viewport Audit');
  lines.push('');
  lines.push(`Base: \`${args.base}\``);
  lines.push(`Pulled: \`${new Date().toISOString()}\``);
  lines.push('');
  const summary = summarizeResults(results);
  lines.push('## Summary');
  lines.push('');
  lines.push(`- Rows: ${summary.totalRows} (${summary.passedRows} passed, ${summary.failedRows} need review)`);
  lines.push(`- Scope: ${summary.routeCount} routes x ${summary.viewportCount} viewports`);
  lines.push(`- Max horizontal overflow: ${summary.maxHorizontalOverflowPx}px`);
  lines.push(`- Max cramped tap targets: ${summary.maxCrampedTapTargetCount}`);
  lines.push(`- Max blocked controls: ${summary.maxBlockedInteractiveCount}`);
  lines.push(`- Runtime exceptions: ${summary.runtimeExceptionCount}`);
  lines.push(`- Console/log errors: ${summary.consoleErrorCount + summary.logErrorCount}`);
  lines.push(`- Dead-space candidates: ${summary.deadSpaceCandidates}`);
  lines.push(`- Rows with visible next-action panel: ${summary.rowsWithVisibleNextActionPanel}`);
  lines.push(`- Expected next-action rows: ${summary.expectedNextActionRows} (${summary.expectedNextActionPassedRows} passed, ${summary.expectedNextActionFailedRows} need review)`);
  lines.push(`- Expected next-action matches: ${summary.expectedNextActionMatchedControls}/${summary.expectedNextActionExpectedControls} (${formatPercent(summary.expectedNextActionCoveragePct)} coverage)`);
  lines.push(`- Rows missing expected next-action controls: ${summary.rowsMissingExpectedNextAction}`);
  lines.push(`- Rows with disabled expected next-action controls: ${summary.rowsWithDisabledExpectedNextAction}`);
  lines.push('');
  lines.push('## Details');
  lines.push('');
  const includeScreenshots = results.some((row) => row.screenshotPath);
  lines.push(`| Route | Viewport | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | JS errors | Stability | Top controls | Bottom controls | Next action | Unused vertical | Dead space${includeScreenshots ? ' | Screenshot' : ''} |`);
  lines.push(`|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---|---:|---${includeScreenshots ? '|---' : ''}|`);
  for (const row of results) {
    const stability = row.stability
      ? `${row.stability.boardShiftPx}/${row.stability.maxCardShiftPx}px`
      : 'n/a';
    const jsErrors = `${row.runtimeExceptionCount ?? 0}/${(row.consoleErrorCount ?? 0) + (row.logErrorCount ?? 0)}`;
    const nextAction = row.visibleNextActionPanelCount > 0
      ? row.nextActionActions
        .map((action) => `${action.action ? `${action.action}: ` : ''}${action.text || action.tag}${action.disabled ? ' (disabled)' : ''}`)
        .join(', ')
      : 'none';
    lines.push(`| ${row.label} | ${row.viewport.width}x${row.viewport.height} | ${row.cardCount} | ${row.faceCardCount} | ${row.minCardWidth}-${row.maxCardWidth} | ${row.horizontalOverflowPx} | ${row.clippedCardCount} | ${row.blockedInteractiveCount ?? 0} | ${row.crampedTapTargetCount ?? 0}/${row.smallTapTargetCount ?? 0} | ${jsErrors} | ${stability} | ${formatBool(row.topControlsVisible)} | ${formatBool(row.bottomControlsVisible)} | ${nextAction} | ${row.unusedVerticalPct ?? 'n/a'}% | ${row.deadSpaceLevel ?? 'n/a'}${includeScreenshots ? ` | ${row.screenshotPath ? `\`${row.screenshotPath}\`` : ''}` : ''} |`);
  }
  lines.push('');
  const deadSpaceCandidates = results.filter((row) => row.deadSpaceLevel === 'review' || row.deadSpaceLevel === 'high');
  if (deadSpaceCandidates.length) {
    lines.push('## Portrait Dead-Space Candidates');
    lines.push('');
    lines.push(`Phone-width rows with ${DEAD_SPACE_REVIEW_THRESHOLD_PCT}%+ unused vertical space below the first board sample are candidates for below-board next actions, contextual hints, or compact secondary content. This is a planning signal, not a hard failure.`);
    for (const row of deadSpaceCandidates) {
      lines.push(`- ${row.label} ${row.viewport.width}x${row.viewport.height}: ${row.unusedVerticalPct}% unused vertical space (${row.deadSpaceLevel})`);
    }
    lines.push('');
  }
  const nextActionRows = results.filter((row) => row.nextActionExpectedControls?.length > 0);
  if (nextActionRows.length) {
    lines.push('## Expected Next-Action Health');
    lines.push('');
    for (const row of nextActionRows) {
      const matched = row.nextActionExpectedMatches
        .map((match) => `${match.label}${match.action ? ` (${match.action})` : ''}`)
        .join(', ') || 'none';
      const missing = row.nextActionExpectationMisses?.length
        ? row.nextActionExpectationMisses.join(', ')
        : 'none';
      const disabled = row.nextActionDisabledExpected?.length
        ? row.nextActionDisabledExpected.join(', ')
        : 'none';
      lines.push(`- ${row.label} ${row.viewport.width}x${row.viewport.height}: matched ${matched}; missing ${missing}; disabled ${disabled}`);
    }
    lines.push('');
  }
  const failures = results.filter((row) => row.failureReasons.length > 0);
  if (failures.length) {
    lines.push('## Needs Review');
    for (const row of failures) {
      lines.push(`- ${row.label} ${row.viewport.width}x${row.viewport.height}: ${row.failureReasons.join('; ')}`);
    }
  } else {
    lines.push('No hard audit failures detected.');
  }
  const diagnosticRows = results.filter((row) => row.runtimeExceptionCount > 0 || row.consoleErrorCount > 0 || row.logErrorCount > 0);
  if (diagnosticRows.length) {
    lines.push('');
    lines.push('## Browser Diagnostics');
    lines.push('');
    lines.push('`JS errors` is shown as `runtime exceptions / console+log errors`. Runtime exceptions fail the audit; console and browser log errors are recorded for triage.');
    for (const row of diagnosticRows) {
      const firstRuntime = row.runtimeExceptions?.[0]?.text;
      const firstConsole = row.consoleErrors?.[0]?.text || row.logErrors?.[0]?.text;
      const sample = firstRuntime || firstConsole;
      lines.push(`- ${row.label} ${row.viewport.width}x${row.viewport.height}: ${row.runtimeExceptionCount} runtime, ${(row.consoleErrorCount ?? 0) + (row.logErrorCount ?? 0)} console/log${sample ? ` — ${sample}` : ''}`);
    }
  }
  return lines.join('\n');
}

function addFailureReasons(row) {
  row = { ...row, deadSpaceLevel: classifyDeadSpace(row) };
  const reasons = [];
  if (!row.boardFound) reasons.push('board not found');
  if (row.cardCount === 0) reasons.push('no rendered cards found');
  const expected = DEFAULT_EXPECTATIONS.get(row.label);
  if (expected) {
    if (row.cardCount < expected.minCards) {
      reasons.push(`expected at least ${expected.minCards} cards, found ${row.cardCount}`);
    }
    if (row.faceCardCount < expected.minFaceCards) {
      reasons.push(`expected at least ${expected.minFaceCards} face cards, found ${row.faceCardCount}`);
    }
    if (expected.minBackCards && row.backCardCount < expected.minBackCards) {
      reasons.push(`expected at least ${expected.minBackCards} card backs, found ${row.backCardCount}`);
    }
    if (row.cascadeCount !== expected.cascades) {
      reasons.push(`expected ${expected.cascades} cascades, found ${row.cascadeCount}`);
    }
  }
  if (row.horizontalOverflowPx > 1) reasons.push(`${row.horizontalOverflowPx}px horizontal overflow`);
  if (row.clippedCardCount > 0) reasons.push(`${row.clippedCardCount} horizontally clipped cards`);
  if (row.blockedInteractiveCount > 0) {
    const blocked = row.blockedInteractive
      .slice(0, 4)
      .map((item) => `"${item.text || `${item.tag}#${item.index}`}" hit ${item.hitTag || 'nothing'}`)
      .join(', ');
    reasons.push(`${row.blockedInteractiveCount} visible controls failed center hit-test${blocked ? ` (${blocked})` : ''}`);
  }
  const mobileViewport = isMobileViewport(row.viewport);
  if (mobileViewport && row.crampedTapTargetCount > 0) {
    const cramped = row.crampedTapTargets
      .slice(0, 4)
      .map((item) => `"${item.text || `${item.tag}#${item.index}`}" ${item.rect.width}x${item.rect.height}`)
      .join(', ');
    reasons.push(`${row.crampedTapTargetCount} visible controls below tap-target floor${cramped ? ` (${cramped})` : ''}`);
  }
  if (row.stability) {
    if (row.stability.cardCountChanged) {
      reasons.push(`card count changed after stability sample (${row.stability.beforeCardCount} -> ${row.stability.afterCardCount})`);
    }
    if (row.stability.boardShiftPx > BOARD_STABILITY_THRESHOLD_PX) {
      reasons.push(`board shifted ${row.stability.boardShiftPx}px after ${row.stability.sampleDelayMs}ms`);
    }
    if (row.stability.maxCardShiftPx > CARD_STABILITY_THRESHOLD_PX) {
      reasons.push(`max card shifted ${row.stability.maxCardShiftPx}px after ${row.stability.sampleDelayMs}ms`);
    }
  }
  if (row.runtimeExceptionCount > 0) {
    const sample = row.runtimeExceptions
      .slice(0, 2)
      .map((item) => item.text)
      .join(', ');
    reasons.push(`${row.runtimeExceptionCount} browser runtime exception${row.runtimeExceptionCount === 1 ? '' : 's'}${sample ? ` (${sample})` : ''}`);
  }
  if (!row.topControlsVisible) reasons.push('top controls not visibly detected');
  if (!row.bottomControlsVisible && mobileViewport && expected?.requireBottomControls !== false) {
    reasons.push('bottom controls not visibly detected on mobile');
  }
  const nextActionDiagnostics = expectedNextActionDiagnostics(row);
  if (nextActionDiagnostics.missing.length > 0 || nextActionDiagnostics.disabled.length > 0) {
    if (row.visibleNextActionPanelCount === 0) {
      reasons.push('expected mobile next-action panel on phone portrait');
    } else if (nextActionDiagnostics.missing.length > 0) {
      reasons.push(`expected mobile next-action action matching ${nextActionDiagnostics.missing.join(', ')}`);
    }
    if (nextActionDiagnostics.disabled.length > 0) {
      reasons.push(`expected mobile next-action action enabled: ${nextActionDiagnostics.disabled.join(', ')}`);
    }
  }
  return {
    ...row,
    nextActionExpectedControls: nextActionDiagnostics.expected,
    nextActionExpectationMisses: nextActionDiagnostics.missing,
    nextActionDisabledExpected: nextActionDiagnostics.disabled,
    nextActionExpectedMatches: nextActionDiagnostics.matches,
    failureReasons: reasons,
  };
}

function summarizeResults(results) {
  const failedRows = results.filter((row) => row.failureReasons.length > 0);
  const deadSpaceCandidates = results.filter((row) => row.deadSpaceLevel === 'review' || row.deadSpaceLevel === 'high');
  const routeCount = new Set(results.map((row) => row.label)).size;
  const viewportCount = new Set(results.map((row) => viewportLabel(row.viewport))).size;
  const maxHorizontalOverflowPx = Math.max(0, ...results.map((row) => row.horizontalOverflowPx || 0));
  const maxCrampedTapTargetCount = Math.max(0, ...results.map((row) => row.crampedTapTargetCount || 0));
  const maxBlockedInteractiveCount = Math.max(0, ...results.map((row) => row.blockedInteractiveCount || 0));
  const runtimeExceptionCount = results.reduce((sum, row) => sum + (row.runtimeExceptionCount || 0), 0);
  const consoleErrorCount = results.reduce((sum, row) => sum + (row.consoleErrorCount || 0), 0);
  const logErrorCount = results.reduce((sum, row) => sum + (row.logErrorCount || 0), 0);
  const rowsWithVisibleNextActionPanel = results.filter((row) => row.visibleNextActionPanelCount > 0).length;
  const expectedNextActionRows = results.filter((row) => row.nextActionExpectedControls?.length > 0);
  const rowsMissingExpectedNextAction = expectedNextActionRows.filter((row) => row.nextActionExpectationMisses?.length > 0).length;
  const rowsWithDisabledExpectedNextAction = expectedNextActionRows.filter((row) => row.nextActionDisabledExpected?.length > 0).length;
  const expectedNextActionFailedRows = expectedNextActionRows.filter(
    (row) => row.nextActionExpectationMisses?.length > 0 || row.nextActionDisabledExpected?.length > 0
  ).length;
  const expectedNextActionExpectedControls = expectedNextActionRows.reduce(
    (sum, row) => sum + (row.nextActionExpectedControls?.length || 0),
    0
  );
  const expectedNextActionMatchedControls = expectedNextActionRows.reduce(
    (sum, row) => sum + (row.nextActionExpectedMatches?.length || 0),
    0
  );
  const expectedNextActionCoveragePct = expectedNextActionExpectedControls > 0
    ? Math.round((expectedNextActionMatchedControls / expectedNextActionExpectedControls) * 1000) / 10
    : null;

  return {
    totalRows: results.length,
    routeCount,
    viewportCount,
    failedRows: failedRows.length,
    passedRows: results.length - failedRows.length,
    deadSpaceCandidates: deadSpaceCandidates.length,
    maxHorizontalOverflowPx,
    maxCrampedTapTargetCount,
    maxBlockedInteractiveCount,
    runtimeExceptionCount,
    consoleErrorCount,
    logErrorCount,
    rowsWithVisibleNextActionPanel,
    expectedNextActionRows: expectedNextActionRows.length,
    expectedNextActionPassedRows: expectedNextActionRows.length - expectedNextActionFailedRows,
    expectedNextActionFailedRows,
    expectedNextActionExpectedControls,
    expectedNextActionMatchedControls,
    expectedNextActionCoveragePct,
    rowsMissingExpectedNextAction,
    rowsWithDisabledExpectedNextAction,
  };
}

async function auditRoute(client, args, route, viewport) {
  const { width, height } = viewport;
  const mobileViewport = isMobileViewport(viewport);
  const url = new URL(route.path, `${args.base}/`).toString();
  const diagnosticsCollector = createPageDiagnosticsCollector(client);
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: mobileViewport ? 2 : 1,
    mobile: mobileViewport,
    screenWidth: width,
    screenHeight: height,
  });
  await client.send('Emulation.setTouchEmulationEnabled', { enabled: mobileViewport });
  const load = client.waitEvent('Page.loadEventFired', 15000).catch(() => null);
  await client.send('Page.navigate', { url });
  await load;
  if (args.delayMs > 0) await sleep(args.delayMs);

  let row = null;
  const readyDeadline = Date.now() + args.readyTimeoutMs;
  do {
    row = addFailureReasons(await evaluate(client, auditExpression(route.label, route.path)));
    if (rowMeetsReadiness(row)) {
      if (args.stabilityDelayMs <= 0) break;
      await sleep(args.stabilityDelayMs);
      const after = await evaluate(client, auditExpression(route.label, route.path));
      row = addFailureReasons({
        ...row,
        stability: measureLayoutStability(row, after, args.stabilityDelayMs),
      });
      if (rowMeetsReadiness(after) && rowMeetsStability(row)) break;
    }
    await sleep(300);
  } while (Date.now() < readyDeadline);
  const diagnostics = diagnosticsCollector.stop();
  row = addFailureReasons({
    ...row,
    runtimeExceptionCount: diagnostics.runtimeExceptions.length,
    consoleErrorCount: diagnostics.consoleErrors.length,
    logErrorCount: diagnostics.logErrors.length,
    runtimeExceptions: diagnostics.runtimeExceptions,
    consoleErrors: diagnostics.consoleErrors,
    logErrors: diagnostics.logErrors,
  });
  row = stripStabilityCards(row);
  const screenshotPath = await captureViewportScreenshot(client, args, route, viewport);
  if (screenshotPath) row.screenshotPath = screenshotPath;
  return row;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(usage());
    return;
  }
  let chrome = null;
  let userDataDir = null;
  let client = null;
  try {
    const launched = await launchChrome();
    chrome = launched.chrome;
    userDataDir = launched.userDataDir;
    const target = await createTarget(launched.port);
    client = await CdpClient.connect(target.webSocketDebuggerUrl);
    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Log.enable');
    await client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try {
        localStorage.setItem('cookie_consent', 'declined');
        localStorage.setItem('tutorialSeen', '1');
        localStorage.setItem('skipSplash', '1');
      } catch {}`,
    });

    const results = [];
    for (const route of args.routes) {
      for (const viewport of args.viewports) {
        results.push(await auditRoute(client, args, route, viewport));
      }
    }

    const payload = {
      base: args.base,
      pulledAt: new Date().toISOString(),
      widths: args.widths,
      viewports: args.viewports,
      routes: args.routes,
      screenshotsDir: args.screenshotsDir,
      markdownReportPath: args.out ? markdownReportPathFor(args.out) : null,
      summary: summarizeResults(results),
      results,
    };

    if (args.out) {
      const outPath = resolve(process.cwd(), args.out);
      const markdownPath = resolve(process.cwd(), payload.markdownReportPath);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`);
      await writeFile(markdownPath, `${formatMarkdown(results, args)}\n`);
    }

    if (args.jsonOnly) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      console.log(formatMarkdown(results, args));
      if (args.out) {
        console.log(`\nJSON written to ${args.out}`);
        console.log(`Markdown written to ${payload.markdownReportPath}`);
      }
    }

    const failures = results.filter((row) => row.failureReasons.length > 0);
    process.exitCode = failures.length ? 1 : 0;
  } finally {
    if (client) client.close();
    if (chrome) {
      chrome.kill('SIGTERM');
      await sleep(250);
    }
    if (userDataDir) {
      try {
        await rm(userDataDir, { recursive: true, force: true, maxRetries: 3, retryDelay: 150 });
      } catch {
        // Chrome may leave cache files alive briefly after the audit is done.
        // A stale temp profile is not an audit failure.
      }
    }
  }
}

reexecWithSupportedNode();

main()
  .catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(process.exitCode ?? 0);
  });
