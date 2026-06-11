'use client';

import Script from 'next/script';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { isHubSite } from '@/lib/siteConfig';

const ADSENSE_CLIENT_ID = 'ca-pub-3083538874906149';
const HUB_ADSENSE_SUPPRESSED =
  isHubSite && process.env.NEXT_PUBLIC_ADSENSE_APPROVED !== 'true';

export default function AdSenseScript() {
  const enabled = useCookieConsent();

  if (HUB_ADSENSE_SUPPRESSED || !enabled) return null;

  return (
    <Script
      id="adsense-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
