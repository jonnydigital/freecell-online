import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl, siteConfig } from "@/lib/siteConfig";
import { getAllSlugs, getCanonicalSiteForPost, getPostBySlug } from "@/lib/blog";
import { SITE_DOMAINS } from "@/lib/routeOwnership";
import AdUnit from "@/components/AdUnit";
import ContentLayout from "@/components/ContentLayout";
import { ContentHero, CardSection, ContentBody, CtaSection, JsonLd } from "@/components/content";
import BlogPostContent from "@/components/BlogPostContent";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  // Canonical resolution: point rel=canonical at the post's primary owner
  // (first entry in its `sites` frontmatter array, default hub). This signals
  // ownership to Google across the 4-domain network BEFORE we flip the
  // site filter and actually stop serving the post on non-owner domains.
  const canonicalSite = getCanonicalSiteForPost(post);
  const canonicalUrl = `${SITE_DOMAINS[canonicalSite]}/blog/${post.slug}`;

  return {
    title: `${post.title} | FreeCell Blog`,
    description: post.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.siteName },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  return (
    <ContentLayout variant="dark">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <ContentHero title={post.title} subtitle={post.description} />

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 pb-20 flex flex-col gap-6">
        {/* Breadcrumb nav */}
        <nav className="text-sm text-[#8B6914]">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2 text-[#444444]">/</span>
          <Link href="/blog" className="hover:underline">Blog</Link>
          <span className="mx-2 text-[#444444]">/</span>
          <span className="text-[#444444]">{post.title}</span>
        </nav>

        {/* Post metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#444444]">
          <time className="font-medium text-[#8B6914]">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>·</span>
          <span>{post.author}</span>
          <div className="flex flex-wrap gap-2 ml-auto">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-[#0e4020]/10 text-[#1b5e30] font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Top ad */}
        <AdUnit className="-my-1" />

        {/* Article content */}
        <CardSection>
          <ContentBody>
            <BlogPostContent source={post.content} />
          </ContentBody>
        </CardSection>

        {/* Mid-article ad */}
        <AdUnit className="-my-1" />

        {/* Back to blog */}
        <CardSection>
          <ContentBody>
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#8B6914] hover:underline font-medium"
              >
                ← Back to all posts
              </Link>
            </div>
          </ContentBody>
        </CardSection>

        {/* Bottom ad */}
        <AdUnit className="-my-1" />

        <CtaSection
          heading="Try These Strategies Now"
          body="Put what you've learned into practice with a game of FreeCell."
          secondaryLabel="More Tips"
          secondaryHref="/tips"
        />
      </main>
    </ContentLayout>
  );
}
