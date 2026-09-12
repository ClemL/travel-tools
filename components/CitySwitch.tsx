"use client";

import { CITIES, type CityId } from "@/lib/cities";

export default function CitySwitch({
  value,
  onChange,
}: {
  value: CityId;
  onChange: (id: CityId) => void;
}) {
  return (
    <div className="citytabs" role="group" aria-label="Choose a city">
      {CITIES.map((c) => (
        <button
          key={c.id}
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
        >
          {c.flag} {c.name}
        </button>
      ))}
    </div>
  );
}
