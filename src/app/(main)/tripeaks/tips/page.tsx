import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "TriPeaks Solitaire Tips & Tricks | Win More Games in 2026",
  description:
    "Master TriPeaks Solitaire with proven tips for streak building, peak clearing order, stock management, and card counting. Boost your win rate from beginner to expert.",
  keywords: [
    "tripeaks tips",
    "tripeaks solitaire strategy",
    "tripeaks solitaire tips",
    "tripeaks solitaire tricks",
    "how to win tripeaks solitaire",
    "tripeaks solitaire help",
    "tripeaks winning tips",
    "tripeaks streak strategy",
    "tripeaks card counting",
    "tripeaks peak clearing order",
  ],
  openGraph: {
    title: "TriPeaks Solitaire Tips & Tricks | Win More Games",
    description:
      "Proven tips for streak building, peak clearing, and stock management in TriPeaks Solitaire. Learn the strategies that separate beginners from experts.",
    url: absoluteUrl("/tripeaks/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for TriPeaks Solitaire?",
    answer:
      "Build long streaks. Every consecutive card you remove without drawing from the stock multiplies your score and clears the board faster. Plan your removal sequences to chain as many cards together as possible before breaking the streak.",
  },
  {
    question: "Should I clear the side peaks or center peak first?",
    answer:
      "Always prioritize the side peaks first. The center peak's cards overlap with both side peaks, so clearing the sides first naturally exposes more of the center peak's foundation cards. Attacking the center peak too early often leaves you stuck with isolated cards on the sides.",
  },
  {
    question: "How often should I be able to win TriPeaks Solitaire?",
    answer:
      "TriPeaks is one of the more winnable solitaire variants — roughly 90% of deals are solvable with perfect play. Beginners typically win 50–60% of games, intermediate players hit 70–80%, and experts can reach 85–90%. If you're below these numbers, focus on streak building and stock management.",
  },
  {
    question: "Is card counting useful in TriPeaks Solitaire?",
    answer:
      "Yes, basic card counting is very helpful. Since you can see many cards on the tableau, tracking which ranks have been played helps you predict what's in the stock pile and under face-down cards. If three Kings have been played, that last King is likely buried — plan accordingly.",
  },
  {
    question: "When should I draw from the stock pile in TriPeaks?",
    answer:
      "Only draw from the stock when you have no playable cards on the tableau, or when drawing will set up a longer streak than your current options. Every stock draw breaks your streak and costs potential points, so exhaust all visible options first. Think of the stock as a last resort, not a convenience.",
  },
];

export default function TriPeaksTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "TriPeaks Solitaire", item: absoluteUrl("/tripeaks") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/tripeaks/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "TriPeaks Solitaire Tips & Tricks",
        description: "Proven tips for winning more TriPeaks Solitaire games at every skill level.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-21",
        dateModified: "2026-03-21",
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
        title="TriPeaks Solitaire Tips & Tricks"
        kicker={<><Link href="/tripeaks" className="hover:text-white transition-colors">TriPeaks Solitaire</Link> / Tips</>}
        subtitle="Practical advice that will immediately improve your win rate — from streak building fundamentals to advanced peak clearing strategies."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "TriPeaks Solitaire", href: "/tripeaks" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">build long streaks and clear side peaks first</strong>.
          Every consecutive card removal multiplies your score, and attacking the side peaks
          before the center opens up the board naturally. Master these two principles and
          your win rate will jump immediately.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Build Long Streaks for Maximum Points
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In TriPeaks Solitaire, every consecutive card you remove without drawing from
          the stock builds your streak multiplier. The first card scores base points, but
          each subsequent card in the streak is worth progressively more. A 10-card streak
          is worth dramatically more than ten individual single-card removals.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This scoring mechanic is the heart of TriPeaks strategy. Before removing a card,
          look at the entire tableau and ask: &ldquo;Can I chain this into a longer
          sequence?&rdquo; Sometimes the best move isn&apos;t the obvious one — it&apos;s
          the one that sets up a five or six card streak.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before removing any card, scan the entire tableau for
            chain opportunities. A card that&apos;s one rank away from three other exposed
            cards is the start of a massive streak — don&apos;t waste it by playing it in
            isolation.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Clear Side Peaks Before the Center
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The three peaks in TriPeaks aren&apos;t equal. The center peak overlaps with both
          side peaks, meaning its foundation cards support cards from all three pyramids.
          If you attack the center first, you often leave isolated cards stranded on the
          sides with no way to reach them.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Instead, focus on dismantling the left and right peaks first. As you clear the
          sides, you naturally expose the cards supporting the center peak. By the time you
          turn your attention to the center, most of its foundation is already uncovered.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> When you have a choice between removing a card
            from a side peak or the center peak, choose the side peak. The exception is
            when the center card extends a long streak — then the points may be worth it.
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
          Tip #3: Manage Your Stock Pile Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile is your lifeline in TriPeaks — it provides new base cards when
          the tableau offers no matches. But every draw from the stock breaks your streak
          and burns through a finite resource. Once the stock is empty, any cards left on
          the tableau mean a loss.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Think of stock cards as currency. Each one is an opportunity to restart a streak,
          but they&apos;re non-renewable. Before drawing, make absolutely sure there are no
          playable cards on the tableau — check every exposed card, not just the obvious ones.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Advanced players sometimes draw from the stock even when a tableau match exists,
          but only when the stock card is likely to start a longer streak than the current
          option. This is a calculated risk that requires card counting skills.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Drawing from the stock too quickly is the #1
            reason beginners lose winnable games. Always scan the full tableau before
            drawing. That matching card on the far side of the board is easy to miss.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Count Cards to Predict What&apos;s Coming
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          TriPeaks uses a standard 52-card deck, with 28 cards on the tableau (18
          face-down, 10 face-up) and 24 in the stock. Since you can see the face-up
          tableau cards and the discard pile, you can make educated guesses about what&apos;s
          hidden.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Start simple: track the four ranks you need most. If you need a 7 to continue a
          streak and you&apos;ve already seen three 7s played, the odds of finding the last
          one are low — you might be better off breaking the streak now and trying a
          different approach.
        </p>
        <p className="text-white/70 leading-relaxed">
          As you get more comfortable, expand your tracking. Knowing that all four Jacks
          are accounted for tells you no Jack will appear from the stock — which affects
          whether Queens and 10s on the tableau are accessible.
        </p>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Know When to Break a Streak
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          It sounds counterintuitive after emphasizing streaks, but sometimes the smartest
          move is to deliberately end one. A short streak that exposes three face-down
          cards is often worth more than a long streak that leaves the peaks untouched.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The goal isn&apos;t to maximize the score on any single streak — it&apos;s to
          clear the entire board. If extending your streak means removing cards from the
          base of the tableau while leaving the peaks intact, you&apos;re scoring points
          but not progressing toward a win.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Break a streak when doing so exposes multiple
            face-down cards or uncovers a peak card. The information and access you gain
            is worth more than the extra streak points you&apos;d earn.
          </p>
        </div>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Your Removal Sequences
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          When multiple cards are playable, the order you remove them matters enormously.
          Removing card A first might expose card B, which chains into card C. But removing
          card C first might strand card A with no path forward.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making a move, trace the consequences: &ldquo;If I remove this 5, it
          exposes a 6 and a 4. The 6 chains to the 7 on the left peak, and the 4 chains
          to the 3 in the center. That&apos;s a four-card streak.&rdquo; Compare that
          to the alternative removal order and choose the path that produces the longest
          chain.
        </p>
        <p className="text-white/70 leading-relaxed">
          This planning habit is what separates intermediate players from experts. It takes
          practice, but even thinking one move ahead will significantly improve your
          results.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Undo to Explore Better Lines
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          TriPeaks involves hidden information — 18 face-down cards that you can&apos;t
          see. No amount of skill can predict exactly what&apos;s underneath. Using undo to
          test different removal orders isn&apos;t cheating — it&apos;s using the tools
          available to make better decisions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you&apos;re unsure which card to remove first, try one path, see what it
          reveals, then undo and try the alternative. This &ldquo;look ahead&rdquo;
          technique helps you find optimal sequences that aren&apos;t obvious at first
          glance.
        </p>
        <p className="text-white/70 leading-relaxed">
          If you prefer a purer challenge, save undo-free play for games where you&apos;re
          already comfortable with the strategy. Use undo during your learning phase to
          build intuition for which removal orders tend to work best.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Work the Base Cards First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The bottom row of the tableau — the fully exposed cards that aren&apos;t covered
          by any other cards — is where most of your early-game action happens. These base
          cards are immediately playable and removing them exposes the face-down cards in
          the rows above.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Prioritize removing base cards that uncover two cards above them over those that
          uncover only one. Each face-down card you reveal is new information and a new
          potential chain link. The more cards you can see, the better your planning
          becomes.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> In the early game, focus on the base row to
            open up the board. Save stock draws for the mid and late game when the
            tableau has fewer options. A strong opening sets up the entire game.
          </p>
        </div>
      </section>

      {/* Win rates */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What Win Rate Should You Expect?
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          TriPeaks is one of the more forgiving solitaire variants — roughly 90% of deals
          are solvable with optimal play. Setting realistic expectations for your skill
          level prevents frustration and helps you track improvement:
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Skill Level</span>
              <span>Win Rate</span>
              <span>Key Focus</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Beginner</span>
              <span>50–60%</span>
              <span className="text-emerald-400">Learn streak basics</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>Intermediate</span>
              <span>70–80%</span>
              <span className="text-amber-400">Peak order & stock mgmt</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>Expert</span>
              <span>85–90%</span>
              <span className="text-red-400">Card counting & sequencing</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          These numbers assume thoughtful play with occasional undo use. Speed-playing
          without thinking will produce much lower rates. If your win rate is significantly
          below your skill level&apos;s range, focus on the tips above — especially streak
          building and clearing side peaks first.
        </p>
      </section>

      {/* Quick reference */}
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
              <strong>Build long streaks.</strong> Chain consecutive removals for maximum
              points and board clearing.
            </li>
            <li>
              <strong>Clear side peaks before the center.</strong> The center peak
              naturally opens as the sides fall.
            </li>
            <li>
              <strong>Manage your stock carefully.</strong> Every draw breaks your streak
              and burns a finite resource.
            </li>
            <li>
              <strong>Count cards to predict hidden values.</strong> Track which ranks
              have been played.
            </li>
            <li>
              <strong>Break streaks strategically.</strong> Exposing face-down cards can
              be worth more than points.
            </li>
            <li>
              <strong>Plan removal sequences.</strong> The order you remove cards
              determines your chain length.
            </li>
            <li>
              <strong>Use undo to explore.</strong> Test different paths to find optimal
              removal orders.
            </li>
            <li>
              <strong>Work the base cards first.</strong> Open up the board early for
              better mid-game options.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Related Guides ── */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/tripeaks/how-to-play" title="How to Play TriPeaks" description="Complete rules, setup, and scoring for TriPeaks Solitaire." />
            <ContentLinkCard href="/tripeaks" title="Play TriPeaks Solitaire" description="Put these tips into practice with our free online game." />
            <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell Solitaire game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Start focusing on streak building and side-peak clearing, and watch your win rate climb."
          primaryLabel="Play TriPeaks Solitaire"
          primaryHref="/tripeaks"
          secondaryLabel="How to Play TriPeaks"
          secondaryHref="/tripeaks/how-to-play"
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

      {/* Related content */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More TriPeaks Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/tripeaks" title="Play TriPeaks Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/tripeaks/how-to-play" title="How to Play TriPeaks" description="Complete rules, setup, and scoring guide" />
          <ContentLinkCard href="/tips" title="FreeCell Tips & Tricks" description="Tips for the classic FreeCell Solitaire game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy Guide" description="Advanced strategies for experienced players" />
          <ContentLinkCard href="/solitaire-types" title="Solitaire Types" description="Explore all the solitaire variants you can play" />
          <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" description="Rules and setup for FreeCell Solitaire" />
        </div>
      </section>
    </ContentLayout>
  );
}
