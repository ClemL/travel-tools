"use client";

import { useCallback, useEffect, useState } from "react";

export interface ApiState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  /** True when the service worker served a cached copy because the network failed. */
  fromCache: boolean;
  /** ISO timestamp of when the cached copy was originally fetched. */
  cachedAt: string | null;
  reload: () => void;
}

/**
 * Shared fetch hook for the three API routes. Keeps cache-staleness handling in
 * one place so every tab reports offline state the same way.
 */
export function useApi<T>(path: string, opts: { acceptPartial?: boolean } = {}): ApiState<T> {
  const { acceptPartial = false } = opts;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);
  const [cachedAt, setCachedAt] = useState<string | null>(null);

  const reload = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(path, { cache: "no-store" })
      .then(async (res) => {
        const json = await res.json().catch(() => null);
        if (cancelled) return;

        setFromCache(res.headers.get("x-from-cache") === "1");
        const stamp = res.headers.get("x-cached-at");
        setCachedAt(stamp && stamp !== "unknown" ? stamp : null);

        // Some routes return a usable partial payload alongside a non-2xx status.
        if (!res.ok && !(acceptPartial && json)) {
          throw new Error(json?.error ?? `Request failed (${res.status})`);
        }
        setData(json as T);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path, acceptPartial]);

  useEffect(() => reload(), [reload]);

  return { data, error, loading, fromCache, cachedAt, reload };
}

/** "4 hours ago" style relative time, for reporting how stale cached data is. */
export function timeAgo(iso: string | null): string {
  if (!iso) return "unknown";
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "unknown";
  const mins = Math.max(0, Math.round((Date.now() - then) / 60000));
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  return `${Math.round(hours / 24)} d ago`;
}
