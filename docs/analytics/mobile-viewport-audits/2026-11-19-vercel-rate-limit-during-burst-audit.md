# Vercel rate-limiting during burst mobile-viewport audits (2026-11-19)

Owner domain: playspidersolitaireonline.com (Spider spoke). Recorded by the Cowork daily review.

## Context

Daily review, 2026-11-19 (even-day Spider rotation). The device_bash Linux VM was unavailable this run, so git, file reads and the lint/tsc gate ran via the Mac-host osascript path, and the true-viewport audit ran host-side (scripts/mobile-viewport-audit.mjs against live production), per the AUTOMATION.md recipe.

## What happened

Running the mobile-viewport audit as a tight burst against a single Vercel domain (playspidersolitaireonline.com, 5 widths back-to-back) tripped Vercel edge rate-limiting for that domain from the runner (Mac) IP. Mid-run the domain began returning connection-level timeouts (curl -> HTTP 000, curl error 28, after a full 15s) and the audit stalled on later viewport cells, while at the same moment:

- playfreecellonline.com/ returned HTTP 200 in 0.25s
- playklondikeonline.com/ returned HTTP 200 in 1.1s
- the Spider board rendered perfectly at 1440 via a different egress (the in-app browser): 10 cascades with face-up bottoms, stock pile, 8 foundations, 1/2/4-suit selector, Undo/Hint/New Deal toolbar, no clip, no horizontal overflow.

The same Spider domain had already served three audit cells (375/390/414: board mounted, screenshots captured) minutes earlier.

## Diagnosis: self-induced, domain-scoped rate-limit, not a production defect

- The failure is connection-level (HTTP 000, timeout error 28), not an origin 5xx. A silently dropped connection is the signature of a firewall/rate-limit, not an application error.
- Only the domain the audit had just hammered was affected. The two domains it did not hit stayed fast and 200.
- The board was confirmed healthy from a second egress (in-app browser) during the apparent outage, and had audited fine minutes earlier.
- Killing the audit did not clear it within a 2-3 minute cooldown, so the rate-limit window outlasts a short pause.

Related observation (not a defect): solitairestack.com/spider returns a 301 to playspidersolitaireonline.com/spider (the documented cross-domain dedup to the owner spoke). A host-side audit that follows that 301 lands on the rate-limited Spider domain, which is why the hub /spider audit cell also stalled this run.

## Why it matters

A future unattended run that judges availability from curl status alone could misread this self-induced timeout as a Spider-spoke outage and false-alarm the owner. The tell: only the just-audited domain times out at the connection level, while sibling domains are 200 and the board renders from a second browser.

## Recommended mitigation (tooling change, not shipped this run)

- Stagger per-domain audits with a cooldown, or add a delay/throttle between viewport cells, so one domain is not hit in a tight burst.
- When a post-audit curl to the just-audited domain returns 000/timeout, re-verify from a second egress (the in-app browser, or the cloud container WebFetch) before concluding outage.

No production code, route, locale or page type was touched.
