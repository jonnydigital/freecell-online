import Link from "next/link";

type Cluster =
  | "freecell"
  | "freecell-advanced"
  | "freecell-deals"
  | "klondike"
  | "spider";

interface RelatedArticle {
  href: string;
  title: string;
  blurb: string;
}

const CLUSTERS: Record<Cluster, RelatedArticle[]> = {
  freecell: [
    {
      href: "/freecell-mastery",
      title: "Master FreeCell",
      blurb: "The complete roadmap from your first deal to expert-level play.",
    },
    {
      href: "/freecell-solvability",
      title: "Which FreeCell Deals Are Solvable?",
      blurb: "The 8 known unsolvable deals — and why every other deal can be won.",
    },
    {
      href: "/freecell-probability",
      title: "FreeCell Probability & Win Rates",
      blurb: "The math behind FreeCell's 99.999% solvability and expert win rates.",
    },
    {
      href: "/freecell-cheat-sheet",
      title: "FreeCell Cheat Sheet",
      blurb: "Printable one-pager with opening moves and endgame checklist.",
    },
    {
      href: "/famous-freecell-deals",
      title: "Famous FreeCell Deals",
      blurb: "Game #1, #617, #11982 — the iconic deal numbers every player should know.",
    },
    {
      href: "/solver",
      title: "FreeCell Solver",
      blurb: "Enter any deal — see the shortest winning line if one exists.",
    },
  ],
  "freecell-advanced": [
    {
      href: "/freecell-opening-strategy",
      title: "FreeCell Opening Strategy",
      blurb: "The first 10 moves that separate beginners from expert players.",
    },
    {
      href: "/freecell-endgame-strategy",
      title: "FreeCell Endgame Strategy",
      blurb: "Closing out a win: supermove planning, foundation order, free-cell timing.",
    },
    {
      href: "/freecell-world-records",
      title: "FreeCell World Records",
      blurb: "Fastest solves, longest streaks, and the expert players behind them.",
    },
    {
      href: "/freecell-mistakes-to-avoid",
      title: "FreeCell Mistakes to Avoid",
      blurb: "The 7 most common mistakes that cost intermediate players games.",
    },
  ],
  "freecell-deals": [
    {
      href: "/famous-freecell-deals",
      title: "Famous FreeCell Deals",
      blurb: "Curated list of the iconic numbered deals every FreeCell player knows.",
    },
    {
      href: "/unsolvable-freecell-deals",
      title: "Unsolvable FreeCell Deals",
      blurb: "The 8 confirmed-impossible deals including the legendary #11982.",
    },
    {
      href: "/easy-freecell-games",
      title: "Easy FreeCell Deals",
      blurb: "Beginner-friendly deal numbers to practice fundamentals on.",
    },
    {
      href: "/hard-freecell-games",
      title: "Hard FreeCell Deals",
      blurb: "Expert challenges: notoriously difficult but solvable deals.",
    },
    {
      href: "/daily-freecell",
      title: "Daily FreeCell Challenge",
      blurb: "A fresh curated deal every day with a global leaderboard.",
    },
  ],
  klondike: [
    {
      href: "/klondike-mastery",
      title: "Master Klondike Solitaire",
      blurb: "Roadmap from first deal to expert Draw 3 and Vegas play.",
    },
    {
      href: "/klondike-probability",
      title: "Klondike Probability & Win Rates",
      blurb: "Why ~82% of Draw 1 deals are solvable and only 10-20% of Draw 3.",
    },
    {
      href: "/klondike-vegas-scoring",
      title: "Klondike Vegas Scoring Explained",
      blurb: "The casino scoring variant: payouts, single-pass rules, bankroll strategy.",
    },
    {
      href: "/klondike-cheat-sheet",
      title: "Klondike Cheat Sheet",
      blurb: "Printable reference: Draw 1 vs 3 decision matrix and Vegas payouts.",
    },
    {
      href: "/klondike-fewest-moves",
      title: "Fewest-Move Klondike Solves",
      blurb: "The record fewest-move Klondike wins and what makes them possible.",
    },
  ],
  spider: [
    {
      href: "/spider-mastery",
      title: "Master Spider Solitaire",
      blurb: "Roadmap from 1-suit to 4-suit — the pro player progression.",
    },
    {
      href: "/spider-suit-strategy",
      title: "Spider Suit Strategy",
      blurb: "When to mix suits and when to stay pure — the key retention skill.",
    },
    {
      href: "/spider-column-tactics",
      title: "Spider Column Tactics",
      blurb: "How to empty columns and why empty columns are the single biggest edge.",
    },
    {
      href: "/spider-winnability",
      title: "Is Spider Always Winnable?",
      blurb: "Win-rate data by suit count and what percentage of 4-suit deals lose.",
    },
    {
      href: "/spider/faq",
      title: "Spider Solitaire FAQ",
      blurb: "Quick answers to the questions Spider players ask most.",
    },
  ],
};

interface RelatedArticlesProps {
  cluster: Cluster;
  heading?: string;
  limit?: number;
}

export default function RelatedArticles({
  cluster,
  heading = "Continue Reading",
  limit,
}: RelatedArticlesProps) {
  const articles = limit ? CLUSTERS[cluster].slice(0, limit) : CLUSTERS[cluster];
  return (
    <section className="bg-white/[0.03] border border-white/10 rounded-xl p-6 sm:p-8 my-10">
      <h2
        className="text-2xl font-bold text-white/90 mb-5"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {heading}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4 hover:border-[#D4AF37]/40 hover:bg-white/[0.05] transition-colors block"
          >
            <span className="font-semibold text-white text-sm">{article.title}</span>
            <p className="text-xs text-white/60 mt-1.5 leading-relaxed">{article.blurb}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
