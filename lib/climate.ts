import type { CityId } from "./cities";

export interface ClimateProfile {
  city: CityId;
  headline: string;
  /** 1991-2020 September normals. Temperatures in °C, rain in mm. */
  meanHighC: number;
  meanLowC: number;
  meanC: number;
  rainfallMm: number;
  rainDays: number;
  humidityPct: number;
  sunshineHours: number;
  seaTempC: number | null;
  daylight: string;
  typhoonRisk: "High" | "Moderate" | "Low";
  typhoonNote: string;
  earlyVsLate: string;
  feelsLike: string;
  wear: string[];
  pack: string[];
  watchOut: string[];
  source: string;
  sourceUrl: string;
}

export const CLIMATE: ClimateProfile[] = [
  {
    city: "taipei",
    headline: "Still full summer. Hot, humid, and the wettest month of the year.",
    meanHighC: 32.6,
    meanLowC: 25.3,
    meanC: 28.4,
    rainfallMm: 360,
    rainDays: 13,
    humidityPct: 74,
    sunshineHours: 150,
    seaTempC: 29,
    daylight: "~12h20m, sunrise ≈ 05:45, sunset ≈ 18:05 (mid-month)",
    typhoonRisk: "High",
    typhoonNote:
      "September sits inside the peak of the western Pacific typhoon season. Taipei sits in a basin, so even a distant storm can dump 200-400 mm in a day. A direct hit means a government-declared typhoon day: offices, shops, the MRT above ground, and most attractions close.",
    earlyVsLate:
      "Almost no cooling through the month — late September in Taipei is only about 2 °F (1 °C) below early September. Real relief does not arrive until late October.",
    feelsLike:
      "Heat index routinely 100-108 °F (38-42 °C) in the afternoon. Humidity, not air temperature, is the limiting factor for walking around.",
    wear: [
      "Linen or technical synthetics; cotton stays soaked all day",
      "Shorts and short sleeves are normal everywhere, including most restaurants",
      "Sandals or quick-drying shoes — you will walk through standing water",
    ],
    pack: [
      "A compact umbrella (better than a rain shell in 90 °F heat — a shell turns into a sauna)",
      "Two pairs of shoes so one can dry overnight",
      "Electrolyte tablets; sweat loss is significant",
      "A light layer for indoor air conditioning, which is aggressive",
    ],
    watchOut: [
      "Afternoon convective thunderstorms most days, typically 14:00-17:00 — plan indoor blocks then",
      "Yangmingshan and Maokong hikes get slick and leech-friendly after rain",
      "If a land warning is issued, high-speed rail and domestic flights stop before the storm lands",
    ],
    source: "Central Weather Administration (CWA), Taipei station 1991-2020 normals",
    sourceUrl: "https://www.cwa.gov.tw/eng/",
  },
  {
    city: "hongkong",
    headline: "Hot, sticky, and the single riskiest month for typhoon disruption.",
    meanHighC: 30.8,
    meanLowC: 26.2,
    meanC: 28.2,
    rainfallMm: 327,
    rainDays: 12,
    humidityPct: 78,
    sunshineHours: 175,
    seaTempC: 28,
    daylight: "~12h20m, sunrise ≈ 06:10, sunset ≈ 18:30 (mid-month)",
    typhoonRisk: "High",
    typhoonNote:
      "September is statistically Hong Kong's most typhoon-affected month. The Observatory's signals run T1 → T3 → T8 → T9 → T10. At T8 the city genuinely stops: businesses close, most buses and ferries stop, the MTR runs underground sections only, and flights are cancelled in bulk. T8s typically last 6-18 hours.",
    earlyVsLate:
      "Late September begins to ease — the first dry northeasterly surges can arrive in the last week, dropping humidity noticeably. Early September is indistinguishable from August.",
    feelsLike:
      "78% humidity at 88 °F (31 °C) is the defining experience. The upside: Hong Kong is built for it — footbridges, malls, and MTR walkways let you cross Central and Kowloon largely indoors.",
    wear: [
      "Lightweight everything; Hong Kong dresses smarter than Taipei, so pack one collared shirt for bars and restaurants",
      "Sweat-resistant footwear — the hillside escalators and Dragon's Back will find your limits",
    ],
    pack: [
      "Compact umbrella (doubles as sun shade, locally normal)",
      "A genuine light jacket or long sleeves for indoor air conditioning, which is the coldest of the three cities",
      "Waterproof phone pouch for Star Ferry and outlying-island days",
    ],
    watchOut: [
      "Amber / Red / Black rainstorm warnings are separate from typhoon signals; Black means flash flooding and near-total shutdown",
      "Buy travel insurance that covers weather disruption, and keep the day before your departure flight loose",
      "Hiking trails (Dragon's Back, Lion Rock) are dangerous in heat — go at sunrise or skip",
    ],
    source: "Hong Kong Observatory (HKO), 1991-2020 climatological normals",
    sourceUrl: "https://www.hko.gov.hk/en/cis/climahk.htm",
  },
  {
    city: "seoul",
    headline: "The turn of the season. Summer exits, and the best weather of the Korean year begins.",
    meanHighC: 26.4,
    meanLowC: 17.4,
    meanC: 21.6,
    rainfallMm: 141,
    rainDays: 9,
    humidityPct: 68,
    sunshineHours: 190,
    seaTempC: null,
    daylight: "~12h20m, sunrise ≈ 06:20, sunset ≈ 18:40 (mid-month)",
    typhoonRisk: "Moderate",
    typhoonNote:
      "Korea gets typhoon remnants rather than direct hits in most years, usually as a 1-2 day heavy-rain and wind event. Seoul is inland enough that the main impact is transport delays, not shutdown.",
    earlyVsLate:
      "This is the sharpest early-to-late split of the three cities. The first week can still hit 86 °F (30 °C) and feel humid; by the last week highs are near 75 °F (24 °C) with 50-57 °F (10-14 °C) nights and dry air. Pack for two different climates.",
    feelsLike:
      "Much drier than Taipei or Hong Kong. Late September in Seoul is genuinely pleasant walking weather — this is when locals start hiking Bukhansan.",
    wear: [
      "Layers: t-shirt plus a light overshirt or fleece for evenings",
      "Seoul is the most fashion-conscious of the three; smart casual reads better than travel gear",
      "Real walking shoes — you will cover 15-20k steps a day between Bukchon, Seongsu and the palaces",
    ],
    pack: [
      "A packable jacket for late-month evenings, especially if hiking or heading to the DMZ",
      "Sunglasses — September brings the year's clearest skies",
      "A small umbrella; rainfall is a third of Hong Kong's but not zero",
    ],
    watchOut: [
      "Chuseok (Korean thanksgiving) falls in late September 2026 — see the Toolkit tab; small businesses close and intercity transport sells out",
      "Air quality is usually good in September (the bad season is spring), but check the AQI reading on the Weather tab anyway",
      "Nights cool fast near the Han River and on Namsan — the daytime high is misleading",
    ],
    source: "Korea Meteorological Administration (KMA), Seoul station 1991-2020 normals",
    sourceUrl: "https://data.kma.go.kr/climate/RankState/selectRankStatisticsDivisionList.do",
  },
];

export function climateFor(city: CityId): ClimateProfile {
  const found = CLIMATE.find((c) => c.city === city);
  if (!found) throw new Error(`No climate profile for ${city}`);
  return found;
}
