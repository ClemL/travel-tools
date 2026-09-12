"use client";

import { useEffect, useRef, useState } from "react";
import ClockStrip from "@/components/ClockStrip";
import CurrencyTab from "@/components/CurrencyTab";
import WeatherTab from "@/components/WeatherTab";
import AlertsTab from "@/components/AlertsTab";
import ClimateTab from "@/components/ClimateTab";
import NeighborhoodsTab from "@/components/NeighborhoodsTab";
import AirportTab from "@/components/AirportTab";
import EssentialsTab from "@/components/EssentialsTab";
import FoodTab from "@/components/FoodTab";
import PhrasesTab from "@/components/PhrasesTab";
import SizingTab from "@/components/SizingTab";
import ShopsTab from "@/components/ShopsTab";
import ToolkitTab from "@/components/ToolkitTab";
import ActivityTab from "@/components/ActivityTab";
import { OfflineBadge } from "@/components/OfflineProvider";
import { CityPicker } from "@/components/CityProvider";
import { CLIMBING, GAMING, GOLF } from "@/lib/activities";
import { STATIONERY, ARTISAN } from "@/lib/shops";

type TabId =
  | "currency"
  | "weather"
  | "alerts"
  | "climate"
  | "neighborhoods"
  | "airport"
  | "toolkit"
  | "essentials"
  | "food"
  | "phrases"
  | "stationery"
  | "artisan"
  | "sizing"
  | "climbing"
  | "gaming"
  | "golf";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  /** City-scoped tabs follow the header selection; the rest compare all three. */
  scoped: boolean;
}

interface TabGroup {
  group: string;
  tabs: Tab[];
}

const GROUPS: TabGroup[] = [
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

export default function Page() {
  const [tab, setTab] = useState<TabId>("currency");
  const navRef = useRef<HTMLElement | null>(null);
  const active = ALL_TABS.find((t) => t.id === tab)!;

  // Mirror the active tab into the URL hash so a view is linkable, survives
  // reload, and responds to browser back/forward.
  useEffect(() => {
    const sync = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (isTabId(fromHash)) setTab(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // On a narrow screen the desktop nav scrolls, so keep the active tab visible.
  useEffect(() => {
    navRef.current
      ?.querySelector<HTMLButtonElement>(`#tab-${tab}`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [tab]);

  const select = (id: TabId) => {
    setTab(id);
    // pushState rather than replaceState so back returns to the previous tab.
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, "", `#${id}`);
    }
    // Jumping between long tabs otherwise leaves you mid-page.
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <main className="shell">
      <header className="masthead">
        <div className="masthead-title">
          <h1>Asia Trip Tools</h1>
          <p>Taipei · Hong Kong · Seoul — September 2026</p>
          <OfflineBadge />
        </div>
        <ClockStrip />
      </header>

      {/* Phone: pick a city, then pick a section from a compact dropdown. */}
      <div className="mobilebar">
        <CityPicker />
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
      </div>

      {/* Wide screens: the full grouped nav, plus a city picker when it applies. */}
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
                  aria-controls={`panel-${t.id}`}
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

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "currency" && <CurrencyTab />}
        {tab === "weather" && <WeatherTab />}
        {tab === "alerts" && <AlertsTab />}
        {tab === "climate" && <ClimateTab />}
        {tab === "neighborhoods" && <NeighborhoodsTab />}
        {tab === "airport" && <AirportTab />}
        {tab === "toolkit" && <ToolkitTab />}
        {tab === "essentials" && <EssentialsTab />}
        {tab === "food" && <FoodTab />}
        {tab === "phrases" && <PhrasesTab />}
        {tab === "sizing" && <SizingTab />}
        {tab === "stationery" && (
          <ShopsTab
            scenes={STATIONERY}
            districtHeading="Where to browse"
            lede="Stationery is a serious retail category across all three cities and one of the most travel-efficient things to buy — paper weighs nothing and survives a suitcase. The quality and the character differ sharply by city."
          />
        )}
        {tab === "artisan" && (
          <ShopsTab
            scenes={ARTISAN}
            districtHeading="Craft districts"
            lede="Working craft rather than souvenir shops: ceramics, leather, bamboo, textiles, lacquer and the trades still done by hand. Each city has a different strength, and in Hong Kong some of it is genuinely close to disappearing."
          />
        )}
        {tab === "climbing" && (
          <ActivityTab
            profiles={CLIMBING}
            lede="Indoor bouldering and rope climbing in all three cities, plus what the outdoor options are and why September is the wrong month for most of them."
            verdict={{
              title: "Seoul is the reason to pack climbing shoes",
              body:
                "Seoul has one of the densest gym scenes on earth and it is genuinely worth planning around. Taipei and Hong Kong both have good gyms but fewer of them. All three cities' outdoor crags — Bukhansan, Long Dong, Tung Lung Chau — are excellent and effectively out of season in September: hot, humid, and exposed to typhoons. Plan on gyms.",
            }}
          />
        )}
        {tab === "gaming" && (
          <ActivityTab
            profiles={GAMING}
            lede="PC bangs, arcades, board game cafés, esports and hobby retail. Gaming culture is one of the sharpest points of difference between these three cities."
            verdict={{
              title: "A PC bang in Seoul is the single most distinctive thing here",
              body:
                "Two dollars an hour for high-end hardware, food delivered to your seat, open 24 hours, on nearly every block. It is a genuine piece of Korean daily life rather than a tourist activity. Taipei's strength is arcades and hardware retail; Hong Kong's is buying things rather than playing them.",
            }}
          />
        )}
        {tab === "golf" && (
          <ActivityTab
            profiles={GOLF}
            lede="Where golf is worth your time on this trip, and where it is an expensive mistake. The answer is not the same in all three cities."
            verdict={{
              title: "Screen golf in Seoul, and skip the courses entirely",
              body:
                "Korean screen golf is a mainstream social activity on the scale of bowling in the US — two hours in a simulator bay with beer costs a fraction of a green fee, needs no booking infrastructure, and tells you more about the country. Real courses near Seoul are member-oriented, cost ₩150,000-350,000, and are effectively unbookable for a visitor. Hong Kong's Kau Sai Chau is the one realistic actual round on this trip. In Taipei, do not bother.",
            }}
          />
        )}
      </div>

      <footer className="foot">
        <p>
          Rates from open.er-api.com with failover to the currency-api mirrors. Weather and air quality
          from Open-Meteo. Live warnings from Hong Kong Observatory open data. Climate normals from the
          Central Weather Administration (Taiwan), the Hong Kong Observatory, and the Korea
          Meteorological Administration.
        </p>
        <p>
          Reference content reflects conditions as understood at build time. Fares, transfer times, card
          products, entry requirements, shop listings and holiday dates change — anything marked{" "}
          <span className="pill pill-warn">verify</span> should be reconfirmed against an official source
          before you rely on it.
        </p>
      </footer>
    </main>
  );
}
