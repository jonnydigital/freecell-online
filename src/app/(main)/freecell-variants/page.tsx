import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { canonicalUrlFor, isOwnedBy } from '@/lib/routeOwnership';
import AdUnit from '@/components/AdUnit';
import ContentLayout from '@/components/ContentLayout';
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  ContentLinkCard,
  JsonLd,
} from '@/components/content';
import AuthorByline from '@/components/content/AuthorByline';

const PUBLISHED_DATE = '2026-04-05';
const UPDATED_DATE = '2026-04-05';
const ROUTE = '/freecell-variants';

export const metadata: Metadata = {
  title: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
  description:
    'Explore every FreeCell variant: classic FreeCell, Baker\'s Game, Eight Off, reduced-cell modes, daily challenges, and competitive speed modes. Find the version that fits your skill level.',
  keywords: [
    'freecell variants',
    'freecell game variations',
    'types of freecell',
    'freecell solitaire versions',
    'freecell game modes',
    'bakers game',
    'eight off solitaire',
    '1 cell freecell',
    '2 cell freecell',
    '3 cell freecell',
    'easy freecell',
    'hard freecell',
    'freecell difficulty levels',
  ],
  openGraph: {
    title: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
    description:
      'Classic FreeCell, Baker\'s Game, Eight Off, reduced-cell modes, daily challenges, and competitive speed modes. Find the variant that fits your skill level.',
    url: absoluteUrl('/freecell-variants'),
    siteName: siteConfig.siteName,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: canonicalUrlFor(ROUTE),
  },
};

const faqItems = [
  {
    question: 'What is the easiest FreeCell variant?',
    answer:
      'Easy FreeCell is the most beginner-friendly variant. Aces and 2s start on the foundations, giving you a significant head start. Standard FreeCell with 4 free cells is also very approachable, with a 99.999% solvability rate.',
  },
  {
    question: 'What is the hardest FreeCell variant?',
    answer:
      '1-Cell FreeCell is the hardest variant. With only one free cell for temporary storage, roughly 10% of deals are solvable. It requires perfect planning and deep lookahead to win.',
  },
  {
    question: 'What is the difference between FreeCell and Baker\'s Game?',
    answer:
      'The only difference is the stacking rule on the tableau. FreeCell uses alternating-color stacking (red on black), while Baker\'s Game requires same-suit stacking (hearts on hearts). This makes Baker\'s Game significantly harder despite having the same layout.',
  },
  {
    question: 'How many FreeCell variants can I play here?',
    answer:
      'You can play over 9 distinct FreeCell variants including classic FreeCell, Baker\'s Game, Eight Off, Easy FreeCell, 3-Cell, 2-Cell, and 1-Cell FreeCell. Plus competitive modes like Daily FreeCell, Streak Mode, and Storm Mode.',
  },
  {
    question: 'Are all FreeCell deals solvable in every variant?',
    answer:
      'No. Standard FreeCell has a 99.999% solvability rate (only deal #11982 of the original 32,000 is unsolvable). Reduced-cell variants have much lower solvability rates — 1-Cell FreeCell is only about 10% solvable. Baker\'s Game is around 75% solvable.',
  },
];

export default function FreecellVariantsPage() {
  if (!isOwnedBy(ROUTE, siteConfig.key)) notFound();

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'FreeCell Variants — 9+ Ways to Play FreeCell Solitaire',
      description:
        'A comprehensive guide to every FreeCell variant, from beginner-friendly Easy FreeCell to expert 1-Cell FreeCell, plus competitive modes.',
      author: {
        '@type': 'Organization',
        name: 'Solitaire Stack Editorial Team',
        url: absoluteUrl('/authors/editorial-team'),
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.siteName,
      },
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl(ROUTE),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'FreeCell Variants',
          item: absoluteUrl('/freecell-variants'),
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 pb-20 space-y-6">
        {/* Hero */}
        <ContentHero
          kicker="Editorial Team"
          title="FreeCell Variants"
          subtitle="From beginner-friendly Easy FreeCell to the punishing 1-Cell mode, there are 9+ ways to play. Find the variant that matches your skill level — or try them all."
        />

        <div className="-mt-2 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="editorial-team"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <ContentBody variant="dark" className="space-y-4">
            <p>
              FreeCell is not a single game — it is a family of solitaire variants that share the
              same core mechanic: open free cells for temporary card storage. By changing the number
              of free cells, the stacking rules, or the starting layout, each variant creates a
              distinct challenge. Some are nearly always solvable. Others will test even the best
              players.
            </p>
            <p>
              This page is your guide to every FreeCell variant available on {siteConfig.siteName},
              plus the competitive modes that add time pressure and daily challenges to the mix.
            </p>
          </ContentBody>
        </CardSection>

        {/* Classic FreeCell Modes */}
        <CardSection id="classic-modes" variant="dark">
          <SectionHeading variant="dark" sub="The Originals" id="classic-modes-heading">
            Classic FreeCell Modes
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/"
                title="FreeCell"
                description="The classic. 4 free cells, 8 cascades, 99.999% solvable."
                icon="♠"
              />
              <ContentLinkCard
                href="/bakers-game"
                title="Baker's Game"
                description="Same-suit stacking. The original FreeCell ancestor."
                icon="♥"
              />
              <ContentLinkCard
                href="/eight-off"
                title="Eight Off"
                description="8 free cells, same-suit stacking. More room, stricter rules."
                icon="♦"
              />
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Difficulty Variants */}
        <CardSection id="difficulty-variants" variant="dark">
          <SectionHeading variant="dark" sub="Adjust the Challenge" id="difficulty-heading">
            Difficulty Variants
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/easy-freecell"
                title="Easy FreeCell"
                description="Aces and 2s start on foundations. Beginner-friendly."
                icon="🟢"
              />
              <ContentLinkCard
                href="/freecell/3-cell"
                title="3-Cell FreeCell"
                description="One fewer free cell. Noticeably harder."
                icon="3️⃣"
              />
              <ContentLinkCard
                href="/freecell/2-cell"
                title="2-Cell FreeCell"
                description="Two free cells. Expert territory."
                icon="2️⃣"
              />
              <ContentLinkCard
                href="/freecell/1-cell"
                title="1-Cell FreeCell"
                description="One free cell. Extreme difficulty. ~10% solvable."
                icon="1️⃣"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* Competitive Modes */}
        <CardSection id="competitive-modes" variant="dark">
          <SectionHeading variant="dark" sub="Test Yourself" id="competitive-heading">
            Competitive Modes
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-3">
              <ContentLinkCard
                href="/daily-freecell"
                title="Daily FreeCell"
                description="Same deal worldwide. Compare your solution."
                icon="📅"
              />
              <ContentLinkCard
                href="/streak"
                title="Streak Mode"
                description="Win consecutive games. How far can you go?"
                icon="🔥"
              />
              <ContentLinkCard
                href="/storm"
                title="Storm Mode"
                description="Speed challenge. Beat the clock."
                icon="⚡"
              />
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Learning order and progression */}
        <CardSection id="learning-order" variant="dark">
          <SectionHeading variant="dark" sub="Progression" id="learning-order-heading">
            A recommended learning order
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              If you are starting from zero or coming to
              the FreeCell family from another solitaire
              game, the Research Desk recommends a specific
              progression. Follow it and you will build
              intuition in the right order instead of
              bouncing between variants and confusing
              yourself.
            </p>
            <p>
              <strong>Step one: Easy FreeCell.</strong> Win
              ten games. This introduces you to tableau
              stacking, cell mechanics, and foundation
              building without the pressure of finding
              buried Aces. You are learning the motions.
            </p>
            <p>
              <strong>Step two: standard four-cell
              FreeCell.</strong> Play fifty deals in order
              from deal #1 onwards. The low-numbered deals
              are gentle on purpose, and this gets you to
              a respectable win rate with minimal tilt.
            </p>
            <p>
              <strong>Step three: three-cell FreeCell.</strong>{' '}
              Play twenty deals. The reduced cell count
              exposes any loose cell habits you picked up
              at four cells. Fix those habits here and
              your standard FreeCell win rate climbs.
            </p>
            <p>
              <strong>Step four: Baker&apos;s Game or
              Eight Off.</strong> Play twenty deals of
              whichever appeals to you. You are now
              learning same-suit stacking and building
              suit-run discipline, which will pay off if
              you ever return to standard FreeCell.
            </p>
            <p>
              <strong>Step five (optional): two-cell or
              Seahaven.</strong> Reach for the genuine
              challenge variants once you are comfortable
              in the rest of the family. At this stage you
              are no longer learning the mechanics; you
              are learning how to play with less slack.
            </p>
            <p>
              <strong>Step six (optional, punishing):
              one-cell FreeCell.</strong> Play this variant
              on days when you want to think hard. Losing
              is fine — the point is to force deeper
              planning than the other variants demand.
            </p>
            <p>
              Following this progression produces better
              players, faster, than bouncing between
              variants without a plan. It is roughly what
              we recommend to friends who say they want
              to get serious about the game, and it is
              the sequence we used when onboarding new
              Strategy Desk contributors.
            </p>
            <p>
              One additional tip: note your win rates per
              variant. A player who wins ninety percent
              of standard FreeCell and sixty percent of
              Baker&apos;s Game is learning real
              information about their own cell-usage
              habits — the gap is telling them something
              specific about same-suit stacking. Treat
              the variants as diagnostic tools for your
              own play, not just as different games. Our{' '}
              <Link href="/statistics" className="text-[#D4AF37] hover:underline">
                statistics page
              </Link>{' '}
              tracks win rates per variant automatically
              once you play a few games in each mode.
            </p>
          </ContentBody>
        </CardSection>

        {/* Solvability reference */}
        <CardSection id="solvability-reference" variant="dark">
          <SectionHeading variant="dark" sub="The Numbers Behind The Variants" id="solvability-reference-heading">
            Solvability across the family
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Solvability numbers for FreeCell variants
              come from a mix of exhaustive verification
              (for the Microsoft 32,000) and large-scale
              solver simulations (for random deals in each
              variant). The figures we cite are consensus
              numbers from solver research — treat them as
              reliable but not mathematically perfect. For
              the full methodology discussion, see our{' '}
              <Link href="/freecell-solvability" className="text-[#D4AF37] hover:underline">
                FreeCell solvability
              </Link>{' '}
              guide.
            </p>
            <p>
              The short version: standard four-cell
              FreeCell is the sweet spot. Adding cells
              makes the game easier; removing cells makes
              it harder. Switching to same-suit stacking
              makes it substantially harder unless you
              compensate with extra cells or columns.
              Every variant trades off difficulty against
              one of those levers.
            </p>
            <p>
              An interesting observation: the variants
              cluster into two solvability bands. The
              high-solvability band (ninety-nine percent
              or higher) includes Easy FreeCell, standard
              FreeCell, and three-cell FreeCell. The
              mid-solvability band (seventy-five to ninety
              percent) includes Baker&apos;s Game, Eight
              Off, Seahaven Towers, Penguin, and two-cell
              FreeCell. One-cell FreeCell sits alone in a
              low-solvability band around ten percent. The
              gap between bands is sharp, not gradual,
              which is why trying to rank variants by
              finely-graded difficulty rarely works. In
              practice, you are choosing a band first and
              a variant within the band second.
            </p>
            <p>
              We also note that variant solvability figures
              assume perfect play. Human win rates in each
              variant will always be lower than the
              solvability ceiling. The gap between your
              observed win rate and the theoretical ceiling
              is your improvement headroom, and as we
              noted above, that headroom is roughly
              equivalent to the gap between novice and
              expert play in standard FreeCell.
            </p>
            <p>
              For a historical perspective on where these
              numbers came from, see our dedicated{' '}
              <Link href="/why-freecell-is-almost-always-solvable" className="text-[#D4AF37] hover:underline">
                why FreeCell is almost always solvable
              </Link>{' '}
              discussion, which walks through the
              intuition that makes the four-cell variant
              so reliably winnable and explains why each
              knob in the family changes the number in the
              direction it does.
            </p>
          </ContentBody>
        </CardSection>

        {/* Other Solitaire Games */}
        <CardSection id="other-solitaire" variant="dark">
          <SectionHeading variant="dark" sub="Beyond FreeCell" id="other-solitaire-heading">
            Other Solitaire Games
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/spider"
                title="Spider Solitaire"
                description="10 columns, build sequences in suit. A different kind of challenge."
                icon="🕷️"
              />
              <ContentLinkCard
                href="/klondike"
                title="Klondike"
                description="The world's most popular solitaire. Draw from the stock, build on foundations."
                icon="♣"
              />
            </div>
          </ContentBody>
        </CardSection>

        {/* Family tree intro */}
        <CardSection id="family-tree" variant="dark">
          <SectionHeading variant="dark" sub="A Shared Ancestry" id="family-tree-heading">
            The FreeCell family tree
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Every game on this page shares common DNA:
              tableau columns plus temporary &ldquo;cells&rdquo;
              plus four foundations. The differences are in
              which rules are relaxed or tightened. Walk
              through the family tree once and the whole set
              becomes easier to navigate.
            </p>
            <p>
              The root of the tree is Baker&apos;s Game,
              which predates FreeCell by decades. Baker&apos;s
              Game uses four cells, eight columns, and
              same-suit tableau stacking. Paul Alfille
              relaxed the stacking rule to alternating-colour
              in 1978 to produce FreeCell, which became the
              best-known member of the family. Eight Off
              added four more cells to Baker&apos;s Game and
              kept same-suit stacking. Seahaven Towers
              reshaped the tableau into ten narrower columns.
              Penguin changed the starting layout and began
              with Aces already on the foundation. Cell
              variants of FreeCell (one-cell through
              three-cell) shrink the available cells while
              keeping everything else constant. Easy FreeCell
              pre-places low cards.
            </p>
            <p>
              Once you understand which knob each variant
              turns — stacking rule, cell count, column
              geometry, starting layout — the tradeoffs
              become easy to reason about. More cells make
              the game easier. Same-suit stacking makes it
              harder. Wider columns make cleanup slower but
              more flexible. Prefilled foundations are
              strictly easier. The rest of this page walks
              through each variant in detail.
            </p>
            <p>
              Think of the family as a set of deliberate
              difficulty dials. Every variant is the same
              core game adjusted in one direction, and
              comparing them side by side teaches you what
              each rule actually contributes to the
              FreeCell experience. A player who wins
              ninety percent of standard games but only
              fifty percent of Baker&apos;s Game has
              discovered, concretely, what
              alternating-colour stacking is doing for
              them. The family is both a set of games to
              play and a diagnostic tool for understanding
              your own habits at the table.
            </p>
          </ContentBody>
        </CardSection>

        {/* Deep dive: Baker's Game */}
        <CardSection id="bakers-game-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="The Original Ancestor" id="bakers-game-heading">
            Baker&apos;s Game
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Baker&apos;s Game is the direct ancestor of
              FreeCell. It uses the same eight-column tableau,
              the same four cells, and the same foundation
              structure, but with one critical difference:
              tableau stacking is same-suit rather than
              alternating-colour. Building a Seven of hearts
              onto an Eight of diamonds is legal in FreeCell;
              in Baker&apos;s Game it is not. Only a Seven of
              diamonds works there.
            </p>
            <p>
              This single rule change transforms the game.
              Same-suit stacking means you have exactly one
              legal receiving card for any tableau move (the
              card of the right rank and suit), not two.
              That halves your move options and makes
              columns much harder to empty. Solvability
              collapses from 99.999 percent to roughly
              seventy-five percent, which is still higher
              than most solitaire games but dramatically
              harder than FreeCell.
            </p>
            <p>
              Baker&apos;s Game rewards patient, one-suit-at-a-
              time play. Strong players build long suit runs
              in the tableau and feed the corresponding
              foundation aggressively. Cell discipline is
              even more important than in FreeCell because
              cells are often the only place to park
              off-suit cards that would otherwise block
              progress. Read the full rules on our{' '}
              <Link href="/bakers-game" className="text-[#D4AF37] hover:underline">
                Baker&apos;s Game
              </Link>{' '}
              page.
            </p>
            <p>
              The historical context matters: Baker&apos;s
              Game is named for C. L. Baker, a mid-twentieth-
              century solitaire player whose father-in-law
              reportedly taught him the game. It was
              documented in Martin Gardner&apos;s 1968
              &ldquo;Mathematical Games&rdquo; column, where
              it caught the attention of an obscure medical
              student at the University of Illinois named
              Paul Alfille. Ten years later, Alfille had
              built PLATO FreeCell by changing one rule.
              Baker&apos;s Game is the variant every FreeCell
              player should try at least once, because it
              reveals exactly what alternating-colour
              stacking is doing for you.
            </p>
          </ContentBody>
        </CardSection>

        {/* Deep dive: Eight Off */}
        <CardSection id="eight-off-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="More Cells, Same-Suit" id="eight-off-heading">
            Eight Off
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Eight Off doubles FreeCell&apos;s four cells to
              eight and uses same-suit tableau stacking. The
              extra cells more than compensate for the
              stricter stacking rule, producing a solvability
              rate around eighty-nine percent — harder than
              FreeCell, but much more forgiving than
              Baker&apos;s Game.
            </p>
            <p>
              With eight cells you rarely run into cell
              pressure. Instead, the challenge shifts to
              managing column economy and avoiding
              same-suit jams. Strong Eight Off play focuses
              on picking a target foundation and feeding it
              methodically, using the abundant cell space to
              stage off-suit cards while you build single-suit
              runs in the tableau.
            </p>
            <p>
              Eight Off suits players who find FreeCell&apos;s
              cell discipline stressful but still want the
              full-visibility, no-luck solitaire experience.
              See{' '}
              <Link href="/eight-off" className="text-[#D4AF37] hover:underline">
                Eight Off
              </Link>{' '}
              for the full rules and example layout.
            </p>
            <p>
              One small layout quirk: in the canonical Eight
              Off deal, six of the cells start with a card
              already in them, leaving two empty. This
              detail affects opening play — you are not
              starting with all eight cells open, so the
              opening move-count is tighter than the raw
              &ldquo;eight cells&rdquo; figure suggests. As
              you clear those pre-filled cells, the game
              opens up and the extra storage starts paying
              off. Players coming from FreeCell sometimes
              misjudge this on their first few Eight Off
              games. Adjust your opening plans accordingly.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* Deep dive: Seahaven Towers */}
        <CardSection id="seahaven-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="Narrow Columns, Tight Cells" id="seahaven-heading">
            Seahaven Towers
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Seahaven Towers uses ten tableau columns of
              five cards each plus four cells, with same-suit
              tableau stacking. The extra columns provide
              more structural space than FreeCell, but the
              same-suit rule and the narrower column depth
              push difficulty up. Solvability sits in roughly
              the same range as Baker&apos;s Game.
            </p>
            <p>
              The narrower columns make Seahaven a
              fundamentally different game. Emptying a
              column is cheaper (only five cards to clear
              instead of seven), but same-suit stacking
              means emptying one and then stacking onto it
              usefully requires more specific card
              availability. The two Aces that begin on the
              foundation in some rule variants give you a
              head start on two suits and let you focus
              early tableau play on the other two. See the{' '}
              <Link href="/seahaven" className="text-[#D4AF37] hover:underline">
                Seahaven
              </Link>{' '}
              page for the canonical ruleset.
            </p>
          </ContentBody>
        </CardSection>

        {/* Deep dive: Penguin */}
        <CardSection id="penguin-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="Different Tableau" id="penguin-heading">
            Penguin
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Penguin keeps the four-cell structure but
              starts with a seven-column tableau and a
              distinctive &ldquo;flipper&rdquo; card layout.
              Aces begin on the foundations, so the opening
              is not about hunting for them. Instead, you
              are building tableau sequences that will
              eventually feed the already-started
              foundations.
            </p>
            <p>
              Penguin is moderately harder than FreeCell
              because the tableau geometry produces awkward
              blocker situations that the four cells cannot
              always resolve. It appeals to players who
              like the FreeCell cell mechanic but want a
              different opening texture. See{' '}
              <Link href="/penguin" className="text-[#D4AF37] hover:underline">
                Penguin
              </Link>{' '}
              for the rules walkthrough.
            </p>
            <p>
              The practical implication of the pre-placed
              Aces is that early Penguin play can feel
              aimless compared to FreeCell. In FreeCell, the
              opening is all about Ace exposure. In Penguin,
              that pressure is gone, and you have to invent
              your own structure. Strong Penguin players
              identify one or two target suits early, build
              long tableau runs in those suits, and use the
              cells to hold the blockers that would
              otherwise stall a run. The game rewards a
              slower rhythm than FreeCell and a willingness
              to plan five or six moves ahead before
              committing.
            </p>
          </ContentBody>
        </CardSection>

        {/* Deep dive: Cell variants */}
        <CardSection id="cell-variants-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="Shrinking The Cells" id="cell-variants-heading">
            1-cell, 2-cell, and 3-cell FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              These are difficulty variants of standard
              four-cell FreeCell: same tableau, same
              alternating-colour stacking, fewer cells. The
              impact is non-linear. Three-cell drops
              solvability only slightly (to roughly ninety-nine
              percent), because a single lost cell is a
              manageable handicap. Two-cell drops more
              sharply (to roughly eighty-five percent),
              because the supermove formula loses a full
              multiplier. One-cell collapses to roughly ten
              percent, because with only one temporary
              storage slot, most dependency cycles become
              impossible to unwind.
            </p>
            <p>
              Three-cell is a good training variant: it
              punishes loose cell usage without being
              punishing overall. Two-cell is where cell
              discipline becomes a genuine skill — every
              cell fill has to be accounted for, and
              premature commitments cost games reliably.
              One-cell is almost a different game. It
              demands extreme planning and produces a very
              different rhythm, because you are often
              looking for sequences that require no
              temporary storage at all.
            </p>
            <p>
              Strong players use cell-variant FreeCell as a
              difficulty dial. On a day when four-cell feels
              trivial, three-cell adds just enough friction.
              When three-cell feels routine, two-cell
              sharpens your planning. One-cell is a
              specialty mode that rewards deep lookahead and
              punishes intuition. Play the variants at{' '}
              <Link href="/freecell/3-cell" className="text-[#D4AF37] hover:underline">/freecell/3-cell</Link>
              ,{' '}
              <Link href="/freecell/2-cell" className="text-[#D4AF37] hover:underline">/freecell/2-cell</Link>
              , and{' '}
              <Link href="/freecell/1-cell" className="text-[#D4AF37] hover:underline">/freecell/1-cell</Link>
              .
            </p>
          </ContentBody>
        </CardSection>

        {/* Deep dive: Easy FreeCell */}
        <CardSection id="easy-freecell-deep-dive" variant="dark">
          <SectionHeading variant="dark" sub="The Beginner On-Ramp" id="easy-freecell-heading">
            Easy FreeCell
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Easy FreeCell starts with the four Aces and
              all four Twos already placed on the
              foundations. That gives you an immediate
              head start and removes the hardest
              opening-theory problem (tracking the buried
              Aces). Solvability approaches one hundred
              percent, and win rates climb accordingly.
            </p>
            <p>
              Easy FreeCell exists for two reasons. First,
              it gives beginners a version they can win
              reliably while they learn the core mechanics:
              tableau stacking, cell usage, and foundation
              building. Second, it serves as a warm-up mode
              for experienced players. Some strong players
              use Easy FreeCell as a low-friction way to
              work on sequence-building habits without the
              Ace-hunt pressure of the standard game. See{' '}
              <Link href="/easy-freecell" className="text-[#D4AF37] hover:underline">
                Easy FreeCell
              </Link>{' '}
              to try it.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* When to play each */}
        <CardSection id="when-to-play" variant="dark">
          <SectionHeading variant="dark" sub="Choosing A Variant" id="when-to-play-heading">
            When to play each variant
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              There is no single best FreeCell variant. The
              right choice depends on your mood, your
              experience level, and how much time you have.
              Here is the Research Desk&apos;s short guide
              to matching variant to moment.
            </p>
            <p>
              <strong>If you are learning the family:</strong>{' '}
              start with Easy FreeCell to win your first
              games, then move to standard four-cell
              FreeCell once you understand the mechanics.
              This is the order we recommend for all new
              players.
            </p>
            <p>
              <strong>If you want a relaxing session:</strong>{' '}
              standard FreeCell or Eight Off. Both are
              solvable at very high rates and reward
              careful play without punishing small
              mistakes.
            </p>
            <p>
              <strong>If you want a clean challenge:</strong>{' '}
              three-cell or Baker&apos;s Game. These
              variants demand better discipline than
              standard FreeCell without collapsing into
              brutal difficulty.
            </p>
            <p>
              <strong>If you want a genuine test:</strong>{' '}
              two-cell FreeCell, Seahaven Towers, or
              Penguin. Each of these will bend the game
              against you in a specific direction, and
              winning them feels meaningfully harder-earned
              than winning standard FreeCell.
            </p>
            <p>
              <strong>If you want punishment:</strong>{' '}
              one-cell FreeCell. It is the hardest variant
              in the family and will teach you more about
              planning than any other mode we offer. Expect
              to lose most games while you learn it.
            </p>
            <p>
              Time commitment also matters. Eight Off and
              Easy FreeCell average roughly five to eight
              minutes per game for careful players.
              Standard FreeCell averages eight to twelve.
              Baker&apos;s Game and Seahaven Towers push
              closer to ten to fifteen. One-cell FreeCell,
              when it is solvable, often takes twenty
              minutes of deep thinking per deal. If you
              have a spare five minutes, Easy FreeCell or
              a gentle deal in standard FreeCell is
              probably the right choice. If you have an
              evening, one-cell or Seahaven Towers will
              reward the investment.
            </p>
          </ContentBody>
        </CardSection>

        {/* Variant strategies contrast */}
        <CardSection id="strategy-contrast" variant="dark">
          <SectionHeading variant="dark" sub="How Strategy Differs" id="strategy-contrast-heading">
            How strategy differs across variants
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              Variants do not just change difficulty. They
              change what &ldquo;good play&rdquo; looks
              like. A habit that wins at FreeCell can be
              actively wrong in Baker&apos;s Game, and a
              Seahaven reflex can get you killed in
              one-cell. Here are the biggest strategy
              differences we notice when we switch between
              variants at the Strategy Desk.
            </p>
            <p>
              <strong>Cell discipline scales with scarcity.</strong>{' '}
              In Eight Off with eight cells, parking a
              card is cheap — you rarely run out of
              storage. In one-cell, every fill is almost
              certainly the last one, so you only spend
              the cell on moves that visibly unblock the
              position. Standard FreeCell sits between
              those extremes. Calibrate your willingness
              to fill a cell to the variant you are
              playing; a reflex that works at four cells
              will cost you games at two.
            </p>
            <p>
              <strong>Suit awareness scales with stacking
              strictness.</strong> In alternating-colour
              variants (FreeCell, Easy FreeCell, cell
              variants), you think in colours: red on
              black, black on red. In same-suit variants
              (Baker&apos;s Game, Eight Off, Seahaven), you
              think in suits: hearts on hearts, clubs on
              clubs. The shift is subtle but consequential.
              Same-suit variants reward building complete
              suit runs; alternating-colour variants
              reward faster, more opportunistic sequence
              building.
            </p>
            <p>
              <strong>Column value scales with count.</strong>{' '}
              Eight columns (standard FreeCell,
              Baker&apos;s Game, Eight Off) make every
              column precious. Ten columns (Seahaven)
              make columns cheaper — you can open one
              without panic. The supermove formula treats
              empty columns as doubling multipliers, so
              variants with more columns produce longer
              movable runs at similar cell states, which
              changes how aggressively you can cascade.
            </p>
            <p>
              The broad conclusion: a strong FreeCell
              player who wants to expand into the family
              should consciously adjust their habits for
              each variant rather than transferring
              instincts directly. The rewards for doing
              so are substantial — each variant teaches a
              slightly different planning muscle, and the
              combined effect on your standard FreeCell
              play is noticeable within a few dozen
              cross-variant games.
            </p>
          </ContentBody>
        </CardSection>

        {/* Difficulty Comparison Table */}
        <CardSection id="comparison" variant="dark">
          <SectionHeading variant="dark" sub="At a Glance" id="comparison-heading">
            Difficulty Comparison
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 font-semibold text-[#D4AF37]">Variant</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Free Cells</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Stacking Rule</th>
                    <th className="py-3 px-4 font-semibold text-[#D4AF37]">Solvability</th>
                    <th className="py-3 pl-4 font-semibold text-[#D4AF37]">Difficulty</th>
                  </tr>
                </thead>
                <tbody className="text-white/70">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/" className="hover:text-[#D4AF37] transition-colors">FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">99.999%</td>
                    <td className="py-3 pl-4">⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/easy-freecell" className="hover:text-[#D4AF37] transition-colors">Easy FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~100%</td>
                    <td className="py-3 pl-4">⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/bakers-game" className="hover:text-[#D4AF37] transition-colors">Baker&apos;s Game</Link>
                    </td>
                    <td className="py-3 px-4">4</td>
                    <td className="py-3 px-4">Same suit</td>
                    <td className="py-3 px-4">~75%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/eight-off" className="hover:text-[#D4AF37] transition-colors">Eight Off</Link>
                    </td>
                    <td className="py-3 px-4">8</td>
                    <td className="py-3 px-4">Same suit</td>
                    <td className="py-3 px-4">~89%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/3-cell" className="hover:text-[#D4AF37] transition-colors">3-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">3</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~99%</td>
                    <td className="py-3 pl-4">⭐⭐⭐</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/2-cell" className="hover:text-[#D4AF37] transition-colors">2-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">2</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~85%</td>
                    <td className="py-3 pl-4">⭐⭐⭐⭐</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">
                      <Link href="/freecell/1-cell" className="hover:text-[#D4AF37] transition-colors">1-Cell FreeCell</Link>
                    </td>
                    <td className="py-3 px-4">1</td>
                    <td className="py-3 px-4">Alternating color</td>
                    <td className="py-3 px-4">~10%</td>
                    <td className="py-3 pl-4">⭐⭐⭐⭐⭐</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* FAQ */}
        <CardSection id="faq" variant="dark">
          <SectionHeading variant="dark" sub="Common Questions" id="faq-heading">
            Frequently Asked Questions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            {faqItems.map((faq) => (
              <div key={faq.question} className="bg-white/[0.05] border border-white/[0.07] rounded-xl p-5">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-sm leading-7 text-white/70">{faq.answer}</p>
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* CTA */}
        <CtaSection
          heading="Find Your Perfect Variant"
          body="Whether you want a relaxing game or a brutal challenge, there's a FreeCell variant for you. Jump in — no account needed."
          primaryLabel="Play Classic FreeCell"
          secondaryLabel="Try 1-Cell FreeCell"
          secondaryHref="/freecell/1-cell"
        />

        {/* Related Pages */}
        <CardSection id="related" variant="dark">
          <SectionHeading variant="dark" sub="Keep Reading" id="related-heading">
            Related Pages
          </SectionHeading>
          <ContentBody variant="dark">
            <div className="grid gap-4 md:grid-cols-2">
              <ContentLinkCard
                href="/how-to-play"
                title="How to Play FreeCell"
                description="Learn the rules and mechanics of FreeCell Solitaire from scratch."
              />
              <ContentLinkCard
                href="/strategy"
                title="Strategy Guide"
                description="Advanced techniques for winning more games across all FreeCell variants."
              />
              <ContentLinkCard
                href="/solitaire-types"
                title="Solitaire Types"
                description="Explore the full world of solitaire beyond FreeCell."
              />
              <ContentLinkCard
                href="/is-every-freecell-game-winnable"
                title="Is Every Game Winnable?"
                description="The math behind FreeCell solvability and the famous unsolvable deal #11982."
              />
            </div>
          </ContentBody>
        </CardSection>
      </main>
    </ContentLayout>
  );
}
