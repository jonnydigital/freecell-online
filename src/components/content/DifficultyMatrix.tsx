/**
 * DifficultyMatrix — 2x2 SVG matrix plotting a solitaire game by skill vs luck.
 *
 * Produces a compact, accessible chart placing the primary game (and any
 * comparison games) on a skill-x-luck plane. Provides original data-viz
 * content for game pages that Google and readers can weigh as genuine
 * editorial signal.
 *
 * Usage:
 *   <DifficultyMatrix
 *     gameKey="freecell"
 *     skillScore={82}
 *     luckScore={12}
 *     comparisonGames={[{ key: "klondike", name: "Klondike", skillScore: 55, luckScore: 60 }]}
 *   />
 */

interface ComparisonGame {
  key: string;
  name: string;
  skillScore: number;
  luckScore: number;
}

interface DifficultyMatrixProps {
  gameKey: string;
  skillScore: number;
  luckScore: number;
  comparisonGames?: ComparisonGame[];
  width?: number;
  height?: number;
  primaryName?: string;
}

const VIEW_W = 520;
const VIEW_H = 420;
const PADDING = { top: 36, right: 48, bottom: 56, left: 72 };
const PLOT_W = VIEW_W - PADDING.left - PADDING.right;
const PLOT_H = VIEW_H - PADDING.top - PADDING.bottom;

function projectX(skill: number): number {
  const clamped = Math.max(0, Math.min(100, skill));
  return PADDING.left + (clamped / 100) * PLOT_W;
}

function projectY(luck: number): number {
  const clamped = Math.max(0, Math.min(100, luck));
  // Higher luck should be higher on the chart, so invert
  return PADDING.top + (1 - clamped / 100) * PLOT_H;
}

function humanizeKey(key: string): string {
  return key
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function DifficultyMatrix({
  gameKey,
  skillScore,
  luckScore,
  comparisonGames = [],
  width,
  height,
  primaryName,
}: DifficultyMatrixProps) {
  const primaryLabel = primaryName ?? humanizeKey(gameKey);
  const ariaLabel = `Skill versus luck positioning chart for ${primaryLabel}`;

  // Quadrant anchors (centers of each quadrant for labels)
  const qLowSkill = PADDING.left + PLOT_W * 0.25;
  const qHighSkill = PADDING.left + PLOT_W * 0.75;
  const qLowLuck = PADDING.top + PLOT_H * 0.75;
  const qHighLuck = PADDING.top + PLOT_H * 0.25;

  const gridStroke = "rgba(255,255,255,0.08)";
  const axisStroke = "rgba(255,255,255,0.35)";
  const labelColor = "rgba(255,255,255,0.7)";
  const quadrantColor = "rgba(212,175,55,0.28)";
  const primaryColor = "#D4AF37";
  const primaryStroke = "#F2D06B";
  const compColor = "rgba(255,255,255,0.45)";

  const px = projectX(skillScore);
  const py = projectY(luckScore);

  // Offset label so it doesn't overlap the point
  const primaryLabelDx = skillScore >= 85 ? -10 : 10;
  const primaryLabelAnchor = skillScore >= 85 ? "end" : "start";

  return (
    <figure className="w-full">
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        width={width ?? "100%"}
        height={height ?? undefined}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        {/* background */}
        <rect
          x={0}
          y={0}
          width={VIEW_W}
          height={VIEW_H}
          fill="#072907"
          rx={8}
          ry={8}
        />

        {/* Plot area frame */}
        <rect
          x={PADDING.left}
          y={PADDING.top}
          width={PLOT_W}
          height={PLOT_H}
          fill="rgba(255,255,255,0.02)"
          stroke={axisStroke}
          strokeWidth={1}
        />

        {/* Grid lines at 25/50/75 */}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={`vgrid-${t}`}
            x1={PADDING.left + t * PLOT_W}
            y1={PADDING.top}
            x2={PADDING.left + t * PLOT_W}
            y2={PADDING.top + PLOT_H}
            stroke={gridStroke}
            strokeWidth={1}
            strokeDasharray={t === 0.5 ? "none" : "3 3"}
          />
        ))}
        {[0.25, 0.5, 0.75].map((t) => (
          <line
            key={`hgrid-${t}`}
            x1={PADDING.left}
            y1={PADDING.top + t * PLOT_H}
            x2={PADDING.left + PLOT_W}
            y2={PADDING.top + t * PLOT_H}
            stroke={gridStroke}
            strokeWidth={1}
            strokeDasharray={t === 0.5 ? "none" : "3 3"}
          />
        ))}

        {/* Quadrant labels */}
        <text
          x={qLowSkill}
          y={qLowLuck}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill={quadrantColor}
        >
          Casual
        </text>
        <text
          x={qHighSkill}
          y={qLowLuck}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill={quadrantColor}
        >
          Strategic
        </text>
        <text
          x={qLowSkill}
          y={qHighLuck}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill={quadrantColor}
        >
          Chance-driven
        </text>
        <text
          x={qHighSkill}
          y={qHighLuck}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill={quadrantColor}
        >
          Complex
        </text>

        {/* Axis labels */}
        <text
          x={PADDING.left + PLOT_W / 2}
          y={VIEW_H - 18}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={13}
          fontWeight={600}
          fill={labelColor}
        >
          Skill →
        </text>
        <text
          x={PADDING.left}
          y={VIEW_H - 36}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={11}
          fill={labelColor}
        >
          Low
        </text>
        <text
          x={PADDING.left + PLOT_W}
          y={VIEW_H - 36}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={11}
          fill={labelColor}
        >
          High
        </text>
        <g
          transform={`translate(20, ${
            PADDING.top + PLOT_H / 2
          }) rotate(-90)`}
        >
          <text
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize={13}
            fontWeight={600}
            fill={labelColor}
          >
            Luck →
          </text>
        </g>
        <text
          x={PADDING.left - 12}
          y={PADDING.top + PLOT_H}
          textAnchor="end"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={11}
          fill={labelColor}
        >
          Low
        </text>
        <text
          x={PADDING.left - 12}
          y={PADDING.top + 4}
          textAnchor="end"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={11}
          fill={labelColor}
        >
          High
        </text>

        {/* Comparison points (render first so primary sits on top) */}
        {comparisonGames.map((g) => {
          const cx = projectX(g.skillScore);
          const cy = projectY(g.luckScore);
          const anchorDx = g.skillScore >= 85 ? -8 : 8;
          const anchor = g.skillScore >= 85 ? "end" : "start";
          return (
            <g key={`comp-${g.key}`}>
              <circle
                cx={cx}
                cy={cy}
                r={5}
                fill={compColor}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={1}
              />
              <text
                x={cx + anchorDx}
                y={cy + 4}
                textAnchor={anchor}
                fontFamily="ui-sans-serif, system-ui, sans-serif"
                fontSize={11}
                fill={compColor}
              >
                {g.name}
              </text>
            </g>
          );
        })}

        {/* Primary point */}
        <g>
          <circle
            cx={px}
            cy={py}
            r={12}
            fill={primaryColor}
            fillOpacity={0.18}
          />
          <circle
            cx={px}
            cy={py}
            r={7}
            fill={primaryColor}
            stroke={primaryStroke}
            strokeWidth={1.5}
          />
          <text
            x={px + primaryLabelDx}
            y={py + 4}
            textAnchor={primaryLabelAnchor}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize={13}
            fontWeight={700}
            fill={primaryColor}
          >
            {primaryLabel}
          </text>
        </g>
      </svg>
      <figcaption className="sr-only">
        {`${primaryLabel} plotted at skill ${skillScore} of 100 and luck ${luckScore} of 100.`}
      </figcaption>
    </figure>
  );
}
