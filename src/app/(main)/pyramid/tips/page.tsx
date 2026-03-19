import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Pyramid Solitaire Tips & Tricks | Clear the Pyramid More Often",
  description:
    "Practical Pyramid Solitaire tips that will immediately improve your win rate. Learn when to remove Kings, how to scan before matching, stock pile cycling strategy, and when to restart a lost game.",
  keywords: [
    "pyramid solitaire tips",
    "pyramid solitaire tips and tricks",
    "how to win pyramid solitaire",
    "pyramid solitaire help",
    "pyramid solitaire winning tips",
    "pyramid solitaire beginner tips",
    "tips for pyramid solitaire",
    "pyramid solitaire advice",
    "win pyramid solitaire more often",
    "pyramid card game tips",
  ],
  openGraph: {
    title: "Pyramid Solitaire Tips & Tricks | Clear the Pyramid More Often",
    description:
      "Practical tips for winning more Pyramid Solitaire games. Learn to scan before matching, prioritize Kings, and manage the stock pile like a pro.",
    url: absoluteUrl("/pyramid/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Pyramid Solitaire?",
    answer:
      "Scan the entire pyramid before making any matches. Rushing into the first pair you spot is the most common mistake. Take a few seconds to identify all available pairs, then choose the one that uncovers the most useful cards underneath. This single habit will improve your win rate more than any other tip.",
  },
  {
    question: "Should I always remove Kings immediately in Pyramid Solitaire?",
    answer:
      "Almost always, yes. Kings are removed solo (they equal 13 on their own), and leaving them on the board blocks the cards beneath them with no benefit. The only rare exception is when a King is already at the base of the pyramid and isn't blocking anything — but even then, removing it cleans up the board.",
  },
  {
    question: "How often can you win Pyramid Solitaire?",
    answer:
      "Pyramid Solitaire has a lower win rate than FreeCell or Klondike. With solid play, expect to win roughly 1 in 3 games (30–35%). Many deals are mathematically unsolvable regardless of how well you play, so don't be discouraged by frequent losses. Consistent smart play is about maximizing your wins over many games.",
  },
  {
    question: "Should I go through the stock pile fast or slow?",
    answer:
      "Take your time with the stock pile. Each pass through reveals information about which cards are available and in what order. On your first pass, focus on identifying useful cards and their positions. On later passes, plan ahead so you can time your pyramid matches to coincide with useful stock pile cards appearing.",
  },
  {
    question: "When should I restart a Pyramid Solitaire game?",
    answer:
      "Restart when you've exhausted your stock pile passes and the remaining pyramid cards have no available matches, or when key cards are buried behind each other in a way that's impossible to resolve. Learning to recognize dead-end positions early saves time and lets you move on to winnable deals.",
  },
];

export default function PyramidTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Pyramid Solitaire", item: absoluteUrl("/pyramid") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/pyramid/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Pyramid Solitaire Tips & Tricks",
        description: "Practical tips for clearing the pyramid more often in Pyramid Solitaire.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-19",
        dateModified: "2026-03-19",
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
        title="Pyramid Solitaire Tips & Tricks"
        kicker={<><Link href="/pyramid" className="hover:text-white transition-colors">Pyramid Solitaire</Link> / Tips</>}
        subtitle="Practical advice to clear the pyramid more often — from scanning strategy to stock pile management and knowing when to restart."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pyramid Solitaire", href: "/pyramid" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">scan before you match</strong>.
          Pyramid Solitaire rewards patience over speed. Every pair you remove changes
          the board, so taking a few seconds to find the <em>best</em> match (not just
          the first one) is what separates consistent winners from players who get stuck.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Scan the Whole Pyramid Before Matching
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The single biggest mistake in{" "}
          <Link href="/pyramid" className="text-[var(--gold)] hover:text-white transition-colors">
            Pyramid Solitaire
          </Link>{" "}
          is grabbing the first pair you see. Every card you remove changes which cards
          become exposed underneath. Removing the wrong pair first can bury cards you
          need later and create dead ends.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any match, quickly scan all exposed cards in the pyramid and
          the current stock pile card. Ask yourself:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Which pairs are available?</strong> Count all
            valid combinations totaling 13 among the exposed cards.
          </li>
          <li>
            <strong className="text-white/90">Which match uncovers the most?</strong> Prioritize
            pairs where both cards are blocking other cards beneath them.
          </li>
          <li>
            <strong className="text-white/90">Are any cards double-blocked?</strong> If a card
            has two cards on top of it, you need to clear both before reaching it.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Spend 5–10 seconds scanning the initial layout before
            your first move. Identify Kings (free removals), obvious pairs, and any cards
            that are deeply buried. This quick read of the board pays off enormously.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Remove Kings Immediately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings are unique in Pyramid Solitaire — they equal 13 on their own and can be
          removed without a matching partner. A King sitting on the pyramid is pure dead
          weight: it blocks the cards beneath it and serves no useful purpose.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Whenever an exposed King appears, remove it right away. This applies whether
          the King is in the pyramid itself or surfaces from the stock pile. Every King
          you clear opens up the board and brings you closer to the cards underneath.
        </p>
        <p className="text-white/70 leading-relaxed">
          Since there are four Kings in the deck, clearing all of them early gives you
          significantly more flexibility. Think of each King removal as a free move —
          no cost, only benefit.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Work From the Bottom Up
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The pyramid&apos;s base row has seven cards, and each one blocks zero cards
          beneath it. The apex (top card) blocks every card in the pyramid. This means
          clearing base-row cards first is less impactful than clearing cards higher up
          that are blocking multiple rows.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, you often need to clear base cards to expose the ones above them. The
          key insight is to focus on creating &ldquo;paths&rdquo; upward — find a column
          where clearing two or three base cards exposes a chain of matches leading
          toward the top of the pyramid.
        </p>
        <p className="text-white/70 leading-relaxed">
          Avoid clearing isolated base cards that don&apos;t contribute to uncovering useful
          cards above. Every removal should be part of a plan to open up more of the
          pyramid, not just a reflexive match because two numbers happen to add to 13.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Manage the Stock Pile Strategically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile (also called the draw pile or talon) contains 24 cards you flip
          through one at a time. Many players treat the stock pile as an afterthought —
          just flipping cards hoping for a match. Strategic players treat it as a
          resource to be managed.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          On your first pass through the stock pile, pay attention to the order of cards
          and mentally note where key cards appear. On later passes, you can time your
          pyramid matches to coincide with stock pile cards you know are coming.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Don&apos;t rush through it.</strong> Flip
            deliberately and consider each card against all exposed pyramid cards.
          </li>
          <li>
            <strong className="text-white/90">Match stock-to-stock when possible.</strong> Pairing
            two stock pile cards with each other frees up space without changing the pyramid.
          </li>
          <li>
            <strong className="text-white/90">Track which cards have passed.</strong> If you
            need a 5 to match an 8 in the pyramid, knowing whether any 5s remain in the
            stock helps you decide whether to wait or try another approach.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If you have a choice between matching a stock
            pile card with a pyramid card or saving it for a later pass, consider whether
            removing that pyramid card opens up more of the board. If it doesn&apos;t, saving
            the stock card might be the better move.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Count Cards to Avoid Dead Ends
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          There are four of each rank in a standard deck. If you&apos;ve already removed
          three Queens and the fourth is buried deep in the pyramid, you know that the
          remaining Ace (Queen&apos;s partner to make 13) has no match left. This kind of
          counting reveals dead ends before you waste moves pursuing them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          You don&apos;t need to memorize the entire deck. Focus on tracking the cards
          involved in your current plan. If you&apos;re trying to clear a 9 from the pyramid,
          check whether enough 4s are still in play to make that possible.
        </p>
        <p className="text-white/70 leading-relaxed">
          Card counting also helps with the stock pile — if all four 6s have already been
          paired off, you know that any 7s left in the stock can only match with pyramid
          cards, not other stock cards. This information shapes your strategy.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Don&apos;t Rush to Remove Aces and 2s
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces pair with Queens (1+12=13) and 2s pair with Jacks (2+11=13). These are
          high-value pairings because Queens and Jacks are hard to remove any other way.
          If you prematurely pair off an Ace with a Queen when another Queen is buried
          deeper, you might strand that second Queen later.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before removing a low card, check whether its partner rank has other copies
          still in play. If there&apos;s only one Queen left and one Ace left, that match
          is forced — go ahead. But if there are two Queens on the board and one Ace in
          hand, you need to decide which Queen is more valuable to remove based on what
          it unblocks.
        </p>
        <p className="text-white/70 leading-relaxed">
          This is where Tip #5 (counting) works hand-in-hand with smart pairing decisions.
          The players who win consistently are the ones who think about <em>which</em> copy
          of a card to match, not just whether a match exists.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Plan Multiple Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Pyramid Solitaire might look like a simple matching game, but the best players
          think in sequences, not single pairs. Before removing a pair, trace the
          consequences: &ldquo;If I remove this 3 and 10, it exposes a 6 and a Jack. The
          Jack can pair with the 2 I see in the stock pile, and the 6 can pair with the 7
          on the right side of the pyramid.&rdquo;
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Even looking just two moves ahead dramatically improves your play. Three moves
          ahead and you&apos;ll start spotting chain reactions that clear entire sections of the
          pyramid in a single sequence.
        </p>
        <p className="text-white/70 leading-relaxed">
          This is a skill that develops with practice. If you&apos;re new to multi-move
          planning, start by asking one question before each match: &ldquo;What does removing
          this pair give me access to?&rdquo; That single question builds the habit.
        </p>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When to Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every Pyramid Solitaire deal is winnable. In fact, roughly two-thirds of
          deals are estimated to be unsolvable no matter how well you play. Recognizing a
          dead game early saves time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a game is probably lost:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            You&apos;ve gone through the stock pile completely with no matches available
          </li>
          <li>
            Key cards are blocked behind each other (e.g., a Queen blocks the only Ace
            that could remove it)
          </li>
          <li>
            Multiple high-value cards (10s, Jacks, Queens) are stacked directly on top
            of each other in the pyramid
          </li>
          <li>
            All copies of a needed rank have already been removed or are inaccessible
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Good Pyramid players
            restart frequently. Getting a fresh deal and applying these tips to a
            solvable game is far more productive than grinding away at an impossible one.
            The goal is to win <em>more games over time</em>, not to force every deal.
          </p>
        </div>
      </section>

      {/* Win rate expectations */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What Win Rate Should You Expect?
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Pyramid Solitaire is one of the harder solitaire variants. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (where draw-1 gives decent odds), many Pyramid deals are unwinnable from the
          start.
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Skill Level</span>
              <span>Win Rate</span>
              <span>Notes</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Beginner</span>
              <span>5–15%</span>
              <span className="text-white/50">Learning the pairing mechanic</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Intermediate</span>
              <span>20–30%</span>
              <span className="text-amber-400">Scanning and basic counting</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>Expert</span>
              <span>30–35%</span>
              <span className="text-emerald-400">Full card tracking + multi-move planning</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          These rates assume a standard single-deck Pyramid with three stock pile passes.
          If you&apos;re consistently below 15%, focus on Tips #1 and #2 above. If you&apos;re
          in the 20–25% range, Tips #5 and #7 (counting and planning ahead) will push
          you higher.
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
              <strong>Scan before matching.</strong> Identify all available pairs, then
              pick the best one.
            </li>
            <li>
              <strong>Remove Kings immediately.</strong> They&apos;re free moves with no
              downside.
            </li>
            <li>
              <strong>Work from the bottom up.</strong> Clear paths toward the apex, not
              random base cards.
            </li>
            <li>
              <strong>Manage the stock pile.</strong> Track card positions across passes
              and time your matches.
            </li>
            <li>
              <strong>Count cards.</strong> Know which ranks are still available before
              committing to a plan.
            </li>
            <li>
              <strong>Don&apos;t rush Aces and 2s.</strong> Choose <em>which</em> Queen or
              Jack to pair based on board position.
            </li>
            <li>
              <strong>Plan 2–3 moves ahead.</strong> Ask &ldquo;what does this match
              uncover?&rdquo;
            </li>
            <li>
              <strong>Restart unwinnable games.</strong> Recognizing dead ends saves time
              for winnable deals.
            </li>
          </ol>
        </div>
      </section>

      {/* Card values reference */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Pyramid Solitaire Pairs Quick Reference
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Every pair in Pyramid Solitaire must total 13. Here&apos;s the complete list of
          valid pairings, so you never miss a match:
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 text-white/70">
            <div><strong className="text-white/90">A + Q</strong> <span className="text-white/40">(1+12)</span></div>
            <div><strong className="text-white/90">2 + J</strong> <span className="text-white/40">(2+11)</span></div>
            <div><strong className="text-white/90">3 + 10</strong> <span className="text-white/40">(3+10)</span></div>
            <div><strong className="text-white/90">4 + 9</strong> <span className="text-white/40">(4+9)</span></div>
            <div><strong className="text-white/90">5 + 8</strong> <span className="text-white/40">(5+8)</span></div>
            <div><strong className="text-white/90">6 + 7</strong> <span className="text-white/40">(6+7)</span></div>
            <div><strong className="text-[var(--gold)]">K = 13</strong> <span className="text-white/40">(solo)</span></div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          Memorize these pairings until they&apos;re automatic. Faster pair recognition means
          more time spent on strategy and less time doing arithmetic.
        </p>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/pyramid/strategy" title="Pyramid Strategy Guide" description="Advanced techniques for experienced Pyramid players." />
            <ContentLinkCard href="/pyramid/how-to-play" title="How to Play Pyramid" description="Complete rules, setup, and card values explained." />
            <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your win rate climb."
          primaryLabel="Play Pyramid Solitaire"
          primaryHref="/pyramid"
          secondaryLabel="Read the Strategy Guide"
          secondaryHref="/pyramid/strategy"
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
          More Pyramid Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/pyramid" title="Play Pyramid Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/pyramid/how-to-play" title="How to Play Pyramid" description="Complete rules and card pairing values" />
          <ContentLinkCard href="/pyramid/strategy" title="Pyramid Strategy Guide" description="Advanced techniques for consistent wins" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for 1-suit, 2-suit, and 4-suit Spider" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
