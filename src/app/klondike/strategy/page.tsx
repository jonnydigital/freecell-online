import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "../../../components/ContentLayout";
import AdUnit from "../../../components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire Strategy Guide | 7 Proven Tips to Win More",
  description:
    "Master Klondike Solitaire with 7 expert strategies. Learn when to play cards to foundations, why draw-1 wins 52% vs 18% for draw-3, and advanced techniques used by top players.",
  keywords: [
    "klondike solitaire strategy",
    "solitaire strategy",
    "how to win solitaire",
    "klondike strategy guide",
    "klondike solitaire tips",
    "solitaire winning strategy",
    "how to win klondike",
    "klondike solitaire help",
    "best solitaire strategy",
    "solitaire strategy guide",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/strategy"),
  },
  openGraph: {
    title: "Klondike Solitaire Strategy Guide | 7 Proven Tips to Win More",
    description:
      "Master Klondike Solitaire with 7 expert strategies backed by AI win-rate data. Draw-1 vs draw-3 odds, foundation timing, and advanced techniques.",
    url: absoluteUrl("/klondike/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the best strategy for winning Klondike?",
    answer:
      "The single most impactful strategy is exposing face-down cards as quickly as possible. Prioritize moves that reveal hidden cards — especially in columns with the most face-down cards (columns 6 and 7). Combined with always playing Aces and Twos to foundations immediately and never emptying a column without a King ready, these three habits will dramatically improve your win rate.",
  },
  {
    question: "Is draw-1 or draw-3 easier to win?",
    answer:
      "Draw-1 is significantly easier. AI solvers win about 52% of draw-1 games compared to just 18% of draw-3 games. The difference is access: in draw-1 you see every card in the stock each cycle, while draw-3 blocks two out of every three cards. If you're learning Klondike strategy, start with draw-1 to build good habits before tackling draw-3.",
  },
  {
    question: "What percentage of Klondike games can you win?",
    answer:
      "It depends on the variant and your skill level. AI solvers achieve about 52% on draw-1 and 18% on draw-3. Skilled human players average around 43% on draw-1. With \"Thoughtful Solitaire\" rules (all cards visible from the start), the win rate for draw-3 jumps to 81.9%. Mathematician Persi Diaconis has noted that calculating exact Klondike odds remains \"one of the embarrassments of applied probability.\"",
  },
  {
    question: "Should you always move cards to foundations in Klondike?",
    answer:
      "Not always. Aces and Twos should always go to foundations immediately since no tableau card ever needs to be placed on them. But higher cards require more thought. For example, if you send a red 7 to the foundation but later need it on the tableau to place a black 6, you've lost a critical placement option. The general rule: only send a card to the foundation if both cards of the opposite color one rank lower are already on the foundations.",
  },
];

export default function KlondikeStrategyPage() {
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
                name: "Solitaire Types",
                item: absoluteUrl("/solitaire-types"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Klondike Strategy",
                item: absoluteUrl("/klondike/strategy"),
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
            headline: "Klondike Solitaire Strategy Guide — 7 Proven Tips to Win More",
            description:
              "Master Klondike Solitaire with 7 expert strategies backed by AI win-rate data.",
            author: {
              "@type": "Organization",
              name: siteConfig.siteName,
              url: absoluteUrl("/"),
            },
            publisher: {
              "@type": "Organization",
              name: siteConfig.siteName,
            },
            mainEntityOfPage: absoluteUrl("/klondike/strategy"),
            datePublished: "2026-03-12",
            dateModified: "2026-03-12",
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
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link href="/solitaire-types" className="hover:text-white transition-colors">
            Solitaire Types
          </Link>{" "}
          / Klondike Strategy
        </p>
        <h1
          className="text-4xl sm:text-5xl font-black mb-4 leading-[1.1]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Klondike Solitaire Strategy Guide
        </h1>
        <p className="text-white/50 max-w-2xl mx-auto text-lg leading-relaxed">
          Seven proven strategies that separate consistent winners from players
          who blame bad luck. Backed by AI solver data and decades of
          competitive play.
        </p>
      </div>

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Bottom Line
        </h2>
        <p className="text-white/70 leading-relaxed">
          Most Klondike games are lost because players move cards to foundations
          too aggressively, ignore face-down cards, and empty columns without a
          King ready. Fix these three habits and your win rate will jump
          immediately. AI solvers win{" "}
          <strong className="text-white">52% of draw-1 games</strong> — skilled
          humans average around 43%. The gap is strategy, not luck.
        </p>
      </div>

      {/* Strategy 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #1: Always Play Aces and Twos to Foundations Immediately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is the one foundation rule with zero exceptions. Aces and Twos
          should go to the foundation the instant they appear — whether from
          the tableau or the stock pile.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Why? No card in the game ever needs to be placed on an Ace or a Two.
          Tableau building goes <em>downward</em> in alternating colors, so a
          3 never goes on a 2. An Ace or Two sitting on the tableau is dead
          weight — it takes up space, blocks face-down cards underneath, and
          contributes nothing to your game plan.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Threes are almost always safe to send up too, since it&apos;s rare
          to need a 3 for tableau building. But starting at Fours, you need to
          think more carefully — which brings us to Strategy #5 below.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Quick rule:</strong> Aces and Twos → always send up. Threes
            → almost always. Fours and above → read Strategy #5 first.
          </p>
        </div>
      </section>

      {/* Strategy 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #2: Expose Face-Down Cards First
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Klondike starts with 21 face-down cards across the seven tableau
          columns. Every hidden card is information you don&apos;t have and
          can&apos;t use. The single most important strategic principle in
          Klondike is{" "}
          <strong className="text-white">
            revealing face-down cards as fast as possible
          </strong>
          .
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you have a choice between two otherwise equal moves, always
          prefer the one that flips a face-down card. And when choosing
          <em> which</em> column to dig into, prioritize the columns with the
          most hidden cards. Column 7 starts with six face-down cards; column 1
          has none. Dig into the deep columns first.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This principle should override almost everything else in the early
          game. Even if a move looks &ldquo;wasteful&rdquo; — say, stacking
          an off-color card on a shorter column to access a face-down card in
          a longer one — the information gain is usually worth it.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Priority order:</strong> Move from columns with the most
            face-down cards → to columns with the fewest. Column 7 (6 hidden)
            before column 3 (2 hidden), every time.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

      {/* Strategy 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #3: Don&apos;t Empty a Column Unless You Have a King
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Klondike, only Kings can be placed in empty columns. This is one
          of the most commonly misunderstood rules — in{" "}
          <Link
            href="/how-to-play"
            className="text-[var(--gold)] hover:text-white transition-colors"
          >
            FreeCell
          </Link>
          , any card can fill an empty column. In Klondike, an empty column
          without a King to fill it is wasted space.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before clearing a column, check: do you have a King available to
          place there? If not, that empty column does nothing for you. Worse,
          you probably spent several moves creating it — moves that could have
          gone toward revealing face-down cards or building useful sequences.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The exception is when emptying a column reveals a critical face-down
          card <em>and</em> you have a King in the stock pile or elsewhere
          that you can place soon. But &ldquo;soon&rdquo; means within a move
          or two, not &ldquo;eventually.&rdquo;
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Players clear columns hoping a
            King will &ldquo;turn up.&rdquo; Don&apos;t gamble. If you
            don&apos;t have a King ready, keep the column occupied.
          </p>
        </div>
      </section>

      {/* Strategy 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #4: Choose Draw-1 for Better Odds
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This one is simple but often overlooked: the variant you choose has a
          massive impact on your win rate. AI solvers achieve approximately{" "}
          <strong className="text-white">52% on draw-1</strong> vs just{" "}
          <strong className="text-white">18% on draw-3</strong>. Skilled human
          players average about 43% on draw-1.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The reason is access. In draw-1, you flip one card at a time and see
          every card in the stock pile each cycle. In draw-3, you flip three
          cards but can only play the top one — meaning two out of every three
          cards are blocked each pass. Over multiple cycles, large portions of
          the stock remain permanently inaccessible unless you change the order
          by playing cards in between.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Draw-3 is the &ldquo;traditional&rdquo; competitive variant, and
          mastering it requires a deeper skill set — including tracking which
          cards are coming in the stock and strategically skipping plays to
          change the order. But if your goal is to win more games, draw-1 is
          the way to go.
        </p>

        {/* Win rate comparison */}
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Metric</span>
            <span>Draw-1</span>
            <span>Draw-3</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>AI win rate</span>
            <span className="text-emerald-400">~52%</span>
            <span className="text-amber-400">~18%</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3 border-b border-white/5">
            <span>Skilled human</span>
            <span className="text-emerald-400">~43%</span>
            <span className="text-amber-400">~15%</span>
          </div>
          <div className="grid grid-cols-3 text-white/70 px-4 py-3">
            <span>Cards accessible per cycle</span>
            <span>24 of 24</span>
            <span>~8 of 24</span>
          </div>
        </div>
      </section>

      {/* Strategy 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #5: Think Before Moving Cards to Foundations
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is the strategy that separates intermediate players from
          advanced ones. Your instinct says &ldquo;build the foundations as
          fast as possible&rdquo; — but that instinct is often wrong.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here&apos;s a concrete example: you have a red 7 on the tableau.
          It&apos;s available to send to the foundation. Should you? Not
          necessarily. If there&apos;s a black 6 somewhere that needs to be
          placed on a red 7 to uncover face-down cards, sending that red 7 to
          the foundation removes a critical placement option. The black 6 is
          now stuck.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The general rule for foundations: a card is safe to send up when{" "}
          <strong className="text-white">
            both cards of the opposite color one rank lower are already on the
            foundations
          </strong>
          . For example, a red 7 is safe to send up when both black 6s (♠6
          and ♣6) are already on their foundations — because no tableau card
          will ever need that red 7 as a placement target.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>The foundation safety test:</strong> Before sending a card
            to a foundation, check: are both opposite-color cards one rank
            lower already on the foundations? If yes, send it up. If no,
            consider keeping it in play.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

      {/* Strategy 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #6: Spread Cards Evenly Across Columns
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Beginners tend to build one or two tall columns while leaving others
          short. This creates problems: tall columns bury cards deep, and short
          columns run out quickly (creating empty columns you may not have
          Kings for).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Instead, aim to keep your tableau columns roughly even in length.
          When you have a choice of where to place a card, prefer the shorter
          column. This keeps more cards accessible, gives you more move
          options, and reduces the risk of getting locked into a position
          where critical cards are buried 8 or 9 deep.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Even distribution also helps when you need to move sequences. A
          sequence of 4 cards is easy to relocate; a sequence of 10 is nearly
          impossible to move without emptying multiple columns. Keep things
          balanced and you&apos;ll maintain flexibility throughout the game.
        </p>
      </section>

      {/* Strategy 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategy #7: Work Through the Stock Pile Systematically
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Many players treat the stock pile as something to flip through when
          they&apos;re stuck. That&apos;s backwards. The stock pile holds 24
          cards — nearly half the deck. Working through it methodically is
          essential, not an afterthought.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In draw-1, flip through the entire stock before making any major
          tableau rearrangements. See what&apos;s coming. Note where key cards
          are positioned. This information shapes every decision: should you
          build on column 3 or column 5? The stock pile might tell you.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          In draw-3, stock pile management becomes a genuine skill. The order
          of cards in the waste pile changes when you play a card from it.
          This means you can sometimes &ldquo;unlock&rdquo; buried stock cards
          by playing a card above them, shifting the three-card grouping.
          Advanced players use this technique deliberately — it&apos;s one of
          the biggest edges in competitive draw-3 play.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Draw-3 tip:</strong> When a card in the stock is two
            positions behind the one you need, play the blocking card (even
            somewhere suboptimal) to shift the grouping and expose the card
            you actually want on the next pass.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="my-8 max-w-3xl mx-auto" />

      {/* Advanced Strategies */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Advanced Strategies
        </h2>

        {/* Card tracking */}
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-[var(--gold)] mb-3">
            Tracking Cards in the Stock Pile
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            Once you&apos;ve gone through the stock pile once, you know every
            card in it. Advanced players mentally track which cards are in the
            stock and — crucially — their approximate order. This lets you
            plan several moves ahead: &ldquo;I know the ♠K is about 8 cards
            deep in the stock, so I should clear column 2 right before I reach
            it.&rdquo;
          </p>
          <p className="text-white/70 leading-relaxed">
            You don&apos;t need to memorize every card. Focus on the ones that
            matter: Kings (for filling empty columns), Aces (for starting
            foundations), and any cards that would complete a critical sequence
            on the tableau. Even tracking 4 or 5 key cards gives you a
            significant edge over players who flip blindly.
          </p>
        </div>

        {/* Thoughtful Solitaire */}
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <h3 className="text-lg font-bold text-[var(--gold)] mb-3">
            The &ldquo;Thoughtful Solitaire&rdquo; Approach
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            &ldquo;Thoughtful Solitaire&rdquo; is a variant where all cards
            are visible from the start — including the face-down tableau cards
            and the stock pile. It&apos;s not a separate game; it&apos;s the
            same Klondike rules, but with perfect information.
          </p>
          <p className="text-white/70 leading-relaxed mb-3">
            Research has shown that with all cards visible, the win rate for
            draw-3 Klondike jumps to{" "}
            <strong className="text-white">81.9%</strong>. This number is
            significant because it reveals how much of Klondike&apos;s
            difficulty comes from hidden information rather than from
            genuinely unsolvable positions.
          </p>
          <p className="text-white/70 leading-relaxed">
            You can use the Thoughtful approach as a training tool: play with
            undo liberally, peeking at face-down cards to understand what the
            &ldquo;correct&rdquo; play would have been. Over time, you develop
            an intuition for which moves are likely to pay off — even when you
            can&apos;t see what&apos;s underneath.
          </p>
        </div>
      </section>

      {/* The math */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Mathematics of Klondike
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link
            href="/statistics"
            className="text-[var(--gold)] hover:text-white transition-colors"
          >
            FreeCell
          </Link>
          , where we know that 99.999% of deals are solvable, the exact
          solvability of Klondike remains an open mathematical question.
          Stanford mathematician Persi Diaconis has called calculating exact
          Klondike odds{" "}
          <em>
            &ldquo;one of the embarrassments of applied probability.&rdquo;
          </em>
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          What we do know comes from large-scale computer simulations and
          solver experiments:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Draw-1, unlimited passes:</strong>{" "}
            AI solvers win ~52% of deals. The theoretical solvability ceiling is
            estimated at 79–82%.
          </li>
          <li>
            <strong className="text-white/90">Draw-3, unlimited passes:</strong>{" "}
            AI solvers win ~18%. Thoughtful Solitaire (all cards visible) pushes
            this to 81.9%, suggesting most deals are theoretically solvable.
          </li>
          <li>
            <strong className="text-white/90">Skilled human players:</strong>{" "}
            Average around 43% on draw-1 with sustained focus.
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          The gap between human and AI performance tells us something
          encouraging: there&apos;s significant room to improve through better
          strategy. The seven strategies above are exactly how you close that
          gap — not through faster play, but through more deliberate decisions.
        </p>
      </section>

      {/* CTA */}
      <section className="mb-10 max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-900/10 border border-emerald-500/20 rounded-xl p-8">
          <h2
            className="text-2xl font-bold mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Put These Strategies Into Practice
          </h2>
          <p className="text-white/60 mb-6 max-w-md mx-auto">
            Strategy only matters when you apply it. Start a game and
            deliberately practice one strategy at a time until it becomes
            instinct.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/klondike"
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-lg transition-colors"
            >
              Play Klondike Solitaire →
            </Link>
            <Link
              href="/klondike/how-to-play"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white/80 font-medium rounded-lg transition-colors"
            >
              Learn the Rules First
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
          More Klondike &amp; Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link
            href="/klondike/how-to-play"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Guide</span>
            <p className="text-white/80 font-semibold mt-1">How to Play Klondike</p>
            <p className="text-white/40 text-sm mt-1">
              Complete rules, setup, and dealing variants
            </p>
          </Link>
          <Link
            href="/klondike"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Play</span>
            <p className="text-white/80 font-semibold mt-1">Play Klondike Online</p>
            <p className="text-white/40 text-sm mt-1">
              Free Klondike Solitaire — no download required
            </p>
          </Link>
          <Link
            href="/strategy"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Strategy</span>
            <p className="text-white/80 font-semibold mt-1">FreeCell Strategy Guide</p>
            <p className="text-white/40 text-sm mt-1">
              Advanced techniques for a game where skill dominates luck
            </p>
          </Link>
          <Link
            href="/freecell-vs-klondike"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Versus</span>
            <p className="text-white/80 font-semibold mt-1">FreeCell vs Klondike</p>
            <p className="text-white/40 text-sm mt-1">
              How the two most popular solitaire games compare
            </p>
          </Link>
          <Link
            href="/statistics"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Data</span>
            <p className="text-white/80 font-semibold mt-1">Solitaire Statistics</p>
            <p className="text-white/40 text-sm mt-1">
              Win rates, solvability data, and mathematical analysis
            </p>
          </Link>
          <Link
            href="/solitaire-types"
            className="block p-4 bg-white/[0.03] border border-white/10 rounded-xl hover:border-[var(--gold)]/30 transition-colors"
          >
            <span className="text-[var(--gold)] text-sm font-medium">Explore</span>
            <p className="text-white/80 font-semibold mt-1">All Solitaire Types</p>
            <p className="text-white/40 text-sm mt-1">
              FreeCell, Spider, Klondike, and more solitaire variants
            </p>
          </Link>
        </div>
      </section>
    </ContentLayout>
  );
}
