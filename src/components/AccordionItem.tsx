"use client";

import { useState, useEffect } from "react";

export function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  // Start open for SSR so crawlers see all content, then collapse client-side
  const [open, setOpen] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    setOpen(false);
  }, []);

  return (
    <div className="border-b border-[#d4c5a0]/40 last:border-b-0" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="py-5 px-10 sm:px-12 flex justify-between items-center w-full text-left transition-colors duration-200 hover:bg-[#f4edd8]/50 cursor-pointer"
      >
        <span
          itemProp="name"
          className={`font-medium text-lg tracking-wide transition-colors duration-200 ${
            open ? "text-[#B8860B]" : "text-[#2a2522]"
          }`}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#c9a84c] shrink-0 ml-4 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ gridTemplateRows: open || !hydrated ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-10 sm:px-12 pb-8 pt-1">
            <p itemProp="text" className="text-[#3a3a3a] leading-[1.75] tracking-[0.01em] max-w-prose">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
