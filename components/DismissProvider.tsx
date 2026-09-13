"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "asia-trip-dismissed";

interface DismissState {
  /** Ids the user has ticked off, as `scope:hash`. */
  hidden: Set<string>;
  /** True once localStorage has been read, to avoid hiding before hydration. */
  loaded: boolean;
  toggle: (id: string) => void;
  /** Scopes currently being revealed so ticked items can be un-ticked. */
  revealed: Set<string>;
  toggleReveal: (scope: string) => void;
  resetScope: (scope: string) => void;
  countIn: (scope: string) => number;
}

const Ctx = createContext<DismissState>({
  hidden: new Set(),
  loaded: false,
  toggle: () => {},
  revealed: new Set(),
  toggleReveal: () => {},
  resetScope: () => {},
  countIn: () => 0,
});

export function useDismiss() {
  return useContext(Ctx);
}

/** Short stable id from the item's own text, so ids survive reordering. */
export function dismissId(scope: string, key: string): string {
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${scope}:${(h >>> 0).toString(36)}`;
}

export default function DismissProvider({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setHidden(new Set(JSON.parse(raw) as string[]));
    } catch {
      // Blocked storage just means nothing is remembered.
    }
    setLoaded(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    setHidden(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      // Non-fatal.
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      setHidden((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
        } catch {
          // Non-fatal.
        }
        return next;
      });
    },
    []
  );

  const toggleReveal = useCallback((scope: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(scope)) next.delete(scope);
      else next.add(scope);
      return next;
    });
  }, []);

  const resetScope = useCallback(
    (scope: string) => {
      const next = new Set([...hidden].filter((id) => !id.startsWith(`${scope}:`)));
      persist(next);
    },
    [hidden, persist]
  );

  const countIn = useCallback(
    (scope: string) => [...hidden].filter((id) => id.startsWith(`${scope}:`)).length,
    [hidden]
  );

  const value = useMemo(
    () => ({ hidden, loaded, toggle, revealed, toggleReveal, resetScope, countIn }),
    [hidden, loaded, toggle, revealed, toggleReveal, resetScope, countIn]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
