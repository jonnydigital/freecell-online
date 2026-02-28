import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Types of Solitaire Card Games | 20 Solitaire Variants Explained",
  description:
    "Explore 20 types of solitaire card games — from Klondike and Spider to FreeCell, Pyramid, and beyond. Difficulty ratings, rules overview, and how each variant compares. Find your next favorite solitaire game.",
  keywords: [
    "types of solitaire",
    "solitaire card games",
    "solitaire variants",
    "kinds of solitaire",
    "solitaire games list",
    "klondike solitaire",
    "spider solitaire",
    "freecell solitaire",
    "pyramid solitaire",
    "solitaire types explained",
  ],
  openGraph: {
    title: "Types of Solitaire Card Games | 20 Variants Explained",
    description:
      "The complete guide to solitaire card games. 20 variants from beginner-friendly Klondike to expert-level FreeCell, with difficulty ratings and rules for each.",
    url: "https://playfreecellonline.com/solitaire-types",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── Solitaire variants data ── */

interface SolitaireVariant {
  name: string;
  id: string;
  decks: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  luckFactor: "High" | "Medium" | "Low" | "None";
  description: string;
  howItWorks: string;
  category: "tableau" | "pairing" | "adding" | "special";
}

const variants: SolitaireVariant[] = [
  {
    name: "FreeCell",
    id: "freecell",
    decks: 1,
    difficulty: 4,
    luckFactor: "None",
    category: "tableau",
    description:
      "The gold standard for strategic solitaire. All 52 cards are dealt face-up, so there's no hidden information — just pure skill. Four open 'free cells' serve as temporary storage while you build foundations from Ace to King by suit.",
    howItWorks:
      "Eight columns of face-up cards. Build down by alternating colors in the tableau. Move cards to four foundation piles (Ace through King by suit). Use four free cells for temporary storage. Nearly every deal (99.999%) is solvable.",
  },
  {
    name: "Klondike",
    id: "klondike",
    decks: 1,
    difficulty: 2,
    luckFactor: "High",
    category: "tableau",
    description:
      "The game most people mean when they say 'solitaire.' Klondike is the classic — the one that shipped with every version of Windows and taught a generation how to use a mouse. Seven tableau columns with face-down cards create the element of surprise.",
    howItWorks:
      "Seven columns with increasing numbers of face-down cards (1 to 7). Turn over cards from a stock pile. Build down by alternating colors in the tableau. Move Aces to foundations and build up by suit. Win rate with optimal play: around 30-40%.",
  },
  {
    name: "Spider Solitaire",
    id: "spider",
    decks: 2,
    difficulty: 4,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "Uses two full decks (104 cards) spread across ten columns. The goal is to build complete King-to-Ace sequences of the same suit, which are then removed from the board. Comes in 1-suit, 2-suit, and 4-suit variants of increasing difficulty.",
    howItWorks:
      "Ten tableau columns. Deal additional rows from a stock pile when stuck. Build down regardless of suit (but only same-suit sequences can be moved as a group). Complete King-through-Ace same-suit runs are removed. Clear all cards to win.",
  },
  {
    name: "Pyramid",
    id: "pyramid",
    decks: 1,
    difficulty: 2,
    luckFactor: "High",
    category: "pairing",
    description:
      "Cards are arranged in a pyramid shape of 28 cards. Pair exposed cards that add up to 13 (e.g., Queen + Ace, 10 + 3) to remove them. Kings are removed alone since they already equal 13. Simple rules, but low win rates.",
    howItWorks:
      "28 cards arranged in 7 rows forming a pyramid. Cards are 'exposed' when no cards overlap them. Pair two exposed cards that sum to 13 to remove them. Draw from a stock pile for additional pairing options. Win by clearing the entire pyramid.",
  },
  {
    name: "TriPeaks",
    id: "tripeaks",
    decks: 1,
    difficulty: 1,
    luckFactor: "High",
    category: "pairing",
    description:
      "Three overlapping peaks of cards form the tableau. Remove cards that are one rank higher or lower than the current waste pile card. Fast-paced and satisfying, with an emphasis on building long chains of consecutive removals.",
    howItWorks:
      "Three pyramid-shaped peaks (18 face-up, 10 face-down cards). Remaining cards form a stock pile. Remove exposed cards that are one rank above or below the top waste card. Build chains for bonus points. Clear all three peaks to win.",
  },
  {
    name: "Baker's Dozen",
    id: "bakers-dozen",
    decks: 1,
    difficulty: 3,
    luckFactor: "Low",
    category: "tableau",
    description:
      "Thirteen columns of four cards each — all face-up. Kings are moved to the bottom of their columns at the start. No free cells, no stock pile, no empty column moves. A clean, challenging game that rewards careful planning.",
    howItWorks:
      "Thirteen columns of 4 face-up cards. Kings are automatically moved to the bottom of their respective columns. Build down regardless of suit. Only the top card of each column can be moved. Build foundations Ace through King by suit.",
  },
  {
    name: "Canfield",
    id: "canfield",
    decks: 1,
    difficulty: 3,
    luckFactor: "High",
    category: "tableau",
    description:
      "Named after a 19th-century casino owner, Canfield deals 13 cards into a reserve pile and one card to start the foundations. Originally played as a gambling game where you'd 'buy' a deck and get paid per card moved to the foundations.",
    howItWorks:
      "13-card reserve pile, 4 tableau columns of 1 card each. The first foundation card determines the starting rank for all foundations. Build down by alternating colors in the tableau. Cycle through the stock pile in groups of three.",
  },
  {
    name: "Golf Solitaire",
    id: "golf",
    decks: 1,
    difficulty: 1,
    luckFactor: "High",
    category: "pairing",
    description:
      "Seven columns of five overlapping cards. Remove cards that are one rank higher or lower than the waste pile card (wrapping allowed in some versions). Called 'golf' because the goal is to achieve the lowest score — fewest cards remaining.",
    howItWorks:
      "35 cards in 7 columns of 5. Remaining 17 cards form the stock. Move exposed cards that are ±1 rank from the waste pile top. No suit matching required. Score equals cards left when no more moves remain. Par varies by version.",
  },
  {
    name: "Yukon",
    id: "yukon",
    decks: 1,
    difficulty: 3,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "Similar to Klondike but without a stock pile — all cards are dealt to the tableau. The key difference: you can move groups of cards even if they aren't in sequence, as long as the card being placed follows alternating-color descending rules.",
    howItWorks:
      "Seven tableau columns (same layout as Klondike). All remaining cards dealt face-up onto columns 2-7. Move any face-up card (and all cards on top of it) to a valid position. Build down by alternating colors. Build foundations Ace to King by suit.",
  },
  {
    name: "Russian Solitaire",
    id: "russian",
    decks: 1,
    difficulty: 5,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "A brutally difficult variant of Yukon. Same layout, but you must build down by the same suit instead of alternating colors. This single rule change drops the win rate dramatically and demands very precise planning.",
    howItWorks:
      "Same layout as Yukon — all cards dealt to 7 columns. Move groups of face-up cards freely, but building must be down by same suit (not alternating colors). Build foundations Ace to King by suit. Win rate under 5% for most players.",
  },
  {
    name: "Forty Thieves",
    id: "forty-thieves",
    decks: 2,
    difficulty: 5,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "Also called 'Napoleon at St. Helena.' Uses two decks dealt into ten columns of four cards each. Building is by same suit (not alternating colors), and only single cards can be moved. Extremely challenging with win rates around 10%.",
    howItWorks:
      "Two decks, ten columns of 4 face-up cards. Build down by same suit in the tableau. Only single top cards can be moved. Eight foundation piles (Ace to King by suit). Draw from stock one card at a time. A true test of patience.",
  },
  {
    name: "Scorpion",
    id: "scorpion",
    decks: 1,
    difficulty: 3,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "Seven columns with some face-down cards. Like Spider, the goal is to build King-to-Ace same-suit sequences. Any face-up card can be moved (with all cards on top of it), making it more flexible than Spider but still demanding.",
    howItWorks:
      "Seven columns: three with face-down cards. Three reserve cards dealt later. Move any face-up card and its pile to a valid same-suit descending position. Complete King-to-Ace same-suit sequences to remove them. Clear all cards to win.",
  },
  {
    name: "Clock Solitaire",
    id: "clock",
    decks: 1,
    difficulty: 1,
    luckFactor: "High",
    category: "special",
    description:
      "Cards are dealt into 13 piles arranged like a clock face (12 piles around the edge, 1 in the center). Flip cards and place them at the clock position matching their rank. Pure luck — no decisions to make, but oddly satisfying.",
    howItWorks:
      "52 cards in 13 face-down piles of 4 (12 around a clock, 1 center). Flip center pile's top card and place it face-up under the corresponding clock position (Ace=1 o'clock, etc., King=center). Flip the top card from that pile. Win if all piles are face-up before the 4th King.",
  },
  {
    name: "Accordion",
    id: "accordion",
    decks: 1,
    difficulty: 2,
    luckFactor: "High",
    category: "special",
    description:
      "All 52 cards dealt in a single row. Stack cards left onto matching cards (same suit or rank) that are 1 or 3 positions to their left. The row 'compresses' like an accordion as you stack. Simple rules, very luck-dependent.",
    howItWorks:
      "52 cards in a single row. A card can be moved onto the card 1 position or 3 positions to its left if they share the same suit or rank. The row compresses after each move. Win by reducing all 52 cards to a single pile.",
  },
  {
    name: "Calculation",
    id: "calculation",
    decks: 1,
    difficulty: 4,
    luckFactor: "Low",
    category: "adding",
    description:
      "One of the most skill-intensive solitaire games. Four foundation piles build up by different intervals (1s, 2s, 3s, 4s), wrapping around. Deciding which of four waste piles to place each card on is the core puzzle.",
    howItWorks:
      "Start with A, 2, 3, 4 as foundation bases. Build up by intervals: first pile by 1s (A,2,3...), second by 2s (2,4,6...), third by 3s (3,6,9...), fourth by 4s (4,8,Q...) — all wrapping at King. Four waste piles for temporary storage. Win rate ~30% with skilled play.",
  },
  {
    name: "Grandfather's Clock",
    id: "grandfathers-clock",
    decks: 1,
    difficulty: 3,
    luckFactor: "Medium",
    category: "special",
    description:
      "Twelve foundation piles arranged in a clock pattern, each starting from a different rank. The remaining cards are dealt into eight tableau columns. A visually striking game that plays similarly to FreeCell but without the free cells.",
    howItWorks:
      "12 foundation piles arranged as a clock. Each starts from a specific rank and builds up by suit until reaching the 'hour' value (e.g., the 3 o'clock pile builds up to 3). Eight tableau columns. Build down regardless of suit.",
  },
  {
    name: "La Belle Lucie",
    id: "la-belle-lucie",
    decks: 1,
    difficulty: 4,
    luckFactor: "Medium",
    category: "tableau",
    description:
      "Also known as 'Clover Leaf.' Eighteen fans of three cards each, with two redeals allowed. Only the top card of each fan can be moved. The redeals (gathering and reshuffling remaining cards) give you a second and third chance.",
    howItWorks:
      "52 cards dealt into 17 fans of 3 and 1 fan of 1. Only the top card of each fan is playable. Build down by same suit in the tableau. Build foundations Ace to King by suit. Two redeals allowed — all tableau cards gathered, shuffled, and re-dealt.",
  },
  {
    name: "Wish Solitaire",
    id: "wish",
    decks: 1,
    difficulty: 1,
    luckFactor: "High",
    category: "pairing",
    description:
      "A very simple game often played while making a wish. Thirty-two cards are dealt into eight piles of four. Remove pairs of same-rank cards from the tops of piles. If all pairs are removed, your wish comes true. Pure luck.",
    howItWorks:
      "32 cards dealt into 8 face-down piles of 4. Flip the top card of each pile. Remove any two face-up cards of the same rank. Continue flipping and pairing. Win by removing all cards — tradition says your wish is granted.",
  },
  {
    name: "Seahaven Towers",
    id: "seahaven-towers",
    decks: 1,
    difficulty: 4,
    luckFactor: "None",
    category: "tableau",
    description:
      "A close relative of FreeCell with an important twist: building in the tableau is by same suit (not alternating colors), and only Kings can fill empty columns. Like FreeCell, all cards are dealt face-up for complete information.",
    howItWorks:
      "Ten columns of 5 face-up cards (2 cards left over go to free cells). Four free cells for temporary storage. Build down by same suit. Only Kings can fill empty columns. Build foundations Ace to King by suit. Complete-information game like FreeCell.",
  },
  {
    name: "Streets and Alleys",
    id: "streets-and-alleys",
    decks: 1,
    difficulty: 3,
    luckFactor: "Low",
    category: "tableau",
    description:
      "Sometimes called 'FreeCell without the free cells.' All 52 cards dealt face-up into eight rows flanking four foundation piles. Plays similarly to FreeCell but without any temporary storage, making it significantly harder.",
    howItWorks:
      "52 cards dealt face-up in 8 rows (4 rows of 7, 4 rows of 6) flanking 4 empty foundation piles. Build down regardless of suit in the tableau. Only the end card of each row is playable. Build foundations Ace to King by suit. No free cells or stock.",
  },
];

const categories = [
  {
    id: "tableau",
    name: "Tableau-Building Games",
    description:
      "The largest family of solitaire games. Build ordered sequences in columns, then move cards to foundations. This category includes the most popular and strategically rich variants.",
  },
  {
    id: "pairing",
    name: "Pairing & Matching Games",
    description:
      "Remove cards by pairing them — either by rank, by cards that sum to a target number, or by adjacent ranks. Generally simpler rules but often very luck-dependent.",
  },
  {
    id: "adding",
    name: "Calculation & Arithmetic Games",
    description:
      "Build foundations using mathematical intervals or addition. These games emphasize counting and pattern recognition over traditional card-building skills.",
  },
  {
    id: "special",
    name: "Special Layout Games",
    description:
      "Unique layouts and unconventional rules that don't fit neatly into other categories. From clock-shaped arrangements to single-row compression games.",
  },
];

/* ── FAQ data ── */

const solitaireFaqs = [
  {
    question: "What is the most popular type of solitaire?",
    answer:
      "Klondike is by far the most popular solitaire variant — it's the game most people mean when they simply say 'solitaire.' FreeCell and Spider are the second and third most popular, respectively. Klondike's popularity stems from being the default solitaire game on Windows for decades.",
  },
  {
    question: "Which solitaire game requires the most skill?",
    answer:
      "FreeCell and Seahaven Towers are considered the most skill-dependent solitaire games because all cards are dealt face-up (complete information). FreeCell has essentially zero luck factor. Calculation is also highly skill-dependent. Games like Klondike and Clock Solitaire have much higher luck components.",
  },
  {
    question: "What solitaire game has the highest win rate?",
    answer:
      "FreeCell has the highest achievable win rate among popular solitaire games — expert players can win over 99% of deals. By contrast, Klondike's maximum win rate with optimal play is only around 30-40%, and many simpler games like Clock Solitaire have even lower theoretical win rates despite their easy rules.",
  },
  {
    question: "How many types of solitaire are there?",
    answer:
      "There are hundreds of documented solitaire variants, with some estimates putting the total over 500. This page covers 20 of the most well-known and widely played versions. New variants continue to be invented, and many classic games have their own sub-variants with slightly modified rules.",
  },
];

/* ── Helper components ── */

function SectionHeading({
  children,
  id,
  sub,
  icon,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
}) {
  return (
    <div className="px-8 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Difficulty: ${level} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className={`w-2.5 h-2.5 rounded-full ${
            n <= level ? "bg-[#D4AF37]" : "bg-[#e5e0d8]"
          }`}
        />
      ))}
    </div>
  );
}

function VariantCard({ variant }: { variant: SolitaireVariant }) {
  const isFreecell = variant.id === "freecell";
  return (
    <div
      id={variant.id}
      className={`card-inset rounded-lg p-5 sm:p-6 scroll-mt-6 ${isFreecell ? "ring-2 ring-[#D4AF37]/40" : ""}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <h3
          className="font-medium text-[#2a2522] text-lg"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {variant.name}
          {isFreecell && (
            <span className="ml-2 text-xs font-semibold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded-full">
              Our Game
            </span>
          )}
        </h3>
        <div className="flex items-center gap-3 text-xs text-[#6B7280] shrink-0">
          <span>{variant.decks === 1 ? "1 Deck" : "2 Decks"}</span>
          <span>|</span>
          <span>Luck: {variant.luckFactor}</span>
          <span>|</span>
          <DifficultyDots level={variant.difficulty} />
        </div>
      </div>

      <p className="text-[#444444] leading-relaxed mb-3">
        {variant.description}
      </p>
      <div className="text-sm text-[#6B7280] leading-relaxed border-t border-[#e5e0d8]/60 pt-3 mt-3">
        <strong className="text-[#2a2522]">How it works:</strong>{" "}
        {variant.howItWorks}
      </div>

      {isFreecell && (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#B8860B] hover:bg-[#D4AF37]/20 transition-colors"
          >
            Play FreeCell
          </Link>
          <Link
            href="/how-to-play"
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#B8860B] hover:bg-[#D4AF37]/20 transition-colors"
          >
            Learn the Rules
          </Link>
          <Link
            href="/strategy"
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-[#D4AF37]/10 text-[#B8860B] hover:bg-[#D4AF37]/20 transition-colors"
          >
            Strategy Guide
          </Link>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function SolitaireTypesPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Types of Solitaire Card Games: 20 Variants Explained — From Klondike to FreeCell",
      description:
        "A comprehensive guide to 20 solitaire card game variants with difficulty ratings, rules overview, and strategy comparison. Covers Klondike, Spider, FreeCell, Pyramid, TriPeaks, and more.",
      author: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
      publisher: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://playfreecellonline.com/solitaire-types",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: solitaireFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="h-screen overflow-y-auto scroll-smooth felt-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>

        <nav
          className="max-w-4xl mx-auto mb-8 text-sm text-[#6B7280]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link
                href="/"
                className="hover:text-white/80 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">Types of Solitaire</li>
          </ol>
        </nav>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Types of Solitaire Card Games
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          From the classic Klondike everyone knows to obscure variants
          you&apos;ve never tried — 20 solitaire games ranked by difficulty,
          luck factor, and strategic depth.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Quick Nav ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            ["#overview", "\u2660", "Overview"],
            ["#tableau-building", "\u2665", "Tableau Games"],
            ["#pairing-matching", "\u2666", "Pairing Games"],
            ["#calculation-arithmetic", "\u2663", "Arithmetic"],
            ["#special-layout", "\u2660", "Special Layout"],
            ["#comparison", "\u2665", "Comparison"],
            ["#faq", "\u2666", "FAQ"],
          ].map(([href, icon, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${icon === "\u2665" || icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {/* Overview */}
        <section id="overview" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The World of Solitaire"
              id="overview-heading"
              icon={"\u2660"}
            >
              What Is Solitaire?
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Solitaire isn&apos;t a single game — it&apos;s a family of
                hundreds of card games designed for one player. The term comes
                from the French word for &quot;alone,&quot; and solitaire
                games have been documented since at least the late 18th
                century. They were originally played with physical cards as a
                form of meditative entertainment, and became a global
                phenomenon when Microsoft began bundling them with Windows
                in the 1990s.
              </p>
              <p>
                The 20 variants on this page represent the most popular and
                historically significant solitaire games. They range from
                pure-luck games where you make no decisions (like{" "}
                <a href="#clock" className="text-[#D4AF37] hover:underline">
                  Clock Solitaire
                </a>
                ) to deep strategic puzzles where nearly every game is
                winnable if you play perfectly (like{" "}
                <a href="#freecell" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </a>
                ).
              </p>
              <p>
                We&apos;ve organized them into four categories based on their
                core mechanic: tableau-building games (arrange cards in
                columns), pairing games (match and remove cards), arithmetic
                games (use counting to build foundations), and special layout
                games (unique formats that defy easy classification).
              </p>
            </div>
          </div>
        </section>

        {/* Category sections */}
        {categories.map((category) => {
          const categoryVariants = variants.filter(
            (v) => v.category === category.id
          );
          const sectionIdMap: Record<string, string> = {
            tableau: "tableau-building",
            pairing: "pairing-matching",
            adding: "calculation-arithmetic",
            special: "special-layout",
          };
          const sectionId = sectionIdMap[category.id];
          const iconMap: Record<string, string> = {
            tableau: "\u2665",
            pairing: "\u2666",
            adding: "\u2663",
            special: "\u2660",
          };
          const icon = iconMap[category.id];

          return (
            <section key={category.id} id={sectionId} className="scroll-mt-6">
              <div className={CARD} style={CARD_TOP}>
                <SectionHeading
                  sub={`${categoryVariants.length} variants`}
                  id={`${sectionId}-heading`}
                  icon={icon}
                >
                  {category.name}
                </SectionHeading>

                <div className="px-8 sm:px-10 md:px-12 py-6">
                  <p className="text-[#444444] leading-relaxed mb-6">
                    {category.description}
                  </p>
                  <div className="space-y-4">
                    {categoryVariants.map((variant) => (
                      <VariantCard key={variant.id} variant={variant} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Comparison Table */}
        <section id="comparison" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Side by Side"
              id="comparison-heading"
              icon={"\u2665"}
            >
              Quick Comparison Chart
            </SectionHeading>

            <div className="px-4 sm:px-10 md:px-12 py-8 overflow-x-auto">
              <table className="w-full text-sm border-collapse min-w-[520px]">
                <thead>
                  <tr className="border-b-2 border-[#e5e0d8]">
                    <th className="text-left py-3 px-2 text-[#2a2522] font-semibold">
                      Game
                    </th>
                    <th className="text-center py-3 px-2 text-[#2a2522] font-semibold">
                      Decks
                    </th>
                    <th className="text-center py-3 px-2 text-[#2a2522] font-semibold">
                      Difficulty
                    </th>
                    <th className="text-center py-3 px-2 text-[#2a2522] font-semibold">
                      Luck
                    </th>
                    <th className="text-center py-3 px-2 text-[#2a2522] font-semibold">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((v) => (
                    <tr
                      key={v.id}
                      className={`border-b border-[#e5e0d8]/40 ${v.id === "freecell" ? "bg-[#D4AF37]/[0.06]" : ""}`}
                    >
                      <td className="py-2.5 px-2">
                        <a
                          href={`#${v.id}`}
                          className="text-[#2a2522] font-medium hover:text-[#D4AF37] transition-colors"
                        >
                          {v.name}
                        </a>
                      </td>
                      <td className="text-center py-2.5 px-2 text-[#6B7280]">
                        {v.decks}
                      </td>
                      <td className="py-2.5 px-2">
                        <div className="flex justify-center">
                          <DifficultyDots level={v.difficulty} />
                        </div>
                      </td>
                      <td className="text-center py-2.5 px-2 text-[#6B7280]">
                        {v.luckFactor}
                      </td>
                      <td className="text-center py-2.5 px-2 text-[#6B7280] capitalize">
                        {v.category}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Common Questions"
              id="faq-heading"
              icon={"\u2666"}
            >
              Solitaire Types FAQ
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-6">
              {solitaireFaqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {i < solitaireFaqs.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Ready to Play the Best Solitaire?
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                FreeCell is the most skill-intensive solitaire game ever
                made. No luck, no hidden cards — just your strategy against
                the cards.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                    backgroundSize: "200% 100%",
                    color: "#1a1a0a",
                  }}
                >
                  Play FreeCell Now
                </Link>
                <Link
                  href="/how-to-play"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Learn the Rules
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <footer className="text-center text-sm text-[#6B7280]/60 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-to-play"
              className="hover:text-[#6B7280] transition-colors"
            >
              How to Play
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/strategy"
              className="hover:text-[#6B7280] transition-colors"
            >
              Strategy Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/history"
              className="hover:text-[#6B7280] transition-colors"
            >
              FreeCell History
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/glossary"
              className="hover:text-[#6B7280] transition-colors"
            >
              Glossary
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/" className="hover:text-[#6B7280] transition-colors">
              Play Free
            </Link>
          </div>
          <p className="mt-3 text-white/25">
            &copy; {new Date().getFullYear()} PlayFreeCellOnline.com
          </p>
        </footer>
      </main>
    </div>
  );
}
