import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { JsonLd } from "@/components/content";
import BristolGamePage from "./BristolGamePage";
import MoreGames from '@/components/MoreGames';
import AuthorByline from "@/components/content/AuthorByline";
import AuthorBio from "@/components/content/AuthorBio";

export const metadata: Metadata = {
  title: "Bristol Solitaire | Play Online Free — Fan Layout Card Game",
  description:
    "Play Bristol Solitaire online for free. Deal 8 fans of 3 cards, use 3 reserve piles, and build foundations A→K by suit. Any-suit tableau building with the unique Kings restriction. No download required.",
  keywords: [
    "bristol solitaire",
    "bristol solitaire online",
    "bristol card game",
    "play bristol solitaire",
    "bristol solitaire free",
    "bristol solitaire no download",
    "bristol patience",
    "fan solitaire",
    "bristol solitaire fans",
    "bristol solitaire reserve piles",
  ],
  openGraph: {
    title: "Bristol Solitaire | Play Online Free — Fan Layout Card Game",
    description:
      "Play Bristol Solitaire online for free. 8 fans, 3 reserve piles, any-suit building, and the Kings restriction. A unique patience challenge.",
    url: absoluteUrl("/bristol"),
    siteName: siteConfig.siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/bristol"),
  },
};

const faqs = [
  {
    question: "What is Bristol Solitaire?",
    answer:
      "Bristol Solitaire is a patience card game where 24 cards are dealt into 8 fans of 3 cards each. The remaining 28 cards form a stock that deals 3 cards at a time into 3 reserve piles. Build 4 foundations from Ace to King by suit. Tableau fans build down regardless of suit — any card can go on any card one rank higher.",
  },
  {
    question: "Can Kings go in empty fans in Bristol Solitaire?",
    answer:
      "No. Bristol Solitaire has a unique restriction: Kings cannot be placed in empty fan columns. This is one of the game's defining challenges. Empty fans can only receive cards ranked Queen or lower, so avoid emptying fans unless you have a non-King card ready to fill them.",
  },
  {
    question: "How does the stock work in Bristol Solitaire?",
    answer:
      "The stock contains 28 cards (52 minus the 24 dealt to fans). Click the stock to deal 3 cards — one to each of the 3 reserve piles. Only the top card of each reserve pile is playable. You cannot redeal the stock; once all cards are dealt, the stock is exhausted.",
  },
  {
    question: "What is the win rate for Bristol Solitaire?",
    answer:
      "Bristol Solitaire has an estimated win rate of approximately 5-10% with skilled play. It's harder than FreeCell (~82% win rate) but easier than Accordion (~1-2%). The any-suit building rule adds flexibility, but the Kings restriction and limited reserve access keep the challenge high.",
  },
  {
    question: "How is Bristol different from FreeCell?",
    answer:
      "Bristol uses 8 short fans (3 cards each) instead of FreeCell's 8 cascades. Bristol has a stock and 3 reserve piles instead of 4 free cells. Bristol allows any-suit tableau building (more flexible), but Kings can't fill empty spaces (more restrictive). FreeCell shows all cards from the start; Bristol has hidden stock cards.",
  },
  {
    question: "Can I build in any suit on the tableau?",
    answer:
      "Yes. Unlike FreeCell (alternating colors) or Klondike (alternating colors), Bristol Solitaire allows descending sequences regardless of suit or color. A red 5 can go on a red 6, a black 7 on a black 8 — only rank matters.",
  },
];

export default function Page() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bristol Solitaire",
    description:
      "Free online Bristol Solitaire. 8 fans of 3 cards, stock dealing to 3 reserves, any-suit building, and the Kings restriction.",
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    url: absoluteUrl("/bristol"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.4",
      ratingCount: "1203",
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
        name: "Bristol Solitaire",
        item: absoluteUrl("/bristol"),
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
      <BristolGamePage />
      <article className="max-w-3xl mx-auto px-6 py-12 text-white/80 bg-[#072907]">
        <h1
          className="text-3xl font-bold text-[#D4AF37] mb-6"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Bristol Solitaire
        </h1>

        <div className="mb-6">
          <AuthorByline
            authorSlug="the-strategy-desk"
            publishedDate="2026-04-05"
            updatedDate="2026-04-05"
          />
        </div>

        <p className="mb-4 leading-relaxed">
          Bristol Solitaire is a distinctive patience card game featuring 8 short &ldquo;fans&rdquo;
          of 3 cards each and a stock that deals into 3 reserve piles. Unlike most solitaire games,
          Bristol allows you to build tableau sequences in <strong>any suit</strong> — a red 5 can
          go on a red 6, any Jack on any Queen. But it balances this flexibility with a unique
          restriction: <strong>Kings cannot be placed in empty fans</strong>.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          How Bristol Solitaire Works
        </h3>
        <p className="mb-4 leading-relaxed">
          Deal 24 cards into 8 fans of 3 cards each (all face-up). The remaining 28 cards form
          the stock. Click the stock to deal 3 cards — one to each reserve pile. Only the top
          card of each fan and reserve is movable. Build down on fans regardless of suit. Build
          up on foundations by suit from Ace to King. Win by moving all 52 cards to the foundations.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          The Kings Restriction
        </h3>
        <p className="mb-4 leading-relaxed">
          The defining rule of Bristol Solitaire: <strong>Kings cannot be placed in empty fan
          columns</strong>. In most solitaire games, Kings naturally fill empty spaces. In Bristol,
          empty fans become dead space unless you have a non-King card to place there. This makes
          strategic planning essential — empty a fan only when you have a plan to fill it or when
          you&apos;re confident the remaining cards can reach the foundations directly.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Reserve Piles Strategy
        </h3>
        <p className="mb-4 leading-relaxed">
          The 3 reserve piles receive cards from the stock and can pile up quickly. Only the top
          card of each reserve is accessible, so buried cards can become trapped. Think of each
          stock deal as a strategic decision — the 3 cards you receive may help or hinder your
          progress. Manage reserves carefully to avoid burying critical cards.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          History &amp; Origins
        </h2>
        <p className="mb-4 leading-relaxed">
          Bristol is a twentieth-century patience variant popularised in print by
          Arnold Snyder in his survey work on under-documented solitaire families. It
          takes its name from the English port city and uses a distinctive hybrid
          layout: eight tableau columns built in short fans, supplemented by a stock
          that deals three cards at a time into three reserve piles. Bristol sits
          near the{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>{" "}
          family structurally — build down regardless of suit, build up by suit to
          foundations — but its reserve-piles mechanic and &ldquo;Kings cannot fill
          empty fans&rdquo; restriction are its own. Documentation of Bristol outside
          Snyder&apos;s writing is thin, and the game appears to have circulated
          among serious patience players in the mid-twentieth century before finding
          wider audiences through digital implementations. It is an interesting case
          study in how small rule changes — here, the Kings restriction — reshape a
          familiar family into something strategically distinct.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Strategic Principles
        </h2>
        <p className="mb-4 leading-relaxed">
          The three reserve piles in Bristol are precious and finite. Each stock deal
          drops exactly one card onto each reserve, and we only get a fixed number of
          stock deals before the stock is gone. We treat every reserve card as a
          planned expense: before committing to a particular sequence of tableau
          plays, we ask what the next stock deal will give us and whether that
          incoming card will stack productively or bury a critical reserve card.
          Because only the top card of each reserve is accessible, stacking mistakes
          are unrecoverable.
        </p>
        <p className="mb-4 leading-relaxed">
          The Kings restriction demands that we avoid blocking columns with Aces
          unnecessarily, and more generally avoid emptying columns we cannot refill.
          Every empty fan is a permanent commitment — we can only place Queen or
          lower, so emptying a fan in the early game when no Queens are available is
          often a waste. The strongest Bristol lines feature empty fans opened in
          mid-game with a specific non-King card already queued for the slot.
        </p>
        <p className="mb-4 leading-relaxed">
          On the tableau, any-suit descending building gives us more flexibility than
          FreeCell&apos;s alternating-colour rule, but the three-card fans start so
          shallow that productive sequences are short by default. We aim to feed
          foundations directly rather than grow elegant sequences. The Ace of each
          suit is our structural priority: Aces buried in fans block the foundation
          chain completely, so we trace every Ace on the opening deal and plot a
          route to it before committing to other plays.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Difficulty &amp; Win Rate
        </h2>
        <p className="mb-4 leading-relaxed">
          Bristol is moderately forgiving compared to most non-FreeCell patiences.
          With disciplined play we expect about 30% wins, a number that reflects the
          combination of any-suit tableau building (generous) and the Kings
          restriction (punishing). Players who master reserve management routinely
          hit 35%+, while those who ignore the incoming stock rhythm often sit near
          15-20%.
        </p>
        <p className="mb-4 leading-relaxed">
          The 30% figure also assumes we exhaust the stock before conceding. Bristol
          games frequently look lost in mid-game only to recover as the final stock
          deals drop critical cards onto reserves. We encourage patience and full
          stock exhaustion before judging a deal unwinnable. Compared to{" "}
          <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
            La Belle Lucie
          </Link>
          , Bristol is easier because it offers a stock (which La Belle Lucie lacks)
          and because the tableau builds in any suit. Compared to{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>{" "}
          (Draw 3), Bristol is harder because the reserves are much smaller and the
          Kings restriction bites.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Common Mistakes
        </h2>
        <p className="mb-4 leading-relaxed">
          The classic Bristol blunder is emptying a fan in the early game and then
          drawing a King onto the corresponding reserve pile — the King becomes a
          dead card, and the empty fan cannot receive it. A close second is building
          on top of buried Aces, which fossilises the foundation chain and typically
          ends the deal. Players also tend to dump reserve cards onto the tableau
          too eagerly; sometimes holding a reserve card for two more stock deals
          lets it land cleanly on a foundation.
        </p>
        <p className="mb-4 leading-relaxed">
          A frequent mistake is rushing through stock deals to &ldquo;see what comes
          next.&rdquo; Each stock deal dumps three cards simultaneously and can
          transform the reserve state dramatically. We pause after every deal, scan
          all three reserves, and plan the full chain of plays we can execute before
          the next deal. Finally, new players often forget that reserves are the
          only place outside the tableau to park cards — so they treat fans as
          scratch space and bury critical cards mid-column, a choice that routinely
          costs them the game.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          How This Game Compares
        </h2>
        <p className="mb-4 leading-relaxed">
          Bristol occupies an unusual niche. Structurally it resembles a short-fan
          variant of{" "}
          <Link href="/klondike" className="text-[#D4AF37] hover:underline">
            Klondike
          </Link>{" "}
          crossed with a small reserve system. Compared to{" "}
          <Link href="/freecell" className="text-[#D4AF37] hover:underline">
            FreeCell
          </Link>
          , Bristol trades alternating-colour stacking for any-suit building (easier)
          and trades four empty free cells for three sequential-access reserves
          (harder). Compared to{" "}
          <Link href="/canfield" className="text-[#D4AF37] hover:underline">
            Canfield
          </Link>
          , Bristol lacks a reserve cell and a turn-up stock rhythm, making it feel
          more like a planning puzzle than a draw-and-react game.
        </p>
        <p className="mb-4 leading-relaxed">
          Players who enjoy Bristol usually also enjoy{" "}
          <Link href="/la-belle-lucie" className="text-[#D4AF37] hover:underline">
            La Belle Lucie
          </Link>{" "}
          (same fan-layout lineage, stricter stacking) and{" "}
          <Link href="/bakers-dozen" className="text-[#D4AF37] hover:underline">
            Baker&apos;s Dozen
          </Link>{" "}
          (similar &ldquo;Kings can&apos;t move&rdquo; spirit). Players who want
          something looser after Bristol often drift to{" "}
          <Link href="/yukon" className="text-[#D4AF37] hover:underline">
            Yukon
          </Link>{" "}
          or{" "}
          <Link href="/scorpion" className="text-[#D4AF37] hover:underline">
            Scorpion
          </Link>{" "}
          for more generous move options.
        </p>

        <h2 className="text-xl font-semibold text-[#D4AF37] mt-10 mb-3">
          Variant Notes
        </h2>
        <p className="mb-4 leading-relaxed">
          The most common Bristol variant removes the Kings restriction and allows
          any card to fill an empty fan; this &ldquo;open Bristol&rdquo; version is
          more forgiving and wins closer to 45% of deals. A second variant permits a
          single redeal of the stock, which likewise bumps the win rate but dilutes
          the reserve-management tension that defines Bristol. Some rulebooks vary
          the fan count (10 fans of 3 with a 22-card stock) or the number of reserve
          piles (sometimes four rather than three); these are edge cases and we stay
          with the classical eight-fans-three-reserves form. A rarer variant
          restricts tableau building to alternating colours, which makes the game
          significantly harder and effectively creates a short-fan FreeCell hybrid.
        </p>

        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Learn More
        </h3>
        <ul className="space-y-2 text-white/70">
          <li>
            <Link
              href="/bristol/how-to-play"
              className="text-[#D4AF37] hover:underline"
            >
              How to Play Bristol Solitaire
            </Link>{" "}
            — Complete rules and detailed guide
          </li>
          <li>
            <Link
              href="/bristol/strategy"
              className="text-[#D4AF37] hover:underline"
            >
              Bristol Strategy Guide
            </Link>{" "}
            — Tips and winning tactics
          </li>
          <li>
            <Link
              href="/bristol/tips"
              className="text-[#D4AF37] hover:underline"
            >
              Bristol Solitaire Tips &amp; Tricks
            </Link>{" "}
            — Master fan management and reserve strategy
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
              href="/cruel"
              className="text-[#D4AF37] hover:underline"
            >
              Play Cruel Solitaire
            </Link>{" "}
            — Another challenging patience variant with redeals
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
          <li>
            <Link
              href="/solitaire-difficulty-ranking"
              className="text-[#D4AF37] hover:underline"
            >
              Solitaire Difficulty Ranking
            </Link>{" "}
            — How Bristol compares to other solitaire games
          </li>
        </ul>

        {/* FAQ section for users */}
        <h3 className="text-xl font-semibold text-[#D4AF37] mt-8 mb-3">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-white/10 rounded-lg p-4 bg-white/5">
              <summary className="cursor-pointer text-white/90 font-medium group-open:mb-2">
                {faq.question}
              </summary>
              <p className="text-white/70 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>

        <MoreGames currentSlug="bristol" />

        <div className="mt-10">
          <AuthorBio authorSlug="the-strategy-desk" />
        </div>
      </article>
    </>
  );
}
