#!/usr/bin/env python3
from __future__ import annotations

from datetime import date
from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[4]
RUNS_DIR = ROOT / "docs" / "content-pipeline" / "runs"
APP_DIR = ROOT / "src" / "app"


def list_routes() -> list[str]:
    routes: list[str] = []
    for page in sorted(APP_DIR.glob("**/page.tsx")):
        rel = page.relative_to(APP_DIR).as_posix()
        route = "/" + rel.removesuffix("/page.tsx")
        route = route.replace("page.tsx", "").rstrip("/")
        if route == "":
            route = "/"
        routes.append(route)
    return routes


def build_report(today: str, routes: list[str]) -> str:
    route_lines = "\n".join(f"- `{route}`" for route in routes)
    return f"""# Daily Content Pipeline - {today}

## Source Health

- Local docs reviewed: pending
- Live web checks reviewed: pending
- Confidence: pending

## Current Route Inventory

{route_lines}

## Coverage Gaps

### Cluster Depth

- pending

### Comparisons

- pending

### Authority

- pending

### Linkbait

- pending

### Refresh

- pending

## Top 3 New Opportunities

1. pending
2. pending
3. pending

## Top 2 Refresh Opportunities

1. pending
2. pending

## Top 1 Research Task

1. pending

## Today's Recommended Publish Order

1. pending
2. pending
3. pending

## Notes

- Read `docs/CONTENT_STRATEGY.md`
- Compare current routes against the priority backlog
- Prefer cluster depth before broad expansion
"""


def main() -> None:
    today = date.today().isoformat()
    RUNS_DIR.mkdir(parents=True, exist_ok=True)

    report_path = RUNS_DIR / f"{today}.md"
    latest_path = RUNS_DIR / "latest.md"

    routes = list_routes()
    report = build_report(today, routes)
    report_path.write_text(report, encoding="utf-8")
    shutil.copyfile(report_path, latest_path)

    print(f"Wrote {report_path.relative_to(ROOT)}")
    print(f"Updated {latest_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
