import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "FreeCell Strategy Guide | Proven Tips to Win 90%+ of Games",
  description:
    "Master FreeCell Solitaire with our comprehensive strategy guide. From beginner fundamentals to advanced techniques, learn the strategies that separate casual players from experts with 90%+ win rates.",
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
      "Proven FreeCell strategies from beginner to expert. Improve your win rate with our comprehensive guide.",
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
      "Comprehensive FreeCell strategy guide covering beginner, intermediate, and advanced techniques.",
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
          The difference between a 50% win rate and a 90%+ win rate is
          strategy. Master these techniques and you&apos;ll win nearly every
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
              The Three Pillars of FreeCell Strategy
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Before diving into specific tips, understand the three principles
                that underpin every good FreeCell decision. Every strategy in this
                guide flows from these foundational ideas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: "\u265A",
                    title: "Preserve Flexibility",
                    desc: "Every move that fills a free cell or empty column reduces your options. The player with more empty spaces has more power. Guard your flexibility like a chess player guards their king.",
                  },
                  {
                    icon: "\u265B",
                    title: "Think in Chains",
                    desc: 'Never evaluate a move in isolation. Ask: "What does this move enable? And what does that enable?" The best players see cascading sequences of 5\u201310 moves before they act.',
                  },
                  {
                    icon: "\u265C",
                    title: "Prioritize Low Cards",
                    desc: "Aces and 2s buried deep in the cascades are emergencies. Every plan should ultimately serve the goal of freeing low cards and building foundations upward as quickly as possible.",
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

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                If you&apos;re new to FreeCell or winning less than 60% of your
                games, focus on mastering these four fundamental habits. They
                will immediately improve your results.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={1}
                  title="Free Up Aces and 2s First"
                  level="beginner"
                >
                  <p>
                    Before making any other moves, scan the entire board for Aces
                    and 2s. Where are they? How deeply buried? If an Ace is stuck
                    under five other cards, that column is your top priority. Every
                    move in the early game should work toward uncovering these
                    critical low cards. Getting Aces to the foundations early
                    creates a cascading effect — once the Ace is placed, the 2
                    becomes playable, then the 3, and so on. This chain reaction
                    clears space faster than any other approach.
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
                    free cell directly reduces the number of cards you can move at
                    once. With all four free cells occupied, you can only move one
                    card at a time — which often means you&apos;re stuck. Treat
                    free cells like an emergency reserve. Use them only when
                    necessary, and prioritize emptying them again immediately. A
                    good rule of thumb: if you have three or more free cells
                    occupied, stop and find ways to empty them before making any
                    other moves.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={3}
                  title="Empty Columns Are Gold"
                  level="beginner"
                >
                  <p>
                    An empty cascade column is even more powerful than a free cell.
                    Why? Because it can hold an entire sequence of cards, not just
                    a single card. The supermove formula doubles with each empty
                    column you have. Creating an empty column early in the game
                    dramatically increases your move capacity and opens up
                    strategic options that simply don&apos;t exist when all columns
                    are occupied. Once you clear a column, think very carefully
                    before filling it again. Only fill an empty column if the move
                    clearly advances your overall strategy.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={4}
                  title="Use Undo Liberally"
                  level="beginner"
                >
                  <p>
                    The undo button is the single best learning tool available to
                    you. Try a sequence of moves — if it leads to a dead end, undo
                    and try a completely different approach. Over time, you&apos;ll
                    develop the ability to recognize dead ends before you reach
                    them. This is how every expert player learned. Many winning
                    strategies only become visible after you&apos;ve explored
                    (and undone) several alternative paths. Never feel bad about
                    using undo — it&apos;s how you build intuition.
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

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Once you&apos;re consistently winning 60%+ of your games, these
                intermediate techniques will push your win rate toward the 80%
                mark. These strategies require more planning but yield
                significantly better results.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={5}
                  title="Build In-Suit Sequences When Possible"
                  level="intermediate"
                >
                  <p>
                    When you have a choice between building a sequence with
                    alternating suits or keeping cards in the same suit, prefer
                    same-suit whenever practical. Same-suit sequences (for example,
                    7{"\u2660"} on 8{"\u2660"}) can be moved directly to the
                    foundation without being broken apart, while mixed-suit
                    sequences need to be disassembled card by card. This
                    doesn&apos;t mean you should avoid mixed sequences — they&apos;re
                    still useful — but when you have the option, same-suit is almost
                    always better for your long-term plan.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={6}
                  title="Plan 5\u201310 Moves Ahead"
                  level="intermediate"
                >
                  <p>
                    Before every move, think about where it leads. Ask yourself:
                    &quot;After this move, what move does it enable? And what does
                    that enable?&quot; The best players see chains of moves, not
                    individual actions. A single move that accomplishes nothing on
                    its own might be brilliant if it&apos;s the first step in a
                    10-move chain that clears an entire column. Conversely, a move
                    that looks attractive in isolation might be terrible if it
                    blocks a critical card three moves from now. Develop the habit
                    of tracing move consequences at least 5 steps into the future.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={7}
                  title="Don't Build Long Sequences Too Early"
                  level="intermediate"
                >
                  <p>
                    A long, perfectly ordered sequence of cards looks satisfying,
                    but it locks up an entire column. You can&apos;t access any
                    cards beneath the sequence, and moving the sequence elsewhere
                    requires a lot of empty space. Build sequences only when they
                    serve your overall plan — when the cards you&apos;re stacking
                    actually need to be in that order for foundation building.
                    Building sequences just because the move is available is a
                    common intermediate-level trap. Ask yourself: &quot;Does this
                    sequence help me reach an Ace or build a foundation?&quot; If
                    not, the move might be a waste.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={8}
                  title="Watch the Foundation Balance"
                  level="intermediate"
                >
                  <p>
                    Try to keep your four foundation piles roughly equal in height.
                    If one suit gets far ahead of the others, you may find
                    yourself unable to auto-move cards because the cards they
                    depend on haven&apos;t reached their foundations yet. For
                    example, if your spades foundation is at 9{"\u2660"} but hearts
                    is still at 3{"\u2665"}, you won&apos;t be able to auto-move
                    any black cards beyond the 4 level — the game needs both red
                    foundations to be caught up first. Balanced foundations keep the
                    auto-move system flowing smoothly and prevent bottlenecks.
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

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                These are the techniques that separate 80% win rates from 90%+.
                They require deep board reading and careful calculation, but
                mastering them will make you nearly unbeatable.
              </p>

              <div className="space-y-8">
                <StrategyCard
                  number={9}
                  title="The 30-Second Opening Scan"
                  level="advanced"
                >
                  <p>
                    Before making your first move, invest 30 seconds in a
                    comprehensive board analysis. Identify: Where are all four
                    Aces? Which Aces are most accessible? Which cards are deeply
                    buried and will be hardest to free? Are any columns close to
                    being emptied? Are there natural in-suit sequences already
                    forming? Which columns have the most disorder? This initial
                    investment of time prevents the most common cause of losses:
                    committing to a plan before understanding the full landscape.
                    Expert players often spend more time on this opening analysis
                    than on the first 10 moves combined.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={10}
                  title="The Reversibility Principle"
                  level="advanced"
                >
                  <p>
                    When choosing between two moves of seemingly equal value,
                    always prefer the one that is more easily reversed. Moving a
                    card to a free cell is highly reversible — you can move it
                    back anytime. Moving a King to an empty column is essentially
                    permanent — that column is now occupied for a long time since
                    nothing can be placed on top of a King in cascade ordering.
                    Reversible moves keep your options open for future decisions.
                    Irreversible moves lock you into a specific path. The more
                    reversible your early moves are, the more information you
                    gather before committing to irreversible choices.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={11}
                  title="The Cascade Shuffle"
                  level="advanced"
                >
                  <p>
                    Sometimes the only way forward is to temporarily disassemble
                    an entire cascade — moving its cards into free cells and empty
                    columns, performing a critical operation underneath, then
                    reassembling everything. This is the most complex technique in
                    FreeCell and requires precise counting of available spaces.
                    Before attempting a shuffle, calculate: do you have enough
                    empty free cells and columns to hold all the cards you need to
                    move? Use the supermove formula: (1 + free cells) ×
                    2^(empty columns). If the number of cards you need to move
                    exceeds this, the shuffle is impossible and you need a
                    different approach.
                  </p>
                </StrategyCard>

                <StrategyCard
                  number={12}
                  title="Recognizing Lost Positions"
                  level="advanced"
                >
                  <p>
                    If you have filled all 4 free cells and have no empty columns,
                    you are often (but not always) stuck. Before giving up,
                    carefully check every possible move — sometimes a single
                    foundation move or an unexpected cascade placement opens things
                    up. But if after exhaustive checking there truly are no
                    productive moves available, the best strategy is recognizing
                    the lost position early and starting a new game rather than
                    wasting time. Expert players know when to cut their losses.
                    Spending 10 minutes on a lost position is time you could spend
                    winning the next game.
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

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Even experienced players fall into these traps. Recognizing these
                patterns in your own play is the fastest way to improve your
                win rate.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Filling free cells too early",
                    desc: "This is the #1 beginner mistake. Every filled free cell reduces your flexibility and move capacity. Never fill a free cell without a clear plan to empty it again soon.",
                  },
                  {
                    title: "Moving cards without a plan",
                    desc: "If you can\u2019t explain why you\u2019re making a move and what it enables, don\u2019t make it. Random moves feel productive but usually create more problems than they solve.",
                  },
                  {
                    title: "Ignoring deeply buried low cards",
                    desc: "An Ace buried under 6 cards is an emergency. If you don\u2019t address it early, by the time you dig it out, you may have exhausted your free cells and column space.",
                  },
                  {
                    title: "Moving Kings to empty columns too eagerly",
                    desc: "A King in an empty column is essentially permanent \u2014 nothing can be placed on top of a King in cascade ordering. Make sure you actually need that specific arrangement before committing an empty column to a King.",
                  },
                  {
                    title: "Building long sequences prematurely",
                    desc: "A perfectly ordered 8-card sequence looks impressive but locks up an entire column and requires massive move capacity to relocate. Only build long sequences when they directly serve your foundation-building plan.",
                  },
                  {
                    title: "Refusing to use undo",
                    desc: "Undo is not cheating \u2014 it\u2019s learning. Players who never undo learn slower and win less. The fastest path to improvement is exploring multiple approaches for each board position.",
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

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <p className="text-[#444444] leading-relaxed mb-5">
                Since nearly every FreeCell deal is solvable, your win rate is
                a direct measure of your skill. Here&apos;s how to gauge your
                progress and set realistic improvement goals.
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
                The best way to improve is practice. Apply these techniques in
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
