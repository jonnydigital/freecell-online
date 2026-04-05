import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import { ContentHero, SectionHeading, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title:
    "FreeCell Endgame Strategy | How to Close Out Every Winnable Deal",
  description:
    "Master FreeCell endgame strategy \u2014 when to trigger auto-complete, resolving foundation order deadlocks, late-game free cell management, and avoiding last-minute losses.",
  keywords: [
    "freecell endgame strategy",
    "freecell endgame tips",
    "freecell auto complete",
    "freecell finishing strategy",
    "freecell late game",
    "freecell closing strategy",
    "freecell last moves",
    "freecell foundation order",
    "freecell stuck endgame",
    "freecell win strategy",
    "freecell almost won stuck",
    "freecell foundation deadlock",
  ],
  openGraph: {
    title:
      "FreeCell Endgame Strategy | How to Close Out Every Winnable Deal",
    description:
      "Learn how to navigate FreeCell endgames \u2014 foundation sequencing, auto-complete triggers, and avoiding the traps that cost wins in the final moves.",
    url: absoluteUrl("/freecell-endgame-strategy"),
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
    question: "When does FreeCell auto-complete trigger?",
    answer:
      "Auto-complete activates when every remaining card can be safely moved to the foundations without any further strategic decisions. Specifically, this means all cards still on the board are either already in correct foundation order or can be placed sequentially without needing to pass through free cells or rearrange columns. Most implementations trigger auto-complete when all remaining tableau cards are face-up and in ascending order within their columns, or when the game detects that the only remaining moves are foundation placements.",
  },
  {
    question: "Why do I get stuck at the very end of FreeCell games?",
    answer:
      "The most common reason is a foundation order conflict. For example, you need to place a red 6 on a foundation, but the black 5 that would go on top of it is still trapped under other cards. This happens when you build foundations unevenly \u2014 one suit is far ahead while another lags behind. The fix is to maintain roughly balanced foundation heights throughout the game, especially in the last 15-20 cards. Another common reason is running out of free cells and empty columns when you still need to rearrange cards.",
  },
  {
    question: "Should I build foundations as fast as possible?",
    answer:
      "Not necessarily. In the endgame, aggressive foundation building can actually cause problems if suits get too far out of balance. The safe rule is: you can always move an Ace or 2 to a foundation immediately. For cards ranked 3 and above, only move them to a foundation if both opposite-color cards of the rank below are already on their foundations. For example, it\u2019s safe to place the 5\u2660 on its foundation only if both the 4\u2665 and 4\u2666 are already placed. This prevents you from needing those cards later for tableau building.",
  },
  {
    question: "How do I avoid foundation deadlocks?",
    answer:
      "Foundation deadlocks happen when two or more suits need the same card to progress, but that card is blocked. Prevention is the best cure: keep all four foundations within 2 ranks of each other throughout the game. If you notice one foundation is 3+ ranks ahead of another, slow down on the leading suit and focus on catching up the lagging ones. In the late game, scan all four foundations before every move and ask: \u201CWill this move create a dependency I can\u2019t resolve?\u201D",
  },
  {
    question: "What is the \u2018safe to auto-play\u2019 rule?",
    answer:
      "A card is safe to auto-play to the foundation when you could never need it for tableau building again. The formula: a card of rank N is safe to auto-play when both opposite-color cards of rank N-1 are already on their foundations. For Aces and 2s, this is always true. For a red 7, both the 6\u2660 and 6\u2663 must be on foundations first. Following this rule strictly prevents you from accidentally sending a card to a foundation that you still needed to build tableau sequences.",
  },
  {
    question: "Is it possible to lose a winnable FreeCell deal in the endgame?",
    answer:
      "Yes, absolutely. Even deals that are theoretically solvable can become unwinnable through poor endgame play. Common ways to lose in the endgame include: prematurely committing free cells when you need them for reordering, building foundations unevenly causing deadlocks, and filling empty columns with cards that prevent necessary sequence moves. The endgame requires just as much careful planning as the opening \u2014 sometimes more, because there\u2019s less room for recovery.",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function FreecellEndgameStrategyPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "FreeCell Endgame Strategy: How to Close Out Every Winnable Deal",
      description:
        "A complete guide to FreeCell endgame strategy \u2014 foundation sequencing, auto-complete triggers, deadlock avoidance, and techniques for converting winning positions.",
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
        "@id": absoluteUrl("/freecell-endgame-strategy"),
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
          name: "Endgame Strategy",
          item: absoluteUrl("/freecell-endgame-strategy"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="FreeCell Endgame Strategy"
        subtitle={
          <>
            You&apos;ve opened well, navigated the midgame, and you can see
            the finish line. But the last 15&ndash;20 cards are where many
            players stumble. Here&apos;s how to close out every winnable deal.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── What Is the Endgame? ── */}
        <CardSection id="what-is-endgame">
          <SectionHeading
            sub="Defining the Phase"
            id="what-is-endgame-heading"
            icon={"\u2660"}
          >
            When Does the Endgame Begin?
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The FreeCell endgame begins when most cards are either on
              foundations or in ordered sequences on the tableau. A practical
              definition: you&apos;re in the endgame when fewer than 20 cards
              remain in play and you can see a clear path to finishing &mdash;
              or when you first realize that path isn&apos;t as clear as you
              thought.
            </p>
            <p>
              The endgame feels different from the opening and midgame. In the
              opening, you&apos;re creating space and uncovering key cards. In
              the midgame, you&apos;re building sequences and managing
              resources. In the endgame, you&apos;re resolving dependencies
              and sequencing your final moves precisely. One wrong move can
              transform a winning position into a deadlock.
            </p>
            <p>
              Many players relax when they see only a handful of cards left.
              That relaxation is exactly when mistakes happen. The endgame
              demands the same careful attention as the rest of the game
              &mdash; sometimes more, because there&apos;s less room to
              recover from errors.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Foundation Sequencing ── */}
        <CardSection id="foundation-sequencing">
          <SectionHeading
            sub="The Critical Skill"
            id="foundation-sequencing-heading"
            icon={"\u2663"}
          >
            Foundation Sequencing: Keep Suits Balanced
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The single most important endgame principle is maintaining
              balanced foundations. If your &#9824; foundation is at 9 but
              your &#9829; foundation is at 4, you have a problem. Every red
              card ranked 5&ndash;8 might still be needed for tableau building,
              but they can&apos;t serve that purpose if they&apos;re stuck
              behind the black cards you need to place first.
            </p>
            <p>
              <strong>The Safe-Play Rule:</strong> A card of rank N is safe
              to move to a foundation when both opposite-color cards of rank
              N&minus;1 are already on their foundations.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Aces and 2s:</strong> Always safe to auto-play
                immediately. No other card depends on them for tableau building.
              </li>
              <li>
                <strong>3s:</strong> Safe when both opposite-color 2s are on
                foundations. For 3&#9824;, check that 2&#9829; and 2&#9830;
                are placed.
              </li>
              <li>
                <strong>Higher cards:</strong> Apply the same rule. For
                7&#9824;, check that 6&#9829; and 6&#9830; are placed. If
                they&apos;re not, you might still need the 7&#9824; to build
                a tableau sequence.
              </li>
            </ul>
            <p>
              Following this rule rigorously prevents the most common endgame
              deadlock: sending a card to the foundation and then realizing
              you needed it to unblock another sequence.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── The Deadlock Problem ── */}
        <CardSection id="deadlocks">
          <SectionHeading
            sub="The Endgame Trap"
            id="deadlocks-heading"
            icon={"\u2665"}
          >
            Foundation Deadlocks: How They Happen and How to Avoid Them
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              A foundation deadlock occurs when you can&apos;t progress on any
              foundation because each suit needs a card that&apos;s blocked by
              a card needed for a different suit. Example:
            </p>
            <div className="bg-[#B8860B]/[0.06] rounded-lg p-5 text-sm text-[#2a2522] space-y-2">
              <p>&#9824; Foundation at 7 &mdash; needs 8&#9824;</p>
              <p>&#9829; Foundation at 5 &mdash; needs 6&#9829;</p>
              <p>But 6&#9829; is under 8&#9824; in a cascade</p>
              <p>And 8&#9824; needs 7&#9829; moved first, which is also trapped</p>
              <p className="font-semibold text-red-700 pt-2">
                Result: circular dependency. Game over.
              </p>
            </div>
            <p>
              Prevention strategies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Keep foundation heights within 2 ranks.</strong> If
                your highest foundation is at 8, your lowest should be no
                lower than 6.
              </li>
              <li>
                <strong>Before placing a high card on a foundation, check
                dependencies.</strong> Ask: &quot;Do I need any card of this
                rank or lower that isn&apos;t on a foundation yet?&quot;
              </li>
              <li>
                <strong>Reserve free cells for ordering, not storage.</strong>{" "}
                In the endgame, use free cells to temporarily shuffle the
                last few cards into foundation-ready order, not to store
                cards indefinitely.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Late-Game Free Cell Management ── */}
        <CardSection id="free-cell-management">
          <SectionHeading
            sub="Resource Management"
            id="free-cell-management-heading"
            icon={"\u2666"}
          >
            Late-Game Free Cell Management
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              In the endgame, every free cell is precious. Unlike the opening
              where you might have 3&ndash;4 free cells available, the
              endgame often finds you with 1&ndash;2 free cells and a tight
              board. Managing this scarce resource determines whether you win
              or lock up.
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>Drain free cells before filling them.</strong> Before
                parking a new card in a free cell, check if any current
                free-cell occupant can go to a foundation or back to the
                tableau. Every card removed from a free cell opens options.
              </li>
              <li>
                <strong>Plan the full sequence before moving.</strong> In the
                endgame, don&apos;t move a card to a free cell unless you
                know exactly when and where it will leave. &quot;I&apos;ll
                move this Q&#9824; to a free cell, place the J&#9829; onto
                the foundation, then move the Q&#9824; onto K&#9829;&quot;
                &mdash; visualize the full chain before committing.
              </li>
              <li>
                <strong>Count your outs.</strong> How many moves away are you
                from auto-complete? If the answer is more than your free cell
                count + empty columns, you need to create more space before
                attempting the finish.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── Auto-Complete ── */}
        <CardSection id="auto-complete">
          <SectionHeading
            sub="The Finish Line"
            id="auto-complete-heading"
            icon={"\u2660"}
          >
            Understanding Auto-Complete
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Auto-complete is the satisfying moment when the game takes over
              and rapidly moves all remaining cards to the foundations. It
              triggers when the game detects that no more strategic decisions
              are needed &mdash; every remaining card can be placed on
              foundations in the correct order.
            </p>
            <p>
              On {siteConfig.siteName}, auto-complete triggers when:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All remaining tableau cards are in ascending order within their columns</li>
              <li>Every card can be placed on its foundation without needing to move through free cells</li>
              <li>No circular dependencies exist between foundations</li>
            </ul>
            <p>
              <strong>Tip:</strong> You can speed up auto-complete by manually
              placing the first few cards on foundations. Sometimes auto-complete
              doesn&apos;t trigger because one card is slightly out of order.
              A single manual move can unlock the cascade.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Endgame Checklist ── */}
        <CardSection id="checklist">
          <SectionHeading sub="Quick Reference" id="checklist-heading" icon={"\ud83d\udccb"}>
            Endgame Checklist
          </SectionHeading>

          <ContentBody>
            <div className="bg-[#B8860B]/[0.06] rounded-lg p-5 space-y-3">
              <p className="font-semibold text-[#2a2522]">
                Before every move in the last 20 cards:
              </p>
              <ul className="text-sm text-[#444444] space-y-1.5">
                <li>&#9745; Are all four foundations within 2 ranks of each other?</li>
                <li>&#9745; Is this card safe to auto-play? (Check both opposite-color cards of rank N-1)</li>
                <li>&#9745; Will this move create a circular dependency?</li>
                <li>&#9745; Do I have a plan for every card currently in a free cell?</li>
                <li>&#9745; Am I preserving empty columns for the final sequence?</li>
                <li>&#9745; Can I drain a free cell before filling one?</li>
                <li>&#9745; How many moves until auto-complete? Do I have enough space?</li>
              </ul>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

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
                <Link href="/freecell-opening-strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Opening Strategy &rarr;
                </Link>
              </li>
              <li>
                <Link href="/how-freecell-supermoves-work" className="text-[#B8860B] hover:underline text-sm">
                  How Supermoves Work &rarr;
                </Link>
              </li>
              <li>
                <Link href="/strategy" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Strategy Guide &rarr;
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Tips &amp; Tricks &rarr;
                </Link>
              </li>
              <li>
                <Link href="/freecell-mistakes-to-avoid" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Mistakes to Avoid &rarr;
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="text-[#B8860B] hover:underline text-sm">
                  FreeCell Statistics &amp; Win Rates &rarr;
                </Link>
              </li>
              <li>
                <Link href="/is-every-freecell-game-winnable" className="text-[#B8860B] hover:underline text-sm">
                  Is Every FreeCell Game Winnable? &rarr;
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
          heading="Ready to Close Out More Wins?"
          body="Practice your endgame with the FreeCell solver \u2014 watch how the AI sequences its final moves, then try it yourself."
          primaryLabel="Play FreeCell Now"
          primaryHref="/"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
