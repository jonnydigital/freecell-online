---
name: solitaire-content-pipeline
description: Daily content opportunity scan for the solitaire portfolio. Use when asked to run a daily content pipeline, identify what to publish next, review coverage gaps, or generate a dated action report for playfreecellonline.com, solitairestack.com, and future spoke domains.
---

# Solitaire Content Pipeline

Run a compact daily loop:

**coverage review -> opportunity scoring -> refresh review -> today selection**

Use this skill when asked to:

- run the daily content pipeline
- decide what to publish today
- find the next best content opportunities
- review content gaps across the portfolio

## First Read

Read:

- `docs/CONTENT_STRATEGY.md`
- `docs/NETWORK_EXECUTION_PLAN.md`
- `docs/STRATEGIC_MODEL.md`

## Primary Runner

Create today's report scaffold:

```bash
python .claude/skills/solitaire-content-pipeline/scripts/run_daily_content_pipeline.py
```

This writes:

- `docs/content-pipeline/runs/YYYY-MM-DD.md`
- `docs/content-pipeline/runs/latest.md`

## Daily Questions

Every run should answer:

1. What clusters are still thin?
2. Which owned domain should get the next page?
3. What can be refreshed instead of created from scratch?
4. What are the top 3 publish candidates today?
5. What is the next research task?

## Workflow

### Phase 1: Inventory current coverage

Use the route inventory:

```bash
find src/app -maxdepth 3 -name 'page.tsx' | sed 's#^src/app##' | sed 's#/page.tsx##' | sort
```

Compare it against the backlog in `docs/CONTENT_STRATEGY.md`.

### Phase 2: Coverage-gap review

Classify opportunities into:

- `Cluster Depth`: needed to complete a game cluster
- `Comparison`: useful for cross-game intent
- `Authority`: broad browse-intent content
- `Linkbait`: surveys, rankings, or unusual angles
- `Refresh`: update or improve an existing page

### Phase 3: Live discovery

If live web research is available, check:

- 2-3 priority keywords
- 1-2 competitor content pages
- one broader solitaire-angle query

You are not trying to map the whole market every day.
You are trying to confirm that today's choices still make sense.

### Phase 4: Score opportunities

Score each candidate on:

- demand
- fit with an owned domain
- cluster value
- internal linking value
- effort
- uniqueness

### Phase 5: Select today's actions

Pick:

- top 3 new opportunities
- top 2 refresh opportunities
- top 1 research task

## Daily Guardrails

- Do not over-optimize for random viral topics
- Do not recommend spoke launches just because the domains exist
- Prefer cluster depth before broad expansion
- Prefer refreshing near-winners over inventing weak new pages
- Broad traffic is fine, but every page should route back to a game

## Standard Output

Each run should end with:

- `Top 3 new opportunities`
- `Top 2 refreshes`
- `Top 1 research task`
- `Today's recommended publish order`

## Example Commands

- `Run the solitaire content pipeline`
- `What should we publish today?`
- `Find the next 10 content opportunities`
- `Review where our FreeCell cluster is thin`
