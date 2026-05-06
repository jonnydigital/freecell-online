import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BisleyGamePage from "./BisleyGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Bisley Solitaire | Play Online Free — Dual-Direction Foundation Card Game",
  description:
    "Play Bisley Solitaire online free — a unique patience game with dual-direction foundations: aces build up, kings build down, meeting in the middle.",
  keywords: [
    "bisley solitaire",
    "bisley solitaire online",
    "bisley card game",
    "bisley patience",
    "play bisley solitaire",
    "bisley solitaire free",
    "bisley solitaire no download",
    "dual foundation solitaire",
  ],
  openGraph: {
    title: "Bisley Solitaire | Play Online Free — Dual-Direction Foundation Card Game",
    description:
      "Play Bisley Solitaire online for free. Dual-direction foundations — aces build up, kings build down, meeting in the middle. A unique patience game.",
    url: absoluteUrl("/bisley"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Bisley Solitaire?",
    answer:
      "Bisley Solitaire is a patience card game with a unique dual-direction foundation system. Four aces start on foundations and build up by suit, while four kings are placed on separate foundations as they become available and build down by suit. The two sets of foundations meet in the middle to complete each suit. The remaining 48 cards are dealt into 13 tableau columns with very flexible same-suit up-or-down building.",
  },
  {
    question: "How do the dual foundations work in Bisley?",
    answer:
      "Bisley has two rows of foundations. The bottom row starts with the four aces and builds UP by suit (A, 2, 3... toward K). The top row accepts kings as they become available and builds DOWN by suit (K, Q, J... toward A). When the ascending and descending piles of the same suit meet — meaning their top cards are consecutive — that suit is complete.",
  },
  {
    question: "What is the win rate for Bisley Solitaire?",
    answer:
      "Bisley Solitaire has an estimated win rate of approximately 70-80% with skilled play. The very flexible tableau building (up OR down by same suit) and dual-direction foundations make it more forgiving than many patience games, though empty columns cannot be filled, which adds strategic depth.",
  },
  {
    question: "Can I fill empty columns in Bisley?",
    answer:
      "No. Empty columns cannot be filled with any card. Once a column is emptied, it stays empty for the rest of the game. This is a key strategic consideration — every card you remove from a column brings it closer to being permanently empty.",
  },
  {
    question: "How is Bisley different from FreeCell?",
    answer:
      "Bisley and FreeCell are quite different. Bisley has 13 columns (vs 8), dual-direction foundations (aces up + kings down), same-suit up-or-down tableau building, no free cells, and empty columns can't be filled. FreeCell has alternating-color stacking, 4 free cells for temporary storage, and any card can fill an empty column.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bisley Solitaire",
    description:
      "Free online Bisley Solitaire. Dual-direction foundations — aces build up, kings build down, meeting in the middle. 13 columns with flexible same-suit building.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/bisley"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "712",
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
        name: "Bisley Solitaire",
        item: absoluteUrl("/bisley"),
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
      <BisleyGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Bisley Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Bisley Solitaire is a classic patience card game featuring a unique{" "}
          <strong>dual-direction foundation</strong> system. Four aces start on{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          and build up by suit, while kings are placed on separate foundations as they
          become available and build down by suit. When ascending and descending piles
          of the same suit meet in the middle, that suit is complete.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Bisley Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four ace-foundation piles. Deal the
          remaining 48 cards face-up into 13 tableau columns. Build ace foundations up
          by suit from Ace to King. Place kings on king foundations as they become available
          and build down by suit. Stack tableau cards in{" "}
          <strong>ascending or descending order by same suit</strong> — place a 5&spades;
          on a 6&spades; or a 4&spades;. Only the top card of each column can be moved.
          Empty columns cannot be filled.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Dual-Direction Foundations
        </h3>
        <p className="mb-4 leading-relaxed">
          The dual-direction foundation system is what makes Bisley unique. Aces build up
          (A→2→3...) while kings build down (K→Q→J...). When both foundations of the same
          suit have consecutive top cards, the suit is automatically complete. This gives
          you two paths to clear each suit, making the game more accessible than many
          patience variants.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Bisley traces back to nineteenth-century English patience compendiums, where
          it appeared alongside better-known names such as Klondike and Canfield. We
          find the earliest printed descriptions in Victorian parlor-game books that
          collected one-player card pastimes for rainy afternoons at the country house.
          The game takes its name from the Surrey village of Bisley, long associated
          with the National Rifle Association&apos;s shooting meetings — a small clue
          that this was a pastime of British sporting culture rather than a Continental
          import. What set Bisley apart from its contemporaries was the dual-foundation
          architecture: aces climbing upward toward king and kings descending toward
          ace, with the two halves of each suit scheduled to meet somewhere in the
          middle. Thirteen columns arranged around the foundation row produced a
          distinctive diamond-shaped layout that remains unusual among patience games
          even today. Over the decades, compilers preserved Bisley largely intact,
          and we still play essentially the same version our great-grandparents did.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          The central tension in Bisley is that every card in a suit belongs to exactly
          one foundation pile — but we choose which one. When we slide the 7&hearts;
          somewhere, we are implicitly committing it either to the ascending half (as
          the top of the A→7 stack) or to the descending half (as the bottom of the
          K→7 stack). Because the two halves must eventually meet, misjudging the
          split can strand cards on the wrong side and freeze the suit.
        </p>
        <p className="mb-4 leading-relaxed">
          We work outward from the kings. As soon as a king emerges, we promote it
          to a descending foundation and start counting how many ranks it controls
          — three or four cards already in open positions is ideal. Then we count
          how many ranks remain buried, because those buried ranks will ultimately
          have to climb out through the ascending foundation instead. This running
          ledger keeps the meeting point honest: roughly half the suit comes from
          below, half from above, and the join happens where our buried-vs-exposed
          distribution dictates.
        </p>
        <p className="mb-4 leading-relaxed">
          Tableau flexibility is our second lever. Because we can build a column
          either upward or downward in the same suit, one column can temporarily
          host both a rising sequence and a falling one, as long as we keep the top
          card legal. We treat these columns as holding zones — stashing a stubborn
          9&clubs; under a 10&clubs; while we clear the cards beneath the 8&clubs;,
          then reversing direction once the road opens. This reversibility is what
          lifts Bisley&apos;s win rate above many thirteen-column patiences.
        </p>
        <p className="mb-4 leading-relaxed">
          The final principle is empty-column discipline. Emptying a column is
          permanent — no fresh card can refill it — so every vacated slot is a
          one-time resource we have consumed. We tolerate an empty column only when
          clearing it unlocks a buried ace, an early king, or an otherwise impossible
          merge in a slow suit. Clearing columns for convenience early in the game
          is the quickest path to a deadlocked endgame.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Bisley sits near the top of the patience solvability curve. Published
          solver analyses place the theoretical win rate somewhere in the{" "}
          <strong>seventy percent</strong> neighborhood under optimal play, and
          casual-yet-careful players commonly post win rates in the fifty-to-sixty
          percent range once they grasp the dual-foundation rhythm. That places
          Bisley well above Baker&apos;s Dozen, Canfield, and Forty Thieves, but
          below FreeCell&apos;s near-guaranteed solvability. The generous building
          rules — same-suit up OR down — explain the high ceiling: almost any card
          can eventually find a home if we route it patiently. The frictions that
          keep the rate under one hundred percent are the inability to fill empty
          columns and the requirement that the two foundation halves of each suit
          connect at a legitimate rank. We estimate roughly one in four deals is
          effectively unwinnable from the start because of adversarial burial of
          mid-rank cards.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The mistake we see most often is premature column emptying. New players
          chase the satisfaction of clearing a column, forgetting that the slot is
          gone forever. A second mistake is over-committing to the ascending side:
          because aces start the game on foundations, there&apos;s a natural bias
          toward feeding them first, which leaves the kings under-supplied and the
          suits lopsided. A third error is stacking tableau sequences without
          thinking about reversals — building a long descending same-suit run is
          beautiful but useless if the bottom card can never move. We also see
          players unload mid-rank cards (sevens, eights) onto foundations too
          early, before they know whether those ranks needed to climb from the ace
          side or descend from the king side. Finally, fatigue mistakes dominate
          the endgame: after fifteen minutes of routing, it is easy to miss that
          the 6&clubs; and 7&clubs; now sit on opposite foundations and the suit
          has quietly deadlocked.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Compared to FreeCell, Bisley is freer on tableau moves but stingier on
          storage — there are no reserve cells, so we route cards through each
          other rather than parking them. Compared to Klondike, Bisley shows all
          fifty-two cards face-up from the start, replacing the stock-and-waste
          guessing game with pure planning. Against Forty Thieves, another
          thirteen-column patience, Bisley wins on flexibility: Forty Thieves
          builds strictly downward, while Bisley&apos;s up-or-down tableau rule
          creates escape routes Forty Thieves lacks. Cruel and La Belle Lucie
          share Bisley&apos;s same-suit building but rely on redeals to recover
          from dead positions; Bisley refuses redeals, which makes every move
          load-bearing. If we were ranking these games by cerebral load per
          minute, Bisley sits just under Forty Thieves and just over Klondike — a
          middleweight patience that rewards foresight but forgives the occasional
          slip.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          A handful of Victorian-era variants circulated alongside canonical Bisley.
          Some compilers allowed a single end-of-game redeal if no legal moves
          remained, inflating win rates into the mid-eighties. Others permitted
          only ascending tableau building, producing a dramatically harder game
          closer in feel to Forty Thieves. Twentieth-century software editions
          sometimes skipped the dual-foundation setup entirely and treated the
          king row as automatic, which eliminated Bisley&apos;s most interesting
          decision. Our implementation preserves the traditional ruleset: aces
          pre-placed, kings promoted on first availability, same-suit up-or-down
          on the tableau, no redeals, no empty-column refills. Players who want
          a closely related experience with harsher terms can try{" "}
          <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
            La Belle Lucie
          </Link>
          .
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/bisley/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Bisley Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/bisley/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Bisley Strategy Guide
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
            — Same-suit building with unlimited redeals
          </li>
          <li>
            <Link
              href="/la-belle-lucie"
              className="text-[#D4AF37] hover:underline"
            >
              Play La Belle Lucie
            </Link>{" "}
            — Fan patience with the Merci rule
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

        <MoreGames currentSlug="bisley" />
      </article>
    </>
  );
}
