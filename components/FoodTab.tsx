"use client";

import { useState } from "react";
import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { foodFor } from "@/lib/food";
import { Dismissible, DismissibleItem, DismissBar } from "./Dismissible";

export default function FoodTab() {
  const { city } = useCity();
  const [mustTryOnly, setMustTryOnly] = useState(false);
  const f = foodFor(city);
  const c = cityById(city);
  const dishes = mustTryOnly ? f.dishes.filter((d) => d.mustTry) : f.dishes;

  return (
    <section>
      <p className="lede">
        What to eat and — more usefully — how ordering actually works. The mechanics differ sharply
        between the three cities, and that is where visitors get stuck, not the food itself.
      </p>

      <div className="callout" style={{ borderLeft: `4px solid ${c.accent}` }}>
        <strong>
          {c.flag} {c.name} — the thing to know
        </strong>
        {f.keyMechanic}
      </div>

      <p className="muted">{f.summary}</p>

      <h2 className="section-title">What to order</h2>
      <div className="converter">
        <button className="btn" onClick={() => setMustTryOnly(!mustTryOnly)}>
          {mustTryOnly ? "Show all dishes" : "Show shortlist only"}
        </button>
        <span className="small muted" style={{ alignSelf: "center" }}>
          Showing {dishes.length} of {f.dishes.length}. Point at the characters if the words fail.
        </span>
      </div>

      <DismissBar scope={`food-dishes-${city}`} noun="dishes" />
      <div className="grid">
        {dishes.map((d) => (
          <Dismissible scope={`food-dishes-${city}`} itemKey={d.en} kind="been" key={d.en}>
          <article className="card">
            <div className="fact-head" style={{ marginBottom: 2 }}>
              <span className="eyebrow" style={{ marginBottom: 0 }}>
                {d.en}
              </span>
              {d.mustTry && <span className="pill pill-brand">shortlist</span>}
            </div>
            <div className="phrase-local" lang={city === "seoul" ? "ko" : "zh-Hant"}>
              {d.local}
            </div>
            <div className="roman-line">{d.roman}</div>
            <p className="fact-detail" style={{ marginTop: 8 }}>
              {d.what}
            </p>
            <p className="small muted" style={{ margin: 0 }}>
              Typically {d.price}
            </p>
          </article>
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">How to order</h2>
      <DismissBar scope={`food-order-${city}`} noun="tips" />
      <div className="card">
        <ul className="factlist">
          {f.ordering.map((r) => (
            <DismissibleItem scope={`food-order-${city}`} itemKey={r.title} key={r.title}>
              <span className="fact-label">{r.title}</span>
              <br />
              <span className="fact-detail">{r.detail}</span>
            </DismissibleItem>
          ))}
        </ul>
      </div>

      <h2 className="section-title">Practicalities</h2>
      <div className="grid">
        <article className="card">
          <h3>Meal times</h3>
          <p className="fact-detail" style={{ marginBottom: 0 }}>
            {f.mealTimes}
          </p>
        </article>
        <article className="card">
          <h3>What it costs</h3>
          <p className="fact-detail" style={{ marginBottom: 0 }}>
            {f.budget}
          </p>
        </article>
        <article className="card">
          <h3>Drinking</h3>
          <p className="fact-detail" style={{ marginBottom: 0 }}>
            {f.drinks}
          </p>
        </article>
        <article className="card">
          <h3>Vegetarian</h3>
          <p className="fact-detail" style={{ marginBottom: 0 }}>
            {f.vegetarian}
          </p>
        </article>
      </div>
    </section>
  );
}
