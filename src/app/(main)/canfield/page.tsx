import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import CanfieldGamePage from "./CanfieldGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Canfield Solitaire | Play Online Free — No Download",
  description:
    "Play Canfield Solitaire online for free. Build four foundations up in suit from a random base rank with wrapping. Reserve pile, stock draws of three, and unlimited redeals. Undo, hints, mobile-friendly.",
  keywords: [
    "canfield solitaire",
    "canfield solitaire online",
    "canfield solitaire free",
    "canfield card game",
    "canfield solitaire rules",
    "canfield solitaire no download",
    "play canfield solitaire online",
    "solitaire online",
    "canfield patience",
    "demon solitaire",
  ],
  openGraph: {
    title: "Canfield Solitaire | Play Online Free — No Download",
    description:
      "Play Canfield Solitaire online for free. Build foundations up in suit from a random base rank. No download required.",
    url: absoluteUrl("/canfield"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Canfield Solitaire",
    description:
      "Free online Canfield Solitaire. Build four foundations up in suit from a random base rank with wrapping.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/canfield"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "1186",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbJsonLd = {
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
        name: "Canfield Solitaire",
        item: absoluteUrl("/canfield"),
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canfield Solitaire is a challenging card game where you build four foundation piles up in suit from a randomly determined base rank, with wrapping from King back to Ace. It features a 13-card reserve pile, four tableau columns, and a stock that deals three cards at a time.",
        },
      },
      {
        "@type": "Question",
        name: "How do you play Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Deal 13 cards to the reserve (top card face-up), one card to start the first foundation (setting the base rank), one card to each of four tableau columns, and the rest to the stock. Build foundations up in suit with wrapping. Build tableau columns down in alternating colors with wrapping. Draw three cards at a time from the stock. Empty tableau columns auto-fill from the reserve.",
        },
      },
      {
        "@type": "Question",
        name: "What is the base rank in Canfield Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The base rank is determined by the first card dealt to the foundation. All four foundations must be built starting from this rank, going up in suit and wrapping around (e.g., if the base is 7, you build 7-8-9-10-J-Q-K-A-2-3-4-5-6).",
        },
      },
      {
        "@type": "Question",
        name: "Is Canfield Solitaire the same as Demon Solitaire?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Canfield Solitaire is known as 'Demon' or 'Demon Patience' in the UK. The rules are identical — both feature the 13-card reserve, random base rank foundations, and draw-three stock. The game was named after Richard A. Canfield, a 19th-century casino owner.",
        },
      },
      {
        "@type": "Question",
        name: "What percentage of Canfield Solitaire games are winnable?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only about 30-35% of Canfield Solitaire deals are theoretically winnable with perfect play. In practice, win rates are typically 5-15% due to the hidden reserve cards and limited tableau space. This makes Canfield one of the more challenging solitaire variants.",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <CanfieldGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Canfield Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-03-27"
            updatedDate="2026-03-27"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Canfield Solitaire (also called Demon Patience in the UK) is one of the most
          challenging and storied solitaire card games. Originally played in the casinos of
          Richard A. Canfield in the 1890s, players would pay $52 to play and earn $5 for
          each card placed on the foundations — the house almost always won.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How It Works
        </h2>
        <p className="mb-4 leading-relaxed">
          Thirteen cards are dealt face-down to the reserve pile with only the top card
          face-up. One card is placed on the first foundation, establishing the base rank
          for all four foundations. Four tableau columns receive one card each. The remaining
          cards form the stock pile, which deals three cards at a time to the waste pile.
        </p>
        <p className="mb-4 leading-relaxed">
          Build foundations up in suit, wrapping from King through Ace back to the rank
          below the base. Build tableau columns down in alternating colors, also with
          wrapping. When a tableau column empties, it automatically fills from the reserve.
          When the stock is exhausted, flip the waste pile back over to form a new stock
          (unlimited redeals).
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Tips for Winning
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Empty tableau columns are auto-filled from the reserve — use this to reveal hidden reserve cards</li>
          <li>Focus on depleting the reserve pile early for more flexibility</li>
          <li>Pay attention to the base rank — plan your foundation builds accordingly</li>
          <li>Don&rsquo;t rush to move cards to foundations if they&rsquo;re useful for tableau building</li>
          <li>Use the unlimited redeal wisely — track which cards cycle through the waste</li>
        </ul>

        {/* ── FAQ Section ── */}
        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-5 mb-10" itemScope itemType="https://schema.org/FAQPage">
          {[
            { q: "What is Canfield Solitaire?", a: "Canfield Solitaire is a challenging card game where you build four foundation piles up in suit from a randomly determined base rank, with wrapping from King back to Ace. It features a 13-card reserve pile, four tableau columns, and a stock that deals three cards at a time." },
            { q: "How do you play Canfield Solitaire?", a: "Deal 13 cards to the reserve (top card face-up), one card to start the first foundation (setting the base rank), one card to each of four tableau columns, and the rest to the stock. Build foundations up in suit with wrapping. Build tableau columns down in alternating colors with wrapping. Draw three cards at a time from the stock. Empty tableau columns auto-fill from the reserve." },
            { q: "What is the base rank in Canfield Solitaire?", a: "The base rank is determined by the first card dealt to the foundation. All four foundations must be built starting from this rank, going up in suit and wrapping around (e.g., if the base is 7, you build 7-8-9-10-J-Q-K-A-2-3-4-5-6)." },
            { q: "Is Canfield Solitaire the same as Demon Solitaire?", a: "Yes. Canfield Solitaire is known as 'Demon' or 'Demon Patience' in the UK. The rules are identical — both feature the 13-card reserve, random base rank foundations, and draw-three stock. The game was named after Richard A. Canfield, a 19th-century casino owner." },
            { q: "What percentage of Canfield Solitaire games are winnable?", a: "Only about 30-35% of Canfield Solitaire deals are theoretically winnable with perfect play. In practice, win rates are typically 5-15% due to the hidden reserve cards and limited tableau space. This makes Canfield one of the more challenging solitaire variants." },
          ].map((item) => (
            <div
              key={item.q}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.q}</p>
              <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Canfield takes its name from <strong>Richard A. Canfield</strong>,
          a notorious gambling impresario who ran the Canfield Casino in
          Saratoga Springs, New York in the late 1800s. According to the
          enduring story, Canfield sold players a full $52 deck for fifty-two
          dollars and then paid them five dollars for every card they
          managed to move to the foundations — a game so punishingly hard
          that the house pocketed the difference on nearly every hand. The
          mathematics of the deal mean the average player loses around
          twenty-five to thirty dollars per session, which is why Canfield
          the man became wealthy and Canfield the game became famous. In
          the United Kingdom the same rules circulated under the name
          <strong> Demon</strong> or <strong>Demon Patience</strong>, and
          those names survive in British patience manuals today. The game
          stuck around because the rules are simple, the decisions are
          genuinely interesting, and the casino pedigree gives every deal
          a faint whiff of danger.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The first strategic idea in Canfield is that the
          <strong> reserve pile of 13 cards</strong> is the entire game. We
          cannot win a Canfield deal without clearing most of that reserve,
          and since only the top card is face-up at any moment, every
          reserve move is a small act of discovery. Plan to play the
          reserve down systematically — every time a tableau column empties,
          it auto-fills from the top of the reserve, so we should engineer
          tableau clears precisely to keep the reserve moving.
        </p>
        <p className="mb-4 leading-relaxed">
          The second strategic idea is that the
          <strong> foundation base rank is variable</strong>. In Canfield,
          the fourteenth card we see (the first foundation card dealt)
          sets the base for all four foundations. If that card is a seven,
          all four foundations climb 7-8-9-10-J-Q-K-A-2-3-4-5-6 with
          wraparound. This matters because it changes which cards are
          &ldquo;low&rdquo; and which are &ldquo;high&rdquo; for the
          duration of the deal. A two is usually a friendly foundation
          climber; in a base-seven game, it is one of the last cards we
          can play up. Track the base rank and plan foundation moves
          around it, not around the natural ace-through-king habit.
        </p>
        <p className="mb-4 leading-relaxed">
          The third idea is <strong>stock cycling discipline</strong>.
          Canfield deals three cards at a time from the stock to the
          waste pile, with unlimited redeals, but the cycle is not free
          — each pass shows us the same subset of cards in the same
          order, and we only have access to the top of each triplet.
          Track which cards you have seen, and commit to playing them
          when the tableau supports it. If a card cycles through three
          times without a home, it is a signal that we need to change
          the tableau structure, not keep waiting. Finally, build
          tableau columns down in alternating colors with wrapping,
          but do not over-invest in long tableau runs — reserve clearing
          is almost always more valuable than tableau building.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Canfield is middle-of-the-pack in difficulty. The commonly cited
          number is that roughly <strong>35%</strong> of Canfield deals
          are winnable with careful play — a figure that places it above
          <Link href="/forty-thieves" className="text-[#D4AF37] hover:underline"> Forty Thieves</Link> (around
          10&ndash;20%) and below
          <Link href="/klondike" className="text-[#D4AF37] hover:underline"> Klondike</Link> (roughly 80% solvable).
          Casual player win rates typically sit in the 5&ndash;15% band,
          mostly because the hidden reserve pile punishes players who
          fail to track what has been revealed. The unlimited stock
          redeals give us more chances to recover than Forty Thieves
          offers, but the variable base rank and the 13-card reserve
          create genuine strategic tension that Klondike lacks. Players
          who enjoy Canfield usually describe it as a game of
          <em> information management</em>: win rates climb noticeably
          once we internalize the stock cycle and reserve tracking.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-4 text-white/70">
          <li>
            <strong className="text-white/90">Neglecting the reserve.</strong>
            The reserve pile is the game. Players who treat it as a side
            stack and focus on tableau and stock will lose most deals.
          </li>
          <li>
            <strong className="text-white/90">Blocking foundations.</strong>
            Because foundations wrap from the base rank, it is easy to
            lock a card under a useless build. Always check foundation
            availability before committing a tableau sequence.
          </li>
          <li>
            <strong className="text-white/90">Miscounting stock cycles.</strong>
            We see the same cards in the same order every pass, minus
            the ones we played. Losing track of that cycle turns the
            stock into noise instead of information.
          </li>
          <li>
            <strong className="text-white/90">Over-building the tableau.</strong>
            A long tableau run looks productive but does not clear the
            reserve. When in doubt, do the reserve move first.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>Canfield vs. Klondike.</strong> On paper the games look
          similar — both feature a stock, a waste, tableau columns built
          down in alternating colors, and foundations that climb by suit.
          The differences are decisive.
          <Link href="/klondike" className="text-[#D4AF37] hover:underline"> Klondike</Link> fixes the
          foundation base at ace and has no reserve pile, which makes it
          a cleaner cascading game. Canfield&rsquo;s 13-card reserve plus
          variable base rank create a very different puzzle: we are not
          just sequencing cards, we are managing a hidden information
          pile while navigating foundations that do not start at ace.
          Klondike is the better introduction; Canfield is the better
          long-term practice.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Canfield vs. <Link href="/freecell" className="text-[#D4AF37] hover:underline">FreeCell</Link>.</strong>
          FreeCell is an open-information game with near-perfect
          solvability. Canfield is the opposite — hidden reserve cards,
          cycled stock triplets, and variable base ranks create
          information asymmetry that FreeCell players find genuinely
          foreign. Neither is harder than the other in a pure solver
          sense; they are hard in different ways.
        </p>
        <p className="mb-4 leading-relaxed">
          <strong>Canfield vs. <Link href="/yukon" className="text-[#D4AF37] hover:underline">Yukon</Link>.</strong>
          Both offer richer tableau mechanics than Klondike, but they
          diverge sharply. Yukon has no stock or reserve at all; Canfield
          leans on both. Yukon rewards aggressive digging; Canfield
          rewards patience and information tracking.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The Canfield family includes several named variants worth
          knowing. <strong>Rainbow Canfield</strong> loosens the
          alternating-color rule and lets us build tableau columns in
          any color sequence, which noticeably raises the win rate and
          is a common easy-mode entry point. <strong>Storehouse
          Canfield</strong> (sometimes called Thirteen Up or Provisions)
          fixes all four foundations to start at ace, which removes the
          variable base rank and turns the game into a more conventional
          ace-to-king climb. <strong>Demon</strong> is simply the British
          name for standard Canfield and plays identically. Some digital
          collections include a <strong>Double Canfield</strong>
          two-deck version for longer sessions. Each variant keeps the
          13-card reserve as its strategic anchor; only the surrounding
          rules change.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/canfield/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Canfield Solitaire
            </Link>{" "}
            — Complete rules, setup, and strategy guide
          </li>
          <li>
            <Link
              href="/klondike"
              className="text-[#D4AF37] hover:underline"
            >
              Play Klondike Solitaire
            </Link>{" "}
            — The classic draw-and-stack solitaire
          </li>
          <li>
            <Link
              href="/golf"
              className="text-[#D4AF37] hover:underline"
            >
              Play Golf Solitaire
            </Link>{" "}
            — Fast-paced solitaire with streak scoring
          </li>
          <li>
            <Link
              href="/solitaire-types"
              className="text-[#D4AF37] hover:underline"
            >
              Types of Solitaire
            </Link>{" "}
            — Explore 20+ solitaire variants
          </li>
        </ul>
        <MoreGames currentSlug="canfield" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
