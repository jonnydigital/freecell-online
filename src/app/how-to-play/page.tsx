import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import AdUnit from "../../components/AdUnit";
import ContentLayout from "../../components/ContentLayout";

export const metadata: Metadata = {
  title: "How to Play FreeCell Solitaire | Complete Rules & Tutorial Guide",
  description:
    "Learn how to play FreeCell Solitaire with clear rules, board layout diagrams, card movement examples, and tips to win more games.",
  keywords: [
    "how to play freecell",
    "freecell rules",
    "freecell tutorial",
    "freecell solitaire rules",
    "freecell guide",
    "freecell for beginners",
    "freecell card game",
  ],
};

const CARD = "card-panel";
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

function MiniCard({
  rank,
  suit,
  ghost,
  glow,
}: {
  rank: string;
  suit: string;
  ghost?: boolean;
  glow?: boolean;
}) {
  const isRed = suit === "\u2665" || suit === "\u2666";
  if (ghost) {
    return (
      <div className="w-11 h-[3.75rem] rounded-lg border-2 border-dashed border-[#d4c5a0]/40 flex items-center justify-center text-[#c9a84c]/40 text-sm">
        {suit}
      </div>
    );
  }
  return (
    <div
      className={`w-11 h-[3.75rem] rounded-lg shadow-sm border flex flex-col items-center justify-center font-bold leading-none select-none
        ${isRed ? "bg-[#faf6f0] text-red-600 border-red-200/60" : "bg-[#faf6f0] text-gray-900 border-[#d4c5a0]/50"}
        ${glow ? "ring-2 ring-[#D4AF37] ring-offset-1" : ""}`}
    >
      <span className="text-sm">{rank}</span>
      <span className="text-[10px] mt-0.5">{suit}</span>
    </div>
  );
}

function BoardDiagram() {
  return (
    <div className="card-inset rounded-lg p-8 my-6 overflow-x-auto">
      <div className="flex justify-between items-start gap-8 min-w-[500px]">
        <div>
          <div className="text-[10px] text-[#B8860B]/60 font-bold uppercase tracking-widest mb-4">
            Free Cells
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-12 h-16 rounded-lg border-2 border-dashed border-[#d4c5a0]/40 bg-[#faf6f0]/50"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#B8860B]/60 font-bold uppercase tracking-widest mb-4">
            Foundations
          </div>
          <div className="flex gap-2">
            {(["\u2660", "\u2665", "\u2666", "\u2663"] as const).map((suit) => (
              <div
                key={suit}
                className="w-12 h-16 rounded-lg border-2 border-dashed border-[#d4c5a0]/40 bg-[#faf6f0]/50 flex items-center justify-center text-[#c9a84c]/40"
              >
                {suit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-[10px] text-[#B8860B]/60 font-bold uppercase tracking-widest mb-4 text-center">
          8 Cascades (Tableau)
        </div>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="w-12 h-32 rounded-lg border border-[#d4c5a0]/30 bg-[#faf6f0]/30"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ColorAlternationDiagram() {
  return (
    <div className="card-inset rounded-lg p-6 my-6 flex flex-col sm:flex-row items-center justify-center gap-12">
      <div className="text-center">
        <div className="text-[10px] font-bold text-[#2d8a4e] uppercase mb-4 tracking-widest">
          Valid Move
        </div>
        <div className="flex flex-col items-center">
          <MiniCard rank="6" suit={"\u2660"} />
          <div className="-mt-8">
            <MiniCard rank="5" suit={"\u2665"} glow />
          </div>
        </div>
      </div>
      <div className="text-center opacity-40">
        <div className="text-[10px] font-bold text-red-600 uppercase mb-4 tracking-widest">
          Invalid Move
        </div>
        <div className="flex flex-col items-center">
          <MiniCard rank="9" suit={"\u2660"} />
          <div className="-mt-8">
            <MiniCard rank="8" suit={"\u2663"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SupermoveFormula() {
  return (
    <div
      className={CARD}
      style={{
        ...CARD_TOP,
        background:
          "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
      }}
    >
      <div className="p-10 text-center">
        <div className="text-[10px] font-bold text-[#D4AF37] uppercase mb-6 tracking-widest">
          The Supermove Formula
        </div>
        <div className="text-3xl md:text-4xl font-black text-white mb-6">
          (1 + Free Cells) &times; 2<sup>Empty Columns</sup>
        </div>
        <p className="text-[#6B7280] text-sm max-w-md mx-auto leading-relaxed">
          This calculation determines the maximum number of cards you can move in
          a single sequence. Keeping spaces open is your greatest strategic
          advantage.
        </p>
      </div>
    </div>
  );
}

const tocItems = [
  { href: "#what-is-freecell", icon: "\u2660", label: "Introduction" },
  { href: "#the-board", icon: "\u2665", label: "The Board" },
  { href: "#rules", icon: "\u2666", label: "Rules" },
  { href: "#quick-start", icon: "\u2663", label: "Quick Start" },
  { href: "#supermoves", icon: "\u2660", label: "Supermoves" },
  { href: "#htp-faq", icon: "\u2665", label: "FAQ" },
];

const htpFaqs = [
  {
    question: "Can I undo moves in FreeCell?",
    answer:
      "Yes. Most FreeCell implementations, including ours, let you undo as many moves as you want. Undo is a learning tool, not cheating \u2014 use it to explore different lines of play and find better solutions.",
  },
  {
    question: "What happens when I clear all the cards?",
    answer:
      "When all 52 cards are on the four foundation piles (Ace through King in each suit), you win. Most digital versions trigger an auto-complete animation once every remaining card is in proper order, so you don\u2019t have to manually move the last few cards.",
  },
  {
    question: "Is FreeCell harder than regular Solitaire?",
    answer:
      "FreeCell is more strategic but actually has a much higher win rate. While Klondike (regular Solitaire) has a win rate around 30\u201340% even with perfect play, FreeCell is solvable 99.999% of the time. The difference is that FreeCell requires planning while Klondike relies partly on luck.",
  },
  {
    question: "Do I have to play Aces to foundations immediately?",
    answer:
      "You should. There is never a strategic reason to keep an Ace in the tableau \u2014 it can\u2019t have any card placed on it in the columns, so it\u2019s always dead weight. The same applies to 2s. Move them to foundations the moment they\u2019re available.",
  },
  {
    question: "What\u2019s the difference between free cells and empty columns?",
    answer:
      "Free cells hold exactly one card each. Empty columns can hold a single card or an entire ordered sequence. Empty columns also double your supermove capacity, making them far more valuable than free cells. Prioritize creating and protecting empty columns.",
  },
  {
    question: "Can I play FreeCell with keyboard shortcuts?",
    answer:
      "Yes. On desktop, press 1\u20138 to select cascade columns, A/S/D/F for free cells, and Q/W/E/R to move cards to foundations. Z undoes, Y redoes, H shows a hint, and N starts a new game. Press Space or Enter to auto-move a selected card, and Escape to deselect. Press ? at any time to see the full shortcuts guide.",
  },
];

export default function HowToPlayPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "How to Play", item: absoluteUrl('/how-to-play') },
    ],
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play FreeCell Solitaire",
    description:
      "Complete guide to playing FreeCell Solitaire. Learn the rules, board layout, and strategies.",
    step: [
      {
        "@type": "HowToStep",
        name: "Understand the Board",
        text: "The board consists of 4 free cells, 4 foundations, and 8 cascades.",
      },
      {
        "@type": "HowToStep",
        name: "Build Cascades",
        text: "Arrange cards in descending rank and alternating colors.",
      },
      {
        "@type": "HowToStep",
        name: "Use Free Cells Wisely",
        text: "Use the four free cells as temporary storage, keeping them empty whenever possible.",
      },
      {
        "@type": "HowToStep",
        name: "Win",
        text: "Move all cards to foundations by suit from Ace to King.",
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
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
          How to Play FreeCell Solitaire
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Master the subtle art of FreeCell with our definitive guide to rules,
          mechanics, and winning strategy.
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
        {/* ── Card 1: What is FreeCell? ── */}
        <section id="what-is-freecell" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Introduction"
              id="what-is-freecell-heading"
              icon={"\u2660"}
            >
              What is FreeCell?
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                FreeCell is a solitaire card game that defines itself through
                perfect information. Unlike Klondike, where hidden cards
                introduce an element of chance, FreeCell deals the entire
                52-card deck face-up.
              </p>
              <p>
                This transparency transforms the game from a test of luck into a
                test of pure logic. Statistically, 99.99% of deals are solvable.
                Every win is earned, and every loss is a lesson in foresight.
              </p>

              <div className="card-inset rounded-lg p-5">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Key Facts
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Cards", value: "52" },
                    { label: "Winnable", value: "99.99%" },
                    { label: "Hidden Cards", value: "None" },
                    { label: "Skill Factor", value: "100%" },
                  ].map((fact) => (
                    <div key={fact.label} className="text-center">
                      <div className="text-2xl font-bold text-[#2a2522]">
                        {fact.value}
                      </div>
                      <div className="text-xs text-[#6B7280] mt-1">
                        {fact.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 2: Understanding the Board ── */}
        <section id="the-board" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Layout & Zones"
              id="the-board-heading"
              icon={"\u2665"}
            >
              Understanding the Board
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] leading-relaxed mb-4">
                The layout is designed for efficiency. Mastering the
                board&apos;s zones is the first step toward advanced play.
              </p>
              <BoardDiagram />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="card-inset rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#D4AF37] font-bold">4</span>
                    <h3
                      className="font-medium text-[#2a2522]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      Free Cells
                    </h3>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    Temporary storage that holds one card each. Your emergency
                    reserve for reorganizing the board. Keep them empty as long
                    as possible.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#D4AF37] font-bold">4</span>
                    <h3
                      className="font-medium text-[#2a2522]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      Foundations
                    </h3>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    The goal piles. Build each suit upward from Ace to King.
                    Once all 52 cards are here, you win the game.
                  </p>
                </div>

                <div className="card-inset rounded-lg p-5 sm:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#D4AF37] font-bold">8</span>
                    <h3
                      className="font-medium text-[#2a2522]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      Cascades (Tableau)
                    </h3>
                  </div>
                  <p className="text-[#444444] text-sm leading-relaxed">
                    The main play area. All 52 cards are dealt face-up into 8
                    columns (4 columns of 7 cards, 4 columns of 6). Build
                    downward in alternating colors to organize cards and uncover
                    buried Aces.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 3: Rules of Engagement ── */}
        <section id="rules" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="How to Play"
              id="rules-heading"
              icon={"\u2666"}
            >
              Rules of Engagement
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-10">
              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  01. Alternating Sequences
                </h3>
                <p className="text-[#444444] leading-relaxed mb-4">
                  Move cards between columns in descending rank and alternating
                  colors. A Black 10 must be placed on a Red Jack.
                </p>
                <ColorAlternationDiagram />
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  02. Foundation Building
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  Move Aces to the foundation piles. Build each suit upward
                  sequentially: A, 2, 3&hellip; K. Once all 52 cards are on
                  foundations, the game is won.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  03. Space Management
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  The four Free Cells serve as temporary holding zones. Every
                  occupied cell reduces your mobility. Keep them clear to enable
                  complex maneuvers.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg font-semibold text-[#2a2522] mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  04. Winning the Game
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  The game is won when all 52 cards are stacked on the four
                  foundation piles by suit, from Ace to King. Most digital
                  versions trigger auto-complete once every remaining card is
                  in proper descending order in the tableau, finishing the game
                  for you automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Card 4: Quick Start Steps ── */}
        <section id="quick-start" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Beginner Walkthrough"
              id="quick-start-heading"
              icon={"\u2663"}
            >
              Quick Start in 4 Steps
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-8">
              {[
                {
                  num: 1,
                  title: "Scan the Board",
                  body: "Before making any move, spend 30 seconds studying the layout. Find where the Aces are, identify which columns are most tangled, and spot any natural sequences already in place. This single habit is the biggest predictor of winning.",
                },
                {
                  num: 2,
                  title: "Free the Aces",
                  body: "Your first priority is uncovering and moving Aces to the foundations. An Ace sitting on top of a column goes straight up. An Ace buried under six cards needs to be uncovered through careful reorganization. Move 2s to foundations immediately as well.",
                },
                {
                  num: 3,
                  title: "Create Empty Columns",
                  body: "Work toward emptying at least one column. An empty column is your most powerful tool \u2014 it can hold entire sequences and dramatically increases your supermove capacity. Consolidate short columns and move Kings into empty spaces.",
                },
                {
                  num: 4,
                  title: "Build to Foundations",
                  body: "As you organize the tableau, move cards to foundations whenever safe. Aces and 2s go immediately. For higher cards, make sure both opposite-color cards of the rank below are already on foundations before moving up.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1b5e30] text-[#c9a84c] border border-[#c9a84c]/30 flex items-center justify-center font-bold text-base sm:text-lg shadow-md">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#444444] leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}

              <div className="card-inset rounded-lg p-5">
                <p className="text-sm text-[#444444]">
                  <strong className="text-[#2a2522]">
                    Ready for more?
                  </strong>{" "}
                  These four steps will get you winning games quickly. For
                  deeper tactical knowledge, explore our{" "}
                  <Link
                    href="/tips"
                    className="text-[#D4AF37] hover:underline"
                  >
                    25 Tips & Tricks
                  </Link>{" "}
                  or dive into the full{" "}
                  <Link
                    href="/strategy"
                    className="text-[#D4AF37] hover:underline"
                  >
                    Strategy Guide
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 5: The Supermove ── */}
        <section id="supermoves" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Advanced Mechanic"
              id="supermoves-heading"
              icon={"\u2660"}
            >
              The Supermove
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <p className="text-[#444444] leading-relaxed mb-6">
                Modern FreeCell engines allow you to move entire sequences at
                once. This isn&apos;t a shortcut — it&apos;s a calculation of
                your available empty spaces.
              </p>
              <SupermoveFormula />
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* ── Card 6: FAQ ── */}
        <section id="htp-faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Common Questions"
              id="htp-faq-heading"
              icon={"\u2665"}
            >
              Frequently Asked Questions
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {htpFaqs.map((faq, i) => (
                <div key={i}>
                  <h3
                    className="font-medium text-[#2a2522] text-lg mb-2"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    {faq.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">{faq.answer}</p>
                  {i < htpFaqs.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Related Guides ── */}
        <section>
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading sub="Continue Learning" icon={"\u2666"}>
              Related Guides
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <ul className="space-y-4">
                <li>
                  <Link href="/freecell-for-beginners" className="text-[#D4AF37] hover:underline font-medium">
                    FreeCell for Beginners
                  </Link>
                  <span className="text-[#444444]"> — A gentler introduction for first-time players, covering the basics step by step.</span>
                </li>
                <li>
                  <Link href="/easy-freecell-games" className="text-[#D4AF37] hover:underline font-medium">
                    Easy FreeCell Games
                  </Link>
                  <span className="text-[#444444]"> — Start with deals that are easier to solve and build your confidence.</span>
                </li>
                <li>
                  <Link href="/strategy" className="text-[#D4AF37] hover:underline font-medium">
                    FreeCell Strategy Guide
                  </Link>
                  <span className="text-[#444444]"> — Advanced tactics for improving your win rate beyond the basics.</span>
                </li>
                <li>
                  <Link href="/tips" className="text-[#D4AF37] hover:underline font-medium">
                    25 FreeCell Tips & Tricks
                  </Link>
                  <span className="text-[#444444]"> — Quick, actionable advice to sharpen your game immediately.</span>
                </li>
                <li>
                  <Link href="/glossary" className="text-[#D4AF37] hover:underline font-medium">
                    FreeCell Glossary
                  </Link>
                  <span className="text-[#444444]"> — Definitions for every FreeCell term, from cascade to supermove.</span>
                </li>
              </ul>
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
                Ready to Play?
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                You know the rules. Now put them into practice with a real game
                of FreeCell.
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
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Learn Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ContentLayout>
  );
}
