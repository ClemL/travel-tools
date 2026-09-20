"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CITIES, type City, type CityId } from "@/lib/cities";

const STORAGE_KEY = "asia-trip-city";
const COMPARE_KEY = "asia-trip-compare-all";

interface CityState {
  city: CityId;
  setCity: (id: CityId) => void;
  /** All three cities, with the selected one first. */
  ordered: City[];
  /** When false (the default) the selection filters every tab, not just the city-scoped ones. */
  compareAll: boolean;
  setCompareAll: (on: boolean) => void;
  /**
   * What a cross-city tab should actually render: just the selected city, or
   * all three when the user has explicitly asked to compare.
   */
  visible: City[];
}

const Ctx = createContext<CityState>({
  city: "taipei",
  setCity: () => {},
  ordered: CITIES,
  compareAll: false,
  setCompareAll: () => {},
  visible: CITIES,
});

export function useCity() {
  return useContext(Ctx);
}

function isCityId(value: string | null): value is CityId {
  return !!value && CITIES.some((c) => c.id === value);
}

export default function CityProvider({ children }: { children: React.ReactNode }) {
  const [city, setCityState] = useState<CityId>("taipei");
  const [compareAll, setCompareAllState] = useState(false);

  // Restore after mount so the server-rendered markup cannot disagree.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isCityId(saved)) setCityState(saved);
      setCompareAllState(localStorage.getItem(COMPARE_KEY) === "1");
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

  const setCompareAll = useCallback((on: boolean) => {
    setCompareAllState(on);
    try {
      localStorage.setItem(COMPARE_KEY, on ? "1" : "0");
    } catch {
      // Non-fatal.
    }
  }, []);

  const ordered = useMemo(
    () => [...CITIES].sort((a, b) => (a.id === city ? -1 : b.id === city ? 1 : 0)),
    [city]
  );

  const visible = useMemo(
    () => (compareAll ? ordered : ordered.filter((c) => c.id === city)),
    [compareAll, ordered, city]
  );

  return (
    <Ctx.Provider value={{ city, setCity, ordered, compareAll, setCompareAll, visible }}>
      {children}
    </Ctx.Provider>
  );
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

/**
 * Cross-city tabs default to showing only the selected city. This is the
 * explicit way back to a three-way comparison, and the choice persists.
 */
export function CompareToggle() {
  const { compareAll, setCompareAll, city } = useCity();
  const name = CITIES.find((c) => c.id === city)?.name ?? "this city";
  return (
    <button
      className={`btn btn-small compare-toggle${compareAll ? " is-on" : ""}`}
      onClick={() => setCompareAll(!compareAll)}
      aria-pressed={compareAll}
    >
      {compareAll ? `Showing all three · show ${name} only` : "Compare all three"}
    </button>
  );
}
