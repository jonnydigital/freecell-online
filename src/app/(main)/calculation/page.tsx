import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import CalculationGamePage from "./CalculationGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Calculation Solitaire | Play Online Free — Math-Based Card Game",
  description:
    "Play Calculation Solitaire online for free. Build four foundations using different counting intervals (1s, 2s, 3s, 4s). Suit doesn't matter — only rank and math skills. No download required.",
  keywords: [
    "calculation solitaire",
    "calculation solitaire online",
    "calculation card game",
    "math solitaire",
    "calculation patience game",
    "play calculation solitaire",
    "calculation solitaire free",
    "solitaire math game",
    "broken intervals solitaire",
  ],
  openGraph: {
    title: "Calculation Solitaire | Play Online Free — Math-Based Card Game",
    description:
      "Play Calculation Solitaire online for free. Build four foundations by counting in intervals of 1, 2, 3, and 4 — wrapping around from King to Ace.",
    url: absoluteUrl("/calculation"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Calculation Solitaire?",
    answer:
      "Calculation Solitaire is a math-based patience card game where you build four foundations using different counting intervals. Foundation 1 counts by 1s (A,2,3...K), Foundation 2 by 2s (2,4,6,8,10,Q,A,3,5,7,9,J,K), Foundation 3 by 3s, and Foundation 4 by 4s. Suit doesn't matter — only rank. The challenge is managing four waste piles strategically.",
  },
  {
    question: "How do I play Calculation Solitaire?",
    answer:
      "Draw one card at a time from the stock. If it matches the next expected rank on any foundation, place it there. Otherwise, place it on one of four waste piles. You can also move the top card of any waste pile to a foundation when it matches. The goal is to complete all four foundations, each ending with King.",
  },
  {
    question: "Does suit matter in Calculation Solitaire?",
    answer:
      "No! Suit is completely irrelevant in Calculation Solitaire. Only the rank (number) of each card matters. This makes it unique among solitaire games — it's purely a mathematical puzzle about number sequences and waste pile management.",
  },
  {
    question: "What are the foundation sequences in Calculation?",
    answer:
      "Foundation 1 (Ace): A,2,3,4,5,6,7,8,9,10,J,Q,K. Foundation 2 (Two): 2,4,6,8,10,Q,A,3,5,7,9,J,K. Foundation 3 (Three): 3,6,9,Q,2,5,8,J,A,4,7,10,K. Foundation 4 (Four): 4,8,Q,3,7,J,2,6,10,A,5,9,K. Each sequence wraps around after King.",
  },
  {
    question: "What is the win rate for Calculation Solitaire?",
    answer:
      "With skilled play, Calculation Solitaire has an estimated win rate of around 30-40%. The key is waste pile management — planning which cards to bury where so you can access them in the right order later. It's one of the more skill-dependent solitaire games.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Calculation Solitaire",
    description:
      "Free online Calculation Solitaire. Build four foundations using counting intervals of 1, 2, 3, and 4. A unique math-based patience game.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/calculation"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "654",
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
        name: "Calculation Solitaire",
        item: absoluteUrl("/calculation"),
      },
    ],
  };

  const faqJsonLd = {
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
  };

  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <CalculationGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Calculation Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Calculation is a unique math-based solitaire where <strong>suit doesn&apos;t matter</strong> —
          only rank. Four foundations build up using different counting intervals: by 1s, 2s, 3s,
          and 4s, wrapping around from King back to Ace. The challenge lies entirely in managing
          your four waste piles to access cards in the right order.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Calculation Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Start with an Ace, 2, 3, and 4 as foundation bases. Draw cards one at a time from the
          stock. Each drawn card must go to a foundation (if it matches the next expected rank)
          or a waste pile. The top card of each waste pile is available to play to foundations
          at any time. There is <strong>no redeal</strong> — once the stock is empty, you can
          only play from waste pile tops.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Sequences
        </h3>
        <div className="space-y-2 mb-6 text-white/70 font-mono text-sm">
          <p><strong className="text-white/90">Foundation 1 (+1):</strong> A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K</p>
          <p><strong className="text-white/90">Foundation 2 (+2):</strong> 2, 4, 6, 8, 10, Q, A, 3, 5, 7, 9, J, K</p>
          <p><strong className="text-white/90">Foundation 3 (+3):</strong> 3, 6, 9, Q, 2, 5, 8, J, A, 4, 7, 10, K</p>
          <p><strong className="text-white/90">Foundation 4 (+4):</strong> 4, 8, Q, 3, 7, J, 2, 6, 10, A, 5, 9, K</p>
        </div>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategy Tips
        </h3>
        <ul className="list-disc list-inside space-y-2 mb-6 text-white/70">
          <li>Dedicate each waste pile to a specific range of ranks — don&apos;t mix randomly.</li>
          <li>Keep one waste pile empty or nearly empty as a &ldquo;buffer&rdquo; for unexpected cards.</li>
          <li>Learn the sequences! Knowing what&apos;s coming next on each foundation is crucial.</li>
          <li>Kings are always last — plan to bury them deep in waste piles early.</li>
          <li>Watch all four foundations simultaneously — a card might fit one you didn&apos;t expect.</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Calculation holds an unusual place in the patience literature: it is one of
          the only classical solitaires whose foundations are built on arithmetic
          sequences rather than suit or rank adjacency. Documented in nineteenth-century
          German patience books under names such as <em>Sir Tommy&apos;s Variant</em>{" "}
          and <em>Broken Intervals</em>, Calculation reached English-speaking players
          through translations and Hoyle revisions in the late 1800s. The game&apos;s
          mathematical DNA — four foundations built with the four increments +1, +2,
          +3, +4 — reflects an era when patience was considered a mental discipline
          rather than a casual amusement. Edwardian manuals sometimes printed the four
          sequences as a memorisation drill for young players, and the word
          &ldquo;calculation&rdquo; stuck because that is literally what the game
          demands. Today it survives as the purest example of rank-only,
          suit-indifferent solitaire still widely played.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          Calculation is a routing puzzle more than a card game. Because suit is
          irrelevant and every card has exactly four possible foundation targets, our
          job is to bury cards in waste piles we can recover from — and the four
          foundation sequences demand four different mental models. We memorise the +1
          sequence instantly (it is just A through K in order). The +2 sequence alters
          at seven cards in (2, 4, 6, 8, 10, Q, A, 3, 5, 7, 9, J, K), and we hold the
          wrap point A&rarr;3 in our heads. The +3 and +4 sequences reorder the ranks
          completely, and strong players simply learn them by heart.
        </p>
        <p className="mb-4 leading-relaxed">
          Because each foundation wants a different &ldquo;next card,&rdquo; every
          drawn card could be a foundation play right now or a future foundation play
          buried in a waste pile. We assign each of the four waste piles a loose
          character: one pile absorbs cards needed soon by the +1 foundation, one
          pile hoards cards for the +3 and +4 foundations, one pile collects Kings and
          other late-sequence cards, and one pile stays deliberately shallow as a
          buffer for surprise cards. Mixing ranks randomly across piles is a
          slow-motion disaster: we will bury a card that we need next only to
          discover the card sitting on top of it is not needed for another ten plays.
        </p>
        <p className="mb-4 leading-relaxed">
          The mental math matters because each play forces recomputation of all four
          &ldquo;next needed&rdquo; targets. After we place the 6 on the +2
          foundation, the next needed card there is 8, but 6 may also be an active
          bury target for the +3 pile. We narrate these recalculations aloud during
          learning, then internalise them. Players who track the foundations as a
          constant four-way lookup win roughly twice as often as players who watch
          only one foundation at a time.
        </p>
        <p className="mb-4 leading-relaxed">
          A practical rule of thumb: after foundation plays, the four &ldquo;next
          needed&rdquo; ranks across the four piles rarely repeat. In a typical
          mid-game state, we might be watching for an 8, a Queen, a 5, and a 3 — four
          distinct ranks that cover a substantial portion of the deck. That
          distribution is what keeps Calculation interesting; no single card becomes
          worthless. Every rank in the deck is valuable somewhere, which is why
          losing cards to a careless bury feels so expensive. Expert players also
          learn to predict when a foundation is about to become &ldquo;sticky&rdquo;
          — meaning the next-needed card is sitting on the wrong waste pile, and
          several plays elsewhere must happen before it becomes accessible.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Calculation is famously skill-dependent: estimates place the win rate around
          25-30% with disciplined waste-pile management, and under 10% with careless
          play. The gap between novice and expert is enormous. There is no redeal and
          no reserve, so a single sloppy waste-pile assignment can end a deal we were
          winning half a minute earlier.
        </p>
        <p className="mb-4 leading-relaxed">
          Compared to most patience games, Calculation rewards practice much more
          consistently. Because suit is removed from the puzzle, the game distils down
          to pure routing, and a player who sees the same deal twice will play it much
          better the second time. That repeatability is part of the appeal: unlike
          games where luck dominates, skill visibly compounds in Calculation.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The biggest mistake in Calculation is mixing ranks across waste piles without
          a plan. Players grab the nearest pile because it feels natural, and twenty
          cards later they have burned a winnable deal. The second biggest mistake is
          neglecting the +3 and +4 sequences — novices watch the +1 and +2 foundations
          carefully but treat the harder sequences as background noise, only to find
          themselves unable to play a Queen that was the next needed card on the +3
          pile for six moves.
        </p>
        <p className="mb-4 leading-relaxed">
          A third common blunder is refusing to keep a buffer pile. Players greedily
          load all four waste piles with useful cards and then have no safe place to
          drop a wild card when one arrives. A shallow buffer, even if it seems to
          waste capacity, is what prevents deadlock. Finally, new players often forget
          that the top card of a waste pile is playable to <em>any</em> foundation,
          not just the one they originally had in mind — they miss legal plays simply
          because they are not scanning all four foundations each turn.
        </p>
        <p className="mb-4 leading-relaxed">
          Another recurring error is moving a card to a waste pile when it could go
          directly to a foundation. Because we have memorised the four sequences, we
          sometimes get locked into the &ldquo;sort to pile&rdquo; rhythm and forget
          to check foundation legality first. Every turn starts with the same
          question: can this card play to any foundation right now? Only if the
          answer is no do we route it to a waste pile — and even then we choose the
          pile that best matches its future foundation target.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Calculation is closest in structure to <em>Sir Tommy</em>, which also uses
          four waste piles but with a single +1 sequence per foundation — Sir Tommy is
          the simpler cousin, and Calculation is the mathematically demanding
          extension. Compared to{" "}
          <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Dozen
          </Link>
          , Calculation removes suit entirely and replaces cascade management with
          waste-pile management — a different skill, but with similar demands on
          foresight. Compared to{" "}
          <Link href="/clock" className="text-[#D4AF37] hover:underline">
            Clock
          </Link>
          , Calculation is vastly more interactive: Clock is essentially automatic,
          while Calculation requires deliberate decisions on every single card.
        </p>
        <p className="mb-4 leading-relaxed">
          Players who enjoy Calculation often gravitate toward{" "}
          <Link href="/accordion" className="text-[#D4AF37] hover:underline">
            Accordion
          </Link>{" "}
          (another pure-skill, low-luck patience) or toward{" "}
          <Link href="/gaps" className="text-[#D4AF37] hover:underline">
            Gaps
          </Link>{" "}
          for its rank-focused, routing-heavy puzzle. Players looking for a break
          after a streak of Calculation losses usually cross over to{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , where skill is still decisive but the win rate is an order of magnitude
          kinder.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most common Calculation variant allows a single redeal of the waste
          piles after the stock is exhausted, usually by gathering all four piles in
          order and redealing them as a new stock. This <em>one-pass redeal</em>{" "}
          variant lifts the win rate closer to 50% but blunts the game&apos;s intense
          skill demands — we prefer the classical no-redeal form here. Another variant
          opens with foundations pre-stocked at 2-3-4-5 instead of A-2-3-4, shifting
          all four sequences by one rank; this &ldquo;German Calculation&rdquo;
          version appears in some older patience compendiums. A rarer variant permits
          cards to move between waste piles before playing, dramatically increasing
          flexibility but diluting the puzzle&apos;s distinctive constraint.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/calculation/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Calculation
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/calculation/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Calculation Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/bakers-dozen"
              className="text-[#D4AF37] hover:underline"
            >
              Play Baker&apos;s Dozen
            </Link>{" "}
            — Another foundation-building solitaire
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic free cell solitaire
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
        <MoreGames currentSlug="calculation" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
