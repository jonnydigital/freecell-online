import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire Strategy Guide — Tips to Win More Games",
  description:
    "Master Klondike Solitaire with proven strategies for Draw 1 and Draw 3. Learn stock-pass discipline, empty column tactics, foundation timing, and common traps to avoid.",
  keywords: [
    "klondike solitaire strategy",
    "klondike solitaire tips",
    "how to win klondike solitaire",
    "solitaire strategy guide",
    "klondike winning strategy",
    "draw 3 solitaire strategy",
    "klondike solitaire tricks",
    "solitaire tips and tricks",
    "best solitaire strategy",
    "klondike expert tips",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/strategy"),
  },
  openGraph: {
    title: "Klondike Solitaire Strategy Guide — Tips to Win More Games",
    description:
      "Proven strategies for Draw 1 and Draw 3 Klondike. Stock-pass discipline, empty column tactics, foundation timing, and common traps to avoid.",
    url: absoluteUrl("/klondike/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Klondike Solitaire?",
    answer:
      "The most impactful strategies are: always prioritize uncovering face-down cards over other moves, play Aces and Twos to foundations immediately, never empty a column unless you have a King ready to fill it, and cycle through the stock pile methodically rather than randomly. In Draw 3, tracking which cards are accessible on each pass through the stock is essential.",
  },
  {
    question: "Is Draw 1 or Draw 3 easier to win?",
    answer:
      "Draw 1 is significantly easier. In Draw 1, you see every card in the stock each cycle, giving you access to all 24 stock cards. In Draw 3, you only see every third card per cycle, meaning roughly two-thirds of the stock is inaccessible on any given pass. Skilled players win 40-50% of Draw 1 games but only 10-20% of Draw 3 games.",
  },
  {
    question: "Should I always move cards to the foundation as soon as possible?",
    answer:
      "Not always. Aces and Twos should go to foundations immediately since they are never useful on the tableau. But higher cards — especially Fives and above — sometimes serve better as tableau anchors. For example, a red 7 on the tableau might be needed to hold a black 6 that is covering a face-down card. Moving it to the foundation prematurely can block important uncovering moves.",
  },
  {
    question: "How many Klondike deals are actually winnable?",
    answer:
      "Computer analysis suggests that roughly 79-82% of Draw 1 deals are theoretically winnable with perfect play, though no human plays perfectly — skilled players win about 40-50%. For Draw 3, the theoretical winnability is lower, and practical win rates drop to 10-20%. About 18-21% of all Klondike deals are genuinely impossible regardless of how well you play.",
  },
  {
    question: "What should I do when I get stuck in Klondike?",
    answer:
      "First, scan every column carefully — there is often a move hiding in plain sight. Second, cycle through the stock pile again; a card you skipped earlier might now have a valid destination. Third, consider moving cards back from the foundation to the tableau if it unlocks a chain of moves (this costs points in scored games, but it can save the game). If none of that works, the deal may simply be unwinnable.",
  },
];

export default function KlondikeStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire Strategy Guide — Tips to Win More Games",
    description:
      "Proven strategies for Draw 1 and Draw 3 Klondike Solitaire. Learn stock-pass discipline, empty column tactics, foundation timing, and common traps.",
    author: { "@type": "Organization", name: siteConfig.brandName },
    publisher: { "@type": "Organization", name: siteConfig.brandName },
    mainEntityOfPage: absoluteUrl("/klondike/strategy"),
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
        name: "Klondike Solitaire",
        item: absoluteUrl("/klondike"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/klondike/strategy"),
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
          Klondike Solitaire Strategy Guide
        </h1>
        <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Proven strategies, tips, and techniques for winning more games in both
          Draw 1 and Draw 3 Klondike.
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
          {/* Section 1: Why Strategy Matters */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Why Strategy Matters in Klondike
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Klondike Solitaire sits at a fascinating intersection of luck and skill. Unlike{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>
                , where every card is visible and 99.999% of deals are solvable, Klondike hides 21
                cards face-down at the start. This means some deals are genuinely unwinnable no
                matter what you do. But that does not mean strategy is irrelevant — far from it.
              </p>
              <p>
                The difference between a casual player and a skilled one is stark. A beginner
                playing Draw 1 might win 15-20% of games. A player who understands Klondike
                strategy wins 40-50% of the same deals. That gap — doubling or tripling your win
                rate — comes entirely from better decision-making. Every move in Klondike involves
                a choice, and the accumulation of good choices is what separates winning players
                from losing ones.
              </p>
              <p>
                This guide covers the strategies that make the biggest difference, from fundamental
                principles that apply to every game through to Draw-3-specific techniques that
                separate intermediate players from experts. Whether you are brand new to Klondike
                or you have been playing for years and want to push your win rate higher, there is
                something here for you.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="my-4" />

          {/* Section 2: Draw 1 vs Draw 3 Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Draw 1 vs Draw 3: Strategy Differences
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The choice between Draw 1 and Draw 3 fundamentally changes how you approach the
                game. Understanding these differences is essential before diving into specific
                tactics.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-emerald-400 mb-3">
                    Draw 1 Strategy
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      You see every card in the stock each cycle, so card tracking is straightforward.
                    </li>
                    <li>
                      You have maximum flexibility — every stock card is accessible in order.
                    </li>
                    <li>
                      Focus on tableau organization first, since the stock will always be there as a
                      reliable backup source.
                    </li>
                    <li>
                      Win rate ceiling is higher (~40-50%), so aggressive play pays off more often.
                    </li>
                    <li>
                      The main skill is prioritizing which face-down cards to uncover and when to
                      move cards to foundations.
                    </li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-amber-400 mb-3">
                    Draw 3 Strategy
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      Only every third card is accessible per pass. Two-thirds of the stock is
                      hidden on any given cycle.
                    </li>
                    <li>
                      Card position tracking becomes critical — you need to know where key cards
                      sit relative to the three-card draw rhythm.
                    </li>
                    <li>
                      Sometimes you should <em>not</em> play an available card, because doing so
                      shifts the three-card alignment and may bury a more important card.
                    </li>
                    <li>
                      Win rates are much lower (~10-20%), so conservative, methodical play is
                      essential.
                    </li>
                    <li>
                      Tableau moves that change the stock&apos;s draw alignment (by adding cards to
                      the waste pile) are strategically significant.
                    </li>
                  </ul>
                </div>
              </div>

              <p>
                The single biggest strategic difference: in Draw 1, you can afford to play
                intuitively because every card is reachable. In Draw 3, you must think about the
                stock pile as a constrained resource where card order and accessibility are constant
                strategic factors.
              </p>
            </div>
          </section>

          {/* Section 3: Stock-Pass Discipline */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stock-Pass Discipline
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                How you cycle through the stock pile is one of the most underrated skills in
                Klondike. Many players treat the stock as an afterthought — they flip through it
                quickly, grab whatever they can, and move on. Skilled players treat the stock with
                deliberate discipline.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Exhaust Tableau Moves First
                </h3>
                <p className="text-sm">
                  Before drawing from the stock, scan the entire tableau for moves. Prioritize
                  moves that uncover face-down cards. The stock should be your second resort, not
                  your first. Every card you play from the tableau is a card you do not need to
                  find in the stock.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Track Your Passes (Draw 3)
                </h3>
                <p className="text-sm">
                  In Draw 3, pay attention to which cards you see on each pass. If you know the
                  Ace of Spades is two cards deep in a three-card group, you can plan moves that
                  shift the alignment to make it accessible on the next pass. This level of
                  tracking separates intermediate players from advanced ones.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Know When to Stop Cycling
                </h3>
                <p className="text-sm">
                  If you go through the entire stock without playing a single card, and you have
                  no tableau moves available, the game is over — you are stuck. But more subtly,
                  if you cycle through the stock and only play cards that do not uncover any new
                  face-down cards or enable any new moves, you are likely spinning your wheels.
                  Recognize when a game is unwinnable and start a new one rather than cycling
                  endlessly.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Strategic Non-Play (Draw 3)
                </h3>
                <p className="text-sm">
                  This is the most advanced stock-management technique. In Draw 3, playing a
                  card from the waste pile changes which cards are accessible on your next pass
                  through the stock. Sometimes the correct play is to <em>not</em> play an
                  available card because doing so would shift the draw alignment and bury a more
                  important card. This requires you to remember (or at least estimate) what is
                  coming next in the stock.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 4: Empty Column Usage */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empty Column Usage — When to Move Kings
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                In Klondike, only Kings can fill empty columns. This makes empty columns
                simultaneously valuable and dangerous. An empty column is only useful if you have
                a King to place there — otherwise it is dead space.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                When to Create an Empty Column
              </h3>
              <p>
                Create an empty column when you have a King ready to move there and doing so will
                uncover face-down cards or enable a chain of productive moves. The ideal scenario:
                you move the last cards off a column (uncovering a face-down card), immediately
                place a King in the now-empty column, and the King brings along a sequence of
                cards that were blocking progress elsewhere.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Choosing Which King to Place
              </h3>
              <p>
                When you have multiple Kings available, choose carefully. Consider which King will
                allow you to build the longest alternating-color sequence. A black King lets you
                build red Queen, black Jack, red 10, and so on — look at what cards are available
                and pick the King color that offers the most building potential. Also consider
                whether moving a particular King will uncover hidden cards in its original column.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Empty Column Trap
              </h3>
              <p>
                One of the most common beginner mistakes is clearing a column when no King is
                available. You move all the cards off a column, flip the last face-down card, and
                then... the column sits empty with nothing to put there. Meanwhile, you may have
                disrupted useful sequences on other columns to accomplish this. Always check: do
                I have a King (or a King-led sequence) ready before I clear this column?
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Kings from the Stock Pile
              </h3>
              <p>
                Kings drawn from the stock are especially valuable because playing them does not
                disrupt any existing tableau sequences. If you have an empty column and draw a
                King from the stock, that is nearly always a strong play. The King fills the
                empty column for free, and you can start building on it immediately.
              </p>
            </div>
          </section>

          {/* Section 5: Foundation Timing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Timing — When to Move Cards Up
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                A common misconception is that you should move cards to the foundations as quickly
                as possible. In reality, foundation timing is one of the most nuanced aspects of
                Klondike strategy. Moving a card to the foundation removes it from the tableau
                permanently, which can be both helpful and harmful.
              </p>

              <div className="bg-white/[0.03] border border-emerald-500/10 rounded-lg p-5 space-y-3">
                <h3 className="font-semibold text-emerald-400">Always move to foundation:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-white/80">Aces</strong> — They serve no purpose
                    on the tableau and are required to start foundation piles.
                  </li>
                  <li>
                    <strong className="text-white/80">Twos</strong> — No card in the game
                    needs a Two underneath it on the tableau (nothing goes on an Ace).
                  </li>
                  <li>
                    <strong className="text-white/80">Cards that uncover face-down cards</strong>
                    {" "}— If moving a card to the foundation reveals a hidden card, that is almost
                    always worth it.
                  </li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-amber-500/10 rounded-lg p-5 space-y-3 mt-3">
                <h3 className="font-semibold text-amber-400">Think twice before moving:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-white/80">Cards that anchor useful sequences</strong>
                    {" "}— A red 7 holding a black 6 that covers a face-down card should stay on
                    the tableau until that face-down card is exposed.
                  </li>
                  <li>
                    <strong className="text-white/80">Cards where both colors of the next
                    lower rank are still needed on the tableau</strong> — If you move a black 8 to
                    the foundation, you lose a potential anchor for both the red 7 of Hearts and
                    red 7 of Diamonds.
                  </li>
                  <li>
                    <strong className="text-white/80">Cards that break a long sequence</strong>
                    {" "}— A long tableau sequence is a powerful asset. Do not disassemble it to
                    move one card to the foundation unless the sequence is no longer needed.
                  </li>
                </ul>
              </div>

              <p>
                A practical rule of thumb: if both cards of the rank below the one you want to
                move are already on the foundations, it is safe to move. For example, if both red
                5s are already on their foundations, then any black 6 can safely go to the
                foundation because no tableau card will ever need to sit on a black 6 again.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="my-4" />

          {/* Section 6: Common Traps and Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Traps and Mistakes
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Even experienced Klondike players fall into these patterns. Recognizing them is the
                first step to playing past them.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Trap 1: Emptying Columns Without a King
                  </h3>
                  <p className="text-sm">
                    This is the most common mistake in Klondike. You work hard to clear a column,
                    only to discover you have no King to place there. The empty column becomes
                    dead space, and you have disrupted your tableau for nothing. Always verify a
                    King is available (on the tableau or coming soon in the stock) before investing
                    moves in clearing a column.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Trap 2: Rushing Cards to the Foundation
                  </h3>
                  <p className="text-sm">
                    Moving every possible card to the foundation feels productive but can backfire.
                    A 6 moved to the foundation cannot anchor a 5 on the tableau later. This is
                    especially dangerous in the mid-game when you need tableau flexibility to
                    uncover the remaining face-down cards. Be selective about which cards go up
                    and when.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Trap 3: Ignoring the Longer Columns
                  </h3>
                  <p className="text-sm">
                    Columns 6 and 7 start with the most face-down cards (5 and 6 respectively).
                    Players often focus on the shorter columns because progress feels faster, but
                    the long columns contain the most hidden information. Prioritize uncovering
                    cards in the longest columns — they hold the keys to whether the game is
                    winnable.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Trap 4: Making Moves Just Because They Are Available
                  </h3>
                  <p className="text-sm">
                    Not every legal move is a good move. Moving a card from one tableau column to
                    another just because you can — without it uncovering a face-down card, enabling
                    a stock card to be played, or building toward a productive sequence — is a
                    wasted move at best and actively harmful at worst. Every move should have a
                    purpose.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Trap 5: Not Using Undo
                  </h3>
                  <p className="text-sm">
                    In our{" "}
                    <Link href="/klondike" className="text-[#D4AF37] hover:underline">
                      online Klondike game
                    </Link>
                    , unlimited undo is available. Use it. When you uncover a face-down card and
                    realize a different sequence of moves would have been better, undo and replay.
                    Undo is not cheating — it is a learning tool that helps you develop better
                    intuition for future games.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Unwinnable Deals */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Unwinnable Deals — The Reality of Klondike
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                One of the most important things to understand about Klondike is that not every
                deal can be won. Computer analysis of millions of random deals has established
                that roughly 18-21% of Klondike deals are mathematically impossible to complete,
                regardless of how well you play.
              </p>
              <p>
                This is fundamentally different from{" "}
                <Link href="/" className="text-[#D4AF37] hover:underline">
                  FreeCell
                </Link>
                , where 99.999% of deals are solvable (only one known unsolvable deal in the
                standard 32,000-deal set). The difference comes from hidden information: in
                Klondike, the 21 face-down cards and the stock pile order create situations where
                critical cards are permanently trapped.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Common Causes of Unwinnable Deals
                </h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>
                    <strong className="text-white/80">Buried Aces:</strong> If an Ace is
                    trapped at the bottom of a long column with no way to reach it, the
                    corresponding foundation can never be started.
                  </li>
                  <li>
                    <strong className="text-white/80">Circular dependencies:</strong> Card A
                    can only be freed by moving Card B, but Card B can only be freed by moving
                    Card A. This deadlock is unresolvable.
                  </li>
                  <li>
                    <strong className="text-white/80">Stock pile order:</strong> In Draw 3,
                    a critical card may be in a position where it is never accessible given the
                    three-card draw rhythm and the cards around it.
                  </li>
                  <li>
                    <strong className="text-white/80">King placement conflicts:</strong> If
                    all four Kings are buried under critical cards, and clearing any column
                    requires a King that is itself trapped, the game locks up.
                  </li>
                </ul>
              </div>

              <p>
                The practical takeaway: do not blame yourself for every loss. If you are winning
                35-45% of Draw 1 games, you are playing well. If you are winning 15-20% of Draw
                3 games, you are playing at a strong level. Anything above these ranges means
                you are an excellent Klondike player.
              </p>
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
              Ready to Put These Strategies to Work?
            </h2>
            <p className="text-white/50 mb-6 max-w-xl mx-auto">
              Practice makes perfect. Try our free online Klondike Solitaire with Draw 1 and
              Draw 3 modes, unlimited undo, and instant new deals.
            </p>
            <Link
              href="/klondike"
              className="inline-block bg-[#D4AF37] text-[#072907] font-bold px-8 py-3 rounded-lg hover:bg-[#e8c54a] transition-colors text-lg"
            >
              Play Klondike Solitaire
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
                href="/klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Play Klondike Solitaire</span>
                <p className="text-sm text-white/40 mt-1">Play online for free, no download</p>
              </Link>
              <Link
                href="/klondike/how-to-play"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">How to Play Klondike</span>
                <p className="text-sm text-white/40 mt-1">Complete rules and setup guide</p>
              </Link>
              <Link
                href="/klondike/faq"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Klondike FAQ</span>
                <p className="text-sm text-white/40 mt-1">Common questions answered</p>
              </Link>
              <Link
                href="/freecell-vs-klondike"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">FreeCell vs Klondike</span>
                <p className="text-sm text-white/40 mt-1">Head-to-head comparison</p>
              </Link>
              <Link
                href="/solitaire-types"
                className="bg-white/[0.03] border border-white/10 rounded-lg p-4 hover:bg-white/[0.06] hover:border-[#D4AF37]/30 transition-all"
              >
                <span className="text-[#D4AF37] font-semibold">Types of Solitaire</span>
                <p className="text-sm text-white/40 mt-1">20 solitaire variants compared</p>
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
