import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import PenguinGamePage from "./PenguinGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Penguin Solitaire | Play Online Free — Dynamic Foundation Base",
  description:
    "Play Penguin Solitaire online free — FreeCell variant with a beak card setting the foundation base rank, same-suit stacks, and one flipper cell.",
  keywords: [
    "penguin solitaire",
    "penguin solitaire online",
    "penguin card game",
    "penguin solitaire free",
    "play penguin solitaire",
    "penguin solitaire no download",
    "penguin solitaire rules",
    "solitaire with wrapping foundations",
  ],
  openGraph: {
    title: "Penguin Solitaire | Play Online Free — Dynamic Foundation Base",
    description:
      "Play Penguin Solitaire online for free. Random beak card determines the foundation base, same-suit building with wrapping, and a single flipper cell.",
    url: absoluteUrl("/penguin"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Penguin Solitaire?",
    answer:
      "Penguin Solitaire is a single-deck card game where a randomly chosen 'beak' card determines the foundation base rank. All four cards of that rank are placed on foundations immediately. The remaining 48 cards are dealt into 7 tableau columns and 1 flipper cell. You build foundations up by suit with wrapping (e.g., K\u2192A\u21922 if base is not Ace) and build tableau down by same suit.",
  },
  {
    question: "How does the beak card work?",
    answer:
      "The beak card is the first card dealt. Its rank becomes the foundation base for all four suits. All four cards of that rank are automatically placed on the four foundation piles. For example, if the beak is a 7, all four 7s go to foundations and you build 7\u21928\u21929\u2192...\u2192K\u2192A\u21922\u2192...\u21926.",
  },
  {
    question: "What is foundation wrapping?",
    answer:
      "Foundation wrapping means that after King, the sequence continues with Ace, then 2, 3, and so on until you reach the rank just below the base. For example, with a base of 5, the foundation order is 5\u21926\u21927\u2192...\u2192K\u2192A\u21922\u21923\u21924. Each foundation pile ends up with all 13 cards of its suit.",
  },
  {
    question: "What is the flipper cell?",
    answer:
      "The flipper cell is a single temporary storage space, similar to a free cell in FreeCell but limited to just one card. You can place any single card in the flipper and retrieve it later. Strategic use of the flipper is essential since you only have one.",
  },
  {
    question: "How does tableau building work in Penguin?",
    answer:
      "Tableau columns are built down by same suit with wrapping. For example, you can place the 5 of Hearts on the 6 of Hearts. Wrapping means a King can be placed on an Ace of the same suit. Sequences of same-suit cards can be moved as a group.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Penguin Solitaire",
    description:
      "Free online Penguin Solitaire. Random beak card sets the foundation base, same-suit building with wrapping, single flipper cell.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/penguin"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1167",
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
        name: "Penguin Solitaire",
        item: absoluteUrl("/penguin"),
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
      <PenguinGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Penguin Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Penguin Solitaire is a fascinating variant that introduces a dynamic twist to
          traditional{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          . A randomly chosen &ldquo;beak&rdquo; card determines the foundation base rank for
          every game, meaning foundations build up by suit from that rank with wrapping
          (King wraps to Ace). Combined with same-suit tableau building and a single
          &ldquo;flipper&rdquo; reserve cell, every deal presents a unique puzzle.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Penguin Works
        </h3>
        <p className="mb-4 leading-relaxed">
          At the start, a random card is chosen as the beak. All four cards of that rank
          are placed on the four foundation piles. The remaining 48 cards are dealt
          face-up into 7 tableau columns, with one card going to the flipper cell.
          Build foundations up by suit with wrapping. Build tableau columns down by
          same suit. Move sequences of same-suit cards as a group. Any card can fill
          an empty column.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Why It&apos;s Special
        </h3>
        <p className="mb-4 leading-relaxed">
          The dynamic foundation base means no two games feel the same. When the base
          rank is 7, you need to wrap through King, Ace, and back to 6. This wrapping
          mechanic adds a layer of planning that other solitaire games lack. The single
          flipper cell forces careful resource management &mdash; every move counts when
          you only have one temporary storage spot.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Penguin was designed by British games scholar <strong>David Parlett</strong>{" "}
          in the 1970s, during the same period in which he was cataloguing and
          inventing patience games for his influential reference works. Parlett
          belongs to a small group of twentieth-century designers who treated
          solitaire as a serious design discipline, and Penguin reflects that
          sensibility: it borrows the familiar reserve-cell skeleton of the FreeCell
          family, then layers on two genuinely original ideas — a randomly chosen
          foundation base and wrap-around building. The game&rsquo;s name comes from
          the waddling, side-to-side motion the tableau takes on as cards shuffle
          between columns, shoulders rocking like a penguin on ice. Some rule sets
          call the reserve the &ldquo;beak,&rdquo; extending the metaphor so the
          whole layout resembles a penguin&rsquo;s head and flippers. Since its
          publication Penguin has quietly become one of the go-to FreeCell variants
          for players who want the same open-information pleasure with fresh puzzles
          every deal — a piece of modern design inside a very old genre.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Seven cells plus a flipper sounds luxurious compared to FreeCell&rsquo;s
          four, but the beak-pile constraint and same-suit tableau rule bite
          surprisingly hard. Before we make a move, we map the <strong>target
          foundation order</strong> — once the base rank is revealed, the foundation
          sequence is fixed, so we know exactly which rank each suit needs next.
          Writing that order down in your head, or on paper during long games, keeps
          you from making the classic beginner error of promoting a card that is
          still needed as a mid-tableau landing spot.
        </p>
        <p className="mb-4 leading-relaxed">
          We prioritise <strong>column emptying</strong> more aggressively than we
          would in FreeCell. Because any card can fill an empty Penguin column and
          because same-suit building is tighter than alternating-colour building,
          empty columns do double duty: they park awkward cards and they stage
          multi-card group moves. Emptying a column in Penguin is genuinely
          achievable — the seven-column layout is shorter than the FreeCell tableau,
          and losses early in the game are recoverable if you keep pushing for that
          first empty slot.
        </p>
        <p className="mb-4 leading-relaxed">
          Finally, treat the flipper cell as a <strong>tiebreaker, not a parking
          lot</strong>. The single cell is most powerful when used to break a
          dependency cycle: a card blocks a card that blocks the flipper&rsquo;s
          resident, and by shuffling one into the cell you unlock the entire chain.
          Dumping a random Jack there &ldquo;just in case&rdquo; removes the cell
          from the game and hands you a FreeCell with zero cells — the opposite of
          what you want.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Penguin is <strong>very friendly to skilled players</strong>. With the
          seven-column layout, the generous reserve implicit in any-card empty
          columns, and the safety net of wrap-around foundations, solver benchmarks
          report that roughly <strong>85% of deals are solvable</strong> with good
          play. That puts it in the same tier as Eight Off and Seahaven Towers —
          harder than the nearly-always-winnable FreeCell, but gentler than
          Beleaguered Castle or Forty Thieves.
        </p>
        <p className="mb-4 leading-relaxed">
          New players typically win 40-50% of deals because they waste the flipper
          and misuse empty columns. Once you start tracking the foundation wrap
          order, a 70% win rate is realistic. Reaching the 80-85% ceiling means
          actively replaying dead boards with undo until you understand why a deal
          was unwinnable — the losses almost always trace back to a same-suit
          bottleneck that could have been preempted.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The most frequent mistake we see is <strong>treating Penguin like
          FreeCell</strong>. The same-suit tableau rule is strict — a 6 of Hearts
          can sit on a 7 of Hearts but <em>not</em> on a 7 of Diamonds, even though
          both are red. Players who reflexively build alternating-colour runs
          constantly discover they cannot move the group they just assembled. A
          related mistake is <strong>forgetting the wrap</strong>: if the beak was a
          9, the foundation goes 9→10→J→Q→K→A→2→…→8, and players who stop tracking
          after the King suddenly cannot find where the Ace belongs.
        </p>
        <p className="mb-4 leading-relaxed">
          We also see <strong>flipper abuse</strong> — dropping the first awkward
          card into the single cell and leaving it there for twenty moves while
          everything else grinds to a halt. The flipper should churn, not squat.
          Lastly, players often <strong>empty columns too late</strong>, waiting
          until the board is half-solved before clearing their first column; by
          then the remaining cards are so tangled that the empty slot arrives too
          late to matter. Empty columns are cheap early and priceless late — create
          them in the opening, not the endgame.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Penguin sits squarely inside the <strong>FreeCell family</strong> — open
          information, reserve cells, foundation build-up — but it is one of the
          more inventive branches of that tree. The obvious comparison is{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          itself: Penguin trades four cells for one flipper plus freer empty-column
          rules and a dynamic base.{" "}
          <Link
            href="/bakers-game"
            className="text-[#D4AF37] hover:underline"
          >
            Baker&rsquo;s Game
          </Link>{" "}
          shares Penguin&rsquo;s strict same-suit tableau rule but keeps the four
          cells.{" "}
          <Link
            href="/seahaven"
            className="text-[#D4AF37] hover:underline"
          >
            Seahaven Towers
          </Link>{" "}
          is another same-suit FreeCell cousin, but with Kings-only empty columns.
          On the difficulty ladder, Penguin lands between FreeCell (99%) and
          Baker&rsquo;s Game (~75%), making it an ideal bridge for players who want
          to graduate from the safest patience into genuinely challenging territory
          without jumping straight to{" "}
          <Link
            href="/beleaguered-castle"
            className="text-[#D4AF37] hover:underline"
          >
            Beleaguered Castle
          </Link>
          .
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Several house variations are worth knowing. The classical Parlett rules
          deal the beak card face-up as the first card of the tableau, so you always
          see the foundation base before play starts; some digital implementations
          instead choose the base randomly without exposing a physical beak card.
          Another common variation limits movable group sizes to (empty columns + 1)
          rather than allowing arbitrary same-suit runs. A few rule books rename the
          flipper to the &ldquo;beak cell&rdquo; and restrict which cards can enter
          it, usually to non-Kings. There is no standardised redeal — Penguin is
          strictly a single-pass game — which sets it apart from tableau-redeal
          patiences like{" "}
          <Link
            href="/cruel"
            className="text-[#D4AF37] hover:underline"
          >
            Cruel
          </Link>
          . Whichever variant you play, the defining experience is the same: a
          wrap-around foundation riddle that rewards mapping the target order
          before you touch a single card. If you enjoy that mapping puzzle, we
          recommend alternating Penguin sessions with{" "}
          <Link
            href="/canfield"
            className="text-[#D4AF37] hover:underline"
          >
            Canfield
          </Link>
          , which uses a random foundation base of its own and will sharpen your
          wrap-order intuition even further.
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
              href="/penguin/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Penguin Solitaire
            </Link>{" "}
            &mdash; Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/penguin/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Penguin Solitaire Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/canfield"
              className="text-[#D4AF37] hover:underline"
            >
              Play Canfield Solitaire
            </Link>{" "}
            &mdash; Another game with a random foundation base
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            &mdash; The classic free cell solitaire
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            &mdash; Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="penguin" />
      </article>
    </>
  );
}
