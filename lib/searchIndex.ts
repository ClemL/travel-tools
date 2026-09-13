import type { CityId } from "./cities";
import { ESSENTIALS } from "./essentials";
import { FOOD } from "./food";
import { PHRASES } from "./phrases";
import { PLANNER } from "./neighborhoods";
import { CLIMATE } from "./climate";
import { POWER, ENTRY, EMERGENCY, APPS, HOLIDAYS, PACKING, SAFETY } from "./toolkit";
import { SIZING_NOTES, TAX_REFUNDS, SHOPPING, MENS_SHOES, WOMENS_SHOES } from "./sizing";
import { CLIMBING, GAMING, GOLF } from "./activities";
import { STATIONERY, ARTISAN } from "./shops";
import { AIRPORTS } from "./airport";
import { HK_LADDER, TYPHOON_BASICS, CONTINGENCY } from "./alerts";
import { CHECKS } from "./verify";

export interface SearchEntry {
  id: string;
  /** Tab id the entry lives on, so a result can navigate straight there. */
  tab: string;
  tabLabel: string;
  city: CityId | null;
  title: string;
  /** Shown under the title, and searched. */
  body: string;
  /** Extra searchable text that is not displayed (local-script terms, synonyms). */
  extra?: string;
}

const entries: SearchEntry[] = [];
let n = 0;
const push = (e: Omit<SearchEntry, "id">) => entries.push({ ...e, id: `e${n++}` });

/* ---- Basics ---- */
for (const e of ESSENTIALS) {
  push({ tab: "essentials", tabLabel: "Basics", city: e.city, title: "Do I tip?", body: e.tipVerdict, extra: "tipping gratuity service charge" });
  for (const group of [
    ["Tipping", e.tipping],
    ["Transit", e.transit],
    ["Payments", e.payments],
    ["Connectivity", e.connectivity],
    ["Airport transfer", e.airport],
  ] as const) {
    for (const f of group[1]) {
      push({ tab: "essentials", tabLabel: "Basics", city: e.city, title: `${group[0]} — ${f.label}`, body: `${f.value}${f.detail ? ". " + f.detail : ""}` });
    }
  }
  for (const t of e.etiquette) push({ tab: "essentials", tabLabel: "Basics", city: e.city, title: "Etiquette", body: t });
  for (const g of e.gotchas) push({ tab: "essentials", tabLabel: "Basics", city: e.city, title: "Watch out", body: g });
}

/* ---- Food ---- */
for (const f of FOOD) {
  push({ tab: "food", tabLabel: "Food", city: f.city, title: "How ordering works", body: f.keyMechanic });
  for (const d of f.dishes) {
    push({ tab: "food", tabLabel: "Food", city: f.city, title: `${d.en} — ${d.local}`, body: `${d.what} Typically ${d.price}.`, extra: `${d.local} ${d.roman}` });
  }
  for (const o of f.ordering) push({ tab: "food", tabLabel: "Food", city: f.city, title: `Ordering — ${o.title}`, body: o.detail });
  push({ tab: "food", tabLabel: "Food", city: f.city, title: "Vegetarian", body: f.vegetarian });
  push({ tab: "food", tabLabel: "Food", city: f.city, title: "Meal times", body: f.mealTimes });
  push({ tab: "food", tabLabel: "Food", city: f.city, title: "What food costs", body: f.budget });
}

/* ---- Phrases ---- */
for (const p of PHRASES) {
  for (const ph of p.phrases) {
    push({ tab: "phrases", tabLabel: "Phrases", city: p.city, title: ph.en, body: `${ph.local} — ${ph.roman}${ph.note ? ". " + ph.note : ""}`, extra: `${ph.local} ${ph.roman} ${p.language}` });
  }
  push({ tab: "phrases", tabLabel: "Phrases", city: p.city, title: `${p.language} — how far English gets you`, body: p.englishLevel });
}

/* ---- Neighborhoods ---- */
for (const p of PLANNER) {
  push({ tab: "neighborhoods", tabLabel: "Neighborhoods", city: p.city, title: "Planning rule", body: p.planningRule });
  for (const nb of p.neighborhoods) {
    push({ tab: "neighborhoods", tabLabel: "Neighborhoods", city: p.city, title: nb.name, body: `${nb.character} Best for ${nb.bestFor.join(", ")}. ${nb.timeNeeded}. ${nb.station}.`, extra: nb.local ?? "" });
  }
  for (const d of p.days) push({ tab: "neighborhoods", tabLabel: "Neighborhoods", city: p.city, title: `Day plan — ${d.title}`, body: `${d.shape} ${d.timing}` });
  for (const cl of p.closures) push({ tab: "neighborhoods", tabLabel: "Neighborhoods", city: p.city, title: `Closed ${cl.closed} — ${cl.place}`, body: cl.detail });
  push({ tab: "neighborhoods", tabLabel: "Neighborhoods", city: p.city, title: "Rainy day options", body: p.rainPlan });
}

/* ---- Climate ---- */
for (const c of CLIMATE) {
  push({ tab: "climate", tabLabel: "Climate", city: c.city, title: "September in brief", body: `${c.headline} Average high ${c.meanHighC}°C, low ${c.meanLowC}°C, ${c.rainfallMm} mm rain, ${c.humidityPct}% humidity.` });
  push({ tab: "climate", tabLabel: "Climate", city: c.city, title: "Typhoon outlook", body: c.typhoonNote });
  push({ tab: "climate", tabLabel: "Climate", city: c.city, title: "Early vs late September", body: c.earlyVsLate });
  for (const w of c.wear) push({ tab: "climate", tabLabel: "Climate", city: c.city, title: "What to wear", body: w });
  for (const w of c.pack) push({ tab: "climate", tabLabel: "Climate", city: c.city, title: "What to pack", body: w });
}

/* ---- Airport ---- */
for (const a of AIRPORTS) {
  push({ tab: "airport", tabLabel: "Airport", city: a.city, title: `${a.code} — which transfer to take`, body: a.decisionRule, extra: a.airport });
  for (const o of a.options) {
    push({
      tab: "airport",
      tabLabel: "Airport",
      city: a.city,
      title: `${a.code} — ${o.mode}`,
      body: `${o.minutes[0]}–${o.minutes[1]} min, ${o.cost[0]}–${o.cost[1]} local. ${o.route}. ${o.frequency}, ${o.hours}. ${o.bestFor}`,
    });
  }
  if (a.secondAirport) {
    push({ tab: "airport", tabLabel: "Airport", city: a.city, title: `${a.secondAirport.name} (${a.secondAirport.code})`, body: a.secondAirport.note });
  }
}

/* ---- Toolkit ---- */
for (const p of POWER) push({ tab: "toolkit", tabLabel: "Toolkit", city: p.city, title: `Power — ${p.voltage}, ${p.plugs}`, body: p.note, extra: "adapter plug socket voltage" });
for (const e of ENTRY) push({ tab: "toolkit", tabLabel: "Toolkit", city: e.city, title: `Entry — ${e.visa}`, body: `${e.stay}. ${e.arrivalCard} ${e.passportRule}`, extra: "visa passport k-eta arrival card" });
for (const e of EMERGENCY) push({ tab: "toolkit", tabLabel: "Toolkit", city: e.city, title: `Emergency numbers — police ${e.police}, medical ${e.medical}`, body: `Tourist hotline ${e.touristHotline}. ${e.touristHotlineNote} ${e.extra}`, extra: "999 110 112 119 1330 ambulance" });
for (const a of APPS) push({ tab: "toolkit", tabLabel: "Toolkit", city: a.city === "all" ? null : a.city, title: `App — ${a.name}`, body: a.purpose });
for (const h of HOLIDAYS) push({ tab: "toolkit", tabLabel: "Toolkit", city: null, title: `${h.date} — ${h.name}`, body: `${h.where}. ${h.impact}` });
for (const p of PACKING) push({ tab: "toolkit", tabLabel: "Toolkit", city: null, title: `Pack — ${p.item}`, body: p.why });
for (const s of SAFETY) push({ tab: "toolkit", tabLabel: "Toolkit", city: null, title: s.title, body: s.body });

/* ---- Alerts ---- */
for (const s of HK_LADDER) push({ tab: "alerts", tabLabel: "Alerts", city: "hongkong", title: `Signal ${s.code} — ${s.label}`, body: `Closes: ${s.whatCloses}. ${s.yourMove}`, extra: "typhoon signal t8 t10" });
for (const b of TYPHOON_BASICS) push({ tab: "alerts", tabLabel: "Alerts", city: b.city, title: `Typhoon system — ${b.authority}`, body: `${b.howItWorks} ${b.whatShutsDown}` });
for (const c of CONTINGENCY) for (const p of c.points) push({ tab: "alerts", tabLabel: "Alerts", city: null, title: `Contingency — ${c.title}`, body: p });

/* ---- Sizing ---- */
for (const s of SIZING_NOTES) push({ tab: "sizing", tabLabel: "Sizing", city: null, title: s.title, body: s.body, extra: "size sizing mm shoe clothing" });
for (const t of TAX_REFUNDS) push({ tab: "sizing", tabLabel: "Sizing", city: t.city, title: `Tax refund — ${t.vatRate} VAT`, body: `${t.threshold}. ${t.mechanism} ${t.catch}`, extra: "vat refund tax free" });
for (const s of SHOPPING) push({ tab: "sizing", tabLabel: "Sizing", city: s.city, title: `Worth buying — ${s.what}`, body: `${s.where}. ${s.note}` });

/* Shoe conversions, indexed so "270mm" or "US 9" finds the row. */
for (const [rows, who] of [[MENS_SHOES, "Men's"], [WOMENS_SHOES, "Women's"]] as const) {
  for (const r of rows) {
    push({
      tab: "sizing",
      tabLabel: "Sizing",
      city: null,
      title: `${who} shoe — US ${r.us} = ${r.mm} mm`,
      body: `US ${r.us} converts to ${r.mm} mm (the number Korean shops use), EU ${r.eu}, UK ${r.uk}.`,
      extra: `${r.mm}mm ${r.mm} mm us${r.us} eu${r.eu} uk${r.uk} shoe size korea japan`,
    });
  }
}

/* ---- Activities ---- */
for (const [set, tab, label] of [
  [CLIMBING, "climbing", "Climbing"],
  [GAMING, "gaming", "Gaming"],
  [GOLF, "golf", "Golf"],
] as const) {
  for (const p of set) {
    push({ tab, tabLabel: label, city: p.city, title: `${label} scene — ${p.sceneRating}`, body: p.summary });
    push({ tab, tabLabel: label, city: p.city, title: `${label} — how to find places`, body: `${p.howToFind.app}. Search ${p.howToFind.searchTerm}. ${p.howToFind.note}`, extra: p.howToFind.searchTerm });
    for (const item of p.practical) push({ tab, tabLabel: label, city: p.city, title: `${label} — ${item.label}`, body: `${item.value}${item.detail ? ". " + item.detail : ""}` });
    for (const v of p.venues) push({ tab, tabLabel: label, city: p.city, title: v.name, body: `${v.area}. ${v.what}${v.price ? " " + v.price : ""}`, extra: v.local ?? "" });
    for (const e of p.etiquette ?? []) push({ tab, tabLabel: label, city: p.city, title: `${label} etiquette`, body: e });
  }
}

/* ---- Shops ---- */
for (const [set, tab, label] of [
  [STATIONERY, "stationery", "Stationery"],
  [ARTISAN, "artisan", "Artisan"],
] as const) {
  for (const s of set) {
    push({ tab, tabLabel: label, city: s.city, title: `${label} — what this city does best`, body: s.signature });
    for (const d of s.district) push({ tab, tabLabel: label, city: s.city, title: `${d.name}`, body: d.why });
    for (const shop of s.shops) push({ tab, tabLabel: label, city: s.city, title: shop.name, body: `${shop.area}. ${shop.what}`, extra: shop.local ?? "" });
    for (const b of s.buying) push({ tab, tabLabel: label, city: s.city, title: `${label} — buying note`, body: b });
  }
}

/* ---- Verify checklist ---- */
for (const c of CHECKS) {
  push({ tab: "verify", tabLabel: "Verify", city: c.city === "all" ? null : c.city, title: `Verify — ${c.title}`, body: `${c.question} ${c.why}` });
}

export const SEARCH_INDEX: SearchEntry[] = entries;

export interface SearchHit extends SearchEntry {
  score: number;
}

/**
 * Small, dependency-free ranked search. The corpus is a few thousand short
 * strings already in memory, so scanning it per keystroke is cheaper than
 * building and shipping an index.
 */
export function search(query: string, limit = 40): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const hits: SearchHit[] = [];
  for (const entry of SEARCH_INDEX) {
    const title = entry.title.toLowerCase();
    const body = entry.body.toLowerCase();
    const extra = (entry.extra ?? "").toLowerCase();

    let score = 0;
    let matchedAll = true;
    for (const term of terms) {
      let termScore = 0;
      if (title.includes(term)) termScore += title.startsWith(term) ? 12 : 8;
      if (extra.includes(term)) termScore += 5;
      if (body.includes(term)) termScore += 3;
      if (termScore === 0) {
        matchedAll = false;
        break;
      }
      score += termScore;
    }
    if (!matchedAll) continue;
    // Prefer shorter entries: they are more likely to be the specific answer.
    score += Math.max(0, 4 - Math.floor(body.length / 200));
    hits.push({ ...entry, score });
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}
