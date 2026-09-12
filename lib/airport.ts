import type { CityId } from "./cities";

export interface TransferOption {
  mode: string;
  icon: string;
  kind: "rail" | "bus" | "taxi";
  route: string;
  /** Door-to-door range in minutes. */
  minutes: [number, number];
  /** Cost range in the local currency. */
  cost: [number, number];
  frequency: string;
  hours: string;
  bestFor: string;
  watchOut?: string;
  recommended?: boolean;
}

export interface AirportProfile {
  city: CityId;
  airport: string;
  code: string;
  distanceKm: number;
  /** Where the times and fares below are measured to. */
  reference: string;
  options: TransferOption[];
  decisionRule: string;
  secondAirport?: { name: string; code: string; note: string };
  /** Approximate units of local currency per USD, used only when live rates are unavailable. */
  fallbackRate: number;
}

export const AIRPORTS: AirportProfile[] = [
  {
    city: "taipei",
    airport: "Taoyuan International",
    code: "TPE",
    distanceKm: 40,
    reference: "Taipei Main Station",
    fallbackRate: 31.5,
    options: [
      {
        mode: "MRT Airport Line — Express",
        icon: "🚆",
        kind: "rail",
        route: "TPE T1/T2 → Taipei Main Station (purple train, limited stops)",
        minutes: [36, 40],
        cost: [150, 150],
        frequency: "Every ~15 min",
        hours: "≈06:00 – 23:00",
        bestFor: "Almost everyone. Fast, cheap, predictable, and immune to traffic.",
        watchOut: "Stops running before midnight — a late arrival needs the bus or a taxi.",
        recommended: true,
      },
      {
        mode: "MRT Airport Line — Commuter",
        icon: "🚇",
        kind: "rail",
        route: "TPE T1/T2 → Taipei Main Station (blue train, all stops)",
        minutes: [50, 55],
        cost: [150, 150],
        frequency: "Every ~15 min",
        hours: "≈06:00 – 23:30",
        bestFor: "Same fare as the express — take whichever arrives first if you are not in a hurry.",
      },
      {
        mode: "Airport bus (Kuo-Kuang 1819)",
        icon: "🚌",
        kind: "bus",
        route: "TPE → Taipei Main Station",
        minutes: [55, 80],
        cost: [140, 140],
        frequency: "Every 15–20 min",
        hours: "24 hours",
        bestFor: "Late-night and early-morning arrivals, when the MRT is not running.",
        watchOut: "Journey time depends entirely on traffic. Budget 80 minutes at rush hour.",
      },
      {
        mode: "Taxi",
        icon: "🚕",
        kind: "taxi",
        route: "TPE → central Taipei",
        minutes: [40, 55],
        cost: [1100, 1400],
        frequency: "On demand at the rank",
        hours: "24 hours",
        bestFor: "Heavy luggage, a group of three or more, or arriving exhausted.",
        watchOut: "Metered plus a highway surcharge. Roughly eight times the MRT fare for one person.",
      },
      {
        mode: "Uber",
        icon: "📱",
        kind: "taxi",
        route: "TPE → central Taipei",
        minutes: [40, 55],
        cost: [1000, 1500],
        frequency: "On demand",
        hours: "24 hours",
        bestFor: "Using your existing account and avoiding any language friction.",
      },
    ],
    decisionRule:
      "Take the express MRT unless you land after 23:00 or have more bags than hands. The train is NT$150 and beats the taxi on time in traffic; the taxi costs roughly eight times as much and saves nothing. Between 23:00 and 06:00 the 1819 bus runs all night and is the cheap option.",
    secondAirport: {
      name: "Songshan",
      code: "TSA",
      note:
        "Inside the city. Some regional flights, including from Seoul Gimpo, land here — it is one MRT stop from Zhongshan and about 15 minutes and NT$25 to downtown. If you have a choice of routing between Taipei and Seoul, the TSA–GMP pairing saves well over an hour at each end.",
    },
  },
  {
    city: "hongkong",
    airport: "Hong Kong International",
    code: "HKG",
    distanceKm: 35,
    reference: "Hong Kong Station, Central",
    fallbackRate: 7.8,
    options: [
      {
        mode: "Airport Express",
        icon: "🚄",
        kind: "rail",
        route: "HKG → Hong Kong Station (Central)",
        minutes: [24, 24],
        cost: [115, 115],
        frequency: "Every 10–12 min",
        hours: "≈05:54 – 00:48",
        bestFor:
          "The default. Dedicated luggage space, and free shuttle buses connect the station to most major hotels.",
        watchOut:
          "Round-trip and group fares cut the price substantially — buy accordingly rather than two singles.",
        recommended: true,
      },
      {
        mode: "Airport Express → Kowloon",
        icon: "🚄",
        kind: "rail",
        route: "HKG → Kowloon Station",
        minutes: [21, 21],
        cost: [105, 105],
        frequency: "Every 10–12 min",
        hours: "≈05:54 – 00:48",
        bestFor: "Staying in Tsim Sha Tsui or West Kowloon. Cheaper and quicker than riding to Central.",
      },
      {
        mode: "S1 bus + MTR Tung Chung line",
        icon: "🚌",
        kind: "bus",
        route: "HKG → Tung Chung station → Central",
        minutes: [55, 70],
        cost: [22, 30],
        frequency: "Bus every 5–10 min",
        hours: "≈05:30 – 00:00",
        bestFor: "The budget route — roughly a quarter of the Airport Express fare.",
        watchOut: "You change modes with your bags at Tung Chung. Fine with a carry-on, tedious with a suitcase.",
      },
      {
        mode: "Airport bus A21",
        icon: "🚌",
        kind: "bus",
        route: "HKG → Tsim Sha Tsui",
        minutes: [55, 75],
        cost: [34, 34],
        frequency: "Every 10–20 min",
        hours: "≈06:00 – 00:00",
        bestFor: "A direct, cheap ride to Kowloon hotels with luggage racks and no interchange.",
      },
      {
        mode: "Night bus N21",
        icon: "🌙",
        kind: "bus",
        route: "HKG → Kowloon",
        minutes: [75, 95],
        cost: [23, 23],
        frequency: "Roughly every 20–30 min",
        hours: "≈00:20 – 04:50",
        bestFor: "Overnight arrivals, when the Airport Express has stopped.",
      },
      {
        mode: "Taxi (red urban)",
        icon: "🚕",
        kind: "taxi",
        route: "HKG → Central",
        minutes: [35, 50],
        cost: [300, 380],
        frequency: "On demand",
        hours: "24 hours",
        bestFor: "Late arrivals, groups, or a hotel awkwardly placed for the shuttle network.",
        watchOut:
          "The meter is only part of it — tunnel tolls and a per-bag luggage charge are added. Red taxis serve the urban area; green and blue serve the New Territories and Lantau.",
      },
    ],
    decisionRule:
      "The Airport Express is one of the best airport links in the world and the free hotel shuttles are the hidden value — take it. Drop to the S1-plus-MTR route only if you are travelling light and want to save about HK$90. A taxi makes sense for three or more people, where it is roughly fare-neutral against four Airport Express tickets.",
  },
  {
    city: "seoul",
    airport: "Incheon International",
    code: "ICN",
    distanceKm: 48,
    reference: "Seoul Station",
    fallbackRate: 1340,
    options: [
      {
        mode: "AREX All-Stop train",
        icon: "🚇",
        kind: "rail",
        route: "ICN T1/T2 → Seoul Station, all stops",
        minutes: [58, 70],
        cost: [4500, 5000],
        frequency: "Every ~12 min",
        hours: "≈05:20 – 23:40",
        bestFor:
          "The value pick, and it takes T-money. Roughly a sixth the price of a taxi and only ~15 minutes slower than the express.",
        watchOut: "Ordinary commuter rolling stock — no reserved seat and limited luggage space at peak times.",
        recommended: true,
      },
      {
        mode: "AREX Express train",
        icon: "🚄",
        kind: "rail",
        route: "ICN T1/T2 → Seoul Station, non-stop",
        minutes: [43, 51],
        cost: [11000, 11000],
        frequency: "Every ~40 min",
        hours: "≈05:15 – 22:50",
        bestFor: "Reserved seating and proper luggage racks. Worth it with big bags or after a long-haul flight.",
        watchOut: "The 40-minute headway can erase the time saving. Check the departure board before paying the premium.",
      },
      {
        mode: "Limousine bus",
        icon: "🚌",
        kind: "bus",
        route: "ICN → major hotel districts (Gangnam, Myeongdong, Hongdae and others)",
        minutes: [60, 100],
        cost: [17000, 18000],
        frequency: "Every 15–30 min",
        hours: "≈05:30 – 22:30",
        bestFor:
          "Hotels far from a subway hub. It drops you at the door, which matters more in Seoul than the fare does.",
        watchOut: "Entirely traffic-dependent. Allow 100 minutes if you are heading to Gangnam at rush hour.",
      },
      {
        mode: "Taxi (regular)",
        icon: "🚕",
        kind: "taxi",
        route: "ICN → central Seoul",
        minutes: [60, 90],
        cost: [65000, 90000],
        frequency: "On demand",
        hours: "24 hours",
        bestFor: "Late arrivals and groups. Expensive by Korean standards.",
        watchOut: "Expressway tolls are added to the meter, and a late-night surcharge applies after midnight.",
      },
      {
        mode: "Deluxe taxi (black)",
        icon: "🚖",
        kind: "taxi",
        route: "ICN → central Seoul",
        minutes: [60, 90],
        cost: [100000, 130000],
        frequency: "On demand",
        hours: "24 hours",
        bestFor: "Nothing, for most visitors. Larger and more comfortable, at roughly a 50% premium.",
      },
    ],
    decisionRule:
      "Incheon is genuinely far — 48 km, the longest transfer of the three cities — so the mode matters more here. Take the AREX all-stop unless you have heavy bags, in which case pay for the express or take the limousine bus straight to your hotel. A taxi costs 15 times the all-stop fare and is slower in traffic; take one only after the trains stop.",
    secondAirport: {
      name: "Gimpo",
      code: "GMP",
      note:
        "Only 17 km out and connected by subway lines 5 and 9 plus AREX — about 30–40 minutes and ₩1,500 to central Seoul. Regional flights from Taipei Songshan and Tokyo Haneda use it. If your Taipei–Seoul leg can route TSA–GMP instead of TPE–ICN, it saves well over two hours of ground transfer across the pair.",
    },
  },
];

export function airportFor(city: CityId): AirportProfile {
  const found = AIRPORTS.find((a) => a.city === city);
  if (!found) throw new Error(`No airport profile for ${city}`);
  return found;
}
