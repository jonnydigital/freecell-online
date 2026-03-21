import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Golf Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Golf Solitaire with our complete guide. Rules for playing cards ±1 rank from seven columns to the waste pile, stock mechanics, and winning strategies.",
  keywords: [
    "how to play golf solitaire",
    "golf solitaire rules",
    "golf solitaire guide",
    "golf solitaire instructions",
    "golf solitaire setup",
    "golf solitaire for beginners",
    "golf solitaire tutorial",
    "golf card game rules",
    "golf patience rules",
    "golf solitaire strategy",
  ],
  openGraph: {
    title: "How to Play Golf Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Golf Solitaire. Clear seven columns by playing cards one rank higher or lower than the waste pile.",
    url: absoluteUrl("/golf/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How is Golf Solitaire set up?",
    answer:
      "Golf Solitaire deals 35 cards into seven columns of five cards each, all face-up. The remaining 17 cards form the stock pile. One card is drawn from the stock to start the waste pile. Your goal is to clear all seven columns by moving cards to the waste pile.",
  },
  {
    question: "What cards can you play in Golf Solitaire?",
    answer:
      "You can play any card from the bottom of any column that is exactly one rank higher or lower than the current waste pile card. For example, if the waste pile shows a 9, you can play an 8 or a 10. Only the bottom (exposed) card of each column is available to play.",
  },
  {
    question: "Does King wrap to Ace in Golf Solitaire?",
    answer:
      "In the standard version of Golf Solitaire, wrapping is optional — some versions allow King-to-Ace wrapping while others treat Kings as dead ends. On playfreecellonline.com, wrapping IS enabled, meaning you can play a King on an Ace and an Ace on a King, giving you more strategic options.",
  },
  {
    question: "What happens when you can't make a move?",
    answer:
      "When no exposed column card is one rank higher or lower than the waste pile top, you must draw a card from the stock. The drawn card becomes the new waste pile top. If the stock is empty and no valid moves remain, the game is over. Your score is based on how many cards remain in the columns — fewer is better.",
  },
  {
    question: "How is Golf Solitaire scored?",
    answer:
      "In Golf Solitaire, your score equals the number of cards remaining in the columns when the game ends. A perfect score is 0 (all columns cleared). Like golf the sport, a lower score is better. Streak bonuses reward consecutive plays without drawing from the stock.",
  },
  {
    question: "Is Golf Solitaire the same as TriPeaks?",
    answer:
      "Golf and TriPeaks share the ±1 rank matching mechanic, but the layouts differ. Golf deals seven columns of five cards in a simple grid, while TriPeaks arranges 28 cards in three overlapping pyramid peaks with face-down cards that reveal as you play. Both use streak scoring, but TriPeaks has the additional challenge of uncovering hidden cards.",
  },
  {
    question: "What percentage of Golf Solitaire games are winnable?",
    answer:
      "With wrapping enabled (K↔A), approximately 88-92% of Golf Solitaire games are winnable with perfect play. Without wrapping, the win rate drops to around 75%. Actual human win rates are typically 40-60%, as the game requires careful sequencing to avoid stranding cards.",
  },
  {
    question: "What are the best strategies for Golf Solitaire?",
    answer:
      "Focus on building long streaks by planning sequences before you start playing. Look for columns with cards in consecutive rank order — these can be swept in one streak. Avoid drawing from the stock unless absolutely necessary, since each draw resets your streak bonus. Keep Kings and Aces in mind as turning points in your sequences.",
  },
];

export default function HowToPlayGolfPage() {
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
    headline: "How to Play Golf Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Golf Solitaire with our comprehensive guide. Setup, rules, scoring, and winning strategies.",
    author: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl("/golf/how-to-play"),
    mainEntityOfPage: absoluteUrl("/golf/how-to-play"),
    datePublished: "2026-03-20",
    dateModified: "2026-03-20",
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
        name: "Games",
        item: absoluteUrl("/games"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Golf Solitaire",
        item: absoluteUrl("/golf"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "How to Play",
        item: absoluteUrl("/golf/how-to-play"),
      },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="How to Play Golf Solitaire"
        subtitle="Clear seven columns by playing cards one rank higher or lower than the waste pile. Build streaks for bonus points — just like sinking birdies."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/games" },
          { label: "Golf Solitaire", href: "/golf" },
          { label: "How to Play", href: "/golf/how-to-play" },
        ]}
      />

      <ContentBody>
        <SectionHeading>Overview</SectionHeading>
        <p>
          Golf Solitaire is a fast-paced, luck-meets-strategy card game where your goal
          is to clear seven columns of cards by moving them to a waste pile. A card can
          be moved if it&apos;s exactly one rank higher or lower than the top card of the
          waste pile — suits don&apos;t matter.
        </p>
        <p>
          Named after the sport, Golf Solitaire uses a &quot;lower is better&quot; scoring
          system. Your score is the number of cards remaining in the columns when you
          can&apos;t make any more moves. A perfect game (score of 0) means you cleared
          every column — the solitaire equivalent of a hole-in-one.
        </p>

        <AdUnit slot="golf-howto-1" />

        <SectionHeading>Setup</SectionHeading>
        <p>
          Golf Solitaire uses a standard 52-card deck. The setup is simple:
        </p>
        <ul>
          <li>
            <strong>Seven columns</strong> — Deal 35 cards into seven columns of five
            cards each. All cards are dealt face-up, so you can see everything from
            the start.
          </li>
          <li>
            <strong>Stock pile</strong> — The remaining 17 cards form the stock pile,
            placed face-down.
          </li>
          <li>
            <strong>Waste pile</strong> — Draw one card from the stock to start the
            waste pile. This is your starting point.
          </li>
        </ul>
        <p>
          Only the bottom card of each column (the one not covered by any other card)
          is available to play. As you remove bottom cards, the cards above them become
          available.
        </p>

        <SectionHeading>Rules</SectionHeading>
        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          Basic Play
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Look at the top card of the waste pile and check its rank.
          </li>
          <li>
            Find any exposed column card that is exactly <strong>one rank higher or
            lower</strong>. For example, if the waste shows a 7, you can play a 6 or 8.
          </li>
          <li>
            Click the card to move it to the waste pile. It becomes the new waste top.
          </li>
          <li>
            Continue chaining moves — each new waste card opens different possibilities.
          </li>
          <li>
            When no column card matches, <strong>draw from the stock</strong>. The drawn
            card becomes the new waste top.
          </li>
          <li>
            The game ends when either all columns are cleared (you win!) or the stock
            is empty and no more moves exist.
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          Wrapping (K ↔ A)
        </h3>
        <p>
          On this site, <strong>wrapping is enabled</strong>: Kings can be played on Aces
          and Aces can be played on Kings. This creates more strategic possibilities and
          increases win rates. Without wrapping, Kings become dead-end cards that can only
          be played on Queens.
        </p>

        <AdUnit slot="golf-howto-2" />

        <SectionHeading>Scoring</SectionHeading>
        <p>
          Golf Solitaire borrows its scoring philosophy from the sport — lower is better:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-sm border border-white/10">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-4 py-2 border-b border-white/10">Result</th>
                <th className="text-left px-4 py-2 border-b border-white/10">Score</th>
                <th className="text-left px-4 py-2 border-b border-white/10">Golf Term</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">All columns cleared</td>
                <td className="px-4 py-2 border-b border-white/10">0</td>
                <td className="px-4 py-2 border-b border-white/10">Hole-in-one</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">1-3 cards remaining</td>
                <td className="px-4 py-2 border-b border-white/10">1-3</td>
                <td className="px-4 py-2 border-b border-white/10">Birdie / Eagle</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">4-8 cards remaining</td>
                <td className="px-4 py-2 border-b border-white/10">4-8</td>
                <td className="px-4 py-2 border-b border-white/10">Par</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">9+ cards remaining</td>
                <td className="px-4 py-2 border-b border-white/10">9+</td>
                <td className="px-4 py-2 border-b border-white/10">Bogey</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Streak bonuses</strong> reward consecutive plays. Each card played without
          drawing from the stock adds an increasing bonus: 1st card = 1 point, 2nd = 2,
          3rd = 3, and so on. Drawing resets the streak. Long chains of plays are
          exponentially more valuable.
        </p>

        <SectionHeading>Strategy Tips</SectionHeading>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          1. Scan Before You Play
        </h3>
        <p>
          Before making your first move, scan all seven columns. Look for sequences of
          consecutive ranks that can be chained together. Planning a long streak before
          starting is the single biggest win-rate improvement you can make.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          2. Maximize Streak Length
        </h3>
        <p>
          Streaks are the key to high scores. If you can play either a 6 or an 8 on a 7,
          think about which choice leads to a longer chain. Sometimes the less obvious
          move keeps the streak alive for several more cards.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          3. Target Tall Columns First
        </h3>
        <p>
          Columns with all five cards still in them are the most dangerous — they have
          four trapped cards. Prioritize moves that reduce the tallest columns to free
          up more options.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          4. Use Wrapping Strategically
        </h3>
        <p>
          The K↔A wrapping rule is your secret weapon. A sequence like Q-K-A-2-3 is a
          5-card streak that wouldn&apos;t be possible without wrapping. Always check
          for Aces and Kings when your streak seems stuck.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          5. Count Your Outs
        </h3>
        <p>
          When deciding whether to draw, count how many exposed cards match the current
          waste top. If three cards are playable, you have options. If only one card
          matches, play it — it might not be there next turn.
        </p>

        <AdUnit slot="golf-howto-3" />

        <SectionHeading>Golf vs TriPeaks</SectionHeading>
        <p>
          Golf and{" "}
          <Link href="/tripeaks" className="text-[#D4AF37] underline hover:text-[#FFD700]">
            TriPeaks Solitaire
          </Link>{" "}
          share the ±1 rank matching mechanic, but they play quite differently:
        </p>
        <ul>
          <li><strong>Layout:</strong> Golf has a simple 7×5 grid; TriPeaks has three overlapping pyramids with face-down cards.</li>
          <li><strong>Hidden cards:</strong> Golf is fully visible from the start; TriPeaks reveals cards as you uncover them.</li>
          <li><strong>Strategy:</strong> Golf is more about reading the board; TriPeaks adds the puzzle of which peak to attack first.</li>
          <li><strong>Win rate:</strong> Both are around 88-92% with perfect play, but Golf feels faster and more casual.</li>
        </ul>

        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <AdUnit slot="golf-howto-4" />

        <CtaSection
          heading="Ready to Tee Off?"
          body="Put your skills to the test. Clear seven columns, build streaks, and aim for a perfect score."
          primaryLabel="Play Golf Solitaire"
          primaryHref="/golf"
        />
      </ContentBody>

      <CardSection>
        <ContentLinkCard
          title="All Solitaire Games"
          description="Browse our full collection of 10+ free solitaire games."
          href="/games"
        />
        <ContentLinkCard
          title="TriPeaks Solitaire"
          description="Same matching mechanic, three-peak pyramid layout."
          href="/tripeaks"
        />
        <ContentLinkCard
          title="Solitaire Types"
          description="Explore the complete guide to solitaire game categories."
          href="/solitaire-types"
        />
      </CardSection>
    </ContentLayout>
  );
}
