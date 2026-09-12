"use client";

import { useEffect, useRef, useState } from "react";
import ClockStrip from "@/components/ClockStrip";
import CurrencyTab from "@/components/CurrencyTab";
import WeatherTab from "@/components/WeatherTab";
import AlertsTab from "@/components/AlertsTab";
import ClimateTab from "@/components/ClimateTab";
import NeighborhoodsTab from "@/components/NeighborhoodsTab";
import EssentialsTab from "@/components/EssentialsTab";
import FoodTab from "@/components/FoodTab";
import PhrasesTab from "@/components/PhrasesTab";
import SizingTab from "@/components/SizingTab";
import ToolkitTab from "@/components/ToolkitTab";
import ActivityTab from "@/components/ActivityTab";
import { OfflineBadge } from "@/components/OfflineProvider";
import { CLIMBING, GAMING, GOLF } from "@/lib/activities";

type TabId =
  | "currency"
  | "weather"
  | "alerts"
  | "climate"
  | "neighborhoods"
  | "toolkit"
  | "essentials"
  | "food"
  | "phrases"
  | "sizing"
  | "climbing"
  | "gaming"
  | "golf";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

interface TabGroup {
  group: string;
  tabs: Tab[];
}

const GROUPS: TabGroup[] = [
  {
    group: "Live",
    tabs: [
      { id: "currency", label: "Currency", icon: "💱" },
      { id: "weather", label: "Weather", icon: "🌦️" },
      { id: "alerts", label: "Alerts", icon: "🌀" },
    ],
  },
  {
    group: "Plan",
    tabs: [
      { id: "climate", label: "Climate", icon: "📅" },
      { id: "neighborhoods", label: "Neighborhoods", icon: "🗺️" },
      { id: "toolkit", label: "Toolkit", icon: "🧰" },
    ],
  },
  {
    group: "On the ground",
    tabs: [
      { id: "essentials", label: "Basics", icon: "🧭" },
      { id: "food", label: "Food", icon: "🍜" },
      { id: "phrases", label: "Phrases", icon: "🗣️" },
      { id: "sizing", label: "Sizing", icon: "👕" },
    ],
  },
  {
    group: "Do",
    tabs: [
      { id: "climbing", label: "Climbing", icon: "🧗" },
      { id: "gaming", label: "Gaming", icon: "🎮" },
      { id: "golf", label: "Golf", icon: "⛳" },
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

  // On a narrow screen the nav scrolls, so keep the active tab visible.
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
  };

  return (
    <main className="shell">
      <header className="masthead">
        <div>
          <h1>Asia Trip Tools</h1>
          <p>Taipei · Hong Kong · Seoul — September 2026</p>
          <OfflineBadge />
        </div>
        <ClockStrip />
      </header>

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

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "currency" && <CurrencyTab />}
        {tab === "weather" && <WeatherTab />}
        {tab === "alerts" && <AlertsTab />}
        {tab === "climate" && <ClimateTab />}
        {tab === "neighborhoods" && <NeighborhoodsTab />}
        {tab === "toolkit" && <ToolkitTab />}
        {tab === "essentials" && <EssentialsTab />}
        {tab === "food" && <FoodTab />}
        {tab === "phrases" && <PhrasesTab />}
        {tab === "sizing" && <SizingTab />}
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
          Reference content reflects conditions as understood at build time. Fares, card products, entry
          requirements, venue listings and holiday dates change — anything marked{" "}
          <span className="pill pill-warn">verify</span> should be reconfirmed against an official source
          before you rely on it.
        </p>
      </footer>
    </main>
  );
}
