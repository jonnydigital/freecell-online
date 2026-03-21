import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Canfield Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Canfield Solitaire with our complete guide. Rules for the reserve pile, foundation base rank, tableau building, stock draws, and winning strategies.",
  keywords: [
    "how to play canfield solitaire",
    "canfield solitaire rules",
    "canfield solitaire guide",
    "canfield solitaire instructions",
    "canfield solitaire setup",
    "canfield solitaire for beginners",
    "canfield solitaire tutorial",
    "canfield card game rules",
    "demon patience rules",
    "canfield solitaire strategy",
    "canfield vs klondike",
  ],
  openGraph: {
    title: "How to Play Canfield Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Canfield Solitaire. Build foundations from a random base rank in this challenging casino-origin solitaire game.",
    url: absoluteUrl("/canfield/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/canfield/how-to-play"),
  },
};

const faqs = [
  {
    question: "How is Canfield Solitaire set up?",
    answer:
      "Deal 13 cards face-down into a reserve pile with only the top card turned face-up. Deal one card face-up to start the first foundation — its rank becomes the base rank for all foundations. Deal one card face-up to each of four tableau columns. The remaining cards form the stock pile.",
  },
  {
    question: "What is the base rank in Canfield?",
    answer:
      "The base rank is the rank of the first card dealt to the foundation. All four foundations must start from this rank and build up in suit, wrapping around from King to Ace. For example, if the base rank is 9, you build 9-10-J-Q-K-A-2-3-4-5-6-7-8.",
  },
  {
    question: "How does the reserve pile work in Canfield?",
    answer:
      "The reserve starts with 13 cards, only the top one face-up. The top card can be played to any valid foundation or tableau position. When played, the next card is automatically flipped face-up. When a tableau column becomes empty, it is automatically filled from the reserve.",
  },
  {
    question: "How does the stock work in Canfield?",
    answer:
      "Click the stock to deal three cards face-up to the waste pile. Only the top waste card is playable. When the stock is empty, click it again to flip the entire waste pile back into the stock for another pass. Redeals are unlimited.",
  },
  {
    question: "What happens when a tableau column is empty in Canfield?",
    answer:
      "Empty tableau columns are automatically filled from the reserve pile. If the reserve is empty, any card or valid sequence can be moved to an empty column. This auto-fill mechanic is a key strategic element — emptying columns reveals reserve cards.",
  },
  {
    question: "Can you move multiple cards in Canfield?",
    answer:
      "Yes. You can move any properly sequenced group of cards (built down in alternating colors) from one tableau column to another, as long as the bottom card of the group follows the building rule on the destination column.",
  },
  {
    question: "What is the difference between Canfield and Klondike?",
    answer:
      "Canfield has a 13-card reserve pile, a random base rank for foundations, only 4 tableau columns (vs 7), wrapping in both foundations and tableau, and auto-fill of empty columns from the reserve. Klondike always starts foundations from Aces, has 7 columns with cascading face-down cards, and no reserve pile.",
  },
  {
    question: "What percentage of Canfield games are winnable?",
    answer:
      "About 30-35% of Canfield deals are theoretically winnable with perfect play. Practical win rates are much lower, typically 5-15%, due to the hidden reserve cards and constrained tableau. This makes Canfield one of the harder solitaire variants.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Canfield Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Canfield Solitaire with our complete guide covering setup, rules, the reserve pile, base rank foundations, and winning strategies.",
    url: absoluteUrl("/canfield/how-to-play"),
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
        name: "Canfield Solitaire",
        item: absoluteUrl("/canfield"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Play",
        item: absoluteUrl("/canfield/how-to-play"),
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
          title="How to Play Canfield Solitaire"
          subtitle="Complete rules, setup guide, and winning strategies for one of solitaire's most challenging variants."
        />

        <ContentBody>
          <SectionHeading>Overview</SectionHeading>
          <p>
            Canfield Solitaire is a challenging patience game named after Richard A. Canfield,
            a famous 19th-century casino owner in Saratoga Springs, New York. In the original
            casino version, players paid $52 for a deck and earned $5 per card placed on the
            foundations — the house almost always came out ahead.
          </p>
          <p>
            The game is known as <strong>Demon</strong> or <strong>Demon Patience</strong> in
            the United Kingdom. It features a unique 13-card reserve pile, a randomly determined
            foundation base rank, and wrapping in both foundation and tableau builds.
          </p>

          <AdUnit slot="content-mid" className="my-8" />

          <SectionHeading>Setup</SectionHeading>
          <p>A standard 52-card deck is dealt as follows:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Reserve pile:</strong> 13 cards dealt face-down in a stack. Only the top
              card is turned face-up. This pile sits at the top-left of the layout.
            </li>
            <li>
              <strong>First foundation card:</strong> One card is dealt face-up to start the
              first of four foundation piles. Its rank becomes the <em>base rank</em> — all
              foundations must start from this rank.
            </li>
            <li>
              <strong>Tableau:</strong> Four columns, each receiving one face-up card.
            </li>
            <li>
              <strong>Stock pile:</strong> The remaining 34 cards form the stock, dealt face-down.
            </li>
          </ol>

          <SectionHeading>Foundation Rules</SectionHeading>
          <p>
            There are four foundation piles. Each builds <strong>up in suit</strong> starting
            from the base rank, <strong>wrapping from King back through Ace</strong>.
          </p>
          <p>
            For example, if the base rank is <strong>7</strong>, each foundation builds:
            7 → 8 → 9 → 10 → J → Q → K → A → 2 → 3 → 4 → 5 → 6.
          </p>
          <p>
            A foundation pile is complete when it contains 13 cards. You win when all four
            foundations are complete (all 52 cards placed).
          </p>

          <SectionHeading>Tableau Rules</SectionHeading>
          <p>
            The four tableau columns build <strong>down in alternating colors</strong>, also
            with <strong>wrapping</strong> (an Ace can be placed on a 2, and a King can be
            placed on an Ace of the opposite color).
          </p>
          <p>
            You can move <strong>any valid sequence</strong> of cards — a properly ordered
            group built down in alternating colors — from one column to another, as long as
            the bottom card of the group follows the building rule on the destination.
          </p>
          <p>
            <strong>Empty columns</strong> are automatically filled from the reserve pile. If
            the reserve is empty, any card or valid sequence can fill an empty column.
          </p>

          <AdUnit slot="content-mid-2" className="my-8" />

          <SectionHeading>Reserve Pile</SectionHeading>
          <p>
            The reserve holds 13 cards at the start, with only the top card face-up. The top
            card can be played to any valid foundation or tableau position.
          </p>
          <p>
            When the top card is played, the next card automatically flips face-up. Depleting
            the reserve is a key strategic goal — the 12 hidden cards represent crucial
            information about your available resources.
          </p>

          <SectionHeading>Stock & Waste</SectionHeading>
          <p>
            Click the stock pile to deal <strong>three cards</strong> face-up to the waste
            pile. Only the <strong>top card</strong> of the waste pile is playable — it can go
            to any valid foundation or tableau position.
          </p>
          <p>
            When the stock runs out, click the empty stock area to <strong>recycle</strong> the
            waste pile back into the stock. This can be done <strong>unlimited times</strong>,
            giving you many passes through the deck.
          </p>

          <SectionHeading>Strategy Tips</SectionHeading>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Deplete the reserve early.</strong> Every card you play from the reserve
              reveals a new card and gives you more information. Prioritize moves that empty
              tableau columns (which auto-fill from the reserve).
            </li>
            <li>
              <strong>Track the base rank.</strong> Know which rank you need to start each
              foundation. Don&rsquo;t bury cards of the base rank in long tableau sequences.
            </li>
            <li>
              <strong>Build evenly on foundations.</strong> Don&rsquo;t rush one foundation
              far ahead of the others. Even building ensures you don&rsquo;t block needed cards
              on the tableau.
            </li>
            <li>
              <strong>Use the tableau strategically.</strong> With only four columns, space is
              extremely limited. Avoid building long sequences unless they lead to productive
              plays. Keep columns short to maintain flexibility.
            </li>
            <li>
              <strong>Count the waste pile.</strong> With unlimited redeals, pay attention to
              which cards cycle through the waste. If a key card is three deep, plan your draws
              to access it.
            </li>
            <li>
              <strong>Don&rsquo;t move to foundations too eagerly.</strong> A card on the
              foundation is permanent. If you need a specific card for tableau building, keep
              it on the tableau until its role is fulfilled.
            </li>
          </ol>

          <AdUnit slot="content-bottom" className="my-8" />

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
            href="/canfield"
            title="Play Canfield Solitaire"
            description="Put these rules into practice — play Canfield online for free."
          />
          <ContentLinkCard
            href="/klondike/how-to-play"
            title="How to Play Klondike"
            description="Learn the rules of the world's most popular solitaire game."
          />
          <ContentLinkCard
            href="/golf/how-to-play"
            title="How to Play Golf Solitaire"
            description="Fast-paced solitaire with streak-based scoring."
          />
        </CardSection>

        <CtaSection
          heading="Ready to Play?"
          body="Try Canfield Solitaire now — free, no download, works on any device."
          primaryHref="/canfield"
          primaryLabel="Play Canfield Solitaire"
        />
      </ContentLayout>
    </>
  );
}
