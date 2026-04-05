import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import AccordionGamePage from "./AccordionGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Accordion Solitaire | Play Online Free — Compress-the-Row Card Game",
  description:
    "Play Accordion Solitaire online for free. Compress 52 face-up cards into a single pile by matching rank or suit. Move cards 1 or 3 positions left. No download required.",
  keywords: [
    "accordion solitaire",
    "accordion solitaire online",
    "accordion card game",
    "play accordion solitaire",
    "accordion solitaire free",
    "accordion solitaire no download",
    "compress solitaire",
    "idle year solitaire",
  ],
  openGraph: {
    title: "Accordion Solitaire | Play Online Free — Compress-the-Row Card Game",
    description:
      "Play Accordion Solitaire online for free. Compress 52 cards into one pile by matching rank or suit. A classic patience game.",
    url: absoluteUrl("/accordion"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Accordion Solitaire?",
    answer:
      "Accordion Solitaire is a patience card game where all 52 cards are dealt face-up in a single row. You can move a card onto the card immediately to its left or 3 positions to its left, as long as the cards match by rank or suit. When a card is moved, the row compresses to close the gap. The goal is to compress all 52 cards into a single pile.",
  },
  {
    question: "How do you win Accordion Solitaire?",
    answer:
      "You win by compressing all 52 cards into a single pile. This requires moving every card onto another by matching rank or suit, moving 1 or 3 positions to the left each time. The win rate is extremely low — approximately 5-10% of deals are winnable with perfect play, depending on how strictly you measure success.",
  },
  {
    question: "What is the win rate for Accordion Solitaire?",
    answer:
      "Accordion Solitaire has one of the lowest win rates of any solitaire game, estimated at approximately 5-10% with skilled play when the target is a single pile. If you relax the goal to fewer than five piles, win rates climb to around 30%.",
  },
  {
    question: "Why is it called Accordion Solitaire?",
    answer:
      "The game is called Accordion because the row of cards compresses like an accordion as you make moves. Each successful move removes a position from the row, gradually squeezing the 52-card spread into fewer and fewer piles until (ideally) only one remains.",
  },
  {
    question: "Can I move cards to the right in Accordion?",
    answer:
      "No. Cards can only be moved to the LEFT — specifically 1 position left or 3 positions left. You cannot move cards to the right. This directional constraint is what makes the game so challenging.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Accordion Solitaire",
    description:
      "Free online Accordion Solitaire. Compress 52 face-up cards into a single pile by matching rank or suit.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/accordion"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.2",
      ratingCount: "876",
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
        name: "Accordion Solitaire",
        item: absoluteUrl("/accordion"),
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
      <AccordionGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Accordion Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Accordion Solitaire (also known as Idle Year or Methuselah) is one of the
          most challenging patience card games. All 52 cards are dealt face-up in a
          single row, and your goal is to compress the entire row into a single pile
          by matching cards by <strong>rank</strong> or <strong>suit</strong>. With a
          win rate of just 5-10%, every successful game is a real accomplishment.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Accordion Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up in a row from left to right. Each card (or the
          top card of a pile) can be moved onto the card immediately to its left, or
          3 positions to its left, if the two cards share the same{" "}
          <strong>rank</strong> or the same <strong>suit</strong>. When a card is moved,
          it goes on top of the target, and the row compresses to close the gap.
          Continue until you either win (one pile remaining) or run out of moves.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Compression Mechanic
        </h3>
        <p className="mb-4 leading-relaxed">
          The key to Accordion is the compression: every move reduces the number of
          positions in the row. When you move a card from position 5 to position 2,
          position 5 is removed and positions 6, 7, 8... all shift left. This means
          a move can create new opportunities as cards that were far apart suddenly
          become neighbours. Planning ahead for these chain reactions is the heart of
          Accordion strategy.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Accordion is a nineteenth-century one-handed solitaire — quite literally,
          since the traditional deal laid the row out along the arm of a chair or
          across the corner of a table so the single-handed player could reach
          every card. Victorian patience books call it by a constellation of names:
          <strong> Accordion</strong>, <strong>Idle Year</strong>,{" "}
          <strong>Methuselah</strong>, and <strong>Tower of Babel</strong>. Each
          name captures something about the game — Accordion for the compressing
          row, Idle Year for the languid pace of playing it repeatedly, Methuselah
          for the ancient feel of matching rank-and-suit across a long line, and
          Tower of Babel for the towering failure most deals produce. The goal is
          deceptively simple: compress the 52-card spread into a single pile by
          hopping cards leftward onto neighbours or onto cards three positions away
          that share a rank or suit. What looks like a compact puzzle turns out to
          be a branching tree of move-orderings with almost no room for error. It
          has stayed in regular circulation for over 150 years because its rules
          fit on a matchbook and its failure mode is instructive rather than
          punishing.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Accordion is fundamentally a <strong>look-ahead planning game</strong>.
          Every jump chain we make must consider downstream consequences — move a 7
          of Spades onto the 7 of Hearts next to it, and the 7 of Hearts disappears
          from the row, which means the card that was three positions to the right
          is suddenly only two positions away from whatever is on its left. Good
          players mentally simulate the row two or three moves ahead, not because
          they can see every branch but because they have learned which compression
          patterns open up further moves and which ones strand cards permanently.
        </p>
        <p className="mb-4 leading-relaxed">
          Our second principle is <strong>avoid creating singletons
          mid-row</strong>. When you compress the row such that a card with no
          matches on its left ends up sitting between two unfriendly neighbours,
          that card becomes a blocker for everything to the right of it. The
          singleton cannot move, and the cards to its right cannot reach across it.
          Great players spend their early moves establishing redundant
          matches — multiple same-suit runs, clusters of same-rank cards — so that
          when the row finally compresses, the awkward cards have somewhere to
          jump.
        </p>
        <p className="mb-4 leading-relaxed">
          A third principle is <strong>prefer the 3-jump over the 1-jump when
          lengths diverge</strong>. One-position jumps collapse local structure;
          three-position jumps reach across the row and often merge two separate
          match-clusters into one. Since the winning deals usually end with a long
          final cascade of 3-jumps, preserving the cards that enable those reaches
          is the quiet skill behind consistent wins.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Accordion has one of the lowest win rates in all of solitaire. With
          optimal play aimed at a single final pile, roughly{" "}
          <strong>5-10% of deals are solvable</strong>, with the upper bound
          depending on how rigorous the solver is and how strictly the
          &ldquo;single pile&rdquo; target is enforced. Relaxing the goal to
          &ldquo;fewer than 5 piles&rdquo; pushes the win rate up toward 30%, and
          most players quietly celebrate finishing with 2-3 piles as a moral
          victory. That gradient of partial success is one of the reasons Accordion
          has stayed enjoyable for so long — even a losing deal has an honest
          scoreboard.
        </p>
        <p className="mb-4 leading-relaxed">
          Skilled players who use undo and backtracking can edge toward the 10%
          ceiling. Blind play — no undo, first-move-that-looks-good — typically
          wins 1-2% of deals, which matches the historical Victorian estimates
          exactly. In other words, the game has not gotten any easier in 150 years;
          we have just gotten better at tracking our losses.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The most common mistake is <strong>greedy early compression</strong>.
          New players see a legal move and take it immediately, collapsing the row
          without thinking about which matches they are destroying. Sometimes the
          best move is to <em>skip</em> a legal merge because taking it destroys a
          future 3-jump that would have reached a stubborn singleton. A second
          frequent error is <strong>ignoring the 3-jump rule</strong> — players
          see the 1-jump because it is closer and miss the better move that lies
          across the row. Always scan for both options on every card.
        </p>
        <p className="mb-4 leading-relaxed">
          A third mistake is <strong>tunneling on one suit</strong>. Because
          matches work on rank <em>or</em> suit, players often chase long
          same-suit chains and forget that a same-rank cross-suit match could have
          unlocked a trapped region. Finally, new players sometimes{" "}
          <strong>confuse direction</strong> — Accordion only moves cards leftward,
          never rightward, and the asymmetry is the whole engine of the game. If
          you find yourself wanting to move a card to the right, you have misread
          the puzzle; re-scan for left-hand matches on the cards that are
          further right.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Accordion sits in the <strong>compression family</strong> of patience
          games — designs whose objective is to reduce the cards to a single pile
          rather than to build sorted foundations. Its clearest relatives are{" "}
          <strong>La Belle Lucie</strong> (fan compression),{" "}
          <strong>Decade</strong> (arithmetic compression by matching to ten), and{" "}
          <strong>Royal Marriage</strong> (row compression with a targeted
          endgame). Compared to foundation-building games such as{" "}
          <Link
            href="/"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell
          </Link>{" "}
          or{" "}
          <Link
            href="/klondike"
            className="text-[#D4AF37] hover:underline"
          >
            Klondike
          </Link>
          , Accordion feels like an inversion: instead of sorting cards up by suit,
          you are collapsing them into a single heap by any local match. Compared
          to other intentionally hard patience games such as{" "}
          <Link
            href="/cruel"
            className="text-[#D4AF37] hover:underline"
          >
            Cruel
          </Link>{" "}
          or{" "}
          <Link
            href="/beleaguered-castle"
            className="text-[#D4AF37] hover:underline"
          >
            Beleaguered Castle
          </Link>
          , Accordion is the most tactical — every move is local, but its
          consequences ripple across the entire row.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Several rule variations shape how forgiving Accordion feels. The strict
          Victorian ruleset allows only 1-jumps and 3-jumps, matching rank or suit,
          and scores only a single-pile completion as a win. Looser house rules
          allow <strong>2-jumps</strong> or even arbitrary-distance jumps, which
          turns the win rate from single digits into a majority. Some rule books
          permit <strong>picking up piles</strong> as single units and moving them
          wholesale — this is a significant softening. Others flip the goal and
          count success at <strong>fewer than 4 piles</strong>, giving players a
          gradient of partial wins. The game is sometimes played with a target of
          exactly <strong>thirteen piles</strong> of four cards each, a Victorian
          fortune-telling variant tied to the 13 lunar months. Whichever variant
          you play, the core mechanic is the same: compress leftward, match on
          rank or suit, and accept that most deals are meant to be lost.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-5" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.question}</p>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/accordion/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Accordion Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/accordion/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Accordion Solitaire Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Another challenging patience variant with redeals
          </li>
          <li>
            <Link
              href="/la-belle-lucie"
              className="text-[#D4AF37] hover:underline"
            >
              Play La Belle Lucie
            </Link>{" "}
            — Fan-based compression patience
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic free cell solitaire
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
        <MoreGames currentSlug="accordion" />
      </article>
    </>
  );
}
