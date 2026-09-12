"use client";

import { useEffect, useState } from "react";
import { CITIES, HOME } from "@/lib/cities";
import { timeIn, dayIn, offsetHours } from "@/lib/format";

/**
 * Live local clocks. Rendered only after mount so the server-rendered markup
 * cannot disagree with the client's clock.
 */
export default function ClockStrip() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <div className="clockstrip" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="clock">
            <div className="skeleton" style={{ width: 60, height: "0.7em" }} />
            <div className="skeleton" style={{ width: 44, marginTop: 6 }} />
          </div>
        ))}
      </div>
    );
  }

  const zones = [
    { name: HOME.name, tz: HOME.timezone, offset: "home" },
    ...CITIES.map((c) => ({ name: c.name, tz: c.timezone, offset: offsetHours(c.timezone, HOME.timezone, now) })),
  ];

  return (
    <div className="clockstrip">
      {zones.map((z) => (
        <div className="clock" key={z.tz}>
          <div className="place">{z.name}</div>
          <div className="time">{timeIn(z.tz, now)}</div>
          <div className="offset">
            {z.offset === "home" ? dayIn(z.tz, now) : `${dayIn(z.tz, now)} · ${z.offset.split(" vs ")[0]}`}
          </div>
        </div>
      ))}
    </div>
  );
}
