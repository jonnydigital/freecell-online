import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import SeahavenGamePage from "./SeahavenGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Seahaven Towers Solitaire | Play Online Free — Strategic Card Game",
  description:
    "Play Seahaven Towers online for free. Build same-suit sequences from Ace to King using 10 tableau columns and 4 free cells. Single-card moves, Kings-only empty columns. No download required.",
  keywords: [
    "seahaven towers",
    "seahaven towers solitaire",
    "seahaven towers online",
    "seahaven towers card game",
    "seahaven towers free",
    "play seahaven towers",
    "seahaven solitaire no download",
  ],
  openGraph: {
    title: "Seahaven Towers Solitaire | Play Online Free — Strategic Card Game",
    description:
      "Play Seahaven Towers online for free. Build same-suit foundations from Ace to King. 10 columns, 4 free cells. No download required.",
    url: absoluteUrl("/seahaven"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Seahaven Towers?",
    answer:
      "Seahaven Towers is a strategic single-deck solitaire game played with 10 tableau columns of 5 cards each (50 cards face-up) plus 4 free cells, 2 of which start occupied by the remaining cards. The goal is to build four foundation piles from Ace to King by suit. Only single cards can be moved, and empty columns can only be filled with Kings.",
  },
  {
    question: "How is Seahaven Towers different from FreeCell?",
    answer:
      "While both games use free cells and foundations, Seahaven Towers requires same-suit descending stacking (not alternating colors), has 10 columns instead of 8, only allows single-card moves (no supermoves), and restricts empty columns to Kings only. It starts with 2 of 4 free cells already occupied, making the opening more constrained.",
  },
  {
    question: "What is the win rate for Seahaven Towers?",
    answer:
      "Seahaven Towers has an estimated win rate of around 85-90% with expert play. The combination of 4 free cells and 10 columns provides significant maneuverability, but the same-suit stacking and Kings-only empty column rules create challenging decision points.",
  },
  {
    question: "Can you move groups of cards in Seahaven Towers?",
    answer:
      "No. Seahaven Towers only allows single-card moves — you cannot move sequences or groups of cards at once. This is a key difference from FreeCell, which allows supermoves (moving multiple cards using empty cells and columns as intermediate storage). Every move in Seahaven must be planned one card at a time.",
  },
  {
    question: "What can fill an empty column in Seahaven Towers?",
    answer:
      "Only Kings can be placed in empty tableau columns. This restriction makes empty columns both powerful and precious — you need to plan carefully before creating them and ensure you have a King ready to take advantage of the space.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Seahaven Towers Solitaire",
    description:
      "Free online Seahaven Towers Solitaire. Build same-suit foundations from Ace to King using 10 columns and 4 free cells.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/seahaven"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
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
        name: "Seahaven Towers",
        item: absoluteUrl("/seahaven"),
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
      <SeahavenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Seahaven Towers Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Seahaven Towers is a strategic single-deck solitaire game that blends the
          free cell mechanics of{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          with the same-suit building of{" "}
          <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Game
          </Link>
          . With 10 columns, 4 free cells, and single-card moves only, it demands
          precise planning and careful use of temporary storage.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Seahaven Towers Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 50 cards face-up across 10 columns of 5. The remaining 2 cards go
          to the first two of four free cells. Build four foundation piles from
          Ace to King, one per suit. Tableau stacking is{" "}
          <strong>same-suit descending</strong> — place a 9 of Hearts on a 10 of
          Hearts. Only single cards can be moved, and empty columns accept{" "}
          <strong>Kings only</strong>.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          Seahaven Towers sits at a unique intersection: it has the temporary
          storage of FreeCell but the strict same-suit requirement of Baker&apos;s Game.
          The single-card-only rule means you must manually orchestrate every
          step of a multi-card sequence transfer, making each free cell and empty
          column critically important. The 10-column layout gives you more room
          to maneuver than FreeCell&apos;s 8 columns, but 2 pre-occupied free cells
          tighten the opening.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Seahaven Towers was designed in 1991 by Art Cabral as a variant
          in the macOS classic solitaire compilation distributed with
          Solitaire Till Dawn. That origin makes it one of the youngest
          members of the FreeCell family, and also one of the most
          carefully engineered: Cabral intentionally tightened several
          FreeCell rules to land on a board that is more demanding
          without sliding into unfair territory. It shares the four
          free-cell layout of{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          and the same-suit building of{" "}
          <Link
            href="/bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&apos;s Game
          </Link>
          , but layers on a signature constraint: only <strong>Kings can
          be placed on empty tableau columns</strong>. Two of the four
          cells also start pre-occupied by leftover deal cards. The
          combined effect is a FreeCell cousin that looks similar at a
          glance but plays with considerably less room to improvise.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The kings-only-on-empty rule is the constraint every Seahaven
          decision eventually bumps into. Empty columns are as precious
          as in any FreeCell-family game, but here they only help us if
          we have a King ready to occupy them. Planning King placement is
          therefore a first-move concern. We scan for each of the four
          Kings at the start, identify which columns hold them and how
          deeply they are buried, and decide in advance which two Kings
          we will prioritise surfacing. A deal with two Kings already
          near their column tops is an easier deal than one with all
          four buried.
        </p>
        <p className="mb-4 leading-relaxed">
          Suit-matching foundations mean sequential extraction per suit.
          Like Baker&apos;s Game and Eight Off, we cannot park an
          off-suit card on a foundation for tempo. That forces each
          suit&apos;s Ace-through-King climb to happen in strict order,
          and a buried low card becomes a structural problem rather than
          a minor inconvenience. The ten-column layout (50 cards dealt,
          five per column) gives us more columns than FreeCell but
          shallower stacks, which helps surface low cards earlier. Our
          rule of thumb: identify the suit whose 2 through 5 are closest
          to column surfaces and build that suit first.
        </p>
        <p className="mb-4 leading-relaxed">
          Because Seahaven only allows single-card moves (no supermoves),
          every multi-card shuffle costs time. We plan cell sequences
          carefully: if we need to move four cards off a column, we ask
          whether all four will find landing spots on the tableau after
          the move, or whether two will return to cells. If the answer is
          &ldquo;return to cells,&rdquo; the shuffle is probably not
          worth it. See our full{" "}
          <Link
            href="/freecell-variants"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell variants
          </Link>{" "}
          overview for how Seahaven compares to its siblings.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Seahaven Towers lands at roughly{" "}
          <strong>70% solvable</strong> with expert play — harder than
          Eight Off, slightly easier than Baker&apos;s Game in practice
          (the extra tableau columns compensate for the kings-only rule),
          and well below standard FreeCell&apos;s near-perfect solve
          rate. The 70% ceiling comes from the combined constraints:
          same-suit foundations, kings-only empty columns, single-card
          moves, and two pre-occupied cells at deal time.
        </p>
        <p className="mb-4 leading-relaxed">
          In practice, player win rates cluster lower. New Seahaven
          players typically land around 35 to 45%, climbing to the mid-60s
          after a week of focused play. The gap is almost entirely about
          King planning. Players who treat Kings as incidental lose deals
          they could win; players who pre-select target Kings in the
          first three moves close the gap with the 70% theoretical
          ceiling within a few dozen hands.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <ul className="mb-4 leading-relaxed list-disc list-inside space-y-2">
          <li>
            <strong>Treating empty columns like FreeCell wildcards.</strong>
            An empty column you cannot fill with a King is dead space.
            Verify King access before you celebrate clearing a column.
          </li>
          <li>
            <strong>Spraying cells on non-essential cards.</strong> With
            two cells already occupied at deal time and no supermoves,
            the effective working capacity is just two. Park deliberately.
          </li>
          <li>
            <strong>Ignoring the two pre-occupied cells.</strong> Those
            starting cards are often key. We audit them in the first two
            moves and play whichever have immediate legal destinations.
          </li>
          <li>
            <strong>Building long tableau runs before suit planning.</strong>
            Constructing a beautiful 9-through-4 same-suit descent feels
            productive, but if the 2 and 3 of that suit are buried
            under a King stack elsewhere, the run is decorative.
          </li>
          <li>
            <strong>Moving single cards for aesthetics.</strong> Every
            move costs a click and sometimes a cell. If a move does not
            advance a suit or reveal a target card, defer it.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Against{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , the critical rule changes are same-suit tableau building
          (instead of alternating colour), same-suit foundations, and
          the kings-only rule for empty columns. Seahaven also deals
          across ten columns rather than eight, and starts with two
          cells pre-occupied. Against{" "}
          <Link
            href="/bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&apos;s Game
          </Link>
          , it shares same-suit building but adds the kings-only empty
          column rule and changes the column layout — Baker&apos;s Game
          uses FreeCell&apos;s 8-column deal. Against{" "}
          <Link href="/eight-off" className="text-[#D4AF37] hover:underline">
            Eight Off
          </Link>
          , Seahaven provides fewer cells (four vs. eight) but gains
          extra tableau columns. Within{" "}
          <Link
            href="/freecell-variants"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell variants
          </Link>
          , Seahaven is the strictest widely-played cousin in this
          branch.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Cabral&apos;s original specification is the canonical ruleset:
          four cells with two pre-occupied, ten columns of five,
          kings-only on empty columns, same-suit foundations, and
          single-card moves only. Some modern implementations offer a
          supermove shortcut (automating what would otherwise be a
          tedious multi-step single-card sequence); our default disables
          it to preserve the intended texture. A common house rule
          permits any card on empty columns, which lifts the solve rate
          closer to 90% but erases the game&apos;s signature constraint.
          No redeal is offered — Seahaven is a single-deal puzzle. For a
          much more forgiving FreeCell relative, see{" "}
          <Link
            href="/easy-freecell"
            className="text-[#D4AF37] hover:underline"
          >
            Easy FreeCell
          </Link>
          .
        </p>
        <p className="mb-4 leading-relaxed">
          A few implementations number the cells left to right and
          auto-deal cards into specific positions; Cabral&apos;s original
          used the leftmost two cells for the two pre-occupied cards, a
          convention our version preserves. Players who enjoy Seahaven
          often graduate to it from Eight Off after running their win
          rate above 90% there. The reverse path — jumping from standard
          FreeCell straight into Seahaven — typically produces a
          frustrating first week because the habits that reward standard
          FreeCell (promiscuous cell use, colour-based tableau building)
          actively hurt Seahaven performance. We recommend the Eight Off
          intermediate step unless you already play Baker&apos;s Game
          comfortably. Players curious about the other end of the family
          spectrum should also try the{" "}
          <Link
            href="/freecell-vs-bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell vs Baker&apos;s Game
          </Link>{" "}
          comparison to understand how the same-suit rule interacts with
          cell count and tableau geometry.
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
              href="/seahaven/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Seahaven Towers
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/seahaven/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Seahaven Towers Strategy Guide
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
            — Same-suit stacking with FreeCell layout
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

        <div className="mt-10 mb-8">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <MoreGames currentSlug="seahaven" />
      </article>
    </>
  );
}
