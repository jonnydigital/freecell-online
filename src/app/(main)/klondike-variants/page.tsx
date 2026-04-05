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

const PAGE_PATH = "/klondike-variants";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `Klondike Solitaire Variants: Thoughtful to Westcliff | ${siteConfig.siteName}`,
  description:
    "A tour of the Klondike family: Thoughtful Solitaire, Easthaven, Westcliff, Whitehead, Russian Solitaire, Yukon, Joker Klondike, Vegas Klondike, and the Spider connection.",
  keywords: [
    "klondike variants",
    "klondike solitaire variants",
    "thoughtful solitaire",
    "easthaven solitaire",
    "westcliff solitaire",
    "whitehead solitaire",
    "russian solitaire",
    "yukon solitaire",
    "joker klondike",
  ],
  openGraph: {
    title: "Klondike Solitaire Variants: Thoughtful to Westcliff",
    description:
      "A guided tour of the Klondike family of solitaire games, from research-grade Thoughtful to crowd-favourite Yukon.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function KlondikeVariantsPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Klondike Solitaire Variants: Thoughtful to Westcliff",
      description:
        "A guide to the Klondike family of solitaire games: Thoughtful, Easthaven, Westcliff, Whitehead, Russian Solitaire, Yukon, Joker Klondike, Vegas Klondike, and the relationship between Klondike and Spider.",
      author: {
        "@type": "Organization",
        name: "The History Desk and Rules Desk",
        url: absoluteUrl("/authors/the-history-desk"),
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Klondike Variants",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Klondike Solitaire Variants: Thoughtful to Westcliff"
        subtitle="The Klondike family tree: research-grade Thoughtful, stockless Easthaven and Yukon, Russian&apos;s same-suit challenge, and how Spider shares the lineage."
        kicker="Klondike Family"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-history-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Introduction" id="intro" icon={"\u2660"}>
            A family tree wider than any other solitaire
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike has more named variants than almost any other
              solitaire. Part of that is historical accident: Klondike
              was the default patience for Anglophone households
              through the twentieth century, and defaults spawn
              variations. Part of it is structural: the seven-column
              tableau, the stock-and-waste mechanism, and the
              alternating-color building rule give designers a lot of
              knobs to turn. Make the cards all face-up; take away the
              stock; change the color rule; allow same-suit moves;
              add a Joker. Every turn produces a new game with its
              own identity, and several of those new games have
              outlived their parents in regional play. This page
              walks the family tree, naming the variants that matter
              and explaining how each one changes what Klondike feels
              like at the table.
            </p>
            <p>
              The variants we cover below range from research-grade
              to crowd-favourite. Thoughtful is the full-information
              testbed that academics use for solvability proofs.
              Easthaven trades the stock pile for staggered deals.
              Westcliff is the shorter, friendlier version for
              teaching. Whitehead bridges the gap toward FreeCell.
              Russian Solitaire is the punishing same-suit challenge.
              Yukon abolishes the stock in favour of freeform
              stacking. Joker Klondike is the children&apos;s wild-card
              variant. Vegas Klondike is the scoring overlay, and
              Spider&apos;s relationship to Klondike rounds out the
              lineage. Each variant trades one specific Klondike
              element for a different one, and each trade changes
              the feel of the game in a knowable way.
            </p>
          </ContentBody>
        </CardSection>

        {/* Thoughtful */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Thoughtful" id="thoughtful" icon={"\u2665"}>
            Thoughtful Solitaire
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Thoughtful Solitaire is Klondike with every card visible
              from the first move. The tableau is dealt face-up, the
              stock is dealt face-up, and the player has complete
              information. The rules of movement are otherwise
              identical: alternating-color descending on the tableau,
              suited ascending on the foundations, Kings only on
              empty columns. What changes is the nature of the puzzle.
              With full information, the game becomes a pure planning
              exercise, and difficulty stops being about discovery and
              starts being about sequencing.
            </p>
            <p>
              In practical play, Thoughtful sits between a puzzle
              book and a standard game. Players often use it to
              study positions they lost in regular Klondike: they
              reconstruct the deal with all cards face-up, then
              analyze whether the deal was solvable and where they
              went wrong. That study practice &mdash; replaying lost
              deals in Thoughtful mode &mdash; is one of the most
              effective ways to improve Klondike play, because it
              separates &quot;unsolvable deal&quot; from &quot;player
              error&quot; in a clean, provable way.
            </p>
            <p>
              Thoughtful matters to researchers because it is the
              canonical testbed for Klondike solvability. Since every
              card is visible, a solver can plan a full game tree
              without worrying about hidden-state branching. That
              makes Thoughtful the natural setting for provable
              solvability results: a deal is solvable if and only if
              a winning sequence exists, and a solver can in
              principle enumerate the moves. The Bjarnason et al. 2007
              paper we cite on our{" "}
              <Link
                href="/klondike-probability"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Klondike probability page
              </Link>{" "}
              used Thoughtful as its baseline framework.
            </p>
            <p>
              The name itself is a hint at the game&apos;s purpose.
              &quot;Thoughtful&quot; contrasts with the reflex play
              that standard Klondike sometimes invites. In standard
              Klondike, a player can move quickly, react to what the
              stock reveals, and finish a deal in ten minutes without
              sustained planning. In Thoughtful, reflex is useless;
              the whole game is a planning problem. Players who
              enjoy chess problems or end-game studies tend to enjoy
              Thoughtful for the same reason &mdash; it rewards slow,
              deliberate reasoning over the entire sequence rather
              than in-the-moment reaction.
            </p>
            <p>
              Strategy in Thoughtful is different from standard
              Klondike in one clarifying way: there is no reason to
              hold back on planning. Every long chain of foundation
              sends can be pre-computed, and the only question is
              whether the chain exists. Human players who try
              Thoughtful sometimes find it unsatisfying &mdash; the
              discovery aspect of Klondike is gone &mdash; but those
              who enjoy pure puzzle-solving find it rewarding. A
              solved Thoughtful deal is a small proof.
            </p>
          </ContentBody>
        </CardSection>

        {/* Easthaven */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Easthaven" id="easthaven" icon={"\u2666"}>
            Easthaven
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Easthaven is Klondike reconfigured as a deal-and-play
              game. It is one of the older documented Klondike
              relatives, appearing in mid-twentieth-century patience
              compendiums under several spellings. The essential
              idea is that the stock pile is not a fishing tool; it
              is a series of forced injections that the player must
              accept.
            </p>
            <p>
              Easthaven is Klondike reconfigured as a deal-and-play
              game. The tableau has seven columns but no separate
              stock and waste; instead, a reserve holds the remaining
              cards, and the player deals a new row of seven cards
              across the tableau whenever they run out of legal
              moves. Three deals total across the game, so the player
              has twenty-one reserve cards stretched into three
              injections of seven. Between deals, the game is
              standard Klondike &mdash; alternating-color descending
              on the tableau, same-suit ascending on the foundations.
            </p>
            <p>
              The strategic identity of Easthaven is built around
              those three deals. Each deal commits the player to
              seven new face-up cards landing on top of existing
              columns, potentially burying cards they were saving.
              The discipline is to sequence tableau work so that
              nothing important is on top of a column when the next
              deal comes. Players who treat Easthaven as &quot;just
              Klondike with extra dealing&quot; end up with columns
              stacked in useless orders; players who read the
              approaching deal and empty columns strategically
              finish much more often.
            </p>
            <p>
              The three-deal limit also teaches a discipline
              unfamiliar in standard Klondike: anticipating the
              incoming row. Experienced Easthaven players think in
              terms of &quot;what needs to be clear before the next
              deal?&quot; Every time a column is full of useful
              sequences that are about to be buried by new cards,
              the player faces a forced choice: finish that column
              now, or accept burial. The rhythm of Easthaven is
              therefore less about the whole game and more about
              three distinct phases separated by the deals. A strong
              Easthaven player treats each phase as its own mini-game
              with its own local goals.
            </p>
            <p>
              Easthaven win rates sit below Klondike because the
              dealt cards land unpredictably and the three-deal
              limit produces more locked positions. Because there
              is no stock cycling, a player cannot fish for needed
              cards; the game pushes cards at the player on its own
              schedule. That changes the feel entirely: standard
              Klondike rewards planning plus patience, Easthaven
              rewards planning plus speed.
            </p>
          </ContentBody>
        </CardSection>

        {/* Westcliff */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Westcliff" id="westcliff" icon={"\u2660"}>
            Westcliff
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Westcliff is the friendlier, shorter Klondike. It is a
              variant that predates the digital era and survived
              into the twentieth-century patience canon because it
              hits a sweet spot: recognizable Klondike mechanics
              with faster completion and less frustration. Several
              published compendiums list Westcliff alongside standard
              Klondike as a reasonable everyday alternative.
            </p>
            <p>
              Westcliff is the friendlier, shorter Klondike. It deals
              thirty cards face-up into ten columns of three, starts
              the foundations with aces already placed, and runs
              through the stock in a single pass. Everything about
              the game points toward faster wins and lower frustration.
              The 30-card face-up layout means full information from
              the first move; the ace-primed foundations mean the
              scoring starts already in progress; the single stock
              pass keeps the game short.
            </p>
            <p>
              Westcliff is often recommended as a gateway variant for
              players who find standard Klondike too punishing. Win
              rates in Westcliff are higher than standard Klondike
              across both casual and experienced play, and games
              typically finish in three to five minutes instead of
              ten to fifteen. That combination makes Westcliff a
              reasonable choice for quick sessions or for teaching
              new players Klondike mechanics without the
              hidden-state complication.
            </p>
            <p>
              The ace-primed foundations are an interesting design
              choice. In standard Klondike, a significant fraction of
              early game time goes into finding and mobilizing the
              aces. Westcliff skips that stage entirely: the aces
              are already home when the deal begins. That shifts the
              game&apos;s centre of gravity from ace-hunting to
              chain-building, making the experience more about
              getting cards into long sequences than about
              bootstrapping the foundations.
            </p>
            <p>
              Strategically, Westcliff is close to Thoughtful with
              a time limit. Every card is visible, so planning is
              the skill, but the single-pass stock adds a scarcity
              constraint that Thoughtful lacks. Players who have
              played Thoughtful often transition easily to
              Westcliff; players coming from standard Klondike find
              the full-information layout takes some adjustment.
            </p>
          </ContentBody>
        </CardSection>

        {/* Whitehead */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Whitehead" id="whitehead" icon={"\u2665"}>
            Whitehead
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Whitehead is one of the more interesting Klondike
              relatives because it changes two defining rules at
              once. Either change on its own would be modest; both
              together produce a game with its own identity. The
              variant is not widely played today, which is a shame
              &mdash; it rewards strategic thinking in a way that
              neither parent game fully does.
            </p>
            <p>
              Whitehead keeps the Klondike seven-column layout but
              changes two rules that define the game. First, all
              cards are face-up from the start, so information is
              complete. Second, tableau building is same-color
              descending rather than alternating-color. A red 7 goes
              on a red 8, a black 6 goes on a black 7, and only
              same-suit groups move as units.
            </p>
            <p>
              The same-color rule pulls Whitehead toward FreeCell&apos;s
              visibility and Spider&apos;s suit-sensitivity at once. It
              feels like a bridge game between the three families.
              Players coming from FreeCell find the visibility
              familiar and the column structure familiar, but the
              same-color rule trips them up because FreeCell uses
              alternating color. Players coming from Spider find the
              same-color rule familiar but the seven-column layout
              unfamiliar.
            </p>
            <p>
              The same-color rule rewards a kind of reasoning that
              neither FreeCell nor standard Klondike emphasize. In
              alternating-color Klondike, we think of the tableau as
              a red-black dance; in Whitehead, we think of it as two
              parallel monochrome ladders that occasionally share
              Kings and foundation exits. Players develop a sense of
              &quot;red tableau work&quot; versus &quot;black tableau
              work&quot; and balance the two in the way that Spider
              players balance their ten columns.
            </p>
            <p>
              Whitehead win rates are higher than standard Klondike
              thanks to full visibility, but lower than Westcliff
              because the same-color rule restricts sequence
              building. A good Whitehead player plans entire
              same-color chains before committing, because once a
              chain is broken the pieces cannot always rejoin on a
              different same-color chain mid-tableau. The best way
              to learn Whitehead is to play a few dozen deals
              deliberately slowly, tracing where every red card
              and every black card can realistically land across
              the whole game, and only then committing to moves.
              The game rewards that investment with clean finishes
              that neither standard Klondike nor FreeCell quite
              match.
            </p>
          </ContentBody>
        </CardSection>

        {/* Russian */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Russian" id="russian" icon={"\u2666"}>
            Russian Solitaire
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Russian Solitaire is the punishing cousin. It strips
              away two of Klondike&apos;s mercies &mdash; the
              alternating-color building rule and the stock pile
              &mdash; and replaces them with harsher constraints.
              The result is one of the lowest-win-rate games in the
              Klondike family and a favorite among players who want
              a game where every deal feels like it matters.
            </p>
            <p>
              Russian Solitaire is the punishing cousin. It uses the
              seven-column Klondike tableau but forbids the
              alternating-color rule entirely: tableau building is
              same-suit descending, so hearts build on hearts and
              spades on spades. There is no stock pile; all 52 cards
              are dealt into the tableau at the start, with later
              columns holding more cards and more face-downs.
            </p>
            <p>
              The same-suit restriction is brutal. A player who
              needs a red 6 under a black 7 cannot put them
              together unless a suit-matching card bridges them, and
              the limited cards available make bridges rare. Win
              rates in Russian Solitaire are significantly lower
              than standard Klondike &mdash; often in the single
              digits for casual players, climbing only modestly
              with practice.
            </p>
            <p>
              The name &quot;Russian&quot; is probably a twentieth-
              century attribution rather than a deep historical
              link; many solitaire variants acquired regional names
              during the English-language codification of the
              patience tradition. The defining feature is not
              geographic but mechanical: same-suit building on a
              Klondike tableau without a stock. That combination
              produces a distinctive feel that regulars often
              describe as &quot;Klondike without mercy&quot; because
              the game keeps removing the small recoveries that
              Klondike normally provides its players.
            </p>
            <p>
              Solvability research on Russian Solitaire is thin
              compared to standard Klondike, but the intuition is
              clear: fewer bridges means more locked deals, and
              more locked deals means lower ceilings on both solver
              and human play.
            </p>
            <p>
              Russian is a game for players who want the Klondike
              structure without the Klondike mercy. The absence of
              a stock pile means there is no fishing; the
              same-suit rule means there is no rescue. Every
              unfortunate face-down card is likely to stay stuck.
              Players who enjoy Russian tend to enjoy it for the
              same reason chess players enjoy endgame studies:
              every position is a puzzle with a narrow correct
              solution.
            </p>
          </ContentBody>
        </CardSection>

        {/* Yukon */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Yukon" id="yukon" icon={"\u2663"}>
            Yukon
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Yukon is Klondike with one transformative rule. The
              name comes from the same Yukon region that gave
              Klondike itself its name, and the two games often
              appear together in solitaire catalogs. Yukon is a
              serious Klondike relative in its own right, widely
              implemented in digital solitaire suites, and played by
              a meaningful share of the solitaire-playing audience.
            </p>
            <p>
              Yukon is Klondike with one transformative rule: any
              face-up card can be moved together with the stack
              sitting on top of it, whether or not that stack forms
              a valid sequence. A black 9 with random cards above
              it on its column can be picked up as a unit and
              dropped on a red 10 elsewhere. The cards riding on
              top come along and land in a new home.
            </p>
            <p>
              That single rule change dramatically raises win rates.
              Yukon is one of the more solvable Klondike-family
              games, with solvability estimates in the high
              eighties and observed human win rates much higher
              than standard Klondike. There is no stock pile, and
              all 52 cards are dealt into the tableau at the
              start &mdash; so the game is purely about rearranging
              and revealing face-downs. The movement freedom
              compensates for the loss of the stock.
            </p>
            <p>
              The freeform move rule is the crucial design decision.
              Standard Klondike requires that a moved stack form a
              valid sequence at its destination; Yukon does not.
              That frees the player to use unrelated cards as
              temporary luggage: a King drags its entire column
              along, random cards and all, and drops the luggage on
              a new anchor where the pieces can be reorganized. It
              turns the tableau into a flexible workspace instead of
              a rigid stack.
            </p>
            <p>
              Yukon is our recommended gateway variant for players
              who want Klondike&apos;s seven-column feel with less
              frustration. It rewards the same opening-card reading
              that Klondike does, but it punishes mistakes less
              harshly because the freeform stacking rule almost
              always provides a recovery path. See our{" "}
              <Link
                href="/yukon"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Yukon page
              </Link>{" "}
              for rules and strategy. A player who wants the
              Klondike seven-column structure without the stock
              frustrations should start there.
            </p>
          </ContentBody>
        </CardSection>

        {/* Joker */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Joker" id="joker" icon={"\u2660"}>
            Joker Klondike
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Joker Klondike is the children&apos;s variant: standard
              Klondike with two Jokers added to the deck, playable as
              wild cards. The Jokers can substitute for any rank and
              any color, which makes them universal bridges. Games
              feel looser and finish more often, which is why the
              variant is popular in teaching settings. It is not
              played competitively and carries no published
              solvability research.
            </p>
            <p>
              Teachers use Joker Klondike to give beginners a taste
              of winning. A child who has never finished a Klondike
              deal can finish a Joker Klondike deal within a few
              tries, and the completed game reinforces the rules
              better than any number of unfinished attempts. Once
              the child knows what a finished Klondike looks like,
              the Jokers come out and standard Klondike becomes
              accessible. The variant is pedagogically sensible even
              if it is not strategically interesting.
            </p>
          </ContentBody>
        </CardSection>

        {/* Vegas */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Vegas" id="vegas" icon={"\u2665"}>
            Vegas Klondike
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              We include Vegas in the variant tour because the
              scoring change is material. A Klondike player who
              switches to Vegas scoring plays differently even with
              identical rules &mdash; they push for partial finishes,
              concede more aggressively on dead deals, and size
              their sessions around a bankroll instead of a target
              win count. The overlay is a variant in the
              experiential sense, if not the mechanical one.
            </p>
            <p>
              Vegas Klondike overlays a scoring system on standard
              Klondike: the player buys each deal for $52 and earns
              $5 per foundation card. We cover the mechanics, the
              expected-value math, and the session strategy on our{" "}
              <Link
                href="/klondike-vegas-scoring"
                className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
              >
                Klondike Vegas scoring page
              </Link>
              . For the purposes of this variant tour, Vegas is not a
              rule change &mdash; it is a scoring overlay on the rule
              set of standard Klondike, and it can be applied to
              Draw 1 or Draw 3.
            </p>
          </ContentBody>
        </CardSection>

        {/* Spider and Klondike */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Spider" id="spider" icon={"\u2666"}>
            Spider and Klondike
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire is not technically a Klondike variant
              in the strict sense, descending from its own lineage
              of multi-deck patience games, but the two share
              enough structural DNA to belong in the same extended
              family of solitaires.
              but the two games share enough lineage that the family
              tree includes both. The parallels are structural:
              tableau plus foundations, descending tableau builds,
              suited foundation outputs. The differences are the
              ones that define Spider as its own family: two decks,
              ten columns, same-suit descending builds (in the
              four-suit version), and stock cards dealt across all
              columns rather than into a waste pile.
            </p>
            <p>
              The stock mechanic is the defining break. Klondike
              serves cards one or three at a time into a personal
              waste pile, letting the player choose when and which
              to play. Spider deals ten cards simultaneously across
              every column, ignoring the player&apos;s preferences
              entirely. That design choice changes the shape of
              Spider strategy profoundly: decisions are frontloaded
              onto what to do before the next deal, because after
              the deal the tableau changes underneath the player.
              Klondike rewards patience with the stock; Spider
              punishes impatience by dumping cards whenever the
              player asks for more.
            </p>
            <p>
              Historically, Spider and Klondike both emerge from the
              broader patience tradition that solidified in
              nineteenth-century England and Europe. Klondike sits
              closer to the original French patience tradition;
              Spider developed as a distinct lineage that borrowed
              the tableau-and-foundation architecture but reimagined
              the stock mechanic. The shared ancestry is why
              strategy from one carries over to the other in limited
              ways &mdash; both reward column emptying, both reward
              careful face-down management &mdash; while the
              tactical details differ sharply.
            </p>
            <p>
              The shared vocabulary helps players cross over. Both
              games use tableau, foundations, and stock; both reward
              column emptying and face-down reveal; both punish
              premature foundation sends. A player who has learned
              the rhythm of Klondike can sit down to Spider and
              recognize the genre immediately, even as the details
              diverge. That shared vocabulary is why we place Spider
              in the extended Klondike family rather than treating
              it as an unrelated game.
            </p>
            <p>
              Players who enjoy Klondike often try Spider next and
              find the two-deck structure disorienting, then
              eventually come to prefer the longer-form strategic
              depth. Players who start on Spider and come to
              Klondike find the seven-column layout cramped and the
              stock-and-waste rhythm unfamiliar. Both games belong
              in the core solitaire family, and we cover Spider in
              detail on its own dedicated pages across the network
              for readers who want to go deeper.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Keep Going" id="related" icon={"\u2660"}>
            Related Klondike guides
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/klondike"
              title="Play Klondike Solitaire"
              description="Draw 1 or Draw 3, with undo, hints, and statistics."
            />
            <ContentLinkCard
              variant="dark"
              href="/yukon"
              title="Yukon"
              description="Klondike without the stock, with freeform stack moves."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike/draw-1-vs-draw-3"
              title="Draw 1 vs Draw 3"
              description="The two standard Klondike modes compared."
            />
            <ContentLinkCard
              variant="dark"
              href="/klondike-vegas-scoring"
              title="Klondike Vegas Scoring"
              description="Scoring overlay and expected-value math."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Try a variant"
          body="If standard Klondike feels stale, Yukon and Westcliff are the easiest places to branch out."
          primaryLabel="Play Klondike"
          primaryHref="/klondike"
          secondaryLabel="Play Yukon"
          secondaryHref="/yukon"
        />
      </main>
    </ContentLayout>
  );
}
