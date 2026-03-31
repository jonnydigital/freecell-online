import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Clock Solitaire Strategy Guide | Winning Techniques & Tips",
  description:
    "Understand Clock Solitaire (Clock Patience) strategy, win rate math, probability awareness, and variants that add real decision-making. Learn what makes this luck-based classic tick.",
  keywords: [
    "clock solitaire strategy",
    "clock patience strategy",
    "clock solitaire win rate",
    "clock solitaire tips",
    "how to win clock solitaire",
    "clock solitaire probability",
    "clock solitaire variants",
    "clock patience rules",
    "clock solitaire odds",
    "clock solitaire guide",
  ],
  alternates: {
    canonical: absoluteUrl("/clock/strategy"),
  },
  openGraph: {
    title: "Clock Solitaire Strategy Guide | Winning Techniques & Tips",
    description:
      "Master Clock Solitaire: understand the 1-in-13 win rate, probability awareness, and variants that add strategic depth to this classic patience game.",
    url: absoluteUrl("/clock/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "Is there any strategy in Clock Solitaire?",
    answer:
      "Standard Clock Solitaire is almost entirely determined by the initial deal — once cards are laid out, the sequence of moves is fixed with no decisions to make. You flip the top card of the center pile, place it at its clock position, flip the top card there, and repeat. However, understanding probability helps you recognize promising deals early, and variants like Watch Solitaire introduce peeking and swapping mechanics that add genuine strategic choices.",
  },
  {
    question: "What is the win rate for Clock Solitaire?",
    answer:
      "The win rate for standard Clock Solitaire is approximately 1 in 13, or about 7.7%. This is because you lose whenever the fourth King is revealed before all other piles are cleared. Mathematically, the probability that the last card turned in the entire deck is a King is 4/52 = 1/13. This win rate cannot be improved through skill since the game involves no decisions.",
  },
  {
    question: "What is the Watch variant of Clock Solitaire?",
    answer:
      "Watch Solitaire (also called Clock Watching) is a variant where you can peek at the top card of any pile before committing to a move. Some versions also allow you to swap cards between piles under certain conditions. These additions transform Clock from a pure luck game into one with genuine decision-making, raising the win rate significantly depending on the specific rules used.",
  },
  {
    question: "Why do I always seem to lose at Clock Solitaire?",
    answer:
      "You are not doing anything wrong — losing is the expected outcome roughly 12 out of every 13 games. With a win rate of only about 7.7%, most deals are unwinnable from the moment the cards are dealt. Unlike games such as FreeCell or Spider Solitaire where skill dramatically affects outcomes, Clock Solitaire results are predetermined by the shuffle. The game is best enjoyed as a quick, meditative card ritual rather than a competitive challenge.",
  },
  {
    question: "How does Clock Solitaire compare to other solitaire games in difficulty?",
    answer:
      "Clock Solitaire has one of the lowest win rates among popular solitaire games, but this is misleading because 'difficulty' implies skill can overcome the challenge. A skilled FreeCell player wins 80-90% of deals; a skilled Klondike player wins 30-40%. In Clock, every player — beginner or expert — wins exactly the same percentage because there are no decisions. It is the most luck-dependent mainstream solitaire game, making it less 'difficult' and more 'uncontrollable.'",
  },
];

export default function ClockStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Clock Solitaire", item: absoluteUrl("/clock") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/clock/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Clock Solitaire Strategy Guide",
        description: "Understand Clock Solitaire strategy, win rate mathematics, probability awareness, and variants that introduce genuine decision-making.",
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
        title="Clock Solitaire Strategy Guide"
        kicker={<><Link href="/clock" className="hover:text-white transition-colors">Clock Solitaire</Link> / Strategy</>}
        subtitle="An honest look at the world's most luck-dependent solitaire game — the math behind the 1-in-13 win rate, what little you can control, and variants that add real strategy."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Clock Solitaire", href: "/clock" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Here is the honest truth: <strong className="text-white">standard Clock Solitaire has no meaningful strategy</strong>.
          The game is fully determined by the deal — once the 52 cards are arranged into 13 piles,{" "}
          <strong className="text-white">every move is forced</strong> with zero decisions.
          You win about 1 in 13 games (~7.7%), and no amount of skill changes that number.
          But there is still value in understanding <strong className="text-white">why</strong> the math works this way,
          recognizing deal patterns, and exploring variants like Watch Solitaire that introduce
          genuine choices. This guide covers all of that.
        </p>
      </div>

      {/* Section 1: Understanding Clock Solitaire's Luck Factor */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding Clock Solitaire&apos;s Luck Factor
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Clock Solitaire — also called Clock Patience — is unique among{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire games
          </Link>{" "}
          because it involves literally zero decisions. After the 52 cards are dealt face-down
          into 13 piles of 4 (arranged like a clock face with a center pile), the game plays
          itself. You flip the top card of the center (King) pile, place it face-up under the
          pile at its corresponding clock position, flip the top card from that pile, and repeat
          until you win or lose.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          There is no point where you choose between two moves. There is no moment where
          experience helps you pick a better path. The card you flip dictates exactly where it
          goes, and the card waiting at that position dictates your next move. The entire game
          is a chain reaction determined at the moment of the shuffle.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">No branching moves</strong> — each revealed card has
            exactly one valid destination based on its rank (Ace = 1 o&apos;clock, 2 = 2 o&apos;clock,
            through Queen = 12 o&apos;clock, King = center).
          </li>
          <li>
            <strong className="text-white/90">No hidden information choices</strong> — while cards
            start face-down, you never choose which card to reveal. The chain of flips is automatic.
          </li>
          <li>
            <strong className="text-white/90">Win condition is binary</strong> — you win if and only
            if every card is revealed before the 4th King appears. There is no partial victory.
          </li>
          <li>
            <strong className="text-white/90">Every deal has a fixed outcome</strong> — a given
            arrangement either wins or loses, regardless of who plays it. Two players with the
            same deal will always get the same result.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Clock Solitaire is technically not a &ldquo;game&rdquo; in the
            game theory sense — it is a <em>process</em>. A game requires decisions that affect outcomes.
            Clock is a predetermined sequence that you watch unfold. This makes it more like a
            fortune-telling card ritual than a competitive puzzle, which is part of its unique charm.
          </p>
        </div>
      </section>

      {/* Section 2: The Mathematics Behind the 1-in-13 Win Rate */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The Mathematics Behind the 1-in-13 Win Rate
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The win rate of Clock Solitaire is one of the most elegant results in recreational
          mathematics. The game ends when the 4th King is turned face-up, because at that point
          the center pile has four face-up Kings and no face-down card to flip. You win only if
          the 4th King is the very last card revealed in the entire deck.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Here is the key insight: consider the position of the last King in the sequence of all
          52 cards as they would be revealed during play. The last card revealed is equally likely
          to be any of the 52 cards. There are 4 Kings in the deck. The probability that the last
          card is a King — the only winning condition — is exactly 4/52 = 1/13 &asymp; 7.69%.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Total possible deals:</strong> 52! / (4!)<sup>13</sup>{" "}
            — an astronomically large number representing every way to distribute 52 cards into
            13 piles of 4.
          </li>
          <li>
            <strong className="text-white/90">Winning deals:</strong> Exactly 1/13 of all possible
            deals result in a win. This is provable through combinatorics and has been verified
            by computer simulation.
          </li>
          <li>
            <strong className="text-white/90">Expected games to win once:</strong> On average, you
            need to play 13 games to win once. In practice, variance means you might win twice
            in 10 games or go 30+ games without winning.
          </li>
          <li>
            <strong className="text-white/90">The &ldquo;almost won&rdquo; feeling:</strong> Many
            games end with only 1-3 face-down cards remaining, creating a near-miss sensation.
            This is not bad luck — it is the normal distribution of outcomes. Most losing games
            get close before the 4th King appears.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Games Played</span>
            <span>Expected Wins</span>
            <span>Chance of 0 Wins</span>
          </div>
          {[
            ["5 games", "~0.4", "67.3%"],
            ["13 games", "~1.0", "35.6%"],
            ["26 games", "~2.0", "12.7%"],
            ["50 games", "~3.8", "1.6%"],
            ["100 games", "~7.7", "0.03%"],
          ].map(([games, expectedWins, zeroWins], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{games}</span>
              <span>{expectedWins}</span>
              <span>{zeroWins}</span>
            </div>
          ))}
        </div>

        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Fun fact:</strong> The 1/13 win rate is independent of how the cards are arranged
            within each pile. Whether the Kings are spread across different piles or clustered
            together, the overall probability remains exactly 1/13. The proof relies on the symmetry
            of the last-card position across all 52 cards.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Variants That Add Strategic Depth */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Variants That Add Strategic Depth
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The lack of decisions in standard Clock Solitaire has inspired several variants that
          preserve the clock-face layout while introducing genuine strategy. If you enjoy the
          aesthetic of Clock but want meaningful choices, these variants deliver.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          These variants matter because they transform Clock from a passive observation into an
          active puzzle — similar to how{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          transformed Klondike-style solitaire by making all cards visible and every move a choice.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Watch Solitaire (Clock Watching)</strong> — before
            flipping a card, you may peek at the top card of any pile. This lets you plan ahead
            and sometimes choose an alternative pile to flip from when multiple options exist.
            Win rates climb to roughly 25-30% with good play.
          </li>
          <li>
            <strong className="text-white/90">Four-Peek Clock</strong> — you get four &ldquo;peek
            tokens&rdquo; per game, each allowing you to look at any face-down card. Knowing the
            position of Kings lets you delay visiting dangerous piles, modestly improving your odds.
          </li>
          <li>
            <strong className="text-white/90">Swap Clock</strong> — once per game, you may swap
            the top cards of two piles before flipping. This single intervention can save a game
            by relocating a King away from a pile you need to visit soon.
          </li>
          <li>
            <strong className="text-white/90">Progressive Clock</strong> — after each loss, you
            remove the last King turned and replace it with a random non-King card from a separate
            deck, making subsequent games progressively easier. This creates a session-based
            progression that rewards persistence.
          </li>
          <li>
            <strong className="text-white/90">Two-Pass Clock</strong> — when the 4th King appears,
            you get a second pass where you can continue flipping from any pile that still has
            face-down cards. This dramatically increases the win rate and adds decision-making
            about which piles to revisit first.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Recommendation:</strong> If you want Clock with real strategy, start with Watch
            Solitaire. The peeking mechanic preserves the simplicity of Clock while adding a
            layer of probability-based decision-making that rewards careful observation. It is
            the most popular strategic Clock variant for good reason.
          </p>
        </div>
      </section>

      {/* Section 4: Pattern Recognition and Probability Awareness */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Pattern Recognition and Probability Awareness
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          While you cannot change the outcome of a standard Clock deal, developing probability
          awareness makes the game more intellectually engaging. Experienced players learn to
          read the unfolding game and estimate their chances of winning as cards are revealed.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This kind of &ldquo;passive strategy&rdquo; — reading the board rather than changing it —
          is a valuable skill that transfers to games where decisions <em>do</em> matter. Players
          who hone their probability intuition in Clock often find themselves making better
          risk assessments in{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          ,{" "}
          <Link href="/spider/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Spider
          </Link>
          , and other strategic solitaire variants.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track King appearances.</strong> After each King
            surfaces, mentally note how many remain hidden. With 0 Kings revealed, you are safe.
            With 3 revealed, every flip could end the game — your remaining win probability
            depends on how many face-down cards are left.
          </li>
          <li>
            <strong className="text-white/90">Count cleared piles.</strong> A pile is &ldquo;cleared&rdquo;
            when all 4 of its cards have been placed face-up. Each cleared pile means fewer
            remaining flips needed. More cleared piles early is a positive signal.
          </li>
          <li>
            <strong className="text-white/90">Notice circulation patterns.</strong> Sometimes the
            game enters a loop visiting the same 2-3 piles repeatedly. This is often a sign of
            suit clustering in the deal, and it can quickly clear those piles — which is good
            for your chances.
          </li>
          <li>
            <strong className="text-white/90">Estimate remaining probability.</strong> When 3 Kings
            are face-up and <em>n</em> face-down cards remain, your win probability is exactly
            1/<em>n</em>. With 10 cards left and 3 Kings revealed, you have a 10% chance. With
            2 cards left, 50%.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Mental exercise:</strong> Try predicting whether you will win or lose before
            the game is half over. After 26 cards are revealed, check how many Kings have appeared.
            If 0-1 Kings are showing, your chances are above average. If 3 Kings are showing with
            26 cards remaining, you have only a 1/26 chance (~3.8%) — below the baseline 7.7%.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Using Clock as a Teaching Tool */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Using Clock as a Teaching Tool for Card Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Clock Solitaire&apos;s simplicity makes it an excellent gateway into the wider world of
          solitaire and card games. It requires no strategic knowledge, making it accessible to
          complete beginners and young children. But it also quietly teaches several foundational
          concepts that carry over to more complex games.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Many experienced solitaire players started with Clock Patience as children, drawn in
          by the clock-face layout and the suspense of each flip. The game&apos;s real value is not
          in its strategy — it is in the skills it builds along the way.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Card rank recognition</strong> — new players quickly
            memorize rank values (Ace through King) through repetition, as each flip requires
            identifying the rank and finding its clock position.
          </li>
          <li>
            <strong className="text-white/90">Number-to-position mapping</strong> — associating
            card ranks with clock positions reinforces number sense and spatial reasoning,
            particularly for young learners who are also learning to read analog clocks.
          </li>
          <li>
            <strong className="text-white/90">Win/loss acceptance</strong> — with a 92.3% loss rate,
            Clock teaches players to handle losing gracefully and to find enjoyment in the process
            rather than the outcome. This emotional resilience transfers to all competitive games.
          </li>
          <li>
            <strong className="text-white/90">Probability intuition</strong> — even without formal
            math, repeated play builds an intuitive sense that some outcomes are rare and that
            &ldquo;fair&rdquo; does not mean &ldquo;equal.&rdquo; Players naturally learn that
            winning is uncommon and special.
          </li>
          <li>
            <strong className="text-white/90">Gateway to strategic solitaire</strong> — once
            players master Clock&apos;s mechanics, they naturally seek games with more agency.{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>{" "}
            and{" "}
            <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
              Klondike
            </Link>{" "}
            are natural next steps where the skills learned in Clock — rank recognition, spatial
            layout awareness — become the foundation for strategic play.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Teaching tip:</strong> When introducing Clock to children, frame wins as
            &ldquo;surprises&rdquo; rather than achievements. Since no skill is involved, winning
            should feel like a lucky bonus. This prevents frustration and keeps the focus on the
            satisfying ritual of flipping and placing cards in the clock pattern.
          </p>
        </div>
      </section>

      {/* Section 6: Comparing Clock to Other Luck-Based Solitaire Games */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comparing Clock to Other Luck-Based Solitaire Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Clock is not the only solitaire game heavily dependent on luck. Many classic patience
          games fall on a spectrum from pure skill to pure chance. Understanding where Clock
          sits on this spectrum — and what games sit nearby — helps you choose the right game
          for your mood.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The key distinction is between games with <em>no decisions</em> (like Clock) and games
          with <em>limited decisions</em> (like{" "}
          <Link href="/monte-carlo" className="text-[var(--gold)] hover:text-white transition-colors">
            Monte Carlo
          </Link>
          ). Even a single decision point per game separates a &ldquo;process&rdquo; from a
          &ldquo;game&rdquo; in the meaningful sense.
        </p>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-4 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Game</span>
            <span>Win Rate</span>
            <span>Skill Impact</span>
            <span>Decisions Per Game</span>
          </div>
          {[
            ["Clock Solitaire", "~7.7%", "None", "0"],
            ["Wish Solitaire", "~5%", "None", "0"],
            ["Accordion", "~2%", "Minimal", "Very few"],
            ["Monte Carlo", "~15-25%", "Moderate", "Many"],
            ["Gaps / Montana", "~10-15%", "Moderate", "Many"],
            ["Canfield", "~30-35%", "Significant", "Many"],
            ["FreeCell", "~80-90%", "Dominant", "Hundreds"],
          ].map(([game, winRate, skillImpact, decisions], i) => (
            <div
              key={i}
              className={`grid grid-cols-4 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{game}</span>
              <span>{winRate}</span>
              <span>{skillImpact}</span>
              <span>{decisions}</span>
            </div>
          ))}
        </div>

        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Pure luck games (Clock, Wish)</strong> — no decisions
            at all. The outcome is sealed when cards are dealt. These games are meditative rituals,
            not puzzles.
          </li>
          <li>
            <strong className="text-white/90">Low-skill games (Accordion)</strong> — occasional
            decisions exist but rarely change the outcome. Skill might improve win rate by 1-2
            percentage points at most.
          </li>
          <li>
            <strong className="text-white/90">Moderate-skill games (Monte Carlo, Gaps)</strong> —
            genuine decisions throughout, but luck still dominates. Good play meaningfully
            improves results without guaranteeing wins.
          </li>
          <li>
            <strong className="text-white/90">High-skill games (FreeCell, Spider)</strong> — skill
            is the primary determinant. Expert players win the vast majority of deals. These are
            true strategy games with a card-based wrapper.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Perspective:</strong> Clock&apos;s lack of strategy is not a flaw — it is a feature.
            Sometimes you want to engage your brain deeply (play{" "}
            <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>
            ). Sometimes you want to shuffle, flip, and see what happens. Clock fills the second
            role perfectly. Not every card game needs to be a mental workout.
          </p>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Clock Solitaire Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Win rate is fixed at ~7.7% (1 in 13).</strong> No technique, trick, or
              superstition changes this. Accept it and enjoy the ride.
            </li>
            <li>
              <strong>The game has zero decisions.</strong> Each card goes to exactly one position.
              If someone claims a &ldquo;strategy,&rdquo; they are describing a variant, not standard Clock.
            </li>
            <li>
              <strong>Track Kings as they appear.</strong> With 3 Kings face-up, your odds shift
              to 1/<em>n</em> where <em>n</em> is the number of face-down cards remaining.
            </li>
            <li>
              <strong>Try Watch Solitaire for strategy.</strong> The peeking variant adds genuine
              decisions and roughly triples the win rate for skilled players.
            </li>
            <li>
              <strong>Clock is an excellent teaching game.</strong> Use it to teach rank recognition,
              clock positions, and graceful losing to new players.
            </li>
            <li>
              <strong>Card placement rules:</strong> Ace &rarr; 1 o&apos;clock, 2 &rarr; 2 o&apos;clock,
              through Queen &rarr; 12 o&apos;clock, King &rarr; center pile.
            </li>
            <li>
              <strong>You lose when the 4th King is flipped.</strong> At that point, the center pile
              has no face-down cards to continue flipping from.
            </li>
            <li>
              <strong>Near-misses are normal.</strong> Most losing games end with only 1-5 face-down
              cards remaining. This is the expected outcome, not bad luck.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/clock/how-to-play" title="How to Play Clock" description="Complete rules, setup, and card placement mechanics explained." />
            <ContentLinkCard href="/clock/tips" title="Clock Tips & Tricks" description="Quick tips for getting the most out of Clock Solitaire." />
            <ContentLinkCard href="/strategy" title="Solitaire Strategy Hub" description="Strategy guides for all solitaire variants." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Test Your Luck?"
          body="Play free online Clock Solitaire and see if the cards fall in your favor. With a 1-in-13 win rate, every victory is a genuine thrill."
          primaryLabel="Play Clock Solitaire"
          primaryHref="/clock"
          secondaryLabel="Learn the Rules"
          secondaryHref="/clock/how-to-play"
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
          More Clock Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/clock" title="Play Clock Solitaire" description="Play Clock Patience online for free" />
          <ContentLinkCard href="/clock/how-to-play" title="How to Play Clock" description="Complete rules and setup guide" />
          <ContentLinkCard href="/clock/tips" title="Clock Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic skill-based solitaire" />
          <ContentLinkCard href="/klondike/strategy" title="Klondike Strategy Guide" description="Strategy for the world's most popular solitaire" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
