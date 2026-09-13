import { CITIES, type CityId } from "./cities";
import { ESSENTIALS } from "./essentials";
import { PLANNER } from "./neighborhoods";
import { HOLIDAYS, ENTRY } from "./toolkit";
import { TAX_REFUNDS } from "./sizing";
import { CLIMBING, GAMING, GOLF } from "./activities";
import { STATIONERY, ARTISAN } from "./shops";
import { AIRPORTS } from "./airport";

/**
 * When the reference content in this repo was written. It has NOT been checked
 * against an official source — that is the entire job of the checklist below,
 * and the UI is explicit about the difference. Bump this when content is
 * substantially rewritten.
 */
export const COMPILED_ON = "2026-09-12";

export type Priority = "critical" | "high" | "medium";
export type Category =
  | "Entry & documents"
  | "Bookings"
  | "Timing & closures"
  | "Transit & cards"
  | "Money"
  | "Connectivity"
  | "Places";

export interface VerifyItem {
  id: string;
  title: string;
  /** The specific question to answer, phrased so you know when you are done. */
  question: string;
  why: string;
  city: CityId | "all";
  category: Category;
  priority: Priority;
  /** Which tab this claim appears on, so you can go read the surrounding context. */
  tab: string;
  officialUrl?: string;
  officialLabel?: string;
}

/**
 * The curated checklist. These are the flagged claims where being wrong costs
 * money, a day, or a flight — as opposed to a shop having moved.
 */
export const CHECKS: VerifyItem[] = [
  /* ---------------- Entry & documents ---------------- */
  {
    id: "keta",
    title: "K-ETA requirement for US passport holders",
    question: "Do US citizens currently need a K-ETA to enter South Korea, and if so, how far ahead must it be filed?",
    why: "The exemption for US citizens has been extended and revised repeatedly. Arriving without a required K-ETA means being denied boarding, not sorted out on arrival.",
    city: "seoul",
    category: "Entry & documents",
    priority: "critical",
    tab: "Toolkit",
    officialUrl: "https://www.k-eta.go.kr/portal/apply/index.do",
    officialLabel: "Official K-ETA portal",
  },
  {
    id: "korea-arrival-card",
    title: "Korea e-Arrival Card",
    question: "Is the electronic arrival card mandatory for your entry route, and can it be filed in advance?",
    why: "Filing online in advance skips a paper queue at Incheon. Requirements differ by nationality and entry type.",
    city: "seoul",
    category: "Entry & documents",
    priority: "high",
    tab: "Toolkit",
    officialUrl: "https://www.k-eta.go.kr/portal/apply/index.do",
    officialLabel: "Korea immigration",
  },
  {
    id: "taiwan-arrival-card",
    title: "Taiwan Online Arrival Card",
    question: "File the free online arrival card for visa-exempt entry. Confirm the filing window before departure.",
    why: "Required for visa-exempt entry and easy to overlook because it is free and not a visa.",
    city: "taipei",
    category: "Entry & documents",
    priority: "critical",
    tab: "Toolkit",
    officialUrl: "https://www.boca.gov.tw/np-1-2.html",
    officialLabel: "Taiwan Bureau of Consular Affairs",
  },
  {
    id: "passport-validity",
    title: "Passport validity and onward ticket",
    question: "Passport valid well beyond the trip, and an onward or return ticket available to show at check-in for each leg?",
    why: "Airlines enforce onward-ticket rules at check-in even when immigration would not. Hong Kong wants at least a month beyond departure.",
    city: "all",
    category: "Entry & documents",
    priority: "critical",
    tab: "Toolkit",
  },

  /* ---------------- Bookings ---------------- */
  {
    id: "insurance",
    title: "Travel insurance covering weather disruption",
    question: "Does your policy cover typhoon-related cancellation and delay, and does cover stop once a storm is named?",
    why: "September is peak typhoon season in Taipei and Hong Kong. Many policies exclude 'known events' from the moment a storm is named, which can be days before it lands.",
    city: "all",
    category: "Bookings",
    priority: "critical",
    tab: "Alerts",
  },
  {
    id: "ticket-flexibility",
    title: "Refundable or same-alliance inter-city legs",
    question: "Can each of the three legs be rebooked rather than rebought if a typhoon cancels it?",
    why: "A cancelled leg on a non-flexible ticket is a full rebuy. Taipei-Hong Kong and Taipei-Seoul are high-frequency routes, so rebooking is usually possible if the fare allows it.",
    city: "all",
    category: "Bookings",
    priority: "critical",
    tab: "Alerts",
  },
  {
    id: "secret-garden",
    title: "Changdeokgung Secret Garden tickets",
    question: "Book the timed guided-entry ticket in advance for the day you want.",
    why: "Limited daily capacity, guided entry only, and it sells out. You will be turned away at the gate without one.",
    city: "seoul",
    category: "Bookings",
    priority: "high",
    tab: "Neighborhoods",
  },

  /* ---------------- Timing & closures ---------------- */
  {
    id: "chuseok",
    title: "Chuseok 2026 dates and substitute holiday",
    question: "Confirm the exact Chuseok holiday span and whether a substitute Monday (28 September) applies.",
    why: "Korea's biggest holiday. Small restaurants close for days, intercity transport sells out weeks ahead, and hotel rates rise. This is the single biggest scheduling factor of the trip.",
    city: "seoul",
    category: "Timing & closures",
    priority: "critical",
    tab: "Toolkit",
  },
  {
    id: "mid-autumn",
    title: "Mid-Autumn Festival holidays in Taiwan and Hong Kong",
    question: "Confirm 25 September (Taiwan) and 26 September (Hong Kong) as public holidays, and check festival event dates.",
    why: "All three destinations observe the same lunar date, so you get overlapping public holidays in one week. Hong Kong takes the day after, not the festival day itself.",
    city: "all",
    category: "Timing & closures",
    priority: "high",
    tab: "Toolkit",
  },
  {
    id: "teachers-day",
    title: "Taiwan Teachers' Day (28 September) public holiday status",
    question: "Is 28 September 2026 a public holiday in Taiwan under the 2025 amendments?",
    why: "If it is, 25-28 September becomes a four-day weekend in Taipei — packed transport, higher hotel rates, and different opening hours.",
    city: "taipei",
    category: "Timing & closures",
    priority: "high",
    tab: "Toolkit",
  },
  {
    id: "hk-museum-thursday",
    title: "Hong Kong museums close Thursday",
    question: "Confirm the closing day for the Museum of Art, Science Museum, History Museum and Space Museum individually.",
    why: "Hong Kong's major museums close Thursday rather than Monday, and the Space Museum differs again. Visitors assume Monday and lose a day.",
    city: "hongkong",
    category: "Timing & closures",
    priority: "medium",
    tab: "Neighborhoods",
  },
  {
    id: "seoul-palace-days",
    title: "Seoul palace closing days",
    question: "Confirm Gyeongbokgung closes Tuesday while Changdeokgung, Changgyeonggung and Deoksugung close Monday.",
    why: "There is no single day when all the palaces are open. Getting the pair backwards wastes a morning.",
    city: "seoul",
    category: "Timing & closures",
    priority: "medium",
    tab: "Neighborhoods",
  },
  {
    id: "npm-closing",
    title: "National Palace Museum closing day",
    question: "Confirm the current closing day before building a day around it.",
    why: "The museum's closing day has changed more than once in recent years.",
    city: "taipei",
    category: "Timing & closures",
    priority: "medium",
    tab: "Neighborhoods",
  },
  {
    id: "cablecar-maintenance",
    title: "Cable car maintenance days",
    question: "Check Ngong Ping 360 and the Maokong Gondola maintenance schedules against your planned dates.",
    why: "Both close for scheduled maintenance and in high wind. A Lantau day with the cable car shut is a much longer bus ride.",
    city: "all",
    category: "Timing & closures",
    priority: "medium",
    tab: "Neighborhoods",
  },

  /* ---------------- Transit & cards ---------------- */
  {
    id: "easycard-wallet",
    title: "EasyCard on an overseas Android phone",
    question: "Can an EasyCard be provisioned to a US-purchased Android device, or do you need the physical card?",
    why: "Assume you need the plastic card. Worth a two-minute check because it changes what you do in the first hour after landing.",
    city: "taipei",
    category: "Transit & cards",
    priority: "high",
    tab: "Basics",
  },
  {
    id: "octopus-choice",
    title: "Octopus card type and Android support",
    question: "Tourist Octopus (non-refundable fee) or on-loan Octopus (refundable deposit)? And is Android provisioning possible?",
    why: "The two card products have different economics and the choice is made at the counter on arrival. Android support is limited to Samsung Pay and Huawei Pay in-market.",
    city: "hongkong",
    category: "Transit & cards",
    priority: "high",
    tab: "Basics",
  },
  {
    id: "tmoney",
    title: "T-money purchase at Incheon",
    question: "Confirm where to buy T-money airside or landside at ICN, and current card price.",
    why: "Seoul subway gates do not take foreign contactless cards, so this is the one card you genuinely cannot travel without.",
    city: "seoul",
    category: "Transit & cards",
    priority: "high",
    tab: "Basics",
  },
  {
    id: "climate-card",
    title: "Seoul Climate Card short-term pass",
    question: "Current short-term pass durations and prices, and whether it covers the airport line.",
    why: "Pays off above roughly five rides a day, but it does not cover travel outside the Seoul zone — including AREX to Incheon.",
    city: "seoul",
    category: "Transit & cards",
    priority: "medium",
    tab: "Basics",
  },
  {
    id: "airport-fares",
    title: "Airport transfer fares and last services",
    question: "Confirm current fares and, more importantly, the last train of the night for each airport link.",
    why: "All three cities' airport trains stop before midnight. Landing after the last service changes your plan and your budget.",
    city: "all",
    category: "Transit & cards",
    priority: "high",
    tab: "Airport",
  },
  {
    id: "youbike",
    title: "YouBike registration for visitors",
    question: "Can you register YouBike without a Taiwanese phone number, or is a credit card via the app sufficient?",
    why: "Taipei's riverside bike paths are one of the better things to do there, and registration is the only obstacle.",
    city: "taipei",
    category: "Transit & cards",
    priority: "medium",
    tab: "Basics",
  },

  /* ---------------- Money ---------------- */
  {
    id: "tax-refund-thresholds",
    title: "Tax refund thresholds and process",
    question: "Confirm Taiwan's NT$2,000 same-day threshold and Korea's ₩30,000 per-transaction threshold plus the immediate-refund cap.",
    why: "Korea's instant refund at the register has a per-trip ceiling, after which you must use the airport process — worth knowing before a big purchase.",
    city: "all",
    category: "Money",
    priority: "medium",
    tab: "Sizing",
  },
  {
    id: "card-acceptance",
    title: "Two cards on different networks",
    question: "Carry a Visa and a Mastercard from different issuers, and tell both banks your travel dates.",
    why: "A minority of Korean terminals reject foreign cards outright, and a fraud block on your only card mid-trip is the expensive failure mode.",
    city: "all",
    category: "Money",
    priority: "high",
    tab: "Basics",
  },

  /* ---------------- Connectivity ---------------- */
  {
    id: "google-fi",
    title: "Google Fi plan tier and international data",
    question: "Does your Fi plan include data in Taiwan, Hong Kong and South Korea at no extra cost?",
    why: "International data is included on Unlimited Plus but not Simply Unlimited. Confirm before departure rather than at the gate — otherwise buy an eSIM in advance.",
    city: "all",
    category: "Connectivity",
    priority: "high",
    tab: "Basics",
  },
  {
    id: "korea-maps",
    title: "Naver Map or KakaoMap installed before departure",
    question: "Install and sign in to Naver Map or KakaoMap before you land in Korea.",
    why: "Google Maps has no usable walking or driving directions in Korea due to mapping-data export restrictions. This is not a preference; it is a hard limitation.",
    city: "seoul",
    category: "Connectivity",
    priority: "high",
    tab: "Toolkit",
  },

  /* ---------------- Places ---------------- */
  {
    id: "venues-bulk",
    title: "Named venues across Climbing, Gaming, Golf, Stationery and Artisan",
    question: "Check any specific shop, gym or venue on a map app the morning you plan to go.",
    why: "Businesses open, close and move. These listings are the least reliable data in the app, which is why each of those tabs leads with search terms rather than addresses.",
    city: "all",
    category: "Places",
    priority: "medium",
    tab: "Climbing / Gaming / Golf / Stationery / Artisan",
  },
  {
    id: "kau-sai-chau",
    title: "Kau Sai Chau green fees and booking",
    question: "Current visitor green fee, ferry cost, rental prices, and whether your dates are bookable.",
    why: "The only realistic round of golf on this trip, and visitor tee times are limited.",
    city: "hongkong",
    category: "Places",
    priority: "medium",
    tab: "Golf",
  },
  {
    id: "hk-workshops",
    title: "Traditional workshop visits in Hong Kong",
    question: "Call ahead for Yuet Tung China Works or any traditional workshop you want to visit.",
    why: "Several keep irregular hours, are unmarked, and expect a phone call first. Have your hotel call in Cantonese.",
    city: "hongkong",
    category: "Places",
    priority: "medium",
    tab: "Artisan",
  },
];

/* ------------------------------------------------------------------ */
/* Automatic flag sweep                                                */
/* ------------------------------------------------------------------ */

/** Keys that plausibly hold a human-readable label on a flagged record. */
const LABEL_KEYS = ["name", "label", "place", "item", "mode", "title", "what", "code"];

function walk(node: unknown, found: string[]): void {
  if (Array.isArray(node)) {
    for (const child of node) walk(child, found);
    return;
  }
  if (!node || typeof node !== "object") return;

  const obj = node as Record<string, unknown>;
  if (obj.confidence === "verify") {
    const key = LABEL_KEYS.find((k) => typeof obj[k] === "string");
    found.push(key ? String(obj[key]) : "(unlabelled item)");
  }
  for (const value of Object.values(obj)) walk(value, found);
}

/**
 * Counts every `confidence: "verify"` record across the data modules, so the
 * curated checklist above can be honest about what it does and does not cover.
 */
export function sweepFlags(): { total: number; bySource: { source: string; items: string[] }[] } {
  const sources: [string, unknown][] = [
    ["Basics", ESSENTIALS],
    ["Neighborhoods", PLANNER],
    ["Toolkit — holidays", HOLIDAYS],
    ["Toolkit — entry", ENTRY],
    ["Sizing — tax refunds", TAX_REFUNDS],
    ["Climbing", CLIMBING],
    ["Gaming", GAMING],
    ["Golf", GOLF],
    ["Stationery", STATIONERY],
    ["Artisan", ARTISAN],
    ["Airport", AIRPORTS],
  ];

  const bySource = sources.map(([source, data]) => {
    const items: string[] = [];
    walk(data, items);
    return { source, items };
  });

  return { total: bySource.reduce((n, s) => n + s.items.length, 0), bySource };
}

export function checksForCity(city: CityId | "all", all: boolean): VerifyItem[] {
  const list = all ? CHECKS : CHECKS.filter((c) => c.city === city || c.city === "all");
  const rank: Record<Priority, number> = { critical: 0, high: 1, medium: 2 };
  return [...list].sort((a, b) => rank[a.priority] - rank[b.priority]);
}

export function cityLabel(city: CityId | "all"): string {
  if (city === "all") return "All three";
  const c = CITIES.find((x) => x.id === city);
  return c ? `${c.flag} ${c.name}` : city;
}

/** "8 months ago" style, for showing how stale the compiled content is. */
export function ageFrom(iso: string): string {
  const then = new Date(`${iso}T00:00:00Z`).getTime();
  if (!Number.isFinite(then)) return "unknown";
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 31) return `${days} days ago`;
  const months = Math.floor(days / 30.44);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = (days / 365.25).toFixed(1);
  return `${years} years ago`;
}
