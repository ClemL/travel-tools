"use client";

import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { rankedCities, type ActivityProfile } from "@/lib/activities";

const RATING_PILL = {
  "World-class": "pill-good",
  Strong: "pill-brand",
  Limited: "pill-neutral",
} as const;

/**
 * Shared renderer for the climbing, gaming and golf tabs — they carry the same
 * shape of information, so they share one component rather than three copies.
 */
export default function ActivityTab({
  profiles,
  lede,
  verdict,
}: {
  profiles: ActivityProfile[];
  lede: string;
  verdict: { title: string; body: string };
}) {
  const { city } = useCity();
  // Ranked by scene quality, so the strongest city is always visible as a hint
  // even when the header selection points somewhere else.
  const best = cityById(rankedCities(profiles)[0]);
  const p = profiles.find((x) => x.city === city)!;
  const c = cityById(city);

  return (
    <section>
      <p className="lede">{lede}</p>

      <div className="callout callout-warn">
        <strong>{verdict.title}</strong>
        {verdict.body}
      </div>

      {best.id !== city && (
        <p className="muted small" style={{ marginTop: -8 }}>
          Strongest scene of the three: {best.flag} {best.name}. Switch cities in the header to see it.
        </p>
      )}

      <article className="card card-accent" style={{ ["--accent" as string]: c.accent, marginBottom: 16 }}>
        <div className="fact-head">
          <span className="eyebrow" style={{ marginBottom: 0 }}>
            {c.flag} {c.name}
          </span>
          <span className={`pill ${RATING_PILL[p.sceneRating]}`}>{p.sceneRating}</span>
        </div>
        <p className="fact-detail" style={{ marginTop: 8, marginBottom: 0 }}>
          {p.summary}
        </p>
      </article>

      <h2 className="section-title">How to find places</h2>
      <div className="card">
        <ul className="factlist">
          <li>
            <div className="fact-head">
              <span className="fact-label">Use</span>
              <span className="fact-value">{p.howToFind.app}</span>
            </div>
          </li>
          <li>
            <div className="fact-head">
              <span className="fact-label">Search for</span>
              <span className="fact-value">{p.howToFind.searchTerm}</span>
            </div>
          </li>
          <li>
            <span className="fact-detail">{p.howToFind.note}</span>
          </li>
        </ul>
      </div>

      <h2 className="section-title">Practical</h2>
      <div className="grid">
        {p.practical.map((item) => (
          <article className="card" key={item.label}>
            <div className="eyebrow">{item.label}</div>
            <h3 style={{ fontSize: "1rem" }}>{item.value}</h3>
            {item.detail && (
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                {item.detail}
              </p>
            )}
          </article>
        ))}
      </div>

      <h2 className="section-title">Starting points</h2>
      <p className="muted small" style={{ marginTop: -4 }}>
        Named venues open, close and move. Everything below is marked{" "}
        <span className="pill pill-warn">verify</span> — confirm on a map app before travelling across the
        city for one.
      </p>
      <div className="grid">
        {p.venues.map((v) => (
          <article className="card" key={v.name}>
            <div className="fact-head">
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {v.area}
              </span>
              <span className="pill pill-warn">verify</span>
            </div>
            <h3 style={{ marginBottom: 2 }}>{v.name}</h3>
            {v.local && <div className="roman-line">{v.local}</div>}
            <p className="fact-detail" style={{ marginTop: 8, marginBottom: v.price ? 6 : 0 }}>
              {v.what}
            </p>
            {v.price && (
              <p className="small muted" style={{ margin: 0 }}>
                {v.price}
              </p>
            )}
          </article>
        ))}
      </div>

      {p.etiquette && p.etiquette.length > 0 && (
        <>
          <h2 className="section-title">Etiquette</h2>
          <div className="card">
            <ul className="bullets">
              {p.etiquette.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
