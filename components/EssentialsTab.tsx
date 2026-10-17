"use client";

import { useCity } from "./CityProvider";
import { CITIES, cityById } from "@/lib/cities";
import { ESSENTIALS, essentialsFor, type Fact, type QuickAnswer } from "@/lib/essentials";
import { DismissBar, Dismissible, DismissibleItem } from "./Dismissible";

const TONE_PILL: Record<QuickAnswer["tone"], string> = {
  good: "pill-good",
  warn: "pill-warn",
  bad: "pill-bad",
};

function FactList({ facts }: { facts: Fact[] }) {
  return (
    <ul className="factlist">
      {facts.map((f) => (
        <li key={f.label}>
          <div className="fact-head">
            <span className="fact-label">{f.label}</span>
            <span className="fact-value">{f.value}</span>
            {f.confidence === "verify" && <span className="pill pill-warn">verify</span>}
          </div>
          {f.detail && <span className="fact-detail">{f.detail}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function EssentialsTab() {
  const { city, ordered } = useCity();
  const e = essentialsFor(city);
  const c = cityById(city);

  return (
    <section>
      <p className="lede">
        The practical rules: whether to tip, how to pay for transit, and whether your phone and cards are
        enough. The answers differ meaningfully from city to city, which is the main way visitors get
        caught out.
      </p>

      <h2 className="section-title">The two questions, answered</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Do I tip?</th>
              <th>Transit card needed?</th>
              <th>Can I tap a US phone or card?</th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((oc) => {
              const q = essentialsFor(oc.id).quick;
              return (
                <tr key={oc.id}>
                  <td>
                    <strong>
                      {oc.flag} {oc.name}
                    </strong>
                  </td>
                  <td>
                    <span className={`pill ${TONE_PILL[q.tip.tone]}`}>{q.tip.verdict}</span> {q.tip.detail}
                  </td>
                  <td>
                    <strong>{q.card.lead}</strong> {q.card.detail}
                  </td>
                  <td>
                    <span className={`pill ${TONE_PILL[q.tap.tone]}`}>{q.tap.verdict}</span> {q.tap.detail}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Full detail</h2>
      <DismissBar scope={`basics-tipline-${city}`} noun="tips" />
      <Dismissible scope={`basics-tipline-${city}`} itemKey={`basics-tipline-${city}`}>
        <div className="callout" style={{ borderLeft: `4px solid ${c.accent}` }}>
          <strong>
            {c.flag} {c.name} — tipping in one line
          </strong>
          {e.tipVerdict}
        </div>
      </Dismissible>

      <div className="grid">
        <article className="card">
          <h3>Tipping</h3>
          <FactList facts={e.tipping} />
        </article>

        <article className="card">
          <h3>Transit &amp; getting around</h3>
          <FactList facts={e.transit} />
        </article>

        <article className="card">
          <h3>Money &amp; payments</h3>
          <FactList facts={e.payments} />
        </article>

        <article className="card">
          <h3>Connectivity</h3>
          <FactList facts={e.connectivity} />
        </article>

        <article className="card">
          <h3>Airport transfer</h3>
          <FactList facts={e.airport} />
        </article>

        <article className="card">
          <h3>Etiquette that actually matters</h3>
          <DismissBar scope={`basics-etiquette-${city}`} noun="tips" />
          <ul className="bullets">
            {e.etiquette.map((item) => (
              <DismissibleItem scope={`basics-etiquette-${city}`} itemKey={item} key={item}>
                {item}
              </DismissibleItem>
            ))}
          </ul>
        </article>
      </div>

      <h2 className="section-title">Things that will cost you</h2>
      <DismissBar scope={`basics-gotchas-${city}`} noun="tips" />
      <div className="card">
        <ul className="bullets">
          {e.gotchas.map((g) => (
            <DismissibleItem scope={`basics-gotchas-${city}`} itemKey={g} key={g}>
              {g}
            </DismissibleItem>
          ))}
        </ul>
      </div>

      <p className="status" style={{ marginTop: 16 }}>
        Items marked <span className="pill pill-warn">verify</span> are policies that have changed within
        the last few years — fares, card products, refund thresholds and wallet support. Reconfirm those
        specifically before you rely on them. Covers {ESSENTIALS.length} of{" "}
        {CITIES.length} cities in full.
      </p>
    </section>
  );
}
