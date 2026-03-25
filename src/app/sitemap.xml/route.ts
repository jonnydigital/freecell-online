import { absoluteUrl, isHubSite } from '@/lib/siteConfig';
import { sitemapGameNumbers, isHighPriorityDeal } from '@/lib/curatedDeals';

/**
 * Dynamic XML sitemap served at /sitemap.xml via route handler.
 * Moved from convention-based sitemap.ts to free up /sitemap for the HTML sitemap page.
 */

const contentPages = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  ...(isHubSite ? [{ path: '/freecell', changeFrequency: 'daily', priority: 0.9 }] : []),
  { path: '/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/strategy', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/glossary', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/history', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/solitaire-types', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/winning-deals', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-game', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eight-off', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/easy-freecell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/spider', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell-vs-spider', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-vs-klondike', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/statistics', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/deals', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/solver', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/streak', changeFrequency: 'daily', priority: 0.6 },
  { path: '/storm', changeFrequency: 'daily', priority: 0.6 },
  { path: '/stats', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/achievements', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/leaderboard', changeFrequency: 'daily', priority: 0.6 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/daily-freecell', changeFrequency: 'daily', priority: 0.7 },
  { path: '/daily-freecell/calendar', changeFrequency: 'daily', priority: 0.6 },
  { path: '/freecell-for-beginners', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/is-every-freecell-game-winnable', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/easy-freecell-games', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/hard-freecell-games', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-mistakes-to-avoid', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/famous-freecell-deals', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-game-11982', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/spider/how-to-play', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/1-suit-vs-2-suit-vs-4-suit', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/spider/is-spider-solitaire-winnable', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-hints-explained', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-world-records', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/klondike/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/klondike/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/faq', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/winning-strategies', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/klondike/draw-1-vs-draw-3', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pyramid', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pyramid/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/pyramid/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/pyramid/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tripeaks', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tripeaks/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/golf', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/golf/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/canfield', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/canfield/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/forty-thieves', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/forty-thieves/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/tripeaks/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/tripeaks/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/golf/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/golf/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/yukon/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/canfield/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/canfield/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/forty-thieves/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/forty-thieves/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/scorpion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/scorpion/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/scorpion/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/seahaven', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/seahaven/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/seahaven/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/beleaguered-castle', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/beleaguered-castle/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/beleaguered-castle/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/penguin', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/penguin/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/penguin/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/clock', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/clock/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/clock/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/cruel', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cruel/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/cruel/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/accordion', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accordion/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/accordion/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/la-belle-lucie', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/la-belle-lucie/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/la-belle-lucie/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/flower-garden', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/flower-garden/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/flower-garden/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/calculation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/calculation/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/calculation/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/monte-carlo', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/monte-carlo/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/monte-carlo/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bisley', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bisley/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bisley/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/aces-up', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aces-up/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/aces-up/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-dozen', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-dozen/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-dozen/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/gaps', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gaps/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/gaps/tips', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/games', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell-rules', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-for-seniors', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/large-cards', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-cheat-sheet', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-probability', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell-variants', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/microsoft-freecell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/download', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/bakers-game/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/bakers-game/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/eight-off/how-to-play', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/eight-off/strategy', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/freecell/1-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell/2-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/freecell/3-cell', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/embed-generator', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/solitaire-for-beginners', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/best-freecell-apps', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/sitemap', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

function buildXml(): string {
  const now = new Date().toISOString();

  const staticEntries = contentPages.map(
    (p) =>
      `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${p.changeFrequency}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
  );

  const gameEntries = sitemapGameNumbers.map(
    (num) =>
      `  <url>\n    <loc>${absoluteUrl(`/game/${num}`)}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>yearly</changefreq>\n    <priority>${isHighPriorityDeal(num) ? 0.6 : 0.4}</priority>\n  </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticEntries, ...gameEntries].join('\n')}
</urlset>`;
}

export async function GET() {
  return new Response(buildXml(), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
