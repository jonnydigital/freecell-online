import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FreeCell Strategy Guide | Proven Tips to Win 90%+ of Games",
  description:
    "Get better at FreeCell fast. Beginner tips, intermediate tactics, and advanced techniques that'll take your win rate from average to 90%+.",
  keywords: [
    "freecell strategy",
    "freecell tips",
    "how to win freecell",
    "freecell guide",
    "freecell tricks",
    "freecell advanced strategy",
    "freecell win rate",
  ],
  openGraph: {
    title: "FreeCell Strategy Guide | Win 90%+ of Games",
    description:
      "FreeCell strategies from beginner to expert. Tips and techniques to push your win rate past 90%.",
    url: "https://playfreecellonline.com/strategy",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

/* ── Glass panel style ── */

const CARD = 'card-panel';

const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

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
        {icon && (
          <span className="mr-2 text-[#c9a84c]">
            {icon}
          </span>
        )}
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
      <div
        className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base sm:text-lg shadow-md"
      >
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "FreeCell Strategy Guide: Proven Tips to Win 90%+ of Games",
    description:
      "FreeCell strategy guide covering beginner, intermediate, and advanced techniques to boost your win rate.",
    author: {
      "@type": "Organization",
      name: "PlayFreeCellOnline.com",
    },
  };

  return (
    <div
      className="h-screen overflow-y-auto scroll-smooth felt-bg"
    >
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
          strategy. Learn these techniques and you&apos;ll win nearly every
          game you play.
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
            ["#benchmarks", "\u2665", "Win Rate Benchmarks"],
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
            <SectionHeading sub="Core Philosophy" id="fundamentals-heading" icon={"\u2660"}>
              Three Rules That Win FreeCell Games
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Every strategy in this guide comes back to three ideas. Get
                these right and everything else clicks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: "\u265A",
                    title: "Preserve Flexibility",
                    desc: "Every move that fills a free cell or empty column cuts your options. More empty spaces means more power. Protect that flexibility.",
                  },
                  {
                    icon: "\u265B",
                    title: "Think in Chains",
                    desc: 'Don\'t look at moves one at a time. Ask: "What does this unlock? And then what?" Good players see chains of 5\u201310 moves before they touch a card.',
                  },
                  {
                    icon: "\u265C",
                    title: "Prioritize Low Cards",
                    desc: "Aces and 2s buried deep in the columns are emergencies. Everything you do should work toward freeing low cards and building foundations up.",
                  },
                ].map(({ icon, title, desc }) => (
                  <div
                    key={title}
                    className="card-inset rounded-xl p-5 text-center"
                  >
                    <div className="text-3xl mb-2 text-[#D4AF37]">{icon}</div>
                    <h3 className="font-medium text-[#2a2522] mb-2">{title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Beginner */}
        <section id="beginner" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Getting Started" id="beginner-heading" icon={"\u2665"}>
              Beginner Strategies
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                If you&apos;re new to FreeCell or winning less than 60% of your
                games, start here. These four habits will improve your results
                right away.
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
                    then the 3, and so on. Nothing clears space faster.
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
                    forward.
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
                    every expert learned. Lots of winning strategies only show
                    up after you&apos;ve explored (and undone) several different
                    paths. Don&apos;t feel bad about using undo. It&apos;s how
                    you build intuition.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Intermediate */}
        <section id="intermediate" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Level Up" id="intermediate-heading" icon={"\u2666"}>
              Intermediate Strategies
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Once you&apos;re consistently winning 60%+ of games, these
                techniques will push you toward 80%. They take more planning
                but the payoff is real.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={5}
                  title="Build In-Suit Sequences When Possible"
                  level="intermediate"
                >
                  <p>
                    When you can choose between building with alternating suits
                    or keeping cards in the same suit, go same-suit whenever
                    practical. Same-suit sequences (like 7{"\u2660"} on
                    8{"\u2660"}) move directly to the foundation without breaking
                    apart. Mixed-suit sequences have to be taken apart card by
                    card. That doesn&apos;t mean mixed sequences are bad.
                    They&apos;re still useful. But when you have the choice,
                    same-suit is almost always better long-term.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={6}
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
                    at least 5 steps out.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={7}
                  title="Don't Build Long Sequences Too Early"
                  level="intermediate"
                >
                  <p>
                    A long, perfectly ordered sequence looks satisfying, but it
                    locks up an entire column. You can&apos;t reach any cards
                    underneath, and moving it somewhere else takes a lot of
                    empty space. Only build sequences when they actually serve
                    your plan, when those cards need to be stacked for
                    foundation building. Stacking just because you can is a
                    classic intermediate trap. Ask yourself: &quot;Does this
                    sequence help me reach an Ace or build a foundation?&quot;
                    If not, skip it.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={8}
                  title="Watch the Foundation Balance"
                  level="intermediate"
                >
                  <p>
                    Try to keep your four foundation piles roughly even. If one
                    suit gets way ahead of the others, you&apos;ll hit a wall
                    where you can&apos;t auto-move cards because their
                    dependencies haven&apos;t reached the foundations yet. Say
                    your spades are at 9{"\u2660"} but hearts are still at
                    3{"\u2665"}. You won&apos;t be able to auto-move any black
                    cards past 4, because the game needs both red foundations
                    caught up first. Keeping foundations balanced keeps
                    auto-move flowing and prevents bottlenecks.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Advanced */}
        <section id="advanced" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Expert Level" id="advanced-heading" icon={"\u2663"}>
              Advanced Techniques
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                This is what takes you from 80% to 90%+. These techniques need
                careful board reading and precise calculation, but they&apos;ll
                make you nearly unbeatable.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={9}
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
                    this opening read than on the first 10 moves combined.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={10}
                  title="The Reversibility Principle"
                  level="advanced"
                >
                  <p>
                    When two moves look equally good, always pick the one
                    that&apos;s easier to reverse. Moving a card to a free cell?
                    Highly reversible. You can move it back anytime. Dropping a
                    King into an empty column? Basically permanent, since
                    nothing stacks on top of a King in cascade ordering.
                    Reversible moves keep your options open. Irreversible moves
                    lock you into one path. The more reversible your early moves
                    are, the more you learn before you have to commit.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={11}
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
                    Use the supermove formula: (1 + free cells) ×
                    2^(empty columns). If you need to move more cards than that
                    number, the shuffle won&apos;t work and you need a different
                    approach.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={12}
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
                    time. Experts know when to cut their losses. Ten minutes on
                    a lost position is time you could spend winning the next
                    game.
                  </p>
                </StrategyCard>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Common Mistakes */}
        <section id="mistakes" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Avoid These" id="mistakes-heading" icon={"\u2660"}>
              Common Mistakes That Cost Games
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Even experienced players fall into these traps. Spotting them
                in your own play is the fastest way to get better.
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
                ].map(({ title, desc }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-red-50 rounded-lg p-4 border border-red-500/20"
                  >
                    <span className="text-red-400 font-bold text-lg shrink-0 mt-0.5">
                      {"\u2717"}
                    </span>
                    <div>
                      <h3 className="font-medium text-[#2a2522] mb-1">{title}</h3>
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
            <SectionHeading sub="Track Your Progress" id="benchmarks-heading" icon={"\u2665"}>
              Win Rate Benchmarks
            </SectionHeading>

            <div className="px-10 sm:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Since nearly every FreeCell deal is solvable, your win rate is
                a direct measure of skill. Here&apos;s how to track your
                progress.
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
                The best way to get better is practice. Try these techniques
                in your next game and watch your win rate climb.
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
            <Link
              href="/"
              className="hover:text-[#6B7280] transition-colors"
            >
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
