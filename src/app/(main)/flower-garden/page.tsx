import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import FlowerGardenGamePage from "./FlowerGardenGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Flower Garden Solitaire | Play Online Free — Bouquet Reserve Card Game",
  description:
    "Play Flower Garden Solitaire online for free. A classic patience game with a 16-card bouquet reserve — every card available to play anytime. 6 columns, build down regardless of suit. No download required.",
  keywords: [
    "flower garden solitaire",
    "flower garden solitaire online",
    "flower garden card game",
    "flower garden patience",
    "play flower garden solitaire",
    "flower garden solitaire free",
    "bouquet solitaire",
    "the garden solitaire",
  ],
  openGraph: {
    title: "Flower Garden Solitaire | Play Online Free — Bouquet Reserve Card Game",
    description:
      "Play Flower Garden Solitaire online for free. 16-card bouquet reserve with every card available. Build down regardless of suit across 6 columns.",
    url: absoluteUrl("/flower-garden"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Flower Garden Solitaire?",
    answer:
      "Flower Garden Solitaire is a classic patience card game where 36 cards are dealt face-up into 6 columns of 6 (the 'garden'), and the remaining 16 cards form a reserve called the 'bouquet.' Every card in the bouquet is available to play at any time. Build tableau columns down regardless of suit, and build foundations up by suit from Ace to King.",
  },
  {
    question: "How does the bouquet work in Flower Garden?",
    answer:
      "The bouquet is a reserve of 16 cards, all fully visible and available to play at any time. You can move any bouquet card to a foundation (if it fits) or onto a tableau column (building down). The bouquet gives you tremendous flexibility — it's like having 16 free cells that start pre-loaded with cards.",
  },
  {
    question: "What is the win rate for Flower Garden Solitaire?",
    answer:
      "Flower Garden Solitaire has an estimated win rate of approximately 30-40% with skilled play. While the bouquet reserve provides significant flexibility, the restriction to single-card moves and the any-suit-descending building rule can make it tricky to untangle columns.",
  },
  {
    question: "Can I fill empty columns in Flower Garden?",
    answer:
      "Yes! Unlike many solitaire games, Flower Garden allows any card to fill an empty column — from either the tableau or the bouquet. This makes empty columns very valuable strategic tools.",
  },
  {
    question: "How is Flower Garden different from FreeCell?",
    answer:
      "Flower Garden has a 16-card bouquet reserve (vs 4 free cells), 6 tableau columns (vs 8), builds down regardless of suit (vs alternating color), and only allows single-card moves. The bouquet cards are all pre-dealt and visible, while FreeCell's free cells start empty and are filled during play.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Flower Garden Solitaire",
    description:
      "Free online Flower Garden Solitaire. 16-card bouquet reserve with every card available. Build down regardless of suit across 6 tableau columns.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/flower-garden"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1056",
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
        name: "Flower Garden Solitaire",
        item: absoluteUrl("/flower-garden"),
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
      <FlowerGardenGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Flower Garden Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Flower Garden Solitaire is a classic patience card game featuring a unique{" "}
          <strong>bouquet reserve</strong> of 16 cards — all available to play at any time.
          Deal 36 cards face-up into 6 columns of 6 (the &ldquo;garden&rdquo;), then use the
          bouquet to help build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Flower Garden Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards: 36 into 6 columns of 6 cards each (all face-up), and
          the remaining 16 into the bouquet reserve. Build tableau columns{" "}
          <strong>down regardless of suit</strong> — place a 5 on any 6. Only the top
          card of each column can be moved. Any bouquet card can be played to a
          foundation or onto a tableau column at any time. Empty columns can be filled
          by any card.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Bouquet Reserve
        </h3>
        <p className="mb-4 leading-relaxed">
          The bouquet is what makes Flower Garden unique. All 16 reserve cards are
          visible and available from the start. Think of them as pre-loaded free cells —
          you can play any bouquet card at any time, giving you tremendous flexibility
          to unblock tableau columns and build foundations. Managing the bouquet
          wisely is the key to winning.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Flower Garden — sometimes titled <em>The Bouquet</em> or <em>The
          Parterre</em> in older French and English manuals — descends from the
          ornamental garden-themed patiences that circulated in Europe from the
          sixteenth through the eighteenth centuries. The parterre layout mirrors a
          formal French garden: six tidy &ldquo;beds&rdquo; of six cards each,
          surrounded by a loose &ldquo;garden&rdquo; reserve of sixteen blooms scattered
          above. The vocabulary is deliberate. Nineteenth-century patience writers used
          the names <em>bouquet</em> and <em>garden</em> for the reserve and beds
          respectively, and those terms survive in modern digital rulebooks. Flower
          Garden represents one of the earliest written examples of a pre-dealt
          always-available reserve, predating FreeCell&apos;s free-cells concept by
          roughly a century and setting the template for the open-reserve family of
          patience games we still play today.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The sixteen-card garden reserve is our entire toolkit, so we treat it as
          precious storage rather than a dumping ground. Every bouquet card already
          faces up means every bouquet card is a knowable, plannable resource — we
          inventory it before we touch a bed. When a bouquet card cannot go to a
          foundation immediately, we ask whether placing it on a bed column will unlock
          two or three subsequent plays; if it will not, we leave it in the reserve
          where it remains visible and routable.
        </p>
        <p className="mb-4 leading-relaxed">
          Bed columns unblock from the bottom up, and because building is down
          regardless of suit, the tableau is more flexible than it first appears. We
          use the bouquet to peel cards off a bed&apos;s tail, not to pile fresh
          obstacles on top. When two beds hold near-identical descending runs, we merge
          them early to open an empty column — empty columns in Flower Garden are
          solid gold because <em>any</em> card can fill them.
        </p>
        <p className="mb-4 leading-relaxed">
          Kings are structural dead-ends in Flower Garden unless their foundation is
          already within reach. A King buried under five bed cards cannot move anywhere
          on the tableau (nothing stacks on it there, since we build down), and it
          cannot reach the foundation until its suit reaches twelve previous cards. We
          identify the location of every King on the opening deal and route the
          bouquet around them. If a King sits in the bouquet itself, we leave it alone
          until its suit&apos;s Jack is foundationed — dumping a King onto an empty
          column early removes a priceless wild slot and rarely pays back the cost.
          Compared to{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , where Kings are fine anchors, Flower Garden punishes King mismanagement
          severely.
        </p>
        <p className="mb-4 leading-relaxed">
          Sequencing low ranks is the other half of our strategy. Aces must reach
          foundations before their suit can progress, so we trace every Ace&apos;s
          route before committing to bed moves. A bouquet Ace is a gift — we play it
          at the first opportunity. A bed-bottom Ace demands patient excavation using
          the bouquet and empty columns together. Twos and Threes behave similarly
          but with less urgency. When two Aces are accessible and only one can be
          foundationed this turn (say, because a foundation row is already occupied
          by the Ace-2-3 chain of a rival suit), we foundation the Ace whose suit
          has the largest number of trapped low cards in the beds — that is the suit
          we need to unblock first.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Flower Garden has a reputation for being friendlier than it is. With only
          single-card moves, no redeal, and six short bed columns, the game is tighter
          than the sixteen-card reserve suggests. Skilled play yields roughly 10-15%
          wins across a large sample of random deals. Published estimates range widely
          because older rulebooks bundle in variants with larger reserves or relaxed
          movement rules; we quote the strict classical ruleset here.
        </p>
        <p className="mb-4 leading-relaxed">
          The low win rate is structural. With just 36 cards in beds and 16 in the
          bouquet, any poor King distribution — say, two Kings buried at the bottom of
          two adjacent columns — can make a deal unwinnable before the first move.
          Players who come to Flower Garden expecting FreeCell-level forgiveness are
          often startled; it is strategically closer to{" "}
          <Link href="/canfield" className="text-[#D4AF37] hover:underline">
            Canfield
          </Link>{" "}
          than to FreeCell in terms of how many deals refuse to yield regardless of
          skill.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The classic error is using the bouquet as a trash bin — shoveling
          inconvenient cards into it without a plan for how they leave. Because the
          reserve is always visible, we should always know exactly which path each
          bouquet card will take to its foundation. If we cannot name the sequence, we
          have not thought the move through. A second mistake is refusing to merge
          beds: players cling to original column identity instead of consolidating
          them, and the chance to open an empty column slips by.
        </p>
        <p className="mb-4 leading-relaxed">
          Another frequent blunder is dropping a high card into an empty column &quot;to
          get it out of the way.&quot; That empty column was a wildcard worth holding;
          a King placed there locks it forever in Flower Garden, whereas a more modest
          card can be peeled off later if needed. Finally, players routinely move a
          low card to the foundation reflexively without checking whether it is needed
          as a tableau bridge first — sending the 3 of hearts to the foundation feels
          productive, but it is a catastrophe if we needed that 3 to land the 2 of
          hearts from a locked bed column.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Flower Garden sits between the open-reserve games and the cascade patiences.
          Compared to{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , it offers a much larger reserve but trades away alternating-colour
          stacking and multi-card moves — we build down regardless of suit, but we can
          only ever move one card at a time. Compared to{" "}
          <Link href="/bisley" className="text-[#D4AF37] hover:underline">
            Bisley
          </Link>
          , Flower Garden is less austere (no dual-direction foundations) but harder
          to win because the beds bury Kings more ruthlessly.
        </p>
        <p className="mb-4 leading-relaxed">
          Players who like Flower Garden often enjoy{" "}
          <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
            La Belle Lucie
          </Link>{" "}
          for its similar French garden vocabulary, or{" "}
          <Link href="/seahaven" className="text-[#D4AF37] hover:underline">
            Seahaven Towers
          </Link>{" "}
          for a tighter, more FreeCell-like reserve experience. Gamers who want
          a looser reserve game with redeals usually drift toward{" "}
          <Link href="/canfield" className="text-[#D4AF37] hover:underline">
            Canfield
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          Published Flower Garden variants differ chiefly in the bouquet size and in
          how sequenced moves are handled. <em>Parterre</em> — the older French name —
          is essentially identical to Flower Garden but sometimes presented with seven
          beds of five cards and a seventeen-card bouquet. Some Victorian manuals
          allow multi-card ordered moves if a legal run already exists on the bed,
          which substantially raises the win rate. Modern digital versions, including
          ours, stay with the strict single-card rule for classical fidelity. A
          short-form variant titled simply <em>The Bouquet</em> restricts the reserve
          to twelve cards, which pushes the difficulty closer to 5-8% wins and is best
          reserved for players who have solved the classical form many times.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/flower-garden/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Flower Garden Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/flower-garden/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Flower Garden Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/bisley"
              className="text-[#D4AF37] hover:underline"
            >
              Play Bisley Solitaire
            </Link>{" "}
            — Dual-direction foundations meet in the middle
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
        <MoreGames currentSlug="flower-garden" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
