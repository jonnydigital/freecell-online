import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { siteCopy } from "@/lib/siteCopy";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "Klondike vs Spider Solitaire | Which Classic Solitaire Is Right for You?",
  description:
    "Klondike vs Spider Solitaire compared head to head \u2014 rules, difficulty, win rates, strategy depth, variants, and which classic solitaire game fits your play style.",
  keywords: [
    "klondike vs spider solitaire",
    "spider vs klondike",
    "klondike or spider",
    "which solitaire is harder",
    "spider solitaire vs klondike",
    "difference between klondike and spider",
    "klondike solitaire compared to spider",
    "best solitaire game",
    "spider or klondike which is better",
    "solitaire games compared",
    "klondike difficulty vs spider",
    "spider solitaire win rate",
  ],
  openGraph: {
    title:
      "Klondike vs Spider Solitaire | Which Classic Solitaire Is Right for You?",
    description:
      "A head-to-head comparison of Klondike and Spider Solitaire \u2014 rules, strategy, difficulty, win rates, and which game fits your style.",
    url: absoluteUrl("/spider/klondike-vs-spider"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: canonicalUrlFor("/spider/klondike-vs-spider"),
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "Is Spider Solitaire harder than Klondike?",
    answer:
      "It depends on the variant. One-suit Spider is considerably easier than Klondike, with win rates around 60\u201370% for skilled players. Two-suit Spider is roughly comparable to Klondike in difficulty. Four-suit Spider is significantly harder than Klondike, with expert win rates around 25\u201335% versus Klondike\u2019s 30\u201345% (draw-one). The key difference is that Spider\u2019s difficulty is adjustable through suit count, while Klondike\u2019s difficulty is fixed (though draw-one is easier than draw-three).",
  },
  {
    question: "Which solitaire game is more popular \u2014 Klondike or Spider?",
    answer:
      "Klondike is by far the most popular solitaire game worldwide. It\u2019s the game most people simply call \u201CSolitaire\u201D and was bundled with Windows 3.0 in 1990. Spider Solitaire was added to Windows 98 Plus! and gained a large following, making it the second most popular solitaire variant. Both games have hundreds of millions of players, but Klondike\u2019s name recognition and installed base give it the edge in raw popularity.",
  },
  {
    question: "What is the main rule difference between Klondike and Spider?",
    answer:
      "The fundamental difference is the goal. In Klondike, you build four foundation piles from Ace to King by suit, moving cards there throughout the game. In Spider, there are no foundation piles during play \u2014 instead, you build complete King-to-Ace same-suit sequences on the tableau, which are then automatically removed. Klondike uses alternating-color building, while Spider uses same-suit building (in 2 and 4-suit variants). Klondike has 7 columns with a stock pile; Spider has 10 columns with a stock that deals to all columns at once.",
  },
  {
    question: "Which game takes longer to play \u2014 Klondike or Spider?",
    answer:
      "Spider Solitaire typically takes longer. A typical Klondike game lasts 5\u201315 minutes, while a Spider game often takes 10\u201325 minutes. Spider\u2019s 10-column layout, 104-card double deck, and same-suit building requirement create more complex positions that demand more thought per move. Four-suit Spider games can easily stretch past 20 minutes as you carefully manage four interleaved suits across a wide tableau.",
  },
  {
    question: "Can I play both Klondike and Spider on this site?",
    answer: `${siteCopy.crossGameAvailability} All games are free to play in your browser with no download required. Each game includes features like undo, auto-complete, statistics tracking, and daily challenges.`,
  },
  {
    question: "Which solitaire game has more luck \u2014 Klondike or Spider?",
    answer:
      "Klondike has more luck than Spider. In Klondike, roughly half the tableau cards start face-down, and the stock pile order is random \u2014 you can\u2019t see most of your cards before committing to moves. In Spider, while cards also start face-down, the 10-column layout gives you more information and more options to work with. Spider\u2019s difficulty comes more from strategic complexity than from hidden information. However, Spider\u2019s stock pile deals (adding a card to every column at once) introduce a significant luck element.",
  },
];

/* ── Comparison data ── */

const comparisonRows = [
  { label: "Decks", klondike: "1 (52 cards)", spider: "2 (104 cards)" },
  {
    label: "Tableau columns",
    klondike: "7",
    spider: "10",
  },
  {
    label: "Cards visible at start",
    klondike: "7 of 52 (~13%)",
    spider: "10 of 104 (~10%)",
  },
  {
    label: "Stock pile",
    klondike: "24 cards, draw 1 or 3",
    spider: "50 cards, deal 1 to each column",
  },
  {
    label: "Foundation piles",
    klondike: "4 (build A\u2013K during play)",
    spider: "None (complete suits auto-remove)",
  },
  {
    label: "Tableau build rule",
    klondike: "Alternating color, descending",
    spider: "Any suit descending (same-suit to move groups)",
  },
  {
    label: "Goal",
    klondike: "Move all cards to foundations",
    spider: "Build 8 complete K\u2013A same-suit runs",
  },
  {
    label: "Suit variants",
    klondike: "None (always 4 suits)",
    spider: "1-suit, 2-suit, 4-suit",
  },
  {
    label: "Luck factor",
    klondike: "High (hidden cards + draw order)",
    spider: "Medium (hidden cards + stock deals)",
  },
  {
    label: "Win rate (skilled player)",
    klondike: "~30\u201345% (draw-1)",
    spider: "~25\u201335% (4-suit) / ~60\u201370% (1-suit)",
  },
  {
    label: "Average game length",
    klondike: "5\u201315 minutes",
    spider: "10\u201325 minutes",
  },
  {
    label: "Difficulty",
    klondike: "Easy to learn, moderate to master",
    spider: "Adjustable (1-suit easy \u2192 4-suit hard)",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function KlondikeVsSpiderPage() {
  if (!isOwnedBy("/spider/klondike-vs-spider", siteConfig.key)) {
    notFound();
  }

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Klondike vs Spider Solitaire: Which Classic Game Is Right for You?",
      description:
        "A detailed head-to-head comparison of Klondike and Spider Solitaire \u2014 rules, strategy, difficulty, win rates, and which classic solitaire suits different players.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/spider/klondike-vs-spider"),
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
          name: "Spider Solitaire",
          item: absoluteUrl("/spider"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Klondike vs Spider",
          item: absoluteUrl("/spider/klondike-vs-spider"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Klondike vs Spider Solitaire"
        subtitle={
          <>
            The two most-played solitaire games in the world, compared side by
            side. One is the familiar classic everyone calls
            &quot;Solitaire.&quot; The other doubles the deck and the
            challenge. Here&apos;s how they stack up.
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
                      Klondike
                    </th>
                    <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Spider
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
                        {row.spider}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── How Klondike Works ── */}
        <CardSection id="klondike">
          <SectionHeading
            sub="The Classic"
            id="klondike-heading"
            icon={"\u2663"}
          >
            How Klondike Works
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Klondike is the game most of the world simply calls
              &quot;Solitaire.&quot; A single deck of 52 cards is dealt into
              7 tableau columns in a cascading pattern: one card in the first
              column, two in the second, and so on. Only the top card of each
              column is face-up. The remaining 24 cards form a stock pile that
              you draw from during play.
            </p>
            <p>
              You build tableau columns in alternating colors and descending
              rank (black 7 on red 8). The goal is to move all cards to four
              foundation piles, building each suit from Ace to King. The
              simplicity of the rules &mdash; and the satisfying feeling of
              revealing hidden cards &mdash; is what made Klondike the
              default solitaire game on every platform from Windows 3.0 to
              modern smartphones.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── How Spider Works ── */}
        <CardSection id="spider">
          <SectionHeading
            sub="The Double-Deck Challenge"
            id="spider-heading"
            icon={"\u2665"}
          >
            How Spider Solitaire Works
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Spider Solitaire uses two full decks (104 cards) dealt into 10
              tableau columns. The first 4 columns get 6 cards each, and the
              remaining 6 columns get 5 cards each. Only the top card of each
              column starts face-up. The remaining 50 cards sit in a stock
              pile.
            </p>
            <p>
              Unlike Klondike, there are no foundation piles during play.
              Instead, your goal is to build complete same-suit sequences from
              King down to Ace directly on the tableau. When you complete a
              full 13-card same-suit run, it&apos;s automatically removed
              from the board. You win by removing all 8 complete suits.
            </p>
            <p>
              Spider&apos;s stock pile works differently too: instead of
              drawing one card at a time, each deal places one new card on
              <em> every</em> column simultaneously &mdash; 10 cards at once.
              This can break up carefully built sequences and forces you to
              plan around incoming disruptions.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Difficulty Spectrum ── */}
        <CardSection id="difficulty">
          <SectionHeading
            sub="Adjustable Challenge"
            id="difficulty-heading"
            icon={"\u2666"}
          >
            The Difficulty Spectrum
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              One of Spider&apos;s unique advantages is adjustable difficulty.
              While Klondike&apos;s difficulty is essentially fixed (with the
              minor variation of draw-one vs. draw-three), Spider offers three
              distinct difficulty levels:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>1-Suit Spider:</strong> All 104 cards are the same
                suit (usually Spades). Building sequences is trivial since
                every card matches. Win rate: ~60&ndash;70%. Perfect for
                beginners or relaxed play.
              </li>
              <li>
                <strong>2-Suit Spider:</strong> Two suits are used (typically
                Spades and Hearts). You must manage two interleaved suits,
                making sequence-building harder. Win rate: ~35&ndash;45%.
                Comparable to Klondike difficulty.
              </li>
              <li>
                <strong>4-Suit Spider:</strong> All four suits, full
                complexity. Building same-suit runs requires precise planning
                and free-column management. Win rate: ~25&ndash;35%. Harder
                than standard Klondike.
              </li>
            </ul>
            <p>
              Klondike&apos;s difficulty variation is more limited. Draw-one
              Klondike (cycling through the stock one card at a time) gives
              players a win rate around 30&ndash;45%, while draw-three
              (three cards at a time, only the top one playable) drops it to
              roughly 20&ndash;30%.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Strategy Differences ── */}
        <CardSection id="strategy">
          <SectionHeading
            sub="Different Thinking"
            id="strategy-heading"
            icon={"\u2660"}
          >
            How Strategy Differs
          </SectionHeading>

          <ContentBody className="space-y-5">
            <h3 className="font-semibold text-[#2a2522] text-base">
              Klondike Strategy
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Reveal hidden cards first.</strong> Prioritize moves
                that flip face-down cards, especially in longer columns.
              </li>
              <li>
                <strong>Don&apos;t rush to foundation.</strong> Sometimes
                keeping low cards on the tableau gives you more building
                flexibility.
              </li>
              <li>
                <strong>Kings matter.</strong> Only Kings can fill empty
                columns. Moving a King to an empty column commits that column
                to a specific color sequence.
              </li>
              <li>
                <strong>Stock pile management.</strong> In draw-three, cycle
                through the stock strategically to access buried cards.
              </li>
            </ul>

            <h3 className="font-semibold text-[#2a2522] text-base">
              Spider Strategy
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Empty columns are king.</strong> An empty column is
                Spider&apos;s most powerful tool. Use them to temporarily park
                cards while building same-suit sequences.
              </li>
              <li>
                <strong>Same-suit over any-suit.</strong> You <em>can</em>{" "}
                build using any suit, but only same-suit runs can be moved as
                a group. Mixed-suit stacks become deadweight.
              </li>
              <li>
                <strong>Plan for stock deals.</strong> Before dealing from the
                stock, empty as many columns as possible &mdash; every column
                must have at least one card to deal.
              </li>
              <li>
                <strong>Prioritize completing suits.</strong> Each completed
                suit removes 13 cards, dramatically simplifying the board.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Who Should Play Which ── */}
        <CardSection id="who-should-play">
          <SectionHeading
            sub="Choose Your Game"
            id="who-should-play-heading"
            icon={"\u2665"}
          >
            Which Game Is Right for You?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              <strong>Play Klondike if:</strong> You want a quick, familiar
              game with simple rules. Klondike is perfect for 5&ndash;10
              minute breaks, casual play, or when you want the comfort of the
              world&apos;s most recognizable card game. The mix of luck and
              skill means every deal feels different, and the face-down card
              reveals create satisfying moments of discovery.
            </p>
            <p>
              <strong>Play Spider if:</strong> You want a longer, more
              strategic challenge with adjustable difficulty. Spider rewards
              patient planning and column management. One-suit mode is great
              for relaxed play, two-suit provides a balanced challenge, and
              four-suit will test even experienced solitaire players. If you
              like the satisfaction of building long sequences and clearing
              the board, Spider is deeply rewarding.
            </p>
            <p>
              <strong>Play both!</strong> Many solitaire players keep both in
              their rotation. Klondike for quick sessions, Spider when
              they have more time and want a deeper challenge. They exercise
              different strategic muscles and complement each other perfectly.
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
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Play Links ── */}
        <CardSection id="play">
          <SectionHeading sub="Try Both Games" id="play-heading" icon={"\ud83c\udccf"}>
            Play Now
          </SectionHeading>

          <ContentBody className="space-y-4">
            <p>
              Play Klondike, Spider, and many more solitaire games right here
              &mdash; completely free, no download required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/klondike"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8860B] text-white rounded-lg font-medium hover:bg-[#9A7209] transition-colors"
              >
                Play Klondike
              </Link>
              <Link
                href="/spider"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a2522] text-white rounded-lg font-medium hover:bg-[#3a3532] transition-colors"
              >
                Play Spider
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Explore More" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/klondike/how-to-play" className="text-[#B8860B] hover:underline text-sm">
                  How to Play Klondike &rarr;
                </Link>
              </li>
              <li>
                <Link href="/klondike/strategy" className="text-[#B8860B] hover:underline text-sm">
                  Klondike Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/spider/how-to-play" className="text-[#B8860B] hover:underline text-sm">
                  How to Play Spider &rarr;
                </Link>
              </li>
              <li>
                <Link href="/spider/strategy" className="text-[#B8860B] hover:underline text-sm">
                  Spider Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/spider/1-suit-vs-2-suit-vs-4-suit" className="text-[#B8860B] hover:underline text-sm">
                  Spider: 1 vs 2 vs 4 Suit &rarr;
                </Link>
              </li>
              <li>
                <Link href="/klondike/draw-1-vs-draw-3" className="text-[#B8860B] hover:underline text-sm">
                  Klondike: Draw 1 vs Draw 3 &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-spider" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Spider &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solitaire-difficulty-ranking" className="text-[#B8860B] hover:underline text-sm">
                  Solitaire Difficulty Rankings &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Ready to Play?"
          body="Try both Klondike and Spider Solitaire \u2014 free, online, no download required."
          primaryLabel="Play Klondike Now"
          primaryHref="/klondike"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
