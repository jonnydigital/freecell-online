import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "../../../components/ContentLayout";
import AdUnit from "../../../components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire Strategy Guide | How to Win More Games in 2026",
  description:
    "Master Klondike Solitaire with our in-depth strategy guide. Learn when to draw vs play, king placement tactics, ace management, and Draw 1 vs Draw 3 strategies. Improve your win rate today.",
  keywords: [
    "klondike solitaire strategy",
    "solitaire strategy",
    "how to win solitaire",
    "klondike strategy guide",
    "solitaire winning strategy",
    "draw 1 vs draw 3 strategy",
    "klondike solitaire tips",
    "solitaire strategy guide",
    "how to win klondike solitaire",
    "best solitaire strategy",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/strategy"),
  },
  openGraph: {
    title: "Klondike Solitaire Strategy Guide | How to Win More Games",
    description:
      "Expert strategies for Klondike Solitaire. Learn Draw 1 vs Draw 3 tactics, king placement, ace management, and tableau building. Win more games starting today.",
    url: absoluteUrl("/klondike/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Klondike Solitaire?",
    answer:
      "The best Klondike strategy combines several principles: always play aces and twos to the foundation immediately, prioritize uncovering face-down cards over other moves, keep tableau columns balanced, place kings strategically in empty columns (choose the color that unblocks the most buried cards), and avoid drawing from the stock when productive tableau moves remain. In Draw 3, also pay attention to the stock cycle to access buried cards.",
  },
  {
    question: "Is Draw 1 or Draw 3 Klondike easier to win?",
    answer:
      "Draw 1 is significantly easier. With Draw 1, you see every card in the stock and can access them individually, giving you roughly a 79-82% win rate with solid play. Draw 3 limits your access to every third card and typically yields a 10-30% win rate depending on skill. Draw 1 is recommended for learning strategy, while Draw 3 is the classic challenge.",
  },
  {
    question: "What percentage of Klondike Solitaire games are winnable?",
    answer:
      "Computer analysis suggests that roughly 79-82% of random Klondike deals are theoretically solvable in Draw 1 mode. For Draw 3, the figure drops because the restricted stock access means many solvable deals become unwinnable in practice. Unlike FreeCell where 99.999% of deals are solvable, Klondike has a significant luck component — some deals simply cannot be won regardless of how well you play.",
  },
  {
    question: "Should I always move aces to the foundation in Klondike?",
    answer:
      "Aces and twos should almost always go to the foundation immediately — they serve no useful purpose on the tableau. For threes and above, pause and check whether the card is needed as a landing spot for building alternating-color sequences on the tableau. Sending a red 4 to the foundation when you need it to place a black 3 can cost you the game.",
  },
  {
    question: "How important are empty columns in Klondike?",
    answer:
      "Empty columns are extremely valuable in Klondike because only kings can be placed in them, and a well-chosen king can become the anchor for an entire tableau sequence. However, unlike FreeCell or Spider, you cannot place just any card in an empty column — only kings. This makes the decision of which king to place (and whether to fill the column at all) a critical strategic choice.",
  },
  {
    question: "When should I draw from the stock in Klondike?",
    answer:
      "Draw from the stock when you have exhausted all productive moves on the tableau. Productive moves include: uncovering face-down cards, building useful sequences, moving aces and twos to the foundation, and freeing columns for king placement. Drawing too early means missing tableau moves that would have been more beneficial.",
  },
  {
    question: "What is the biggest mistake in Klondike Solitaire?",
    answer:
      "The biggest mistake is building foundations unevenly — racing one suit to the top while others languish. This removes cards from the tableau that you need for building alternating-color sequences. Keep foundations roughly balanced (within 2 ranks of each other) to maintain tableau flexibility. The second biggest mistake is placing the wrong king in an empty column.",
  },
];

export default function KlondikeStrategyPage() {
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
        name: "Strategy",
        item: absoluteUrl("/klondike/strategy"),
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire Strategy Guide",
    description:
      "Expert strategies for winning more Klondike Solitaire games, covering Draw 1 and Draw 3 tactics.",
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
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2665"}
        </div>

        <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-3 font-medium">
          <Link href="/klondike" className="hover:text-white transition-colors">
            Klondike Solitaire
          </Link>{" "}
          / Strategy
        </p>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Klondike Solitaire Strategy Guide
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Expert strategies for Draw 1 and Draw 3 Klondike. Learn the principles that
          separate consistent winners from players stuck at 30%.
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
          {/* Win Rate Context */}
          <section>
            <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
                Win Rate Expectations
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Before diving into strategy, set realistic expectations. Klondike Solitaire
                has a significant luck component — not every deal is winnable.
              </p>
              <div className="overflow-x-auto">
                <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
                    <span>Mode</span>
                    <span>Good Win Rate</span>
                    <span>Expert Win Rate</span>
                  </div>
                  <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
                    <span>Draw 1</span>
                    <span>60–70%</span>
                    <span className="text-emerald-400">79–82%</span>
                  </div>
                  <div className="grid grid-cols-3 text-white/70 px-4 py-3">
                    <span>Draw 3</span>
                    <span>15–20%</span>
                    <span className="text-amber-400">25–33%</span>
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-sm mt-3">
                These numbers assume thoughtful play. Speed-playing without thinking
                produces much lower rates.
              </p>
            </div>
          </section>

          {/* Core Principles */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Core Strategic Principles
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike Solitaire rewards a specific set of habits that apply regardless
                of whether you play Draw 1 or Draw 3. These five principles form the
                foundation of winning play.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Principle 1: Uncover Face-Down Cards First
                  </h3>
                  <p className="text-sm">
                    Klondike starts with 21 face-down cards across the seven tableau piles.
                    These hidden cards are the biggest obstacle to winning — you cannot plan
                    around cards you cannot see. When choosing between two otherwise equal
                    moves, always pick the one that flips a face-down card. Prioritize
                    columns with the most hidden cards, since those represent the greatest
                    information gaps.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Principle 2: Keep Foundations Balanced
                  </h3>
                  <p className="text-sm">
                    It is tempting to race one suit to the top of its foundation pile. Resist
                    this urge. Building foundations unevenly removes cards from the tableau
                    that you need for alternating-color sequences. If your spades foundation
                    is at 7 but hearts is at 2, you have removed five black cards that could
                    have been used as landing spots for red cards. Aim to keep all four
                    foundations within 2 ranks of each other.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Principle 3: Think Before You King
                  </h3>
                  <p className="text-sm">
                    Kings are the only cards that can fill empty tableau columns. This makes
                    king placement one of the most important decisions in Klondike. Before
                    placing a king, consider which color unblocks the most buried cards. A red
                    king lets you build black queens, jacks, and so on — meaning it helps uncover
                    cards trapped beneath black cards. Choose the king color that creates the
                    most useful building opportunities for your current board state.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Principle 4: Do Not Build Empty Columns Without a King
                  </h3>
                  <p className="text-sm">
                    An empty column in Klondike is only useful if you have a king to fill it
                    (or are about to uncover one). Unlike{" "}
                    <Link href="/" className="text-[#D4AF37] hover:underline">
                      FreeCell
                    </Link>{" "}
                    or{" "}
                    <Link href="/spider" className="text-[#D4AF37] hover:underline">
                      Spider Solitaire
                    </Link>
                    , you cannot place any card in an empty Klondike column. Creating an
                    empty column without a king to fill it is usually wasteful — you have
                    removed building space from the tableau for no immediate benefit.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Principle 5: Exhaust Tableau Moves Before Drawing
                  </h3>
                  <p className="text-sm">
                    Every time you draw from the stock, you skip over tableau moves that
                    might have been more valuable. Before drawing, scan the entire board: are
                    there face-down cards you can uncover? Can you build any useful sequences?
                    Are there aces or twos to send to the foundation? Only draw when you have
                    genuinely run out of productive tableau plays.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Drawing Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              When to Draw vs When to Play
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The stock pile is your lifeline in Klondike — it contains the 24 cards not
                dealt to the tableau. Managing when and how you draw from it is a core
                strategic skill.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3">
                <h3 className="font-semibold text-green-400">Play first when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Any tableau move uncovers a face-down card</li>
                  <li>You can send an ace or two directly to the foundation</li>
                  <li>A move creates a useful building sequence without burying needed cards</li>
                  <li>You can free a column for a king that is ready to be placed</li>
                  <li>Moving a card from one pile to another extends two sequences at once</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3 mt-3">
                <h3 className="font-semibold text-amber-400">Draw when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>No tableau moves uncover hidden cards</li>
                  <li>All available moves would bury cards you need later</li>
                  <li>You are waiting for a specific card to continue a sequence</li>
                  <li>The stock has not been cycled through yet and you need to see what is available</li>
                </ul>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mt-3">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Key insight:</strong> In Klondike, drawing is not a failure — it
                  is a necessary part of the game. Unlike Spider Solitaire where dealing is
                  always a last resort, Klondike&apos;s stock is a regular source of playable
                  cards. The skill is in knowing when to stop drawing and start building.
                </p>
              </div>
            </div>
          </section>

          {/* Tableau Building */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Building Tableau Sequences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The tableau is where Klondike is won or lost. Building effective
                alternating-color, descending sequences is the core mechanical skill.
                Here are the key tactical considerations:
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Long Sequences vs Short Sequences
              </h3>
              <p>
                A long tableau sequence (K-Q-J-10-9-8-7-6-5-4-3-2) is a completed column
                that can only grow through foundation play. Short, flexible sequences are
                often more useful in the early and mid-game because they can be
                rearranged more easily. Do not obsess over building one perfect column —
                spread your building across multiple piles to maximize flexibility.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Color Alternation Traps
              </h3>
              <p>
                Klondike requires alternating red and black cards in tableau sequences.
                This means a red king locks you into a specific pattern: red K, black Q,
                red J, black 10, and so on. If most of your useful cards are the wrong
                color for the sequence you are building, you will stall. Before committing
                to a long build, glance at the visible cards and the stock to check
                whether the alternating pattern is achievable.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Moving Partial Sequences
              </h3>
              <p>
                In Klondike, you can move an entire properly-ordered sequence from one
                column to another (unlike some variants that restrict this). Use this to
                your advantage: if moving a sequence from column A to column B uncovers a
                face-down card in column A, that is almost always worth doing, even if it
                makes column B taller. Tall columns are not a problem — buried face-down
                cards are.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Aces-and-Twos Rule
              </h3>
              <p>
                Aces and twos should go to the foundation immediately. They serve no
                purpose on the tableau — no card can be placed on top of an ace, and a two
                can only hold an ace (which should already be on the foundation). Sending
                them up costs nothing and clears space. For threes and above, check whether
                the card is needed as a tableau building target before promoting it.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* King Placement */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              King Placement Strategy
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                King placement is arguably the single highest-leverage decision in
                Klondike. A well-placed king can anchor a sequence that clears half the
                board. A poorly placed king can lock you into a dead end.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-3">
                  The King Decision Framework
                </h3>
                <ol className="list-decimal pl-5 space-y-3 text-sm">
                  <li>
                    <strong className="text-white/80">Check which color unblocks more cards.</strong>{" "}
                    A red king lets you build black Q, red J, black 10, etc. A black king
                    gives you red Q, black J, red 10, etc. Look at your buried cards — which
                    color chain helps you uncover the most face-down cards?
                  </li>
                  <li>
                    <strong className="text-white/80">Check which queen you can place.</strong>{" "}
                    A king in an empty column does nothing until you place a queen on it.
                    If you have a black queen available, place a red king. If you have a red
                    queen, place a black king. No available queen? Consider waiting.
                  </li>
                  <li>
                    <strong className="text-white/80">Consider both kings if you have a choice.</strong>{" "}
                    If both a red and black king are available, pick the one whose subsequent
                    building sequence best serves your current position. This is the moment
                    to think 3-4 moves ahead.
                  </li>
                  <li>
                    <strong className="text-white/80">Do not place a king just to fill a column.</strong>{" "}
                    Sometimes an empty column is better left empty until the right king
                    appears. Filling it with the wrong king wastes the column permanently.
                  </li>
                </ol>
              </div>

              <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 mt-3">
                <p className="text-red-300/80 text-sm">
                  <strong>Common mistake:</strong> Players often grab the first king they see
                  and dump it into an empty column. This is one of the most damaging habits in
                  Klondike. A king placed without thought can lock you out of the entire column
                  for the rest of the game.
                </p>
              </div>
            </div>
          </section>

          {/* Ace & Foundation Management */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ace and Foundation Management
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The foundations are where you win the game — all 52 cards must end up there.
                But the order in which you build the foundations matters more than most
                players realize.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Balance Rule
              </h3>
              <p>
                Keep your four foundation piles within 2 ranks of each other. If spades are
                at 6 and diamonds are at 2, you have removed four black cards (3♠ through
                6♠) that could be serving as landing spots for red cards on the tableau.
                This &quot;foundation gap&quot; limits your building options and can stall the game.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Safe vs Risky Foundation Plays
              </h3>
              <p>
                A foundation play is <strong className="text-white/80">safe</strong> when the
                card you are promoting is no longer needed as a tableau building target.
                Specifically, it is safe when both cards of the opposite color and one rank
                lower are already on the foundations. For example, promoting the 5♠ is safe
                if both the 4♥ and 4♦ are already on their foundations — because no red card
                will ever need the 5♠ as a landing spot.
              </p>
              <p>
                A foundation play is <strong className="text-white/80">risky</strong> when the
                card might still be needed on the tableau. Promoting the 5♠ when the 4♥ is
                still in the stock or buried means you might later need to place the 4♥ on
                a black 5 — and you just sent the only visible one to the foundation.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The &quot;Two-Rank&quot; Safety Check
              </h3>
              <p>
                A quick mental shortcut: before sending a card to the foundation, check
                whether both opposite-color cards two ranks below are already on the
                foundation. If they are, the play is safe. If not, pause and consider
                whether you might need the card later.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Draw 1 vs Draw 3 */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Draw 1 vs Draw 3: Strategy Differences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                While the core principles apply to both modes, Draw 1 and Draw 3 require
                different tactical approaches due to how you access the stock pile.
              </p>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-emerald-400 mb-3">
                    Draw 1 Strategy
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-3 text-sm">
                    In Draw 1, you flip one card at a time and can access every card in the
                    stock. This gives you near-complete information and maximum flexibility.
                    Win rates of 79-82% are achievable.
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2 text-sm">
                    <li>Play more aggressively — you will see every stock card</li>
                    <li>Use the stock as a planning tool: cycle through once to see what is available</li>
                    <li>Build foundations more freely since you can access any stock card</li>
                    <li>Focus on tableau optimization since stock access is not a constraint</li>
                    <li>Empty columns matter less — you can always find a king in the stock</li>
                  </ul>
                </div>

                <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
                  <h3 className="text-lg font-bold text-amber-400 mb-3">
                    Draw 3 Strategy
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-3 text-sm">
                    In Draw 3, you flip three cards and can only play the top one. Two-thirds
                    of the stock is inaccessible on any given pass. This demands careful stock
                    management. Win rates of 25-33% represent expert play.
                  </p>
                  <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2 text-sm">
                    <li>Track the stock cycle — know which cards appear every 3 flips</li>
                    <li>Sometimes skip a playable stock card to access a more valuable card behind it</li>
                    <li>Playing a card changes the stock order — plan around this</li>
                    <li>Build foundations conservatively; you may not get the card back</li>
                    <li>Empty columns are more precious since kings are harder to access</li>
                  </ul>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white/80 mt-6">
                The Draw 3 Stock Cycle
              </h3>
              <p>
                In Draw 3, the stock is divided into groups of three. On each pass through
                the stock, you see the same cards in the same positions (unless you play one,
                which shifts the cycle). Expert Draw 3 players memorize the position of key
                cards in the stock cycle and plan their draws to access them.
              </p>
              <p>
                For example, if the ace of hearts is the second card in a group of three,
                you need to play the card on top of it (or rearrange the cycle by playing a
                different stock card) to access the ace. This kind of stock manipulation is
                what separates 15% win rates from 30% win rates in Draw 3.
              </p>
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Even experienced Klondike players fall into these traps. Being aware of
                them is the first step to eliminating them from your play.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 1: Uneven Foundation Building
                  </h3>
                  <p className="text-sm">
                    Racing one suit high while others are low removes cards you need for
                    tableau building. The 7♠ on the foundation cannot serve as a landing spot
                    for the 6♥. Keep foundations balanced within 2 ranks.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 2: Wrong King in Empty Column
                  </h3>
                  <p className="text-sm">
                    Placing the wrong color king locks you into a building pattern that may
                    not serve your board. Always consider which queen you can place on the
                    king and what that sequence unblocks.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 3: Ignoring Face-Down Cards
                  </h3>
                  <p className="text-sm">
                    Building neat sequences while ignoring columns full of hidden cards is a
                    common trap. That tidy 8-card sequence means nothing if three columns
                    remain unexplored. Prioritize uncovering hidden cards over cosmetic
                    organizing.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 4: Drawing Before Exhausting Tableau Moves
                  </h3>
                  <p className="text-sm">
                    Every productive tableau move you skip by drawing early is an opportunity
                    lost. The stock will still be there after you make your tableau plays.
                    Scan the full board before reaching for the stock.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 5: Not Tracking the Stock (Draw 3)
                  </h3>
                  <p className="text-sm">
                    In Draw 3, playing blindly through the stock wastes your most constrained
                    resource. Pay attention to which cards appear at which positions. Even
                    rough mental tracking of aces and kings significantly improves your play.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Advanced Techniques */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Advanced Techniques
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Opening Scan
              </h3>
              <p>
                Before making your first move, survey the entire tableau. Identify where
                the aces are (visible or potentially buried), which columns have the fewest
                face-down cards, and which kings and queens are available. This 10-second
                scan prevents the most common early-game mistakes and gives you a roadmap
                for your first 5-10 moves.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Column Priority Ranking
              </h3>
              <p>
                Rank your seven tableau columns by how many face-down cards they contain.
                Columns with more hidden cards should receive higher priority for
                uncovering. The seventh column (6 face-down cards) is your biggest
                liability — getting it cleared early dramatically improves your win chances.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The &quot;What If&quot; Technique
              </h3>
              <p>
                Before each move, mentally play out the next 2-3 moves that follow from
                it. &quot;If I move this 7 onto that 8, it uncovers a card. If that card is
                useful, I continue. If not, was the move still worth it for the information?&quot;
                This habit catches bad moves before you make them and is especially important
                in{" "}
                <Link href="/klondike/winning-strategies" className="text-[#D4AF37] hover:underline">
                  advanced play
                </Link>.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Stock Manipulation (Draw 3)
              </h3>
              <p>
                In Draw 3, every card you play from the stock shifts the cycle for every
                subsequent pass. Advanced players deliberately play certain stock cards not
                because they need them, but because removing them gives access to a more
                valuable card on the next pass. This technique — called stock manipulation —
                is the single biggest skill gap between intermediate and expert Draw 3
                players.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Endgame Recognition
              </h3>
              <p>
                When all face-down cards are revealed and the stock is exhausted (or fully
                known), the game shifts from strategy to execution. At this point, the game
                is either solvable or not. If it is solvable, play methodically: build
                foundations evenly, do not leave needed cards buried in long sequences, and
                work from the bottom of each pile upward.
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
                <span className="text-[#D4AF37] font-semibold">Play Klondike Solitaire</span>
                <p className="text-sm text-white/40 mt-1">Play online for free, no download</p>
              </Link>
              <Link
                href="/klondike/how-to-play"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">How to Play Klondike</span>
                <p className="text-sm text-white/40 mt-1">Complete rules and setup guide</p>
              </Link>
              <Link
                href="/klondike/tips"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Klondike Tips & Tricks</span>
                <p className="text-sm text-white/40 mt-1">Quick, practical tips for all levels</p>
              </Link>
              <Link
                href="/klondike/winning-strategies"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Winning Strategies</span>
                <p className="text-sm text-white/40 mt-1">Advanced tactics for higher win rates</p>
              </Link>
              <Link
                href="/freecell-vs-klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell vs Klondike</span>
                <p className="text-sm text-white/40 mt-1">Head-to-head comparison</p>
              </Link>
              <Link
                href="/spider/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Spider Strategy</span>
                <p className="text-sm text-white/40 mt-1">Strategy guide for Spider Solitaire</p>
              </Link>
              <Link
                href="/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell Strategy</span>
                <p className="text-sm text-white/40 mt-1">FreeCell tips and techniques</p>
              </Link>
              <Link
                href="/solitaire-types"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Types of Solitaire</span>
                <p className="text-sm text-white/40 mt-1">20 solitaire variants compared</p>
              </Link>
              <Link
                href="/"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Play FreeCell</span>
                <p className="text-sm text-white/40 mt-1">The classic strategic solitaire</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
