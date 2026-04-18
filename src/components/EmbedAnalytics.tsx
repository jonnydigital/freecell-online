'use client';

import Script from 'next/script';
import { siteConfig } from '@/lib/siteConfig';

/**
 * EmbedAnalytics — GA4 loader for the /embed route group.
 *
 * The main Analytics component ships the default page_view config; this one
 * segments embed traffic by sending `content_group: 'embed'` plus an
 * `embed_ref` custom parameter (set from the `?ref=` URL param on the parent
 * page that embeds us, or `document.referrer` as fallback).
 *
 * Why this matters: embed traffic is our single most scalable organic
 * backlink channel (see docs/traffic-growth-roadmap.md §2A). Without
 * content_group segmentation we can't tell:
 *   - how much GA traffic actually comes from the embed vs. organic,
 *   - which third-party hosts drive the most embed activity,
 *   - whether an outreach campaign actually lifted embed engagement.
 *
 * In GA4, filter explorations / audiences on `content_group = embed` and
 * `custom_dimension: embed_ref` (must be registered once in GA4 Admin →
 * Custom definitions → Custom dimensions).
 */

const GA_MEASUREMENT_ID =
  siteConfig.gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function EmbedAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="ga4-embed-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());

            // Resolve embed_ref: ?ref= param > document.referrer host > 'direct'
            var embedRef = 'direct';
            try {
              var params = new URLSearchParams(window.location.search);
              var ref = params.get('ref');
              if (ref) {
                embedRef = ref;
              } else if (document.referrer) {
                try { embedRef = new URL(document.referrer).host || 'direct'; }
                catch (_) { embedRef = document.referrer.slice(0, 64); }
              }
              // Fallback for iframe-embedded usage: parent page can't be read
              // cross-origin, but referrer is usually the embedding host.
            } catch (_) {}

            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: true,
              content_group: 'embed',
              embed_ref: embedRef,
              // iframe traffic often lacks a normal sessionization signal;
              // explicitly mark the traffic source so GA4 attribution is
              // stable across parent-page refreshes.
              traffic_type: 'embed'
            });
          `,
        }}
      />
    </>
  );
}
