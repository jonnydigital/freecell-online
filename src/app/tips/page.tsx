import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "25 FreeCell Tips & Tricks | Quick Ways to Win More Games",
  description:
    "25 actionable FreeCell tips and tricks to improve your win rate immediately. Quick, scannable advice for beginners and intermediate players — from first-move strategy to endgame technique.",
  keywords: [
    "freecell tips",
    "freecell tricks",
    "freecell help",
    "freecell advice",
    "how to win freecell",
    "freecell beginner tips",
    "freecell cheat sheet",
    "freecell quick tips",
    "improve freecell win rate",
    "freecell strategy tips",
  ],
  openGraph: {
    title: "25 FreeCell Tips & Tricks | Quick Ways to Win More Games",
    description:
      "25 quick, actionable FreeCell tips to boost your win rate. Scannable advice for beginners and experienced players. Start winning more games today.",
    url: "https://playfreecellonline.com/tips",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── Tips data ── */

interface Tip {
  title: string;
  body: string;
  category: "before" | "during" | "cells" | "columns" | "endgame";
}

const tips: Tip[] = [
  {
    category: "before",
    title: "Scan the entire board before your first move",
    body: "Spend 30 seconds studying the layout before touching a card. Find where the Aces and 2s are buried, identify which columns are most tangled, and form a rough plan. Players who scan first win significantly more than those who dive in.",
  },
  {
    category: "before",
    title: "Locate all four Aces immediately",
    body: "Your first priority should be knowing exactly where every Ace is. An Ace buried under six cards needs to be uncovered early. An Ace sitting on top can go straight to the foundation. This single habit shapes your entire opening strategy.",
  },
  {
    category: "before",
    title: "Count the buried low cards",
    body: "After finding the Aces, locate the 2s and 3s. These cards need to reach the foundations early — if they're trapped deep in columns, that's where your attention needs to go first. A buried 2 blocks an entire suit's progress.",
  },
  {
    category: "before",
    title: "Look for natural sequences already in place",
    body: "Some columns will already have cards in alternating-color descending order. Identify these — they're free sequences you don't need to break up. Build your plan around preserving them rather than dismantling everything.",
  },
  {
    category: "before",
    title: "Identify the hardest column first",
    body: "One column usually has the worst tangle — Aces buried under Kings, colors all wrong, no natural sequences. Identify this problem column early so you can start working toward it before your free cells and empty columns fill up.",
  },
  {
    category: "during",
    title: "Play to the foundations whenever possible",
    body: "Every card on a foundation is a card you never need to think about again. Whenever an Ace, 2, or next-in-sequence card is available, move it to the foundation immediately. There's no strategic reason to delay foundation moves for low cards.",
  },
  {
    category: "during",
    title: "Don't auto-play high cards too early",
    body: "While Aces and 2s should go to foundations immediately, be cautious with 7s and above. A black 7 on the foundation can't be used to hold a red 6 in the tableau anymore. Only move high cards to foundations when both colors of the rank below are already safe.",
  },
  {
    category: "during",
    title: "Think at least 5 moves ahead",
    body: "Every move should be part of a plan. Before moving a card, trace the chain: what does this move uncover? What does that card need next? Can you complete the entire sequence? If you can't see where a move leads, look harder before committing.",
  },
  {
    category: "during",
    title: "Use undo liberally — it's not cheating",
    body: "The undo button is a learning tool. When a sequence of moves leads to a dead end, undo and try a different path. Over time, you'll start seeing dead ends before they happen. Experienced players use undo to explore possibilities, not to fix mistakes.",
  },
  {
    category: "during",
    title: "Uncover face-down cards? Wrong game — but uncover buried Aces",
    body: "FreeCell has no hidden cards, but the principle applies: prioritize uncovering deeply buried Aces and 2s. Every move that gets you closer to freeing a low card is a move toward winning. Don't get distracted by easy moves that don't help your core goal.",
  },
  {
    category: "cells",
    title: "Keep free cells empty as long as possible",
    body: "Empty free cells are your most valuable resource. Each empty cell gives you one more card of movement capacity. Filling all four cells early is the #1 cause of lost games. Treat free cells like an emergency reserve, not a convenience.",
  },
  {
    category: "cells",
    title: "If you must use a cell, have a plan to empty it",
    body: "Before placing a card in a free cell, know exactly how you'll get it back out. 'I'll figure it out later' is the road to defeat. The card should return to the tableau or go to a foundation within a few moves.",
  },
  {
    category: "cells",
    title: "Learn the supermove formula",
    body: "You can move (1 + empty free cells) × 2^(empty columns) cards at once. With 2 empty cells and 1 empty column: (1+2) × 2^1 = 6 cards. This formula determines whether a multi-card move is possible. Memorize it — it's the most important math in FreeCell.",
  },
  {
    category: "cells",
    title: "Fill cells with high cards, not low ones",
    body: "If you must use a free cell, put a high card (Jack, Queen, King) there rather than a low one. Low cards are needed to build sequences and reach foundations quickly. A King in a free cell is inconvenient; an Ace in a free cell is a disaster.",
  },
  {
    category: "cells",
    title: "Never fill the last free cell without a guaranteed path",
    body: "Your last empty free cell is your lifeline. Using it without a clear plan to immediately free it (or empty a column) usually means the game is over. Treat filling the last cell as an emergency-only move.",
  },
  {
    category: "columns",
    title: "Empty columns are more valuable than free cells",
    body: "An empty column can hold an entire ordered sequence, while a free cell holds only one card. Empty columns also double your supermove capacity (remember the 2^ in the formula). Prioritize creating empty columns and guard them carefully.",
  },
  {
    category: "columns",
    title: "Don't waste empty columns on single cards",
    body: "It's tempting to move a single card into an empty column, but this wastes the column's main value: holding multi-card sequences. Only place single cards in empty columns as part of a larger plan, and try to fill them with Kings when possible.",
  },
  {
    category: "columns",
    title: "Fill empty columns with Kings",
    body: "Kings can't be placed on any other card, so an empty column is their natural home. A King-led sequence in its own column is working toward a complete foundation run and isn't blocking anything. When you create an empty column, try to move a King there.",
  },
  {
    category: "columns",
    title: "Build long descending sequences in the tableau",
    body: "A well-ordered column of alternating-color cards from King down to a low card is extremely powerful. It's essentially 'solved' — those cards will flow to the foundations in order. Work toward consolidating partial sequences into longer ones.",
  },
  {
    category: "columns",
    title: "Avoid building on buried Aces",
    body: "If a column has an Ace buried at the bottom, don't add more cards to the top unless you're actively working to uncover that Ace. Piling onto a buried Ace makes it harder to extract and delays the entire suit's foundation progress.",
  },
  {
    category: "endgame",
    title: "Recognize when a game is won (even if cards remain)",
    body: "Once every card is in a proper descending sequence with no tangles, the game is effectively won — the remaining moves are mechanical. Recognizing this state early saves time and builds confidence. Many games are 'won' long before auto-complete kicks in.",
  },
  {
    category: "endgame",
    title: "Recognize when a game is lost",
    body: "If all four free cells are full, no columns are empty, and no productive moves exist, the game is over. Restarting early is better than spending ten minutes searching for a move that doesn't exist. Learn to spot dead ends quickly.",
  },
  {
    category: "endgame",
    title: "When stuck, work backward from what you need",
    body: "Instead of looking for any available move, identify the card you need most (usually the lowest unplayed card for a foundation). Then trace backward: where is it, what's blocking it, how do you unblock it? Working backward from the goal is more productive than scanning for forward moves.",
  },
  {
    category: "endgame",
    title: "Don't restart too quickly on hard deals",
    body: "Some deals look terrible but are solvable with creative play. Before giving up, try at least 2-3 different opening approaches. The deal that looks impossible with one opening might crack wide open with a different first few moves.",
  },
  {
    category: "endgame",
    title: "Track your win rate to measure improvement",
    body: "Your win rate is the most honest measure of your skill. Keep track of it and watch it climb as you apply these tips. Beginners typically start around 30-50% and can reach 70-80% within weeks of deliberate practice. Advanced players push past 85-90%.",
  },
];

const tipCategories = [
  { id: "before", label: "Before You Play", icon: "\u2660", count: 5 },
  { id: "during", label: "During the Game", icon: "\u2665", count: 5 },
  { id: "cells", label: "Free Cell Management", icon: "\u2666", count: 5 },
  { id: "columns", label: "Column Strategy", icon: "\u2663", count: 5 },
  { id: "endgame", label: "Late Game & Mindset", icon: "\u2660", count: 5 },
];

/* ── FAQ data ── */

const tipsFaqs = [
  {
    question: "What is the single most important FreeCell tip?",
    answer:
      "Keep your free cells empty. This one habit separates winning players from losing ones. Every occupied free cell reduces your movement options. Experienced players treat free cells as a last resort, not a first option. If you change nothing else about your play, keeping cells empty will immediately improve your win rate.",
  },
  {
    question: "How can I stop losing FreeCell games?",
    answer:
      "The three most common reasons for losing are: filling all four free cells too early, not scanning the board before making moves, and not planning sequences in advance. Focus on these three habits first. Use the undo button to explore different approaches when you hit dead ends. Most FreeCell deals are winnable — losses are almost always strategic errors.",
  },
  {
    question: "Is there a trick to winning FreeCell every time?",
    answer:
      "There's no single trick, but there's a system: scan the board first, keep free cells empty, prioritize uncovering Aces and 2s, create empty columns, and learn the supermove formula. Players who consistently follow these principles win 85-95% of their games. The remaining 5-15% are extremely difficult deals that may require dozens of attempts.",
  },
  {
    question: "How long does it take to get good at FreeCell?",
    answer:
      "Most players see noticeable improvement within 20-30 games of deliberate practice. Focus on one or two tips at a time rather than trying to apply everything at once. Within a few weeks of regular play, beginners typically jump from a 30-40% win rate to 60-70%. Getting above 85% takes months of consistent play and pattern recognition.",
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

function TipCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
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

export default function TipsPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "25 FreeCell Tips & Tricks: Quick Ways to Win More Games",
      description:
        "25 actionable FreeCell tips and tricks to boost your win rate. Quick, scannable advice covering board scanning, free cell management, column strategy, and endgame technique.",
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
        "@id": "https://playfreecellonline.com/tips",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: tipsFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  let tipNumber = 0;

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
            <li className="text-white/80">Tips & Tricks</li>
          </ol>
        </nav>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          FreeCell Tips & Tricks
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          25 quick, actionable tips to win more FreeCell games starting
          today. No theory lectures — just practical advice you can use in
          your next game.
        </p>

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
          {tipCategories.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${cat.icon === "\u2665" || cat.icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {cat.icon}
              </span>
              {cat.label}
            </a>
          ))}
          <a
            href="#faq"
            className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
          >
            <span className="text-sm text-red-400">{"\u2665"}</span>
            FAQ
          </a>
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {/* Quick-win callout */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <div className="px-8 sm:px-10 md:px-12 py-8">
              <div className="card-inset rounded-lg p-5">
                <h2
                  className="font-medium text-[#2a2522] text-lg mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  The 3 Tips That Matter Most
                </h2>
                <p className="text-[#444444] leading-relaxed mb-4">
                  If you only remember three things from this entire page,
                  make it these. They account for the biggest win-rate jump
                  for most players:
                </p>
                <ol className="space-y-2 text-[#444444]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold shrink-0">
                      1.
                    </span>
                    <span>
                      <strong>Scan the board</strong> before your first move
                      (
                      <a
                        href="#before"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Tip #1
                      </a>
                      )
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold shrink-0">
                      2.
                    </span>
                    <span>
                      <strong>Keep free cells empty</strong> as long as
                      possible (
                      <a
                        href="#cells"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Tip #11
                      </a>
                      )
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold shrink-0">
                      3.
                    </span>
                    <span>
                      <strong>Create empty columns</strong> and protect them
                      (
                      <a
                        href="#columns"
                        className="text-[#D4AF37] hover:underline"
                      >
                        Tip #16
                      </a>
                      )
                    </span>
                  </li>
                </ol>
                <p className="text-[#6B7280] text-sm mt-4">
                  Want the deeper strategic framework? Check out our{" "}
                  <Link
                    href="/strategy"
                    className="text-[#D4AF37] hover:underline"
                  >
                    full Strategy Guide
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tip sections by category */}
        {tipCategories.map((cat) => {
          const categoryTips = tips.filter((t) => t.category === cat.id);
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-6">
              <div className={CARD} style={CARD_TOP}>
                <SectionHeading
                  sub={`Tips ${tipNumber + 1}–${tipNumber + categoryTips.length}`}
                  id={`${cat.id}-heading`}
                  icon={cat.icon}
                >
                  {cat.label}
                </SectionHeading>

                <div className="px-8 sm:px-10 md:px-12 py-8 space-y-8">
                  {categoryTips.map((tip) => {
                    tipNumber++;
                    const num = tipNumber;
                    return (
                      <TipCard key={num} number={num} title={tip.title}>
                        <p>{tip.body}</p>
                      </TipCard>
                    );
                  })}
                </div>
              </div>
            </section>
          );
        })}

        {/* Quick reference card */}
        <section className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Cheat Sheet"
              id="cheat-sheet-heading"
              icon={"\u2666"}
            >
              FreeCell Quick Reference
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Supermove Formula
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed mb-2">
                    Max cards you can move at once:
                  </p>
                  <div className="bg-white/50 rounded-md p-3 text-center font-mono text-[#2a2522] text-sm border border-[#e5e0d8]">
                    (1 + empty cells) &times; 2<sup>empty columns</sup>
                  </div>
                  <div className="mt-3 space-y-1 text-xs text-[#6B7280]">
                    <p>0 cells, 0 columns = 1 card</p>
                    <p>2 cells, 1 column = 6 cards</p>
                    <p>4 cells, 0 columns = 5 cards</p>
                    <p>4 cells, 2 columns = 20 cards</p>
                  </div>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Foundation Auto-Play Rule
                  </h3>
                  <p className="text-[#444444] text-sm leading-relaxed mb-3">
                    Safe to auto-play to foundations when:
                  </p>
                  <ul className="space-y-1.5 text-sm text-[#444444]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] shrink-0">
                        {"\u2713"}
                      </span>
                      Aces and 2s — always safe
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] shrink-0">
                        {"\u2713"}
                      </span>
                      3s through 6s — safe if both opposite-color cards of
                      the rank below are already on foundations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] shrink-0">
                        {"\u2713"}
                      </span>
                      7s and above — safe only when you&apos;re sure
                      they won&apos;t be needed in the tableau
                    </li>
                  </ul>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Win Rate Benchmarks
                  </h3>
                  <ul className="space-y-1.5 text-sm text-[#444444]">
                    <li className="flex justify-between">
                      <span>Beginner</span>
                      <span className="text-[#6B7280]">30–50%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Intermediate</span>
                      <span className="text-[#6B7280]">65–80%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Advanced</span>
                      <span className="text-[#6B7280]">80–90%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Expert</span>
                      <span className="text-[#6B7280]">90–95%+</span>
                    </li>
                  </ul>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <h3
                    className="font-medium text-[#2a2522] mb-3"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    Priority Order
                  </h3>
                  <ol className="space-y-1.5 text-sm text-[#444444]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] font-bold shrink-0">
                        1.
                      </span>
                      Move Aces &amp; 2s to foundations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] font-bold shrink-0">
                        2.
                      </span>
                      Uncover buried low cards
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] font-bold shrink-0">
                        3.
                      </span>
                      Create empty columns
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] font-bold shrink-0">
                        4.
                      </span>
                      Build long ordered sequences
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#B8860B] font-bold shrink-0">
                        5.
                      </span>
                      Use free cells (last resort)
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Common Questions"
              id="faq-heading"
              icon={"\u2665"}
            >
              FreeCell Tips FAQ
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-6">
              {tipsFaqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {i < tipsFaqs.length - 1 && (
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
                Put These Tips to the Test
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Pick 2-3 tips from this page and focus on them in your next
                game. Small, deliberate changes lead to big improvements.
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
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Full Strategy Guide
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
              href="/winning-deals"
              className="hover:text-[#6B7280] transition-colors"
            >
              Winning Deals
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
