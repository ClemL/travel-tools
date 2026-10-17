"use client";

import { useMemo, useState } from "react";
import { cityById } from "@/lib/cities";
import { useCity, CompareToggle } from "./CityProvider";
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
  const { visible } = useCity();
  const inView = (id: string) => visible.some((v) => v.id === id);
  // Clothing scales are country-specific; only show the columns in view.
  const showKorea = inView("seoul");
  const showTaiwanHk = inView("taipei") || inView("hongkong");
  const showMainland = inView("shenzhen");
  const taiwanHkLabel = [inView("taipei") && "Taiwan", inView("hongkong") && "Hong Kong"]
    .filter(Boolean)
    .join(" & ");
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
        Sizing conventions differ enough from the US to waste an afternoon. Korea labels shoes in
        millimetres, Korean and mainland Chinese clothing use their own numeric scales, and everything
        across the region runs smaller than the US equivalent.
      </p>

      <div className="converter">
        <CompareToggle />
      </div>

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
          {/* Lead with the convention actually used where you are. */}
          {showKorea && (
            <article className="card card-accent" style={{ ["--accent" as string]: "#4361ee" }}>
              <div className="eyebrow">🇰🇷 Korea — ask for this number</div>
              <div className="rate-big">{match.mm} mm</div>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                Korean shoe boxes and labels show foot length in millimetres. Each half size is 5 mm. Say
                the number — &quot;이백칠십&quot; (270) — and staff will understand immediately.
              </p>
            </article>
          )}
          {showMainland && (
            <article className={`card${showKorea ? "" : " card-accent"}`} style={{ ["--accent" as string]: "#b5179e" }}>
              <div className="eyebrow">🇨🇳 Mainland China — EU number or mm</div>
              <div className="rate-big" style={{ fontSize: "1.4rem" }}>
                {Math.round(match.eu)}码 · {match.mm} mm
              </div>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                Mainland shops size shoes with EU-style numbers, said with 码 (mǎ) — EU {match.eu} is
                &quot;{Math.round(match.eu)}码&quot; — and some brands print the millimetre figure. Half
                sizes are uncommon, so try both neighbours.
              </p>
            </article>
          )}
          {showTaiwanHk && (
            <article className={`card${showKorea || showMainland ? "" : " card-accent"}`} style={{ ["--accent" as string]: "#e4572e" }}>
              <div className="eyebrow">{taiwanHkLabel} — US, EU or UK</div>
              <div className="rate-big" style={{ fontSize: "1.4rem" }}>
                US {match.us} · EU {match.eu} · UK {match.uk}
              </div>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                Shoes are labelled in US, EU or UK numbers depending on the brand, and international
                chains use the same US sizing you are used to. Some stock also carries the millimetre
                figure — {match.mm} mm for this size.
              </p>
            </article>
          )}
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
              {showKorea && <th>Korea</th>}
              {showTaiwanHk && <th>Taiwan / Hong Kong</th>}
              {showMainland && <th>Mainland China</th>}
              {gender === "mens" && <th>Chest</th>}
            </tr>
          </thead>
          <tbody>
            {tops.map((row) => (
              <tr key={row.us}>
                <td>
                  <strong>{row.us}</strong>
                </td>
                {showKorea && <td>{row.korea}</td>}
                {showTaiwanHk && <td>{row.taiwanHk}</td>}
                {showMainland && <td>{row.china}</td>}
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
            {TAX_REFUNDS.filter((t) => inView(t.city)).map((t) => {
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
        {visible.map((c) => {
          const id = c.id;
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
