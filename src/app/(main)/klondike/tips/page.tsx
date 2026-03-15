import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Klondike Solitaire Tips & Tricks | Win More Games in 2026",
  description:
    "Practical Klondike Solitaire tips for beginners and experienced players. 8 actionable tips that will immediately improve your win rate in Draw 1 and Draw 3 games.",
  keywords: [
    "solitaire tips",
    "klondike tips",
    "solitaire tips and tricks",
    "klondike solitaire tips",
    "how to win solitaire",
    "solitaire winning tips",
    "klondike beginner tips",
    "solitaire advice",
    "tips for winning solitaire",
    "klondike solitaire help",
  ],
  alternates: {
    canonical: absoluteUrl("/klondike/tips"),
  },
  openGraph: {
    title: "Klondike Solitaire Tips & Tricks | Win More Games",
    description:
      "8 practical tips for Draw 1 and Draw 3 Klondike Solitaire. Beginner and advanced tips, plus a quick reference cheat sheet.",
    url: absoluteUrl("/klondike/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Klondike Solitaire?",
    answer:
      "Always prioritize uncovering face-down cards. Klondike starts with 21 hidden cards in the tableau, and you cannot plan effectively with cards you cannot see. When choosing between two moves, pick the one that flips a hidden card. This single habit will improve your win rate more than any other.",
  },
  {
    question: "How can I improve my Klondike Solitaire win rate?",
    answer:
      "Focus on three habits: (1) uncover face-down cards before building long sequences, (2) keep your four foundation piles balanced within 2 ranks of each other, and (3) choose kings carefully when filling empty columns — pick the color that unblocks the most buried cards. These three changes alone can improve a beginner's win rate by 20-30 percentage points.",
  },
  {
    question: "Is Klondike Solitaire mostly luck or skill?",
    answer:
      "Both. About 79-82% of random Klondike deals are theoretically solvable in Draw 1 mode, meaning roughly 1 in 5 deals cannot be won regardless of play. However, most players win far less than 79% because of strategic mistakes. The gap between your actual win rate and the theoretical maximum is the skill component — and it is significant.",
  },
  {
    question: "Should I play Draw 1 or Draw 3 Klondike?",
    answer:
      "If you are learning, start with Draw 1. It lets you see every card in the stock and win more often, which is better for developing good habits. Once you consistently win 60%+ of Draw 1 games, try Draw 3 for a greater challenge. Draw 3 requires stock-cycle tracking and more conservative play.",
  },
  {
    question: "What is the best first move in Klondike Solitaire?",
    answer:
      "There is no universal best first move, but there is a best first habit: scan the entire board before touching a card. Look for aces and twos to send to foundations, check which columns have the fewest hidden cards (easiest to clear), and identify which kings and queens are available. This 10-second scan shapes your entire game plan.",
  },
];

export default function KlondikeTipsPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Klondike Solitaire", item: absoluteUrl("/klondike") },
      { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/klondike/tips") },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Klondike Solitaire Tips & Tricks",
    description: "Practical tips for winning more Klondike Solitaire games at every skill level.",
    author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    datePublished: "2026-03-12",
    dateModified: "2026-03-12",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <ContentLayout>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <ContentHero
        title="Klondike Solitaire Tips & Tricks"
        kicker={<><Link href="/klondike" className="hover:text-white transition-colors">Klondike Solitaire</Link>{" "}/ Tips</>}
        subtitle="Practical advice that will immediately improve your win rate — whether you're playing Draw 1 or Draw 3 Klondike."
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">uncover face-down cards first</strong>.
          Every strategic decision in Klondike should consider whether it reveals a hidden
          card. The more of the board you can see, the better your decisions become. Master
          this principle and your win rate will jump immediately.
        </p>
      </div>

      {/* Beginner Tips Section Header */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-4">
          <h2
            className="text-xl font-bold text-emerald-400"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Beginner Tips (Start Here)
          </h2>
          <p className="text-white/50 text-sm mt-1">
            These four tips address the most common habits that hold new players back.
          </p>
        </div>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Always Flip Face-Down Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Klondike deals 28 cards to the tableau, but only 7 are face-up. The other 21 are
          hidden. You cannot plan around cards you cannot see, and every hidden card is a
          potential ace, king, or critical building piece locked away from you.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When choosing between two otherwise equal moves, always pick the one that
          uncovers a face-down card. Focus especially on columns with the most hidden cards —
          the seventh column starts with 6 face-down cards and is your biggest early-game
          priority.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4 mb-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before your first move, count the face-down cards in each
            column (0, 1, 2, 3, 4, 5, 6 from left to right). Columns with more hidden cards
            need attention first.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Send Aces and Twos Up Immediately
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces serve no purpose on the tableau — nothing can be placed on top of an ace in
          a tableau sequence. Twos can only hold an ace, which should already be on the
          foundation. Both of these cards are dead weight on the tableau and should be
          promoted to the foundation the moment they appear.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          For threes and above, the decision becomes more nuanced. A red 3 on the tableau
          can serve as a landing spot for a black 2. If you send the red 3 to the foundation
          before the black 2 is ready, you lose that building option. Check the board before
          promoting cards above 2.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> Aces and twos — always send up. Threes and above — check
            whether both opposite-color cards one rank lower are already on the foundation.
            If they are, it is safe to promote. If not, consider waiting.
          </p>
        </div>
      </section>

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Keep Foundations Balanced
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          This is the tip that surprises most players. It seems logical to build one
          foundation as high as possible — but it actually hurts you. When your spades
          foundation is at 7 and your hearts foundation is at 2, you have removed five
          black cards (3♠ through 7♠) from the tableau. Those cards could have been
          landing spots for red cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The result: your red cards have fewer places to go on the tableau, sequences
          stall, and the game locks up. Aim to keep all four foundations within 2 ranks
          of each other. This single habit prevents more game-ending stalls than any
          other.
        </p>
        <p className="text-white/70 leading-relaxed">
          For a deeper look at this principle, read the{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            foundation management section
          </Link>{" "}
          of our strategy guide.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Choose Kings Carefully
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          When a tableau column becomes empty, only a king can fill it. This is one of
          the most important decisions in Klondike — and one that beginners almost always
          rush. The wrong king can waste an entire column for the rest of the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before placing a king, ask two questions:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Do I have a queen to place on it?</strong> A king
            without a queen is a dead-end column. If you have a black queen available, place
            a red king. If you have a red queen, place a black king.
          </li>
          <li>
            <strong className="text-white/90">Which color unblocks more buried cards?</strong> A
            red king leads to black Q, red J, black 10, etc. Look at your hidden and buried
            cards — which color chain helps free the most face-down cards?
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Grabbing the first available king and placing it
            immediately. Sometimes the best move is to wait for the right king rather than
            fill the empty column with the wrong one.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Advanced Tips Section Header */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-4">
          <h2
            className="text-xl font-bold text-amber-400"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Advanced Tips (Level Up)
          </h2>
          <p className="text-white/50 text-sm mt-1">
            Once you have the basics down, these tips will push your win rate higher.
          </p>
        </div>
      </div>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Scan Before Your First Move
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The single most impactful habit you can build is pausing for 10-15 seconds
          before your first move to survey the entire board. This is not about finding
          the perfect opening — it is about building a mental map of your opportunities
          and obstacles.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          During your scan, identify:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>Where are the aces? (Visible? Buried? In the stock?)</li>
          <li>Which columns have the fewest face-down cards? (Easiest to clear)</li>
          <li>Are any kings and queens available for immediate placement?</li>
          <li>Which cards are blocking the most useful moves?</li>
          <li>Is there an obvious first sequence of moves (3-4 steps)?</li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          Most losing Klondike games go wrong in the first 5 moves, not the last 5. This
          quick scan prevents the majority of early-game mistakes. It is the single habit
          that most improves intermediate players&apos; win rates.
        </p>
      </section>

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Play the Tableau Before the Stock
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Before drawing from the stock, make every productive tableau move you can find.
          &quot;Productive&quot; means moves that uncover face-down cards, build useful sequences,
          or send aces and twos to the foundation. Rearranging visible cards without
          revealing anything new is not productive — it is busywork.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Why does this matter? Tableau moves are free — they do not consume any
          resource. Drawing from the stock, however, uses up your stock pile. In Draw 3
          especially, every draw cycle is precious. Squeezing maximum value from the
          tableau before touching the stock is a fundamental efficiency improvement.
        </p>
        <p className="text-white/70 leading-relaxed">
          This tip works hand-in-hand with the opening scan. If you know what the
          tableau offers before your first draw, you will make better decisions about when
          to start drawing. See the{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            strategy guide
          </Link>{" "}
          for a more detailed draw-vs-play framework.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Track the Stock Cycle (Draw 3)
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Draw 3, you flip three cards at a time and can only play the top one. This
          means two out of every three stock cards are inaccessible on any given pass.
          But the order is consistent — the same cards appear in the same positions each
          cycle (unless you play one, which shifts the cycle).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          You do not need to memorize every card. Just track the high-value ones: aces,
          twos, kings, and any card you know you need for a specific sequence. Knowing
          that the ace of hearts is in the second position of a three-card group tells
          you exactly what you need to do to access it.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Advanced technique:</strong> Playing any card from the stock shifts the cycle.
            Sometimes it is worth playing a card you don&apos;t need just to change the cycle and
            give yourself access to a more valuable card on the next pass. This is called
            &quot;stock manipulation&quot; and it is the biggest skill gap in Draw 3 Klondike.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Use Undo to Learn, Not Just to Win
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Undo is not cheating — it is a learning tool. When a game goes wrong, use undo
          to trace back to the decision that killed it. Was it a bad king placement? Did
          you promote a card to the foundation that you needed on the tableau? Did you
          draw when you should have played?
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This kind of post-mortem analysis is how good players become great players. The
          lessons you learn from undoing and replaying a lost game are more valuable than
          the lessons from a game you won easily.
        </p>
        <p className="text-white/70 leading-relaxed">
          If you want a purer challenge, save undo-free play for Draw 1 games where the
          higher solvability rate and full stock access make perfect play more achievable.
          In Draw 3, even experienced players benefit from occasional undo use to explore
          alternative lines. See our{" "}
          <Link href="/klondike/winning-strategies" className="text-[var(--gold)] hover:text-white transition-colors">
            winning strategies guide
          </Link>{" "}
          for more on deliberate practice techniques.
        </p>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Draw 1 vs Draw 3 Tips */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tips by Game Mode
        </h2>

        <div className="bg-emerald-900/10 border border-emerald-500/15 rounded-xl p-5 mb-4">
          <h3 className="text-lg font-bold text-emerald-400 mb-3">
            Draw 1 Tips
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            Draw 1 gives you access to every card in the stock. With solid play, you
            should win 60-80% of your games. This mode is ideal for learning.
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2">
            <li>Cycle through the stock once before making aggressive moves — know what is available</li>
            <li>Build foundations more freely since every stock card is accessible</li>
            <li>Focus energy on tableau optimization rather than stock management</li>
            <li>
              Use Draw 1 to practice the{" "}
              <Link
                href="/klondike/strategy"
                className="text-emerald-400 hover:text-white transition-colors"
              >
                core strategic principles
              </Link>{" "}
              before moving to Draw 3
            </li>
          </ul>
        </div>

        <div className="bg-amber-900/10 border border-amber-500/15 rounded-xl p-5">
          <h3 className="text-lg font-bold text-amber-400 mb-3">
            Draw 3 Tips
          </h3>
          <p className="text-white/70 leading-relaxed mb-3">
            Draw 3 is the classic Klondike challenge. Only one-third of the stock is
            accessible per pass. Winning 20-30% of games represents strong play.
          </p>
          <ul className="list-disc list-inside text-white/70 space-y-1.5 ml-2">
            <li>Track positions of aces, kings, and needed cards in the stock cycle</li>
            <li>Build foundations conservatively — you may not see the needed card again for a full pass</li>
            <li>Use stock manipulation: sometimes play a card you do not need to shift the cycle</li>
            <li>Empty columns are more precious since kings are harder to access from the stock</li>
            <li>
              See the{" "}
              <Link
                href="/klondike/winning-strategies"
                className="text-amber-400 hover:text-white transition-colors"
              >
                winning strategies guide
              </Link>{" "}
              for advanced Draw 3 tactics
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
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
              <strong>Flip face-down cards first.</strong> Hidden cards are your biggest obstacle.
            </li>
            <li>
              <strong>Aces and twos go up immediately.</strong> They are dead weight on the tableau.
            </li>
            <li>
              <strong>Keep foundations balanced.</strong> Stay within 2 ranks across all four piles.
            </li>
            <li>
              <strong>Choose kings carefully.</strong> Pick the color that unblocks the most cards.
            </li>
            <li>
              <strong>Scan before move one.</strong> 10 seconds of planning prevents 10 minutes of frustration.
            </li>
            <li>
              <strong>Tableau before stock.</strong> Make every productive board move before drawing.
            </li>
            <li>
              <strong>Track the stock cycle.</strong> Know where key cards are in Draw 3.
            </li>
            <li>
              <strong>Use undo to learn.</strong> Trace back to the move that killed the game.
            </li>
          </ol>
        </div>
      </section>

      <CtaSection
        heading="Put These Tips Into Practice"
        body="The best way to improve is to play. Start with Draw 1 to build good habits, then graduate to Draw 3 for the full challenge."
        primaryLabel="Play Klondike Solitaire"
        primaryHref="/klondike"
        secondaryLabel="Read the Strategy Guide"
        secondaryHref="/klondike/strategy"
      />

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
          More Klondike Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/klondike/how-to-play" title="How to Play Klondike Solitaire" description="Complete rules and setup for Draw 1 and Draw 3" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="In-depth strategies for winning more games" />
          <ContentLinkCard href="/klondike/winning-strategies" title="Winning Strategies" description="Advanced tactics and statistical analysis" />
          <ContentLinkCard href="/freecell-vs-klondike" title="FreeCell vs Klondike" description="How the two most popular solitaire games compare" />
        </div>
      </section>
    </ContentLayout>
  );
}
