import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "../../../components/ContentLayout";
import AdUnit from "../../../components/AdUnit";

export const metadata: Metadata = {
  title: "Spider Solitaire Tips & Tricks | Win More Games in 2026",
  description:
    "Practical Spider Solitaire tips for beginners and experienced players. Learn the #1 rule that separates winners from losers, plus specific advice for 1-suit, 2-suit, and 4-suit games.",
  keywords: [
    "spider solitaire tips",
    "spider solitaire tips and tricks",
    "how to win spider solitaire",
    "spider solitaire help",
    "spider solitaire winning tips",
    "spider solitaire beginner tips",
    "tips for winning spider solitaire 4 suit",
    "spider solitaire strategy tips",
    "spider solitaire advice",
    "win spider solitaire more often",
  ],
  openGraph: {
    title: "Spider Solitaire Tips & Tricks | Win More Games",
    description:
      "Practical tips for 1-suit, 2-suit, and 4-suit Spider Solitaire. Learn to empty columns, build in suit, and set realistic win rate expectations.",
    url: absoluteUrl("/spider/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Spider Solitaire?",
    answer:
      "Empty columns. An empty column in Spider Solitaire is the equivalent of a free cell in FreeCell — it's your most powerful strategic tool. Every move you make should consider whether it helps you create or maintain empty columns. Experienced players will sacrifice short-term progress to keep a column clear.",
  },
  {
    question: "How often should I be able to win Spider Solitaire?",
    answer:
      "Win rates vary dramatically by difficulty. With solid play, you can win nearly every 1-suit game (90%+), roughly half of 2-suit games (40–50%), and about 1 in 3 four-suit games (~33%). If you're below these numbers, these tips will help you improve.",
  },
  {
    question: "Is 4-suit Spider Solitaire possible to win?",
    answer:
      "Yes, the vast majority of 4-suit Spider Solitaire deals are theoretically solvable. The challenge is execution — managing four suits simultaneously requires careful planning. Even expert players only win about a third of their games, so don't be discouraged by losses.",
  },
  {
    question: "Should I always build in suit in Spider Solitaire?",
    answer:
      "Not always. While same-suit sequences are the ultimate goal (they're the only ones you can remove from the board), off-suit builds are sometimes necessary to uncover hidden cards or create empty columns. The key is doing it intentionally — never mix suits unless you have a clear plan to separate them later.",
  },
];

export default function SpiderTipsPage() {
  return (
    <ContentLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Spider Solitaire",
                item: absoluteUrl("/spider"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Tips & Tricks",
                item: absoluteUrl("/spider/tips"),
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Spider Solitaire Tips & Tricks",
            description:
              "Practical tips for winning more Spider Solitaire games at every difficulty level.",
            author: {
              "@type": "Organization",
              name: siteConfig.siteName,
              url: absoluteUrl("/"),
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.siteName,
            },
            datePublished: "2026-03-11",
            dateModified: "2026-03-11",
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      {/* Hero */}
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-3 font-medium">
          <Link href="/spider" className="hover:text-white transition-colors">
            Spider Solitaire
          </Link>{" "}
          / Tips
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black mb-4 leading-[1.1]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Spider Solitaire Tips & Tricks
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          Practical advice that will immediately improve your win rate — whether
          you&apos;re playing 1-suit, 2-suit, or the full 4-suit challenge.
        </p>
      </div>

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">empty columns win games</strong>.
          Every strategic decision in Spider Solitaire should consider whether it
          helps you create, maintain, or effectively use an empty column. Master this
          principle and your win rate will jump immediately.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Empty Columns Are Everything
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          An empty column in Spider Solitaire is like a free cell in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          — it&apos;s temporary storage that lets you rearrange cards that would otherwise
          be stuck. But it&apos;s actually <em>more</em> powerful, because you can place
          entire sequences into an empty column, not just single cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here&apos;s why empty columns matter so much:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Moving blocked cards:</strong> You can temporarily
            park a sequence in an empty column to access buried cards underneath.
          </li>
          <li>
            <strong className="text-white/90">Building longer sequences:</strong> Use an empty
            column as a staging area to assemble same-suit runs that you couldn&apos;t build
            directly.
          </li>
          <li>
            <strong className="text-white/90">Splitting mixed-suit builds:</strong> Off-suit
            sequences can be separated using empty columns, then reassembled in suit.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before making any move, ask yourself: &ldquo;Does this
            move create an empty column? Does it cost me an empty column? Is the trade
            worth it?&rdquo; This simple mental check will prevent most beginner mistakes.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Build in Suit Whenever Possible
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Spider Solitaire, you can stack any card on any card one rank higher — a
          5 of hearts on a 6 of clubs is legal. But only same-suit sequences (5♥ on
          6♥) can be moved as a group and removed from the board when complete.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Off-suit builds are traps. They look productive — you&apos;re organizing cards,
          making the board look tidier — but they create sequences that can&apos;t be
          moved together and can&apos;t be completed. Every off-suit build is a future
          problem you&apos;ll need an empty column to solve.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          That said, off-suit builds aren&apos;t always avoidable. Sometimes you need to
          build off-suit to uncover a hidden card or create an empty column. The
          difference between beginners and experienced players is{" "}
          <em>intention</em>: good players build off-suit with a plan, bad players do
          it because it&apos;s available.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> If you have a choice between placing a card
            in-suit or off-suit, always choose in-suit — even if the off-suit option
            looks more immediately useful. The long-term payoff of same-suit building
            almost always outweighs the short-term convenience.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Uncover Face-Down Cards First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Spider Solitaire starts with 54 cards visible and 50 hidden — nearly half
          the deck is face-down. You can&apos;t plan with cards you can&apos;t see.
          Uncovering hidden cards should be your top priority in the early game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When choosing between two otherwise equal moves, always pick the one that
          reveals a face-down card. The information you gain is worth more than the
          slight positional advantage of the alternative move.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Focus especially on columns with many face-down cards. A column with five
          hidden cards is a bigger problem than one with two — the sooner you start
          digging, the more options you&apos;ll have later.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Don&apos;t Deal New Cards Until You Must
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock pile contains 50 cards dealt 10 at a time. Each deal adds one card
          to every column — and there&apos;s a critical rule:{" "}
          <strong className="text-white">
            you cannot deal from the stock while any column is empty
          </strong>
          . You must fill every column first.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This rule has a huge strategic implication: dealing is expensive. It fills
          your empty columns, buries your carefully built sequences, and adds
          complexity. Every deal should feel like a last resort, not a way to
          &ldquo;see more cards.&rdquo;
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before dealing, ask yourself:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>Have I made every possible productive move?</li>
          <li>Are my sequences as organized as they can be?</li>
          <li>
            Have I positioned cards so the new deal is most likely to be useful?
          </li>
          <li>
            Can I create an empty column before dealing (even if I lose it to the
            deal)?
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dealing too early is the #1 reason
            intermediate players plateau. They deal when stuck instead of looking
            harder for moves. Sometimes the winning move is three steps deep — take the
            time to find it before hitting that deal button.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Think in Sequences, Not Single Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Beginner players look at individual moves: &ldquo;I can put this 7 on that
          8.&rdquo; Experienced players think in sequences: &ldquo;If I move this 7 to
          that 8, it frees the 4 underneath. I can then move the 4 to the 5 in column
          three, which empties column six. With that empty column, I can split the
          off-suit build in column one.&rdquo;
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This is the mental leap that separates casual players from consistent
          winners. Before making any move, trace the chain of consequences at least 2–3
          moves deep. The best Spider Solitaire players plan 5–6 moves ahead.
        </p>
        <p className="text-white/70 leading-relaxed">
          If you&apos;re new to this kind of thinking, start small. Before each move,
          just ask: &ldquo;What does this move enable?&rdquo; That single question will
          immediately improve your play.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Focus on One or Two Suits at a Time
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In 2-suit and 4-suit Spider, trying to build all suits simultaneously is a
          recipe for chaos. You&apos;ll end up with half-built sequences everywhere and no
          room to maneuver.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Instead, pick one suit to focus on first — ideally whichever has the most
          visible cards or the best natural ordering. Pour your energy into completing
          that suit. Once it&apos;s removed from the board, you&apos;ve freed up 13
          cards&apos; worth of space and can pivot to the next suit.
        </p>
        <p className="text-white/70 leading-relaxed">
          This &ldquo;sequential focus&rdquo; approach is especially powerful in 4-suit
          games, where the board gets overwhelmingly complex. Reducing the problem to
          one suit at a time makes it manageable.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Undo Liberally (No Shame in It)
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Spider Solitaire is a game of imperfect information — half the cards start
          face-down. No amount of skill can predict what&apos;s hidden. Using undo to
          explore different lines of play isn&apos;t cheating, it&apos;s smart.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you&apos;re stuck, try a speculative move, see what it reveals, then undo
          and try a different approach with that new information. This &ldquo;look
          ahead&rdquo; technique is how experienced players find moves that seem
          invisible at first glance.
        </p>
        <p className="text-white/70 leading-relaxed">
          If you want a purer challenge, save undo-free play for 1-suit games where
          more information is available from the start. In 4-suit games, even world-class
          players benefit from exploring alternative move orders.
        </p>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

      {/* Tips by difficulty */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tips by Difficulty Level
        </h2>

        {/* 1-Suit */}
        <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-emerald-400 mb-3">
            🟢 1-Suit Spider Tips
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            One-suit Spider is the gentlest version — every card is the same suit, so
            any sequence you build is automatically in-suit. You should be winning 90%+
            of these games.
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2">
            <li>Focus entirely on creating and maintaining empty columns</li>
            <li>
              Since all builds are in-suit, you can move sequences freely — exploit
              this
            </li>
            <li>
              Use 1-suit as your training ground to practice multi-move sequence
              planning
            </li>
            <li>
              If you&apos;re not winning consistently, review{" "}
              <Link
                href="/spider/strategy"
                className="text-emerald-400 hover:text-white transition-colors"
              >
                the strategy guide
              </Link>{" "}
              before moving to harder modes
            </li>
          </ul>
        </div>

        {/* 2-Suit */}
        <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-amber-400 mb-3">
            🟡 2-Suit Spider Tips
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            Two-suit Spider is where the real game begins. You&apos;ll deal with mixed-suit
            builds and need to think more carefully about which sequences to prioritize.
            A 40–50% win rate is solid.
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2">
            <li>
              Color-coding helps: one suit is red, one is black. Use visual patterns
              to spot in-suit opportunities
            </li>
            <li>
              Build off-suit only when it reveals face-down cards or creates empty
              columns
            </li>
            <li>
              When you complete a same-suit sequence K→A, it removes instantly — time
              these completions to create cascading empty columns
            </li>
            <li>
              Read{" "}
              <Link
                href="/spider/1-suit-vs-2-suit-vs-4-suit"
                className="text-amber-400 hover:text-white transition-colors"
              >
                our difficulty comparison
              </Link>{" "}
              for more on the 2-suit jump
            </li>
          </ul>
        </div>

        {/* 4-Suit */}
        <div className="bg-red-900/10 border border-red-500/15 rounded-xl p-5">
          <h3 className="text-lg font-bold text-red-400 mb-3">
            🔴 4-Suit Spider Tips
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            Four-suit Spider is one of the hardest solitaire games in existence. With
            four suits in play, finding in-suit builds is rare and board management
            becomes critical. Winning a third of your games is excellent.
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2">
            <li>
              Prioritize one suit to complete first — scan the initial layout for
              whichever suit has the best distribution
            </li>
            <li>
              Empty columns are even more precious here — protect them fiercely
            </li>
            <li>
              Accept that some games are unwinnable despite perfect play. Don&apos;t let
              losses discourage you
            </li>
            <li>
              Undo is your friend — explore multiple lines before committing to
              irreversible moves
            </li>
            <li>
              Consider learning{" "}
              <Link
                href="/spider/strategy"
                className="text-red-400 hover:text-white transition-colors"
              >
                advanced techniques
              </Link>{" "}
              like column sacrifice and deal preparation
            </li>
          </ul>
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
          Setting realistic expectations prevents frustration. Here&apos;s what good play
          looks like at each difficulty level, based on data from experienced players
          and Hoyle&apos;s Rules of Games (2001):
        </p>
        <div className="overflow-x-auto mb-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
              <span>Difficulty</span>
              <span>Good Win Rate</span>
              <span>Expert Win Rate</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>1-Suit</span>
              <span>85–90%</span>
              <span className="text-emerald-400">95%+</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
              <span>2-Suit</span>
              <span>40–50%</span>
              <span className="text-amber-400">55–65%</span>
            </div>
            <div className="grid grid-cols-3 text-white/70 px-4 py-3">
              <span>4-Suit</span>
              <span>25–33%</span>
              <span className="text-red-400">35–40%</span>
            </div>
          </div>
        </div>
        <p className="text-white/50 text-sm leading-relaxed">
          These numbers assume thoughtful play with occasional undo use. Speed-playing
          without thinking will produce much lower rates. If your win rate is
          significantly below the &ldquo;good&rdquo; column, focus on the tips above —
          especially empty columns and delaying deals.
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
              <strong>Empty columns are your #1 priority.</strong> Create them, protect
              them, use them wisely.
            </li>
            <li>
              <strong>Build in suit when you can.</strong> Off-suit builds are
              temporary — never forget that.
            </li>
            <li>
              <strong>Uncover face-down cards early.</strong> Information is worth more
              than position.
            </li>
            <li>
              <strong>Delay dealing from the stock.</strong> Exhaust all moves first.
            </li>
            <li>
              <strong>Think 2–3 moves ahead.</strong> Ask &ldquo;what does this move
              enable?&rdquo;
            </li>
            <li>
              <strong>Focus on one suit at a time</strong> in 2-suit and 4-suit games.
            </li>
            <li>
              <strong>Use undo to explore.</strong> It&apos;s a learning tool, not
              cheating.
            </li>
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-10 max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 rounded-xl p-8">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Put These Tips Into Practice
          </h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            The best way to improve is to play. Start with 1-suit to build habits,
            then graduate to harder modes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/spider"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
            >
              Play Spider Solitaire →
            </Link>
            <Link
              href="/spider/strategy"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white/80 font-medium rounded-lg transition-colors"
            >
              Read the Strategy Guide
            </Link>
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

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
          More Spider Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/spider/how-to-play"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Guide</span>
            <p className="text-white/80 font-semibold mt-1">How to Play Spider Solitaire</p>
            <p className="text-white/40 text-sm mt-1">
              Complete rules and setup for all difficulty levels
            </p>
          </Link>
          <Link
            href="/spider/strategy"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Strategy</span>
            <p className="text-white/80 font-semibold mt-1">Spider Strategy Guide</p>
            <p className="text-white/40 text-sm mt-1">
              Advanced techniques for experienced players
            </p>
          </Link>
          <Link
            href="/spider/1-suit-vs-2-suit-vs-4-suit"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Comparison</span>
            <p className="text-white/80 font-semibold mt-1">1-Suit vs 2-Suit vs 4-Suit</p>
            <p className="text-white/40 text-sm mt-1">
              How difficulty levels compare and when to graduate
            </p>
          </Link>
          <Link
            href="/freecell-vs-spider"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Versus</span>
            <p className="text-white/80 font-semibold mt-1">FreeCell vs Spider</p>
            <p className="text-white/40 text-sm mt-1">
              How the two most popular solitaire games compare
            </p>
          </Link>
        </div>
      </section>
    </ContentLayout>
  );
}
