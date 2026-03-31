import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "FreeCell vs Eight Off | More Free Cells, Tougher Rules",
  description:
    "FreeCell vs Eight Off compared head to head \u2014 4 vs 8 free cells, alternating-color vs same-suit building, win rates, difficulty, and which open solitaire game suits your play level.",
  keywords: [
    "freecell vs eight off",
    "eight off vs freecell",
    "difference between freecell and eight off",
    "eight off solitaire rules",
    "eight off solitaire",
    "freecell or eight off",
    "is eight off harder than freecell",
    "eight off win rate",
    "freecell variants compared",
    "eight off strategy",
    "solitaire with 8 free cells",
    "same suit solitaire games",
  ],
  openGraph: {
    title:
      "FreeCell vs Eight Off | More Free Cells, Tougher Rules",
    description:
      "A head-to-head comparison of FreeCell and Eight Off \u2014 double the free cells, same-suit building, Kings-only empty columns, and very different strategy.",
    url: absoluteUrl("/freecell-vs-eight-off"),
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
    question: "Is Eight Off harder than FreeCell?",
    answer:
      "Eight Off is moderately harder than standard FreeCell. Despite having double the free cells (8 vs 4), Eight Off uses same-suit building and restricts empty columns to Kings only. The same-suit rule dramatically reduces available moves, and the Kings-only restriction removes the tactical flexibility of parking any card in an empty column. Computer analysis puts Eight Off\u2019s solvability around 85\u201390%, compared to FreeCell\u2019s ~99.999%. It sits between FreeCell (easiest) and Baker\u2019s Game (hardest) in the open solitaire difficulty spectrum.",
  },
  {
    question: "What is the main difference between FreeCell and Eight Off?",
    answer:
      "There are three key differences. First, Eight Off has 8 free cells instead of 4 (with 4 already occupied at the start of the deal). Second, Eight Off uses same-suit building on the tableau (only 7\u2660 on 8\u2660) instead of FreeCell\u2019s alternating-color building (7\u2660 on 8\u2665). Third, only Kings can be placed in empty tableau columns in Eight Off, while FreeCell allows any card. The extra free cells partially compensate for the stricter rules, creating a unique strategic balance.",
  },
  {
    question: "Why does Eight Off start with cards in the free cells?",
    answer:
      "Eight Off deals 48 cards into 8 columns of 6 cards each, and the remaining 4 cards go into 4 of the 8 free cells. This starting configuration is part of what makes the game interesting \u2014 you begin with some free cells already occupied, so your effective free cell advantage over FreeCell is smaller than the raw numbers suggest. Managing those initial free-cell cards (deciding when to move them and where) is a critical opening decision.",
  },
  {
    question: "What is the win rate for Eight Off?",
    answer:
      "Computer solvers estimate that approximately 85\u201390% of randomly dealt Eight Off games are solvable with optimal play. Experienced human players typically win around 60\u201375% of their games. This places Eight Off between FreeCell (~99.999% solvable) and Baker\u2019s Game (~75% solvable) in difficulty. The higher solvability compared to Baker\u2019s Game is largely thanks to the 8 free cells providing more maneuvering room.",
  },
  {
    question: "Can I move sequences in Eight Off like in FreeCell?",
    answer:
      "Yes, Eight Off supports supermoves \u2014 but the sequences must be in the same suit (descending). The supermove formula is the same: (1 + empty free cells) \u00d7 2^(empty columns). However, building same-suit sequences is much harder than alternating-color sequences, so supermoves happen less frequently. When you do pull off a large supermove in Eight Off, it feels especially satisfying because of the effort required to build that same-suit run.",
  },
  {
    question: "Why can only Kings go in empty columns in Eight Off?",
    answer:
      "The Kings-only restriction is what prevents Eight Off from being too easy despite its 8 free cells. Without this rule, the extra free cells combined with freely usable empty columns would make the game significantly easier than standard FreeCell. The Kings-only rule forces you to be very deliberate about clearing columns \u2014 you can only benefit from an empty column if you have a King ready to place there. This creates interesting strategic tension: sometimes clearing a column is counterproductive if no King is available.",
  },
];

/* ── Comparison data ── */

const comparisonRows = [
  { label: "Decks", freecell: "1 (52 cards)", eightoff: "1 (52 cards)" },
  {
    label: "Cards visible at start",
    freecell: "All 52 (100%)",
    eightoff: "All 52 (100%)",
  },
  {
    label: "Tableau columns",
    freecell: "8",
    eightoff: "8",
  },
  {
    label: "Cards per column",
    freecell: "6 or 7",
    eightoff: "6 (uniform)",
  },
  {
    label: "Free cells",
    freecell: "4 (all empty at start)",
    eightoff: "8 (4 occupied at start)",
  },
  {
    label: "Foundations",
    freecell: "4 (A\u2013K by suit)",
    eightoff: "4 (A\u2013K by suit)",
  },
  {
    label: "Tableau build rule",
    freecell: "Alternating color, descending",
    eightoff: "Same suit, descending",
  },
  {
    label: "Empty column rule",
    freecell: "Any card may fill",
    eightoff: "Kings only",
  },
  {
    label: "Luck factor",
    freecell: "None \u2014 pure strategy",
    eightoff: "None \u2014 pure strategy",
  },
  {
    label: "Win rate (skilled player)",
    freecell: "~99%+",
    eightoff: "~60\u201375%",
  },
  {
    label: "Theoretical solvability",
    freecell: "~99.999%",
    eightoff: "~85\u201390%",
  },
  {
    label: "Average game length",
    freecell: "5\u201310 minutes",
    eightoff: "8\u201315 minutes",
  },
  {
    label: "Difficulty",
    freecell: "Medium",
    eightoff: "Medium\u2013Hard",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function FreecellVsEightOffPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "FreeCell vs Eight Off: More Free Cells, Tougher Rules",
      description:
        "A detailed comparison of FreeCell and Eight Off \u2014 two open solitaire games that balance free cell count against building restrictions in very different ways.",
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
        "@id": absoluteUrl("/freecell-vs-eight-off"),
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
          name: "FreeCell vs Eight Off",
          item: absoluteUrl("/freecell-vs-eight-off"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell vs Eight Off"
        subtitle={
          <>
            Eight Off doubles your free cells from 4 to 8 &mdash; but
            compensates with same-suit building and a Kings-only empty column
            rule. The result is a fascinatingly different strategic puzzle.
            Here&apos;s how they compare.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── Quick Comparison Table ── */}
        <CardSection id="comparison">
          <SectionHeading
            sub="At a Glance"
            id="comparison-heading"
            icon={"\u2660"}
          >
            Side-by-Side Comparison
          </SectionHeading>

          <ContentBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-3 pr-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Feature
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      FreeCell
                    </th>
                    <th className="py-3 pl-4 text-sm font-semibold uppercase tracking-wider text-[#B8860B]">
                      Eight Off
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={
                        i % 2 === 0
                          ? "bg-[#B8860B]/[0.03]"
                          : ""
                      }
                    >
                      <td className="py-3 pr-4 text-[#2a2522] font-medium text-sm">
                        {row.label}
                      </td>
                      <td className="py-3 px-4 text-[#444444] text-sm">
                        {row.freecell}
                      </td>
                      <td className="py-3 pl-4 text-[#444444] text-sm">
                        {row.eightoff}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The Free Cell Paradox ── */}
        <CardSection id="free-cell-paradox">
          <SectionHeading
            sub="More Cells, Harder Game"
            id="free-cell-paradox-heading"
            icon={"\u2663"}
          >
            The Free Cell Paradox
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Eight Off gives you 8 free cells &mdash; double what FreeCell
              provides. Intuitively, more temporary storage should make the
              game easier. So why is Eight Off actually harder?
            </p>
            <p>
              Three factors explain the paradox. First, 4 of your 8 free
              cells start occupied by the leftover cards from the deal, so
              you effectively begin with only 4 truly &quot;free&quot; cells
              &mdash; the same as FreeCell. Second, same-suit building
              dramatically reduces the number of legal moves at any point in
              the game. Third, the Kings-only empty column restriction removes
              one of FreeCell&apos;s most powerful tactical tools: using empty
              columns as extended free cells for any card.
            </p>
            <p>
              The net result is that Eight Off&apos;s extra free cells roughly
              offset its harsher rules, creating a game that&apos;s harder
              than FreeCell but more forgiving than{" "}
              <Link href="/bakers-game" className="text-[#B8860B] hover:underline">
                Baker&apos;s Game
              </Link>
              {" "} (which uses same-suit building with only 4 free cells). It
              occupies a satisfying middle ground in the FreeCell family.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── The Three Rule Differences ── */}
        <CardSection id="rule-differences">
          <SectionHeading
            sub="Key Differences"
            id="rule-differences-heading"
            icon={"\u2665"}
          >
            Three Rules That Change the Game
          </SectionHeading>

          <ContentBody className="space-y-5">
            <h3 className="font-semibold text-[#2a2522] text-base">
              1. Same-Suit Building
            </h3>
            <p>
              Like Baker&apos;s Game, Eight Off requires same-suit building on
              the tableau. You can only place a 7&#9824; on an 8&#9824;, not
              on an 8&#9829; or 8&#9830; as in FreeCell. This cuts available
              moves significantly and means you need to think about suits from
              the very first move.
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              2. Eight Free Cells (4 Pre-Filled)
            </h3>
            <p>
              The deal places 48 cards into 8 columns of 6, and the remaining
              4 cards go directly into free cells. You start with 8 total
              cells but only 4 available &mdash; managing those initial
              free-cell cards is a critical opening decision. Do you move
              them to the tableau immediately? Hold them for later? Each
              choice has consequences.
            </p>

            <h3 className="font-semibold text-[#2a2522] text-base">
              3. Kings-Only Empty Columns
            </h3>
            <p>
              In FreeCell, any card can fill an empty tableau column. In
              Eight Off, only Kings are allowed in empty columns. This
              fundamentally changes how you value empty columns. In FreeCell,
              clearing a column is almost always good because it gives you
              flexible storage. In Eight Off, an empty column is only useful
              if you have a King to put there &mdash; otherwise it&apos;s
              wasted space.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Strategy Differences ── */}
        <CardSection id="strategy">
          <SectionHeading
            sub="Strategic Shifts"
            id="strategy-heading"
            icon={"\u2666"}
          >
            How Strategy Changes from FreeCell to Eight Off
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Free cell management becomes an art.</strong> With 8
                cells, you have more room to maneuver &mdash; but also more
                temptation to fill them. The best Eight Off players keep at
                least 3&ndash;4 cells open at all times, using them only for
                critical unblocking moves.
              </li>
              <li>
                <strong>King placement is a strategic decision.</strong> Since
                only Kings can fill empty columns, you need to plan which
                Kings go where. A King placed in an empty column anchors a
                same-suit run. Choose wrong, and you&apos;ve committed a column
                to a suit you can&apos;t efficiently build.
              </li>
              <li>
                <strong>Opening free-cell cards set the tone.</strong> Those 4
                cards dealt to your free cells define your opening strategy.
                If they include an Ace, great &mdash; free foundation start.
                If they&apos;re mid-rank cards of suits already tangled in the
                tableau, you&apos;ll need to work around them.
              </li>
              <li>
                <strong>Same-suit sequences are gold.</strong> When you
                manage to build a long same-suit run, it&apos;s enormously
                powerful because supermoves require same-suit sequences.
                Protect and extend these runs whenever possible.
              </li>
              <li>
                <strong>Column clearing requires a plan.</strong> Don&apos;t
                clear a column unless you have a King ready. An empty column
                with no King to fill it is worse than a column with cards,
                because it&apos;s dead space you can&apos;t use.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── The FreeCell Family ── */}
        <CardSection id="family">
          <SectionHeading
            sub="The Family Tree"
            id="family-heading"
            icon={"\u2660"}
          >
            Eight Off in the FreeCell Family
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Eight Off, FreeCell, and Baker&apos;s Game form a family of
              open solitaire games &mdash; all 52 cards visible, all using
              free cells for temporary storage. They differ in building rules,
              free cell count, and empty column restrictions:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-2 pr-4 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Game</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Free Cells</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Build Rule</th>
                    <th className="py-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Empty Column</th>
                    <th className="py-2 pl-3 text-xs font-semibold uppercase tracking-wider text-[#B8860B]">Solvability</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">FreeCell</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">4</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Alternating color</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Any card</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">~99.999%</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Eight Off</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">8 (4 pre-filled)</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Same suit</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Kings only</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">~85&ndash;90%</td>
                  </tr>
                  <tr className="bg-[#B8860B]/[0.03]">
                    <td className="py-2 pr-4 text-sm font-medium text-[#2a2522]">Baker&apos;s Game</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">4</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Same suit</td>
                    <td className="py-2 px-3 text-sm text-[#444444]">Any card</td>
                    <td className="py-2 pl-3 text-sm text-[#444444]">~75%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              This progression &mdash; FreeCell → Eight Off → Baker&apos;s
              Game &mdash; offers a natural difficulty ladder. Master one,
              then move to the next. Each game teaches you something different
              about open solitaire strategy.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Who Should Play Which ── */}
        <CardSection id="who-should-play">
          <SectionHeading
            sub="Choose Your Game"
            id="who-should-play-heading"
            icon={"\u2665"}
          >
            Which Game Is Right for You?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              <strong>Play FreeCell if:</strong> You want a reliable, winnable
              logic puzzle. FreeCell&apos;s alternating-color building and
              flexible empty columns make it the most accessible member of
              the family. Nearly every deal is solvable, so losses are
              learning opportunities rather than bad luck.
            </p>
            <p>
              <strong>Play Eight Off if:</strong> You enjoy FreeCell&apos;s
              open-information gameplay but want more challenge. The extra
              free cells give you room to experiment, while same-suit building
              and Kings-only columns demand more disciplined play. It&apos;s
              the ideal stepping stone between FreeCell and Baker&apos;s Game.
            </p>
            <p>
              <strong>Play Baker&apos;s Game if:</strong> You want the
              hardest variant in the family. Same-suit building with only 4
              free cells and flexible empty columns creates the tightest
              puzzle. About 1 in 4 deals is unsolvable, so every win is hard-earned.
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

        {/* ── Play Links ── */}
        <CardSection id="play">
          <SectionHeading sub="Try Both Games" id="play-heading" icon={"\ud83c\udccf"}>
            Play Now
          </SectionHeading>

          <ContentBody className="space-y-4">
            <p>
              Play both games right here on PlayFreeCellOnline.com &mdash;
              completely free, no download required.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B8860B] text-white rounded-lg font-medium hover:bg-[#9A7209] transition-colors"
              >
                Play FreeCell
              </Link>
              <Link
                href="/eight-off"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2a2522] text-white rounded-lg font-medium hover:bg-[#3a3532] transition-colors"
              >
                Play Eight Off
              </Link>
            </div>
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
                <Link href="/eight-off/how-to-play" className="text-[#B8860B] hover:underline text-sm">
                  How to Play Eight Off &rarr;
                </Link>
              </li>
              <li>
                <Link href="/eight-off/strategy" className="text-[#B8860B] hover:underline text-sm">
                  Eight Off Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/eight-off/tips" className="text-[#B8860B] hover:underline text-sm">
                  Eight Off Tips &rarr;
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
                <Link href="/tips" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Tips &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-variants" className="text-[#B8860B] hover:underline text-sm">
                  All FreeCell Variants &rarr;
                </Link>
              </li>
              <li>
                <Link href="/history" className="text-[#B8860B] hover:underline text-sm">
                  History of FreeCell &rarr;
                </Link>
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Ready for a New Challenge?"
          body="Start with FreeCell, then try Eight Off when you want more free cells and tougher rules."
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
