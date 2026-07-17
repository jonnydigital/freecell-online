#!/usr/bin/env bash
#
# Vercel "Ignored Build Step" — controls whether a deploy actually builds.
#
#   exit 1  -> BUILD (there are build-relevant changes)
#   exit 0  -> SKIP  (commit only touched docs / non-rendered files)
#
# Vercel exposes the previously deployed SHA as VERCEL_GIT_PREVIOUS_SHA.
# Diffing from that SHA is important for multi-commit pushes: checking only
# HEAD^..HEAD can skip a real site change when the final commit is docs-only.

set -euo pipefail

# These paths do not affect any of the four rendered sites. Root-level PNGs are
# generated QA screenshots; nested site assets still trigger a build.
SKIP_REGEX='^(docs/|[^/]+\.png$|README\.md$|LICENSES\.md$)'

# If Vercel does not provide a previous deployed SHA, fall back to the previous
# commit. If the diff cannot be computed, build to preserve production safety.
BASE="${VERCEL_GIT_PREVIOUS_SHA:-HEAD^}"
if ! CHANGED="$(git diff --name-only "$BASE" HEAD 2>/dev/null)"; then
  echo "Could not diff ${BASE}..HEAD (shallow clone / first commit). Building to be safe."
  exit 1
fi

if [ -z "$CHANGED" ]; then
  echo "No changed files detected. Building to be safe."
  exit 1
fi

BUILD_NEEDED="$(echo "$CHANGED" | grep -vE "$SKIP_REGEX" || true)"

if [ -z "$BUILD_NEEDED" ]; then
  echo "Only docs/non-rendered files changed — skipping build:"
  echo "$CHANGED" | sed 's/^/    /'
  exit 0
fi

echo "Build-relevant changes detected — proceeding with build:"
echo "$BUILD_NEEDED" | sed 's/^/    /'
exit 1
