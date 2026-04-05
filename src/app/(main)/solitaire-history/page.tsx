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
} from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

const PAGE_PATH = "/solitaire-history";
const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export const metadata: Metadata = {
  title: `The History of Solitaire: From Patience to Windows and Beyond | ${siteConfig.siteName}`,
  description:
    "A documented history of solitaire: late-1700s European origins, Victorian patience anthologies, Napoleon legend, Klondike and Canfield, Windows Solitaire, FreeCell, and the internet age.",
  keywords: [
    "history of solitaire",
    "solitaire origins",
    "patience card games history",
    "Microsoft Solitaire history",
    "Lady Adelaide Cadogan",
    "Paul Alfille FreeCell",
    "Wes Cherry Windows Solitaire",
    "Klondike history",
  ],
  openGraph: {
    title: "The History of Solitaire: From Patience to Windows and Beyond",
    description:
      "How patience games traveled from late-1700s Europe to the Windows desktop and then to the modern browser. A documented timeline.",
    url: absoluteUrl(PAGE_PATH),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor(PAGE_PATH),
  },
};

export default function SolitaireHistoryPage() {
  if (!isOwnedBy(PAGE_PATH, siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "The History of Solitaire: From Patience to Windows and Beyond",
      description:
        "A sourced timeline of solitaire: late-1700s European origins, the Victorian era, the American expansion, Microsoft Solitaire, FreeCell, and the modern internet era.",
      url: absoluteUrl(PAGE_PATH),
      datePublished: PUBLISHED_DATE,
      dateModified: UPDATED_DATE,
      author: {
        "@type": "Organization",
        name: "The History Desk",
        url: absoluteUrl("/authors/the-history-desk"),
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
        url: siteConfig.url,
      },
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
          name: "Solitaire History",
          item: absoluteUrl(PAGE_PATH),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="The History of Solitaire"
        subtitle="From late-1700s European parlors through Victorian anthologies and Microsoft Windows to the modern browser: a documented timeline of the world's most-played single-player card game."
        kicker="History Pillar"
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <div className="-mt-4 mb-2 flex justify-center">
          <AuthorByline
            authorSlug="the-history-desk"
            publishedDate={PUBLISHED_DATE}
            updatedDate={UPDATED_DATE}
          />
        </div>

        {/* Origins */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Late 1700s" id="origins" icon={"\u2660"}>
            The origins of patience
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Solitaire is an eighteenth-century invention. The earliest
              documented references to single-player card games as a
              distinct genre come from Northern Europe &mdash; Germany,
              Scandinavia, the Baltic states, and the part of France
              closest to those traditions &mdash; in the final quarter of
              the 1700s. The word used for them was "patience" in English,
              French, and German, and the word captured the essence: these
              were games of quiet perseverance, played alone, often while
              waiting. The earliest surviving primary sources are German
              and French card-game anthologies from the 1780s and 1790s
              that describe patiences alongside two-player and party card
              games.
            </p>
            <p>
              The games described in those early anthologies are
              recognizably solitaire. Some used a stock, some used a
              tableau, and a few used the circular dealing arrangement
              that would later become Clock Solitaire. The vocabulary
              was not yet standardized &mdash; what one book called a
              "patience," another called a "reussi" (success) or a
              "reussite." English-language publishers adopted the word
              "patience" in the early 1800s and kept it until the
              American preference for "solitaire" eclipsed it in the
              late twentieth century. Both words are still in use, with
              patience dominant in British and European writing and
              solitaire dominant in American writing.
            </p>
            <p>
              What is important about the late-1700s origin is that
              solitaire was born as a leisure activity for the reading
              class. Card-game anthologies were expensive, literacy was
              required to learn new patiences, and the context was
              primarily domestic. That context shaped the genre: no
              time limits, no scoring obligations, no social stakes, and
              a strong emphasis on rule variation. Every patience
              collection added new games invented by its author.
            </p>
            <p>
              The standard modern playing card deck made solitaire
              possible in its current form. The fifty-two-card French
              deck (four suits, numbered Ace through King) had stabilized
              across Europe by the middle of the 1700s, and patience
              games depend on that standardization. Earlier regional
              decks (the German suits, the Italian-Spanish suits, the
              Tarot deck) had been used for various single-player card
              activities, but the form we recognize today is French-deck
              native. A handful of early German patiences survive that
              used non-French decks, but those games did not travel into
              the English-language tradition.
            </p>
            <p>
              It is worth noting what solitaire was not, originally. It
              was not a gambling game (with the important exception of
              Canfield, which arrived a century later). It was not a
              divination tool in any mainstream sense, though a thin
              strand of "fortune telling with cards" overlapped with
              patience in the Victorian era. It was not a children&rsquo;s
              game. Solitaire in its first hundred years was an adult
              domestic pastime, and the slow rhythm of the genre reflects
              that lineage.
            </p>
          </ContentBody>
        </CardSection>

        {/* Napoleon */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Legend" id="napoleon" icon={"\u2665"}>
            Napoleon and the legend
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              A persistent story claims that Napoleon Bonaparte played
              patience during his exile on St Helena (1815-1821), and
              that several solitaires bear his name for that reason. The
              story appears constantly in popular writing about
              solitaire, and several modern variants still carry
              Napoleonic names: Napoleon&rsquo;s Square, Napoleon at St
              Helena (a traditional alternate name for{" "}
              <Link href="/forty-thieves" className="text-[#D4AF37] hover:underline">Forty Thieves</Link>),
              and several others. It is one of the most widely repeated
              claims in the canon.
            </p>
            <p>
              The primary sources are more ambiguous. The memoirs of Las
              Cases, Bertrand, and Montholon &mdash; Napoleon&rsquo;s
              companions on St Helena &mdash; describe a great deal of
              how Napoleon spent his time, but direct, unambiguous
              descriptions of him playing patience are thin. The strongest
              surviving references are indirect or retrospective, written
              after Napoleon&rsquo;s death, and several appear to be
              embellishments added by nineteenth-century card-game
              publishers to sell patience anthologies. It is plausible
              that Napoleon played patience; it is also plausible that
              publishers leaned on a half-remembered anecdote to brand
              their products.
            </p>
            <p>
              The History Desk&rsquo;s position: the Napoleonic patience
              legend has a thin factual basis and a thick promotional
              history. We do not repeat it as fact. We note that several
              variants carry Napoleonic names because of this legend,
              which is itself historically interesting, but we do not
              claim Napoleon was personally the origin of any of them.
            </p>
            <p>
              The useful thing about the Napoleon legend is what it
              tells us about the nineteenth-century card-game market.
              Publishers needed names, angles, and associations that
              would move books. An exiled emperor playing cards on a
              remote island was an irresistible hook. Similar branding
              efforts are everywhere in the patience canon: games named
              for queens, cathedrals, cities, and historical events that
              had nothing to do with their actual origin. A game called
              Napoleon&rsquo;s Square was more memorable than a game
              called Square Patience, and that memorability had real
              commercial value.
            </p>
          </ContentBody>
        </CardSection>

        {/* Victorian Era */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="1850s-1890s" id="victorian" icon={"\u2666"}>
            The Victorian era
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Victorian era is when patience became a mass cultural
              artifact. Lady Adelaide Cadogan published her influential
              patience anthologies in the 1870s, and she is the single
              most important figure in the English-language patience
              tradition. Her collections codified rules for dozens of
              games, established naming conventions that persist today,
              and introduced a standard format (rules, illustrative
              layout, notes on variations) that every subsequent patience
              anthology imitated.
            </p>
            <p>
              Cadogan was not working in a vacuum. Parallel traditions
              emerged in France (where the patience anthology was already
              mature), Germany (where several collections appeared in
              the 1860s and 1870s), and Russia (where patience became a
              parlor staple in aristocratic households). English writers
              borrowed freely from French collections, French writers
              borrowed from German ones, and Russian writers combined
              both. The result was a shared canon with regional variants,
              similar to the way card games like poker and whist
              developed.
            </p>
            <p>
              The Victorian era also established patience as a female-coded
              activity, which it had not been before. The earlier
              eighteenth-century context was mixed-gender domestic
              leisure. By the end of the nineteenth century, patience
              was associated with women, often older women, and often
              played while waiting or while convalescing. That
              gender-coding persists. Solitaire audiences today skew
              roughly sixty percent female, with the largest single
              demographic segment being players over sixty-five.
            </p>
            <p>
              Cadogan&rsquo;s specific contribution to the canon is
              hard to overstate. Her rule sets were the templates later
              writers copied (often without attribution), and several
              games in the modern canon survive only because she
              recorded them. La Belle Lucie, Flower Garden, and a
              handful of other French patiences entered the
              English-speaking canon through Cadogan&rsquo;s collections.
              Her editorial decisions &mdash; which games to include,
              which rule variants to prefer, which names to use &mdash;
              shaped the patience canon for a century.
            </p>
          </ContentBody>
        </CardSection>

        {/* 19th Century American Expansion */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Late 1800s" id="expansion" icon={"\u2663"}>
            The 19th century American expansion
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              In the United States, patience games traveled a different
              path. The late nineteenth century brought Hoyle&rsquo;s
              authoritative rule books into American homes, and Hoyle
              included patience alongside whist, poker, and euchre.
              Patience became a recognized category in American card-game
              literature, though it remained a minor one relative to
              the two-player games that dominated the Gilded Age.
            </p>
            <p>
              American naming conventions departed from the English and
              French traditions in interesting ways. When the
              single-player game we now call Klondike became popular in
              American households (likely in the late 1890s), it took
              its name from the Klondike Gold Rush (1896-1899), which
              dominated American popular culture at the time. Canfield
              solitaire was named for Richard Canfield, the New York
              casino owner who ran a version of the game as a gambling
              attraction around the turn of the century &mdash; players
              paid $52 for a deck and earned $5 per card moved to the
              foundations. Demon, Streets and Alleys, and other American
              variants all took their names from the cultural moments
              of their era.
            </p>
            <p>
              American patience absorbed new games more quickly than the
              European tradition because it had less deference to
              established anthologies. If a game was fun and spread, it
              became canon. This is the mechanism by which Klondike, a
              latecomer to the canon, became the single most popular
              patience in the world.
            </p>
            <p>
              American patience anthologies of the early twentieth
              century are fascinating documents. Many were published
              cheaply and sold through department stores as inexpensive
              gift items. Others were tied to the emerging card-game
              clubs in major cities, which combined bridge night,
              whist, and patience into a single social institution.
              The anthology by Albert Morehead and Geoffrey Mott-Smith,
              revised repeatedly through the middle of the century,
              became the standard American reference until digital
              solitaire eclipsed print.
            </p>
          </ContentBody>
        </CardSection>

        {/* 20th Century FreeCell and Spider */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="1970s-1990s" id="freecell-spider" icon={"\u2660"}>
            The 20th century: FreeCell and Spider
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Two twentieth-century games transformed the canon. The
              first is{" "}
              <Link href="/" className="text-[#D4AF37] hover:underline">FreeCell</Link>.
              Paul Alfille, a medical student at the University of
              Illinois, wrote the first digital FreeCell for the PLATO
              educational computing system around 1978. Alfille&rsquo;s
              version was based on an older paper patience called
              Eight Off, modified to use four free cells instead of
              eight and adapted for the PLATO display. FreeCell was an
              obscure game for more than a decade after Alfille coded
              it, played almost exclusively by PLATO users.
            </p>
            <p>
              FreeCell&rsquo;s global explosion came in 1991 when Jim
              Horne, a Microsoft engineer, ported the game to Windows
              as a demonstration of 32-bit processing for Windows for
              Workgroups. Horne&rsquo;s port shipped with Microsoft
              products, and by the mid-1990s FreeCell was installed on
              tens of millions of PCs. It was Jim Horne&rsquo;s version
              that introduced the famous 32,000 numbered deals, the
              solvability research that followed, and the now-legendary
              unwinnable deals (most notably{" "}
              <Link href="/freecell-game-11982" className="text-[#D4AF37] hover:underline">deal 11982</Link>).
            </p>
            <p>
              Horne&rsquo;s port is a particularly clean example of
              inside-company software becoming outside-company culture.
              FreeCell was originally intended as a pack-in with the
              Windows 32-bit Development Kit, not as a mass-market
              game. When it arrived in Microsoft Plus! in 1995, it
              became a household game almost by accident. The
              deal-numbering system (games 1 through 32,000, each
              derived deterministically from its number) also arrived
              with Horne&rsquo;s port, and it is now the standard
              addressing scheme for FreeCell deals across every
              implementation on the internet.
            </p>
            <p>
              <Link href="/spider" className="text-[#D4AF37] hover:underline">Spider Solitaire</Link>&rsquo;s
              origins are murkier. The game is old enough to appear in
              twentieth-century patience anthologies, and its mechanics
              (two decks, same-suit King-to-Ace sequences) fit the
              early-twentieth-century American expansion pattern. Spider
              was not widely played outside specialist patience
              circles until Microsoft shipped it with Windows ME in
              2000, which is when Spider entered the mainstream. The
              Microsoft version was the one that popularized the
              1-suit / 2-suit / 4-suit difficulty dial; earlier paper
              Spiders typically used only the four-suit form.
            </p>
            <p>
              The academic interest in FreeCell that followed Horne&rsquo;s
              port was unprecedented. Mathematicians at Berkeley and
              elsewhere worked through the Microsoft 32,000 catalog in
              the mid-1990s, publishing solvability data that became the
              foundation of modern solitaire research. The finding that
              exactly eight of the first 32,000 Microsoft deals are
              unwinnable (with 11982 being the most famous) is the
              product of that era of academic work. No patience game
              had ever been studied at that depth before, and the
              techniques developed for FreeCell solver research later
              fed into solvers for Klondike and Spider.
            </p>
          </ContentBody>
        </CardSection>

        {/* The Microsoft Era */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="1990-2010" id="microsoft" icon={"\u2665"}>
            The Microsoft era
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Microsoft Solitaire shipped with Windows 3.0 in May 1990.
              The implementation was written by Wes Cherry, an intern at
              Microsoft, and the card artwork was designed by Susan Kare,
              the designer behind much of Apple&rsquo;s early Mac
              interface iconography. The game was intended partly as a
              mouse-training tool: Windows 3.0 users had to learn to
              drag, drop, and right-click, and Solitaire gave them a
              reason to practice. The strategic choice to include a
              playable game with the operating system had consequences
              Microsoft did not foresee.
            </p>
            <p>
              Windows Solitaire became one of the most-played computer
              games in history. By conservative estimates, billions of
              hands of Klondike have been played on Microsoft desktops
              since 1990. The game reshaped the meaning of the word
              "solitaire" in English &mdash; for a generation of players,
              "solitaire" meant specifically Klondike draw-3 as Windows
              shipped it. The game also generated research interest in
              productivity impact, particularly in the corporate IT
              literature of the mid-1990s, though most of that research
              was anecdotal.
            </p>
            <p>
              Microsoft added FreeCell to Windows 95 via the Microsoft
              Plus! pack, then bundled it into Windows 95 OSR2 and all
              subsequent versions. Spider arrived with Windows ME in
              2000. Microsoft consolidated these games into Microsoft
              Solitaire Collection for Windows 8, which added daily
              challenges, achievements, and a shared UI. For many
              players, the Microsoft Solitaire Collection is still the
              reference implementation &mdash; a status we see reflected
              in our own search traffic. See our{" "}
              <Link href="/microsoft-freecell" className="text-[#D4AF37] hover:underline">Microsoft FreeCell</Link>{" "}
              history page for a deeper look at the FreeCell portion of
              this era.
            </p>
            <p>
              Wes Cherry&rsquo;s version of the game is still used as a
              reference point for Klondike rules in serious solitaire
              circles. The quirks of the original (specific scoring,
              the Vegas scoring variant, the way auto-move behaved) were
              all authored decisions that became the de facto standard
              for digital Klondike.
            </p>
            <p>
              Susan Kare&rsquo;s card design deserves its own mention.
              Kare was hired to design the card faces for Microsoft
              Solitaire after her work on the original Macintosh
              interface. Her cards prioritized readability at small
              sizes and high contrast, two constraints that mattered
              enormously on the low-resolution displays of the early
              1990s. Later redesigns of the Windows cards (most notably
              the mid-1990s update that introduced the flying-cards
              win animation, and later the Windows XP card redesign)
              all started from Kare&rsquo;s original as a reference.
              Card design is one of the invisible design disciplines;
              Kare&rsquo;s cards were seen billions of times and almost
              never consciously noticed.
            </p>
            <p>
              The "productivity impact of Solitaire" literature from the
              1990s is more cultural than empirical. Management
              consultants and IT journalists wrote about Solitaire as a
              workplace problem, estimating lost productivity in
              billions of dollars. Most of those estimates were
              speculative. What is documentable is that Microsoft
              removed the Solitaire and Minesweeper icons from
              Windows Vista&rsquo;s default Start menu placement
              partly in response to this discourse, and that in 2012,
              Microsoft Solitaire Collection moved to a freemium model
              with ads. That was a shift in business model as much as
              in cultural framing.
            </p>
          </ContentBody>
        </CardSection>

        {/* Internet Age */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="2000-present" id="internet-age" icon={"\u2666"}>
            Solitaire in the internet age
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The transition from desktop to browser began in the late
              1990s with Flash-based implementations and accelerated
              with HTML5 in the early 2010s. The first generation of
              browser solitaire was often Klondike, styled to look like
              the Windows version. The second generation (roughly 2010
              onward) expanded the catalog to include FreeCell, Spider,
              TriPeaks, Pyramid, and the broader canon. The current
              generation runs in the browser, installs as a progressive
              web app on mobile, and ships daily-challenge infrastructure
              by default.
            </p>
            <p>
              Modern mobile apps added two new features: the daily
              challenge (a single deal shared by every player that day)
              and the streak (consecutive days of play). Both features
              turned solitaire from a pastime into a habit-builder,
              which had profound effects on engagement and retention.
              The solitaire category today is driven by free-to-play
              mobile apps that borrow heavily from mobile game design,
              while the browser category serves players who prefer a
              lighter, ad-supported experience.
            </p>
            <p>
              The economic shape of the category shifted dramatically
              in the 2010s. Solitaire apps became free-to-play with
              advertising rather than paid downloads, monetization
              moved to display ads and occasionally to rewarded video,
              and the largest solitaire publishers became ad-tech
              companies first and game developers second. This
              commercial shift drove design decisions around daily
              challenges, achievements, in-app currencies, and streak
              rewards that earlier desktop solitaire did not have.
              Whether these features add to the game or distract from
              it is a matter of taste; either way they are now
              standard.
            </p>
            <p>
              Solver research has quietly reshaped the canon in the
              internet age. Researchers have analyzed nearly every
              FreeCell deal (finding the handful of unwinnable ones),
              quantified Klondike&rsquo;s ceiling win rate, and
              published win-rate distributions for Spider across suit
              counts. This research is why we can publish confident
              figures on our{" "}
              <Link href="/solitaire-difficulty-ranking" className="text-[#D4AF37] hover:underline">difficulty ranking</Link>{" "}
              and our{" "}
              <Link href="/freecell-probability" className="text-[#D4AF37] hover:underline">probability pages</Link>.
              Pre-solver era solitaire writing often assigned win rates
              by intuition; post-solver era writing cites data.
            </p>
            <p>
              The modern browser solitaire stack is also worth placing
              in historical context. Early browser solitaires were
              Flash-based and tended to imitate the Windows look
              faithfully. The HTML5 transition around 2012 freed
              designers to rethink the presentation, and newer sites
              have embraced darker themes, larger cards, keyboard
              navigation, and accessibility features that were
              previously absent. Our own network runs on HTML5 Canvas
              and DOM-based implementations, with a push toward
              DOM-based rendering because it handles accessibility more
              gracefully than Canvas.
            </p>
            <p>
              The smartphone era added touch interfaces to solitaire,
              which sounds trivial but changed the interaction model
              significantly. Mouse-based Klondike invites deliberate
              dragging; touch-based Klondike invites rapid-tap
              auto-routing. The cultural expectation of speed shifted
              accordingly. Players coming up on touch solitaire in the
              2010s and 2020s tend to play faster, tolerate restarts
              more easily, and expect a daily-challenge loop that
              earlier desktop players never had. The game is the same;
              the experience is different.
            </p>
          </ContentBody>
        </CardSection>

        {/* Citations */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Sources" id="citations" icon={"\u2663"}>
            Sources and further reading
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-4">
            <p>
              The History Desk works primarily from primary and
              well-established secondary sources. The references below
              are the ones we consult most often when working on
              solitaire history. This is a starting point, not an
              exhaustive bibliography.
            </p>
            <ul className="space-y-3 list-disc pl-6 text-sm">
              <li>
                <strong className="text-white">David Parlett, The Oxford Guide to Card Games</strong>{" "}
                (1990) &mdash; the standard reference for card-game
                history, including a substantial section on patience.
                Parlett is careful about sourcing and is our preferred
                starting point for any historical question.
              </li>
              <li>
                <strong className="text-white">Lady Adelaide Cadogan, Illustrated Games of Patience</strong>{" "}
                (1870) &mdash; the Victorian anthology that codified
                rules for a large portion of the English patience canon.
                Cadogan&rsquo;s rules are the direct ancestors of modern
                published rule sets for many variants.
              </li>
              <li>
                <strong className="text-white">Dick&rsquo;s Games of Patience</strong>{" "}
                (late 1800s) &mdash; an American Victorian-era patience
                anthology that captured the games popular in the United
                States at the turn of the twentieth century.
              </li>
              <li>
                <strong className="text-white">Pagat.com</strong>{" "}
                &mdash; a modern online reference for card-game rules
                maintained by John McLeod. Careful, well-sourced, and
                useful for cross-checking rule claims across regional
                traditions.
              </li>
              <li>
                <strong className="text-white">Wikipedia</strong>{" "}
                &mdash; useful as a secondary source and jumping-off
                point, but we verify against primary sources before
                repeating claims from Wikipedia articles.
              </li>
              <li>
                <strong className="text-white">Albert Morehead and Geoffrey Mott-Smith,
                The Complete Book of Solitaire and Patience Games</strong>{" "}
                (multiple editions, mid-twentieth century) &mdash; the
                standard American patience reference of its era. Still
                widely cited for rule variants and for the history of
                several games popularized in the United States.
              </li>
              <li>
                <strong className="text-white">Primary newspaper and magazine archives</strong>{" "}
                &mdash; for the Microsoft Solitaire era (1990 onward),
                contemporary reporting in trade publications, tech
                journalism, and business press provides a useful
                cross-check on corporate narratives about Solitaire.
              </li>
            </ul>
            <p>
              We keep a running list of the specific claims on this
              page that rest on thin evidence and we flag them in the
              body where relevant. If you find a primary source that
              changes one of those claims, write to the History Desk
              and we will revise.
            </p>
          </ContentBody>
        </CardSection>

        {/* Related */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Related" id="related" icon={"\u2660"}>
            Related history pages
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/microsoft-freecell"
              title="Microsoft FreeCell"
              description="The history of Microsoft's FreeCell implementation, from Jim Horne's 1991 port to the Microsoft Solitaire Collection."
            />
            <ContentLinkCard
              variant="dark"
              href="/famous-freecell-game-numbers"
              title="Famous FreeCell Game Numbers"
              description="The most notorious deals in Microsoft's 32,000-deal catalog, including the handful that are unwinnable."
            />
            <ContentLinkCard
              variant="dark"
              href="/freecell-world-records"
              title="FreeCell World Records"
              description="Documented records for FreeCell win streaks, solve times, and historical milestones."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-games-guide"
              title="Complete Solitaire Guide"
              description="The master guide to solitaire games, families, rule variants, and player progression."
            />
          </ContentBody>
        </CardSection>

        <AuthorBio authorSlug="the-history-desk" />

        <CtaSection
          heading="Play a piece of history"
          body={
            <>
              Every game on the network carries the marks of its era.
              Play FreeCell (1978) or Klondike (1890s) and feel the
              lineage.
            </>
          }
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="Browse All Games"
          secondaryHref="/games"
        />
      </main>
    </ContentLayout>
  );
}
