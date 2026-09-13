"use client";

import { useState } from "react";
import { CITIES, cityById } from "@/lib/cities";
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
  const t = (c: number) => (unit === "F" ? `${Math.round(cToF(c))}°F` : `${c.toFixed(1)}°C`);

  return (
    <section>
      <p className="lede">
        What September actually looks like in each city, based on 1991-2020 climatological normals from
        the national meteorological agencies. The short version: Taipei and Hong Kong are still in full
        summer and peak typhoon season, while Seoul is in the middle of the sharpest seasonal transition
        of its year.
      </p>

      <div className="converter">
        <button className="btn" onClick={() => setUnit(unit === "F" ? "C" : "F")}>
          Show °{unit === "F" ? "C" : "F"}
        </button>
      </div>

      <h2 className="section-title">Side by side</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>September normal</th>
              {CLIMATE.map((c) => (
                <th key={c.city}>
                  {cityById(c.city).flag} {cityById(c.city).name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Average high</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>
                  <strong>{t(c.meanHighC)}</strong>
                </td>
              ))}
            </tr>
            <tr>
              <td>Average low</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>{t(c.meanLowC)}</td>
              ))}
            </tr>
            <tr>
              <td>Monthly rainfall</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>
                  {unit === "F"
                    ? `${mmToIn(c.rainfallMm).toFixed(1)} in`
                    : `${c.rainfallMm} mm`}
                </td>
              ))}
            </tr>
            <tr>
              <td>Rainy days</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>{c.rainDays} of 30</td>
              ))}
            </tr>
            <tr>
              <td>Relative humidity</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>{c.humidityPct}%</td>
              ))}
            </tr>
            <tr>
              <td>Sunshine</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>~{c.sunshineHours} h</td>
              ))}
            </tr>
            <tr>
              <td>Sea temperature</td>
              {CLIMATE.map((c) => (
                <td key={c.city}>{c.seaTempC ? t(c.seaTempC) : "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Typhoon risk</td>
              {CLIMATE.map((c) => (
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
        {CLIMATE.map((c) => {
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

      <h2 className="section-title">The one decision September forces</h2>
      <DismissBar scope="clim-tips" noun="tips" />
      <Dismissible scope="clim-tips" itemKey="Sequence the trip so weather risk falls early, not late">
      <div className="callout callout-warn">
        <strong>Sequence the trip so weather risk falls early, not late</strong>
        Taipei and Hong Kong carry real shutdown risk in September; Seoul does not. If your itinerary is
        flexible, put Taipei and Hong Kong at the front and Seoul at the end. A typhoon day lost in week
        one costs you a day of sightseeing. The same day lost on the way home costs you a missed
        transpacific flight, a rebooking fee, and a night in an airport hotel. Verify that all three
        legs are on refundable or same-alliance tickets before you lock the routing.
      </div>
      </Dismissible>
      <p className="muted small">
        Only {CITIES.length} cities are covered here; the pattern generalizes across coastal East Asia,
        where September is consistently the highest-variance travel month of the year.
      </p>
    </section>
  );
}
