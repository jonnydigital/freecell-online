---
name: solitaire-content-writer
description: Creates SEO-oriented solitaire content for playfreecellonline.com, solitairestack.com, and future spoke domains. Use when asked to write new articles, rules pages, strategy pages, comparison pages, listicles, or article briefs for the solitaire network.
---

# Solitaire Content Writer

Write publishable content for the solitaire portfolio.

Use this skill for:

- new article drafts
- rules pages
- strategy pages
- comparison pages
- article briefs
- backlog-to-draft production

## First Read

Before writing, read:

- `docs/CONTENT_STRATEGY.md`
- `docs/NETWORK_EXECUTION_PLAN.md`
- `.claude/skills/humanizer/SKILL.md`

Then inspect the live routes:

```bash
find src/app -maxdepth 3 -name 'page.tsx' | sed 's#^src/app##' | sed 's#/page.tsx##' | sort
```

Do not draft pages that already exist unless the request is a refresh.

## Core Writing Rules

- No em dashes
- No AI-slop intros
- Grade 8 reading level
- Short paragraphs
- Strong headers that deliver value on their own
- Every page must link to a relevant game page
- Most pages should include `Key Takeaways`
- Most evergreen pages should include FAQ-ready questions

## Portfolio Logic

### `playfreecellonline.com`

Use for:

- FreeCell-specific content
- solver/deals/daily-challenge content
- FreeCell comparison pages

### `solitairestack.com`

Use for:

- broad solitaire topics
- taxonomy pages
- listicles
- blog content
- cross-game comparisons

### Reserved spokes

Use for briefs and future drafts only unless explicitly asked to prepare a spoke launch:

- `playspidersolitaireonline.com`
- `playklondikeonline.com`

## Content Types

Choose one content type before outlining:

1. `money-page`
2. `support-page`
3. `authority-page`
4. `linkbait-page`

### `money-page`

Examples:

- how to play
- strategy
- tips
- is it winnable
- scoring

### `support-page`

Examples:

- comparisons
- mistake lists
- opening strategy
- endgame strategy

### `authority-page`

Examples:

- best solitaire games for beginners
- easiest solitaire games ranked
- best card games to play alone

### `linkbait-page`

Examples:

- popularity rankings
- state-by-state studies
- weird or unexpected solitaire angles

## Workflow

### Step 1: Confirm the target

Identify:

- target site
- target page type
- primary query
- supporting internal links

### Step 2: Check existing coverage

Search for overlap:

```bash
rg -n "topic phrase|close variant|comparison target" src/app docs
```

If a near-duplicate exists:

- refresh it instead
- or clearly differentiate the new page

### Step 3: Build the outline

Headers should answer real questions.

Avoid:

- `Introduction`
- `Overview`
- `Conclusion`

Prefer:

- `How Spider Solitaire Actually Works`
- `Why Empty Columns Matter More Than Fast Moves`
- `When Draw 3 Is Harder Than Draw 1`

### Step 4: Draft the page

Use this default structure:

```markdown
# Title

[2-3 sentence intro]

## Key Takeaways
- [takeaway]
- [takeaway]
- [takeaway]

## [Section]
...

## Frequently Asked Questions

### [Question]
[Answer]
```

### Step 5: Add internal links

Each page should usually link to:

- 1 primary game page
- 2-4 related support pages
- 1 broader hub page when relevant

### Step 6: Humanize

Run a final pass against `.claude/skills/humanizer/SKILL.md`.

## Output Rules

When drafting for the user, show a short planning preamble in chat:

- target site
- content type
- primary query
- nearest internal links

Do **not** put that planning preamble inside the final page content.

If asked to create a file, the file should contain only the final content.

## Heuristics

- Prioritize cluster depth over novelty
- Prefer pages that strengthen owned domains
- Prefer pages with obvious gameplay CTAs
- Do not write broad blog posts with no route back to playing
- Do not overstate unverifiable claims

## Good Prompts

- `Write a FreeCell support page for playfreecellonline.com: "Is Every FreeCell Game Winnable?"`
- `Draft a Solitaire Stack blog post: "Best Solitaire Games for Beginners"`
- `Create a Spider article brief for playspidersolitaireonline.com`
- `Refresh the FreeCell vs Spider page with stronger internal links`
