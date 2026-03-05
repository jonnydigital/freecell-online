import Link from "next/link";
import type { Metadata } from "next";
import AdUnit from "../../components/AdUnit";
import ContentLayout from "../../components/ContentLayout";

export const metadata: Metadata = {
  title: "History of FreeCell | Who Invented FreeCell Solitaire?",
  description:
    "The complete history of FreeCell solitaire — from Paul Alfille's 1978 PLATO original to Microsoft FreeCell on Windows. Learn about Baker's Game, Game #11982, the one unsolvable deal, and how FreeCell became the world's most popular strategic card game.",
  keywords: [
    "freecell history",
    "who invented freecell",
    "microsoft freecell",
    "paul alfille freecell",
    "freecell origin",
    "freecell windows",
    "history of solitaire",
    "freecell game 11982",
    "freecell plato",
    "freecell solitaire history",
    "bakers game",
    "freecell mathematics",
    "freecell speedrun",
    "freecell mobile",
  ],
  openGraph: {
    title: "History of FreeCell | Who Invented FreeCell Solitaire?",
    description:
      "From a 1978 university mainframe to every Windows PC on Earth — the full story of FreeCell solitaire, its inventor Paul Alfille, Baker's Game, and the legendary unsolvable deal #11982.",
    url: "https://playfreecellonline.com/history",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const CARD = "card-panel";
const CARD_TOP: React.CSSProperties = {
  borderTop: "1px solid rgba(184, 134, 11, 0.08)",
};

/* ── FAQ data ── */

const historyFaqs = [
  {
    question: "Who invented FreeCell?",
    answer:
      "Paul Alfille, a medical student at the University of Illinois, created FreeCell in 1978. He programmed the first version on the PLATO educational computer system using the TUTOR programming language. Alfille's key innovation was replacing the stock pile found in most solitaire games with four open 'free cells' that serve as temporary storage, and dealing all 52 cards face-up so that every game becomes a pure test of strategic thinking.",
  },
  {
    question: "What is Baker's Game and how does it relate to FreeCell?",
    answer:
      "Baker's Game is an older solitaire variant created by C.L. Baker in the 1960s that served as the direct inspiration for FreeCell. Like FreeCell, Baker's Game uses four free cells as temporary storage and deals all cards face-up. The key difference is that Baker's Game requires building tableau columns by suit (e.g., 7 of hearts on 8 of hearts), while FreeCell allows building by alternating color (e.g., 7 of hearts on 8 of spades). This single rule change dramatically increased the percentage of solvable deals and made the game much more accessible to casual players.",
  },
  {
    question: "When was FreeCell added to Windows?",
    answer:
      "FreeCell was first included with Microsoft Windows in 1991 as part of the Win32s package and Windows 3.1 Entertainment Pack. Jim Horne, a Microsoft programmer, wrote the implementation and created the system of 32,000 numbered deals. It became a standard inclusion starting with Windows 95 in 1995 and shipped with every version of Windows through Windows 7. With Windows 8 in 2012, Microsoft replaced the standalone version with the Microsoft Solitaire Collection app.",
  },
  {
    question: "What is the unsolvable FreeCell game?",
    answer:
      "Game #11982 in the original Microsoft FreeCell (which has 32,000 numbered deals) is the only deal proven to be unsolvable. Despite millions of attempts by both human players and computer solvers, no solution has ever been found. Exhaustive computer analysis confirmed that every possible sequence of legal moves eventually leads to a dead end. The Internet FreeCell Project, which coordinated thousands of volunteers from 1994 to 2000, solved all other 31,999 deals.",
  },
  {
    question: "Are all FreeCell games winnable?",
    answer:
      "Nearly all of them. Of the original 32,000 Microsoft deals, only game #11982 is confirmed unsolvable. Eight other deals (#146, #455, #495, #512, #530, #1941, #6182, #8591) were long considered unsolvable but were eventually solved using advanced computer algorithms. Academic research analyzing millions of randomly generated deals has confirmed that approximately 99.999% of all possible FreeCell layouts have at least one solution, making it the most solvable form of solitaire ever created.",
  },
  {
    question: "Why is FreeCell different from other solitaire games?",
    answer:
      "FreeCell is unique because all 52 cards are dealt face-up from the start — there is no hidden information. This makes it a game of pure strategy rather than luck. The four free cells provide temporary storage that gives skilled players enough flexibility to solve nearly every deal. Most other solitaire variants like Klondike involve hidden cards and a significant luck component, meaning some games are unwinnable regardless of skill. In FreeCell, if you lose, it's almost always because of your decisions, not the cards.",
  },
  {
    question: "How many possible FreeCell deals exist?",
    answer:
      "The total number of possible FreeCell deals equals 52 factorial (52!), which is approximately 8.07 × 10^67 — an astronomically large number with 68 digits. This is far more arrangements than there are atoms in the observable universe (roughly 10^80, but atoms are vastly more numerous than card arrangements are relative to each other). Microsoft's original 32,000 deals represent an infinitesimally small sample of all possible games. Even if every person on Earth played a unique deal every second, it would take longer than the age of the universe to exhaust all possibilities.",
  },
  {
    question: "Is FreeCell still available on Windows?",
    answer:
      "The classic standalone FreeCell was removed starting with Windows 8 in 2012. Microsoft replaced it with the Microsoft Solitaire Collection app, which bundles FreeCell along with Klondike, Spider, Pyramid, and TriPeaks. The app is free but includes advertisements and video ads between games unless you subscribe to a premium plan. Many players prefer web-based versions like PlayFreeCellOnline.com for an ad-free experience that preserves the clean, distraction-free gameplay of the original.",
  },
];

/* ── Timeline data ── */

const timeline = [
  {
    year: "1960s",
    title: "C.L. Baker Invents Baker's Game",
    description:
      "Mathematician C.L. Baker creates a solitaire variant that deals all cards face-up and uses four temporary storage cells. Building is done by suit rather than alternating color, making the game extremely difficult. Baker's Game lays the groundwork for what will become FreeCell.",
  },
  {
    year: "1978",
    title: "Paul Alfille Creates FreeCell on PLATO",
    description:
      "Medical student Paul Alfille programs the first FreeCell game on the PLATO educational computer system at the University of Illinois. Written in the TUTOR programming language, it modifies Baker's Game by allowing alternating-color building, dramatically increasing solvability. The concept of four open temporary storage cells — the free cells — gives the game its name.",
  },
  {
    year: "1978–1989",
    title: "Spreading Through University Networks",
    description:
      "FreeCell spreads across the PLATO network, gaining a small but dedicated following among university students and staff. Several programmers create their own implementations for various platforms including DOS and early Macintosh systems. The game remains relatively obscure outside academic computing circles, known mainly to card game enthusiasts and computer hobbyists.",
  },
  {
    year: "1989",
    title: "Jim Horne Discovers FreeCell",
    description:
      "Microsoft programmer Jim Horne encounters FreeCell and recognizes its potential. He writes a polished version for Windows and makes a fateful design decision: assigning each deal a number from 1 to 32,000 using a specific random number generator seed. This seemingly small choice — giving every deal a reproducible number — becomes one of FreeCell's defining features, enabling players worldwide to compare notes on specific games.",
  },
  {
    year: "1991–1992",
    title: "Windows Entertainment Pack & Win32s",
    description:
      "Microsoft includes FreeCell in the Windows Entertainment Pack and the Win32s subsystem for Windows 3.1. The game serves dual purposes: entertaining users and demonstrating the graphical capabilities of the Windows platform. Early adopters begin cataloging which deals they can and can't solve, creating informal leaderboards in offices and university labs.",
  },
  {
    year: "1995",
    title: "Windows 95 Makes FreeCell Universal",
    description:
      "Microsoft bundles FreeCell with Windows 95, instantly placing it on tens of millions of desktops worldwide. For many people, this is their first encounter with the game. Office workers discover it during lunch breaks, students play between classes, and it quickly becomes one of the most-played computer games in history — not through marketing or retail sales, but because it was simply already installed on every PC sold.",
  },
  {
    year: "1994–2000",
    title: "The Internet FreeCell Project",
    description:
      "Dave Ring organizes the Internet FreeCell Project, a collaborative effort to solve all 32,000 Microsoft FreeCell deals. Volunteers around the world claim and attempt individual game numbers, reporting their results to a central registry. The project is one of the earliest examples of internet-powered crowdsourcing. By 2000, every deal has been solved except one: game #11982.",
  },
  {
    year: "2000–2005",
    title: "Game #11982 Confirmed Impossible",
    description:
      "Computer scientists deploy exhaustive search algorithms that systematically explore every possible sequence of legal moves in deal #11982. Every path leads to a dead end. The deal is mathematically proven to have no solution, making it the most famous unsolvable solitaire deal in history. The confirmation cements FreeCell's reputation as a game where losing is almost always the player's fault — with exactly one exception out of 32,000.",
  },
  {
    year: "2003–2008",
    title: "Solver Algorithms and Mathematical Research",
    description:
      "Researchers develop increasingly sophisticated FreeCell solvers using techniques from artificial intelligence and combinatorial search. These programs can solve most deals in under a second. Studies analyzing millions of randomly generated deals confirm that approximately 99.999% of all possible FreeCell games are solvable. Eight previously 'unsolvable' deals (#146, #455, #495, #512, #530, #1941, #6182, #8591) are finally cracked by advanced solvers, leaving #11982 alone.",
  },
  {
    year: "2007–2012",
    title: "The Smartphone Revolution",
    description:
      "The launch of the iPhone in 2007 and Android devices shortly after creates an entirely new platform for FreeCell. Touch-screen interfaces prove naturally suited to card games — tapping and dragging cards feels more intuitive than using a mouse. FreeCell apps rapidly climb app store charts, introducing the game to a generation that may never have used Windows desktop games.",
  },
  {
    year: "2012",
    title: "Windows 8 Removes Standalone FreeCell",
    description:
      "Microsoft drops the standalone FreeCell game with Windows 8, replacing it with the Microsoft Solitaire Collection. The change upsets loyal players who had decades of statistics saved in the classic version. The Solitaire Collection bundles FreeCell with Klondike, Spider, Pyramid, and TriPeaks but adds advertisements, video ads between games, and a premium subscription model — a stark contrast to the original free, ad-free version.",
  },
  {
    year: "2015–Present",
    title: "Browser-Based FreeCell and the Modern Era",
    description:
      "Web technologies like HTML5 and JavaScript enable feature-rich FreeCell implementations that run directly in the browser with no download required. Sites like PlayFreeCellOnline.com offer the classic experience with modern features: undo, auto-complete, statistics tracking, themed tables, and numbered deals. The core game remains unchanged from Alfille's 1978 original — a testament to the elegance of its design.",
  },
];

/* ── Fun facts ── */

const funFacts = [
  {
    fact: "FreeCell was a medical school distraction",
    detail:
      "Paul Alfille created FreeCell while he was supposed to be studying medicine at the University of Illinois. He later became a surgeon — proving that a little procrastination doesn't always hurt your career.",
  },
  {
    fact: "The 32,000-deal system was arbitrary",
    detail:
      "Jim Horne chose 32,000 deals for Microsoft FreeCell because it was a convenient number for the random number generator he used. There was no mathematical reason — it just worked well with a 15-bit signed integer (2^15 = 32,768).",
  },
  {
    fact: "Only 1 in 32,000 is impossible",
    detail:
      "Deal #11982 is the only unsolvable game among the original 32,000 Microsoft FreeCell deals. That's a 99.997% solvability rate. When you lose, it's almost certainly your strategy, not the cards.",
  },
  {
    fact: "FreeCell taught people to use a mouse",
    detail:
      "In the 1990s, Microsoft deliberately included card games with Windows to help users practice drag-and-drop mouse skills. FreeCell, Solitaire, and Minesweeper were stealth training tools disguised as entertainment.",
  },
  {
    fact: "The Internet FreeCell Project was early crowdsourcing",
    detail:
      "Before Wikipedia, before crowdfunding, the Internet FreeCell Project (started in 1994) coordinated thousands of volunteers worldwide to solve all 32,000 deals — one of the earliest examples of internet-powered collaborative problem-solving.",
  },
  {
    fact: "FreeCell has zero luck",
    detail:
      "Unlike Klondike solitaire where roughly 20% of games are unwinnable due to hidden card positions, FreeCell deals all 52 cards face-up. Every piece of information is visible from the start. Winning or losing comes down entirely to skill and planning.",
  },
  {
    fact: "Eight 'impossible' deals were actually possible",
    detail:
      "For years, deals #146, #455, #495, #512, #530, #1941, #6182, and #8591 were believed to be unsolvable alongside #11982. Advanced computer solvers eventually cracked all eight, leaving #11982 as the sole holdout.",
  },
  {
    fact: "The name 'free cell' is literal",
    detail:
      "Paul Alfille named the game after its defining mechanic: four cells that are 'free' to hold any single card temporarily. Before FreeCell, no widely known solitaire game used this exact open-storage concept.",
  },
  {
    fact: "More deals than atoms in the universe",
    detail:
      "A standard 52-card deck can be arranged in 52! (about 8 × 10^67) different ways. Even playing one unique FreeCell deal per second since the Big Bang, you'd have barely scratched the surface of all possible games.",
  },
  {
    fact: "FreeCell has a competitive speedrunning community",
    detail:
      "Dedicated speedrunners compete to solve specific FreeCell deals in the fewest seconds possible. Top players can solve many deals in under 30 seconds, relying on pattern recognition and rapid move sequencing honed over thousands of games.",
  },
];

/* ── Helper components ── */

function SectionHeading({
  children,
  id,
  sub,
  icon,
}: {
  children: React.ReactNode;
  id?: string;
  sub?: string;
  icon?: string;
}) {
  return (
    <div className="px-6 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-0">
      {sub && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#B8860B]/60 mb-1.5 block">
          {sub}
        </span>
      )}
      <h2
        id={id}
        className="text-2xl sm:text-3xl font-bold text-[#2a2522]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {icon && <span className="mr-2 text-[#c9a84c]">{icon}</span>}
        {children}
      </h2>
      <div className="card-title-separator mt-5" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function HistoryPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "History of FreeCell: From 1978 PLATO to Microsoft Windows and Beyond",
      description:
        "The complete history of FreeCell solitaire — Paul Alfille's invention, Baker's Game origins, Microsoft's adoption, the Internet FreeCell Project, Game #11982, FreeCell mathematics, and the game's cultural legacy.",
      author: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
      publisher: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
      datePublished: "2026-02-20",
      dateModified: "2026-03-02",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://playfreecellonline.com/history",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: historyFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <ContentLayout variant="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ── */}
      <header className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 px-6 text-center overflow-hidden">
        <div
          className="absolute top-10 left-[10%] text-6xl sm:text-8xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2663"}
        </div>
        <div
          className="absolute top-16 right-[8%] text-5xl sm:text-7xl text-red-500/[0.04] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2666"}
        </div>
        <div
          className="absolute bottom-4 left-[18%] text-5xl sm:text-6xl text-white/[0.03] select-none pointer-events-none"
          aria-hidden="true"
        >
          {"\u2660"}
        </div>

        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#D4AF37] mb-4 max-w-3xl mx-auto leading-tight"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          History of FreeCell
        </h1>
        <p className="text-[#6B7280] text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
          From a university mainframe in 1978 to every Windows desktop on
          Earth — the story of the card game that proved solitaire could be
          a game of pure skill.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span className="text-[#D4AF37] text-sm">
            {"\u2660"} {"\u2665"} {"\u2666"} {"\u2663"}
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </header>

      {/* ── Table of Contents ── */}
      <nav className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 mb-12">
        <div className="flex md:flex-wrap md:justify-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {[
            ["#origins", "\u2660", "Origins"],
            ["#bakers-game", "\u2663", "Baker\u2019s Game"],
            ["#microsoft", "\u2665", "Microsoft Era"],
            ["#timeline", "\u2666", "Timeline"],
            ["#11982", "\u2660", "Game #11982"],
            ["#mathematics", "\u2663", "Mathematics"],
            ["#cultural-impact", "\u2665", "Cultural Impact"],
            ["#speedrunning", "\u2666", "Speedrunning"],
            ["#mobile-web", "\u2660", "Mobile & Web"],
            ["#fun-facts", "\u2663", "Fun Facts"],
            ["#faq", "\u2665", "FAQ"],
          ].map(([href, icon, label]) => (
            <a
              key={href}
              href={href}
              className="rounded-full px-5 py-2 border border-[#D4AF37]/30 bg-transparent text-sm tracking-wide text-[#D4AF37] flex items-center gap-2 transition-all hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/50 whitespace-nowrap shrink-0"
            >
              <span
                className={`text-sm ${icon === "\u2665" || icon === "\u2666" ? "text-red-400" : ""}`}
              >
                {icon}
              </span>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ── Content ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 pb-20 flex flex-col gap-12">
        {/* Section: Origins */}
        <section id="origins" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Where It All Began"
              id="origins-heading"
              icon={"\u2660"}
            >
              Paul Alfille and the Invention of FreeCell
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                In 1978, Paul Alfille was a medical student at the University of
                Illinois at Urbana-Champaign. Like many students of the era, he
                spent time on the PLATO system — a groundbreaking educational
                computer network that predated the modern internet by more than
                a decade. PLATO was built for education, but it also happened to
                host some of the world&apos;s earliest computer games, from
                multiplayer dungeon crawlers to flight simulators. In that
                environment of experimentation and play, Alfille set out to
                solve a problem that had bothered card game enthusiasts for
                generations.
              </p>
              <p>
                Most solitaire games deal some cards face-down, meaning your
                fate partially depends on what you can&apos;t see. You might
                play perfectly and still lose because a critical card was buried
                in an inaccessible position. Alfille wanted to eliminate that
                hidden information entirely. He was familiar with{" "}
                <a href="#bakers-game" className="text-[#D4AF37] hover:underline">
                  Baker&apos;s Game
                </a>
                , an older solitaire variant that dealt all cards face-up, but
                found it too restrictive — its requirement to build by suit
                made too many deals unsolvable.
              </p>
              <p>
                Alfille&apos;s solution was deceptively simple but profoundly
                effective: keep Baker&apos;s Game&apos;s open layout with all
                52 cards visible, but change one rule. Instead of building
                tableau columns by suit, players could build by alternating
                color — red on black, black on red. This single modification
                dramatically increased the number of solvable deals, taking the
                solvability rate from roughly 75% (Baker&apos;s Game) to over
                99.999% (FreeCell).
              </p>
              <p>
                The game retained four temporary storage spaces — the{" "}
                <Link
                  href="/glossary#free-cell"
                  className="text-[#D4AF37] hover:underline"
                >
                  free cells
                </Link>{" "}
                — where any single card could be parked while you rearranged the{" "}
                <Link
                  href="/glossary#tableau"
                  className="text-[#D4AF37] hover:underline"
                >
                  tableau
                </Link>
                . The result was a game where nearly every deal has a solution,
                and finding that solution requires genuine strategic thinking.
                No blaming bad luck. No praying for a helpful card to turn
                over. Just you, 52 visible cards, and your ability to plan
                ahead.
              </p>
              <p>
                Alfille programmed FreeCell in the TUTOR language, which was
                PLATO&apos;s native programming environment. TUTOR was
                remarkably advanced for its time, supporting graphics, touch
                screens, and networked communication. This allowed Alfille to
                create a polished graphical card game that players could
                interact with intuitively. The game spread across PLATO&apos;s
                network of terminals at universities and military installations,
                earning a small but passionate following among students,
                professors, and system administrators who spent their evenings
                trying to crack difficult deals.
              </p>
              <p>
                For the next decade, FreeCell remained a niche game known
                primarily to people who had access to PLATO terminals. Several
                programmers encountered the game on PLATO and wrote their own
                versions for personal computers — early DOS implementations,
                Macintosh ports, and versions for various Unix systems. But
                without a distribution channel to match PLATO&apos;s reach,
                FreeCell stayed an insider&apos;s game, waiting for the moment
                that would bring it to a global audience.
              </p>

              <div className="card-inset rounded-lg p-5 mt-4">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-2"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  What Made FreeCell Revolutionary
                </h3>
                <ul className="space-y-2 text-[#444444]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">
                      {"\u2660"}
                    </span>
                    <span>
                      <strong>Complete information</strong> — all 52 cards
                      visible from the start, eliminating luck entirely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 shrink-0">
                      {"\u2665"}
                    </span>
                    <span>
                      <strong>Free cells</strong> — temporary storage that
                      gives skilled players the flexibility to untangle complex
                      layouts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 shrink-0">
                      {"\u2666"}
                    </span>
                    <span>
                      <strong>Near-universal solvability</strong> — roughly
                      99.999% of deals can be won with perfect play
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#B8860B] mt-1 shrink-0">
                      {"\u2663"}
                    </span>
                    <span>
                      <strong>Skill-based outcomes</strong> — your{" "}
                      <Link
                        href="/tips"
                        className="text-[#D4AF37] hover:underline"
                      >
                        win rate
                      </Link>{" "}
                      is a direct measure of your strategic ability
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* Section: Baker's Game */}
        <section id="bakers-game" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Predecessor"
              id="bakers-game-heading"
              icon={"\u2663"}
            >
              Baker&apos;s Game: The Foundation FreeCell Built Upon
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                To understand FreeCell, you need to understand the game it
                evolved from. Baker&apos;s Game, created by C.L. Baker in the
                1960s, was one of the first solitaire variants to deal all
                cards face-up. Baker, a mathematician, wanted a solitaire
                game that tested logical reasoning rather than luck. His design
                was clever: deal all 52 cards into eight tableau columns, provide
                four{" "}
                <Link
                  href="/glossary#free-cell"
                  className="text-[#D4AF37] hover:underline"
                >
                  free cells
                </Link>{" "}
                for temporary storage, and four{" "}
                <Link
                  href="/glossary#foundation"
                  className="text-[#D4AF37] hover:underline"
                >
                  foundation
                </Link>{" "}
                piles where cards are built up by suit from Ace to King.
              </p>
              <p>
                The critical difference between Baker&apos;s Game and FreeCell
                lies in one rule: how you build sequences on the tableau.
                In Baker&apos;s Game, tableau columns must be built down{" "}
                <em>by suit</em> — you can only place the 7 of hearts on the
                8 of hearts, the 5 of spades on the 6 of spades, and so on.
                This restriction sounds minor, but its consequences are
                enormous. Building by suit means you have far fewer legal
                moves at any given point, which means far more deals reach
                dead ends no matter how well you play.
              </p>
              <p>
                Research has estimated that only about 75% of randomly dealt
                Baker&apos;s Game layouts are solvable — compared to FreeCell&apos;s
                99.999%. That 25% gap represents the difference between a game
                that sometimes feels unfair and one that almost never is. When
                Paul Alfille changed the building rule to alternating colors
                (red on black, black on red), he preserved Baker&apos;s Game&apos;s
                intellectual depth while making the game dramatically more
                accessible.
              </p>
              <p>
                Baker&apos;s Game still exists and has its own devoted
                following among solitaire purists who appreciate its greater
                difficulty. Some{" "}
                <Link
                  href="/solitaire-types"
                  className="text-[#D4AF37] hover:underline"
                >
                  solitaire variants
                </Link>{" "}
                offer Baker&apos;s Game as an alternative mode alongside
                FreeCell, and it remains a favorite among players who have
                mastered FreeCell and want a stiffer challenge. But it was
                Alfille&apos;s modification — that single rule change about
                alternating colors — that transformed an academic curiosity
                into the world&apos;s most popular strategic card game.
              </p>

              <div className="card-inset rounded-lg p-5 mt-2">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  Baker&apos;s Game vs. FreeCell: Key Differences
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e5e0d8]">
                        <th className="text-left py-2 pr-4 font-semibold text-[#2a2522]">Feature</th>
                        <th className="text-left py-2 pr-4 font-semibold text-[#2a2522]">Baker&apos;s Game</th>
                        <th className="text-left py-2 font-semibold text-[#2a2522]">FreeCell</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#444444]">
                      <tr className="border-b border-[#e5e0d8]/50">
                        <td className="py-2 pr-4">Tableau building</td>
                        <td className="py-2 pr-4">By suit</td>
                        <td className="py-2">Alternating color</td>
                      </tr>
                      <tr className="border-b border-[#e5e0d8]/50">
                        <td className="py-2 pr-4">Cards visible</td>
                        <td className="py-2 pr-4">All 52</td>
                        <td className="py-2">All 52</td>
                      </tr>
                      <tr className="border-b border-[#e5e0d8]/50">
                        <td className="py-2 pr-4">Free cells</td>
                        <td className="py-2 pr-4">4</td>
                        <td className="py-2">4</td>
                      </tr>
                      <tr className="border-b border-[#e5e0d8]/50">
                        <td className="py-2 pr-4">Solvability rate</td>
                        <td className="py-2 pr-4">~75%</td>
                        <td className="py-2">~99.999%</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">Difficulty</td>
                        <td className="py-2 pr-4">Very hard</td>
                        <td className="py-2">Challenging but fair</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* Section: Microsoft FreeCell */}
        <section id="microsoft" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="From Niche to Worldwide"
              id="microsoft-heading"
              icon={"\u2665"}
            >
              Microsoft FreeCell: Windows 3.1 to Windows 10
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                FreeCell might have remained a footnote in computing history if
                not for one person: Jim Horne. A programmer at Microsoft,
                Horne encountered FreeCell in the late 1980s and immediately
                recognized something special about the game. Here was a
                solitaire variant that rewarded thinking over luck, where
                skilled players could expect to win nearly every time. He
                wrote a Windows version and pitched it for inclusion in
                Microsoft&apos;s growing collection of bundled games.
              </p>
              <p>
                Horne made a design decision that would prove crucial to
                FreeCell&apos;s legacy: he assigned every deal a number. Using
                a specific random number generator seeded with integers from
                1 to 32,000, each number always produced the same card layout.
                Game #1 was always the same game. Game #17000 was always the
                same game. This meant that players around the world could
                compare notes on specific deals, debate{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  strategies
                </Link>{" "}
                for particular numbers, and challenge each other to solve the
                trickiest layouts.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Windows 3.1 and the Entertainment Pack (1991–1994)
              </h3>
              <p>
                FreeCell first appeared as part of the Windows Entertainment
                Pack and the Win32s subsystem for Windows 3.1. At this stage
                it was an optional download, not a default inclusion. The
                interface was simple — 256-color graphics, basic card designs,
                and a no-frills menu bar. But the gameplay was already
                addictive. Early adopters in corporate offices and university
                computer labs began keeping handwritten lists of which deal
                numbers they had conquered.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Windows 95: The Tipping Point (1995)
              </h3>
              <p>
                When Microsoft bundled FreeCell with Windows 95, the game went
                from a curiosity to a phenomenon overnight. Windows 95 sold
                over 40 million copies in its first year, and every single one
                came with FreeCell pre-installed. For millions of people, it
                was the first time they encountered a solitaire game where
                skill actually mattered. The timing was perfect: the mid-1990s
                saw an explosion of home computer ownership, and FreeCell was
                there on every desktop, waiting to be discovered.
              </p>
              <p>
                Office workers found it during lunch breaks. Students stumbled
                across it between assignments. IT administrators played it
                during late-night server maintenance. FreeCell became a
                universal shared experience — the game everyone had played
                but nobody had bought. It generated zero revenue for Microsoft
                directly, but it helped make Windows feel friendly and
                personal.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Windows XP Through Windows 7: The Golden Era (2001–2012)
              </h3>
              <p>
                FreeCell&apos;s inclusion continued through every major Windows
                release. Windows XP (2001) brought updated graphics and a
                cleaner interface. Windows Vista (2007) added a redesigned
                card set and improved animations. Windows 7 (2009) polished
                the experience further with better visual effects and smoother
                gameplay. Through it all, the core game remained identical to
                what Alfille had designed in 1978 — the same rules, the same
                four free cells, the same 52 face-up cards.
              </p>
              <p>
                By the Windows XP era, FreeCell had become so entrenched in
                workplace culture that IT departments reportedly received
                requests to remove it from company machines to reduce
                distractions. Some companies did exactly that. Others
                recognized that a few minutes of FreeCell between tasks
                could serve as a genuine mental reset — a low-stakes puzzle
                that exercises working memory and{" "}
                <Link
                  href="/how-to-play"
                  className="text-[#D4AF37] hover:underline"
                >
                  planning skills
                </Link>{" "}
                without the emotional investment of more complex games.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Windows 8 and the Microsoft Solitaire Collection (2012–Present)
              </h3>
              <p>
                With Windows 8 in 2012, Microsoft made a controversial
                decision: the standalone FreeCell app was gone. In its place
                was the Microsoft Solitaire Collection, a unified app that
                bundled FreeCell with Klondike, Spider, Pyramid, and TriPeaks.
                The new app looked modern and offered daily challenges, but it
                also introduced something the original never had:
                advertisements. Players who had enjoyed decades of ad-free
                FreeCell now faced video ads between games unless they paid
                for a premium subscription.
              </p>
              <p>
                The backlash was significant. Long-time players mourned the
                loss of their statistics, their familiar interface, and the
                simplicity of a game that just launched and played without
                asking for anything. Windows 10 continued with the Solitaire
                Collection model, and while the app itself is well-made, the
                ad-supported model drove many dedicated FreeCell players to
                seek alternatives — including the growing number of{" "}
                <a href="#mobile-web" className="text-[#D4AF37] hover:underline">
                  web-based and mobile versions
                </a>{" "}
                that recaptured the clean, distraction-free experience of the
                original.
              </p>
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* Section: Timeline */}
        <section id="timeline" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Year by Year"
              id="timeline-heading"
              icon={"\u2666"}
            >
              FreeCell Through the Decades
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-0">
              {timeline.map((entry, i) => (
                <div key={entry.year} className="flex gap-4 sm:gap-6 group">
                  {/* Timeline line + dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#D4AF37] border-2 border-[#B8860B] shadow-sm mt-1.5" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-[#D4AF37]/20" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-8">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
                      {entry.year}
                    </span>
                    <h3
                      className="font-medium text-[#2a2522] text-lg mt-1 mb-2"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      {entry.title}
                    </h3>
                    <p className="text-[#444444] leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <AdUnit className="my-2" />

        {/* Section: Game #11982 */}
        <section id="11982" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Impossible Deal"
              id="11982-heading"
              icon={"\u2660"}
            >
              Game #11982: FreeCell&apos;s Only Unsolvable Deal
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Among the original 32,000 numbered deals in Microsoft FreeCell,
                game #11982 holds a unique distinction: it is the only deal that
                has been mathematically proven to have no solution. Every other
                deal — all 31,999 of them — can be solved with the right
                sequence of moves. This one cannot.
              </p>
              <p>
                The story of how we know this is itself remarkable. In the
                mid-1990s, a volunteer effort called the Internet FreeCell
                Project set out to solve every single one of those 32,000
                deals. Organized by Dave Ring, the project was one of the
                internet&apos;s earliest crowdsourcing endeavors — years before
                that term existed. Volunteers would claim game numbers, attempt
                to solve them by hand, and report their results to Ring, who
                maintained a central registry tracking the status of each deal.
              </p>
              <p>
                The project attracted thousands of participants from around the
                world. Some were casual players who claimed a handful of deals.
                Others were obsessives who worked through hundreds, documenting
                move sequences and sharing{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  strategies
                </Link>{" "}
                for the most difficult layouts. By the late 1990s, every deal
                had been solved except #11982 and a handful of others that
                would eventually fall to more advanced solving techniques.
              </p>
              <p>
                Computer scientists later confirmed what thousands of human
                players suspected: deal #11982 is genuinely impossible.
                Exhaustive search algorithms — programs that systematically
                explore every possible sequence of legal moves — proved that
                every path leads to a dead end. No matter how brilliant your{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  strategy
                </Link>
                , this particular arrangement of cards simply cannot be
                untangled. The proof is absolute: there is no combination
                of moves, no matter how long or convoluted, that leads to
                all four foundation piles being completed.
              </p>

              <div className="card-inset rounded-lg p-5 mt-2">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  The Numbers Behind the Legend
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <div
                      className="text-3xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      32,000
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      original Microsoft deals
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      31,999
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      confirmed solvable
                    </div>
                  </div>
                  <div>
                    <div
                      className="text-3xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      1
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      proven impossible (#11982)
                    </div>
                  </div>
                </div>
              </div>

              <p>
                Interestingly, eight other deals were long thought to be
                unsolvable: #146, #455, #495, #512, #530,{" "}
                <Link
                  href="/game/1941"
                  className="text-[#D4AF37] hover:underline"
                >
                  #1941
                </Link>
                , #6182, and #8591. As solver algorithms improved over the
                years, solutions were found for all eight. Some required
                over 100 moves and extremely precise play — sequences so
                unintuitive that no human player had discovered them — but
                they were all technically winnable, making #11982 the sole
                holdout.
              </p>
              <p>
                Want to try your hand at the impossible? You can{" "}
                <Link
                  href="/game/11982"
                  className="text-[#D4AF37] hover:underline"
                >
                  play Game #11982 here
                </Link>{" "}
                and see for yourself why it defeated every human and computer
                solver. Or try some of the notoriously difficult (but
                solvable) deals like{" "}
                <Link
                  href="/game/169"
                  className="text-[#D4AF37] hover:underline"
                >
                  #169
                </Link>{" "}
                or{" "}
                <Link
                  href="/game/178"
                  className="text-[#D4AF37] hover:underline"
                >
                  #178
                </Link>{" "}
                to test your{" "}
                <Link
                  href="/tips"
                  className="text-[#D4AF37] hover:underline"
                >
                  skills
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Section: Mathematics */}
        <section id="mathematics" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Numbers Behind the Game"
              id="mathematics-heading"
              icon={"\u2663"}
            >
              FreeCell Mathematics: Why 99.999% of Deals Are Solvable
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                FreeCell occupies a fascinating position in the intersection
                of recreational mathematics and computer science. Unlike most
                card games, where probability and chance dominate the analysis,
                FreeCell&apos;s open-information design means it can be studied
                as a pure combinatorial puzzle. And the numbers that emerge
                from that study are remarkable.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                How Many FreeCell Deals Exist?
              </h3>
              <p>
                A standard deck of 52 cards can be arranged in 52 factorial
                (52!) different orders — approximately 8.07 × 10<sup>67</sup>.
                That&apos;s an 8 followed by 67 zeros. To put this in
                perspective: there are roughly 10<sup>80</sup> atoms in the
                observable universe. While that&apos;s a larger number, the
                number of possible card arrangements is still mind-bogglingly
                vast. If every person who has ever lived (roughly 100 billion)
                played a unique FreeCell deal every second since the Big
                Bang (13.8 billion years ago), they would have collectively
                played about 4.35 × 10<sup>28</sup> deals — barely a
                scratch on the surface of all possible games.
              </p>
              <p>
                Microsoft&apos;s original 32,000 deals, which formed the
                basis for decades of FreeCell play and research, represent
                an infinitesimally small fraction of all possible games.
                Later versions expanded to 1,000,000 numbered deals, but
                even a million is effectively zero when measured against
                52 factorial.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                The 99.999% Solvability Rate
              </h3>
              <p>
                The question that fascinates both mathematicians and players
                is: what fraction of all possible FreeCell deals are solvable?
                The answer, based on extensive computational research, is
                approximately 99.999%. This figure comes from studies that
                generated millions of random deals and applied sophisticated
                solving algorithms to each one. The unsolvable deals that
                do exist tend to share certain structural characteristics —
                configurations where key cards are trapped in positions
                that no sequence of moves can untangle.
              </p>
              <p>
                The high solvability rate is a direct consequence of
                Alfille&apos;s design decision to allow alternating-color
                building. The four free cells provide just enough flexibility
                to navigate around obstacles, while the alternating-color
                rule ensures that useful moves are almost always available.
                It&apos;s a beautifully balanced system: challenging enough
                that winning feels like an achievement, but fair enough that
                losing feels like a learning opportunity rather than bad luck.
              </p>

              <h3
                className="font-medium text-[#2a2522] text-lg pt-2"
                style={{
                  fontFamily: "var(--font-playfair), Georgia, serif",
                }}
              >
                Computational Complexity
              </h3>
              <p>
                From a computer science perspective, solving a FreeCell deal
                is an NP-complete problem — meaning that while solutions can
                be verified quickly, finding them efficiently is theoretically
                difficult. In practice, however, modern FreeCell solvers use
                heuristics and pruning techniques that solve most deals in
                milliseconds. The best solvers combine depth-first search with
                pattern recognition, evaluating positions based on factors
                like column homogeneity, card accessibility, and{" "}
                <Link
                  href="/glossary#foundation"
                  className="text-[#D4AF37] hover:underline"
                >
                  foundation
                </Link>{" "}
                progress.
              </p>
              <p>
                These solver algorithms have practical applications beyond
                FreeCell. The techniques developed to search FreeCell&apos;s
                game tree — efficiently pruning dead-end branches, managing
                large state spaces, and balancing exploration with
                exploitation — have informed research in automated planning,
                constraint satisfaction, and even protein folding. FreeCell,
                in its quiet way, has contributed to the broader field of
                artificial intelligence.
              </p>

              <div className="card-inset rounded-lg p-5 mt-2">
                <h3
                  className="font-medium text-[#2a2522] text-lg mb-3"
                  style={{
                    fontFamily: "var(--font-playfair), Georgia, serif",
                  }}
                >
                  FreeCell by the Numbers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-3">
                    <div
                      className="text-2xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      8.07 × 10<sup>67</sup>
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      total possible deals (52!)
                    </div>
                  </div>
                  <div className="text-center p-3">
                    <div
                      className="text-2xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      99.999%
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      estimated solvable deals
                    </div>
                  </div>
                  <div className="text-center p-3">
                    <div
                      className="text-2xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      ~75%
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      Baker&apos;s Game solvability (by comparison)
                    </div>
                  </div>
                  <div className="text-center p-3">
                    <div
                      className="text-2xl font-bold text-[#D4AF37]"
                      style={{
                        fontFamily: "var(--font-playfair), Georgia, serif",
                      }}
                    >
                      NP-complete
                    </div>
                    <div className="text-sm text-[#6B7280] mt-1">
                      computational complexity class
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Cultural Impact */}
        <section id="cultural-impact" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Beyond the Game"
              id="cultural-impact-heading"
              icon={"\u2665"}
            >
              FreeCell&apos;s Cultural Impact
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                FreeCell&apos;s impact extends far beyond the game itself.
                As one of the three card games bundled with Windows (alongside{" "}
                <Link
                  href="/solitaire-types"
                  className="text-[#D4AF37] hover:underline"
                >
                  Klondike Solitaire
                </Link>{" "}
                and Minesweeper), it became a shared cultural experience for
                an entire generation of computer users. In the 1990s and 2000s,
                FreeCell was often the first game people played on a new
                computer — the digital equivalent of breaking in a new deck
                of cards.
              </p>
              <p>
                In the workplace, FreeCell became synonymous with office
                downtime. IT departments joked about removing it from company
                machines, and more than a few managers walked past employee
                screens showing suspiciously quick Alt-Tab reflexes. A 2003
                survey estimated that American workers collectively spent
                billions of hours per year playing Windows card games, with
                FreeCell and Klondike accounting for the vast majority. Rather
                than viewing this as pure waste, some researchers argued
                that brief game breaks improved focus and productivity — a
                mental palate cleanser between cognitively demanding tasks.
              </p>
              <p>
                FreeCell also served an unexpected educational role. Microsoft
                originally included card games with Windows specifically to
                help users learn mouse skills — particularly drag-and-drop
                operations that were unfamiliar to people transitioning from
                keyboard-only interfaces. For millions of people in the early
                1990s, moving cards around in FreeCell was their first
                experience using a mouse to interact with objects on a screen.
                Solitaire taught clicking and dragging; FreeCell added
                strategic thinking on top.
              </p>
              <p>
                The Internet FreeCell Project (1994–2000) was a pioneering
                example of crowdsourced problem-solving that predated the
                term &quot;crowdsourcing&quot; by a decade. Years before
                Wikipedia, before citizen science platforms like Folding@home,
                thousands of volunteers coordinated online to systematically
                solve all 32,000 Microsoft FreeCell deals. The project
                demonstrated that large-scale collaborative efforts could
                accomplish what no individual could do alone, and it did so
                purely for the satisfaction of completing the challenge — no
                prizes, no funding, just collective curiosity.
              </p>
              <p>
                Today, FreeCell remains one of the most popular{" "}
                <Link
                  href="/solitaire-types"
                  className="text-[#D4AF37] hover:underline"
                >
                  solitaire card games
                </Link>{" "}
                in the world. Its appeal hasn&apos;t faded because its core
                design is genuinely excellent: perfect information, deep
                strategy, and the satisfying knowledge that nearly every deal
                is solvable if you play well enough. Whether you first
                discovered it on a PLATO terminal, a Windows 95 desktop, or a
                modern browser, the game is the same — and that timelessness
                is its greatest achievement.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Speedrunning */}
        <section id="speedrunning" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Competitive FreeCell"
              id="speedrunning-heading"
              icon={"\u2666"}
            >
              The Speedrunning and Competitive Community
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                While most people play FreeCell casually, a dedicated
                competitive community has emerged around the game, pushing
                the boundaries of how fast and how consistently deals can
                be solved. FreeCell speedrunning — completing deals as
                quickly as possible — has become a niche but passionate
                pursuit with its own leaderboards, techniques, and culture.
              </p>
              <p>
                Top speedrunners can solve many standard deals in under 30
                seconds, with exceptional runs on favorable layouts dipping
                below 15 seconds. These players rely on pattern recognition
                developed over thousands of hours of play, instantly
                identifying common card configurations and the move
                sequences that resolve them. They process information
                about all 52 cards within the first few seconds of seeing
                a deal, mentally mapping out the critical{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  strategic decisions
                </Link>{" "}
                before making their first move.
              </p>
              <p>
                Beyond raw speed, some competitive players focus on
                consistency — maintaining the highest possible win rate
                across hundreds or thousands of consecutive random deals.
                A skilled player might maintain a win rate above 99% over
                a large sample, losing only to the rare genuinely difficult
                layouts. The{" "}
                <Link
                  href="/streak"
                  className="text-[#D4AF37] hover:underline"
                >
                  streak challenge
                </Link>{" "}
                — how many consecutive games you can win — adds another
                dimension, where a single loss resets your count and the
                psychological pressure of a long streak becomes part of
                the challenge.
              </p>
              <p>
                The competitive community has also driven the development
                of analysis tools. Players review their completed games
                to identify suboptimal moves, similar to how chess players
                analyze their games with engines. Some platforms offer
                post-game analysis that compares your move sequence to
                the optimal solution, highlighting where you made
                unnecessary moves or missed more efficient paths. These
                tools have helped raise the overall skill level of the
                community and given new players a structured way to
                improve their{" "}
                <Link
                  href="/how-to-play"
                  className="text-[#D4AF37] hover:underline"
                >
                  gameplay
                </Link>
                .
              </p>
              <p>
                Competitive FreeCell may never rival chess or esports in
                scale, but its community embodies something appealing:
                the idea that even a simple card game, played with enough
                dedication and analytical rigor, can become a deep
                skill-based pursuit. The gap between a casual player
                and an expert is enormous, and bridging that gap requires
                genuine study — learning{" "}
                <Link
                  href="/tips"
                  className="text-[#D4AF37] hover:underline"
                >
                  techniques
                </Link>
                , developing intuition, and accepting that every loss is
                a lesson.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Mobile & Web */}
        <section id="mobile-web" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Modern Era"
              id="mobile-web-heading"
              icon={"\u2660"}
            >
              FreeCell&apos;s Evolution to Mobile and Web
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                The launch of Apple&apos;s iPhone in 2007 and the subsequent
                explosion of smartphone apps created an entirely new chapter
                in FreeCell&apos;s history. Touch-screen interfaces proved
                naturally suited to card games — tapping a card to move it
                or dragging it across the screen feels more intuitive and
                satisfying than clicking with a mouse. FreeCell apps appeared
                in app stores almost immediately and quickly climbed the
                charts, introducing the game to a generation that may never
                have used Windows desktop games.
              </p>
              <p>
                Mobile FreeCell brought its own design challenges. Smartphone
                screens are much smaller than desktop monitors, requiring
                creative solutions for displaying all 52 cards in a readable
                layout. The best mobile implementations use carefully sized
                card overlaps, pinch-to-zoom functionality, and landscape
                mode to give players enough visual clarity to make strategic
                decisions. Portrait mode on a phone is a tight squeeze for
                eight columns of cards, but clever UI design has made it
                work surprisingly well.
              </p>
              <p>
                The rise of modern web technologies — HTML5, CSS3, and
                JavaScript frameworks — enabled another shift: browser-based
                FreeCell that requires no download at all. Sites like
                PlayFreeCellOnline.com offer the full FreeCell experience
                directly in a web browser, complete with features like
                unlimited undo, auto-complete for solved positions,
                statistics tracking, and{" "}
                <Link
                  href="/glossary"
                  className="text-[#D4AF37] hover:underline"
                >
                  customizable settings
                </Link>
                . These web versions work across devices — desktop, tablet,
                and phone — without requiring separate apps for each platform.
              </p>
              <p>
                Web-based FreeCell has also addressed one of the key
                frustrations of the Microsoft Solitaire Collection era:
                advertisements. Many browser-based versions offer clean,
                ad-light experiences that prioritize gameplay over
                monetization. For players who remember the simplicity
                of the original Windows FreeCell — launch the game, play
                the game, close the game — this return to basics is a
                welcome change.
              </p>
              <p>
                What&apos;s remarkable about FreeCell&apos;s journey across
                platforms is how little the game itself has changed. The
                rules Paul Alfille designed in 1978 are identical to those
                used in every modern implementation. Four free cells. Eight
                tableau columns. Four foundation piles. All cards face-up.
                Build down by alternating color. The technology surrounding
                the game has transformed — from PLATO terminals to Windows
                desktops to smartphones to web browsers — but the game
                at the center of it all remains perfectly, stubbornly
                unchanged. That is the ultimate proof of a great game
                design: it needs no updating.
              </p>
            </div>
          </div>
        </section>

        {/* Section: Fun Facts */}
        <section id="fun-facts" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Things You Didn&apos;t Know"
              id="fun-facts-heading"
              icon={"\u2663"}
            >
              FreeCell Fun Facts
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {funFacts.map((item, i) => {
                  const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
                  const suit = suits[i % 4];
                  const isRed = suit === "\u2665" || suit === "\u2666";
                  return (
                    <div
                      key={i}
                      className="card-inset rounded-lg p-5"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`text-lg shrink-0 mt-0.5 ${isRed ? "text-red-500" : "text-[#B8860B]"}`}
                        >
                          {suit}
                        </span>
                        <div>
                          <h3 className="font-medium text-[#2a2522] text-base mb-1">
                            {item.fact}
                          </h3>
                          <p className="text-[#444444] text-sm leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section: FAQ */}
        <section id="faq" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Common Questions"
              id="faq-heading"
              icon={"\u2665"}
            >
              FreeCell History FAQ
            </SectionHeading>

            <div className="px-6 sm:px-8 md:px-10 py-8 space-y-6">
              {historyFaqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#444444] leading-relaxed">
                    {faq.answer}
                  </p>
                  {i < historyFaqs.length - 1 && (
                    <div className="mt-6 border-b border-[#e5e0d8]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section>
          <div
            className={CARD}
            style={{
              ...CARD_TOP,
              background:
                "linear-gradient(135deg, rgba(10,74,42,0.6) 0%, rgba(6,37,22,0.8) 100%)",
            }}
          >
            <div className="p-8 sm:p-10 text-center relative">
              <div
                className="absolute top-4 left-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2663"}
              </div>
              <div
                className="absolute bottom-4 right-6 text-4xl text-white/[0.04] select-none"
                aria-hidden="true"
              >
                {"\u2660"}
              </div>

              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-3"
                style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
              >
                Write Your Own FreeCell History
              </h2>
              <p className="text-[#6B7280] mb-6 max-w-md mx-auto">
                Join millions of players who have enjoyed FreeCell since 1978.
                Start a game now and see how your strategy measures up.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                  style={{
                    background:
                      "linear-gradient(110deg, #B8860B, #D4AF37, #F3E5AB, #D4AF37, #B8860B)",
                    backgroundSize: "200% 100%",
                    color: "#1a1a0a",
                  }}
                >
                  Play Now
                </Link>
                <Link
                  href="/strategy"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl text-lg font-semibold border border-white/20 text-white/90 hover:bg-white/[0.08] transition-colors"
                >
                  Learn Strategy
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </ContentLayout>
  );
}
