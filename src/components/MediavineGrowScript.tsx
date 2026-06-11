'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { isHubSite } from '@/lib/siteConfig';

const GROW_SITE_ID = process.env.NEXT_PUBLIC_MEDIAVINE_GROW_ID;
const HUB_GROW_SUPPRESSED =
  isHubSite && process.env.NEXT_PUBLIC_ADSENSE_APPROVED !== 'true';

/**
 * Mediavine Grow loader. Renders nothing unless NEXT_PUBLIC_MEDIAVINE_GROW_ID
 * is set in the deployment's environment. Once installed and 30 days of Grow
 * data has accumulated, the site qualifies to apply for Mediavine Journey.
 */
export default function MediavineGrowScript() {
  const enabled = useCookieConsent();

  if (HUB_GROW_SUPPRESSED || !GROW_SITE_ID || !enabled) return null;

  return (
    <Script
      id="mediavine-grow"
      strategy="afterInteractive"
      src={`https://scripts.mediavine.com/tags/${GROW_SITE_ID}.js`}
      data-noptimize="1"
      data-cfasync="false"
    />
  );
}
