"use client";

import { useState } from "react";
import { cityById } from "@/lib/cities";
import { useCity, CompareToggle } from "./CityProvider";
import { CLIMATE } from "@/lib/climate";
import { cToF, mmToIn } from "@/lib/format";
import { DismissBar, Dismissible, DismissibleItem } from "./Dismissible";

type Unit = "F" | "C";

function riskPill(risk: "High" | "Moderate" | "Low") {
  const cls = risk === "High" ? "pill-bad" : risk === "Moderate" ? "pill-warn" : "pill-good";
  return <span className={`pill ${cls}`}>{risk} typhoon risk</span>;
}

export default function ClimateTab() {
  const [unit, setUnit] = useState<Unit>("F");
  const { visible, compareAll } = useCity();
  // Only the climate profiles for the cities currently in view.
  const shown = CLIMATE.filter((c) => visible.some((v) => v.id === c.city));
  const t = (c: number) => (unit === "F" ? `${Math.round(cToF(c))}°F` : `${c.toFixed(1)}°C`);
  // Sequencing advice only applies when the comparison mixes shutdown-risk cities with safer ones.
  const names = (list: typeof shown) => {
    const n = list.map((c) => cityById(c.city).name);
    return n.length < 3 ? n.join(" and ") : `${n.slice(0, -1).join(", ")} and ${n[n.length - 1]}`;
  };
  const risky = shown.filter((c) => c.typhoonRisk === "High");
  const safer = shown.filter((c) => c.typhoonRisk !== "High");

  return (
    <section>
      <p className="lede">
        {compareAll
          ? `What September actually looks like in each city, based on 1991-2020 climatological normals from the national meteorological agencies. The short version: ${shown
              .map((c) => `${cityById(c.city).name}: ${c.headline}`)
              .join(" ")}`
          : `What September actually looks like in ${shown[0]?.headline ? cityById(shown[0].city).name : "this city"}, based on 1991-2020 climatological normals from the national meteorological agency.`}
      </p>

      <div className="converter">
        <button className="btn" onClick={() => setUnit(unit === "F" ? "C" : "F")}>
          Show °{unit === "F" ? "C" : "F"}
        </button>
        <CompareToggle />
      </div>

      <h2 className="section-title">{compareAll ? "Side by side" : "September normals"}</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>September normal</th>
              {shown.map((c) => (
                <th key={c.city}>
                  {cityById(c.city).flag} {cityById(c.city).name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Average high</td>
              {shown.map((c) => (
                <td key={c.city}>
                  <strong>{t(c.meanHighC)}</strong>
                </td>
              ))}
            </tr>
            <tr>
              <td>Average low</td>
              {shown.map((c) => (
                <td key={c.city}>{t(c.meanLowC)}</td>
              ))}
            </tr>
            <tr>
              <td>Monthly rainfall</td>
              {shown.map((c) => (
                <td key={c.city}>
                  {unit === "F"
                    ? `${mmToIn(c.rainfallMm).toFixed(1)} in`
                    : `${c.rainfallMm} mm`}
                </td>
              ))}
            </tr>
            <tr>
              <td>Rainy days</td>
              {shown.map((c) => (
                <td key={c.city}>{c.rainDays} of 30</td>
              ))}
            </tr>
            <tr>
              <td>Relative humidity</td>
              {shown.map((c) => (
                <td key={c.city}>{c.humidityPct}%</td>
              ))}
            </tr>
            <tr>
              <td>Sunshine</td>
              {shown.map((c) => (
                <td key={c.city}>~{c.sunshineHours} h</td>
              ))}
            </tr>
            <tr>
              <td>Sea temperature</td>
              {shown.map((c) => (
                <td key={c.city}>{c.seaTempC ? t(c.seaTempC) : "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Typhoon risk</td>
              {shown.map((c) => (
                <td key={c.city}>{riskPill(c.typhoonRisk)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="status" style={{ marginTop: 8 }}>
        Normals are approximate station averages, not forecasts. Any individual September can deviate
        substantially, particularly for rainfall, which is dominated by whether a typhoon passes.
      </p>

      <h2 className="section-title">City by city</h2>
      <div className="grid">
        {shown.map((c) => {
          const city = cityById(c.city);
          return (
            <article className="card card-accent" key={c.city} style={{ ["--accent" as string]: city.accent }}>
              <div className="eyebrow">
                {city.flag} {city.name}
              </div>
              <h3 style={{ marginBottom: 8 }}>{c.headline}</h3>

              <div className="metrics" style={{ marginBottom: 12 }}>
                <div className="metric">
                  <div className="k">High / Low</div>
                  <div className="v">
                    {t(c.meanHighC)} / {t(c.meanLowC)}
                  </div>
                </div>
                <div className="metric">
                  <div className="k">Rain</div>
                  <div className="v">
                    {unit === "F" ? `${mmToIn(c.rainfallMm).toFixed(1)}"` : `${c.rainfallMm} mm`}
                  </div>
                </div>
                <div className="metric">
                  <div className="k">Humidity</div>
                  <div className="v">{c.humidityPct}%</div>
                </div>
              </div>

              <div className="eyebrow">Early vs. late September</div>
              <p className="fact-detail">{c.earlyVsLate}</p>

              <div className="eyebrow" style={{ marginTop: 10 }}>
                How it feels
              </div>
              <p className="fact-detail">{c.feelsLike}</p>

              <div className="eyebrow" style={{ marginTop: 10 }}>
                Typhoon outlook
              </div>
              <p className="fact-detail">{c.typhoonNote}</p>

              <div className="eyebrow" style={{ marginTop: 10 }}>
                What to wear
              </div>
              <ul className="bullets small">
                {c.wear.map((w) => (
                  <DismissibleItem scope={`clim-${c.city}`} itemKey={w} key={w}>{w}</DismissibleItem>
                ))}
              </ul>

              <div className="eyebrow" style={{ marginTop: 10 }}>
                Pack specifically for this city
              </div>
              <ul className="bullets small">
                {c.pack.map((p) => (
                  <DismissibleItem scope={`clim-${c.city}`} itemKey={p} key={p}>{p}</DismissibleItem>
                ))}
              </ul>

              <div className="eyebrow" style={{ marginTop: 10 }}>
                Watch out
              </div>
              <ul className="bullets small">
                {c.watchOut.map((w) => (
                  <DismissibleItem scope={`clim-${c.city}`} itemKey={w} key={w}>{w}</DismissibleItem>
                ))}
              </ul>
              <DismissBar scope={`clim-${c.city}`} noun="tips" />

              <p className="status" style={{ marginTop: 12, marginBottom: 0 }}>
                {c.daylight}
                <br />
                Source:{" "}
                <a href={c.sourceUrl} target="_blank" rel="noreferrer noopener">
                  {c.source}
                </a>
              </p>
            </article>
          );
        })}
      </div>

      {compareAll && risky.length > 0 && safer.length > 0 && (
        <>
      <h2 className="section-title">The one decision September forces</h2>
      <DismissBar scope="clim-tips" noun="tips" />
      <Dismissible scope="clim-tips" itemKey="Sequence the trip so weather risk falls early, not late">
      <div className="callout callout-warn">
        <strong>Sequence the trip so weather risk falls early, not late</strong>
        {names(risky)} {risky.length === 1 ? "carries" : "carry"} real shutdown risk in September;{" "}
        {names(safer)} {safer.length === 1 ? "does" : "do"} not. If your itinerary is flexible, put{" "}
        {names(risky)} at the front and {names(safer)} at the end. A typhoon day lost in week one costs
        you a day of sightseeing. The same day lost on the way home costs you a missed transpacific
        flight, a rebooking fee, and a night in an airport hotel. Verify that every leg is on a
        refundable or same-alliance ticket before you lock the routing.
      </div>
      </Dismissible>
      <p className="muted small">
        The pattern generalizes across coastal East Asia, where September is consistently the
        highest-variance travel month of the year.
      </p>
        </>
      )}
    </section>
  );
}
