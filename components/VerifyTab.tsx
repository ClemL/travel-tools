"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useCity } from "./CityProvider";
import { CHECKS, sweepFlags, checksForCity, cityLabel, ageFrom, COMPILED_ON, type Priority } from "@/lib/verify";

const STORAGE_KEY = "asia-trip-verified";

interface VerifiedRecord {
  verifiedAt: string;
}

type Store = Record<string, VerifiedRecord>;

const PRIORITY_PILL: Record<Priority, string> = {
  critical: "pill-bad",
  high: "pill-warn",
  medium: "pill-neutral",
};

export default function VerifyTab() {
  const { city } = useCity();
  const [store, setStore] = useState<Store>({});
  const [showAll, setShowAll] = useState(false);
  const [hideDone, setHideDone] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setStore(JSON.parse(raw) as Store);
    } catch {
      // Blocked storage just means nothing is remembered.
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Store) => {
    setStore(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Non-fatal.
    }
  }, []);

  const toggle = (id: string) => {
    const next = { ...store };
    if (next[id]) delete next[id];
    else next[id] = { verifiedAt: new Date().toISOString() };
    persist(next);
  };

  const visible = useMemo(() => {
    const list = checksForCity(city, showAll);
    return hideDone ? list.filter((c) => !store[c.id]) : list;
  }, [city, showAll, hideDone, store]);

  const scoped = checksForCity(city, showAll);
  const doneCount = scoped.filter((c) => store[c.id]).length;
  const criticalOpen = scoped.filter((c) => c.priority === "critical" && !store[c.id]).length;

  const sweep = useMemo(() => sweepFlags(), []);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof visible>();
    for (const item of visible) {
      const list = map.get(item.category) ?? [];
      list.push(item);
      map.set(item.category, list);
    }
    return [...map.entries()];
  }, [visible]);

  return (
    <section>
      <p className="lede">
        Everything in this app that is flagged as needing confirmation, gathered into one list. Nothing
        here is researched for you — these are the claims where being wrong costs money, a day, or a
        flight, with the official source next to each.
      </p>

      <div className="callout callout-warn">
        <strong>Compiled, not verified</strong>
        All reference content in this app was written on {COMPILED_ON} ({ageFrom(COMPILED_ON)}) from
        general knowledge, and has <em>not</em> been checked against an official source. That is what this
        checklist is for. Tick an item once you have confirmed it yourself and the app records when.
      </div>

      {loaded && (
        <div className="verify-progress">
          <div className="verify-bar" role="img" aria-label={`${doneCount} of ${scoped.length} confirmed`}>
            <span style={{ width: `${scoped.length ? (doneCount / scoped.length) * 100 : 0}%` }} />
          </div>
          <div className="verify-stats">
            <strong>
              {doneCount} / {scoped.length}
            </strong>{" "}
            confirmed
            {criticalOpen > 0 && (
              <>
                {" · "}
                <span className="pill pill-bad">{criticalOpen} critical outstanding</span>
              </>
            )}
          </div>
        </div>
      )}

      <div className="converter">
        <button className="btn" onClick={() => setShowAll(!showAll)}>
          {showAll ? `Show ${cityLabel(city)} only` : "Show all cities"}
        </button>
        <button className="btn" onClick={() => setHideDone(!hideDone)}>
          {hideDone ? "Show confirmed" : "Hide confirmed"}
        </button>
      </div>

      {visible.length === 0 && (
        <div className="callout">
          <strong>Nothing outstanding</strong>
          Everything in scope is confirmed. Turn off &quot;hide confirmed&quot; to review what you ticked.
        </div>
      )}

      {grouped.map(([category, items]) => (
        <div key={category}>
          <h2 className="section-title">{category}</h2>
          <ul className="checklist">
            {items.map((c) => {
              const done = store[c.id];
              return (
                <li key={c.id} className={done ? "checked" : ""}>
                  <label>
                    <input
                      type="checkbox"
                      checked={Boolean(done)}
                      onChange={() => toggle(c.id)}
                      aria-label={`Mark ${c.title} as confirmed`}
                    />
                    <div className="check-body">
                      <div className="fact-head">
                        <span className="fact-label">{c.title}</span>
                        <span className={`pill ${PRIORITY_PILL[c.priority]}`}>{c.priority}</span>
                        <span className="pill pill-neutral">{cityLabel(c.city)}</span>
                      </div>
                      <p className="check-question">{c.question}</p>
                      <p className="fact-detail">{c.why}</p>
                      <p className="small muted" style={{ margin: 0 }}>
                        Appears on: {c.tab}
                        {c.officialUrl && (
                          <>
                            {" · "}
                            <a href={c.officialUrl} target="_blank" rel="noreferrer noopener">
                              {c.officialLabel ?? "Official source"} →
                            </a>
                          </>
                        )}
                      </p>
                      {done && (
                        <p className="small" style={{ margin: "4px 0 0", color: "var(--good)" }}>
                          ✓ You confirmed this {ageFrom(done.verifiedAt.slice(0, 10))}
                        </p>
                      )}
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <h2 className="section-title">Coverage</h2>
      <div className="card">
        <p className="fact-detail">
          The checklist above holds <strong>{CHECKS.length} curated items</strong>. A sweep of the data
          files finds <strong>{sweep.total} records</strong> flagged as needing verification in total —
          the difference is mostly individual shop, gym and venue listings, which are covered by the
          single &quot;named venues&quot; item rather than listed one by one.
        </p>
        <div className="table-wrap" style={{ marginTop: 10 }}>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Flagged records</th>
              </tr>
            </thead>
            <tbody>
              {sweep.bySource
                .filter((s) => s.items.length > 0)
                .sort((a, b) => b.items.length - a.items.length)
                .map((s) => (
                  <tr key={s.source}>
                    <td>{s.source}</td>
                    <td>
                      <strong>{s.items.length}</strong>
                      <br />
                      <span className="small muted">{s.items.slice(0, 4).join(", ")}
                      {s.items.length > 4 ? `, +${s.items.length - 4} more` : ""}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="status" style={{ marginTop: 10, marginBottom: 0 }}>
          This count is computed from the data at runtime, so it cannot drift out of date as content is
          added. If it rises sharply, the checklist above probably needs a new entry.
        </p>
      </div>
    </section>
  );
}
