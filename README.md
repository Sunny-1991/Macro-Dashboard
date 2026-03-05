# Macro Dashboard

[![Weekly Data Refresh](https://github.com/Sunny-1991/Macro-Dashboard/actions/workflows/weekly-data-refresh.yml/badge.svg)](https://github.com/Sunny-1991/Macro-Dashboard/actions/workflows/weekly-data-refresh.yml)
[![View Chinese README](https://img.shields.io/badge/README-%E4%B8%AD%E6%96%87-blue)](./README.zh-CN.md)

A lightweight macro dashboard for multi-country, long-range comparison (1960–2025), with fast local snapshot loading and automated weekly data checks.

## Highlights

- **4 metric modules**: Economy, Demographics, Trade, Fiscal
- **11 economies**: CHN, USA, IND, JPN, KOR, TWN, GBR, DEU, RUS, AUS, NZL
- **Dual chart modes**: line (multi-country) and bar (single country)
- **Time range slider**: adjustable start/end year
- **Right-edge interactions**:
  - click country label/end-point to toggle that series
  - hide tooltip when cursor moves beyond line-end area
- **High-resolution chart export**: `Download Chart Image`
- **Fast open**: prebuilt local snapshot (`gdp-local-data.js`) + live fallback pipeline

## Metric Coverage

### Economy
- GDP per capita (nominal USD)
- GDP per capita (PPP USD)
- GDP total (nominal USD)
- GDP total (PPP USD)
- Disposable income per capita (USD)

### Demographics
- Total population
- Population increment
- Population growth rate
- Aging rate (65+ share)
- Fertility rate

### Trade
- Imports
- Exports
- Total trade
- Trade balance

### Fiscal
- Fiscal revenue
- Fiscal expenditure
- Fiscal deficit
- Military expenditure

## Data Sources (Primary)

- World Bank API
- IMF WEO / DataMapper
- OECD NAAG
- OWID (incl. SIPRI military series)
- UN WPP
- FRED / BEA (US series)
- National official sources used for overrides where needed (e.g., Taiwan DGBAS/CBC, China NBS)

> Notes: some latest-year values use official budget/provisional/derived methods when full finalized data are not yet available. Each point has source metadata in the dataset.

## Quick Start

No build system is required for viewing.

```bash
# from repo root
python3 -m http.server 8000
```

Open: `http://127.0.0.1:8000/index.html`

## Weekly Auto Update

This repo includes a GitHub Actions workflow:

- File: `.github/workflows/weekly-data-refresh.yml`
- Schedule: every Monday `02:00 UTC`
- Also supports manual trigger (`workflow_dispatch`)

Workflow behavior:

1. Runs `node scripts/build-local-data.mjs`
2. Checks if `gdp-local-data.js` changed
3. If changed, bumps `gdp-local-data.js?v=...` in `index.html`
4. Commits and pushes to `main`
5. If unchanged, exits without commit

## Manual Data Refresh

Requires Node.js 20+.

```bash
node scripts/build-local-data.mjs
LOCAL_DATA_VERSION=auto-$(date -u +%Y%m%d%H%M) node scripts/bump-local-data-version.mjs
```

## Project Structure

```text
.
├── index.html                         # UI layout and controls
├── gdp-style.css                      # visual style
├── gdp-script.js                      # data loading, fallback logic, chart interactions
├── gdp-local-data.js                  # prebuilt local snapshot for fast load
├── scripts/
│   ├── build-local-data.mjs           # generate local snapshot from pipeline
│   └── bump-local-data-version.mjs    # update local snapshot asset version in index.html
└── .github/workflows/
    └── weekly-data-refresh.yml        # scheduled auto update job
```

## Development Notes

- The dashboard is intentionally framework-free (vanilla JS + Chart.js) for portability.
- If Node is unavailable locally, you can still run the dashboard with existing snapshot data.
- Keep `main` as the deployment branch if using the built-in auto-refresh workflow.

