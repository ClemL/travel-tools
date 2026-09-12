"use client";

import { useEffect, useRef, useState } from "react";
import ClockStrip from "@/components/ClockStrip";
import CurrencyTab from "@/components/CurrencyTab";
import WeatherTab from "@/components/WeatherTab";
import ClimateTab from "@/components/ClimateTab";
import EssentialsTab from "@/components/EssentialsTab";
import PhrasesTab from "@/components/PhrasesTab";
import ToolkitTab from "@/components/ToolkitTab";

const TABS = [
  { id: "currency", label: "💱 Currency" },
  { id: "weather", label: "🌦️ Weather" },
  { id: "climate", label: "📅 September climate" },
  { id: "essentials", label: "🧭 Tipping, transit & payments" },
  { id: "phrases", label: "🗣️ Phrases" },
  { id: "toolkit", label: "🧰 Trip toolkit" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function isTabId(value: string): value is TabId {
  return TABS.some((t) => t.id === value);
}

export default function Page() {
  const [tab, setTab] = useState<TabId>("currency");
  const tabbarRef = useRef<HTMLElement | null>(null);

  // Mirror the active tab into the URL hash so a view is linkable, survives reload,
  // and responds to browser back/forward.
  useEffect(() => {
    const sync = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (isTabId(fromHash)) setTab(fromHash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // On a narrow screen the tab bar scrolls, so keep the active tab visible.
  useEffect(() => {
    const active = tabbarRef.current?.querySelector<HTMLButtonElement>(
      `#tab-${tab}`
    );
    active?.scrollIntoView({ block: "nearest", inline: "nearest" });
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
        </div>
        <ClockStrip />
      </header>

      <nav className="tabbar" role="tablist" aria-label="Trip tools" ref={tabbarRef}>
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => select(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "currency" && <CurrencyTab />}
        {tab === "weather" && <WeatherTab />}
        {tab === "climate" && <ClimateTab />}
        {tab === "essentials" && <EssentialsTab />}
        {tab === "phrases" && <PhrasesTab />}
        {tab === "toolkit" && <ToolkitTab />}
      </div>

      <footer className="foot">
        <p>
          Rates from open.er-api.com with automatic failover to the currency-api mirrors. Weather and air
          quality from Open-Meteo. Climate normals from the Central Weather Administration (Taiwan), the
          Hong Kong Observatory, and the Korea Meteorological Administration.
        </p>
        <p>
          Reference information is compiled and reflects conditions as understood at build time. Fares,
          card products, entry requirements and holiday dates change — anything marked{" "}
          <span className="pill pill-warn">verify</span> should be reconfirmed against an official source
          before you rely on it.
        </p>
      </footer>
    </main>
  );
}
