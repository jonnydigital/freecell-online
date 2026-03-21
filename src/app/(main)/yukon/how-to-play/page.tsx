import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "How to Play Yukon Solitaire | Rules, Setup & Complete Guide",
  description:
    "Learn how to play Yukon Solitaire with our complete guide. Rules for moving any face-up card, tableau building, foundation strategies, and how Yukon differs from Klondike.",
  keywords: [
    "how to play yukon solitaire",
    "yukon solitaire rules",
    "yukon solitaire guide",
    "yukon solitaire instructions",
    "yukon solitaire setup",
    "yukon solitaire for beginners",
    "yukon solitaire tutorial",
    "yukon card game rules",
    "yukon patience rules",
    "yukon solitaire strategy",
    "yukon vs klondike",
  ],
  openGraph: {
    title: "How to Play Yukon Solitaire | Rules, Setup & Complete Guide",
    description:
      "Learn how to play Yukon Solitaire. Move any face-up card across seven tableau columns in this challenging Klondike variant.",
    url: absoluteUrl("/yukon/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/yukon/how-to-play"),
  },
};

const faqs = [
  {
    question: "How is Yukon Solitaire set up?",
    answer:
      "Yukon Solitaire deals all 52 cards to seven tableau columns. Column 1 gets 1 face-up card. Columns 2-7 each get a number of face-down cards equal to the column number, plus 5 face-up cards on top. Column 7 has 11 cards total (6 face-down + 5 face-up). There is no stock pile or waste pile.",
  },
  {
    question: "What makes Yukon different from Klondike?",
    answer:
      "Two major differences: First, all 52 cards are dealt to the tableau — there is no stock or waste pile. Second, any face-up card can be moved along with all cards on top of it, even if those cards don't form a proper alternating-color descending sequence. In Klondike, you can only move properly sequenced groups.",
  },
  {
    question: "Can you move any card in Yukon Solitaire?",
    answer:
      "You can move any face-up card, along with all cards stacked on top of it, to another tableau column. The card being moved must follow the standard building rule on the destination: it must be one rank lower and the opposite color of the top card. Face-down cards cannot be moved — they flip face-up automatically when exposed.",
  },
  {
    question: "What can go on an empty column in Yukon?",
    answer:
      "Only Kings (or groups of cards led by a King) can be placed on an empty tableau column. This is the same rule as Klondike. Empty columns are valuable because they let you reorganize the tableau by parking Kings and their attached cards.",
  },
  {
    question: "How do you build the foundations in Yukon?",
    answer:
      "Foundations are built up by suit from Ace to King, one card at a time. Only the top card of a tableau column can be moved to a foundation. You win when all four foundations are complete (Ace through King for each suit).",
  },
  {
    question: "Is Yukon Solitaire harder than Klondike?",
    answer:
      "Yukon is generally considered harder than Klondike despite having more movement freedom. The lack of a stock pile means every card you need must be uncovered through tableau manipulation. While more games are theoretically winnable (~85-90%), the decision tree is much deeper, leading to lower practical win rates of 25-40%.",
  },
  {
    question: "What percentage of Yukon games are winnable?",
    answer:
      "Approximately 85-90% of Yukon Solitaire deals are theoretically winnable with perfect play. However, because the game requires deep strategic planning and the consequences of each move ripple through the entire tableau, practical human win rates typically range from 25-40%.",
  },
  {
    question: "What are the best strategies for Yukon Solitaire?",
    answer:
      "Focus on uncovering face-down cards as your top priority — every reveal creates new opportunities. Use the ability to move unordered groups to dig deep into columns. Don't fill empty columns with Kings unless doing so uncovers face-down cards. Build foundations steadily but keep cards on the tableau when they're needed for column building.",
  },
];

export default function HowToPlayYukonPage() {
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
    headline: "How to Play Yukon Solitaire — Complete Rules & Strategy Guide",
    description:
      "Learn how to play Yukon Solitaire with our comprehensive guide. Setup, rules, strategy, and how it differs from Klondike.",
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
    url: absoluteUrl("/yukon/how-to-play"),
    mainEntityOfPage: absoluteUrl("/yukon/how-to-play"),
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
        name: "Yukon Solitaire",
        item: absoluteUrl("/yukon"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "How to Play",
        item: absoluteUrl("/yukon/how-to-play"),
      },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="How to Play Yukon Solitaire"
        subtitle="Move any face-up card — sequence or not — across seven tableau columns in this deeply strategic Klondike variant. No stock pile. All 52 cards in play from the start."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Games", href: "/games" },
          { label: "Yukon Solitaire", href: "/yukon" },
          { label: "How to Play", href: "/yukon/how-to-play" },
        ]}
      />

      <ContentBody>
        <SectionHeading>Overview</SectionHeading>
        <p>
          Yukon Solitaire is a Klondike variant that removes the stock pile entirely and
          replaces it with a powerful new rule: you can move any face-up card along with
          all cards on top of it, regardless of whether they form a proper sequence. This
          single rule change transforms the game from a luck-influenced draw-and-play into
          a deep strategic puzzle.
        </p>
        <p>
          All 52 cards are dealt to seven tableau columns at the start. Your goal is the
          same as Klondike — build four foundation piles from Ace to King by suit — but
          the path to victory requires careful planning, since there&apos;s no stock pile
          to bail you out when you get stuck.
        </p>

        <AdUnit slot="yukon-howto-1" />

        <SectionHeading>Setup</SectionHeading>
        <p>
          Yukon Solitaire uses a standard 52-card deck. The deal is distinctive:
        </p>
        <ul>
          <li>
            <strong>Column 1</strong> — 1 face-up card.
          </li>
          <li>
            <strong>Column 2</strong> — 1 face-down card + 5 face-up cards (6 total).
          </li>
          <li>
            <strong>Column 3</strong> — 2 face-down + 5 face-up (7 total).
          </li>
          <li>
            <strong>Column 4</strong> — 3 face-down + 5 face-up (8 total).
          </li>
          <li>
            <strong>Column 5</strong> — 4 face-down + 5 face-up (9 total).
          </li>
          <li>
            <strong>Column 6</strong> — 5 face-down + 5 face-up (10 total).
          </li>
          <li>
            <strong>Column 7</strong> — 6 face-down + 5 face-up (11 total).
          </li>
        </ul>
        <p>
          That&apos;s all 52 cards dealt out (1+6+7+8+9+10+11 = 52). There is no stock
          pile and no waste pile. Four empty foundation slots sit at the top of the board.
        </p>

        <SectionHeading>Rules</SectionHeading>
        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          Moving Cards
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            <strong>Any face-up card</strong> can be moved, along with all cards on top of
            it, to another tableau column. The cards being moved do not need to be in
            sequence — this is the key difference from Klondike.
          </li>
          <li>
            The card being placed must be <strong>one rank lower</strong> and the{" "}
            <strong>opposite color</strong> of the card it&apos;s placed on. For example, a
            red 8 can go on a black 9.
          </li>
          <li>
            Only <strong>Kings</strong> (or groups led by a King) can be placed on empty
            columns.
          </li>
          <li>
            When a face-down card is exposed (no cards on top of it), it automatically
            flips face-up.
          </li>
        </ol>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          Building Foundations
        </h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Foundations are built <strong>up by suit</strong> from Ace to King.
          </li>
          <li>
            Only the <strong>top card</strong> of a tableau column can be moved to a
            foundation.
          </li>
          <li>
            You win when all four foundations contain a complete Ace-to-King sequence.
          </li>
        </ol>

        <AdUnit slot="yukon-howto-2" />

        <SectionHeading>Strategy Tips</SectionHeading>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          1. Uncover Face-Down Cards First
        </h3>
        <p>
          Your top priority should always be flipping face-down cards. Every face-down
          card is a locked resource — you can&apos;t use it, plan around it, or move it.
          Before making any other move, ask yourself: &ldquo;Does this reveal a hidden
          card?&rdquo; If yes, it&apos;s almost always the right play.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          2. Use the Unordered Move Rule Aggressively
        </h3>
        <p>
          The ability to move any face-up card (regardless of sequence) is your most
          powerful tool. Use it to dig deep into columns with many face-down cards. Moving
          a card from the middle of a column brings everything above it along for the ride,
          which can expose several face-down cards in one move.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          3. Be Strategic with Empty Columns
        </h3>
        <p>
          Empty columns are extremely valuable in Yukon because only Kings can fill them.
          Don&apos;t rush to fill an empty column unless you&apos;re placing a King that
          unlocks face-down cards elsewhere. An empty column gives you flexibility to
          reorganize the tableau.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          4. Build Foundations Steadily
        </h3>
        <p>
          Move cards to foundations when they&apos;re safe to send up. A card is safe if
          both opposite-color cards of the next lower rank are already on their foundations.
          Don&apos;t rush Aces up if the 2s and 3s of those suits are buried deep in the
          tableau — you may need them for tableau building first.
        </p>

        <h3 className="text-lg font-semibold text-[#D4AF37] mt-6 mb-2">
          5. Think Several Moves Ahead
        </h3>
        <p>
          Yukon rewards deep thinking more than most solitaire games. Before committing to
          a move, trace the consequences: what gets uncovered, what gets buried, and what
          new moves become available. A move that looks good in isolation might lock you out
          of a critical sequence three moves later.
        </p>

        <AdUnit slot="yukon-howto-3" />

        <SectionHeading>Yukon vs Klondike</SectionHeading>
        <p>
          Yukon is derived from{" "}
          <Link href="/klondike" className="text-[#D4AF37] underline hover:text-[#FFD700]">
            Klondike Solitaire
          </Link>{" "}
          but plays quite differently due to two fundamental changes:
        </p>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full text-sm border border-white/10">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left px-4 py-2 border-b border-white/10">Feature</th>
                <th className="text-left px-4 py-2 border-b border-white/10">Klondike</th>
                <th className="text-left px-4 py-2 border-b border-white/10">Yukon</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Stock pile</td>
                <td className="px-4 py-2 border-b border-white/10">24 cards in stock</td>
                <td className="px-4 py-2 border-b border-white/10">No stock — all cards dealt</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Cards dealt</td>
                <td className="px-4 py-2 border-b border-white/10">28 to tableau</td>
                <td className="px-4 py-2 border-b border-white/10">All 52 to tableau</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Moving groups</td>
                <td className="px-4 py-2 border-b border-white/10">Only properly sequenced runs</td>
                <td className="px-4 py-2 border-b border-white/10">Any face-up card + cards above</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Face-up per column</td>
                <td className="px-4 py-2 border-b border-white/10">1 (top card only)</td>
                <td className="px-4 py-2 border-b border-white/10">5 (columns 2-7)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Luck factor</td>
                <td className="px-4 py-2 border-b border-white/10">Moderate (stock draws)</td>
                <td className="px-4 py-2 border-b border-white/10">Low (all visible from start)</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border-b border-white/10">Difficulty</td>
                <td className="px-4 py-2 border-b border-white/10">Medium</td>
                <td className="px-4 py-2 border-b border-white/10">Medium–Hard</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The bottom line: Klondike gives you a stock pile as a safety net but restricts
          which cards you can move. Yukon takes away the safety net but gives you far more
          freedom of movement. Both are excellent games, but Yukon rewards patient,
          strategic play more heavily.
        </p>

        <SectionHeading>Frequently Asked Questions</SectionHeading>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>

        <AdUnit slot="yukon-howto-4" />

        <CtaSection
          heading="Ready to Play?"
          body="Put your strategic skills to the test. Move any face-up card, uncover hidden cards, and build all four foundations to win."
          primaryLabel="Play Yukon Solitaire"
          primaryHref="/yukon"
        />
      </ContentBody>

      <CardSection>
        <ContentLinkCard
          title="All Solitaire Games"
          description="Browse our full collection of 10+ free solitaire games."
          href="/games"
        />
        <ContentLinkCard
          title="Klondike Solitaire"
          description="The classic game Yukon is based on — with a stock pile."
          href="/klondike"
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
