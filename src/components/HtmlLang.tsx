"use client";

import { useEffect } from "react";

/**
 * Sets the document's <html lang> attribute to match the page's content
 * language. The root layout renders <html lang="en"> for the whole network,
 * so localized routes (e.g. /freecell-en-francais) must correct the language
 * signal for screen readers and rendered-DOM SEO. Restores the previous value
 * on unmount so SPA navigation back to English pages stays correct.
 */
export default function HtmlLang({ lang }: { lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  return null;
}
