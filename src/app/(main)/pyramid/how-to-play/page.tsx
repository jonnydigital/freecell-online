import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Pyramid Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Pyramid Solitaire with our complete guide. Rules for pairing cards that total 13, pyramid layout, stock and waste pile mechanics, and winning strategies.",
  keywords: [
    "how to play pyramid solitaire",
    "pyramid solitaire rules",
    "pyramid solitaire guide",
    "pyramid solitaire instructions",
    "pyramid solitaire setup",
    "pyramid solitaire for beginners",
    "pyramid solitaire card values",
    "pyramid solitaire tutorial",
    "pyramid solitaire pairs",
    "pyramid card game rules",
  ],
  openGraph: {
    title: "How to Play Pyramid Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Pyramid Solitaire with our complete guide. Pair cards that total 13, clear the pyramid, and master the stock and waste piles.",
    url: absoluteUrl("/pyramid/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How many cards are in the pyramid layout?",
    answer:
      "The pyramid uses 28 cards arranged in 7 rows. Row 1 has 1 card, row 2 has 2 cards, row 3 has 3, and so on down to row 7 which has 7 cards. Only cards in the bottom row (and any card that has had both cards below it removed) are available for play. The remaining 24 cards form the stock pile.",
  },
  {
    question: "What card pairs add up to 13 in Pyramid Solitaire?",
    answer:
      "The valid pairs are: King (13, removed alone), Queen + Ace (12 + 1), Jack + 2 (11 + 2), 10 + 3, 9 + 4, 8 + 5, and 7 + 6. These are the only combinations that total 13. Memorizing these six pairs plus the King rule is all you need to play.",
  },
  {
    question: "Can you pair a card from the pyramid with a card from the waste pile?",
    answer:
      "Yes. You can pair any exposed pyramid card with the top card of the waste pile, or pair the top waste card with a card drawn from the stock. You can also pair two exposed pyramid cards together. The key rule is that both cards must be fully uncovered and available for play.",
  },
  {
    question: "How many times can you go through the stock pile in Pyramid Solitaire?",
    answer:
      "In the most common version, you can cycle through the stock pile only once. Some variants allow two or three passes through the stock, and a few relaxed versions allow unlimited passes. The single-pass rule makes the game significantly harder and forces you to think carefully about when to draw from the stock.",
  },
  {
    question: "What percentage of Pyramid Solitaire games are winnable?",
    answer:
      "With a single pass through the stock, only about 1 in 30 random Pyramid Solitaire deals (roughly 3%) are winnable even with perfect play. This makes Pyramid one of the harder solitaire variants. With three passes through the stock, the win rate improves to roughly 25-30%. The low base solvability means you should not feel discouraged by frequent losses.",
  },
  {
    question: "Is Pyramid Solitaire the same as Tri Peaks?",
    answer:
      "No. While both games involve clearing a tableau of cards, they use different mechanics. Pyramid Solitaire removes pairs that total 13, while Tri Peaks (also called TriPeaks or Triple Peaks) removes cards that are one rank higher or lower than the current foundation card. Tri Peaks also uses a three-peak layout rather than a single pyramid.",
  },
  {
    question: "What happens when you clear the entire pyramid?",
    answer:
      "Clearing all 28 cards from the pyramid means you win the game. You do not need to use every card in the stock pile — the game ends as soon as the last pyramid card is removed. Any remaining stock or waste pile cards are irrelevant to the outcome.",
  },
  {
    question: "Can you remove a King that is buried under other cards?",
    answer:
      "No. Like all other cards in the pyramid, a King must be fully exposed (both cards that overlap it must already be removed) before it can be taken off the board. A King is removed by itself since it already equals 13, but it still has to be uncovered first.",
  },
];

export default function HowToPlayPyramidPage() {
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

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Play Pyramid Solitaire",
    description:
      "A complete step-by-step guide to playing Pyramid Solitaire, covering the pyramid layout, card pairing rules, and stock pile mechanics.",
    totalTime: "PT10M",
    step: [
      {
        "@type": "HowToStep",
        name: "Deal the Pyramid",
        text: "Deal 28 cards face-up in a pyramid shape: 1 card in row 1, 2 cards in row 2, continuing to 7 cards in row 7. Each row overlaps the row above it so that every card (except the bottom row) is partially covered by two cards below. Place the remaining 24 cards face-down as the stock pile.",
      },
      {
        "@type": "HowToStep",
        name: "Learn the Card Values",
        text: "Each card has a numerical value: Ace = 1, 2-10 = face value, Jack = 11, Queen = 12, King = 13. Your goal is to remove pairs of cards whose values add up to exactly 13. Kings are removed on their own since they already equal 13.",
      },
      {
        "@type": "HowToStep",
        name: "Identify Available Cards",
        text: "A pyramid card is available for pairing only when it is fully uncovered — meaning both cards overlapping it from the row below have been removed. All 7 cards in the bottom row start as available. The top card of the waste pile is also always available.",
      },
      {
        "@type": "HowToStep",
        name: "Remove Pairs That Total 13",
        text: "Select two available cards that add up to 13 and remove them from the game. Valid pairs: Q+A, J+2, 10+3, 9+4, 8+5, 7+6. Kings are removed solo. You can pair two pyramid cards, a pyramid card with a waste card, or a pyramid card with a newly drawn stock card.",
      },
      {
        "@type": "HowToStep",
        name: "Use the Stock Pile",
        text: "When no more pairs are available among exposed cards, draw one card from the stock pile to the waste pile. The drawn card is now available for pairing. In standard rules you get one pass through the stock, so use draws judiciously.",
      },
      {
        "@type": "HowToStep",
        name: "Clear the Pyramid to Win",
        text: "Continue pairing and drawing until all 28 pyramid cards are removed (you win) or no more moves are possible (you lose). You do not need to exhaust the stock — the game ends the moment the pyramid is empty.",
      },
    ],
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
        name: "How to Play",
        item: absoluteUrl("/pyramid/how-to-play"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={howToJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="How to Play Pyramid Solitaire"
        subtitle="The complete guide to Pyramid Solitaire rules, card values, pyramid layout, and winning strategies."
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: What is Pyramid Solitaire? */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What Is Pyramid Solitaire?
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Pyramid Solitaire is a card game where the objective is to demolish a pyramid of
                28 cards by removing pairs that add up to 13. Unlike most solitaire games that
                require building ordered sequences, Pyramid is fundamentally about arithmetic:
                find two exposed cards whose values total 13, and they are both removed from the
                board.
              </p>
              <p>
                The game uses a single standard 52-card deck. Twenty-eight cards are dealt face-up
                in a triangular pyramid of 7 rows, and the remaining 24 cards form a stock pile
                that you draw from when you run out of moves. The pyramid layout means most cards
                start trapped beneath other cards, and you must work from the base upward,
                uncovering higher rows as you clear the cards below.
              </p>
              <p>
                Pyramid Solitaire has been popular since at least the early 1900s and is known by
                several other names, including Solitaire 13, Pile of 28, and Pyramid 13. It was
                included in early Windows Entertainment Packs and remains one of the most widely
                played solitaire variants today. The game is quick to play (a typical round takes
                3 to 8 minutes) but surprisingly difficult to win — only about 1 in 30 random
                deals can be solved with a single pass through the stock.
              </p>
            </div>
          </section>

          {/* Section 2: Setup and Layout */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Setup and Layout
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Setting up a game of Pyramid Solitaire takes about 30 seconds with a physical
                deck. In digital versions the deal is instant, but understanding the layout helps
                you read the board better.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Building the Pyramid
              </h3>
              <p>
                Deal cards face-up in a triangular formation of 7 rows. Row 1 (the apex) has
                1 card, row 2 has 2 cards, row 3 has 3, and so on. Row 7 (the base) has 7 cards.
                Each card in rows 2 through 7 is positioned so it partially overlaps two cards
                from the row above. This overlapping creates the core constraint of the game: a
                card in the pyramid cannot be removed until both cards covering it have been
                cleared.
              </p>
              <p>
                In total, the pyramid uses exactly 28 cards (1 + 2 + 3 + 4 + 5 + 6 + 7 = 28).
                This is a triangular number, which is why the pyramid shape works so neatly with
                7 rows.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Stock and Waste Piles
              </h3>
              <p>
                The remaining 24 cards are placed face-down in a single stack called the stock
                pile. When you draw from the stock, the card goes face-up onto a waste pile next
                to the stock. The top card of the waste pile is always available for pairing. In
                standard Pyramid rules, you work through the stock once — when all 24 cards have
                been drawn and you run out of moves, the game is over.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-4">
                <h3 className="font-semibold text-[#D4AF37] mb-3">Quick Layout Summary</h3>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li><strong className="text-white/80">Pyramid:</strong> 28 cards in 7 rows, all face-up</li>
                  <li><strong className="text-white/80">Stock pile:</strong> 24 cards, face-down</li>
                  <li><strong className="text-white/80">Waste pile:</strong> starts empty, receives drawn stock cards</li>
                  <li><strong className="text-white/80">Available cards:</strong> uncovered pyramid cards + top of waste pile</li>
                </ul>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 3: Card Values */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Card Values and Pairing Rules
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Every card in Pyramid Solitaire has a fixed numerical value. Two cards are removed
                together when their values add up to exactly 13. The only exception is the King,
                which equals 13 on its own and is removed without a partner.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Card</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Value</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Pairs With</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Ace</td>
                      <td className="py-2 px-4">1</td>
                      <td className="py-2 px-4">Queen (12)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">2</td>
                      <td className="py-2 px-4">Jack (11)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">3</td>
                      <td className="py-2 px-4">3</td>
                      <td className="py-2 px-4">10</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">4</td>
                      <td className="py-2 px-4">4</td>
                      <td className="py-2 px-4">9</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">5</td>
                      <td className="py-2 px-4">8</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">6</td>
                      <td className="py-2 px-4">6</td>
                      <td className="py-2 px-4">7</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">7</td>
                      <td className="py-2 px-4">7</td>
                      <td className="py-2 px-4">6</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">5</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">9</td>
                      <td className="py-2 px-4">9</td>
                      <td className="py-2 px-4">4</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">10</td>
                      <td className="py-2 px-4">3</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Jack</td>
                      <td className="py-2 px-4">11</td>
                      <td className="py-2 px-4">2</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Queen</td>
                      <td className="py-2 px-4">12</td>
                      <td className="py-2 px-4">Ace (1)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">King</td>
                      <td className="py-2 px-4">13</td>
                      <td className="py-2 px-4 italic text-white/40">Removed alone</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                There are only 6 unique pair combinations to remember, plus the King rule. Once
                you have these memorized, you can scan the board quickly without doing mental
                arithmetic each time.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-2">
                <h3 className="font-semibold text-[#D4AF37] mb-2">Memory Trick</h3>
                <p className="text-sm">
                  Think of the pairs as &quot;bookends&quot; around 13: the lowest card (Ace = 1) pairs
                  with the second-highest (Queen = 12). The next lowest (2) pairs with the
                  next-highest (Jack = 11). Continue inward: 3 with 10, 4 with 9, 5 with 8,
                  6 with 7. The King sits alone at 13. Once you see this mirror pattern, the
                  pairs become second nature.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Step by Step Gameplay */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Step-by-Step Gameplay
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Here is exactly how a game of Pyramid Solitaire unfolds, from the first move to
                the final card.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Step 1: Scan the Base Row
                  </h3>
                  <p className="text-sm">
                    Start by examining the 7 cards in the bottom row of the pyramid. These are
                    the only pyramid cards available at the start. Look for any pairs among them
                    that total 13. If a King is in the base row, it can be removed immediately.
                    Also check for pairs between base row cards and the waste pile (though the
                    waste starts empty).
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Step 2: Remove Available Pairs
                  </h3>
                  <p className="text-sm">
                    Remove any valid pairs you find. Each time you remove two cards from the
                    bottom row, you may uncover cards in row 6 above them. A row-6 card becomes
                    available only when both of its covering cards (in row 7) have been removed.
                    Continue scanning for new pairs as the board opens up.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Step 3: Draw from the Stock
                  </h3>
                  <p className="text-sm">
                    When no more pairs are visible among exposed pyramid cards, draw the top card
                    from the stock pile onto the waste pile. The drawn card is now available for
                    pairing with any exposed pyramid card. If the drawn card does not create a
                    useful pair, you can draw again — but remember, in standard rules you only get
                    one pass through the 24-card stock.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Step 4: Work Upward Through the Pyramid
                  </h3>
                  <p className="text-sm">
                    As you clear cards from the lower rows, higher rows become accessible. The
                    game becomes progressively easier in some ways (fewer cards to track) but
                    harder in others (you may need specific cards from the stock that have
                    already been buried in the waste pile). Keep scanning for pyramid-to-pyramid
                    pairs as well as pyramid-to-waste pairs.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Step 5: Win or Exhaust Your Options
                  </h3>
                  <p className="text-sm">
                    The game ends in one of two ways. If you remove all 28 pyramid cards, you
                    win — regardless of how many stock or waste cards remain. If you run out of
                    moves (no available pairs and the stock is empty), the game is lost. With
                    standard single-pass rules, losing is far more common than winning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 5: Key Rules and Edge Cases */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Key Rules and Edge Cases
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Most of Pyramid Solitaire is straightforward, but a few rules catch new players
                off guard.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                The Overlap Rule
              </h3>
              <p>
                A card in the pyramid is &quot;covered&quot; if either of the two cards below it (in the
                next row) is still present. Both covering cards must be removed before the covered
                card becomes available. This is the single most important rule in Pyramid
                Solitaire because it determines which cards you can actually use at any given
                moment.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Kings Are Self-Sufficient
              </h3>
              <p>
                Kings equal 13 by themselves and are removed without a partner. This makes Kings
                uniquely valuable — each one is a free removal that opens up the cards above it.
                When you have a choice between removing a King and removing another pair, think
                about which removal uncovers more useful cards.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Waste Pile Access
              </h3>
              <p>
                Only the top card of the waste pile is available. Once a card is buried under
                subsequent draws, it is gone for the rest of the game (in single-pass rules). This
                means drawing from the stock has a cost: the previous waste card becomes
                inaccessible. If the current waste card could pair with a pyramid card, you should
                almost always make that pair before drawing again.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                No Suit Restrictions
              </h3>
              <p>
                Unlike FreeCell or Spider Solitaire, suits are completely irrelevant in Pyramid
                Solitaire. A 9 of Hearts pairs with a 4 of Clubs just as validly as a 4 of
                Hearts. The only thing that matters is that the two values sum to 13.
              </p>

              <h3 className="text-lg font-semibold text-white/80 mt-4">
                Common Variants
              </h3>
              <p>
                Some popular rule variations change the difficulty significantly:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm mt-2">
                <li>
                  <strong className="text-white/80">Relaxed Pyramid:</strong> allows 2 or 3 passes
                  through the stock pile, significantly increasing the win rate to around 25-30%
                </li>
                <li>
                  <strong className="text-white/80">Par Pyramid:</strong> instead of clearing the
                  entire pyramid, you try to remove as many cards as possible and compare your
                  score to a &quot;par&quot; target for each deal
                </li>
                <li>
                  <strong className="text-white/80">Tut&apos;s Tomb:</strong> a harder variant
                  using a larger layout with additional reserve cards alongside the pyramid
                </li>
                <li>
                  <strong className="text-white/80">Giza:</strong> all pyramid cards are dealt
                  face-up with no hidden information, turning the game into a pure logic puzzle
                </li>
              </ul>
            </div>
          </section>

          {/* Section 6: Common Strategies */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Essential Strategies
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Pyramid Solitaire rewards careful play more than most people expect. While luck
                plays a large role (many deals are simply unsolvable), smart decisions on winnable
                deals make the difference between a 2% and a 5% win rate — which is a massive
                improvement in a game this difficult.
              </p>

              <div className="space-y-4">
                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Prioritize Pyramid-to-Pyramid Pairs
                  </h3>
                  <p className="text-sm">
                    Whenever you can pair two pyramid cards together, you remove two cards from the
                    layout in a single move and potentially uncover cards in higher rows. Pairing
                    with the waste pile only removes one pyramid card per move. All else being
                    equal, pyramid-to-pyramid pairs are more efficient.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Remove Kings Immediately
                  </h3>
                  <p className="text-sm">
                    There is almost never a reason to leave an exposed King on the board. Kings
                    are free removals — they require no partner and they open up the pyramid. Take
                    them as soon as they are uncovered.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Focus on Uncovering the Apex
                  </h3>
                  <p className="text-sm">
                    The card at the top of the pyramid (row 1) is the last card you need to
                    remove. To reach it, you must clear all 6 rows below. Prioritize removing
                    cards that block the path to the apex. If two different pairs are available,
                    choose the one that uncovers a card closer to the top of the pyramid.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Conserve the Stock Pile
                  </h3>
                  <p className="text-sm">
                    Every card you draw from the stock buries the previous waste card. Draw only
                    when you have exhausted all pyramid-to-pyramid pairs and there are no useful
                    waste-to-pyramid pairs. Each unnecessary draw wastes a card that might have
                    been useful later.
                  </p>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                  <h3 className="font-semibold text-[#D4AF37] mb-2">
                    Think About What You Cannot See
                  </h3>
                  <p className="text-sm">
                    In standard Pyramid, all pyramid cards are face-up, so you can see the entire
                    layout from the start. Use this information. If you can see that both 9s
                    needed to pair with a 4 are buried deep in the pyramid, you know that 4 will
                    need to be paired with a 9 from the stock — plan accordingly. Count the cards
                    you need and assess whether the stock is likely to contain them.
                  </p>
                </div>
              </div>

              <p className="mt-2">
                For a deeper dive into strategy, including card counting techniques and advanced
                decision frameworks, see our{" "}
                <Link href="/pyramid/strategy" className="text-[#D4AF37] hover:underline">
                  Pyramid Solitaire Strategy Guide
                </Link>
                .
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 7: Pyramid vs Other Solitaire Games */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Pyramid Compares to Other Solitaire Games
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                If you are coming to Pyramid from other solitaire variants, here is how it
                differs in feel and strategy.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Feature</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Pyramid</th>
                      <th className="py-3 px-4 font-semibold text-white/80">FreeCell</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Klondike</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Core mechanic</td>
                      <td className="py-2 px-4">Pair cards totaling 13</td>
                      <td className="py-2 px-4">Build foundation sequences</td>
                      <td className="py-2 px-4">Build foundation sequences</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Deck</td>
                      <td className="py-2 px-4">1 deck (52 cards)</td>
                      <td className="py-2 px-4">1 deck (52 cards)</td>
                      <td className="py-2 px-4">1 deck (52 cards)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Hidden cards</td>
                      <td className="py-2 px-4">None (all face-up)</td>
                      <td className="py-2 px-4">None (all face-up)</td>
                      <td className="py-2 px-4">Yes (face-down tableau)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Suits matter</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Yes</td>
                      <td className="py-2 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Win rate (perfect play)</td>
                      <td className="py-2 px-4">~3% (single pass)</td>
                      <td className="py-2 px-4">~99.999%</td>
                      <td className="py-2 px-4">~80%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Avg. game time</td>
                      <td className="py-2 px-4">3-8 minutes</td>
                      <td className="py-2 px-4">5-15 minutes</td>
                      <td className="py-2 px-4">5-15 minutes</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4">Skill vs luck</td>
                      <td className="py-2 px-4">High luck</td>
                      <td className="py-2 px-4">High skill</td>
                      <td className="py-2 px-4">Moderate both</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                Pyramid&apos;s low win rate can be frustrating if you are used to FreeCell&apos;s near-perfect
                solvability. The trade-off is that Pyramid games are short and quick to set up, so
                you can play many rounds in the time it takes to finish one FreeCell game. Think
                of it more like a slot machine than a chess puzzle — your skill improves the odds,
                but the deal has the final say.
              </p>
            </div>
          </section>

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

          {/* CTA Section */}
          <CtaSection
            heading="Ready to Put Your Skills to the Test?"
            body="Master Pyramid Solitaire strategy with our in-depth guide, or jump into a game of FreeCell — a solitaire variant where nearly every deal is winnable."
            primaryLabel="Pyramid Strategy Guide"
            primaryHref="/pyramid/strategy"
            secondaryLabel="Play FreeCell Online"
            secondaryHref="/"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/pyramid/strategy" title="Pyramid Strategy" description="Advanced tips and card counting techniques" />
              <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Compare Pyramid, FreeCell, Klondike, and more" />
              <ContentLinkCard href="/freecell-vs-klondike" title="FreeCell vs Klondike" description="How the two classic games compare" />
              <ContentLinkCard href="/klondike/how-to-play" title="Klondike Rules" description="Complete guide to the world's most popular solitaire" />
              <ContentLinkCard href="/spider/how-to-play" title="Spider Solitaire Rules" description="Rules for 1-suit, 2-suit, and 4-suit variants" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire — free online" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
