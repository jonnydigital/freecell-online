import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "Spider vs Scorpion Solitaire | Two Tough Tableau Games Compared",
  description:
    "Spider Solitaire vs Scorpion Solitaire compared head to head. Rules, difficulty, win rates, strategy depth, and which tableau-building game suits your play style.",
  keywords: [
    "spider vs scorpion solitaire",
    "scorpion vs spider solitaire",
    "difference between spider and scorpion",
    "spider solitaire vs scorpion",
    "scorpion solitaire rules",
    "spider or scorpion solitaire",
    "is scorpion harder than spider",
    "scorpion solitaire win rate",
    "spider solitaire comparison",
    "scorpion solitaire strategy",
    "tableau solitaire games",
    "solitaire card games compared",
  ],
  openGraph: {
    title:
      "Spider vs Scorpion Solitaire | Two Tough Tableau Games Compared",
    description:
      "A head-to-head comparison of Spider and Scorpion Solitaire. Rules, strategy, difficulty, win rates, and which game fits your style.",
    url: absoluteUrl("/spider-vs-scorpion"),
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
    question: "Is Scorpion Solitaire harder than Spider Solitaire?",
    answer:
      "It depends on which Spider variant you mean. Scorpion is harder than one-suit Spider (which is almost always winnable) and roughly comparable to two-suit Spider. However, four-suit Spider is significantly harder than Scorpion due to its larger card count and suit-matching requirements. Scorpion has a theoretical solvability rate around 55%, while four-suit Spider sits around 35-40%. The difficulty in Scorpion comes from face-down cards blocking your sequences, while Spider's difficulty scales with the number of suits in play.",
  },
  {
    question: "What is the main difference between Spider and Scorpion Solitaire?",
    answer:
      "The biggest differences are deck count and movement rules. Spider uses two decks (104 cards) across ten columns with a stock pile for dealing extra cards. Scorpion uses one deck (52 cards) across seven columns with no stock pile. In Spider, only same-suit sequences can be moved as a group. In Scorpion, you can move any card along with everything on top of it, regardless of suit order. Spider removes completed King-to-Ace runs, while Scorpion builds them in place on the tableau. These differences create two very different strategic experiences from a similar concept.",
  },
  {
    question: "Which game takes longer to play, Spider or Scorpion?",
    answer:
      "Spider Solitaire typically takes longer. A four-suit Spider game runs 10-20 minutes because you're managing 104 cards across ten columns with five stock deals. Scorpion games usually finish in 5-12 minutes since you're working with just 52 cards and seven columns. The smaller board in Scorpion means fewer cards to sort and faster decision-making, though individual moves can require deep thought about what's trapped under face-down cards.",
  },
  {
    question: "Can you move cards differently in Spider vs Scorpion?",
    answer:
      "Yes, and this is one of the most important differences. In Spider, you can only move a group of cards if they form a descending same-suit sequence. A run like 8-7-6 of Spades moves together, but 8 of Spades-7 of Hearts-6 of Spades does not. In Scorpion, you can pick up any face-up card and move it along with every card stacked on top of it, regardless of whether those cards form a proper sequence. This gives Scorpion players more movement flexibility but doesn't make the game easier, because you still need same-suit descending sequences to win.",
  },
  {
    question: "Do Spider and Scorpion Solitaire have stock piles?",
    answer:
      "Spider has a stock pile containing 50 cards (the cards not initially dealt to the tableau). You can deal from it at any time as long as every column has at least one card, sending one new card to each of the ten columns. Scorpion has no stock pile at all. All 52 cards are dealt at the start, with some face-down in the tableau. Some Scorpion variants include a three-card reserve, but the standard game puts everything on the tableau from the beginning. This means Scorpion gives you all your information upfront (once cards are flipped), while Spider keeps introducing new unknowns throughout the game.",
  },
  {
    question: "Which game is better for beginners, Spider or Scorpion?",
    answer:
      "One-suit Spider is the best starting point for beginners. With all cards sharing the same suit, you don't need to worry about suit matching at all, and the win rate is above 99%. Scorpion is tougher for beginners because face-down cards can create traps that are hard to see coming, and the win rate is only around 55%. If you already know Spider well and want a single-deck challenge, Scorpion is a natural next step. But if you're new to tableau-building solitaire games, start with one-suit Spider to learn the basic mechanics.",
  },
];

/* ── Comparison data ── */

const comparisonRows = [
  { label: "Decks", spider: "2 (104 cards)", scorpion: "1 (52 cards)" },
  {
    label: "Tableau columns",
    spider: "10",
    scorpion: "7",
  },
  {
    label: "Cards dealt face-down",
    spider: "~50 in tableau",
    scorpion: "21 in tableau",
  },
  {
    label: "Stock pile",
    spider: "50 cards (5 deals of 10)",
    scorpion: "None",
  },
  {
    label: "Build rule",
    spider: "Any suit descending (in-suit to move/remove)",
    scorpion: "Same suit descending to win",
  },
  {
    label: "Group move rule",
    spider: "Same-suit sequences only",
    scorpion: "Any card + everything on top",
  },
  {
    label: "Goal",
    spider: "Build 8 complete K\u2013A same-suit runs",
    scorpion: "Build 4 complete K\u2013A same-suit runs in place",
  },
  {
    label: "Empty column rule",
    spider: "Any card may fill",
    scorpion: "Kings only",
  },
  {
    label: "Luck factor",
    spider: "Moderate to high",
    scorpion: "Moderate",
  },
  {
    label: "Win rate (skilled player)",
    spider: "~35\u201340% (4-suit) / ~99% (1-suit)",
    scorpion: "~45\u201355%",
  },
  {
    label: "Average game length",
    spider: "10\u201320 minutes",
    scorpion: "5\u201312 minutes",
  },
  {
    label: "Difficulty",
    spider: "Easy (1-suit) to Very Hard (4-suit)",
    scorpion: "Hard",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function SpiderVsScorpionPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Spider vs Scorpion Solitaire: Two Tough Tableau Games Compared",
      description:
        "A detailed head-to-head comparison of Spider Solitaire and Scorpion Solitaire. Rules, strategy, difficulty, win rates, and which tableau-building game suits different player types.",
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
        "@id": absoluteUrl("/spider-vs-scorpion"),
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
          name: "Spider vs Scorpion Solitaire",
          item: absoluteUrl("/spider-vs-scorpion"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Spider vs Scorpion Solitaire"
        subtitle={
          <>
            Both games ask you to build same-suit runs on the tableau, but
            they get there in very different ways. Spider spreads 104 cards
            across ten columns with a stock pile; Scorpion fits 52 cards into
            seven columns with no stock at all. Here&apos;s how they compare.
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
                      Spider Solitaire
                    </th>
                    <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Scorpion Solitaire
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
                        {row.spider}
                      </td>
                      <td className="py-3 pl-4 text-[#444444] text-sm">
                        {row.scorpion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── How Spider Works ── */}
        <CardSection id="how-spider-works">
          <SectionHeading
            sub="The Two-Deck Giant"
            id="how-spider-heading"
            icon={"\u2663"}
          >
            How Spider Solitaire Works
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Spider Solitaire uses two full decks shuffled together for 104
              cards total. These are dealt across ten tableau columns: four
              columns of six cards and six columns of five. Only the top
              card in each column starts face-up. The remaining 50 cards form
              a stock pile that you deal from throughout the game, sending one
              new card to every column at once.
            </p>
            <p>
              Your goal is to build eight complete same-suit runs from King
              down to Ace. When you complete a full 13-card run in one suit,
              that sequence is automatically removed from the board. Clear all
              eight runs and you win. The twist is that you can stack any card
              on a card one rank higher regardless of suit, but only same-suit
              sequences can be moved as a group or removed. This tension
              between what&apos;s legal and what&apos;s useful is the heart of{" "}
              <Link
                href="/spider/strategy"
                className="text-[#8B6914] hover:underline"
              >
                Spider strategy
              </Link>
              .
            </p>
            <p>
              Spider comes in three difficulty levels.{" "}
              <Link
                href="/spider/1-suit-vs-2-suit-vs-4-suit"
                className="text-[#8B6914] hover:underline"
              >
                One-suit Spider
              </Link>{" "}
              uses only Spades and is almost always winnable. Two-suit Spider
              adds Hearts and raises difficulty substantially. Four-suit Spider
              uses all suits and is one of the hardest popular solitaire games,
              with skilled players winning only about 35-40% of their games.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── How Scorpion Works ── */}
        <CardSection id="how-scorpion-works">
          <SectionHeading
            sub="The Single-Deck Sting"
            id="how-scorpion-heading"
            icon={"\u2665"}
          >
            How Scorpion Solitaire Works
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Scorpion Solitaire uses a single standard deck of 52 cards, dealt
              into seven tableau columns of seven cards each. The first three
              columns have their top four cards face-up and bottom three
              face-down. The remaining four columns are entirely face-up. The
              last three cards form a reserve that can be dealt later (one to
              each of the first three columns).
            </p>
            <p>
              The goal is to build four complete same-suit sequences from King
              down to Ace, all within the tableau. Unlike Spider, completed
              sequences stay on the board rather than being removed. You win
              when all four suits are arranged in complete King-through-Ace
              runs on the tableau columns.
            </p>
            <p>
              Scorpion&apos;s defining feature is its movement rule: you can
              pick up any face-up card and move it (along with everything
              stacked on top of it) to another column, as long as the
              destination card is the same suit and one rank higher. This means
              you can move messy piles of mixed cards around freely, but the
              cards you&apos;re placing must always land on a same-suit match.
              Empty columns can only be filled by Kings. You can learn the
              full rules in our{" "}
              <Link
                href="/scorpion/how-to-play"
                className="text-[#8B6914] hover:underline"
              >
                Scorpion how-to-play guide
              </Link>
              .
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
            Key Differences Between Spider and Scorpion
          </SectionHeading>

          <ContentBody className="space-y-5">
            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              One Deck vs Two Decks
            </h3>
            <p>
              This is the most obvious difference and it shapes everything
              else. Spider&apos;s 104 cards across ten columns create a large,
              sprawling board with duplicate cards. Having two copies of every
              card means more options but also more confusion. Scorpion&apos;s
              52 cards across seven columns give you a tighter board where
              every card is unique. The smaller game state is easier to hold in
              your head, which means you can plan further ahead once the
              face-down cards are revealed.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Stock Pile vs No Stock
            </h3>
            <p>
              Spider gives you five deals from the stock pile, each sending
              ten new cards across the board. This means new information and new
              problems arrive throughout the game. Knowing when to deal from
              the stock is one of{" "}
              <Link
                href="/spider/tips"
                className="text-[#8B6914] hover:underline"
              >
                Spider&apos;s most important decisions
              </Link>
              . Scorpion has no stock pile. Every card is on the tableau from
              the start (some face-down). The only hidden information is those
              21 face-down cards in the first three columns, and they get
              revealed as you play. This makes Scorpion closer to a pure
              puzzle once you&apos;ve uncovered the layout.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Movement Rules
            </h3>
            <p>
              Spider&apos;s movement is restrictive: you can only move a
              group of cards if they form a descending same-suit sequence.
              A run of 9-8-7 of Hearts moves together, but 9 of Hearts-8 of
              Clubs-7 of Hearts does not. This makes building pure sequences
              critical and punishes mixed-suit stacking.
            </p>
            <p>
              Scorpion is more flexible with movement. You can pick up any
              face-up card along with everything on top of it, no matter what
              those cards are. The restriction comes at the destination: the
              card you&apos;re moving must land on a same-suit card one rank
              higher. This means you can relocate big messy piles to uncover
              face-down cards, even if those piles aren&apos;t in proper order.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              How You Win
            </h3>
            <p>
              In Spider, completed King-to-Ace same-suit runs are removed
              from the board entirely. Clearing all eight runs (two per suit)
              means an empty board and a win. In Scorpion, completed runs stay
              on the tableau. You win when all four suits are assembled into
              King-through-Ace sequences in place. This means Scorpion&apos;s
              board gets more organized as you play, while Spider&apos;s board
              gets emptier.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Empty Columns
            </h3>
            <p>
              Spider lets you fill an empty column with any card. This makes
              empty columns extremely valuable as temporary storage, similar
              to free cells in FreeCell. Scorpion restricts empty columns to
              Kings only. This is a significant constraint that limits your
              ability to reorganize the board. Getting a King into an empty
              column is often the key turning point in a{" "}
              <Link
                href="/scorpion/strategy"
                className="text-[#8B6914] hover:underline"
              >
                Scorpion strategy
              </Link>
              .
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
              Spider&apos;s difficulty varies dramatically by variant.
              One-suit Spider has a solvability rate above 99% and plays
              like a gentle sorting exercise. Two-suit Spider drops to
              roughly 85-90% solvable. Four-suit Spider is brutally hard at
              around 35-40% solvable, and skilled players typically win about
              35% of their games.
            </p>
            <p>
              Scorpion sits at roughly 55% solvable with optimal play,
              though practical win rates for experienced players are closer to
              45-50%. The face-down cards create information gaps that can
              doom a deal without warning. You might play perfectly with the
              visible cards only to discover that the face-down cards create
              an impossible blockage.
            </p>

            <div className="card-inset rounded-lg p-5 mt-2">
              <h3
                className="font-medium text-[#2a2522] text-lg mb-3"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Win Rates by Skill Level
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Spider (4-Suit)
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    33%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    average player
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Scorpion
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    45%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    average player
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-3">
                    Spider (1-Suit)
                  </div>
                  <div
                    className="text-3xl font-bold text-[#8B6914]"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                    }}
                  >
                    95%
                  </div>
                  <div className="text-sm text-[#6B7280] mt-1">
                    average player
                  </div>
                </div>
              </div>
            </div>

            <p>
              The fairest comparison is four-suit Spider vs Scorpion, since
              both involve same-suit building with significant hidden
              information. Scorpion is moderately easier to win but offers
              less control over the flow of new cards since there&apos;s no
              stock pile. Spider gives you more agency through stock-deal
              timing but punishes you with a lower overall win rate.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Strategy Comparison ── */}
        <CardSection id="strategy">
          <SectionHeading
            sub="How Strategy Differs"
            id="strategy-heading"
            icon={"\u2663"}
          >
            Strategy: What Transfers and What Doesn&apos;t
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Both games reward patient play and thinking ahead. If you&apos;re
              good at one, many of your instincts carry over to the other. But
              each game has strategic priorities that don&apos;t translate
              directly.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Uncovering face-down cards</strong> is critical in both
                games. Every hidden card is a potential blocker, and flipping
                them reveals the information you need to plan ahead.
              </li>
              <li>
                <strong>Empty columns are gold</strong> in Spider because any
                card can fill them. In Scorpion, empty columns are still
                valuable but restricted to Kings, so they&apos;re harder to
                use flexibly.
              </li>
              <li>
                <strong>Suit purity matters</strong> in both games for
                different reasons. Spider penalizes mixed-suit sequences by
                making them immovable as a group. Scorpion forces same-suit
                placement at the destination, so you physically can&apos;t
                build mixed runs.
              </li>
            </ul>
            <p>
              <strong>Spider-specific tactics:</strong> Managing stock deals
              is a skill with no Scorpion equivalent. Strong{" "}
              <Link
                href="/spider/how-to-empty-a-column"
                className="text-[#8B6914] hover:underline"
              >
                Spider players try to empty at least one column
              </Link>{" "}
              before each stock deal to maximize flexibility when ten new
              cards arrive. Avoiding unnecessary mixed-suit stacking is
              also more important in Spider, since it directly limits your
              ability to move groups of cards.
            </p>
            <p>
              <strong>Scorpion-specific tactics:</strong> Since you can move
              any face-up card with its pile, the strategy centers on
              uncovering face-down cards as fast as possible and getting Kings
              into empty columns.{" "}
              <Link
                href="/scorpion/tips"
                className="text-[#8B6914] hover:underline"
              >
                Scorpion tips
              </Link>{" "}
              focus heavily on reading the board for dead-end positions, since
              there&apos;s no stock pile to bail you out. Every card you have
              is already in play, so recognizing an unsolvable deal early saves
              time.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Key Takeaways ── */}
        <CardSection id="key-takeaways">
          <SectionHeading
            sub="The Bottom Line"
            id="key-takeaways-heading"
            icon={"\u2665"}
          >
            Key Takeaways
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Spider is a two-deck game with a stock pile and scalable
                difficulty (1-suit to 4-suit). Scorpion is a one-deck game
                with no stock and a fixed difficulty level.
              </li>
              <li>
                Both games require building same-suit King-to-Ace runs, but
                Spider removes completed runs while Scorpion keeps them on
                the tableau.
              </li>
              <li>
                Scorpion&apos;s flexible movement rule (move any card with its
                pile) offsets its lack of a stock pile and Kings-only empty
                column restriction.
              </li>
              <li>
                Four-suit Spider (~35-40% win rate) is harder than Scorpion
                (~45-55%), but one-suit Spider (~99%) is much easier.
              </li>
              <li>
                Scorpion games are faster (5-12 minutes vs 10-20 for Spider),
                making it a better fit for shorter play sessions.
              </li>
              <li>
                Beginners should start with one-suit Spider, then try Scorpion
                once they understand same-suit building concepts.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Which Should You Play? ── */}
        <CardSection id="which-to-play">
          <SectionHeading
            sub="Choose Your Challenge"
            id="which-to-play-heading"
            icon={"\u2666"}
          >
            Which Should You Play?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              <strong>Play Spider Solitaire if:</strong> You want a game with
              adjustable difficulty that can be as relaxing or as punishing as
              you choose. One-suit Spider is perfect for winding down.
              Four-suit Spider is a serious strategic challenge that will test
              your adaptability. The stock pile adds a layer of surprise that
              keeps each game unpredictable, and the satisfaction of clearing
              a complete 13-card suit run from the board is hard to beat. Try
              it at our{" "}
              <Link
                href="/spider"
                className="text-[#8B6914] hover:underline"
              >
                Spider Solitaire page
              </Link>
              .
            </p>
            <p>
              <strong>Play Scorpion Solitaire if:</strong> You want a
              concentrated, single-deck challenge where every card is in play
              from the start. Scorpion rewards careful board reading and
              the ability to plan sequences through face-down obstacles.
              Games are shorter and more intense than Spider. The flexible
              movement rules make each turn feel impactful, and the
              Kings-only empty column restriction forces creative thinking.
              Give it a try on our{" "}
              <Link
                href="/scorpion"
                className="text-[#8B6914] hover:underline"
              >
                Scorpion Solitaire page
              </Link>
              .
            </p>
            <p>
              Many solitaire fans play both. Spider for longer sessions when
              you want the variety of stock deals and scalable difficulty.
              Scorpion for a quick, focused game where you&apos;re working
              with a known card set. They share the same DNA of same-suit
              sequence building but deliver it through very different
              mechanics. If you enjoy one, you&apos;ll almost certainly enjoy
              the other.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

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
                  href: "/spider",
                  title: "Play Spider Solitaire",
                  desc: "Try Spider free in your browser.",
                },
                {
                  href: "/scorpion",
                  title: "Play Scorpion Solitaire",
                  desc: "Try Scorpion free in your browser.",
                },
                {
                  href: "/spider/how-to-play",
                  title: "Spider Solitaire Rules",
                  desc: "Complete rules and setup guide.",
                },
                {
                  href: "/scorpion/how-to-play",
                  title: "Scorpion Solitaire Rules",
                  desc: "How to play Scorpion step by step.",
                },
                {
                  href: "/spider/strategy",
                  title: "Spider Strategy Guide",
                  desc: "Advanced techniques for higher win rates.",
                },
                {
                  href: "/scorpion/strategy",
                  title: "Scorpion Strategy Guide",
                  desc: "Winning tactics for Scorpion Solitaire.",
                },
                {
                  href: "/scorpion/tips",
                  title: "Scorpion Tips",
                  desc: "Quick advice for better Scorpion play.",
                },
                {
                  href: "/spider/tips",
                  title: "Spider Tips",
                  desc: "Quick advice for better Spider play.",
                },
                {
                  href: "/solitaire-types",
                  title: "All Solitaire Types",
                  desc: "Browse every solitaire variant we cover.",
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
          body="No downloads, no sign-ups. Spider and Scorpion Solitaire are both available on PlayFreeCellOnline.com with full features."
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Play Scorpion Solitaire"
          secondaryHref="/scorpion"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
