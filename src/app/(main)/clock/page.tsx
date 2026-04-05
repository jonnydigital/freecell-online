import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import ClockGamePage from "./ClockGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Clock Solitaire | Play Clock Patience Online Free — Card Game",
  description:
    "Play Clock Solitaire (Clock Patience) online for free. Deal 52 cards into a clock face and flip cards to their matching positions. A classic luck-based patience game. No download required.",
  keywords: [
    "clock solitaire",
    "clock patience",
    "clock solitaire online",
    "clock card game",
    "play clock solitaire",
    "clock solitaire free",
    "clock patience online",
    "clock solitaire no download",
  ],
  openGraph: {
    title: "Clock Solitaire | Play Clock Patience Online Free — Card Game",
    description:
      "Play Clock Patience online for free. Deal cards into a clock face and flip them to matching positions. A classic patience game.",
    url: absoluteUrl("/clock"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Clock Solitaire?",
    answer:
      "Clock Solitaire (also called Clock Patience) is a classic card game where 52 cards are dealt face-down into 13 piles of 4 — 12 arranged in a clock face and 1 in the center. You flip cards and place them under the pile matching their rank. The game plays itself step by step with no decisions to make.",
  },
  {
    question: "How do you win Clock Solitaire?",
    answer:
      "You win Clock Solitaire when all 52 cards are face-up. This happens only if you can turn over every card before the 4th King is flipped. Since the last King ends the game (there are no more face-down cards in the center pile), you need all other piles to be complete first.",
  },
  {
    question: "What is the win rate for Clock Solitaire?",
    answer:
      "Clock Solitaire has a very low win rate of exactly 1 in 13 (approximately 7.7%). The outcome is entirely determined by the initial deal — there are no decisions to make. This makes each win feel special and exciting.",
  },
  {
    question: "Is Clock Solitaire a game of skill or luck?",
    answer:
      "Clock Solitaire is entirely luck-based. Once the cards are dealt, the outcome is predetermined — there are no choices or decisions to make. The game plays itself automatically, with each step revealing the next card. This makes it a relaxing game to watch unfold.",
  },
  {
    question: "How is Clock Solitaire different from FreeCell?",
    answer:
      "Clock Solitaire and FreeCell are very different games. FreeCell is a strategy game where nearly every deal is winnable with the right moves (~99% win rate). Clock Solitaire has no decisions — the game plays itself with only ~7.7% of deals being winnable. FreeCell requires planning, while Clock Patience is a relaxing game of pure chance.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Clock Solitaire",
    description:
      "Free online Clock Solitaire (Clock Patience). Deal cards into a clock face and flip them to matching rank positions.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/clock"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.3",
      ratingCount: "1678",
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
        name: "Clock Solitaire",
        item: absoluteUrl("/clock"),
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
      <ClockGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Clock Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Clock Solitaire (also known as <strong>Clock Patience</strong>) is one of the
          most well-known patience card games in the world. Fifty-two cards are dealt
          face-down into a clock face pattern — 12 piles around the outside and 1 pile
          in the center. Flip a card, place it under the matching pile, and watch the
          clock come alive. With a win rate of exactly 1 in 13 (~7.7%), every victory
          is a celebration.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Clock Patience Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 52 cards face-down into 13 piles of 4 cards each. Arrange 12 piles in a
          clock face (Ace at 1 o&apos;clock through Queen at 12 o&apos;clock) with Kings in the center.
          Start by flipping the top card from the center pile. Place it face-up under the
          pile matching its rank — then flip the top face-down card from that pile.
          Continue until all cards are face-up (you win!) or the 4th King is turned
          (game over).
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          A Game of Pure Chance
        </h3>
        <p className="mb-4 leading-relaxed">
          Unlike{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>
          , Clock Solitaire involves no decisions whatsoever. The outcome is entirely
          determined by the shuffle. This makes it a wonderfully relaxing game to watch
          unfold — tap to advance each step or use auto-play to let the clock tick on
          its own.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Clock Patience, sometimes just called <strong>Clock</strong>, appears in
          Victorian-era patience compilations alongside the other &ldquo;deal and
          flip&rdquo; pure-luck games of the period. Its charm has always been the
          layout: twelve piles arranged in the hours of a clock face, with a
          thirteenth pile in the centre holding the Kings, turn the card table into a
          working clock. You do not plan, you do not choose — you simply turn the
          next card and watch the time assemble itself around you. This has made
          Clock a staple of grandmother-and-grandchild card sessions for over a
          century. It is frequently the first patience children learn because the
          rules fit on a napkin and the iconography — twelve numbered hours, four
          Kings as quarter-hour chimes — makes it a painless way to teach card
          values, suit recognition, and rank ordering. Many regional patience books
          also list Clock as a fortune-telling exercise: finish the clock and your
          wish comes true; fail, and try again tomorrow. The game&rsquo;s persistence
          owes less to depth than to its irresistible visual rhythm.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          The strategic discussion for Clock Solitaire is refreshingly brief: there
          is no strategy. Once the shuffle is complete the outcome is fully
          determined, and every flip is dictated by the algorithm. Our only role is
          to execute the placement rules faithfully — turn the centre pile&rsquo;s
          top card, walk it to its hour position, tuck it beneath the pile, then
          turn that pile&rsquo;s top card. Players sometimes fool themselves into
          thinking there is a choice when two piles have the same top card, but the
          rules give no flexibility: the card goes to its rank position and you flip
          whatever sits on top.
        </p>
        <p className="mb-4 leading-relaxed">
          That said, Clock Patience earns its place in the family as a{" "}
          <strong>pedagogical tool</strong>. It is the game we reach for when a
          child is learning card values, because the payoff for correctly
          identifying a 7 is immediate: the 7 goes to the 7 o&rsquo;clock pile. It
          also teaches rank-suit separation (suits are irrelevant, rank is
          everything) and the odd concept of the King as a clock&rsquo;s centre
          rather than a position on the dial. For adults, the &ldquo;strategy&rdquo;
          becomes meta — we play Clock while talking to someone, while waiting for
          water to boil, while letting our hands keep rhythm during a podcast. It is
          a game of tempo and ritual rather than thought.
        </p>
        <p className="mb-4 leading-relaxed">
          The one hidden skill, if you can call it that, is <strong>pacing</strong>.
          Dealing faster does not change the outcome but does change the experience;
          slowing down turns Clock into a meditative routine, while speeding up
          creates the suspense of a near-miss. Compare this to{" "}
          <Link
            href="/"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell
          </Link>
          , where every move is a decision — Clock is the opposite pole of the
          solitaire universe.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Clock Solitaire has a mathematically fixed win rate of{" "}
          <strong>exactly 1 in 13</strong>, or approximately <strong>7.7%</strong>.
          That figure falls directly out of the game&rsquo;s structure: the game
          ends the moment the fourth King is turned, and by symmetry any of the 52
          cards is equally likely to be the last card turned — so the chance that
          the last card is the fourth King (meaning every other card was revealed
          first) is 1 in 13. Because there are no decisions to make, skill does not
          change the outcome. Good players and new players win at the same rate.
          This is one of the very few popular patience games whose win probability
          can be computed with a one-line argument.
        </p>
        <p className="mb-4 leading-relaxed">
          That honesty matters: many solitaire apps advertise &ldquo;strategy
          tips&rdquo; for Clock, but those tips are illusory. If you win, the shuffle
          handed you the win. If you lose, the shuffle hid the Kings too shallowly.
          Enjoy Clock for its rhythm, not its challenge.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          Because there is no strategy, &ldquo;mistakes&rdquo; in Clock Solitaire
          are procedural rather than tactical. The most common is{" "}
          <strong>placing a card on top of its pile instead of underneath</strong>,
          which breaks the flip sequence because you end up turning the card you
          just placed. The card must always go face-up <em>beneath</em> the existing
          four cards in its hour position. A second procedural mistake is{" "}
          <strong>stopping too early</strong> when a King appears at position
          thirteen: that King goes under the centre pile, you flip the next centre
          card, and play continues — only when the <em>fourth</em> King lands does
          the game end.
        </p>
        <p className="mb-4 leading-relaxed">
          A third mistake, especially with children, is{" "}
          <strong>misreading the clock face positions</strong>: Ace represents 1
          o&rsquo;clock, Jack is 11, Queen is 12, and Kings live in the centre.
          Finally, some players mistakenly <strong>keep playing after all four
          Kings have appeared</strong>, thinking they can continue with the
          remaining face-down cards — the game is over at that point regardless of
          how many face-down cards remain. These are not strategy errors; they are
          simply rule slips that come from the hypnotic rhythm of the deal.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Clock Patience belongs to the <strong>pure-luck family</strong> of
          solitaire games — titles where the player executes a fixed algorithm and
          the shuffle decides the outcome. Its siblings in this family include{" "}
          <strong>Idiot&rsquo;s Delight</strong>, <strong>Monte Carlo</strong> in
          its strictest form, and the deal-flip half of games like{" "}
          <Link
            href="/pyramid"
            className="text-[#D4AF37] hover:underline"
          >
            Pyramid
          </Link>{" "}
          when played without choice. Compared to strategy patiences such as{" "}
          <Link
            href="/"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell
          </Link>
          ,{" "}
          <Link
            href="/klondike"
            className="text-[#D4AF37] hover:underline"
          >
            Klondike
          </Link>
          , or{" "}
          <Link
            href="/spider"
            className="text-[#D4AF37] hover:underline"
          >
            Spider
          </Link>
          , Clock is an anti-strategy game: the joy is watching the clock assemble
          itself, not outsmarting it. Compared to other chance-heavy games like{" "}
          <Link
            href="/cruel"
            className="text-[#D4AF37] hover:underline"
          >
            Cruel
          </Link>
          , Clock has an even smaller decision surface — Cruel at least lets you
          time your redeals.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Several regional variants shift the numbers or break the tie with the
          Kings. <strong>Travellers</strong> uses the same deal-and-flip algorithm
          but changes the stopping rule, sometimes ending the moment a single
          position is complete. <strong>Watch</strong> is an English variant that
          replaces the twelve-hour clock with a different layout but keeps the
          rank-to-position matching. Some household rules allow the player to
          <em> swap</em> two piles at any point during the game, converting Clock
          into a primitive strategy exercise — a house-rule hack that marginally
          raises the win rate but loses the original&rsquo;s pedagogical purity.
          Casinos have occasionally used Clock as a bar game with small wagers on
          whether the clock completes. In digital form, auto-play is the dominant
          modern variant: tap once and watch the clock tick through to its
          conclusion without lifting a finger.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-5" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <p className="font-semibold text-white/90 mb-1" itemProp="name">{item.question}</p>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p className="text-sm leading-7 text-white/60" itemProp="text">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/clock/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Clock Solitaire
            </Link>{" "}
            — Complete rules and history
          </li>
          <li>
            <Link
              href="/clock/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Clock Solitaire Strategy Guide
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
            — A patience game with strategic redeals
          </li>
          <li>
            <Link
              href="/accordion"
              className="text-[#D4AF37] hover:underline"
            >
              Play Accordion Solitaire
            </Link>{" "}
            — Compress-the-row patience
          </li>
          <li>
            <Link
              href="/"
              className="text-[#D4AF37] hover:underline"
            >
              Play FreeCell
            </Link>{" "}
            — The classic strategic solitaire
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
        <MoreGames currentSlug="clock" />
      </article>
    </>
  );
}
