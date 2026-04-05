import { notFound } from "next/navigation";
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
  ContentLinkCard,
  JsonLd,
  AuthorByline,
} from "@/components/content";
import StateSolitaireMap from "@/components/tools/StateSolitaireMap";
import { countByGame, GAME_LABELS } from "@/data/solitaireByState";

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";
const PAGE_PATH = "/popular-solitaire-by-state";

export const metadata: Metadata = {
  title: "The Most Popular Solitaire Game in Every US State",
  description:
    "An interactive state-by-state map of America's favourite solitaire variants. FreeCell dominates the Mid-Atlantic and Midwest, Spider owns the Mountain West and coast, and Pyramid leads across the Deep South.",
  keywords: [
    "most popular solitaire by state",
    "solitaire popularity map",
    "freecell states",
    "spider solitaire states",
    "klondike by region",
    "solitaire trends us",
  ],
  openGraph: {
    title: "The Most Popular Solitaire Game in Every US State",
    description:
      "An interactive hex map of America's favourite solitaire variants, with a regional breakdown of the FreeCell Belt, Spider Corridor, and Southern pyramid zone.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: canonicalUrlFor(PAGE_PATH) },
};

export default function PopularSolitaireByStatePage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) {
    notFound();
  }

  const counts = countByGame();
  const leaderboard = (Object.keys(counts) as Array<keyof typeof counts>)
    .map((g) => ({ game: g, count: counts[g] }))
    .sort((a, b) => b.count - a.count);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The Most Popular Solitaire Game in Every US State",
      description:
        "State-by-state directional estimates of America's favourite solitaire variants, with an interactive hex map and regional analysis from our Research Desk.",
      author: [
        { "@type": "Organization", name: "The Research Desk", url: absoluteUrl("/authors/the-research-desk") },
        { "@type": "Organization", name: "Editorial Team", url: absoluteUrl("/authors/editorial-team") },
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
        { "@type": "ListItem", position: 2, name: "Popular Solitaire by State", item: absoluteUrl(PAGE_PATH) },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="The Most Popular Solitaire Game in Every US State"
        subtitle="Klondike wins most states. But the runner-up tells the real story — and the regional patterns are more interesting than the overall winner."
        kicker="Research Desk"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-research-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
            reviewedBySlug="editorial-team"
          />
        </div>

        {/* Intro */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="The Big Picture" id="intro" icon={"\u2660"}>
            Why regional solitaire preferences are worth mapping
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Americans play a lot of solitaire. Across the open web, tens of
              millions of sessions start every month, and the overwhelming
              share of those sessions go to one game: Klondike, the classic
              tableau most people mean when they say &ldquo;solitaire.&rdquo;
              That fact is not interesting. What is interesting is the
              second-place finisher in each state. The runner-up tells us
              something about local office culture, which Windows release
              mattered most in that market, whether phones or desktops carry
              the load, and how willing players are to leave the default
              behind.
            </p>
            <p>
              We built this map to visualise those patterns. Each hex is a
              US state or the District of Columbia, coloured by the variant
              our Research Desk believes leads there after weighing search
              trends, app-store chart snapshots, and traffic across our own
              network of solitaire sites. Hover, tap, or tab onto any hex to
              see the favourite, the runner-up, and a short note explaining
              what our desk thinks is going on in that market.
            </p>
            <p>
              A word of honesty before you scroll. This is directional
              editorial commentary, not rigorous polling. We are not claiming
              a confidence interval on any single state. What we are claiming
              is that the clusters on the map are real, that they repeat
              across multiple data sources, and that they line up with what
              we see in our own traffic week after week. Treat the specifics
              as our best informed guess and the regions as the story.
            </p>
            <p>
              Why bother with a map at all when Klondike wins almost
              everywhere by volume? Because the volume winner is rarely the
              interesting number. If you are trying to understand why a
              player in Columbus picks FreeCell first and a player in
              Mobile reaches for Pyramid, the overall leader tells you
              nothing. The preference leader does. It surfaces the local
              defaults, the cultural reasons variants take root, and the
              places where the solitaire catalogue is still being discovered
              one metro at a time. That is the story we wanted on one
              screen.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Map */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Interactive" id="map" icon={"\u2665"}>
            The map
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The hex map below keeps every state the same visual weight, so
              Rhode Island and Texas argue their case on equal footing.
              Colours encode the favourite variant, and the side panel
              updates as you move through the grid. On desktop, hover to
              reveal; on mobile, tap to pin a state.
            </p>
          </ContentBody>
          <div className="mt-4">
            <StateSolitaireMap />
          </div>
          <ContentBody variant="dark" className="mt-6 space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
              Headline count
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {leaderboard.map(({ game, count }) => (
                <li key={game}>
                  <span className="text-white">{GAME_LABELS[game]}</span>
                  <span className="text-white/50"> &middot; leads in {count} state{count === 1 ? "" : "s"}</span>
                </li>
              ))}
            </ul>
          </ContentBody>
        </CardSection>

        {/* Regional Patterns */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Regional Patterns" id="regional" icon={"\u2666"}>
            Four Americas, four solitaire cultures
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              When we squint at the map, four regional personalities come
              into focus. The <strong className="text-white">Northeast</strong>{" "}
              is the most classical of the four: New England leans on
              Klondike to a degree that no other region matches, and the
              ratio of Klondike searches to everything else is highest there.
              New York is the closest thing America has to an average state —
              it plays almost exactly the national mix, and editors have
              learned to treat it as a control group.
            </p>
            <p>
              The <strong className="text-white">South</strong> breaks the
              pattern in two ways. The Deep South (Mississippi, Alabama,
              Louisiana, Arkansas) runs on casual, mobile-first play and
              gravitates to Pyramid and TriPeaks — the variants a player can
              finish in under five minutes on a phone. The newer Sun Belt
              metros (Atlanta, Raleigh, Charlotte) pull in the other
              direction: Spider creeps up the ladder in those markets,
              trailing the classic but outpacing it in younger, tech-heavy
              counties. The tension between the two Souths is one of the
              clearer regional signals on the map.
            </p>
            <p>
              The <strong className="text-white">Midwest</strong> is the
              FreeCell Belt, which we discuss in its own section below. And
              the <strong className="text-white">West</strong> — from the
              Rockies to the Pacific — is where Spider Solitaire has its
              stronghold. That cluster has stayed consistent in our data for
              as long as we have tracked it, and it does not look like it is
              about to unravel.
            </p>
            <p>
              A few small states resist clean categorisation. Wyoming,
              Vermont, and Alaska all have populations small enough that the
              noise in any single dataset can overwhelm the signal, so we
              default to Klondike in those places and flag the uncertainty.
              Alaska gets an additional asterisk: it has the highest
              per-capita solitaire interest we see anywhere in the country,
              which we attribute to long winters and limited competing
              entertainment.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Klondike Belt */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Classic Strongholds" id="klondike-belt" icon={"\u2663"}>
            The Klondike belt
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Klondike wins the overall count by a wide margin, but its
              strongholds are specific. New England tops the list:
              Massachusetts, Connecticut, Rhode Island, Vermont, New
              Hampshire, and Maine all play classic more loyally than the
              rest of the country. Part of that is demographic — New England
              skews older than the national average, and older cohorts are
              the most loyal Klondike players in our dataset. Part of it is
              cultural inertia. These are states that were early adopters of
              Windows in the 1990s, built office habits around the pre-loaded
              game, and never felt the need to migrate.
            </p>
            <p>
              The other Klondike strongholds sit across the Great Plains and
              the interior west. North Dakota, South Dakota, Nebraska,
              Kansas, Iowa, and Wyoming all lead with Klondike, often with
              the runner-up well behind. These are markets where the classic
              tableau has no organic competition. Variants simply do not
              surface in local traffic the way they do on the coasts, and the
              gap between first and second place is wide.
            </p>
            <p>
              Two useful footnotes. First, Klondike &ldquo;winning&rdquo; a
              state does not always mean by a landslide. In the FreeCell
              Belt, the classic still ranks first in raw search volume — it
              just loses the preference ratio to FreeCell. We report the
              preference leader rather than the volume leader because the
              volume leader is Klondike almost everywhere and is not a
              useful signal. Second, Klondike&rsquo;s share is slowly
              eroding nationally. It is still the largest share of solitaire
              traffic and probably always will be, but the year-over-year
              trend line tilts down while newer variants tilt up.
            </p>
          </ContentBody>
        </CardSection>

        {/* FreeCell Strongholds */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Strategy Belt" id="freecell-belt" icon={"\u2660"}>
            FreeCell strongholds: the office-worker corridor
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The cleanest regional story on the map is the FreeCell Belt.
              Maryland, Virginia, and the District of Columbia lead the
              country in FreeCell preference, and the rest of the
              Mid-Atlantic (Delaware, New Jersey, Pennsylvania) follows
              behind. From there the belt stretches west across the
              industrial Midwest: Ohio, Michigan, Indiana, Illinois,
              Wisconsin, and Minnesota all show FreeCell outperforming
              Klondike on a preference basis. These are the states where
              office culture met the Windows franchise and never let it
              go.
            </p>
            <p>
              FreeCell shipped with every major consumer Windows release
              from 95 onward, and for a long stretch it was the thinking
              person&rsquo;s alternative to Klondike. You could open it in a
              quiet moment at a government workstation, reason about an
              opening, and close the window before anyone noticed. The D.C.
              metro&rsquo;s dominance here is not a coincidence — the
              federal and contractor workforce is large, desk-based, and
              Windows-native, and FreeCell fits the rhythm of a meeting-heavy
              workday.
            </p>
            <p>
              What we find interesting about FreeCell is that its share is
              still growing. Year over year, our traffic shows FreeCell
              climbing faster than any other variant on this list. Part of
              that is a new generation discovering a game their parents
              played. Part of it is cultural — a near-perfect-information
              puzzle where skill beats luck fits the moment better than it
              did in 2010. If the belt expands in the next few years, it
              will probably expand west and south, into markets where
              office-style play has not historically led.
            </p>
          </ContentBody>
        </CardSection>

        {/* Spider Zones */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Two-Deck Territory" id="spider-zones" icon={"\u2665"}>
            Spider zones: Mountain West meets the coast
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Spider Solitaire&rsquo;s stronghold is an arc that runs from
              Montana and Idaho down through Colorado, Utah, New Mexico,
              Arizona, and Nevada, then spills onto the coast through
              California, Oregon, and Washington. That arc is the Spider
              Corridor. It is the most geographically coherent cluster on
              the map and the easiest one to explain. Spider was the
              signature Windows variant of the XP era, and the regions that
              adopted XP (and then Vista and 7) fastest are the same regions
              that kept Spider in their muscle memory. The Pacific Northwest
              tech corridor is the purest expression of the pattern.
            </p>
            <p>
              Spider is also a game that rewards a bigger screen. It deals
              across ten columns and two decks, and the tableau benefits
              from the extra width that desktop monitors give it. The
              Corridor is notably desktop-heavy in our traffic: mobile
              sessions exist, but the depth of engagement is higher on
              laptops and desktops than we see in the Deep South&rsquo;s
              mobile-first markets. That matches what Spider players tell us
              when we ask: the game is worth the real estate.
            </p>
            <p>
              Texas, Georgia, and North Carolina sit on the edge of the
              Spider story. They each have a Spider-leaning metro core
              surrounded by more classical suburbs, and the metro signal is
              strong enough in our data to put Spider narrowly ahead of
              either the classic or the Southern pyramid pattern. We
              classify those states as Spider-leaning with low confidence;
              they could flip in either direction as their metro footprints
              grow.
            </p>
          </ContentBody>
        </CardSection>

        {/* Emerging Variants */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Emerging" id="emerging" icon={"\u2666"}>
            Emerging variants: where TriPeaks and Pyramid are growing
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Pyramid and TriPeaks are the two variants most tied to mobile
              play, and they are growing fastest in the places where mobile
              carries the most sessions. Pyramid leads across the Deep
              South — Mississippi, Alabama, Louisiana, Arkansas, plus
              Kentucky, Tennessee, South Carolina, and Oklahoma — where a
              five-minute game on a phone fits how most people actually
              play. TriPeaks is the newer story: it has pushed into Florida
              and Hawaii in our dataset, and it is steadily climbing in the
              retiree-heavy, tourist-adjacent markets that prefer short,
              forgiving sessions.
            </p>
            <p>
              We expect TriPeaks to keep expanding. It has the gentlest
              learning curve of any serious variant, strong mobile bonafides,
              and a visual structure that photographs well for app-store
              screenshots and social clips. Pyramid&rsquo;s growth is
              flatter, but it will hold its regional base for the same
              reason Klondike holds New England: once a game becomes the
              local default, it is sticky.
            </p>
            <p>
              The quiet mover in this category is Golf Solitaire. We do not
              give it a regional first-place finish on the map because it is
              not quite there yet, but Golf has the fastest year-over-year
              growth of any variant we track in our own traffic. It slots
              into the same niche as Pyramid &mdash; three minutes, minimal
              rules, forgiving wins &mdash; and shows early strength in the
              same Sun Belt markets. If the 2027 refresh of this map looks
              different from the 2026 version, Golf is the variant most
              likely to have moved the needle.
            </p>
          </ContentBody>
        </CardSection>

        {/* Methodology */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Methodology" id="methodology" icon={"\u2663"}>
            How we compiled this map
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              This map blends three inputs. First, we reviewed public search
              trend data for our five headline variants across every US
              state, converting relative search interest into a preference
              share for each state. Second, we sampled top-chart snapshots
              from the iOS and Google Play card-game categories over several
              months, weighing each state by the variants that appeared most
              often in its regional top-ten lists. Third, we layered our own
              network traffic on top — where our sites have enough state-
              level signal to draw conclusions, we let that signal moderate
              the external data.
            </p>
            <p>
              Our Research Desk then paired each state with a favourite and a
              runner-up, wrote the short regional note you see when you
              hover a hex, and sanity-checked the clusters against what the
              Strategy and Rules desks see in reader email. Where the three
              inputs disagreed, we sided with the strongest signal and
              flagged the state as low-confidence in the note.
            </p>
            <p>
              What this map is not. It is not a census, a panel study, or a
              demographically weighted poll. We are not issuing per-state
              margins of error, because the inputs do not support that kind
              of precision. The honest label for this work is
              &ldquo;directional editorial estimate, triangulated from
              public and internal data.&rdquo; Read it the way you would
              read a political journalist&rsquo;s regional map: useful for
              pattern recognition, not a substitute for rigorous sampling.
            </p>
            <p>
              We update the map when the underlying data shifts materially —
              generally once per year, or sooner if a new Windows release,
              a breakout mobile title, or a platform policy change reshuffles
              the landscape. The next scheduled refresh is in Q4 2026.
            </p>
            <p>
              A few editorial choices are worth flagging. We chose a hex
              grid over a geographically accurate map because a geographic
              map makes Rhode Island, Delaware, and DC almost invisible
              while handing Texas and Alaska a visual weight that does not
              match their share of the solitaire audience. The hex grid
              equalises every state, which matches how we reason about the
              data: each state gets one vote about its favourite variant,
              regardless of size. We also chose to show preference leaders
              rather than volume leaders, because Klondike wins the volume
              contest almost everywhere and a volume map is just a map of
              one colour.
            </p>
            <p>
              We are sometimes asked why we do not show confidence scores or
              error bars on individual states. The honest answer is that
              publishing numerical confidence on something this directional
              would give readers a false sense of precision. Our internal
              working process does track a confidence level per state
              (high, medium, low) but we fold that into the per-state note
              instead of surfacing it as a separate column. States we
              flagged as low-confidence include Wyoming, Vermont, Alaska,
              and the Dakotas; expect those to be the most likely to flip
              when we refresh.
            </p>
          </ContentBody>
        </CardSection>

        {/* What Would Change Our Mind */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Open Questions" id="what-would-change" icon={"\u2665"}>
            What would change our minds about the map
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Editorial work like this is only useful if we are honest about
              the conditions under which we would revise it. A few signals
              would move states around next year. If a new Windows release
              bundled a different solitaire variant as the default, we would
              watch the FreeCell Belt first: historically, the Belt has
              tracked the default. If TikTok or Instagram made a Golf or
              TriPeaks moment happen, the Sun Belt states would be the
              earliest to flip. If mobile adoption in rural plains states
              continues its current trajectory, the southern pyramid
              cluster could push north into Missouri and Kansas faster
              than we currently project.
            </p>
            <p>
              We also watch for quieter signals inside our own data. When
              the ratio of logged-in to anonymous players changes in a
              given state, the variant mix usually follows. When a state
              starts sending us significantly more mobile sessions, it
              typically drifts toward TriPeaks or Golf within a quarter.
              And when state-level reader mail starts flagging a rule
              question for a specific variant, we know that variant has
              just crossed into the local awareness threshold.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/solitaire-for-every-mood"
              title="Solitaire for Every Mood"
              description="Pick a game by how you feel, not by name — our mood-based matcher across the whole network."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-game-finder"
              title="Solitaire Game Finder"
              description="Answer five quick questions and we will recommend the right variant for your next session."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell"
              title="Play FreeCell"
              description="The strategic variant that owns the Mid-Atlantic and Midwest on our map."
            />
            <ContentLinkCard
              variant="dark"
              href="/spider"
              title="Play Spider Solitaire"
              description="The two-deck game that dominates the Mountain West and Pacific Coast."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="See a state we got wrong?"
          body={
            <>
              If your state&rsquo;s ranking does not match your experience,
              write to us. We revise the map when the data moves.
            </>
          }
          primaryLabel="Try the Game Finder"
          primaryHref="/solitaire-game-finder"
          secondaryLabel="Browse all games"
          secondaryHref="/games"
        />
      </main>
    </ContentLayout>
  );
}
