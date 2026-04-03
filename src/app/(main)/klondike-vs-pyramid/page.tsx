import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "Klondike vs Pyramid Solitaire | Building vs Pairing Card Games Compared",
  description:
    "Klondike vs Pyramid Solitaire compared head to head. Rules, win rates, strategy, difficulty, and whether a building game or a pairing game suits your play style.",
  keywords: [
    "klondike vs pyramid solitaire",
    "klondike or pyramid",
    "difference between klondike and pyramid",
    "klondike vs pyramid difficulty",
    "pyramid vs klondike",
    "klondike compared to pyramid",
    "is pyramid harder than klondike",
    "klondike pyramid comparison",
    "solitaire building vs pairing",
    "best solitaire game",
    "solitaire card games compared",
    "pyramid solitaire win rate",
  ],
  openGraph: {
    title:
      "Klondike vs Pyramid Solitaire | Building vs Pairing Card Games Compared",
    description:
      "A head-to-head comparison of Klondike and Pyramid Solitaire. Rules, strategy, win rates, difficulty, and which game fits your style.",
    url: absoluteUrl("/klondike-vs-pyramid"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "Is Pyramid Solitaire harder than Klondike?",
    answer:
      "Pyramid Solitaire is much harder to win than Klondike. Only about 2-5% of Pyramid deals can be fully cleared, compared to roughly 80% of Klondike draw-one deals being theoretically solvable. Pyramid is simpler to learn (just pair cards that add up to 13), but the low win rate means you will lose most games regardless of skill. Klondike has more complex rules but rewards good play with a much higher win rate.",
  },
  {
    question: "What is the main difference between Klondike and Pyramid Solitaire?",
    answer:
      "The core mechanic is completely different. Klondike is a building game where you stack cards in alternating-color descending sequences on the tableau and build foundations from Ace to King by suit. Pyramid is a pairing game where you remove cards by matching pairs that add up to 13 (for example, a 10 and a 3, or a Queen and an Ace). Kings equal 13 on their own and are removed individually. These are fundamentally different types of solitaire despite both using a single deck.",
  },
  {
    question: "Which has more luck, Klondike or Pyramid?",
    answer:
      "Pyramid Solitaire involves more luck than Klondike. In Pyramid, the arrangement of cards in the pyramid shape and the order of the stock pile largely determine whether a deal is solvable at all, and most deals are not. Klondike also has significant luck from hidden tableau cards and stock pile order, but a skilled player can overcome bad luck more often because the building mechanics offer more ways to work around obstacles. Both games have far more luck than pure-strategy games like FreeCell.",
  },
  {
    question: "Which game takes longer, Klondike or Pyramid?",
    answer:
      "Pyramid games are typically faster, running about 3-5 minutes per game. Klondike games usually take 5-15 minutes, especially when cycling through the stock pile multiple times with draw-three rules. Pyramid's simpler mechanic (just pair cards to 13) means decisions are quick, while Klondike requires more thought about sequencing and which cards to uncover first.",
  },
  {
    question: "Can I play both Klondike and Pyramid on this site?",
    answer:
      "PlayFreeCellOnline.com offers Klondike and Pyramid Solitaire along with FreeCell and other solitaire variants, all free with no download required. The site includes features like undo, statistics tracking, and numbered deals. You can switch between games any time to experience both building and pairing styles of solitaire.",
  },
  {
    question: "Which solitaire game is better for beginners?",
    answer:
      "Klondike is the better starting point for beginners. It is the game most people simply call 'Solitaire' and the rules are familiar to nearly everyone. The higher win rate means new players get rewarded more often, which keeps the game engaging. Pyramid has simpler rules (just match pairs to 13), but the very low win rate can be frustrating for new players who may not realize that most deals are mathematically unsolvable regardless of skill.",
  },
];

/* ── Comparison data ── */

const comparisonRows = [
  { label: "Decks", klondike: "1 (52 cards)", pyramid: "1 (52 cards)" },
  {
    label: "Layout",
    klondike: "7 tableau columns (1\u20137 cards each)",
    pyramid: "28 cards in a 7-row pyramid",
  },
  {
    label: "Stock pile",
    klondike: "24 cards, drawn 1 or 3 at a time",
    pyramid: "24 cards, drawn 1 at a time",
  },
  {
    label: "Core mechanic",
    klondike: "Build sequences (alternating color, descending)",
    pyramid: "Pair cards that sum to 13",
  },
  {
    label: "Foundations",
    klondike: "4 piles, build A\u2013K by suit",
    pyramid: "None (paired cards are discarded)",
  },
  {
    label: "Goal",
    klondike: "Move all cards to foundations",
    pyramid: "Clear the entire pyramid",
  },
  {
    label: "Cards you can interact with",
    klondike: "Top of each column + stock/waste",
    pyramid: "Exposed (uncovered) pyramid cards + stock/waste",
  },
  {
    label: "Luck factor",
    klondike: "High (hidden cards + draw order)",
    pyramid: "Very high (most deals unsolvable)",
  },
  {
    label: "Win rate (skilled player)",
    klondike: "~43% (draw-3) / ~85% (draw-1)",
    pyramid: "~2\u20135% (full clear)",
  },
  {
    label: "Average game length",
    klondike: "5\u201315 minutes",
    pyramid: "3\u20135 minutes",
  },
  {
    label: "Difficulty to learn",
    klondike: "Easy (most people already know it)",
    pyramid: "Very easy (just add to 13)",
  },
  {
    label: "Difficulty to win",
    klondike: "Moderate",
    pyramid: "Very hard (low solvability)",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function KlondikeVsPyramidPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Klondike vs Pyramid Solitaire: Building vs Pairing Card Games Compared",
      description:
        "A detailed head-to-head comparison of Klondike and Pyramid Solitaire. Rules, strategy, win rates, difficulty, and which solitaire style suits different player types.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-04-03",
      dateModified: "2026-04-03",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/klondike-vs-pyramid"),
      },
    },
    {
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
    },
    {
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
          name: "Klondike vs Pyramid Solitaire",
          item: absoluteUrl("/klondike-vs-pyramid"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Klondike vs Pyramid Solitaire"
        subtitle={
          <>
            One game asks you to build cards into ordered sequences. The other
            asks you to pair cards that add up to 13. Klondike and Pyramid are
            both single-deck solitaire games, but they play nothing alike.
            Here&apos;s how they compare.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── Quick Comparison Table ── */}
        <CardSection id="comparison">
          <SectionHeading
            sub="At a Glance"
            id="comparison-heading"
            icon={"\u2660"}
          >
            Side-by-Side Comparison
          </SectionHeading>

          <ContentBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Feature
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Klondike Solitaire
                    </th>
                    <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Pyramid Solitaire
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={
                        i % 2 === 0
                          ? "bg-[#B8860B]/[0.03]"
                          : ""
                      }
                    >
                      <td className="py-3 pr-4 text-[#2a2522] font-medium text-sm">
                        {row.label}
                      </td>
                      <td className="py-3 px-4 text-[#444444] text-sm">
                        {row.klondike}
                      </td>
                      <td className="py-3 pl-4 text-[#444444] text-sm">
                        {row.pyramid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── What Is Klondike ── */}
        <CardSection id="what-is-klondike">
          <SectionHeading
            sub="The World&apos;s Most Popular Solitaire"
            id="what-is-klondike-heading"
            icon={"\u2663"}
          >
            What Is Klondike Solitaire?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Klondike is the game most people simply call &quot;Solitaire.&quot;
              It uses one standard 52-card deck dealt into seven tableau columns.
              The first column gets one card, the second gets two, the third gets
              three, and so on up to seven. Only the top card in each column
              starts face-up. The remaining 24 cards form a stock pile that you
              draw from during play.
            </p>
            <p>
              You build on the tableau by placing cards in alternating colors
              (red on black, black on red) in descending order. Meanwhile, you
              build four foundation piles from Ace up to King, sorted by suit.
              The goal is to move all 52 cards onto the foundations. You can
              learn the full rules in our{" "}
              <Link
                href="/klondike/how-to-play"
                className="text-[#8B6914] hover:underline"
              >
                Klondike how-to-play guide
              </Link>
              .
            </p>
            <p>
              Klondike has been bundled with Windows since version 3.0 in 1990,
              which is how it became the most recognized card game on the planet.
              Draw-one Klondike is more forgiving, with about 80% of deals being
              theoretically solvable. Draw-three Klondike is the standard
              competitive version and is significantly harder, with skilled
              players winning around 43% of their games. Visit our{" "}
              <Link
                href="/klondike"
                className="text-[#8B6914] hover:underline"
              >
                Klondike Solitaire page
              </Link>{" "}
              to play.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── What Is Pyramid ── */}
        <CardSection id="what-is-pyramid">
          <SectionHeading
            sub="The Pairing Puzzle"
            id="what-is-pyramid-heading"
            icon={"\u2665"}
          >
            What Is Pyramid Solitaire?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Pyramid Solitaire also uses a single 52-card deck, but the layout
              is completely different. Twenty-eight cards are dealt face-up in a
              pyramid shape with seven rows: one card in the top row, two in the
              second, three in the third, and so on. Each card partially
              overlaps the two cards below it. The remaining 24 cards go into a
              stock pile.
            </p>
            <p>
              Instead of building sequences, you remove cards by pairing two
              exposed cards whose ranks add up to 13. Kings equal 13 on their own
              and are removed individually. Queens pair with Aces
              (12 + 1 = 13), Jacks with 2s (11 + 2 = 13), 10s with 3s, 9s with
              4s, 8s with 5s, and 7s with 6s. A card is &quot;exposed&quot; when
              no other card overlaps it from below.
            </p>
            <p>
              The goal is to clear the entire pyramid. There are no foundation
              piles in the traditional sense. Paired cards are simply discarded
              from the game. Pyramid was included in later versions of Microsoft
              Solitaire Collection. Despite its simple rules, the game has a
              notoriously low win rate: only about 2-5% of deals can be fully
              cleared. Check out our{" "}
              <Link
                href="/pyramid"
                className="text-[#8B6914] hover:underline"
              >
                Pyramid Solitaire page
              </Link>{" "}
              to try it yourself.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Key Differences ── */}
        <CardSection id="key-differences">
          <SectionHeading
            sub="What Sets Them Apart"
            id="key-differences-heading"
            icon={"\u2666"}
          >
            Key Differences Between Klondike and Pyramid
          </SectionHeading>

          <ContentBody className="space-y-5">
            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Building vs Pairing
            </h3>
            <p>
              This is the fundamental divide. Klondike is a building game. You
              construct ordered sequences on the tableau and stack cards onto
              foundations in a specific order. Every move is about positioning
              cards so they can eventually reach their foundation pile. Pyramid
              is a pairing game. You scan the board for two exposed cards that
              add up to 13 and remove them. There is no sequencing, no
              foundations, and no card stacking. These are two entirely different
              styles of solitaire that happen to share a deck size.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Tableau Structure
            </h3>
            <p>
              Klondike uses seven columns arranged left to right, with cards
              cascading downward. You interact with the bottom (exposed) card of
              each column and can move entire sequences of properly ordered
              cards between columns. Pyramid uses a triangular layout where
              each card overlaps two cards below it. You can only interact with
              cards that have no cards overlapping them from the row below. As
              you remove pairs, deeper cards become exposed. The pyramid shape
              creates a natural progression from the base toward the peak.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Foundations and Win Conditions
            </h3>
            <p>
              Klondike has four foundation piles where you build each suit from
              Ace to King. You win by moving all 52 cards onto these
              foundations. Pyramid has no foundations at all. Paired cards are
              simply removed from the game. You win by clearing every card from
              the pyramid. Some Pyramid variants count a partial clear as a
              win, but the classic goal is a complete clear.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Stock Pile Usage
            </h3>
            <p>
              Both games deal 24 cards into a stock pile, but you use it
              differently. In Klondike, you draw cards from the stock (one or
              three at a time, depending on the variant) and can play them onto
              the tableau or foundations. In draw-three Klondike, cycling through
              the stock strategically is a major part of the{" "}
              <Link
                href="/klondike/strategy"
                className="text-[#8B6914] hover:underline"
              >
                Klondike strategy
              </Link>
              . In Pyramid, you draw one card at a time from the stock and try
              to pair it with an exposed pyramid card. If no pairing is
              possible, the card goes to a waste pile. Stock management in
              Pyramid is simpler but no less important.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Hidden Information
            </h3>
            <p>
              Klondike hides most of its tableau cards face-down. You only see
              the top card of each column at the start, meaning 21 of 28
              tableau cards are hidden. These get revealed as you move cards
              away. Pyramid deals all 28 pyramid cards face-up from the start.
              You can see every card in the pyramid, but you can only interact
              with exposed ones. Klondike has more hidden information overall,
              while Pyramid gives you full visibility of the pyramid but limits
              what you can touch.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Win Rates & Difficulty ── */}
        <CardSection id="win-rates">
          <SectionHeading
            sub="By the Numbers"
            id="win-rates-heading"
            icon={"\u2660"}
          >
            Win Rates &amp; Difficulty
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Klondike and Pyramid sit at opposite ends of the solitaire win
              rate spectrum. Klondike is one of the more winnable solitaire
              games, while Pyramid is one of the least.
            </p>

            <div className="card-inset rounded-lg p-5 mt-2">
              <h3
                className="font-medium text-[#2a2522] text-lg mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Win Rates Compared
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Klondike (Draw-1)
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    ~85%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    skilled player
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Klondike (Draw-3)
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    ~43%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    skilled player
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Pyramid (Full Clear)
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    ~3%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    skilled player
                  </div>
                </div>
              </div>
            </div>

            <p>
              Draw-one Klondike is roughly 80% solvable in theory, and skilled
              players can win about 85% of their games. Draw-three Klondike
              drops to around 30% theoretical solvability, though strong players
              push their practical win rate to about 43% by managing the stock
              pile carefully.
            </p>
            <p>
              Pyramid&apos;s full-clear solvability hovers around 2-5%. Even
              the best players rarely clear more than a handful of games out of
              100 attempts. Some variants offer a &quot;partial clear&quot;
              scoring mode where you try to remove as many cards as possible,
              pushing the effective win rate closer to 30%. But in classic
              Pyramid, the pyramid shape and card distribution simply make most
              deals impossible.
            </p>
            <p>
              This means Klondike rewards improvement. As you get better, you
              win noticeably more often. Pyramid is more about accepting that
              most deals are lost causes and enjoying the ones that work out.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Strategy Comparison ── */}
        <CardSection id="strategy">
          <SectionHeading
            sub="How Strategy Differs"
            id="strategy-heading"
            icon={"\u2663"}
          >
            Strategy: Sequencing vs Pattern Recognition
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Klondike and Pyramid demand very different mental skills. If
              you&apos;re good at one, those skills won&apos;t necessarily help
              with the other.
            </p>
            <p>
              <strong>Klondike strategy</strong> revolves around planning
              multi-step sequences. You need to think about which face-down
              cards to uncover first, when to move cards to foundations versus
              keeping them on the tableau for building, and how to cycle through
              the stock pile efficiently. Strong{" "}
              <Link
                href="/klondike/tips"
                className="text-[#8B6914] hover:underline"
              >
                Klondike players
              </Link>{" "}
              think several moves ahead, much like chess. The game rewards
              patience, planning, and the ability to recognize when a specific
              card order on the tableau will unlock a cascade of moves later.
            </p>
            <p>
              <strong>Pyramid strategy</strong> is about quick pattern
              recognition and arithmetic. You scan the exposed cards for pairs
              that sum to 13, decide which pairs to remove first (since removing
              different pairs exposes different cards below), and manage the
              stock pile for future pairing opportunities. The strategic depth
              comes from choosing between multiple available pairs. Removing a
              5 from the left side of the pyramid might expose a card you need,
              while removing a 5 from the right might block a critical pairing.
              Check our{" "}
              <Link
                href="/pyramid/tips"
                className="text-[#8B6914] hover:underline"
              >
                Pyramid tips
              </Link>{" "}
              for more on this.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Klondike</strong> rewards long-term planning and
                sequencing. Moving a King to an empty column or uncovering a
                hidden Ace can change the entire game.
              </li>
              <li>
                <strong>Pyramid</strong> rewards quick math and board reading.
                Spotting the right pair to remove first can mean the difference
                between clearing a row and getting stuck.
              </li>
              <li>
                <strong>Klondike</strong> gives you more control. Skill
                meaningfully increases your win rate over hundreds of games.
              </li>
              <li>
                <strong>Pyramid</strong> gives you less control. The initial
                card layout determines the outcome more than your decisions do.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Which Should You Play? ── */}
        <CardSection id="which-to-play">
          <SectionHeading
            sub="Choose Your Style"
            id="which-to-play-heading"
            icon={"\u2665"}
          >
            Which Should You Play?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              <strong>Play Klondike Solitaire if:</strong> You want the classic
              solitaire experience with a satisfying win rate. Klondike is ideal
              for players who enjoy planning ahead, building ordered sequences,
              and watching a messy tableau gradually transform into neat
              foundation piles. It is the best choice if you want a game where
              getting better at strategy directly translates to winning more
              often. Start with draw-one for a relaxed session, or switch to
              draw-three for a real challenge. Try it on our{" "}
              <Link
                href="/klondike"
                className="text-[#8B6914] hover:underline"
              >
                Klondike Solitaire page
              </Link>
              .
            </p>
            <p>
              <strong>Play Pyramid Solitaire if:</strong> You want quick games
              with simple rules and a different kind of mental workout. Pyramid
              is perfect for short breaks because games last only 3-5 minutes.
              The pairing mechanic (find two cards that add to 13) feels more
              like a number puzzle than a card game. Just know going in that
              most deals cannot be fully cleared. If you can enjoy the process
              without needing to win every time, Pyramid is a refreshing change
              from building-style solitaire. Play it on our{" "}
              <Link
                href="/pyramid"
                className="text-[#8B6914] hover:underline"
              >
                Pyramid Solitaire page
              </Link>
              .
            </p>
            <p>
              Many solitaire fans play both for different reasons. Klondike
              when you want a deeper session with real strategic decisions.
              Pyramid when you want a fast, low-pressure game that exercises
              a completely different part of your brain. They complement each
              other well precisely because they are so different.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Key Takeaways ── */}
        <CardSection id="key-takeaways">
          <SectionHeading
            sub="The Bottom Line"
            id="key-takeaways-heading"
            icon={"\u2666"}
          >
            Key Takeaways
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Klondike is a building game (stack cards in alternating-color
                sequences). Pyramid is a pairing game (remove cards that sum
                to 13). They share a deck size but almost nothing else.
              </li>
              <li>
                Klondike has a much higher win rate. Skilled players win about
                43% of draw-three games and 85% of draw-one games. Pyramid
                full-clear rates sit around 2-5%.
              </li>
              <li>
                Pyramid games are faster (3-5 minutes vs 5-15 for Klondike),
                making Pyramid better suited for quick breaks.
              </li>
              <li>
                Klondike rewards strategic planning and sequencing. Pyramid
                rewards pattern recognition and quick arithmetic.
              </li>
              <li>
                Klondike has more hidden information (face-down tableau cards)
                but gives you more ways to work around bad luck. Pyramid shows
                you everything but offers less control over the outcome.
              </li>
              <li>
                Both were included in Microsoft Windows, making them two of the
                most widely played solitaire games in history.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  {faq.answer}
                </p>
                {i < faqs.length - 1 && (
                  <div className="mt-6 border-b border-[#e5e0d8]" />
                )}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Keep Exploring" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/klondike",
                  title: "Play Klondike Solitaire",
                  desc: "Try Klondike free in your browser.",
                },
                {
                  href: "/pyramid",
                  title: "Play Pyramid Solitaire",
                  desc: "Try Pyramid free in your browser.",
                },
                {
                  href: "/klondike/how-to-play",
                  title: "Klondike Solitaire Rules",
                  desc: "Complete rules and setup guide.",
                },
                {
                  href: "/pyramid/how-to-play",
                  title: "Pyramid Solitaire Rules",
                  desc: "How to play Pyramid step by step.",
                },
                {
                  href: "/klondike/strategy",
                  title: "Klondike Strategy Guide",
                  desc: "Advanced techniques for higher win rates.",
                },
                {
                  href: "/pyramid/strategy",
                  title: "Pyramid Strategy Guide",
                  desc: "Winning tactics for Pyramid Solitaire.",
                },
                {
                  href: "/klondike/tips",
                  title: "Klondike Tips",
                  desc: "Quick advice for better Klondike play.",
                },
                {
                  href: "/pyramid/tips",
                  title: "Pyramid Tips",
                  desc: "Quick advice for better Pyramid play.",
                },
                {
                  href: "/solitaire-types",
                  title: "All Solitaire Types",
                  desc: "Browse every solitaire variant we cover.",
                },
                {
                  href: "/freecell-vs-klondike",
                  title: "FreeCell vs Klondike",
                  desc: "How FreeCell compares to Klondike.",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card-inset rounded-lg p-4 hover:bg-[#B8860B]/[0.06] transition-colors group"
                >
                  <h3 className="font-medium text-[#2a2522] group-hover:text-[#B8860B] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-1">
                    {link.desc}
                  </p>
                </Link>
              ))}
            </div>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play Both Games Free"
          body="No downloads, no sign-ups. Klondike and Pyramid Solitaire are both available on PlayFreeCellOnline.com with full features."
          primaryLabel="Play Klondike Solitaire"
          primaryHref="/klondike"
          secondaryLabel="Play Pyramid Solitaire"
          secondaryHref="/pyramid"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
