import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import SolverWidget from "./SolverWidget";

export const metadata: Metadata = {
  title: "FreeCell Solver | Solve Any Deal Instantly",
  description:
    "Use our free FreeCell solver to find step-by-step solutions for any game number. Powered by an A* search algorithm that explores up to 300,000 game states to solve deals in seconds.",
  keywords: [
    "freecell solver",
    "freecell solution finder",
    "solve freecell online",
    "freecell game solver",
    "freecell ai solver",
    "freecell unsolvable deals",
    "freecell algorithm",
    "freecell cheat",
    "freecell hints",
    "freecell strategy solver",
  ],
  openGraph: {
    title: "FreeCell Solver | Solve Any Deal Instantly",
    description:
      "Enter any FreeCell game number and get a complete step-by-step solution. Our A* solver finds optimal paths through 300,000+ game states.",
    url: absoluteUrl('/solver'),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeCell Solver | Solve Any Deal Instantly",
    description:
      "Enter any FreeCell game number and get a complete step-by-step solution powered by A* search.",
  },
};

const faqs = [
  {
    question: "How does the FreeCell solver work?",
    answer:
      "Our solver uses an A* search algorithm with heuristic scoring. It explores game states by trying different moves, prioritizing those most likely to lead to a solution — like moving cards to foundations or freeing up cells. It can search up to 300,000 states to find a winning sequence of moves.",
  },
  {
    question: "Can the solver solve every FreeCell deal?",
    answer:
      "Almost. Of the first 1,000,000 FreeCell deals, only 8 are proven unsolvable: #11982, #146692, #186216, #455889, #495340, #512118, #517776, and #781948. That means 99.9992% of all deals have a solution.",
  },
  {
    question: "How long does it take to solve a deal?",
    answer:
      "Most deals are solved in under a second. Easy deals may take just 50-100 milliseconds, while harder deals that require exploring more game states can take a few seconds. The solver runs in a background thread so the page stays responsive.",
  },
  {
    question: "What do the move descriptions mean?",
    answer:
      "Each move shows the card being moved, where it comes from, and where it goes. For example, '4♠: Column 3 → Free Cell' means move the 4 of Spades from the third column to a free cell. Moves marked with (+N) are multi-card sequence moves.",
  },
  {
    question: "Why does the solver show fewer moves than I expected?",
    answer:
      "The solver only counts 'player moves' — deliberate decisions. Safe auto-moves to foundations (like moving an Ace when it becomes available) are performed automatically and counted separately as 'total moves including auto-moves.'",
  },
  {
    question: "Is using a solver cheating?",
    answer:
      "That depends on your perspective. Many players use solvers as learning tools — studying how an algorithm approaches a deal teaches you patterns and strategies you can apply to your own games. Our solver page is designed for learning and exploring, not just getting answers.",
  },
  {
    question: "What is the difference between A* and other solver algorithms?",
    answer:
      "A* combines the thoroughness of breadth-first search with the speed of greedy best-first search. Unlike DFS (which can go down wrong paths) or BFS (which uses too much memory), A* uses a heuristic to estimate how close each state is to winning, letting it find solutions faster while exploring fewer dead ends.",
  },
  {
    question: "Can I play a deal after seeing its solution?",
    answer:
      "Yes! After solving a deal, click the 'Play Deal' link to jump straight into that game. You can also use Ghost Mode in the game to watch the solver play in real time with animated card movements.",
  },
];

export default function SolverPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Solver", item: absoluteUrl('/solver') },
    ],
  };

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

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FreeCell Solver",
    description:
      "Free online FreeCell solver that finds step-by-step solutions for any game number using A* search.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl('/solver'),
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
          {"\u2666"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Solver
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Enter any game number and get an instant step-by-step solution powered
          by our A* search algorithm.
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
        {/* Interactive Solver */}
        <SolverWidget />

        <AdUnit format="horizontal" className="my-4" />

        {/* Article Content */}
        <article className="space-y-10">
          {/* Section 1: What is a FreeCell Solver? */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Is a FreeCell Solver?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                A FreeCell solver is a computer program that analyzes a FreeCell card layout and
                determines the exact sequence of moves needed to win the game. Unlike human players
                who rely on intuition, pattern recognition, and experience, a solver uses systematic
                search algorithms to explore thousands or even hundreds of thousands of possible
                game states until it finds a path from the starting deal to a fully solved board.
              </p>
              <p>
                Solvers serve multiple purposes in the FreeCell community. Researchers use them to
                catalog which deals are solvable and which are not. Competitive players study solver
                outputs to learn efficient move sequences they might not have considered. Game
                developers integrate solvers to provide hint systems and to verify that randomly
                generated deals are actually winnable before presenting them to players.
              </p>
              <p>
                The solver on this page works entirely in your browser. When you enter a game number,
                it generates the deal using the same{" "}
                <Link href="/deals" className="text-[#D4AF37] hover:underline">
                  Microsoft-compatible dealing algorithm
                </Link>{" "}
                used by every major FreeCell implementation, then searches for a winning sequence
                of moves. No data is sent to any server — the entire computation runs locally in
                a background thread using a{" "}
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4AF37] hover:underline"
                >
                  Web Worker
                </a>
                , keeping the page responsive while the solver works.
              </p>
            </div>
          </section>

          {/* Section 2: How Our Solver Works */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Our Solver Works
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Our solver uses the <strong className="text-white/80">A* search algorithm</strong>,
                one of the most well-known pathfinding algorithms in computer science. A* was first
                described in 1968 and has since been applied to everything from GPS navigation to
                game AI. In the context of FreeCell, A* treats each possible board configuration as
                a node in a graph and each legal move as an edge connecting two nodes.
              </p>
              <p>
                What makes A* special is its use of a <strong className="text-white/80">heuristic
                function</strong> — an estimate of how far each game state is from a winning
                position. Our heuristic considers several factors:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong className="text-white/80">Cards remaining off foundations</strong> —
                  Each card not yet on a foundation pile adds to the estimated distance. With 52
                  cards in a deck and four foundation piles to build, this is the most direct
                  measure of progress.
                </li>
                <li>
                  <strong className="text-white/80">Occupied free cells</strong> — Free cells are
                  your most valuable resource. Each occupied cell is penalized more heavily than a
                  card in a column because it directly limits your ability to make multi-card moves.
                </li>
                <li>
                  <strong className="text-white/80">Buried foundation candidates</strong> — When
                  the next card needed for a foundation pile is trapped beneath other cards in a
                  column, the solver recognizes this as a significant obstacle and increases its
                  distance estimate accordingly.
                </li>
                <li>
                  <strong className="text-white/80">Ordered sequences</strong> — Columns containing
                  properly alternating-color descending sequences get a small bonus, since these
                  sequences represent organized work that moves the game toward completion.
                </li>
              </ul>
              <p>
                Beyond the heuristic, the solver employs <strong className="text-white/80">move
                ordering</strong> to try the most promising moves first. Foundation moves are always
                tried first (score: 1000), followed by moves that empty a cascade column (80),
                moves from free cells back to cascades (100), and multi-card sequence moves (50).
                Moving a card to a free cell is penalized (-50) since it consumes a limited resource.
              </p>
              <p>
                The solver also performs <strong className="text-white/80">automatic safe
                moves</strong>. Whenever a card can be safely moved to its foundation — meaning no
                card of the opposite color with a lower rank could possibly need to be placed on it
                — the solver makes that move without counting it as a search step. This pruning
                dramatically reduces the search space.
              </p>
              <p>
                State deduplication prevents the solver from revisiting board positions it has
                already explored. Each unique configuration of cascades, free cells, and foundations
                is hashed into a canonical string. Since free cells are interchangeable (it does not
                matter which specific cell holds a card), the hash sorts free cell contents before
                encoding, ensuring equivalent positions map to the same hash.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 3: The Mathematics of FreeCell */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Mathematics of FreeCell
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                A standard 52-card deck can be arranged in 52! (52 factorial) ways — approximately
                8.07 &times; 10<sup>67</sup> different orderings. That number is staggeringly large,
                exceeding the estimated number of atoms in the observable universe by many orders
                of magnitude.
              </p>
              <p>
                However, not all of those arrangements produce unique FreeCell deals. The Microsoft
                dealing algorithm uses a 32-bit linear congruential random number generator (LCG)
                seeded with the game number. The formula is:
              </p>
              <div className="bg-black/30 border border-white/10 rounded-lg p-4 font-mono text-sm text-white/70">
                state = (state &times; 214013 + 2531011) &amp; 0x7FFFFFFF
              </div>
              <p>
                This generator has a period of 2<sup>31</sup> (about 2.15 billion), meaning it can
                produce at most that many distinct deals — though in practice the original Microsoft
                FreeCell only used game numbers 1 through 32,000. The extended numbering goes up to
                1,000,000, producing approximately 1.82 &times; 10<sup>64</sup> unique dealing
                sequences within that range, accounting for structural symmetries.
              </p>
              <p>
                Each deal distributes 52 cards across 8 columns: the first four columns receive 7
                cards each (28 cards), and the last four receive 6 cards each (24 cards). All four
                free cells and four foundation piles start empty. This fixed structure means the
                solver needs to navigate from one specific starting configuration out of an
                enormous state space toward the single winning state where all foundations hold
                Ace through King of their respective suits.
              </p>
              <p>
                The state space for a single FreeCell deal — the number of distinct board positions
                reachable during play — is estimated at roughly 10<sup>17</sup> to 10<sup>19</sup>{" "}
                positions. Our solver&apos;s 300,000-state search limit represents a tiny fraction of this
                space, yet the heuristic guides it efficiently enough to solve the vast majority
                of deals within that budget.
              </p>
            </div>
          </section>

          {/* Section 4: Famous Unsolvable Deals */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The 8 Famous Unsolvable Deals
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Of the first 1,000,000 FreeCell deals generated by the Microsoft algorithm, only
                8 have been proven completely unsolvable. No sequence of legal moves can win these
                games, no matter how skillfully you play. This gives FreeCell a remarkable
                solvability rate of <strong className="text-white/80">99.9992%</strong>.
              </p>
              <p>
                The confirmed unsolvable deals are:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[11982, 146692, 186216, 455889, 495340, 512118, 517776, 781948].map((num) => (
                  <Link
                    key={num}
                    href={`/game/${num}`}
                    className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center hover:bg-red-500/20 hover:border-red-500/30 transition-all group"
                  >
                    <span className="text-red-400 font-mono font-bold group-hover:text-red-300">
                      #{num}
                    </span>
                  </Link>
                ))}
              </div>
              <p>
                Deal <Link href="/game/11982" className="text-[#D4AF37] hover:underline">#11982</Link>{" "}
                holds a special place in FreeCell{" "}
                <Link href="/history" className="text-[#D4AF37] hover:underline">history</Link>.
                It was the first deal identified as unsolvable in the original set of 32,000
                Microsoft FreeCell deals. For years, players debated whether it could be beaten
                with the right strategy. The question was ultimately settled by exhaustive computer
                analysis that proved no winning path exists — every possible sequence of moves
                eventually reaches a dead end.
              </p>
              <p>
                The remaining seven unsolvable deals were discovered through large-scale
                computational sweeps of the extended 1,000,000-deal set. Multiple independent
                research groups verified these results using different solver implementations,
                confirming that these 8 deals — and only these 8 — are truly impossible within
                the first million.
              </p>
              <p>
                Try entering any of these numbers in the solver above to see the result for
                yourself. The solver will explore its full search budget and report that no solution
                could be found.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 5: Solver Algorithms Compared */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Solver Algorithms Compared
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Several algorithms have been applied to solving FreeCell, each making different
                tradeoffs between speed, memory usage, and solution quality. Here is how the major
                approaches compare:
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">
                    Depth-First Search (DFS)
                  </h3>
                  <p className="text-sm">
                    DFS dives deep into one sequence of moves before backtracking. It uses very
                    little memory since it only needs to track the current path, but it can get
                    stuck exploring long, fruitless branches. Without good pruning, DFS may take
                    an extremely long time or miss solutions entirely. It excels when combined
                    with iterative deepening.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">
                    Breadth-First Search (BFS)
                  </h3>
                  <p className="text-sm">
                    BFS explores all states at each depth level before going deeper, guaranteeing
                    it finds the shortest solution. The downside is enormous memory consumption —
                    storing every explored state at every depth level. For FreeCell&apos;s large state
                    space, pure BFS is impractical without significant memory optimization.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">
                    A* Search (Our Approach)
                  </h3>
                  <p className="text-sm">
                    A* uses a priority queue ordered by f(n) = g(n) + h(n), where g(n) is the
                    number of moves taken and h(n) is the heuristic estimate of remaining distance.
                    This balances exploration breadth with goal-directed efficiency. A* is optimal
                    when the heuristic never overestimates the true distance (admissibility). Our
                    implementation caps exploration at 300,000 states, making it suitable for
                    real-time browser use.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-4">
                  <h3 className="font-semibold text-white/80 mb-2">
                    IDA* (Iterative Deepening A*)
                  </h3>
                  <p className="text-sm">
                    IDA* combines A*&apos;s heuristic guidance with DFS&apos;s memory efficiency. It
                    performs repeated depth-limited DFS passes, increasing the depth threshold
                    each iteration based on the heuristic. This finds optimal solutions with
                    minimal memory, but the repeated work from restarting each iteration makes it
                    slower than A* for problems where memory is available.
                  </p>
                </div>
              </div>

              <p>
                For a browser-based solver where memory is limited but speed expectations are high,
                A* with a capped search budget offers the best balance. Our solver finds solutions
                to over 99.99% of solvable deals within its 300,000-state limit.
              </p>
            </div>
          </section>

          {/* Section 6: Can Every FreeCell Game Be Won? */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Can Every FreeCell Game Be Won?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                This is one of the most frequently asked questions in the FreeCell community, and
                the short answer is: <strong className="text-white/80">almost</strong>. The long
                answer involves decades of computational research, community-driven verification
                projects, and some fascinating mathematics.
              </p>
              <p>
                When Microsoft first included FreeCell in Windows 3.1 in 1995, it shipped with
                32,000 numbered deals. Players quickly began attempting to solve every single one.
                The Internet FreeCell Project, a collaborative effort among FreeCell enthusiasts,
                systematically worked through all 32,000 deals. By 1995, they had solved 31,999
                of them. The lone holdout was{" "}
                <Link href="/game/11982" className="text-[#D4AF37] hover:underline">Deal #11982</Link>.
              </p>
              <p>
                Despite the efforts of thousands of players and the application of early computer
                solvers, #11982 resisted all attempts. Eventually, exhaustive computational analysis
                proved that no winning sequence exists — every possible line of play reaches a
                position where no more moves can be made with cards still remaining.
              </p>
              <p>
                When researchers extended their analysis to the first 1,000,000 deals, they found
                only 7 additional unsolvable games, bringing the total to 8 out of 1,000,000. That
                translates to a solvability rate of 99.9992%, making FreeCell one of the most
                solvable card games ever created.
              </p>
              <p>
                It is worth noting that &quot;solvable&quot; and &quot;easy&quot; are very different things. Many
                solvable deals are extraordinarily difficult, requiring precise sequences of
                50 or more moves with no room for error. The{" "}
                <Link href="/statistics" className="text-[#D4AF37] hover:underline">
                  statistics page
                </Link>{" "}
                shows how solution difficulty varies across the deal space. Some deals can be
                solved in under 30 moves, while others require 80+ moves of carefully orchestrated
                card shuffling.
              </p>
              <p>
                Beyond the first million deals, the question of solvability remains open. No
                complete enumeration has been published for deals above 1,000,000, though spot
                checks and sampling suggest the solvability rate remains consistently above 99.99%.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 7: Using a Solver to Improve Your Play */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Using a Solver to Improve Your Play
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                One of the most effective ways to get better at FreeCell is to study how a solver
                approaches deals you struggled with. Rather than just looking at the answer, pay
                attention to the patterns and principles the solver demonstrates.
              </p>
              <p>
                <strong className="text-white/80">Notice when the solver avoids free cells.</strong>{" "}
                A common beginner mistake is using free cells too aggressively. Watch how the solver
                often finds ways to move cards between columns without touching the free cells at
                all. When it does use a free cell, notice how it usually frees the card again
                within just a few moves.
              </p>
              <p>
                <strong className="text-white/80">Study the solver&apos;s opening moves.</strong> The
                first 5-10 moves in a FreeCell deal often determine whether the rest of the game
                will flow smoothly. The solver typically starts by uncovering Aces and Twos,
                building alternating-color sequences, and keeping as many columns accessible as
                possible. Compare this with your own opening tendencies.
              </p>
              <p>
                <strong className="text-white/80">Look for multi-card sequence moves.</strong> The
                solver frequently moves groups of cards between columns in a single logical step.
                Understanding the{" "}
                <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
                  supermove mechanic
                </Link>{" "}
                — where the number of cards you can move at once depends on empty free cells and
                empty columns — is critical for playing efficiently.
              </p>
              <p>
                <strong className="text-white/80">Try Ghost Mode for a more visual experience.</strong>{" "}
                Instead of reading a list of moves, you can use our Ghost Mode feature in the{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">main game</Link> to
                watch the solver play through a deal with animated card movements. This makes it
                much easier to see the flow of the solution and understand how each move connects
                to the next.
              </p>
              <p>
                The best approach is to attempt a deal on your own first, and only consult the
                solver when you are truly stuck. After seeing the solution, try the deal again from
                scratch using the{" "}
                <Link href="/tips" className="text-[#D4AF37] hover:underline">
                  strategic principles
                </Link>{" "}
                you observed. Over time, you will internalize the patterns and find yourself
                reaching for the solver less and less.
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
                href="/statistics"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Statistics</span>
                <p className="text-sm text-white/40 mt-1">Win rates, solvability data &amp; analysis</p>
              </Link>
              <Link
                href="/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Strategy Guide</span>
                <p className="text-sm text-white/40 mt-1">Advanced techniques for tough deals</p>
              </Link>
              <Link
                href="/tips"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Tips &amp; Tricks</span>
                <p className="text-sm text-white/40 mt-1">Quick tips to improve your game</p>
              </Link>
              <Link
                href="/deals"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Deal Explorer</span>
                <p className="text-sm text-white/40 mt-1">Browse famous &amp; notable deals</p>
              </Link>
              <Link
                href="/game/11982"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Deal #11982</span>
                <p className="text-sm text-white/40 mt-1">The most famous unsolvable deal</p>
              </Link>
              <Link
                href="/history"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell History</span>
                <p className="text-sm text-white/40 mt-1">Origins and evolution of the game</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
