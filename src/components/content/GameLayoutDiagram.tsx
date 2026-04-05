/**
 * GameLayoutDiagram — SVG diagram of the starting tableau for a solitaire variant.
 *
 * Renders a responsive, accessible schematic of each game's opening layout
 * (tableau columns, foundations, stock/waste, free cells, etc.). Produced as
 * unique visual content for game rule/strategy pages to strengthen E-E-A-T
 * signals and differentiate our pages from competitors who ship only text.
 *
 * Usage:
 *   <GameLayoutDiagram gameKey="freecell" showLabels />
 *   <GameLayoutDiagram gameKey="klondike" variant="dark" width={640} />
 */

export type GameLayoutKey =
  | "freecell"
  | "klondike"
  | "spider"
  | "pyramid"
  | "tripeaks"
  | "golf"
  | "yukon"
  | "forty-thieves"
  | "canfield"
  | "bakers-game"
  | "eight-off"
  | "seahaven"
  | "penguin"
  | "scorpion"
  | "beleaguered-castle"
  | "la-belle-lucie"
  | "flower-garden"
  | "accordion"
  | "aces-up"
  | "bakers-dozen"
  | "bristol"
  | "bisley"
  | "calculation"
  | "clock"
  | "cruel"
  | "gaps"
  | "monte-carlo";

interface GameLayoutDiagramProps {
  gameKey: GameLayoutKey;
  width?: number;
  height?: number;
  showLabels?: boolean;
  variant?: "default" | "dark";
}

type PileType =
  | "tableau"
  | "foundation"
  | "freecell"
  | "stock"
  | "waste"
  | "reserve"
  | "empty";

interface PileSpec {
  x: number;
  y: number;
  type: PileType;
  label?: string;
  cards: number;
  faceUpCount?: number;
}

interface LayoutSpec {
  title: string;
  piles: PileSpec[];
  viewWidth: number;
  viewHeight: number;
  placeholder?: boolean;
}

// Card geometry constants — all layouts share the same card footprint.
const CARD_W = 56;
const CARD_H = 80;
const CASCADE_OFFSET = 16; // vertical offset between stacked face-up cards
const FACEDOWN_OFFSET = 6; // vertical offset between stacked face-down cards
const COL_GAP = 12; // horizontal gap between columns/piles

// Helper to build Klondike-style cascade (N-1 face-down + 1 face-up) columns.
function klondikeColumns(
  startX: number,
  topY: number,
  cols: number,
): PileSpec[] {
  const result: PileSpec[] = [];
  for (let i = 0; i < cols; i += 1) {
    result.push({
      x: startX + i * (CARD_W + COL_GAP),
      y: topY,
      type: "tableau",
      label: i === 0 ? "Tableau" : undefined,
      cards: i + 1,
      faceUpCount: 1,
    });
  }
  return result;
}

const GAME_LAYOUTS: Record<GameLayoutKey, LayoutSpec> = {
  freecell: (() => {
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 8;
    const cardCounts = [7, 7, 7, 7, 6, 6, 6, 6];
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const startX = 16;
    const piles: PileSpec[] = [];
    // 4 free cells on the left
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "freecell",
        label: i === 0 ? "Free Cells" : undefined,
        cards: 0,
      });
    }
    // 4 foundations on the right
    const foundStartX =
      startX + boardWidth - 4 * CARD_W - 3 * COL_GAP;
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: foundStartX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    // 8 tableau columns
    for (let i = 0; i < cols; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: tableauY,
        type: "tableau",
        label: i === 0 ? "Tableau" : undefined,
        cards: cardCounts[i],
        faceUpCount: cardCounts[i],
      });
    }
    const maxCascade = 7;
    return {
      title: "FreeCell",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight:
        tableauY + CARD_H + (maxCascade - 1) * CASCADE_OFFSET + 28,
    };
  })(),

  klondike: (() => {
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 7;
    const startX = 16;
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const piles: PileSpec[] = [
      { x: startX, y: topY, type: "stock", label: "Stock", cards: 24 },
      {
        x: startX + CARD_W + COL_GAP,
        y: topY,
        type: "waste",
        label: "Waste",
        cards: 0,
      },
    ];
    // 4 foundations on the right
    const foundStartX =
      startX + boardWidth - 4 * CARD_W - 3 * COL_GAP;
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: foundStartX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    piles.push(...klondikeColumns(startX, tableauY, cols));
    const maxCascade = cols;
    // Klondike cascade height: (cols-1) face-down + 1 face-up
    const cascadeHeight =
      (maxCascade - 2) * FACEDOWN_OFFSET + CASCADE_OFFSET + CARD_H;
    return {
      title: "Klondike",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight: tableauY + cascadeHeight + 28,
    };
  })(),

  spider: (() => {
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 10;
    const startX = 16;
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const piles: PileSpec[] = [];
    // 5 stock piles top-left
    for (let i = 0; i < 5; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "stock",
        label: i === 0 ? "Stock (5 deals)" : undefined,
        cards: 10,
      });
    }
    // 8 foundation piles top-right
    const foundStartX =
      startX + boardWidth - 8 * CARD_W - 7 * COL_GAP;
    for (let i = 0; i < 8; i += 1) {
      piles.push({
        x: foundStartX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    // 10 tableau columns: cols 1-4 have 6 cards, cols 5-10 have 5 cards;
    // top card face-up in each column.
    for (let i = 0; i < cols; i += 1) {
      const count = i < 4 ? 6 : 5;
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: tableauY,
        type: "tableau",
        label: i === 0 ? "Tableau" : undefined,
        cards: count,
        faceUpCount: 1,
      });
    }
    const cascadeHeight =
      (6 - 2) * FACEDOWN_OFFSET + CASCADE_OFFSET + CARD_H;
    return {
      title: "Spider",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight: tableauY + cascadeHeight + 28,
    };
  })(),

  pyramid: (() => {
    const topY = 16;
    const startX = 16;
    const rows = 7;
    const pyramidWidth = rows * CARD_W + (rows - 1) * COL_GAP;
    const sideColX = startX + pyramidWidth + 40;
    const piles: PileSpec[] = [];
    // Pyramid rows (centered)
    for (let r = 0; r < rows; r += 1) {
      const count = r + 1;
      const rowWidth = count * CARD_W + (count - 1) * COL_GAP;
      const rowX = startX + (pyramidWidth - rowWidth) / 2;
      const rowY = topY + r * (CARD_H * 0.55);
      for (let c = 0; c < count; c += 1) {
        piles.push({
          x: rowX + c * (CARD_W + COL_GAP),
          y: rowY,
          type: "tableau",
          label: r === 0 && c === 0 ? "Pyramid" : undefined,
          cards: 1,
          faceUpCount: 1,
        });
      }
    }
    // Stock + waste + foundation stacked to the right
    piles.push({
      x: sideColX,
      y: topY,
      type: "stock",
      label: "Stock",
      cards: 24,
    });
    piles.push({
      x: sideColX,
      y: topY + CARD_H + 28,
      type: "waste",
      label: "Waste",
      cards: 0,
    });
    piles.push({
      x: sideColX,
      y: topY + (CARD_H + 28) * 2,
      type: "foundation",
      label: "Foundation",
      cards: 0,
    });
    const viewWidth = sideColX + CARD_W + startX;
    const viewHeight =
      topY + rows * (CARD_H * 0.55) + CARD_H + 28;
    return { title: "Pyramid", piles, viewWidth, viewHeight };
  })(),

  tripeaks: (() => {
    const topY = 16;
    const startX = 16;
    const piles: PileSpec[] = [];
    const cardStep = CARD_W * 0.5; // tight overlap for pyramid
    const rowStep = CARD_H * 0.4;
    // Row counts per peak: 1, 2, 3; then base row shared across all 3 peaks (10 cards).
    // Build 3 small peaks across the top.
    const peakWidths = [3, 5, 7]; // cards-worth of width per row
    const peakGap = 28;
    const peakUnitW =
      peakWidths[peakWidths.length - 1] * cardStep + CARD_W - cardStep;
    for (let peak = 0; peak < 3; peak += 1) {
      const peakOriginX = startX + peak * (peakUnitW + peakGap);
      for (let r = 0; r < 3; r += 1) {
        const count = r + 1;
        const rowW = count * cardStep + CARD_W - cardStep;
        const offset = (peakUnitW - rowW) / 2;
        const rowY = topY + r * rowStep;
        for (let c = 0; c < count; c += 1) {
          piles.push({
            x: peakOriginX + offset + c * cardStep,
            y: rowY,
            type: "tableau",
            label: peak === 0 && r === 0 && c === 0 ? "Peaks" : undefined,
            cards: 1,
            faceUpCount: 0,
          });
        }
      }
    }
    // Base row: 10 face-up cards spanning the three peaks.
    const baseY = topY + 3 * rowStep;
    const baseCount = 10;
    const baseStartX = startX;
    const baseStep = cardStep;
    for (let c = 0; c < baseCount; c += 1) {
      piles.push({
        x: baseStartX + c * baseStep,
        y: baseY,
        type: "tableau",
        label: c === 0 ? "Base row" : undefined,
        cards: 1,
        faceUpCount: 1,
      });
    }
    // Stock + waste + foundation below
    const sideY = baseY + CARD_H + 28;
    piles.push({
      x: startX,
      y: sideY,
      type: "stock",
      label: "Stock",
      cards: 23,
    });
    piles.push({
      x: startX + CARD_W + COL_GAP,
      y: sideY,
      type: "waste",
      label: "Waste",
      cards: 1,
      faceUpCount: 1,
    });
    piles.push({
      x: startX + (CARD_W + COL_GAP) * 2,
      y: sideY,
      type: "foundation",
      label: "Foundation",
      cards: 0,
    });
    const viewWidth =
      startX + 3 * peakUnitW + 2 * peakGap + startX;
    const viewHeight = sideY + CARD_H + 28;
    return { title: "TriPeaks", piles, viewWidth, viewHeight };
  })(),

  yukon: (() => {
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 7;
    const startX = 16;
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const piles: PileSpec[] = [];
    // 4 foundations on the right
    const foundStartX =
      startX + boardWidth - 4 * CARD_W - 3 * COL_GAP;
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: foundStartX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    // Yukon tableau: column i (0-indexed) has (i+1) total cards for i=0,
    // otherwise 5 face-up + i face-down = i + 5 for i >= 1.
    for (let i = 0; i < cols; i += 1) {
      const faceDown = i === 0 ? 0 : i;
      const faceUp = i === 0 ? 1 : 5;
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: tableauY,
        type: "tableau",
        label: i === 0 ? "Tableau" : undefined,
        cards: faceDown + faceUp,
        faceUpCount: faceUp,
      });
    }
    // Tallest column: 6 face-down + 5 face-up
    const cascadeHeight =
      (6 - 1) * FACEDOWN_OFFSET + 4 * CASCADE_OFFSET + CARD_H;
    return {
      title: "Yukon",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight: tableauY + cascadeHeight + 28,
    };
  })(),

  "eight-off": (() => {
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 8;
    const startX = 16;
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const piles: PileSpec[] = [];
    // 8 free cells (reserves), 4 foundations in same row
    for (let i = 0; i < 8; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "freecell",
        label: i === 0 ? "Free Cells (8)" : undefined,
        cards: i < 4 ? 1 : 0,
        faceUpCount: i < 4 ? 1 : 0,
      });
    }
    // Foundations row below
    const foundY = topY + CARD_H + 12;
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: foundY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    const tableauShifted = foundY + CARD_H + 28;
    // 8 columns of 6 cards, all face-up
    for (let i = 0; i < cols; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: tableauShifted,
        type: "tableau",
        label: i === 0 ? "Tableau" : undefined,
        cards: 6,
        faceUpCount: 6,
      });
    }
    const cascadeHeight = 5 * CASCADE_OFFSET + CARD_H;
    return {
      title: "Eight Off",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight: tableauShifted + cascadeHeight + 28,
      // override tableauY reference for safety
    };
  })(),

  "bakers-game": (() => {
    // Identical starting layout to FreeCell (rules differ on same-suit stacking)
    const topY = 16;
    const tableauY = topY + CARD_H + 28;
    const cols = 8;
    const startX = 16;
    const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
    const piles: PileSpec[] = [];
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "freecell",
        label: i === 0 ? "Free Cells" : undefined,
        cards: 0,
      });
    }
    const foundStartX =
      startX + boardWidth - 4 * CARD_W - 3 * COL_GAP;
    for (let i = 0; i < 4; i += 1) {
      piles.push({
        x: foundStartX + i * (CARD_W + COL_GAP),
        y: topY,
        type: "foundation",
        label: i === 0 ? "Foundations" : undefined,
        cards: 0,
      });
    }
    const cardCounts = [7, 7, 7, 7, 6, 6, 6, 6];
    for (let i = 0; i < cols; i += 1) {
      piles.push({
        x: startX + i * (CARD_W + COL_GAP),
        y: tableauY,
        type: "tableau",
        label: i === 0 ? "Tableau (same-suit)" : undefined,
        cards: cardCounts[i],
        faceUpCount: cardCounts[i],
      });
    }
    const cascadeHeight = 6 * CASCADE_OFFSET + CARD_H;
    return {
      title: "Baker's Game",
      piles,
      viewWidth: boardWidth + startX * 2,
      viewHeight: tableauY + cascadeHeight + 28,
    };
  })(),

  // --- Placeholder layouts (generic cascade, labelled for future refinement) ---
  golf: placeholderLayout("Golf"),
  "forty-thieves": placeholderLayout("Forty Thieves"),
  canfield: placeholderLayout("Canfield"),
  seahaven: placeholderLayout("Seahaven Towers"),
  penguin: placeholderLayout("Penguin"),
  scorpion: placeholderLayout("Scorpion"),
  "beleaguered-castle": placeholderLayout("Beleaguered Castle"),
  "la-belle-lucie": placeholderLayout("La Belle Lucie"),
  "flower-garden": placeholderLayout("Flower Garden"),
  accordion: placeholderLayout("Accordion"),
  "aces-up": placeholderLayout("Aces Up"),
  "bakers-dozen": placeholderLayout("Baker's Dozen"),
  bristol: placeholderLayout("Bristol"),
  bisley: placeholderLayout("Bisley"),
  calculation: placeholderLayout("Calculation"),
  clock: placeholderLayout("Clock"),
  cruel: placeholderLayout("Cruel"),
  gaps: placeholderLayout("Gaps"),
  "monte-carlo": placeholderLayout("Monte Carlo"),
};

function placeholderLayout(title: string): LayoutSpec {
  // Generic 7-column cascade so the page always renders something visual
  const topY = 16;
  const startX = 16;
  const cols = 7;
  const boardWidth = cols * CARD_W + (cols - 1) * COL_GAP;
  const piles: PileSpec[] = [];
  for (let i = 0; i < cols; i += 1) {
    piles.push({
      x: startX + i * (CARD_W + COL_GAP),
      y: topY,
      type: "tableau",
      label: i === 0 ? "Tableau" : undefined,
      cards: 4,
      faceUpCount: 1,
    });
  }
  const cascadeHeight = 2 * FACEDOWN_OFFSET + CASCADE_OFFSET + CARD_H;
  return {
    title,
    piles,
    viewWidth: boardWidth + startX * 2,
    viewHeight: topY + cascadeHeight + 48,
    placeholder: true,
  };
}

// --- Theme tokens ---
interface ThemeTokens {
  bg: string;
  felt: string;
  cardBack: string;
  cardBackStroke: string;
  cardBackPattern: string;
  cardFace: string;
  cardFaceStroke: string;
  pileOutline: string;
  pileLabel: string;
  title: string;
  placeholderText: string;
}

const THEMES: Record<"default" | "dark", ThemeTokens> = {
  default: {
    bg: "#FFFFFF",
    felt: "#0A3A0A",
    cardBack: "#1B3A7A",
    cardBackStroke: "#0F2252",
    cardBackPattern: "rgba(255,255,255,0.14)",
    cardFace: "#F8F4E8",
    cardFaceStroke: "#D4C49A",
    pileOutline: "rgba(255,255,255,0.28)",
    pileLabel: "rgba(255,255,255,0.78)",
    title: "#D4AF37",
    placeholderText: "rgba(255,255,255,0.65)",
  },
  dark: {
    bg: "#072907",
    felt: "#072907",
    cardBack: "#14306B",
    cardBackStroke: "#091848",
    cardBackPattern: "rgba(212,175,55,0.18)",
    cardFace: "#F4ECD6",
    cardFaceStroke: "#B8860B",
    pileOutline: "rgba(212,175,55,0.32)",
    pileLabel: "rgba(255,255,255,0.72)",
    title: "#D4AF37",
    placeholderText: "rgba(255,255,255,0.62)",
  },
};

function Card({
  x,
  y,
  faceUp,
  theme,
}: {
  x: number;
  y: number;
  faceUp: boolean;
  theme: ThemeTokens;
}) {
  const radius = 4;
  if (!faceUp) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={CARD_W}
          height={CARD_H}
          rx={radius}
          ry={radius}
          fill={theme.cardBack}
          stroke={theme.cardBackStroke}
          strokeWidth={1}
        />
        {/* simple diagonal pattern for card back */}
        <line
          x1={x + 6}
          y1={y + 6}
          x2={x + CARD_W - 6}
          y2={y + CARD_H - 6}
          stroke={theme.cardBackPattern}
          strokeWidth={1}
        />
        <line
          x1={x + CARD_W - 6}
          y1={y + 6}
          x2={x + 6}
          y2={y + CARD_H - 6}
          stroke={theme.cardBackPattern}
          strokeWidth={1}
        />
      </g>
    );
  }
  return (
    <rect
      x={x}
      y={y}
      width={CARD_W}
      height={CARD_H}
      rx={radius}
      ry={radius}
      fill={theme.cardFace}
      stroke={theme.cardFaceStroke}
      strokeWidth={1}
    />
  );
}

function EmptySlot({
  x,
  y,
  type,
  theme,
}: {
  x: number;
  y: number;
  type: PileType;
  theme: ThemeTokens;
}) {
  const radius = 4;
  const glyphMap: Partial<Record<PileType, string>> = {
    foundation: "A",
    freecell: "",
    stock: "\u21BB",
    waste: "",
  };
  const glyph = glyphMap[type] ?? "";
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={CARD_W}
        height={CARD_H}
        rx={radius}
        ry={radius}
        fill="none"
        stroke={theme.pileOutline}
        strokeWidth={1}
        strokeDasharray="4 3"
      />
      {glyph && (
        <text
          x={x + CARD_W / 2}
          y={y + CARD_H / 2 + 5}
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          fontSize={16}
          fill={theme.pileOutline}
        >
          {glyph}
        </text>
      )}
    </g>
  );
}

function renderPile(
  pile: PileSpec,
  showLabels: boolean,
  theme: ThemeTokens,
  keyPrefix: string,
) {
  const { x, y, cards, faceUpCount = 0, label, type } = pile;
  const elements: React.ReactNode[] = [];

  if (cards === 0) {
    elements.push(
      <EmptySlot
        key={`${keyPrefix}-empty`}
        x={x}
        y={y}
        type={type}
        theme={theme}
      />,
    );
  } else {
    const faceDown = Math.max(0, cards - faceUpCount);
    // For stock piles we just stack face-down with tight offset (max 4 visible)
    if (type === "stock") {
      const visible = Math.min(cards, 4);
      for (let i = 0; i < visible; i += 1) {
        elements.push(
          <Card
            key={`${keyPrefix}-stock-${i}`}
            x={x + i * 1.5}
            y={y + i * 1.5}
            faceUp={false}
            theme={theme}
          />,
        );
      }
    } else if (type === "tableau") {
      // Stack face-down cards tightly, then cascade face-up cards.
      let cursorY = y;
      for (let i = 0; i < faceDown; i += 1) {
        elements.push(
          <Card
            key={`${keyPrefix}-fd-${i}`}
            x={x}
            y={cursorY}
            faceUp={false}
            theme={theme}
          />,
        );
        if (i < faceDown - 1) {
          cursorY += FACEDOWN_OFFSET;
        }
      }
      if (faceDown > 0 && faceUpCount > 0) {
        cursorY += CASCADE_OFFSET;
      }
      for (let i = 0; i < faceUpCount; i += 1) {
        elements.push(
          <Card
            key={`${keyPrefix}-fu-${i}`}
            x={x}
            y={cursorY}
            faceUp={true}
            theme={theme}
          />,
        );
        if (i < faceUpCount - 1) {
          cursorY += CASCADE_OFFSET;
        }
      }
    } else {
      // freecell / foundation / waste / reserve: single card on top
      elements.push(
        <Card
          key={`${keyPrefix}-single`}
          x={x}
          y={y}
          faceUp={faceUpCount > 0}
          theme={theme}
        />,
      );
    }
  }

  if (showLabels && label) {
    elements.push(
      <text
        key={`${keyPrefix}-label`}
        x={x}
        y={y - 8}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize={11}
        fontWeight={500}
        fill={theme.pileLabel}
      >
        {label}
      </text>,
    );
  }

  return <g key={keyPrefix}>{elements}</g>;
}

export default function GameLayoutDiagram({
  gameKey,
  width,
  height,
  showLabels = true,
  variant = "dark",
}: GameLayoutDiagramProps) {
  const layout = GAME_LAYOUTS[gameKey];
  const theme = THEMES[variant];
  const viewWidth = layout.viewWidth;
  const viewHeight = layout.viewHeight;
  const ariaLabel = `Starting layout for ${layout.title}`;

  const svgWidth = width ?? "100%";
  const svgHeight = height ?? undefined;

  return (
    <figure
      className="w-full"
      aria-label={ariaLabel}
    >
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        width={svgWidth}
        height={svgHeight}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <rect
          x={0}
          y={0}
          width={viewWidth}
          height={viewHeight}
          fill={theme.felt}
          rx={8}
          ry={8}
        />
        {layout.piles.map((pile, idx) =>
          renderPile(pile, showLabels, theme, `pile-${idx}`),
        )}
        {layout.placeholder && (
          <text
            x={viewWidth / 2}
            y={viewHeight - 16}
            textAnchor="middle"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize={11}
            fill={theme.placeholderText}
          >
            Illustrative layout — detailed diagram coming soon
          </text>
        )}
      </svg>
      {showLabels && (
        <figcaption className="sr-only">
          {`Starting tableau diagram for ${layout.title}.`}
        </figcaption>
      )}
    </figure>
  );
}
