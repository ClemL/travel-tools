"use client";

import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { plannerFor } from "@/lib/neighborhoods";
import { DismissBar, Dismissible } from "./Dismissible";

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

      <DismissBar scope={`nb-tips-${city}`} noun="tips" />
      <Dismissible scope={`nb-tips-${city}`} itemKey={`nb-rule-${city}`}>
        <div className="callout" style={{ borderLeft: `4px solid ${c.accent}` }}>
          <strong>
            {c.flag} {c.name} — the planning rule
          </strong>
          {p.planningRule}
        </div>
      </Dismissible>

      <p className="muted">{p.geography}</p>

      <h2 className="section-title">Day plans</h2>
      <DismissBar scope={`nb-days-${city}`} noun="day plans" />
      <div className="grid">
        {p.days.map((d) => (
          <Dismissible scope={`nb-days-${city}`} itemKey={d.title} kind="been" key={d.title}>
          <article className="card card-accent" style={{ ["--accent" as string]: c.accent }}>
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
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">Day trips</h2>
      <p className="muted small" style={{ marginTop: -4 }}>
        Worth leaving the city for, with how long each actually takes door to door.
      </p>
      <DismissBar scope={`nb-trips-${city}`} noun="day trips" />
      <div className="grid">
        {p.dayTrips.map((t) => (
          <Dismissible scope={`nb-trips-${city}`} itemKey={t.name} kind="been" key={t.name}>
            <article className="card">
              <div className="eyebrow">
                {t.travel} · {t.duration}
              </div>
              <h3 style={{ marginBottom: 2 }}>{t.name}</h3>
              {t.local && (
                <div className="roman-line" lang={city === "seoul" ? "ko" : "zh-Hant"}>
                  {t.local}
                </div>
              )}
              <p className="fact-detail" style={{ marginTop: 8 }}>
                {t.what}
              </p>
              <div className="eyebrow" style={{ marginTop: 8 }}>
                Worth it?
              </div>
              <p className="fact-detail" style={{ marginBottom: t.septemberNote ? 8 : 0 }}>
                {t.worthIt}
              </p>
              {t.septemberNote && (
                <p className="small" style={{ margin: 0, color: "var(--warn)" }}>
                  September: {t.septemberNote}
                </p>
              )}
            </article>
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">Closure traps</h2>
      <DismissBar scope={`nb-traps-${city}`} noun="traps" />
      <div className="grid">
        {traps.map((t) => (
          <Dismissible scope={`nb-traps-${city}`} itemKey={t.place} key={t.place}>
          <article className="card card-accent" style={{ ["--accent" as string]: "#b3261e" }}>
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
          </Dismissible>
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
      <Dismissible scope={`nb-tips-${city}`} itemKey={`nb-rain-${city}`}>
        <div className="callout">
          <strong>Indoor fallbacks</strong>
          {p.rainPlan}
        </div>
      </Dismissible>

      <h2 className="section-title">Neighborhoods</h2>
      <DismissBar scope={`nb-areas-${city}`} noun="neighborhoods" />
      <div className="grid">
        {p.neighborhoods.map((n) => (
          <Dismissible scope={`nb-areas-${city}`} itemKey={n.name} kind="been" key={n.name}>
          <article className="card">
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
          </Dismissible>
        ))}
      </div>
    </section>
  );
}
