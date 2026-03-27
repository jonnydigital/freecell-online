'use client';

import AdUnit from './AdUnit';

/**
 * In-content ad unit for SEO/content pages.
 * Renders a horizontal ad between sections with subtle spacing.
 */
export default function InContentAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdUnit format="horizontal" />
    </div>
  );
}
