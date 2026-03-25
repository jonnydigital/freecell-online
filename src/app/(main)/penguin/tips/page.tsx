import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Penguin Solitaire Tips & Tricks | Master the Beak Card Variant",
  description:
    "Master Penguin Solitaire with practical tips on beak card analysis, flipper cell management, same-suit sequence building, wrapping foundations, and empty column strategy. ~90-95% winnable.",
  keywords: [
    "penguin solitaire tips",
    "penguin solitaire strategy",
    "penguin solitaire tricks",
    "penguin tips and tricks",
    "how to win penguin solitaire",
    "penguin solitaire help",
    "penguin card game tips",
    "penguin solitaire winning tips",
    "penguin solitaire advice",
    "tips for penguin solitaire",
    "penguin solitaire guide",
  ],
  openGraph: {
    title: "Penguin Solitaire Tips & Tricks | Master the Beak Card Variant",
    description:
      "Practical tips to leverage the beak card mechanic in Penguin Solitaire. Learn flipper management, sequence building, and wrapping foundation strategy.",
    url: absoluteUrl("/penguin/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Penguin Solitaire?",
    answer:
      "Study the beak card and trace the complete foundation sequence before making any moves. The beak rank determines your entire foundation order (wrapping from the beak through King, then Ace and back up). Knowing exactly which card comes next on each foundation lets you plan moves that feed cards efficiently rather than guessing.",
  },
  {
    question: "How often can you win Penguin Solitaire?",
    answer:
      "Penguin has one of the highest win rates in solitaire — approximately 90-95% of deals are winnable with expert play. The combination of sequence moves (moving multiple same-suit cards at once), the flipper cell, and the ability to move cards back from foundations makes it very forgiving. Nearly every deal has a solution if you play carefully.",
  },
  {
    question: "How does the beak card work in Penguin Solitaire?",
    answer:
      "At the start of the game, one random card is chosen as the 'beak.' All four cards of the beak's rank are automatically placed on the foundations. The beak rank becomes the foundation base, and you build up by suit from there, wrapping around after King (K wraps to A). For example, if the beak is 7, foundations go: 7,8,9,10,J,Q,K,A,2,3,4,5,6.",
  },
  {
    question: "What is the flipper cell in Penguin Solitaire?",
    answer:
      "The flipper cell is Penguin's single free cell — a temporary holding space for one card. Unlike FreeCell's four free cells, you only have one, so it must be used sparingly and strategically. Only park a card in the flipper when it directly enables a critical move. Keeping the flipper empty gives you maximum flexibility for unexpected situations.",
  },
  {
    question: "Can I move cards back from foundations in Penguin Solitaire?",
    answer:
      "Yes — this is a powerful and often overlooked feature. In Penguin, you can move the top card from a foundation back to the tableau if it helps with maneuvering. This is especially useful when a foundation card would extend a same-suit sequence on the tableau, enabling a larger group move that clears obstacles.",
  },
];

export default function PenguinTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Penguin Solitaire", item: absoluteUrl("/penguin") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/penguin/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Penguin Solitaire Tips & Tricks",
        description: "Practical tips for mastering the beak card variant of Penguin Solitaire.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-25",
        dateModified: "2026-03-25",
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
        title="Penguin Solitaire Tips & Tricks"
        kicker={<><Link href="/penguin" className="hover:text-white transition-colors">Penguin Solitaire</Link> / Tips</>}
        subtitle="Practical strategies for the beak card variant — from foundation sequence planning and flipper management to same-suit sequence building and achieving the ~93% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Penguin Solitaire", href: "/penguin" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">trace the full foundation sequence from the beak card before you move anything</strong>.
          Penguin Solitaire&apos;s wrapping foundations mean each suit builds from the beak rank through K, wraps
          to A, and continues up to one below the beak. Knowing this sequence cold lets you plan which
          cards to expose and in what order. With a ~93% win rate, nearly every deal is solvable — the
          question is whether you find the path.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Study the Beak Card First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/penguin" className="text-[var(--gold)] hover:text-white transition-colors">
            Penguin Solitaire
          </Link>
          , the beak card determines everything. Its rank is the foundation base, and all four foundations
          build up by suit from that rank, wrapping around. Before touching any card, write down or
          mentally trace the complete 13-card sequence for each foundation.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, if the beak is a 9, your foundations build: 9, 10, J, Q, K, A, 2, 3, 4, 5, 6,
          7, 8. The card you need most immediately after the beak is the 10 of each suit. The card
          you need last is the 8 of each suit. This ordering should guide every decision.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Identify where the cards immediately above the beak rank are in
            the tableau. These are the first cards each foundation needs — locate them early and plan
            how to uncover them.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Guard the Flipper Cell
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin gives you only one free cell — the flipper. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          with its four free cells, you have exactly one temporary holding space. This makes the flipper
          incredibly precious. Use it only for moves that directly advance your game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">The best use of the flipper:</strong> temporarily hold a
          card that&apos;s blocking a foundation play. Move the blocking card to the flipper, play the
          card underneath to the foundation, then immediately return the flipper card to the tableau.
          The flipper should be empty most of the time.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Good flipper use:</strong> Temporarily hold a card to
            enable a foundation play or column clearance
          </li>
          <li>
            <strong className="text-white/90">Bad flipper use:</strong> Parking a card with no plan to
            retrieve it — this locks your only escape valve
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> A full flipper cell is like driving without a spare tire.
            Everything works fine until it doesn&apos;t — and then you&apos;re stuck. Always have a
            plan to empty the flipper before you fill it.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Build Same-Suit Sequences for Group Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin&apos;s biggest advantage over similar games is sequence moves: you can move a group of
          same-suit descending cards together as a unit. A column with 10-9-8-7 of Hearts can be moved
          as a single block. This is incredibly powerful for reorganizing the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Actively build sequences.</strong> When you have a choice
          of where to place a card, prefer the column where it extends a same-suit sequence. A longer
          sequence means more cards moved per action, which means more efficient reorganization.
        </p>
        <p className="text-white/70 leading-relaxed">
          Remember that Penguin&apos;s tableau builds down by same suit (not alternating color like
          FreeCell). This means same-suit sequences form naturally during normal play — but you can
          accelerate the process by prioritizing suit grouping when multiple placements are available.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Create Empty Columns Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          With 7 tableau columns and only 47 cards to start (the 4 beak cards go directly to foundations),
          clearing a column is achievable and extremely valuable. An empty column can receive any card or
          valid sequence, making it a flexible workspace for reorganization.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Look for short columns (5-6 cards) where most cards can go to foundations or be consolidated
          onto other columns. Clearing one column early gives you room to maneuver for the entire game.
          Two empty columns makes most deals trivially solvable.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Combine empty columns with the flipper for maximum flexibility.
            An empty column plus an empty flipper gives you two temporary holding spots, which is
            enough to reorganize most blocked positions.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Keep Foundations Advancing Evenly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          All four foundations start at the beak rank. Try to advance them at roughly the same pace.
          If one foundation is 6 cards ahead of another, you&apos;ve likely buried cards the slower
          foundation needs.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Even advancement also means you&apos;re clearing cards from the tableau evenly across suits,
          preventing one suit from dominating the tableau and creating bottlenecks. When multiple
          foundation plays are available, prefer the one that evens out the foundations.
        </p>
        <p className="text-white/70 leading-relaxed">
          That said, if one foundation play unlocks a cascade of other moves, take it regardless of
          balance. Opportunities that create chains are always worth pursuing.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Use Foundation-to-Tableau Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin allows you to move cards back from foundations to the tableau — a feature many players
          overlook. This is powerful because a foundation card might extend a same-suit sequence on the
          tableau, enabling a group move that clears an obstacle.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, if the 6 of Clubs is on the foundation and the tableau has 8-7 of Clubs,
          pulling the 6 back creates an 8-7-6 sequence that can move together. This might clear a
          blocking card or create an empty column that you wouldn&apos;t have otherwise.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Think of foundations as two-way streets, not one-way
            destinations. Cards on foundations are still available for tactical use. This mental shift
            opens up moves that most players miss entirely.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Understand Wrapping on the Tableau
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin&apos;s tableau building wraps just like its foundations. An Ace can be placed on a 2
          (building down), and a King can be placed on an Ace (building down with wrapping). This
          means sequences can cross the K-A boundary in both directions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This wrapping is especially important near the beak rank. If the beak is a 5, the card just
          below 5 in sequence is 4. A column could build: 5-4-3-2-A-K-Q, wrapping from low cards
          through Ace into high cards. Understanding these wrap-around sequences helps you build longer
          groups for more efficient moves.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> The cards near the end of the foundation sequence (one rank below
            the beak) are the last ones you need. Don&apos;t worry about them early — focus on uncovering
            cards near the beginning of the foundation sequence (one rank above the beak).
          </p>
        </div>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          One of the Most Winnable Solitaire Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Penguin Solitaire sits near the top of the{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire winnability spectrum
          </Link>{" "}
          at approximately 90-95% with expert play. This is even higher than{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (~82%), thanks to Penguin&apos;s powerful combination of sequence moves, foundation-to-tableau
          transfers, and tableau wrapping.
        </p>
        <p className="text-white/70 leading-relaxed">
          The high win rate means that when you lose, it&apos;s almost always a solvable deal you
          missed. Use undo to backtrack and find the winning path. Penguin is an excellent game for
          developing problem-solving skills because nearly every deal has a solution waiting to be
          discovered.
        </p>
      </section>

      {/* Quick reference cheat sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Tips Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Study the beak card.</strong> Trace the full 13-card foundation sequence before
              making any moves.
            </li>
            <li>
              <strong>Guard the flipper.</strong> Use it only for moves that directly advance the game,
              and empty it immediately.
            </li>
            <li>
              <strong>Build same-suit sequences.</strong> Group moves are your biggest advantage —
              build long runs for efficient reorganization.
            </li>
            <li>
              <strong>Create empty columns.</strong> One empty column plus the flipper gives you enough
              workspace for most situations.
            </li>
            <li>
              <strong>Advance foundations evenly.</strong> Keep all four within 2-3 cards of each other.
            </li>
            <li>
              <strong>Move cards back from foundations.</strong> Foundations are two-way — use them
              tactically to extend tableau sequences.
            </li>
            <li>
              <strong>Understand wrapping.</strong> Both tableau and foundations wrap around K-A, enabling
              sequences that cross the boundary.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin" description="Complete rules, beak card mechanics, and setup explained." />
            <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="With ~93% of deals winnable, Penguin rewards careful beak analysis and flipper management. Nearly every deal has a solution — find yours."
          primaryLabel="Play Penguin Solitaire"
          primaryHref="/penguin"
          secondaryLabel="Learn the Rules"
          secondaryHref="/penguin/how-to-play"
        />
      </div>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* FAQ */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
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

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Penguin Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/penguin" title="Play Penguin Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/penguin/how-to-play" title="How to Play Penguin" description="Complete rules, beak card mechanics, and setup" />
          <ContentLinkCard href="/seahaven/tips" title="Seahaven Towers Tips" description="Tips for another FreeCell-family variant" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
