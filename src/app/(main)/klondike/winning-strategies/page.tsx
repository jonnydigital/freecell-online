import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title:
    "How to Win Solitaire Every Time | Klondike Winning Strategies & Statistics",
  description:
    "Can you win Klondike Solitaire every time? Statistical analysis of winnable games, advanced decision trees, Draw 1 vs Draw 3 tactics, and the strategies that push win rates above 80%.",
  keywords: [
    "how to win solitaire every time",
    "solitaire winning strategy",
    "klondike winning percentage",
    "can you win every solitaire game",
    "klondike solitaire win rate",
    "solitaire win percentage",
    "how to always win solitaire",
    "klondike advanced strategy",
    "solitaire statistics",
    "draw 1 vs draw 3 win rate",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/winning-strategies"),
  },
  openGraph: {
    title: "How to Win Solitaire Every Time | Klondike Winning Strategies",
    description:
      "Statistical analysis of Klondike solvability, advanced decision trees, and the strategies that separate 30% win rates from 80%.",
    url: absoluteUrl("/klondike/winning-strategies"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "Can you win Klondike Solitaire every time?",
    answer:
      "No. Computer analysis shows that roughly 79-82% of random Klondike deals are theoretically solvable in Draw 1 mode. The remaining 18-21% are unwinnable no matter how well you play. Unlike FreeCell where 99.999% of deals are solvable, Klondike has a hard mathematical ceiling. However, most players win far below the theoretical maximum, so there is significant room for improvement through better strategy.",
  },
  {
    question: "What is the highest possible win rate in Klondike Solitaire?",
    answer:
      "In Draw 1 with unlimited passes through the stock, the theoretical maximum is around 79-82% — meaning roughly 4 out of 5 deals are solvable with perfect play. In Draw 3, the ceiling drops to around 35-40% because the restricted stock access makes many otherwise-solvable deals impossible. In practice, even expert players fall slightly below these ceilings due to incomplete information about face-down cards.",
  },
  {
    question:
      "What is the most important strategy for winning Klondike Solitaire?",
    answer:
      "The single highest-impact strategy is prioritizing moves that uncover face-down cards. Klondike starts with 21 hidden cards, and every one you reveal improves your decision-making. Combined with balanced foundation building (keeping all four suits within 2 ranks of each other) and careful king placement, this habit alone can improve a beginner's win rate by 20-30 percentage points.",
  },
  {
    question: "Is Draw 1 or Draw 3 Klondike harder to win?",
    answer:
      "Draw 3 is dramatically harder. In Draw 1, you see every card in the stock and can access them individually, yielding theoretical win rates around 79-82%. In Draw 3, you only access every third card, and two-thirds of the stock is blocked on each pass. Expert Draw 3 players win 25-33% of games — roughly a third of the Draw 1 rate. Draw 3 requires stock cycle tracking and manipulation that Draw 1 does not.",
  },
  {
    question: "How many Klondike Solitaire games are unwinnable?",
    answer:
      "Approximately 18-21% of random Klondike deals in Draw 1 mode are mathematically impossible to win, regardless of how well you play. In Draw 3 mode, the percentage of unwinnable deals is higher because the restricted stock access turns some otherwise-solvable deals into dead ends. By comparison, only 1 in about 75,000 FreeCell deals is unsolvable.",
  },
  {
    question:
      "What is stock cycle manipulation in Draw 3 Klondike?",
    answer:
      "Stock cycle manipulation is the technique of deliberately playing a card from the stock — not because you need it, but because removing it shifts the positions of all subsequent cards. This can expose a previously blocked card on your next pass through the stock. It is the single biggest skill differentiator between intermediate and expert Draw 3 players, and can improve Draw 3 win rates by 5-10 percentage points.",
  },
  {
    question: "Does the order of moves matter in Klondike Solitaire?",
    answer:
      "Yes — move order is critical. Playing the same cards in a different sequence can mean the difference between winning and losing. For example, uncovering a face-down card before drawing from the stock might reveal a card that changes your entire drawing strategy. The decision tree in Klondike branches rapidly, and choosing the optimal sequence requires looking 2-4 moves ahead.",
  },
];

export default function KlondikeWinningStrategiesPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Winning Strategies",
        item: absoluteUrl("/klondike/winning-strategies"),
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Win Solitaire Every Time — Klondike Winning Strategies",
    description:
      "Statistical analysis of Klondike solvability and advanced strategies for maximizing win rates.",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
    },
    datePublished: "2026-03-12",
    dateModified: "2026-03-12",
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-3 font-medium">
          <Link href="/klondike" className="hover:text-white transition-colors">
            Klondike Solitaire
          </Link>{" "}
          / Winning Strategies
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Can You Win Solitaire Every Time?
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The statistics behind Klondike solvability, the decision trees that
          separate winners from losers, and the advanced strategies that push win
          rates past 80%.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-8">
        <article className="space-y-10">
          {/* The Numbers */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Numbers: How Many Klondike Games Are Winnable?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The short answer: you cannot win Klondike Solitaire every time.
                No strategy in the world changes this — some deals are
                mathematically impossible. But the gap between what most players
                achieve and what is theoretically possible is enormous, and that
                gap is where strategy lives.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--gold)] mb-4">
                  Klondike Solvability by Mode
                </h3>
                <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-4 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
                    <span>Mode</span>
                    <span>Solvable %</span>
                    <span>Average Win Rate</span>
                    <span>Expert Win Rate</span>
                  </div>
                  <div className="grid grid-cols-4 text-white/70 px-4 py-3 border-b border-white/5">
                    <span>Draw 1 (unlimited)</span>
                    <span className="text-emerald-400">79–82%</span>
                    <span>30–40%</span>
                    <span className="text-emerald-400">70–80%</span>
                  </div>
                  <div className="grid grid-cols-4 text-white/70 px-4 py-3 border-b border-white/5">
                    <span>Draw 3 (unlimited)</span>
                    <span className="text-amber-400">~60–65%</span>
                    <span>10–15%</span>
                    <span className="text-amber-400">25–33%</span>
                  </div>
                  <div className="grid grid-cols-4 text-white/70 px-4 py-3">
                    <span>Vegas (1 pass)</span>
                    <span className="text-red-400">~15–25%</span>
                    <span>5–8%</span>
                    <span className="text-red-400">10–15%</span>
                  </div>
                </div>
                <p className="text-white/40 text-sm mt-3">
                  &quot;Solvable %&quot; is the theoretical ceiling — the percentage of
                  deals that can be won with perfect play and complete
                  information. &quot;Expert Win Rate&quot; reflects top human performance
                  with imperfect information (face-down cards hidden).
                </p>
              </div>

              <p>
                The critical takeaway: in Draw 1, the theoretical ceiling is
                around 80%, but most players win only 30-40% of their games.
                That 40-point gap is pure strategy — and closing it is what this
                guide is about.
              </p>
            </div>
          </section>

          {/* Why Some Deals Can't Be Won */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Some Deals Cannot Be Won
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike is fundamentally different from{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>{" "}
                in one crucial way: hidden information. At the start of every
                Klondike game, 21 cards are face-down in the tableau and 24
                cards are in the stock. You make decisions based on incomplete
                information, and some initial configurations are simply
                deadlocked.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Deadlock Type 1: Circular Dependencies
                  </h3>
                  <p className="text-sm">
                    Card A needs to be placed on Card B, but Card B is buried
                    under Card A. Neither can move first. When these circular
                    dependencies involve cards that cannot be rerouted through
                    the foundations or other columns, the deal is unsolvable.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Deadlock Type 2: Inaccessible Stock Cards (Draw 3)
                  </h3>
                  <p className="text-sm">
                    In Draw 3, certain cards may be permanently trapped behind
                    other cards in the stock cycle. If a critical card (like an
                    ace) is always the second card in a three-card group, and the
                    card in front of it can never be played or moved, that ace is
                    permanently inaccessible. This is why Draw 3 has a lower
                    solvability rate than Draw 1.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Deadlock Type 3: King Burial
                  </h3>
                  <p className="text-sm">
                    When all four kings are deeply buried under face-down cards
                    in columns that cannot be cleared without an empty column,
                    and no empty column can be created without placing a king,
                    the game reaches an irrecoverable state. This is one of the
                    most common reasons Klondike deals fail.
                  </p>
                </div>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mt-3">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Perspective check:</strong> In FreeCell, 99.999% of
                  deals are solvable — only about 1 in 75,000 is impossible. In
                  Klondike, roughly 1 in 5 deals cannot be won. This means that
                  losing a Klondike game does not necessarily mean you played
                  poorly. It might mean the deal was never winnable.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* The Decision Tree */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Winning Decision Tree
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Expert Klondike players do not think in terms of &quot;rules&quot; — they
                think in terms of a decision hierarchy. When you have multiple
                legal moves available, work through this priority list from top
                to bottom. Take the first action that applies.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[var(--gold)] mb-4">
                  Move Priority (Highest to Lowest)
                </h3>
                <ol className="list-decimal pl-5 space-y-4 text-sm">
                  <li>
                    <strong className="text-white/80">
                      Play an ace or two to the foundation.
                    </strong>{" "}
                    These cards serve no purpose on the tableau. Promote them
                    immediately, every time.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Make a move that uncovers a face-down card.
                    </strong>{" "}
                    Information is the most valuable resource in Klondike. If two
                    moves both uncover cards, prefer the one in the column with
                    the most remaining face-down cards.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Play a card from the stock to the tableau if it uncovers a
                      face-down card indirectly.
                    </strong>{" "}
                    Sometimes placing a stock card on the tableau enables a
                    subsequent move that reveals a hidden card.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Move a card to the foundation if it is &quot;safe.&quot;
                    </strong>{" "}
                    A foundation play is safe when both opposite-color cards one
                    rank lower are already on their foundations. This means the
                    card can never be needed as a tableau building target.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Build a tableau sequence that improves column balance.
                    </strong>{" "}
                    Move cards from tall columns to short columns when it does
                    not bury needed cards. Balanced columns give you more
                    options.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Place a king in an empty column — but only the right king.
                    </strong>{" "}
                    Check which color unlocks more buried cards, and verify you
                    have a queen to place on it. No queen available? Consider
                    waiting.
                  </li>
                  <li>
                    <strong className="text-white/80">
                      Draw from the stock.
                    </strong>{" "}
                    Only after all higher-priority moves have been exhausted.
                  </li>
                </ol>
              </div>

              <p>
                This hierarchy is not absolute — edge cases exist. But following
                it as a default produces significantly better results than
                intuition-based play. The key insight is that most players jump
                to step 7 (drawing) far too early, skipping steps 2-5 that
                would have been more productive.
              </p>
            </div>
          </section>

          {/* Advanced Draw 1 Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Advanced Draw 1 Strategy: Approaching the 80% Ceiling
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Draw 1 is the mode where strategy matters most, because you have
                full access to every stock card. The gap between average players
                (30-40% win rate) and expert players (70-80%) is almost entirely
                due to the following techniques.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    Technique 1: The Full-Stock Scan
                  </h3>
                  <p className="text-sm">
                    Before committing to any major strategic decision (king
                    placement, column clearing, foundation building), cycle
                    through the entire stock to see what is available. This
                    reconnaissance pass costs nothing in Draw 1 (unlimited
                    passes) and gives you near-complete information. Plan your
                    game around what you know is coming, not what you hope is
                    coming.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    Technique 2: Deferred Foundation Building
                  </h3>
                  <p className="text-sm">
                    In the early game, resist the urge to send every playable
                    card to the foundation. Cards ranked 3 and above may be
                    needed as tableau building targets. Send aces and twos up
                    immediately, but hold threes, fours, and fives until you are
                    confident they are not needed on the tableau. Use the
                    &quot;two-rank safety check&quot;: promote a card only when both
                    opposite-color cards one rank lower are already on the
                    foundation.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    Technique 3: Column Clearing Priority
                  </h3>
                  <p className="text-sm">
                    Not all columns are equally important to clear. Rank your
                    seven columns by the number of face-down cards: columns 6
                    and 7 (with 5 and 6 face-down cards respectively) are your
                    highest-priority targets. Clearing a column with 6 hidden
                    cards gives you 6 pieces of new information plus an empty
                    column for king placement. Clearing a column with 1 hidden
                    card gives you only 1 piece of information.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    Technique 4: Parallel Sequence Building
                  </h3>
                  <p className="text-sm">
                    Rather than building one long sequence in a single column,
                    maintain 2-3 shorter sequences across multiple columns. This
                    preserves flexibility — short sequences can be rearranged,
                    combined, or redirected as new information is revealed. A
                    single long sequence from K down to 3 looks impressive but
                    locks you into one building path.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-2">
                    Technique 5: The Endgame Shift
                  </h3>
                  <p className="text-sm">
                    Once all face-down cards are revealed, the game changes
                    fundamentally. You now have complete information and can
                    determine with certainty whether the deal is solvable. At
                    this point, switch from &quot;maximize information&quot; to
                    &quot;optimize execution&quot;: build foundations evenly, work from the
                    bottom of each pile, and clear columns systematically.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Advanced Draw 3 Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Advanced Draw 3 Strategy: Beating the Odds
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Draw 3 is a fundamentally different game from Draw 1. The
                restricted stock access creates a constraint that demands
                entirely different skills. Winning 25-33% of Draw 3 games
                represents elite-level play, and reaching that level requires
                mastering stock manipulation.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Understanding the Stock Cycle
              </h3>
              <p>
                In Draw 3, the 24 stock cards are divided into 8 groups of 3.
                On each pass, you see all 24 cards but can only directly access
                8 of them (the top card of each group). The other 16 are blocked
                by the cards in front of them.
              </p>
              <p>
                Critically, the cycle is stable: the same cards appear in the
                same positions on every pass — unless you play a card, which
                shifts all subsequent positions by one. This shift is the key to
                advanced Draw 3 play.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mt-4">
                <h3 className="text-lg font-bold text-[var(--gold)] mb-3">
                  Stock Manipulation: The Core Draw 3 Skill
                </h3>
                <div className="space-y-3 text-sm">
                  <p>
                    Stock manipulation means playing a card from the stock not
                    because you need it right now, but because removing it
                    changes the cycle to give you access to a more valuable card
                    on the next pass.
                  </p>
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <p className="text-white/50 font-mono text-xs mb-2">
                      EXAMPLE: Stock cycle (showing accessible cards in CAPS)
                    </p>
                    <p className="text-white/60 mb-2">
                      Pass 1: [x, x, 7♣] [x, x, J♦] [x, x, A♥] [x, x, 5♠]
                      ...
                    </p>
                    <p className="text-white/60 mb-2">
                      The A♥ is accessible, but so is the J♦. If you play the
                      J♦ (even if you do not need it), the cycle shifts:
                    </p>
                    <p className="text-white/60 mb-2">
                      Pass 2: [x, x, 7♣] [x, x, 3♠] [x, x, A♥] [x, x, 9♦]
                      ...
                    </p>
                    <p className="text-white/60">
                      Now 3♠ is accessible where J♦ used to be, and the rest of
                      the cycle has shifted. Advanced players use this technique
                      to &quot;reach&quot; cards that would otherwise be permanently
                      blocked.
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-6">
                Draw 3 Mental Tracking
              </h3>
              <p>
                You do not need to memorize all 24 stock cards. Track only the
                critical ones:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li>
                  <strong className="text-white/80">Aces:</strong> Where are
                  they in the cycle? Can you reach them directly, or do you need
                  to manipulate the cycle?
                </li>
                <li>
                  <strong className="text-white/80">Kings:</strong> If you need
                  a king for an empty column, where is it? Is it accessible?
                </li>
                <li>
                  <strong className="text-white/80">Target cards:</strong> If
                  you are building a specific sequence and need, say, the 8♥,
                  track its position in the cycle.
                </li>
                <li>
                  <strong className="text-white/80">Blocker cards:</strong>{" "}
                  Which cards are sitting on top of the cards you need? Can you
                  play those blockers to shift the cycle?
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-6">
                Conservative Foundation Play
              </h3>
              <p>
                In Draw 3, every card you send to the foundation is a card you
                can never get back. Since stock access is limited, you may need
                tableau cards as building targets for longer than you would in
                Draw 1. Apply the{" "}
                <Link
                  href="/klondike/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  two-rank safety check
                </Link>{" "}
                more strictly in Draw 3: only promote a card when you are
                certain it will not be needed on the tableau.
              </p>
            </div>
          </section>

          {/* Measuring Your Progress */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Measuring Your Progress
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Win rate alone does not tell the full story. Track these metrics
                to understand where your game is improving and where it still
                needs work.
              </p>

              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">
                      Win Rate (over 50+ games)
                    </h3>
                    <p className="text-sm">
                      Track your win rate in blocks of 50 games for statistical
                      significance. Short-term streaks mean little — Klondike
                      has enough variance that even expert players hit 5-game
                      losing streaks regularly.
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <span className="text-white/40 block">Beginner</span>
                        <span className="text-white/70 font-bold text-lg">
                          15–25%
                        </span>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <span className="text-white/40 block">
                          Intermediate
                        </span>
                        <span className="text-amber-400 font-bold text-lg">
                          40–55%
                        </span>
                      </div>
                      <div className="bg-white/[0.03] rounded-lg p-3 text-center">
                        <span className="text-white/40 block">Expert</span>
                        <span className="text-emerald-400 font-bold text-lg">
                          70–80%
                        </span>
                      </div>
                    </div>
                    <p className="text-white/30 text-xs mt-2 text-center">
                      Draw 1, unlimited passes
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">
                      Cards Placed per Game
                    </h3>
                    <p className="text-sm">
                      Even in games you lose, track how many cards you placed on
                      the foundations. Rising from an average of 20 placed cards
                      to 35 means your strategy is improving, even if your win
                      rate has not caught up yet.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                    <h3 className="font-semibold text-[#D4AF37] mb-2">
                      Face-Down Cards Revealed
                    </h3>
                    <p className="text-sm">
                      Track how many of the 21 face-down cards you reveal per
                      game. Consistently revealing 18+ means your uncovering
                      priorities are strong. Consistently below 12 suggests you
                      are building sequences instead of uncovering information.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Common Strategic Errors */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 5 Strategic Errors That Kill Win Rates
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                These are not beginner mistakes — they are errors that
                intermediate players make consistently, and fixing them is what
                separates 40% win rates from 70%.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Error 1: Premature Foundation Building
                  </h3>
                  <p className="text-sm">
                    Racing cards to the foundation feels productive but often
                    removes cards you need on the tableau. A 5♠ on the
                    foundation cannot serve as a landing spot for the 4♥. Every
                    card you promote above rank 2 should pass the two-rank
                    safety check: are both opposite-color cards one rank lower
                    already on the foundation?
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Error 2: Sequence Building Over Card Revealing
                  </h3>
                  <p className="text-sm">
                    Building a neat K-Q-J-10-9-8 sequence is satisfying but
                    meaningless if three columns still have unexplored face-down
                    cards. Sequences are means, not ends — their purpose is to
                    enable card reveals and foundation plays. If a sequence does
                    not advance either goal, it is wasted effort.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Error 3: Filling Empty Columns With the Wrong King
                  </h3>
                  <p className="text-sm">
                    An empty column is a one-time resource — once you place a
                    king, that column is committed to a specific color pattern
                    for the rest of the game. Placing a red king when a black
                    king would have unlocked more buried cards is a mistake that
                    compounds over the next 20-30 moves. Always check both
                    options before committing.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Error 4: Drawing Before Exhausting Tableau Moves
                  </h3>
                  <p className="text-sm">
                    Every tableau move you skip by drawing early is a missed
                    opportunity. In Draw 3 especially, each stock cycle is
                    precious — do not waste it by drawing before you have made
                    every productive move on the board. Develop the habit of
                    scanning all seven columns before reaching for the stock.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Error 5: Ignoring the Stock Cycle (Draw 3)
                  </h3>
                  <p className="text-sm">
                    In Draw 3, playing blindly through the stock is like driving
                    with your eyes closed. You do not need to memorize every
                    card, but you should track aces, kings, and the 2-3 cards
                    you need most. This awareness alone improves Draw 3 win
                    rates by 5-10 percentage points.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Deliberate Practice */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Deliberate Practice: How to Actually Improve
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Playing more games is not enough — you need to play
                deliberately. These practice techniques are how experienced
                players continue to improve even after thousands of games.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Post-Mortem Analysis
                  </h3>
                  <p className="text-sm">
                    After losing a game, use undo to trace back to the move that
                    killed it. Was it a bad king placement? A premature
                    foundation play? Drawing when a tableau move was available?
                    Identifying the critical error is more valuable than winning
                    ten easy games. Keep a mental (or written) log of your most
                    common mistakes.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    The Pause Habit
                  </h3>
                  <p className="text-sm">
                    Before every move, pause for 2-3 seconds and ask: &quot;Is
                    there a better move?&quot; This single habit catches the
                    majority of strategic errors. Speed is not a virtue in
                    Klondike — thoughtful play always beats fast play. Time
                    yourself: if you are finishing games in under 2 minutes, you
                    are not thinking enough.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Mode Graduation
                  </h3>
                  <p className="text-sm">
                    Start with Draw 1 and play 100 games while tracking your win
                    rate. When you consistently hit 60%+, switch to Draw 3. The
                    skills transfer, but Draw 3 adds stock management on top of
                    tableau strategy. If your Draw 3 rate plateaus, go back to
                    Draw 1 and focus on the{" "}
                    <Link
                      href="/klondike/strategy"
                      className="text-[#D4AF37] hover:underline"
                    >
                      core principles
                    </Link>{" "}
                    — weaknesses in fundamental strategy are easier to identify
                    in Draw 1.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Replay Difficult Deals
                  </h3>
                  <p className="text-sm">
                    When you lose a deal that felt close to winnable, replay it
                    with a completely different approach. Place a different king,
                    build foundations in a different order, or prioritize
                    different columns. If you win on the second attempt, compare
                    the two lines of play to understand what made the difference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Klondike vs FreeCell comparison */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Klondike vs FreeCell: A Solvability Comparison
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                If you are frustrated by Klondike&apos;s unsolvable deals,
                understanding how it compares to other solitaire games can put
                things in perspective.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
                  <span>Game</span>
                  <span>Solvable Deals</span>
                  <span>Skill Factor</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
                  <span>
                    <Link href="/" className="text-[#D4AF37] hover:underline">
                      FreeCell
                    </Link>
                  </span>
                  <span className="text-emerald-400">99.999%</span>
                  <span>Very High</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
                  <span>Klondike (Draw 1)</span>
                  <span className="text-amber-400">79–82%</span>
                  <span>High</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
                  <span>Klondike (Draw 3)</span>
                  <span className="text-amber-400">~60–65%</span>
                  <span>High</span>
                </div>
                <div className="grid grid-cols-3 text-white/70 px-4 py-3">
                  <span>
                    <Link
                      href="/spider"
                      className="text-[#D4AF37] hover:underline"
                    >
                      Spider (4-suit)
                    </Link>
                  </span>
                  <span className="text-red-400">~33%</span>
                  <span>Very High</span>
                </div>
              </div>

              <p>
                The key difference is information. FreeCell shows you every card
                from the start — it is almost purely strategic. Klondike hides
                21 cards, making luck a real factor. Spider Solitaire falls
                somewhere in between, with the added complexity of suit-based
                building. For a detailed comparison, see{" "}
                <Link
                  href="/freecell-vs-klondike"
                  className="text-[#D4AF37] hover:underline"
                >
                  FreeCell vs Klondike
                </Link>
                .
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* CTA */}
          <section className="text-center">
            <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 rounded-xl p-8">
              <h2
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Test Your Strategy
              </h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                The best way to improve is deliberate practice. Apply these
                strategies to your next 50 games and track your progress.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/klondike"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
                >
                  Play Klondike Solitaire →
                </Link>
                <Link
                  href="/klondike/strategy"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white/80 font-medium rounded-lg transition-colors"
                >
                  Strategy Guide
                </Link>
              </div>
            </div>
          </section>

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link
                href="/klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Play Klondike Solitaire
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Play online for free, no download
                </p>
              </Link>
              <Link
                href="/klondike/how-to-play"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  How to Play Klondike
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Complete rules and setup guide
                </p>
              </Link>
              <Link
                href="/klondike/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Strategy Guide
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Core principles and tactical frameworks
                </p>
              </Link>
              <Link
                href="/klondike/tips"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Tips & Tricks
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Quick, practical tips for all levels
                </p>
              </Link>
              <Link
                href="/freecell-vs-klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  FreeCell vs Klondike
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Head-to-head comparison
                </p>
              </Link>
              <Link
                href="/spider/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Spider Strategy
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Strategy guide for Spider Solitaire
                </p>
              </Link>
              <Link
                href="/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  FreeCell Strategy
                </span>
                <p className="text-sm text-white/40 mt-1">
                  FreeCell tips and techniques
                </p>
              </Link>
              <Link
                href="/solitaire-types"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Types of Solitaire
                </span>
                <p className="text-sm text-white/40 mt-1">
                  20 solitaire variants compared
                </p>
              </Link>
              <Link
                href="/"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">
                  Play FreeCell
                </span>
                <p className="text-sm text-white/40 mt-1">
                  The classic strategic solitaire
                </p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
