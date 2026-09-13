"use client";

import { useMemo, useState } from "react";
import { cityById } from "@/lib/cities";
import {
  MENS_SHOES,
  WOMENS_SHOES,
  MENS_TOPS,
  WOMENS_TOPS,
  SIZING_NOTES,
  TAX_REFUNDS,
  SHOPPING,
  type ShoeRow,
} from "@/lib/sizing";
import { Dismissible, DismissibleItem, DismissBar } from "./Dismissible";

type Gender = "mens" | "womens";

export default function SizingTab() {
  const [gender, setGender] = useState<Gender>("mens");
  const [usShoe, setUsShoe] = useState<string>("9");

  const shoes: ShoeRow[] = gender === "mens" ? MENS_SHOES : WOMENS_SHOES;
  const tops = gender === "mens" ? MENS_TOPS : WOMENS_TOPS;

  const match = useMemo(() => {
    const target = Number(usShoe);
    if (!Number.isFinite(target)) return null;
    // Nearest listed size, so an out-of-range entry still gives a useful answer.
    return shoes.reduce((best, row) =>
      Math.abs(row.us - target) < Math.abs(best.us - target) ? row : best
    );
  }, [usShoe, shoes]);

  return (
    <section>
      <p className="lede">
        Sizing conventions differ enough across the three cities to waste an afternoon. Korea labels shoes
        in millimetres, Korean clothing uses its own numeric scales, and everything runs smaller than the
        US equivalent.
      </p>

      <div className="citytabs" role="group" aria-label="Sizing chart">
        <button aria-pressed={gender === "mens"} onClick={() => setGender("mens")}>
          Men&apos;s
        </button>
        <button aria-pressed={gender === "womens"} onClick={() => setGender("womens")}>
          Women&apos;s
        </button>
      </div>

      <h2 className="section-title">Shoe size converter</h2>
      <div className="converter">
        <div className="field">
          <label htmlFor="usShoe">Your US size</label>
          <input
            id="usShoe"
            type="number"
            inputMode="decimal"
            step="0.5"
            min="4"
            max="15"
            value={usShoe}
            onChange={(e) => setUsShoe(e.target.value)}
          />
        </div>
      </div>

      {match && (
        <div className="grid" style={{ marginBottom: 18 }}>
          <article className="card card-accent" style={{ ["--accent" as string]: "#4361ee" }}>
            <div className="eyebrow">🇰🇷 Korea — ask for this number</div>
            <div className="rate-big">{match.mm} mm</div>
            <p className="fact-detail" style={{ marginBottom: 0 }}>
              Korean shoe boxes and labels show foot length in millimetres. Each half size is 5 mm. Say the
              number — &quot;이백칠십&quot; (270) — and staff will understand immediately.
            </p>
          </article>
          <article className="card">
            <div className="eyebrow">Everywhere else</div>
            <div className="rate-big" style={{ fontSize: "1.4rem" }}>
              EU {match.eu} · UK {match.uk}
            </div>
            <p className="fact-detail" style={{ marginBottom: 0 }}>
              Taiwan and Hong Kong label shoes in US, EU or UK numbers depending on the brand. International
              chains use the same US sizing you are used to.
            </p>
          </article>
        </div>
      )}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>US</th>
              <th>Korea / Japan (mm)</th>
              <th>EU</th>
              <th>UK</th>
            </tr>
          </thead>
          <tbody>
            {shoes.map((row) => (
              <tr
                key={row.us}
                style={
                  match && row.us === match.us
                    ? { background: "var(--brand-soft)", fontWeight: 600 }
                    : undefined
                }
              >
                <td>{row.us}</td>
                <td>
                  <strong>{row.mm}</strong>
                </td>
                <td>{row.eu}</td>
                <td>{row.uk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Clothing</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>US</th>
              <th>Korea</th>
              <th>Taiwan / Hong Kong</th>
              {gender === "mens" && <th>Chest</th>}
            </tr>
          </thead>
          <tbody>
            {tops.map((row) => (
              <tr key={row.us}>
                <td>
                  <strong>{row.us}</strong>
                </td>
                <td>{row.korea}</td>
                <td>{row.taiwanHk}</td>
                {gender === "mens" && <td>{row.chestCm ?? "—"}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Before you buy anything</h2>
      <DismissBar scope="size-notes" noun="tips" />
      <div className="grid">
        {SIZING_NOTES.map((n) => (
          <Dismissible scope="size-notes" itemKey={n.title} key={n.title}>
          <article className={`card${n.severity === "warn" ? " card-accent" : ""}`} style={{ ["--accent" as string]: "#9a6200" }}>
            <div className="fact-head">
              <h3 style={{ marginBottom: 0 }}>{n.title}</h3>
              {n.severity === "warn" && <span className="pill pill-warn">important</span>}
            </div>
            <p className="fact-detail" style={{ marginTop: 6, marginBottom: 0 }}>
              {n.body}
            </p>
          </article>
          </Dismissible>
        ))}
      </div>

      <h2 className="section-title">Tax refunds</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>VAT</th>
              <th>Threshold</th>
              <th>How it works</th>
              <th>The catch</th>
            </tr>
          </thead>
          <tbody>
            {TAX_REFUNDS.map((t) => {
              const c = cityById(t.city);
              return (
                <tr key={t.city}>
                  <td>
                    <strong>
                      {c.flag} {c.name}
                    </strong>
                    {t.confidence === "verify" && (
                      <>
                        <br />
                        <span className="pill pill-warn">verify</span>
                      </>
                    )}
                  </td>
                  <td>
                    <strong>{t.vatRate}</strong>
                  </td>
                  <td className="small">{t.threshold}</td>
                  <td className="small">{t.mechanism}</td>
                  <td className="small">{t.catch}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Worth buying, and where</h2>
      <div className="grid">
        {(["taipei", "hongkong", "seoul"] as const).map((id) => {
          const c = cityById(id);
          const items = SHOPPING.filter((s) => s.city === id);
          return (
            <article className="card card-accent" key={id} style={{ ["--accent" as string]: c.accent }}>
              <div className="eyebrow">
                {c.flag} {c.name}
              </div>
              <ul className="factlist" style={{ marginTop: 10 }}>
                {items.map((s) => (
                  <DismissibleItem scope={`size-shop-${id}`} itemKey={s.what} kind="been" key={s.what}>
                    <span className="fact-label">{s.what}</span>
                    <br />
                    <span className="fact-value" style={{ fontSize: "0.85rem" }}>
                      {s.where}
                    </span>
                    <br />
                    <span className="fact-detail">{s.note}</span>
                  </DismissibleItem>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
