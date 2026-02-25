"use client";

import { useState } from "react";

export function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#B8860B]/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="py-6 px-6 sm:px-8 flex justify-between items-center w-full text-left transition-colors duration-200 hover:bg-[#B8860B]/[0.04]"
      >
        <span
          className={`font-medium text-lg tracking-wide transition-colors duration-200 ${
            open ? "text-[#B8860B]" : "text-[#2C2C2C]"
          }`}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#B8860B] shrink-0 ml-4 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="px-6 sm:px-8 pb-8 pt-1">
            <p className="text-[#444444] leading-[1.75] tracking-[0.01em]">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
