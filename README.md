# Asia Trip Tools — Taipei · Hong Kong · Seoul

A 13-tab trip companion for a September 2026 itinerary across Taipei, Hong Kong and Seoul.
Next.js 16 App Router, TypeScript, zero UI dependencies, installable as a PWA, works offline,
and deploys to Vercel with no configuration and no required API keys.

## Tabs

Grouped into four sections in the navigation.

**Live** — needs a network connection, degrades to cached data offline

| Tab | What it does | Source |
| --- | --- | --- |
| 💱 Currency | TWD / HKD / KRW ↔ USD, denomination cheat sheet, mental-math rules, ATM guidance | Live API |
| 🌦️ Weather | Current conditions, 7-day forecast, apparent temperature, UV, US-scale AQI | Live API |
| 🌀 Alerts | Live Hong Kong typhoon and rainstorm signals, derived wind/rain watch for all three cities, signal ladder, contingency plan | Live API + reference |

**Plan**

| Tab | What it does |
| --- | --- |
| 📅 Climate | 1991–2020 September normals side by side, typhoon outlook, what to wear and pack |
| 🗺️ Neighborhoods | Which areas pair on one day, per-city planning rule, closure traps, rain fallbacks |
| 🧰 Toolkit | Plugs, entry requirements, emergency numbers, apps, holidays in the window, packing list, safety |

**On the ground**

| Tab | What it does |
| --- | --- |
| 🧭 Basics | Tipping, transit cards, whether a US phone or card works at the fare gate, etiquette, airport transfers |
| 🍜 Food | What to order with local characters to point at, and how ordering actually works in each city |
| 🗣️ Phrases | Working-minimum phrasebook in Mandarin, Cantonese and Korean with romanization |
| 👕 Sizing | Interactive shoe converter (US ↔ mm ↔ EU ↔ UK), clothing charts, tax refunds, what to buy where |

**Do**

| Tab | What it does |
| --- | --- |
| 🧗 Climbing | Indoor bouldering scenes, grading systems, etiquette, pricing, outdoor options and why September rules them out |
| 🎮 Gaming | PC bangs, arcades, board game cafés, esports, hobby retail |
| ⛳ Golf | Korean screen golf, driving ranges, and where a real round is and is not realistic |

A live clock strip shows Boston, Taipei, Hong Kong and Seoul time with offsets. The active tab is
mirrored into the URL hash, so every view is linkable and browser back/forward works.

## Offline support

The reference tabs — phrases, tipping, emergency numbers, plugs, food, neighborhoods, sizing — are
static data in the JS bundle, so they work with no connection at all. That matters: you need the
phrasebook underground on the MTR and the Seoul Metro, exactly where there is no signal.

A service worker (`public/sw.js`) implements:

- **Navigation** — network first, falling back to the cached app shell
- **`/api/*`** — network first, falling back to the last good response, tagged with `x-from-cache`
  and `x-cached-at` so the UI can report how stale the data is ("Saved rates · 4 h ago")
- **Static assets** — stale-while-revalidate

The header shows a status badge: *Saved for offline use*, *Offline — showing saved data*, or an
*Update available* button when a newer build has been deployed. Install it to a phone home screen
via the browser's "Add to Home Screen" — `app/manifest.ts` declares it as a standalone app.

## Data sources

No API keys are required for anything. One optional key adds coverage.

- **Exchange rates** — [open.er-api.com](https://open.er-api.com), with automatic failover to the
  `@fawazahmed0/currency-api` mirrors on jsDelivr and Cloudflare Pages. Cached 30 minutes.
- **Weather and air quality** — [Open-Meteo](https://open-meteo.com). Cached 15 minutes. Air quality
  degrades independently, so an outage there never blanks a city's forecast.
- **Typhoon warnings (Hong Kong)** — Hong Kong Observatory open data via
  `data.weather.gov.hk`. Live, keyless, and the only genuine warning feed in the app.
- **Typhoon warnings (Taiwan)** — optional. Taiwan's CWA open data API requires a free key. Set
  `CWA_API_KEY` in your Vercel environment variables to enable live Taiwanese warnings; without it
  the tab falls back to the derived watch and links to the official site.
- **Derived wind/rain watch** — computed from Open-Meteo gust and precipitation forecasts for all
  three cities, with thresholds set deliberately below official warning criteria. This is an early
  indication, explicitly **not** a warning.
- **Climate normals** — Central Weather Administration (Taiwan), Hong Kong Observatory, and Korea
  Meteorological Administration, 1991–2020 station normals.

All three API routes are proxied server-side rather than called from the browser, which avoids CORS
and lets the CDN absorb repeat traffic.

## Reliability

- Every outbound call has an `AbortController` timeout (8–9s).
- The rates route tries three independent providers before returning a structured 502.
- The weather route resolves each city independently; one city failing does not affect the others.
- The alerts route never presents a failed feed as "no warnings in force" — it says the feed is
  unreachable and points at the official site.
- Every tab renders an explicit error state with retry rather than an empty screen.
- Verified: all 13 tabs render with no console errors and no horizontal overflow at 390px width;
  offline mode confirmed with the service worker controlling the page and the network disabled.

## Accuracy and verification

Reference content reflects conditions as understood at build time. Anything marked **verify** in the
UI should be reconfirmed against an official source. That covers, in particular:

- K-ETA and electronic arrival-card requirements for US passport holders
- Octopus and EasyCard mobile-wallet provisioning for overseas devices
- Substitute public holidays around Chuseok and Mid-Autumn Festival 2026
- Museum and palace closing days — these have changed repeatedly and differ between adjacent sites
- Every named venue in the Climbing, Gaming and Golf tabs; businesses open, close and move, and
  this is the weakest data in the app. Those tabs lead with search terms and map-app guidance for
  that reason.
- Airport transfer fares and tax-refund thresholds

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

The service worker is only active in a production build (`npm run build && npm start`), and on
`localhost` or HTTPS.

## Deploying to Vercel

A stock Next.js App Router app. No configuration and no required environment variables.

```bash
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

Optional: set `CWA_API_KEY` to enable live Taiwanese typhoon warnings.

## Dependency note

Pinned to Next.js 16, which reports zero `npm audit` findings. Next 15.x carries a transitive
high-severity `postcss` advisory that is only resolved by the 16 major line.
