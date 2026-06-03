'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { isHubSite } from '@/lib/siteConfig';

const ADSTERRA_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSTERRA_PUBLISHER_ID;
const HUB_ADSTERRA_SUPPRESSED =
  isHubSite && process.env.NEXT_PUBLIC_ADSENSE_APPROVED !== 'true';

/**
 * Adsterra display-banner loader. Renders nothing unless
 * NEXT_PUBLIC_ADSTERRA_PUBLISHER_ID is set in the deployment environment.
 * Display-only by design — the 65+ solitaire audience bounces hard on
 * popunder / push / interstitial formats. Display-only is the only format
 * that should be enabled for these sites.
 */
export default function AdsterraScript() {
  const enabled = useCookieConsent();

  if (HUB_ADSTERRA_SUPPRESSED || !ADSTERRA_PUBLISHER_ID || !enabled) return null;

  return (
    <Script
      id="adsterra-display"
      strategy="afterInteractive"
      src={`https://www.profitabledisplaynetwork.com/${ADSTERRA_PUBLISHER_ID}/invoke.js`}
    />
  );
}
