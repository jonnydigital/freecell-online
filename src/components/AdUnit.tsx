'use client';

import { useEffect, useRef } from 'react';

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
 */
export default function AdUnit({ slot, format = 'auto', className = '', width, height }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle && adRef.current) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded or blocked
    }
  }, []);

  const isFixedSize = width && height;
  const insStyle: React.CSSProperties = isFixedSize
    ? { display: 'inline-block', width: `${width}px`, height: `${height}px` }
    : { display: 'block' };

  return (
    <div className={`ad-container overflow-hidden ${className}`} style={!isFixedSize ? { minHeight: '90px' } : undefined}>
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
