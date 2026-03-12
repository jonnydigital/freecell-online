import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import AdUnit from "../../components/AdUnit";
import ContentLayout from "../../components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

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
  twitter: {
    card: "summary_large_image",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
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
        text: "A supermove is the ability to move multiple cards at once between columns. The number of cards you can move equals (1 + number of empty free cells) \u00d7 2^(number of empty columns). For example, with 2 empty free cells and 1 empty column, you can move (1+2)\u00d72 = 6 cards at once.",
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
        text: "Move aces and twos to foundations immediately \u2014 there is never a reason to keep them in play. For threes and above, only move them to foundations when both cards of the opposite color and one rank lower are already on foundations. For example, move the 5 of hearts to the foundation only when both the 4 of spades and 4 of clubs are already there.",
      },
    },
  ],
};

const tocItems = [
  { href: "#three-laws", icon: "\u2660", label: "The Three Laws" },
  { href: "#beginner", icon: "\u2665", label: "Beginner Tactics" },
  { href: "#intermediate", icon: "\u2666", label: "Intermediate" },
  { href: "#advanced", icon: "\u2663", label: "Expert Play" },
  { href: "#mistakes", icon: "\u2660", label: "Common Mistakes" },
  { href: "#practice", icon: "\u2665", label: "Practice Drills" },
  { href: "#faq", icon: "\u2666", label: "FAQ" },
];

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
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522] scroll-mt-6"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

export default function StrategyPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Strategy Guide", item: absoluteUrl('/strategy') },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Strategy Guide
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          The difference between a 50% win rate and 90%+ is pure strategy. This
          guide covers everything from first principles to expert-level endgame
          technique.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── TOC Pills ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {tocItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${item.icon === "\u2665" || item.icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-12">

        {/* ── Card 1: The Three Laws ── */}
        <section id="three-laws" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Core Principles" id="three-laws-heading" icon={"\u2660"}>
              The Three Laws of FreeCell
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] text-lg leading-relaxed mb-8">
                Every winning FreeCell strategy flows from three core principles.
                Internalize these and you&apos;ll win 80% of your games before
                learning anything else.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Preserve Space",
                    body: (
                      <>
                        Every filled{" "}
                        <Link href="/glossary#free-cell" className="text-[#D4AF37] hover:underline">
                          free cell
                        </Link>{" "}
                        halves your movement capacity. With 4 empty free cells and 1
                        empty column, you can move 10 cards at once. Fill 3 free cells
                        and that drops to 4. Keep your workspace open at all costs.
                      </>
                    ),
                  },
                  {
                    title: "Think in Chains",
                    body: "Never move a card without knowing the next 3 moves it enables. Ask yourself: \u201CIf I move this 7 of hearts, what does that uncover? Can I then access the 6 of spades underneath? Does that free the Ace?\u201D Foresight is your only tool.",
                  },
                  {
                    title: "Exhume Low Cards",
                    body: "Aces and twos buried deep in a column are emergencies. Your foundations can\u2019t start building until aces are free, and every card sitting on top of an ace is blocking your entire game. Map their locations immediately.",
                  },
                ].map((law) => (
                  <div key={law.title} className="card-inset rounded-lg p-5">
                    <div className="w-10 h-1 bg-[#D4AF37] mb-4 rounded-full" />
                    <h3
                      className="text-lg font-semibold text-[#2a2522] mb-3"
                      style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                    >
                      {law.title}
                    </h3>
                    <p className="text-[#444444] text-sm leading-relaxed">{law.body}</p>
                  </div>
                ))}
              </div>

              <div className="card-inset rounded-lg p-5 mt-6">
                <p className="text-sm text-[#444444]">
                  <strong className="text-[#2a2522]">Pro tip:</strong> Before your first move, count how many
                  aces are visible (on top of columns) vs. buried. If 3+ aces are
                  buried, the game will require careful planning. If all 4 are
                  accessible, you&apos;re likely looking at a quick win.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 2: Beginner Fundamentals ── */}
        <section id="beginner" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Getting Started" id="beginner-heading" icon={"\u2665"}>
              Beginner Fundamentals
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8">
              {[
                {
                  num: "01",
                  title: "The Opening Scan",
                  body: (
                    <>
                      <p>
                        Spend 30 seconds studying the board before touching a card.
                        This is the single most impactful habit you can develop.
                        Identify:
                      </p>
                      <ul className="mt-3 space-y-2 text-base">
                        <li className="flex items-start gap-2">
                          <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                          <span><strong className="text-[#2a2522]">Where are the aces?</strong> Visible on top of columns, or buried? How deep?</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                          <span><strong className="text-[#2a2522]">Which columns are cleanest?</strong> Short columns or partially sorted ones are your best friends.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                          <span><strong className="text-[#2a2522]">Are any columns already in order?</strong> A run of K-Q-J in alternating colors is free real estate.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                          <span><strong className="text-[#2a2522]">Where are the kings?</strong> Kings can only go in empty columns. Their position dictates your late-game options.</span>
                        </li>
                      </ul>
                    </>
                  ),
                },
                {
                  num: "02",
                  title: "Prioritize Aces and Twos",
                  body: (
                    <p>
                      Move aces to the{" "}
                      <Link href="/glossary#foundation" className="text-[#D4AF37] hover:underline">
                        foundation
                      </Link>{" "}
                      the instant they&apos;re available — there is never a strategic
                      reason to keep an ace in play. The same applies to twos. Every
                      ace on the foundation means one fewer card cluttering your
                      tableau, and it opens the path for building sequences above it.
                    </p>
                  ),
                },
                {
                  num: "03",
                  title: "Empty Columns > Free Cells",
                  body: (
                    <>
                      <p>
                        New players instinctively dump cards into free cells. Resist
                        this urge. An empty column is exponentially more powerful
                        because it can hold an entire sequence, not just one card. Use
                        free cells only as a last resort, and free them up as quickly
                        as possible.
                      </p>
                      <div className="card-inset rounded-lg p-4 mt-3 text-sm">
                        <strong className="text-[#2a2522]">The math:</strong> Your maximum{" "}
                        <Link href="/glossary#supermove" className="text-[#D4AF37] hover:underline">
                          supermove
                        </Link>{" "}
                        size = (1 + empty free cells) &times; 2<sup>empty columns</sup>.
                        With 4 free cells and 0 empty columns, you move 5 cards. With
                        3 free cells and 1 empty column, you move 8. The column is
                        worth more.
                      </div>
                    </>
                  ),
                },
                {
                  num: "04",
                  title: "Use Undo Liberally",
                  body: (
                    <p>
                      FreeCell is a game of perfect information — there&apos;s no
                      hidden deck. The undo button isn&apos;t cheating, it&apos;s
                      exploring. If a sequence of moves leads to a dead end, undo
                      and try a different path. Expert players routinely undo 10-20
                      moves to find a better line. Think of it as reading ahead in
                      chess.
                    </p>
                  ),
                },
                {
                  num: "05",
                  title: "Don\u2019t Build Long Sequences Too Early",
                  body: (
                    <p>
                      A perfectly sorted 8-card sequence looks satisfying but
                      it&apos;s often a trap. That sequence occupies an entire column
                      and can&apos;t be easily moved without multiple free cells and
                      empty columns. Only build long sequences when you have a clear
                      path to the foundation or when the cards would be worse off
                      scattered.
                    </p>
                  ),
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
                    {item.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">{item.title}</h3>
                    <div className="text-[#444444] leading-relaxed">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 3: Intermediate Tactics ── */}
        <section id="intermediate" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Level Up" id="intermediate-heading" icon={"\u2666"}>
              Intermediate Tactics
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8 text-[#444444] leading-relaxed">
              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
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
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Column Management
                </h3>
                <p>
                  Think of your 8 columns as having roles. Some are
                  &ldquo;working columns&rdquo; where you&apos;re actively
                  building sequences. Others are &ldquo;storage columns&rdquo;
                  holding cards you can&apos;t use yet. And ideally, 1-2 are
                  empty &ldquo;buffer columns.&rdquo;
                </p>
                <ul className="mt-3 space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">Never fill your last empty column</strong> unless it&apos;s for a game-winning sequence.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">Consolidate short columns.</strong> Two columns with 2 cards each are weaker than one column with 4 and one empty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">Place kings strategically.</strong> A king in an empty column is permanent — nothing goes on top except queens.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
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
                <div className="card-inset rounded-lg p-4 mt-3 text-sm">
                  <strong className="text-[#2a2522]">Rule of thumb:</strong> Never fill more than 2 free
                  cells simultaneously in the early game. In the mid-game, 3 is
                  acceptable if you have a clear plan to empty them. Filling all
                  4 is almost always a losing position.
                </div>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  The Foundation Timing Rule
                </h3>
                <p>
                  Moving cards to the foundation seems always good, but it can
                  lock you out of plays. The safe rule: move a card to the
                  foundation only when both cards of the <em>opposite color</em>{" "}
                  and one rank lower are already on the foundation. For example,
                  the 7{"\u2665"} is safe to move up only when both the 6{"\u2660"} and 6{"\u2663"} are
                  already on their foundations. This ensures you never need the
                  card back in the tableau.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 4: Advanced Techniques ── */}
        <section id="advanced" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Advanced Technique" id="advanced-heading" icon={"\u2663"}>
              Expert Play
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8 text-[#444444] leading-relaxed">
              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
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
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
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
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
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
                  <Link href="/tips" className="text-[#D4AF37] hover:underline">
                    tips page
                  </Link>{" "}
                  has more examples of cascade sequences.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                >
                  Endgame Patterns
                </h3>
                <p>
                  The endgame begins when you can see a clear path to auto-complete.
                  Recognize these patterns:
                </p>
                <ul className="mt-3 space-y-2 text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">All cards exposed:</strong> If every card is at the bottom of a column, on a foundation, or in a free cell, auto-complete triggers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">Single-suit lockout:</strong> If one suit is scattered while the other three are nearly done, focus everything on consolidating that suit.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">&#x2022;</span>
                    <span><strong className="text-[#2a2522]">The parking problem:</strong> When you need a King in an empty column but every column is needed for supermoves — sometimes finish one suit completely first to free space.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 5: Common Mistakes ── */}
        <section id="mistakes" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="What to Avoid" id="mistakes-heading" icon={"\u2660"}>
              Common Mistakes
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-4">
              {[
                {
                  title: "Moving without a plan",
                  desc: "The biggest mistake is making \u201Cobvious\u201D moves without thinking about consequences. Every card you move changes the board state. Before each move, ask: \u201CWhat does this enable?\u201D If the answer is \u201Cnothing,\u201D don\u2019t move it.",
                },
                {
                  title: "Filling all free cells early",
                  desc: "With all 4 free cells occupied, your supermove capacity drops to 1 (or 2 with an empty column). You\u2019re essentially paralyzed. If you find yourself with 3+ filled free cells in the first 20 moves, consider undoing.",
                },
                {
                  title: "Ignoring buried aces",
                  desc: "It\u2019s tempting to build sequences with visible cards while ignoring the ace buried 6 cards deep. But that ace needs to come out eventually, and the longer you wait, the more constrained your board becomes. Address buried aces within your first 10 moves.",
                },
                {
                  title: "Building sequences you can\u2019t move",
                  desc: "A beautiful 7-card alternating-color sequence is worthless if you don\u2019t have the supermove capacity to relocate it. Before building, calculate whether you\u2019ll be able to move the sequence when you need to.",
                },
                {
                  title: "Putting kings in empty columns too early",
                  desc: "A king in an empty column is semi-permanent. If it\u2019s not the right king (the one you need to build a full suit sequence on), you\u2019ve wasted your most valuable resource. Leave columns empty until you\u2019re certain.",
                },
                {
                  title: "Moving cards to foundations too aggressively",
                  desc: "Yes, foundations are the goal. But moving a 6 to the foundation when you still need it to hold a 5 in the tableau can lock you out. Follow the foundation timing rule: only move up when opposite-color cards of lower rank are already home.",
                },
                {
                  title: "Giving up too early",
                  desc: "FreeCell has a 99.999% solvability rate. If you think you\u2019re stuck, you probably haven\u2019t explored all lines. Use undo aggressively, try different opening sequences, and remember that the solution often requires unintuitive moves.",
                },
              ].map((mistake, i) => (
                <div
                  key={i}
                  className="card-inset rounded-lg p-5 flex gap-4"
                >
                  <span className="text-red-400 font-black text-lg shrink-0">
                    {"\u2717"}
                  </span>
                  <div>
                    <h3 className="font-semibold text-[#2a2522] mb-1">{mistake.title}</h3>
                    <p className="text-[#444444] text-sm leading-relaxed">{mistake.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 6: Practice Drills ── */}
        <section id="practice" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Build Your Skills" id="practice-heading" icon={"\u2665"}>
              Practice Drills
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] leading-relaxed mb-8">
                Reading about strategy only gets you so far. These exercises build
                the pattern recognition that separates beginners from experts.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    The 30-Second Scan
                  </h3>
                  <p className="text-[#444444] text-sm mb-3">
                    Start{" "}
                    <Link href="/game/1" className="text-[#D4AF37] hover:underline">
                      Game #1
                    </Link>
                    . Before making any move, locate all 4 aces and identify the 3
                    best opening moves. Then play. Repeat with{" "}
                    <Link href="/game/2" className="text-[#D4AF37] hover:underline">
                      Game #2
                    </Link>{" "}
                    and{" "}
                    <Link href="/game/3" className="text-[#D4AF37] hover:underline">
                      Game #3
                    </Link>
                    .
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    The Zero Free Cell Challenge
                  </h3>
                  <p className="text-[#444444] text-sm mb-3">
                    Play any game and try to win using free cells as little as
                    possible. Track how many times you used them. Expert benchmark:
                    win using free cells 5 or fewer times total.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Streak Training
                  </h3>
                  <p className="text-[#444444] text-sm mb-3">
                    Our{" "}
                    <Link href="/streak" className="text-[#D4AF37] hover:underline">
                      Streak mode
                    </Link>{" "}
                    challenges you to win consecutive games. Start with a goal of
                    3, then 5, then 10. Streaks force consistent play — you
                    can&apos;t rely on luck across multiple games.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    Speed Run
                  </h3>
                  <p className="text-[#444444] text-sm mb-3">
                    Once you&apos;re winning consistently, optimize for speed. Try
                    to solve{" "}
                    <Link href="/game/5" className="text-[#D4AF37] hover:underline">
                      Game #5
                    </Link>{" "}
                    under 3 minutes. Speed forces intuitive decision-making — the
                    mark of true mastery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 7: FAQ ── */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2666"}>
              Frequently Asked Questions
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {faqJsonLd.mainEntity.map((item, i) => (
                <div key={i}>
                  <h3
                    className="font-medium text-[#2a2522] text-lg mb-2"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {item.name}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">
                    {item.acceptedAnswer.text}
                  </p>
                  {i < faqJsonLd.mainEntity.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
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
                Put Strategy to the Test
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Apply these strategies in a real game. Start with an easy deal or
                jump into today&apos;s Daily Challenge.
              </p>
              <p className="text-sm text-white/60 mb-6 max-w-2xl mx-auto leading-7">
                For a more focused study path, read{" "}
                <Link href="/is-every-freecell-game-winnable" className="text-[#D4AF37] hover:underline">
                  why almost every FreeCell game is solvable
                </Link>
                , what separates{" "}
                <Link href="/hard-freecell-games" className="text-[#D4AF37] hover:underline">
                  hard deals
                </Link>{" "}
                from merely messy ones, or grab the{" "}
                <Link href="/freecell-cheat-sheet" className="text-[#D4AF37] hover:underline">
                  cheat sheet
                </Link>{" "}
                for a quick-reference version of these strategies. You can also
                explore the{" "}
                <Link href="/freecell-probability" className="text-[#D4AF37] hover:underline">
                  probability and math behind FreeCell
                </Link>{" "}
                or see how these tactics adapt to{" "}
                <Link href="/bakers-game/strategy" className="text-[#D4AF37] hover:underline">
                  Baker&apos;s Game strategy
                </Link>
                .
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
                  href="/tips"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Quick Tips
                </Link>
              </div>
            </div>
          </div>
        </section>
        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
