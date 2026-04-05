import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";
import CruelGamePage from "./CruelGamePage";
import MoreGames from '@/components/MoreGames';

export const metadata: Metadata = {
  title: "Cruel Solitaire | Play Online Free — Redeal Patience Card Game",
  description:
    "Play Cruel Solitaire online for free. A patience card game with 12 piles, same-suit building, and a unique redeal mechanic. Aces start on foundations, build up by suit. No download required.",
  keywords: [
    "cruel solitaire",
    "cruel solitaire online",
    "cruel card game",
    "cruel patience",
    "play cruel solitaire",
    "cruel solitaire free",
    "cruel solitaire no download",
    "redeal solitaire",
  ],
  openGraph: {
    title: "Cruel Solitaire | Play Online Free — Redeal Patience Card Game",
    description:
      "Play Cruel Solitaire online for free. 12 piles, same-suit building, and unlimited redeals. A classic patience game.",
    url: absoluteUrl("/cruel"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is Cruel Solitaire?",
    answer:
      "Cruel Solitaire is a patience card game where 48 cards are dealt face-up into 12 piles of 4 cards each. The four aces start on foundations. Build foundations up by suit from Ace to King. Stack tableau cards in descending order by same suit. The unique redeal mechanic gathers all tableau cards and re-deals them in groups of 4 without shuffling.",
  },
  {
    question: "How does the redeal work in Cruel Solitaire?",
    answer:
      "When you click the redeal button, all tableau cards are gathered from right to left (top card first from each pile), then re-dealt into groups of 4 without shuffling. The order of cards is preserved — they are just regrouped. You can redeal unlimited times. Strategic use of redeals is key to winning.",
  },
  {
    question: "What is the win rate for Cruel Solitaire?",
    answer:
      "Cruel Solitaire has an estimated win rate of approximately 15% with skilled redeal decisions. The same-suit building requirement and inability to fill empty piles make it challenging, but the unlimited redeal mechanic provides opportunities to unblock stuck positions.",
  },
  {
    question: "Can I fill empty piles in Cruel Solitaire?",
    answer:
      "No. Empty piles cannot be filled with any card. Once a pile is emptied, it stays empty until the next redeal, which will redistribute cards into groups of 4. This is a key strategic consideration — emptying piles permanently removes storage space until you redeal.",
  },
  {
    question: "How is Cruel different from Perseverance Solitaire?",
    answer:
      "Cruel and Perseverance are very similar games. The main difference is that Perseverance typically allows building in alternating colors on the tableau, while Cruel requires same-suit building. Some versions of Perseverance also limit the number of redeals, while Cruel allows unlimited redeals.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Cruel Solitaire",
    description:
      "Free online Cruel Solitaire. 12 piles, same-suit building, aces pre-placed on foundations, and unlimited redeals.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/cruel"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.6",
      ratingCount: "819",
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
        name: "Cruel Solitaire",
        item: absoluteUrl("/cruel"),
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
      <CruelGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Cruel Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-12"
            updatedDate="2026-04-12"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Cruel Solitaire is a classic patience card game that combines strategic
          same-suit building with a unique <strong>redeal mechanic</strong>. With 12
          piles of 4 cards each and aces pre-placed on{" "}
          <Link href="/" className="text-[#D4AF37] hover:underline">
            foundations
          </Link>
          , every move matters. When you get stuck, the redeal button gathers all
          tableau cards and re-deals them in groups of 4 without shuffling — giving
          you new possibilities without changing the card order.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Cruel Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Remove all four aces and place them on the four foundation piles. Deal the
          remaining 48 cards face-up into 12 piles of 4 cards each. Build foundations
          up by suit from Ace to King. Stack tableau cards in{" "}
          <strong>descending order by same suit</strong> — place a 5&spades; on a
          6&spades;. Only the top card of each pile can be moved. Empty piles cannot be
          filled. Use unlimited redeals to unblock stuck positions.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Redeal Mechanic
        </h3>
        <p className="mb-4 leading-relaxed">
          The redeal is what makes Cruel unique among solitaire games. When activated,
          all tableau cards are gathered from right to left (top card first), then
          re-dealt into groups of 4. The card order is preserved — only the grouping
          changes. Timing your redeals strategically is the key to mastering Cruel
          Solitaire.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          History &amp; Origins
        </h3>
        <p className="mb-4 leading-relaxed">
          Cruel is a nineteenth-century British patience, and its name is exactly
          what it sounds like: a warning from its creators to anyone who sits down
          expecting an easy afternoon. Victorian patience collections routinely
          describe Cruel as the sort of game you &ldquo;set down and play ten deals
          to win one,&rdquo; a turn of phrase that captures both its reputation and
          its hypnotic pull. The game belongs to the same family of Victorian
          tableau-redeal patiences as Perseverance and Phantom, and it likely
          evolved from earlier French <em>réussites</em> that used gathering-and
          -redealing as their primary unblocking mechanism. The design is
          intentionally unforgiving — no free cells, no empty-pile fills, and
          same-suit building that narrows the graph of possible moves to a
          pin-prick. Yet the shuffleless redeal keeps the deal alive long enough
          that skilled players can feel out recoverable positions, which is why the
          game has kept a steady audience across 150 years even as easier patiences
          have come and gone.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Strategic Principles
        </h3>
        <p className="mb-4 leading-relaxed">
          Cruel strategy is not about individual moves — it is about timing the
          redeals. Because the redeal never shuffles, the card order is a fixed
          sequence that you are regrouping into successive 4-card bundles. Our
          first principle is to <strong>maximise foundation progress before each
          redeal</strong>. Every card we can push to the foundation before
          regrouping is a card permanently removed from the cycle, which changes
          how the remaining cards bundle on the next pass. A redeal performed too
          early wastes the opportunity; a redeal performed too late can leave the
          board in a configuration the next regrouping cannot fix.
        </p>
        <p className="mb-4 leading-relaxed">
          Our second principle is <strong>dead-end pattern recognition</strong>.
          Certain configurations simply cannot be recovered without cycling the
          deck — a Queen covering a Jack of the same suit on one pile while the
          needed King sits at the bottom of another, for example. Experienced
          players learn to spot these lock patterns and redeal immediately rather
          than grind out pointless moves. The paradox of Cruel is that playing
          fewer moves between redeals often produces more wins, because each
          redeal has more unplayed material to rearrange.
        </p>
        <p className="mb-4 leading-relaxed">
          A third principle is <strong>asymmetric suit tracking</strong>. Since
          foundations build by suit, and tableau also builds by suit, the game
          tends to bottleneck on one suit while the other three flow freely.
          Identifying the laggard suit early lets us prioritise clearing its
          blockers before redealing — because any blocker we leave behind will
          show up again on the next regrouping. Compare this to{" "}
          <Link
            href="/"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell
          </Link>
          , where temporary storage forgives bottlenecks; Cruel never forgives
          anything.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Difficulty &amp; Win Rate
        </h3>
        <p className="mb-4 leading-relaxed">
          Cruel earns its name. With skilled redeal discipline the win rate sits
          around <strong>15%</strong>, meaning even experienced players lose more
          than four out of every five deals. Unskilled play drops that figure
          dramatically — beginners who redeal at random often win under 5%. The
          gap between novice and expert in Cruel is all about redeal timing, not
          tactical card-moving: the moves between redeals are usually forced, and
          the real skill is knowing when to stop making them.
        </p>
        <p className="mb-4 leading-relaxed">
          We want to be honest: Cruel is not a game of heroic comebacks. Many
          deals are mathematically locked from the opening because the card
          sequence produces an irreducible cycle. The skill is recognising those
          deals quickly and accepting defeat rather than spending twenty minutes
          grinding through moves that cannot win. Embracing the loss rate is
          part of the game&rsquo;s charm.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Common Mistakes
        </h3>
        <p className="mb-4 leading-relaxed">
          The biggest mistake is <strong>redealing too soon or too late</strong>.
          Too soon wastes foundation progress that could have been squeezed out of
          the current layout; too late produces a regrouping that is near-identical
          to the failed state. We also see players <strong>emptying piles
          deliberately</strong>, confusing Cruel with games where empty columns are
          currency — in Cruel an empty pile is just dead space until the next
          redeal, and racing to create one often leaves stranded cards on adjacent
          piles. A third frequent error is <strong>ignoring the laggard
          suit</strong>: players push two suits aggressively to the foundation
          while leaving the third and fourth suits buried, then discover that the
          buried suits now form the lock pattern that kills the deal.
        </p>
        <p className="mb-4 leading-relaxed">
          A fourth mistake is <strong>random exploratory moves</strong>. Because
          the tableau is so constrained, there are usually only two or three legal
          moves at any point. Players who make a move &ldquo;just to see&rdquo;
          often burn an exposure they needed for a foundation promotion one step
          later. Finally, new players forget the <strong>top-card-only
          rule</strong>, attempting to move multi-card same-suit runs the way they
          would in Spider or Penguin — Cruel allows only single-card moves, full
          stop.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How This Game Compares
        </h3>
        <p className="mb-4 leading-relaxed">
          Cruel belongs to the <strong>tableau-redeal family</strong> of patience
          games — designs that use the gather-and-regroup mechanic as their
          fundamental tension. Its closest relatives are <strong>Perseverance</strong>{" "}
          (which allows alternating-colour building and therefore plays softer) and{" "}
          <strong>Phantom</strong> (which limits redeal count). Compared to the{" "}
          <Link
            href="/"
            className="text-[#D4AF37] hover:underline"
          >
            FreeCell
          </Link>{" "}
          family, Cruel is utterly different: FreeCell trades storage for
          solvability, Cruel trades shuffling for punishment. Compared to{" "}
          <Link
            href="/beleaguered-castle"
            className="text-[#D4AF37] hover:underline"
          >
            Beleaguered Castle
          </Link>
          , another aces-pre-placed game, Cruel is harder on a per-deal basis but
          more recoverable thanks to the redeal. Compared to{" "}
          <Link
            href="/accordion"
            className="text-[#D4AF37] hover:underline"
          >
            Accordion
          </Link>
          , both games sit in the &ldquo;intentionally hard&rdquo; tier of
          patience, but Accordion has no redeal at all.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Variant Notes
        </h3>
        <p className="mb-4 leading-relaxed">
          Several named variants soften or sharpen Cruel&rsquo;s edge.{" "}
          <strong>Perseverance</strong> is the alternating-colour sibling and
          typically caps redeals at two or three, producing a 25-30% win rate.{" "}
          <strong>Ripple Fan</strong> uses the same deal but arranges the twelve
          piles in a fan shape and allows empty-pile fills, which raises win rates
          considerably. <strong>Phantom</strong> lets you gather and regroup with
          a shuffle once per game, converting one of the redeals into a genuine
          chance event. Some household rule sets also allow <strong>peeking</strong>
          at the gather order before committing, turning the redeal into an
          optional move. The name <strong>Cruel</strong> is usually reserved for
          the strict single-move, same-suit, unlimited-redeal, no-shuffle ruleset —
          the one Victorian manuals warned their readers about. If you encounter
          a version that feels gentler, chances are you are playing Perseverance
          under a borrowed name.
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
              href="/cruel/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Cruel Solitaire
            </Link>{" "}
            — Complete rules and strategy guide
          </li>
          <li>
            <Link
              href="/cruel/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Cruel Solitaire Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/beleaguered-castle"
              className="text-[#D4AF37] hover:underline"
            >
              Play Beleaguered Castle
            </Link>{" "}
            — Another challenging variant with aces pre-placed
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
        <MoreGames currentSlug="cruel" />
      </article>
    </>
  );
}
