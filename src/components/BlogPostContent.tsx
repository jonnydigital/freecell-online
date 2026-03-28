'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import Link from 'next/link';
import AdUnit from './AdUnit';

const components = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href || '';
    if (href.startsWith('/') || href.startsWith('#')) {
      return <Link href={href} className="text-[#8B6914] hover:underline" {...props} />;
    }
    return <a className="text-[#8B6914] hover:underline" target="_blank" rel="noopener noreferrer" {...props} />;
  },
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="text-2xl font-semibold text-[#2a2522] mt-10 mb-4"
      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="text-xl font-semibold text-[#2a2522] mt-8 mb-3"
      style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-[#444444] leading-relaxed mb-4" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-2 mb-6 ml-4" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-2 mb-6 ml-4 list-decimal" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2 text-[#444444] leading-relaxed" {...props}>
      <span className="text-[#B8860B] mt-1 shrink-0">•</span>
      <span>{props.children}</span>
    </li>
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="card-inset rounded-lg p-5 my-6 border-l-4 border-[#D4AF37]" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-[#2a2522] font-semibold" {...props} />
  ),
  hr: () => <div className="my-8 border-b border-[#e5e0d8]" />,
  AdUnit: () => <AdUnit className="my-6" />,
};

interface BlogPostContentProps {
  source: string;
}

export default function BlogPostContent({ source }: BlogPostContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(source, { parseFrontmatter: false }).then(setMdxSource);
  }, [source]);

  if (!mdxSource) {
    return <div className="animate-pulse h-96 bg-[#0e4020]/5 rounded-lg" />;
  }

  return (
    <article className="prose-freecell">
      <MDXRemote {...mdxSource} components={components} />
    </article>
  );
}
