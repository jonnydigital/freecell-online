import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Bristol Solitaire Tips & Tricks | Master the Fan Layout",
  description:
    "Master Bristol Solitaire — manage fans and reserves, work around the kings restriction, plan 3-card stock deals, and clear all 52 cards.",
  keywords: [
    "bristol solitaire tips",
    "bristol solitaire strategy",
    "bristol solitaire tricks",
    "bristol solitaire tips and tricks",
    "how to win bristol solitaire",
    "bristol solitaire help",
    "bristol card game tips",
    "bristol solitaire winning tips",
    "bristol solitaire advice",
    "tips for bristol solitaire",
    "bristol solitaire guide",
    "bristol solitaire fan layout",
  ],
  openGraph: {
    title: "Bristol Solitaire Tips & Tricks | Master the Fan Layout",
    description:
      "Practical tips for mastering Bristol Solitaire. Learn to manage fans and reserves, avoid the kings trap, plan stock deals, and build regardless of suit to clear all 52 cards to the foundations.",
    url: absoluteUrl("/bristol/tips"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const faqs = [
  {
    question: "What is the most important tip for Bristol Solitaire?",
    answer:
      "Manage your reserve piles carefully. Since the stock deals 3 cards face-up across 3 reserve piles, each deal can either open up new moves or bury critical cards. Think before dealing from the stock, and always check whether you can make productive moves with your current tableau and reserve cards before adding more.",
  },
  {
    question: "Why can't Kings go into empty fans in Bristol Solitaire?",
    answer:
      "Unlike most solitaire games where Kings can fill empty spaces, Bristol Solitaire explicitly forbids placing Kings in empty fans. This is one of the game's defining restrictions. It means empty fans are essentially dead space — they can't be reused. Avoid emptying fans unless you're sure the remaining cards can be played to foundations directly.",
  },
  {
    question: "How does building regardless of suit help in Bristol Solitaire?",
    answer:
      "Bristol Solitaire allows you to stack any card on top of a card one rank higher, regardless of suit or color. This is much more flexible than alternating-color rules in games like Klondike or FreeCell. It means any 7 can go on any 8, any Jack on any Queen, and so on. Use this flexibility to uncover buried cards and create movement across fans.",
  },
  {
    question: "What happens when the stock runs out in Bristol Solitaire?",
    answer:
      "Once all 28 stock cards have been dealt (3 at a time across the 3 reserve piles, with the last deal placing 1 card on one pile), you cannot redeal. The remaining moves must come from the tableau fans and whatever remains in the reserve piles. This is often where games are won or lost — plan ahead so you're not stuck with immovable reserve cards.",
  },
  {
    question: "How many deals does Bristol Solitaire have from the stock?",
    answer:
      "The stock contains 28 cards (52 minus the 24 dealt to the 8 fans). Dealing 3 at a time means roughly 9 deals, with the last deal distributing the remaining 1 card. Each deal places one card on each of the 3 reserve piles, so you need to think about what gets buried on each pile with every deal.",
  },
  {
    question: "Is Bristol Solitaire easier or harder than FreeCell?",
    answer:
      "Bristol Solitaire has a lower win rate than FreeCell. While FreeCell is solvable in roughly 99% of deals, Bristol is estimated to be winnable in around 5–10% of deals. The kings restriction, limited reserve storage, and no-redeal rule make it significantly more challenging. However, the any-suit building rule gives you more flexibility in the tableau than many other solitaire variants.",
  },
  {
    question: "Should I empty fans in Bristol Solitaire?",
    answer:
      "Generally no. Since Kings cannot be placed in empty fans, an empty fan becomes dead space that you can never reuse. Focus on keeping fans short rather than empty. The exception is when emptying a fan is the only way to access a critical card needed for a foundation or to unblock a chain of moves that wins the game.",
  },
];

export default function BristolTipsPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Bristol Solitaire", item: absoluteUrl("/bristol") },
          { "@type": "ListItem", position: 3, name: "Tips & Tricks", item: absoluteUrl("/bristol/tips") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Bristol Solitaire Tips & Tricks",
        description: "Practical tips for mastering Bristol Solitaire's fan layout, reserve management, and stock dealing strategy.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-26",
        dateModified: "2026-03-26",
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />

      <ContentHero
        title="Bristol Solitaire Tips & Tricks"
        kicker={<><Link href="/bristol" className="hover:text-white transition-colors">Bristol Solitaire</Link> / Tips</>}
        subtitle="Master the 8-fan layout with smart reserve management, strategic stock deals, and the any-suit building rule — from avoiding the kings trap to clearing all 52 cards to the foundations."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Bristol Solitaire", href: "/bristol" }]}
      />

      {/* Quick Summary */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          The 5-Second Summary
        </h2>
        <p className="text-white/70 leading-relaxed">
          If you only remember one thing: <strong className="text-white">manage your reserve piles carefully</strong>.
          Bristol Solitaire&apos;s stock deals 3 cards at a time across 3 reserve piles, and only the top card
          of each pile is accessible. Every stock deal can bury useful cards or open up new possibilities.
          Think before you deal, play what you can from the tableau first, and always keep an eye on
          what&apos;s sitting on top of each reserve pile. Smart reserve management is the difference
          between clearing the foundations and getting stuck.
        </p>
      </div>

      {/* Tip 1 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #1: Prioritize Foundation Moves
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          In{" "}
          <Link href="/bristol" className="text-[var(--gold)] hover:text-white transition-colors">
            Bristol Solitaire
          </Link>
          , your ultimate goal is to move all 52 cards to the four foundations, building each from Ace
          through King by suit. The most important habit you can develop is to always check for foundation
          moves before doing anything else. Aces and 2s should go to the foundations immediately — there
          is never a reason to hold them back.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Moving cards to foundations early has a cascading benefit. Every card sent to a foundation frees
          up space in the tableau or reserves, which in turn exposes cards underneath. An Ace moved to the
          foundation might reveal a 2 of the same suit in the fan below it, which can also go up
          immediately. These small wins compound over the course of a game.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Aces:</strong> Always play to foundations instantly — they
            serve no purpose in the tableau
          </li>
          <li>
            <strong className="text-white/90">2s:</strong> Play immediately once the matching Ace is on
            the foundation
          </li>
          <li>
            <strong className="text-white/90">3s and 4s:</strong> Generally safe to play up early, but
            check if you need them as landing spots in the tableau first
          </li>
        </ul>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before every stock deal, scan all 8 fans and 3 reserve piles for
            any cards that can go to foundations. It&apos;s easy to miss a playable card hiding in a fan
            you haven&apos;t checked recently. Build the habit of a full scan before every deal.
          </p>
        </div>
      </section>

      {/* Tip 2 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #2: Manage Your Reserve Piles Wisely
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The three reserve piles are both your greatest resource and your biggest liability in Bristol
          Solitaire. Each stock deal places one card on each reserve pile, and only the top card of each
          pile is playable. If a critical card gets buried under two or three useless cards, you may never
          reach it again.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The key principle is to keep reserve piles as short as possible. Before dealing from the stock,
          always check whether you can play any of the current reserve top cards to the foundations or
          onto tableau fans. Moving a card off a reserve pile before dealing means the new card lands on
          a shorter pile — or ideally an empty one — giving you maximum flexibility.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Think of each reserve pile as a stack with limited capacity. The more cards piled on it, the
          more trapped cards you accumulate. A reserve pile with 5 or 6 cards is a significant problem
          because you&apos;d need to play off each one sequentially to access the buried cards.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Play reserve cards first:</strong> Always try to move
            reserve top cards before dealing new stock cards
          </li>
          <li>
            <strong className="text-white/90">Empty reserves are gold:</strong> An empty reserve pile
            means the next stock deal gives you a fresh, accessible card
          </li>
          <li>
            <strong className="text-white/90">Track what&apos;s buried:</strong> Mentally note which
            cards are trapped deep in reserves so you know what&apos;s unreachable
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> If you can empty even one reserve pile before your next stock
            deal, you effectively gain a free card — the dealt card lands on an empty pile and is
            immediately accessible, rather than burying something useful underneath.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 3 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #3: Avoid the Kings Trap
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Bristol Solitaire has a unique and punishing rule: Kings cannot be placed in empty fans. In
          most solitaire games, Kings are the natural choice for filling empty columns, but in Bristol,
          empty fans are dead space that cannot be reused once cleared. This single rule changes the
          entire strategy of the game.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The practical implication is that you should avoid emptying fans unless you&apos;re certain the
          remaining cards can be played directly to foundations or onto other fans. An empty fan might feel
          like progress, but it&apos;s actually a permanent loss of tableau capacity. You started with 8
          fans — every empty one reduces your working space with no way to recover it.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Kings themselves become tricky to manage. A King sitting on top of a fan blocks that fan from
          being emptied productively. The only way to remove a King from the tableau is to play it to the
          foundation once the Queen of the same suit is already there. Plan your foundation building with
          Kings in mind.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Keep track of where all four Kings are at all times. A King buried
            deep in a fan is a problem you need to solve — the cards above it need to be moved elsewhere
            before the fan can make progress. A King on top of a reserve pile blocks that pile too. Plan
            your moves to funnel Kings toward their foundations as quickly as possible.
          </p>
        </div>
      </section>

      {/* Tip 4 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #4: Plan Your Stock Deals
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          The stock in Bristol Solitaire deals 3 cards at a time — one to each of the 3 reserve piles.
          With 28 cards in the stock, you get roughly 9 dealing rounds. Each deal is irreversible and
          changes the state of all three reserve piles simultaneously. This makes every stock deal a
          significant strategic decision.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Before dealing, ask yourself: &ldquo;Have I made every possible move with the current
          layout?&rdquo; Check all 8 fan tops and all 3 reserve tops for foundation plays, tableau moves,
          and reserve-to-tableau transfers. Only deal from the stock when you&apos;ve genuinely exhausted
          all productive moves.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Exhaust moves first:</strong> Never deal from stock when
            there are still productive moves available
          </li>
          <li>
            <strong className="text-white/90">Watch reserve heights:</strong> Dealing onto tall reserve
            piles is dangerous — try to shorten them first
          </li>
          <li>
            <strong className="text-white/90">Remember there&apos;s no redeal:</strong> Once the stock
            is empty, those 28 cards are locked into the reserves permanently
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> The stock is your lifeline and your time limit. Each deal adds
            new cards to work with, but also buries existing reserve cards deeper. Treat every deal like
            spending a limited resource — because that&apos;s exactly what it is. You only get about 9
            chances to add new cards to the game.
          </p>
        </div>
      </section>

      {/* Tip 5 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #5: Build Down Regardless of Suit
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          One of Bristol Solitaire&apos;s most generous rules is that tableau building ignores suit
          entirely. You can place any card on any card of the next higher rank — a 7 of Hearts on an 8
          of Spades, a Jack of Clubs on a Queen of Diamonds, anything goes. This is far more flexible
          than the alternating-color rules found in{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          .
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Use this flexibility aggressively. When you need to uncover a buried card in a fan, you have
          four possible landing spots for the blocking card (any card of the next higher rank, in any
          suit), not just two. This dramatically increases your options for rearranging the tableau.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          However, remember that only one card moves at a time — you cannot move stacks or sequences.
          Even if you&apos;ve built a beautiful descending sequence on a fan, you&apos;ll need to
          disassemble it card by card to move those cards elsewhere. Build sequences intentionally,
          knowing you&apos;ll play them to foundations in order.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> When choosing where to place a card, prefer fans that already have
            a natural descending sequence you plan to send to the foundations. Stacking a 5 on a 6 that&apos;s
            already on a 7 means you can play them up in order (5, 6, 7) when the foundation reaches 4.
            This is much more efficient than scattering cards across multiple fans.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Tip 6 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #6: Keep Fans Short
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Each fan in Bristol Solitaire starts with just 3 cards, making them relatively shallow compared
          to columns in games like{" "}
          <Link href="/" className="text-[var(--gold)] hover:text-white transition-colors">
            FreeCell
          </Link>{" "}
          or{" "}
          <Link href="/klondike" className="text-[var(--gold)] hover:text-white transition-colors">
            Klondike
          </Link>
          . But as you stack cards during play, fans can grow much taller. A fan with 6 or 7 cards means
          5 or 6 buried cards you can&apos;t access — a serious problem.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The ideal strategy is to distribute cards evenly across fans rather than piling everything onto
          one or two tall columns. When you have a choice of where to place a card, pick the shorter fan.
          This keeps more card tops exposed and gives you more options on every turn.
        </p>
        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4 ml-4">
          <li>
            <strong className="text-white/90">Short fans = more options:</strong> With 8 fans each
            having 1–2 cards, you have 8 different card tops to work with
          </li>
          <li>
            <strong className="text-white/90">Tall fans = trapped cards:</strong> A fan with 5+ cards
            means most of its contents are unreachable
          </li>
          <li>
            <strong className="text-white/90">But don&apos;t empty fans:</strong> Remember the Kings
            rule — a fan with 1 card is ideal, but an empty fan is useless
          </li>
        </ul>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Think of fan height as a measure of how much information is
            hidden from you. Every buried card is a variable you can&apos;t control. The shallower your
            fans, the more complete your picture of the game state and the better your decisions will be.
          </p>
        </div>
      </section>

      {/* Tip 7 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #7: Watch for Dead Ends
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          A dead end in Bristol Solitaire occurs when you have no legal moves and the stock is empty.
          At this point the game is over — there&apos;s no redeal, no free cells, no special mechanics
          to bail you out. Recognizing when you&apos;re heading toward a dead end (before you actually
          reach it) is a critical skill.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          The most common dead-end scenario involves reserve piles. If all three reserves have tall stacks
          with unmovable top cards, and the tableau fans are also blocked, the game grinds to a halt. This
          usually happens because too many stock deals were made without clearing reserve cards in between.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Another warning sign is when multiple fans are topped by Kings. Since Kings can&apos;t be placed
          in empty fans and can only go to foundations, a King-heavy tableau with low foundation progress
          is often a losing position. Watch for these patterns and consider restarting early rather than
          playing out a doomed game.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Pro tip:</strong> Before making a move, count your &ldquo;outs&rdquo; — the number
            of distinct moves you&apos;ll have available after this action. If a move reduces your outs
            from 4 to 1, think carefully. If it reduces them to 0 (and the stock is empty), don&apos;t
            make that move. Always preserve at least one alternative path.
          </p>
        </div>
      </section>

      {/* Tip 8 */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Tip #8: Use Undo to Explore
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Most digital Bristol Solitaire implementations include an undo button, and you should use it
          liberally. Bristol&apos;s combination of limited information (buried fan cards, unknown stock
          order) and irreversible decisions (stock deals, reserve stacking) makes it a perfect game for
          exploratory play with undo support.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          When you&apos;re unsure whether to deal from the stock or make a particular tableau move, try
          one option and see what happens. If the stock deal buries a critical card or the move creates
          a dead end, undo and try the alternative. This kind of experimentation is how you develop
          intuition for which plays tend to work and which tend to backfire.
        </p>
        <p className="text-white/70 leading-relaxed mb-4">
          Undo is especially valuable for stock deals. Since you can&apos;t see the next three cards in
          the stock, dealing is always a leap of faith. If the deal produces terrible results — say it
          buries an Ace you needed or stacks a King on your most useful reserve pile — undo it, make
          some different tableau moves first, and then deal. The same three cards will appear, but
          they&apos;ll land on different reserve states.
        </p>
        <div className="bg-amber-900/20 border border-amber-500/20 rounded-lg p-4">
          <p className="text-amber-300/80 text-sm">
            <strong>Key insight:</strong> Think of undo as a learning tool, not a cheat. Each time you
            undo and choose a different path, you&apos;re building a mental map of cause and effect in
            Bristol Solitaire. Over time, you&apos;ll start recognizing patterns — like &ldquo;I should
            clear this reserve before dealing&rdquo; — without needing to undo at all.
          </p>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Quick reference cheat sheet */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Reference: Tips Cheat Sheet
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5">
          <ol className="list-decimal list-inside text-white/80 space-y-3 ml-2">
            <li>
              <strong>Foundations first.</strong> Always play Aces and 2s up immediately — scan all fans
              and reserves before every stock deal.
            </li>
            <li>
              <strong>Keep reserves short.</strong> Play reserve top cards before dealing new stock cards
              to avoid burying useful cards.
            </li>
            <li>
              <strong>Kings can&apos;t fill empty fans.</strong> Never empty a fan unless you&apos;re sure
              you won&apos;t need that space.
            </li>
            <li>
              <strong>Think before dealing stock.</strong> Exhaust all productive moves before adding 3
              more cards to the reserves.
            </li>
            <li>
              <strong>Any suit goes.</strong> Use the any-suit building rule to maximize your tableau
              options when uncovering buried cards.
            </li>
            <li>
              <strong>Distribute evenly.</strong> Keep fans short and roughly equal in height for maximum
              flexibility.
            </li>
            <li>
              <strong>Count your outs.</strong> Before making a move, verify you&apos;ll still have
              options afterward.
            </li>
            <li>
              <strong>Undo freely.</strong> Experiment with different move orders and stock timing to find
              the best path forward.
            </li>
          </ol>
        </div>
      </section>

      {/* Related Guides */}
      <div className="max-w-3xl mx-auto">
        <CardSection variant="dark">
          <SectionHeading variant="dark" sub="Continue Learning">Related Guides</SectionHeading>
          <ContentBody variant="dark" className="grid gap-4 md:grid-cols-3">
            <ContentLinkCard href="/bristol/how-to-play" title="How to Play Bristol Solitaire" description="Complete rules, fan layout, and card mechanics explained." />
            <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these tips into practice online for free." />
            <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game." />
          </ContentBody>
        </CardSection>
      </div>

      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Put These Tips Into Practice"
          body="The best way to improve is to play. Apply these tips one at a time and focus on managing your reserves and planning stock deals."
          primaryLabel="Play Bristol Solitaire"
          primaryHref="/bristol"
          secondaryLabel="Learn the Rules"
          secondaryHref="/bristol/how-to-play"
        />
      </div>

      {/* FAQ */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden"
              {...(i === 0 ? { open: true } : {})}
            >
              <summary className="px-5 py-4 cursor-pointer text-white/90 font-semibold hover:text-[var(--gold)] transition-colors list-none flex items-center justify-between">
                {faq.question}
                <span className="text-white/30 group-open:rotate-180 transition-transform ml-2">
                  ▾
                </span>
              </summary>
              <div className="px-5 pb-4 text-white/60 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* More resources */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Bristol Solitaire Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/bristol" title="Play Bristol Solitaire" description="Put these tips into practice online for free" />
          <ContentLinkCard href="/bristol/how-to-play" title="How to Play Bristol Solitaire" description="Complete rules, fan layout, and strategy explained" />
          <ContentLinkCard href="/golf/tips" title="Golf Solitaire Tips" description="Tips and tricks for Golf Solitaire" />
          <ContentLinkCard href="/tips" title="FreeCell Tips" description="Tips and tricks for the classic FreeCell game" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Strategy guide for the classic FreeCell game" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants and find your next game" />
        </div>
      </section>
    </ContentLayout>
  );
}
