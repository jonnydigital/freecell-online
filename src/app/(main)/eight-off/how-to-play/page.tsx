import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Eight Off Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Eight Off Solitaire with our complete guide. 8 free cells, same-suit stacking, King-only empty fills, and strategies for this FreeCell variant.",
  keywords: [
    "how to play eight off",
    "eight off solitaire rules",
    "eight off solitaire",
    "eight off solitaire guide",
    "eight off instructions",
    "eight off setup",
    "eight off for beginners",
    "eight off tutorial",
    "eight off vs freecell",
    "eight off strategy",
    "eight off card game rules",
  ],
  openGraph: {
    title: "How to Play Eight Off Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Eight Off Solitaire — 8 free cells with same-suit stacking. Complete rules, setup, and strategy guide.",
    url: absoluteUrl("/eight-off/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/eight-off/how-to-play"),
  },
};

const faqs = [
  {
    question: "What is the difference between Eight Off and FreeCell?",
    answer:
      "Eight Off has 8 free cells instead of 4, uses same-suit stacking on cascades instead of alternating colors, deals 6 cards per cascade instead of 6-7, and only allows Kings to fill empty cascades. FreeCell uses alternating-color stacking and allows any card to fill empty cascades.",
  },
  {
    question: "What percentage of Eight Off games are winnable?",
    answer:
      "Approximately 90-95% of Eight Off deals are solvable with perfect play. The 8 free cells provide substantial flexibility, but the same-suit stacking and King-only empty fills make it harder than FreeCell (99.99%) and easier than Baker's Game (75%).",
  },
  {
    question: "Why does Eight Off have 8 free cells?",
    answer:
      "The 8 free cells compensate for the game's same-suit stacking rule, which is much more restrictive than FreeCell's alternating-color stacking. Without extra free cells, the same-suit constraint would make far too many deals unsolvable. The extra storage space keeps the game challenging but fair.",
  },
  {
    question: "Can only Kings fill empty cascades in Eight Off?",
    answer:
      "Yes. In Eight Off, only a King (or a valid same-suit sequence starting with a King) can be placed in an empty cascade. This is a key strategic constraint — you cannot use empty cascades as flexible temporary storage like you can in FreeCell or Baker's Game.",
  },
  {
    question: "How is the deal different in Eight Off?",
    answer:
      "Eight Off deals 48 cards into 8 cascades of 6 cards each (all face-up). The remaining 4 cards are dealt one each to the first 4 free cells. This means you start with 4 of your 8 free cells already occupied, giving you only 4 empty free cells at the beginning.",
  },
  {
    question: "How many cards can you move at once in Eight Off?",
    answer:
      "You can move a same-suit sequence as a group. The maximum number of cards you can move depends on empty free cells and empty cascades (that you can fill with Kings). The formula is (1 + empty free cells) × 2^(empty cascades with available Kings). In practice, the King-only restriction on empty cascades limits supermove potential.",
  },
  {
    question: "Is Eight Off harder than FreeCell?",
    answer:
      "Yes, Eight Off is harder than standard FreeCell despite having more free cells. The same-suit stacking rule and King-only empty cascade restriction add significant strategic complexity. However, it is easier than Baker's Game, which has only 4 free cells with same-suit stacking.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Eight Off Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Eight Off Solitaire with our complete guide covering setup, same-suit stacking rules, King-only cascade fills, and winning strategies.",
    url: absoluteUrl("/eight-off/how-to-play"),
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
        name: "Eight Off",
        item: absoluteUrl("/eight-off"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Play",
        item: absoluteUrl("/eight-off/how-to-play"),
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
          title="How to Play Eight Off Solitaire"
          subtitle="Complete rules, setup guide, and winning strategies for this generous-but-strategic FreeCell variant with 8 free cells."
        />

        <ContentBody>
          <SectionHeading>Overview</SectionHeading>
          <p>
            Eight Off is a solitaire card game that sits between{" "}
            <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>{" "}
            and{" "}
            <Link href="/bakers-game/how-to-play" className="text-[#D4AF37] hover:underline">
              Baker&rsquo;s Game
            </Link>{" "}
            in difficulty. Like Baker&rsquo;s Game, it uses <strong>same-suit stacking</strong> on
            the tableau. But Eight Off compensates with <strong>8 free cells</strong> instead of 4,
            giving you double the temporary storage to work with.
          </p>
          <p>
            The trade-off is that only <strong>Kings can fill empty cascades</strong>, removing a key
            source of flexibility found in FreeCell and Baker&rsquo;s Game. This combination of
            generous storage and restrictive placement rules creates a uniquely strategic game that
            rewards careful planning.
          </p>

          <AdUnit slot="content-mid" className="my-8" />

          <SectionHeading>Setup</SectionHeading>
          <p>Eight Off uses a standard 52-card deck dealt as follows:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Cascades:</strong> 8 columns of 6 face-up cards each, for a total of 48 cards
              on the tableau. All cards are visible from the start.
            </li>
            <li>
              <strong>Free cells:</strong> 8 reserve spaces above the cascades. The remaining 4
              cards from the deck are dealt one each to the first 4 free cells, leaving 4 free cells
              empty at the start.
            </li>
            <li>
              <strong>Foundations:</strong> 4 empty piles that build up by suit from Ace to King.
            </li>
          </ol>
          <p>
            Unlike FreeCell&rsquo;s uneven deal (four columns of 7, four of 6), Eight Off deals
            evenly — 6 cards per cascade. The 4 leftover cards go directly to free cells, so you
            begin the game with half your reserve storage already occupied.
          </p>

          <SectionHeading>Foundation Rules</SectionHeading>
          <p>
            There are four foundation piles, one for each suit. Each builds{" "}
            <strong>up by suit from Ace to King</strong>:
          </p>
          <p>
            A&spades; &rarr; 2&spades; &rarr; 3&spades; &rarr; ... &rarr; Q&spades; &rarr; K&spades;
          </p>
          <p>
            You win when all 52 cards have been moved to the foundations. Cards placed on foundations
            are permanent.
          </p>

          <SectionHeading>Cascade Rules (Same-Suit Stacking)</SectionHeading>
          <p>
            Like Baker&rsquo;s Game, Eight Off uses <strong>same-suit descending order</strong> on
            the cascades. You can only place a card on top of another card that is one rank higher
            and the <strong>same suit</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The 7&diams; can only go on the 8&diams;</li>
            <li>The J&hearts; can only go on the Q&hearts;</li>
            <li>A 5&clubs; cannot go on a 6&spades; — they must share the same suit</li>
          </ul>
          <p>
            You can move a <strong>valid same-suit sequence</strong> as a group, provided you have
            enough empty free cells (and accessible empty cascades with Kings available) to support
            the move.
          </p>

          <SectionHeading>Empty Cascade Rule (Kings Only)</SectionHeading>
          <p>
            This is Eight Off&rsquo;s most distinctive rule:{" "}
            <strong>only a King</strong> (or a valid same-suit sequence starting with a King) can be
            placed in an empty cascade.
          </p>
          <p>
            This means empty cascades are not the flexible all-purpose storage they are in FreeCell.
            You cannot park any card in an empty column — you need a King available to use that space.
            This restriction makes creating and using empty cascades a much more strategic decision.
          </p>

          <AdUnit slot="content-mid-2" className="my-8" />

          <SectionHeading>Free Cell Rules</SectionHeading>
          <p>
            Eight Off provides <strong>8 free cells</strong> — double what FreeCell and Baker&rsquo;s
            Game offer. Each can hold exactly one card. You start with 4 of these already occupied by
            the extra dealt cards, giving you 4 empty free cells initially.
          </p>
          <p>
            The extra free cells compensate for the restrictive same-suit stacking and King-only
            cascade rules. Managing your free cells well — knowing when to use them and when to
            preserve them — is the central skill of Eight Off.
          </p>

          <SectionHeading>Strategy Tips</SectionHeading>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Free the 4 starting free-cell cards early.</strong> You begin with only 4
              empty free cells. Getting the 4 pre-dealt cards onto cascades or foundations restores
              your full 8-cell capacity, which dramatically increases your flexibility.
            </li>
            <li>
              <strong>Manage Kings carefully.</strong> Kings are the only cards that can fill empty
              cascades. Know where your Kings are and plan to free them before creating empty columns.
              A King buried deep in a cascade may need several preparatory moves to access.
            </li>
            <li>
              <strong>Build same-suit sequences aggressively.</strong> Long same-suit runs are
              powerful — they reduce clutter and can eventually be transferred to foundations in
              order. Prioritize moves that extend existing same-suit sequences.
            </li>
            <li>
              <strong>Don&rsquo;t waste empty cascades.</strong> An empty cascade is only useful if
              you have a King to fill it (or plan to create one temporarily as part of a sequence of
              moves). Avoid emptying cascades without a plan for the space.
            </li>
            <li>
              <strong>Uncover Aces and 2s as a priority.</strong> Getting low cards to foundations
              early creates permanent space. Scan all 8 cascades at the start and plan your path to
              buried Aces.
            </li>
            <li>
              <strong>Use free cells for suit consolidation.</strong> With 8 free cells, you can
              temporarily store multiple cards to rearrange cascades into same-suit order. Plan these
              multi-step rearrangements before committing free cells.
            </li>
            <li>
              <strong>Keep at least 2-3 free cells open.</strong> Even with 8 free cells, filling
              too many leaves you unable to make complex moves. Maintain a buffer of empty cells for
              unexpected opportunities.
            </li>
          </ol>

          <AdUnit slot="content-bottom" className="my-8" />

          <SectionHeading>Eight Off vs FreeCell vs Baker&rsquo;s Game</SectionHeading>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 text-[#D4AF37]">Feature</th>
                  <th className="text-left py-2 pr-4 text-[#D4AF37]">Eight Off</th>
                  <th className="text-left py-2 pr-4 text-[#D4AF37]">FreeCell</th>
                  <th className="text-left py-2 text-[#D4AF37]">Baker&rsquo;s Game</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Free cells</td>
                  <td className="py-2 pr-4">8</td>
                  <td className="py-2 pr-4">4</td>
                  <td className="py-2">4</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Cascade stacking</td>
                  <td className="py-2 pr-4">Same suit</td>
                  <td className="py-2 pr-4">Alternating color</td>
                  <td className="py-2">Same suit</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Cards per cascade</td>
                  <td className="py-2 pr-4">6</td>
                  <td className="py-2 pr-4">6 or 7</td>
                  <td className="py-2">6 or 7</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Empty cascade fill</td>
                  <td className="py-2 pr-4">Kings only</td>
                  <td className="py-2 pr-4">Any card</td>
                  <td className="py-2">Any card</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4 font-medium">Win rate</td>
                  <td className="py-2 pr-4">~90-95%</td>
                  <td className="py-2 pr-4">~99.99%</td>
                  <td className="py-2">~75%</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Difficulty</td>
                  <td className="py-2 pr-4">Hard</td>
                  <td className="py-2 pr-4">Moderate</td>
                  <td className="py-2">Very hard</td>
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
            href="/eight-off"
            title="Play Eight Off"
            description="Put these rules into practice — play Eight Off online for free."
          />
          <ContentLinkCard
            href="/eight-off/strategy"
            title="Eight Off Strategy"
            description="Advanced strategies and techniques for winning more Eight Off deals."
          />
          <ContentLinkCard
            href="/bakers-game/how-to-play"
            title="How to Play Baker's Game"
            description="Same-suit stacking with only 4 free cells — the hardest FreeCell variant."
          />
          <ContentLinkCard
            href="/freecell-variants"
            title="All FreeCell Variants"
            description="Explore every FreeCell variant and find your perfect challenge level."
          />
        </CardSection>

        <CtaSection
          heading="Ready to Play?"
          body="Try Eight Off now — free, no download, works on any device."
          primaryHref="/eight-off"
          primaryLabel="Play Eight Off"
        />
      </ContentLayout>
    </>
  );
}
