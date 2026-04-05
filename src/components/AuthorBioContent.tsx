"use client";

/**
 * AuthorBioContent — renders the long-form author MDX bio on the
 * dark-green author profile page. Mirrors the BlogPostContent pattern
 * (client component, next-mdx-remote serialize on the fly) but with
 * dark-theme styled markdown primitives.
 */

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || "";
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          href={href}
          className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
          {...props}
        />
      );
    }
    return (
      <a
        className="text-[#D4AF37]/85 hover:text-[#D4AF37] hover:underline"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-4 text-2xl font-semibold text-white" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 mb-3 text-xl font-semibold text-white" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-white/75" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-6 ml-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-6 ml-4 list-decimal space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2 leading-relaxed text-white/75" {...props}>
      <span className="mt-1 shrink-0 text-[#D4AF37]">•</span>
      <span>{props.children}</span>
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 rounded-lg border-l-4 border-[#D4AF37]/60 bg-white/[0.04] p-5 text-white/75"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  hr: () => <div className="my-8 border-b border-white/10" />,
};

interface AuthorBioContentProps {
  source: string;
}

export default function AuthorBioContent({ source }: AuthorBioContentProps) {
  const [mdxSource, setMdxSource] =
    useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(source, { parseFrontmatter: false }).then(setMdxSource);
  }, [source]);

  if (!mdxSource) {
    return <div className="h-96 animate-pulse rounded-lg bg-white/[0.04]" />;
  }

  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
}
