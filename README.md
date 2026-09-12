# Asia Trip Tools — Taipei · Hong Kong · Seoul

A six-tab trip companion for a September 2026 itinerary across Taipei, Hong Kong and Seoul.
Next.js 15 App Router, TypeScript, zero UI dependencies, deployable to Vercel with no configuration.

## Tabs

| Tab | What it does | Data source |
| --- | --- | --- |
| 💱 Currency | Live TWD / HKD / KRW ↔ USD conversion, denomination cheat sheet, mental-math rules, ATM guidance | Live API |
| 🌦️ Weather | Current conditions, 7-day forecast, apparent temperature, UV and US-scale AQI | Live API |
| 📅 September climate | 1991–2020 September normals compared side by side, typhoon outlook, what to wear and pack | Compiled reference |
| 🧭 Tipping, transit & payments | Whether to tip, which transit card to buy, whether a US phone or card works at the gate, etiquette, airport transfers | Compiled reference |
| 🗣️ Phrases | Working-minimum phrasebook in Mandarin, Cantonese and Korean with romanization | Compiled reference |
| 🧰 Trip toolkit | Plugs and voltage, entry requirements, emergency numbers, apps to install, holidays during the window, packing list, safety and contingency | Compiled reference |

A live clock strip in the header shows Boston, Taipei, Hong Kong and Seoul time with offsets.
The active tab is mirrored into the URL hash, so any view is linkable.

## Data sources

No API keys are required for anything.

- **Exchange rates** — [open.er-api.com](https://open.er-api.com), with automatic failover to the
  `@fawazahmed0/currency-api` mirrors on jsDelivr and Cloudflare Pages. Cached 30 minutes.
- **Weather and air quality** — [Open-Meteo](https://open-meteo.com). Cached 15 minutes. Air quality
  is fetched separately and degrades independently, so an air-quality outage never blanks a city's
  forecast.
- **Climate normals** — Central Weather Administration (Taiwan), Hong Kong Observatory, and Korea
  Meteorological Administration, 1991–2020 station normals. Approximate and cited in the UI.

Both API routes are proxied server-side rather than called from the browser, which avoids CORS
issues and lets Vercel's edge cache absorb repeat traffic.

## Reliability notes

- Every network call has an `AbortController` timeout (8s rates, 9s weather).
- The rates route tries three independent providers before returning a structured 502.
- The weather route resolves each city independently; one city failing does not affect the others.
- Both tabs render explicit error states with a retry control rather than an empty screen.

## Accuracy and verification

Reference content reflects conditions as understood at build time. Anything in the UI marked
**verify** is a policy that has changed within the last few years and should be reconfirmed against
an official source before you rely on it. This covers, in particular:

- K-ETA and electronic arrival-card requirements for US passport holders
- Octopus and EasyCard mobile-wallet provisioning for overseas devices
- Seoul Climate Card short-term tourist pass pricing and availability
- Substitute public holidays around Chuseok and Mid-Autumn Festival 2026
- Airport transfer fares and tax-refund thresholds

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Deploying to Vercel

The project is a stock Next.js App Router app and needs no configuration, no environment variables,
and no external accounts.

```bash
npx vercel        # preview deployment
npx vercel --prod # production deployment
```

Alternatively, import the repository at [vercel.com/new](https://vercel.com/new) and accept the
detected defaults. Both API routes run as serverless functions; the page itself is statically
prerendered.
