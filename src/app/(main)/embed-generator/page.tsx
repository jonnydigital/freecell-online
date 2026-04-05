import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { absoluteUrl, siteConfig } from '@/lib/siteConfig';
import { isOwnedBy } from '@/lib/routeOwnership';
import ContentLayout from '@/components/ContentLayout';
import { JsonLd, ContentLinkCard } from '@/components/content';
import EmbedGeneratorClient from '@/components/embed/EmbedGeneratorClient';

export const metadata: Metadata = {
  title: 'Free FreeCell Embed Generator — Add FreeCell to Your Website',
  description:
    'Generate a free, embeddable FreeCell solitaire widget for your website, blog, or forum. Customize dimensions, copy the code, and paste it into any HTML page.',
  alternates: { canonical: absoluteUrl('/embed-generator') },
  openGraph: {
    title: 'Free FreeCell Embed Generator',
    description:
      'Add a free, playable FreeCell game to your website in seconds. No sign-up required.',
    url: absoluteUrl('/embed-generator'),
  },
};

export default function EmbedGeneratorPage() {
  if (!isOwnedBy('/embed-generator', siteConfig.key)) {
    notFound();
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Embed Generator', item: absoluteUrl('/embed-generator') },
    ],
  };

  return (
    <ContentLayout>
      <JsonLd data={breadcrumbJsonLd} />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-4">
          Free FreeCell Embed Generator
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-2xl">
          Add a fully playable FreeCell solitaire game to your website, blog, or
          forum. Customize the dimensions below, preview the result, and copy the
          embed code — no sign-up or API key required.
        </p>

        {/* Generator UI */}
        <EmbedGeneratorClient />

        {/* How-to section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-white/80">
            <div className="card-panel p-5">
              <h3 className="font-semibold text-white mb-2">1. Customize</h3>
              <p className="text-sm">
                Set the width and height to fit your layout. The game is
                responsive inside the iframe.
              </p>
            </div>
            <div className="card-panel p-5">
              <h3 className="font-semibold text-white mb-2">2. Copy</h3>
              <p className="text-sm">
                Click the copy button to grab the embed code. It&apos;s a single
                HTML snippet — no JavaScript includes needed.
              </p>
            </div>
            <div className="card-panel p-5">
              <h3 className="font-semibold text-white mb-2">3. Paste</h3>
              <p className="text-sm">
                Drop the code into any HTML page, WordPress post, Squarespace
                embed block, or forum signature.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 text-white/80">
            <div>
              <h3 className="font-semibold text-white">Is it free?</h3>
              <p className="text-sm mt-1">
                Yes — the embed is completely free for personal and commercial
                use. We only ask that you keep the small attribution link.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">Does it show ads?</h3>
              <p className="text-sm mt-1">
                No. The embedded game is ad-free, so it won&apos;t interfere with
                your site&apos;s layout or monetization.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Will it work on mobile?
              </h3>
              <p className="text-sm mt-1">
                Yes. The game supports touch drag-and-drop and scales to fit the
                iframe dimensions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white">
                Can I customize the appearance?
              </h3>
              <p className="text-sm mt-1">
                Currently you can set the width, height, and border radius.
                Additional theming options are on the roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Related content */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
            Learn More About FreeCell
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <ContentLinkCard href="/strategy" title="Strategy Guide" description="Master the tactics behind every winning game." />
            <ContentLinkCard href="/freecell-probability" title="Probability & Math" description="The combinatorics that make FreeCell almost always solvable." />
            <ContentLinkCard href="/freecell-cheat-sheet" title="Cheat Sheet" description="Quick-reference rules and tips for every skill level." />
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
