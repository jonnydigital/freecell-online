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
    <div className="border-b border-[rgba(212,175,55,0.1)] last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="py-5 px-6 flex justify-between items-center w-full text-left transition-colors duration-200 hover:bg-white/[0.05]"
      >
        <span
          className={`font-medium text-lg transition-colors duration-200 ${
            open ? "text-[#D4AF37]" : "text-white"
          }`}
        >
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-[#D4AF37] shrink-0 ml-4 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
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
          <div className="px-6 pb-6">
            <p className="text-[#E0EFE6] leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
