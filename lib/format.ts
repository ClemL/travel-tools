export function cToF(c: number): number {
  return c * 9 / 5 + 32;
}

export function mmToIn(mm: number): number {
  return mm / 25.4;
}

export function kmhToMph(kmh: number): number {
  return kmh * 0.621371;
}

/** Renders a temperature in the chosen unit, rounded to whole degrees. */
export function temp(c: number | null | undefined, unit: "C" | "F"): string {
  if (c === null || c === undefined || !Number.isFinite(c)) return "—";
  const value = unit === "F" ? cToF(c) : c;
  return `${Math.round(value)}°`;
}

export function tempFull(c: number | null | undefined, unit: "C" | "F"): string {
  if (c === null || c === undefined || !Number.isFinite(c)) return "—";
  const value = unit === "F" ? cToF(c) : c;
  return `${Math.round(value)}°${unit}`;
}

/** Formats a money amount with sensible precision for the currency in question. */
export function money(amount: number, currency: string): string {
  if (!Number.isFinite(amount)) return "—";
  // KRW and TWD are conventionally quoted without decimals.
  const zeroDecimal = currency === "KRW" || currency === "TWD";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: zeroDecimal ? 0 : 2,
    maximumFractionDigits: zeroDecimal ? 0 : 2,
  }).format(amount);
}

/** Significant-figure formatting for small USD values like a single NT$ or ₩. */
export function usd(amount: number): string {
  if (!Number.isFinite(amount)) return "—";
  if (amount === 0) return "$0.00";
  if (Math.abs(amount) < 0.01) return `$${amount.toFixed(5)}`;
  if (Math.abs(amount) < 1) return `$${amount.toFixed(3)}`;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function timeIn(timezone: string, date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function dayIn(timezone: string, date = new Date()): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
}

/** Whole-hour offset of a timezone relative to another, e.g. "+12h". */
export function offsetHours(timezone: string, from: string, date = new Date()): string {
  const minutes = (zoneOffsetMinutes(timezone, date) - zoneOffsetMinutes(from, date));
  const hours = minutes / 60;
  const sign = hours >= 0 ? "+" : "−";
  const abs = Math.abs(hours);
  const text = Number.isInteger(abs) ? String(abs) : abs.toFixed(1);
  return `${sign}${text}h vs ${from === "America/New_York" ? "Boston" : from}`;
}

function zoneOffsetMinutes(timezone: string, date: Date): number {
  // Reconstruct the wall-clock time in the zone and diff it against UTC.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? "0");
  const asUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second")
  );
  return Math.round((asUtc - date.getTime()) / 60000);
}
