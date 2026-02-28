import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FreeCell Strategy Guide | How to Win FreeCell — Beginner to Expert Tips",
  description:
    "Master FreeCell strategy with this comprehensive guide. Beginner tips, intermediate tactics, advanced techniques, common mistakes to avoid, and expert FAQ. Learn how to win FreeCell and push your win rate past 90%.",
  keywords: [
    "freecell strategy",
    "how to win freecell",
    "freecell tips",
    "freecell guide",
    "freecell tricks",
    "freecell advanced strategy",
    "freecell win rate",
    "freecell strategy guide",
    "freecell beginner tips",
    "freecell techniques",
    "freecell common mistakes",
  ],
  openGraph: {
    title: "FreeCell Strategy Guide | How to Win FreeCell",
    description:
      "Comprehensive FreeCell strategy from beginner to expert. Actionable tips, advanced techniques, and common mistakes to avoid. Push your win rate past 90%.",
    url: "https://playfreecellonline.com/strategy",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

/* ── Glass panel style ── */

const CARD = "card-panel";

const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── FAQ data (used for both rendering and JSON-LD) ── */

const strategyFaqs = [
  {
    question: "How many FreeCell games are winnable?",
    answer:
      "Almost all of them. Of the original 32,000 Microsoft FreeCell deals, only deal #11982 is proven unsolvable. Research suggests that roughly 99.999% of all randomly shuffled deals have at least one solution. When you lose a FreeCell game, it\u2019s almost always a strategic error, not an impossible deal.",
  },
  {
    question: "What is the supermove formula in FreeCell?",
    answer:
      "The supermove formula calculates the maximum number of cards you can move at once: (1 + empty free cells) \u00d7 2^(empty columns). With 2 empty free cells and 1 empty column, you can move up to 6 cards. With all 4 free cells empty and no empty columns, you can move 5. This formula is critical for planning multi-card moves.",
  },
  {
    question: "How do I win FreeCell every time?",
    answer:
      "No one wins 100% of the time, but expert players reach 90\u201395% win rates. The keys are: scan the full board before your first move, keep free cells and empty columns clear as long as possible, prioritize uncovering Aces and 2s, plan at least 5 moves ahead, and use undo to explore different paths. Consistent application of these habits will dramatically raise your win rate.",
  },
  {
    question: "What is a good FreeCell win percentage?",
    answer:
      "Beginners typically win 30\u201350% of games. Intermediate players who know the fundamentals hit 65\u201380%. Advanced players land in the 80\u201390% range. Experts who\u2019ve mastered opening analysis and cascade management can reach 90\u201395%+. Since nearly every deal is solvable, your win rate is a direct measure of skill.",
  },
  {
    question: "Should I use free cells or empty columns first?",
    answer:
      "Use free cells first when you only need to move a single card temporarily. Use empty columns when you need to relocate an entire sequence or when the column will stay empty long enough to multiply your move capacity. Empty columns are more valuable than free cells because they hold multiple cards and double your supermove capacity.",
  },
  {
    question: "How long does a typical FreeCell game take?",
    answer:
      "Beginners usually spend 10\u201320 minutes per game. Intermediate players average 5\u201310 minutes. Experts often finish in 3\u20135 minutes because they recognize patterns quickly and spend less time backtracking. Speed comes naturally as you build pattern recognition. Don\u2019t rush. Accuracy beats speed, especially while learning.",
  },
  {
    question: "What is the hardest FreeCell deal?",
    answer:
      "Among the classic Microsoft 32,000 deals, #11982 is the only proven impossible deal. Beyond that, deals like #169, #178, and #1941 are notoriously difficult and require very precise play. Some randomly generated deals can also be extremely challenging, requiring 100+ moves and expert-level cascade management to solve.",
  },
  {
    question: "Can I improve my FreeCell win rate quickly?",
    answer:
      "Yes. Most players see significant improvement within a few weeks by focusing on three habits: keeping free cells empty, scanning the board before the first move, and using undo to explore alternatives. Players who actively practice these habits often jump from a 40\u201350% win rate to 70%+ in just a few dozen games.",
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

function StrategyCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
  level?: "beginner" | "intermediate" | "advanced";
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
        {number}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-[#2a2522] text-lg mb-2">{title}</h3>
        <div className="text-[#444444] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function StrategyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "FreeCell Strategy Guide: How to Win FreeCell — Beginner to Expert Tips",
      description:
        "Comprehensive FreeCell strategy guide covering beginner tips, intermediate tactics, advanced techniques, common mistakes, and expert FAQ to boost your win rate past 90%.",
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
        "@id": "https://playfreecellonline.com/strategy",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: strategyFaqs.map((faq) => ({
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
        {/* Decorative suit watermarks */}
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

        {/* Breadcrumbs */}
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
            <li className="text-white/80">Strategy Guide</li>
          </ol>
        </nav>

        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Strategy Guide
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The difference between a 50% win rate and 90%+ comes down to
          strategy. Learn these techniques and you&apos;ll win nearly every game
          you play.
        </p>

        {/* Gold divider */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Table of Contents ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            ["#fundamentals", "\u2660", "Fundamentals"],
            ["#beginner", "\u2665", "Beginner Tips"],
            ["#intermediate", "\u2666", "Intermediate"],
            ["#advanced", "\u2663", "Advanced"],
            ["#mistakes", "\u2660", "Common Mistakes"],
            ["#benchmarks", "\u2665", "Win Rates"],
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
        {/* Section: Fundamental Principles */}
        <section id="fundamentals" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Core Philosophy"
              id="fundamentals-heading"
              icon={"\u2660"}
            >
              Three Rules That Win FreeCell Games
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Every strategy in this guide comes back to three ideas.
                Internalize these and the specific tactics below will click
                naturally. If you&apos;re brand new to FreeCell, read our{" "}
                <Link
                  href="/how-to-play"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  complete rules guide
                </Link>{" "}
                first.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: "\u265A",
                    title: "Preserve Flexibility",
                    desc: "Every move that fills a free cell or empty column cuts your options. More empty spaces means more power. Protect that flexibility like your win depends on it \u2014 because it does.",
                  },
                  {
                    icon: "\u265B",
                    title: "Think in Chains",
                    desc: "Don\u2019t look at moves one at a time. Ask: \u201CWhat does this unlock? And then what?\u201D Good players see chains of 5\u201310 moves before they touch a card.",
                  },
                  {
                    icon: "\u265C",
                    title: "Prioritize Low Cards",
                    desc: "Aces and 2s buried deep in the columns are emergencies. Everything you do should work toward freeing low cards and building foundations up. Getting them home early starts a cascade of progress.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="card-inset rounded-xl p-5 text-center"
                  >
                    <div className="text-3xl mb-2 text-[#D4AF37]">{icon}</div>
                    <h3 className="font-medium text-[#2a2522] mb-2">
                      {title}
                    </h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[#444444] leading-relaxed mt-6 text-sm">
                These three principles are interconnected. Preserving flexibility
                gives you room to think in chains. Thinking in chains helps you
                find paths to buried low cards. And freeing low cards builds
                foundations, which clears the board and creates more flexibility.
                It&apos;s a virtuous cycle that powers every winning game.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Beginner */}
        <section id="beginner" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Getting Started"
              id="beginner-heading"
              icon={"\u2665"}
            >
              Beginner Strategies
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                If you&apos;re new to FreeCell or winning less than 60% of your
                games, start here. These six habits will improve your results
                right away. For the{" "}
                <Link
                  href="/how-to-play"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  basic rules and terminology
                </Link>
                , check our how-to-play guide.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={1}
                  title="Free Up Aces and 2s First"
                  level="beginner"
                >
                  <p>
                    Before you do anything else, scan the whole board for Aces
                    and 2s. Where are they? How deep are they buried? If an Ace
                    is stuck under five cards, that column is your top priority.
                    Every early move should work toward uncovering these low
                    cards. Getting Aces to the foundations early starts a chain
                    reaction. Once the Ace is placed, the 2 becomes playable,
                    then the 3, and so on. Nothing clears space faster than
                    building foundations from the bottom up.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={2}
                  title="Keep Free Cells Empty"
                  level="beginner"
                >
                  <p>
                    Free cells are your most important resource, and the #1
                    beginner mistake is filling them too early. Every occupied
                    free cell reduces how many cards you can move at once. With
                    all four filled, you can only move one card at a time, which
                    usually means you&apos;re stuck. Think of free cells as an
                    emergency reserve. Only use them when you have to, and
                    prioritize emptying them again right away. Good rule of
                    thumb: if three or more free cells are full, stop and clear
                    them before doing anything else.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={3}
                  title="Empty Columns Are Gold"
                  level="beginner"
                >
                  <p>
                    An empty column is even more powerful than a free cell. It
                    can hold an entire sequence of cards, not just one. The
                    supermove formula doubles with each empty column you have.
                    Clearing a column early gives you way more move capacity and
                    opens up options that just don&apos;t exist when all columns
                    are full. Once you clear a column, think hard before filling
                    it again. Only do it if the move clearly pushes your game
                    forward. Experienced players treat empty columns as their
                    most precious resource.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={4}
                  title="Use Undo Liberally"
                  level="beginner"
                >
                  <p>
                    Undo is the single best learning tool you have. Try a
                    sequence of moves. If it leads nowhere, undo and try
                    something completely different. Over time, you&apos;ll start
                    recognizing dead ends before you reach them. That&apos;s how
                    every expert learned. Lots of winning strategies only show up
                    after you&apos;ve explored (and undone) several different
                    paths. Don&apos;t feel bad about using undo. It&apos;s how
                    you build intuition. You can practice this right now
                    in our{" "}
                    <Link
                      href="/"
                      className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                    >
                      free online game
                    </Link>
                    .
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={5}
                  title="Scan the Full Board Before Your First Move"
                  level="beginner"
                >
                  <p>
                    Resist the urge to start moving cards the moment the deal
                    appears. Spend 15&ndash;20 seconds scanning all eight
                    columns. Find where the four Aces are. Note which columns
                    have cards already in near-sequence. Identify the messiest
                    columns&mdash;the ones with high cards buried under low ones.
                    This quick overview prevents the most common beginner trap:
                    diving into one column only to realize three moves later that
                    a better opportunity was sitting in plain sight across the
                    board. A short pause at the start saves time and undo presses
                    later.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={6}
                  title="Work Multiple Columns Simultaneously"
                  level="beginner"
                >
                  <p>
                    Don&apos;t tunnel-vision on one column. Beginners often pick
                    the column with an Ace at the bottom and try to dig it out
                    move by move, but that approach burns through free cells
                    fast. Instead, look for opportunities across the whole
                    tableau. Move a card from column 3 to column 7 because it
                    frees a useful card in column 3 while simultaneously building
                    a useful sequence in column 7. The best moves solve two
                    problems at once. When you&apos;re considering a move, always
                    glance at the rest of the board to see if there&apos;s
                    something better.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Intermediate */}
        <section id="intermediate" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Level Up"
              id="intermediate-heading"
              icon={"\u2666"}
            >
              Intermediate Strategies
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Once you&apos;re consistently winning 60%+ of games, these
                techniques will push you toward 80%. They take more planning but
                the payoff is real. Check our{" "}
                <Link
                  href="/faq"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  FAQ
                </Link>{" "}
                for quick answers to common questions about these techniques.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={7}
                  title="Build In-Suit Sequences When Possible"
                  level="intermediate"
                >
                  <p>
                    When you can choose between building with alternating suits
                    or keeping cards in the same suit, go same-suit whenever
                    practical. Same-suit sequences (like 7{"\u2660"} on 8
                    {"\u2660"}) move directly to the foundation without breaking
                    apart. Mixed-suit sequences have to be taken apart card by
                    card. That doesn&apos;t mean mixed sequences are bad.
                    They&apos;re still useful for temporary organization. But
                    when you have the choice, same-suit is almost always better
                    long-term because it reduces the total number of moves needed
                    to win.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={8}
                  title="Plan 5\u201310 Moves Ahead"
                  level="intermediate"
                >
                  <p>
                    Before every move, think about where it leads. Ask yourself:
                    &quot;After this move, what does it open up? And then
                    what?&quot; Good players see chains of moves, not individual
                    actions. A move that does nothing on its own might be
                    brilliant if it&apos;s step one of a 10-move chain that
                    clears an entire column. On the flip side, a move that looks
                    great right now might be terrible if it blocks a key card
                    three moves later. Get in the habit of tracing consequences
                    at least 5 steps out. This is where undo becomes invaluable
                    for testing theories.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={9}
                  title="Don't Build Long Sequences Too Early"
                  level="intermediate"
                >
                  <p>
                    A long, perfectly ordered sequence looks satisfying, but it
                    locks up an entire column. You can&apos;t reach any cards
                    underneath, and moving it somewhere else takes a lot of empty
                    space. Only build sequences when they actually serve your
                    plan&mdash;when those cards need to be stacked for foundation
                    building. Stacking just because you can is a classic
                    intermediate trap. Ask yourself: &quot;Does this sequence
                    help me reach an Ace or build a foundation?&quot; If not,
                    skip it and spend your moves on something productive.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={10}
                  title="Watch the Foundation Balance"
                  level="intermediate"
                >
                  <p>
                    Try to keep your four foundation piles roughly even. If one
                    suit gets way ahead of the others, you&apos;ll hit a wall
                    where you can&apos;t auto-move cards because their
                    dependencies haven&apos;t reached the foundations yet. Say
                    your spades are at 9{"\u2660"} but hearts are still at 3
                    {"\u2665"}. You won&apos;t be able to auto-move any black
                    cards past 4, because the game needs both red foundations
                    caught up first. Keeping foundations balanced keeps auto-move
                    flowing and prevents bottlenecks that stall your game.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={11}
                  title="Master the Supermove Formula"
                  level="intermediate"
                >
                  <p>
                    Understanding supermoves is what separates intermediate
                    players from beginners. The formula is: (1 + empty free
                    cells) &times; 2^(empty columns). With 3 empty free cells
                    and 1 empty column, you can move 8 cards at once. With 1
                    free cell and 2 empty columns, that&apos;s also 8. Before
                    attempting any multi-card move, run this math in your head.
                    If you don&apos;t have enough capacity, you need to free up
                    space first. Knowing your exact move capacity prevents
                    wasted moves and lets you plan more ambitious sequences.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={12}
                  title="Use Free Cells as a Relay Station"
                  level="intermediate"
                >
                  <p>
                    Instead of parking a card in a free cell and forgetting about
                    it, think of free cells as a relay point in a larger
                    sequence. Move a blocking card to a free cell, do the work
                    underneath it, then immediately move it back to a useful
                    position. The whole trip through the free cell should be part
                    of one planned sequence. This &quot;relay&quot; mindset keeps
                    free cells cycling instead of filling up. If you can&apos;t
                    see when you&apos;ll empty a free cell after filling it,
                    that&apos;s a warning sign that the move might not be worth
                    making.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Advanced */}
        <section id="advanced" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Expert Level"
              id="advanced-heading"
              icon={"\u2663"}
            >
              Advanced Techniques
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                This is what takes you from 80% to 90%+. These techniques need
                careful board reading and precise calculation, but they&apos;ll
                make you nearly unbeatable. If you&apos;re new to FreeCell,
                start with the{" "}
                <a
                  href="#beginner"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  beginner section
                </a>{" "}
                first.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={13}
                  title="The 30-Second Opening Scan"
                  level="advanced"
                >
                  <p>
                    Before your first move, spend 30 seconds reading the board.
                    Find all four Aces. Which ones are easiest to reach?
                    What&apos;s buried deep? Are any columns close to empty? Do
                    you see in-suit sequences already forming? Which columns are
                    the messiest? This quick scan prevents the most common cause
                    of losses: jumping into a plan before you understand what
                    you&apos;re working with. Experts often spend more time on
                    this opening read than on the first 10 moves combined. Map
                    out your first 8&ndash;10 moves mentally before touching a
                    card.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={14}
                  title="The Reversibility Principle"
                  level="advanced"
                >
                  <p>
                    When two moves look equally good, always pick the one
                    that&apos;s easier to reverse. Moving a card to a free cell?
                    Highly reversible. You can move it back anytime. Dropping a
                    King into an empty column? Basically permanent, since nothing
                    stacks on top of a King in cascade ordering. Reversible moves
                    keep your options open. Irreversible moves lock you into one
                    path. The more reversible your early moves are, the more you
                    learn about the board before you have to commit to a
                    strategy.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={15}
                  title="The Cascade Shuffle"
                  level="advanced"
                >
                  <p>
                    Sometimes the only way forward is to temporarily take apart
                    an entire column. Move its cards into free cells and empty
                    columns, do what you need to underneath, then put everything
                    back. This is the hardest technique in FreeCell and requires
                    precise counting. Before you try it, calculate: do you have
                    enough empty free cells and columns to hold all the cards?
                    Use the supermove formula: (1 + free cells) &times;
                    2^(empty columns). If you need to move more cards than that
                    number, the shuffle won&apos;t work and you need a different
                    approach.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={16}
                  title="Recognizing Lost Positions"
                  level="advanced"
                >
                  <p>
                    If all 4 free cells are full and you have no empty columns,
                    you&apos;re usually (but not always) stuck. Before you give
                    up, check every possible move carefully. Sometimes one
                    foundation move or an unexpected cascade placement opens
                    everything up. But if you&apos;ve checked everything and
                    there&apos;s truly nothing left, the smart play is to
                    recognize the loss and start a new game. Don&apos;t waste
                    time. Experts know when to cut their losses. Ten minutes on a
                    lost position is time you could spend winning the next game.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={17}
                  title="Deep Excavation Planning"
                  level="advanced"
                >
                  <p>
                    When a critical card (usually an Ace or 2) is buried six or
                    seven cards deep, you need an excavation plan. Count the
                    cards above it. For each one, identify where it can go:
                    another cascade, a free cell, or an empty column. Work
                    backwards from the buried card to figure out the exact
                    sequence of moves. The best excavations use temporary cascade
                    placements that also build useful sequences along the way,
                    turning a pure digging operation into one that improves
                    board organization simultaneously.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={18}
                  title="Endgame Acceleration"
                  level="advanced"
                >
                  <p>
                    Once foundations reach the 7&ndash;8 level across all four
                    suits, the game enters endgame. At this point, strategy
                    shifts from careful conservation to aggressive building. With
                    fewer cards on the tableau, each foundation placement opens
                    multiple auto-moves. Look for the move that triggers the
                    longest auto-move chain. Sometimes building one foundation
                    from 8 to 9 unlocks a cascade of auto-moves that clears half
                    the remaining board. Recognizing endgame positions and
                    switching to aggressive play is what lets experts finish
                    games in under a minute.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Common Mistakes */}
        <section id="mistakes" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Avoid These"
              id="mistakes-heading"
              icon={"\u2660"}
            >
              Common Mistakes That Cost Games
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Even experienced players fall into these traps. Spotting them in
                your own play is the fastest way to get better. If you&apos;re
                making these mistakes, revisit the{" "}
                <a
                  href="#fundamentals"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  three fundamental principles
                </a>{" "}
                above.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Filling free cells too early",
                    desc: "The #1 beginner mistake. Every filled free cell cuts your flexibility and move capacity. Don\u2019t fill one without a clear plan to empty it again soon.",
                  },
                  {
                    title: "Moving cards without a plan",
                    desc: "If you can\u2019t explain why you\u2019re making a move and what it opens up, don\u2019t make it. Random moves feel productive but usually create more problems than they solve.",
                  },
                  {
                    title: "Ignoring deeply buried low cards",
                    desc: "An Ace buried under 6 cards is an emergency. If you don\u2019t address it early, by the time you dig it out, you may have exhausted your free cells and column space.",
                  },
                  {
                    title: "Moving Kings to empty columns too eagerly",
                    desc: "A King in an empty column is basically permanent. Nothing stacks on top of a King in cascade ordering. Make sure you actually need that arrangement before committing a column to a King.",
                  },
                  {
                    title: "Building long sequences prematurely",
                    desc: "A perfectly ordered 8-card sequence looks impressive but locks up an entire column and takes massive move capacity to relocate. Only build long sequences when they directly serve your foundation-building plan.",
                  },
                  {
                    title: "Refusing to use undo",
                    desc: "Undo isn\u2019t cheating. It\u2019s learning. Players who never undo learn slower and win less. The fastest way to improve is exploring multiple approaches for each board position.",
                  },
                  {
                    title: "Focusing on only one column at a time",
                    desc: "Tunnel vision kills games. While you\u2019re fixated on digging out one buried Ace, opportunities in other columns expire. Always consider the full board before each move.",
                  },
                  {
                    title: "Not counting supermove capacity before multi-card moves",
                    desc: "Attempting a multi-card move without enough empty space wastes your turn and free cells. Calculate (1 + free cells) \u00d7 2^(empty columns) before every big move to make sure it\u2019s actually possible.",
                  },
                ].map(({ title, desc }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-red-50 rounded-lg p-4 border border-red-500/20"
                  >
                    <span className="text-red-400 font-bold text-lg shrink-0 mt-0.5">
                      {"\u2717"}
                    </span>
                    <div>
                      <h3 className="font-medium text-[#2a2522] mb-1">
                        {title}
                      </h3>
                      <p className="text-[#6B7280] text-sm leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Win Rate Benchmarks */}
        <section id="benchmarks" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Track Your Progress"
              id="benchmarks-heading"
              icon={"\u2665"}
            >
              Win Rate Benchmarks
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Since nearly every FreeCell deal is solvable, your win rate is a
                direct measure of skill. Here&apos;s how to track your progress.
                Start a{" "}
                <Link
                  href="/"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  new game
                </Link>{" "}
                and see where you land.
              </p>

              <div className="space-y-4">
                {[
                  {
                    level: "Beginner",
                    range: "30\u201350%",
                    pct: 40,
                    color: "bg-gray-400",
                    desc: "You\u2019re learning the rules and building basic habits. Focus on the beginner strategies above and use undo freely.",
                  },
                  {
                    level: "Developing",
                    range: "50\u201365%",
                    pct: 57,
                    color: "bg-blue-400",
                    desc: "You understand the basics but sometimes get stuck. Focus on keeping free cells empty and planning a few moves ahead.",
                  },
                  {
                    level: "Intermediate",
                    range: "65\u201380%",
                    pct: 72,
                    color: "bg-emerald-500",
                    desc: "You\u2019re winning most games. Work on in-suit building, foundation balance, and the opening scan to push higher.",
                  },
                  {
                    level: "Advanced",
                    range: "80\u201390%",
                    pct: 85,
                    color: "bg-amber-500",
                    desc: "Strong player. Losses are rare and usually involve exceptionally difficult deals. Refine cascade shuffling and lost-position recognition.",
                  },
                  {
                    level: "Expert",
                    range: "90%+",
                    pct: 95,
                    color: "bg-[#D4AF37]",
                    desc: "Elite level. You can solve almost any deal. Your losses are limited to the very hardest configurations and the rare unsolvable deal.",
                  },
                ].map(({ level, range, pct, color, desc }) => (
                  <div
                    key={level}
                    className="bg-[#F0EDE5] rounded-lg p-4 border border-[rgba(212,175,55,0.1)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-[#2a2522]">{level}</h3>
                      <span className="text-sm font-bold text-[#D4AF37]">
                        {range}
                      </span>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden mb-2">
                      <div
                        className={`h-full ${color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Quick Answers"
              id="faq-heading"
              icon={"\u2666"}
            >
              FreeCell Strategy FAQ
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-6">
                Quick answers to the most common FreeCell strategy questions.
                For more detailed answers, see our{" "}
                <Link
                  href="/faq"
                  className="text-[#B8860B] underline decoration-[#D4AF37]/30 hover:decoration-[#D4AF37] transition-colors"
                >
                  full FAQ page
                </Link>
                .
              </p>

              <div className="space-y-5">
                {strategyFaqs.map((faq, i) => (
                  <div key={i} className="card-inset rounded-xl p-5">
                    <h3
                      className="font-medium text-[#2a2522] text-[17px] mb-2"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      {faq.question}
                    </h3>
                    <p className="text-[#444444] text-[15px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
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
                Put These Strategies to Work
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                The best way to get better is practice. Try these techniques in
                your next game and watch your win rate climb.
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
                  Practice Now
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

        {/* ── Cross-links ── */}
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
              href="/faq"
              className="hover:text-[#6B7280] transition-colors"
            >
              FAQ
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
