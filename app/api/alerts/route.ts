import { NextResponse } from "next/server";
import { CITIES } from "@/lib/cities";

// Evaluated per request so a failed build-time fetch is never baked in; the
// CDN still absorbs repeat traffic via the s-maxage header below.
export const dynamic = "force-dynamic";
export const revalidate = 600; // 10 minutes — alerts change faster than weather

async function getJson(url: string, timeoutMs = 8000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate },
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`upstream responded ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

export interface ActiveWarning {
  code: string;
  name: string;
  issued?: string;
  source: string;
}

/**
 * Hong Kong Observatory open data. Keyless and public.
 * warnsum returns an object keyed by warning type; each entry carries a `code`
 * and an `actionCode` of ISSUE / REISSUE / UPDATE / CANCEL.
 */
async function hongKongWarnings(): Promise<ActiveWarning[]> {
  const data = await getJson(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en"
  );
  const out: ActiveWarning[] = [];
  for (const value of Object.values(data ?? {})) {
    const entry = value as Record<string, unknown>;
    const action = String(entry?.actionCode ?? "").toUpperCase();
    // CANCEL means the warning has just been lifted; it is not active.
    if (!entry?.code || action === "CANCEL") continue;
    out.push({
      code: String(entry.code),
      name: String(entry.name ?? entry.code),
      issued: entry.issueTime ? String(entry.issueTime) : undefined,
      source: "Hong Kong Observatory",
    });
  }
  return out;
}

/**
 * Taiwan's CWA open data requires a free API key. Supply CWA_API_KEY to enable
 * live warnings; without it this returns null and the UI falls back to the
 * derived wind-and-rain watch plus a link to the official site.
 */
async function taiwanWarnings(): Promise<ActiveWarning[] | null> {
  const key = process.env.CWA_API_KEY;
  if (!key) return null;
  try {
    const url =
      "https://opendata.cwa.gov.tw/api/v1/rest/datastore/W-C0033-001" +
      `?Authorization=${encodeURIComponent(key)}&format=JSON`;
    const data = await getJson(url);
    const records = data?.records?.location ?? data?.records?.Location ?? [];
    const out: ActiveWarning[] = [];
    for (const loc of records) {
      for (const hazard of loc?.hazardConditions?.hazards ?? []) {
        const info = hazard?.info ?? hazard;
        if (!info?.phenomena) continue;
        out.push({
          code: String(info.phenomena),
          name: `${info.phenomena}${info.significance ? ` (${info.significance})` : ""}`,
          source: "Central Weather Administration",
        });
      }
    }
    return out;
  } catch {
    return null;
  }
}

/**
 * Derived watch for every city, so there is always a live signal even where no
 * keyless official feed exists. Open-Meteo gust and precipitation forecasts are
 * not warnings — they are an early indication that something is coming.
 */
async function windWatch(lat: number, lon: number, tz: string) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: "wind_gusts_10m_max,wind_speed_10m_max,precipitation_sum,precipitation_probability_max",
    timezone: tz,
    forecast_days: "5",
    wind_speed_unit: "kmh",
  });
  const data = await getJson(`https://api.open-meteo.com/v1/forecast?${params}`);
  const daily = data?.daily;
  if (!daily?.time) return null;

  const days = (daily.time as string[]).map((date: string, i: number) => ({
    date,
    gustKmh: Number(daily.wind_gusts_10m_max?.[i] ?? 0),
    windKmh: Number(daily.wind_speed_10m_max?.[i] ?? 0),
    rainMm: Number(daily.precipitation_sum?.[i] ?? 0),
    rainProb: Number(daily.precipitation_probability_max?.[i] ?? 0),
  }));

  const peakGust = Math.max(...days.map((d) => d.gustKmh));
  const peakRain = Math.max(...days.map((d) => d.rainMm));

  // Thresholds flag "something is coming", well below official warning criteria.
  let level: "calm" | "elevated" | "high" = "calm";
  if (peakGust >= 90 || peakRain >= 100) level = "high";
  else if (peakGust >= 60 || peakRain >= 50) level = "elevated";

  return { days, peakGust, peakRain, level };
}

export async function GET() {
  const results = await Promise.all(
    CITIES.map(async (city) => {
      const [watch, official] = await Promise.all([
        windWatch(city.lat, city.lon, city.timezone).catch(() => null),
        (async (): Promise<{ warnings: ActiveWarning[] | null; note: string }> => {
          if (city.id === "hongkong") {
            try {
              return { warnings: await hongKongWarnings(), note: "live" };
            } catch (err) {
              return {
                warnings: null,
                note: err instanceof Error ? err.message : "HKO feed unavailable",
              };
            }
          }
          if (city.id === "taipei") {
            const warnings = await taiwanWarnings();
            return { warnings, note: warnings ? "live" : "no-key" };
          }
          return { warnings: null, note: "link-only" };
        })(),
      ]);

      return {
        city: city.id,
        watch,
        officialWarnings: official.warnings,
        officialNote: official.note,
      };
    })
  );

  return NextResponse.json(
    {
      updated: new Date().toISOString(),
      sources: [
        "Hong Kong Observatory open data (data.weather.gov.hk) — live, keyless",
        "Central Weather Administration (opendata.cwa.gov.tw) — requires CWA_API_KEY",
        "Open-Meteo gust and precipitation forecast — derived watch, not an official warning",
      ],
      cities: results,
    },
    { headers: { "cache-control": "public, s-maxage=600, stale-while-revalidate=3600" } }
  );
}
