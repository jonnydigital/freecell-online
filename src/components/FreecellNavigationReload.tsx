'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const FREECELL_DEST_PATHS = new Set(['/', '/freecell']);
const PROBLEM_SOURCE_PATHS = new Set([
  '/spider',
  '/klondike',
  '/storm',
  '/streak',
  '/easy-freecell',
  '/bakers-game',
  '/eight-off',
  '/freecell/1-cell',
  '/freecell/2-cell',
  '/freecell/3-cell',
]);

function shouldForceDocumentNavigation(currentPathname: string, targetPathname: string): boolean {
  if (!PROBLEM_SOURCE_PATHS.has(currentPathname)) return false;
  return FREECELL_DEST_PATHS.has(targetPathname);
}

export default function FreecellNavigationReload() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || !PROBLEM_SOURCE_PATHS.has(pathname)) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      const anchor = target instanceof Element ? target.closest('a[href]') as HTMLAnchorElement | null : null;
      if (!anchor) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (!shouldForceDocumentNavigation(pathname, url.pathname)) return;

      // Work around the washed-out client-navigation render by taking the same
      // document-navigation path that produces the correct fully refreshed board.
      event.preventDefault();
      window.location.assign(url.toString());
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [pathname]);

  return null;
}
