"use client";

import { useMemo, useState } from "react";

import { useCity } from "./CityProvider";
import { cityById } from "@/lib/cities";
import { phrasesFor, PHRASE_CATEGORIES, type PhraseCategory } from "@/lib/phrases";
import { DismissBar, Dismissible } from "./Dismissible";

export default function PhrasesTab() {
  const { city } = useCity();
  const set = phrasesFor(city);
  const c = cityById(city);
  const [filter, setFilter] = useState<PhraseCategory | null>(null);

  const counts = useMemo(() => {
    const out = {} as Record<PhraseCategory, number>;
    for (const cat of PHRASE_CATEGORIES) out[cat] = 0;
    for (const p of set.phrases) out[p.category] = (out[p.category] ?? 0) + 1;
    return out;
  }, [set]);

  const shown = useMemo(
    () => (filter ? set.phrases.filter((p) => p.category === filter) : set.phrases),
    [set, filter]
  );

  // Keep the canonical category order rather than first-seen order.
  const grouped = useMemo(
    () =>
      PHRASE_CATEGORIES.map((cat) => [cat, shown.filter((p) => p.category === cat)] as const).filter(
        ([, list]) => list.length > 0
      ),
    [shown]
  );

  return (
    <section>
      <p className="lede">
        A working minimum, not a course. Each list is ordered by how often you will actually need the
        phrase — ordering, paying, and finding a bathroom account for most of it.
      </p>

      <div className="grid grid-sidebar">
        <article className="card card-accent" style={{ ["--accent" as string]: c.accent }}>
          <div className="eyebrow">
            {c.flag} {c.name}
          </div>
          <h3>{set.language}</h3>
          <p className="fact-detail">{set.script}</p>

          <div className="eyebrow" style={{ marginTop: 12 }}>
            How far English gets you
          </div>
          <p className="fact-detail">{set.englishLevel}</p>

          <div className="eyebrow" style={{ marginTop: 12 }}>
            What to know first
          </div>
          <p className="fact-detail">{set.primer}</p>
        </article>

        <article className="card">
          <div className="fact-head" style={{ marginBottom: 10 }}>
            <h3 style={{ marginBottom: 0 }}>Phrases</h3>
            <span className="small muted">{shown.length} of {set.phrases.length}</span>
          </div>

          <div className="chips" style={{ marginBottom: 12 }}>
            <button
              className={`chip chip-btn${filter === null ? " chip-on" : ""}`}
              onClick={() => setFilter(null)}
            >
              All
            </button>
            {PHRASE_CATEGORIES.filter((cat) => counts[cat] > 0).map((cat) => (
              <button
                key={cat}
                className={`chip chip-btn${filter === cat ? " chip-on" : ""}`}
                onClick={() => setFilter(filter === cat ? null : cat)}
              >
                {cat} <span className="muted">{counts[cat]}</span>
              </button>
            ))}
          </div>

          {grouped.map(([cat, list]) => (
            <div key={cat}>
              <div className="eyebrow" style={{ marginTop: 14 }}>
                {cat}
              </div>
              {list.map((p) => (
                <div className="phrase" key={p.en}>
                  <span className="en">{p.en}</span>
                  <span className="local" lang={city === "seoul" ? "ko" : "zh-Hant"}>
                    {p.local}
                  </span>
                  <span className="roman">{p.roman}</span>
                  {p.note && <span className="note">{p.note}</span>}
                </div>
              ))}
            </div>
          ))}
        </article>
      </div>

      <DismissBar scope="phr-tips" noun="tips" />
      <Dismissible scope="phr-tips" itemKey="Highest-leverage preparation">
      <div className="callout">
        <strong>Highest-leverage preparation</strong>
        Learning to read Hangul takes roughly an hour and pays off immediately, because a large share of
        Korean menu and signage vocabulary is phonetic English loanwords. Chinese characters offer no
        such shortcut — for Taipei and Hong Kong, put the effort into a translation app with camera mode
        instead, and save your hotel address in Chinese characters on your phone before you land.
      </div>
      </Dismissible>
    </section>
  );
}
