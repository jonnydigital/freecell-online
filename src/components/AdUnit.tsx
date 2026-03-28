'use client';

import { useEffect, useRef, useState } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
  width?: number;
  height?: number;
}

/**
 * Google AdSense ad unit. Renders a responsive ad if AdSense script is loaded
 * (loaded via CookieConsent after user accepts). Falls back to nothing if blocked.
 * Collapses gracefully when no ad fills the slot.
 */
export default function AdUnit({ slot, format = 'auto', className = '', width, height }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (pushed.current) return;

    let attempts = 0;
    const maxAttempts = 20; // retry for up to ~10 seconds

    const tryPush = () => {
      if (pushed.current) return;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const adsbygoogle = (window as any).adsbygoogle;
        if (adsbygoogle && adRef.current) {
          adsbygoogle.push({});
          pushed.current = true;
          return;
        }
      } catch {
        // AdSense not loaded or blocked
      }
      attempts++;
      if (attempts < maxAttempts) {
        setTimeout(tryPush, 500);
      }
    };

    // Small initial delay to let AdSense script load
    setTimeout(tryPush, 200);
  }, []);

  // Watch for unfilled ad status and collapse the container
  useEffect(() => {
    const insEl = adRef.current;
    if (!insEl) return;

    const observer = new MutationObserver(() => {
      const status = insEl.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        setCollapsed(true);
      }
    });

    observer.observe(insEl, { attributes: true, attributeFilter: ['data-ad-status'] });

    // Also check after a timeout in case AdSense never loads
    const fallbackTimer = setTimeout(() => {
      const status = insEl.getAttribute('data-ad-status');
      if (!status || status === 'unfilled') {
        setCollapsed(true);
      }
    }, 12000); // 12s — enough time for AdSense to respond

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (collapsed) return null;

  const isFixedSize = width && height;
  const insStyle: React.CSSProperties = isFixedSize
    ? { display: 'inline-block', width: `${width}px`, height: `${height}px` }
    : { display: 'block' };

  return (
    <div ref={containerRef} className={`ad-container overflow-hidden transition-all duration-300 ${className}`} style={!isFixedSize ? { minHeight: '90px' } : undefined}>
      <ins
        className="adsbygoogle"
        style={insStyle}
        data-ad-client="ca-pub-3083538874906149"
        data-ad-format={format}
        {...(slot ? { 'data-ad-slot': slot } : {})}
        {...(!isFixedSize ? { 'data-full-width-responsive': 'true' } : {})}
        ref={adRef}
      />
    </div>
  );
}
