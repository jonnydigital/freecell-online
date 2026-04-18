import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
  ContentLinkCard,
  AuthorByline,
} from "@/components/content";

const PAGE_PATH = "/spider-column-tactics";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

const FAQS = [
  {
    question: "Why are empty columns so valuable in Spider Solitaire?",
    answer:
      "An empty column in Spider can temporarily hold any single card or any same-suit run, which lets you disassemble buried sequences you could not otherwise move. The group movement rule locks most multi-card moves unless the cards share a suit; empty columns are the workaround. Each empty roughly doubles the set of legal reorganizations available to you.",
  },
  {
    question: "How do I create an empty column early in a Spider game?",
    answer:
      "Target the shortest column or the column whose top card can be moved cleanly onto another column. Prioritize face-down exposure as you clear. Avoid feeding new cards into a column you are trying to empty — every card added to a target column costs you at least one move to remove. Good players can usually produce their first empty column before the second stock deal.",
  },
  {
    question: "Should I fill an empty column with a King?",
    answer:
      "Only if the King drags a productive same-suit chain with it, or if leaving the column empty will force a stock deal you are not ready for. A King committed to an empty column locks that column for the rest of the game. Wait for the right King — usually one with a Queen of the same suit already accessible.",
  },
  {
    question: "How many empty columns do I need to reliably untangle a mixed stack?",
    answer:
      "One empty is enough to peel a single off-suit card. Two empties let you split a deeper mixed stack by staging one run while you move the other. Three empties give you compound flexibility — you can rebuild entire columns in the correct suit order. At four or more empties, most 2-suit positions are effectively solved.",
  },
  {
    question: "Is it ever wrong to create an empty column?",
    answer:
      "Yes. If creating an empty requires burying a critical face-down card or committing a King that belongs elsewhere, the cost can exceed the benefit. Empties are valuable because they are optional; an empty you cannot defend for even one move is just a forced deal trigger. Create empties you can hold for at least three moves.",
  },
];

export const metadata: Metadata = {
  title: `Emptying Columns: Advanced Spider Tactics | ${siteConfig.siteName}`,
  description:
    "A deep guide to empty columns in Spider Solitaire — why they are the most valuable resource, how to create them, how to defend them, and how to avoid the traps of filling too early.",
  keywords: [
    "spider empty columns",
    "spider column tactics",
    "how to empty spider column",
    "spider solitaire advanced strategy",
    "spider optionality",
    "spider column planning",
    "spider empty column traps",
  ],
  openGraph: {
    title: "Emptying Columns: Advanced Spider Tactics",
    description:
      "A deep guide to the most valuable resource in Spider Solitaire — creating empty columns, defending them, the two-empty state, and planning backward from empties.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderColumnTacticsPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Emptying Columns: Advanced Spider Tactics",
      description:
        "The empty column playbook for Spider Solitaire: why empties win games, how to create them, how to defend them, the two-empty-column state, and the traps that burn them.",
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
      dateModified: UPDATED_DATE,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl(PAGE_PATH),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Spider Solitaire", item: absoluteUrl("/spider") },
        { "@type": "ListItem", position: 3, name: "Column Tactics", item: absoluteUrl(PAGE_PATH) },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Emptying Columns: Advanced Spider Tactics"
        subtitle="Empty columns are the single most valuable resource in Spider. Here is the playbook for creating them, defending them, and avoiding the traps."
        kicker="Strategy Pillar"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Valuable Asset" id="intro" icon={"\u2660"}>
            Why the empty column matters
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              If you learn one Spider concept and nothing else, make it
              this: empty columns win games. The correlation between empty
              columns held during mid-game and final win rate is stronger
              than any other single variable the Strategy Desk has
              watched. Players who maintain one empty column through the
              middle of their games win regularly. Players who maintain
              two empty columns win at a rate that looks unreasonable.
              Players who never generate empties lose almost all the time.
              Every other Spider skill is in service of this one resource.
            </p>
            <p>
              This page is the deep treatment of that one idea. We cover
              why empties work, how to manufacture them, how to defend
              them, how to use two empties in coordination, which traps
              burn empties fastest, and how to plan with empties in mind.
              If the Spider Mastery pillar is the big picture, this is
              the closeup on the single most important resource in the
              whole picture.
            </p>
          </ContentBody>
        </CardSection>

        {/* Why Empty Columns Win */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Optionality Math" id="why-they-win" icon={"\u2665"}>
            Why empty columns win
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              An empty column is a universal receiver. Any card, of any
              rank, of any suit, can land on it. Any same-suit descending
              run of any length can land on it as a block. That
              universality is what makes empties different from every
              other slot on the Spider tableau, because every other slot
              imposes a constraint: the top card of the column must be
              one rank lower and, for grouped moves, one suit matching.
              An empty column has no such constraint. It is the only
              place on the board where the normal Spider rules relax.
            </p>
            <p>
              The practical consequence is optionality. With an empty
              column in hand, you can disassemble a mixed-suit run by
              parking its top card or sub-run on the empty and working
              your way down. You can temporarily store a King that is
              blocking a column you want to clear. You can stage a
              same-suit run that needs to swap homes but has no legal
              destination yet. Each of those plays is impossible without
              the empty. Together, they are the reason Spider games go
              from stuck to solved.
            </p>
            <p>
              Empty columns also solve the stock-deal problem. A deal
              injects ten new cards across the ten columns. Without
              empties, those cards land on existing tops and constrain
              them. With an empty, one of the ten landing spots is a
              clean slate, which means the deal leaves the tableau
              structurally the same shape it had before &mdash; just
              one column deeper. That delta is the difference between a
              deal that complicates your life and a deal that simply
              delivers material.
            </p>
            <p>
              We can count the optionality. With no empty columns, most
              compound moves require finding an exact same-suit match on
              an existing descending column. With one empty column, every
              compound move has an additional legal destination. With two
              empty columns, the move graph doubles again, because you can
              stage multi-part moves that use both empties as
              intermediaries. The optionality growth is roughly
              exponential per empty column, which is why two empties
              feel like a different game.
            </p>
            <p>
              Empties also reshape the question of which face-down cards
              you can expose. Without empties, exposing a face-down card
              requires relocating every face-up card above it to legal
              descending slots. If any one of those cards lacks a
              destination, the exposure is blocked. Empties remove that
              blockage, because any card can land on an empty column. A
              face-down card that was unreachable an hour ago becomes
              reachable the moment you create an empty, and the gains
              compound because the newly-exposed face-down card may
              enable further exposures.
            </p>
            <p>
              One more way empties win: they rescue you from deals that
              land badly. Even the best Spider players sometimes trigger
              a deal that drops a bad distribution &mdash; three Kings
              across the wrong columns, say, or a cluster of
              mid-rank cards that block existing runs. With empties
              available, the bad deal is recoverable: you park Kings on
              empties, offload awkward tops, and rebuild structure.
              Without empties, the same deal is game over. The insurance
              value of empties is why strong players guard them even
              when they do not have an immediate use.
            </p>
          </ContentBody>
        </CardSection>

        {/* Creating Empty Columns */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Sequencing The Clear" id="creating" icon={"\u2666"}>
            Creating empty columns
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Creating an empty column is a reverse-engineering exercise.
              You do not empty a column by playing forward, move by move,
              and hoping. You pick a target column, imagine it empty, and
              walk backward through the moves that would get it there.
              This reversal is the single most important technique in
              Spider strategy.
            </p>
            <p>
              Start with target selection. The best candidates are columns
              with small face-up cards (low ranks go more places), short
              columns (fewer cards to relocate), and columns whose top
              cards have obvious same-rank partners elsewhere on the
              tableau. A column with a Nine on top is a candidate if
              there is a Ten elsewhere the Nine can slide under. A column
              with a King on top is a much worse candidate because a King
              can only go to an empty column &mdash; which you are trying
              to create.
            </p>
            <p>
              Once you pick a target, list the cards on it from top to
              bottom and plan each card&apos;s destination. For each
              face-up card, identify which descending slot on another
              column can absorb it. If the card is part of a same-suit
              run, the run can go as a block; if it is isolated, it goes
              alone. Face-down cards cannot be relocated directly &mdash;
              they reveal a face-up card, which you handle when you get
              there. The plan is a sequence of destinations, one per card,
              and you walk the column down in order.
            </p>
            <p>
              Sometimes a card has no current destination. When that
              happens, you need a preparatory move: rearrange a different
              column to create the destination first. That preparatory
              move is often where the creativity lives. A well-sequenced
              column clearing might use three or four preparatory moves
              across other columns before the actual emptying begins, and
              the preparations are what make the emptying possible.
            </p>
            <p>
              There is also the option of sacrificing other positions.
              Sometimes the only way to empty column 4 is to break a
              same-suit run on column 7 and scatter it across columns 1
              and 9. That sacrifice trades a structural asset (the
              same-suit run) for a different structural asset (the empty
              column). The trade is usually worth it &mdash; one empty
              column is generally worth more than one same-suit run of
              four cards, because the empty is reusable and the run is
              one-time. But the trade should be deliberate, not
              accidental.
            </p>
            <p>
              A worked pattern: the two-short-column pivot. If two
              columns are unusually short &mdash; say, three cards each
              &mdash; and they share no obvious same-suit connection,
              you can often consolidate them. Move the top cards of
              both into descending slots on other columns, then
              consolidate the remaining cards onto one of the two
              columns, leaving the other empty. This pattern is
              particularly strong because it produces an empty
              without requiring you to break any of your longer runs.
              Short-column consolidation is the highest-leverage
              empty-creation move in the game.
            </p>
            <p>
              Another pattern: the King-relocation cascade. A column
              anchored by a King is almost impossible to empty, because
              the King will still be there when you have moved everything
              above it. But if an empty column becomes available
              elsewhere, the King can relocate to the empty, and the
              old King-anchored column is suddenly cleanable. This is
              why empties beget empties &mdash; the first empty unlocks
              the ability to create a second, because it frees Kings
              that were blocking other columns.
            </p>
          </ContentBody>
        </CardSection>

        {/* Defending Empty Columns */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Resist Filling Early" id="defending" icon={"\u2663"}>
            Defending empty columns
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              An empty column is only valuable while it stays empty. The
              second someone drops a card on it, most of its optionality
              evaporates. A column with a lone King in it is still useful
              &mdash; you can build down from the King &mdash; but the
              universal-receiver property is gone. The defense of empties
              is therefore the tactical counterpart to creating them.
            </p>
            <p>
              The rule at the Strategy Desk is this: never fill an empty
              column on reflex. Every card you place into an empty costs
              you the optionality of the empty, and that cost must be
              justified. If placing a King there buys you a specific
              sequence of moves that delivers a completed run, the
              placement is justified. If placing a random card there just
              gets the card out of your hand, the placement is a loss.
            </p>
            <p>
              The question to ask before committing a card to an empty
              column: what does this card do once it lands? If the answer
              is &ldquo;it starts a new descending run,&rdquo; the
              commitment is fine. If the answer is &ldquo;it sits
              there,&rdquo; do not make the move. The empty column is
              strictly more valuable than an idle King.
            </p>
            <p>
              There are exceptions. If you have two empty columns and
              dropping a King in one of them unlocks a major cascade,
              do it &mdash; the second empty preserves enough optionality
              to cover the loss of the first. If a deal is imminent and
              you are forced to fill every column to trigger the deal,
              commit the minimum card that still preserves some run-
              building potential on that column. Empties are a budget,
              not an absolute; spend them when the game requires spending.
            </p>
            <p>
              The discipline to defend empties is harder than the
              technique to create them. Players feel an urge to tidy the
              tableau and an empty column feels like a gap that needs
              filling. Treat the feeling as a warning signal, not a
              prompt. Empty columns are supposed to look like gaps.
              That is their function.
            </p>
            <p>
              A defensive technique that helps: before committing any
              card to an empty, out loud (or in your head), name the
              specific payoff. Say something like &ldquo;placing this
              King in the empty frees the Queen of Spades, which merges
              with the Jack of Spades on column 3, which exposes a
              face-down card.&rdquo; If you cannot articulate a chain
              of at least two consequences, the placement is probably
              premature. The verbalization forces you to simulate
              through the consequences before committing to them.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit format="horizontal" className="-my-1" />

        {/* The Two-Empty-Column State */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Compound Flexibility" id="two-empties" icon={"\u2660"}>
            The two-empty-column state
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Two empty columns is a milestone. From that state, nearly
              every Spider position becomes solvable if it was already
              close. The two-empty state gives you what we call compound
              flexibility: you can perform multi-step moves that use
              one empty as a staging area and the other as a final
              destination, and then re-open the staging empty for the
              next move.
            </p>
            <p>
              A worked example. Suppose column 6 has a mixed run of four
              cards on top of a face-down card, and you want to expose
              the face-down card. With zero empties, you need to find
              four different descending slots on four different columns
              &mdash; one for each card &mdash; and place them one at a
              time. With one empty, you can park the mixed run&apos;s
              top card, which may expose a same-suit sub-run of three
              that can move as a block. With two empties, you can
              dismantle the whole run quickly: stage the top on empty
              A, move the sub-run to empty B, then place the top from A
              onto its own destination. The face-down card is exposed
              in three or four moves instead of six or seven.
            </p>
            <p>
              When you reach two empties, slow down. The tableau is now
              unusually capable, which means there are probably several
              cascades available that were not visible with one empty.
              Scan the whole board before using either empty &mdash;
              the right sequence often uses both empties in coordination
              and can solve a problem that looked impossible two moves
              ago.
            </p>
            <p>
              Holding two empties into the fifth deal is a meaningful
              aspiration. Most winnable 4-suit hands can be reached from
              a two-empty state heading into the final deal. If you can
              engineer your play to produce two empties before deal five,
              you have given yourself the tools the endgame requires.
            </p>
            <p>
              Three empties is rarer, and mostly unnecessary. The
              marginal value of the third empty over the second is
              smaller than the marginal value of the second over the
              first, because most multi-step moves only need two staging
              columns. Players who chase three empties often sacrifice
              other structure to generate the third and end up worse
              off. Treat two empties as the practical ceiling, and use
              the effort you would have spent on a third to instead
              expose more face-down cards.
            </p>
          </ContentBody>
        </CardSection>

        {/* Empty-Column Traps */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Common Errors" id="traps" icon={"\u2665"}>
            Empty-column traps
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Two traps account for most empty-column losses. Both feel
              harmless and both kill win rate.
            </p>
            <p>
              Trap one: filling an empty with a single card that then
              blocks you. You create an empty, drop a Queen into it
              because it was awkward elsewhere, and then discover two
              moves later that you needed the empty for a King that was
              holding up an entire cascade. The Queen-filled column now
              requires a Jack of matching suit to unblock, and no Jack
              is available. The empty is gone, and the cascade never
              happens. The preventive habit is to treat every empty as
              reserved until you can name the specific multi-step
              purpose that justifies filling it.
            </p>
            <p>
              Trap two: burning empties on short-term wins. You have an
              empty, and you can use it to deliver a completed run to the
              foundation right now. Delivering a run feels good. But if
              the delivery is not load-bearing &mdash; if the run could
              wait two turns and still reach the foundation &mdash; you
              have spent an empty for a tempo gain that was going to be
              yours anyway. The preventive habit is to ask whether the
              foundation delivery requires the empty right this turn,
              or whether it can wait.
            </p>
            <p>
              Both traps share the same underlying mistake: treating the
              empty column as a resource that exists to be spent, rather
              than as infrastructure that exists to enable. Spend empties
              on specific, named purposes. Do not spend them because
              spending feels productive.
            </p>
            <p>
              A third, subtler trap: burning an empty to clear a
              &ldquo;mess&rdquo; that is not actually blocking you. Late
              in a hand, a column full of mixed-suit runs can look
              unsightly, and the urge to tidy it with an empty
              column&apos;s help is strong. Resist. If the mess is not
              blocking a specific cascade or foundation delivery, leave
              it alone. Ugly tableaus win games routinely; neat tableaus
              without empty columns lose them.
            </p>
          </ContentBody>
        </CardSection>

        {/* Empty-Column Planning */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Look Ahead" id="planning" icon={"\u2666"}>
            Empty-column planning
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Planning with empty columns means looking further ahead
              than you otherwise would. Without empties, you plan one or
              two moves ahead because there is limited slack. With
              empties, you can plan five or six moves ahead, because
              each empty extends the space of legal moves. That
              lookahead is where Spider becomes a thinking game.
            </p>
            <p>
              A lookahead protocol we teach at the Strategy Desk: when
              you have an empty and you see a potential use for it, map
              out three possible futures. Future A uses the empty
              immediately. Future B uses the empty two turns from now
              after a preparatory move. Future C holds the empty for the
              deal. Compare the three futures on the metric of how many
              total cards get exposed or delivered over the next five
              moves. The winner is usually the lookahead that delays the
              empty&apos;s use until its maximum impact.
            </p>
            <p>
              Delay is the default. When in doubt, hold the empty open
              for another turn. Patience with empties is the single
              biggest behavioral change that separates intermediate
              players from strong ones. Intermediate players panic and
              fill. Strong players wait.
            </p>
            <p>
              The stock deal complicates planning. Remember that you
              cannot trigger a deal while any column is empty. That
              rule is both a constraint and a tool. It is a constraint
              because if you are carrying two empties and need to
              deal, you must first fill both empties, which costs you
              the optionality you spent so much effort to generate. It
              is a tool because empty columns are a built-in delay
              mechanism &mdash; as long as they exist, the stock cannot
              force new cards onto you.
            </p>
            <p>
              The tactical play is therefore to use empties to buy time
              when the tableau is not ready for a deal, and to
              consolidate empties into a specific useful shape before
              filling them to trigger one. If you hold two empties and
              need to deal, do not fill them arbitrarily. Put a King in
              one (it is the card least likely to hurt you on that
              column) and a card that starts a potential run in the
              other. That way the pre-deal fills are themselves
              productive, rather than dead placements.
            </p>
          </ContentBody>
        </CardSection>

        {/* Suit-Locked Empties */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Tactical Subtlety" id="suit-locked" icon={"\u2663"}>
            Suit-locked empties
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              An empty column is technically universal, but in practice
              empties can be tactically locked to a specific suit
              because of the plans you have elsewhere. If you are
              assembling a King-to-Ace run of Spades and your empty is
              earmarked as the home for that run once you begin the
              final assembly, then any other card you drop in the empty
              breaks the plan. In that situation the empty is
              suit-locked to Spades.
            </p>
            <p>
              Recognizing a suit-locked empty is a subtle skill. The
              empty is still universal in the rules, but in your head
              you have committed it to a future purpose and should treat
              it as off-limits to anything else. This is especially
              common late in a hand, when one or two same-suit runs are
              almost complete and need a staging column to finish
              assembling.
            </p>
            <p>
              When an empty becomes suit-locked, label it mentally.
              Naming the commitment (&ldquo;this empty is reserved for
              the Clubs run&rdquo;) prevents the casual placement that
              would break the plan. Players who do not label their
              empties often sabotage their own late-game cascades by
              placing an unrelated King into the reserved column
              without noticing.
            </p>
            <p>
              The inverse of suit-locking is situational locking. An
              empty can also be reserved for a specific card or
              specific move, regardless of suit: reserved for the King
              you need to relocate, reserved for the run you need to
              temporarily disassemble. Use whatever mental label fits
              the situation. The point is to stop treating empties as
              interchangeable commodities and start treating them as
              specific tools for specific jobs.
            </p>
            <p>
              One last observation. Players sometimes ask whether it
              is better to have one empty that is flexible or two
              empties that are both suit-locked. In our experience, two
              suit-locked empties are still more powerful than one
              flexible empty, because the locks are in your head &mdash;
              you can always break a lock if the game requires it. The
              optionality that empties provide is never fully consumed
              by commitments you have made mentally; it is only
              consumed by cards you actually place in them.
            </p>
          </ContentBody>
        </CardSection>

        {/* FAQ */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq" icon={"\u2666"}>
            Frequently asked questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        <AdUnit format="auto" className="-my-1" />

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider-mastery"
              title="Spider Mastery"
              description="The full strategy pillar — the four pillars, opening principles, and the ten mistakes."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="Practice the empty-column playbook live."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-suit-strategy"
              title="Suit Strategy"
              description="How the group movement rule and suit discipline interact with empty columns."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider/strategy"
              title="Spider Strategy Primer"
              description="Short-form strategy highlights for quick review."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Practice empty discipline"
          body={
            <>
              Play a hand where your only goal is to reach two empty
              columns before the third stock deal. Do not worry about
              winning &mdash; just get to two empties. That focus
              rebuilds the habit.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Read the mastery pillar"
          secondaryHref="/spider-mastery"
        />
      </main>
    </ContentLayout>
  );
}
