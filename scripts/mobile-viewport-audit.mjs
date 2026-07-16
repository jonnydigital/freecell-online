#!/usr/bin/env node
/**
 * mobile-viewport-audit.mjs
 *
 * Dependency-free Chrome DevTools Protocol audit for true mobile viewport checks.
 *
 * Usage:
 *   npm run qa:mobile -- --base=http://localhost:3000
 *   npm run qa:mobile -- --base=https://playfreecellonline.com --out=docs/analytics/mobile-viewport-audits/latest.json
 *   npm run qa:mobile -- --base=http://localhost:3000 --screenshots
 *
 * Requires Node 22+ or another runtime with global WebSocket. The project build
 * already requires a modern Node runtime; this script intentionally avoids
 * Playwright/Puppeteer so it can stay lightweight.
 */

import { access, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, resolve } from 'node:path';
import { spawn } from 'node:child_process';

const DEFAULT_WIDTHS = [375, 390, 414, 768];
const DEFAULT_HEIGHT_BY_WIDTH = new Map([
  [375, 812],
  [390, 844],
  [414, 896],
  [768, 1024],
]);
const DEFAULT_ROUTES = [
  { label: 'freecell', path: '/game/1' },
  { label: 'klondike', path: '/klondike' },
  { label: 'spider', path: '/spider' },
  { label: 'forty-thieves', path: '/forty-thieves' },
];
const DEFAULT_STABILITY_DELAY_MS = 350;
const BOARD_STABILITY_THRESHOLD_PX = 1.5;
const CARD_STABILITY_THRESHOLD_PX = 2;
const COMFORTABLE_TAP_TARGET_PX = 44;
const MIN_TAP_TARGET_EDGE_PX = 32;
const DEFAULT_EXPECTATIONS = new Map([
  ['freecell', { minCards: 52, cascades: 8, minFaceCards: 52 }],
  ['klondike', { minCards: 29, cascades: 7, minFaceCards: 7, minBackCards: 22 }],
  ['spider', { minCards: 63, cascades: 10, minFaceCards: 10, minBackCards: 53 }],
  ['forty-thieves', { minCards: 41, cascades: 10, minFaceCards: 40, minBackCards: 1, requireBottomControls: false }],
]);

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

function parseArgs(argv) {
  const args = {
    base: 'http://localhost:3000',
    widths: DEFAULT_WIDTHS,
    routes: DEFAULT_ROUTES,
    delayMs: 1200,
    stabilityDelayMs: DEFAULT_STABILITY_DELAY_MS,
    jsonOnly: false,
    out: null,
    screenshotsDir: null,
  };

  for (const arg of argv) {
    if (arg === '--json') {
      args.jsonOnly = true;
    } else if (arg.startsWith('--base=')) {
      args.base = arg.slice('--base='.length).replace(/\/+$/, '');
    } else if (arg.startsWith('--widths=')) {
      args.widths = arg
        .slice('--widths='.length)
        .split(',')
        .map((value) => Number.parseInt(value.trim(), 10))
        .filter(Number.isFinite);
    } else if (arg.startsWith('--delay=')) {
      args.delayMs = Number.parseInt(arg.slice('--delay='.length), 10);
    } else if (arg.startsWith('--stability-delay=')) {
      args.stabilityDelayMs = Number.parseInt(arg.slice('--stability-delay='.length), 10);
    } else if (arg.startsWith('--out=')) {
      args.out = arg.slice('--out='.length);
    } else if (arg === '--screenshots') {
      args.screenshotsDir = true;
    } else if (arg.startsWith('--screenshots=')) {
      args.screenshotsDir = arg.slice('--screenshots='.length);
    } else if (arg.startsWith('--route=')) {
      if (args.routes === DEFAULT_ROUTES) args.routes = [];
      const raw = arg.slice('--route='.length);
      const [path, label] = raw.split(':');
      args.routes.push({ path, label: label || path });
    }
  }

  if (args.widths.length === 0) throw new Error('No widths supplied.');
  if (args.routes.length === 0) throw new Error('No routes supplied.');
  if (!Number.isFinite(args.stabilityDelayMs) || args.stabilityDelayMs < 0) {
    throw new Error('Stability delay must be a non-negative number.');
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
    const topControlsVisible = interactive.some((item) => item.visible && item.rect.top < Math.max(180, viewport.height * 0.28));
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

async function captureViewportScreenshot(client, args, route, width) {
  if (!args.screenshotsDir) return null;

  const screenshotDir = resolve(process.cwd(), args.screenshotsDir);
  await mkdir(screenshotDir, { recursive: true });
  const filename = `${slugify(route.label)}-${width}.png`;
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

function stripStabilityCards(row) {
  const { stabilityCards, ...publicRow } = row;
  return publicRow;
}

function formatMarkdown(results, args) {
  const lines = [];
  lines.push('# Mobile Viewport Audit');
  lines.push('');
  lines.push(`Base: \`${args.base}\``);
  lines.push(`Pulled: \`${new Date().toISOString()}\``);
  lines.push('');
  const includeScreenshots = results.some((row) => row.screenshotPath);
  lines.push(`| Route | Width | Cards | Face | Card W | H overflow | Clipped | Blocked controls | Tap targets | Stability | Top controls | Bottom controls | Unused vertical${includeScreenshots ? ' | Screenshot' : ''} |`);
  lines.push(`|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|---:${includeScreenshots ? '|---' : ''}|`);
  for (const row of results) {
    const stability = row.stability
      ? `${row.stability.boardShiftPx}/${row.stability.maxCardShiftPx}px`
      : 'n/a';
    lines.push(`| ${row.label} | ${row.viewport.width} | ${row.cardCount} | ${row.faceCardCount} | ${row.minCardWidth}-${row.maxCardWidth} | ${row.horizontalOverflowPx} | ${row.clippedCardCount} | ${row.blockedInteractiveCount ?? 0} | ${row.crampedTapTargetCount ?? 0}/${row.smallTapTargetCount ?? 0} | ${stability} | ${formatBool(row.topControlsVisible)} | ${formatBool(row.bottomControlsVisible)} | ${row.unusedVerticalPct ?? 'n/a'}%${includeScreenshots ? ` | ${row.screenshotPath ? `\`${row.screenshotPath}\`` : ''}` : ''} |`);
  }
  lines.push('');
  const failures = results.filter((row) => row.failureReasons.length > 0);
  if (failures.length) {
    lines.push('## Needs Review');
    for (const row of failures) {
      lines.push(`- ${row.label} ${row.viewport.width}px: ${row.failureReasons.join('; ')}`);
    }
  } else {
    lines.push('No hard audit failures detected.');
  }
  return lines.join('\n');
}

function addFailureReasons(row) {
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
  if (row.viewport.width < 768 && row.crampedTapTargetCount > 0) {
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
  if (!row.topControlsVisible) reasons.push('top controls not visibly detected');
  if (!row.bottomControlsVisible && row.viewport.width < 768 && expected?.requireBottomControls !== false) {
    reasons.push('bottom controls not visibly detected on mobile');
  }
  return { ...row, failureReasons: reasons };
}

async function auditRoute(client, args, route, width) {
  const height = DEFAULT_HEIGHT_BY_WIDTH.get(width) || Math.round(width * 2.16);
  const url = new URL(route.path, `${args.base}/`).toString();
  await client.send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: width >= 768 ? 1 : 2,
    mobile: width < 768,
    screenWidth: width,
    screenHeight: height,
  });
  await client.send('Emulation.setTouchEmulationEnabled', { enabled: width < 768 });
  const load = client.waitEvent('Page.loadEventFired', 15000).catch(() => null);
  await client.send('Page.navigate', { url });
  await load;
  await sleep(args.delayMs);

  let row = null;
  for (let attempt = 0; attempt < 10; attempt += 1) {
    row = addFailureReasons(await evaluate(client, auditExpression(route.label, route.path)));
    if (row.boardFound && row.cardCount > 0 && row.failureReasons.length === 0) break;
    await sleep(300);
  }
  if (args.stabilityDelayMs > 0 && row?.boardFound && row.cardCount > 0) {
    await sleep(args.stabilityDelayMs);
    const after = await evaluate(client, auditExpression(route.label, route.path));
    row = addFailureReasons({
      ...row,
      stability: measureLayoutStability(row, after, args.stabilityDelayMs),
    });
  }
  row = stripStabilityCards(row);
  const screenshotPath = await captureViewportScreenshot(client, args, route, width);
  if (screenshotPath) row.screenshotPath = screenshotPath;
  return row;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
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
    await client.send('Page.addScriptToEvaluateOnNewDocument', {
      source: `try {
        localStorage.setItem('cookie_consent', 'declined');
        localStorage.setItem('tutorialSeen', '1');
        localStorage.setItem('skipSplash', '1');
      } catch {}`,
    });

    const results = [];
    for (const route of args.routes) {
      for (const width of args.widths) {
        results.push(await auditRoute(client, args, route, width));
      }
    }

    const payload = {
      base: args.base,
      pulledAt: new Date().toISOString(),
      widths: args.widths,
      routes: args.routes,
      screenshotsDir: args.screenshotsDir,
      markdownReportPath: args.out ? markdownReportPathFor(args.out) : null,
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

main()
  .catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  })
  .finally(() => {
    process.exit(process.exitCode ?? 0);
  });
