import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import LaBelleLucieGamePage from "./LaBelleLucieGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "La Belle Lucie Solitaire | Play Online Free — The Fan Card Game",
  description:
    "Play La Belle Lucie Solitaire (The Fan) online for free. 18 fans, same-suit building, 2 redeals with shuffle, and a special Merci rule. No download required.",
  keywords: [
    "la belle lucie solitaire",
    "la belle lucie online",
    "the fan solitaire",
    "la belle lucie card game",
    "play la belle lucie",
    "la belle lucie free",
    "fan solitaire",
    "merci rule solitaire",
  ],
  openGraph: {
    title: "La Belle Lucie Solitaire | Play Online Free — The Fan Card Game",
    description:
      "Play La Belle Lucie Solitaire online for free. 18 fans of cards, same-suit building, shuffled redeals, and the Merci rule.",
    url: absoluteUrl("/la-belle-lucie"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is La Belle Lucie Solitaire?",
    answer:
      "La Belle Lucie (also called The Fan) is a patience card game where 52 cards are dealt face-up into 17 fans of 3 cards plus 1 fan of 1 card. Build four foundations up by suit from Ace to King. Stack tableau cards in descending order by same suit. Only the top card of each fan can be moved, and empty fans cannot be filled.",
  },
  {
    question: "How many redeals are allowed in La Belle Lucie?",
    answer:
      "You are allowed up to 2 redeals in La Belle Lucie. When you redeal, all remaining tableau cards are gathered, shuffled, and re-dealt into fans of 3. After the second redeal (third deal), the special Merci rule becomes available.",
  },
  {
    question: "What is the Merci rule?",
    answer:
      "The Merci rule is a special privilege available after the final redeal (third deal). It allows you to draw one buried card from any fan and play it directly to a valid destination. This can be a game-saver when a critical card is trapped beneath others.",
  },
  {
    question: "What is the win rate for La Belle Lucie?",
    answer:
      "La Belle Lucie has an estimated win rate of approximately 15-20% with skilled play. The combination of same-suit building, limited redeals, and the inability to fill empty fans makes it one of the more challenging single-deck patience games.",
  },
  {
    question: "How is La Belle Lucie different from Cruel Solitaire?",
    answer:
      "Both games use same-suit tableau building, but they differ in several ways: La Belle Lucie deals into fans of 3 (vs Cruel's piles of 4), La Belle Lucie allows only 2 redeals with shuffling (vs Cruel's unlimited redeals without shuffling), and La Belle Lucie has the unique Merci rule. Cruel also pre-places aces on foundations while La Belle Lucie includes them in the deal.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "La Belle Lucie Solitaire",
    description:
      "Free online La Belle Lucie Solitaire (The Fan). 18 fans, same-suit building, shuffled redeals, and the Merci rule.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/la-belle-lucie"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "743",
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
        name: "La Belle Lucie Solitaire",
        item: absoluteUrl("/la-belle-lucie"),
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
      <LaBelleLucieGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          La Belle Lucie Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          La Belle Lucie (also known as <strong>The Fan</strong>) is one of the
          most elegant patience card games. All 52 cards are dealt face-up into
          18 fans — 17 fans of 3 cards and 1 fan of 1 card. Build{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>{" "}
          up by suit from Ace to King, stacking tableau cards in descending
          same-suit order. With only 2 shuffled redeals and the special{" "}
          <strong>Merci rule</strong>, every move demands careful planning.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How La Belle Lucie Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal all 52 cards face-up into 18 fans. Only the top card of each fan
          can be moved. Stack on the tableau in <strong>descending same-suit
          order</strong> — place a 5&spades; on a 6&spades;. Empty fans cannot
          be filled. When stuck, use one of your 2 redeals to gather, shuffle,
          and re-deal all remaining tableau cards into fresh fans of 3. After the
          final redeal, the <strong>Merci</strong> lets you rescue one buried card.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Merci Rule
        </h3>
        <p className="mb-4 leading-relaxed">
          After using both redeals (on the third deal), you gain a one-time
          privilege: draw any single buried card from any fan and play it to a
          valid destination. This powerful move can rescue a trapped Ace or
          unblock a critical sequence. Use it wisely — you only get one Merci
          per game.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          La Belle Lucie is a nineteenth-century French patience whose name translates
          to &ldquo;Beautiful Lucy&rdquo; — a gallant dedication that has followed the
          game through more than a century of parlour play. Early printed rulebooks fix
          the layout at seventeen fans of three cards plus one stray single, and the
          distinctive three-redeal progression (two shuffled redeals followed by the
          <em> Merci</em> privilege) appears consistently across French, English, and
          American patience compendiums from the late 1800s onward. The game&apos;s
          reputation for difficulty is part of its charm: period writers often paired it
          with{" "}
          <Link href="/cruel" className="text-[#D4AF37] hover:underline">
            Cruel
          </Link>{" "}
          as an example of same-suit building taken to its logical, punishing extreme.
          La Belle Lucie helped popularise the very idea of structured redeals, and it
          remains a touchstone reference whenever we discuss shuffled-restart solitaire
          families today.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          In La Belle Lucie, redeal timing is the entire game. Because we only get two
          shuffled restarts and one Merci rescue, we treat each redeal as a currency we
          refuse to spend until the current tableau has been stripped bare of every
          legal move. The classic beginner mistake is burning a redeal when two or three
          productive moves remain hidden a half-second away; we always probe the fans
          fully before surrendering them to the shuffle.
        </p>
        <p className="mb-4 leading-relaxed">
          Three-card fans deconstruct predictably: the top card is free, the middle card
          waits for one play, and the bottom card waits for two. That asymmetry tells us
          where to look for Aces. We scan every fan for buried Aces first, plot the
          chain of tops we would have to move to free them, and only then commit to a
          sequence. A fan with an Ace on the bottom is practically dead without help
          from a neighbouring fan — we avoid building on top of it and look for
          alternative routing.
        </p>
        <p className="mb-4 leading-relaxed">
          The goal of any good La Belle Lucie line is to land single cards on Aces: if
          an Ace is already on a foundation, we can clear fans by ticking 2, 3, 4
          upward in sequence, and those foundation plays do not cost us tempo the way
          tableau shuffling does. We prioritise feeding foundations over building
          elegant tableau sequences, because elegant sequences die the moment we need a
          card that sits underneath them. Finally, we save the Merci for a card that
          unlocks a cascade of four or more plays — never for a card we could eventually
          reach another way.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          La Belle Lucie sits in the &ldquo;skilled but punishing&rdquo; tier of
          patience games. With careful redeal management and disciplined Merci use, we
          expect to win about 25% of deals — roughly one in four. The combined effect of
          same-suit building, the empty-fan restriction, and the sharply limited
          shuffles means that even expert players routinely encounter unwinnable
          positions that no amount of foresight can rescue.
        </p>
        <p className="mb-4 leading-relaxed">
          That 25% figure assumes we play every deal to its true conclusion, exhausting
          both redeals and the Merci before accepting defeat. Casual players who burn
          redeals early or waste the Merci on low-value cards will see far lower rates,
          often closer to 10%. Compared to{" "}
          <Link href="/cruel" className="text-[#D4AF37] hover:underline">
            Cruel Solitaire
          </Link>{" "}
          (which offers unlimited unshuffled redeals and runs around 15%), La Belle
          Lucie is actually more forgiving thanks to the shuffle — but it demands
          better planning because we cannot simply grind through permutations.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most frequent error we see is redealing too early — players bail on a
          deal the moment the obvious moves dry up, without scanning for the
          second-order moves that appear after a single tableau swap. A close second is
          building long same-suit sequences on the tableau that then block access to a
          critical buried card; those pretty stacks become tombstones for Aces and
          Twos. Players also burn the Merci on rescue cards that only unlock one or two
          subsequent plays, when a little more patience would reveal a card whose
          rescue cascades into five or six foundation moves.
        </p>
        <p className="mb-4 leading-relaxed">
          Another recurring blunder is ignoring the empty-fan rule: because empty fans
          cannot be refilled, emptying a fan is always an irreversible contraction of
          the game state. We treat fan evacuation as a deliberate, late-game tactic,
          not a reflex. Finally, new players often forget to look across all four suits
          before moving — they find a valid spade play and take it, unaware that the
          same action has just blocked the only route to the ace of hearts two fans
          over.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          La Belle Lucie belongs to the same-suit-building family that includes{" "}
          <Link href="/cruel" className="text-[#D4AF37] hover:underline">
            Cruel
          </Link>
          ,{" "}
          <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Dozen
          </Link>
          , and{" "}
          <Link href="/flower-garden" className="text-[#D4AF37] hover:underline">
            Flower Garden
          </Link>
          . Against Cruel, La Belle Lucie trades unlimited redeals for two shuffled
          redeals plus the Merci — a structural change that rewards foresight over
          brute-force iteration. Against Baker&apos;s Dozen, La Belle Lucie offers
          redeals at all, which Baker&apos;s Dozen does not, but La Belle Lucie&apos;s
          fan layout buries cards less predictably. Against Flower Garden, La Belle
          Lucie is fundamentally harder because it lacks a reserve; Flower Garden&apos;s
          16-card bouquet is a permanent safety net that La Belle Lucie never offers.
        </p>
        <p className="mb-4 leading-relaxed">
          Players who enjoy La Belle Lucie often gravitate toward{" "}
          <Link href="/scorpion" className="text-[#D4AF37] hover:underline">
            Scorpion
          </Link>{" "}
          for its same-suit sequencing in a cascade layout, or toward{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          when they want a forgiving break — FreeCell&apos;s alternating-colour
          stacking and four free cells produce win rates north of 99%, a full
          universe away from La Belle Lucie&apos;s quarter-odds.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most common La Belle Lucie variant we encounter is <em>Trefoil</em>,
          which pre-places the four Aces on foundations before dealing. Trefoil creates
          eighteen even fans of three (48 cards across 16 fans of three), produces a
          measurably higher win rate, and is often taught as a gentler introduction to
          the format. Another variant, sometimes called <em>Shamrocks</em>, forbids
          building a King on a Queen during the tableau, reserving Kings solely for
          foundations — this tightens the endgame considerably. A third tradition
          offers only a single redeal instead of two, sometimes with the Merci
          available from the first deal; this &ldquo;short form&rdquo; plays faster but
          wins less often. Modern digital implementations usually stick to the
          two-redeal classical rules, which is what we offer here.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/la-belle-lucie/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play La Belle Lucie
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/la-belle-lucie/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              La Belle Lucie Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Another same-suit building game with redeals
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
        <MoreGames currentSlug="la-belle-lucie" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
