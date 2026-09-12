import type { CityId } from "./cities";

export type Severity = "none" | "watch" | "warning" | "severe";

/** Hong Kong Observatory warning codes, from the open-data warnsum feed. */
export const HKO_CODES: Record<string, { label: string; severity: Severity; meaning: string }> = {
  TC1: {
    label: "Standby Signal No. 1",
    severity: "watch",
    meaning:
      "A tropical cyclone is within about 800 km and may affect Hong Kong. Nothing closes. Treat it as a cue to check your flights and keep the next 48 hours flexible.",
  },
  TC3: {
    label: "Strong Wind Signal No. 3",
    severity: "warning",
    meaning:
      "Strong winds expected. Schools close, ferries to outlying islands begin to reduce, and the cable car and Peak Tram may suspend. Most of the city still functions.",
  },
  TC8NE: { label: "Gale Signal No. 8 (Northeast)", severity: "severe", meaning: "Gale force winds. The city shuts down." },
  TC8SE: { label: "Gale Signal No. 8 (Southeast)", severity: "severe", meaning: "Gale force winds. The city shuts down." },
  TC8NW: { label: "Gale Signal No. 8 (Northwest)", severity: "severe", meaning: "Gale force winds. The city shuts down." },
  TC8SW: { label: "Gale Signal No. 8 (Southwest)", severity: "severe", meaning: "Gale force winds. The city shuts down." },
  TC9: {
    label: "Increasing Gale Signal No. 9",
    severity: "severe",
    meaning: "Winds increasing further. Stay indoors, away from windows. Flights are cancelled en masse.",
  },
  TC10: {
    label: "Hurricane Signal No. 10",
    severity: "severe",
    meaning:
      "Hurricane force winds over Hong Kong. The most severe signal and rarely raised — roughly once every few years. Do not go outside for any reason.",
  },
  WRAINA: {
    label: "Amber Rainstorm Warning",
    severity: "watch",
    meaning: "Heavy rain, over 30 mm/hour. Flooding in low-lying areas. Everything stays open.",
  },
  WRAINR: {
    label: "Red Rainstorm Warning",
    severity: "warning",
    meaning: "Over 50 mm/hour. Schools close, roads flood, transport slows substantially.",
  },
  WRAINB: {
    label: "Black Rainstorm Warning",
    severity: "severe",
    meaning:
      "Over 70 mm/hour. Severe flash flooding. Stay where you are — the official advice is not to travel until it is cancelled.",
  },
  WTS: { label: "Thunderstorm Warning", severity: "watch", meaning: "Thunderstorms expected. Avoid exposed hiking and the Peak." },
  WL: { label: "Landslip Warning", severity: "warning", meaning: "Landslide risk on slopes. Avoid hillside roads and hiking trails entirely." },
  WHOT: { label: "Very Hot Weather Warning", severity: "watch", meaning: "Heat stress risk. Limit outdoor exertion, hydrate, stay in shade." },
  WCOLD: { label: "Cold Weather Warning", severity: "watch", meaning: "Unusually cold. Not a September concern." },
  WFNTSA: { label: "Flooding in northern New Territories", severity: "warning", meaning: "Localized flooding well away from the tourist areas." },
  WFIRE: { label: "Fire Danger Warning", severity: "watch", meaning: "Elevated hill fire risk. Relevant only if hiking." },
  WTMW: { label: "Tsunami Warning", severity: "severe", meaning: "Follow official instructions immediately." },
};

export interface SignalStep {
  code: string;
  label: string;
  whatCloses: string;
  yourMove: string;
}

/** The Hong Kong ladder, which is the most consequential of the three systems. */
export const HK_LADDER: SignalStep[] = [
  {
    code: "T1",
    label: "Standby",
    whatCloses: "Nothing",
    yourMove: "Check your flight status and the forecast track. Do not change plans yet.",
  },
  {
    code: "T3",
    label: "Strong wind",
    whatCloses: "Schools, some ferries, cable car, Peak Tram, outdoor attractions",
    yourMove:
      "Move outdoor plans indoors. Cancel Lantau or any island day. Buy food and water in case T8 follows overnight.",
  },
  {
    code: "T8",
    label: "Gale",
    whatCloses: "Almost everything — shops, restaurants, offices, buses, ferries; MTR runs underground only",
    yourMove:
      "Stay in your hotel. Expect mass flight cancellations. Contact your airline immediately rather than waiting; rebooking capacity fills within hours.",
  },
  {
    code: "T9 / T10",
    label: "Increasing gale / hurricane",
    whatCloses: "Everything, plus the airport effectively stops",
    yourMove: "Stay away from windows. Do not go outside. Expect multi-day travel disruption afterward.",
  },
];

export interface TyphoonBasics {
  city: CityId;
  system: string;
  authority: string;
  authorityUrl: string;
  app: string;
  howItWorks: string;
  whatShutsDown: string;
  liveData: "live" | "key-required" | "link-only";
}

export const TYPHOON_BASICS: TyphoonBasics[] = [
  {
    city: "hongkong",
    system: "Numbered tropical cyclone signals (1, 3, 8, 9, 10) plus a separate colour-coded rainstorm scale",
    authority: "Hong Kong Observatory",
    authorityUrl: "https://www.hko.gov.hk/en/",
    app: "MyObservatory",
    howItWorks:
      "The Observatory hoists a numbered signal that is legally meaningful — employers, schools and transport operators all key their closure decisions to it. Signals are announced hours in advance with a stated earliest-change time, so you generally get warning before a T8.",
    whatShutsDown:
      "At T8: businesses, most public transport, ferries, and the above-ground network. The airport stays technically open but airlines cancel in bulk.",
    liveData: "live",
  },
  {
    city: "taipei",
    system: "Sea warning, then land warning, issued for each approaching typhoon",
    authority: "Central Weather Administration",
    authorityUrl: "https://www.cwa.gov.tw/eng/",
    app: "CWA Weather (official)",
    howItWorks:
      "A sea warning comes first, then a land warning if the storm threatens Taiwan proper. Separately, each local government announces a 'typhoon day' (停班停課) suspending work and school — that announcement, usually made the evening before, is what actually closes the city.",
    whatShutsDown:
      "On a declared typhoon day: offices, schools, shops, museums, the above-ground MRT, high-speed rail and domestic flights. Essentially the whole island stops.",
    liveData: "key-required",
  },
  {
    city: "seoul",
    system: "Typhoon and heavy rain advisories and warnings",
    authority: "Korea Meteorological Administration",
    authorityUrl: "https://www.weather.go.kr/w/index.do",
    app: "KMA Weather, or Naver Weather",
    howItWorks:
      "Korea uses a two-tier advisory/warning structure rather than a numbered ladder. Seoul is inland, so typhoons usually arrive as remnants — a heavy rain and wind event rather than a shutdown.",
    whatShutsDown:
      "Rarely anything wholesale. Expect subway delays, flight disruption at Incheon, and closure of Han River parks and mountain trails.",
    liveData: "link-only",
  },
];

export const CONTINGENCY = [
  {
    title: "Before you go",
    points: [
      "Buy travel insurance that explicitly covers weather disruption, not just medical. Read whether it covers 'known events' — once a storm is named, cover often stops.",
      "Book the three legs on refundable fares or within one alliance, so a cancellation can be rebooked rather than rebought.",
      "Leave at least one slack day before your transpacific flight home.",
    ],
  },
  {
    title: "When a signal goes up",
    points: [
      "Contact the airline immediately rather than waiting for them to contact you. Rebooking capacity is consumed within hours.",
      "Confirm your hotel can extend your stay before you need it.",
      "Buy food, water and a power bank charge while shops are still open.",
    ],
  },
  {
    title: "During a shutdown",
    points: [
      "Stay indoors and away from windows. Most typhoon injuries are from flying glass and debris.",
      "Do not go to the airport speculatively. Flights resume hours after the signal drops, not immediately.",
      "Hotel restaurants and convenience stores in your building are usually the only food available.",
    ],
  },
  {
    title: "After it passes",
    points: [
      "Transport resumes in stages — MTR and MRT first, ferries and cable cars last, sometimes a full day later.",
      "Hiking trails stay closed for days after heavy rain because of landslide risk.",
      "Expect a surge of rebooked passengers; airport queues are the worst of the trip.",
    ],
  },
];
