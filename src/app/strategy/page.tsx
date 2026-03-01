import Link from "next/link";
import type { Metadata } from "next";
import AdUnit from "../../components/AdUnit";

export const metadata: Metadata = {
  title: "FreeCell Strategy Guide | How to Win FreeCell — Beginner to Expert Tips",
  description:
    "Master FreeCell with this in-depth strategy guide. Learn beginner fundamentals, intermediate supermove tactics, advanced endgame techniques, and common mistakes that cost you games. 2500+ words of expert FreeCell strategy.",
  keywords: [
    "freecell strategy",
    "how to win freecell",
    "freecell tips and tricks",
    "freecell expert guide",
    "freecell tips",
    "freecell guide",
    "freecell winning strategy",
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "FreeCell Strategy Guide — Beginner to Expert",
  description:
    "A comprehensive guide to winning FreeCell solitaire, covering beginner fundamentals through advanced endgame techniques.",
  author: { "@type": "Organization", name: "PlayFreeCellOnline.com" },
  publisher: { "@type": "Organization", name: "PlayFreeCellOnline.com" },
  datePublished: "2026-02-15",
  dateModified: "2026-03-01",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What percentage of FreeCell games are winnable?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Approximately 99.999% of FreeCell deals are solvable. Out of the original 32,000 Microsoft FreeCell deals, only deal #11982 is proven unsolvable. With perfect play, you should be able to win nearly every game you encounter.",
      },
    },
    {
      "@type": "Question",
      name: "What is a supermove in FreeCell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A supermove is the ability to move multiple cards at once between columns. The number of cards you can move equals (1 + number of empty free cells) × 2^(number of empty columns). For example, with 2 empty free cells and 1 empty column, you can move (1+2)×2 = 6 cards at once.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use free cells or empty columns?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Empty columns are almost always more valuable than free cells. An empty column can hold an entire sequence of cards and doubles your supermove capacity, while a free cell holds only one card. Prioritize keeping columns empty whenever possible.",
      },
    },
    {
      "@type": "Question",
      name: "How do I get better at FreeCell?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best way to improve is: (1) Always scan the full board before your first move, (2) Plan 3-5 moves ahead, (3) Prioritize uncovering aces and twos, (4) Keep free cells and columns open as long as possible, and (5) Practice with our Streak mode to build consistency.",
      },
    },
    {
      "@type": "Question",
      name: "When should I start moving cards to foundations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Move aces and twos to foundations immediately — there is never a reason to keep them in play. For threes and above, only move them to foundations when both cards of the opposite color and one rank lower are already on foundations. For example, move the 5 of hearts to the foundation only when both the 4 of spades and 4 of clubs are already there.",
      },
    },
  ],
};

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-[#D4AF37] selection:text-white scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── Header ── */}
      <header className="bg-[#072907] text-white pt-16 pb-24 px-6 flex flex-col items-center text-center">
        <Link
          href="/"
          className="text-sm font-black uppercase tracking-widest mb-8 hover:text-[#D4AF37] transition-colors"
        >
          Freecell<span className="text-[#D4AF37]">.</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          FreeCell Strategy Guide
        </h1>
        <p className="text-white/60 text-lg max-w-2xl">
          The difference between a 50% win rate and 90%+ is pure strategy. This
          guide covers everything from first principles to expert-level endgame
          technique.
        </p>
      </header>

      {/* ── Main Content ── */}
      <main className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-16 relative -mt-8 mb-20 z-10">
        <article className="max-w-none">
          {/* ── Table of Contents ── */}
          <nav className="mb-16 p-6 bg-gray-50 rounded-xl border border-gray-100">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-4">
              In This Guide
            </h2>
            <ol className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
              <li>
                <a href="#three-laws" className="hover:text-[#072907] transition-colors">
                  1. The Three Laws of FreeCell
                </a>
              </li>
              <li>
                <a href="#beginner" className="hover:text-[#072907] transition-colors">
                  2. Beginner Fundamentals
                </a>
              </li>
              <li>
                <a href="#intermediate" className="hover:text-[#072907] transition-colors">
                  3. Intermediate Tactics
                </a>
              </li>
              <li>
                <a href="#advanced" className="hover:text-[#072907] transition-colors">
                  4. Advanced Techniques
                </a>
              </li>
              <li>
                <a href="#mistakes" className="hover:text-[#072907] transition-colors">
                  5. Common Mistakes
                </a>
              </li>
              <li>
                <a href="#practice" className="hover:text-[#072907] transition-colors">
                  6. Practice Drills
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#072907] transition-colors">
                  7. Frequently Asked Questions
                </a>
              </li>
            </ol>
          </nav>

          {/* ── Section 1: Three Laws ── */}
          <section id="three-laws" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-8">
              1. The Three Laws of FreeCell
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Every winning FreeCell strategy flows from three core principles.
              Internalize these and you&apos;ll win 80% of your games before
              learning anything else.
            </p>
            <div className="grid md:grid-cols-3 gap-8 not-prose mb-8">
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">
                  Preserve Space
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every filled{" "}
                  <Link href="/glossary" className="text-[#072907] underline decoration-dotted hover:text-[#D4AF37]">
                    free cell
                  </Link>{" "}
                  halves your movement capacity. With 4 empty free cells and 1
                  empty column, you can move 10 cards at once. Fill 3 free cells
                  and that drops to 4. Keep your workspace open at all costs.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">
                  Think in Chains
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Never move a card without knowing the next 3 moves it enables.
                  Ask yourself: &ldquo;If I move this 7 of hearts, what does
                  that uncover? Can I then access the 6 of spades underneath?
                  Does that free the Ace?&rdquo; Foresight is your only tool.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-1 bg-[#D4AF37]" />
                <h3 className="text-lg font-bold text-gray-800">
                  Exhume Low Cards
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Aces and twos buried deep in a column are emergencies. Your
                  foundations can&apos;t start building until aces are free, and
                  every card sitting on top of an ace is blocking your entire
                  game. Map their locations immediately.
                </p>
              </div>
            </div>
            <div className="bg-[#072907]/5 rounded-xl p-6 text-sm text-gray-700">
              <strong>Pro tip:</strong> Before your first move, count how many
              aces are visible (on top of columns) vs. buried. If 3+ aces are
              buried, the game will require careful planning. If all 4 are
              accessible, you&apos;re likely looking at a quick win.
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 2: Beginner Fundamentals ── */}
          <section id="beginner" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              2. Beginner Fundamentals
            </h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Opening Scan
                </h3>
                <p>
                  Spend 30 seconds studying the board before touching a card.
                  This is the single most impactful habit you can develop.
                  Identify:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-base">
                  <li>
                    <strong>Where are the aces?</strong> Visible on top of
                    columns, or buried? How deep?
                  </li>
                  <li>
                    <strong>Which columns are cleanest?</strong> Short columns
                    or columns already partially sorted are your best friends.
                  </li>
                  <li>
                    <strong>Are any columns already in order?</strong> A run of
                    K-Q-J in alternating colors is free real estate.
                  </li>
                  <li>
                    <strong>Where are the kings?</strong> Kings can only go in
                    empty columns. Their position dictates your late-game
                    options.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Prioritize Aces and Twos
                </h3>
                <p>
                  Move aces to the{" "}
                  <Link href="/glossary" className="text-[#072907] underline decoration-dotted hover:text-[#D4AF37]">
                    foundation
                  </Link>{" "}
                  the instant they&apos;re available — there is never a strategic
                  reason to keep an ace in play. The same applies to twos. Every
                  ace on the foundation means one fewer card cluttering your
                  tableau, and it opens the path for building sequences above it.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Empty Columns &gt; Free Cells
                </h3>
                <p>
                  New players instinctively dump cards into free cells. Resist
                  this urge. An empty column is exponentially more powerful
                  because it can hold an entire sequence, not just one card. Use
                  free cells only as a last resort, and free them up as quickly
                  as possible.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mt-3 text-base border border-gray-100">
                  <strong>The math:</strong> Your maximum{" "}
                  <Link href="/glossary" className="text-[#072907] underline decoration-dotted hover:text-[#D4AF37]">
                    supermove
                  </Link>{" "}
                  size = (1 + empty free cells) × 2<sup>empty columns</sup>.
                  With 4 free cells and 0 empty columns, you move 5 cards. With
                  3 free cells and 1 empty column, you move 8. The column is
                  worth more.
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Use Undo Liberally
                </h3>
                <p>
                  FreeCell is a game of perfect information — there&apos;s no
                  hidden deck. The undo button isn&apos;t cheating, it&apos;s
                  exploring. If a sequence of moves leads to a dead end, undo
                  and try a different path. Expert players routinely undo 10-20
                  moves to find a better line. Think of it as reading ahead in
                  chess.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Don&apos;t Build Long Sequences Too Early
                </h3>
                <p>
                  A perfectly sorted 8-card sequence looks satisfying but
                  it&apos;s often a trap. That sequence occupies an entire column
                  and can&apos;t be easily moved without multiple free cells and
                  empty columns. Only build long sequences when you have a clear
                  path to the foundation or when the cards would be worse off
                  scattered.
                </p>
              </div>
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 3: Intermediate Tactics ── */}
          <section id="intermediate" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              3. Intermediate Tactics
            </h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Mastering the Supermove
                </h3>
                <p>
                  The supermove is the engine of FreeCell. Understanding its
                  formula lets you plan complex reorganizations that seem
                  impossible at first glance. The key insight: empty columns
                  double your capacity because you can temporarily store a
                  sequence there, move another sequence, then move the first one
                  back.
                </p>
                <p className="mt-3">
                  Before attempting a big move, count your resources: empty free
                  cells + empty columns. Then calculate whether you have enough
                  capacity. Running out of space mid-move is the #1 cause of
                  getting stuck.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Column Management
                </h3>
                <p>
                  Think of your 8 columns as having roles. Some are
                  &ldquo;working columns&rdquo; where you&apos;re actively
                  building sequences. Others are &ldquo;storage columns&rdquo;
                  holding cards you can&apos;t use yet. And ideally, 1-2 are
                  empty &ldquo;buffer columns.&rdquo;
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-base">
                  <li>
                    <strong>Never fill your last empty column</strong> unless
                    it&apos;s for a game-winning sequence. Losing your last
                    buffer is often fatal.
                  </li>
                  <li>
                    <strong>Consolidate short columns.</strong> Two columns with
                    2 cards each are weaker than one column with 4 cards and one
                    empty column.
                  </li>
                  <li>
                    <strong>Place kings strategically.</strong> A king in an
                    empty column is permanent — nothing goes on top of a king in
                    FreeCell except queens. Make sure you want that king there.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  When to Use Free Cells
                </h3>
                <p>
                  Free cells are temporary parking, not storage. The ideal usage
                  pattern is: move a card to a free cell, execute 2-3 moves that
                  the freed space enables, then immediately place the free cell
                  card somewhere useful (foundation or a sequence). If a card
                  sits in a free cell for more than 5 moves, you may have made a
                  strategic error.
                </p>
                <div className="bg-[#072907]/5 rounded-xl p-4 mt-3 text-base">
                  <strong>Rule of thumb:</strong> Never fill more than 2 free
                  cells simultaneously in the early game. In the mid-game, 3 is
                  acceptable if you have a clear plan to empty them. Filling all
                  4 is almost always a losing position.
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Foundation Timing Rule
                </h3>
                <p>
                  Moving cards to the foundation seems always good, but it can
                  lock you out of plays. The safe rule: move a card to the
                  foundation only when both cards of the <em>opposite color</em>{" "}
                  and one rank lower are already on the foundation. For example,
                  the 7♥ is safe to move up only when both the 6♠ and 6♣ are
                  already on their foundations. This ensures you never need the
                  card back in the tableau.
                </p>
              </div>
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 4: Advanced Techniques ── */}
          <section id="advanced" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              4. Advanced Techniques
            </h2>
            <div className="space-y-8 text-gray-600 text-lg leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Reading the Board Backwards
                </h3>
                <p>
                  Expert players don&apos;t just plan forward — they read the
                  board from the endgame backwards. Ask: &ldquo;What does the
                  solved state look like from here?&rdquo; The kings need to
                  either be in empty columns with their sequences built down, or
                  already heading to foundations. Work backwards from that end
                  state to figure out what needs to happen now.
                </p>
                <p className="mt-3">
                  This is especially powerful in the mid-game when you have 20-30
                  cards remaining. Identify which suit is closest to completion
                  and prioritize clearing the path for it. One completed suit
                  frees 13 cards&apos; worth of space.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Sacrifice Plays
                </h3>
                <p>
                  Sometimes the best move makes your position look worse. A
                  sacrifice play intentionally breaks a sequence or fills a free
                  cell to enable a deeper, more valuable reorganization. For
                  example: breaking a 5-card sequence to access an ace buried
                  beneath it, even though you&apos;ll need 3 free cells to
                  rebuild the sequence later.
                </p>
                <p className="mt-3">
                  The key is ensuring the sacrifice creates enough value to
                  justify the cost. Uncovering an ace is almost always worth a
                  sacrifice. Uncovering a 9? Probably not.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  The Cascade Technique
                </h3>
                <p>
                  When you need to move a large sequence but don&apos;t have
                  enough supermove capacity, you can cascade through intermediate
                  columns. Move part of the sequence to an empty column, part to
                  free cells, execute your target move, then reassemble. This is
                  a multi-step process that requires careful tracking of where
                  every card is.
                </p>
                <p className="mt-3">
                  Master this technique and you&apos;ll find solutions to boards
                  that seem impossible. Our{" "}
                  <Link href="/tips" className="text-[#072907] underline decoration-dotted hover:text-[#D4AF37]">
                    tips page
                  </Link>{" "}
                  has more examples of cascade sequences.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Endgame Patterns
                </h3>
                <p>
                  The endgame begins when you can see a clear path to auto-complete.
                  Recognize these patterns:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-base">
                  <li>
                    <strong>All cards exposed:</strong> If every card is either
                    on a foundation, at the bottom of a column, or in a free
                    cell, the game auto-completes. Your goal is to reach this
                    state.
                  </li>
                  <li>
                    <strong>Single-suit lockout:</strong> If one suit&apos;s
                    cards are scattered across every column while the other three
                    suits are nearly complete, focus everything on consolidating
                    that troublesome suit.
                  </li>
                  <li>
                    <strong>The parking problem:</strong> When you need to move a
                    king to an empty column to access cards behind it, but every
                    empty column is needed for supermoves. This is the hardest
                    endgame pattern — sometimes the answer is to finish one suit
                    completely first to free up space.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 5: Common Mistakes ── */}
          <section id="mistakes" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              5. Common Mistakes
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: "Moving without a plan",
                  desc: 'The biggest mistake is making "obvious" moves without thinking about consequences. Every card you move changes the board state. Before each move, ask: "What does this enable?" If the answer is "nothing," don\'t move it.',
                },
                {
                  title: "Filling all free cells early",
                  desc: "With all 4 free cells occupied, your supermove capacity drops to 1 (or 2 with an empty column). You're essentially paralyzed. If you find yourself with 3+ filled free cells in the first 20 moves, consider undoing.",
                },
                {
                  title: "Ignoring buried aces",
                  desc: "It's tempting to build sequences with visible cards while ignoring the ace buried 6 cards deep. But that ace needs to come out eventually, and the longer you wait, the more constrained your board becomes. Address buried aces within your first 10 moves.",
                },
                {
                  title: "Building sequences you can't move",
                  desc: "A beautiful 7-card alternating-color sequence is worthless if you don't have the supermove capacity to relocate it. Before building, calculate whether you'll be able to move the sequence when you need to.",
                },
                {
                  title: "Putting kings in empty columns too early",
                  desc: "A king in an empty column is semi-permanent. If it's not the right king (the one you need to build a full suit sequence on), you've wasted your most valuable resource. Leave columns empty until you're certain which king belongs there.",
                },
                {
                  title: "Moving cards to foundations too aggressively",
                  desc: "Yes, foundations are the goal. But moving a 6 to the foundation when you still need it to hold a 5 in the tableau can lock you out. Follow the foundation timing rule: only move up when opposite-color cards of lower rank are already home.",
                },
                {
                  title: "Giving up too early",
                  desc: "FreeCell has a 99.999% solvability rate. If you think you're stuck, you probably haven't explored all lines. Use undo aggressively, try different opening sequences, and remember that the solution often requires unintuitive moves.",
                },
              ].map((mistake, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <span className="text-red-400 font-black text-lg shrink-0">
                    ✗
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      {mistake.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {mistake.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 6: Practice Drills ── */}
          <section id="practice" className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              6. Practice Drills
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Reading about strategy only gets you so far. These exercises build
              the pattern recognition that separates beginners from experts.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">
                  🔍 The 30-Second Scan
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Start{" "}
                  <Link href="/game/1" className="text-[#072907] underline hover:text-[#D4AF37]">
                    Game #1
                  </Link>
                  . Before making any move, locate all 4 aces and write down
                  their column positions. Identify the 3 best opening moves.
                  Then play. Repeat with{" "}
                  <Link href="/game/2" className="text-[#072907] underline hover:text-[#D4AF37]">
                    Game #2
                  </Link>{" "}
                  and{" "}
                  <Link href="/game/3" className="text-[#072907] underline hover:text-[#D4AF37]">
                    Game #3
                  </Link>
                  .
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">
                  🎯 The Zero Free Cell Challenge
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Play any game and try to win using free cells as little as
                  possible. Track how many times you used them. Expert benchmark:
                  win a game using free cells 5 or fewer times total.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">
                  🔥 Streak Training
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Our{" "}
                  <Link href="/streak" className="text-[#072907] underline hover:text-[#D4AF37]">
                    Streak mode
                  </Link>{" "}
                  challenges you to win consecutive games. Start with a goal of
                  3, then 5, then 10. Streaks force consistent play — you
                  can&apos;t rely on luck across multiple games.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">
                  ⏱️ Speed Run
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Once you&apos;re winning consistently, optimize for speed. Try
                  to solve{" "}
                  <Link href="/game/5" className="text-[#072907] underline hover:text-[#D4AF37]">
                    Game #5
                  </Link>{" "}
                  under 3 minutes. Speed forces intuitive decision-making rather
                  than deliberate analysis — the mark of true mastery.
                </p>
              </div>
            </div>
          </section>

          <AdUnit className="my-8" />

          {/* ── Section 7: FAQ ── */}
          <section id="faq" className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6">
              7. Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqJsonLd.mainEntity.map((item, i) => (
                <details
                  key={i}
                  className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                >
                  <summary className="p-5 cursor-pointer font-bold text-gray-900 hover:text-[#072907] transition-colors list-none flex items-center justify-between">
                    {item.name}
                    <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                    {item.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="bg-[#072907] text-white rounded-2xl p-8 text-center mt-12">
            <h2 className="text-2xl font-bold mb-3">Ready to Practice?</h2>
            <p className="text-white/60 mb-6">
              Apply these strategies in a real game. Start with an easy deal or
              jump into today&apos;s Daily Challenge.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/game/1"
                className="bg-[#D4AF37] text-[#072907] font-bold px-6 py-3 rounded-lg hover:bg-[#e5c349] transition-colors"
              >
                Play Game #1
              </Link>
              <Link
                href="/"
                className="bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Daily Challenge
              </Link>
              <Link
                href="/streak"
                className="bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Streak Mode
              </Link>
            </div>
          </div>

          {/* ── Related Pages ── */}
          <nav className="mt-12 pt-8 border-t border-gray-100">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">
              Continue Learning
            </h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <Link
                href="/how-to-play"
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#D4AF37] transition-colors"
              >
                <strong className="text-gray-900">How to Play →</strong>
                <p className="text-gray-500 mt-1">
                  Complete rules and mechanics for new players
                </p>
              </Link>
              <Link
                href="/glossary"
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#D4AF37] transition-colors"
              >
                <strong className="text-gray-900">Glossary →</strong>
                <p className="text-gray-500 mt-1">
                  26 FreeCell terms defined and explained
                </p>
              </Link>
              <Link
                href="/tips"
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#D4AF37] transition-colors"
              >
                <strong className="text-gray-900">Quick Tips →</strong>
                <p className="text-gray-500 mt-1">
                  Bite-sized advice for your next game
                </p>
              </Link>
              <Link
                href="/history"
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-[#D4AF37] transition-colors"
              >
                <strong className="text-gray-900">FreeCell History →</strong>
                <p className="text-gray-500 mt-1">
                  From PLATO mainframes to your browser
                </p>
              </Link>
            </div>
          </nav>
        </article>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-50 border-t border-gray-100 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="text-lg font-black uppercase tracking-widest mb-8 inline-block"
          >
            Freecell<span className="text-[#D4AF37]">.</span>
          </Link>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-8">
            <Link href="/how-to-play" className="hover:text-black transition-colors">
              How to Play
            </Link>
            <Link href="/strategy" className="hover:text-black transition-colors">
              Strategy
            </Link>
            <Link href="/glossary" className="hover:text-black transition-colors">
              Glossary
            </Link>
            <Link href="/faq" className="hover:text-black transition-colors">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-black transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 PlayFreeCellOnline.com
          </p>
        </div>
      </footer>
    </div>
  );
}
