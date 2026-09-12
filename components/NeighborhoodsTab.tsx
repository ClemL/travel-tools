"use client";

import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { plannerFor } from "@/lib/neighborhoods";

export default function NeighborhoodsTab() {
  const { city } = useCity();
  const p = plannerFor(city);
  const c = cityById(city);

  const traps = p.closures.filter((x) => x.severity === "trap");
  const notes = p.closures.filter((x) => x.severity === "note");

  return (
    <section>
      <p className="lede">
        Which areas are worth pairing on a single day, how each city is actually shaped, and the closure
        traps that cost visitors a day. This is the knowledge that goes stale fastest if you have not been
        recently.
      </p>

      <div className="callout" style={{ borderLeft: `4px solid ${c.accent}` }}>
        <strong>
          {c.flag} {c.name} — the planning rule
        </strong>
        {p.planningRule}
      </div>

      <p className="muted">{p.geography}</p>

      <h2 className="section-title">Day plans</h2>
      <div className="grid">
        {p.days.map((d) => (
          <article className="card card-accent" key={d.title} style={{ ["--accent" as string]: c.accent }}>
            <div className="eyebrow">{d.areas.join(" + ")}</div>
            <h3>{d.title}</h3>
            <p className="fact-detail" style={{ marginTop: 6 }}>
              {d.shape}
            </p>
            <div className="eyebrow" style={{ marginTop: 10 }}>
              Timing
            </div>
            <p className="fact-detail">{d.timing}</p>
            {d.note && (
              <div className="callout small" style={{ marginTop: 10, marginBottom: 0 }}>
                {d.note}
              </div>
            )}
          </article>
        ))}
      </div>

      <h2 className="section-title">Closure traps</h2>
      <div className="grid">
        {traps.map((t) => (
          <article className="card card-accent" key={t.place} style={{ ["--accent" as string]: "#b3261e" }}>
            <div className="fact-head">
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                Closed {t.closed}
              </span>
              {t.confidence === "verify" && <span className="pill pill-warn">verify</span>}
            </div>
            <h3>{t.place}</h3>
            <p className="fact-detail" style={{ marginBottom: 0 }}>
              {t.detail}
            </p>
          </article>
        ))}
      </div>

      {notes.length > 0 && (
        <div className="card" style={{ marginTop: 14 }}>
          <h3>Also worth knowing</h3>
          <ul className="factlist" style={{ marginTop: 10 }}>
            {notes.map((n) => (
              <li key={n.place}>
                <div className="fact-head">
                  <span className="fact-label">{n.place}</span>
                  <span className="fact-value">{n.closed}</span>
                </div>
                <span className="fact-detail">{n.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="section-title">When it rains</h2>
      <div className="callout">
        <strong>Indoor fallbacks</strong>
        {p.rainPlan}
      </div>

      <h2 className="section-title">Neighborhoods</h2>
      <div className="grid">
        {p.neighborhoods.map((n) => (
          <article className="card" key={n.name}>
            <div className="eyebrow">{n.station}</div>
            <h3 style={{ marginBottom: 2 }}>{n.name}</h3>
            {n.local && (
              <div className="roman-line" lang={city === "seoul" ? "ko" : "zh-Hant"}>
                {n.local}
              </div>
            )}
            <p className="fact-detail" style={{ marginTop: 8 }}>
              {n.character}
            </p>
            <div className="chips">
              {n.bestFor.map((b) => (
                <span className="chip" key={b}>
                  {b}
                </span>
              ))}
            </div>
            <p className="small muted" style={{ marginTop: 10, marginBottom: 0 }}>
              Budget: {n.timeNeeded}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
