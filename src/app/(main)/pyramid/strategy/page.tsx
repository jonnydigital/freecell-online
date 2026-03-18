import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Pyramid Solitaire Strategy Guide | Tips to Win More Games",
  description:
    "Master Pyramid Solitaire with proven strategies. Learn card counting, uncovering priorities, stock pile management, and the decision frameworks that separate winning players from losing ones.",
  keywords: [
    "pyramid solitaire strategy",
    "pyramid solitaire tips",
    "how to win pyramid solitaire",
    "pyramid solitaire tricks",
    "pyramid solitaire expert tips",
    "pyramid solitaire card counting",
    "pyramid solitaire winning strategy",
    "pyramid solitaire advanced techniques",
    "best pyramid solitaire moves",
    "pyramid solitaire guide",
  ],
  openGraph: {
    title: "Pyramid Solitaire Strategy Guide | Tips to Win More Games",
    description:
      "Proven strategies for Pyramid Solitaire: card counting, uncovering priorities, stock management, and common mistakes to avoid.",
    url: absoluteUrl("/pyramid/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for Pyramid Solitaire?",
    answer:
      "The most impactful strategy is to always prioritize removing pairs within the pyramid before using the stock pile. Pyramid-to-pyramid pairs remove two blocking cards at once, opening more of the layout. Beyond that, focus on clearing cards that block the path to the apex, remove Kings immediately when exposed, and conserve stock draws for when you genuinely have no pyramid pairs available.",
  },
  {
    question: "Should I always remove pairs as soon as I see them?",
    answer:
      "Not always. While it is generally good to remove pairs quickly, sometimes you have a choice between two different pairs and the order matters. The better pair is usually the one that uncovers a card closer to the top of the pyramid or that uncovers a card you know you will need soon. If removing pair A opens up two new cards but pair B opens zero, remove pair A first.",
  },
  {
    question: "Is card counting useful in Pyramid Solitaire?",
    answer:
      "Yes, very much so. Since all 28 pyramid cards are visible from the start, you can count exactly how many of each rank are in the pyramid versus how many must be in the stock. If you need a 9 to pair with an exposed 4, and you can see that all four 9s are in the pyramid, you know the stock contains zero 9s — do not waste draws looking for one. This kind of counting prevents hopeless draws and saves your limited stock passes.",
  },
  {
    question: "How do I improve my Pyramid Solitaire win rate?",
    answer:
      "Accept that most deals (roughly 97% with single-pass rules) are mathematically unwinnable regardless of play quality. Your goal is to win every winnable deal. To do this: count cards at the start of each game to spot impossible situations early, prioritize pyramid-to-pyramid pairs, clear blocking cards on the direct path to the apex, and use the stock pile only when necessary. Over many games, these habits compound into a noticeably higher win rate.",
  },
  {
    question: "When should I draw from the stock pile?",
    answer:
      "Draw from the stock only when you have no available pairs among exposed pyramid cards and the current waste card. Each draw buries the previous waste card permanently (in single-pass rules), so unnecessary draws destroy options. Before drawing, double-check every exposed card in the pyramid against every other exposed card and the waste pile. Only draw when you are certain no pairs exist.",
  },
  {
    question: "Is it better to play with one pass or multiple passes through the stock?",
    answer:
      "Multiple passes make the game significantly easier but also less strategically interesting. With three passes, your win rate improves from roughly 3% to 25-30%, and stock management becomes less critical since buried waste cards can be recovered. For learning, multiple passes are useful because you see more of the game unfold. For a real challenge, single-pass rules force you to play precisely and make every draw count.",
  },
];

export default function PyramidStrategyPage() {
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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Pyramid Solitaire Strategy Guide",
    description: "Master Pyramid Solitaire with proven strategies for card counting, uncovering priorities, and stock pile management.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    datePublished: "2026-03-15",
    dateModified: "2026-03-15",
    mainEntityOfPage: absoluteUrl("/pyramid/strategy"),
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
        name: "Pyramid Solitaire",
        item: absoluteUrl("/pyramid/how-to-play"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/pyramid/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Pyramid Solitaire Strategy Guide"
        subtitle="Proven strategies, card counting techniques, and decision frameworks for winning more games."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pyramid Solitaire", href: "/pyramid" }]}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: The Reality of Pyramid Solitaire */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Reality of Winning at Pyramid
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Before diving into strategy, you need to understand something fundamental about
                Pyramid Solitaire: the vast majority of deals are unwinnable. With standard
                single-pass rules, computational analysis has shown that only about 3 out of every
                100 random deals can be solved even with perfect play. This is not a game you win
                most of the time — it is a game where skilled play wins the winnable deals and
                loses the rest gracefully.
              </p>
              <p>
                This means the goal of strategy is not to win every game. It is to recognize
                winnable situations quickly, play them correctly, and avoid wasting time on
                deals that are mathematically impossible. A player who wins 3 out of 100 games
                with good strategy is performing far better than a player who wins 1 out of 100
                with sloppy play, even though both win rates seem low.
              </p>
              <p>
                With that realistic framing in mind, here are the strategies that will actually
                move the needle on your results.
              </p>
            </div>
          </section>

          {/* Section 2: The Uncovering Priority System */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Uncovering Priority System
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The single most important concept in Pyramid Solitaire strategy is understanding
                which removals matter most. Not all pairs are created equal — a pair that uncovers
                two cards deep in the pyramid is worth far more than a pair that removes two cards
                from the base row without uncovering anything new.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Priority 1: Cards That Block the Most Hidden Cards
                  </h3>
                  <p className="text-sm">
                    Every card in rows 1 through 6 is covered by exactly two cards in the row
                    below. When you remove a card from the pyramid, you partially uncover up to
                    two cards above it. However, those cards above are only fully uncovered when
                    both covering cards are gone. Focus your removals on cards that are the
                    &quot;second blocker&quot; — meaning the other covering card has already been
                    removed. Removing the second blocker instantly frees a new card for play.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Priority 2: Cards on the Direct Path to the Apex
                  </h3>
                  <p className="text-sm">
                    The apex card (row 1) is the bottleneck. To reach it, you must clear both
                    cards in row 2, which requires clearing their blockers in row 3, and so on.
                    Trace the chain of dependencies from the apex down to the base. Pairs that
                    remove cards on this critical path are more valuable than pairs on the
                    periphery. If the apex card is a 7, you know you will eventually need a 6
                    to pair with it — locate that 6 in the pyramid and work toward uncovering it.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Priority 3: Kings (Always Remove Immediately)
                  </h3>
                  <p className="text-sm">
                    An exposed King is always a free removal — it costs nothing and opens up the
                    cards above it. There is almost no scenario where delaying a King removal is
                    correct. Remove every King the moment it becomes available. The only
                    theoretical exception would be if the game offered an undo mechanic and you
                    wanted to preserve a specific board state, but in normal play, take the King.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 3: Card Counting */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Card Counting for Pyramid Solitaire
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Card counting in Pyramid is simpler than in most card games because all 28 pyramid
                cards are visible from the start. You are not tracking hidden information — you are
                using visible information to deduce what is in the 24-card stock pile.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Basic Count
              </h3>
              <p>
                A standard deck has exactly 4 cards of each rank (one per suit). At the start of
                the game, count how many of each rank are visible in the pyramid. The remainder
                must be in the stock. For example, if you see three 8s in the pyramid, you know
                exactly one 8 is in the stock. If you see all four 8s in the pyramid, the stock
                contains zero 8s.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                What the Count Tells You
              </h3>
              <p>
                The count reveals which pairs are achievable and which are hopeless. Suppose you
                have an exposed 4 in the pyramid and you want to pair it with a 9. If all four 9s
                are already visible in the pyramid, you know the stock has no 9s — the only way to
                remove that 4 is to pair it with a 9 that is also in the pyramid. If none of
                those pyramid 9s are currently exposed, you need to uncover one before that 4 can
                be removed.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Impossibility Check
              </h3>
              <p>
                Before you make a single move, do a quick impossibility scan. Look at the apex
                card and its pair partner rank. If the apex is a 10, you need a 3 to remove it. If
                all four 3s are in the pyramid and every one of them is buried behind the 10 or
                behind cards that depend on the 10 being removed, the deal is impossible. You can
                also check for &quot;blocking loops&quot; where card A blocks card B, and card B blocks the
                partner needed to remove card A.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-4">
                <h3 className="font-semibold text-[#D4AF37] mb-3">Quick Count Reference</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong className="text-white/80">28 cards</strong> in the pyramid, <strong className="text-white/80">24</strong> in the stock = 52 total</li>
                  <li><strong className="text-white/80">4 copies</strong> of each rank in the deck</li>
                  <li>If you see <strong className="text-white/80">N cards</strong> of a rank in the pyramid, the stock has <strong className="text-white/80">4 - N</strong></li>
                  <li>Pairs where <strong className="text-white/80">both ranks have 0 in the stock</strong> must be resolved entirely within the pyramid</li>
                  <li><strong className="text-white/80">4 Kings</strong> in the deck — count how many are in the pyramid vs stock</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 4: Stock Pile Management */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stock Pile Management
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The stock pile is your most limited resource. With 24 cards and a single pass,
                every draw permanently buries the previous waste card. Mismanaging the stock is the
                fastest way to lose a winnable deal.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3">
                <h3 className="font-semibold text-green-400">Draw when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>You have exhausted every possible pair among exposed pyramid cards</li>
                  <li>The current waste card cannot pair with any exposed pyramid card</li>
                  <li>You have confirmed via card counting that a needed rank is in the stock</li>
                  <li>Delaying the draw would not help (no pairs will open up without fresh cards)</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-3 mt-3">
                <h3 className="font-semibold text-red-400">Avoid drawing when:</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>The current waste card can pair with an exposed pyramid card (pair it first)</li>
                  <li>You have pyramid-to-pyramid pairs still available</li>
                  <li>You are about to bury a waste card that you know you will need later</li>
                  <li>Card counting shows the stock contains zero copies of the rank you need</li>
                </ul>
              </div>

              <h3 className="text-lg font-semibold text-white/80 mt-6">
                The Waste Pile Trap
              </h3>
              <p>
                A common trap is drawing rapidly through the stock hoping to find a specific card,
                while burying useful waste cards along the way. Suppose the waste pile shows a 5,
                and you have an exposed 8 in the pyramid. That is a valid pair (5 + 8 = 13). If
                you draw without making this pair, the 5 is gone forever. Always scan for
                waste-to-pyramid pairs before drawing.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Consecutive Stock Pairs
              </h3>
              <p>
                Sometimes two consecutive stock cards can pair with each other (for example,
                drawing a 6 followed by a 7). This removes two cards from the stock without
                touching the pyramid, which might seem wasteful, but it can be strategically
                correct if it uncovers a card beneath them in the draw sequence that you need
                more. However, this situation is rare and you generally should not plan for it.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 5: Common Mistakes */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Even players who understand the rules well make these strategic errors. Eliminating
                these mistakes is the fastest way to improve your win rate.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 1: Drawing Before Scanning
                  </h3>
                  <p className="text-sm">
                    The most common error is drawing from the stock before fully scanning the
                    board for pairs. With 28 pyramid cards visible, there can be many possible
                    pairs hiding in the layout, especially between non-adjacent cards that are
                    easy to overlook. Before every draw, systematically check each exposed card
                    against every other exposed card. This takes a few extra seconds but prevents
                    wasteful draws.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 2: Ignoring the Apex Path
                  </h3>
                  <p className="text-sm">
                    Players often remove whatever pairs are easiest rather than thinking about
                    which removals help reach the apex. The apex card is the hardest to remove
                    because it requires clearing the entire pyramid above it. If you spend all
                    your stock draws clearing peripheral cards while the apex path remains
                    blocked, you will lose even on winnable deals. Always keep the apex path in
                    your peripheral vision.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 3: Not Counting Cards
                  </h3>
                  <p className="text-sm">
                    Failing to count visible cards means you cannot distinguish winnable from
                    unwinnable situations. If you do not count, you might spend 5 minutes working
                    a deal that was impossible from the first card. A 30-second count at the
                    beginning can save you from hopeless deals and focus your attention on deals
                    where good play actually matters.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 4: Removing Pairs in the Wrong Order
                  </h3>
                  <p className="text-sm">
                    When multiple pairs are available, the order in which you remove them matters.
                    Suppose you can pair a 7 with one of two available 6s. One 6 is covering a
                    card you need; the other is covering a card that is irrelevant. Pairing with
                    the 6 that covers the needed card is clearly better, but many players grab
                    whichever pair they notice first without considering the downstream effects.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-red-500/10 rounded-lg p-5">
                  <h3 className="font-semibold text-red-400 mb-2">
                    Mistake 5: Playing Hopeless Deals to the End
                  </h3>
                  <p className="text-sm">
                    With practice, you can identify many impossible deals within the first minute.
                    If your card count reveals a blocking loop or a missing pair partner, there is
                    no shame in abandoning the deal and starting a new one. Your time is better
                    spent on deals that have a chance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Advanced Decision Framework */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Advanced Decision Framework
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                When you face a choice between two or more valid moves, use this framework to
                decide which move to make first.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 space-y-4">
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Question 1: Does one move uncover more cards?</h3>
                  <p className="text-sm">
                    Count how many new cards each move would make available (remember, a card is
                    only freed when both its covering cards are gone). Prefer the move that opens
                    the most new cards.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Question 2: Does one move free a card on the apex path?</h3>
                  <p className="text-sm">
                    If one option uncovers a card that is part of the critical dependency chain
                    leading to the apex, prefer that option — even if it opens fewer total cards.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Question 3: Does one move preserve flexibility?</h3>
                  <p className="text-sm">
                    If two moves are roughly equivalent in uncovering power, ask which leaves
                    more options open. Removing a card that has multiple potential partners
                    later is worse than removing a card whose partner is unique and obvious.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#D4AF37] mb-1">Question 4: Does one move avoid a dead end?</h3>
                  <p className="text-sm">
                    Check whether a move would leave an unpaired card with no available partner
                    in either the visible pyramid or the remaining stock. If a move creates a
                    dead card, avoid it unless no alternative exists.
                  </p>
                </div>
              </div>

              <p>
                Working through these four questions takes only a few seconds with practice and
                prevents the most costly strategic errors. The framework is especially useful in
                the mid-game, when the pyramid is partially cleared and multiple move sequences
                are possible.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 7: Reading the Board at a Glance */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Reading the Board at a Glance
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Experienced Pyramid players develop the ability to assess a deal&apos;s potential
                within seconds of seeing the layout. Here are the patterns they look for.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Kings in the Layout
              </h3>
              <p>
                Count the Kings. Each King in the pyramid is a guaranteed free removal (once
                uncovered), which is always positive. Four Kings means four free removals during
                the game. Zero Kings in the pyramid means all four are in the stock, where they
                will pair with nothing and simply cycle through the waste pile.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Paired Neighbors
              </h3>
              <p>
                Look for adjacent cards in the pyramid that add up to 13. Two neighboring base-row
                cards that sum to 13 can be removed immediately, uncovering the card above them.
                The more paired neighbors you spot in the base and middle rows, the more promising
                the deal.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Rank Distribution
              </h3>
              <p>
                A deal where the 28 pyramid cards contain a balanced distribution of ranks tends
                to be more solvable than a deal where one rank is heavily concentrated in the
                pyramid and its partner rank is entirely in the stock. For example, if all four 8s
                and all four 5s are in the pyramid, you have great pairing potential for that
                combination. But if all four 8s are in the pyramid and zero 5s are visible, those
                8s can only be paired with stock draws.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Apex Card
              </h3>
              <p>
                Identify the apex card immediately. Every game ends with removing this card, so
                you need to know its pair partner from the very first move. If the apex is a
                Queen, you need an Ace. Locate all Aces in the layout, determine which ones are
                accessible, and plan your play around making at least one Ace available when the
                time comes. If all Aces are deeply buried behind the Queen itself, the deal may
                be difficult or impossible.
              </p>
            </div>
          </section>

          {/* Section 8: Measuring Your Progress */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Measuring Your Progress
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Because Pyramid Solitaire has such a low base win rate, tracking improvement
                requires a different mindset than in games like FreeCell.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Metric</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Beginner</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Intermediate</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Advanced</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Win rate (single pass)</td>
                      <td className="py-2 px-4">0-1%</td>
                      <td className="py-2 px-4">1-2%</td>
                      <td className="py-2 px-4">2-3%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Win rate (3 passes)</td>
                      <td className="py-2 px-4">5-10%</td>
                      <td className="py-2 px-4">15-20%</td>
                      <td className="py-2 px-4">25-30%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Avg. cards cleared</td>
                      <td className="py-2 px-4">8-12</td>
                      <td className="py-2 px-4">14-18</td>
                      <td className="py-2 px-4">18-22</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Can spot impossible deals</td>
                      <td className="py-2 px-4">Rarely</td>
                      <td className="py-2 px-4">Sometimes</td>
                      <td className="py-2 px-4">Usually</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Instead of fixating on win rate alone, track how many pyramid cards you clear per
                game on average. This metric improves more steadily than win rate and reflects
                genuine skill growth. If your average clearance rises from 10 cards to 18 cards,
                you are playing significantly better — even if your win rate only moved from 1% to
                2%.
              </p>

              <p>
                Another useful habit is to replay deals you lost and check whether the deal was
                actually solvable. Many digital Pyramid implementations let you replay the same
                deal. If you discover that a deal you lost was winnable, study what you did wrong.
                If it was impossible, move on without self-blame.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

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

          <AdUnit format="horizontal" className="-my-1" />

          {/* ── Related Guides ── */}
          <CardSection variant="dark">
            <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
            <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard href="/pyramid/how-to-play" title="How to Play Pyramid" description="Complete rules, setup, and card values." />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic solitaire game." />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="Compare Pyramid, FreeCell, Klondike, and more." />
            </ContentBody>
          </CardSection>

          {/* CTA Section */}
          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice — play Pyramid Solitaire online right now, or brush up on the complete rules first."
            primaryLabel="Play Pyramid Solitaire"
            primaryHref="/pyramid"
            secondaryLabel="Pyramid Rules Guide"
            secondaryHref="/pyramid/how-to-play"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/pyramid/how-to-play" title="Pyramid Rules" description="Complete setup and rules guide" />
              <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Compare Pyramid, FreeCell, Klondike, and more" />
              <ContentLinkCard href="/spider/strategy" title="Spider Strategy" description="Strategy guide for 1-suit, 2-suit, and 4-suit" />
              <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy" description="Winning strategies for the classic solitaire" />
              <ContentLinkCard href="/freecell-vs-klondike" title="FreeCell vs Klondike" description="How the two classic games compare" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire — free online" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
