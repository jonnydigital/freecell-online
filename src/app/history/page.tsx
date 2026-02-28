import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "History of FreeCell | Who Invented FreeCell Solitaire?",
  description:
    "The complete history of FreeCell solitaire — from Paul Alfille's 1978 PLATO original to Microsoft FreeCell on Windows. Learn about Game #11982, the one unsolvable deal, and how FreeCell became the world's most popular strategic card game.",
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
  ],
  openGraph: {
    title: "History of FreeCell | Who Invented FreeCell Solitaire?",
    description:
      "From a 1978 university mainframe to every Windows PC on Earth — the full story of FreeCell solitaire, its inventor Paul Alfille, and the legendary unsolvable deal #11982.",
    url: "https://playfreecellonline.com/history",
    siteName: "PlayFreeCellOnline.com",
    type: "article",
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
      "Paul Alfille, a medical student at the University of Illinois, created FreeCell in 1978. He programmed the first version on the PLATO educational computer system using the TUTOR programming language. Alfille's key innovation was replacing the stock pile found in most solitaire games with four open 'free cells' that serve as temporary storage.",
  },
  {
    question: "When was FreeCell added to Windows?",
    answer:
      "FreeCell was first included with Microsoft Windows in 1995 as part of the Win32s package and Windows 3.1 Entertainment Pack. It became a standard inclusion starting with Windows 95 and shipped with every version of Windows through Windows 7. Jim Horne programmed the Microsoft version.",
  },
  {
    question: "What is the unsolvable FreeCell game?",
    answer:
      "Game #11982 in the original Microsoft FreeCell (which has 32,000 numbered deals) is the only deal proven to be unsolvable. Despite millions of attempts by both human players and computer solvers, no solution has ever been found. It was confirmed impossible through exhaustive computer analysis.",
  },
  {
    question: "Are all FreeCell games winnable?",
    answer:
      "Nearly all of them. Of the original 32,000 Microsoft deals, only game #11982 is confirmed unsolvable. Eight other deals (#146, #455, #495, #512, #530, #1941, #6182, #8591) were long considered unsolvable but were eventually solved. Research suggests approximately 99.999% of randomly dealt FreeCell games have at least one solution.",
  },
  {
    question: "Why is FreeCell different from other solitaire games?",
    answer:
      "FreeCell is unique because all 52 cards are dealt face-up from the start — there is no hidden information. This makes it a game of pure strategy rather than luck. The four free cells provide temporary storage that gives skilled players enough flexibility to solve nearly every deal. Most other solitaire variants involve hidden cards and a significant luck component.",
  },
  {
    question: "Is FreeCell still available on Windows?",
    answer:
      "The classic standalone FreeCell was removed starting with Windows 8 in 2012. Microsoft replaced it with the Microsoft Solitaire Collection app, which bundles FreeCell along with Klondike, Spider, Pyramid, and TriPeaks. The app is free but includes advertisements unless you subscribe to a premium plan. Many players prefer web-based versions like PlayFreeCellOnline.com for an ad-light experience.",
  },
];

/* ── Timeline data ── */

const timeline = [
  {
    year: "1978",
    title: "Paul Alfille Creates FreeCell",
    description:
      "Medical student Paul Alfille programs the first FreeCell game on the PLATO educational computer system at the University of Illinois. Written in the TUTOR programming language, it introduces the concept of four open temporary storage cells — the free cells. Unlike earlier solitaire games, all cards are dealt face-up, making it a game of pure skill.",
  },
  {
    year: "1978–1989",
    title: "Spreading Through University Networks",
    description:
      "FreeCell spreads across the PLATO network, gaining a small but dedicated following among university students and staff. Several programmers create their own implementations for various platforms. The game remains relatively obscure outside academic computing circles.",
  },
  {
    year: "1989",
    title: "Jim Horne's Microsoft Implementation",
    description:
      "Microsoft programmer Jim Horne discovers FreeCell and writes a version for Windows. He creates the system of 32,000 numbered deals that allows players to share and compare specific games. This seemingly small decision — giving every deal a number — becomes one of FreeCell's defining features.",
  },
  {
    year: "1991–1995",
    title: "Windows Entertainment Pack & Win32s",
    description:
      "Microsoft includes FreeCell in the Windows Entertainment Pack and the Win32s subsystem for Windows 3.1. It's one of several games bundled to demonstrate the capabilities of the Windows platform. Early adopters begin cataloging which deals they can and can't solve.",
  },
  {
    year: "1995",
    title: "Windows 95 Makes FreeCell Universal",
    description:
      "Microsoft bundles FreeCell with Windows 95, instantly placing it on millions of desktops worldwide. For many people, this is their first encounter with the game. Office workers discover it during lunch breaks, and it quickly becomes one of the most-played computer games in history — not through marketing, but because it was already installed on every PC.",
  },
  {
    year: "1994–2000",
    title: "The Internet FreeCell Project",
    description:
      "Dave Ring organizes the Internet FreeCell Project, a collaborative effort to solve all 32,000 Microsoft FreeCell deals. Volunteers around the world claim and attempt individual game numbers. By 2000, every deal has been solved except one: game #11982. The project proves that 31,999 of the 32,000 original deals are solvable.",
  },
  {
    year: "2000s",
    title: "Game #11982 Confirmed Impossible",
    description:
      "Computer scientists use exhaustive search algorithms to prove that deal #11982 has no solution. It becomes the most famous unsolvable solitaire deal in history. Every possible sequence of moves leads to a dead end. The discovery cements FreeCell's reputation as a game where losing is almost always the player's fault — with exactly one exception.",
  },
  {
    year: "2003–2008",
    title: "Solver Algorithms and New Research",
    description:
      "Researchers develop increasingly sophisticated FreeCell solvers. These programs can solve most deals in under a second and prove solvability for millions of randomly generated deals. Studies confirm that approximately 99.999% of all possible FreeCell deals are winnable. Eight previously 'unsolvable' deals (#146, #455, #495, #512, #530, #1941, #6182, #8591) are finally cracked by advanced solvers.",
  },
  {
    year: "2012",
    title: "Windows 8 Removes Standalone FreeCell",
    description:
      "Microsoft drops the standalone FreeCell game with Windows 8, replacing it with the Microsoft Solitaire Collection. The change upsets loyal players who had decades of statistics saved in the classic version. The Solitaire Collection bundles FreeCell with Klondike, Spider, Pyramid, and TriPeaks but adds advertisements and a premium subscription model.",
  },
  {
    year: "2010s–Today",
    title: "FreeCell Goes Online and Mobile",
    description:
      "FreeCell flourishes on the web and mobile platforms. Browser-based versions remove the need for downloads, while mobile apps bring the game to phones and tablets. The core game remains unchanged from Alfille's 1978 original — a testament to the elegance of its design. Today, millions of games are played daily across platforms worldwide.",
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
      "Jim Horne chose 32,000 deals for Microsoft FreeCell because it was a convenient number for the random number generator he used. There was no mathematical reason — it just worked well with 16-bit integers.",
  },
  {
    fact: "Only 1 in 32,000 is impossible",
    detail:
      "Deal #11982 is the only unsolvable game among the original 32,000 Microsoft FreeCell deals. That's a 99.997% solvability rate. When you lose, it's almost certainly your strategy, not the cards.",
  },
  {
    fact: "FreeCell taught people to use a mouse",
    detail:
      "In the 1990s, Microsoft deliberately included card games with Windows to help users practice drag-and-drop mouse skills. FreeCell, Solitaire, and Minesweeper were stealth training tools.",
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
      "Paul Alfille named the game after its defining mechanic: four cells that are 'free' to hold any single card temporarily. Before FreeCell, no solitaire game used this exact storage concept.",
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
    <div className="px-8 sm:px-10 md:px-12 pt-8 sm:pt-10 pb-0">
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
        "The complete history of FreeCell solitaire — Paul Alfille's invention, Microsoft's adoption, the Internet FreeCell Project, Game #11982, and FreeCell's cultural legacy.",
      author: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
      publisher: {
        "@type": "Organization",
        name: "PlayFreeCellOnline.com",
      },
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
    <div className="h-screen overflow-y-auto scroll-smooth felt-bg">
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

        <nav
          className="max-w-4xl mx-auto mb-8 text-sm text-[#6B7280]"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center justify-center gap-2">
            <li>
              <Link
                href="/"
                className="hover:text-white/80 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="text-[#D4AF37]">/</li>
            <li className="text-white/80">History of FreeCell</li>
          </ol>
        </nav>

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
            ["#timeline", "\u2665", "Timeline"],
            ["#11982", "\u2666", "Game #11982"],
            ["#fun-facts", "\u2663", "Fun Facts"],
            ["#cultural-impact", "\u2660", "Cultural Impact"],
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
              The Invention of FreeCell
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                In 1978, Paul Alfille was a medical student at the University of
                Illinois at Urbana-Champaign. Like many students of the era, he
                spent time on the PLATO system — a groundbreaking educational
                computer network that also happened to host some of the
                world&apos;s earliest computer games. Alfille was a card game
                enthusiast looking for a solitaire variant that relied on
                strategy rather than luck.
              </p>
              <p>
                Most solitaire games deal some cards face-down, meaning your
                fate partially depends on what you can&apos;t see. Alfille
                wanted to eliminate that hidden information entirely. His
                solution was elegant: deal all 52 cards face-up across eight
                columns, and provide four temporary storage spaces — the{" "}
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
                .
              </p>
              <p>
                The result was a game where every deal (or nearly every deal)
                has a solution, and finding that solution requires genuine
                strategic thinking. No blaming bad luck. No praying for a
                helpful card to turn over. Just you, 52 visible cards, and
                your ability to plan ahead.
              </p>
              <p>
                Alfille programmed FreeCell in the TUTOR language, which was
                PLATO&apos;s native programming environment. The game spread
                across PLATO&apos;s network of terminals at universities and
                military installations, earning a small but passionate
                following. For the next decade, FreeCell remained a niche game
                known primarily to people who had access to PLATO terminals.
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
                      visible from the start, eliminating luck
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1 shrink-0">
                      {"\u2665"}
                    </span>
                    <span>
                      <strong>Free cells</strong> — temporary storage that
                      gives skilled players the flexibility to solve complex
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
                      <strong>Skill-based outcomes</strong> — your win rate
                      is a direct measure of your strategic ability
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Timeline */}
        <section id="timeline" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Year by Year"
              id="timeline-heading"
              icon={"\u2665"}
            >
              FreeCell Through the Decades
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-0">
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

        {/* Section: Game #11982 */}
        <section id="11982" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="The Impossible Deal"
              id="11982-heading"
              icon={"\u2666"}
            >
              Game #11982: FreeCell&apos;s Only Unsolvable Deal
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-5 text-[#444444] leading-relaxed">
              <p>
                Among the original 32,000 numbered deals in Microsoft FreeCell,
                game #11982 holds a unique distinction: it is the only deal that
                has been mathematically proven to have no solution. Every other
                deal — all 31,999 of them — can be solved with the right
                sequence of moves.
              </p>
              <p>
                The story of how we know this is itself remarkable. In the
                mid-1990s, a volunteer effort called the Internet FreeCell
                Project set out to solve every single one of those 32,000
                deals. Organized by Dave Ring, the project coordinated
                thousands of players worldwide. Volunteers would claim game
                numbers, attempt to solve them, and report back. By the late
                1990s, every deal had been solved except #11982 — and a handful
                of others that would eventually fall to more advanced solving
                techniques.
              </p>
              <p>
                Computer scientists later confirmed what human players
                suspected: deal #11982 is genuinely impossible. Exhaustive
                search algorithms explored every possible sequence of legal
                moves and found that every path leads to a dead end. No matter
                how brilliant your{" "}
                <Link
                  href="/strategy"
                  className="text-[#D4AF37] hover:underline"
                >
                  strategy
                </Link>
                , this particular arrangement of cards simply cannot be
                untangled.
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
                over 100 moves and extremely precise play, but they were all
                technically winnable — making #11982 the sole holdout.
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
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Section: Fun Facts */}
        <section id="fun-facts" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Things You Didn't Know"
              id="fun-facts-heading"
              icon={"\u2663"}
            >
              FreeCell Fun Facts
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8">
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

        {/* Section: Cultural Impact */}
        <section id="cultural-impact" className="scroll-mt-6">
          <div className={CARD} style={CARD_TOP}>
            <SectionHeading
              sub="Beyond the Game"
              id="cultural-impact-heading"
              icon={"\u2660"}
            >
              FreeCell&apos;s Cultural Impact
            </SectionHeading>

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-5 text-[#444444] leading-relaxed">
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
                computer.
              </p>
              <p>
                In the workplace, FreeCell became synonymous with office
                downtime. IT departments joked about removing it from company
                machines, and more than a few managers walked past employee
                screens showing suspiciously quick Alt-Tab reflexes. A 2003
                survey estimated that American workers collectively spent
                billions of hours per year playing Windows card games.
              </p>
              <p>
                FreeCell also served an unexpected educational role. Microsoft
                originally included card games with Windows to help users
                learn mouse skills — particularly drag-and-drop operations.
                For many people in the early 1990s, moving cards around in
                FreeCell was their first experience using a mouse to interact
                with objects on a screen.
              </p>
              <p>
                The Internet FreeCell Project (1994–2000) was a pioneering
                example of crowdsourced problem-solving. Years before
                Wikipedia or citizen science platforms, thousands of
                volunteers coordinated online to systematically solve all
                32,000 Microsoft FreeCell deals. The project demonstrated
                that large-scale collaborative efforts could accomplish
                what no individual could do alone.
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

            <div className="px-8 sm:px-10 md:px-12 py-8 space-y-6">
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

        {/* ── Cross-links ── */}
        <footer className="text-center text-sm text-[#6B7280]/60 pb-10">
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/how-to-play"
              className="hover:text-[#6B7280] transition-colors"
            >
              How to Play
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/strategy"
              className="hover:text-[#6B7280] transition-colors"
            >
              Strategy Guide
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/solitaire-types"
              className="hover:text-[#6B7280] transition-colors"
            >
              Solitaire Types
            </Link>
            <span className="text-white/20">|</span>
            <Link
              href="/glossary"
              className="hover:text-[#6B7280] transition-colors"
            >
              Glossary
            </Link>
            <span className="text-white/20">|</span>
            <Link href="/" className="hover:text-[#6B7280] transition-colors">
              Play Free
            </Link>
          </div>
          <p className="mt-3 text-white/25">
            &copy; {new Date().getFullYear()} PlayFreeCellOnline.com
          </p>
        </footer>
      </main>
    </div>
  );
}
