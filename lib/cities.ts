export type CityId = "taipei" | "hongkong" | "seoul";

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
  },
];

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
