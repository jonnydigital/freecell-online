/**
 * Render SVG playing cards to PNG using browser CDP
 * Generates mobile-optimized cards with big bold indices
 */
const WebSocket = require('/tmp/node_modules/ws');
const fs = require('fs');
const path = require('path');

const CARD_W = 250;
const CARD_H = 350;
const OUT_DIR = path.join(__dirname, '..', 'public', 'cards');

const SUITS = {
  heart: { symbol: '♥', color: '#D4201E' },
  diamond: { symbol: '♦', color: '#D4201E' },
  club: { symbol: '♣', color: '#1A1A1A' },
  spade: { symbol: '♠', color: '#1A1A1A' },
};

const RANKS = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
const RANK_LABELS = {
  'Ace': 'A', '2': '2', '3': '3', '4': '4', '5': '5',
  '6': '6', '7': '7', '8': '8', '9': '9', '10': '10',
  'Jack': 'J', 'Queen': 'Q', 'King': 'K',
};

// Standard pip positions [x%, y%, flipped?]
const PIP_LAYOUTS = {
  1: [[50, 50]],
  2: [[50, 20], [50, 80, true]],
  3: [[50, 20], [50, 50], [50, 80, true]],
  4: [[30, 20], [70, 20], [30, 80, true], [70, 80, true]],
  5: [[30, 20], [70, 20], [50, 50], [30, 80, true], [70, 80, true]],
  6: [[30, 20], [70, 20], [30, 50], [70, 50], [30, 80, true], [70, 80, true]],
  7: [[30, 20], [70, 20], [50, 35], [30, 50], [70, 50], [30, 80, true], [70, 80, true]],
  8: [[30, 20], [70, 20], [50, 35], [30, 50], [70, 50], [50, 65, true], [30, 80, true], [70, 80, true]],
  9: [[30, 17], [70, 17], [30, 39], [70, 39], [50, 50], [30, 61, true], [70, 61, true], [30, 83, true], [70, 83, true]],
  10: [[30, 17], [70, 17], [50, 28], [30, 39], [70, 39], [30, 61, true], [70, 61, true], [50, 72, true], [30, 83, true], [70, 83, true]],
};

function makeSVG(suit, rank) {
  const s = SUITS[suit];
  const label = RANK_LABELS[rank];
  const rankNum = parseInt(rank);
  const isFace = ['Jack', 'Queen', 'King'].includes(rank);
  const isAce = rank === 'Ace';

  let content = '';

  // Corner indices - TOP LEFT (JUMBO for mobile readability)
  const ix = 28;
  const iy = 38;
  const rSize = label === '10' ? 42 : 50;
  content += `<text x="${ix}" y="${iy}" style="font-family:'Arial Black',Impact,'Helvetica Neue',sans-serif;font-size:${rSize}px;font-weight:900;fill:${s.color};text-anchor:middle;dominant-baseline:central">${label}</text>`;
  content += `<text x="${ix}" y="${iy + 34}" style="font-family:'Arial Black',Impact,sans-serif;font-size:36px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;

  // Corner indices - BOTTOM RIGHT
  const bx = CARD_W - ix;
  const by = CARD_H - iy;
  content += `<g transform="rotate(180 ${bx} ${by})">`;
  content += `<text x="${bx}" y="${by}" style="font-family:'Arial Black',Impact,'Helvetica Neue',sans-serif;font-size:${rSize}px;font-weight:900;fill:${s.color};text-anchor:middle;dominant-baseline:central">${label}</text>`;
  content += `<text x="${bx}" y="${by + 34}" style="font-family:'Arial Black',Impact,sans-serif;font-size:36px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;
  content += `</g>`;

  // Pip area (inset from corners)
  const pa = { x: 45, y: 70, w: CARD_W - 90, h: CARD_H - 140 };

  if (isAce) {
    content += `<text x="${CARD_W/2}" y="${CARD_H/2}" style="font-family:serif;font-size:100px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;
  } else if (isFace) {
    // Decorative frame
    content += `<rect x="50" y="80" width="${CARD_W-100}" height="${CARD_H-160}" rx="8" ry="8" fill="none" stroke="${s.color}" stroke-width="2.5" opacity="0.15"/>`;
    // Large letter
    content += `<text x="${CARD_W/2}" y="${CARD_H/2}" style="font-family:Georgia,'Times New Roman',serif;font-size:110px;font-weight:bold;fill:${s.color};text-anchor:middle;dominant-baseline:central;opacity:0.75">${label}</text>`;
    // Corner suit decorations
    content += `<text x="65" y="100" style="font-family:serif;font-size:22px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;
    content += `<g transform="rotate(180 ${CARD_W-65} ${CARD_H-100})"><text x="${CARD_W-65}" y="${CARD_H-100}" style="font-family:serif;font-size:22px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text></g>`;
  } else {
    // Number cards with pips
    const layout = PIP_LAYOUTS[rankNum];
    if (layout) {
      for (const pip of layout) {
        const [px, py, flipped] = pip;
        const x = pa.x + (px / 100) * pa.w;
        const y = pa.y + (py / 100) * pa.h;
        const rotate = flipped ? ` transform="rotate(180 ${x} ${y})"` : '';
        content += `<text x="${x}" y="${y}" style="font-family:serif;font-size:36px;fill:${s.color};text-anchor:middle;dominant-baseline:central"${rotate}>${s.symbol}</text>`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}">
    <rect x="1" y="1" width="${CARD_W-2}" height="${CARD_H-2}" rx="12" ry="12" fill="white" stroke="#C8C8C8" stroke-width="1.5"/>
    ${content}
  </svg>`;
}

function makeBack() {
  let pattern = '';
  for (let x = 16; x < CARD_W - 16; x += 18) {
    for (let y = 16; y < CARD_H - 16; y += 18) {
      pattern += `<polygon points="${x+9},${y} ${x+18},${y+9} ${x+9},${y+18} ${x},${y+9}" fill="none" stroke="#D4AF37" stroke-width="0.5" opacity="0.5"/>`;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD_W}" height="${CARD_H}">
    <rect x="0" y="0" width="${CARD_W}" height="${CARD_H}" rx="12" ry="12" fill="white"/>
    <rect x="5" y="5" width="${CARD_W-10}" height="${CARD_H-10}" rx="8" ry="8" fill="#1B2A4A"/>
    ${pattern}
    <text x="${CARD_W/2}" y="${CARD_H/2}" style="font-family:serif;font-size:40px;fill:#D4AF37;text-anchor:middle;dominant-baseline:central">♠</text>
  </svg>`;
}

async function renderSVGtoPNG(ws, svgData, outPath) {
  return new Promise((resolve, reject) => {
    const b64svg = Buffer.from(svgData).toString('base64');
    const html = `data:text/html,<html><body style="margin:0;padding:0;background:transparent"><img src="data:image/svg+xml;base64,${b64svg}" width="${CARD_W}" height="${CARD_H}"></body></html>`;
    
    let step = 0;
    const handler = (data) => {
      const msg = JSON.parse(data);
      if (step === 0 && msg.id === 100) {
        step = 1;
        setTimeout(() => {
          ws.send(JSON.stringify({id: 101, method: 'Page.captureScreenshot', params: {
            format: 'png',
            clip: { x: 0, y: 0, width: CARD_W, height: CARD_H, scale: 1 }
          }}));
        }, 200);
      }
      if (step === 1 && msg.id === 101) {
        ws.removeListener('message', handler);
        fs.writeFileSync(outPath, Buffer.from(msg.result.data, 'base64'));
        resolve();
      }
    };
    ws.on('message', handler);
    ws.send(JSON.stringify({id: 100, method: 'Page.navigate', params: { url: html }}));
  });
}

async function main() {
  // Use a dedicated browser tab
  const ws = new WebSocket('ws://127.0.0.1:18800/devtools/page/C82527C22985123923239DE6FADB38E0');
  
  await new Promise((resolve, reject) => {
    ws.on('open', resolve);
    ws.on('error', reject);
  });

  // Set exact viewport
  ws.send(JSON.stringify({id: 1, method: 'Emulation.setDeviceMetricsOverride', params: {
    width: CARD_W, height: CARD_H, deviceScaleFactor: 2, mobile: false
  }}));
  await new Promise(r => setTimeout(r, 500));

  let count = 0;
  const total = Object.keys(SUITS).length * RANKS.length + 1;

  for (const suit of Object.keys(SUITS)) {
    for (const rank of RANKS) {
      const svg = makeSVG(suit, rank);
      const filename = `${suit}${rank}.png`;
      const outPath = path.join(OUT_DIR, filename);
      await renderSVGtoPNG(ws, svg, outPath);
      count++;
      process.stdout.write(`\r${count}/${total} - ${filename}`);
    }
  }

  // Card back
  const backSvg = makeBack();
  await renderSVGtoPNG(ws, backSvg, path.join(OUT_DIR, 'back.png'));
  count++;
  
  // Reset viewport
  ws.send(JSON.stringify({id: 999, method: 'Emulation.clearDeviceMetricsOverride'}));
  
  console.log(`\nDone! Generated ${count} cards.`);
  ws.close();
}

main().catch(console.error);
