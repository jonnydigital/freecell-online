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

export const metadata: Metadata = {
  title: `How Solitaire Changed Windows (And Vice Versa) | ${siteConfig.siteName}`,
  description:
    "A cultural and technical history of Windows Solitaire — from Paul Alfille's PLATO FreeCell and Wes Cherry's 1990 port to the Microsoft Solitaire Collection.",
  keywords: [
    "history of windows solitaire",
    "wes cherry solitaire",
    "windows 3.0 solitaire",
    "jim horne freecell",
    "susan kare solitaire cards",
    "microsoft entertainment pack",
    "microsoft solitaire collection",
    "solitaire office productivity",
  ],
  openGraph: {
    title: "How Solitaire Changed Windows (And Vice Versa)",
    description:
      "The cultural and technical history of Windows Solitaire, from PLATO origins to the Microsoft Solitaire Collection. A research piece on a card game that outlived its platform.",
    url: absoluteUrl("/how-solitaire-changed-windows"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    canonical: canonicalUrlFor("/how-solitaire-changed-windows"),
  },
};

const PUBLISHED_DATE = "2026-04-05";
const UPDATED_DATE = "2026-04-05";

export default function HowSolitaireChangedWindowsPage() {
  if (!isOwnedBy("/how-solitaire-changed-windows", siteConfig.key)) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "How Solitaire Changed Windows (And Vice Versa)",
      description:
        "A cultural and technical history of Windows Solitaire, tracing the game from PLATO-era card games through Wes Cherry's 1990 Windows port and into the Microsoft Solitaire Collection.",
      url: absoluteUrl("/how-solitaire-changed-windows"),
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
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        {
          "@type": "ListItem",
          position: 2,
          name: "How Solitaire Changed Windows",
          item: absoluteUrl("/how-solitaire-changed-windows"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="How Solitaire Changed Windows (And Vice Versa)"
        subtitle="A cultural and technical history of the card game that defined an operating system, and the operating system that made solitaire a universal reflex."
        kicker="History Desk"
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
          <SectionHeading variant="dark" sub="Intro" id="intro" icon={"\u2660"}>
            Before Windows, card games on computers were rare.
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Before Windows, playing a card game on a computer was an
              uncommon thing to do. There were card games on mainframes,
              on university timesharing systems, and on a handful of early
              personal computers. They existed as curiosities, written
              by hobbyists, distributed on tape or 5.25-inch floppy,
              and played by whoever happened to know they were there.
              Most office workers who used computers never touched one.
            </p>
            <p>
              After Windows, card games on computers were everywhere. By
              the mid-1990s, Solitaire was installed on more machines than
              any commercial piece of software in history, simply because
              it shipped in the base install of every Windows PC. A
              receptionist, a lawyer, a factory supervisor, and a twelve
              year old could all describe the green felt background and
              the bouncing cards at the end of a winning game. The card
              game had become part of the operating system&rsquo;s
              personality, and in a less obvious way the operating system
              had become part of the card game&rsquo;s personality too.
            </p>
            <p>
              This piece is a history of that exchange. We look at the
              people who built Windows Solitaire and FreeCell, the design
              decisions that made them stick, the cultural meanings the
              games acquired once they were in the water supply of the
              American office, and the long slow rearrangement that has
              taken solitaire from a Windows accessory into a browser
              habit, a mobile app, a subscription product, and back again.
            </p>
          </ContentBody>
        </CardSection>

        {/* Pre-Windows Era */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Pre-Windows" id="pre-windows" icon={"\u2665"}>
            The pre-Windows era
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The first computer card games lived on mainframes. IBM
              timesharing systems had text-based Blackjack and Poker
              clones by the early 1970s. PLATO, the University of
              Illinois teaching system that ran from the 1960s through
              the 1980s, picked up a broad library of card games during
              its long lifespan &mdash; and that library is where our
              story really begins. PLATO was one of the first networked
              computer environments that took graphics seriously, and
              the combination of graphics, a large user base, and a
              culture of open authorship made it a fertile place for
              hobbyist games.
            </p>
            <p>
              Paul Alfille, a medical student at the University of
              Illinois, wrote a PLATO implementation of FreeCell in
              1978. The program was unusual in two ways. First, it ran
              in graphical rather than text mode, which meant that the
              tableau looked like an actual patience layout rather than
              a terminal transcript. Second, Alfille chose a rule set
              that produced solvable deals almost every time, distinct
              from the Klondike-style games whose random shuffles leave
              the player blocked on a large fraction of hands. The
              design choice was deliberate: Alfille wanted a game that
              rewarded thinking rather than luck. PLATO FreeCell was
              used by students and staff across the Illinois system for
              years. It did not become culturally famous in its own
              right, but it seeded two generations of programmers who
              would later carry the rules to other platforms.
            </p>
            <p>
              On the early personal computers of the 1980s &mdash;
              Apple II, TRS-80, Commodore 64, early IBM PCs &mdash;
              card games existed but were scattered. Hobbyist BASIC
              listings in computer magazines, shareware disks, and
              commercial cartridges each carried a handful. There was
              no canonical card game on any of those platforms.
              Solitaire was one option among many, and most users did
              not keep any card game installed. That pattern held
              through the rest of the decade. The operating systems
              of the 1980s came with utilities, not pastimes.
            </p>
          </ContentBody>
        </CardSection>

        {/* Wes Cherry and Windows Solitaire */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Wes Cherry" id="wes-cherry" icon={"\u2666"}>
            Wes Cherry and Windows Solitaire (1990)
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Wes Cherry was a Microsoft intern in 1988 when he wrote
              the version of Klondike that would ship with Windows 3.0
              in 1990. The program was a side project, written outside
              of his assigned work, and it survived to production
              because the Windows team needed a simple, visually
              attractive application to teach users how the new mouse
              interface worked. Dragging a card from one column to
              another was exactly the sort of demonstration the
              Windows team was looking for: it required fine motor
              control, it exercised the click-and-drag metaphor, and
              it was forgiving of error because a misdrop just
              returned the card to its previous home.
            </p>
            <p>
              Cherry&rsquo;s own account, offered in interviews over
              the years, places the game&rsquo;s origin in personal
              boredom and the availability of the Windows SDK. He has
              described writing it as a way to learn the graphics API,
              with no expectation that it would ship broadly. The
              decision to include it in the Windows 3.0 retail package
              was made by product managers who recognized it as a
              gentle on-ramp for a user interface model that was, for
              most of the PC-using public, new. That pragmatic choice
              &mdash; ship the card game as a mouse tutorial &mdash; is
              the single most consequential decision in the cultural
              history of solitaire.
            </p>
            <p>
              The code itself was small: a few thousand lines of C,
              driving a handful of bitmaps, a simple deck shuffle, and
              the rules of Klondike draw-three with a single redeal.
              The implementation was faithful to common paper Klondike
              rules, with the conventions that were already familiar
              from the Hoyle guides of the 1970s and 1980s. It did not
              introduce variants. It did not customize the deck. It
              simply ran the card game that most American households
              already played on their kitchen tables, rendered in the
              same crisp style that Windows 3.0 applied to everything
              else.
            </p>
            <p>
              The game shipped without credit on the splash screen
              &mdash; Microsoft did not advertise Cherry as the
              author, and for years the program&rsquo;s authorship was
              a minor piece of Windows folklore rather than common
              knowledge. Cherry himself left Microsoft in the early
              1990s to pursue unrelated work. His name now appears in
              most histories of Windows, but the credit came late and
              came from the press rather than from the employer.
            </p>
          </ContentBody>
        </CardSection>

        {/* Card design */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Visual Design" id="card-design" icon={"\u2663"}>
            The card design
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The card faces that shipped with Windows Solitaire were
              drawn by Susan Kare, whose design work had already made
              her famous in graphical computing. Kare had built the
              original Macintosh icons at Apple in the early 1980s,
              including the system font, the command key, and the
              trash can. By the late 1980s she was taking contract
              commissions, and Microsoft hired her to produce artwork
              for several Windows 3.0 applications. Her hand is
              visible in the Card file, the icons of the Accessories
              group, and the full fifty-two card deck that rendered in
              Solitaire.
            </p>
            <p>
              The deck Kare produced for Windows was pixel-dense by the
              standards of the time. Each face card was hand-drawn at
              a specific resolution, reusing the silhouettes of paper
              Bicycle cards but rendered in the flat, readable style
              that Kare had perfected at Apple. The suits were crisp.
              The pips lined up. The back-of-card patterns, chosen
              from a menu, gave players a small measure of
              customization: checkered, dots, robot, castle, island,
              and several others. Most players do not remember the
              designer&rsquo;s name, but they remember the cards.
            </p>
            <p>
              What made the card art culturally sticky was its
              combination of fidelity and distinction. The face cards
              were clearly playing cards &mdash; a player who had
              never touched a mouse could still identify the King of
              Spades &mdash; but they were also clearly
              Kare&rsquo;s, in a way that shaped a generation&rsquo;s
              mental image of what a digital card looked like. Later
              versions of Windows kept the deck, occasionally
              modernizing it but always preserving the basic visual
              vocabulary. When the Microsoft Solitaire Collection
              refreshed the art in 2012, player complaints were
              immediate: the cards no longer looked like Solitaire.
              That complaint is really about losing Kare&rsquo;s
              visual grammar.
            </p>
          </ContentBody>
        </CardSection>

        {/* Jim Horne and FreeCell */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Jim Horne" id="jim-horne" icon={"\u2660"}>
            Jim Horne and Windows FreeCell (1991)
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Jim Horne was the Microsoft engineer who ported FreeCell
              from its PLATO origins to Windows. Horne had played
              Alfille&rsquo;s original FreeCell during his own years
              at university and remembered it well enough to
              reconstruct the rules and layout on a Windows target.
              The port appeared first in the Microsoft Entertainment
              Pack and then as part of the Win32s subsystem bundled
              with Windows for Workgroups 3.11. Later, FreeCell
              shipped in the base install of Windows 95 and stayed in
              the base install through Windows 7.
            </p>
            <p>
              Horne&rsquo;s most important technical contribution was
              the deal-numbering system. Rather than shuffling a deck
              freshly on each game, he seeded a linear congruential
              pseudorandom generator with the deal number the user
              selected, then drew cards from that generator to build
              the tableau. The result was a deterministic mapping
              between deal numbers and deal layouts: deal #1 on one
              machine produced the same cards in the same columns as
              deal #1 on any other. The choice to expose deal numbers
              in the user interface &mdash; with a dialog that
              accepted numbers from 1 to 32,000 &mdash; turned
              FreeCell into a shared puzzle across the entire Windows
              installed base.
            </p>
            <p>
              That shared-puzzle dimension is what distinguishes
              FreeCell from Solitaire in the cultural record. Where
              Solitaire games were one-offs, pulled from a private
              shuffle that never mattered to anyone else, FreeCell
              deals could be discussed by number. Players called each
              other to say &ldquo;try deal 617, it&rsquo;s a
              monster.&rdquo; Office workers compared wins on specific
              deals the way kitchen-table chess players compare
              positions. Magazines ran columns on famous deal numbers.
              The deal-numbering system created the first piece of
              common card-game folklore to emerge natively from the
              digital era.
            </p>
            <p>
              The choice to cap the deal range at 32,000 was
              arbitrary, a byproduct of the 16-bit integer arithmetic
              in the original shuffle. Later ports extended the range
              (often to 1 million or beyond), but the original cap
              shaped expectations. Players knew the Microsoft set was
              finite and catalogable, which in turn created space for
              the Internet FreeCell Project and the decades of solver
              work that grew around it. The conceit that a card game
              could have a complete, shared, exhaustible library of
              legitimate positions is Horne&rsquo;s invention.
            </p>
            <p>
              Horne has discussed the port in interviews as a project
              undertaken partly out of affection for Alfille&rsquo;s
              original and partly to fill the Windows Entertainment
              Pack lineup. Like Cherry, he has been generous about
              sharing credit and has consistently described the work
              as low-stakes at the time. That understatement is
              probably accurate; neither engineer appears to have
              expected the programs to become the most-installed
              games in computing history.
            </p>
            <p>
              A useful footnote: the 32,000 deal cap has occasionally
              been presented as arbitrary folklore, but Horne has
              explained in interviews that it simply reflected the
              range of a signed 16-bit integer used by the
              deal-entry dialog. Changing the cap would have
              required updating the shuffle code, the input parsing,
              and the stored-game format in the Windows Registry. At
              the time, nobody at Microsoft considered 32,000 deals
              insufficient. The number was large enough that no
              player would exhaust it, which turned out to be half
              right: the player base as a whole did exhaust it,
              through coordinated community effort, a decade after
              release.
            </p>
          </ContentBody>
        </CardSection>

        {/* Productivity Lost */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Office Life" id="productivity" icon={"\u2665"}>
            Productivity lost?
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Once Windows Solitaire was on every corporate desktop,
              the discourse about it changed. Journalists calculated
              hypothetical productivity costs. Consultancies floated
              figures in the billions. Internal IT departments weighed
              whether to delete the executable from corporate images.
              The estimates were mostly hand-waved. Research on the
              actual workplace impact of Solitaire was limited,
              methodologically shaky, and often motivated by editorial
              angles rather than by rigorous measurement. But the
              phenomenon was real enough: workers were playing, and
              their managers were noticing.
            </p>
            <p>
              A counter-thesis emerged at the same time. Some
              researchers and business writers argued that Solitaire
              was not a productivity leak but a productivity tool
              &mdash; that a few minutes spent moving cards reset
              attention, reduced frustration, and made longer focus
              sessions possible. That claim was also hard to measure
              with precision, but it lined up with broader research on
              micro-breaks and cognitive recovery. The more generous
              version of this argument pointed out that Solitaire had
              quietly taught millions of people to use a mouse, which
              made the next wave of graphical applications easier to
              adopt. On that view the game was infrastructure disguised
              as pastime.
            </p>
            <p>
              IT departments responded in predictable ways. Some hid
              or removed Solitaire from the standard image. Some
              blocked the executable at a group-policy level. Some
              shrugged. The countermeasures rarely worked for long,
              partly because new versions of the operating system
              reintroduced the games and partly because employees who
              wanted to play simply copied the executable from home.
              By the late 1990s, most corporate policies had settled
              on tolerance punctuated by occasional crackdowns.
            </p>
            <p>
              The cultural effect was larger than the economic one.
              Windows Solitaire produced a shared ritual &mdash; the
              clicked deck, the bouncing cards, the small dopamine
              hit of a finished foundation &mdash; that ran across
              industries and job titles. The game gave office workers
              a common language for a specific kind of micro-idleness.
              That language outlived Windows itself.
            </p>
          </ContentBody>
        </CardSection>

        {/* Cultural Imagination */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="In Culture" id="culture" icon={"\u2666"}>
            Solitaire in the cultural imagination
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Once Windows Solitaire became universal, it became a
              shorthand. Films and television used a shot of Solitaire
              on a monitor to communicate &ldquo;this office is dead
              inside&rdquo; or &ldquo;this employee is no longer
              engaged with their work.&rdquo; The image was
              unambiguous in a way that few other computing artifacts
              are. A spreadsheet might mean work; an email might mean
              anything; the green felt tableau meant one specific
              thing. The visual vocabulary was so settled that even
              viewers who had never played Solitaire could read it.
            </p>
            <p>
              The game also became internet material. Screenshots of
              the bouncing-cards victory animation circulated on forums
              through the 1990s and 2000s. Memes about being caught
              playing Solitaire by a passing boss predate most modern
              meme conventions. The cards, the pattern backgrounds,
              the timer in the bottom corner &mdash; each became a
              visual shorthand in adjacent corners of internet culture.
              When Microsoft retired the classic art in 2012, the
              reaction included a non-trivial thread of nostalgia: the
              game belonged to the people who grew up with it, not to
              the company that shipped it.
            </p>
            <p>
              Solitaire appeared in crime dramas (a detective killing
              time), in sitcoms (a coworker hiding a window), in
              comedic news segments (a senator caught playing during
              hearings), and in serious journalism about the slow
              texture of office life. The game&rsquo;s ubiquity made
              it useful symbolically in a way that few pieces of
              software have matched since. The modern equivalents &mdash;
              TikTok in a meeting, Slack during a call &mdash; do
              cultural work that Solitaire did first.
            </p>
          </ContentBody>
        </CardSection>

        {/* Microsoft Entertainment Pack */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Entertainment Pack" id="entertainment-pack" icon={"\u2663"}>
            The Microsoft Entertainment Pack
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Microsoft Entertainment Pack, released in several
              volumes starting in 1990, bundled Solitaire and FreeCell
              with a lineup of other small games: Minesweeper, TicTactics,
              Cruel, Golf, Tetris, Taipei (the Mahjong game), and a
              handful more. The Pack was a retail product, sold on
              floppy disks through computer stores, and it is the
              first place that FreeCell reached a broad consumer
              audience. Klondike Solitaire shipped with Windows 3.0,
              but FreeCell was an Entertainment Pack original before it
              migrated into the base install.
            </p>
            <p>
              The Entertainment Pack is also where several of
              Microsoft&rsquo;s other durable game franchises got their
              start. Minesweeper became the second most iconic
              Windows game, and its original artwork also came from
              Kare&rsquo;s contract work. Taipei introduced a
              generation of American players to Mahjong tile-matching.
              The Pack was, in effect, Microsoft&rsquo;s casual-games
              label before casual games had a label, and it trained
              the company in the economics of small, habit-forming
              software long before mobile app stores existed.
            </p>
            <p>
              The Entertainment Pack line faded in the late 1990s as
              its key titles migrated into the base Windows install.
              By Windows 95 the Entertainment Pack had effectively
              become the set of games you already had, and the retail
              boxes stopped appearing on shelves. What remained was
              the pattern: Microsoft owned the casual-games
              relationship with the Windows user, and that ownership
              was taken for granted across the next twenty years.
            </p>
          </ContentBody>
        </CardSection>

        {/* Through Windows Versions */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Versions" id="versions" icon={"\u2660"}>
            Solitaire through Windows versions
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Windows 3.0 shipped Klondike Solitaire. Windows 3.1
              polished the visuals and kept the core game. Windows 95
              added FreeCell to the base install, along with Hearts
              (networked) and the rest of the Entertainment Pack
              lineup folded inward. Windows 98 and Windows ME were
              incremental: minor visual refreshes, the same game, the
              same deals. Windows XP brought Spider Solitaire into
              the default set, which widened the franchise and
              introduced millions of users to a card game they had
              not previously played.
            </p>
            <p>
              Windows Vista and Windows 7 refreshed the visual design
              (the famous Aero-era card backs, the slightly glossier
              table surface, a redesigned animations palette). The
              core games did not change in any meaningful way, but
              the visuals carried the era&rsquo;s overall aesthetic.
              Windows 7&rsquo;s Solitaire is, for many long-time
              players, the canonical version &mdash; the one they
              remember when they remember the game.
            </p>
            <p>
              Windows 8 was the break. Microsoft removed the classic
              games from the base install and replaced them with the
              Microsoft Solitaire Collection, an ad-supported
              full-screen app distributed through the Windows Store.
              The change was strongly unpopular. Players noticed
              immediately that the game they had been playing for
              twenty years had been swapped for a product with
              banners, video pre-rolls, and a subscription offer. The
              core rules remained, but the experience had moved from
              &ldquo;part of the operating system&rdquo; to &ldquo;a
              separate app with a different philosophy.&rdquo;
            </p>
            <p>
              Windows 10 and Windows 11 continued the Collection
              model. The classic Solitaire and FreeCell binaries
              still ran if copied over from older machines, and a
              modest cottage industry grew up around repackaging the
              Windows 7 executables for later systems. The Microsoft
              Solitaire Collection itself remained a Windows Store
              fixture, now bundled across Xbox Live achievements and
              connected to Microsoft accounts. The arc from &ldquo;game
              you found in Accessories&rdquo; to &ldquo;app you
              signed into&rdquo; took about twenty-five years.
            </p>
          </ContentBody>
        </CardSection>

        {/* Microsoft Solitaire Collection */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Collection" id="collection" icon={"\u2665"}>
            The Microsoft Solitaire Collection (2012)
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The Microsoft Solitaire Collection, launched in 2012 on
              Windows 8, bundled Klondike, FreeCell, Spider, Pyramid,
              and TriPeaks into a single app with an achievements
              system, daily challenges, and an in-app store. The app
              was free to download and showed advertisements between
              games and as banners during play. A subscription product
              (Premium) removed the ads for a monthly or annual fee.
              The Collection was controversial at launch and has
              remained a mixed product in public reception.
            </p>
            <p>
              The controversy had two layers. First, the Collection
              replaced rather than supplemented the classic games,
              which meant users who upgraded Windows found their
              favorite free product swapped for an ad-supported one.
              Second, the advertising intensity was notably higher
              than players were used to, with 30-second video ads
              common between games. Microsoft adjusted the ad mix
              over the years, and the Premium subscription has
              remained an option, but the perception that the
              Collection is a monetization product rather than an
              included utility has stuck.
            </p>
            <p>
              Despite the reception, the Collection is probably the
              single most-played piece of software Microsoft ships.
              The install base is enormous, the player retention is
              strong, and the daily-challenge mechanism gives the app
              a reliable return-visit rhythm. As a business line, it
              is successful. As a cultural artifact, it is the thing
              that displaced something beloved.
            </p>
          </ContentBody>
        </CardSection>

        {/* Digital Afterlife */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Afterlife" id="afterlife" icon={"\u2666"}>
            Digital afterlife
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              The reaction to the Collection created space for a
              browser-based and mobile-app solitaire ecosystem to
              grow around Windows. Open-source projects like PySolFC
              preserved the classic rules and deal numberings. A
              generation of independent websites reimplemented
              Klondike and FreeCell with modern conveniences
              (unlimited undo, hint systems, statistics tracking)
              while keeping the visual grammar players remembered.
              Mobile apps took the same ideas to iOS and Android,
              where a single good Klondike app could earn a
              subscription revenue stream rivalling the Collection
              itself.
            </p>
            <p>
              That ecosystem is what we participate in at{" "}
              {siteConfig.siteName}. The continuity from Alfille to
              Cherry to Horne to the open web is direct: we ship the
              same rules, we render the same cards, we honor the
              same deal numberings, and we write for players who
              either grew up with Windows Solitaire or inherited the
              habit from someone who did. The card game has outlived
              the platform that carried it, which is the final move
              in the story this page tells.
            </p>
            <p>
              The mobile era added a second wave. iOS App Store and
              Google Play Store gave solitaire developers a direct
              channel to users who had moved on from desktop
              computing entirely. For a substantial share of players
              under forty, the first place they ever saw FreeCell
              was a phone, not a Windows machine, and the first
              Klondike they touched was a mobile app served with
              banner ads similar to those that now populate the
              Microsoft Solitaire Collection. That convergence &mdash;
              ad-supported mobile apps on one side, ad-supported
              desktop collection on the other &mdash; tells us
              something about the market&rsquo;s current resting
              state: solitaire is free to access, but it is usually
              monetized somewhere in the loop, and the platforms
              that deliver it compete on the quality of their
              monetization as much as on the quality of their
              implementation.
            </p>
            <p>
              Our hope is that the history here helps readers see
              what they are doing when they open a browser tab to
              play Solitaire: they are participating in a
              decades-long line that runs from hand-dealt patience
              games on nineteenth-century parlor tables, through the
              PLATO terminal rooms of the 1970s, into the office
              computers of the 1990s, and out into whatever comes
              next. The game is older than the computer, older than
              the operating system, older than Microsoft. Windows
              did not invent it. Windows made it universal.
            </p>
          </ContentBody>
        </CardSection>

        {/* Citations */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Citations" id="citations" icon={"\u2663"}>
            Sources and citations
          </SectionHeading>
          <ContentBody variant="dark" className="space-y-5">
            <p>
              Our primary sources for this piece are interviews with
              Wes Cherry and Jim Horne conducted by technology
              journalists over the years (we paraphrase rather than
              quote), Microsoft&rsquo;s own release materials for
              Windows 3.0 through Windows 11, Brian Dear&rsquo;s
              PLATO historical archive and the documented record of
              Paul Alfille&rsquo;s 1978 FreeCell implementation, and
              the academic and trade-press literature on workplace
              computing and casual games. Susan Kare&rsquo;s card art
              is documented in her own published design catalogue
              and in Microsoft&rsquo;s release notes from the
              Windows 3.0 era.
            </p>
            <p>
              Productivity-loss estimates cited in general culture
              over the years have rarely been rigorously
              methodologically supported, and we have not reproduced
              specific dollar figures here because the sourcing for
              them is usually weak. The qualitative claim that
              Solitaire became a universal office phenomenon is
              supported by a long track of contemporary news
              coverage, internal IT policy debates at large
              employers, and later academic retrospectives.
            </p>
            <p>
              Claims about the origin of specific variants
              (especially Spider Solitaire, whose pre-Windows
              pedigree is disputed in the card-game literature) are
              hedged in the text. Where we have had to choose between
              competing accounts, we have leaned on the sources
              closest to primary documentation.
            </p>
          </ContentBody>
        </CardSection>

        {/* Read next */}
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Read Next" id="related" icon={"\u2660"}>
            Related reading
          </SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-2">
            <ContentLinkCard
              variant="dark"
              href="/microsoft-freecell"
              title="Microsoft FreeCell Online"
              description="The 32,000 Microsoft deals, the same numbering, and the same rules — playable in the browser without a download."
            />
            <ContentLinkCard
              variant="dark"
              href="/famous-freecell-game-numbers"
              title="Famous FreeCell Game Numbers"
              description="The deal numbers that became their own folklore: brutally hard ones, beautiful ones, and the one that cannot be won."
            />
            <ContentLinkCard
              variant="dark"
              href="/history"
              title="Solitaire History"
              description="The longer patience tradition that Windows Solitaire grew out of, from eighteenth-century parlor games forward."
            />
            <ContentLinkCard
              variant="dark"
              href="/solitaire-history"
              title="A Short History of Patience"
              description="Our hub-level survey of the patience family: origins, regional traditions, and the moment the card game went digital."
            />
          </ContentBody>
        </CardSection>

        <CtaSection
          heading="Play the games the history describes"
          body={
            <>
              The card game outlasted the operating system. You can
              still play the rules that shipped with Windows 3.0,
              the deal numbers that shipped with the Entertainment
              Pack, and the variants that later Windows versions
              added &mdash; all in the browser, without the ads.
            </>
          }
          primaryLabel="Play FreeCell"
          primaryHref="/freecell"
          secondaryLabel="Read the full history"
          secondaryHref="/history"
        />
      </main>
    </ContentLayout>
  );
}
