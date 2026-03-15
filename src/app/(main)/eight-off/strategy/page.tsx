import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard } from "@/components/content";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Eight Off Strategy Guide — Making the Most of 8 Reserve Cells",
  description:
    "Master Eight Off solitaire with our in-depth strategy guide. Learn reserve cell management, same-suit sequencing, opening analysis, and how Eight Off differs from FreeCell and Baker's Game.",
  keywords: [
    "eight off strategy",
    "eight off solitaire tips",
    "how to win eight off",
    "eight off guide",
    "eight off vs freecell",
    "eight off reserve cells",
    "eight off solitaire strategy",
    "same suit solitaire tips",
    "eight off advanced strategy",
    "eight off winning tips",
  ],
  openGraph: {
    title: "Eight Off Strategy Guide — Making the Most of 8 Reserve Cells",
    description:
      "Expert strategies for Eight Off solitaire. Learn to manage 8 reserve cells, plan around opening cards, and master same-suit sequencing.",
    url: absoluteUrl("/eight-off/strategy"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "How many reserve cells does Eight Off have?",
    answer:
      "Eight Off has 8 reserve cells (also called free cells), which is double the 4 free cells in standard FreeCell and Baker's Game. However, 4 of those 8 cells start the game occupied by cards from the deal, so you effectively begin with only 4 empty reserve cells. The extra storage compensates for the same-suit stacking restriction, but filling all 8 cells is still a critical mistake that will usually end the game.",
  },
  {
    question: "Is Eight Off harder than FreeCell?",
    answer:
      "Yes, Eight Off is harder than standard FreeCell despite having more reserve cells. The same-suit stacking rule dramatically limits your legal moves in the tableau. In FreeCell, any card can go on either of two colors; in Eight Off, each card fits only one specific card. The 8 reserve cells partially compensate for this difficulty, bringing the solvability rate to roughly 85-90% — harder than FreeCell's 99.999% but easier than Baker's Game's approximately 75%.",
  },
  {
    question: "Can I move multiple cards at once in Eight Off?",
    answer:
      "Officially, Eight Off only allows moving one card at a time. However, most digital versions (including ours) implement the 'supermove' shortcut, which automatically calculates how many cards you could theoretically move one at a time using empty reserve cells and empty cascades, then lets you move the entire sequence in a single action. The number of cards you can move at once depends on how many empty cells and cascades are available.",
  },
  {
    question: "What percentage of Eight Off deals are solvable?",
    answer:
      "Approximately 85-90% of random Eight Off deals are solvable. This places Eight Off between FreeCell (roughly 99.999% solvable) and Baker's Game (approximately 75% solvable) in terms of difficulty. The higher solvability compared to Baker's Game comes from the extra reserve cells, which give you more flexibility to work around the same-suit stacking restriction. Some deals, however, will have card distributions that make them mathematically impossible to solve.",
  },
];

export default function EightOffStrategyPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Eight Off Strategy Guide — Making the Most of 8 Reserve Cells",
    description:
      "In-depth strategy guide for Eight Off solitaire. Learn reserve cell management, same-suit sequencing, and how to approach this challenging FreeCell variant.",
    url: absoluteUrl("/eight-off/strategy"),
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: absoluteUrl("/"),
    },
  };

  const faqJsonLd = {
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
  };

  const breadcrumbJsonLd = {
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
        name: "Eight Off",
        item: absoluteUrl("/eight-off"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Strategy",
        item: absoluteUrl("/eight-off/strategy"),
      },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero
        title="Eight Off Strategy Guide"
        subtitle="How to manage 8 reserve cells, plan around opening cards, and master same-suit sequencing in this challenging FreeCell variant."
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          {/* Section 1: Introduction */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Eight Off&apos;s Unique Strategic Position
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Eight Off occupies a fascinating middle ground in the FreeCell family. It uses the
                same same-suit stacking rule as Baker&apos;s Game, which dramatically limits your
                legal tableau moves. But it compensates by giving you 8 reserve cells instead of 4.
                The result is a game that feels different from both FreeCell and Baker&apos;s Game
                &mdash; harder than FreeCell because of the building restriction, but more forgiving
                than Baker&apos;s Game because of the extra storage.
              </p>
              <p>
                There is a catch, though. Four of your 8 reserve cells start the game with cards
                in them. Those four opening cards are not just taking up space &mdash; they are
                strategic factors that shape your entire game plan. The best Eight Off players
                do not treat the opening reserve cards as obstacles. They treat them as
                information that guides their first dozen moves.
              </p>
              <p>
                This guide covers the strategic principles specific to Eight Off. If you have
                already read our{" "}
                <Link href="/bakers-game/strategy" className="text-[#D4AF37] hover:underline">
                  Baker&apos;s Game strategy guide
                </Link>
                , you will find some familiar concepts here (same-suit sequencing, for example),
                but the reserve cell management and opening analysis sections are unique to Eight Off.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* Section 2: Managing 8 Reserve Cells */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Managing 8 Reserve Cells
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Having 8 reserve cells sounds luxurious compared to FreeCell&apos;s 4, and it is
                &mdash; up to a point. The danger is that the extra capacity creates a false sense
                of security. Players fill cell after cell, thinking they have plenty of room, and
                then suddenly realize they are stuck with 7 of 8 cells occupied and no way to
                clear any of them.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  The Reserve Cell Threshold
                </h3>
                <p className="text-sm">
                  A useful rule: never let yourself drop below 3 empty reserve cells unless you
                  are in the middle of a planned multi-step sequence. With 3 empty cells and at
                  least one empty cascade, you can move sequences of 8 or more cards &mdash; enough
                  to handle most rearrangements. Drop to 1 or 0 empty cells and your flexibility
                  collapses, often irreversibly.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  High-Value vs Low-Value Reserve Cards
                </h3>
                <p className="text-sm">
                  Not all cards stored in reserve cells are equally problematic. A low-rank card
                  (Ace, 2, 3) in a reserve cell is usually fine because it will clear itself
                  quickly once its foundation is ready. A mid-rank card (7, 8, 9) sitting in a
                  reserve cell is much more concerning because it may stay there for most of the
                  game, waiting for a cascade position that might never open. Before placing a
                  card in reserve, estimate how long it will be stuck there. If the answer is
                  &quot;a long time,&quot; look for an alternative.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Clearing Reserve Cells Proactively
              </h3>
              <p>
                Do not wait for reserve cells to clear themselves through foundation play. Actively
                look for opportunities to move reserve cards back to cascades. If the 6 of Hearts
                is sitting in a reserve cell and you spot the 7 of Hearts exposed in a cascade,
                move the 6 onto the 7 immediately &mdash; even if it does not seem to make
                &quot;progress.&quot; Every freed reserve cell is progress. Keeping your reserve
                cells flowing in and out rather than filling up and staying full is one of the
                most important skills in Eight Off.
              </p>
            </div>
          </section>

          {/* Section 3: Opening Reserve Cards */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Opening Reserve Cards
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The 4 cards that start in reserve cells are one of Eight Off&apos;s most distinctive
                features. They significantly affect your opening plan and should be the first
                thing you analyze when a new deal is laid out.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Aces and Twos in Reserve
              </h3>
              <p>
                If any of the 4 starting reserve cards are Aces, move them to foundations
                immediately. This frees a reserve cell and begins a foundation pile at no cost.
                Twos are almost as good &mdash; if their corresponding Ace is exposed in a cascade,
                you can start a quick foundation-building chain. Having an Ace or Two in the
                opening reserve is a significant advantage. Two Aces is a gift.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Kings in Reserve
              </h3>
              <p>
                A King in an opening reserve cell is awkward. Kings can only go on empty cascades
                (there is no card higher to stack them on), and empty cascades are precious.
                A King occupying a reserve cell will likely stay there for a long time unless you
                can create an empty cascade specifically for it. Factor this into your planning:
                if you start with a King in reserve, you effectively have one fewer usable
                reserve cell for most of the game.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Mid-Rank Cards in Reserve
              </h3>
              <p>
                Cards like 6s, 7s, 8s, and 9s that start in reserve need a home. Scan the
                cascades for the next-higher same-suit card. If the 8 of Clubs is in reserve
                and the 9 of Clubs is exposed in a cascade, you have a natural target. If no
                same-suit target exists for a starting reserve card, that card may sit in reserve
                for a while. Plan accordingly and avoid filling additional reserve cells until
                you have a path for clearing the ones already occupied.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 4: Same-Suit Sequencing */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Same-Suit Sequencing
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Like Baker&apos;s Game, Eight Off requires same-suit descending sequences in the
                tableau. The 5 of Diamonds can only be placed on the 6 of Diamonds. This is the
                rule that makes Eight Off harder than FreeCell and the rule that drives most of
                your strategic decisions.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Scan for Same-Suit Pairs
                </h3>
                <p className="text-sm">
                  At the start of every game, scan for same-suit adjacent-rank pairs that are both
                  exposed or nearly exposed. If the 10 of Spades and the 9 of Spades are both
                  accessible within 1-2 moves, connecting them should be an early priority. Each
                  pair you connect creates a multi-card unit that is more powerful than two separate
                  cards. A run of 4-5 same-suit cards is a serious asset that anchors an entire
                  section of the board.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Avoid Building Dead Cascades
              </h3>
              <p>
                A cascade where cards from multiple suits are interleaved in descending order is
                a dead cascade. It looks organized but is actually a pile of individual cards that
                cannot be moved as a group. Every card in a dead cascade must be moved one at a
                time, consuming reserve cells and empty cascades. When you are about to place a
                card on a different-suit card, stop and consider whether you are creating a dead
                cascade. Sometimes it is unavoidable, but it should never happen accidentally.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Build Long Runs When Possible
              </h3>
              <p>
                With 8 reserve cells providing extra storage, Eight Off gives you more freedom
                than Baker&apos;s Game to assemble long same-suit runs. Take advantage of this.
                When you see a chance to combine two same-suit fragments into a longer sequence,
                even at the cost of using 2-3 reserve cells temporarily, it is usually worth it.
                A cascade containing a continuous same-suit run from Jack down to 4 is a fortress
                &mdash; it is organized, movable, and will eventually flow to foundations smoothly.
              </p>
            </div>
          </section>

          {/* Section 5: Empty Cascade Strategy */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empty Cascade Strategy
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Eight Off deals 48 cards into 8 cascades (6 cards each), leaving no cascades
                empty at the start. Creating an empty cascade requires moving all 6 cards from
                a column to foundations, reserve cells, or other cascades. It takes effort,
                but the payoff is enormous.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Why Empty Cascades Are Precious
                </h3>
                <p className="text-sm">
                  Each empty cascade effectively doubles your supermove capacity. With 3 empty
                  reserve cells and 0 empty cascades, you can move 4 cards at once. With 3 empty
                  reserve cells and 1 empty cascade, you can move 8. That doubling effect makes
                  empty cascades the single most powerful resource on the board. Guard them
                  jealously and only fill them with purpose.
                </p>
              </div>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Targeting Cascades to Empty
              </h3>
              <p>
                Not all cascades are equally easy to empty. Look for columns where several cards
                can go directly to foundations (Aces, Twos on existing foundations) or where
                same-suit pairs can be consolidated onto other cascades. A column containing an
                Ace, a Two of a different suit, and cards with natural homes on other cascades
                is a prime candidate for clearing. A column with a King at the bottom and a
                jumbled mix above it is going to be much harder to empty.
              </p>

              <h3 className="text-lg font-semibold text-[#D4AF37] mt-4">
                Temporary vs Permanent Use
              </h3>
              <p>
                When you fill an empty cascade, decide whether it is temporary or permanent.
                Temporary use means you are placing a card there for 2-3 moves and will
                re-empty the cascade shortly. Permanent use means you are placing a King and
                building a long same-suit sequence on it. Both are valid, but mixing them up
                is dangerous. Placing a mid-rank card in an empty cascade &quot;just for now&quot;
                and then forgetting to move it back is one of the most common ways to lose
                a winnable Eight Off deal.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* Section 6: Comparison */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              How Eight Off Compares to FreeCell and Baker&apos;s Game
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Understanding where Eight Off sits relative to its cousins helps you calibrate
                your expectations and adapt your strategy appropriately.
              </p>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Eight Off vs FreeCell
                </h3>
                <p className="text-sm">
                  FreeCell has 4 free cells and alternating-color stacking. Eight Off has 8 reserve
                  cells (4 starting occupied) and same-suit stacking. The extra cells give you more
                  storage but the suit restriction takes away flexibility. Net result: Eight Off is
                  harder. In FreeCell, you can almost always find a legal move. In Eight Off, you
                  frequently reach positions where the only move is to place a card in reserve,
                  which costs you a resource. FreeCell rewards bold, aggressive play. Eight Off
                  rewards patient, conservative play.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-lg p-5 mt-3">
                <h3 className="font-semibold text-[#D4AF37] mb-2">
                  Eight Off vs Baker&apos;s Game
                </h3>
                <p className="text-sm">
                  Baker&apos;s Game and Eight Off share the same same-suit stacking rule, so the
                  core puzzle is similar. The difference is purely in storage: Baker&apos;s Game
                  gives you 4 free cells, Eight Off gives you 8 (with 4 pre-filled). The extra
                  cells mean Eight Off is more forgiving. Positions that would be dead ends in
                  Baker&apos;s Game can often be resolved in Eight Off by temporarily parking cards
                  in reserve. The solvability rate reflects this: roughly 85-90% for Eight Off
                  vs 75% for Baker&apos;s Game. If you find Baker&apos;s Game frustratingly
                  difficult, Eight Off is a good stepping stone.
                </p>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-sm text-left text-white/60 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="py-3 px-4 font-semibold text-white/80">Feature</th>
                      <th className="py-3 px-4 font-semibold text-white/80">FreeCell</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Eight Off</th>
                      <th className="py-3 px-4 font-semibold text-white/80">Baker&apos;s Game</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Free/Reserve Cells</td>
                      <td className="py-2 px-4">4 (all empty)</td>
                      <td className="py-2 px-4">8 (4 pre-filled)</td>
                      <td className="py-2 px-4">4 (all empty)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Stacking Rule</td>
                      <td className="py-2 px-4">Alternating color</td>
                      <td className="py-2 px-4">Same suit</td>
                      <td className="py-2 px-4">Same suit</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Cascades</td>
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">8</td>
                      <td className="py-2 px-4">8</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Cards per Cascade</td>
                      <td className="py-2 px-4">6 or 7</td>
                      <td className="py-2 px-4">6</td>
                      <td className="py-2 px-4">6 or 7</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Solvability</td>
                      <td className="py-2 px-4">~99.999%</td>
                      <td className="py-2 px-4">~85-90%</td>
                      <td className="py-2 px-4">~75%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-4 text-white/70">Difficulty</td>
                      <td className="py-2 px-4">Moderate</td>
                      <td className="py-2 px-4">Hard</td>
                      <td className="py-2 px-4">Very Hard</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* FAQ Section */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2
              className="text-2xl font-bold text-white/90 mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-white/80 text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-white/50 leading-relaxed">{faq.answer}</p>
                  {i < faqs.length - 1 && (
                    <div className="mt-6 border-b border-white/10" />
                  )}
                </div>
              ))}
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          <CtaSection
            heading="Ready to Play?"
            body="Put these strategies into practice. Play Eight Off online for free — no download, no signup."
            primaryLabel="Play Eight Off"
            primaryHref="/eight-off"
          />

          {/* Cross-links */}
          <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white/90 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Related Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <ContentLinkCard href="/eight-off" title="Play Eight Off" description="Play online for free, no download" />
              <ContentLinkCard href="/bakers-game" title="Baker's Game" description="Same-suit building with 4 free cells" />
              <ContentLinkCard href="/bakers-game/strategy" title="Baker's Game Strategy" description="Strategy for the 4-cell variant" />
              <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Compare with FreeCell tactics" />
              <ContentLinkCard href="/solitaire-types" title="Types of Solitaire" description="20 solitaire variants compared" />
              <ContentLinkCard href="/" title="Play FreeCell" description="The classic strategic solitaire" />
            </div>
          </section>
        </article>
      </main>
    </ContentLayout>
  );
}
