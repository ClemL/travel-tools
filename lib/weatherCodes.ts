/** WMO weather interpretation codes as used by Open-Meteo. */
const CODES: Record<number, { label: string; icon: string }> = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Depositing rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Heavy drizzle", icon: "🌦️" },
  56: { label: "Freezing drizzle", icon: "🌧️" },
  57: { label: "Heavy freezing drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌦️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  66: { label: "Freezing rain", icon: "🌧️" },
  67: { label: "Heavy freezing rain", icon: "🌧️" },
  71: { label: "Light snow", icon: "🌨️" },
  73: { label: "Snow", icon: "🌨️" },
  75: { label: "Heavy snow", icon: "❄️" },
  77: { label: "Snow grains", icon: "🌨️" },
  80: { label: "Light showers", icon: "🌦️" },
  81: { label: "Showers", icon: "🌧️" },
  82: { label: "Violent showers", icon: "⛈️" },
  85: { label: "Snow showers", icon: "🌨️" },
  86: { label: "Heavy snow showers", icon: "❄️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Thunderstorm with hail", icon: "⛈️" },
  99: { label: "Thunderstorm with heavy hail", icon: "⛈️" },
};

export function describeWeather(code: number | undefined | null) {
  if (code === undefined || code === null) return { label: "Unknown", icon: "❔" };
  return CODES[code] ?? { label: `Code ${code}`, icon: "❔" };
}

export function aqiBand(aqi: number | null | undefined): { label: string; className: string } {
  if (aqi === null || aqi === undefined) return { label: "n/a", className: "aqi-na" };
  if (aqi <= 50) return { label: "Good", className: "aqi-good" };
  if (aqi <= 100) return { label: "Moderate", className: "aqi-moderate" };
  if (aqi <= 150) return { label: "Unhealthy (sensitive)", className: "aqi-usg" };
  if (aqi <= 200) return { label: "Unhealthy", className: "aqi-unhealthy" };
  if (aqi <= 300) return { label: "Very unhealthy", className: "aqi-very" };
  return { label: "Hazardous", className: "aqi-hazard" };
}
