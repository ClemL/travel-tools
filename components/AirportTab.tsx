"use client";

import { useMemo } from "react";
import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { airportFor } from "@/lib/airport";
import { useApi } from "@/lib/useApi";
import { usd } from "@/lib/format";

interface RatesResponse {
  rates: Record<string, number>;
  source: string;
}

const KIND_PILL = { rail: "pill-brand", bus: "pill-good", taxi: "pill-warn" } as const;

export default function AirportTab() {
  const { city } = useCity();
  const a = airportFor(city);
  const c = cityById(city);
  const { data } = useApi<RatesResponse>("/api/rates");

  // Costs are stored in local currency and converted live; the static fallback
  // keeps the tab useful offline, where this matters most.
  const rate = data?.rates?.[c.currency] ?? a.fallbackRate;
  const isLive = Boolean(data?.rates?.[c.currency]);

  const range = useMemo(
    () =>
      (lo: number, hi: number) =>
        lo === hi ? usd(lo / rate) : `${usd(lo / rate)}–${usd(hi / rate)}`,
    [rate]
  );

  const fmtLocal = (lo: number, hi: number) => {
    const f = (n: number) => new Intl.NumberFormat("en-US").format(n);
    return lo === hi ? `${c.currencySymbol}${f(lo)}` : `${c.currencySymbol}${f(lo)}–${f(hi)}`;
  };

  const fmtMins = (lo: number, hi: number) => (lo === hi ? `${lo} min` : `${lo}–${hi} min`);

  const cheapest = a.options.reduce((best, o) => (o.cost[0] < best.cost[0] ? o : best));
  const fastest = a.options.reduce((best, o) => (o.minutes[0] < best.minutes[0] ? o : best));

  return (
    <section>
      <p className="lede">
        Every realistic way from the airport into town, with door-to-door times and costs in both local
        currency and US dollars. The right answer differs by city and by what time you land.
      </p>

      <article className="card card-accent" style={{ ["--accent" as string]: c.accent, marginBottom: 16 }}>
        <div className="eyebrow">
          {c.flag} {a.code} — {a.airport}
        </div>
        <h3 style={{ marginBottom: 6 }}>
          {a.distanceKm} km to {a.reference}
        </h3>
        <p className="fact-detail" style={{ marginBottom: 0 }}>
          {a.decisionRule}
        </p>
      </article>

      <div className="metrics" style={{ marginBottom: 18 }}>
        <div className="metric">
          <div className="k">Fastest</div>
          <div className="v">{fmtMins(fastest.minutes[0], fastest.minutes[1])}</div>
          <div className="small muted">{fastest.mode}</div>
        </div>
        <div className="metric">
          <div className="k">Cheapest</div>
          <div className="v">{fmtLocal(cheapest.cost[0], cheapest.cost[1])}</div>
          <div className="small muted">{cheapest.mode}</div>
        </div>
        <div className="metric">
          <div className="k">Distance</div>
          <div className="v">{a.distanceKm} km</div>
          <div className="small muted">{Math.round(a.distanceKm * 0.621)} miles</div>
        </div>
      </div>

      <h2 className="section-title">All options</h2>

      {/* Wide screens get the comparison table; phones get stacked cards. */}
      <div className="table-wrap only-wide">
        <table>
          <thead>
            <tr>
              <th>Mode</th>
              <th>Time</th>
              <th>Cost</th>
              <th>USD</th>
              <th>Service</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            {a.options.map((o) => (
              <tr key={o.mode}>
                <td>
                  <strong>
                    {o.icon} {o.mode}
                  </strong>
                  {o.recommended && (
                    <>
                      {" "}
                      <span className="pill pill-good">pick this</span>
                    </>
                  )}
                  <br />
                  <span className="small muted">{o.route}</span>
                </td>
                <td>
                  <strong>{fmtMins(o.minutes[0], o.minutes[1])}</strong>
                </td>
                <td>{fmtLocal(o.cost[0], o.cost[1])}</td>
                <td className="muted">{range(o.cost[0], o.cost[1])}</td>
                <td className="small">
                  {o.frequency}
                  <br />
                  <span className="muted">{o.hours}</span>
                </td>
                <td className="small">
                  {o.bestFor}
                  {o.watchOut && (
                    <>
                      <br />
                      <span className="muted">⚠ {o.watchOut}</span>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid only-narrow">
        {a.options.map((o) => (
          <article className="card" key={o.mode}>
            <div className="fact-head">
              <span className={`pill ${KIND_PILL[o.kind]}`}>{o.kind}</span>
              {o.recommended && <span className="pill pill-good">pick this</span>}
            </div>
            <h3 style={{ marginTop: 6, marginBottom: 2 }}>
              {o.icon} {o.mode}
            </h3>
            <p className="small muted" style={{ margin: 0 }}>
              {o.route}
            </p>
            <div className="metrics" style={{ marginTop: 10 }}>
              <div className="metric">
                <div className="k">Time</div>
                <div className="v">{fmtMins(o.minutes[0], o.minutes[1])}</div>
              </div>
              <div className="metric">
                <div className="k">Cost</div>
                <div className="v">{fmtLocal(o.cost[0], o.cost[1])}</div>
                <div className="small muted">{range(o.cost[0], o.cost[1])}</div>
              </div>
            </div>
            <p className="small muted" style={{ marginTop: 8, marginBottom: 6 }}>
              {o.frequency} · {o.hours}
            </p>
            <p className="fact-detail" style={{ marginBottom: o.watchOut ? 6 : 0 }}>
              {o.bestFor}
            </p>
            {o.watchOut && (
              <p className="small muted" style={{ margin: 0 }}>
                ⚠ {o.watchOut}
              </p>
            )}
          </article>
        ))}
      </div>

      {a.secondAirport && (
        <>
          <h2 className="section-title">The other airport</h2>
          <div className="callout">
            <strong>
              {a.secondAirport.name} ({a.secondAirport.code})
            </strong>
            {a.secondAirport.note}
          </div>
        </>
      )}

      <h2 className="section-title">How to choose, in general</h2>
      <div className="grid">
        <article className="card">
          <h3>Take the train when</h3>
          <ul className="bullets">
            <li>You are travelling with one bag each and can handle a short walk at the other end.</li>
            <li>You are arriving between roughly 06:00 and 22:00, when frequencies are good.</li>
            <li>It is rush hour — rail is immune to the traffic that makes road transfers unpredictable.</li>
          </ul>
        </article>
        <article className="card">
          <h3>Take a taxi when</h3>
          <ul className="bullets">
            <li>There are three or more of you; per head it closes most of the gap.</li>
            <li>You land after the last train, which is before midnight in all three cities.</li>
            <li>You have more luggage than hands, or your hotel is far from a station.</li>
          </ul>
        </article>
        <article className="card">
          <h3>Take the bus when</h3>
          <ul className="bullets">
            <li>You want a door-to-door drop at a hotel district, which the Seoul limousine buses do well.</li>
            <li>You are on the cheapest possible budget and time is not scarce.</li>
            <li>You arrive overnight — the night buses run when nothing else does.</li>
          </ul>
        </article>
      </div>

      <p className="status">
        Times are door-to-platform-to-destination ranges, not scheduled running times, and assume you
        clear immigration first — budget another 30–60 minutes for that on arrival. Fares are approximate
        and change; treat every number here as{" "}
        <span className="pill pill-warn">verify</span> before relying on it.
        <br />
        USD conversion {isLive ? "uses the live rate from the Currency tab" : `uses an approximate fallback rate of ${a.fallbackRate} ${c.currency} per USD`}.
      </p>
    </section>
  );
}
