import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Flower Garden Solitaire Tips & Tricks | Cultivate Your Winning Strategy",
  description:
    "Master Flower Garden Solitaire with practical tips on managing the bouquet, creating empty columns, uncovering aces, building long sequences, and planning ahead for a 30-40% win rate.",
  keywords: [
    "flower garden solitaire tips",
    "flower garden solitaire strategy",
    "flower garden solitaire tricks",
    "flower garden solitaire tips and tricks",
    "how to win flower garden solitaire",
    "flower garden solitaire help",
    "flower garden card game tips",
    "flower garden solitaire winning tips",
    "flower garden solitaire advice",
    "tips for flower garden solitaire",
    "flower garden solitaire guide",
  ],
  openGraph: {
    title: "Flower Garden Solitaire Tips & Tricks | Cultivate Your Winning Strategy",
    description:
      "Practical tips to win more Flower Garden Solitaire games. Learn bouquet management, empty column strategy, sequence building, and how to reach the 30-40% win rate.",
    url: absoluteUrl("/flower-garden/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Flower Garden Solitaire?",
    answer:
      "Create empty columns as early as possible. Empty columns are your most valuable resource because any card can fill them, giving you enormous flexibility to rearrange the garden. Since you can only move single cards (not sequences), empty columns serve as temporary holding spaces that let you uncover buried cards and reorganize your tableau efficiently.",
  },
  {
    question: "How should I use the bouquet in Flower Garden Solitaire?",
    answer:
      "Use the bouquet strategically, not randomly. All 16 bouquet cards are available at any time — like having 16 pre-loaded free cells. Scan the bouquet early to identify which cards can go directly to foundations and which will be useful for building sequences in the garden. Avoid playing bouquet cards to the tableau unless they serve a clear purpose, as they reduce your available options.",
  },
  {
    question: "What is the win rate for Flower Garden Solitaire?",
    answer:
      "Skilled players can expect to win roughly 30-40% of Flower Garden Solitaire deals. This is a moderate difficulty level compared to other solitaire variants — harder than FreeCell (nearly 100%) but much more forgiving than games like Accordion (~2%). The any-suit building rule and the large bouquet reserve give you considerable flexibility to work with.",
  },
  {
    question: "Can I move sequences in Flower Garden Solitaire?",
    answer:
      "No — Flower Garden Solitaire only allows single card moves. You cannot pick up and move an entire descending sequence at once. This is one of the key challenges of the game and why empty columns are so valuable. To move a sequence of cards, you must move them one at a time, using empty columns and the foundations as temporary holding spaces.",
  },
  {
    question: "What makes Flower Garden different from FreeCell?",
    answer:
      "Flower Garden Solitaire differs from FreeCell in several ways: the tableau has 6 columns of 6 cards (vs 8 columns of varying length), all cards are face-up, tableau building is by any suit descending (vs alternating colors), and the 16-card bouquet replaces the 4 free cells. The any-suit building and larger reserve make Flower Garden more flexible in some ways, but the single-card-only movement rule adds a unique challenge.",
  },
];

export default function FlowerGardenTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Flower Garden Solitaire", item: absoluteUrl("/flower-garden") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/flower-garden/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Flower Garden Solitaire Tips & Tricks",
        description: "Practical tips for winning more Flower Garden Solitaire games.",
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
        title="Flower Garden Solitaire Tips & Tricks"
        kicker={<><Link href="/flower-garden" className="hover:text-white transition-colors">Flower Garden Solitaire</Link> / Tips</>}
        subtitle="Cultivate your winning strategy — from empty column creation and bouquet management to sequence building, look-ahead planning, and maximizing the 30-40% win rate."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Flower Garden Solitaire", href: "/flower-garden" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">create empty columns early and protect them</strong>.
          Flower Garden Solitaire gives you 16 bouquet cards as a generous reserve, but the single-card-only
          movement rule means empty columns are your lifeline for rearranging the garden. Combine smart
          bouquet usage with empty column management and you&apos;ll be winning 30-40% of your games.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Create Empty Columns Early — They&apos;re Your Most Valuable Resource
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/flower-garden" className="text-[var(--gold)] hover:text-white transition-colors">
            Flower Garden Solitaire
          </Link>
          , each of the 6 tableau columns starts with 6 face-up cards. Since you can only move single
          cards (never sequences), empty columns are essential for maneuvering. An empty column can
          hold any card, acting as a temporary storage space that lets you dig deeper into other columns.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Focus on short columns first.</strong> Look for columns
          where several cards can move directly to foundations or onto other tableau piles. A column
          with an Ace on top followed by a 2 of the same suit is a prime candidate — play both to
          foundations and you&apos;re already two cards closer to an empty column.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Once you have an empty column, guard it carefully. Don&apos;t fill it casually — every card
          you place there should serve a specific purpose, like uncovering a buried Ace or enabling a
          critical sequence move. Think of empty columns as your most powerful tool, not just spare storage.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> With 6 columns and single-card moves only, having even one empty
            column dramatically increases your options. Two empty columns make almost any card accessible.
            Prioritize emptying a column over building long sequences in the early game.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Use the Bouquet Wisely — Don&apos;t Deplete It Randomly
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The bouquet is Flower Garden Solitaire&apos;s unique feature: 16 cards that are all face-up
          and available to play at any time. Think of them as 16 pre-loaded free cells — an enormous
          reserve of flexibility. But this abundance can be a trap if you spend bouquet cards without
          a plan.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Scan the bouquet at the start of every game.</strong> Identify
          which bouquet cards can go directly to foundations (Aces, or cards that match existing foundation
          tops). Identify which cards will be useful for building sequences in the garden. And note which
          cards are &ldquo;blockers&rdquo; — high cards with no immediate home.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Play bouquet cards to foundations whenever possible — they&apos;re free moves that thin your
          reserve without costing anything. But avoid playing bouquet cards to the tableau unless they
          serve a clear purpose, such as extending a sequence that will help you empty a column.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Every bouquet card you play to the tableau is one fewer option
            in your reserve. A bouquet of 12 remaining cards gives you far more flexibility than a bouquet
            of 4. Only spend bouquet cards when the payoff — a foundation play, an empty column, or an
            uncovered Ace — is clear and immediate.
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
          Tip #3: Prioritize Uncovering Aces and Low Cards
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Foundations in{" "}
          <Link href="/flower-garden" className="text-[var(--gold)] hover:text-white transition-colors">
            Flower Garden Solitaire
          </Link>{" "}
          build up by suit from Ace to King. Nothing can go to an empty foundation except an Ace, and
          nothing can build on an Ace except the 2 of that suit. This means buried Aces and low cards
          (2s and 3s) are your most urgent targets.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          At the start of each game, scan all 6 columns and the bouquet for Aces. Note where each Ace
          sits — if an Ace is on top of a column, play it immediately. If an Ace is buried under 2-3
          cards, that column becomes a priority for excavation. If an Ace is buried under 5 cards, you
          may need to work on other columns first to create empty spaces.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Bouquet Aces:</strong> Play them to foundations immediately
            — they&apos;re free
          </li>
          <li>
            <strong className="text-white/90">Top-of-column Aces:</strong> Play them right away to start
            building foundations
          </li>
          <li>
            <strong className="text-white/90">Shallowly buried Aces:</strong> Focus on clearing 1-2
            cards above them early
          </li>
          <li>
            <strong className="text-white/90">Deeply buried Aces:</strong> Note their position and work
            toward them as you create empty columns
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          The same logic applies to 2s and 3s — once an Ace is on its foundation, the corresponding
          2 becomes the next bottleneck. Always know where your next foundation card is hiding.
        </p>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Build Long Descending Sequences in the Garden
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden Solitaire allows tableau building in descending order by any suit. This is
          far more flexible than games that require alternating colors — a 7 of hearts can go on an 8
          of hearts, 8 of spades, 8 of diamonds, or 8 of clubs. Use this freedom to create long
          descending sequences that organize your garden efficiently.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Long sequences consolidate cards.</strong> A column with
          K-Q-J-10-9-8-7 holds seven cards in perfect order using just one column. This frees up
          space in other columns and makes it easier to access buried cards elsewhere. The longer your
          sequences, the more organized your garden becomes.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, remember that you can only move single cards. Building a sequence requires moving
          cards one at a time, which means you need either empty columns or foundation plays to
          rearrange effectively. Plan your sequence building in stages — don&apos;t try to assemble a
          K-through-A sequence all at once.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When building sequences, prefer placing same-suit cards together
            when possible. While any suit can build on any other, same-suit sequences are easier to
            move to foundations later since foundations require suit matching. A sequence of all hearts
            (K♥-Q♥-J♥-10♥) can feed directly to the hearts foundation in order.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Avoid Burying Cards You&apos;ll Need Soon
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of the fastest ways to lose a Flower Garden game is to bury a card you need in the near
          future. Before placing any card on a tableau column, ask yourself: &ldquo;Will I need the
          card I&apos;m covering before I need the card I&apos;m placing?&rdquo;
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Check the foundation state.</strong> If the hearts
          foundation is up to the 5 and you&apos;re about to bury the 6 of hearts under a King, stop.
          That 6 is your next hearts foundation card — burying it means you&apos;ll need to excavate
          it later, wasting moves and potentially empty columns.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          This principle applies to any card that&apos;s next in line for a foundation or that you
          need to extend a critical sequence. Develop the habit of mentally checking: &ldquo;What are
          the next 2-3 foundation cards I need for each suit?&rdquo; If any of those cards are about
          to be buried, find an alternative move.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Rule of thumb:</strong> Never bury a card that is within 2 ranks of the current
            foundation top for its suit. If spades is at 3, don&apos;t bury the 4 or 5 of spades.
            This simple rule prevents the most common game-ending mistakes.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Plan Several Moves Ahead
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden Solitaire is a game of perfect information — every card in the garden and
          bouquet is face-up from the start. This means you can (and should) plan several moves ahead
          before touching a single card. The best players spend more time analyzing than moving.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before making any move, trace out the consequences:
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">What does this move uncover?</strong> Is the card beneath
            useful right now, or is it a blocker?
          </li>
          <li>
            <strong className="text-white/90">What does this move enable?</strong> Does it create a
            foundation play, empty a column, or extend a sequence?
          </li>
          <li>
            <strong className="text-white/90">What does this move block?</strong> Am I covering a card
            I&apos;ll need soon? Am I filling an empty column I might need?
          </li>
          <li>
            <strong className="text-white/90">What&apos;s my 3-move plan?</strong> Can I see a sequence
            of moves that leads to meaningful progress?
          </li>
        </ul>
        <p className="text-white/70 leading-relaxed">
          The perfect-information nature of Flower Garden means that losing is almost always a planning
          error, not bad luck. When you hit a dead end, trace back to find where a different choice
          would have kept the game alive. This analysis is how you improve over time.
        </p>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Use Any-Suit Building for Maximum Flexibility
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Unlike{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          , where tableau building requires alternating colors, Flower Garden Solitaire lets you build
          down by any suit. A black 9 can go on a black 10 — no color restriction at all. This
          quadruples your building options and is one of the game&apos;s biggest strategic advantages.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          <strong className="text-white/90">Leverage this freedom actively.</strong> When you need to
          move a card, you have up to four possible destination columns (any column topped by a card
          one rank higher). This means you can often choose the placement that best fits your overall
          strategy rather than being forced into the only legal move.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When choosing between multiple valid placements, prefer the column where the card does the
          least damage. Place cards on columns you don&apos;t plan to empty soon. Avoid placing cards
          on short columns that are close to becoming empty. And when possible, build same-suit
          sequences to make future foundation transfers smoother.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> The any-suit rule means that Kings are equally dangerous in every
            column — they can only be moved to empty columns or foundations. Before placing a King on
            a tableau pile, make sure you won&apos;t need access to the cards below it anytime soon.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Accept the 30-40% Win Rate and Iterate
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Flower Garden Solitaire has a moderate win rate of roughly 30-40% with skilled play. This
          places it in a satisfying middle ground among{" "}
          <Link href="/solitaire-types" className="text-[var(--gold)] hover:text-white transition-colors">
            solitaire variants
          </Link>
          {" "}— harder than{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          (where nearly every deal is solvable) but much more forgiving than games like{" "}
          <Link href="/accordion" className="text-[var(--gold)] hover:text-white transition-colors">
            Accordion
          </Link>{" "}
          (~2%) or{" "}
          <Link href="/la-belle-lucie" className="text-[var(--gold)] hover:text-white transition-colors">
            La Belle Lucie
          </Link>{" "}
          (~15%).
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Not every deal is winnable, no matter how well you play. Some initial layouts have deeply
          buried Aces with no practical way to reach them, or critical cards locked behind each other
          in multiple columns. Recognizing an unwinnable deal early saves time and frustration.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The best way to improve is to play many games and learn from each one. After a loss, ask
          yourself: &ldquo;Was there a moment where I chose wrong?&rdquo; Often you&apos;ll find a
          point where a different move — saving an empty column, playing a different bouquet card, or
          building on a different column — would have changed the outcome.
        </p>
        <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-300/80 text-sm">
            <strong>Don&apos;t chase unwinnable deals.</strong> If all four Aces are deeply buried and
            you can&apos;t create empty columns, restart. Good Flower Garden players recognize lost causes
            quickly and move on to fresh deals where their skills can make a difference.
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
              <strong>Create empty columns early.</strong> They&apos;re your most powerful tool for
              rearranging single cards in the garden.
            </li>
            <li>
              <strong>Use the bouquet strategically.</strong> Play bouquet cards to foundations freely,
              but only to the tableau when the payoff is clear.
            </li>
            <li>
              <strong>Uncover Aces and low cards first.</strong> Foundations can&apos;t build without
              them — locate and excavate them early.
            </li>
            <li>
              <strong>Build long descending sequences.</strong> Consolidate cards to free up column
              space and organize the garden.
            </li>
            <li>
              <strong>Don&apos;t bury needed cards.</strong> Always check what the next 2-3 foundation
              cards are before covering anything.
            </li>
            <li>
              <strong>Plan several moves ahead.</strong> All cards are visible — use that information
              to trace consequences before acting.
            </li>
            <li>
              <strong>Exploit any-suit building.</strong> Four possible destinations per card gives you
              real choice — use it wisely.
            </li>
            <li>
              <strong>Accept the 30-40% win rate.</strong> Not every deal is winnable — iterate quickly
              and learn from each game.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden Solitaire" description="Complete rules, setup, and card mechanics explained." />
            <ContentLinkCard href="/flower-garden" title="Play Flower Garden Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and watch your Flower Garden win rate grow."
          primaryLabel="Play Flower Garden Solitaire"
          primaryHref="/flower-garden"
          secondaryLabel="Learn the Rules"
          secondaryHref="/flower-garden/how-to-play"
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
          More Flower Garden Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/flower-garden" title="Play Flower Garden Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/flower-garden/how-to-play" title="How to Play Flower Garden Solitaire" description="Complete rules, setup, and strategy explained" />
          <ContentLinkCard href="/beleaguered-castle/tips" title="Beleaguered Castle Tips" description="Tips and tricks for Beleaguered Castle Solitaire" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
