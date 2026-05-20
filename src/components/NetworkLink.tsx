import NextLink, { type LinkProps } from 'next/link';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { crossDomainHref } from '@/lib/siteConfig';

type Href = LinkProps['href'];

type NetworkLinkProps = Omit<LinkProps, 'href'> &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | 'href'> & {
    href: Href;
    children?: ReactNode;
  };

/**
 * Drop-in replacement for next/link's <Link> that automatically converts
 * relative hrefs pointing to routes owned by a different site into absolute
 * canonical URLs. This eliminates hub→spoke 301 redirects, preserves crawl
 * budget, and prevents GSC "Page with redirect" reports.
 *
 * For same-site routes, behavior is identical to next/link.
 */
const NetworkLink = forwardRef<HTMLAnchorElement, NetworkLinkProps>(function NetworkLink(
  { href, ...rest },
  ref,
) {
  const resolvedHref: Href = typeof href === 'string' ? crossDomainHref(href) : href;
  return <NextLink ref={ref} href={resolvedHref} {...rest} />;
});

export default NetworkLink;
