"use client";

import { useCallback, useEffect, useState } from "react";
import { CITIES } from "@/lib/cities";
import { describeWeather, aqiBand } from "@/lib/weatherCodes";
import { temp, tempFull, kmhToMph, mmToIn } from "@/lib/format";

interface CityWeather {
  city: string;
  ok: boolean;
  error?: string;
  current?: Record<string, number>;
  daily?: Record<string, (number | string)[]>;
  air?: Record<string, number> | null;
}

interface WeatherResponse {
  updated: string;
  source: string;
  cities: CityWeather[];
}

type Unit = "F" | "C";

export default function WeatherTab() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<Unit>("F");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/weather", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok && !json?.cities) throw new Error(json?.error ?? `Request failed (${res.status})`);
      setData(json as WeatherResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <section>
      <p className="lede">
        Current conditions and a 7-day outlook from Open-Meteo, plus a US-scale air quality reading.
        Note the apparent temperature rather than the air temperature — in Taipei and Hong Kong in
        September, humidity is what actually limits how far you can walk.
      </p>

      <div className="converter">
        <button className="btn" onClick={() => setUnit(unit === "F" ? "C" : "F")}>
          Show °{unit === "F" ? "C" : "F"}
        </button>
        <button className="btn" onClick={() => void load()} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>

      {error && (
        <div className="error-box">
          <strong>Could not load weather.</strong> {error}
        </div>
      )}

      <div className="grid">
        {CITIES.map((city) => {
          const entry = data?.cities.find((c) => c.city === city.id);
          const cur = entry?.current;
          const daily = entry?.daily;
          const wx = describeWeather(cur?.weather_code);
          const aqi = entry?.air?.us_aqi;
          const band = aqiBand(aqi ?? null);

          return (
            <article
              className="card card-accent"
              key={city.id}
              style={{ ["--accent" as string]: city.accent }}
            >
              <div className="eyebrow">
                {city.flag} {city.country}
              </div>
              <h3>{city.name}</h3>

              {loading && !data ? (
                <>
                  <div className="skeleton" style={{ width: "50%", height: "2.2rem", marginTop: 12 }} />
                  <div className="skeleton" style={{ width: "70%", marginTop: 10 }} />
                  <div className="skeleton" style={{ width: "100%", height: "6rem", marginTop: 14 }} />
                </>
              ) : entry?.ok && cur ? (
                <>
                  <div className="now">
                    <span className="now-icon" aria-hidden="true">
                      {wx.icon}
                    </span>
                    <div>
                      <div className="now-temp">{tempFull(cur.temperature_2m, unit)}</div>
                      <div className="muted small">
                        {wx.label} · feels like {tempFull(cur.apparent_temperature, unit)}
                      </div>
                    </div>
                  </div>

                  <div className="metrics">
                    <div className="metric">
                      <div className="k">Humidity</div>
                      <div className="v">{Math.round(cur.relative_humidity_2m)}%</div>
                    </div>
                    <div className="metric">
                      <div className="k">Wind</div>
                      <div className="v">{Math.round(kmhToMph(cur.wind_speed_10m))} mph</div>
                    </div>
                    <div className="metric">
                      <div className="k">UV max</div>
                      <div className="v">
                        {daily?.uv_index_max?.[0] !== undefined
                          ? Math.round(Number(daily.uv_index_max[0]))
                          : "—"}
                      </div>
                    </div>
                    <div className="metric">
                      <div className="k">Air quality</div>
                      <div className="v">
                        <span className={`pill ${band.className}`}>
                          {aqi !== undefined && aqi !== null ? Math.round(aqi) : "n/a"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="small muted" style={{ marginTop: 6 }}>
                    AQI band: {band.label}
                  </div>

                  {daily && (
                    <div className="forecast">
                      {(daily.time as string[]).map((iso, i) => {
                        const code = Number(daily.weather_code?.[i]);
                        const d = describeWeather(code);
                        const pop = Number(daily.precipitation_probability_max?.[i] ?? 0);
                        const mm = Number(daily.precipitation_sum?.[i] ?? 0);
                        const label = new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                        return (
                          <div className="fday" key={iso}>
                            <span className="dow">{i === 0 ? "Today" : label}</span>
                            <span aria-label={d.label}>{d.icon}</span>
                            <span className="rain">
                              {pop}% · {mm >= 0.1 ? `${mmToIn(mm).toFixed(2)}"` : "—"}
                            </span>
                            <span className="temps">
                              {temp(Number(daily.temperature_2m_max?.[i]), unit)}{" "}
                              <span className="lo">
                                {temp(Number(daily.temperature_2m_min?.[i]), unit)}
                              </span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {daily?.sunrise?.[0] && daily?.sunset?.[0] && (
                    <div className="small muted" style={{ marginTop: 10 }}>
                      Sunrise {String(daily.sunrise[0]).slice(11, 16)} · Sunset{" "}
                      {String(daily.sunset[0]).slice(11, 16)} local
                    </div>
                  )}
                </>
              ) : (
                <p className="muted small">
                  Weather unavailable{entry?.error ? `: ${entry.error}` : "."}
                </p>
              )}
            </article>
          );
        })}
      </div>

      <div className="callout callout-warn">
        <strong>A forecast is not a typhoon warning</strong>
        Open-Meteo models rain and wind, but it does not issue the official signals that actually close
        a city. For September travel, check the Hong Kong Observatory (MyObservatory app) and Taiwan&apos;s
        Central Weather Administration directly each morning — those are the authorities that decide
        whether the MTR runs and whether your flight departs.
      </div>

      <p className="status">
        {data ? `Source: ${data.source}. Fetched ${new Date(data.updated).toLocaleString()}.` : "Loading…"}
      </p>
    </section>
  );
}
