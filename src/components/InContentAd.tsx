'use client';

import AdUnit from './AdUnit';

/**
 * In-content ad unit for SEO/content pages.
 * Renders a native in-article ad between sections with subtle spacing.
 * Uses AdSense in-article format (fluid) for best content integration.
 */
export default function InContentAd({ className = '' }: { className?: string }) {
  return (
    <div className={`my-8 flex justify-center ${className}`}>
      <AdUnit slot="9238758088" format="fluid" layout="in-article" />
    </div>
  );
}
