"use client";

import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import ClockStrip from "@/components/ClockStrip";
import PrintCard from "@/components/PrintCard";
import ErrorBoundary from "@/components/ErrorBoundary";
import { OfflineBadge } from "@/components/OfflineProvider";
import { CityPicker, useCity } from "@/components/CityProvider";
import { CITIES, type CityId } from "@/lib/cities";

/**
 * Tab components are code-split so the first load only pays for the active tab.
 * The loader functions are kept so every chunk can be prefetched on idle —
 * without that, the service worker would never see chunks for tabs you have not
 * visited, and they would be missing offline.
 */
const LOADERS: Record<string, () => Promise<{ default: React.ComponentType<never> }>> = {
  currency: () => import("@/components/CurrencyTab"),
  weather: () => import("@/components/WeatherTab"),
  alerts: () => import("@/components/AlertsTab"),
  verify: () => import("@/components/VerifyTab"),
  climate: () => import("@/components/ClimateTab"),
  neighborhoods: () => import("@/components/NeighborhoodsTab"),
  airport: () => import("@/components/AirportTab"),
  toolkit: () => import("@/components/ToolkitTab"),
  essentials: () => import("@/components/EssentialsTab"),
  food: () => import("@/components/FoodTab"),
  phrases: () => import("@/components/PhrasesTab"),
  stationery: () => import("@/components/StationeryTab"),
  artisan: () => import("@/components/ArtisanTab"),
  sizing: () => import("@/components/SizingTab"),
  climbing: () => import("@/components/ClimbingTab"),
  gaming: () => import("@/components/GamingTab"),
  golf: () => import("@/components/GolfTab"),
};

const CurrencyTab = lazy(LOADERS.currency as never);
const WeatherTab = lazy(LOADERS.weather as never);
const AlertsTab = lazy(LOADERS.alerts as never);
const VerifyTab = lazy(LOADERS.verify as never);
const ClimateTab = lazy(LOADERS.climate as never);
const NeighborhoodsTab = lazy(LOADERS.neighborhoods as never);
const AirportTab = lazy(LOADERS.airport as never);
const ToolkitTab = lazy(LOADERS.toolkit as never);
const EssentialsTab = lazy(LOADERS.essentials as never);
const FoodTab = lazy(LOADERS.food as never);
const PhrasesTab = lazy(LOADERS.phrases as never);
const SizingTab = lazy(LOADERS.sizing as never);
const StationeryTab = lazy(LOADERS.stationery as never);
const ArtisanTab = lazy(LOADERS.artisan as never);
const ClimbingTab = lazy(LOADERS.climbing as never);
const GamingTab = lazy(LOADERS.gaming as never);
const GolfTab = lazy(LOADERS.golf as never);

// Search pulls in every data module, so it loads on demand (or on idle) rather
// than sitting in the first-load bundle.
const SearchOverlay = lazy(() => import("@/components/SearchOverlay"));

type TabId =
  | "currency" | "weather" | "alerts"
  | "verify" | "climate" | "neighborhoods" | "airport" | "toolkit"
  | "essentials" | "food" | "phrases"
  | "stationery" | "artisan" | "sizing"
  | "climbing" | "gaming" | "golf";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  /** City-scoped tabs follow the header selection; the rest compare all three. */
  scoped: boolean;
}

const GROUPS: { group: string; tabs: Tab[] }[] = [
  {
    group: "Live",
    tabs: [
      { id: "currency", label: "Currency", icon: "💱", scoped: false },
      { id: "weather", label: "Weather", icon: "🌦️", scoped: false },
      { id: "alerts", label: "Alerts", icon: "🌀", scoped: false },
    ],
  },
  {
    group: "Plan",
    tabs: [
      { id: "verify", label: "Verify", icon: "✅", scoped: true },
      { id: "climate", label: "Climate", icon: "📅", scoped: false },
      { id: "neighborhoods", label: "Neighborhoods", icon: "🗺️", scoped: true },
      { id: "airport", label: "Airport", icon: "✈️", scoped: true },
      { id: "toolkit", label: "Toolkit", icon: "🧰", scoped: false },
    ],
  },
  {
    group: "On the ground",
    tabs: [
      { id: "essentials", label: "Basics", icon: "🧭", scoped: true },
      { id: "food", label: "Food", icon: "🍜", scoped: true },
      { id: "phrases", label: "Phrases", icon: "🗣️", scoped: true },
    ],
  },
  {
    group: "Shop",
    tabs: [
      { id: "stationery", label: "Stationery", icon: "✒️", scoped: true },
      { id: "artisan", label: "Artisan", icon: "🏺", scoped: true },
      { id: "sizing", label: "Sizing", icon: "👕", scoped: false },
    ],
  },
  {
    group: "Do",
    tabs: [
      { id: "climbing", label: "Climbing", icon: "🧗", scoped: true },
      { id: "gaming", label: "Gaming", icon: "🎮", scoped: true },
      { id: "golf", label: "Golf", icon: "⛳", scoped: true },
    ],
  },
];

const ALL_TABS: Tab[] = GROUPS.flatMap((g) => g.tabs);

function isTabId(value: string): value is TabId {
  return ALL_TABS.some((t) => t.id === value);
}
function isCityId(value: string): value is CityId {
  return CITIES.some((c) => c.id === value);
}

/** Hash format: `#tab`, or `#tab/city` for a city-scoped tab. */
function parseHash(hash: string): { tab: TabId | null; city: CityId | null } {
  const [rawTab, rawCity] = hash.replace(/^#/, "").split("/");
  return {
    tab: rawTab && isTabId(rawTab) ? rawTab : null,
    city: rawCity && isCityId(rawCity) ? rawCity : null,
  };
}

export default function Page() {
  const [tab, setTab] = useState<TabId>("currency");
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const { city, setCity } = useCity();
  const active = ALL_TABS.find((t) => t.id === tab)!;

  const writeHash = useCallback((id: TabId, cityId: CityId) => {
    const scoped = ALL_TABS.find((t) => t.id === id)?.scoped;
    const next = scoped ? `#${id}/${cityId}` : `#${id}`;
    if (window.location.hash !== next) window.history.pushState(null, "", next);
  }, []);

  // Restore from the hash, and respond to back/forward.
  useEffect(() => {
    const sync = () => {
      const { tab: t, city: c } = parseHash(window.location.hash);
      if (t) setTab(t);
      if (c) setCity(c);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [setCity]);

  // Keep the hash in step when the city changes on a scoped tab.
  useEffect(() => {
    if (active.scoped) {
      const next = `#${tab}/${city}`;
      if (window.location.hash !== next) window.history.replaceState(null, "", next);
    }
  }, [city, tab, active.scoped]);

  // Warm every remaining chunk once the browser is idle, so code splitting does
  // not cost offline coverage. Failures are ignored: they just mean a lazy load
  // later, exactly as it would have been without prefetching.
  useEffect(() => {
    const warm = () => {
      for (const load of Object.values(LOADERS)) void load().catch(() => {});
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(warm, { timeout: 4000 });
      return () => (window as unknown as { cancelIdleCallback?: (i: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(warm, 2000);
    return () => clearTimeout(t);
  }, []);

  // Keep the active tab visible when the nav scrolls.
  useEffect(() => {
    navRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${tab}`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [tab]);

  const select = useCallback(
    (id: TabId) => {
      setTab(id);
      writeHash(id, city);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    },
    [city, writeHash]
  );

  // Global shortcuts: "/" or Cmd/Ctrl+K opens search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const typing = el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /** WAI-ARIA tabs pattern: arrows move and activate, Home/End jump to the ends. */
  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const i = ALL_TABS.findIndex((t) => t.id === tab);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % ALL_TABS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + ALL_TABS.length) % ALL_TABS.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = ALL_TABS.length - 1;
    if (next < 0) return;
    e.preventDefault();
    const id = ALL_TABS[next].id;
    select(id);
    requestAnimationFrame(() => navRef.current?.querySelector<HTMLButtonElement>(`#tab-${id}`)?.focus());
  };

  const jumpFromSearch = (tabId: string, cityId: CityId | null) => {
    if (cityId) setCity(cityId);
    if (isTabId(tabId)) {
      setTab(tabId);
      writeHash(tabId, cityId ?? city);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  };

  const fallback = (
    <div className="tab-loading" role="status" aria-live="polite">
      <div className="skeleton" style={{ width: "70%", height: "1.1rem" }} />
      <div className="skeleton" style={{ width: "90%", marginTop: 10 }} />
      <div className="skeleton" style={{ width: "55%", marginTop: 8 }} />
    </div>
  );

  return (
    <>
      <main className="shell">
        <header className="masthead">
          <div className="masthead-title">
            <h1>Asia Trip Tools</h1>
            <p>Taipei · Hong Kong · Seoul — September 2026</p>
            <OfflineBadge />
          </div>
          <div className="masthead-right">
            <ClockStrip />
            <div className="masthead-actions">
              <button className="btn btn-search" onClick={() => setSearchOpen(true)}>
                <span aria-hidden="true">🔍</span> Search
                <kbd>/</kbd>
              </button>
              <button className="btn" onClick={() => window.print()} title="Print a pocket card for the selected city">
                <span aria-hidden="true">🖨️</span> Card
              </button>
            </div>
          </div>
        </header>

        {/* Phone: pick a city, then pick a section from a compact dropdown. */}
        <div className="mobilebar">
          <CityPicker />
          <div className="mobilebar-row">
            <label className="sectionselect">
              <span className="sr-only">Section</span>
              <select value={tab} onChange={(e) => select(e.target.value as TabId)}>
                {GROUPS.map((g) => (
                  <optgroup label={g.group} key={g.group}>
                    {g.tabs.map((t) => (
                      <option value={t.id} key={t.id}>
                        {t.icon}  {t.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <button className="btn btn-icon" onClick={() => setSearchOpen(true)} aria-label="Search all content">
              🔍
            </button>
          </div>
        </div>

        {/* Wide screens: the full grouped nav. */}
        <nav className="tabnav" role="tablist" aria-label="Trip tools" ref={navRef}>
          {GROUPS.map((g) => (
            <div className="tabgroup" key={g.group}>
              <span className="tabgroup-label">{g.group}</span>
              <div className="tabgroup-items">
                {g.tabs.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls="tabpanel"
                    tabIndex={tab === t.id ? 0 : -1}
                    onKeyDown={onTabKeyDown}
                    onClick={() => select(t.id)}
                  >
                    <span aria-hidden="true">{t.icon}</span> {t.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {active.scoped && (
          <div className="desktop-citybar">
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              Showing
            </span>
            <CityPicker />
          </div>
        )}

        <div role="tabpanel" id="tabpanel" aria-labelledby={`tab-${tab}`} tabIndex={-1}>
          <ErrorBoundary label={active.label}>
            <Suspense fallback={fallback}>
              {tab === "currency" && <CurrencyTab />}
              {tab === "weather" && <WeatherTab />}
              {tab === "alerts" && <AlertsTab />}
              {tab === "verify" && <VerifyTab />}
              {tab === "climate" && <ClimateTab />}
              {tab === "neighborhoods" && <NeighborhoodsTab />}
              {tab === "airport" && <AirportTab />}
              {tab === "toolkit" && <ToolkitTab />}
              {tab === "essentials" && <EssentialsTab />}
              {tab === "food" && <FoodTab />}
              {tab === "phrases" && <PhrasesTab />}
              {tab === "sizing" && <SizingTab />}
              {tab === "stationery" && <StationeryTab />}
              {tab === "artisan" && <ArtisanTab />}
              {tab === "climbing" && <ClimbingTab />}
              {tab === "gaming" && <GamingTab />}
              {tab === "golf" && <GolfTab />}
            </Suspense>
          </ErrorBoundary>
        </div>

        <footer className="foot">
          <p>
            Rates from open.er-api.com with failover to the currency-api mirrors. Weather and air quality
            from Open-Meteo. Live warnings from Hong Kong Observatory open data. Climate normals from the
            Central Weather Administration (Taiwan), the Hong Kong Observatory, and the Korea
            Meteorological Administration.
          </p>
          <p>
            Reference content was compiled, not verified against official sources. The{" "}
            <button className="linkish" onClick={() => select("verify")}>
              Verify
            </button>{" "}
            tab lists every claim that needs confirming before you travel.
          </p>
        </footer>
      </main>

      {searchOpen && (
        <Suspense fallback={null}>
          <SearchOverlay open onClose={() => setSearchOpen(false)} onJump={jumpFromSearch} />
        </Suspense>
      )}
      <PrintCard />
    </>
  );
}
