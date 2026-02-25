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

function makeJackContent(cx, color, symbol) {
  let svg = '';
  // Subtle frame
  svg += `<rect x="58" y="84" width="134" height="182" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.12"/>`;

  // === HAT ===
  svg += `<rect x="90" y="90" width="70" height="22" rx="4" fill="${color}" opacity="0.8"/>`;
  svg += `<rect x="80" y="108" width="90" height="8" rx="4" fill="${color}" opacity="0.8"/>`;
  // Hat band
  svg += `<line x1="90" y1="103" x2="160" y2="103" stroke="white" stroke-width="1.5" opacity="0.3"/>`;
  // Feather
  svg += `<path d="M148 92 Q164 76 158 58" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" opacity="0.65"/>`;
  svg += `<path d="M148 92 Q158 80 150 65" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>`;

  // === FACE ===
  svg += `<ellipse cx="${cx}" cy="140" rx="28" ry="32" fill="#FAEBD7" stroke="${color}" stroke-width="2"/>`;
  // Eyes
  svg += `<circle cx="114" cy="134" r="3" fill="${color}"/>`;
  svg += `<circle cx="136" cy="134" r="3" fill="${color}"/>`;
  // Nose
  svg += `<path d="M125 140 L123 148 L127 148" fill="none" stroke="${color}" stroke-width="1.3"/>`;
  // Smile
  svg += `<path d="M117 155 Q125 162 133 155" fill="none" stroke="${color}" stroke-width="1.5"/>`;

  // === COLLAR / TUNIC ===
  svg += `<path d="M92 172 L108 168 L125 178 L142 168 L158 172 L162 258 L88 258 Z" fill="${color}" opacity="0.15"/>`;
  svg += `<path d="M108 168 L125 190 L142 168" fill="none" stroke="${color}" stroke-width="2"/>`;
  // Buttons
  svg += `<circle cx="${cx}" cy="200" r="2.5" fill="${color}" opacity="0.35"/>`;
  svg += `<circle cx="${cx}" cy="215" r="2.5" fill="${color}" opacity="0.35"/>`;
  // Suit on chest
  svg += `<text x="${cx}" y="242" style="font-family:serif;font-size:24px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.5">${symbol}</text>`;

  return svg;
}

function makeQueenContent(cx, color, symbol) {
  let svg = '';
  svg += `<rect x="58" y="84" width="134" height="182" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.12"/>`;

  // === CROWN ===
  svg += `<path d="M97 108 L102 88 L113 100 L125 82 L137 100 L148 88 L153 108 Z" fill="${color}" opacity="0.8"/>`;
  svg += `<rect x="97" y="106" width="56" height="7" rx="2" fill="${color}" opacity="0.8"/>`;
  // Crown jewels
  svg += `<circle cx="125" cy="94" r="3" fill="white" opacity="0.7"/>`;
  svg += `<circle cx="112" cy="100" r="2" fill="white" opacity="0.5"/>`;
  svg += `<circle cx="138" cy="100" r="2" fill="white" opacity="0.5"/>`;

  // === HAIR (flowing curves) ===
  svg += `<path d="M95 115 Q82 150 88 192 Q92 206 100 212" fill="none" stroke="${color}" stroke-width="4" opacity="0.25" stroke-linecap="round"/>`;
  svg += `<path d="M155 115 Q168 150 162 192 Q158 206 150 212" fill="none" stroke="${color}" stroke-width="4" opacity="0.25" stroke-linecap="round"/>`;
  // Inner hair strands
  svg += `<path d="M97 118 Q87 145 92 180" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.15" stroke-linecap="round"/>`;
  svg += `<path d="M153 118 Q163 145 158 180" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.15" stroke-linecap="round"/>`;

  // === FACE ===
  svg += `<ellipse cx="${cx}" cy="142" rx="27" ry="30" fill="#FAEBD7" stroke="${color}" stroke-width="2"/>`;
  // Eyes (elegant ovals)
  svg += `<ellipse cx="114" cy="136" rx="4" ry="2.5" fill="${color}"/>`;
  svg += `<ellipse cx="136" cy="136" rx="4" ry="2.5" fill="${color}"/>`;
  // Eyelashes
  svg += `<path d="M110 133 L108 130" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
  svg += `<path d="M140 133 L142 130" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
  // Nose
  svg += `<path d="M125 141 L123 148 L127 148" fill="none" stroke="${color}" stroke-width="1.2"/>`;
  // Lips
  svg += `<path d="M118 155 Q125 162 132 155" fill="${color}" opacity="0.3"/>`;

  // === NECKLINE / DRESS ===
  svg += `<path d="M88 176 Q125 164 162 176 L166 258 L84 258 Z" fill="${color}" opacity="0.12"/>`;
  svg += `<path d="M102 174 Q125 184 148 174" fill="none" stroke="${color}" stroke-width="1.5"/>`;
  // Necklace
  svg += `<circle cx="${cx}" cy="182" r="4" fill="${color}" opacity="0.4"/>`;
  svg += `<circle cx="115" cy="180" r="2" fill="${color}" opacity="0.25"/>`;
  svg += `<circle cx="135" cy="180" r="2" fill="${color}" opacity="0.25"/>`;
  // Suit symbol
  svg += `<text x="${cx}" y="228" style="font-family:serif;font-size:24px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.4">${symbol}</text>`;

  return svg;
}

function makeKingContent(cx, color, symbol) {
  let svg = '';
  svg += `<rect x="58" y="84" width="134" height="182" rx="6" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.12"/>`;

  // === LARGE CROWN (5 points) ===
  svg += `<path d="M86 112 L93 82 L107 100 L119 78 L125 94 L131 78 L143 100 L157 82 L164 112 Z" fill="${color}" opacity="0.8"/>`;
  svg += `<rect x="86" y="110" width="78" height="9" rx="2" fill="${color}" opacity="0.8"/>`;
  // Crown jewels
  svg += `<circle cx="108" cy="100" r="2.5" fill="white" opacity="0.6"/>`;
  svg += `<circle cx="125" cy="92" r="3" fill="white" opacity="0.7"/>`;
  svg += `<circle cx="142" cy="100" r="2.5" fill="white" opacity="0.6"/>`;

  // === FACE ===
  svg += `<ellipse cx="${cx}" cy="144" rx="29" ry="31" fill="#FAEBD7" stroke="${color}" stroke-width="2"/>`;
  // Eyes
  svg += `<circle cx="113" cy="136" r="3" fill="${color}"/>`;
  svg += `<circle cx="137" cy="136" r="3" fill="${color}"/>`;
  // Stern eyebrows
  svg += `<line x1="106" y1="129" x2="119" y2="131" stroke="${color}" stroke-width="2.5"/>`;
  svg += `<line x1="131" y1="131" x2="144" y2="129" stroke="${color}" stroke-width="2.5"/>`;
  // Nose
  svg += `<path d="M125 140 L122 148 L128 148" fill="none" stroke="${color}" stroke-width="1.4"/>`;
  // Straight mouth
  svg += `<line x1="117" y1="156" x2="133" y2="156" stroke="${color}" stroke-width="1.5"/>`;

  // === BEARD ===
  svg += `<path d="M100 160 Q97 180 108 194 Q125 206 142 194 Q153 180 150 160" fill="${color}" opacity="0.18" stroke="${color}" stroke-width="1.8"/>`;
  // Beard texture lines
  svg += `<path d="M110 168 Q112 182 115 190" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.2"/>`;
  svg += `<path d="M125 170 L125 196" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.2"/>`;
  svg += `<path d="M140 168 Q138 182 135 190" fill="none" stroke="${color}" stroke-width="0.8" opacity="0.2"/>`;

  // === ROBE / SHOULDERS ===
  svg += `<path d="M78 200 Q125 186 172 200 L176 258 L74 258 Z" fill="${color}" opacity="0.15"/>`;
  svg += `<path d="M102 198 L125 212 L148 198" fill="none" stroke="${color}" stroke-width="2"/>`;
  // Robe trim
  svg += `<line x1="125" y1="212" x2="125" y2="250" stroke="${color}" stroke-width="1.5" opacity="0.25"/>`;

  // === SCEPTER ===
  svg += `<line x1="172" y1="102" x2="172" y2="254" stroke="${color}" stroke-width="3" opacity="0.5"/>`;
  svg += `<circle cx="172" cy="97" r="7" fill="${color}" opacity="0.55"/>`;
  svg += `<circle cx="172" cy="97" r="3" fill="white" opacity="0.4"/>`;
  // Cross on scepter orb
  svg += `<line x1="172" y1="90" x2="172" y2="86" stroke="white" stroke-width="1.5" opacity="0.35"/>`;
  svg += `<line x1="169" y1="88" x2="175" y2="88" stroke="white" stroke-width="1.5" opacity="0.35"/>`;

  // Suit symbol on chest
  svg += `<text x="${cx}" y="238" style="font-family:serif;font-size:22px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.4">${symbol}</text>`;

  return svg;
}

function makeAceContent(cx, cy, color, symbol) {
  let svg = '';

  // === ORNAMENTAL DOUBLE FRAME ===
  svg += `<rect x="55" y="82" width="140" height="186" rx="8" fill="none" stroke="${color}" stroke-width="2" opacity="0.25"/>`;
  svg += `<rect x="63" y="90" width="124" height="170" rx="5" fill="none" stroke="${color}" stroke-width="1" opacity="0.18"/>`;

  // Corner flourishes (decorative scrolls)
  // Top-left
  svg += `<path d="M70 96 Q63 90 70 84" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  svg += `<path d="M66 98 Q60 90 55 97" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  // Top-right
  svg += `<path d="M180 96 Q187 90 180 84" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  svg += `<path d="M184 98 Q190 90 195 97" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  // Bottom-left
  svg += `<path d="M70 254 Q63 260 70 266" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  svg += `<path d="M66 252 Q60 260 55 253" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  // Bottom-right
  svg += `<path d="M180 254 Q187 260 180 266" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;
  svg += `<path d="M184 252 Q190 260 195 253" fill="none" stroke="${color}" stroke-width="1.5" opacity="0.3"/>`;

  // Decorative wave lines above and below symbol
  svg += `<path d="M85 148 Q105 140 125 148 Q145 140 165 148" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.2"/>`;
  svg += `<path d="M85 202 Q105 210 125 202 Q145 210 165 202" fill="none" stroke="${color}" stroke-width="1.2" opacity="0.2"/>`;

  // Diamond accents flanking symbol
  svg += `<polygon points="78,175 83,170 88,175 83,180" fill="${color}" opacity="0.15"/>`;
  svg += `<polygon points="162,175 167,170 172,175 167,180" fill="${color}" opacity="0.15"/>`;

  // Large centered suit symbol
  svg += `<text x="${cx}" y="${cy}" style="font-family:serif;font-size:105px;fill:${color};text-anchor:middle;dominant-baseline:central">${symbol}</text>`;

  // Small suit symbols in frame corners
  svg += `<text x="74" y="104" style="font-family:serif;font-size:14px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.28">${symbol}</text>`;
  svg += `<text x="176" y="104" style="font-family:serif;font-size:14px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.28">${symbol}</text>`;
  svg += `<g transform="rotate(180 74 246)"><text x="74" y="246" style="font-family:serif;font-size:14px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.28">${symbol}</text></g>`;
  svg += `<g transform="rotate(180 176 246)"><text x="176" y="246" style="font-family:serif;font-size:14px;fill:${color};text-anchor:middle;dominant-baseline:central;opacity:0.28">${symbol}</text></g>`;

  return svg;
}

function makeSVG(suit, rank) {
  const s = SUITS[suit];
  const label = RANK_LABELS[rank];
  const rankNum = parseInt(rank);
  const isFace = ['Jack', 'Queen', 'King'].includes(rank);
  const isAce = rank === 'Ace';

  let content = '';

  // Corner indices - TOP LEFT (MEGA for mobile — match competitor size)
  const ix = 30;
  const iy = 44;
  const rSize = label === '10' ? 52 : 60;
  const suitSize = 42;
  content += `<text x="${ix}" y="${iy}" style="font-family:'Arial Black',Impact,'Helvetica Neue',sans-serif;font-size:${rSize}px;font-weight:900;fill:${s.color};text-anchor:middle;dominant-baseline:central">${label}</text>`;
  content += `<text x="${ix}" y="${iy + 38}" style="font-family:'Arial Black',Impact,sans-serif;font-size:${suitSize}px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;

  // Corner indices - BOTTOM RIGHT
  const bx = CARD_W - ix;
  const by = CARD_H - iy;
  content += `<g transform="rotate(180 ${bx} ${by})">`;
  content += `<text x="${bx}" y="${by}" style="font-family:'Arial Black',Impact,'Helvetica Neue',sans-serif;font-size:${rSize}px;font-weight:900;fill:${s.color};text-anchor:middle;dominant-baseline:central">${label}</text>`;
  content += `<text x="${bx}" y="${by + 38}" style="font-family:'Arial Black',Impact,sans-serif;font-size:${suitSize}px;fill:${s.color};text-anchor:middle;dominant-baseline:central">${s.symbol}</text>`;
  content += `</g>`;

  // Pip area (inset from corners)
  const pa = { x: 45, y: 70, w: CARD_W - 90, h: CARD_H - 140 };

  if (isAce) {
    content += makeAceContent(CARD_W / 2, CARD_H / 2, s.color, s.symbol);
  } else if (isFace) {
    if (rank === 'Jack') content += makeJackContent(CARD_W / 2, s.color, s.symbol);
    else if (rank === 'Queen') content += makeQueenContent(CARD_W / 2, s.color, s.symbol);
    else if (rank === 'King') content += makeKingContent(CARD_W / 2, s.color, s.symbol);
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
  const ws = new WebSocket('ws://127.0.0.1:18800/devtools/page/5463089F665606468737EB1D85C1E57D');
  
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
