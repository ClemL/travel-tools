"use client";

import { useEffect, useState } from "react";
import { CITIES, HOME } from "@/lib/cities";
import { timeIn, dayIn, offsetHours } from "@/lib/format";
import { useCity } from "./CityProvider";

/**
 * Live local clocks. Rendered only after mount so the server-rendered markup
 * cannot disagree with the client's clock.
 *
 * All four render at every width; on a phone, CSS collapses this to just home
 * plus the selected city, which is why each clock carries a marker class.
 */
export default function ClockStrip() {
  const [now, setNow] = useState<Date | null>(null);
  const { city } = useCity();

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="clockstrip" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="clock">
            <div className="skeleton" style={{ width: 60, height: "0.7em" }} />
            <div className="skeleton" style={{ width: 44, marginTop: 6 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="clockstrip">
      <div className="clock clock-home">
        <div className="place">{HOME.name}</div>
        <div className="time">{timeIn(HOME.timezone, now)}</div>
        <div className="offset">
          <span className="day">{dayIn(HOME.timezone, now)}</span>
        </div>
      </div>
      {CITIES.map((c) => (
        <div className={`clock${c.id === city ? " clock-selected" : ""}`} key={c.id}>
          <div className="place">{c.name}</div>
          <div className="time">{timeIn(c.timezone, now)}</div>
          <div className="offset">
            <span className="day">{dayIn(c.timezone, now)} · </span>
            <span className="tz">{offsetHours(c.timezone, HOME.timezone, now).split(" vs ")[0]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
