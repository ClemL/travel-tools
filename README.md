# Asia Trip Tools — Taipei · Hong Kong · Seoul

A 17-tab trip companion for a September 2026 itinerary across Taipei, Hong Kong and Seoul.
Next.js 16 App Router, TypeScript, zero UI dependencies, installable as a PWA, works offline,
and deploys to Vercel with no configuration and no required API keys.

## Tabs

Grouped into five sections. **Pick a city first** — the header selection drives every city-scoped
tab, so choosing Seoul once shows you Seoul's food, phrases, airport transfers and shops without
re-selecting in each one. Cross-city tabs compare all three, ordered so your selected city leads.

**Live** — needs a connection, degrades to cached data offline

| Tab | What it does | Scope |
| --- | --- | --- |
| 💱 Currency | TWD / HKD / KRW ↔ USD, denominations, mental-math rules, ATM guidance | All three |
| 🌦️ Weather | Current conditions, 7-day forecast, apparent temperature, UV, AQI | All three |
| 🌀 Alerts | Live Hong Kong typhoon signals, derived wind/rain watch, signal ladder, contingency plan | All three |

**Plan**

| Tab | What it does | Scope |
| --- | --- | --- |
| ✅ Verify | Every flagged claim in the app as a pre-trip checklist, prioritised, with official links and persisted ticks | Per city |
| 📅 Climate | 1991–2020 September normals side by side, typhoon outlook, what to pack | All three |
| 🗺️ Neighborhoods | Day plans pairing areas that work together, closure traps, rain fallbacks | Per city |
| ✈️ Airport | Every transfer option with door-to-door times and costs in local currency and USD | Per city |
| 🧰 Toolkit | Plugs, entry rules, emergency numbers, apps, holidays, packing list, safety | All three |

**On the ground**

| Tab | What it does | Scope |
| --- | --- | --- |
| 🧭 Basics | Tipping, transit cards, whether a US phone or card works at the gate, etiquette | Per city |
| 🍜 Food | What to order with characters to point at, and how ordering actually works | Per city |
| 🗣️ Phrases | Working-minimum phrasebook with romanization | Per city |

**Shop**

| Tab | What it does | Scope |
| --- | --- | --- |
| ✒️ Stationery | Stationery districts and shops — Seoul's design ateliers, Taipei's independents, Hong Kong's supply streets | Per city |
| 🏺 Artisan | Craft districts and working makers — ceramics, leather, bamboo, lacquer, and Hong Kong's endangered trades | Per city |
| 👕 Sizing | Interactive shoe converter, clothing charts, tax refunds, what to buy where | All three |

**Do**

| Tab | What it does | Scope |
| --- | --- | --- |
| 🧗 Climbing | Bouldering scenes, grading systems, etiquette, pricing, outdoor seasonality | Per city |
| 🎮 Gaming | PC bangs, arcades, board game cafés, esports, hobby retail | Per city |
| ⛳ Golf | Korean screen golf, driving ranges, where a real round is realistic | Per city |

The active tab is mirrored into the URL hash, so every view is linkable and browser back/forward
works. The city choice persists in `localStorage`.

## Verify before you go

Reference content in this app was **compiled, not verified** — written from general knowledge and not
checked against official sources. Rather than leaving 80-odd `verify` pills scattered across 17 tabs
where nobody would find them, the Verify tab gathers the high-stakes ones into a prioritised
checklist: what to confirm, why it matters, the official link, and a tick that persists in
`localStorage` with the date you confirmed it.

It also runs a live sweep of the data files at runtime, counting every `confidence: "verify"` record
and reporting them by source. That count is computed, not hardcoded, so it cannot drift as content
is added — if it jumps, the curated checklist needs a new entry.

Ages are shown as elapsed time ("compiled 3 months ago", "you confirmed this 2 weeks ago") rather
than a binary verified flag, so staleness decays visibly instead of silently.

## Hiding what you already know

Tips and place cards carry a checkbox. Tick it and the item disappears, so the page collapses down to
what is still worth reading — useful on a return trip where you already know the etiquette and have
already been to half the neighborhoods.

- **Places** ("Been here"): neighborhoods, day plans, venues, shops, craft districts, dishes,
  shopping spots.
- **Tips** ("I know this"): etiquette, gotchas, ordering rules, buying notes, packing items, safety
  notes, closure traps, contingency steps, climate advice, sizing warnings, and the standalone
  advice callouts — "Always decline dynamic currency conversion", "One adapter will not cover the
  trip", "Sequence the trip so weather risk falls early", and the rest.

Ticking plays a brief green confirmation with a checkmark before the item is removed, so the thing
you clicked acknowledges the click instead of just vanishing. Un-ticking is immediate — there is
nothing to confirm — and `prefers-reduced-motion` skips the animation entirely.

Three callouts are deliberately **not** dismissible, because they are the app being honest about its
own limits rather than advice you can outgrow: "Compiled, not verified" on Verify, "This is a
convenience view, not an authority" on Alerts, and "Reconfirm every line of this section" on the
Toolkit entry requirements.

State persists in `localStorage` and is scoped per tab **and** per city, so hiding Taipei etiquette
does not touch Seoul's. Once anything in a section is hidden, a bar appears offering **Show hidden**
(items return dimmed with the box still ticked, so they can be restored individually) and **Reset**
for the whole section. Nothing appears until you have hidden something.

## Search

`/` or `Cmd/Ctrl+K` opens search across every tab at once — dishes, phrases, fares, neighborhoods,
shops, emergency numbers, shoe sizes. Results are grouped by tab and city, with matches highlighted
and enough context that most questions are answered without leaving the overlay; Enter jumps to the
tab and sets the city. Arrow keys navigate, Escape closes.

It is a plain ranked scan over the in-memory data, no index and no dependency: the corpus is a few
thousand short strings, so scanning per keystroke is cheaper than shipping a search library.

## Airport transfers

Costs are stored in local currency and converted with the **live** exchange rate from the Currency
tab, falling back to a static approximate rate when offline — so the USD column is right rather than
frozen at whatever the rate was when this was written. Each city shows every realistic mode (express
rail, all-stop rail, airport bus, night bus, taxi) with door-to-door time ranges, frequency, service
hours, what it is best for, and what to watch out for, plus a decision rule and a note on the second
airport where one is relevant.

## Accessibility

- Tabs implement the WAI-ARIA tabs pattern properly: arrow keys move and activate, Home/End jump to
  the ends, and roving `tabindex` keeps exactly one tab in the focus order.
- **Zero axe violations** (WCAG 2.1 A and AA) across all 17 tabs, verified with `axe-core`.
- The colour palette was audited by computing contrast ratios for every token pair in both themes.
  `--text-faint` failed at 2.70:1 against the worst background and was darkened to clear 4.5:1; the
  checked-row style was rebuilt without blanket `opacity`, which had been dragging text under
  threshold. Every remaining pair passes AA.

## Resilience

Each tab panel is wrapped in an error boundary. A throwing tab now renders a message naming the tab
and leaves navigation and every other tab working, instead of white-screening the app — which
matters most in the situation this app is built for: offline, underground, with no way to reload
from a network. Switching tabs clears the error.

## Responsive layout

The app is built for a phone first and specifically tested on foldable geometry.

| Width | Layout |
| --- | --- |
| ≤ 400px | Folded cover screen. City picker collapses to flags only. |
| ≤ 700px | Phone. Sticky city + section bar, single column, clocks collapse to one inline line showing home and the selected city, wide tables become stacked cards. |
| ≤ 999px | Tablets and unfolded foldables. Compact bar instead of the grouped nav, which costs ~150px of vertical space. |
| 701–1200px, near-square | Unfolded foldable. Two comfortable columns rather than three cramped ones. |
| `horizontal-viewport-segments: 2` | True dual-screen devices, with a wider column gap. |
| ≥ 1000px | Desktop. Full grouped navigation across five sections. |

On a phone the flow is: **city → section → content**, with both controls sticky at the top of the
screen so changing either never requires scrolling back up. Header chrome above the content is 188px
on a phone, down from 247px before this layout.

Verified at 372×828 (OnePlus Open cover), 390×844 (phone), 938×872 (OnePlus Open unfolded),
820×1180 (portrait tablet) and 1280×900 (desktop): no horizontal overflow on any of the 16 tabs at
any of those sizes, and no console errors.

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
- Verified: all 17 tabs render with no console errors and no horizontal overflow at five viewport
  sizes; zero axe violations; offline confirmed with the service worker controlling the page and the
  network disabled, including tabs never visited in that session; error boundary confirmed against a
  real render throw; city propagation, deep links, keyboard tab navigation, search, the verify
  checklist and the shoe converter covered by scripted checks.

## Bundle

Tab components are code-split with `React.lazy`, so the first load only pays for the active tab:
**154 KB of JS on first paint, 271 KB once everything is warm — 43% deferred.**

Code splitting normally costs offline coverage, because the service worker can only cache chunks the
browser has actually requested. The loader functions are therefore kept and every remaining chunk is
prefetched on `requestIdleCallback` after first paint, so the cache ends up complete. This is
verified: the offline test lands on one tab, waits out the prefetch, disables the network, and then
opens eight tabs it never visited — all of them render, and search works offline too.

## Accuracy and verification

Reference content reflects conditions as understood at build time. Anything marked **verify** in the
UI should be reconfirmed against an official source. That covers, in particular:

- K-ETA and electronic arrival-card requirements for US passport holders
- Octopus and EasyCard mobile-wallet provisioning for overseas devices
- Substitute public holidays around Chuseok and Mid-Autumn Festival 2026
- Museum and palace closing days — these have changed repeatedly and differ between adjacent sites
- Every named venue in the Climbing, Gaming, Golf, Stationery and Artisan tabs; businesses open,
  close and move, and this is the weakest data in the app. Those tabs lead with search terms and
  map-app guidance for that reason.
- Every airport fare, journey time and service hour, and all tax-refund thresholds

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
