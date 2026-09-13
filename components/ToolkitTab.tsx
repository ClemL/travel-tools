"use client";

import { cityById } from "@/lib/cities";
import { POWER, ENTRY, EMERGENCY, APPS, HOLIDAYS, PACKING, SAFETY, JETLAG, LOGISTICS } from "@/lib/toolkit";
import { Dismissible, DismissibleItem, DismissBar } from "./Dismissible";

const PACK_CATEGORIES = ["Weather", "Power & tech", "Documents", "Health", "Comfort"] as const;

export default function ToolkitTab() {
  return (
    <section>
      <p className="lede">
        The logistics that do not fit anywhere else: sockets, entry paperwork, emergency numbers, the
        apps worth installing before you fly, the holidays that fall during this trip, and a packing list
        built specifically for a September itinerary across these three cities.
      </p>

      <h2 className="section-title">Power &amp; plugs</h2>
      <div className="grid">
        {POWER.map((p) => {
          const c = cityById(p.city);
          return (
            <article className="card card-accent" key={p.city} style={{ ["--accent" as string]: c.accent }}>
              <div className="eyebrow">
                {c.flag} {c.name}
              </div>
              <h3>
                {p.voltage} · {p.frequency} · {p.plugs}
              </h3>
              <p style={{ margin: "6px 0" }}>
                {p.adapterNeeded ? (
                  <span className="pill pill-warn">Adapter required</span>
                ) : (
                  <span className="pill pill-good">No adapter needed</span>
                )}
              </p>
              <p className="fact-detail">{p.note}</p>
            </article>
          );
        })}
      </div>
      <DismissBar scope="kit-tips" noun="tips" />
      <Dismissible scope="kit-tips" itemKey="One adapter will not cover the trip">
      <div className="callout">
        <strong>One adapter will not cover the trip</strong>
        Taipei uses US sockets, Hong Kong uses the British 3-pin, and Seoul uses the round European
        2-pin. Carry a single universal adapter rather than assembling a collection, and check that your
        chargers are rated 100-240 V — nearly all laptop and phone bricks are, but hair tools and shavers
        frequently are not.
      </div>
      </Dismissible>

      <h2 className="section-title">Entry &amp; documents</h2>
      <div className="callout callout-warn">
        <strong>Reconfirm every line of this section before you fly</strong>
        Entry requirements across all three destinations have changed repeatedly since 2023 —
        electronic arrival cards, K-ETA exemptions, and onward-ticket enforcement in particular. Treat
        the table below as a checklist of what to verify, not as authority. The official links are the
        authority.
      </div>
      <div className="grid">
        {ENTRY.map((e) => {
          const c = cityById(e.city);
          return (
            <article className="card" key={e.city}>
              <div className="eyebrow">
                {c.flag} {c.country}
              </div>
              <h3>{e.visa}</h3>
              <ul className="factlist" style={{ marginTop: 10 }}>
                <li>
                  <div className="fact-head">
                    <span className="fact-label">Length of stay</span>
                    <span className="fact-value">{e.stay}</span>
                  </div>
                </li>
                <li>
                  <div className="fact-head">
                    <span className="fact-label">Arrival card</span>
                  </div>
                  <span className="fact-detail">{e.arrivalCard}</span>
                </li>
                <li>
                  <div className="fact-head">
                    <span className="fact-label">Passport</span>
                  </div>
                  <span className="fact-detail">{e.passportRule}</span>
                </li>
              </ul>
              <p style={{ marginBottom: 0, marginTop: 12 }}>
                <a href={e.officialUrl} target="_blank" rel="noreferrer noopener">
                  {e.officialLabel} →
                </a>
              </p>
            </article>
          );
        })}
      </div>

      <h2 className="section-title">Emergency numbers</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Police</th>
              <th>Medical / fire</th>
              <th>Tourist hotline</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {EMERGENCY.map((e) => {
              const c = cityById(e.city);
              return (
                <tr key={e.city}>
                  <td>
                    <strong>
                      {c.flag} {c.name}
                    </strong>
                  </td>
                  <td>
                    <strong>{e.police}</strong>
                  </td>
                  <td>
                    <strong>{e.medical}</strong>
                  </td>
                  <td>
                    <strong>{e.touristHotline}</strong>
                    <br />
                    <span className="small muted">{e.touristHotlineNote}</span>
                  </td>
                  <td className="small">
                    {e.extra}
                    <br />
                    <span className="muted">{e.usMission}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="status">
        The numbers are not consistent across the three: 110 is police in Taiwan but does nothing in
        Korea, where police is 112. Save all of them in your phone before you go.
      </p>

      <h2 className="section-title">Apps to install before you fly</h2>
      <div className="grid">
        {(["all", "taipei", "hongkong", "seoul"] as const).map((scope) => {
          const items = APPS.filter((a) => a.city === scope);
          if (items.length === 0) return null;
          const label =
            scope === "all"
              ? "🌏 All three cities"
              : `${cityById(scope).flag} ${cityById(scope).name}`;
          return (
            <article className="card" key={scope}>
              <h3>{label}</h3>
              <ul className="factlist" style={{ marginTop: 10 }}>
                {items.map((a) => (
                  <li key={a.name}>
                    <div className="fact-head">
                      <span className="fact-label">{a.name}</span>
                      {a.priority === "essential" && (
                        <span className="pill pill-brand">essential</span>
                      )}
                    </div>
                    <span className="fact-detail">{a.purpose}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <h2 className="section-title">Holidays during your window</h2>
      <Dismissible scope="kit-tips" itemKey="Mid-Autumn Festival and Chuseok both fall in late September 2026">
      <div className="callout callout-warn">
        <strong>Mid-Autumn Festival and Chuseok both fall in late September 2026</strong>
        This is the single biggest scheduling factor of the trip. All three destinations observe the same
        lunar date, so you get overlapping public holidays across Taiwan, Hong Kong and Korea within the
        same week. Intercity transport sells out, small businesses close, and hotel rates rise.
      </div>
      </Dismissible>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Holiday</th>
              <th>Where</th>
              <th>What it means for you</th>
            </tr>
          </thead>
          <tbody>
            {HOLIDAYS.map((h) => (
              <tr key={`${h.date}-${h.where}`}>
                <td>
                  <strong>{h.date}</strong>
                  <br />
                  <span className="small muted">{h.weekday}</span>
                </td>
                <td>
                  {h.name}
                  {h.confidence === "verify" && (
                    <>
                      {" "}
                      <span className="pill pill-warn">verify</span>
                    </>
                  )}
                </td>
                <td>{h.where}</td>
                <td className="small">{h.impact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="status">
        Lunar-calendar dates and substitute-holiday rules shift; rows marked verify depend on
        legislation or weekend-substitution rules that should be confirmed against each
        government&apos;s official calendar before you book.
      </p>

      <h2 className="section-title">Packing list for this specific trip</h2>
      <DismissBar scope="kit-pack" noun="items" />
      <div className="grid">
        {PACK_CATEGORIES.map((cat) => {
          const items = PACKING.filter((p) => p.category === cat);
          return (
            <article className="card" key={cat}>
              <h3>{cat}</h3>
              <ul className="factlist" style={{ marginTop: 10 }}>
                {items.map((p) => (
                  <DismissibleItem scope="kit-pack" itemKey={p.item} key={p.item}>
                    <span className="fact-label">{p.item}</span>
                    <br />
                    <span className="fact-detail">{p.why}</span>
                  </DismissibleItem>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <h2 className="section-title">Jet lag</h2>
      <div className="callout">
        <strong>A 12-hour shift is the theoretical maximum</strong>
        Boston to Taipei and Hong Kong is 12 hours; Seoul is 13. There is no worse case, and at exactly
        12 hours the direction your body drifts becomes ambiguous — which is why the plan below is about
        forcing a direction with light and meal timing rather than just enduring it. General guidance,
        not medical advice.
      </div>
      <DismissBar scope="kit-jetlag" noun="steps" />
      <div className="grid">
        {JETLAG.map((j) => (
          <Dismissible scope="kit-jetlag" itemKey={j.when} key={j.when}>
            <article className="card">
              <div className="eyebrow">{j.when}</div>
              <h3 style={{ fontSize: "1rem", marginBottom: 6 }}>{j.action}</h3>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                {j.why}
              </p>
            </article>
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">Luggage, laundry &amp; logistics</h2>
      <DismissBar scope="kit-logistics" noun="notes" />
      <div className="grid">
        {LOGISTICS.map((l) => (
          <Dismissible scope="kit-logistics" itemKey={l.title} key={l.title}>
            <article className="card">
              {l.city !== "all" && (
                <div className="eyebrow">{cityById(l.city).flag} {cityById(l.city).name}</div>
              )}
              <h3 style={{ fontSize: "1rem" }}>{l.title}</h3>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                {l.body}
              </p>
            </article>
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">Safety, health &amp; contingency</h2>
      <DismissBar scope="kit-safety" noun="tips" />
      <div className="grid">
        {SAFETY.map((s) => (
          <Dismissible scope="kit-safety" itemKey={s.title} key={s.title}>
            <article className="card">
              <h3>{s.title}</h3>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                {s.body}
              </p>
            </article>
          </Dismissible>
        ))}
      </div>
    </section>
  );
}
