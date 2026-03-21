import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Forty Thieves Solitaire | Rules, Setup & Strategy",
  description:
    "Learn how to play Forty Thieves Solitaire with our complete guide. Rules for same-suit building, single card moves, stock management, and winning strategies for this challenging 2-deck game.",
  keywords: [
    "how to play forty thieves solitaire",
    "forty thieves solitaire rules",
    "forty thieves solitaire guide",
    "forty thieves solitaire instructions",
    "forty thieves solitaire setup",
    "forty thieves solitaire for beginners",
    "forty thieves solitaire tutorial",
    "forty thieves card game rules",
    "napoleon at st helena rules",
    "forty thieves solitaire strategy",
    "2 deck solitaire rules",
  ],
  openGraph: {
    title: "How to Play Forty Thieves Solitaire | Rules, Setup & Strategy",
    description:
      "Learn how to play Forty Thieves Solitaire. Master same-suit building, single card moves, and stock management in this challenging 2-deck patience game.",
    url: absoluteUrl("/forty-thieves/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/forty-thieves/how-to-play"),
  },
};

const faqs = [
  {
    question: "How many cards are dealt to the tableau in Forty Thieves?",
    answer:
      "Forty cards are dealt to the tableau — 4 face-up cards to each of 10 columns. This is where the game gets its name. The remaining 64 cards go into the stock pile.",
  },
  {
    question: "Can you build with alternating colors in Forty Thieves?",
    answer:
      "No. Forty Thieves requires same-suit building on the tableau. You can only place a card on another card of the same suit that is one rank higher. For example, the 7 of Clubs can only go on the 8 of Clubs. This is much more restrictive than alternating-color games like Klondike.",
  },
  {
    question: "How many foundation piles are there in Forty Thieves?",
    answer:
      "There are 8 foundation piles, one for each suit across both decks. Since Forty Thieves uses two decks, there are two foundation piles for each suit. Each builds up from Ace to King.",
  },
  {
    question: "Can you recycle the stock pile in Forty Thieves?",
    answer:
      "No. In standard Forty Thieves rules, there is no recycling of the stock pile. Once you have drawn through all 64 stock cards, they remain in the waste pile and cannot be redrawn. This adds significant difficulty to the game.",
  },
  {
    question: "What can fill an empty tableau column in Forty Thieves?",
    answer:
      "Any single card can be moved to an empty tableau column. Empty columns are extremely valuable in Forty Thieves because they give you temporary storage space for rearranging cards. Experienced players treat empty columns almost like free cells.",
  },
  {
    question: "Is Forty Thieves harder than Spider Solitaire?",
    answer:
      "Yes, Forty Thieves is generally considered harder than Spider Solitaire. While both use multiple decks and same-suit building, Spider allows you to move groups of cards and has 10 columns with more cards. Forty Thieves restricts you to single-card moves and offers no stock recycling, resulting in typical win rates of 5-10% compared to Spider's 15-30%.",
  },
  {
    question: "What is the difference between Forty Thieves and Napoleon at St Helena?",
    answer:
      "They are the same game. Forty Thieves is also known as Napoleon at St Helena, referring to the legend that Napoleon played this patience game during his exile on the island of Saint Helena. Other names include Big Forty and Roosevelt at San Juan.",
  },
  {
    question: "How do you win at Forty Thieves Solitaire?",
    answer:
      "You win by moving all 104 cards to the 8 foundation piles, building each from Ace to King in suit. The key strategies are preserving empty columns, uncovering Aces early, planning several moves ahead, building in-suit sequences when possible, and using the stock wisely since it cannot be recycled.",
  },
];

export default function Page() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Forty Thieves Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Forty Thieves Solitaire with our complete guide covering setup, same-suit building rules, stock management, and winning strategies.",
    url: absoluteUrl("/forty-thieves/how-to-play"),
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
        name: "Forty Thieves Solitaire",
        item: absoluteUrl("/forty-thieves"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "How to Play",
        item: absoluteUrl("/forty-thieves/how-to-play"),
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
          title="How to Play Forty Thieves Solitaire"
          subtitle="Complete rules, setup guide, and winning strategies for one of the most challenging solitaire games ever created."
        />

        <ContentBody>
          <SectionHeading>Overview</SectionHeading>
          <p>
            Forty Thieves is a notoriously difficult solitaire card game played with two
            standard 52-card decks shuffled together (104 cards total). The game features
            10 tableau columns, 8 foundation piles, a stock pile, and a waste pile. It is
            widely considered one of the hardest mainstream solitaire variants, with win
            rates estimated at just 5-10% even for skilled players.
          </p>
          <p>
            The game is also known by several other names: <strong>Napoleon at St
            Helena</strong> (after the legend that Napoleon played it during his exile),{" "}
            <strong>Big Forty</strong>, and <strong>Roosevelt at San Juan</strong>. Its
            defining characteristic is same-suit building on the tableau combined with
            single-card-only moves — a combination that creates one of the most demanding
            patience games in existence.
          </p>
          <p>
            Unlike{" "}
            <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>
            , where all cards are visible and nearly every deal is solvable, Forty Thieves
            presents a stiff challenge where most deals are genuinely unwinnable. The game
            rewards careful planning, patience, and the ability to think several moves ahead.
          </p>

          <AdUnit slot="content-mid" className="my-8" />

          <SectionHeading>Setup</SectionHeading>
          <p>
            Shuffle two standard 52-card decks together to create a single 104-card deck.
            Then deal the cards as follows:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              <strong>Tableau:</strong> Deal 4 cards face-up to each of 10 columns, for a
              total of 40 cards on the tableau. All cards are visible from the start — there
              are no face-down cards in Forty Thieves. These 40 cards are the &quot;forty
              thieves&quot; that give the game its name.
            </li>
            <li>
              <strong>Stock pile:</strong> The remaining 64 cards are placed face-down in a
              stock pile. Cards are drawn one at a time from the stock to the waste pile.
            </li>
            <li>
              <strong>Waste pile:</strong> Starts empty. Cards drawn from the stock are placed
              here face-up. Only the top card of the waste pile is playable.
            </li>
            <li>
              <strong>Foundations:</strong> 8 empty foundation piles, arranged above the
              tableau. Since there are two decks, you need two foundation piles per suit
              (two for Spades, two for Hearts, two for Diamonds, two for Clubs).
            </li>
          </ol>

          <SectionHeading>Rules of Play</SectionHeading>
          <p>
            Forty Thieves has straightforward but punishing rules. The two key constraints
            that define the game are same-suit building and single-card moves.
          </p>

          <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
            Tableau Building
          </h3>
          <p>
            Cards on the tableau are built <strong>down in the same suit</strong>. This means
            you can only place a card on another card that is one rank higher <em>and</em> the
            same suit. For example:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The 9 of Hearts can go on the 10 of Hearts</li>
            <li>The Jack of Clubs can go on the Queen of Clubs</li>
            <li>The 3 of Spades can <strong>not</strong> go on the 4 of Hearts (wrong suit)</li>
            <li>The 5 of Diamonds can <strong>not</strong> go on the 5 of Diamonds (must be one rank higher)</li>
          </ul>
          <p>
            This is far more restrictive than{" "}
            <Link href="/klondike" className="text-[#D4AF37] hover:underline">
              Klondike
            </Link>{" "}
            or FreeCell, where you build with alternating colors (any red on any black). In
            Forty Thieves, each card has only one possible destination suit, which severely
            limits your options.
          </p>

          <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
            Single Card Moves
          </h3>
          <p>
            You can only move <strong>one card at a time</strong>. Even if you have a perfect
            in-suit sequence (like 10-9-8-7 of Spades), you cannot pick up and move the group.
            Each card must be moved individually. This means that rearranging sequences requires
            empty columns as temporary storage — similar to how free cells work in{" "}
            <Link href="/" className="text-[#D4AF37] hover:underline">
              FreeCell
            </Link>
            , but with no dedicated free cell spaces.
          </p>

          <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
            Empty Columns
          </h3>
          <p>
            When a tableau column is completely emptied, <strong>any single card</strong> can
            be placed there. Empty columns are the most valuable resource in Forty Thieves.
            They serve as temporary holding spaces that allow you to rearrange cards and build
            sequences. Experienced players guard empty columns carefully and create them
            strategically.
          </p>

          <AdUnit slot="content-mid-2" className="my-8" />

          <SectionHeading>Stock & Waste</SectionHeading>
          <p>
            Click the stock pile to draw <strong>one card</strong> face-up to the waste pile.
            Only the top card of the waste pile can be played — it can go to any valid tableau
            column or foundation pile.
          </p>
          <p>
            <strong>There is no recycling of the stock.</strong> Once you have drawn through
            all 64 stock cards, the stock is permanently exhausted. This is a critical
            difference from games like Klondike or{" "}
            <Link href="/canfield" className="text-[#D4AF37] hover:underline">
              Canfield
            </Link>
            , which allow unlimited redeals. In Forty Thieves, every stock draw is permanent,
            so timing your draws is essential.
          </p>
          <p>
            A common strategic error is drawing from the stock too quickly. Each card you draw
            covers the previous waste card, potentially burying a useful card. Draw from the
            stock only when you have no productive moves on the tableau, or when you
            specifically need to find a card to continue a sequence.
          </p>

          <SectionHeading>Foundations</SectionHeading>
          <p>
            The 8 foundation piles build <strong>up in suit from Ace to King</strong>. Since
            there are two decks, you need to complete two foundation piles for each suit:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Two piles for Spades: A-2-3-4-5-6-7-8-9-10-J-Q-K</li>
            <li>Two piles for Hearts: A-2-3-4-5-6-7-8-9-10-J-Q-K</li>
            <li>Two piles for Diamonds: A-2-3-4-5-6-7-8-9-10-J-Q-K</li>
            <li>Two piles for Clubs: A-2-3-4-5-6-7-8-9-10-J-Q-K</li>
          </ul>
          <p>
            You win the game when all 104 cards have been moved to the foundations. Move Aces
            to the foundations as soon as they become available — there is never a strategic
            reason to hold an Ace on the tableau. For cards ranked 2 and above, consider
            whether the card might be more useful on the tableau before moving it to a
            foundation.
          </p>

          <SectionHeading>Strategy Tips</SectionHeading>
          <p>
            Forty Thieves is unforgiving, but these strategies will improve your chances:
          </p>
          <ol className="list-decimal pl-6 space-y-3">
            <li>
              <strong>Empty columns are everything.</strong> The single most important
              strategic goal is creating and preserving empty tableau columns. They serve as
              your only temporary storage, equivalent to free cells. With no empty columns,
              you have almost no flexibility. Try to clear at least one column early and
              protect it throughout the game.
            </li>
            <li>
              <strong>Don&rsquo;t bury Aces.</strong> Before making any move, check whether
              it will bury an Ace deeper in a column. Aces are the gateway to the foundations,
              and every buried Ace represents a chain of moves needed to uncover it. Prioritize
              plays that expose or free Aces.
            </li>
            <li>
              <strong>Plan in-suit sequences.</strong> Since building is same-suit only, look
              for opportunities to build long same-suit runs. A column with a clean sequence
              like K-Q-J-10-9 of Clubs is extremely valuable because every card can eventually
              flow to the foundation in order.
            </li>
            <li>
              <strong>Use the stock wisely.</strong> With no recycling, every stock draw is
              permanent. Don&rsquo;t draw from the stock unless you have no productive tableau
              moves or you specifically need to find a key card. Each draw buries the previous
              waste card, so drawing recklessly can cost you the game.
            </li>
            <li>
              <strong>Think several moves ahead.</strong> More than any other solitaire
              variant, Forty Thieves rewards long-term planning. Before making a move, consider
              the chain of moves it enables. Will this free an Ace? Will it create an empty
              column? Will it let you build a useful sequence? A single thoughtless move can
              make the game unwinnable.
            </li>
            <li>
              <strong>Build foundations evenly.</strong> Don&rsquo;t rush one foundation pile
              far ahead of the others. Cards played to foundations are permanent — if you
              need a 5 on the tableau but it&rsquo;s already on a foundation, you&rsquo;re
              stuck. Build foundations at a steady pace, especially in the early game.
            </li>
          </ol>

          <AdUnit slot="content-bottom" className="my-8" />

          <SectionHeading>Common Mistakes</SectionHeading>
          <p>
            Avoid these frequent errors that can quickly derail a Forty Thieves game:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Drawing from the stock too early.</strong> Many players click the stock
              as soon as they feel stuck. Exhaust all tableau moves first — even small
              rearrangements can open up new possibilities.
            </li>
            <li>
              <strong>Filling empty columns immediately.</strong> When you create an empty
              column, resist the urge to fill it right away. Keep it open as temporary storage
              unless you have a clear plan for the card you&rsquo;re placing there.
            </li>
            <li>
              <strong>Ignoring suit distribution.</strong> With two decks, it&rsquo;s easy to
              lose track of which suits you&rsquo;re building. Focus on one or two suits at a
              time rather than trying to advance all eight foundations simultaneously.
            </li>
            <li>
              <strong>Moving to foundations too aggressively.</strong> While Aces should always
              go to foundations immediately, be cautious with 2s, 3s, and 4s. These low cards
              are sometimes more useful on the tableau as building targets for even lower cards
              in the same suit.
            </li>
            <li>
              <strong>Creating mixed-suit columns.</strong> Since you can only build in the
              same suit, placing random cards on empty columns creates dead-end piles. When
              possible, start a column with a high card that you can build a long same-suit
              sequence on.
            </li>
          </ul>

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
            href="/forty-thieves"
            title="Play Forty Thieves Solitaire"
            description="Put these rules into practice — play Forty Thieves online for free."
          />
          <ContentLinkCard
            href="/spider/how-to-play"
            title="How to Play Spider Solitaire"
            description="Learn another multi-deck solitaire game with same-suit building."
          />
          <ContentLinkCard
            href="/klondike/how-to-play"
            title="How to Play Klondike"
            description="Learn the rules of the world's most popular solitaire game."
          />
        </CardSection>

        <CtaSection
          heading="Ready to Play?"
          body="Try Forty Thieves Solitaire now — free, no download, works on any device."
          primaryHref="/forty-thieves"
          primaryLabel="Play Forty Thieves Solitaire"
        />
      </ContentLayout>
    </>
  );
}
