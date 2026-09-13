"use client";

import { cityById } from "@/lib/cities";
import { useCity } from "./CityProvider";
import { HKO_CODES, HK_LADDER, TYPHOON_BASICS, CONTINGENCY, type Severity } from "@/lib/alerts";
import { useApi, timeAgo } from "@/lib/useApi";
import { DismissibleItem, DismissBar } from "./Dismissible";

interface WatchDay {
  date: string;
  gustKmh: number;
  windKmh: number;
  rainMm: number;
  rainProb: number;
}

interface CityAlerts {
  city: string;
  watch: { days: WatchDay[]; peakGust: number; peakRain: number; level: "calm" | "elevated" | "high" } | null;
  officialWarnings: { code: string; name: string; issued?: string; source: string }[] | null;
  officialNote: string;
}

interface AlertsResponse {
  updated: string;
  sources: string[];
  cities: CityAlerts[];
}

const SEVERITY_PILL: Record<Severity, string> = {
  none: "pill-good",
  watch: "pill-warn",
  warning: "pill-warn",
  severe: "pill-bad",
};

const LEVEL_COPY = {
  calm: { pill: "pill-good", label: "Calm", text: "Nothing in the next five days of model output suggests disruptive wind or rain." },
  elevated: {
    pill: "pill-warn",
    label: "Elevated",
    text: "Model output shows gusts or rainfall well above normal. Check the official authority before committing to outdoor plans.",
  },
  high: {
    pill: "pill-bad",
    label: "High",
    text: "Model output indicates a significant wind or rain event within five days. Treat this as a prompt to check flights and official warnings now.",
  },
} as const;

export default function AlertsTab() {
  const { ordered } = useCity();
  const { data, error, loading, fromCache, cachedAt, reload } = useApi<AlertsResponse>("/api/alerts");

  return (
    <section>
      <p className="lede">
        Live warning status where an official keyless feed exists, plus a derived wind and rain watch for
        all three cities. September is the peak of the western Pacific typhoon season, and this is the tab
        to check every morning of the trip.
      </p>

      <div className="callout callout-warn">
        <strong>This is a convenience view, not an authority</strong>
        Only the Hong Kong Observatory row below is a real warning feed. The watch levels are derived from
        forecast model output and are deliberately set well below official warning thresholds — they tell
        you something may be coming, not that anything has been declared. Before you change plans, open
        the official source linked for each city.
      </div>

      <div className="converter">
        <button className="btn" onClick={reload} disabled={loading}>
          {loading ? "Checking…" : "Check now"}
        </button>
        {fromCache && (
          <span className="pill pill-warn" style={{ alignSelf: "center" }}>
            Cached copy · {timeAgo(cachedAt)}
          </span>
        )}
      </div>

      {error && (
        <div className="error-box">
          <strong>Could not reach the alert feeds.</strong> {error}
        </div>
      )}

      <h2 className="section-title">Current status</h2>
      <div className="grid">
        {ordered.map((city) => {
          const entry = data?.cities.find((c) => c.city === city.id);
          const basics = TYPHOON_BASICS.find((b) => b.city === city.id)!;
          const warnings = entry?.officialWarnings ?? [];
          const level = entry?.watch?.level;
          const copy = level ? LEVEL_COPY[level] : null;

          return (
            <article className="card card-accent" key={city.id} style={{ ["--accent" as string]: city.accent }}>
              <div className="eyebrow">
                {city.flag} {city.name}
              </div>
              <h3 style={{ marginBottom: 8 }}>{basics.authority}</h3>

              {loading && !data ? (
                <div className="skeleton" style={{ width: "70%", height: "2rem" }} />
              ) : (
                <>
                  {/* Official warnings, where we have a real feed. */}
                  {entry?.officialNote === "live" && (
                    <div style={{ marginBottom: 12 }}>
                      {warnings.length === 0 ? (
                        <p style={{ margin: 0 }}>
                          <span className="pill pill-good">No warnings in force</span>
                        </p>
                      ) : (
                        <ul className="factlist">
                          {warnings.map((w) => {
                            const known = HKO_CODES[w.code];
                            return (
                              <li key={w.code}>
                                <div className="fact-head">
                                  <span className="fact-label">{known?.label ?? w.name}</span>
                                  <span className={`pill ${SEVERITY_PILL[known?.severity ?? "warning"]}`}>
                                    {known?.severity ?? "in force"}
                                  </span>
                                </div>
                                <span className="fact-detail">{known?.meaning ?? w.name}</span>
                                {w.issued && <span className="small muted">Issued {w.issued}</span>}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}

                  {entry?.officialNote === "no-key" && (
                    <p className="fact-detail" style={{ marginTop: 0 }}>
                      Live CWA warnings are not enabled. Taiwan&apos;s open data API requires a free key —
                      set <code>CWA_API_KEY</code> in your Vercel environment variables to turn this on.
                      Until then, use the derived watch below and the official site.
                    </p>
                  )}

                  {entry?.officialNote === "link-only" && (
                    <p className="fact-detail" style={{ marginTop: 0 }}>
                      KMA does not publish a keyless English warning feed. Use the derived watch below and
                      the official site.
                    </p>
                  )}

                  {/* The feed itself failed — say so rather than showing an empty card. */}
                  {entry &&
                    !["live", "no-key", "link-only"].includes(entry.officialNote) && (
                      <p className="fact-detail" style={{ marginTop: 0 }}>
                        <span className="pill pill-warn">Feed unreachable</span>{" "}
                        Could not reach the warning feed ({entry.officialNote}). Check the official site
                        directly — do not read this as &quot;no warnings in force&quot;.
                      </p>
                    )}

                  {entry && !entry.watch && (
                    <p className="fact-detail">
                      The derived wind and rain watch is also unavailable right now.
                    </p>
                  )}

                  {!entry && !loading && (
                    <p className="fact-detail">
                      <span className="pill pill-warn">No data</span> No status could be retrieved for this
                      city. Open the official site below.
                    </p>
                  )}

                  {/* Derived watch, available for every city. */}
                  {copy && entry?.watch && (
                    <>
                      <div className="eyebrow" style={{ marginTop: 12 }}>
                        5-day derived watch
                      </div>
                      <p style={{ margin: "4px 0 6px" }}>
                        <span className={`pill ${copy.pill}`}>{copy.label}</span>
                      </p>
                      <p className="fact-detail">{copy.text}</p>
                      <div className="metrics" style={{ marginTop: 8 }}>
                        <div className="metric">
                          <div className="k">Peak gust</div>
                          <div className="v">{Math.round(entry.watch.peakGust)} km/h</div>
                        </div>
                        <div className="metric">
                          <div className="k">Peak daily rain</div>
                          <div className="v">{Math.round(entry.watch.peakRain)} mm</div>
                        </div>
                      </div>
                    </>
                  )}

                  <p style={{ marginTop: 12, marginBottom: 0 }}>
                    <a href={basics.authorityUrl} target="_blank" rel="noreferrer noopener">
                      {basics.authority} →
                    </a>
                    <br />
                    <span className="small muted">Install: {basics.app}</span>
                  </p>
                </>
              )}
            </article>
          );
        })}
      </div>

      <h2 className="section-title">How each system works</h2>
      <div className="grid">
        {TYPHOON_BASICS.map((b) => {
          const c = cityById(b.city);
          return (
            <article className="card" key={b.city}>
              <div className="eyebrow">
                {c.flag} {c.name}
              </div>
              <h3>{b.system}</h3>
              <div className="eyebrow" style={{ marginTop: 10 }}>
                How it works
              </div>
              <p className="fact-detail">{b.howItWorks}</p>
              <div className="eyebrow" style={{ marginTop: 10 }}>
                What shuts down
              </div>
              <p className="fact-detail" style={{ marginBottom: 0 }}>
                {b.whatShutsDown}
              </p>
            </article>
          );
        })}
      </div>

      <h2 className="section-title">The Hong Kong signal ladder</h2>
      <p className="muted" style={{ marginTop: -4 }}>
        The most consequential of the three systems, because the signals are legally binding on employers
        and transport operators. Know what each one means before you need to.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Signal</th>
              <th>Means</th>
              <th>What closes</th>
              <th>Your move</th>
            </tr>
          </thead>
          <tbody>
            {HK_LADDER.map((s) => (
              <tr key={s.code}>
                <td>
                  <strong>{s.code}</strong>
                </td>
                <td>{s.label}</td>
                <td className="small">{s.whatCloses}</td>
                <td className="small">{s.yourMove}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="section-title">Contingency plan</h2>
      <DismissBar scope="alerts-contingency" noun="tips" />
      <div className="grid">
        {CONTINGENCY.map((block) => (
          <article className="card" key={block.title}>
            <h3>{block.title}</h3>
            <ul className="bullets">
              {block.points.map((p) => (
                <DismissibleItem scope="alerts-contingency" itemKey={p} key={p}>
                  {p}
                </DismissibleItem>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="status">
        {data ? (
          <>
            Checked {new Date(data.updated).toLocaleString()}.
            <br />
            {data.sources.map((s) => (
              <span key={s}>
                {s}
                <br />
              </span>
            ))}
          </>
        ) : (
          "Loading…"
        )}
      </p>
    </section>
  );
}
