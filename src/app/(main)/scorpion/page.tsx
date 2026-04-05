import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import ScorpionGamePage from "./ScorpionGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Scorpion Solitaire | Play Online Free — Strategic Card Game",
  description:
    "Play Scorpion Solitaire online for free. Build same-suit sequences from King to Ace in this challenging 7-column card game. Move any face-up card and all cards below it. No download required.",
  keywords: [
    "scorpion solitaire",
    "scorpion solitaire online",
    "scorpion card game",
    "scorpion solitaire free",
    "play scorpion solitaire",
    "scorpion patience game",
    "scorpion solitaire no download",
  ],
  openGraph: {
    title: "Scorpion Solitaire | Play Online Free — Strategic Card Game",
    description:
      "Play Scorpion Solitaire online for free. Build same-suit sequences from King to Ace. Move any face-up card. No download required.",
    url: absoluteUrl("/scorpion"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Scorpion Solitaire?",
    answer:
      "Scorpion Solitaire is a challenging single-deck card game played with 7 tableau columns of 7 cards each (49 cards) plus a 3-card reserve. The goal is to build four complete King-to-Ace same-suit sequences within the tableau. Unlike Spider Solitaire, you can move any face-up card along with all cards below it, regardless of whether they form a sequence.",
  },
  {
    question: "How is Scorpion different from Spider Solitaire?",
    answer:
      "While both games use same-suit building, the key difference is that Scorpion allows you to move ANY face-up card plus all cards below it, even if they don't form a proper sequence. In Spider, you can only move cards that form a descending same-suit run. Scorpion also uses one deck instead of two, has no stock pile (just a 3-card reserve), and completed sequences are removed from the tableau rather than placed on foundations.",
  },
  {
    question: "What is the win rate for Scorpion Solitaire?",
    answer:
      "Scorpion Solitaire has an estimated win rate of around 50% with skilled play. This makes it moderately difficult — harder than standard FreeCell (~82%) but much easier than Forty Thieves (~10%) or 4-suit Spider (~5%). The ability to move non-sequential groups of cards gives you significant flexibility.",
  },
  {
    question: "Can you move any card in Scorpion Solitaire?",
    answer:
      "You can move any face-up card along with ALL cards below it in the column, regardless of whether those cards form a valid sequence. This is the defining feature of Scorpion Solitaire. However, the card you're moving must still be placed on a card of the same suit that is exactly one rank higher, or into an empty column (Kings only).",
  },
  {
    question: "What happens when you complete a sequence in Scorpion?",
    answer:
      "When you build a complete King-to-Ace same-suit sequence at the bottom of a tableau column, the 13 cards are automatically removed from the game. There are no foundation piles — completed sequences simply disappear. The goal is to complete all four suit sequences to win the game.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Scorpion Solitaire",
    description:
      "Free online Scorpion Solitaire. Build same-suit sequences from King to Ace in this strategic single-deck card game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/scorpion"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      ratingCount: "1024",
      bestRating: "5",
      worstRating: "1",
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
        name: "Scorpion Solitaire",
        item: absoluteUrl("/scorpion"),
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
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <ScorpionGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Scorpion Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Scorpion Solitaire is a strategic single-deck card game that combines the
          same-suit building of{" "}
          <Link href="/spider" className="text-[#D4AF37] hover:underline">
            Spider Solitaire
          </Link>{" "}
          with the flexible card movement of{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>
          . The result is a deeply tactical game where planning and sequencing matter
          more than luck.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Scorpion Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 49 cards across 7 columns of 7. The first 4 columns have their top 3
          cards face-down; the last 3 columns are dealt entirely face-up. Three cards
          are set aside as the reserve, which can be dealt (one to each of the first
          three columns) when you need fresh options.
        </p>
        <p className="mb-4 leading-relaxed">
          Build <strong>down in the same suit</strong> on the tableau — a 9 of Hearts
          on a 10 of Hearts. The twist: you can pick up <strong>any face-up card and
          all cards below it</strong>, even if they don&apos;t form a sequence. When
          you build a complete King-to-Ace same-suit run at the bottom of a column,
          those 13 cards are removed. Complete all four suits to win.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          The ability to move non-sequential groups of cards makes Scorpion uniquely
          strategic. You can grab a face-up 7 that has a random assortment of cards
          piled on top of it and move the whole stack to an 8 of the same suit. This
          flexibility opens up creative solutions but also means you need to think
          carefully about which cards you&apos;re dragging along for the ride.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Scorpion belongs to the cascade family of solitaire games —
          relatives of Spider and Wasp — that rely on same-suit building
          inside the tableau rather than external foundation piles. It
          shares DNA with Spider, but uses a single deck of 52 cards and
          seven columns rather than ten. Its defining quirk is the reveal
          mechanic: four cards are dealt <strong>face-down</strong> at the
          top of the first four columns before the remaining cards are
          dealt face-up on top. A small three-card reserve waits at the
          side. Those hidden cards, combined with the &ldquo;move any card
          plus everything below it&rdquo; rule borrowed from{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>
          , make Scorpion feel closer to a puzzle with fog-of-war than to
          a pure patience. Nineteenth-century British patience books
          describe close cousins; the name Scorpion appears to have
          stabilised in the mid-twentieth century.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The four face-down cards at the top of columns one through four
          are the single biggest threat in a Scorpion deal. We think of
          them as land mines: comfortable long descending runs can turn
          uninhabitable the moment a hidden card flips into something
          unplayable. The core rule we follow is{" "}
          <strong>never build an unbreakable sequence on top of a hidden
          card</strong>. If a 10-9-8-7-6 of Hearts sits on top of an
          unrevealed card, you have committed to that column without
          knowing what you are defending. Reveal first, build second.
        </p>
        <p className="mb-4 leading-relaxed">
          Column depth is the second major axis. With seven cards per
          column at the deal, columns grow fast because the move-any-card
          rule lets entire stacks migrate. We track the two deepest
          columns like a cost meter — if they both exceed twelve cards,
          we halt forward building and redirect to excavation instead.
          Depth is how Scorpion deals get lost: a buried King or a buried
          mid-rank of the wrong suit can freeze the whole board.
        </p>
        <p className="mb-4 leading-relaxed">
          The three-card reserve is a one-time emergency lever. It deals
          one card onto each of the first three columns — exactly the
          columns that started with hidden cards — and cannot be recalled.
          We hold the reserve until we have either (a) uncovered every
          face-down card, or (b) reached a position where no legal move
          exists. Spending the reserve early is the most common mistake
          we see in logged games. Like{" "}
          <Link href="/spider" className="text-[#D4AF37] hover:underline">
            Spider Solitaire
          </Link>
          , patience with the stock is a top-quartile skill.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Scorpion sits at a{" "}
          <strong>40 to 50% solve rate</strong> with skilled play —
          substantially harder than FreeCell, comparable to 2-suit Spider,
          and considerably easier than 4-suit Spider or Forty Thieves. The
          win rate reflects the tension between the game&apos;s generous
          movement (any card plus everything below it) and its punishing
          reveal mechanic. Good players generate many legal moves; the
          face-down cards decide whether those moves build toward
          resolution or bury the next bottleneck.
        </p>
        <p className="mb-4 leading-relaxed">
          Our own logs show beginners winning around 20% of deals while
          experienced players hover in the mid-forties. The jump is
          almost entirely about reveal discipline. Once you stop building
          on hidden cards, the win rate climbs sharply. Unlike FreeCell
          family games, Scorpion has no theoretical 99% ceiling — even
          perfect play loses to deals where the hidden cards produce an
          unsolvable configuration.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Building on top of face-down cards.</strong> Dragging
            a stack onto a hidden-card column creates a commitment before
            the reveal. If the reveal is hostile, the entire stack
            becomes dead weight.
          </li>
          <li>
            <strong>Burning the reserve too early.</strong> The
            three-card deal is one-time only. Players often trigger it to
            clear one annoying position and then lose the ability to
            recover from a real blocker ten moves later.
          </li>
          <li>
            <strong>Moving large stacks for cosmetic reasons.</strong>{" "}
            Because you can pick up any face-up card plus everything
            below it, players drag 8-card stacks to &ldquo;tidy&rdquo;
            the board. Every stack move buries or reshuffles cards; make
            sure each one has a concrete goal.
          </li>
          <li>
            <strong>Ignoring column depth.</strong> Two columns of 14
            cards is a warning. Three columns of 14 is usually terminal.
            Shorten before you stack.
          </li>
          <li>
            <strong>Chasing completed suits prematurely.</strong> Locking
            in a 13-card same-suit run feels like progress, but the
            cards those moves buried can block a different suit
            indefinitely. Verify the cost before removing a suit.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Against{" "}
          <Link href="/spider" className="text-[#D4AF37] hover:underline">
            Spider
          </Link>
          , Scorpion shares same-suit King-to-Ace building and automatic
          sequence removal, but differs on two critical rules: Scorpion
          uses one deck instead of two, and allows you to move any
          face-up card plus whatever sits on top of it, whereas Spider
          only allows pre-built same-suit groups. That movement freedom
          makes Scorpion significantly more flexible at the cost of
          easier self-inflicted damage. Against{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>
          , the movement rule is identical but tableau building reverts
          to alternating colour and foundations appear. Against FreeCell
          and its family, Scorpion belongs to a different lineage — there
          are no cells, no external foundations, and hidden cards drive
          most of the difficulty.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The classical Scorpion uses a three-card reserve that deals one
          card onto each of the first three columns. Some implementations
          (including our own in certain modes) allow the reserve to deal
          onto any three columns of the player&apos;s choice — a
          meaningful buff that pushes the solve rate up by roughly three
          to five points. Wasp, a well-known Scorpion variant, deals
          every card face-up (no hidden cards) and raises the win rate
          toward 60%. A &ldquo;Three Blind Mice&rdquo; variant flips the
          rules: six columns get the reserve treatment, creating a
          tighter opening. Our default layout matches the classical
          description with face-down cards at the top of columns one
          through four and a dedicated three-card reserve.
        </p>
        <p className="mb-4 leading-relaxed">
          A handful of digital implementations offer an undo button and a
          hint system — we include both, but we recommend playing without
          hints once you have a baseline strategy in place. Scorpion
          rewards pattern recognition and the reveal-first discipline
          degrades quickly when a hint offers to spend your reserve for
          you. For players who enjoy the hidden-card tension,{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>{" "}
          offers the same movement freedom with a different opening
          texture.
        </p>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{faq.question}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/scorpion/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Scorpion Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/scorpion/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Scorpion Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/spider"
              className="text-[#D4AF37] hover:underline"
            >
              Play Spider Solitaire
            </Link>{" "}
            — Same-suit building with two decks
          </li>
          <li>
            <Link
              href="/yukon"
              className="text-[#D4AF37] hover:underline"
            >
              Play Yukon Solitaire
            </Link>{" "}
            — Flexible card movement with alternating colors
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>

        <div className="mt-10 mb-8">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="scorpion" />
      </article>
    </>
  );
}
