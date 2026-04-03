import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import NetworkCrossLinks from "@/components/NetworkCrossLinks";
import {
  ContentHero,
  SectionHeading,
  CardSection,
  ContentBody,
  CtaSection,
  JsonLd,
} from "@/components/content";

export const metadata: Metadata = {
  title:
    "Solitaire Rules by Country | How Patience Varies Around the World",
  description:
    "Discover how solitaire rules differ across countries and cultures. From French Patience origins to American Klondike dominance, explore the global history of solitaire card games.",
  keywords: [
    "solitaire rules by country",
    "patience card game history",
    "solitaire around the world",
    "international solitaire rules",
    "french patience rules",
    "british solitaire",
    "solitaire variations by country",
    "napoleon solitaire",
    "how solitaire rules differ",
    "solitaire cultural history",
    "world solitaire rules",
    "patience game origins",
  ],
  openGraph: {
    title:
      "Solitaire Rules by Country | How Patience Varies Around the World",
    description:
      "How solitaire rules evolved differently across countries and cultures. From French Patience to American Klondike, explore the global history of card solitaire.",
    url: absoluteUrl("/solitaire-rules-by-country"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/solitaire-rules-by-country"),
  },
};

/* ── FAQ data ── */

const faqs = [
  {
    question: "Why is solitaire called Patience in some countries?",
    answer:
      "The name Patience originated in France and Germany during the late 18th century, where the games were called 'les patiences' or 'die Patiencen.' The name reflects the temperament required to play: calm, methodical sorting of cards. British and European players adopted 'Patience' as the standard term. When card solitaire crossed the Atlantic to North America, 'solitaire' (from the French word for alone) became the dominant term, likely because it better described the solo nature of the game. Today, 'Patience' is still the preferred term in the UK, Australia, and much of Europe, while 'solitaire' dominates in North America.",
  },
  {
    question: "Did Napoleon really play solitaire?",
    answer:
      "The connection between Napoleon Bonaparte and solitaire is well-established historically but often exaggerated in popular culture. Napoleon is documented as playing card games during his exile on St. Helena (1815-1821), and several solitaire variants bear his name, including Napoleon at St. Helena (also called Forty Thieves) and Napoleon's Square. However, many games attributed to Napoleon were likely named after him posthumously by game publishers capitalizing on his fame. What is clear is that solitaire was popular among French aristocracy and military officers during Napoleon's era, and his association with the games helped popularize them across Europe.",
  },
  {
    question: "How did Microsoft Windows change solitaire rules worldwide?",
    answer:
      "Microsoft's inclusion of Klondike Solitaire in Windows 3.0 (1990) was arguably the single most important event in solitaire history. It established Klondike as the default version of solitaire for billions of people worldwide, overriding decades of regional variation. Before Windows, different countries had different 'default' solitaire games. After Windows, Klondike became universal. Microsoft also standardized specific rule interpretations: draw-three from the stock, unlimited passes through the waste pile, and the ability to move partial tableau sequences. These choices became the de facto standard, even though many traditional Klondike players used draw-one or limited passes.",
  },
  {
    question: "What solitaire games originated in France?",
    answer:
      "France is considered the birthplace of card solitaire as we know it. Games with clear French origins include La Belle Lucie (one of the oldest documented solitaire games), Canfield (named after a famous American casino owner but based on French gameplay patterns), Calculation (known as Broken Intervals in early French texts), and the entire family of Patience games that became the foundation for modern solitaire. French card game books from the early 1800s document dozens of Patience layouts, many of which are still played today. The French tradition emphasized elegant, mathematically interesting layouts over pure luck.",
  },
  {
    question: "Are there solitaire games unique to specific countries?",
    answer:
      "Yes, several solitaire variants are strongly associated with particular countries. Hanafuda solitaire (Koi-Koi played solo) is unique to Japan and uses traditional flower cards instead of standard playing cards. Russian Solitaire is a distinctive Yukon variant with specific movement rules that differ from the Western version. Swedish Patience has specific dealing and building rules not found in other countries. Australian Patience (Canfield with specific rule modifications) developed independently in Australia. Germany's Schwarze Witwe (Black Widow) influenced what became Spider Solitaire internationally. Many of these national variants survive in local card game clubs even as digital solitaire has homogenized the global landscape.",
  },
  {
    question:
      "Why do different countries have different rules for the same solitaire game?",
    answer:
      "Rule variations developed because solitaire was transmitted orally and through regional card game books rather than through any central authority. A player in London might learn Klondike from a family member with one set of rules, while a player in New York learned it from a different book with slightly different rules. Key areas of disagreement include: how many cards to draw from the stock (one vs. three), whether you can move partial tableau sequences or only complete ones, how many times you can cycle through the waste pile, and whether empty tableau columns can be filled by any card or only by Kings. The lack of competitive play meant there was no pressure to standardize rules until the digital era forced developers to pick one interpretation.",
  },
];

/* ── Cross-country comparison data ── */

const comparisonRows = [
  {
    label: "Default solitaire game",
    france: "La Belle Lucie",
    uk: "Klondike (Patience)",
    usa: "Klondike",
    germany: "Schwarze Witwe variants",
    russia: "Russian Solitaire (Yukon variant)",
  },
  {
    label: "Common name for the genre",
    france: "Patience / Les Réussites",
    uk: "Patience",
    usa: "Solitaire",
    germany: "Patience / Patiencen",
    russia: "Пасьянс (Pasyans)",
  },
  {
    label: "Klondike draw rule",
    france: "Draw one",
    uk: "Draw one (traditional)",
    usa: "Draw three (post-Windows)",
    germany: "Draw one",
    russia: "Draw one or three",
  },
  {
    label: "Empty column fill",
    france: "Kings only (strict)",
    uk: "Kings only (traditional)",
    usa: "Any card (relaxed)",
    germany: "Kings only",
    russia: "Any card",
  },
  {
    label: "Stock pile passes",
    france: "One or two",
    uk: "Three (club standard)",
    usa: "Unlimited (digital standard)",
    germany: "Two",
    russia: "Unlimited",
  },
  {
    label: "Scoring tradition",
    france: "Win/loss only",
    uk: "Club point systems",
    usa: "Vegas scoring / points",
    germany: "Win/loss only",
    russia: "Time-based",
  },
  {
    label: "Historical influence",
    france: "Invented the genre",
    uk: "Codified club rules",
    usa: "Digitized and globalized",
    germany: "Developed Spider family",
    russia: "Mathematical analysis",
  },
];

/* ══════════════════════════════════════════════════════════════
   Main Page
   ══════════════════════════════════════════════════════════════ */

export default function SolitaireRulesByCountryPage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Solitaire Rules by Country: How Patience Varies Around the World",
      description:
        "A comprehensive guide to how solitaire rules evolved differently across countries and cultures, from French Patience origins to American Klondike dominance.",
      author: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.siteName,
      },
      datePublished: "2026-04-03",
      dateModified: "2026-04-03",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": absoluteUrl("/solitaire-rules-by-country"),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Solitaire Rules by Country",
          item: absoluteUrl("/solitaire-rules-by-country"),
        },
      ],
    },
  ];

  return (
    <ContentLayout variant="dark">
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <ContentHero
        title="Solitaire Rules by Country"
        subtitle={
          <>
            Solitaire is one of the most played card games on Earth, but the
            rules are far from universal. What Americans call Solitaire, the
            British call Patience, and the French call La R&eacute;ussite.
            Behind these names lie centuries of regional rule variations,
            national traditions, and cultural attitudes toward the game.
            Here&apos;s how solitaire evolved differently around the world.
          </>
        }
      />

      {/* ── Main content wrapper ── */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">

        {/* ── France ── */}
        <CardSection id="france">
          <SectionHeading
            sub="Where It All Began"
            id="france-heading"
            icon={"\u2660"}
          >
            France: The Birthplace of Patience
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              The earliest known references to single-player card games appear in
              French and German texts from the late 18th century. France is widely
              credited as the birthplace of card solitaire as a structured genre.
              The French called these games &ldquo;les patiences&rdquo; or
              &ldquo;les r&eacute;ussites&rdquo; (successes), and they were
              popular among aristocrats and intellectuals well before the French
              Revolution.
            </p>
            <p>
              French solitaire traditions emphasize elegance and mathematical
              structure over pure entertainment.{" "}
              <Link
                href="/la-belle-lucie"
                className="text-[#8B6914] hover:underline"
              >
                La Belle Lucie
              </Link>{" "}
              (The Beautiful Lucy), one of the oldest documented solitaire games,
              is a perfect example: a compact fan layout with strict rules that
              reward careful planning. The game allows only two redeals and demands
              that players think several moves ahead, reflecting the French
              preference for intellectual challenge over casual play.
            </p>
            <p>
              Napoleon Bonaparte&apos;s well-documented exile on St. Helena
              (1815&ndash;1821) cemented the association between France and
              solitaire in the public imagination. Several games carry his name:
              Napoleon at St. Helena (better known internationally as{" "}
              <Link
                href="/forty-thieves"
                className="text-[#8B6914] hover:underline"
              >
                Forty Thieves
              </Link>
              ), Napoleon&apos;s Square, and various &ldquo;Napoleon&rdquo;
              layouts in French card game books. Whether Napoleon himself played
              all these specific games is debatable, but his association with
              solitaire helped spread the games across Europe as officers and
              diplomats carried them home.
            </p>
            <p>
              The French tradition also gave rise to{" "}
              <Link
                href="/calculation"
                className="text-[#8B6914] hover:underline"
              >
                Calculation
              </Link>{" "}
              (known in early French texts as Broken Intervals), a game that
              demands mental arithmetic as players build foundations in different
              numerical sequences. This kind of mathematical solitaire is
              distinctly French in character, designed more as a brain exercise
              than a time-filler. French card game compendiums from the 1800s
              document over fifty distinct Patience layouts, many of which
              survive in modern digital collections.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── United Kingdom ── */}
        <CardSection id="united-kingdom">
          <SectionHeading
            sub="Club Rules and Codification"
            id="uk-heading"
            icon={"\u2663"}
          >
            United Kingdom: The Patience Tradition
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Britain adopted the French term &ldquo;Patience&rdquo; and made the
              games a staple of Victorian parlour culture. While card games
              generally carried a whiff of gambling in proper society, Patience
              was respectable precisely because it was played alone and involved
              no wagers. It became a socially acceptable pastime for women,
              clergy, and anyone who wanted to play cards without the moral
              complications of poker or whist.
            </p>
            <p>
              The British contribution to solitaire was codification. Card game
              clubs in London and Edinburgh developed standardized rule sets for
              popular variants, creating the first consistent rule books. Lady
              Adelaide Cadogan&apos;s &ldquo;Illustrated Games of Patience&rdquo;
              (1870s) became one of the most influential English-language solitaire
              references, establishing rule interpretations that persisted for over
              a century.
            </p>
            <p>
              British Patience rules tend to be stricter than their American
              counterparts. Traditional British{" "}
              <Link
                href="/klondike"
                className="text-[#8B6914] hover:underline"
              >
                Klondike
              </Link>{" "}
              uses draw-one from the stock with limited passes (typically three),
              empty columns can only be filled by Kings, and partial tableau
              sequences cannot be moved. These restrictions make the British
              version significantly harder than the relaxed American rules that
              most digital players know today.
            </p>
            <p>
              The UK also developed a tradition of competitive Patience, where
              players would compare completion rates and times on the same deals.
              This proto-competitive scene prefigured modern leaderboard systems
              by over a century. British Patience clubs maintained scoring systems
              that awarded points for speed, completion percentage, and the
              elegance of the solution path.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── United States ── */}
        <CardSection id="united-states">
          <SectionHeading
            sub="Klondike and the Digital Revolution"
            id="usa-heading"
            icon={"\u2665"}
          >
            United States: How Klondike Conquered the World
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              America&apos;s relationship with solitaire is inseparable from
              Klondike. While dozens of solitaire variants existed in the US by
              the late 1800s, Klondike&apos;s simple seven-column layout and
              intuitive building rules made it the most widely known. The name
              &ldquo;Klondike&rdquo; likely comes from the 1890s gold rush,
              when prospectors in the Yukon played the game to pass time in
              their camps.
            </p>
            <p>
              American rules for Klondike evolved to be more permissive than
              European versions. Where British players used draw-one and limited
              passes, American players commonly used draw-three with unlimited
              cycling through the waste pile. Empty columns could be filled with
              any card, not just Kings. Partial tableau sequences could be moved
              freely. These relaxed rules made the game more accessible but also
              less strategically demanding.
            </p>
            <p>
              The watershed moment was Microsoft Windows 3.0 in 1990. Wes Cherry,
              a Microsoft intern, wrote a Klondike Solitaire program originally
              designed to help users learn mouse drag-and-drop. The game shipped
              with every copy of Windows and became, by some estimates, the most
              played computer game in history. Microsoft&apos;s implementation
              used American rules (draw-three, unlimited passes) and established
              them as the global standard almost overnight.
            </p>
            <p>
              America also contributed Vegas Scoring, a variant rule system where
              players &ldquo;buy&rdquo; the deck for $52 and earn $5 for each
              card moved to a foundation. The goal is to finish with more money
              than you started with. This scoring system, popularized by casinos
              in Las Vegas and Reno, added a gambling element that European
              Patience traditions explicitly avoided. Vegas scoring remains a
              popular option in digital{" "}
              <Link
                href="/klondike/vegas-scoring"
                className="text-[#8B6914] hover:underline"
              >
                Klondike implementations
              </Link>{" "}
              today.
            </p>
            <p>
              The{" "}
              <Link href="/" className="text-[#8B6914] hover:underline">
                FreeCell
              </Link>{" "}
              variant also found its modern form in the United States. Paul
              Alfille created the first computer FreeCell in 1978 at the
              University of Illinois, and Microsoft&apos;s inclusion of FreeCell
              in Windows 95 made it the second most-played solitaire variant
              globally. FreeCell&apos;s near-perfect solvability rate (all but
              one of the original 32,000 Microsoft deals) appealed to players
              who preferred skill over luck.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Germany ── */}
        <CardSection id="germany">
          <SectionHeading
            sub="Strict Rules and Spider Origins"
            id="germany-heading"
            icon={"\u2666"}
          >
            Germany: Where Spider Was Born
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Germany has its own deep Patience tradition, with card game books
              (Spielb&uuml;cher) documenting solitaire variants from the early
              1800s. The German term &ldquo;Patience&rdquo; or
              &ldquo;Patiencen&rdquo; (plural) is used interchangeably with the
              French, reflecting the shared Central European card game culture.
            </p>
            <p>
              Germany&apos;s most significant contribution to world solitaire is
              the Spider family. The game known internationally as{" "}
              <Link
                href="/spider"
                className="text-[#8B6914] hover:underline"
              >
                Spider Solitaire
              </Link>{" "}
              traces its roots to German card games using two decks, particularly
              a game called Schwarze Witwe (Black Widow). The key innovation was
              using two full decks with same-suit building requirements, creating
              a game that was substantially more complex than single-deck variants.
              When Microsoft included Spider Solitaire in Windows 98&apos;s Plus
              Pack and later in Windows XP, it carried this German DNA to a
              global audience.
            </p>
            <p>
              German solitaire rules are characterized by strictness. Where
              American rules tend toward permissiveness (more redeals, flexible
              column filling), German traditions favor tight constraints that
              make games harder but more deterministic. This reflects a broader
              German card game culture that values precise rule-following, as
              seen in the country&apos;s rich tradition of Skat and other
              structured card games.
            </p>
            <p>
              German card game publishers also produced some of the most
              comprehensive solitaire reference books. Works like &ldquo;Das
              gro&szlig;e Patience-Buch&rdquo; catalogued hundreds of variants
              with precise rules, scoring systems, and difficulty ratings. This
              systematic approach to documenting solitaire helped preserve
              variants that might otherwise have been lost to oral transmission.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Russia ── */}
        <CardSection id="russia">
          <SectionHeading
            sub="Mathematical Approaches"
            id="russia-heading"
            icon={"\u2660"}
          >
            Russia: Solitaire as Mathematics
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Russia developed a distinctive solitaire culture that blends
              entertainment with mathematical thinking. The Russian term for
              solitaire, &ldquo;пасьянс&rdquo; (pasyans), comes directly from
              the French &ldquo;patience,&rdquo; reflecting the game&apos;s
              European origins. Solitaire became deeply embedded in Russian
              culture, appearing in literature from Tolstoy to Dostoevsky as a
              metaphor for fate and individual effort.
            </p>
            <p>
              Russia&apos;s most distinctive contribution is Russian Solitaire,
              a variant of{" "}
              <Link
                href="/yukon"
                className="text-[#8B6914] hover:underline"
              >
                Yukon Solitaire
              </Link>{" "}
              with specific movement rules. In the Russian version, face-up cards
              can be moved individually or in groups regardless of sequence, but
              building on the tableau must follow suit (not alternating colors as
              in standard Yukon). This creates a game that is paradoxically more
              flexible in movement but more restrictive in building, leading to
              a win rate significantly lower than Western Yukon.
            </p>
            <p>
              Russian mathematicians have made notable contributions to solitaire
              theory. Soviet-era mathematicians studied solitaire as a
              combinatorial problem, analyzing solvability rates and optimal
              strategies using probability theory. This academic interest led to
              some of the earliest computer solitaire programs on Soviet
              mainframes in the 1970s and 1980s, predating Microsoft&apos;s
              commercial versions.
            </p>
            <p>
              Russian solitaire culture also emphasizes fortune-telling
              associations. Using Patience outcomes to predict the future has a
              longer and more serious tradition in Russia than in Western
              Europe, where it was largely treated as a parlour amusement.
              Certain solitaire layouts are still used in Russian folk divination
              practices, blurring the line between card game and spiritual
              ritual.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Scandinavia ── */}
        <CardSection id="scandinavia">
          <SectionHeading
            sub="Nordic Patience Traditions"
            id="scandinavia-heading"
            icon={"\u2663"}
          >
            Scandinavia: Long Winters, Deep Games
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Scandinavian countries developed a strong Patience culture partly
              driven by geography: long, dark winters created the perfect
              conditions for solo card games. The Swedish term
              &ldquo;patiens&rdquo; and Norwegian/Danish &ldquo;kabal&rdquo;
              (from the French &ldquo;cabale,&rdquo; meaning secret knowledge)
              both point to the games&apos; European roots, but Nordic players
              developed distinctive local traditions.
            </p>
            <p>
              Swedish Patience developed specific rule variations that set it
              apart from Continental versions. Swedish players traditionally use
              a dealing method where cards are laid out in a specific
              cross-shaped or circular pattern rather than the linear columns
              common elsewhere. Some Swedish solitaire games incorporate a
              reserve pile mechanic not found in standard French or British
              variants.
            </p>
            <p>
              Norway and Denmark share a term for solitaire
              (&ldquo;kabal&rdquo;) that carries connotations of secret plots
              and hidden meaning, reflecting the fortune-telling associations
              that solitaire carried in Scandinavian culture. &ldquo;Kabal&rdquo;
              is also used metaphorically in Norwegian and Danish to describe
              complex political maneuvering or behind-the-scenes scheming.
            </p>
            <p>
              Finland developed its own solitaire preferences influenced by both
              Scandinavian and Russian card game traditions, given its geographic
              and historical position between the two cultures. Finnish solitaire
              collections often include Russian variants alongside standard
              Western ones, creating a uniquely hybrid card game culture.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Spain & Latin America ── */}
        <CardSection id="spain-latin-america">
          <SectionHeading
            sub="Regional Variants"
            id="spain-heading"
            icon={"\u2665"}
          >
            Spain &amp; Latin America: A Different Deck
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Spanish-speaking countries have a solitaire tradition shaped by a
              fundamental difference: the traditional Spanish deck. Where most
              European solitaire uses the French-suited 52-card deck (hearts,
              diamonds, clubs, spades), the Spanish deck uses 48 cards with
              different suits (coins, cups, swords, clubs) and no Queens. Tens
              are also absent in many regional versions. This different card
              base means that traditional Spanish solitaire games have different
              mathematical properties than their French-deck counterparts.
            </p>
            <p>
              The Spanish term for solitaire is &ldquo;solitario,&rdquo; and
              the games share many structural similarities with French Patience
              but adapted for the local deck. Spanish solitaire games often use
              a 40-card deck (removing 8s and 9s from the standard 48), which
              creates tighter, faster games with different probability
              distributions.
            </p>
            <p>
              In Latin America, solitaire traditions vary by country but
              generally blend Spanish card game heritage with American
              influences. Mexican solitaire culture, for instance, uses both
              the Spanish deck for traditional games and the French deck for
              Klondike-style games learned from American media. Argentine and
              Chilean players maintain their own regional variants alongside
              globally standardized digital versions.
            </p>
            <p>
              The digital era has largely displaced traditional Spanish-deck
              solitaire in favor of standard Klondike, but some dedicated
              communities and regional app developers maintain libraries of
              Spanish-deck solitaire games. These represent an important
              branch of solitaire history that is underrepresented in
              English-language references.
            </p>
          </ContentBody>
        </CardSection>

        <AdUnit className="-my-1" />

        {/* ── Japan ── */}
        <CardSection id="japan">
          <SectionHeading
            sub="Flower Cards and Adaptation"
            id="japan-heading"
            icon={"\u2666"}
          >
            Japan: Hanafuda Solitaire
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Japan&apos;s solitaire tradition is unique because it developed
              around a completely different card system. Hanafuda (flower cards)
              are a set of 48 cards divided into 12 suits representing months of
              the year, each associated with a flower or plant. While Hanafuda
              is best known for multi-player games like Koi-Koi and Hana-Awase,
              solo Hanafuda games exist and represent a genuinely independent
              solitaire tradition.
            </p>
            <p>
              Hanafuda solitaire games typically involve matching cards by
              month/suit and building sets called &ldquo;yaku&rdquo; (scoring
              combinations). The mechanics are fundamentally different from
              Western solitaire: instead of building ascending or descending
              sequences, players match cards by type and aim to complete specific
              high-scoring combinations. This reflects the broader Japanese card
              game tradition of pattern-matching over sequential building.
            </p>
            <p>
              Western-style solitaire (using the standard 52-card deck) arrived
              in Japan during the Meiji era (1868&ndash;1912) alongside other
              Western cultural imports. Today, digital solitaire in Japan
              typically uses the standard French deck and follows international
              rules, but Hanafuda solitaire apps and physical card games remain
              a distinct niche. Nintendo, which began as a Hanafuda
              manufacturer in 1889, still produces Hanafuda cards alongside its
              video game consoles.
            </p>
            <p>
              Japan also contributed to solitaire through its puzzle game culture.
              The Japanese emphasis on elegant, rule-constrained logic puzzles
              (exemplified by Sudoku) aligns with the more mathematical
              solitaire variants. Japanese players tend to favor skill-based
              solitaire games like{" "}
              <Link href="/" className="text-[#8B6914] hover:underline">
                FreeCell
              </Link>{" "}
              over luck-heavy ones, consistent with the broader cultural
              preference for games where outcomes reflect ability.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Australia & New Zealand ── */}
        <CardSection id="australia-new-zealand">
          <SectionHeading
            sub="The Canfield Connection"
            id="australia-heading"
            icon={"\u2660"}
          >
            Australia &amp; New Zealand: Patience Down Under
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Australia and New Zealand inherited the British
              &ldquo;Patience&rdquo; terminology and tradition, but their
              geographic isolation led to some distinctive local developments.
              The game known internationally as{" "}
              <Link
                href="/canfield"
                className="text-[#8B6914] hover:underline"
              >
                Canfield
              </Link>{" "}
              is called &ldquo;Demon&rdquo; in Australia and the UK (the
              American name comes from Richard Canfield, a New York casino
              owner who used the game as a gambling attraction in the 1890s).
              Australian Patience traditionally uses the stricter British rules:
              draw-one, limited passes, Kings-only for empty columns.
            </p>
            <p>
              Australia also developed a variant called Australian Patience, which
              is essentially Klondike with all cards dealt face-up. This
              eliminates the hidden information element and turns the game into
              a pure strategy puzzle. The variant is significant because it
              demonstrates how a single rule change (face-up vs. face-down
              dealing) can fundamentally alter a game&apos;s character from
              luck-influenced to deterministic.
            </p>
            <p>
              New Zealand card game culture closely mirrors Australian traditions,
              with Patience being the preferred term and British rule sets
              predominating. Both countries saw a strong shift toward American
              rules with the advent of Windows Solitaire in the 1990s, though
              older players often maintain the stricter traditional rules they
              learned growing up.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Italy ── */}
        <CardSection id="italy">
          <SectionHeading
            sub="Where Playing Cards Began"
            id="italy-heading"
            icon={"\u2663"}
          >
            Italy: The Card Game Cradle
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Italy&apos;s relationship with solitaire is complicated by the
              country&apos;s foundational role in European playing card history.
              Playing cards arrived in Italy from the Islamic world in the late
              14th century, and Italian card makers developed the suit systems
              that eventually spawned both the French suits (used in standard
              solitaire) and the Spanish suits. The original Italian suits
              &mdash; coins, cups, swords, and batons &mdash; are still used in
              traditional Italian card games.
            </p>
            <p>
              Italian solitaire (solitario) uses both the traditional Italian
              deck (typically 40 cards) and the standard French deck, depending
              on the region and the specific game. Northern Italy, closer to
              French and Austrian influence, tends toward French-deck solitaire.
              Southern Italy maintains stronger ties to the Italian-suited deck.
              This north-south divide in card game traditions reflects broader
              cultural divisions in Italian society.
            </p>
            <p>
              Italy&apos;s specific contribution to solitaire history includes
              several games based on the Italian deck&apos;s unique properties.
              With 40 cards and no Queens, Italian solitaire layouts have
              different tableau sizes and probability distributions than their
              52-card equivalents. Some Italian solitaire games use a
              &ldquo;trump&rdquo; mechanic borrowed from Tarot (which also
              originated in Italy), adding a layer of complexity not found in
              standard Patience games.
            </p>
            <p>
              The Tarot connection is particularly interesting. Italian Tarocchi
              decks, which include 22 trump cards alongside the standard suits,
              spawned their own solitaire variants. These Tarot solitaire games,
              played with 78-card decks, represent one of the most complex
              branches of the solitaire family tree and are virtually unknown
              outside Italy and southern France.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Cross-Country Comparison Table ── */}
        <CardSection id="comparison">
          <SectionHeading
            sub="At a Glance"
            id="comparison-heading"
            icon={"\u2665"}
          >
            How the Same Game Differs Across Countries
          </SectionHeading>

          <ContentBody>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b-2 border-[#B8860B]/30">
                    <th className="py-3 pr-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      Aspect
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      France
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      UK
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      USA
                    </th>
                    <th className="py-3 px-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      Germany
                    </th>
                    <th className="py-3 pl-3 font-semibold uppercase tracking-wider text-[#B8860B] text-xs">
                      Russia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={
                        i % 2 === 0 ? "bg-[#B8860B]/[0.03]" : ""
                      }
                    >
                      <td className="py-3 pr-3 text-[#2a2522] font-medium">
                        {row.label}
                      </td>
                      <td className="py-3 px-3 text-[#444444]">
                        {row.france}
                      </td>
                      <td className="py-3 px-3 text-[#444444]">
                        {row.uk}
                      </td>
                      <td className="py-3 px-3 text-[#444444]">
                        {row.usa}
                      </td>
                      <td className="py-3 px-3 text-[#444444]">
                        {row.germany}
                      </td>
                      <td className="py-3 pl-3 text-[#444444]">
                        {row.russia}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentBody>
        </CardSection>

        {/* ── Digital Unification ── */}
        <CardSection id="digital-era">
          <SectionHeading
            sub="The Great Convergence"
            id="digital-heading"
            icon={"\u2666"}
          >
            How Digital Solitaire Unified (and Fragmented) Rules
          </SectionHeading>

          <ContentBody className="space-y-5">
            <p>
              Before personal computers, solitaire rules were a patchwork of
              regional traditions passed down through families, card game clubs,
              and local publications. A player in Paris, London, and New York
              might all call their game &ldquo;Klondike&rdquo; while following
              three different rule sets. The digital era changed this in two
              contradictory ways.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              The Windows Effect
            </h3>
            <p>
              Microsoft Windows Solitaire (1990) was the single most powerful
              force for rule standardization in the game&apos;s history. By
              shipping Klondike with every copy of Windows, Microsoft
              established one specific rule interpretation as the global default.
              Draw-three, unlimited waste-pile passes, any card in empty
              columns &mdash; these American-influenced rules became
              &ldquo;correct&rdquo; for an entire generation of players who
              learned solitaire on a computer rather than from a book or family
              member.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              The App Store Fragmentation
            </h3>
            <p>
              Paradoxically, the mobile era reintroduced rule fragmentation.
              Hundreds of solitaire apps on iOS and Android each make their own
              rule decisions. Some follow Microsoft conventions, others
              implement stricter traditional rules, and many offer configurable
              options that let players choose their preferred variant. The
              result is that a modern player might encounter three different
              Klondike rule sets across three different apps, recreating the
              pre-digital regional variation in a new form.
            </p>

            <h3
              className="font-medium text-[#2a2522] text-lg pt-2"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
              }}
            >
              Preservation Through Digitization
            </h3>
            <p>
              On the positive side, digital solitaire has preserved hundreds of
              variants that might otherwise have been forgotten. Games like{" "}
              <Link
                href="/la-belle-lucie"
                className="text-[#8B6914] hover:underline"
              >
                La Belle Lucie
              </Link>
              ,{" "}
              <Link
                href="/flower-garden"
                className="text-[#8B6914] hover:underline"
              >
                Flower Garden
              </Link>
              , and{" "}
              <Link
                href="/cruel"
                className="text-[#8B6914] hover:underline"
              >
                Cruel Solitaire
              </Link>{" "}
              survive in digital form even as the physical card game traditions
              that created them fade. Online collections and enthusiast
              communities document rule variations from around the world,
              creating a more complete record of solitaire&apos;s global
              diversity than any single book ever managed.
            </p>
          </ContentBody>
        </CardSection>

        {/* ── Key Takeaways ── */}
        <CardSection id="key-takeaways">
          <SectionHeading
            sub="The Bottom Line"
            id="key-takeaways-heading"
            icon={"\u2660"}
          >
            Key Takeaways
          </SectionHeading>

          <ContentBody className="space-y-5">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                France invented card solitaire as a structured genre in the late
                1700s. Games like La Belle Lucie and Forty Thieves (Napoleon at
                St. Helena) reflect the French preference for elegant,
                mathematically interesting card layouts.
              </li>
              <li>
                Britain codified Patience rules through club standards and
                published references, establishing stricter rule traditions
                (draw-one, limited passes, Kings-only columns) that persist in
                UK and Commonwealth countries.
              </li>
              <li>
                The United States relaxed traditional rules and then globalized
                them through Microsoft Windows, making American-style Klondike
                the world&apos;s default solitaire game.
              </li>
              <li>
                Germany contributed the Spider family of solitaire games,
                characterized by two-deck play and same-suit building
                requirements that create high-complexity challenges.
              </li>
              <li>
                Russia, Japan, Spain, and Italy each developed solitaire
                traditions shaped by their unique card decks, cultural attitudes
                toward games, and geographic isolation from the French/British
                mainstream.
              </li>
              <li>
                Digital solitaire simultaneously standardized rules (through
                Microsoft&apos;s dominance) and preserved diversity (through app
                stores and online communities), creating today&apos;s landscape
                where both global standards and local variants coexist.
              </li>
            </ul>
          </ContentBody>
        </CardSection>

        {/* ── FAQ ── */}
        <CardSection id="faq">
          <SectionHeading sub="Common Questions" id="faq-heading" icon={"\u2753"}>
            Frequently Asked Questions
          </SectionHeading>

          <ContentBody className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i}>
                <h3 className="font-medium text-[#2a2522] text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-[#444444] leading-relaxed">
                  {faq.answer}
                </p>
                {i < faqs.length - 1 && (
                  <div className="mt-6 border-b border-[#e5e0d8]" />
                )}
              </div>
            ))}
          </ContentBody>
        </CardSection>

        {/* ── Related Pages ── */}
        <CardSection id="related">
          <SectionHeading sub="Keep Exploring" id="related-heading" icon={"\ud83d\udcda"}>
            Related Guides
          </SectionHeading>

          <ContentBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/history",
                  title: "FreeCell History",
                  desc: "The full history of FreeCell Solitaire.",
                },
                {
                  href: "/solitaire-types",
                  title: "All Solitaire Types",
                  desc: "Browse every solitaire variant we cover.",
                },
                {
                  href: "/patience-solitaire",
                  title: "Patience Solitaire",
                  desc: "The British tradition of Patience games.",
                },
                {
                  href: "/la-belle-lucie",
                  title: "La Belle Lucie",
                  desc: "Play the classic French solitaire game.",
                },
                {
                  href: "/forty-thieves",
                  title: "Forty Thieves",
                  desc: "Napoleon's game from St. Helena.",
                },
                {
                  href: "/spider",
                  title: "Spider Solitaire",
                  desc: "Germany's contribution to world solitaire.",
                },
                {
                  href: "/klondike",
                  title: "Klondike Solitaire",
                  desc: "America's most popular solitaire game.",
                },
                {
                  href: "/yukon",
                  title: "Yukon Solitaire",
                  desc: "Related to the Russian Solitaire variant.",
                },
                {
                  href: "/solitaire-difficulty-ranking",
                  title: "Difficulty Ranking",
                  desc: "How hard is each solitaire variant?",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="card-inset rounded-lg p-4 hover:bg-[#B8860B]/[0.06] transition-colors group"
                >
                  <h3 className="font-medium text-[#2a2522] group-hover:text-[#B8860B] transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-1">
                    {link.desc}
                  </p>
                </Link>
              ))}
            </div>
          </ContentBody>
        </CardSection>

        {/* ── CTA ── */}
        <CtaSection
          heading="Play Solitaire Games From Around the World"
          body="Try FreeCell, Spider, La Belle Lucie, Forty Thieves, and dozens more solitaire variants from different countries and traditions. Free in your browser, no download needed."
          primaryLabel="Play FreeCell"
          primaryHref="/"
          secondaryLabel="Browse All Games"
          secondaryHref="/solitaire-types"
        />

        <NetworkCrossLinks />
      </main>
    </ContentLayout>
  );
}
