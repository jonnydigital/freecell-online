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
    url: absoluteUrl("/sitemap-page"),
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
  { href: "/statistics", label: "Statistics", desc: "Track your win rate and performance" },
];

const learnLinks = [
  { href: "/how-to-play", label: "How to Play FreeCell", desc: "Complete rules tutorial" },
  { href: "/freecell-rules", label: "FreeCell Rules", desc: "Quick-reference rule card" },
  { href: "/freecell-for-beginners", label: "FreeCell for Beginners", desc: "Step-by-step beginner guide" },
  { href: "/strategy", label: "Strategy Guide", desc: "Beginner to expert strategy" },
  { href: "/tips", label: "Tips & Tricks", desc: "25 actionable FreeCell tips" },
  { href: "/freecell-cheat-sheet", label: "Cheat Sheet", desc: "Move priorities and shortcuts" },
  { href: "/freecell-mistakes-to-avoid", label: "Common Mistakes", desc: "Errors that cost you games" },
  { href: "/freecell-hints-explained", label: "Hints Explained", desc: "How the hint system works" },
  { href: "/freecell-for-seniors", label: "FreeCell for Seniors", desc: "Accessibility and cognitive benefits" },
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
  { href: "/pyramid/how-to-play", label: "Pyramid Rules", desc: "How to play Pyramid" },
  { href: "/pyramid/strategy", label: "Pyramid Strategy", desc: "Pyramid pairing techniques" },
  { href: "/bakers-game/strategy", label: "Baker's Game Strategy", desc: "Suit-building strategy" },
  { href: "/eight-off/strategy", label: "Eight Off Strategy", desc: "Eight Off techniques" },
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
      { "@type": "ListItem", position: 2, name: "Sitemap", item: absoluteUrl("/sitemap-page") },
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
