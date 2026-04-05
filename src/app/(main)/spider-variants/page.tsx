import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { canonicalUrlFor, isOwnedBy } from "@/lib/routeOwnership";
import ContentLayout from "@/components/ContentLayout";
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

const PAGE_PATH = "/spider-variants";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Spider Solitaire Variants: Scorpion to Arachnid | ${siteConfig.siteName}`,
  description:
    "A guide to Spider's family of variants — Scorpion, Arachnid, Cicely, Wasp, Mrs. Mop, Spiderette — and the historical lineage of two-deck solitaire games.",
  keywords: [
    "spider solitaire variants",
    "scorpion solitaire",
    "arachnid solitaire",
    "cicely solitaire",
    "wasp solitaire",
    "mrs mop solitaire",
    "spiderette",
    "two deck solitaire",
    "spider family",
  ],
  openGraph: {
    title: "Spider Solitaire Variants: Scorpion to Arachnid",
    description:
      "A family of two-deck and one-deck solitaire games share Spider's lineage. Here is how the variants differ and what they teach.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function SpiderVariantsPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Spider Solitaire Variants: Scorpion to Arachnid",
      description:
        "A guide to the Spider Solitaire family of variants: Scorpion, Arachnid, Cicely, Wasp, Mrs. Mop, Spiderette, the two-deck lineage, and how variants teach different Spider skills.",
      author: [
        {
          "@type": "Organization",
          name: "The History Desk",
          url: absoluteUrl("/authors/the-history-desk"),
        },
        {
          "@type": "Organization",
          name: "The Strategy Desk",
          url: absoluteUrl("/authors/the-strategy-desk"),
        },
      ],
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
        { "@type": "ListItem", position: 3, name: "Variants", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Spider Solitaire Variants: Scorpion to Arachnid"
        subtitle="Spider has a family of closely related variants. Each one bends a rule, changes a constraint, and teaches a different skill."
        kicker="History & Strategy Pillar"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-history-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
            reviewedBySlug="the-strategy-desk"
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="A Family of Games" id="intro" icon={"\u2660"}>
            Spider is the center of a variant family
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire is the best-known member of a small
              family of closely related games. The family shares three
              core features: two decks shuffled together, tableau play
              that emphasizes same-suit descending runs, and an
              endgame defined by removing complete King-to-Ace
              sequences. Inside those shared features, each variant
              bends a specific rule &mdash; the dealing mechanics, the
              presence of reserve piles, the alternating-color
              requirement &mdash; and each bend produces a different
              game.
            </p>
            <p>
              This guide is a tour of the Spider family&apos;s main
              branches. For each variant we name the rule change, the
              strategic consequence, and what the variant teaches a
              player whose home game is standard Spider. The guide is
              written jointly by the History Desk (for the lineage
              and naming) and the Strategy Desk (for the tactical
              implications). Where the two desks disagree about a
              variant&apos;s historical origin, we have flagged the
              disputed claim instead of smoothing it over.
            </p>
          </ContentBody>
        </CardSection>

        {/* Scorpion */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Close Cousin" id="scorpion" icon={"\u2665"}>
            Scorpion
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Scorpion is the closest cousin to Spider. It uses a
              single deck (52 cards rather than 104), seven tableau
              columns, and a reserve of three cards. The tableau
              deals four face-down cards per column at the start, so
              you begin the game with a dense layout of hidden
              information &mdash; more face-downs per column than
              Spider&apos;s six-card starting piles. That density is
              the signature of Scorpion.
            </p>
            <p>
              Scorpion&apos;s signature rule is that tableau builds are
              same-suit only. Unlike Spider, where you can build
              mixed-suit descending runs as a fallback, Scorpion
              requires every descending placement to match suits.
              That constraint raises the difficulty considerably,
              because it denies you the mixed-suit relief valve that
              Spider relies on. Players moving from Spider to Scorpion
              often feel stuck in the first ten moves because the
              placements they would casually make in Spider are
              simply illegal in Scorpion.
            </p>
            <p>
              The three-card reserve partially offsets the same-suit
              constraint. When you are out of legal tableau moves, the
              reserve gives you a final batch of three new cards to
              inject into the tableau. That small safety net is
              enough to make Scorpion interesting rather than
              punishing. Scorpion rewards players who can plan
              strict same-suit sequences, which makes it a great
              bridge from 2-suit Spider to stricter suit discipline.
              See our{" "}
              <Link href="/scorpion" className="text-[#D4AF37] hover:underline">
                Scorpion Solitaire
              </Link>{" "}
              page for the full rules and strategy primer.
            </p>
            <p>
              Scorpion is also the variant where you feel Spider&apos;s
              mixed-run safety most clearly, by its absence. In
              Spider, when you cannot find a same-suit destination,
              you can drop a descending card on any suit as a
              placeholder. That placeholder buys time. Scorpion
              refuses the placeholder. Every descending placement
              has to be a real same-suit commitment, which means
              every move in Scorpion is load-bearing in a way that
              Spider moves are not. Players who practice Scorpion
              routinely report that their Spider play tightens
              afterward: the habits they formed to play Scorpion
              legally become the habits they use to play Spider
              well.
            </p>
          </ContentBody>
        </CardSection>

        {/* Arachnid */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Tighter Variant" id="arachnid" icon={"\u2666"}>
            Arachnid
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Arachnid is a tighter Spider variant that pairs the
              two-deck format with reserve piles and a modified dealing
              mechanic. Where Spider deals 54 cards to the tableau and
              holds 50 in the stock, Arachnid splits the distribution
              differently to change the pressure on the player:
              reserves give you a place to stash blocking cards, and
              the tableau layout starts slightly shallower, which
              changes opening tempo.
            </p>
            <p>
              The key strategic adjustment in Arachnid is that reserves
              change the cost of committing cards. In Spider, every
              card you commit to a column is either going to be
              moved again or buried. In Arachnid, the reserve gives
              you a third option &mdash; a neutral holding space that
              does not force the card into a descending sequence. That
              extra option shifts play toward longer-term planning,
              because you can defer commitments that Spider forces
              immediately.
            </p>
            <p>
              The variant&apos;s name is a reminder that the Spider
              family is full of arachnid-themed variants &mdash;
              Spider, Arachnid, Scorpion, Wasp &mdash; which is
              either a cluster of independent naming choices or a
              sign that Spider&apos;s creators leaned into the theme
              deliberately. The History Desk&apos;s reading is that
              the thematic clustering happened mostly in the
              mid-twentieth century, as game publishers produced
              themed patience collections and borrowed names to
              emphasize family resemblance.
            </p>
          </ContentBody>
        </CardSection>

        {/* Cicely */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Alternating Colors" id="cicely" icon={"\u2663"}>
            Cicely
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Cicely bends Spider&apos;s signature rule: instead of
              building same-suit descending runs, you build
              alternating-color descending runs, the way Klondike and
              FreeCell do. That single change reshapes the whole
              game. Descending placements are now usually legal
              (alternating colors is a less restrictive constraint than
              suit matching), but the game&apos;s strategic flavor
              shifts toward Klondike tactics grafted onto Spider&apos;s
              two-deck structure.
            </p>
            <p>
              For Spider players, Cicely is a useful palate-cleanser.
              It lets you practice Spider&apos;s structural skills
              (two-deck thinking, stock-deal pacing, empty-column
              management) without the suit-matching constraint. Once
              you return to Spider proper, the structural skills
              translate cleanly and the suit-matching discipline feels
              lighter because you have separated the two sources of
              difficulty and trained them independently.
            </p>
            <p>
              Cicely also illustrates how different the two-deck
              format feels when the core movement rule changes. With
              alternating colors, the tableau never jams as hard as
              Spider&apos;s does, because almost every descending
              placement is available. The game becomes a sequencing
              puzzle where the main challenge is managing the stock
              and the empty columns, not the suits. That lighter
              touch makes Cicely a good warm-up for longer Spider
              sessions.
            </p>
          </ContentBody>
        </CardSection>

        {/* Wasp */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="No Stock" id="wasp" icon={"\u2660"}>
            Wasp
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Wasp strips Spider&apos;s stock entirely. Instead of
              five forced deals injecting 50 new cards, Wasp deals
              all 104 cards to the tableau at the start and gives
              the player three reserve columns for staging. The
              effect is Spider without the stock-timing layer: you
              are playing a pure tableau puzzle with all the
              information visible but with almost no slack.
            </p>
            <p>
              The strategic shift is large. In Spider, stock deals
              are both a relief (new material arrives) and a
              pressure (new material buries old work). Wasp removes
              both. You start with everything you will ever have,
              and the three reserves are your only buffer. Players
              who love Spider&apos;s tableau puzzle but dislike the
              stochastic element of the stock often prefer Wasp.
              Players who rely on stock deals to bail them out of
              stuck positions find Wasp unforgiving.
            </p>
            <p>
              Wasp is also a test of whether your Spider wins come
              from strategy or from good stock-deal luck. A player
              who wins 40 percent of their Wasp games has genuine
              tableau skill, because Wasp strips out the stock
              randomness. A player who wins 40 percent of Spider
              games but only 15 percent of Wasp games is
              probably getting more help from favorable stock
              deals than they realize. Playing Wasp occasionally
              is a diagnostic for the quality of your own pure
              tableau play.
            </p>
          </ContentBody>
        </CardSection>

        {/* Mrs. Mop */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="One-Deck Spider" id="mrs-mop" icon={"\u2665"}>
            Mrs. Mop
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Mrs. Mop is Spider played with a single 52-card deck
              across eight tableau columns. The shorter deck means the
              endgame requires four King-to-Ace runs rather than
              eight, and the tableau columns are shallower from the
              start. The effect is a faster, lighter Spider &mdash;
              the game is similar in flavor but runs in a third the
              time.
            </p>
            <p>
              Mrs. Mop is a good introduction to Spider&apos;s rhythm
              for players who find the full two-deck game long. The
              same skills apply &mdash; column clearing, empty-column
              defense, same-suit run protection &mdash; but the games
              finish in ten or fifteen minutes rather than twenty-five
              or thirty. That shorter format makes Mrs. Mop useful
              for quick practice sessions.
            </p>
            <p>
              The History Desk notes that the name Mrs. Mop is
              uncertain in origin, appearing in twentieth-century
              patience collections without clear etymology. Some
              sources suggest the name refers to the game&apos;s
              &ldquo;cleaning up&rdquo; of the tableau, others tie it
              to a character in British variety entertainment. We
              have not been able to confirm either claim in primary
              sources, and flag it here as disputed.
            </p>
          </ContentBody>
        </CardSection>

        {/* Spiderette */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Miniature Spider" id="spiderette" icon={"\u2666"}>
            Spiderette
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spiderette is a miniature one-deck Spider variant that
              uses seven tableau columns and deals the tableau the
              way Klondike does: descending row counts from seven
              cards in the first column down to one card in the
              seventh. The dealing pattern gives Spiderette a
              distinctive triangular opening shape that neither
              Spider nor Klondike quite shares.
            </p>
            <p>
              Strategically, Spiderette plays as a compressed
              Spider. Same-suit runs still matter, empty columns
              still dominate, and the endgame still requires
              assembling King-to-Ace sequences. The game finishes
              faster and has fewer structural dead ends because
              the smaller deck and shallower tableau reduce the
              information-hiding problem. For a Spider player,
              Spiderette is where you practice the core Spider
              skills in a less punishing format.
            </p>
          </ContentBody>
        </CardSection>

        {/* The 2-Deck Family */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Historical Context" id="two-deck-family" icon={"\u2663"}>
            The two-deck family
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Two-deck solitaire games emerged as a distinct category
              in the nineteenth century, when European players began
              shuffling two decks together to create longer, more
              strategic patience games. The primary motivation was
              game length: a single deck produces games that end in
              five to ten minutes, while a double deck produces games
              of twenty to forty minutes that reward deeper planning.
              Spider, Forty Thieves, and Napoleon at St Helena all
              emerged from this tradition.
            </p>
            <p>
              Within the two-deck tradition, Spider stands out for
              its signature constraint: only same-suit runs move as
              groups. That rule appears to be an innovation specific
              to Spider (and Scorpion) within the patience canon, and
              it is what gives both games their distinctive strategic
              feel. Other two-deck games (Forty Thieves, for example)
              use different movement rules, and the resulting games
              play entirely differently despite sharing the two-deck
              lineage.
            </p>
            <p>
              The exact origins of Spider are disputed. The name
              appears in early twentieth-century patience collections
              and may derive from the tableau&apos;s eight
              foundation slots (like an eight-legged spider), though
              that etymology is uncertain. What is clear is that
              Spider became a mass-market game only after Microsoft
              bundled it with Windows 98 in 1998, at which point its
              player base grew by orders of magnitude.
            </p>
          </ContentBody>
        </CardSection>

        {/* When to Try Variants */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Learning Value" id="when-to-try" icon={"\u2660"}>
            When to try variants
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              For Spider mastery, the variants are useful training
              tools. Each one isolates a specific Spider skill and
              lets you practice it without the other skills
              interfering. Scorpion trains strict same-suit
              discipline. Wasp trains tableau-only planning without
              stock-timing pressure. Cicely trains structural Spider
              skills without the suit constraint. Mrs. Mop and
              Spiderette train core Spider rhythm in a compressed
              format.
            </p>
            <p>
              Our recommendation at the Strategy Desk is to use
              variants as a rotation when your Spider win rate
              plateaus. If 4-suit Spider is stuck at 15 percent,
              play twenty hands of Scorpion to sharpen same-suit
              discipline, then return to Spider. The shift of
              context often breaks bad habits that pure Spider
              grinding would not.
            </p>
            <p>
              Variants also reveal which of your Spider skills are
              real and which are habits. A skill that transfers
              (column clearing, empty-column defense) is a real
              skill. A habit that does not transfer (a specific
              suit-matching shortcut that Spider allows but Scorpion
              does not) is something you will need to relearn in
              different games. Playing the variants is how you
              separate the two.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2665"}>
            Continue the Spider curriculum
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="The canonical two-deck game with 1, 2, and 4-suit difficulty."
            />
            <ContentLinkCard
              variant="dark"
              href="/scorpion"
              title="Play Scorpion Solitaire"
              description="Spider's closest cousin — same-suit tableau builds with a three-card reserve."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-mastery"
              title="Spider Mastery"
              description="The full strategy pillar for the canonical Spider game."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider-suit-strategy"
              title="Suit Strategy"
              description="How suit matching shifts strategy across 1, 2, and 4-suit Spider."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Rotate the variants"
          body={
            <>
              The fastest way to break a Spider plateau is to play
              something adjacent to Spider. Try Scorpion for a night
              and return to Spider fresh.
            </>
          }
          primaryLabel="Play Spider Solitaire"
          primaryHref="/spider"
          secondaryLabel="Play Scorpion"
          secondaryHref="/scorpion"
        />
      </main>
    </ContentLayout>
  );
}
