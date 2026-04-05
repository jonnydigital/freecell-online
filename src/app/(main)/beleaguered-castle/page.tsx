import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import BeleagueredCastleGamePage from "./BeleagueredCastleGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Beleaguered Castle Solitaire | Play Online Free — Zero Free Cells",
  description:
    "Play Beleaguered Castle solitaire online for free. A challenging FreeCell variant with zero free cells — aces start on foundations, 48 cards in 8 cascades. Build up by suit from Ace to King. No download required.",
  keywords: [
    "beleaguered castle",
    "beleaguered castle solitaire",
    "beleaguered castle online",
    "beleaguered castle card game",
    "beleaguered castle free",
    "play beleaguered castle",
    "beleaguered castle solitaire no download",
    "zero free cells solitaire",
  ],
  openGraph: {
    title: "Beleaguered Castle Solitaire | Play Online Free — Zero Free Cells",
    description:
      "Play Beleaguered Castle online for free. Zero free cells, aces pre-placed on foundations, build up by suit. One of the most challenging solitaire variants.",
    url: absoluteUrl("/beleaguered-castle"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Beleaguered Castle solitaire?",
    answer:
      "Beleaguered Castle is a challenging single-deck solitaire game where all four aces are pre-placed on foundations. The remaining 48 cards are dealt face-up into 8 cascades of 6 cards each. With zero free cells, you must build foundations from Ace to King by suit using only single-card moves and descending-rank tableau stacking.",
  },
  {
    question: "How is Beleaguered Castle different from FreeCell?",
    answer:
      "The biggest difference is that Beleaguered Castle has zero free cells — no temporary storage at all. Aces start on the foundations instead of being dealt into cascades. Tableau stacking is by descending rank regardless of suit (not alternating colors), and any card can fill an empty column (not just Kings). This makes it significantly harder than FreeCell.",
  },
  {
    question: "What is the win rate for Beleaguered Castle?",
    answer:
      "Beleaguered Castle has an estimated win rate of approximately 25-30% with expert play. The lack of free cells makes many deals unsolvable, making it one of the most challenging solitaire variants. Careful planning and empty column management are essential.",
  },
  {
    question: "Can any card fill an empty column in Beleaguered Castle?",
    answer:
      "Yes. Unlike FreeCell or Seahaven Towers where empty columns are restricted to Kings, Beleaguered Castle allows any card to be placed in an empty tableau column. This is critical for maneuverability since there are no free cells.",
  },
  {
    question: "Why are the aces pre-placed on foundations?",
    answer:
      "In Beleaguered Castle, all four aces are removed from the deck before dealing and placed directly on the four foundation piles. This gives you a head start on building foundations and compensates slightly for the lack of free cells. The remaining 48 cards are dealt evenly into 8 columns of 6.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Beleaguered Castle Solitaire",
    description:
      "Free online Beleaguered Castle Solitaire. Zero free cells, aces pre-placed on foundations, build up by suit from Ace to King.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/beleaguered-castle"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      ratingCount: "943",
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
        name: "Beleaguered Castle",
        item: absoluteUrl("/beleaguered-castle"),
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
      <BeleagueredCastleGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Beleaguered Castle Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Beleaguered Castle is one of the most challenging solitaire variants in the{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          family. With <strong>zero free cells</strong> and all cards dealt face-up,
          every move must be precisely calculated. The four aces start pre-placed on
          foundations, giving you a head start on the build-up, but the lack of temporary
          storage makes this a true test of strategic thinking.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Beleaguered Castle Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four foundation piles. Deal the
          remaining 48 cards face-up into 8 cascades of 6 cards each. Build foundations
          up by suit from Ace to King. Stack tableau cards in{" "}
          <strong>descending rank regardless of suit</strong> — place any 7 on any 8.
          Only single cards can be moved, and any card can fill an empty column.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Zero Free Cell Challenge
        </h3>
        <p className="mb-4 leading-relaxed">
          Without free cells, Beleaguered Castle demands masterful use of empty
          columns as your only form of temporary storage. Creating and preserving
          empty columns is the key strategic skill. The 25-30% win rate reflects the
          brutal difficulty — many deals are mathematically unsolvable, making each
          victory deeply satisfying.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Beleaguered Castle traces its roots to nineteenth-century Europe, when
          patience collections began cataloguing the open-information cascade family
          of solitaire games. Its most distinctive feature is the layout itself: four
          aces anchor the centre of the table while four cascades of six cards fan
          outward on each flank, creating the symmetrical silhouette of a fortified
          keep under siege. The visual metaphor gave the game its evocative name — the
          aces are the castle, the spreading rows are the attacking forces, and every
          completed foundation represents a successful parry. Some regional rule books
          list it under the alternate name <strong>Bayan</strong>, and it appears in
          nineteenth-century English and German compilations alongside other
          open-layout patiences. The game predates FreeCell by more than a century,
          making it one of the clearest ancestors of the zero-hidden-card family. Its
          endurance in modern collections speaks to how cleanly the symmetrical layout
          frames the central puzzle: you can see everything, yet the answer remains
          stubbornly hard to find.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Our guiding principle with Beleaguered Castle is simple: the aces are the
          anchor of the entire game, and we should never squander the foundations by
          pushing cards up that we still need to uncover blockers. Because there are
          no free cells, every empty tableau slot becomes the most valuable resource
          on the board — an empty column is literally our only piece of working
          storage, and preserving even one can be the difference between victory and a
          dead lock. We treat empty columns the way FreeCell players treat their
          reserve cells: use them, but always with an exit plan.
        </p>
        <p className="mb-4 leading-relaxed">
          We plan extraction by suit before making any major move. Since foundations
          build by suit but tableau stacks by rank alone, the same 7 can go on any 8,
          which looks permissive until we realise that covering an important card
          drains an empty column for no progress. The best players we have studied
          think of each suit as a separate extraction problem and ask: where is the
          lowest unplayed card of this suit, and what sits on top of it? Map those
          answers first and the sequence of moves almost writes itself.
        </p>
        <p className="mb-4 leading-relaxed">
          Finally, we pay close attention to deep blockers — aces that are no longer
          in the cascades, but Kings, Queens, and Jacks buried at the bottom of a
          six-card column. These cards have to come out last, so we work backward from
          them when sequencing moves. Compare this to{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          where four cells forgive a buried King; in Beleaguered Castle, a buried King
          can quietly kill the deal. Good play is backward planning made visible.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Beleaguered Castle sits in the &ldquo;hard&rdquo; tier of open-information
          patience games. Skilled players and solver benchmarks converge on a win rate
          of roughly <strong>25-30%</strong>, meaning that even with perfect play a
          sizeable share of deals are mathematically unsolvable. That is a sharp drop
          from FreeCell&rsquo;s 99%+ solvability and puts Beleaguered Castle closer to
          the difficulty tier occupied by games such as Forty Thieves and four-suit
          Spider. We want to be honest about this: the game rewards patience and
          discipline, but no amount of skill can rescue a deal where the blocker
          pattern was set at shuffle time.
        </p>
        <p className="mb-4 leading-relaxed">
          Beginners usually win 10-15% of deals because they collapse empty columns
          too early and waste foundation plays on cards they still needed as
          temporary parking spots. Intermediate players climb into the 20-25% range
          once they start treating empty columns as a scarce resource. Reaching 30%
          typically requires undo-backtracking discipline and the willingness to
          abandon dead deals rather than grind them out.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The single most common mistake we see is <strong>filling empty columns
          reflexively</strong>. A fresh empty column is worth more than almost any
          individual card move — dropping a random Queen into it just to clear a
          cascade usually destroys the only breathing room you had. A second mistake
          is <strong>over-eager foundation promotion</strong>: sending a 5 to the
          foundation when a 4 of the same suit is buried deep means that 5 is no
          longer available as a target to receive a 4, a 3, or a 2 during later
          unburying moves. In a game without free cells, every foundation move is
          also a lost tableau target.
        </p>
        <p className="mb-4 leading-relaxed">
          A third mistake is <strong>suit tunnel vision</strong>. Because tableau
          stacking ignores suit, players often forget that foundations do not — so
          they happily pile mixed-suit descending runs, then discover the 7 they need
          is trapped under a 6 of the wrong suit. Finally, new players often forget
          they can build <strong>downward from any rank</strong> regardless of colour
          and miss obvious temporary landing spots. If you find yourself staring at a
          &ldquo;stuck&rdquo; board, scan the tops of all eight cascades for same-rank
          descending options before declaring defeat.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Beleaguered Castle belongs to the <strong>open-information cascade
          family</strong> — games where every card is visible from the start and the
          only challenge is sequencing. Within that family it occupies the
          minimal-storage end of the spectrum. Compare it to{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , which gives you four cells and a 99%+ win rate; to{" "}
          <Link href="/seahaven" className="text-[#D4AF37] hover:underline">
            Seahaven Towers
          </Link>
          , which gives four cells plus same-suit stacking; to{" "}
          <Link
            href="/eight-off"
            className="text-[#D4AF37] hover:underline"
          >
            Eight Off
          </Link>
          , which goes the other direction with eight generous cells; and to{" "}
          <Link
            href="/bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&rsquo;s Game
          </Link>
          , FreeCell&rsquo;s same-suit sibling.
        </p>
        <p className="mb-4 leading-relaxed">
          On the difficulty scale, Beleaguered Castle sits above FreeCell, above
          Eight Off, and below Forty Thieves. Its closest cousin in feel is{" "}
          <Link
            href="/bakers-dozen"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&rsquo;s Dozen
          </Link>
          , another zero-cell open-layout game that trades the symmetrical castle
          shape for thirteen short columns. If you enjoy the puzzle-solving feel of
          FreeCell but want a sterner test, Beleaguered Castle is the natural next
          step.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Several close variants appear under different names in patience
          collections. <strong>Streets and Alleys</strong> is nearly identical but
          deals the cascades without pre-placing the aces — you have to uncover and
          promote them yourself, which nudges the win rate down a few points.{" "}
          <strong>Citadel</strong> lets you build foundations on the fly during the
          deal, which makes it notably easier. Some house rules allow multi-card
          moves in Beleaguered Castle as a supermove shortcut, mirroring FreeCell
          conventions; the classical rules only allow single-card moves. The game is
          also known as <strong>Bayan</strong> in several European collections, and
          occasionally as <strong>Laying Siege</strong>. Whichever ruleset you play,
          the core discipline is the same: protect your empty columns, plan
          foundation promotions carefully, and never assume a deal is winnable until
          you have verified the blocker pattern.
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
              href="/beleaguered-castle/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Beleaguered Castle
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/beleaguered-castle/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Beleaguered Castle Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/seahaven"
              className="text-[#D4AF37] hover:underline"
            >
              Play Seahaven Towers
            </Link>{" "}
            — Same-suit stacking with 4 free cells
          </li>
          <li>
            <Link
              href="/bakers-dozen"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&rsquo;s Dozen
            </Link>{" "}
            — Another zero-cell open-layout patience
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
        <MoreGames currentSlug="beleaguered-castle" />
      </article>
    </>
  );
}
