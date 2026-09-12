"use client";

import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { sceneFor, type ShopScene } from "@/lib/shops";

const RATING_PILL = {
  "World-class": "pill-good",
  Strong: "pill-brand",
  Limited: "pill-neutral",
} as const;

const PRICE_PILL = {
  Budget: "pill-good",
  Mid: "pill-brand",
  Premium: "pill-warn",
} as const;

/**
 * Shared renderer for the stationery and artisan tabs — same shape of
 * information, so one component rather than two near-identical copies.
 */
export default function ShopsTab({
  scenes,
  lede,
  districtHeading,
}: {
  scenes: ShopScene[];
  lede: string;
  districtHeading: string;
}) {
  const { city } = useCity();
  const s = sceneFor(scenes, city);
  const c = cityById(city);

  return (
    <section>
      <p className="lede">{lede}</p>

      <article className="card card-accent" style={{ ["--accent" as string]: c.accent, marginBottom: 16 }}>
        <div className="fact-head">
          <span className="eyebrow" style={{ marginBottom: 0 }}>
            {c.flag} {c.name}
          </span>
          <span className={`pill ${RATING_PILL[s.rating]}`}>{s.rating}</span>
        </div>
        <p className="fact-detail" style={{ marginTop: 8 }}>
          {s.summary}
        </p>
        <div className="eyebrow" style={{ marginTop: 10 }}>
          What this city does best
        </div>
        <p className="fact-detail" style={{ marginBottom: 0 }}>
          {s.signature}
        </p>
      </article>

      <h2 className="section-title">{districtHeading}</h2>
      <div className="grid">
        {s.district.map((d) => (
          <article className="card" key={d.name}>
            <h3 style={{ fontSize: "1rem" }}>{d.name}</h3>
            <p className="fact-detail" style={{ marginBottom: 0 }}>
              {d.why}
            </p>
          </article>
        ))}
      </div>

      <h2 className="section-title">Places to start</h2>
      <p className="muted small" style={{ marginTop: -4 }}>
        All marked <span className="pill pill-warn">verify</span> — shops move and close. Search{" "}
        <strong>{s.searchTerm}</strong> to find current options nearby.
      </p>
      <div className="grid">
        {s.shops.map((shop) => (
          <article className="card" key={shop.name}>
            <div className="fact-head">
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {shop.area}
              </span>
              {shop.price && <span className={`pill ${PRICE_PILL[shop.price]}`}>{shop.price}</span>}
            </div>
            <h3 style={{ marginTop: 4, marginBottom: 2 }}>{shop.name}</h3>
            {shop.local && (
              <div className="roman-line" lang={city === "seoul" ? "ko" : "zh-Hant"}>
                {shop.local}
              </div>
            )}
            <p className="fact-detail" style={{ marginTop: 8, marginBottom: 0 }}>
              {shop.what}
            </p>
          </article>
        ))}
      </div>

      <h2 className="section-title">Buying notes</h2>
      <div className="card">
        <ul className="bullets">
          {s.buying.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
