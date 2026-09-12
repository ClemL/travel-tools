"use client";

import { useState } from "react";
import CitySwitch from "./CitySwitch";
import { cityById, type CityId } from "@/lib/cities";
import { phrasesFor } from "@/lib/phrases";

export default function PhrasesTab() {
  const [city, setCity] = useState<CityId>("taipei");
  const set = phrasesFor(city);
  const c = cityById(city);

  return (
    <section>
      <p className="lede">
        A working minimum, not a course. Each list is ordered by how often you will actually need the
        phrase — ordering, paying, and finding a bathroom account for most of it.
      </p>

      <CitySwitch value={city} onChange={setCity} />

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
          <h3 style={{ marginBottom: 8 }}>Phrases</h3>
          {set.phrases.map((p) => (
            <div className="phrase" key={p.en}>
              <span className="en">{p.en}</span>
              <span className="local" lang={city === "seoul" ? "ko" : "zh-Hant"}>
                {p.local}
              </span>
              <span className="roman">{p.roman}</span>
              {p.note && <span className="note">{p.note}</span>}
            </div>
          ))}
        </article>
      </div>

      <div className="callout">
        <strong>Highest-leverage preparation</strong>
        Learning to read Hangul takes roughly an hour and pays off immediately, because a large share of
        Korean menu and signage vocabulary is phonetic English loanwords. Chinese characters offer no
        such shortcut — for Taipei and Hong Kong, put the effort into a translation app with camera mode
        instead, and save your hotel address in Chinese characters on your phone before you land.
      </div>
    </section>
  );
}
