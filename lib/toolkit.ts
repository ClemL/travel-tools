import type { CityId } from "./cities";

export interface PowerInfo {
  city: CityId;
  voltage: string;
  frequency: string;
  plugs: string;
  adapterNeeded: boolean;
  note: string;
}

export const POWER: PowerInfo[] = [
  {
    city: "taipei",
    voltage: "110 V",
    frequency: "60 Hz",
    plugs: "Type A / B",
    adapterNeeded: false,
    note: "Identical to the United States. Your US plugs and chargers work as-is, with no adapter and no converter.",
  },
  {
    city: "hongkong",
    voltage: "220 V",
    frequency: "50 Hz",
    plugs: "Type G (UK 3-pin)",
    adapterNeeded: true,
    note: "Large British-style 3-pin sockets. Almost every modern charger is 100-240 V, so you need a plug adapter, not a voltage converter. Hotels often stock adapters at the front desk.",
  },
  {
    city: "shenzhen",
    voltage: "220 V",
    frequency: "50 Hz",
    plugs: "Type A / C / I",
    adapterNeeded: false,
    note: "Most wall panels pair a two-pin socket that takes US flat-pin plugs with an angled three-pin (Type I) socket. A US two-pin charger fits without an adapter; a three-prong grounded US plug does not. The voltage is double the US — check the charger says 100-240 V.",
  },
  {
    city: "seoul",
    voltage: "220 V",
    frequency: "60 Hz",
    plugs: "Type C / F (Europlug)",
    adapterNeeded: true,
    note: "Round two-pin European sockets, not the UK type used in Hong Kong. A single UK adapter will not cover both cities — carry a universal adapter or one of each.",
  },
];

export interface EntryInfo {
  city: CityId;
  visa: string;
  stay: string;
  arrivalCard: string;
  passportRule: string;
  officialUrl: string;
  officialLabel: string;
}

/** Entry rules change often. Everything here must be reconfirmed close to departure. */
export const ENTRY: EntryInfo[] = [
  {
    city: "taipei",
    visa: "Visa-exempt for US passport holders",
    stay: "Up to 90 days",
    arrivalCard: "Online Arrival Card required — file it free on the NIA site before you fly.",
    passportRule: "Passport valid for the duration of stay; proof of onward or return travel may be requested.",
    officialUrl: "https://www.boca.gov.tw/np-1-2.html",
    officialLabel: "Taiwan Bureau of Consular Affairs",
  },
  {
    city: "hongkong",
    visa: "Visa-free for US passport holders",
    stay: "Up to 90 days",
    arrivalCard: "Paper arrival card on the plane, or an electronic equivalent at some counters. No pre-registration.",
    passportRule: "Passport valid at least one month beyond your intended departure date.",
    officialUrl: "https://www.immd.gov.hk/eng/services/visas/visit-transit.html",
    officialLabel: "HK Immigration Department",
  },
  {
    city: "shenzhen",
    visa: "Visa required, unless your routing qualifies for 240-hour visa-free transit",
    stay: "Up to 240 hours on visa-free transit; otherwise the terms of your visa",
    arrivalCard:
      "Arrival card at the checkpoint, with an online pre-filing option. For visa-free transit, use the dedicated counter and show the onward ticket.",
    passportRule:
      "Visa-free transit needs a confirmed onward ticket to a third country or region — Hong Kong and Macau count — within 240 hours. Arriving from Hong Kong and returning to Hong Kong does not qualify. US citizens cannot use the 5-day Shenzhen-only port visa.",
    officialUrl: "https://en.nia.gov.cn/",
    officialLabel: "China National Immigration Administration",
  },
  {
    city: "seoul",
    visa: "K-ETA status for US citizens has changed repeatedly — confirm the current rule",
    stay: "Up to 90 days visa-free",
    arrivalCard:
      "Korea operates an electronic arrival card (e-Arrival Card) that can be filed online in advance. Whether it is mandatory for you depends on the current rule set.",
    passportRule: "Passport valid for the duration of stay; onward ticket commonly checked at check-in.",
    officialUrl: "https://www.k-eta.go.kr/portal/apply/index.do",
    officialLabel: "Official K-ETA portal",
  },
];

export interface EmergencyInfo {
  city: CityId;
  police: string;
  medical: string;
  touristHotline: string;
  touristHotlineNote: string;
  usMission: string;
  extra: string;
}

export const EMERGENCY: EmergencyInfo[] = [
  {
    city: "taipei",
    police: "110",
    medical: "119 (fire and ambulance)",
    touristHotline: "0800-011-765",
    touristHotlineNote: "24-hour English, Japanese and Korean tourist hotline run by the Tourism Administration.",
    usMission: "American Institute in Taiwan (AIT), Neihu District, Taipei",
    extra: "Taiwan's emergency medical care is excellent and inexpensive. Hospitals will treat foreigners and bill directly.",
  },
  {
    city: "hongkong",
    police: "999",
    medical: "999",
    touristHotline: "1836 222",
    touristHotlineNote: "Hong Kong Tourism Board visitor hotline, daily 09:00-18:00.",
    usMission: "US Consulate General Hong Kong and Macau, 26 Garden Road, Central",
    extra: "112 also connects to emergency services from a mobile. Public hospital A&E charges non-residents a substantial flat fee.",
  },
  {
    city: "shenzhen",
    police: "110",
    medical: "120 (ambulance; fire is 119)",
    touristHotline: "12345",
    touristHotlineNote:
      "Shenzhen's city government service line; ask for foreign-language service (外语服务). 12301 is the national tourism complaints line.",
    usMission: "US Consulate General Guangzhou, Zhujiang New Town — the nearest US mission; there is none in Shenzhen",
    extra:
      "Police, ambulance and fire are three different numbers. The University of Hong Kong–Shenzhen Hospital in Futian runs on Hong Kong practice and has English-speaking international services.",
  },
  {
    city: "seoul",
    police: "112",
    medical: "119 (fire and ambulance)",
    touristHotline: "1330",
    touristHotlineNote:
      "The single most useful number of the trip: 24-hour Korea Travel Hotline with live interpretation. Call it and hand your phone to a taxi driver or shopkeeper if you are stuck.",
    usMission: "US Embassy Seoul, 188 Sejong-daero, Jongno-gu",
    extra: "Note the reversal versus Taiwan: police is 112 and medical is 119. Dialing 110 does nothing.",
  },
];

export interface AppInfo {
  city: CityId | "all";
  name: string;
  purpose: string;
  priority: "essential" | "useful";
}

export const APPS: AppInfo[] = [
  { city: "all", name: "Google Translate (offline packs)", purpose: "Download Chinese and Korean packs before you fly — Google is blocked in mainland China, so do it before you cross.", priority: "essential" },
  { city: "all", name: "Airalo / Ubigi", purpose: "eSIM data if you would rather not queue at an airport SIM counter.", priority: "useful" },
  { city: "all", name: "XE or your bank's app", purpose: "Sanity-check exchange rates before accepting a dynamic-currency-conversion prompt.", priority: "useful" },
  { city: "taipei", name: "Taipei Metro / Go! Taipei Metro", purpose: "Official MRT routing, fares and exits.", priority: "useful" },
  { city: "taipei", name: "LINE", purpose: "Universal messaging in Taiwan; restaurants and tours communicate through it.", priority: "essential" },
  { city: "taipei", name: "Uber", purpose: "Works with your existing account and dispatches licensed taxis.", priority: "useful" },
  { city: "taipei", name: "CWA Weather", purpose: "Official typhoon warnings straight from the Central Weather Administration.", priority: "essential" },
  { city: "hongkong", name: "MTR Mobile", purpose: "Routing, fares, first and last train times, and exit selection.", priority: "essential" },
  { city: "hongkong", name: "MyObservatory", purpose: "Typhoon signals and rainstorm warnings the moment they are hoisted. Non-negotiable in September.", priority: "essential" },
  { city: "hongkong", name: "OpenRice", purpose: "The local restaurant authority. Google reviews are far less reliable here.", priority: "essential" },
  { city: "hongkong", name: "Citymapper", purpose: "Best multi-modal routing in Hong Kong, including trams, ferries and minibuses.", priority: "useful" },
  { city: "shenzhen", name: "Alipay", purpose: "Payments, the metro ride code, DiDi and a built-in translator in one app. Link a foreign card and verify your passport before you fly.", priority: "essential" },
  { city: "shenzhen", name: "WeChat", purpose: "Messaging plus WeChat Pay. Many restaurants' scan-to-order menus run inside it.", priority: "essential" },
  { city: "shenzhen", name: "Amap (高德地图)", purpose: "Accurate maps and live transit with an English interface. Google Maps is blocked and offset; Apple Maps is the alternative.", priority: "essential" },
  { city: "shenzhen", name: "DiDi", purpose: "Ride-hailing in English with a foreign card. Also available as a mini-program inside Alipay.", priority: "useful" },
  { city: "shenzhen", name: "Trip.com", purpose: "Books high-speed rail with a passport and a foreign card, in English.", priority: "useful" },
  { city: "seoul", name: "Naver Map or KakaoMap", purpose: "Mandatory. Google Maps cannot give walking or driving directions in Korea.", priority: "essential" },
  { city: "seoul", name: "Papago", purpose: "Naver's translator — materially better than Google for Korean, with camera menu translation.", priority: "essential" },
  { city: "seoul", name: "Kakao T", purpose: "Taxi hailing. Works with a foreign card and an English interface.", priority: "essential" },
  { city: "seoul", name: "Subway Korea", purpose: "Offline subway routing with exit numbers and car positions for fastest transfers.", priority: "useful" },
];

export interface Holiday {
  date: string;
  weekday: string;
  name: string;
  where: string;
  /** Which cities this affects, so the tab can filter reliably rather than matching on `where`. */
  cities: CityId[];
  impact: string;
  confidence: "stable" | "verify";
}

/** Lunar-calendar and substitute-holiday rules shift; reconfirm before locking an itinerary. */
export const HOLIDAYS: Holiday[] = [
  {
    date: "2026-09-25",
    weekday: "Friday",
    name: "Mid-Autumn Festival (中秋節)",
    where: "Taiwan",
    cities: ["taipei"],
    impact:
      "Public holiday. Expect a long weekend, heavy domestic travel, packed trains, and barbecue smoke everywhere — Taiwan barbecues for Mid-Autumn. Book intercity rail early.",
    confidence: "stable",
  },
  {
    date: "2026-09-26",
    weekday: "Saturday",
    name: "Day following Mid-Autumn Festival",
    where: "Hong Kong",
    cities: ["hongkong"],
    impact:
      "Hong Kong takes the day after as the statutory holiday, not the festival day itself. The Tai Hang Fire Dragon Dance and Victoria Park lantern displays run on the festival evening of the 25th — worth planning around.",
    confidence: "stable",
  },
  {
    date: "2026-09-24 → 09-26",
    weekday: "Thursday-Saturday",
    name: "Chuseok (추석)",
    where: "South Korea",
    cities: ["seoul"],
    impact:
      "Korea's biggest holiday. Many small restaurants and shops close for several days, KTX and intercity buses sell out weeks ahead, and Seoul empties out as families travel to hometowns. Palaces and major museums usually open free on the holiday. A substitute holiday on Monday 28 September is likely given the Saturday overlap.",
    confidence: "verify",
  },
  {
    date: "2026-09-25 → 09-27",
    weekday: "Friday-Sunday",
    name: "Mid-Autumn Festival (中秋节)",
    where: "Mainland China",
    cities: ["shenzhen"],
    impact:
      "Three-day public holiday. Restaurants fill with family dinners, and Shenzhen Bay Park and the waterfronts are packed on the festival night. Northbound border traffic from Hong Kong spikes.",
    confidence: "verify",
  },
  {
    date: "2026-09-28",
    weekday: "Monday",
    name: "Teachers' Day / Confucius' Birthday",
    where: "Taiwan",
    cities: ["taipei"],
    impact:
      "Taiwan legislated additional public holidays effective 2026, which would make this a day off and turn 25-28 September into a four-day weekend. Confirm before assuming shops and offices are open.",
    confidence: "verify",
  },
  {
    date: "2026-10-01",
    weekday: "Thursday",
    name: "National Day of the PRC",
    where: "Hong Kong",
    cities: ["hongkong"],
    impact: "Public holiday with a fireworks display over Victoria Harbour. Hotels and cross-border travel get expensive.",
    confidence: "stable",
  },
  {
    date: "2026-10-01 → 10-07",
    weekday: "Thursday-Wednesday",
    name: "National Day Golden Week (国庆节)",
    where: "Mainland China, spilling into Hong Kong",
    cities: ["shenzhen", "hongkong"],
    impact:
      "The largest domestic travel week of the year. Trains and flights sell out, attractions hit capacity limits, hotel prices spike, and the Shenzhen–Hong Kong crossings carry record traffic in both directions. Adjacent weekend days are usually made into working days. Avoid it if you can.",
    confidence: "verify",
  },
  {
    date: "2026-10-03",
    weekday: "Saturday",
    name: "National Foundation Day (개천절)",
    where: "South Korea",
    cities: ["seoul"],
    impact: "Public holiday. Falls on a Saturday, so a substitute Monday may apply.",
    confidence: "verify",
  },
  {
    date: "2026-10-09",
    weekday: "Friday",
    name: "Hangeul Day (한글날)",
    where: "South Korea",
    cities: ["seoul"],
    impact: "Public holiday celebrating the Korean alphabet. Long weekend.",
    confidence: "stable",
  },
  {
    date: "2026-10-10",
    weekday: "Saturday",
    name: "National Day (雙十節)",
    where: "Taiwan",
    cities: ["taipei"],
    impact: "Double Ten. Parades and fireworks; central Taipei around the Presidential Office closes to traffic.",
    confidence: "stable",
  },
];

export interface PackItem {
  item: string;
  why: string;
  category: "Weather" | "Power & tech" | "Documents" | "Health" | "Comfort";
  /** Only relevant when one of these destinations is on; omitted means everywhere. */
  cities?: CityId[];
}

export const PACKING: PackItem[] = [
  { item: "Compact umbrella", why: "Taipei and Hong Kong average 13-14 inches of rain in September. A rain shell is unwearable at 90 °F and 78% humidity.", category: "Weather" },
  { item: "Two pairs of shoes", why: "One pair will be soaked. Rotation is the only way to avoid walking in wet shoes for a week.", category: "Weather" },
  { item: "Light long-sleeve layer", why: "Indoor air conditioning in Hong Kong is punishing, and late-September Seoul evenings drop to 57 °F (14 °C).", category: "Weather" },
  { item: "Moisture-wicking shirts", why: "Cotton does not dry in subtropical humidity. Synthetics or linen only.", category: "Weather" },
  { item: "Universal plug adapter", why: "The sockets differ by destination: Type G in Hong Kong, Type C/F in Seoul, US Type A/B in Taipei, and Type A/I in mainland China.", category: "Power & tech" },
  { item: "Power bank (in carry-on)", why: "Heavy map, translation and payment app use drains a phone by mid-afternoon. Lithium batteries are cabin-only, and mainland China only allows power banks with a CCC safety mark on domestic flights.", category: "Power & tech" },
  { item: "Offline maps and translation packs", why: "Download before you fly — especially Naver Map for Korea, where Google Maps cannot navigate.", category: "Power & tech" },
  { item: "Passport + digital and paper copies", why: "Required for tax-refund claims and hotel check-in everywhere on this trip, and for every metro security check and train ticket in mainland China.", category: "Documents" },
  { item: "Alipay or WeChat Pay, set up and tested", why: "Mainland China runs on QR payments. Link a foreign card, verify your passport and make one small test payment before you cross.", category: "Documents", cities: ["shenzhen"] },
  { item: "Travel insurance with weather-disruption cover", why: "September typhoons cancel flights in bulk out of Taipei, Hong Kong and Shenzhen.", category: "Documents" },
  { item: "Two payment cards on different networks", why: "Korean terminals occasionally reject a given foreign card; a Visa and a Mastercard from different banks is the cheap hedge.", category: "Documents" },
  { item: "Electrolyte tablets", why: "Sweat loss walking Taipei or Hong Kong in September is substantial.", category: "Health" },
  { item: "High-SPF sunscreen", why: "UV index regularly hits 8-11. Local formulations are excellent if you would rather buy on arrival.", category: "Health" },
  { item: "Anti-chafe balm and blister plasters", why: "Humidity plus 20k steps a day is a specific and predictable failure mode.", category: "Health" },
  { item: "Small packable daypack", why: "For the layer you shed, the umbrella you carry, and the trash you must hold — Taipei has almost no public bins.", category: "Comfort" },
  { item: "Hand towel or handkerchief", why: "Standard practice locally. Many public restrooms have no dryer or paper towels.", category: "Comfort" },
];

export interface SafetyNote {
  title: string;
  body: string;
  /** "all" for notes that apply everywhere; otherwise the cities they concern. */
  cities: CityId[] | "all";
}

export const SAFETY: SafetyNote[] = [
  {
    title: "Typhoon protocol",
    cities: ["taipei", "hongkong", "shenzhen"],
    body:
      "Hong Kong hoists numbered signals: T1 (standby), T3 (strong wind), T8 (gale — city shuts down), T9 and T10 (hurricane force). Taiwan issues sea and then land warnings; a land warning generally means a government-declared day off. Shenzhen uses colour-coded warnings from white to red and orders a city-wide stop at the top levels. Everywhere, follow the official app, expect flight cancellations 12-24 hours ahead of landfall, and do not plan to move cities on a warning day.",
  },
  {
    title: "Tap water",
    cities: "all",
    body:
      "Seoul's Arisu tap water is treated to a high standard and safe, though most locals still drink filtered or bottled. Hong Kong tap water meets WHO standards at the mains, but older building plumbing means many residents boil it. Taipei's tap water is treated but conventionally boiled or filtered before drinking. In mainland China nobody drinks tap water unboiled; hotels supply kettles and bottled water. Practical rule: drink the filtered water dispensers that are everywhere in hotels, convenience stores and metro stations.",
  },
  {
    title: "Personal safety",
    cities: "all",
    body:
      "All of these cities are among the safest large cities in the world, with very low violent crime and normal late-night solo walking. The realistic risks are heat exhaustion, traffic (scooters in Taipei ignore crosswalk conventions), and typhoon-related disruption — not crime.",
  },
  {
    title: "Health and pharmacies",
    cities: "all",
    body:
      "Pharmacies are plentiful and staffed by pharmacists who can recommend over-the-counter treatment. Taiwan and Korea both have excellent, inexpensive walk-in clinics; Hong Kong private clinics are fast but costly. Carry prescriptions in their original packaging with the generic name written down.",
  },
  {
    title: "Scams and pricing",
    cities: "all",
    body:
      "Rare everywhere on this list. The realistic ones: dynamic currency conversion at card terminals (always choose to be charged in the local currency), tailor and gemstone touts in Tsim Sha Tsui, refurbished-as-new electronics at Huaqiangbei, touts at Luohu Commercial City, and 'juicy bar' bill scams in Seoul's Itaewon and Hongdae nightlife areas.",
  },
  {
    title: "Connecting the cities",
    cities: "all",
    body:
      "Taipei-Hong Kong is roughly 1h50m and one of the busiest air corridors in the world; Taipei-Seoul about 2h30m; Hong Kong-Seoul about 3h30m. Hong Kong-Shenzhen is not a flight at all: 15-20 minutes by high-speed rail from West Kowloon, or the MTR to the Lo Wu border. China Airlines, EVA, Cathay Pacific, Korean Air and Asiana serve the air routes multiple times daily, so rebooking after weather disruption is usually possible within hours.",
  },
  {
    title: "Your phone is your wallet",
    cities: ["shenzhen"],
    body:
      "In Shenzhen a phone carries payment, maps, translation and transit at once, so losing it or running the battery flat is the realistic emergency. Carry a power bank, keep a foreign card and a few hundred yuan in a separate pocket, and write your hotel address in characters on paper.",
  },
];

/* ------------------------------------------------------------------ */
/* Jet lag                                                             */
/* ------------------------------------------------------------------ */

export interface JetLagStep {
  when: string;
  action: string;
  why: string;
}

/**
 * Boston to Taipei, Hong Kong and Shenzhen is a 12-hour shift; to Seoul it is 13. Twelve
 * hours is the theoretical maximum circadian disruption — there is no worse
 * case, and the direction your body drifts becomes ambiguous, which is why the
 * advice below is about forcing a direction rather than just enduring it.
 */
export const JETLAG: JetLagStep[] = [
  {
    when: "3-4 days before you fly",
    action: "Shift your sleep an hour later each night and delay morning light by the same amount.",
    why:
      "A 12-hour shift is easier to reach by delaying than advancing, and a few hours banked before departure removes a day of misery on arrival.",
  },
  {
    when: "On the plane",
    action: "Set your watch to destination time at the gate and eat and sleep on that schedule, not the cabin's.",
    why: "Meal timing is a real circadian cue, not just a comfort. Deciding once at the gate removes the constant arithmetic.",
  },
  {
    when: "Arrival day, if you land in the morning",
    action: "Get outside into daylight and stay up until at least 21:00 local. Cap any nap at 30 minutes before 15:00.",
    why:
      "Morning light after a long eastward shift is the strongest available signal. A long afternoon nap is the single most common way people extend jet lag from two days to five.",
  },
  {
    when: "Arrival day, if you land in the evening",
    action: "Go to bed at a normal local hour even if you are not tired, and set an alarm.",
    why: "Sleeping in on day one pushes the whole adjustment back. The alarm matters more than the bedtime.",
  },
  {
    when: "First three mornings",
    action: "Get 30 minutes of outdoor light within an hour of waking, and avoid bright light late in the evening.",
    why: "Light timing moves the body clock faster than anything else available to you. This is the part that actually works.",
  },
  {
    when: "Caffeine",
    action: "Use it in the local morning only, and stop by early afternoon.",
    why: "It helps you stay awake on the right schedule, but late caffeine wrecks the night you are trying to establish.",
  },
  {
    when: "Melatonin, if you use it",
    action: "A small dose in the local evening, a few hours before your intended bedtime.",
    why:
      "Timing matters more than dose, and large doses are not better. Discuss it with your doctor rather than treating it as a sleeping pill.",
  },
  {
    when: "Between cities",
    action: "Taipei, Hong Kong and Shenzhen share a time zone; Seoul is one hour ahead.",
    why: "The inter-city legs cost you almost nothing. All the adjustment is the transpacific hop at each end.",
  },
];

/* ------------------------------------------------------------------ */
/* Luggage, laundry and logistics                                      */
/* ------------------------------------------------------------------ */

export interface LogisticsNote {
  title: string;
  body: string;
  city: CityId | "all";
}

export const LOGISTICS: LogisticsNote[] = [
  {
    title: "Coin lockers at stations",
    body:
      "Most of these cities have lockers at major stations, sized small to large, paid by transit card, QR code or coins. Useful on a checkout day when your flight is at night — drop the bags and get a final day of sightseeing rather than dragging a suitcase around.",
    city: "all",
  },
  {
    title: "In-town airport check-in",
    body:
      "Hong Kong lets you check bags and collect boarding passes at Hong Kong and Kowloon stations on your departure day, then travel unencumbered. This is unusual and genuinely valuable. Confirm your airline participates.",
    city: "hongkong",
  },
  {
    title: "Luggage forwarding",
    body:
      "Taiwan and Korea both have door-to-door luggage delivery between hotels and airports, often via convenience stores. Worth it on a multi-city trip if you would rather not handle bags on transit days.",
    city: "all",
  },
  {
    title: "Laundry",
    body:
      "Self-service coin laundromats are common and cheap in Taipei and Seoul, often open 24 hours near residential areas. Hong Kong leans toward drop-off laundries charging by weight, which is inexpensive and usually same-day. In September humidity nothing air-dries — use the dryer.",
    city: "all",
  },
  {
    title: "Public toilets",
    body:
      "Metro stations have clean public toilets everywhere on this list, as do department stores and convenience stores in Taiwan and Korea. Carry tissues: some Taiwanese, Korean and mainland facilities do not supply paper, many older Taiwanese buildings ask you to bin paper rather than flush it, and squat toilets are still common in mainland public restrooms.",
    city: "all",
  },
  {
    title: "Rubbish bins",
    body:
      "Taipei has almost no public bins by design — the city runs on scheduled collection and you are expected to carry your rubbish to a convenience store or your hotel. Seoul is similar. Hong Kong and Shenzhen have bins everywhere, Shenzhen's sorted by type.",
    city: "all",
  },
  {
    title: "Drinking in public",
    body:
      "Legal and normal in Taiwan, Korea and mainland China — a convenience-store beer in a Han River park is a national pastime. Hong Kong is more restrictive in practice. Nowhere here treats it the way Massachusetts does.",
    city: "all",
  },
  {
    title: "Smoking rules",
    body:
      "Every destination here bans indoor smoking. Taiwan, Korea and Shenzhen enforce smoking zones with real fines, Shenzhen's ban covers vaping indoors too, and vaping is fully illegal in Taiwan and Hong Kong — do not bring a vape into Taiwan at all.",
    city: "all",
  },
  {
    title: "Convenience stores as infrastructure",
    body:
      "In Taiwan, Korea and Shenzhen, 7-Eleven, FamilyMart, CU, GS25 and Shenzhen's own Meiyijia handle ATM withdrawals, bill payment, parcel pickup, transit card top-ups, hot food, seating and printing. Treat them as a utility rather than a shop.",
    city: "all",
  },
  {
    title: "Border crossings with luggage",
    body:
      "Crossing between Hong Kong and Shenzhen on foot means two immigration halls, escalators and long corridors. With a large suitcase, take the high-speed rail from West Kowloon to Futian or a cross-boundary coach that carries bags in the hold, rather than the MTR to Lo Wu.",
    city: "shenzhen",
  },
  {
    title: "Tap-water refills",
    body:
      "Taipei MRT stations, Korean public buildings and most hotels have filtered water dispensers, usually with hot and cold taps. Carrying a bottle removes most of the plastic and most of the cost.",
    city: "all",
  },
];
