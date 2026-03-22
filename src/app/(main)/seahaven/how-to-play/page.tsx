import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";

export const metadata: Metadata = {
  title: "How to Play Seahaven Towers | Rules & Strategy Guide",
  description:
    "Learn how to play Seahaven Towers with complete rules, setup guide, and winning strategies. 10 columns, 4 free cells, same-suit stacking, single-card moves, Kings-only empty columns.",
  keywords: [
    "seahaven towers rules",
    "how to play seahaven towers",
    "seahaven towers strategy",
    "seahaven towers card game rules",
    "seahaven towers instructions",
    "seahaven towers tutorial",
    "seahaven towers solitaire rules",
  ],
  openGraph: {
    title: "How to Play Seahaven Towers | Rules & Strategy Guide",
    description:
      "Complete rules, setup, and strategy for Seahaven Towers. Build same-suit foundations using 10 columns and 4 free cells.",
    url: absoluteUrl("/seahaven/how-to-play"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
};

export default function SeahavenHowToPlay() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Play Seahaven Towers — Complete Rules & Strategy Guide",
    description:
      "Learn the rules, setup, and winning strategies for Seahaven Towers Solitaire.",
    author: { "@type": "Organization", name: siteConfig.siteName },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    url: absoluteUrl("/seahaven/how-to-play"),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Seahaven Towers", item: absoluteUrl("/seahaven") },
      { "@type": "ListItem", position: 3, name: "How to Play", item: absoluteUrl("/seahaven/how-to-play") },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Seahaven Towers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seahaven Towers is a strategic solitaire game played with one standard 52-card deck. Ten columns of 5 cards are dealt face-up, with 2 remaining cards placed in the first two of four free cells. The goal is to build four foundation piles from Ace to King by suit, moving only single cards at a time.",
        },
      },
      {
        "@type": "Question",
        name: "How is Seahaven Towers different from FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seahaven Towers uses same-suit descending stacking instead of alternating colors. It has 10 columns instead of 8, starts with 2 free cells occupied, and only allows single-card moves (no supermoves). Empty columns can only be filled with Kings, whereas FreeCell allows any card.",
        },
      },
      {
        "@type": "Question",
        name: "How is Seahaven Towers different from Baker's Game?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both use same-suit stacking, but Seahaven Towers has 10 columns (vs. 8), starts with 2 free cells occupied (vs. all 4 empty), deals 5 cards per column (vs. 6-7), and strictly enforces single-card moves without supermoves. The extra columns partially compensate for the occupied free cells.",
        },
      },
      {
        "@type": "Question",
        name: "Can you move groups of cards in Seahaven Towers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — Seahaven Towers only allows moving one card at a time. Unlike FreeCell which allows supermoves (using empty cells and columns as intermediary storage to move sequences), every move in Seahaven must be performed one card at a time. You must manually use free cells and empty columns to reorganize sequences.",
        },
      },
      {
        "@type": "Question",
        name: "What can fill an empty column in Seahaven Towers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only Kings can be placed in empty tableau columns. This is a strict rule — no other rank is allowed. Plan carefully before emptying a column and make sure you have a King ready to use the space productively.",
        },
      },
      {
        "@type": "Question",
        name: "What is the win rate for Seahaven Towers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seahaven Towers has an estimated win rate of about 85-90% for expert players. The combination of 4 free cells and 10 wide columns provides good maneuverability, though the same-suit stacking rule and Kings-only empty columns create strategic depth.",
        },
      },
      {
        "@type": "Question",
        name: "Is Seahaven Towers harder than FreeCell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seahaven Towers is generally considered harder than standard FreeCell due to same-suit stacking (limiting which cards stack where), single-card-only moves, and the Kings-only empty column restriction. However, the 10-column layout and high skill-ceiling win rate make it very satisfying to master.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <nav className="text-sm text-white/40 mb-6">
          <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/seahaven" className="hover:text-[#D4AF37]">Seahaven Towers</Link>
          <span className="mx-2">&rsaquo;</span>
          <span className="text-white/60">How to Play</span>
        </nav>

        <h1
          className="text-4xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          How to Play Seahaven Towers
        </h1>

        <p className="text-lg mb-8 leading-relaxed text-white/70">
          Seahaven Towers is a precise, deeply strategic solitaire game that combines
          the temporary storage concept of FreeCell with same-suit building rules. Every
          move is a <strong className="text-white/90">single card</strong>, making each
          free cell and empty column a precious resource that demands careful planning.
        </p>

        <AdUnit slot="seahaven-how-to-play-top" />

        {/* Setup */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Setup
          </h2>
          <p className="mb-4 leading-relaxed">
            Seahaven Towers uses one standard 52-card deck. The deal creates a
            10-column tableau with 4 free cells:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong className="text-white/90">Tableau:</strong> 10 columns of 5 cards
              each (50 cards), all dealt <strong className="text-white/90">face-up</strong>
            </li>
            <li>
              <strong className="text-white/90">Free Cells:</strong> 4 temporary storage
              spaces — the remaining 2 cards are placed in the first two free cells at the
              start, leaving 2 cells empty
            </li>
            <li>
              <strong className="text-white/90">Foundations:</strong> 4 empty foundation
              piles, one for each suit (build Ace to King)
            </li>
          </ul>
          <p className="leading-relaxed text-white/60">
            Total: 50 cards on the tableau + 2 in free cells = 52 cards. All cards are
            visible from the start — pure skill, no hidden information.
          </p>
        </section>

        {/* Objective */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Objective
          </h2>
          <p className="mb-4 leading-relaxed">
            Build all four foundation piles from <strong className="text-white/90">Ace up to King</strong>,
            one per suit. Move cards from the tableau and free cells to the foundations.
            The game is won when all 52 cards are on the foundations.
          </p>
        </section>

        {/* Rules */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Rules
          </h2>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Moving Cards</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Only <strong className="text-white/90">single cards</strong> can be moved — no
              group moves or supermoves are allowed
            </li>
            <li>
              You may move the <strong className="text-white/90">top card</strong> of any
              tableau column or any card in a free cell
            </li>
            <li>
              Cards can be moved to: another tableau column (following stacking rules),
              a free cell (if empty), or a foundation pile
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Tableau Stacking</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Build <strong className="text-white/90">down in the same suit</strong> — place
              a 9 of Spades on a 10 of Spades
            </li>
            <li>
              Unlike FreeCell (alternating colors) or Spider (any suit for building), Seahaven
              requires strict same-suit stacking at all times
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Empty Columns</h3>
          <p className="mb-4 leading-relaxed">
            Empty columns can <strong className="text-white/90">only be filled with a King</strong>.
            No other rank is allowed. This restriction makes empty columns both powerful
            (they give you breathing room) and demanding (you need a King ready to use them).
          </p>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Free Cells</h3>
          <p className="mb-4 leading-relaxed">
            The 4 free cells serve as temporary storage for individual cards. Two start
            occupied, giving you only 2 empty cells to work with initially. As you move
            those starting cards to the tableau or foundations, you gain more flexibility.
            Managing free cells is the core strategic challenge.
          </p>

          <h3 className="text-xl font-semibold text-[#D4AF37] mt-6 mb-3">Foundations</h3>
          <p className="mb-4 leading-relaxed">
            Build foundations from Ace to King in suit. Once a card is on a foundation, it
            stays there. Cards that can be safely moved to foundations are auto-moved —
            since Seahaven uses same-suit stacking, any card whose rank is next for its
            suit&apos;s foundation is always safe to auto-move.
          </p>
        </section>

        <AdUnit slot="seahaven-how-to-play-mid" />

        {/* Strategy */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Strategy Tips
          </h2>
          <ol className="list-decimal pl-6 mb-4 space-y-3">
            <li>
              <strong className="text-white/90">Free the starting free cell cards early.</strong> Your
              first priority should be moving the 2 cards that start in free cells to the
              tableau or foundations. Having all 4 free cells available dramatically increases
              your options.
            </li>
            <li>
              <strong className="text-white/90">Build same-suit sequences in place.</strong> Before
              moving cards around, look for opportunities to stack cards in same-suit
              descending order within the tableau. A column with 10-9-8-7 of the same suit
              is extremely valuable.
            </li>
            <li>
              <strong className="text-white/90">Create empty columns strategically.</strong> Empty
              columns are like extra free cells — but only Kings can fill them. Before
              emptying a column, check if you have a King that benefits from the space.
            </li>
            <li>
              <strong className="text-white/90">Plan multi-step moves carefully.</strong> Since you
              can only move one card at a time, transferring a sequence of 3 cards requires
              2 free cells. Count your available temporary storage (empty free cells + empty
              columns with Kings ready) before starting a complex move.
            </li>
            <li>
              <strong className="text-white/90">Prioritize uncovering Aces and 2s.</strong> Getting
              low cards to the foundations early frees up tableau space and opens future
              auto-moves. If an Ace is buried under several cards, plan a sequence of moves
              to excavate it.
            </li>
            <li>
              <strong className="text-white/90">Don&apos;t fill free cells casually.</strong> Each
              occupied free cell reduces your maneuverability. Only use free cells when
              the move creates a clear benefit — uncovering a needed card, building a
              sequence, or enabling a foundation play.
            </li>
          </ol>
        </section>

        {/* Comparison */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Seahaven Towers vs FreeCell vs Baker&apos;s Game
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-2 pr-4 text-white/90">Feature</th>
                  <th className="text-left py-2 pr-4 text-white/90">Seahaven Towers</th>
                  <th className="text-left py-2 pr-4 text-white/90">FreeCell</th>
                  <th className="text-left py-2 pr-4 text-white/90">Baker&apos;s Game</th>
                </tr>
              </thead>
              <tbody className="text-white/60">
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Columns</td>
                  <td className="py-2 pr-4">10</td>
                  <td className="py-2 pr-4">8</td>
                  <td className="py-2 pr-4">8</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Free Cells</td>
                  <td className="py-2 pr-4">4 (2 start occupied)</td>
                  <td className="py-2 pr-4">4 (all empty)</td>
                  <td className="py-2 pr-4">4 (all empty)</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Stacking Rule</td>
                  <td className="py-2 pr-4">Same suit</td>
                  <td className="py-2 pr-4">Alternating color</td>
                  <td className="py-2 pr-4">Same suit</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Move Type</td>
                  <td className="py-2 pr-4">Single card only</td>
                  <td className="py-2 pr-4">Supermoves allowed</td>
                  <td className="py-2 pr-4">Supermoves allowed</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Empty Column Fill</td>
                  <td className="py-2 pr-4">Kings only</td>
                  <td className="py-2 pr-4">Any card</td>
                  <td className="py-2 pr-4">Any card</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Cards per Column</td>
                  <td className="py-2 pr-4">5</td>
                  <td className="py-2 pr-4">6–7</td>
                  <td className="py-2 pr-4">6–7</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-2 pr-4">Win Rate</td>
                  <td className="py-2 pr-4">~85–90%</td>
                  <td className="py-2 pr-4">~82%</td>
                  <td className="py-2 pr-4">~75%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <AdUnit slot="seahaven-how-to-play-bottom" />

        {/* FAQ */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-white/90 mb-2">What is Seahaven Towers?</h3>
              <p className="leading-relaxed">
                Seahaven Towers is a strategic solitaire game played with one 52-card deck.
                Ten columns of 5 cards are dealt face-up, with 2 remaining cards placed in
                free cells. Build four Ace-to-King foundation piles by suit using single-card
                moves only.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">How is Seahaven different from FreeCell?</h3>
              <p className="leading-relaxed">
                Seahaven uses same-suit stacking (not alternating colors), has 10 columns
                instead of 8, starts with 2 free cells occupied, only allows single-card
                moves (no supermoves), and restricts empty columns to Kings only.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">How is Seahaven different from Baker&apos;s Game?</h3>
              <p className="leading-relaxed">
                Both use same-suit stacking, but Seahaven has 10 columns (vs. 8), starts
                with 2 free cells occupied (vs. all empty), deals 5 cards per column (vs.
                6-7), and strictly enforces single-card moves without supermoves.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">Can I move groups of cards?</h3>
              <p className="leading-relaxed">
                No. Seahaven Towers only allows moving one card at a time. To transfer
                a sequence, you must manually use free cells and empty columns as
                intermediate storage for each card.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">What can fill an empty column?</h3>
              <p className="leading-relaxed">
                Only Kings can be placed in empty tableau columns. This restriction makes
                empty columns both powerful and precious — don&apos;t empty a column unless
                you have a King ready.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">What is the win rate?</h3>
              <p className="leading-relaxed">
                About 85-90% for expert players. The 10-column layout and 4 free cells
                provide good maneuverability, but same-suit stacking and Kings-only
                empty columns create meaningful strategic decisions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white/90 mb-2">Is Seahaven harder than FreeCell?</h3>
              <p className="leading-relaxed">
                Seahaven is generally harder due to same-suit stacking, single-card moves,
                and Kings-only empty columns. However, the 10-column layout partially
                compensates, and the high win rate makes it satisfying to master.
              </p>
            </div>
          </div>
        </section>

        {/* Learn More */}
        <section className="mb-10">
          <h2
            className="text-2xl font-bold text-[#D4AF37] mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Learn More
          </h2>
          <ul className="space-y-2 text-white/70">
            <li>
              <Link href="/seahaven" className="text-[#D4AF37] hover:underline">
                Play Seahaven Towers
              </Link>{" "}
              — Try it now, free online
            </li>
            <li>
              <Link href="/bakers-game/how-to-play" className="text-[#D4AF37] hover:underline">
                How to Play Baker&apos;s Game
              </Link>{" "}
              — Same-suit stacking with FreeCell layout
            </li>
            <li>
              <Link href="/how-to-play" className="text-[#D4AF37] hover:underline">
                How to Play FreeCell
              </Link>{" "}
              — The classic free cell game
            </li>
            <li>
              <Link href="/solitaire-types" className="text-[#D4AF37] hover:underline">
                Types of Solitaire
              </Link>{" "}
              — Explore 20+ solitaire variants
            </li>
          </ul>
        </section>

        <NetworkCrossLinks />
      </article>
    </>
  );
}
