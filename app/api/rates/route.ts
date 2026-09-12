import { NextResponse } from "next/server";

export const revalidate = 1800; // 30 minutes

const WANTED = ["TWD", "HKD", "KRW"] as const;

interface RatesPayload {
  base: "USD";
  /** Units of local currency per 1 USD. */
  rates: Record<string, number>;
  updated: string;
  source: string;
}

async function getJson(url: string, timeoutMs = 8000): Promise<any> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate },
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`${url} responded ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function pick(rates: Record<string, unknown>): Record<string, number> {
  const out: Record<string, number> = {};
  for (const code of WANTED) {
    const value = rates[code] ?? rates[code.toLowerCase()];
    if (typeof value === "number" && Number.isFinite(value) && value > 0) {
      out[code] = value;
    }
  }
  return out;
}

/** Primary: open.er-api.com — no key, covers TWD/HKD/KRW. */
async function fromErApi(): Promise<RatesPayload> {
  const data = await getJson("https://open.er-api.com/v6/latest/USD");
  const rates = pick(data?.rates ?? {});
  if (Object.keys(rates).length !== WANTED.length) {
    throw new Error("open.er-api.com returned an incomplete rate set");
  }
  return {
    base: "USD",
    rates,
    updated: data?.time_last_update_utc
      ? new Date(data.time_last_update_utc).toISOString()
      : new Date().toISOString(),
    source: "open.er-api.com (Exchange Rate API, free tier)",
  };
}

/** Fallback: @fawazahmed0/currency-api — no key, mirrored on two CDNs. */
async function fromCurrencyApi(host: string, label: string): Promise<RatesPayload> {
  const data = await getJson(`${host}/v1/currencies/usd.json`);
  const rates = pick(data?.usd ?? {});
  if (Object.keys(rates).length !== WANTED.length) {
    throw new Error(`${label} returned an incomplete rate set`);
  }
  return {
    base: "USD",
    rates,
    updated: data?.date ? new Date(`${data.date}T00:00:00Z`).toISOString() : new Date().toISOString(),
    source: label,
  };
}

export async function GET() {
  const attempts: Array<() => Promise<RatesPayload>> = [
    fromErApi,
    () =>
      fromCurrencyApi(
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest",
        "currency-api via jsDelivr"
      ),
    () =>
      fromCurrencyApi("https://latest.currency-api.pages.dev", "currency-api via Cloudflare Pages"),
  ];

  const errors: string[] = [];
  for (const attempt of attempts) {
    try {
      const payload = await attempt();
      return NextResponse.json(payload, {
        headers: { "cache-control": "public, s-maxage=1800, stale-while-revalidate=86400" },
      });
    } catch (err) {
      errors.push(err instanceof Error ? err.message : String(err));
    }
  }

  return NextResponse.json(
    { error: "All exchange-rate providers failed.", details: errors },
    { status: 502 }
  );
}
