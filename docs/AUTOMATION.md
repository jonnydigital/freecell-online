# Automation Registry

Every automated producer that writes to this repo, its mandate, and the shared
rules. If you add a producer, register it here.

## Shared rules (all producers)

1. **Never push red.** `npm run lint` must exit 0 (zero errors; warnings OK) and
   `npx tsc --noEmit` must pass before any push. If a failure predates your
   changes, fix it or stop without pushing and report the blocker.
2. **Append to the ledger** (`docs/content-pipeline/LEDGER.md`) every run, and
   read recent rows first — no topic/route overlap with other producers.
3. **No new locales or route families** without a plan reference in
   `docs/plans/`. Locale pages ship complete (localized play UI, reciprocal
   hreflang across ALL locale siblings, H1s, core cluster) or not at all.
4. **One push per run.** Batch commits locally, push once — every push fires
   four Vercel production builds (Pro credit is finite).

## Unattended run notes

- **Mobile viewport QA needs Node 22+.** The CDP harness uses the global
  `WebSocket` API, so run it with the repo's nvm Node on PATH:
  `export PATH="$HOME/.nvm/versions/node/v22.19.0/bin:$PATH"` before
  `npm run qa:mobile` or direct `scripts/mobile-viewport-audit.mjs` calls.
- **Use the Mac keychain git path for unattended pushes.** If a sandboxed shell
  cannot remove a stale `.git/index.lock` or cannot access push credentials,
  route the git command through the documented Mac/osascript path so it can use
  local filesystem permissions and stored GitHub credentials.

## Producers

### Cowork daily review (user-managed, Claude Cowork)
- **Cadence:** daily
- **Mandate:** visual QA sweep, SEO/schema spot checks, small fixes, occasional
  content. Owner: Jonathan (schedule lives in Claude Cowork, not this repo).
- **Required prompt addition (paste into the Cowork scheduled item):**

  > Before pushing: run `npm run lint` (must exit 0 with ZERO errors) and
  > `npx tsc --noEmit`; never push if either fails. Append a row to
  > docs/content-pipeline/LEDGER.md describing what you changed. Do not add new
  > locales or new route families without a plan in docs/plans/. Batch all
  > commits into a single push per run.

### Weekly spoke content pipeline (cloud routine `trig_01FqY3Y1BDjKzQSLZPvSXwQL`)
- **Cadence:** Mondays 13:00 UTC
- **Mandate:** 2 spoke-exclusive blog posts (Klondike + Spider), conventions from
  `.claude/skills/solitaire-content-writer/SKILL.md`. Lint/tsc gate and
  coordination note are embedded in the routine prompt (updated 2026-07-03).

### Friday property scorecard (cloud routine `trig_01D1eRmhXZyKKd5j9HURynsA`)
- **Cadence:** Fridays 13:00 UTC
- **Mandate:** run `npm run scorecard`, commit the dated report + ledger row
  (docs-only push), digest deltas and new failures in its summary. Measures
  only — fixes belong to the daily review agent.

### CI (GitHub Actions, `.github/workflows/ci.yml`)
- **Cadence:** every push/PR to main
- **Mandate:** lint (blocking) → jest → build. This is the backstop for rule 1;
  a red run emails the owner and means a producer broke the rules.
