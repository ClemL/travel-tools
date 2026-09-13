"use client";

import { useMemo, useState } from "react";
import { useCity } from "./CityProvider";
import { money, usd } from "@/lib/format";
import { useApi, timeAgo } from "@/lib/useApi";
import { DismissBar, Dismissible } from "./Dismissible";

interface RatesResponse {
  base: "USD";
  rates: Record<string, number>;
  updated: string;
  source: string;
}

type Direction = "localToUsd" | "usdToLocal";

/** Denominations worth memorizing before you land. */
const LADDERS: Record<string, number[]> = {
  TWD: [50, 100, 200, 500, 1000, 2000],
  HKD: [20, 50, 100, 200, 500, 1000],
  KRW: [1000, 5000, 10000, 30000, 50000, 100000],
};

/** Practical mental-math shortcut, chosen to be close at typical 2026 rates. */
const RULES: Record<string, (rate: number) => string> = {
  TWD: (r) => `Divide by ${Math.round(r)}. NT$300 ≈ ${usd(300 / r)}.`,
  HKD: (r) => `Divide by ${r.toFixed(1)}. HK$100 ≈ ${usd(100 / r)}.`,
  KRW: (r) => `Drop three zeros, then divide by ${(r / 1000).toFixed(1)}. ₩10,000 ≈ ${usd(10000 / r)}.`,
};

const CASH_NOTES: Record<string, string> = {
  TWD:
    "Withdraw at 7-Eleven or FamilyMart ATMs — open 24/7 and reliable with foreign cards. Night markets and small restaurants are cash-only, so keep NT$2,000-3,000 on you.",
  HKD:
    "ATMs are everywhere and painless. You need less cash here than in Taipei because Octopus covers small purchases, but keep HK$500 for minibuses, ferries and markets.",
  KRW:
    "Use ATMs marked 'Global' — many domestic machines reject foreign cards, and some shut overnight. Korea is card-friendly enough that ₩50,000-100,000 covers a week of market stalls.",
};

export default function CurrencyTab() {
  const { ordered } = useCity();
  const { data, error, loading, fromCache, cachedAt, reload } = useApi<RatesResponse>("/api/rates");
  const [amount, setAmount] = useState<string>("100");
  const [direction, setDirection] = useState<Direction>("localToUsd");

  const parsed = useMemo(() => {
    const n = Number(amount.replace(/,/g, ""));
    return Number.isFinite(n) ? n : 0;
  }, [amount]);

  return (
    <section>
      <p className="lede">
        Live mid-market rates, refreshed every 30 minutes. These are the rates banks quote each other —
        your card will land within roughly 1% of them, and an airport exchange counter will be far worse.
      </p>

      {error && (
        <div className="error-box">
          <strong>Could not load rates.</strong> {error}{" "}
          <button className="btn" onClick={reload} style={{ marginLeft: 8 }}>
            Retry
          </button>
        </div>
      )}

      <div className="converter">
        <div className="field">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="direction">Direction</label>
          <select
            id="direction"
            value={direction}
            onChange={(e) => setDirection(e.target.value as Direction)}
          >
            <option value="localToUsd">Local currency → USD</option>
            <option value="usdToLocal">USD → local currency</option>
          </select>
        </div>
        <button className="btn" onClick={reload} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh rates"}
        </button>
        {fromCache && (
          <span className="pill pill-warn" style={{ alignSelf: "center" }}>
            Saved rates · {timeAgo(cachedAt)}
          </span>
        )}
      </div>

      <div className="grid">
        {ordered.map((city) => {
          const rate = data?.rates?.[city.currency];
          const ladder = LADDERS[city.currency] ?? [];
          return (
            <article
              className="card card-accent"
              key={city.id}
              style={{ ["--accent" as string]: city.accent }}
            >
              <div className="eyebrow">
                {city.flag} {city.name} · {city.currency}
              </div>
              <h3>{city.currencyName}</h3>

              {loading && !data ? (
                <>
                  <div className="skeleton" style={{ width: "60%", height: "1.9rem", marginTop: 10 }} />
                  <div className="skeleton" style={{ width: "45%", marginTop: 8 }} />
                </>
              ) : rate ? (
                <>
                  <div className="rate-big" style={{ marginTop: 8 }}>
                    {direction === "localToUsd" ? (
                      <>
                        {city.currencySymbol}
                        {money(parsed, city.currency)} = {usd(parsed / rate)}
                      </>
                    ) : (
                      <>
                        ${money(parsed, "USD")} = {city.currencySymbol}
                        {money(parsed * rate, city.currency)}
                      </>
                    )}
                  </div>
                  <div className="rate-sub">
                    1 USD = {city.currencySymbol}
                    {money(rate, city.currency)} · 1 {city.currency} = {usd(1 / rate)}
                  </div>

                  <div className="callout small" style={{ marginTop: 12, marginBottom: 12 }}>
                    <strong>Mental math</strong>
                    {RULES[city.currency]?.(rate)}
                  </div>

                  <div className="eyebrow">Common denominations</div>
                  <div className="chips">
                    {ladder.map((v) => (
                      <span className="chip" key={v}>
                        {city.currencySymbol}
                        {money(v, city.currency)} ≈ {usd(v / rate)}
                      </span>
                    ))}
                  </div>

                  <p className="fact-detail" style={{ marginTop: 12, marginBottom: 0 }}>
                    {CASH_NOTES[city.currency]}
                  </p>
                </>
              ) : (
                <p className="muted small">Rate unavailable.</p>
              )}
            </article>
          );
        })}
      </div>

      <DismissBar scope="cur-tips" noun="tips" />
      <Dismissible scope="cur-tips" itemKey="Always decline dynamic currency conversion">
      <div className="callout callout-warn">
        <strong>Always decline dynamic currency conversion</strong>
        When a card terminal or ATM offers to charge you in US dollars instead of the local currency, say
        no and choose the local currency. The merchant&apos;s conversion typically carries a 3-7% markup
        on top of the rate above. This is the single most common and most avoidable cost of the trip.
      </div>
      </Dismissible>

      <p className="status">
        {data
          ? `Source: ${data.source}. Last updated ${new Date(data.updated).toLocaleString()}.${
              fromCache ? " Served from your device's offline cache." : ""
            }`
          : "Waiting for rate data…"}
      </p>
    </section>
  );
}
