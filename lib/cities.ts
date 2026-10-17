export type CityId = "taipei" | "hongkong" | "shenzhen" | "seoul";

export interface City {
  id: CityId;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lon: number;
  timezone: string;
  currency: string;
  currencyName: string;
  currencySymbol: string;
  accent: string;
  /** BCP 47 tag for local-script text, so screen readers and fonts pick the right glyphs. */
  lang: string;
  /**
   * Whether the destination is switched on before the user has touched the
   * Destinations setting. Reflects the trip currently being planned.
   */
  defaultEnabled: boolean;
}

export const CITIES: City[] = [
  {
    id: "taipei",
    name: "Taipei",
    country: "Taiwan",
    flag: "🇹🇼",
    lat: 25.033,
    lon: 121.5654,
    timezone: "Asia/Taipei",
    currency: "TWD",
    currencyName: "New Taiwan dollar",
    currencySymbol: "NT$",
    accent: "#e4572e",
    lang: "zh-Hant",
    defaultEnabled: false,
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    country: "Hong Kong SAR",
    flag: "🇭🇰",
    lat: 22.3193,
    lon: 114.1694,
    timezone: "Asia/Hong_Kong",
    currency: "HKD",
    currencyName: "Hong Kong dollar",
    currencySymbol: "HK$",
    accent: "#2a9d8f",
    lang: "zh-Hant",
    defaultEnabled: true,
  },
  {
    id: "shenzhen",
    name: "Shenzhen",
    country: "Mainland China",
    flag: "🇨🇳",
    lat: 22.5431,
    lon: 114.0579,
    timezone: "Asia/Shanghai",
    currency: "CNY",
    currencyName: "Chinese yuan (renminbi)",
    currencySymbol: "¥",
    accent: "#b5179e",
    lang: "zh-Hans",
    defaultEnabled: true,
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    lat: 37.5665,
    lon: 126.978,
    timezone: "Asia/Seoul",
    currency: "KRW",
    currencyName: "South Korean won",
    currencySymbol: "₩",
    accent: "#4361ee",
    lang: "ko",
    defaultEnabled: false,
  },
];

export const DEFAULT_ENABLED: CityId[] = CITIES.filter((c) => c.defaultEnabled).map((c) => c.id);

export const HOME = {
  name: "Boston",
  timezone: "America/New_York",
  currency: "USD",
  symbol: "$",
};

export function cityById(id: CityId): City {
  const found = CITIES.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown city: ${id}`);
  return found;
}

export function isCityId(value: string | null | undefined): value is CityId {
  return !!value && CITIES.some((c) => c.id === value);
}

/** "both", "all three", "all four" — for labels that compare every destination in view. */
export function allOf(n: number): string {
  if (n === 2) return "both";
  const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight"];
  return `all ${words[n] ?? n}`;
}
