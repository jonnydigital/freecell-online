'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

/**
 * Google AdSense ad unit. Renders a responsive ad if AdSense script is loaded
 * (loaded via CookieConsent after user accepts). Falls back to nothing if blocked.
 */
export default function AdUnit({ format = 'auto', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle && adRef.current) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  return (
    <div className={`ad-container overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3083538874906149"
        data-ad-format={format}
        data-full-width-responsive="true"
        ref={adRef}
      />
    </div>
  );
}
