import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Gaps (Montana) Solitaire Tips & Tricks | Master the Grid Puzzle",
  description:
    "Improve your Gaps Solitaire win rate with practical tips on dead gap avoidance, 2s-first strategy, chain thinking, redeal timing, and row-by-row focus. ~10-20% winnable.",
  keywords: [
    "gaps solitaire tips",
    "montana solitaire tips",
    "gaps solitaire strategy",
    "gaps solitaire tricks",
    "gaps tips and tricks",
    "how to win gaps solitaire",
    "gaps solitaire help",
    "montana card game tips",
    "gaps solitaire winning tips",
    "gaps solitaire advice",
    "tips for gaps solitaire",
    "gaps solitaire guide",
  ],
  openGraph: {
    title: "Gaps (Montana) Solitaire Tips & Tricks | Master the Grid Puzzle",
    description:
      "Practical tips to arrange the 4x13 grid in Gaps Solitaire. Learn dead gap avoidance, chain moves, redeal strategy, and row-by-row planning.",
    url: absoluteUrl("/gaps/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Gaps Solitaire?",
    answer:
      "Avoid creating dead gaps. A dead gap is one that's immediately to the right of a King or to the right of another gap — nothing can fill it. Dead gaps waste your limited moves and can stall the game entirely. Before moving any card, check whether the resulting gap will be usable or dead. Preserving live gaps is the single most impactful skill.",
  },
  {
    question: "How often can you win Gaps Solitaire?",
    answer:
      "Gaps (Montana) Solitaire has a win rate of approximately 10-20% with skilled play. Without redeals, the win rate drops below 5%. The two redeals are critical to success — they give you fresh gaps and a chance to build on locked sequences. Planning your moves to maximize locked cards before redealing is key.",
  },
  {
    question: "How do redeals work in Gaps Solitaire?",
    answer:
      "When no more moves are possible, you can redeal (up to 2 times, for 3 total deals). During a redeal, cards that are correctly sequenced starting from column 1 (beginning with a 2 of any suit) are 'locked' in place. All other cards are gathered, shuffled, and redealt. Aces are removed again to create new gaps. The more cards you lock before redealing, the better your position.",
  },
  {
    question: "Should I focus on one row at a time in Gaps?",
    answer:
      "Yes — focusing on 1-2 rows at a time is more effective than trying to advance all four rows simultaneously. Complete sequences in one row lock more cards during redeals, giving you a better position after the shuffle. Prioritize the row where the most progress is already made.",
  },
  {
    question: "What should I do with gaps next to Kings in Gaps Solitaire?",
    answer:
      "Gaps to the right of Kings are dead — nothing can fill them because Kings are the highest rank and no card is one rank higher than a King. Avoid creating these situations. If a King is near the right side of the grid, try to work around it. Dead gaps next to Kings are permanent until a redeal shuffles things around.",
  },
];

export default function GapsTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Gaps (Montana) Solitaire", item: absoluteUrl("/gaps") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/gaps/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Gaps (Montana) Solitaire Tips & Tricks",
        description: "Practical tips for arranging the 4x13 grid in Gaps Solitaire.",
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
        title="Gaps (Montana) Solitaire Tips & Tricks"
        kicker={<><Link href="/gaps" className="hover:text-white transition-colors">Gaps Solitaire</Link> / Tips</>}
        subtitle="Practical strategies for the grid arrangement puzzle — from dead gap avoidance and chain thinking to redeal timing, row focus, and managing the ~15% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Gaps Solitaire", href: "/gaps" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">avoid creating dead gaps</strong>.
          In Gaps Solitaire, a gap to the right of a King or another gap is useless — nothing can fill it.
          Every dead gap is a wasted opportunity. Keep your gaps live (to the right of cards below King rank)
          and think in chains: each card you slide into a gap creates a new gap that should enable your next move.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Get 2s Into Column 1 Early
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/gaps" className="text-[var(--gold)] hover:text-white transition-colors">
            Gaps Solitaire
          </Link>
          , leftmost-column gaps can be filled by any 2 (since Aces have been removed, 2s are the lowest
          cards). Getting a 2 into column 1 of a row starts the sequence for that row — and sequences
          starting from column 1 are locked during redeals.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Prioritize rows where a 2 is close to column 1.</strong> If
          there&apos;s a gap in column 1 and a 2 nearby, move it there immediately. Once the 2 is in
          place, you can start building the sequence: 3, 4, 5... of the same suit extending to the right.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If multiple 2s are available for column 1 positions, choose the
            one whose suit has the most consecutive cards nearby. A 2 of Hearts is most useful when
            the 3, 4, and 5 of Hearts are in the same row or easily reachable.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Avoid Dead Gaps at All Costs
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A dead gap is a gap that cannot be filled. In Gaps Solitaire, this happens in two situations:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Gap to the right of a King:</strong> No card is one rank
            above King, so nothing can fill this gap
          </li>
          <li>
            <strong className="text-white/90">Gap to the right of another gap:</strong> The card that
            fills a gap must be one rank higher and same suit as the card to its left — but a gap has
            no card, so there&apos;s nothing to match
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed mb-4">
          Before every move, ask: &ldquo;Will the gap I create be live or dead?&rdquo; If moving a card
          would leave a gap next to a King, reconsider. Dead gaps reduce your options and accelerate the
          need for a redeal.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Critical rule:</strong> With 4 gaps in the game (one per removed Ace), having even
            2 dead gaps means you&apos;ve lost half your movement capacity. Three dead gaps is usually
            game over unless a redeal is available.
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
          Tip #3: Think in Chains
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every card you slide into a gap creates a new gap where that card was. This new gap might be
          live (fillable) or dead — and the card that fills it creates yet another gap. This chain
          reaction is the core mechanic of Gaps Solitaire.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making a move, trace the chain forward: &ldquo;If I move the 7 of Clubs here, the
          gap moves there. The 8 of Clubs can fill that gap, moving the gap again. Then the 9 of
          Clubs fills that gap...&rdquo; The best moves create long chains that build sequences and
          avoid dead ends.
        </p>
        <p className="text-white/70 leading-relaxed">
          Avoid moves that create immediate dead gaps. A chain that builds 3 cards of a sequence but
          ends with a dead gap next to a King has used one of your 4 gaps permanently. A shorter chain
          that preserves all live gaps is often the better choice.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Focus on 1-2 Rows at a Time
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Trying to advance all four rows simultaneously spreads your gaps too thin. Instead, focus on
          completing one or two rows as far as possible before shifting attention. Complete sequences
          in a row get locked during redeals, giving you a stronger starting position.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Choose the row with the most natural progress.</strong> If
          row 2 already has its 2 in column 1 and the 3, 4, 5 of the same suit are in that row, invest
          your gaps there. Building a sequence of 2-3-4-5-6 in one row locks 5 cards on the next redeal.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> A single row locked from 2 through 8 (7 cards locked) is
            worth far more than four rows each with just 2-3 locked. Concentration beats distribution
            when it comes to redeal strategy.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Time Your Redeals Strategically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          You get 2 redeals (3 total deals). Each redeal locks correctly sequenced cards from column 1,
          shuffles everything else, and creates fresh gaps. Don&apos;t waste redeals by triggering them
          too early — maximize locked cards before each redeal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, also don&apos;t wait too long. If all your gaps are dead and no moves remain, you
          must redeal. The ideal timing is when you&apos;ve locked a good sequence in at least one row
          and have exhausted all productive moves.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">First redeal:</strong> Aim to have at least one row
            with 4-6 locked cards
          </li>
          <li>
            <strong className="text-white/90">Second redeal:</strong> Aim to have one nearly complete
            row and another with 3-4 locked cards
          </li>
          <li>
            <strong className="text-white/90">Final deal:</strong> This is your last chance — every
            move counts, and dead gaps must be minimized
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before redealing, count your locked cards. The redeal shuffles
            everything except locked sequences, so more locked cards means fewer random cards in the
            new layout — making the post-redeal position more manageable.
          </p>
        </div>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Watch King Positions
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings are the most dangerous cards in Gaps Solitaire. They belong in column 13 (the rightmost
          position) of their suit&apos;s row. Everywhere else, they create potential dead gaps and block
          chain reactions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Be aware of where Kings are sitting. A King in the middle of a row means the gap to its right
          is permanently dead unless you can move the King. Unfortunately, you can only move a King if
          there&apos;s a gap to the right of a Queen of the same suit — a rare situation.
        </p>
        <p className="text-white/70 leading-relaxed">
          When planning chains, route them away from Kings. If you have a choice of where to leave a
          gap, pick the spot that&apos;s not adjacent to a King. Keeping gaps live is the top priority.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Undo to Explore Chain Paths
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps Solitaire&apos;s chain mechanics mean that a single move can cascade into 5-10 subsequent
          moves. It&apos;s hard to predict the full chain in your head. Use undo liberally to try
          different starting moves and see which chain produces the best result.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Try one chain, count how many cards it locks and how many dead gaps it creates. Then undo
          everything and try a different starting move. Compare the outcomes. The optimal first move
          often isn&apos;t obvious until you&apos;ve traced multiple chains.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Gaps is a game where undo is most valuable. The interconnected
            nature of the grid means a single different choice can change the entire trajectory of the
            game. Treat each position as a puzzle with multiple solution paths to explore.
          </p>
        </div>
      </section>

      {/* Win rate context */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          A Challenging Puzzle That Rewards Planning
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Gaps (Montana) Solitaire is one of the more challenging solitaire variants at approximately
          10-20% win rate with skilled play. The grid-based arrangement puzzle requires spatial thinking
          that&apos;s quite different from traditional column-based solitaire games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>.
        </p>
        <p className="text-white/70 leading-relaxed">
          The redeal mechanic gives Gaps a unique rhythm: aggressive sequencing, then strategic redealing,
          then another round of sequencing. Mastering this rhythm — knowing when to push for more cards
          and when to accept a redeal — is what separates good players from great ones.
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
              <strong>Get 2s into column 1.</strong> Starting sequences from the left edge is essential
              for locking cards.
            </li>
            <li>
              <strong>Avoid dead gaps.</strong> Gaps next to Kings or other gaps are permanent wastes
              of movement capacity.
            </li>
            <li>
              <strong>Think in chains.</strong> Each move creates a new gap — trace the full chain
              before committing.
            </li>
            <li>
              <strong>Focus on 1-2 rows.</strong> Concentration beats distribution for locking cards
              before redeals.
            </li>
            <li>
              <strong>Time redeals carefully.</strong> Maximize locked cards before redealing — but
              don&apos;t wait until all gaps are dead.
            </li>
            <li>
              <strong>Watch King positions.</strong> Kings create dead gaps — route chains away from them.
            </li>
            <li>
              <strong>Use undo extensively.</strong> Try multiple chain paths to find the optimal sequence.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps Solitaire" description="Complete rules, grid layout, and redeal mechanics explained." />
            <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="Gaps rewards chain thinking and dead gap avoidance. Apply these tips and watch your sequences grow longer."
          primaryLabel="Play Gaps Solitaire"
          primaryHref="/gaps"
          secondaryLabel="Learn the Rules"
          secondaryHref="/gaps/how-to-play"
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
          More Gaps (Montana) Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/gaps" title="Play Gaps Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/gaps/how-to-play" title="How to Play Gaps" description="Complete rules, grid layout, and redeal mechanics" />
          <ContentLinkCard href="/monte-carlo/tips" title="Monte Carlo Tips" description="Tips for another grid-based solitaire game" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
