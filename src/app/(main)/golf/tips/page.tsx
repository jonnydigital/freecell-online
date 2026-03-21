import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Golf Solitaire Tips & Tricks | Clear the Tableau More Often",
  description:
    "Practical Golf Solitaire tips to boost your win rate. Learn column scanning, streak building, King-Ace wrapping, stock conservation, and when to restart a lost game.",
  keywords: [
    "golf solitaire tips",
    "golf solitaire strategy",
    "golf card game tips",
    "golf solitaire tips and tricks",
    "how to win golf solitaire",
    "golf solitaire help",
    "golf solitaire winning tips",
    "golf solitaire beginner tips",
    "tips for golf solitaire",
    "golf solitaire advice",
    "win golf solitaire more often",
  ],
  openGraph: {
    title: "Golf Solitaire Tips & Tricks | Clear the Tableau More Often",
    description:
      "Practical tips for winning more Golf Solitaire games. Learn to scan columns, build long streaks, conserve stock cards, and optimize your score.",
    url: absoluteUrl("/golf/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Golf Solitaire?",
    answer:
      "Scan all seven columns before playing a card. The biggest mistake is grabbing the first match you see. Taking a few seconds to identify all playable cards lets you pick the one that starts the longest possible run. This single habit will improve your score more than any other tip.",
  },
  {
    question: "Does King-Ace wrapping make Golf Solitaire easier?",
    answer:
      "Yes, significantly. Without wrapping, Kings and Aces are dead ends — a King can only follow a Queen, and an Ace can only follow a 2. With wrapping enabled, you can play a King on an Ace or an Ace on a King, which roughly doubles your win rate from around 25–30% to 50–60%.",
  },
  {
    question: "How often can you win Golf Solitaire?",
    answer:
      "It depends on the ruleset. Without King-Ace wrapping, expect to win roughly 25–30% of games with strong play. With wrapping enabled, skilled players can win 50–60% of deals. Many deals are unwinnable regardless of skill, so don't be discouraged by losses — focus on making optimal decisions each game.",
  },
  {
    question: "Should I draw from the stock immediately or wait?",
    answer:
      "Wait. Only draw from the stock pile when no tableau card can be played on the current waste card. Every stock card you draw is one fewer chance to extend a run later. Exhausting the stock too early leaves you stuck with tableau cards that have no matches. Patience with the stock is one of the biggest differentiators between beginners and experienced players.",
  },
  {
    question: "When should I restart a Golf Solitaire game?",
    answer:
      "Restart when you've exhausted your stock pile and no more moves are available with several tableau cards remaining. Also consider restarting early if you notice that key connector cards (mid-range values like 6, 7, 8) are buried at the bottom of multiple columns — these deals are very hard to win. Recognizing dead-end positions early saves time for winnable games.",
  },
];

export default function GolfTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Golf Solitaire", item: absoluteUrl("/golf") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/golf/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Golf Solitaire Tips & Tricks",
        description: "Practical tips for clearing the tableau more often in Golf Solitaire.",
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
        title="Golf Solitaire Tips & Tricks"
        kicker={<><Link href="/golf" className="hover:text-white transition-colors">Golf Solitaire</Link> / Tips</>}
        subtitle="Practical advice to clear the tableau more often — from column scanning to streak building, stock conservation, and scoring optimization."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Golf Solitaire", href: "/golf" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">don&apos;t draw from the stock until you&apos;re stuck</strong>.
          Golf Solitaire rewards patience and long runs. Every card you can play from the
          tableau without touching the stock pile is a card closer to clearing the board. Build
          the longest streaks possible before reaching for the draw pile.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Scan All Columns Before Playing
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The single biggest mistake in{" "}
          <Link href="/golf" className="text-[var(--gold)] hover:text-white transition-colors">
            Golf Solitaire
          </Link>{" "}
          is playing the first card you spot that&apos;s one rank above or below the waste
          card. Every card you play changes which cards become available in that column.
          Playing the wrong card first can strand cards you need later and cut short a
          potential run.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any play, quickly scan all seven columns and ask yourself:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Which cards are playable?</strong> Check every
            column&apos;s top card against the current waste card.
          </li>
          <li>
            <strong className="text-white/90">Which play starts the longest run?</strong> Look
            at what&apos;s underneath — if playing a 7 exposes a 6 or 8, that&apos;s a
            chain waiting to happen.
          </li>
          <li>
            <strong className="text-white/90">Are any columns nearly empty?</strong> Clearing a
            column completely is always valuable — fewer columns means fewer dead ends.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Spend 5–10 seconds scanning the initial layout before
            your first move. Identify which columns have sequential cards near the top —
            those are your best early targets for building long runs.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build the Longest Runs Possible
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Golf Solitaire, you can play any tableau card that is exactly one rank above or
          below the current waste card. A &ldquo;run&rdquo; or &ldquo;streak&rdquo; is a
          sequence of consecutive plays without drawing from the stock. Long runs are the key
          to clearing the board.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For example, if the waste card is a 7, you could play a 6, then a 5 or 7 from
          another column, then continue chaining up and down. The longer your run, the more
          cards you remove without spending stock cards.
        </p>
        <p className="text-white/70 leading-relaxed">
          When you have a choice between two playable cards, always pick the one that keeps
          the run going. A 6 that exposes a 7 underneath is far more valuable than a 6 that
          exposes a 2 with no immediate continuation.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Use King-Ace Wrapping to Your Advantage
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many Golf Solitaire variants allow &ldquo;wrapping&rdquo; — playing a King on an
          Ace or an Ace on a King. This rule dramatically changes the game because Kings and
          Aces are no longer dead ends that stop your runs cold.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Without wrapping, a King can only be played on a Queen, and nothing can be played on
          a King. This means every King in the waste pile is a full stop. With wrapping, Kings
          connect to Aces, creating a continuous loop of ranks that keeps your streaks alive.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategy shift:</strong> When wrapping is enabled, Aces and Kings become
            connector cards rather than blockers. Seek out King-Ace transitions to extend runs
            that would otherwise end. This single rule change can nearly double your win rate
            from ~25–30% to ~50–60%.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Conserve the Stock — Don&apos;t Draw Until Stuck
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile is your lifeline in Golf Solitaire. You typically get 16–17 stock
          cards (the cards not dealt to the tableau), and once they&apos;re gone, any
          remaining tableau cards are stuck. Every unnecessary draw is a wasted opportunity.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before drawing, double-check every column. It&apos;s easy to miss a playable card
          when you&apos;re focused on one area of the board. Only reach for the stock when
          you&apos;ve confirmed that absolutely no tableau card matches the waste card.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Exhaust all tableau plays first.</strong> Even
            playing one extra card before drawing makes a difference over many games.
          </li>
          <li>
            <strong className="text-white/90">Think of stock cards as currency.</strong> Each
            one buys you a new waste card to match against. Spend them wisely.
          </li>
          <li>
            <strong className="text-white/90">Count remaining stock cards.</strong> Knowing how
            many draws you have left helps you gauge whether the game is still winnable.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> If you have 10 tableau cards remaining but only 3 stock
            cards left, you need to average a run of over 3 cards per stock draw to clear the
            board. Recognizing these numbers early helps you decide whether to play on or restart.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Zigzag Runs Across Multiple Columns
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The best Golf Solitaire players don&apos;t just play cards from one column — they
          zigzag across the entire tableau. A run might start with a 5 from column 1, then
          grab a 6 from column 4, then a 7 from column 2, then back to an 8 from column 5.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This cross-column thinking is what separates beginners from experienced players.
          When you spot a playable card, don&apos;t just look at that column — immediately
          scan the other six columns for the next link in the chain.
        </p>
        <p className="text-white/70 leading-relaxed">
          Zigzagging also has the benefit of thinning out multiple columns simultaneously,
          rather than emptying one column while leaving others untouched. Evenly reducing
          column heights gives you more exposed cards and more options on every turn.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Your Removal Order Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          When multiple cards are playable, the order in which you remove them matters
          enormously. Playing a 6 before a 4 might expose a 5 that chains into a longer run.
          Playing them in the wrong order could leave you stuck after just one move.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before committing to a play, peek at the card underneath (if visible) and ask:
          &ldquo;Will the card beneath continue my run?&rdquo; If the answer is yes, that&apos;s
          the card to play first. If two cards both continue the run, play the one from the
          taller column to maximize the cards you expose.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> When choosing between two equally valid plays,
            prefer the card from the tallest column. Reducing the tallest columns first
            creates a more even board with more exposed cards and more future options.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Count Remaining Cards by Rank
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          There are four of each rank in the deck. If you&apos;ve already played three 8s to
          the waste pile and the fourth is buried deep in a column, you know that any 7s or
          9s sitting on top of it can only be removed if the remaining 8 surfaces at the
          right time. This kind of awareness prevents you from banking on matches that
          can&apos;t happen.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          You don&apos;t need to track every card. Focus on the ranks that matter to your
          current situation. If the waste card is a 10 and you need to keep your run going,
          check whether any 9s or Jacks are still available on the tableau. If none are
          visible, you&apos;ll need to draw.
        </p>
        <p className="text-white/70 leading-relaxed">
          Card counting also helps you evaluate whether a game is still winnable. If critical
          connector ranks have all been played and the remaining tableau cards can&apos;t form
          runs, it&apos;s time to restart.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Know When to Restart
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every Golf Solitaire deal is winnable. Without King-Ace wrapping, roughly
          70–75% of deals are unwinnable no matter how well you play. Recognizing a
          dead game early saves time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Signs that a game is probably lost:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            You&apos;ve exhausted the stock pile with several tableau cards remaining
          </li>
          <li>
            Multiple Kings (without wrapping) are buried deep in columns, blocking cards
            you need
          </li>
          <li>
            The remaining tableau cards are all far apart in rank with no connectors
            available
          </li>
          <li>
            Critical mid-range cards (6s, 7s, 8s) are concentrated at the bottom of
            the tallest columns
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t feel bad about restarting.</strong> Good Golf Solitaire players
            restart frequently, especially without wrapping. Getting a fresh deal and
            applying these tips to a winnable game is far more productive than grinding
            away at an impossible one. The goal is to win <em>more games over time</em>,
            not to force every deal.
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
          Golf Solitaire&apos;s win rate depends heavily on whether King-Ace wrapping is
          allowed. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          (where draw-1 gives decent odds), Golf without wrapping has a lower ceiling on
          what&apos;s achievable.
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Ruleset</span>
              <span>Win Rate</span>
              <span>Notes</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>No wrapping (beginner)</span>
              <span>5–15%</span>
              <span className="text-white/50">Learning the basics</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>No wrapping (skilled)</span>
              <span>25–30%</span>
              <span className="text-amber-400">Scanning + stock conservation</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>With wrapping (beginner)</span>
              <span>25–35%</span>
              <span className="text-white/50">Wrapping offsets mistakes</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>With wrapping (skilled)</span>
              <span>50–60%</span>
              <span className="text-emerald-400">Full strategy + King-Ace chains</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          If you&apos;re playing without wrapping and consistently below 15%, focus on Tips
          #1 and #4 above. If you&apos;re in the 20–25% range, Tips #5 and #7 (zigzagging
          and counting) will push you higher. Switching to a wrapping variant is the single
          biggest win-rate boost available.
        </p>
      </section>

      {/* Scoring optimization */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Scoring Optimization: Understanding Par
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Golf Solitaire uses a scoring system inspired by the sport of golf — lower scores
          are better, and &ldquo;par&rdquo; is the benchmark. In the standard par scoring
          system, par equals the number of stock cards (typically 16 or 17).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here&apos;s how it works: each card remaining on the tableau at the end of the game
          counts as +1 (over par). Each card you clear beyond emptying the tableau counts
          as −1 (under par). A perfect game — clearing every tableau card — scores at or
          below par depending on how many stock cards you had left over.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">+5 or higher:</strong> Rough game — several
            cards stranded on the tableau
          </li>
          <li>
            <strong className="text-white/90">+1 to +4:</strong> Close but not quite — a
            slightly longer run could have cleared the board
          </li>
          <li>
            <strong className="text-white/90">0 (par):</strong> Cleared the tableau using
            exactly all stock cards
          </li>
          <li>
            <strong className="text-white/90">Below par (negative):</strong> Excellent —
            cleared the tableau with stock cards to spare
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Scoring tip:</strong> Even when you can&apos;t fully clear the tableau,
            minimizing your score matters. Removing just one or two extra cards per game
            compounds over a session. Track your average score across games to measure
            improvement — it&apos;s a more reliable metric than win rate alone.
          </p>
        </div>
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
              <strong>Scan all columns before playing.</strong> Identify every playable card,
              then pick the best one.
            </li>
            <li>
              <strong>Build long runs.</strong> Chain cards across columns to maximize each
              stock draw.
            </li>
            <li>
              <strong>Use King-Ace wrapping.</strong> When allowed, treat Kings and Aces as
              connectors, not dead ends.
            </li>
            <li>
              <strong>Don&apos;t draw until stuck.</strong> Exhaust all tableau plays before
              touching the stock pile.
            </li>
            <li>
              <strong>Zigzag across columns.</strong> Jump between columns to extend runs
              and thin the board evenly.
            </li>
            <li>
              <strong>Plan your removal order.</strong> Play cards that expose continuations
              underneath.
            </li>
            <li>
              <strong>Count cards by rank.</strong> Know which connectors are still available
              before banking on a run.
            </li>
            <li>
              <strong>Restart unwinnable games.</strong> Recognizing dead ends saves time for
              winnable deals.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/golf/how-to-play" title="How to Play Golf Solitaire" description="Complete rules, setup, and card mechanics explained." />
            <ContentLinkCard href="/golf" title="Play Golf Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your score drop."
          primaryLabel="Play Golf Solitaire"
          primaryHref="/golf"
          secondaryLabel="Learn the Rules"
          secondaryHref="/golf/how-to-play"
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
          More Golf Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/golf" title="Play Golf Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/golf/how-to-play" title="How to Play Golf Solitaire" description="Complete rules, setup, and scoring explained" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/spider/tips" title="Spider Solitaire Tips" description="Tips for 1-suit, 2-suit, and 4-suit Spider" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
