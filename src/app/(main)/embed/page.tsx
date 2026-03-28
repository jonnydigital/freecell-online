import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, JsonLd, CtaSection, ContentLinkCard, CardSection, SectionHeading, ContentBody } from "@/components/content";

export const metadata: Metadata = {
  title: "Embed Free FreeCell Solitaire on Your Website | No Cost, No Ads",
  description:
    "Add a free, ad-free, playable FreeCell solitaire game to your website or blog. Copy one line of code — works on WordPress, Squarespace, Wix, HTML, and any platform that supports iframes.",
  keywords: [
    "embed freecell",
    "freecell widget",
    "freecell for website",
    "free solitaire widget",
    "embed solitaire game",
    "freecell iframe",
    "add freecell to website",
    "solitaire embed code",
    "free card game widget",
    "freecell plugin",
    "embed card game",
    "solitaire for blog",
    "free game embed",
    "html solitaire widget",
    "wordpress solitaire game",
  ],
  openGraph: {
    title: "Embed Free FreeCell Solitaire on Your Website",
    description:
      "One line of code. Ad-free. Mobile-friendly. Add a playable FreeCell game to any website in seconds.",
    url: absoluteUrl("/embed"),
    siteName: siteConfig.siteName,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: absoluteUrl("/embed"),
  },
};

const faqs = [
  {
    question: "Is the FreeCell embed really free?",
    answer:
      "Yes — completely free for personal and commercial use. No API keys, no registration, no hidden fees. We only ask that you keep the small attribution link at the bottom of the game, which links back to playfreecellonline.com. The attribution helps us continue offering the embed for free.",
  },
  {
    question: "Does the embedded game show ads?",
    answer:
      "No. The embedded version of FreeCell is ad-free. We intentionally strip ads from the embed so it doesn't interfere with your site's layout, monetization, or user experience. Your visitors get a clean, distraction-free game.",
  },
  {
    question: "Will the embed work on WordPress?",
    answer:
      "Yes. In the WordPress block editor, add a 'Custom HTML' block and paste the iframe code. In the classic editor, switch to the 'Text' tab and paste it there. WordPress.com free plans may restrict iframes — if so, you'll need a Business plan or use WordPress.org (self-hosted).",
  },
  {
    question: "Does the embed work on mobile devices?",
    answer:
      "Yes. The game supports touch controls (tap to auto-move, drag and drop) and scales responsively within the iframe dimensions you set. For the best mobile experience, use a width of 100% and a fixed height of 500-600px.",
  },
  {
    question: "Can I embed other solitaire games besides FreeCell?",
    answer:
      "Currently we offer FreeCell as the primary embed. Spider Solitaire, Klondike, and other variants are being prepared for embedding. Check back or use our embed generator for the latest available games.",
  },
  {
    question: "Will the embed slow down my website?",
    answer:
      "No. The game loads inside an iframe, which means it's sandboxed from your page. It doesn't add any JavaScript, CSS, or fonts to your site. The iframe only loads when it enters the viewport if you add loading='lazy' to the code (included in our generator).",
  },
  {
    question: "Can I customize the size and appearance?",
    answer:
      "Yes. You can set any width and height via the iframe attributes. The game adapts its layout to fit the available space. Use our embed generator tool for a live preview at your desired dimensions. Additional theming options (card backs, felt colors) are on the roadmap.",
  },
  {
    question: "Do I need to give credit or attribution?",
    answer:
      "The game includes a small 'Play FreeCell Online' link at the bottom. We ask that you keep this attribution visible. It helps more people discover the game and keeps the embed sustainable as a free offering. Removing the attribution is not permitted.",
  },
];

export default function EmbedPage() {
  return (
    <ContentLayout>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Embed FreeCell", item: absoluteUrl("/embed") },
        ],
      }} />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Embed Free FreeCell Solitaire on Your Website",
        description: "Add a free, ad-free, playable FreeCell game to any website with one line of code.",
        author: { "@type": "Organization", name: siteConfig.siteName, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: siteConfig.siteName },
        datePublished: "2026-03-28",
        dateModified: "2026-03-28",
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
        title="Embed FreeCell Solitaire on Your Website"
        kicker="Free Widget"
        subtitle="One line of code. Ad-free. Mobile-friendly. Add a fully playable FreeCell game to any website, blog, or forum — no registration, no API key, no cost."
        breadcrumbs={[{ label: "Home", href: "/" }]}
      />

      {/* The Pitch */}
      <div className="bg-white/[0.04] border border-white/10 rounded-xl p-6 mb-10 max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-[var(--gold)] mb-3">
          Why Embed Our FreeCell?
        </h2>
        <ul className="text-white/70 leading-relaxed space-y-2">
          <li>✅ <strong className="text-white">Completely free</strong> — no sign-up, no subscription, no hidden charges</li>
          <li>✅ <strong className="text-white">Ad-free embed</strong> — won&apos;t interfere with your monetization</li>
          <li>✅ <strong className="text-white">Mobile-ready</strong> — touch controls, responsive layout</li>
          <li>✅ <strong className="text-white">Fast</strong> — loads in an iframe sandbox, zero impact on your page speed</li>
          <li>✅ <strong className="text-white">Full-featured</strong> — undo, redo, hints, auto-complete, themes</li>
          <li>✅ <strong className="text-white">One line of code</strong> — paste and go</li>
        </ul>
      </div>

      {/* Quick Start */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quick Start: Copy &amp; Paste
        </h2>
        <p className="text-white/70 leading-relaxed mb-4">
          Add this single line to any HTML page and you&apos;re done:
        </p>
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 mb-4 overflow-x-auto">
          <code className="text-emerald-400 text-sm whitespace-pre">
            {`<iframe src="https://playfreecellonline.com/embed/freecell" width="100%" height="600" frameborder="0" loading="lazy" allow="fullscreen"></iframe>`}
          </code>
        </div>
        <p className="text-white/70 leading-relaxed mb-4">
          That&apos;s it. The game will load, scale to fit the iframe, and work on desktop and mobile.
          Customize the <code className="text-white/90 bg-white/10 px-1 rounded">width</code> and{" "}
          <code className="text-white/90 bg-white/10 px-1 rounded">height</code> to fit your layout.
        </p>
        <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-4">
          <p className="text-emerald-300/80 text-sm">
            <strong>Want more control?</strong> Use our{" "}
            <Link href="/embed-generator" className="text-emerald-300 underline hover:text-white transition-colors">
              interactive embed generator
            </Link>{" "}
            to preview different sizes, copy the exact code, and test before deploying.
          </p>
        </div>
      </section>

      {/* Platform Guides */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Platform-Specific Instructions
        </h2>

        <div className="space-y-6">
          {/* WordPress */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">WordPress</h3>
            <ol className="text-white/70 space-y-2 list-decimal list-inside text-sm">
              <li>Open the page or post where you want the game.</li>
              <li>Click the <strong className="text-white/90">+</strong> button to add a block.</li>
              <li>Search for &ldquo;Custom HTML&rdquo; and select it.</li>
              <li>Paste the iframe code above.</li>
              <li>Click &ldquo;Preview&rdquo; to verify it works, then publish.</li>
            </ol>
            <p className="text-white/50 text-xs mt-2">
              Note: WordPress.com free plans may restrict iframes. Self-hosted WordPress (WordPress.org) works without restrictions.
            </p>
          </div>

          {/* Squarespace */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">Squarespace</h3>
            <ol className="text-white/70 space-y-2 list-decimal list-inside text-sm">
              <li>Edit your page and click a section to add content.</li>
              <li>Add a &ldquo;Code&rdquo; block (under &ldquo;Embed&rdquo;).</li>
              <li>Paste the iframe code and click &ldquo;Apply.&rdquo;</li>
              <li>Save and preview.</li>
            </ol>
          </div>

          {/* Wix */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">Wix</h3>
            <ol className="text-white/70 space-y-2 list-decimal list-inside text-sm">
              <li>Open the Wix editor for your page.</li>
              <li>Click <strong className="text-white/90">Add (+) → Embed Code → Embed a Widget</strong>.</li>
              <li>Select &ldquo;Enter Code&rdquo; and paste the iframe snippet.</li>
              <li>Resize the widget to fit your layout and publish.</li>
            </ol>
          </div>

          {/* Notion / Confluence */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">Notion, Confluence &amp; Wikis</h3>
            <p className="text-white/70 text-sm">
              Paste the URL <code className="text-white/90 bg-white/10 px-1 rounded">https://playfreecellonline.com/embed/freecell</code>{" "}
              directly — most wiki platforms auto-embed iframes from URLs. In Notion, use the{" "}
              <strong className="text-white/90">/embed</strong> command and paste the URL.
            </p>
          </div>

          {/* Raw HTML */}
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-lg font-bold text-white mb-2">Plain HTML / Custom Sites</h3>
            <p className="text-white/70 text-sm">
              Paste the iframe code anywhere in your HTML. No external scripts, stylesheets, or
              dependencies needed. The game is fully self-contained inside the iframe.
            </p>
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Use Cases */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Who Uses This?
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-bold text-white mb-2">🎮 Gaming &amp; Entertainment Blogs</h3>
            <p className="text-white/60 text-sm">
              Boost engagement and dwell time with an interactive game embedded in your articles.
              Perfect alongside card game reviews, solitaire strategy content, or casual gaming roundups.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-bold text-white mb-2">🏢 Corporate Intranets</h3>
            <p className="text-white/60 text-sm">
              Add a quick brain-break game to your company&apos;s intranet or employee portal.
              FreeCell is a classic — no signup, no downloads, no IT tickets.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-bold text-white mb-2">📚 Educational Sites</h3>
            <p className="text-white/60 text-sm">
              FreeCell teaches strategic thinking, pattern recognition, and planning ahead.
              Great for math, logic, or computer science sites that want an interactive example.
            </p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-xl p-5">
            <h3 className="text-base font-bold text-white mb-2">🧓 Senior &amp; Accessibility Sites</h3>
            <p className="text-white/60 text-sm">
              FreeCell is one of the most popular games among older adults. Embed it on senior
              communities, retirement resources, or accessibility-focused sites.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="mb-10 max-w-3xl mx-auto">
        <h2
          className="text-2xl sm:text-3xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Technical Details
        </h2>
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-5 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[var(--gold)] font-bold">⚡</span>
            <p className="text-white/70"><strong className="text-white/90">Performance:</strong> The game loads inside a sandboxed iframe. Zero JavaScript injected into your page. No impact on your Core Web Vitals or Lighthouse scores.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--gold)] font-bold">🔒</span>
            <p className="text-white/70"><strong className="text-white/90">Privacy:</strong> No cookies are set on your domain. The game uses localStorage within the iframe for game state only. No user tracking leaves the iframe sandbox.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--gold)] font-bold">📱</span>
            <p className="text-white/70"><strong className="text-white/90">Responsive:</strong> Set <code className="text-white/90 bg-white/10 px-1 rounded">width=&quot;100%&quot;</code> for fluid layouts. The game detects available space and adjusts card sizes and layout automatically.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--gold)] font-bold">♿</span>
            <p className="text-white/70"><strong className="text-white/90">Accessibility:</strong> Keyboard navigation, screen reader announcements, high contrast mode, and reduced motion support built in.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[var(--gold)] font-bold">🌐</span>
            <p className="text-white/70"><strong className="text-white/90">CDN-delivered:</strong> Served from Vercel&apos;s global edge network. Fast load times worldwide.</p>
          </div>
        </div>
      </section>

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* CTA to generator */}
      <div className="mb-10 max-w-3xl mx-auto">
        <CtaSection
          heading="Ready to Embed?"
          body="Use our interactive generator to preview the game at your exact dimensions, then copy the code. Takes 30 seconds."
          primaryLabel="Open Embed Generator"
          primaryHref="/embed-generator"
          secondaryLabel="Play FreeCell First"
          secondaryHref="/"
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

      <AdUnit format="horizontal" className="-my-1 max-w-3xl mx-auto" />

      {/* Related content */}
      <section className="max-w-3xl mx-auto">
        <h2
          className="text-2xl font-bold mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          More Resources
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <ContentLinkCard href="/embed-generator" title="Embed Generator Tool" description="Interactive preview and code generator for custom dimensions" />
          <ContentLinkCard href="/" title="Play FreeCell Online" description="Try the full-featured game before embedding it" />
          <ContentLinkCard href="/how-to-play" title="How to Play FreeCell" description="Rules and setup guide — link this alongside your embed" />
          <ContentLinkCard href="/strategy" title="FreeCell Strategy" description="Expert strategies for your readers who want to improve" />
          <ContentLinkCard href="/solitaire-types" title="All Solitaire Types" description="Explore 20+ solitaire variants beyond FreeCell" />
          <ContentLinkCard href="/games" title="Solitaire Games Hub" description="All playable games in one place" />
        </div>
      </section>
    </ContentLayout>
  );
}
