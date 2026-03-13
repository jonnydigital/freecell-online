import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Baker's Game Strategy Guide — Master Same-Suit Building",
  description:
    "In-depth Baker's Game strategy guide. Learn same-suit sequencing, free cell management, empty cascade tactics, and how to avoid common FreeCell habits that hurt your Baker's Game win rate.",
  keywords: [
    "baker's game strategy",
    "baker's game tips",
    "how to win baker's game",
    "baker's game vs freecell",
    "same suit solitaire strategy",
    "baker's game guide",
    "baker's game solvability",
    "baker's game advanced strategy",
    "freecell variant strategy",
    "baker's game winning tips",
  ],
  openGraph: {
    title: "Baker's Game Strategy Guide — Master Same-Suit Building",
    description:
      "Expert strategies for Baker's Game. Learn same-suit sequencing, free cell management, and how to avoid common mistakes that FreeCell players make.",
    url: absoluteUrl("/bakers-game/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How is Baker's Game different from FreeCell?",
    answer:
      "Baker's Game and FreeCell share the same layout — 8 cascades, 4 free cells, and 4 foundations — but they differ in one critical rule. In FreeCell, you build tableau sequences in alternating colors (red on black). In Baker's Game, you must build sequences in the same suit (Hearts on Hearts, Spades on Spades). This single rule change makes Baker's Game dramatically harder because you have far fewer legal moves available at any given moment.",
  },
  {
    question: "What percentage of Baker's Game deals are solvable?",
    answer:
      "Approximately 75% of random Baker's Game deals are solvable, compared to roughly 99.999% for standard FreeCell. The same-suit stacking restriction means that many deals contain positions where critical cards are buried behind cards of different suits with no way to extract them. This lower solvability is part of what makes Baker's Game challenging — you need to recognize unsolvable positions early so you don't waste time on impossible deals.",
  },
  {
    question: "Should I play FreeCell or Baker's Game first?",
    answer:
      "Start with FreeCell. It teaches you the fundamental mechanics — using free cells, planning multi-step moves, creating empty cascades — in a more forgiving environment. Once you can consistently win 90% or more of FreeCell deals, you are ready for Baker's Game. The transition will still be difficult because many FreeCell instincts (like alternating-color stacking) will work against you, but having a strong FreeCell foundation makes the learning curve manageable.",
  },
  {
    question: "Why is Baker's Game harder than FreeCell?",
    answer:
      "Baker's Game is harder for two main reasons. First, the same-suit stacking rule means you have roughly one-quarter as many legal tableau moves at any given moment. In FreeCell, any card can go on either of two colors; in Baker's Game, each card fits on only one specific card. Second, this restriction means that cards frequently become stranded — a Heart buried under Spades and Clubs cannot be reached without first moving those cards to free cells or empty cascades, consuming your limited storage. The compounding effect of fewer moves and more frequent dead ends makes Baker's Game significantly harder to solve.",
  },
];

export default function BakersGameStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Baker's Game Strategy Guide — Master Same-Suit Building",
    description:
      "In-depth strategy guide for Baker's Game. Learn same-suit sequencing, free cell management, and advanced tactics for this challenging FreeCell variant.",
    url: absoluteUrl("/bakers-game/strategy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
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
        name: "Baker's Game",
        item: absoluteUrl("/bakers-game"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/bakers-game/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
          {"\u2660"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2665"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Baker&apos;s Game Strategy Guide
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Master same-suit building, free cell management, and the strategic
          mindset that separates Baker&apos;s Game from FreeCell.
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
          {/* Section 1: Introduction */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Makes Baker&apos;s Game Harder Than FreeCell
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Baker&apos;s Game and FreeCell look identical at first glance. Same layout, same
                number of cascades, same four free cells, same four foundations. But the single
                rule change &mdash; same-suit stacking instead of alternating-color stacking &mdash;
                transforms the game from a highly solvable puzzle into a genuinely difficult one.
              </p>
              <p>
                In FreeCell, when you need to place the 7 of Hearts, you have two valid targets:
                the 8 of Spades and the 8 of Clubs. In Baker&apos;s Game, the 7 of Hearts can only
                go on the 8 of Hearts. That means you are working with roughly one-quarter the
                number of legal moves at any given moment. Cards that would be easy to relocate in
                FreeCell become stranded in Baker&apos;s Game, creating cascading problems that
                require careful planning to resolve.
              </p>
              <p>
                This guide covers the strategic principles you need to win more Baker&apos;s Game
                deals. If you are coming from FreeCell, pay special attention to the section on
                common mistakes &mdash; many instincts that serve you well in FreeCell will
                actively sabotage your Baker&apos;s Game play.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Section 2: Free Cells Matter Even More */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Free Cells Matter Even More
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In FreeCell, free cells are important. In Baker&apos;s Game, they are critical.
                The same-suit building restriction means you will frequently encounter situations
                where the card you need is buried under cards of a different suit. The only way to
                reach it is to move those blocking cards somewhere &mdash; and with limited legal
                tableau moves, free cells are often your only option.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Free Cell Budget
                </h3>
                <p className="text-sm">
                  Think of your four free cells as a budget. Every card you place in a free cell is
                  a resource spent. Before using a free cell, ask yourself two questions: (1) Do I
                  have a concrete plan for when this card will leave the free cell? (2) Will I need
                  more free cells for future moves before this one clears? If the answer to the first
                  question is &quot;no&quot; or the answer to the second is &quot;yes,&quot; reconsider the move.
                  Filling a free cell without a clear exit plan is one of the fastest ways to lose
                  a Baker&apos;s Game deal.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Free Cells and Supermoves
                </h3>
                <p className="text-sm">
                  The number of cards you can move as a sequence depends on the number of empty free
                  cells and empty cascades. With all four free cells occupied, you can only move one
                  card at a time. With all four empty, you can move sequences of up to 5 cards (or
                  more with empty cascades). In Baker&apos;s Game, where you often need to relocate
                  long same-suit runs, the difference between having zero and having three free cells
                  can determine whether a position is solvable.
                </p>
              </div>

              <p>
                A good rule of thumb: never let yourself fall below two empty free cells unless you
                are executing a planned multi-step sequence that will immediately free them up again.
                Dropping to one or zero free cells without a clear path back is a danger signal that
                usually means the game is heading toward a dead end.
              </p>
            </div>
          </section>

          {/* Section 3: Same-Suit Sequencing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Same-Suit Sequencing
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The core challenge of Baker&apos;s Game is building long in-suit descending runs.
                In FreeCell, you can stack the 10 of Hearts on the Jack of Clubs and call it progress.
                In Baker&apos;s Game, that move is illegal. The 10 of Hearts must go on the Jack of
                Hearts, period.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Build One Suit at a Time
              </h3>
              <p>
                Rather than trying to make progress across all four suits simultaneously, identify
                one suit where you have the best initial position &mdash; multiple cards of the
                same suit already partially ordered in the cascades &mdash; and focus your early
                moves on building a long descending run in that suit. Cards from other suits will
                need to be moved out of the way, but at least you have a clear primary objective.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Recognize Dead Sequences
              </h3>
              <p>
                A cascade that contains cards from three or four different suits in descending
                order might look organized, but in Baker&apos;s Game it is actually a dead end.
                None of those cards can be moved as a group because they are not the same suit.
                Each one must be moved individually using free cells or empty cascades. When you
                see a mixed-suit cascade forming, alarm bells should go off &mdash; you are
                creating a future problem that will be expensive to resolve.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                The Power of Adjacent Ranks
              </h3>
              <p>
                When scanning the board, look for adjacent-rank cards of the same suit that are
                close to each other. If the 9 of Spades is exposed in one cascade and the 8 of
                Spades is just one card deep in another, connecting them should be a priority.
                Every time you link two same-suit adjacent cards, you build a movable unit that
                is more flexible and powerful than two separate cards.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 4: Evaluating Solvability Pressure */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Evaluating Solvability Pressure
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Because only about 75% of Baker&apos;s Game deals are solvable, part of playing
                well is recognizing when a deal is heading toward a dead end. Pouring time into
                an unsolvable deal is not productive. Here are the warning signs:
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3">
                <h3 className="font-semibold text-red-400">Warning signs of an unsolvable position:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    All four free cells are full and no cards in them can be played to foundations
                    or cascades
                  </li>
                  <li>
                    Multiple cascades have key same-suit cards deeply buried under cards of other
                    suits with no empty cascades to work with
                  </li>
                  <li>
                    You need to move a long sequence but lack the free cells and empty cascades to
                    do so (the supermove formula says you cannot move that many cards)
                  </li>
                  <li>
                    Circular dependency: card A is blocking card B, card B is blocking card C, and
                    card C is blocking card A, with no free cell or cascade available to break the loop
                  </li>
                </ul>
              </div>

              <p>
                When you spot these warning signs within the first 10-15 moves, it is often worth
                restarting with a new deal rather than grinding through a position that is likely
                unsolvable. Experienced Baker&apos;s Game players develop an intuition for
                recognizing lost causes early and redirecting their effort toward winnable deals.
              </p>
            </div>
          </section>

          {/* Section 5: Empty Cascades */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empty Cascades: Even More Valuable Than in FreeCell
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In FreeCell, empty cascades are useful. In Baker&apos;s Game, they are essential.
                Because you can only build in suit, you frequently need to temporarily relocate
                multiple cards to access a buried same-suit card. Free cells hold one card each.
                An empty cascade can hold a card <em>and</em> have additional cards stacked on it
                (in same-suit descending order), making it far more flexible.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Empty Cascades Multiply Your Moving Power
                </h3>
                <p className="text-sm">
                  The supermove formula determines how many cards you can move at once based on
                  empty free cells and empty cascades. Each empty cascade effectively doubles your
                  moving capacity. With 2 free cells and 1 empty cascade, you can move 6 cards.
                  With 2 free cells and 2 empty cascades, you can move 12. In a game where
                  you regularly need to relocate 4-6 card sequences, that extra empty cascade
                  can mean the difference between reaching a key buried card and being stuck.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Creating Empty Cascades
              </h3>
              <p>
                The cascades most likely to be emptied are the shorter ones &mdash; the four
                cascades that start with 6 cards rather than 7. Focus on clearing one of these
                shorter columns early by moving its cards to foundations, free cells, or other
                cascades. Once you have one empty cascade, protect it fiercely. Only fill it when
                you are executing a specific multi-step plan and will re-empty it before you
                finish.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Using Empty Cascades as Staging Areas
              </h3>
              <p>
                The most powerful use of an empty cascade is as a staging area for complex
                rearrangements. Move a blocking card to the empty cascade, extract the card you
                need from underneath, place it where it belongs, then move the blocking card back.
                This technique lets you reach deeply buried same-suit cards that would otherwise
                be inaccessible. Plan the entire sequence of moves before you start &mdash; if
                you get halfway through and realize you do not have enough free cells to complete
                the operation, you will be worse off than before.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 6: Common Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Mistakes for FreeCell Players Switching Over
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                If you are coming to Baker&apos;s Game from FreeCell, you will find that many of your
                hard-won instincts actually work against you. Here are the most common traps:
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Instinct to Alternate Colors
                  </h3>
                  <p className="text-sm">
                    After hundreds of FreeCell games, your brain has been trained to see red-black-red
                    patterns as &quot;correct.&quot; In Baker&apos;s Game, reaching for an alternating-color
                    move is not just suboptimal &mdash; it is illegal. You will attempt illegal moves
                    repeatedly in your first few Baker&apos;s Game sessions. This is normal. The
                    retraining takes time. Slow down and consciously check suit before every move
                    until same-suit building becomes instinctive.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Undervaluing Free Cells
                  </h3>
                  <p className="text-sm">
                    In FreeCell, you can often play aggressively and fill free cells because the
                    alternating-color rule gives you plenty of legal tableau moves to work with. In
                    Baker&apos;s Game, filling three or four free cells without a plan is often
                    fatal. With same-suit building, you have far fewer options for getting cards out
                    of free cells, so each occupied cell stays occupied for longer. Treat free cells
                    as a scarce strategic resource, not a convenient dumping ground.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Moving Cards to Foundations Too Eagerly
                  </h3>
                  <p className="text-sm">
                    In FreeCell, sending a card to a foundation is almost always correct because you
                    can freely build on any same-color card in the tableau. In Baker&apos;s Game, you
                    might need that 3 of Hearts on a cascade to serve as a landing spot for the 2 of
                    Hearts before you can move a blocking card. Once a card is on a foundation, you
                    cannot retrieve it. Think twice before sending cards above the 3 or 4 level to
                    foundations &mdash; make sure you will not need them as intermediate stepping stones
                    in the tableau.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Ignoring Suit Distribution on the Initial Deal
                  </h3>
                  <p className="text-sm">
                    In FreeCell, you can start making moves immediately without worrying about suit
                    distribution. In Baker&apos;s Game, spending 30 seconds surveying the initial
                    layout is essential. Identify which suits have the most favorable card positions,
                    where the Aces and Twos are buried, and which cascades are already partially
                    ordered by suit. This initial assessment should drive your entire game plan.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

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

          {/* CTA */}
          <section className="text-center py-8">
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to Play?
            </h2>
            <p className="text-white/50 mb-6 max-w-xl mx-auto">
              Put these strategies into practice. Play Baker&apos;s Game online for free &mdash;
              no download, no signup.
            </p>
            <Link
              href="/bakers-game"
              className="inline-block bg-[#D4AF37] text-[#072907] font-semibold px-8 py-3 rounded-lg hover:bg-[#C4A030] transition-colors"
            >
              Play Baker&apos;s Game
            </Link>
          </section>

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
                href="/bakers-game"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Play Baker&apos;s Game</span>
                <p className="text-sm text-white/40 mt-1">Play online for free, no download</p>
              </Link>
              <Link
                href="/strategy"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell Strategy</span>
                <p className="text-sm text-white/40 mt-1">Compare with FreeCell tactics</p>
              </Link>
              <Link
                href="/eight-off"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Eight Off Solitaire</span>
                <p className="text-sm text-white/40 mt-1">Same-suit building with 8 reserve cells</p>
              </Link>
              <Link
                href="/solitaire-types"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Types of Solitaire</span>
                <p className="text-sm text-white/40 mt-1">20 solitaire variants compared</p>
              </Link>
              <Link
                href="/freecell-rules"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell Rules</span>
                <p className="text-sm text-white/40 mt-1">Rules for the alternating-color variant</p>
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
