import { NextResponse } from "next/server";
import { CITIES } from "@/lib/cities";

export const revalidate = 900; // 15 minutes

async function getJson(url: string, timeoutMs = 9000): Promise<any> {
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

function forecastUrl(lat: number, lon: number, tz: string): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day",
    daily:
      "weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,uv_index_max,sunrise,sunset",
    hourly: "temperature_2m,precipitation_probability,weather_code",
    timezone: tz,
    forecast_days: "7",
    wind_speed_unit: "kmh",
    temperature_unit: "celsius",
  });
  return `https://api.open-meteo.com/v1/forecast?${params}`;
}

function airUrl(lat: number, lon: number, tz: string): string {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: "pm2_5,pm10,us_aqi",
    timezone: tz,
  });
  return `https://air-quality-api.open-meteo.com/v1/air-quality?${params}`;
}

export async function GET() {
  const results = await Promise.all(
    CITIES.map(async (city) => {
      try {
        // Air quality is a nice-to-have: never let it fail the whole city.
        const [weather, air] = await Promise.all([
          getJson(forecastUrl(city.lat, city.lon, city.timezone)),
          getJson(airUrl(city.lat, city.lon, city.timezone)).catch(() => null),
        ]);
        return {
          city: city.id,
          ok: true as const,
          current: weather.current,
          daily: weather.daily,
          hourly: weather.hourly,
          air: air?.current ?? null,
        };
      } catch (err) {
        const reason = err instanceof Error ? err.message : String(err);
        return {
          city: city.id,
          ok: false as const,
          // Kept short: this string is rendered directly in the UI.
          error: reason.includes("abort") ? "request timed out" : reason,
        };
      }
    })
  );

  const anyOk = results.some((r) => r.ok);
  return NextResponse.json(
    {
      updated: new Date().toISOString(),
      source: "Open-Meteo (open-meteo.com) — free, no API key",
      cities: results,
    },
    {
      status: anyOk ? 200 : 502,
      headers: { "cache-control": "public, s-maxage=900, stale-while-revalidate=3600" },
    }
  );
}
