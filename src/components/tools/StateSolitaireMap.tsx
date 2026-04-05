"use client";

/**
 * StateSolitaireMap — interactive hex-grid US map.
 *
 * We chose a hex-grid layout over a geographically accurate SVG for three
 * reasons: every state ends up the same visual weight (no Rhode-Island-is-
 * invisible problem), the shape scales cleanly on mobile, and it is fast to
 * render and maintain. Each hex is a <button> with an ARIA label so
 * keyboard and screen-reader users can explore the map without hovering.
 *
 * The grid coordinates below follow the widely used "tile map" convention
 * for US states (roughly 11 columns x 8 rows).
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  GAME_COLORS,
  GAME_HREFS,
  GAME_LABELS,
  SOLITAIRE_BY_STATE,
  type FavoriteGame,
  type StateSolitaireRecord,
} from "@/data/solitaireByState";

interface HexPosition {
  code: string;
  col: number;
  row: number;
}

const HEX_LAYOUT: HexPosition[] = [
  // Row 0 (top)
  { code: "AK", col: 0, row: 0 },
  { code: "ME", col: 10, row: 0 },
  // Row 1
  { code: "VT", col: 9, row: 1 },
  { code: "NH", col: 10, row: 1 },
  // Row 2
  { code: "WA", col: 1, row: 2 },
  { code: "ID", col: 2, row: 2 },
  { code: "MT", col: 3, row: 2 },
  { code: "ND", col: 4, row: 2 },
  { code: "MN", col: 5, row: 2 },
  { code: "WI", col: 6, row: 2 },
  { code: "MI", col: 7, row: 2 },
  { code: "NY", col: 8, row: 2 },
  { code: "MA", col: 9, row: 2 },
  { code: "RI", col: 10, row: 2 },
  // Row 3
  { code: "OR", col: 1, row: 3 },
  { code: "NV", col: 2, row: 3 },
  { code: "WY", col: 3, row: 3 },
  { code: "SD", col: 4, row: 3 },
  { code: "IA", col: 5, row: 3 },
  { code: "IL", col: 6, row: 3 },
  { code: "IN", col: 7, row: 3 },
  { code: "OH", col: 8, row: 3 },
  { code: "PA", col: 9, row: 3 },
  { code: "NJ", col: 10, row: 3 },
  { code: "CT", col: 10, row: 3.5 },
  // Row 4
  { code: "CA", col: 1, row: 4 },
  { code: "UT", col: 2, row: 4 },
  { code: "CO", col: 3, row: 4 },
  { code: "NE", col: 4, row: 4 },
  { code: "MO", col: 5, row: 4 },
  { code: "KY", col: 6, row: 4 },
  { code: "WV", col: 7, row: 4 },
  { code: "VA", col: 8, row: 4 },
  { code: "MD", col: 9, row: 4 },
  { code: "DE", col: 10, row: 4 },
  // Row 5
  { code: "AZ", col: 2, row: 5 },
  { code: "NM", col: 3, row: 5 },
  { code: "KS", col: 4, row: 5 },
  { code: "AR", col: 5, row: 5 },
  { code: "TN", col: 6, row: 5 },
  { code: "NC", col: 7, row: 5 },
  { code: "SC", col: 8, row: 5 },
  { code: "DC", col: 9, row: 5 },
  // Row 6
  { code: "OK", col: 4, row: 6 },
  { code: "LA", col: 5, row: 6 },
  { code: "MS", col: 6, row: 6 },
  { code: "AL", col: 7, row: 6 },
  { code: "GA", col: 8, row: 6 },
  // Row 7
  { code: "HI", col: 0, row: 7 },
  { code: "TX", col: 4, row: 7 },
  { code: "FL", col: 8, row: 7 },
];

const HEX_WIDTH = 62;
const HEX_HEIGHT = 70;
const HEX_X_OFFSET = 54;
const HEX_Y_OFFSET = 48;
const HEX_PADDING = 20;

function hexPoints(cx: number, cy: number, radius: number): string {
  const points: string[] = [];
  for (let i = 0; i < 6; i += 1) {
    const angle = (Math.PI / 3) * i + Math.PI / 6;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return points.join(" ");
}

interface PositionedRecord extends StateSolitaireRecord {
  x: number;
  y: number;
}

export default function StateSolitaireMap() {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const positioned: PositionedRecord[] = useMemo(() => {
    const layoutByCode = new Map(HEX_LAYOUT.map((h) => [h.code, h]));
    return SOLITAIRE_BY_STATE.map((record) => {
      const layout = layoutByCode.get(record.code);
      if (!layout) {
        return { ...record, x: -999, y: -999 };
      }
      const x = layout.col * HEX_X_OFFSET + HEX_PADDING + HEX_WIDTH / 2;
      const y = layout.row * HEX_Y_OFFSET + HEX_PADDING + HEX_HEIGHT / 2;
      return { ...record, x, y };
    });
  }, []);

  const activeRecord = useMemo(
    () => positioned.find((r) => r.code === activeCode) ?? null,
    [positioned, activeCode],
  );

  const gridCols = 11;
  const gridRows = 8;
  const svgWidth = gridCols * HEX_X_OFFSET + HEX_PADDING * 2;
  const svgHeight = gridRows * HEX_Y_OFFSET + HEX_PADDING * 2;

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      <div className="relative flex-1 overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          role="img"
          aria-label="US state map showing the most popular solitaire game in each state"
          className="w-full h-auto max-w-full"
          style={{ minWidth: 480 }}
        >
          <title>Most popular solitaire variant by US state</title>
          {positioned.map((record) => {
            const isActive = activeCode === record.code;
            const color = GAME_COLORS[record.favoriteGame];
            return (
              <g key={record.code}>
                <polygon
                  points={hexPoints(record.x, record.y, 30)}
                  fill={color}
                  fillOpacity={isActive ? 0.95 : 0.7}
                  stroke={isActive ? "#ffffff" : "#072907"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ cursor: "pointer", transition: "fill-opacity 120ms ease" }}
                  onMouseEnter={() => setActiveCode(record.code)}
                  onFocus={() => setActiveCode(record.code)}
                  onMouseLeave={() =>
                    setActiveCode((current) =>
                      current === record.code ? null : current,
                    )
                  }
                  onClick={() =>
                    setActiveCode((current) =>
                      current === record.code ? null : record.code,
                    )
                  }
                  tabIndex={0}
                  role="button"
                  aria-label={`${record.name}: most-popular solitaire is ${GAME_LABELS[record.favoriteGame]}.`}
                  aria-pressed={isActive}
                />
                <text
                  x={record.x}
                  y={record.y + 4}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  fill="#072907"
                  pointerEvents="none"
                  style={{ userSelect: "none" }}
                >
                  {record.code}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <aside
        className="w-full lg:w-72 shrink-0 rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
        aria-live="polite"
      >
        {activeRecord ? (
          <ActivePanel record={activeRecord} />
        ) : (
          <DefaultPanel />
        )}
        <LegendBlock />
      </aside>
    </div>
  );
}

function ActivePanel({ record }: { record: PositionedRecord }) {
  const color = GAME_COLORS[record.favoriteGame];
  const href = GAME_HREFS[record.favoriteGame];
  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-white/[0.08] mb-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
        State Profile
      </div>
      <div className="text-lg font-semibold text-white">{record.name}</div>
      <div className="flex items-center gap-2 text-sm text-white/80">
        <span
          className="inline-block h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
        <span>
          <span className="text-white/60">Favourite:</span>{" "}
          <Link href={href} className="text-[#D4AF37] hover:underline">
            {GAME_LABELS[record.favoriteGame]}
          </Link>
        </span>
      </div>
      <div className="text-xs text-white/60">
        Runner-up: {GAME_LABELS[record.secondPlace]}
      </div>
      <p className="text-xs text-white/70 leading-relaxed">{record.note}</p>
    </div>
  );
}

function DefaultPanel() {
  return (
    <div className="flex flex-col gap-2 pb-4 border-b border-white/[0.08] mb-4">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
        How to Use
      </div>
      <p className="text-xs text-white/70 leading-relaxed">
        Hover, tap, or tab onto any hex to see our estimate of that state&rsquo;s
        favourite solitaire variant and a short note explaining the regional
        pattern.
      </p>
    </div>
  );
}

function LegendBlock() {
  const games: FavoriteGame[] = ["klondike", "freecell", "spider", "pyramid", "tripeaks"];
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
        Legend
      </div>
      <ul className="flex flex-col gap-1.5">
        {games.map((game) => (
          <li key={game} className="flex items-center gap-2 text-xs text-white/75">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: GAME_COLORS[game] }}
              aria-hidden="true"
            />
            <Link href={GAME_HREFS[game]} className="hover:text-[#D4AF37] hover:underline">
              {GAME_LABELS[game]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
