# FreeCell Online — Daily Development Process

## Daily Cycle (Automated via Cron/Heartbeat)

### 🌅 Morning Check (8:00 AM EST)
1. **Pull analytics** — GA4 stats: visitors, sessions, avg session duration, bounce rate
2. **Check feedback** — Review any user feedback submissions
3. **Check Sentry** — Review errors from past 24h (once set up)
4. **Review daily challenge engagement** — How many people played today's challenge?
5. **Competitive scan** — Quick check on top 3 competitors for new features
6. **Pick today's task** from the backlog (highest impact × lowest effort)
7. **Post morning briefing** to Freddy HQ with metrics + plan

### 🔨 Build Phase
8. **Implement today's task** — Spin up Claude Code agent
9. **Get Gemini CLI review** on any UI/UX changes
10. **Push to main** — Auto-deploys to Vercel

### 🌙 Evening Wrap (9:00 PM EST)
11. **Verify deployment** — Check live site for issues
12. **Log progress** in `docs/changelog.md`
13. **Update backlog** — Re-prioritize based on data
14. **Post evening update** to Freddy HQ with what shipped

## Metrics to Track Daily
Save to `docs/analytics/daily-metrics.json`:
```json
{
  "date": "2026-02-24",
  "visitors": 0,
  "sessions": 0,
  "avgSessionDuration": 0,
  "bounceRate": 0,
  "dailyChallengeStarts": 0,
  "dailyChallengeCompletes": 0,
  "gamesStarted": 0,
  "gamesWon": 0,
  "feedbackCount": 0,
  "errorsLogged": 0,
  "featuresShipped": [],
  "backlogRemaining": 0
}
```

## Weekly Review (Sunday)
- Week-over-week metrics comparison
- Top feedback themes
- Competitive changes
- Next week's priority stack
- Report to Jonathan

## Backlog Priority Order
See BACKLOG.md for current priority stack.
