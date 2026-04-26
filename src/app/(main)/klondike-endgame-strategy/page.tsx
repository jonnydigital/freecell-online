import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";
import AdUnit from "@/components/AdUnit";
import AuthorByline from "@/components/content/AuthorByline";

const PAGE_PATH = "/klondike-endgame-strategy";
const PUBLISHED_DATE = "2026-04-12";

export const metadata: Metadata = {
  title: "Klondike Solitaire Endgame -- Finishing Strong",
  description:
    "Master the Klondike Solitaire endgame: learn when to autopilot, how to manage final stock passes in Draw 3, why foundation order matters, and how to recognize unwinnable positions before they waste your time.",
  keywords: [
    "klondike endgame strategy",
    "klondike solitaire endgame",
    "klondike finishing strategy",
    "klondike last 20 cards",
    "klondike foundation order",
    "klondike unwinnable position",
    "klondike draw 3 endgame",
    "klondike stock pile trap",
    "klondike autopilot moment",
    "solitaire endgame tips",
  ],
  alternates: {
    canonical: absoluteUrl(PAGE_PATH),
  },
  openGraph: {
    title: "Klondike Solitaire Endgame -- Finishing Strong",
    description:
      "Deep guide to the Klondike endgame: foundation ordering, stock-pile management, column-clearing sequence, recognizing wins and losses, and a mental checklist for the last 20 cards.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function KlondikeEndgameStrategyPage() {
  const jsonLd = [
    {
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
          name: "Klondike Solitaire",
          item: absoluteUrl("/klondike"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Endgame Strategy",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Solitaire Endgame -- Finishing Strong",
      description:
        "A detailed guide to the Klondike Solitaire endgame covering foundation ordering, stock-pile management, column-clearing sequences, recognizing wins and losses, and a mental checklist for the final stretch.",
      author: {
        "@type": "Organization",
        name: "The Strategy Desk",
        url: absoluteUrl("/authors/the-strategy-desk"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
      datePublished: PUBLISHED_DATE,
      dateModified: PUBLISHED_DATE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl(PAGE_PATH),
      },
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Solitaire Endgame -- Finishing Strong"
        kicker={<><Link href="/klondike" className="hover:text-white transition-colors">Klondike Solitaire</Link> / Endgame Strategy</>}
        subtitle="Most Klondike games are won or lost in the last 15 to 20 cards. This guide covers the specific skills that separate players who coast to victory from players who stall in sight of the finish line."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Klondike Solitaire", href: "/klondike" }]}
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-6">
        <article className="space-y-6">
          <AuthorByline authorSlug="the-strategy-desk" publishedDate={PUBLISHED_DATE} />

          {/* -- What the Endgame Looks Like in Klondike -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              What the Endgame Looks Like in Klondike
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The endgame in Klondike does not arrive with a signal or a scoreboard notification. It is a shift in the texture of the game. During the opening and midgame you are uncovering face-down cards, building tableau sequences, and cycling the stock to find needed cards. The game feels like exploration. At some point that changes. Most or all of the tableau cards are face-up, the stock is either empty or nearly so, and the foundations already hold a significant portion of the deck. The game stops feeling like discovery and starts feeling like sequencing.
              </p>
              <p>
                In practical terms the endgame begins when the tableau has no more than two or three face-down cards remaining and you have at least 15 to 20 cards already on the foundations. The number is not precise because each deal transitions differently, but the hallmark is the same: the information is almost complete, and the question is no longer &quot;what cards are where?&quot; but &quot;in what order do the remaining cards go home?&quot;
              </p>
              <p>
                Recognizing this transition matters because the skills change. Midgame rewards patience, tableau management, and stock-cycle awareness. The endgame rewards sequencing accuracy and the ability to read a short countdown of moves. Players who keep playing midgame-style decisions during the endgame often lose games they should have won, because the logic of the position has shifted beneath them.
              </p>
            </div>
          </section>

          {/* -- When All Cards Are Face-Up -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              When All Cards Are Face-Up: The Autopilot Moment
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                There is a specific moment in many Klondike games when every remaining card is visible. No face-down cards in the tableau, no cards hidden in the stock. Everything is on the table. Many digital Klondike implementations recognize this state and offer an &quot;auto-complete&quot; button that finishes the game for you. That button exists because once all cards are face-up and there are no blocking dependencies, the game is mathematically won.
              </p>
              <p>
                Understanding why is important even if you let the computer finish. The game is won at this point because with complete information and no hidden cards, there is always a valid sequence that routes every card to its foundation. The sequencing might not be obvious at first glance, but it exists. If you prefer to finish manually, the method is straightforward: look for the lowest-rank card among all four suits that has not yet been sent to a foundation, find it in the tableau, and send it up. Repeat. You are effectively unwinding the tableau from the bottom of each foundation sequence.
              </p>
              <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
                <p className="text-emerald-300/80 text-sm">
                  <strong>Practical note:</strong> The autopilot moment only applies when every card is truly accessible. If a card is face-up but buried under a long descending sequence that cannot be moved, the game may still be stuck. All-face-up means the game is won only when every card can eventually reach a foundation through legal moves. In most situations it can, but double-check before celebrating.
                </p>
              </div>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* -- Managing the Last Stock Passes in Draw 3 -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Managing the Last Stock Passes in Draw 3
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Draw 3 endgames are fundamentally harder than Draw 1 endgames because the stock remains a bottleneck even when you are close to winning. In Draw 1 you see every stock card on every pass. In Draw 3 you only see every third card, and the cards you can access shift depending on which cards you play from the waste pile during each pass. This means that a Draw 3 endgame with cards still in the stock is a puzzle within a puzzle: you must not only sequence the tableau correctly but also plan your stock draws so that the cards you need become accessible.
              </p>
              <p>
                The core technique is tracking which positions in the stock hold the cards you need. If the stock has nine cards remaining and you need the card in position five, you know that in a Draw 3 pass you will see positions 3, 6, and 9 first. Position 5 is invisible on the first pass unless you play the card at position 3, which shifts the alignment. This kind of thinking feels tedious but it is what separates a 20-percent Draw 3 win rate from a 30-percent one.
              </p>
              <p>
                When you are on your last allowed pass in Vegas scoring, or when the stock is down to six or fewer cards, pause and count. Write down (or mentally list) the cards left in the stock and the cards left on the tableau. Plan the entire sequence before moving. One wrong draw can bury the card you need behind two cards you cannot play, ending the game one move short. The endgame in Draw 3 is where planning discipline pays the highest dividend.
              </p>
            </div>
          </section>

          {/* -- Foundation Order Matters -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Foundation Order Matters: Why Uneven Foundations Cause Problems
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                A common endgame mistake is building foundations unevenly. One suit reaches 9 or 10 while another is stuck at 3 or 4. This imbalance is not just an aesthetic issue. It creates real blocking problems because high-foundation suits have removed cards from the tableau that might still be needed as building targets for the lagging suits.
              </p>
              <p>
                Consider a concrete example. You have sent Hearts up to the 8, but Spades is only at the 3. You need the 4 of Spades, which is currently sitting on a red 5 in the tableau. The red 5 is the 5 of Hearts, but the 5 of Hearts is already on the foundation. So where does the 4 of Spades go after you send it up? It goes to the foundation. But the problem is the card beneath it: if removing the 4 of Spades leaves a card that has no home, you have created a dead column. Uneven foundations shrink the tableau&apos;s flexibility because fewer intermediate cards are available for temporary parking.
              </p>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  Foundation Balance Rule of Thumb
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li><strong className="text-white/90">Safe to send:</strong> Aces and 2s always; 3s when both opposite-color 2s are on foundations</li>
                  <li><strong className="text-white/90">Check before sending:</strong> Any card rank 4 or higher -- ask whether its opposite-color counterpart one rank lower is still needed in the tableau</li>
                  <li><strong className="text-white/90">Ideal gap:</strong> Keep all four foundations within two ranks of each other during the endgame</li>
                  <li><strong className="text-white/90">Danger sign:</strong> One foundation more than three ranks ahead of another -- slow down and level the others first</li>
                </ul>
              </div>
              <p>
                The goal is not to keep foundations perfectly even at all times. That is often impossible. The goal is to avoid sending cards to a foundation that still have tableau work to do. In the endgame this becomes easier to judge because you can see almost everything. Before sending a card up, scan the tableau for any card that depends on it as a building target. If nothing depends on it, send it. If something does, wait.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* -- Clearing Tableau Columns in the Right Order -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Clearing Tableau Columns in the Right Order
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                During the endgame, columns start emptying. An empty column in Klondike can only accept a King (or a sequence led by a King), which makes empty columns both powerful and dangerous. Powerful because a King placement opens a fresh building lane. Dangerous because if you empty a column and have no King to fill it, you have wasted a move and possibly blocked yourself.
              </p>
              <p>
                The right column-clearing order depends on what you need next. In general, clear columns that hold only foundation-ready cards first. If a column contains the 7 of Diamonds sitting on nothing, and the Diamonds foundation is at 6, send the 7 up and the column empties naturally. If a different column contains three cards that form a descending sequence you still need for parking, do not dismantle it yet.
              </p>
              <p>
                King availability determines everything. Before clearing any column, check whether you have a King that benefits from the open space. If no King needs a home, clearing a column may accomplish nothing. In the late endgame with few cards remaining, empty columns are often irrelevant because the remaining cards are going directly to foundations. The principle is: clear columns when doing so sends cards home or creates space a King will use. Do not clear columns speculatively.
              </p>
            </div>
          </section>

          {/* -- The Stock Pile Trap -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Stock Pile Trap: Cycling Without Progress
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                One of the most common endgame failures is cycling the stock pile repeatedly without making any progress. You draw through the entire stock, play nothing, flip it over, draw through again, play nothing, and repeat. Each pass is identical to the last because nothing on the tableau has changed. This is not bad luck. It is a signal that the game is stuck, and continuing to cycle will not unstick it.
              </p>
              <p>
                The stock pile trap happens when the cards remaining in the stock cannot be played because their tableau destinations are blocked, and the cards blocking those destinations cannot move because the cards they need are in the stock. It is a circular dependency. Recognizing it saves time. If you complete a full stock pass without playing a single card, stop and read the position. Identify which stock cards you need, where they would go, and what is blocking those destinations. If the blockers cannot be moved, the game is over.
              </p>
              <p>
                In Draw 3 the trap is subtler because you might play one card per pass but never reach the card that actually matters. The waste-pile card you play each pass changes the alignment of the stock, so the card you need keeps shifting to an inaccessible position. If two consecutive passes produce no meaningful progress -- meaning you play a card or two but do not advance any foundation or uncover any new information -- treat the position as likely dead and start evaluating whether to continue or deal a new game.
              </p>
            </div>
          </section>

          <AdUnit format="horizontal" className="-my-1" />

          {/* -- Recognizing an Unwinnable Position -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Recognizing an Unwinnable Position
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                Not every Klondike deal is winnable. Estimates vary by draw mode, but roughly 18 to 20 percent of Draw 1 deals and a larger fraction of Draw 3 deals are unsolvable even with perfect play. Recognizing an unwinnable position during the endgame is a skill worth developing because it frees you from spending five or ten minutes on a dead game.
              </p>
              <p>
                The clearest sign of an unwinnable position is a mutual blockade: Card A needs to go to a spot occupied by Card B, and Card B needs to go to a spot occupied by Card A, with no intermediate location available for either. In the endgame this often looks like two columns whose top cards each need to sit on the other. Neither can move first, so neither can move at all.
              </p>
              <p>
                A subtler sign is a card buried in the stock that you can never reach. In Draw 3, if a card sits at a stock position that is permanently inaccessible given the current waste-pile alignment and you have no tableau moves that would change the alignment, that card is effectively removed from the game. Any foundation that needs it will never complete.
              </p>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  Signs the Position Is Dead
                </h3>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li>Two or more cards that each need the other&apos;s current position</li>
                  <li>A full stock pass with zero playable cards</li>
                  <li>A needed card is permanently inaccessible in a Draw 3 stock cycle</li>
                  <li>All empty columns are filled with Kings that block nothing useful</li>
                  <li>No legal move exists on the entire board</li>
                </ul>
              </div>
              <p>
                When you spot a dead position, there is no shame in resigning and starting a new deal. The best Klondike players resign quickly when the signs are clear. Spending time on an unsolvable deal does not improve your skill; it only drains your focus for the next hand.
              </p>
            </div>
          </section>

          {/* -- The Victory Lap -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Victory Lap: When You Know You Have Won
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                The opposite of a dead position is a locked-in win: a board state where every remaining card has a clear, unblocked path to its foundation. Recognizing this moment is satisfying and also practical. Once you know you have won, you can stop analyzing and simply execute the sequence. No more pausing to evaluate alternatives, no more stock-cycle anxiety. The game is over; you are just collecting the cards.
              </p>
              <p>
                The victory lap typically begins when all face-down cards have been revealed, the stock is empty, and no card in the tableau depends on another card that has not yet been built to a foundation. At that point the remaining moves are deterministic. You can send cards up in almost any order and still finish. Most digital versions detect this state and offer auto-complete, but if you finish manually you will notice how smooth the last few moves feel compared to the tense sequencing of a contested endgame.
              </p>
              <p>
                Training yourself to recognize the victory-lap state earlier makes you a faster player. Instead of laboriously checking every card, you develop a pattern sense: all tableau columns are short, every card visible, no cross-blocking between suits. With practice you will feel the win before you verify it. That instinct comes from hundreds of endgames where you noticed the same structural signatures.
              </p>
            </div>
          </section>

          {/* -- Mental Checklist for the Last 20 Cards -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Mental Checklist for the Last 20 Cards
            </h2>
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                When you reach the final stretch with roughly 20 cards left outside the foundations, run through this mental checklist before making your next move. It takes ten seconds and prevents the most common endgame errors.
              </p>
              <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
                <h3 className="text-lg font-bold text-[#D4AF37] mb-3">
                  The Endgame Checklist
                </h3>
                <ol className="list-decimal list-inside text-white/70 space-y-2 ml-2 text-sm">
                  <li><strong className="text-white/90">Count face-down cards.</strong> If any remain, uncovering them is still your top priority.</li>
                  <li><strong className="text-white/90">Check foundation balance.</strong> Are all four foundations within two ranks of each other? If not, prioritize the lagging suits.</li>
                  <li><strong className="text-white/90">Scan for mutual blockades.</strong> Do any two cards block each other with no way to break the cycle?</li>
                  <li><strong className="text-white/90">Count stock cards.</strong> How many remain? In Draw 3, what positions hold the cards you need?</li>
                  <li><strong className="text-white/90">Identify the critical card.</strong> Which single card, if played, unlocks the most subsequent moves?</li>
                  <li><strong className="text-white/90">Check empty columns.</strong> Do you have a King that benefits from an open lane? If not, avoid clearing columns unnecessarily.</li>
                  <li><strong className="text-white/90">Plan three moves ahead.</strong> In the endgame, three moves of lookahead is usually enough to see the entire remaining path.</li>
                  <li><strong className="text-white/90">Decide: win, loss, or uncertain?</strong> If the answer is win, execute without hesitation. If loss, resign. If uncertain, play the highest-value move and reassess.</li>
                </ol>
              </div>
              <p>
                This checklist works for both Draw 1 and Draw 3, though the stock-counting step is far more important in Draw 3. Over time the checklist becomes automatic. You will glance at the board and see the answers without consciously running through each item. That is the endgame intuition that separates casual players from serious ones.
              </p>
            </div>
          </section>

          <AdUnit format="auto" className="-my-1" />

          {/* -- FAQ -- */}
          <section>
            <h2
              className="text-2xl sm:text-3xl font-bold text-white/90 mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 text-white/60 leading-relaxed">
              <div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  How do I know when the endgame has started?
                </h3>
                <p>
                  The endgame begins when most or all tableau cards are face-up, the stock is nearly empty, and at least 15 to 20 cards are already on the foundations. The shift is gradual, but the key signal is that you are no longer discovering new cards -- you are sequencing known cards toward their foundations.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  Should I always use auto-complete when it is offered?
                </h3>
                <p>
                  Auto-complete is safe to use once all remaining cards are face-up and reachable. Using it saves time. However, finishing manually a few dozen times builds the endgame pattern recognition that helps you play the contested endgames -- the ones where auto-complete is not offered because the game is not yet guaranteed won.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  Why do my Draw 3 endgames fail more often than Draw 1?
                </h3>
                <p>
                  In Draw 3, you only access every third card in the stock per pass. This means cards you need may be stuck at inaccessible positions, and the only way to change the alignment is by playing waste-pile cards that shift the draw pattern. Draw 1 has no alignment problem because you see every card on every pass. The Draw 3 endgame requires explicit planning around stock positions, which is a skill most players have not developed.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  Is it ever correct to move a card back from the foundation to the tableau?
                </h3>
                <p>
                  Yes, in digital versions that allow it. If a foundation card can serve as a building target for a tableau sequence that would otherwise be stuck, pulling it back temporarily can unlock the position. This is most useful in the mid-to-late game when you sent a card to the foundation too early. In the true endgame it is rarely necessary because the remaining moves are usually straightforward.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white/80 mb-2">
                  How many Klondike deals are actually winnable?
                </h3>
                <p>
                  In Draw 1 with unlimited redeals, approximately 79 to 82 percent of deals are solvable with perfect play. In Draw 3 the theoretical solvability is similar, but human win rates are drastically lower because of the stock-alignment problem. The practical takeaway: if you lose a game, there is roughly a one-in-five chance that no player could have won it. For more detail, see our{" "}
                  <Link href="/klondike-probability" className="text-[#D4AF37] hover:underline">
                    Klondike probability analysis
                  </Link>.
                </p>
              </div>
            </div>
          </section>

        </article>

        {/* Related Guides */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related">
            Related Klondike Guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike/strategy"
              title="Klondike Strategy"
              description="The full strategic layer: planning, sequencing, and decision-making from start to finish."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-opening-strategy"
              title="Klondike Opening Strategy"
              description="How to read the initial deal and make the first moves that set up a winning endgame."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/tips"
              title="Klondike Tips"
              description="Quick tactical tips for every phase of the game, distilled for fast reference."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-mastery"
              title="Klondike Mastery Guide"
              description="The complete guide to Klondike: opening, midgame, endgame, and common mistakes."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Put this endgame knowledge to the test"
          body="Open a game of Klondike and play through to the endgame with the mental checklist in mind. Notice how much smoother the finish feels."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Read the full mastery guide"
          secondaryHref="/klondike-mastery"
        />
      </main>
    </ContentLayout>
  );
}
