"use client";

import { useState } from "react";
import CitySwitch from "./CitySwitch";
import { CITIES, cityById, type CityId } from "@/lib/cities";
import { ESSENTIALS, essentialsFor, type Fact } from "@/lib/essentials";

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
  const [city, setCity] = useState<CityId>("taipei");
  const e = essentialsFor(city);
  const c = cityById(city);

  return (
    <section>
      <p className="lede">
        The practical rules: whether to tip, how to pay for transit, and whether your phone and cards are
        enough. The answers differ meaningfully across the three cities, which is the main way visitors
        get caught out.
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
            <tr>
              <td>
                <strong>🇹🇼 Taipei</strong>
              </td>
              <td>
                <span className="pill pill-good">No</span> 10% service charge is added at sit-down
                restaurants; nothing beyond it.
              </td>
              <td>
                <strong>Yes — EasyCard.</strong> NT$100 card fee, sold at every MRT station and 7-Eleven.
              </td>
              <td>
                <span className="pill pill-bad">Not reliably.</span> EasyCard&apos;s phone wallet is
                effectively Taiwan-device only, and contactless bank cards are not universally accepted
                at MRT gates. Buy the plastic card.
              </td>
            </tr>
            <tr>
              <td>
                <strong>🇭🇰 Hong Kong</strong>
              </td>
              <td>
                <span className="pill pill-warn">Barely</span> 10% service charge is standard; leaving
                the coin change is normal.
              </td>
              <td>
                <strong>Recommended — Octopus.</strong> Needed for ferries, minibuses, markets and small
                shops.
              </td>
              <td>
                <span className="pill pill-good">On the MTR, yes.</span> The MTR accepts contactless
                Visa, Mastercard, Amex and UnionPay at the gates. Octopus still wins outside the subway.
              </td>
            </tr>
            <tr>
              <td>
                <strong>🇰🇷 Seoul</strong>
              </td>
              <td>
                <span className="pill pill-good">Never</span> Tipping is not a custom and staff may
                return the money to you.
              </td>
              <td>
                <strong>Yes — T-money.</strong> About ₩2,500-4,000 at any convenience store, topped up
                with cash.
              </td>
              <td>
                <span className="pill pill-bad">No.</span> Seoul subway gates do not take foreign
                contactless cards, and T-money cannot be provisioned to an overseas phone. This is the
                strictest of the three.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Full detail</h2>
      <CitySwitch value={city} onChange={setCity} />

      <div className="callout" style={{ borderLeft: `4px solid ${c.accent}` }}>
        <strong>
          {c.flag} {c.name} — tipping in one line
        </strong>
        {e.tipVerdict}
      </div>

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
          <ul className="bullets">
            {e.etiquette.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>

      <h2 className="section-title">Things that will cost you</h2>
      <div className="card">
        <ul className="bullets">
          {e.gotchas.map((g) => (
            <li key={g}>{g}</li>
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
