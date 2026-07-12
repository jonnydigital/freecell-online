#!/usr/bin/env node
/**
 * mobile-viewport-audit.mjs
 *
 * Dependency-free Chrome DevTools Protocol audit for true mobile viewport checks.
 *
 * Usage:
 *   npm run qa:mobile -- --base=http://localhost:3000
 *   npm run qa:mobile -- --base=https://playfreecellonline.com --out=docs/analytics/mobile-viewport-audits/latest.json
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

const sleep = (ms) => new Promise((resolveSleep) => setTimeout(resolveSleep, ms));

function parseArgs(argv) {
  const args = {
    base: 'http://localhost:3000',
    widths: DEFAULT_WIDTHS,
    routes: DEFAULT_ROUTES,
    delayMs: 1200,
    jsonOnly: false,
    out: null,
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
    } else if (arg.startsWith('--out=')) {
      args.out = arg.slice('--out='.length);
    } else if (arg.startsWith('--route=')) {
      if (args.routes === DEFAULT_ROUTES) args.routes = [];
      const raw = arg.slice('--route='.length);
      const [path, label] = raw.split(':');
      args.routes.push({ path, label: label || path });
    }
  }

  if (args.widths.length === 0) throw new Error('No widths supplied.');
  if (args.routes.length === 0) throw new Error('No routes supplied.');
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
    const interactive = [...document.querySelectorAll('button,a,[role="button"]')].map((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const text = (el.getAttribute('aria-label') || el.textContent || '').replace(/\\s+/g, ' ').trim().slice(0, 80);
      return { text, visible: visible(rect, style), rect: rectJson(rect) };
    });
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
      visibleInteractiveCount: interactive.filter((item) => item.visible).length,
    };
  })()`;
}

function formatBool(value) {
  return value ? 'yes' : 'no';
}

function formatMarkdown(results, args) {
  const lines = [];
  lines.push('# Mobile Viewport Audit');
  lines.push('');
  lines.push(`Base: \`${args.base}\``);
  lines.push(`Pulled: \`${new Date().toISOString()}\``);
  lines.push('');
  lines.push('| Route | Width | Cards | Face | Card W | H overflow | Clipped | Top controls | Bottom controls | Unused vertical |');
  lines.push('|---|---:|---:|---:|---:|---:|---:|---|---|---:|');
  for (const row of results) {
    lines.push(`| ${row.label} | ${row.viewport.width} | ${row.cardCount} | ${row.faceCardCount} | ${row.minCardWidth}-${row.maxCardWidth} | ${row.horizontalOverflowPx} | ${row.clippedCardCount} | ${formatBool(row.topControlsVisible)} | ${formatBool(row.bottomControlsVisible)} | ${row.unusedVerticalPct ?? 'n/a'}% |`);
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
  if (row.horizontalOverflowPx > 1) reasons.push(`${row.horizontalOverflowPx}px horizontal overflow`);
  if (row.clippedCardCount > 0) reasons.push(`${row.clippedCardCount} horizontally clipped cards`);
  if (!row.topControlsVisible) reasons.push('top controls not visibly detected');
  if (!row.bottomControlsVisible && row.viewport.width < 768) reasons.push('bottom controls not visibly detected on mobile');
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
    row = await evaluate(client, auditExpression(route.label, route.path));
    if (row.boardFound && row.cardCount > 0) break;
    await sleep(300);
  }
  return addFailureReasons(row);
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
      results,
    };

    if (args.out) {
      const outPath = resolve(process.cwd(), args.out);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, `${JSON.stringify(payload, null, 2)}\n`);
    }

    if (args.jsonOnly) {
      console.log(JSON.stringify(payload, null, 2));
    } else {
      console.log(formatMarkdown(results, args));
      if (args.out) console.log(`\nJSON written to ${args.out}`);
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
