import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "Why FreeCell Is Almost Always Solvable | The Math Behind 99.999% Winnability",
  description:
    "Why nearly every FreeCell deal is solvable: the design principles, state space analysis, and structural features that make it the most skill-based solitaire.",
  keywords: [
    "why is freecell solvable",
    "freecell solvability math",
    "freecell always winnable",
    "freecell 99 percent solvable",
    "freecell game theory",
    "freecell perfect information",
    "why freecell is skill based",
    "freecell state space",
    "freecell design principles",
    "freecell vs luck based solitaire",
    "freecell mathematical analysis",
    "solvable solitaire games",
  ],
  openGraph: {
    title:
      "Why FreeCell Is Almost Always Solvable | The Math Behind 99.999% Winnability",
    description:
      "The mathematical and design reasons behind FreeCell\u2019s extraordinary solvability rate \u2014 and what it teaches us about game design.",
    url: absoluteUrl("/why-freecell-is-almost-always-solvable"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "What percentage of FreeCell games are solvable?",
    answer:
      "Approximately 99.999% of all randomly dealt FreeCell games are solvable with optimal play. Of the original 32,000 Microsoft FreeCell deals, only one \u2014 Deal #11982 \u2014 has been proven impossible. Extended analysis of over 8 billion random deals by researchers has found the unsolvable rate to be roughly 1 in 78,000, confirming that FreeCell\u2019s design makes nearly every configuration winnable.",
  },
  {
    question: "Why is FreeCell more solvable than other solitaire games?",
    answer:
      "Three design features combine to create FreeCell\u2019s extraordinary solvability. First, all 52 cards are visible from the start (perfect information), so there\u2019s no hidden randomness. Second, the four free cells provide crucial temporary storage that prevents deadlocks. Third, the alternating-color building rule gives each card two possible target suits, creating a large number of legal moves at any point. These features together mean almost any card arrangement can be untangled with sufficient skill.",
  },
  {
    question: "Is FreeCell pure skill or is there luck involved?",
    answer:
      "FreeCell is one of the purest skill-based card games in existence. The only random element is the initial deal \u2014 which cards land where. But since all cards are face-up and you can see everything, every decision you make is based on complete information. There\u2019s no hidden deck, no draw pile, no surprises. When you lose a FreeCell game, it\u2019s almost always because of a strategic mistake, not bad luck. The tiny exception is the roughly 0.001% of deals that are mathematically impossible regardless of play.",
  },
  {
    question: "How do free cells prevent deadlocks?",
    answer:
      "Free cells act as a pressure relief valve in the game\u2019s state space. Without them, cards in the tableau can easily block each other with no way to rearrange them. Each free cell lets you temporarily remove one card from the tableau, creating space to maneuver other cards. Four free cells mean you can simultaneously hold four cards out of the way, which is enough to resolve the vast majority of blocking situations. The supermove formula \u2014 (1 + free cells) \u00d7 2^(empty columns) \u2014 shows how free cells multiply your effective movement capacity.",
  },
  {
    question: "Could FreeCell be redesigned to be 100% solvable?",
    answer:
      "Theoretically, yes \u2014 by dealing only from a curated set of known-solvable deals. But this would undermine the game\u2019s integrity. Part of FreeCell\u2019s appeal is that deals are generated randomly, meaning you\u2019re solving a genuine puzzle rather than a pre-screened one. The fact that a tiny fraction of deals is unsolvable actually makes the game more interesting, because it adds an element of discovery: occasionally encountering an impossible deal makes you question your strategy rather than blame the cards.",
  },
  {
    question: "What makes Deal #11982 impossible?",
    answer:
      "Deal #11982 (from the original Microsoft FreeCell 32,000 deal set) creates a configuration where key low-value cards are deeply buried beneath cards that can\u2019t be moved without first accessing those same low cards. It\u2019s a circular dependency that no sequence of moves can break. The deal was proven unsolvable through exhaustive computer search \u2014 every possible sequence of legal moves was tested, and none leads to a win. It took the collaborative effort of internet communities and computer solvers in the late 1990s to confirm its impossibility.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function WhyFreecellSolvablePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Why FreeCell Is Almost Always Solvable: The Math Behind 99.999% Winnability",
      description:
        "A deep exploration of the mathematical and design principles that make FreeCell one of the most solvable \u2014 and most skill-based \u2014 card games ever created.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-03-31",
      dateModified: "2026-03-31",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/why-freecell-is-almost-always-solvable"),
      },
    },
    {
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
    },
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
          name: "Why FreeCell Is Almost Always Solvable",
          item: absoluteUrl("/why-freecell-is-almost-always-solvable"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Why FreeCell Is Almost Always Solvable"
        subtitle={
          <>
            Of the millions of possible FreeCell deals, only about 1 in
            78,000 is truly impossible. That 99.999% solvability rate
            isn&apos;t an accident &mdash; it&apos;s the result of elegant
            game design. Here&apos;s the math behind it.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── The Solvability Spectrum ── */}
        <CardSection id="spectrum">
          <SectionHeading
            sub="Solitaire Solvability"
            id="spectrum-heading"
            icon={"\ud83c\udfb0"}
          >
            Where FreeCell Sits on the Solvability Spectrum
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Not all solitaire games are created equal when it comes to
              winnability. Most popular solitaire variants have solvability
              rates far below FreeCell&apos;s:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Game</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Solvability</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Information</th>
                    <th className="py-2 pl-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Skill Factor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#B8860B]/[0.06]">
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">FreeCell</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">~99.999%</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Perfect</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Very High</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Eight Off</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">~85&ndash;90%</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Perfect</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">High</td>
                  </tr>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Klondike (Draw 1)</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">~79&ndash;82%</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Partial</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Medium</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Baker&apos;s Game</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">~75%</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Perfect</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">High</td>
                  </tr>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Spider (4-Suit)</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">~33%</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Partial</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">Medium</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The gap between FreeCell and everything else is enormous. What
              makes it so special? Three interlocking design principles.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Principle 1: Perfect Information ── */}
        <CardSection id="perfect-information">
          <SectionHeading
            sub="Principle #1"
            id="perfect-information-heading"
            icon={"\ud83d\udc41\ufe0f"}
          >
            Perfect Information: Every Card Is Visible
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              FreeCell deals all 52 cards face-up into eight tableau columns.
              There&apos;s no stock pile, no hidden cards, no draw mechanism.
              You see the entire game state before making your first move.
            </p>
            <p>
              In game theory, this is called <strong>perfect
              information</strong> &mdash; the same property that chess and
              Go have. Every player (or solver) can analyze the complete
              state of the game at every point. This is fundamentally
              different from Klondike, where hidden tableau cards and an
              uncontrollable draw pile inject randomness into every decision.
            </p>
            <p>
              Perfect information means that if a solution exists, it can
              in principle always be found through analysis. There are no
              &quot;blind alleys&quot; caused by face-down cards or unknown
              draw order. The only question is whether the specific arrangement
              of cards permits a winning sequence of moves &mdash; and in
              FreeCell, the answer is almost always yes.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Principle 2: Free Cells as Pressure Valves ── */}
        <CardSection id="free-cells">
          <SectionHeading
            sub="Principle #2"
            id="free-cells-heading"
            icon={"\ud83d\udee1\ufe0f"}
          >
            Free Cells: The Deadlock Prevention System
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The four free cells are the engineering marvel at the heart of
              FreeCell&apos;s design. They serve as temporary storage spaces
              where you can park cards that are blocking your progress.
            </p>
            <p>
              Without free cells, card-blocking situations in an 8-column
              layout would frequently be impossible to resolve. Card A
              blocks Card B, which blocks Card C, creating chains of
              dependencies. Free cells break these chains by letting you
              temporarily remove cards from the tableau, creating the space
              needed to rearrange the remaining cards.
            </p>
            <p>
              The mathematics are revealing. With 0 free cells, you can move
              only 1 card at a time. With 4 free cells and no empty columns,
              you can effectively move up to 5 cards in a sequence. Add an
              empty column, and that jumps to 10. Two empty columns: 20. The{" "}
              <Link href="/how-freecell-supermoves-work" className="text-[#B8860B] hover:underline">
                supermove formula
              </Link>{" "}
              shows how free cells and empty columns create exponential
              movement capacity:
            </p>
            <p className="text-center text-lg font-mono text-[#2a2522]">
              Max cards = (1 + free cells) &times; 2<sup>empty columns</sup>
            </p>
            <p>
              Four free cells are the sweet spot: enough to prevent most
              deadlocks, but not so many that the game becomes trivially easy.
              Baker&apos;s Game &mdash; which uses the same layout but with
              same-suit building &mdash; has only 4 free cells and drops to ~75%
              solvability, proving that free cells alone aren&apos;t sufficient.
              The building rule matters too.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Principle 3: Alternating Color Building ── */}
        <CardSection id="alternating-color">
          <SectionHeading
            sub="Principle #3"
            id="alternating-color-heading"
            icon={"\u2660\u2665"}
          >
            Alternating-Color Building: Maximum Flexibility
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              FreeCell&apos;s tableau building rule is deceptively important.
              By allowing any card to be placed on any card of opposite color
              and one rank higher, FreeCell gives each card <em>two</em> possible
              destination cards at any time.
            </p>
            <p>
              Compare this to Baker&apos;s Game, which requires same-suit
              building. There, each card has only <em>one</em> possible
              target &mdash; the next higher card of the same suit. This
              cuts available moves by roughly 75% and drops solvability
              from ~99.999% to ~75%.
            </p>
            <p>
              The alternating-color rule creates a much denser &quot;graph&quot;
              of possible moves. In graph theory terms, each game state has
              more outgoing edges (legal moves), which means the search
              space is better connected and there are more paths from any
              starting position to a winning state. Deadlocks require a
              much more specific (and therefore rarer) card configuration
              to be truly unresolvable.
            </p>
            <p>
              This is why FreeCell&apos;s design is so elegant: perfect
              information eliminates hidden randomness, free cells prevent
              hard deadlocks, and alternating-color building maximizes the
              number of available moves. Together, these three principles
              make the game almost always solvable while remaining genuinely
              challenging.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── The Numbers ── */}
        <CardSection id="numbers">
          <SectionHeading
            sub="By the Numbers"
            id="numbers-heading"
            icon={"\ud83d\udcca"}
          >
            How We Know: The Research
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              FreeCell&apos;s solvability statistics come from decades of
              computational research:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>The 32,000 Microsoft deals:</strong> The original
                Microsoft FreeCell game shipped with 32,000 numbered deals.
                By 1995, internet communities had solved all of them except
                Deal #11982, which was eventually proven unsolvable through
                exhaustive computer search. Later, Deal #11982 was confirmed
                by multiple independent solvers.
              </li>
              <li>
                <strong>The 1,000,000 deal analysis:</strong> When the deal
                set was extended to 1,000,000, eight additional unsolvable
                deals were found: #146692, #186216, #455889, #495505,
                #512118, #517776, #781948, and #875865. That&apos;s 8 out
                of 968,000 additional deals &mdash; an unsolvability rate
                of roughly 0.0008%.
              </li>
              <li>
                <strong>Billions of random deals:</strong> Large-scale
                random sampling studies have tested billions of deals,
                consistently finding unsolvability rates around 1 in 78,000
                (approximately 0.0013%). The variation from the Microsoft
                set rate likely reflects sampling differences in the deal
                generation algorithm.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── State Space ── */}
        <CardSection id="state-space">
          <SectionHeading
            sub="The Mathematical Perspective"
            id="state-space-heading"
            icon={"\ud83e\uddee"}
          >
            State Space: Why Almost Every Path Leads to a Win
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              A FreeCell game can be modeled as a directed graph where each
              node is a game state (the arrangement of all cards) and each
              edge is a legal move. A deal is solvable if there exists any
              path from the initial state to the solved state (all cards on
              foundations).
            </p>
            <p>
              FreeCell&apos;s state space is enormous but well-connected.
              The combination of perfect information, free cells, and
              alternating-color building creates a graph where most nodes
              have many outgoing edges. The game&apos;s reversibility (you
              can undo most moves) also contributes: states that seem stuck
              can often be backed out of and approached differently.
            </p>
            <p>
              Unsolvable deals occur when the initial card arrangement creates
              an unavoidable circular dependency &mdash; a set of cards that
              mutually block each other with no way to break the cycle even
              using all four free cells. Because alternating-color building
              provides so many valid placements and free cells provide escape
              routes, these circular deadlocks are extremely rare.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Design Lessons ── */}
        <CardSection id="design">
          <SectionHeading
            sub="Game Design Insight"
            id="design-heading"
            icon={"\ud83c\udfae"}
          >
            What FreeCell Teaches Us About Game Design
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              FreeCell is a masterclass in game design balance. Paul Alfille&apos;s
              1978 modification of Baker&apos;s Game achieved something
              remarkable: a game that is almost always winnable yet never
              trivial. The player always has agency (no luck), almost always
              has a path to victory (high solvability), and still needs to
              think carefully (genuine difficulty).
            </p>
            <p>
              This balance is why FreeCell has endured for nearly 50 years.
              Losing feels fair because you can trace your mistakes. Winning
              feels earned because it required real thought. And the tiny
              chance of an unsolvable deal adds just enough uncertainty to
              keep things interesting &mdash; you can never be 100% sure
              a deal is impossible until you&apos;ve tried everything.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-[#2a2522] text-base mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Explore More" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li>
                <Link href="/is-every-freecell-game-winnable" className="text-[#B8860B] hover:underline text-sm">
                  Is Every FreeCell Game Winnable? &rarr;
                </Link>
              </li>
              <li>
                <Link href="/how-freecell-supermoves-work" className="text-[#B8860B] hover:underline text-sm">
                  How Supermoves Work &rarr;
                </Link>
              </li>
              <li>
                <Link href="/famous-freecell-game-numbers" className="text-[#B8860B] hover:underline text-sm">
                  Famous FreeCell Game Numbers &rarr;
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Statistics &amp; Win Rates &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-vs-bakers-game" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell vs Baker&apos;s Game &rarr;
                </Link>
              </li>
              <li>
                <Link href="/strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-endgame-strategy" className="text-[#B8860B] hover:underline text-sm">
                  Endgame Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link href="/solver" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Solver &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Test Your Skills Against the Odds"
          body="Nearly every FreeCell deal is solvable. Can you find the solution?"
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
