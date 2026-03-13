'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { absoluteUrl } from '@/lib/siteConfig';
import { Copy, Check } from 'lucide-react';

export default function EmbedGeneratorClient() {
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [copied, setCopied] = useState(false);

  const embedUrl = absoluteUrl('/embed/freecell');

  const embedCode = useMemo(
    () =>
      `<iframe src="${embedUrl}"\n        width="${width}" height="${height}"\n        frameborder="0"\n        style="border:0;border-radius:8px;"\n        allowfullscreen>\n</iframe>`,
    [embedUrl, width, height],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = embedCode;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [embedCode]);

  const clampWidth = (v: number) => Math.max(320, Math.min(1200, v || 320));
  const clampHeight = (v: number) => Math.max(400, Math.min(900, v || 400));

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="card-panel p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Dimensions</h2>
        <div className="flex flex-wrap gap-6">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-white/60">Width (px)</span>
            <input
              type="number"
              value={width}
              min={320}
              max={1200}
              onChange={(e) => setWidth(clampWidth(Number(e.target.value)))}
              onBlur={(e) => setWidth(clampWidth(Number(e.target.value)))}
              className="w-28 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-white/60">Height (px)</span>
            <input
              type="number"
              value={height}
              min={400}
              max={900}
              onChange={(e) => setHeight(clampHeight(Number(e.target.value)))}
              onBlur={(e) => setHeight(clampHeight(Number(e.target.value)))}
              className="w-28 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]/50"
            />
          </label>
        </div>
      </div>

      {/* Live preview */}
      <div className="card-panel p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Live Preview</h2>
        <div
          className="mx-auto overflow-hidden rounded-lg border border-white/10"
          style={{ width: Math.min(width, 1200), maxWidth: '100%' }}
        >
          <iframe
            src="/embed/freecell"
            width={width}
            height={height}
            style={{
              border: 0,
              borderRadius: 8,
              display: 'block',
              maxWidth: '100%',
            }}
            title="FreeCell embed preview"
          />
        </div>
      </div>

      {/* Embed code */}
      <div className="card-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Embed Code</h2>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#c9a432] text-black text-sm font-medium transition-colors"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Code
              </>
            )}
          </button>
        </div>
        <textarea
          readOnly
          value={embedCode}
          rows={6}
          className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white/90 text-sm font-mono resize-none focus:outline-none focus:border-[#D4AF37]/50"
          onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        />
      </div>
    </div>
  );
}
