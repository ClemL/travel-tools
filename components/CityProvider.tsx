"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CITIES, DEFAULT_ENABLED, allOf, isCityId, type City, type CityId } from "@/lib/cities";

const STORAGE_KEY = "asia-trip-city";
const COMPARE_KEY = "asia-trip-compare-all";
const ENABLED_KEY = "asia-trip-destinations";

interface CityState {
  /** The selected city — always one of the enabled destinations. */
  city: CityId;
  setCity: (id: CityId) => void;
  /** Enabled destinations, with the selected one first. */
  ordered: City[];
  /** When false (the default) the selection filters every tab, not just the city-scoped ones. */
  compareAll: boolean;
  setCompareAll: (on: boolean) => void;
  /**
   * What a cross-city tab should actually render: just the selected city, or
   * every enabled destination when the user has explicitly asked to compare.
   */
  visible: City[];
  /** Destinations switched on in Settings, in canonical order. */
  enabledCities: City[];
  isEnabled: (id: CityId) => boolean;
  /** Switches a destination on or off. The last enabled destination cannot be switched off. */
  setEnabled: (id: CityId, on: boolean) => void;
  resetEnabled: () => void;
  enableAll: () => void;
}

const DEFAULT_CITIES = CITIES.filter((c) => DEFAULT_ENABLED.includes(c.id));

const Ctx = createContext<CityState>({
  city: DEFAULT_ENABLED[0],
  setCity: () => {},
  ordered: DEFAULT_CITIES,
  compareAll: false,
  setCompareAll: () => {},
  visible: DEFAULT_CITIES,
  enabledCities: DEFAULT_CITIES,
  isEnabled: (id) => DEFAULT_ENABLED.includes(id),
  setEnabled: () => {},
  resetEnabled: () => {},
  enableAll: () => {},
});

export function useCity() {
  return useContext(Ctx);
}

/** Parses the stored destination list, discarding anything stale or malformed. */
function readEnabled(raw: string | null): CityId[] | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    const ids = CITIES.map((c) => c.id).filter((id) => parsed.includes(id));
    return ids.length > 0 ? ids : null;
  } catch {
    return null;
  }
}

export default function CityProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<CityId>(DEFAULT_ENABLED[0]);
  const [compareAll, setCompareAllState] = useState(false);
  const [enabledIds, setEnabledIds] = useState<CityId[]>(DEFAULT_ENABLED);

  // Restore after mount so the server-rendered markup cannot disagree.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isCityId(saved)) setSelected(saved);
      setCompareAllState(localStorage.getItem(COMPARE_KEY) === "1");
      const enabled = readEnabled(localStorage.getItem(ENABLED_KEY));
      if (enabled) setEnabledIds(enabled);
    } catch {
      // Private browsing or blocked storage — the default is fine.
    }
  }, []);

  const setCity = useCallback((id: CityId) => {
    setSelected(id);
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

  const persistEnabled = useCallback((next: CityId[]) => {
    setEnabledIds(next);
    try {
      localStorage.setItem(ENABLED_KEY, JSON.stringify(next));
    } catch {
      // Non-fatal.
    }
  }, []);

  const setEnabled = useCallback(
    (id: CityId, on: boolean) => {
      const next = CITIES.map((c) => c.id).filter((x) => (x === id ? on : enabledIds.includes(x)));
      if (next.length === 0) return;
      persistEnabled(next);
    },
    [enabledIds, persistEnabled]
  );

  const resetEnabled = useCallback(() => persistEnabled(DEFAULT_ENABLED), [persistEnabled]);
  const enableAll = useCallback(() => persistEnabled(CITIES.map((c) => c.id)), [persistEnabled]);

  const isEnabled = useCallback((id: CityId) => enabledIds.includes(id), [enabledIds]);

  const enabledCities = useMemo(() => CITIES.filter((c) => enabledIds.includes(c.id)), [enabledIds]);

  // Derived rather than synced, so a disabled destination left in storage or in
  // a deep link can never become the selection — it just falls back.
  const city = enabledIds.includes(selected) ? selected : enabledIds[0];

  const ordered = useMemo(
    () => [...enabledCities].sort((a, b) => (a.id === city ? -1 : b.id === city ? 1 : 0)),
    [enabledCities, city]
  );

  const visible = useMemo(
    () => (compareAll && ordered.length > 1 ? ordered : ordered.filter((c) => c.id === city)),
    [compareAll, ordered, city]
  );

  return (
    <Ctx.Provider
      value={{
        city,
        setCity,
        ordered,
        compareAll,
        setCompareAll,
        visible,
        enabledCities,
        isEnabled,
        setEnabled,
        resetEnabled,
        enableAll,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

/** Segmented city control. Compact enough for a phone header. */
export function CityPicker({ size = "full" }: { size?: "full" | "compact" }) {
  const { city, setCity, enabledCities } = useCity();
  return (
    <div className={`citypicker${size === "compact" ? " citypicker-compact" : ""}`} role="group" aria-label="Select city">
      {enabledCities.map((c) => (
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
 * explicit way back to a side-by-side comparison, and the choice persists.
 * With a single destination enabled there is nothing to compare, so it hides.
 */
export function CompareToggle() {
  const { compareAll, setCompareAll, city, enabledCities } = useCity();
  if (enabledCities.length < 2) return null;
  const name = enabledCities.find((c) => c.id === city)?.name ?? "this city";
  const all = allOf(enabledCities.length);
  return (
    <button
      className={`btn btn-small compare-toggle${compareAll ? " is-on" : ""}`}
      onClick={() => setCompareAll(!compareAll)}
      aria-pressed={compareAll}
    >
      {compareAll ? `Showing ${all} · show ${name} only` : `Compare ${all}`}
    </button>
  );
}
