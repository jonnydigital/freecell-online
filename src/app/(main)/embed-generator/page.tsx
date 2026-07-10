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

const faqs = [
  {
    question: 'What does the FreeCell embed generator create?',
    answer:
      'It creates a copy-and-paste iframe snippet for a fully playable FreeCell game that runs inside your page without requiring JavaScript includes, API keys, or account setup.',
  },
  {
    question: 'Can I use the generated FreeCell widget on a commercial website?',
    answer:
      'Yes. The widget is free for personal and commercial websites as long as the built-in attribution remains visible.',
  },
  {
    question: 'Does the generated iframe load lazily?',
    answer:
      'Yes. The generated code includes loading="lazy" so the game can wait to load until it is near the visitor viewport.',
  },
  {
    question: 'Which sizes work best for the FreeCell iframe?',
    answer:
      'The default 800 by 600 frame works well for desktop pages. For responsive layouts, keep the width within your content column and use at least 500 to 600 pixels of height.',
  },
];

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
  const webAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FreeCell Embed Generator',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    url: absoluteUrl('/embed-generator'),
    description:
      'Generate a free, ad-free FreeCell solitaire iframe widget for websites, blogs, and forums.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <ContentLayout>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webAppJsonLd} />
      <JsonLd data={faqJsonLd} />

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
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-white">{faq.question}</h3>
                <p className="text-sm mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related content */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-[#D4AF37] mb-4">
            Learn More About FreeCell
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <ContentLinkCard href="/strategy" title="Strategy Guide" description="Master the tactics behind every winning game." />
            <ContentLinkCard href="/embed" title="Embed Overview" description="See the public embed page and why the iframe is free, ad-free, and link-friendly." />
            <ContentLinkCard href="/freecell-probability" title="Probability & Math" description="The combinatorics that make FreeCell almost always solvable." />
            <ContentLinkCard href="/freecell-cheat-sheet" title="Cheat Sheet" description="Quick-reference rules and tips for every skill level." />
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
