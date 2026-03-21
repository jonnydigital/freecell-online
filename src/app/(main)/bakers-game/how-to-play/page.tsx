import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Baker's Game | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Baker's Game with our complete guide. Same-suit stacking rules, 4 free cells, foundation building, and strategies for this challenging FreeCell variant.",
  keywords: [
    "how to play baker's game",
    "baker's game rules",
    "baker's game solitaire",
    "baker's game guide",
    "baker's game instructions",
    "baker's game setup",
    "baker's game for beginners",
    "baker's game tutorial",
    "baker's game vs freecell",
    "baker's game strategy",
    "baker's game solitaire rules",
  ],
  openGraph: {
    title: "How to Play Baker's Game | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Baker's Game — the same-suit stacking predecessor to FreeCell. Complete rules, setup, and strategy guide.",
    url: absoluteUrl("/bakers-game/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/bakers-game/how-to-play"),
  },
};

const faqs = [
  {
    question: "What is the difference between Baker's Game and FreeCell?",
    answer:
      "The only rule difference is how you build on the tableau. In FreeCell, you build down in alternating colors (red on black, black on red). In Baker's Game, you must build down by the same suit — for example, only the 9 of hearts can go on the 10 of hearts. This single change makes the game dramatically harder.",
  },
  {
    question: "What percentage of Baker's Game deals are winnable?",
    answer:
      "Approximately 75% of Baker's Game deals are solvable with perfect play, compared to FreeCell's 99.99%. The same-suit stacking constraint means many deals are simply impossible to solve regardless of skill.",
  },
  {
    question: "How many free cells does Baker's Game have?",
    answer:
      "Baker's Game has 4 free cells, the same as standard FreeCell. Each free cell can hold one card temporarily. Keeping free cells open is even more critical in Baker's Game because the same-suit constraint severely limits your ability to rearrange cards on the tableau.",
  },
  {
    question: "Can any card fill an empty cascade in Baker's Game?",
    answer:
      "Yes. Unlike some solitaire variants that restrict empty columns to Kings only, Baker's Game allows any card or valid same-suit sequence to be placed in an empty cascade. Empty cascades are extremely valuable and should be used strategically.",
  },
  {
    question: "Is Baker's Game the original version of FreeCell?",
    answer:
      "Baker's Game was invented by C.L. Baker in the 1960s and is considered the direct predecessor to FreeCell. Paul Alfille later modified the rules to use alternating-color stacking instead of same-suit stacking, creating FreeCell as we know it today. The change made the game far more accessible.",
  },
  {
    question: "How do you move multiple cards in Baker's Game?",
    answer:
      "You can move a sequence of cards that are built down by the same suit as a group. The number of cards you can move at once depends on the number of empty free cells and empty cascades available — the formula is (1 + empty free cells) × 2^(empty cascades). For example, with 2 empty free cells and 1 empty cascade, you can move up to 6 cards.",
  },
  {
    question: "What is the best strategy for Baker's Game?",
    answer:
      "The most important strategy is to keep free cells and cascades open as long as possible. Focus on building same-suit sequences, prioritize uncovering Aces and low cards, and avoid mixing suits on the tableau. Plan several moves ahead because the same-suit constraint means you have far fewer valid moves than in FreeCell.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Baker's Game — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Baker's Game with our complete guide covering setup, same-suit stacking rules, foundation building, and winning strategies.",
    url: absoluteUrl("/bakers-game/how-to-play"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.brandName,
      url: absoluteUrl("/"),
    },
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
        name: "How to Play",
        item: absoluteUrl("/bakers-game/how-to-play"),
      },
    ],
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

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <ContentLayout>
        <ContentHero
          title="How to Play Baker's Game"
          subtitle="Complete rules, setup guide, and winning strategies for this same-suit stacking predecessor to FreeCell."
        />

        <ContentBody>
          <SectionHeading>Overview</SectionHeading>
          <p>
            Baker&rsquo;s Game is a challenging solitaire card game invented by C.L. Baker in the
            1960s. It is the direct ancestor of{" "}
            <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>
            , sharing the same layout of 4 free cells, 4 foundations, and 8 cascades. The critical
            difference is that Baker&rsquo;s Game requires <strong>same-suit stacking</strong> on the
            tableau instead of alternating colors.
          </p>
          <p>
            This single rule change transforms the game. Where FreeCell is solvable 99.99% of the
            time, Baker&rsquo;s Game is winnable in only about <strong>75% of deals</strong>. The
            same-suit constraint drastically reduces the number of valid moves at any point, demanding
            careful planning and deep strategic thinking.
          </p>

          <AdUnit slot="content-mid" className="my-8" />

          <SectionHeading>Setup</SectionHeading>
          <p>Baker&rsquo;s Game uses a standard 52-card deck dealt as follows:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Free cells:</strong> 4 empty spaces in the top-left area. Each can hold one
              card temporarily during play.
            </li>
            <li>
              <strong>Foundations:</strong> 4 empty piles in the top-right area. These build up by
              suit from Ace to King.
            </li>
            <li>
              <strong>Cascades:</strong> 8 columns of cards dealt left to right. The first 4 columns
              receive 7 cards each, and the last 4 columns receive 6 cards each. All cards are
              face-up.
            </li>
          </ol>
          <p>
            The layout is identical to FreeCell — every card is visible from the start, making
            Baker&rsquo;s Game a perfect-information game with no hidden cards.
          </p>

          <SectionHeading>Foundation Rules</SectionHeading>
          <p>
            There are four foundation piles, one for each suit. Each foundation builds{" "}
            <strong>up by suit from Ace to King</strong>:
          </p>
          <p>
            A&hearts; &rarr; 2&hearts; &rarr; 3&hearts; &rarr; ... &rarr; Q&hearts; &rarr; K&hearts;
          </p>
          <p>
            You win when all 52 cards have been moved to the foundations. Cards on foundations are
            permanent and cannot be moved back to the tableau or free cells.
          </p>

          <SectionHeading>Cascade Rules (Same-Suit Stacking)</SectionHeading>
          <p>
            This is the defining rule of Baker&rsquo;s Game. On the tableau cascades, you build{" "}
            <strong>down by the same suit only</strong>. For example:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The 9&spades; can only go on the 10&spades; — not on the 10&hearts; or 10&diams;</li>
            <li>The Q&clubs; can only go on the K&clubs;</li>
            <li>A red 5 cannot go on a black 6 unless they share the same suit</li>
          </ul>
          <p>
            You can move a <strong>properly sequenced group</strong> of same-suit cards as a unit,
            provided you have enough empty free cells and cascades to support the move. The maximum
            number of cards you can move equals{" "}
            <strong>(1 + empty free cells) &times; 2^(empty cascades)</strong>.
          </p>
          <p>
            <strong>Empty cascades</strong> can be filled with any card or valid same-suit sequence.
          </p>

          <AdUnit slot="content-mid-2" className="my-8" />

          <SectionHeading>Free Cell Rules</SectionHeading>
          <p>
            The 4 free cells serve as temporary storage. Each can hold exactly{" "}
            <strong>one card</strong> at a time. You can move any top card from a cascade into an
            empty free cell, and you can move a card from a free cell to a valid cascade position or
            to a foundation.
          </p>
          <p>
            Free cells are your most precious resource in Baker&rsquo;s Game. Because same-suit
            stacking limits your tableau moves so severely, free cells are often the only way to
            rearrange cards. Filling all 4 free cells usually leads to a deadlock.
          </p>

          <SectionHeading>Strategy Tips</SectionHeading>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Keep free cells open at all costs.</strong> Every occupied free cell reduces
              your ability to move sequences. In Baker&rsquo;s Game, losing even one free cell can
              be devastating because you have far fewer valid tableau moves.
            </li>
            <li>
              <strong>Build same-suit sequences whenever possible.</strong> Long same-suit runs are
              incredibly valuable — they can be moved as a group and eventually transferred directly
              to foundations. Prioritize extending existing same-suit sequences.
            </li>
            <li>
              <strong>Uncover Aces and low cards early.</strong> Getting Aces and 2s to the
              foundations quickly opens up space. Scan all 8 cascades before your first move and plan
              how to free buried Aces.
            </li>
            <li>
              <strong>Create empty cascades.</strong> Empty cascades double your moving power. An
              empty cascade is worth more than an empty free cell because it can hold a sequence, not
              just a single card.
            </li>
            <li>
              <strong>Plan several moves ahead.</strong> With fewer valid moves than FreeCell, each
              decision carries more weight. Think at least 5-6 moves ahead and consider what cards
              each move will expose.
            </li>
            <li>
              <strong>Don&rsquo;t break same-suit sequences.</strong> Once you have cards in order
              by the same suit, avoid splitting them unless absolutely necessary. Rebuilding a
              same-suit sequence wastes precious moves and free cell space.
            </li>
            <li>
              <strong>Know when a deal is unsolvable.</strong> About 25% of Baker&rsquo;s Game deals
              cannot be won. If you find yourself completely stuck with no productive moves, it may
              be an unsolvable deal rather than a strategic failure.
            </li>
          </ol>

          <AdUnit slot="content-bottom" className="my-8" />

          <SectionHeading>Baker&rsquo;s Game vs FreeCell</SectionHeading>
          <p>
            Understanding the differences helps players transition between the two games:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 text-[#D4AF37]">Feature</th>
                  <th className="text-left py-2 pr-4 text-[#D4AF37]">Baker&rsquo;s Game</th>
                  <th className="text-left py-2 text-[#D4AF37]">FreeCell</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Tableau stacking</td>
                  <td className="py-2 pr-4">Same suit, descending</td>
                  <td className="py-2">Alternating color, descending</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Free cells</td>
                  <td className="py-2 pr-4">4</td>
                  <td className="py-2">4</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Cascades</td>
                  <td className="py-2 pr-4">8</td>
                  <td className="py-2">8</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Win rate</td>
                  <td className="py-2 pr-4">~75%</td>
                  <td className="py-2">~99.99%</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Difficulty</td>
                  <td className="py-2 pr-4">Very hard</td>
                  <td className="py-2">Moderate</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Empty cascade fill</td>
                  <td className="py-2 pr-4">Any card</td>
                  <td className="py-2">Any card</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SectionHeading>Frequently Asked Questions</SectionHeading>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-[#D4AF37] mb-2">
                  {faq.question}
                </h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </ContentBody>

        <CardSection>
          <ContentLinkCard
            href="/bakers-game"
            title="Play Baker's Game"
            description="Put these rules into practice — play Baker's Game online for free."
          />
          <ContentLinkCard
            href="/bakers-game/strategy"
            title="Baker's Game Strategy"
            description="Advanced strategies and techniques for winning more Baker's Game deals."
          />
          <ContentLinkCard
            href="/eight-off/how-to-play"
            title="How to Play Eight Off"
            description="Another same-suit variant with 8 free cells for extra flexibility."
          />
          <ContentLinkCard
            href="/how-to-play"
            title="How to Play FreeCell"
            description="Learn the rules of the alternating-color version that Baker's Game inspired."
          />
        </CardSection>

        <CtaSection
          heading="Ready to Play?"
          body="Try Baker's Game now — free, no download, works on any device."
          primaryHref="/bakers-game"
          primaryLabel="Play Baker's Game"
        />
      </ContentLayout>
    </>
  );
}
