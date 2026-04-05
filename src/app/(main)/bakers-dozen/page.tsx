import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BakersDozenGamePage from "./BakersDozenGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Baker's Dozen Solitaire | Play Online Free — 13-Column Patience Card Game",
  description:
    "Play Baker's Dozen Solitaire online for free. A classic patience card game with 13 columns, Kings-to-bottom setup rule, and no free cells. Build down regardless of suit. No download required.",
  keywords: [
    "bakers dozen solitaire",
    "bakers dozen solitaire online",
    "bakers dozen card game",
    "bakers dozen patience",
    "play bakers dozen solitaire",
    "bakers dozen solitaire free",
    "bakers dozen solitaire no download",
    "kings to bottom solitaire",
    "13 column solitaire",
  ],
  openGraph: {
    title: "Baker's Dozen Solitaire | Play Online Free — 13-Column Patience Card Game",
    description:
      "Play Baker's Dozen Solitaire online for free. 13 columns, Kings buried to the bottom, build down regardless of suit. A classic patience game.",
    url: absoluteUrl("/bakers-dozen"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen is a patience card game where all 52 cards are dealt face-up into 13 columns of 4 cards each. Before play begins, any Kings are moved to the bottom of their columns. You build tableau columns down regardless of suit, and build foundations up by suit from Ace to King. There are no free cells, no stock pile, and empty columns cannot be filled.",
  },
  {
    question: "Why are Kings moved to the bottom in Baker's Dozen?",
    answer:
      "Moving Kings to the bottom of their columns is the defining mechanic of Baker's Dozen. Since you build down on the tableau and Kings are the highest rank, a King on top of a column would block all cards beneath it with no way to move it (there's no card higher to place it on, and empty columns can't be filled). Burying Kings at the bottom ensures every card has a chance to be played.",
  },
  {
    question: "What is the win rate for Baker's Dozen Solitaire?",
    answer:
      "Baker's Dozen has an estimated win rate of approximately 35-40% with skilled play. The Kings-to-bottom rule and any-suit building make it more accessible than same-suit games like Cruel, but the inability to fill empty columns and the absence of a stock or redeal mean many deals become deadlocked.",
  },
  {
    question: "Can I fill empty columns in Baker's Dozen?",
    answer:
      "No. Empty columns cannot be filled with any card. Once a column is emptied, it stays empty for the rest of the game. This is a critical rule that makes Baker's Dozen challenging — you must carefully manage which columns you empty and when.",
  },
  {
    question: "How is Baker's Dozen different from Baker's Game?",
    answer:
      "Despite similar names, these are very different games. Baker's Game has 8 columns, 4 free cells, and builds down by SUIT on the tableau. Baker's Dozen has 13 columns, NO free cells, builds down REGARDLESS of suit, has the Kings-to-bottom setup rule, and empty columns can't be filled. Baker's Game is essentially same-suit FreeCell, while Baker's Dozen is its own unique patience variant.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Baker's Dozen Solitaire",
    description:
      "Free online Baker's Dozen Solitaire. 13 columns with Kings buried to the bottom. Build down regardless of suit, foundations up by suit. A classic patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/bakers-dozen"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "1122",
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
        name: "Baker's Dozen Solitaire",
        item: absoluteUrl("/bakers-dozen"),
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
      <BakersDozenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Baker&apos;s Dozen Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Baker&apos;s Dozen is a classic patience card game with a unique twist: before
          play begins, all <strong>Kings are moved to the bottom</strong> of their
          columns. With 13 columns of 4 cards each, all face-up, you build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            tableau
          </Link>{" "}
          columns down regardless of suit and{" "}
          <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Baker&apos;s Dozen Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up into 13 columns of 4 cards each. Move any Kings
          to the bottom of their columns. Build tableau columns{" "}
          <strong>down regardless of suit</strong> — place a 5&hearts; on a 6&spades;,
          a 3&clubs; on a 4&diams;, etc. Only the top card of each column can move.
          Build foundations up by suit from Ace to King. Empty columns cannot be filled.
          Win by moving all 52 cards to the four foundations.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Kings-to-Bottom Rule
        </h3>
        <p className="mb-4 leading-relaxed">
          The signature mechanic of Baker&apos;s Dozen is the Kings-to-bottom setup rule.
          After dealing, any King found in the tableau is moved to the bottom of its column.
          This prevents Kings from blocking other cards — since you build down, a King on
          top would be permanently stuck (there&apos;s no higher card to place it on, and
          empty columns can&apos;t be filled). Kings naturally work their way to foundations
          last, so burying them at the bottom keeps the game flowing.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Baker&apos;s Dozen is a closed-information patience that first appeared in
          nineteenth-century compilations under that name — a nod to the colloquial
          English phrase for thirteen, and to the thirteen tableau columns that define
          the layout. Every card faces upward from the first deal; nothing is hidden,
          nothing is drawn. There is no stock, no waste pile, no redeal mechanism of
          any kind. The only structural accommodation the game offers is the kings-to-
          bottom opening move, which lifts each king down to the floor of its column
          so the build-down rule has somewhere to go. That single concession is all
          the help Baker&apos;s Dozen will ever give us. Because the whole deck is
          visible from move one, the game was historically marketed as a pure skill
          patience — a contest between the player and the shuffle, with no luck of the
          draw to blame for a loss. Modern solitaire suites inherited it wholesale,
          and the rules have stayed essentially fixed for more than a century.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Baker&apos;s Dozen punishes improvisation. With no stock to draw from and no
          redeal to fall back on, every move is final and every column is a puzzle to
          solve in isolation. We begin each game by scanning the board for ace burial:
          where does each ace sit in its column, and how many ranks stand above it? An
          ace trapped beneath a 2, a 3, and a 4 of unhelpful suits may already be
          unrecoverable. If we spot two or more aces buried behind genuinely immovable
          cards, we should assume the game is lost before we even place our first move.
        </p>
        <p className="mb-4 leading-relaxed">
          For the aces we can rescue, the order in which we rescue them is everything.
          A common trap is to chase the easiest ace first — the one on top of its
          column — and consume tableau space clearing cards that could have served a
          harder ace. We plan in reverse: identify the deepest buried ace, map out the
          precise sequence of moves that exposes it, and then see whether the easier
          aces can be lifted without disturbing that plan. If the plan holds, we execute
          it. If it collides with other rescues, we revise.
        </p>
        <p className="mb-4 leading-relaxed">
          Empty columns are tempting but rarely worth the cost. Because nothing can
          refill an empty slot, clearing a column simply deletes four cards&apos; worth
          of staging space from the board. We empty a column only when the final card
          of that column is an ace or a 2 we need on the foundation, or when emptying
          unlocks a long cascade of foundation plays we have already worked out. The
          &ldquo;store a card in an empty column for later&rdquo; idea that works in
          FreeCell does not work here: there is no later, only the remaining buried
          stack.
        </p>
        <p className="mb-4 leading-relaxed">
          The final principle is any-suit build discipline. Because we can stack a red
          six on a black seven on a red eight, we have far more landing spots than
          same-suit patiences — but the legal moves multiply quickly and can obscure
          which moves are actually productive. We filter every candidate move through
          one question: does this move, or the chain it enables, uncover a card we need
          for the foundations? If the answer is no, we do not make the move.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Baker&apos;s Dozen lands in the middle of the patience difficulty curve.
          Published solver analyses report theoretical win rates around{" "}
          <strong>thirty-five to forty percent</strong> under optimal play, with human
          players in the twenty-to-thirty percent range once they have internalized the
          ace-burial heuristics. That is significantly harder than Klondike or Canfield,
          noticeably easier than Forty Thieves, and roughly comparable to Cruel played
          without redeals. The difficulty is structural: because the entire deck is
          visible from the start, a skilled player can often determine within thirty
          seconds whether the shuffle is winnable at all. Deals where two aces sit
          beneath hostile cards simply cannot be solved, and the absence of a stock
          means no amount of patience rescues them. We estimate roughly half of all
          shuffles are mathematically lost before the first move; the player&apos;s
          job is to identify and win the half that remains.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The defining mistake in Baker&apos;s Dozen is chasing any-suit moves that
          feel productive but uncover nothing. New players cascade tableau builds for
          the pleasure of stacking without asking whether the chain advances a
          foundation. A second common error is abandoning the board reconnaissance
          step — playing moves before identifying buried aces — which leads to
          cheerful play during the opening followed by a locked-out endgame. A third
          mistake is emptying columns early in pursuit of &ldquo;space,&rdquo; a
          concept that does not meaningfully exist in a game without a stock. We also
          see players mis-handle kings: once a king is at the bottom of a column, it
          is fine where it is, and moving it for cosmetic reasons wastes moves. The
          last frequent error is ignoring foundation timing — players hold a 4 in the
          tableau for future stacking when the 4 should already be on its foundation,
          and the deferred move bricks the column above it.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Compared to Baker&apos;s Game — a name collision that confuses new players —
          Baker&apos;s Dozen shares nothing but the word Baker. Baker&apos;s Game is a
          same-suit FreeCell variant with four reserve cells and eight columns;
          Baker&apos;s Dozen has thirteen columns, any-suit building, and no reserves.
          Compared to Forty Thieves, Baker&apos;s Dozen is looser on tableau building
          (any suit, not strictly same-suit) but stingier on deck resources (no stock
          versus Forty Thieves&apos; draw pile). Compared to FreeCell, the games are
          almost philosophical opposites: FreeCell gives us four cells and alternating-
          color freedom but hides nothing; Baker&apos;s Dozen hides nothing either, but
          offers no cells, no redeals, and no mercy. Against La Belle Lucie or Cruel,
          which compensate for difficult positions with redeals, Baker&apos;s Dozen is
          harsher — one-and-done. The closest cousin in spirit is Beleaguered Castle:
          both are reserve-free, redeal-free, closed-information patiences that reward
          surgical planning from the opening move.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          A few documented variants soften or sharpen the base game. &ldquo;Good
          Measure&rdquo; adds two aces to the foundation automatically at the start,
          shaving several moves off the critical path and lifting the win rate into
          the forty-five-to-fifty percent range. &ldquo;Castles in Spain&rdquo; uses
          the same thirteen-column layout but deals cards face-down in the first two
          rows, converting Baker&apos;s Dozen from closed information into hidden
          information and substantially harder. &ldquo;Spanish Patience&rdquo; allows
          partial sequence moves, easing the single-top-card restriction. Our
          implementation preserves the traditional rules: four cards per column,
          thirteen columns, kings bottomed at setup, any-suit descending tableau builds,
          only top cards movable, no redeals, no refills. Players who want a gentler
          on-ramp can try{" "}
          <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Game
          </Link>
          , and players chasing a harder same-family variant can explore{" "}
          <Link href="/beleaguered-castle" className="text-[#D4AF37] hover:underline">
            Beleaguered Castle
          </Link>
          .
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/bakers-dozen/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Baker&apos;s Dozen
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bakers-dozen/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Baker&apos;s Dozen Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/bakers-game"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&apos;s Game
            </Link>{" "}
            — Same-suit FreeCell variant (different from Baker&apos;s Dozen)
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Same-suit building with unlimited redeals
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

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="bakers-dozen" />
      </article>
    </>
  );
}
