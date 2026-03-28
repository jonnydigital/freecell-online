import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import InContentAd from "@/components/InContentAd";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, TocPills, CtaSection, JsonLd } from '@/components/content';

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

/* ── Helper components ── */

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
  // Sample cascade data (partial Deal #1 layout)
  const cascades: Array<Array<{ rank: string; suit: string }>> = [
    [{ rank: "J", suit: "\u2666" }, { rank: "K", suit: "\u2666" }, { rank: "2", suit: "\u2660" }],
    [{ rank: "2", suit: "\u2666" }, { rank: "K", suit: "\u2663" }, { rank: "5", suit: "\u2663" }],
    [{ rank: "9", suit: "\u2665" }, { rank: "9", suit: "\u2660" }, { rank: "4", suit: "\u2660" }],
    [{ rank: "J", suit: "\u2663" }, { rank: "5", suit: "\u2660" }, { rank: "Q", suit: "\u2665" }],
    [{ rank: "5", suit: "\u2666" }, { rank: "A", suit: "\u2666" }, { rank: "8", suit: "\u2665" }],
    [{ rank: "7", suit: "\u2665" }, { rank: "Q", suit: "\u2663" }, { rank: "A", suit: "\u2663" }],
    [{ rank: "7", suit: "\u2663" }, { rank: "K", suit: "\u2665" }, { rank: "A", suit: "\u2665" }],
    [{ rank: "5", suit: "\u2665" }, { rank: "3", suit: "\u2665" }, { rank: "7", suit: "\u2660" }],
  ];

  return (
    <div className="card-inset rounded-lg p-6 sm:p-8 my-4 overflow-x-auto">
      <div className="flex justify-between items-start gap-6 min-w-[480px]">
        <div>
          <div className="text-[10px] text-[#7a5c12] font-bold uppercase tracking-widest mb-3">
            Free Cells
          </div>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-11 h-[3.75rem] rounded-lg border-2 border-dashed border-[#d4c5a0]/40 bg-[#faf6f0]/50"
              />
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-[#7a5c12] font-bold uppercase tracking-widest mb-3">
            Foundations
          </div>
          <div className="flex gap-1.5">
            {(["\u2660", "\u2665", "\u2666", "\u2663"] as const).map((suit) => (
              <div
                key={suit}
                className="w-11 h-[3.75rem] rounded-lg border-2 border-dashed border-[#d4c5a0]/40 bg-[#faf6f0]/50 flex items-center justify-center text-[#8B6914]/40"
              >
                {suit}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="text-[10px] text-[#7a5c12] font-bold uppercase tracking-widest mb-3 text-center">
          8 Cascades (Tableau)
        </div>
        <div className="flex gap-1.5 justify-center">
          {cascades.map((col, i) => (
            <div key={i} className="flex flex-col items-center">
              {col.map((card, j) => {
                const isRed = card.suit === "\u2665" || card.suit === "\u2666";
                return (
                  <div
                    key={j}
                    className={`w-11 h-[3.75rem] rounded-lg border bg-[#faf6f0] shadow-sm flex flex-col items-center justify-center text-xs font-bold leading-none select-none ${
                      isRed
                        ? "text-red-600 border-red-200/50"
                        : "text-gray-800 border-[#d4c5a0]/50"
                    } ${j > 0 ? "-mt-8" : ""}`}
                  >
                    <span className="text-[11px]">{card.rank}</span>
                    <span className="text-[9px] mt-px">{card.suit}</span>
                  </div>
                );
              })}
            </div>
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
      className="rounded-xl overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
      }}
    >
      <div className="p-8 text-center">
        <div className="text-[10px] font-bold text-[#8B6914] uppercase mb-4 tracking-widest">
          The Supermove Formula
        </div>
        <div className="text-3xl md:text-4xl font-black text-white mb-4">
          (1 + Free Cells) &times; 2<sup>Empty Columns</sup>
        </div>
        <p className="text-white/50 text-sm max-w-md mx-auto leading-relaxed">
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
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="How to Play FreeCell Solitaire"
        subtitle="Master the subtle art of FreeCell with our definitive guide to rules, mechanics, and winning strategy."
      />

      <TocPills items={tocItems} />

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* ── Card 1: What is FreeCell? ── */}
        <CardSection id="what-is-freecell">
          <SectionHeading
            sub="Introduction"
            id="what-is-freecell-heading"
            icon={"\u2660"}
          >
            What is FreeCell?
          </SectionHeading>

          <ContentBody className="space-y-5">
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
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Card 2: Understanding the Board ── */}
        <CardSection id="the-board">
          <SectionHeading
            sub="Layout & Zones"
            id="the-board-heading"
            icon={"\u2665"}
          >
            Understanding the Board
          </SectionHeading>

          <ContentBody>
            <p className="mb-4">
              The layout is designed for efficiency. Mastering the
              board&apos;s zones is the first step toward advanced play.
            </p>
            <BoardDiagram />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="card-inset rounded-lg p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#8B6914] font-bold">4</span>
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
                  <span className="text-[#8B6914] font-bold">4</span>
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
                  <span className="text-[#8B6914] font-bold">8</span>
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
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Card 3: Rules of Engagement ── */}
        <CardSection id="rules">
          <SectionHeading
            sub="How to Play"
            id="rules-heading"
            icon={"\u2666"}
          >
            Rules of Engagement
          </SectionHeading>

          <ContentBody className="space-y-6">
            <div>
              <h3
                className="text-lg font-semibold text-[#2a2522] mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                01. Alternating Sequences
              </h3>
              <p className="mb-4">
                Move cards between columns in descending rank and alternating
                colors. A Black 10 must be placed on a Red Jack. (For a
                condensed version of all the{" "}
                <Link href="/freecell-rules" className="text-[#8B6914] hover:underline">
                  FreeCell rules
                </Link>
                , see our quick-reference page.)
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
              <p>
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
              <p>
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
              <p>
                The game is won when all 52 cards are stacked on the four
                foundation piles by suit, from Ace to King. Most digital
                versions trigger auto-complete once every remaining card is
                in proper descending order in the tableau, finishing the game
                for you automatically.
              </p>
            </div>
          </ContentBody>
        </CardSection>

        <InContentAd />

        {/* ── Card 4: Quick Start Steps ── */}
        <CardSection id="quick-start">
          <SectionHeading
            sub="Beginner Walkthrough"
            id="quick-start-heading"
            icon={"\u2663"}
          >
            Quick Start in 4 Steps
          </SectionHeading>

          <ContentBody className="space-y-8">
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
                  className="text-[#8B6914] hover:underline"
                >
                  25 Tips & Tricks
                </Link>{" "}
                or dive into the full{" "}
                <Link
                  href="/strategy"
                  className="text-[#8B6914] hover:underline"
                >
                  Strategy Guide
                </Link>
                .
              </p>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Card 5: The Supermove ── */}
        <CardSection id="supermoves">
          <SectionHeading
            sub="Advanced Mechanic"
            id="supermoves-heading"
            icon={"\u2660"}
          >
            The Supermove
          </SectionHeading>

          <ContentBody>
            <p className="mb-6">
              Modern FreeCell engines allow you to move entire sequences at
              once. This isn&apos;t a shortcut — it&apos;s a calculation of
              your available empty spaces.
            </p>
            <SupermoveFormula />
          </ContentBody>
        </CardSection>

        <InContentAd />

        {/* ── Card 6: FAQ ── */}
        <CardSection id="htp-faq">
          <SectionHeading
            sub="Common Questions"
            id="htp-faq-heading"
            icon={"\u2665"}
          >
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
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
          </ContentBody>
        </CardSection>

        {/* ── Related Guides ── */}
        <CardSection>
          <SectionHeading sub="Continue Learning" icon={"\u2666"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="space-y-4">
              <li>
                <Link href="/freecell-for-beginners" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell for Beginners
                </Link>
                <span className="text-[#444444]"> — A gentler introduction for first-time players, covering the basics step by step.</span>
              </li>
              <li>
                <Link href="/easy-freecell-games" className="text-[#8B6914] hover:underline font-medium">
                  Easy FreeCell Games
                </Link>
                <span className="text-[#444444]"> — Start with deals that are easier to solve and build your confidence.</span>
              </li>
              <li>
                <Link href="/strategy" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell Strategy Guide
                </Link>
                <span className="text-[#444444]"> — Advanced tactics for improving your win rate beyond the basics.</span>
              </li>
              <li>
                <Link href="/tips" className="text-[#8B6914] hover:underline font-medium">
                  25 FreeCell Tips & Tricks
                </Link>
                <span className="text-[#444444]"> — Quick, actionable advice to sharpen your game immediately.</span>
              </li>
              <li>
                <Link href="/glossary" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell Glossary
                </Link>
                <span className="text-[#444444]"> — Definitions for every FreeCell term, from cascade to supermove.</span>
              </li>
              <li>
                <Link href="/freecell-rules" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell Rules Quick Reference
                </Link>
                <span className="text-[#444444]"> — A concise, printable summary of every FreeCell rule on one page.</span>
              </li>
              <li>
                <Link href="/freecell-cheat-sheet" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell Cheat Sheet
                </Link>
                <span className="text-[#444444]"> — Key formulas, move priorities, and at-a-glance reminders for mid-game.</span>
              </li>
              <li>
                <Link href="/freecell-mistakes-to-avoid" className="text-[#8B6914] hover:underline font-medium">
                  Mistakes to Avoid
                </Link>
                <span className="text-[#444444]"> — The most common errors that trip up new players and how to fix them.</span>
              </li>
              <li>
                <Link href="/faq" className="text-[#8B6914] hover:underline font-medium">
                  FreeCell FAQ
                </Link>
                <span className="text-[#444444]"> — Answers to the most frequently asked questions about FreeCell.</span>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          body="You know the rules. Now put them into practice with a real game of FreeCell."
          secondaryLabel="Learn Strategy"
          secondaryHref="/strategy"
        />
        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
