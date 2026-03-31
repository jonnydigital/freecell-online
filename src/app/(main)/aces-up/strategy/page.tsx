import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Aces Up Solitaire Strategy Guide | Winning Techniques & Tips",
  description:
    "Master Aces Up Solitaire with proven strategies for discard hierarchy, empty column management, suit tracking, and ace preservation. Boost your win rate from 10% to 25% with expert techniques.",
  keywords: [
    "aces up solitaire strategy",
    "aces up solitaire winning strategy",
    "aces up solitaire tips",
    "how to win aces up solitaire",
    "idiots delight strategy",
    "aces up solitaire guide",
    "aces up discard strategy",
    "aces up empty column tactics",
    "aces up solitaire techniques",
    "firing squad solitaire strategy",
  ],
  alternates: {
    canonical: absoluteUrl("/aces-up/strategy"),
  },
  openGraph: {
    title: "Aces Up Solitaire Strategy Guide | Winning Techniques & Tips",
    description:
      "Proven strategies for Aces Up Solitaire: discard hierarchy, empty column management, suit tracking, and ace preservation techniques.",
    url: absoluteUrl("/aces-up/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the win rate for Aces Up Solitaire?",
    answer:
      "With random play, the win rate for Aces Up is extremely low — around 1-2%. With good strategy focused on empty column management and careful discard ordering, skilled players can win roughly 10-15% of deals. Expert players who meticulously track suits and plan several deals ahead may push their win rate toward 20-25%. The game has a significant luck component since the deal order is random, but strategy meaningfully separates beginners from experts.",
  },
  {
    question: "Should I always discard the lower card immediately when I can?",
    answer:
      "Not always. While discarding is the core mechanic, the order in which you discard matters. If you have multiple valid discards available, prioritize discarding cards that will not help you create empty columns. Sometimes delaying a discard by one deal allows you to free up a column first, which gives you more flexibility for future rounds. The key principle is: discard with purpose, not just because you can.",
  },
  {
    question: "Why are Aces high in Aces Up?",
    answer:
      "Aces are the highest-ranked cards in Aces Up, which is the reverse of many other solitaire games where Aces are low. This is fundamental to the game's goal — since you discard all lower cards of a matching suit when a higher card of that suit is showing, and Aces can never be discarded (nothing outranks them), the four Aces are the only cards that should remain at the end of a winning game. This is why the game is called 'Aces Up.'",
  },
  {
    question: "How important are empty columns in Aces Up?",
    answer:
      "Empty columns are the single most important strategic resource in Aces Up. An empty column lets you temporarily move a top card out of the way, exposing the card beneath it for potential discard. Without empty columns, you can only interact with the four top cards. With even one empty column, you can dig one card deeper into any pile, dramatically increasing your discard opportunities. Creating and maintaining empty columns should be your primary strategic focus after making obvious discards.",
  },
  {
    question: "Is Aces Up the same as Idiot's Delight?",
    answer:
      "Yes, Aces Up and Idiot's Delight are the same game. It is also known by other names including Firing Squad, Ace of the Pile, and Rocket to the Top. The 'Idiot's Delight' name comes from the fact that many deals are unwinnable regardless of skill, which can feel frustrating. However, the strategy involved in maximizing your wins across many deals is far from idiotic — careful suit tracking and column management make a measurable difference in long-term win rates.",
  },
];

export default function AcesUpStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Aces Up Solitaire", item: absoluteUrl("/aces-up") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/aces-up/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Aces Up Solitaire Strategy Guide",
        description: "Proven strategies for Aces Up Solitaire covering discard hierarchy, empty column management, suit tracking, and ace preservation techniques.",
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
        title="Aces Up Solitaire Strategy Guide"
        kicker={<><Link href="/aces-up" className="hover:text-white transition-colors">Aces Up Solitaire</Link> / Strategy</>}
        subtitle="Proven techniques to beat one of solitaire's toughest elimination games — from discard hierarchy mastery to empty column tactics and ace preservation."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Aces Up Solitaire", href: "/aces-up" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Aces Up strategy centers on three principles: <strong className="text-white">create empty columns relentlessly</strong>,{" "}
          <strong className="text-white">discard in the optimal order</strong>, and{" "}
          <strong className="text-white">protect your Aces from burial</strong>.
          With only four columns and no free cells, your ability to manipulate the board depends
          entirely on having open spaces. Every discard decision should serve the goal of emptying
          columns, and every deal from the stock should be anticipated with suit awareness. The
          difference between a 5% and a 20% win rate is disciplined column management.
        </p>
      </div>

      {/* Section 1: Understanding the Discard Hierarchy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding the Discard Hierarchy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The core mechanic of Aces Up is simple: when two or more top cards share the same suit,
          you can discard all but the highest-ranked card. Aces are the highest rank, followed by
          King, Queen, Jack, 10, and so on down to 2. This means an Ace of Spades on top of one
          column will let you discard a King of Spades on top of another.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          But understanding the hierarchy goes beyond knowing which card beats which. The strategic
          depth comes from recognizing <em>when</em> to make a discard and <em>which</em> discard
          to prioritize when multiple options are available. Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          where you build sequences, here you are tearing down — and the order of demolition matters.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Always scan all four top cards before discarding.</strong>{" "}
            It is easy to spot one matching pair and discard immediately, but there may be a
            better discard available. Check all six possible pairings among the four top cards.
          </li>
          <li>
            <strong className="text-white/90">Prefer discards that expose useful cards.</strong>{" "}
            If discarding from column A exposes another discardable card while discarding from
            column B exposes nothing useful, choose column A — you get a chain reaction.
          </li>
          <li>
            <strong className="text-white/90">Discard low cards before high cards when both are valid.</strong>{" "}
            A 3 sitting atop a column is less useful than a Queen. When you have a choice of
            which same-suit card to eliminate first, remove the lower card to keep higher cards
            available for future discards against other columns.
          </li>
          <li>
            <strong className="text-white/90">Aces never get discarded.</strong> An Ace is always
            the highest card of its suit. This means every Ace you uncover is permanently safe and
            will eventually be one of your four surviving cards in a winning game.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> When you see two cards of the same suit on top of different
            columns, do not automatically discard the lower one. First check what is underneath it.
            If the card below it enables another discard or creates an empty column, that changes
            the priority entirely. Chain reactions are how you win Aces Up.
          </p>
        </div>
      </section>

      {/* Section 2: Empty Column Management */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Empty Column Management
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty columns are the lifeblood of Aces Up strategy. In a game with no free cells and
          no tableau building, the only way to manipulate the board is by moving top cards into
          empty columns. Without at least one empty column, you are entirely at the mercy of which
          cards happen to land on top after each deal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Any top card can be moved into an empty column. This is your sole tool for digging
          deeper into piles and exposing buried cards for discard. Think of empty columns as the
          equivalent of free cells in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          — except they also receive new cards from the stock on every deal, so they do not stay
          empty permanently.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Creating an empty column is your top priority.</strong>{" "}
            After making all available discards, focus on clearing at least one column entirely.
            A single empty column transforms your strategic options.
          </li>
          <li>
            <strong className="text-white/90">Move cards strategically into empty columns.</strong>{" "}
            When you move a top card into an empty column to expose the card beneath it, you are
            spending a resource. Make sure what you expose is worth the cost — ideally a card that
            can be immediately discarded or that leads to a chain of discards.
          </li>
          <li>
            <strong className="text-white/90">Consolidate piles before dealing.</strong>{" "}
            Before dealing new cards from the stock, move remaining cards from short piles into
            longer piles to maximize empty columns. Each empty column that exists when you deal
            receives only one card instead of adding to a multi-card pile.
          </li>
          <li>
            <strong className="text-white/90">An empty column after dealing is a single card.</strong>{" "}
            When the stock deals one card to an empty column, that column now holds exactly one
            card — easy to empty again by moving it elsewhere. This is why having empty columns
            at deal time is so powerful.
          </li>
        </ul>

        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Empty Columns at Deal</span>
            <span>Cards Accessible</span>
            <span>Strategic Impact</span>
          </div>
          {[
            ["0 empty columns", "4 top cards only", "No manipulation — pure luck"],
            ["1 empty column", "5-6 cards reachable", "Can dig one layer deep"],
            ["2 empty columns", "6-8 cards reachable", "Strong — chain reactions possible"],
            ["3 empty columns", "Nearly all top cards", "Dominant — almost full control"],
          ].map(([cols, access, impact], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{cols}</span>
              <span>{access}</span>
              <span>{impact}</span>
            </div>
          ))}
        </div>

        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Dealing from the stock when you still have an empty
            column and unused moves available. Once you deal, four new cards cover your columns —
            including filling that precious empty space. Exhaust every possible discard and
            rearrangement before touching the stock.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Strategic Dealing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Strategic Dealing: When to Deal New Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In Aces Up, you deal four cards from the stock (one to each column) whenever no more
          moves are available — or when you choose to deal. This decision of <em>when</em> to deal
          is one of the most consequential in the game. Dealing too early wastes opportunities;
          dealing too late is impossible since you must deal when stuck.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock contains 48 cards (52 minus the initial 4 dealt). You will deal 12 more times,
          putting 4 cards out each time. Each deal buries whatever is currently on top of your
          columns under a new card. This means any cards you hoped to discard but did not are now
          harder to reach.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Never deal with discards still available.</strong>{" "}
            This is the most fundamental rule. Scan all four top cards for same-suit matches
            before dealing. Missing a discard means burying a card you could have eliminated.
          </li>
          <li>
            <strong className="text-white/90">Create empty columns before dealing.</strong>{" "}
            If you can empty a column by moving its sole remaining card to another column, do
            it before dealing. An empty column receiving one deal card is far better than a
            multi-card pile receiving one more.
          </li>
          <li>
            <strong className="text-white/90">Consolidate short piles.</strong> If column A has
            one card and column B has one card, consider moving one onto an empty column (if
            available) or accepting the state. The goal is to have the fewest possible cards
            distributed across the fewest possible columns when you deal.
          </li>
          <li>
            <strong className="text-white/90">Count remaining stock cards.</strong> Knowing how
            many deals remain helps you plan. With 3 deals left, you can project which Aces still
            need to surface and whether you have enough remaining moves to clear the board.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Timing tip:</strong> The ideal moment to deal is when all four top cards are
            of different suits (no discards possible), you have maximized empty columns, and you
            have used empty column moves to expose and discard everything reachable. Only then
            should you pull from the stock.
          </p>
        </div>
      </section>

      {/* Section 4: Suit Tracking and Awareness */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Suit Tracking and Awareness
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Because discards in Aces Up are suit-based, knowing which cards of each suit have been
          discarded versus which remain in the stock or buried in columns gives you a significant
          edge. This is similar to card counting in{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          — the more you track, the better your decisions.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Each suit has 13 cards. In a winning game, 12 of each suit are discarded and only the
          Ace remains. Tracking which cards have already been eliminated tells you what might still
          appear from the stock and which suits are likely to create discard opportunities.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Track Aces by suit.</strong> There are four Aces in
            the deck. Once an Ace surfaces as a top card, it can never be discarded — it will
            either stay on top or get buried by a deal. Knowing which Aces have appeared helps
            you plan which suits will generate discard opportunities.
          </li>
          <li>
            <strong className="text-white/90">Watch for suit dominance.</strong> If three of the
            four top cards are the same suit, you can discard two of them (keeping the highest).
            This kind of multi-discard turn is how you make real progress.
          </li>
          <li>
            <strong className="text-white/90">Anticipate Kings.</strong> Kings are the second-highest
            rank. A King on top of a column can only be discarded by an Ace of the same suit. If
            that Ace is buried or has not appeared yet, the King is stuck — plan around it.
          </li>
          <li>
            <strong className="text-white/90">Note suit distribution in piles.</strong> If you
            know a column has mostly Hearts buried in it, and the Ace of Hearts is on top of
            another column, future deals that put Hearts on top of that column create immediate
            discard opportunities.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> As the game progresses and more cards are discarded,
            suit tracking becomes easier and more valuable. In the final 3-4 deals, you should
            have a near-complete picture of which cards remain in the stock. This lets you
            predict what the next deal will bring and position your columns accordingly.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Ace Preservation Strategy */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ace Preservation Strategy
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The four Aces are the only cards that should remain at the end of a winning game. Since
          Aces are the highest rank, they can never be discarded — every other card of the same
          suit is lower. This makes Aces permanently immovable once they are buried under other
          cards. Protecting Aces from burial is therefore a critical strategic concern.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When an Ace is sitting on top of a column, it is both safe and useful — it enables
          discarding any other card of its suit that appears on top of another column. But when
          you deal from the stock, a new card lands on top of that Ace, burying it. Now that
          Ace is trapped until every card above it is discarded or moved.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Move Aces to empty columns before dealing.</strong>{" "}
            If you have an empty column and an Ace on top of a pile, move the Ace to the empty
            column. After the deal, the Ace has only one card on top of it instead of being
            buried deeper in a larger pile.
          </li>
          <li>
            <strong className="text-white/90">Prefer Ace columns for isolation.</strong>{" "}
            Ideally, each Ace ends up alone in its own column at the end. During the game, try to
            keep Ace-topped columns as short as possible so you can re-expose the Ace quickly
            after each deal.
          </li>
          <li>
            <strong className="text-white/90">Early Aces are mixed blessings.</strong> An Ace
            appearing in the first deal is powerful for discards but will get buried many times
            over the course of the game. An Ace appearing in the last few deals is easier to
            preserve but offers fewer discard opportunities during play.
          </li>
          <li>
            <strong className="text-white/90">Use empty columns to re-expose buried Aces.</strong>{" "}
            When an Ace is buried under just one or two cards, use empty column moves to lift
            those cards off and bring the Ace back to the surface. This is often the best use of
            an empty column.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Watch out:</strong> Do not sacrifice column-clearing progress solely to protect
            an Ace. If moving an Ace to an empty column prevents you from making a critical discard
            chain, the discard chain is usually more valuable. Aces can be re-exposed later; missed
            discard chains cannot be recovered.
          </p>
        </div>
      </section>

      {/* Section 6: Comparing Aces Up to Other Elimination Games */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comparing Aces Up to Other Elimination Games
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Aces Up belongs to the &ldquo;elimination&rdquo; family of solitaire games, where the
          goal is to discard cards rather than build them onto foundations. This places it alongside
          games like{" "}
          <Link href="/monte-carlo/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Monte Carlo
          </Link>{" "}
          and Pyramid Solitaire, but the mechanics differ significantly. Understanding these
          differences helps you appreciate what makes Aces Up strategy unique.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-4 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Feature</span>
            <span>Aces Up</span>
            <span>Monte Carlo</span>
            <span>Pyramid</span>
          </div>
          {[
            ["Discard rule", "Lower same-suit card", "Matching rank pairs", "Cards summing to 13"],
            ["Layout", "4 columns", "5x5 grid", "Pyramid of 28 cards"],
            ["Stock deals", "4 cards at once", "Fill gaps in grid", "Draw 1-3 from stock"],
            ["Win condition", "Only 4 Aces remain", "All cards paired off", "All cards removed"],
            ["Skill factor", "Moderate", "Low-moderate", "Moderate"],
            ["Win rate (skilled)", "10-15%", "5-10%", "~1-2%"],
          ].map(([feature, acesUp, monte, pyramid], i) => (
            <div
              key={i}
              className={`grid grid-cols-4 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{feature}</span>
              <span>{acesUp}</span>
              <span>{monte}</span>
              <span>{pyramid}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          What makes Aces Up distinct among elimination games is the suit-based hierarchy. In Monte
          Carlo, any two cards of the same rank can be paired regardless of suit. In Pyramid, any
          two cards summing to 13 work. Aces Up is the only common elimination game where suit
          identity determines which cards you can remove — making suit tracking a uniquely
          important skill.
        </p>
        <p className="text-white/70 leading-relaxed">
          Players coming from{" "}
          <Link href="/freecell/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          will find Aces Up refreshingly different. There is no tableau building, no foundation
          stacking, and no alternating colors. The entire game is about elimination and empty
          space management — a completely different strategic muscle.
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
              <strong>Scan all four top cards before every discard.</strong> Check all six possible
              same-suit pairings. Do not grab the first match you see.
            </li>
            <li>
              <strong>Prioritize discards that create chain reactions.</strong> Discard the card
              whose removal exposes another discardable card beneath it.
            </li>
            <li>
              <strong>Create empty columns before dealing.</strong> Move single cards onto other
              piles to free up columns. More empty columns at deal time means more control.
            </li>
            <li>
              <strong>Never deal with moves still available.</strong> Exhaust every discard and
              every useful empty-column move before touching the stock.
            </li>
            <li>
              <strong>Protect Aces from deep burial.</strong> Move Aces to empty columns before
              dealing when possible. A shallow-buried Ace is much easier to recover.
            </li>
            <li>
              <strong>Track suits as cards are discarded.</strong> Knowing which cards remain in
              the stock helps you anticipate future deals and position columns.
            </li>
            <li>
              <strong>Use empty columns to uncover buried Aces.</strong> Lifting one or two cards
              off a buried Ace is often the highest-value use of an empty column.
            </li>
            <li>
              <strong>Accept that some deals are unwinnable.</strong> Even with perfect play, many
              Aces Up deals cannot be won. Focus on maximizing your win rate across many games
              rather than forcing any single game.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/aces-up/how-to-play" title="How to Play Aces Up" description="Complete rules, setup, and dealing mechanics explained." />
            <ContentLinkCard href="/aces-up/tips" title="Aces Up Tips & Tricks" description="Quick, practical tips for improving your Aces Up game." />
            <ContentLinkCard href="/strategy" title="Solitaire Strategy Hub" description="Strategy guides for all solitaire variants." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Aces Up knowledge to the test. Play free online Aces Up Solitaire with unlimited undo, hints, and instant new deals."
          primaryLabel="Play Aces Up Solitaire"
          primaryHref="/aces-up"
          secondaryLabel="Learn the Rules"
          secondaryHref="/aces-up/how-to-play"
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
          More Aces Up Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/aces-up" title="Play Aces Up Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/aces-up/how-to-play" title="How to Play Aces Up" description="Complete rules and dealing mechanics" />
          <ContentLinkCard href="/aces-up/tips" title="Aces Up Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/freecell/strategy" title="FreeCell Strategy Guide" description="Strategy for the classic FreeCell game" />
          <ContentLinkCard href="/monte-carlo/strategy" title="Monte Carlo Strategy Guide" description="Strategy for another elimination solitaire game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
