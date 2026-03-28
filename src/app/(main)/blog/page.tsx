import Link from "next/link";
import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/siteConfig";
import { getAllPosts } from "@/lib/blog";
import ContentLayout from "@/components/ContentLayout";
import AdUnit from "@/components/AdUnit";
import { ContentHero, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";

export const metadata: Metadata = {
  title: "FreeCell Blog | Strategy Tips, History & News",
  description:
    "Expert FreeCell strategy articles, game history, tips, and news. Improve your win rate with in-depth guides from the PlayFreeCellOnline.com team.",
  alternates: { canonical: absoluteUrl("/blog") },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "FreeCell Blog",
    description: "Expert FreeCell strategy articles, game history, tips, and news.",
    url: absoluteUrl("/blog"),
    publisher: { "@type": "Organization", name: "PlayFreeCellOnline.com" },
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={blogJsonLd} />

      <ContentHero
        title="FreeCell Blog"
        subtitle="Strategy deep-dives, game history, tips, and everything FreeCell. Written by players, for players."
      />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        <AdUnit className="-my-1" />

        {posts.length === 0 && (
          <CardSection>
            <ContentBody>
              <p className="text-center text-[#444444]">No posts yet — check back soon!</p>
            </ContentBody>
          </CardSection>
        )}

        {posts.map((post, i) => (
          <div key={post.slug}>
            <CardSection>
              <ContentBody>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <time className="text-xs font-medium text-[#8B6914] uppercase tracking-wider">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2
                    className="text-xl sm:text-2xl font-semibold text-[#2a2522] mt-2 mb-3 group-hover:text-[#8B6914] transition-colors"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-[#444444] leading-relaxed mb-4">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#0e4020]/10 text-[#1b5e30] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </ContentBody>
            </CardSection>

            {/* Ad after the first post */}
            {i === 0 && posts.length > 1 && <AdUnit className="mt-6" />}
          </div>
        ))}

        <CtaSection
          heading="Ready to Play?"
          body="Put these strategies to the test in a real game of FreeCell."
          secondaryLabel="Strategy Guide"
          secondaryHref="/strategy"
        />
      </main>
    </ContentLayout>
  );
}
