import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, CardSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "Sitemap | PlayFreeCellOnline.com — All Pages",
  description:
    "Browse every page on PlayFreeCellOnline.com. Find FreeCell guides, strategy tips, game variants, comparisons, and more — all in one place.",
  openGraph: {
    title: "Sitemap | PlayFreeCellOnline.com",
    description:
      "Complete directory of every page on PlayFreeCellOnline.com.",
    url: absoluteUrl("/sitemap"),
    siteName: siteConfig.siteName,
    type: "website",
  },
};

/* ── Link groups ── */

const playLinks = [
  { href: "/", label: "FreeCell", desc: "Classic FreeCell solitaire" },
  { href: "/bakers-game", label: "Baker's Game", desc: "Build by suit instead of alternating color" },
  { href: "/eight-off", label: "Eight Off", desc: "Eight free cells, suit-only building" },
  { href: "/spider", label: "Spider Solitaire", desc: "Two-deck solitaire with same-suit runs" },
  { href: "/klondike", label: "Klondike", desc: "The classic draw-and-build solitaire" },
  { href: "/easy-freecell", label: "Easy FreeCell", desc: "Curated beginner-friendly deals" },
  { href: "/streak", label: "Streak Mode", desc: "Daily challenge with win-streak tracking" },
  { href: "/storm", label: "Storm Mode", desc: "Five timed games — race the clock" },
  { href: "/daily-freecell", label: "Daily FreeCell", desc: "A new deal every day" },
  { href: "/daily-freecell/calendar", label: "Challenge Calendar", desc: "Browse past daily challenges" },
  { href: "/freecell/1-cell", label: "1-Cell FreeCell", desc: "One free cell — expert difficulty" },
  { href: "/freecell/2-cell", label: "2-Cell FreeCell", desc: "Two free cells — advanced" },
  { href: "/freecell/3-cell", label: "3-Cell FreeCell", desc: "Three free cells — intermediate" },
  { href: "/large-cards", label: "Large Cards Mode", desc: "Bigger cards for easier visibility" },
  { href: "/winning-deals", label: "Winning Deals", desc: "Deals with known solutions" },
  { href: "/deals", label: "Deal Explorer", desc: "Search and browse any deal number" },
  { href: "/solver", label: "FreeCell Solver", desc: "Get step-by-step solutions" },
  { href: "/leaderboard", label: "Leaderboard", desc: "Top times and scores" },
  { href: "/achievements", label: "Achievements", desc: "Unlock milestones and badges" },
  { href: "/stats", label: "Your Stats", desc: "Personal game statistics" },
  { href: "/statistics", label: "Statistics & Win Rates", desc: "Track your win rate and performance" },
];

const learnLinks = [
  { href: "/how-to-play", label: "How to Play FreeCell", desc: "Complete rules tutorial" },
  { href: "/freecell-rules", label: "FreeCell Rules", desc: "Quick-reference rule card" },
  { href: "/freecell-for-beginners", label: "FreeCell for Beginners", desc: "Step-by-step beginner guide" },
  { href: "/freecell-for-seniors", label: "FreeCell for Seniors", desc: "Accessibility and cognitive benefits" },
  { href: "/strategy", label: "Strategy Guide", desc: "Beginner to expert strategy" },
  { href: "/tips", label: "Tips & Tricks", desc: "25 actionable FreeCell tips" },
  { href: "/freecell-cheat-sheet", label: "Cheat Sheet", desc: "Move priorities and shortcuts" },
  { href: "/freecell-mistakes-to-avoid", label: "Common Mistakes", desc: "Errors that cost you games" },
  { href: "/freecell-hints-explained", label: "Hints Explained", desc: "How the hint system works" },
  { href: "/glossary", label: "Glossary", desc: "Card game terms and definitions" },
  { href: "/faq", label: "FAQ", desc: "Frequently asked questions" },
];

const exploreLinks = [
  { href: "/history", label: "FreeCell History", desc: "From 1978 PLATO to Windows" },
  { href: "/microsoft-freecell", label: "Microsoft FreeCell", desc: "The iconic Windows game" },
  { href: "/solitaire-types", label: "Solitaire Types", desc: "20+ solitaire variants compared" },
  { href: "/freecell-variants", label: "FreeCell Variants", desc: "All FreeCell variant modes" },
  { href: "/freecell-vs-klondike", label: "FreeCell vs Klondike", desc: "Head-to-head comparison" },
  { href: "/freecell-vs-spider", label: "FreeCell vs Spider", desc: "Two strategic favorites compared" },
  { href: "/is-every-freecell-game-winnable", label: "Is Every Game Winnable?", desc: "Solvability analysis" },
  { href: "/freecell-game-11982", label: "Deal #11982", desc: "The only proven unsolvable deal" },
  { href: "/hard-freecell-games", label: "Hard FreeCell Games", desc: "The toughest solvable deals" },
  { href: "/easy-freecell-games", label: "Easy FreeCell Games", desc: "Great deals for beginners" },
  { href: "/famous-freecell-deals", label: "Famous Deals", desc: "Notable game numbers" },
  { href: "/freecell-probability", label: "Probability & Math", desc: "The math behind FreeCell" },
  { href: "/freecell-world-records", label: "World Records", desc: "Speed records and achievements" },
];

const variantGuides = [
  { href: "/spider/how-to-play", label: "Spider Solitaire Rules", desc: "How to play Spider" },
  { href: "/spider/strategy", label: "Spider Strategy", desc: "Winning Spider techniques" },
  { href: "/spider/tips", label: "Spider Tips", desc: "Quick Spider advice" },
  { href: "/spider/is-spider-solitaire-winnable", label: "Is Spider Winnable?", desc: "Spider solvability analysis" },
  { href: "/spider/1-suit-vs-2-suit-vs-4-suit", label: "Spider Suit Modes", desc: "1-suit vs 2-suit vs 4-suit" },
  { href: "/klondike/how-to-play", label: "Klondike Rules", desc: "How to play Klondike" },
  { href: "/klondike/strategy", label: "Klondike Strategy", desc: "Klondike winning techniques" },
  { href: "/klondike/tips", label: "Klondike Tips", desc: "Quick Klondike advice" },
  { href: "/klondike/winning-strategies", label: "Klondike Winning Strategies", desc: "Advanced Klondike play" },
  { href: "/klondike/draw-1-vs-draw-3", label: "Draw 1 vs Draw 3", desc: "Which draw mode is better" },
  { href: "/klondike/faq", label: "Klondike FAQ", desc: "Common Klondike questions" },
  { href: "/pyramid", label: "Pyramid Solitaire", desc: "Play Pyramid Solitaire online" },
  { href: "/pyramid/how-to-play", label: "Pyramid Rules", desc: "How to play Pyramid" },
  { href: "/pyramid/strategy", label: "Pyramid Strategy", desc: "Pyramid pairing techniques" },
  { href: "/bakers-game", label: "Baker's Game", desc: "Play Baker's Game online" },
  { href: "/bakers-game/strategy", label: "Baker's Game Strategy", desc: "Suit-building strategy" },
  { href: "/eight-off", label: "Eight Off", desc: "Play Eight Off online" },
  { href: "/eight-off/strategy", label: "Eight Off Strategy", desc: "Eight Off techniques" },
  { href: "/canfield", label: "Canfield Solitaire", desc: "Play Canfield Solitaire online" },
  { href: "/canfield/how-to-play", label: "Canfield Rules", desc: "How to play Canfield" },
  { href: "/cruel", label: "Cruel Solitaire", desc: "Play Cruel Solitaire online" },
  { href: "/cruel/how-to-play", label: "Cruel Rules", desc: "How to play Cruel Solitaire" },
  { href: "/bisley", label: "Bisley Solitaire", desc: "Play Bisley Solitaire online" },
  { href: "/bisley/how-to-play", label: "Bisley Rules", desc: "How to play Bisley Solitaire" },
  { href: "/bisley/tips", label: "Bisley Tips", desc: "Bisley tips and tricks" },
  { href: "/aces-up", label: "Aces Up Solitaire", desc: "Play Aces Up Solitaire online" },
  { href: "/aces-up/how-to-play", label: "Aces Up Rules", desc: "How to play Aces Up Solitaire" },
  { href: "/aces-up/tips", label: "Aces Up Tips", desc: "Aces Up tips and tricks" },
  { href: "/bakers-dozen", label: "Baker's Dozen Solitaire", desc: "Play Baker's Dozen Solitaire online" },
  { href: "/bakers-dozen/how-to-play", label: "Baker's Dozen Rules", desc: "How to play Baker's Dozen Solitaire" },
  { href: "/bakers-dozen/tips", label: "Baker's Dozen Tips", desc: "Baker's Dozen tips and tricks" },
  { href: "/flower-garden", label: "Flower Garden Solitaire", desc: "Play Flower Garden Solitaire online" },
  { href: "/flower-garden/how-to-play", label: "Flower Garden Rules", desc: "How to play Flower Garden Solitaire" },
  { href: "/flower-garden/tips", label: "Flower Garden Tips", desc: "Flower Garden tips and tricks" },
  { href: "/gaps", label: "Gaps (Montana) Solitaire", desc: "Play Gaps Solitaire online" },
  { href: "/gaps/how-to-play", label: "Gaps Rules", desc: "How to play Gaps Solitaire" },
  { href: "/gaps/tips", label: "Gaps Tips", desc: "Gaps tips and tricks" },
  { href: "/calculation", label: "Calculation Solitaire", desc: "Play Calculation Solitaire online" },
  { href: "/calculation/how-to-play", label: "Calculation Rules", desc: "How to play Calculation Solitaire" },
  { href: "/calculation/tips", label: "Calculation Tips", desc: "Calculation tips and tricks" },
  { href: "/monte-carlo", label: "Monte Carlo Solitaire", desc: "Play Monte Carlo Solitaire online" },
  { href: "/monte-carlo/how-to-play", label: "Monte Carlo Rules", desc: "How to play Monte Carlo Solitaire" },
  { href: "/monte-carlo/tips", label: "Monte Carlo Tips", desc: "Monte Carlo tips and tricks" },
  { href: "/bristol", label: "Bristol Solitaire", desc: "Play Bristol Solitaire online" },
  { href: "/bristol/how-to-play", label: "Bristol Rules", desc: "How to play Bristol Solitaire" },
  { href: "/bristol/tips", label: "Bristol Tips", desc: "Bristol tips and tricks" },
  { href: "/freecell/how-to-play", label: "FreeCell How to Play", desc: "Comprehensive FreeCell rules guide" },
  { href: "/freecell/tips", label: "FreeCell Tips", desc: "Expert FreeCell tips and supermove math" },
  { href: "/clock", label: "Clock Solitaire", desc: "Play Clock Solitaire online" },
  { href: "/clock/how-to-play", label: "Clock Rules", desc: "How to play Clock Solitaire" },
  { href: "/clock/tips", label: "Clock Tips", desc: "Clock Solitaire tips and facts" },
  { href: "/penguin", label: "Penguin Solitaire", desc: "Play Penguin Solitaire online" },
  { href: "/penguin/how-to-play", label: "Penguin Rules", desc: "How to play Penguin Solitaire" },
  { href: "/penguin/tips", label: "Penguin Tips", desc: "Penguin tips and tricks" },
];

const legalLinks = [
  { href: "/about", label: "About", desc: "The story behind the site" },
  { href: "/privacy", label: "Privacy Policy", desc: "How we handle your data" },
  { href: "/terms", label: "Terms of Service", desc: "Usage agreement" },
];

/* ── Render helper ── */

function SitemapGroup({
  title,
  icon,
  links,
}: {
  title: string;
  icon: string;
  links: { href: string; label: string; desc: string }[];
}) {
  return (
    <CardSection>
      <div className="px-6 sm:px-8 md:px-10 pt-8 pb-0">
        <h2
          className="text-2xl font-bold text-[#2a2522] flex items-center gap-3"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          <span className="text-[#D4AF37]">{icon}</span> {title}
        </h2>
        <div className="card-title-separator mt-4" />
      </div>
      <div className="px-6 sm:px-8 md:px-10 py-6">
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group block py-1.5"
              >
                <span className="text-[#8B6914] group-hover:underline font-medium">
                  {link.label}
                </span>
                <span className="text-[#6B7280] text-sm ml-1.5">
                  — {link.desc}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </CardSection>
  );
}

/* ── Page ── */

export default function SitemapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sitemap", item: absoluteUrl("/sitemap") },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      <ContentHero
        title="Sitemap"
        subtitle="Every page on PlayFreeCellOnline.com in one place. Find guides, strategies, games, and more."
      />

      <main className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <SitemapGroup title="Play" icon="♠" links={playLinks} />
        <SitemapGroup title="Learn FreeCell" icon="♥" links={learnLinks} />
        <SitemapGroup title="Explore & Research" icon="♦" links={exploreLinks} />
        <SitemapGroup title="Variant Guides" icon="♣" links={variantGuides} />
        <SitemapGroup title="About & Legal" icon="♠" links={legalLinks} />
      </main>
    </ContentLayout>
  );
}
