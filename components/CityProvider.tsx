"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CITIES, type City, type CityId } from "@/lib/cities";

const STORAGE_KEY = "asia-trip-city";

interface CityState {
  city: CityId;
  setCity: (id: CityId) => void;
  /** All three cities, with the selected one first — for cross-city comparison tabs. */
  ordered: City[];
}

const Ctx = createContext<CityState>({
  city: "taipei",
  setCity: () => {},
  ordered: CITIES,
});

export function useCity() {
  return useContext(Ctx);
}

function isCityId(value: string | null): value is CityId {
  return !!value && CITIES.some((c) => c.id === value);
}

export default function CityProvider({ children }: { children: React.ReactNode }) {
  const [city, setCityState] = useState<CityId>("taipei");

  // Restore after mount so the server-rendered markup cannot disagree.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isCityId(saved)) setCityState(saved);
    } catch {
      // Private browsing or blocked storage — the default is fine.
    }
  }, []);

  const setCity = useCallback((id: CityId) => {
    setCityState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // Non-fatal: the choice just will not persist across reloads.
    }
  }, []);

  const ordered = useMemo(
    () => [...CITIES].sort((a, b) => (a.id === city ? -1 : b.id === city ? 1 : 0)),
    [city]
  );

  return <Ctx.Provider value={{ city, setCity, ordered }}>{children}</Ctx.Provider>;
}

/** Segmented city control. Compact enough for a phone header. */
export function CityPicker({ size = "full" }: { size?: "full" | "compact" }) {
  const { city, setCity } = useCity();
  return (
    <div className={`citypicker${size === "compact" ? " citypicker-compact" : ""}`} role="group" aria-label="Select city">
      {CITIES.map((c) => (
        <button key={c.id} aria-pressed={city === c.id} onClick={() => setCity(c.id)}>
          <span aria-hidden="true">{c.flag}</span>
          <span className="citypicker-name">{c.name}</span>
        </button>
      ))}
    </div>
  );
}
