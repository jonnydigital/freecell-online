import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Bisley Solitaire Strategy Guide | Winning Techniques & Tips",
  description:
    "Master Bisley Solitaire with advanced strategies for dual-direction foundation building, meeting point management, column liberation, and suit sequencing. Win more games with expert methods.",
  keywords: [
    "bisley solitaire strategy",
    "bisley solitaire winning strategy",
    "bisley solitaire tips",
    "how to win bisley solitaire",
    "bisley solitaire foundation strategy",
    "bisley solitaire guide",
    "bisley solitaire dual direction building",
    "bisley solitaire column strategy",
    "bisley solitaire suit sequencing",
    "bisley solitaire advanced techniques",
  ],
  alternates: {
    canonical: absoluteUrl("/bisley/strategy"),
  },
  openGraph: {
    title: "Bisley Solitaire Strategy Guide | Winning Techniques & Tips",
    description:
      "Advanced strategies for Bisley Solitaire: dual-direction foundations, meeting point management, column liberation, and suit sequencing tactics.",
    url: absoluteUrl("/bisley/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Bisley Solitaire different from other solitaire games?",
    answer:
      "Bisley's defining feature is its dual-direction foundation building. Aces build up in suit (A-2-3...K) while Kings build down in suit (K-Q-J...A), and the two foundation rows of the same suit eventually meet in the middle. This creates a unique strategic challenge where you must decide whether to build a card upward from Aces or wait for it to be placed downward from Kings. Combined with all 52 cards being dealt face-up into 13 columns, it is a pure open-information game with no stock or redeal.",
  },
  {
    question: "What is a good win rate in Bisley Solitaire?",
    answer:
      "Skilled players typically win around 30-40% of Bisley deals. The game is harder than standard FreeCell (80-90% win rate) but comparable to other restrictive variants like Penguin or Canfield. Because all cards are visible from the start, every loss is theoretically detectable from the opening position. Improving your win rate comes from better planning of the meeting point between ascending and descending foundations and more efficient column liberation.",
  },
  {
    question: "Should I prioritize building up from Aces or down from Kings?",
    answer:
      "Neither direction should be universally prioritized — the optimal choice depends on the specific card layout. Generally, build in whichever direction removes the most blocking cards from the tableau. If low-rank cards (2s, 3s, 4s) are sitting on top of columns, build them up onto Aces quickly. If high-rank cards (Queens, Jacks, 10s) are blocking important cards, build them down from Kings. The key insight is flexibility: having both directions available means you can clear blockers from either end of the rank spectrum.",
  },
  {
    question: "How do I handle the meeting point where foundations converge?",
    answer:
      "The meeting point is where the ascending (from Aces) and descending (from Kings) foundations of the same suit converge. You do not need to reach a specific middle rank — the foundations simply meet wherever the remaining cards dictate. The strategic implication is that you should avoid committing too heavily to one direction early. If you build Aces up to 8 and Kings down to 9, the 8-foundation just needs the 9 to complete, and vice versa. Plan so that the final cards to be played are accessible, not buried in columns.",
  },
  {
    question: "Is Bisley Solitaire purely skill-based or does luck matter?",
    answer:
      "Bisley is heavily skill-based because all 52 cards are visible from the start — there is no hidden information, no stock to draw from, and no redeal. However, some deals are mathematically unsolvable regardless of play quality. The skill component lies in recognizing which deals are winnable and executing the optimal sequence of moves. Expert players distinguish themselves by reading the board layout, planning the meeting point for each suit, and making efficient use of column space.",
  },
];

export default function BisleyStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Bisley Solitaire", item: absoluteUrl("/bisley") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/bisley/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bisley Solitaire Strategy Guide",
        description: "Advanced strategies for Bisley Solitaire covering dual-direction foundations, meeting point management, column liberation, and suit sequencing.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-31",
        dateModified: "2026-03-31",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Bisley Solitaire Strategy Guide"
        kicker={<><Link href="/bisley" className="hover:text-white transition-colors">Bisley Solitaire</Link> / Strategy</>}
        subtitle="Advanced strategies for mastering dual-direction foundation building — from meeting point planning to column liberation and suit sequencing."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bisley Solitaire", href: "/bisley" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Bisley strategy revolves around three pillars: <strong className="text-white">exploit dual-direction building</strong>,{" "}
          <strong className="text-white">plan the meeting point for each suit</strong>, and{" "}
          <strong className="text-white">liberate columns methodically</strong>.
          With all 52 cards visible and no free cells or stock to fall back on, every move
          must serve a purpose. The ability to build both up from Aces and down from Kings
          gives you twice the foundation options — but only if you coordinate both directions
          to converge cleanly without stranding cards in the middle.
        </p>
      </div>

      {/* Section 1: Understanding Dual-Direction Foundations */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding Dual-Direction Foundations
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s signature mechanic is its two-row foundation system. The four Aces begin
          in a foundation row at the start of the game and build upward in suit: A-2-3-4-5 and
          so on toward King. When Kings become available during play, they create a second
          foundation row that builds downward in suit: K-Q-J-10-9 and so on toward Ace.
          Foundations of the same suit eventually meet in the middle, and the suit is complete.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This dual-direction system is what separates Bisley from nearly every other solitaire
          variant. In{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , foundations build in a single direction — always up from Ace to King. In Bisley,
          every card in the deck has two potential foundation destinations: it can go up onto
          the Ace pile or down onto the King pile. This flexibility is your greatest strategic
          asset.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces are pre-placed.</strong> All four Aces start
            in the foundation row from the beginning. You can immediately start building up
            on any suit — look for 2s sitting on top of tableau columns.
          </li>
          <li>
            <strong className="text-white/90">Kings must be freed first.</strong> Unlike Aces,
            Kings are dealt into the tableau. You must uncover and move them to create the
            descending foundation row. Freeing Kings early opens up the downward building option.
          </li>
          <li>
            <strong className="text-white/90">Middle cards have the most flexibility.</strong> Cards
            like 6s, 7s, and 8s can potentially be played in either direction. Do not commit them
            to one foundation until you have a clear plan for how the suit will converge.
          </li>
          <li>
            <strong className="text-white/90">Each suit converges independently.</strong> Hearts
            might meet at 7-8, while Spades meet at 5-6. There is no requirement for a uniform
            meeting point. Plan each suit&apos;s convergence based on its specific card positions.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> The dual-direction system means you are never truly stuck
            on foundation progress the way you can be in single-direction games. If low cards are
            buried but high cards are accessible, build downward from Kings. If high cards are
            buried, build upward from Aces. Always work in whichever direction the current board
            layout supports.
          </p>
        </div>
      </section>

      {/* Section 2: Choosing Between Building Up and Building Down */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Choosing Between Building Up and Building Down
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The central decision in every Bisley move is directional: should this card go up onto
          the Ace foundation or down onto the King foundation? The wrong choice can strand cards
          and block entire columns. The right choice unlocks cascading plays that clear the board.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The general principle is to build in whichever direction removes the most blocking cards
          from the tableau. A card sitting on top of a column that is blocking three important
          cards below it should go to whichever foundation accepts it — the direction matters less
          than the unblocking effect. However, when a card is not currently blocking anything,
          you have time to be strategic about direction.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build toward the blockers.</strong> If a suit&apos;s
            mid-range cards (6, 7, 8) are buried deep in columns, plan to build from both ends
            and stop just short of those cards — then free them last.
          </li>
          <li>
            <strong className="text-white/90">Prioritize the direction with more accessible cards.</strong>{" "}
            If you can see three low cards of a suit on column tops but the Queens and Jacks are
            buried, build upward aggressively. Save downward building for when high cards surface.
          </li>
          <li>
            <strong className="text-white/90">Avoid running one direction too far ahead.</strong>{" "}
            Building Aces up to 9 while the King pile is still at Queen means you have committed
            most of the suit to one direction. This reduces your flexibility for the remaining
            cards and can leave you stuck if the meeting cards are inaccessible.
          </li>
          <li>
            <strong className="text-white/90">Use direction choice to balance column lengths.</strong>{" "}
            If playing a card upward empties a column but playing it downward does not, choose
            upward — even if the downward foundation is more &ldquo;behind.&rdquo; Empty columns
            are extremely valuable in Bisley.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental shortcut:</strong> When deciding direction, ask: &ldquo;Which play
            frees more cards on the tableau?&rdquo; If both directions free the same number,
            prefer the direction that keeps your foundations closer to balanced — this preserves
            flexibility for future turns.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Managing the Meeting Point */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Managing the Meeting Point
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The meeting point — where a suit&apos;s ascending and descending foundations converge — is
          the endgame of each suit. When the Ace pile and King pile of the same suit contain
          every card between them, that suit is complete. The meeting point can occur at any rank,
          and you do not get to choose where it lands — the card positions dictate it.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The critical skill is anticipating where each suit will meet and ensuring the final
          convergence cards are accessible. If the ascending Hearts foundation reaches 7 and
          the descending Hearts foundation reaches 8, the suit is complete. But if the 7 of
          Hearts is buried under three other cards, you need a plan to extract it before
          committing too far in either direction.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Scan for convergence blockers early.</strong>{" "}
            For each suit, identify which cards in the 5-9 range are most buried. These are
            likely to be your meeting-point cards, and they will need to be freed before the
            suit can complete.
          </li>
          <li>
            <strong className="text-white/90">Do not force a specific meeting rank.</strong>{" "}
            Let the card positions naturally dictate where suits converge. Trying to force
            all suits to meet at 7 when the cards do not support it wastes moves.
          </li>
          <li>
            <strong className="text-white/90">Complete easier suits first.</strong> If one suit
            has accessible cards in both directions, finish it quickly. This frees tableau space
            for working on more difficult suits.
          </li>
          <li>
            <strong className="text-white/90">Track convergence progress for all four suits.</strong>{" "}
            Mentally note where each suit&apos;s ascending and descending piles currently stand.
            A suit at A-2-3 (ascending) and K-Q-J-10 (descending) needs only 4-5-6-7-8-9 —
            six cards. A suit at A-2-3-4-5-6 and K-Q needs only 7-8-9-10-J — five cards.
            Know the gap for each suit.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Foundation State</span>
            <span>Cards Remaining</span>
            <span>Priority</span>
          </div>
          {[
            ["A-2-3 / K-Q-J-10", "6 cards (4-9)", "Low — large gap, work other suits first"],
            ["A-2-3-4-5 / K-Q-J", "4 cards (6-10)", "Medium — manageable if cards are accessible"],
            ["A-2-3-4-5-6 / K-Q-J-10-9", "2 cards (7-8)", "High — near completion, find those cards"],
            ["A-2-3-4-5-6-7 / K-Q-J-10-9-8", "0 cards", "Complete — suit is finished"],
          ].map(([state, remaining, priority], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{state}</span>
              <span>{remaining}</span>
              <span>{priority}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> The ideal meeting point for a suit is wherever the most
            deeply buried card sits. If the 7 of Spades is at the bottom of a 4-card column,
            plan your Spades foundations to converge at 7 — build Aces up to 6 and Kings down
            to 8, then free the 7 last. This minimizes the excavation work needed.
          </p>
        </div>
      </section>

      {/* Section 4: Column Liberation Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Column Liberation Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley deals all 52 cards into 13 columns of 4 cards each. With no free cells and no
          stock, your only maneuvering space comes from emptying columns and using the tableau
          building rules. Unlike{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , where four free cells provide flexible temporary storage, Bisley gives you nothing
          except the columns themselves. Empty columns are your free cells.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The 13-column layout means you start with many short columns (only 4 cards each), which
          is both an advantage and a constraint. Short columns are quick to empty — just four cards
          need to move. But with 13 columns competing for your attention, it is easy to make
          scattered progress without actually clearing any single column.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Target the shortest clearable columns first.</strong>{" "}
            A column with 2-3 cards remaining where all cards can go to foundations or other
            columns is a high-priority target. Clearing it gives you crucial empty-column space.
          </li>
          <li>
            <strong className="text-white/90">Use foundation plays to thin columns.</strong>{" "}
            Every card sent to a foundation is one fewer card in the tableau. Aggressive foundation
            building — in either direction — is the primary mechanism for column liberation.
          </li>
          <li>
            <strong className="text-white/90">Avoid creating long columns.</strong> Moving tableau
            cards onto other columns makes those columns longer and harder to clear. Only build
            on the tableau when it directly enables a foundation play or column clearance.
          </li>
          <li>
            <strong className="text-white/90">Empty columns serve as temporary storage.</strong>{" "}
            Any card can be placed in an empty column (unlike{" "}
            <Link href="/penguin/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
              Penguin
            </Link>
            , which restricts empty column fills). Use empty columns to park cards temporarily
            while you reorganize other columns, then refill them strategically.
          </li>
          <li>
            <strong className="text-white/90">Maintain at least one empty column in mid-game.</strong>{" "}
            Having zero empty columns in Bisley is like having zero free cells in FreeCell — you
            are one bad position away from a total deadlock. Always keep an escape route open.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Treating all 13 columns equally. Focus your
            liberation efforts on 2-3 columns that are closest to being emptied. Spreading
            your effort across all columns results in no empty columns and no maneuvering space.
            Concentrate force — clear one column fully before starting on the next.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Suit Sequencing and Tableau Organization */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Suit Sequencing and Tableau Organization
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley&apos;s tableau building rule allows you to build by suit, either up or down.
          This means a column can contain a descending sequence like 9-8-7-6 of Hearts or an
          ascending sequence like 4-5-6-7 of Clubs. The bidirectional tableau building mirrors
          the bidirectional foundation building, creating a game of remarkable internal symmetry.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Effective tableau organization means keeping suits grouped and sequences clean. Because
          you can only build by suit (not by alternating color), each column naturally gravitates
          toward a single suit. With 13 columns and 4 suits, you have roughly 3 columns per suit
          to work with — plus one extra column that can serve as overflow or temporary storage.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Build tableau sequences toward the meeting point.</strong>{" "}
            If you know Hearts will converge around 7, build a descending tableau sequence of
            Hearts from 10 down to 8 and an ascending sequence from 4 up to 6. These sequences
            feed directly into your foundations when the time comes.
          </li>
          <li>
            <strong className="text-white/90">Ascending vs descending tableau choice matters.</strong>{" "}
            Build ascending sequences when you plan to feed cards upward to the Ace foundation.
            Build descending sequences when you plan to feed cards downward to the King foundation.
            Match your tableau direction to your intended foundation direction.
          </li>
          <li>
            <strong className="text-white/90">Keep same-suit cards together.</strong> If you have the
            5 and 7 of Diamonds in different columns with the 6 available, consolidate them
            into one sequence. Every consolidation frees space elsewhere.
          </li>
          <li>
            <strong className="text-white/90">Do not build tableau sequences you cannot disassemble.</strong>{" "}
            A sequence is only useful if you can eventually move its cards to foundations. If
            building a long sequence traps a card from another suit at the bottom, that sequence
            may become a liability.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Bidirectional tableau building can create confusing
            sequences where direction changes mid-column (e.g., 5-6-7-6-5 of Hearts). This
            is legal but strategically dangerous — the direction change makes the sequence
            harder to unwind. Stick to a single direction per column whenever possible.
          </p>
        </div>
      </section>

      {/* Section 6: Comparing Bisley to Other Open-Information Games */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comparing Bisley to Other Open-Information Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bisley belongs to the family of open-information solitaire games — those where all
          cards are visible from the start. This family includes{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          ,{" "}
          <Link href="/penguin/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Penguin
          </Link>
          ,{" "}
          <Link href="/bakers-dozen/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Baker&apos;s Dozen
          </Link>
          , and{" "}
          <Link href="/beleaguered-castle/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Beleaguered Castle
          </Link>
          . Understanding how Bisley compares to these relatives helps you apply the right mental
          model and avoid importing habits that do not work.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-4 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>FreeCell</span>
            <span>Baker&apos;s Dozen</span>
            <span>Bisley</span>
          </div>
          {[
            ["Tableau building", "Alt. color, down", "Any suit, down", "Same suit, up or down"],
            ["Free cells", "4", "0", "0"],
            ["Foundation direction", "Up only (A→K)", "Up only (A→K)", "Up (A→K) and Down (K→A)"],
            ["Columns", "8", "13", "13"],
            ["Cards per column", "6-7", "4", "4"],
            ["Empty column fill", "Any card", "Any card", "Any card"],
            ["Win rate (skilled)", "80-90%", "75-80%", "30-40%"],
          ].map(([feature, fc, bd, bisley], i) => (
            <div
              key={i}
              className={`grid grid-cols-4 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{fc}</span>
              <span>{bd}</span>
              <span>{bisley}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          The biggest adjustment when coming from FreeCell is the absence of free cells entirely.
          In FreeCell, you can always park a troublesome card temporarily. In Bisley, your only
          option is empty columns — and filling an empty column with a random card is expensive
          because it eliminates your maneuvering space. This forces you to be far more deliberate
          about move order.
        </p>
        <p className="text-white/70 leading-relaxed">
          The advantage Bisley offers over single-direction games is the dual foundation system.
          Where a Baker&apos;s Dozen player might be stuck because the 3 of Hearts is buried, a
          Bisley player can build down from the King of Hearts instead, potentially reaching that
          same 3 from the other direction. This flexibility partially compensates for the lack of
          free cells and the restrictive same-suit tableau building.
        </p>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Strategy Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Free the Kings immediately.</strong> Aces are pre-placed, but Kings must be
              uncovered. Opening the downward foundation row doubles your building options.
            </li>
            <li>
              <strong>Build in the direction that unblocks the most cards.</strong> Do not default
              to always building upward — let the board dictate which direction is more productive.
            </li>
            <li>
              <strong>Plan meeting points by suit.</strong> For each suit, identify where the ascending
              and descending foundations will converge and ensure those cards are reachable.
            </li>
            <li>
              <strong>Empty columns are your free cells.</strong> Clear short columns early to create
              maneuvering space. Maintain at least one empty column through the mid-game.
            </li>
            <li>
              <strong>Keep foundations balanced.</strong> Avoid running one suit far ahead of others.
              Balanced progress prevents card-stranding across suits.
            </li>
            <li>
              <strong>Build tableau sequences in one direction per column.</strong> Avoid mixing
              ascending and descending sequences in the same column — it creates tangles.
            </li>
            <li>
              <strong>Complete the easiest suit first.</strong> Finishing one suit quickly clears
              tableau space for the remaining three suits.
            </li>
            <li>
              <strong>Scan all 13 columns before every move.</strong> With full information visible,
              there is no excuse for missing a play. Plan 3-5 moves ahead at minimum.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley" description="Complete rules, setup, and dealing mechanics explained." />
            <ContentLinkCard href="/bisley/tips" title="Bisley Tips & Tricks" description="Quick, practical tips for improving your Bisley game." />
            <ContentLinkCard href="/strategy" title="Solitaire Strategy Hub" description="Strategy guides for all solitaire variants." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Bisley knowledge to the test. Play free online Bisley Solitaire with unlimited undo, hints, and instant new deals."
          primaryLabel="Play Bisley Solitaire"
          primaryHref="/bisley"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bisley/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ Section */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More Resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Bisley Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bisley" title="Play Bisley Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/bisley/how-to-play" title="How to Play Bisley" description="Complete rules and dealing mechanics" />
          <ContentLinkCard href="/bisley/tips" title="Bisley Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic FreeCell game" />
          <ContentLinkCard href="/bakers-dozen/strategy" title="Baker's Dozen Strategy" description="Strategy for another 13-column open game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
