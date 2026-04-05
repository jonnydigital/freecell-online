"use client";

/**
 * GameFinderQuiz — five-question picker that recommends solitaire variants.
 *
 * Design notes
 * ------------
 * - Each answer contributes a vector of scores across every candidate game.
 * - We sum the vectors, sort, and surface the top three.
 * - The scoring map is deliberately transparent in source: editors can
 *   rebalance weights without touching the rendering code.
 * - No network, no storage, no PII. Everything runs in the browser.
 */

import { useMemo, useState } from "react";
import Link from "next/link";

type GameId =
  | "klondike"
  | "freecell"
  | "spider-1"
  | "spider-4"
  | "pyramid"
  | "tripeaks"
  | "golf"
  | "forty-thieves";

interface GameMeta {
  id: GameId;
  label: string;
  href: string;
  tagline: string;
  bestFor: string;
}

const GAME_META: Record<GameId, GameMeta> = {
  klondike: {
    id: "klondike",
    label: "Klondike (Classic Solitaire)",
    href: "/klondike",
    tagline: "The default. The game your grandmother calls solitaire.",
    bestFor: "Players who want the familiar tableau with hidden cards and a forgiving rhythm.",
  },
  freecell: {
    id: "freecell",
    label: "FreeCell",
    href: "/freecell",
    tagline: "Every card visible. Nearly every deal winnable with careful play.",
    bestFor: "Players who want a strategic, open-information puzzle where skill dominates luck.",
  },
  "spider-1": {
    id: "spider-1",
    label: "Spider Solitaire (1-suit)",
    href: "/spider",
    tagline: "Two decks, one suit. A gentle introduction to Spider.",
    bestFor: "Newer players ready to graduate from Klondike without jumping into full Spider.",
  },
  "spider-4": {
    id: "spider-4",
    label: "Spider Solitaire (4-suit)",
    href: "/spider",
    tagline: "Two decks, four suits. The deep end of the pool.",
    bestFor: "Experienced players who want a long, challenging game that rewards planning.",
  },
  pyramid: {
    id: "pyramid",
    label: "Pyramid Solitaire",
    href: "/pyramid",
    tagline: "Pair cards that sum to 13. Fast, simple, luck-heavy.",
    bestFor: "Players who want a five-minute palate cleanser with minimal rules.",
  },
  tripeaks: {
    id: "tripeaks",
    label: "TriPeaks",
    href: "/tripeaks",
    tagline: "Climb up and down the sequence. Breezy and rewarding.",
    bestFor: "Casual mobile-first players who want momentum and quick feedback.",
  },
  golf: {
    id: "golf",
    label: "Golf Solitaire",
    href: "/golf",
    tagline: "Sequence runs up or down regardless of suit. Quick and streaky.",
    bestFor: "Players who want a 3-minute game with almost no decision overhead.",
  },
  "forty-thieves": {
    id: "forty-thieves",
    label: "Forty Thieves",
    href: "/forty-thieves",
    tagline: "Two decks, ten columns, strict same-suit building. Serious work.",
    bestFor: "Experienced players who want the longest, most punishing game in the portfolio.",
  },
};

type ScoreVector = Partial<Record<GameId, number>>;

interface Answer {
  value: string;
  label: string;
  scores: ScoreVector;
}

interface Question {
  id: string;
  prompt: string;
  helper?: string;
  answers: Answer[];
}

const QUESTIONS: Question[] = [
  {
    id: "length",
    prompt: "How long do you want a single game to last?",
    answers: [
      {
        value: "short",
        label: "About 3 minutes — I'm on a break.",
        scores: { golf: 4, pyramid: 3, tripeaks: 3, klondike: 1 },
      },
      {
        value: "medium",
        label: "5 to 10 minutes — a proper sit-down.",
        scores: { klondike: 3, freecell: 3, tripeaks: 2, "spider-1": 2, pyramid: 1 },
      },
      {
        value: "long",
        label: "15 to 30 minutes — I'm committing.",
        scores: { freecell: 3, "spider-4": 4, "forty-thieves": 4, "spider-1": 2 },
      },
      {
        value: "whatever",
        label: "However long it takes — I don't watch the clock.",
        scores: { "spider-4": 3, "forty-thieves": 3, freecell: 2, klondike: 1 },
      },
    ],
  },
  {
    id: "thinking",
    prompt: "How much do you want to think while playing?",
    answers: [
      {
        value: "off",
        label: "Brain off — background entertainment.",
        scores: { golf: 4, pyramid: 3, tripeaks: 3 },
      },
      {
        value: "casual",
        label: "Light planning — a few moves ahead.",
        scores: { klondike: 4, tripeaks: 2, "spider-1": 2, pyramid: 1 },
      },
      {
        value: "focused",
        label: "Focused — real decisions, real tradeoffs.",
        scores: { freecell: 4, "spider-1": 3, klondike: 2 },
      },
      {
        value: "deep",
        label: "Deep analysis — I want to earn every win.",
        scores: { freecell: 3, "spider-4": 4, "forty-thieves": 4 },
      },
    ],
  },
  {
    id: "winning",
    prompt: "How important is winning most games?",
    answers: [
      {
        value: "win-often",
        label: "I want to win most of what I start.",
        scores: { klondike: 2, "spider-1": 3, golf: 3, tripeaks: 2, freecell: 3 },
      },
      {
        value: "challenge",
        label: "I like a genuine challenge.",
        scores: { freecell: 3, "spider-4": 2, klondike: 2, tripeaks: 1 },
      },
      {
        value: "earn-it",
        label: "I want to really earn it — losses are fine.",
        scores: { "spider-4": 4, "forty-thieves": 4, freecell: 1 },
      },
    ],
  },
  {
    id: "visibility",
    prompt: "Do you prefer all cards visible from the start?",
    answers: [
      {
        value: "all-visible",
        label: "Yes — open information, no surprises.",
        scores: { freecell: 4, "forty-thieves": 2 },
      },
      {
        value: "mix",
        label: "A mix is fine — some hidden, some shown.",
        scores: { klondike: 3, "spider-1": 3, "spider-4": 3, tripeaks: 2 },
      },
      {
        value: "surprise",
        label: "Surprise me — I enjoy hidden cards.",
        scores: { klondike: 3, tripeaks: 3, pyramid: 2, golf: 2 },
      },
    ],
  },
  {
    id: "experience",
    prompt: "How much solitaire experience do you have?",
    answers: [
      {
        value: "new",
        label: "Brand new — show me something friendly.",
        scores: { klondike: 4, tripeaks: 2, golf: 2, pyramid: 2 },
      },
      {
        value: "familiar",
        label: "Familiar with the classics.",
        scores: { freecell: 3, "spider-1": 3, tripeaks: 1, klondike: 1 },
      },
      {
        value: "experienced",
        label: "Experienced — I've played a handful of variants.",
        scores: { freecell: 2, "spider-4": 3, "forty-thieves": 2 },
      },
      {
        value: "expert",
        label: "Expert — throw me the hardest thing you have.",
        scores: { "spider-4": 4, "forty-thieves": 4, freecell: 1 },
      },
    ],
  },
];

function scoreAnswers(selections: Record<string, string>): GameId[] {
  const totals: Record<GameId, number> = {
    klondike: 0,
    freecell: 0,
    "spider-1": 0,
    "spider-4": 0,
    pyramid: 0,
    tripeaks: 0,
    golf: 0,
    "forty-thieves": 0,
  };
  for (const question of QUESTIONS) {
    const selected = selections[question.id];
    if (!selected) continue;
    const answer = question.answers.find((a) => a.value === selected);
    if (!answer) continue;
    for (const [game, points] of Object.entries(answer.scores)) {
      totals[game as GameId] += points ?? 0;
    }
  }
  const sorted = (Object.keys(totals) as GameId[])
    .filter((g) => totals[g] > 0)
    .sort((a, b) => totals[b] - totals[a]);
  return sorted.slice(0, 3);
}

export default function GameFinderQuiz() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = useMemo(
    () => QUESTIONS.every((q) => selections[q.id] !== undefined),
    [selections],
  );

  const recommendations = useMemo(
    () => (submitted ? scoreAnswers(selections) : []),
    [submitted, selections],
  );

  function handleSelect(questionId: string, value: string) {
    setSelections((prev) => ({ ...prev, [questionId]: value }));
    if (submitted) setSubmitted(false);
  }

  function handleReset() {
    setSelections({});
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-8">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (allAnswered) setSubmitted(true);
        }}
        className="flex flex-col gap-8"
      >
        {QUESTIONS.map((question, index) => (
          <fieldset
            key={question.id}
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5 sm:p-6"
          >
            <legend className="px-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/60">
              Question {index + 1} of {QUESTIONS.length}
            </legend>
            <div className="mt-1 text-base font-semibold text-white sm:text-lg">
              {question.prompt}
            </div>
            {question.helper && (
              <p className="mt-1 text-sm text-white/60">{question.helper}</p>
            )}
            <div className="mt-4 grid gap-2">
              {question.answers.map((answer) => {
                const inputId = `${question.id}-${answer.value}`;
                const checked = selections[question.id] === answer.value;
                return (
                  <label
                    key={answer.value}
                    htmlFor={inputId}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                      checked
                        ? "border-[#D4AF37]/60 bg-[#D4AF37]/[0.08] text-white"
                        : "border-white/[0.08] bg-white/[0.02] text-white/80 hover:border-white/20"
                    }`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={question.id}
                      value={answer.value}
                      checked={checked}
                      onChange={() => handleSelect(question.id, answer.value)}
                      className="mt-1 h-4 w-4 shrink-0 accent-[#D4AF37]"
                    />
                    <span>{answer.label}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={!allAnswered}
            className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors ${
              allAnswered
                ? "bg-[#D4AF37] text-[#072907] hover:bg-[#e3c24a]"
                : "cursor-not-allowed bg-white/[0.08] text-white/40"
            }`}
          >
            Find my game
          </button>
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white/80 hover:border-white/40 hover:text-white"
            >
              Start over
            </button>
          )}
          {!allAnswered && (
            <span className="text-xs text-white/50">
              Answer all {QUESTIONS.length} questions to see your match.
            </span>
          )}
        </div>
      </form>

      {submitted && (
        <div
          className="rounded-xl border border-[#D4AF37]/30 bg-[#D4AF37]/[0.04] p-5 sm:p-6"
          aria-live="polite"
        >
          <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]/70">
            Your matches
          </div>
          <h3 className="mt-1 text-lg font-semibold text-white">
            We&rsquo;d start you on these three
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {recommendations.length === 0 ? (
              <li className="text-sm text-white/70">
                No clear match — try loosening a preference or two and running
                the finder again.
              </li>
            ) : (
              recommendations.map((gameId, position) => {
                const meta = GAME_META[gameId];
                return (
                  <li
                    key={gameId}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.02] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                          {position === 0 ? "Top pick" : `Option ${position + 1}`}
                        </div>
                        <Link
                          href={meta.href}
                          className="mt-0.5 inline-block text-base font-semibold text-[#D4AF37] hover:underline"
                        >
                          {meta.label}
                        </Link>
                        <p className="mt-1 text-sm text-white/80">{meta.tagline}</p>
                        <p className="mt-1.5 text-xs text-white/60">
                          Best for: {meta.bestFor}
                        </p>
                      </div>
                      <Link
                        href={meta.href}
                        className="shrink-0 rounded-lg border border-[#D4AF37]/50 px-3 py-1.5 text-xs font-semibold text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        Play &rarr;
                      </Link>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
