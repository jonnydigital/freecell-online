import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Cruel Solitaire Strategy Guide | Master the Predictable Redeal",
  description:
    "Master Cruel Solitaire with expert strategies for exploiting the deterministic redeal mechanic, pre-redeal planning, foundation timing, and pile management. Win more games by thinking two states ahead.",
  keywords: [
    "cruel solitaire strategy",
    "cruel solitaire winning strategy",
    "cruel solitaire redeal strategy",
    "how to win cruel solitaire",
    "cruel solitaire strategy guide",
    "cruel solitaire tips and tricks",
    "cruel solitaire pile management",
    "cruel solitaire foundation timing",
    "cruel vs la belle lucie",
    "cruel solitaire advanced techniques",
    "cruel solitaire deterministic redeal",
  ],
  alternates: {
    canonical: absoluteUrl("/cruel/strategy"),
  },
  openGraph: {
    title: "Cruel Solitaire Strategy Guide | Master the Predictable Redeal",
    description:
      "Expert strategies for Cruel Solitaire: deterministic redeal exploitation, pre-redeal planning, foundation timing, pile management, and comparison with La Belle Lucie.",
    url: absoluteUrl("/cruel/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What makes Cruel Solitaire different from other redeal solitaire games?",
    answer:
      "Cruel Solitaire&apos;s redeal is deterministic, not random. When you redeal, cards are collected left-to-right across the 12 piles, bottom-to-top within each pile, then redistributed into groups of 4. The same arrangement always produces the same redeal result. This means you can predict exactly what the redeal will produce and plan your moves to manipulate the outcome — a fundamentally different strategic challenge than games like La Belle Lucie where redeals shuffle randomly.",
  },
  {
    question: "How many redeals do you get in Cruel Solitaire?",
    answer:
      "Cruel Solitaire allows unlimited redeals. However, because the redeal is deterministic, redealing without changing the pile arrangement produces the exact same result every time. This means redeals are only useful after you have moved cards between piles to alter the configuration. Unlimited redeals sound generous, but they only help if you understand how to manipulate pile states to produce favorable redistributions.",
  },
  {
    question: "What is the best opening strategy for Cruel Solitaire?",
    answer:
      "Start by scanning all 12 piles for immediate foundation plays (Aces and low cards in sequence). Then look for same-suit descending moves that consolidate cards without breaking useful pile structures. Before making any move, consider how it affects the post-redeal state — moving a card changes the composition of two piles, which ripples through the entire redistribution. Prioritize moves that improve both the current tableau and the predicted post-redeal tableau simultaneously.",
  },
  {
    question: "Should I always play cards to the foundation when possible in Cruel?",
    answer:
      "No. This is one of the most common mistakes in Cruel Solitaire. Playing a card to the foundation permanently removes it from the tableau, which changes pile sizes and therefore changes the redeal distribution. Sometimes holding back a foundation play keeps a pile at a size that produces a more favorable redeal outcome. Always simulate the post-redeal state before committing a card to the foundation, especially in the mid-game when pile sizes are uneven.",
  },
  {
    question: "What win rate should I expect with optimal Cruel Solitaire strategy?",
    answer:
      "Expert Cruel players achieve roughly a 25-35% win rate. This is lower than FreeCell (80%+) but higher than many other patience games. The deterministic redeal means that skilled players can solve deals that appear hopeless to beginners, but many deals are mathematically unsolvable regardless of play quality. The skill expression in Cruel comes from identifying solvable deals and exploiting the predictable redeal to navigate through them.",
  },
];

export default function CruelStrategyPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Cruel Solitaire", item: absoluteUrl("/cruel") },
          { "@type": "ListItem", position: 3, name: "Strategy", item: absoluteUrl("/cruel/strategy") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Cruel Solitaire Strategy Guide",
        description: "Expert strategies for Cruel Solitaire covering the deterministic redeal mechanic, pre-redeal planning, foundation timing, pile management, and comparison with La Belle Lucie.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-30",
        dateModified: "2026-03-30",
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
        title="Cruel Solitaire Strategy Guide"
        kicker={<><Link href="/cruel" className="hover:text-white transition-colors">Cruel Solitaire</Link> / Strategy</>}
        subtitle="Master the only solitaire variant where every redeal is predictable — learn to think two states ahead and exploit the deterministic redistribution mechanic."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Cruel Solitaire", href: "/cruel" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The Core Strategy
        </h2>
        <p className="text-white/70 leading-relaxed">
          Cruel Solitaire strategy comes down to three pillars: <strong className="text-white">exploit the deterministic redeal by predicting outcomes before they happen</strong>,{" "}
          <strong className="text-white">plan every move for its effect on both the current tableau AND the post-redeal state</strong>, and{" "}
          <strong className="text-white">time foundation plays strategically rather than greedily</strong>.
          The redeal is not a reset button — it is a transformation function you can control. Every card
          you move between piles changes the input to that function and therefore changes its output.
        </p>
      </div>

      {/* Section 1: Understanding the Redeal Mechanic */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Understanding the Redeal Mechanic: Cruel&apos;s Defining Feature
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          <Link href="/cruel" className="text-[var(--gold)] hover:text-white transition-colors">
            Cruel Solitaire
          </Link>{" "}
          begins with 48 cards dealt into 12 piles of 4 cards each, all face-up. The four Aces start
          on the foundations. You build on foundations in ascending suit sequence and build on tableau
          piles in descending same-suit sequence, moving only one card at a time. But the mechanic that
          separates Cruel from every other solitaire variant is its redeal.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you trigger a redeal, the game collects cards from all 12 piles using a specific,
          unchanging algorithm: it moves left to right across the piles (pile 1 first, pile 12 last),
          and within each pile it takes cards from bottom to top. These collected cards form a single
          ordered sequence. The game then redistributes this sequence into groups of 4, dealing them
          back into the 12 pile positions. If the total card count isn&apos;t divisible by 4 (because
          some cards have been played to foundations), the last pile receives fewer than 4 cards.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This process is entirely deterministic. There is no shuffling, no randomization, no hidden
          information. The same pile arrangement will always produce the same redeal result. This is
          the single most important strategic insight in Cruel: <em>the redeal is a predictable
          transformation, not a random event</em>. Once you internalize this, the entire game changes.
          You stop hoping the redeal will help and start engineering the redeal to produce exactly
          what you need.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Collection order matters.</strong> Cards are gathered
            left-to-right by pile, bottom-to-top within each pile. A card at the bottom of pile 1
            becomes the first card in the collected sequence; a card at the top of pile 12 becomes
            the last.
          </li>
          <li>
            <strong className="text-white/90">Redistribution is sequential.</strong> The collected
            sequence is dealt out in groups of 4: cards 1-4 become pile 1, cards 5-8 become pile 2,
            and so on. The bottom card of each new pile is the first card dealt to that position.
          </li>
          <li>
            <strong className="text-white/90">Redealing without moving cards is pointless.</strong> Since
            the algorithm is deterministic, redealing the same arrangement produces the same result. You
            must change the pile configuration between redeals for the redeal to produce a different outcome.
          </li>
          <li>
            <strong className="text-white/90">Foundation plays change pile sizes.</strong> When you play
            a card to the foundation, it leaves the tableau permanently. This changes the total card
            count, which shifts how cards are grouped during redistribution — potentially affecting
            every pile&apos;s composition after the redeal.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Think of the redeal as a function: f(pile_state) = new_pile_state.
            Your job is not to play the game and then redeal hoping for improvement. Your job is to
            manipulate the input to this function so that the output is what you need. Every move you
            make is simultaneously a tableau move and an edit to the redeal&apos;s input. Master this
            dual perspective and you will see Cruel in an entirely new light.
          </p>
        </div>
      </section>

      {/* Section 2: Pre-Redeal Planning */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Pre-Redeal Planning: Engineering the Redistribution
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Since every redeal is predictable, the strongest Cruel players do not simply play cards
          and then redeal when stuck. They actively arrange cards <em>before</em> redealing to control
          what the redistribution produces. This is the highest-skill aspect of Cruel and the primary
          differentiator between intermediate and expert play.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The core technique is straightforward in concept but demanding in execution: before
          triggering a redeal, move cards between piles so that the collection algorithm picks them
          up in an order that produces favorable groupings after redistribution. This means you need
          to mentally simulate the entire collection-and-redistribution process for your planned
          pile state. You are effectively solving two puzzles simultaneously — the current tableau
          and the post-redeal tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Consider a concrete example. Suppose you need the 7 of Hearts to land on top of the 8 of
          Hearts after the redeal. You know the 8 of Hearts is currently in pile 6. After collection
          and redistribution, you need the 7 of Hearts to end up as the top card of whatever pile the
          8 of Hearts lands in. Working backward: if the 8 of Hearts will be the third card dealt to
          pile N, then the 7 of Hearts needs to be the fourth card dealt to pile N — meaning it must
          immediately follow the 8 in the collected sequence. You can achieve this by placing the 7 in
          a position where the collection algorithm picks it up right after the 8.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Every move affects two states.</strong> When you move a
            card from pile A to pile B, you change the current tableau (obvious) and the post-redeal
            tableau (less obvious but equally important). Train yourself to evaluate both effects before
            committing to any move.
          </li>
          <li>
            <strong className="text-white/90">Count cards per pile before redealing.</strong> The total
            card count divided by 4 tells you how many full piles will exist after the redeal. Knowing
            pile sizes lets you predict exactly where each card will land.
          </li>
          <li>
            <strong className="text-white/90">Move cards to manipulate collection order.</strong> If a
            critical card is being collected too early (ending up in pile 1 or 2 when you need it in
            pile 8), move it to a higher-numbered pile. If it is collected too late, move it to a
            lower-numbered pile or to the bottom of an earlier pile.
          </li>
          <li>
            <strong className="text-white/90">Short piles are strategic levers.</strong> A pile with
            only 1 or 2 cards contributes fewer cards to the collected sequence at that position,
            effectively shifting all subsequent cards earlier in the redistribution. Use short piles
            intentionally to control where key cards land.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Pre-redeal manipulation often requires making moves
            that worsen the current tableau in exchange for a better post-redeal state. This feels
            counterintuitive — why would you break a useful sequence just to improve the redeal? Because
            the redeal will rebuild the entire tableau anyway. The current state is temporary; the
            post-redeal state is what you will actually play next. Optimize for the future, not the
            present.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 3: Foundation Building Timing */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Foundation Building Timing: When to Hold Back
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In most solitaire games — from{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          to{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>{" "}
          — playing cards to the foundation as early as possible is almost always correct. Foundations
          are safe storage that reduce tableau complexity. In Cruel, this intuition is dangerously
          misleading. Foundation timing is one of the subtlest and most important strategic decisions
          in the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The reason is pile sizes. When you play a card to the foundation, it leaves the tableau
          permanently. This reduces the total card count, which changes how the redistribution
          algorithm groups cards during the next redeal. A pile that would have received 4 cards now
          receives 3, or the last pile shrinks from 3 cards to 2. This ripple effect can shift the
          position of every card in the post-redeal tableau — sometimes improving it, sometimes
          destroying a carefully engineered arrangement.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The most common mistake is aggressive foundation building in the mid-game. Early on, when
          piles are all 4 cards and the redistribution is uniform, foundation plays are relatively
          safe — removing one card from 48 causes a minor shift. But when you have 30 cards across
          12 piles with uneven distribution, removing even one card can cause a cascade of position
          changes. At this stage, you must simulate the post-redeal state both with and without the
          foundation play to determine which produces a more workable tableau.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Early foundation plays are usually safe.</strong> With
            48 cards evenly distributed, the positional impact of removing one card is minimal. Play
            Aces and 2s to foundations freely in the opening.
          </li>
          <li>
            <strong className="text-white/90">Mid-game foundation plays require simulation.</strong> Once
            pile sizes become uneven (some with 5+ cards, some with 1-2), every foundation play
            materially changes the redistribution. Check the post-redeal impact before committing.
          </li>
          <li>
            <strong className="text-white/90">Holding back can keep key cards accessible.</strong> A
            card on the tableau can be moved between piles to manipulate the redeal. Once it is on
            the foundation, you lose that manipulation tool. Sometimes the 5 of Diamonds is more
            valuable as a pile-manipulation lever than as a foundation card.
          </li>
          <li>
            <strong className="text-white/90">Foundation plays are irreversible.</strong> Unlike{" "}
            <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
              FreeCell
            </Link>
            {" "}where you can pull cards back from foundations in some implementations, Cruel&apos;s
            foundation plays are permanent. An ill-timed foundation play can make a deal unsolvable
            that was otherwise winnable.
          </li>
        </ul>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Common mistake:</strong> Automatically playing every available card to the foundation.
            In Cruel, greedy foundation building is one of the fastest ways to lose a winnable deal. The
            card you play to the foundation might be the exact card you needed on the tableau to
            set up a critical pre-redeal arrangement. Before every foundation play, ask: &ldquo;Is this
            card more useful here or on the foundation?&rdquo; The answer is not always obvious.
          </p>
        </div>
      </section>

      {/* Section 4: Working Backward From Redeal Outcomes */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Working Backward From Redeal Outcomes: The Simulation Skill
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The most advanced skill in Cruel Solitaire is mental simulation — predicting the exact
          post-redeal tableau from the current pile state. This is not guesswork. Because the redeal
          algorithm is deterministic and the rules are simple (collect left-to-right, bottom-to-top;
          redistribute in groups of 4), the outcome is fully calculable. Expert Cruel players perform
          this calculation before every redeal, and the best players evaluate multiple candidate
          pre-redeal arrangements to find the one that produces the most favorable outcome.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The simulation process works in three steps. First, mentally collect all cards using the
          algorithm: scan pile 1 bottom-to-top, then pile 2 bottom-to-top, and so on through pile 12.
          This gives you the collected sequence. Second, divide this sequence into groups of 4 — the
          first 4 cards form pile 1, the next 4 form pile 2, and so on. Third, examine the resulting
          piles for useful configurations: same-suit descending pairs on top, foundation-playable
          cards accessible, and piles that support your overall building plan.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          With practice, you do not need to simulate the entire 12-pile redistribution. Focus on the
          cards that matter most — the ones you need for foundation plays or critical same-suit
          connections. Track where those specific cards sit in the collected sequence and where they
          will land after redistribution. If a key card ends up buried in the middle of a new pile,
          consider what pre-redeal moves would shift it to the top instead.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Start with critical cards.</strong> Identify the 2-3
            cards you most need to be accessible after the redeal. Track their collection position and
            redistribution landing spot. If the landing is unfavorable, work backward to find a
            pre-redeal move that fixes it.
          </li>
          <li>
            <strong className="text-white/90">Use pile card counts as landmarks.</strong> If pile 1
            has 3 cards, pile 2 has 5 cards, and pile 3 has 2 cards, the first 10 collected cards
            come from these three piles (in that order). Cards 1-3 from pile 1, cards 4-8 from pile 2,
            cards 9-10 from pile 3. This means pile 1 after redistribution gets cards 1-4 (all of
            pile 1&apos;s cards plus the bottom card of pile 2).
          </li>
          <li>
            <strong className="text-white/90">Simulate before committing.</strong> Before triggering
            the redeal, run the simulation mentally. If the result is not favorable, look for one more
            move that improves the predicted outcome. Sometimes a single card move transforms a
            useless redeal into a game-winning one.
          </li>
          <li>
            <strong className="text-white/90">Compare multiple pre-redeal options.</strong> If you have
            two or three possible moves before redealing, simulate the outcome of each. Choose the
            move that produces the best post-redeal state, even if it worsens the current state.
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Key insight:</strong> Mental simulation is a trainable skill, not an innate talent.
            Start by simulating just the first 2-3 piles after a redeal. As your speed improves,
            extend to 5-6 piles. Most games are decided by what happens in a handful of critical
            piles, so partial simulation is often sufficient. You do not need to predict all 12
            piles perfectly — just the ones that contain your key cards.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Section 5: Pile Management and Card Ordering */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Pile Management and Card Ordering: Controlling the Tableau
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Cruel&apos;s tableau building rule — same-suit descending, one card at a time — is far more
          restrictive than games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (any suit descending) or{" "}
          <Link href="/yukon" className="text-[var(--gold)] hover:text-white transition-colors">
            Yukon
          </Link>{" "}
          (alternating color descending with group moves). You can only place a card on another card
          of the same suit that is exactly one rank higher. The 9 of Clubs can only go on the 10 of
          Clubs — not the 10 of Spades, not the 10 of Hearts, not the Jack of Clubs. This extreme
          restriction means valid moves are rare and each one is strategically significant.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Pile management in Cruel revolves around maintaining useful same-suit descending sequences
          on top of piles while keeping the overall pile structure favorable for the next redeal.
          A well-managed pile has its most useful cards on top (accessible for moves or foundation
          plays) and its least useful cards on the bottom (where they will be collected first during
          the redeal and redistributed to early piles).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Empty piles deserve special attention. When a pile is emptied, it remains empty until the
          next redeal, when it may or may not receive cards depending on the total count. An empty
          pile contributes nothing to the collected sequence, which means every card from subsequent
          piles shifts earlier in the redistribution. This shift effect is significant — one empty
          pile shifts every subsequent pile&apos;s contribution by one position in the collected
          sequence, which can cascade into completely different pile compositions after redistribution.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Keep same-suit sequences together.</strong> If you
            have the 8-7 of Spades on a pile, protect that sequence. Breaking it apart costs two
            moves to reconstruct and wastes tempo.
          </li>
          <li>
            <strong className="text-white/90">Short piles are manipulation tools.</strong> A pile with
            1 or 2 cards gives you flexibility. You can add cards to it to control its contribution
            to the collected sequence, or empty it entirely to shift redistribution positioning.
          </li>
          <li>
            <strong className="text-white/90">Long piles constrain your options.</strong> A pile with
            6+ cards dominates a large segment of the collected sequence. The cards at the bottom of
            a long pile are essentially locked — you cannot access them without playing through the
            entire pile or redealing.
          </li>
          <li>
            <strong className="text-white/90">Empty piles shift redistribution.</strong> Every empty
            pile causes subsequent cards to be collected and redistributed one position earlier. Three
            empty piles shifts the effective start point of later cards by three positions — enough
            to completely rearrange the post-redeal tableau.
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Strategic trade-off:</strong> Building a long same-suit descending sequence on a
            single pile feels productive — you are organizing cards in order. But in Cruel, a long
            pile creates a rigid block in the collected sequence that limits your redistribution
            options. Sometimes it is better to keep cards spread across multiple short piles for
            maximum pre-redeal flexibility, even though the current tableau looks messier.
          </p>
        </div>
      </section>

      {/* Section 6: Cruel vs La Belle Lucie */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Cruel vs La Belle Lucie: Determinism vs Adaptability
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Cruel and{" "}
          <Link href="/la-belle-lucie/strategy" className="text-[var(--gold)] hover:text-white transition-colors">
            La Belle Lucie
          </Link>{" "}
          are often grouped together as &ldquo;redeal solitaire games,&rdquo; and they share surface
          similarities: both use piles of cards with restricted building rules, and both allow redeals
          that reorganize the tableau. But the nature of their redeals creates fundamentally different
          strategic games. Understanding this difference is essential for players who enjoy both
          variants.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          La Belle Lucie&apos;s redeal is a random shuffle — cards are collected and redistributed in
          a new random order. This means pre-redeal planning is impossible. You cannot engineer a
          favorable redeal because you have no idea what the redeal will produce. La Belle Lucie
          strategy is therefore about maximizing your position <em>before</em> each redeal and then
          adapting to whatever the redeal gives you. It rewards flexibility, pattern recognition,
          and the ability to spot new opportunities in a reshuffled tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Cruel&apos;s deterministic redeal flips this on its head. You know exactly what the redeal
          will produce, so you can (and must) plan for it. Cruel rewards calculation, simulation, and
          precise execution. The game is more cerebral and less reactive — you are engineering
          outcomes rather than adapting to them. This makes Cruel feel more like a logic puzzle and
          La Belle Lucie more like a card game.
        </p>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden mb-4">
          <div className="grid grid-cols-3 text-sm font-bold text-white/40 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Strategic Element</span>
            <span>Cruel</span>
            <span>La Belle Lucie</span>
          </div>
          {[
            ["Redeal type", "Deterministic (predictable)", "Random (unpredictable)"],
            ["Number of redeals", "Unlimited", "2 (sometimes 3)"],
            ["Pre-redeal planning", "Essential — engineer the outcome", "Impossible — focus on current state"],
            ["Core skill", "Simulation and calculation", "Adaptability and pattern recognition"],
            ["Building rule", "Same-suit descending", "Same-suit descending"],
            ["Pile structure", "12 piles of 4 cards", "18 piles of 3 cards (fans)"],
            ["Mental model", "Logic puzzle / function optimization", "Card game with resets"],
            ["Win rate (skilled)", "25-35%", "20-30%"],
          ].map(([element, cruel, lbl], i) => (
            <div
              key={i}
              className={`grid grid-cols-3 px-4 py-3 text-sm text-white/60 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}
            >
              <span className="text-white/80 font-medium">{element}</span>
              <span>{cruel}</span>
              <span>{lbl}</span>
            </div>
          ))}
        </div>
        <p className="text-white/70 leading-relaxed">
          The biggest mindset shift between these two games: in La Belle Lucie, you play the hand
          you are dealt and hope the redeal improves things. In Cruel, you <em>design</em> the hand
          you will be dealt. Players who excel at La Belle Lucie are often strong at reading new
          board positions quickly. Players who excel at Cruel are often strong at planning and
          calculation. Both are rewarding, but they exercise very different cognitive muscles. If you
          enjoy the predictability and depth of{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>
          , Cruel&apos;s deterministic redeal will feel like a natural fit.
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
              <strong>The redeal is deterministic.</strong> Same pile state always produces the same
              result. Exploit this by predicting and engineering outcomes.
            </li>
            <li>
              <strong>Every move affects two states.</strong> Evaluate each card move for its impact
              on both the current tableau and the post-redeal tableau.
            </li>
            <li>
              <strong>Simulate before redealing.</strong> Mentally trace the collection and
              redistribution to predict the outcome. If unfavorable, make one more move to improve it.
            </li>
            <li>
              <strong>Foundation timing is critical.</strong> Don&apos;t play cards to foundations
              automatically. Check whether removing a card from the tableau improves or worsens
              the redistribution.
            </li>
            <li>
              <strong>Manage pile sizes intentionally.</strong> Short piles give redistribution
              flexibility. Long piles create rigid blocks. Empty piles shift all subsequent card
              positions.
            </li>
            <li>
              <strong>Track key cards, not all cards.</strong> You don&apos;t need to simulate all
              12 piles. Focus on the 2-3 cards critical to your current plan and predict their
              post-redeal positions.
            </li>
            <li>
              <strong>Redealing without changes is wasted.</strong> If you haven&apos;t moved any
              cards since the last redeal, the result will be identical. Always make at least one
              meaningful move between redeals.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/cruel/how-to-play" title="How to Play Cruel" description="Complete rules, setup, and mechanics for Cruel Solitaire." />
            <ContentLinkCard href="/cruel/tips" title="Cruel Tips & Tricks" description="Quick, practical tips for improving your Cruel game." />
            <ContentLinkCard href="/la-belle-lucie/strategy" title="La Belle Lucie Strategy" description="Strategy guide for Cruel's random-redeal cousin." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Apply These Strategies?"
          body="Put your Cruel Solitaire knowledge to the test. Play free online Cruel Solitaire with unlimited redeals and instant new deals."
          primaryLabel="Play Cruel Solitaire"
          primaryHref="/cruel"
          secondaryLabel="Learn the Rules"
          secondaryHref="/cruel/how-to-play"
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

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Cruel Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/cruel" title="Play Cruel Solitaire" description="Put these strategies into practice online for free" />
          <ContentLinkCard href="/cruel/how-to-play" title="How to Play Cruel" description="Complete rules, setup, and move guide" />
          <ContentLinkCard href="/cruel/tips" title="Cruel Tips & Tricks" description="Quick tips for all skill levels" />
          <ContentLinkCard href="/la-belle-lucie/strategy" title="La Belle Lucie Strategy" description="Strategy for Cruel's random-redeal cousin" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
