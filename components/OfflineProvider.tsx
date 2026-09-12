"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface OfflineState {
  online: boolean;
  /** True once the service worker controls the page, so offline use will work. */
  ready: boolean;
  /** Set when a newer build has been deployed and is waiting to activate. */
  updateReady: boolean;
  applyUpdate: () => void;
}

const Ctx = createContext<OfflineState>({
  online: true,
  ready: false,
  updateReady: false,
  applyUpdate: () => {},
});

export function useOffline() {
  return useContext(Ctx);
}

export default function OfflineProvider({ children }: { children: React.ReactNode }) {
  // Start optimistic: navigator is unavailable during server render.
  const [online, setOnline] = useState(true);
  const [ready, setReady] = useState(false);
  const [updateReady, setUpdateReady] = useState(false);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    setOnline(navigator.onLine);
    const up = () => setOnline(true);
    const down = () => setOnline(false);
    window.addEventListener("online", up);
    window.addEventListener("offline", down);
    return () => {
      window.removeEventListener("online", up);
      window.removeEventListener("offline", down);
    };
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    let cancelled = false;
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        if (cancelled) return;
        if (navigator.serviceWorker.controller) setReady(true);

        const trackInstalling = (worker: ServiceWorker | null) => {
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                setWaiting(worker);
                setUpdateReady(true);
              } else {
                setReady(true);
              }
            }
          });
        };

        if (registration.waiting) {
          setWaiting(registration.waiting);
          setUpdateReady(true);
        }
        trackInstalling(registration.installing);
        registration.addEventListener("updatefound", () => trackInstalling(registration.installing));
      })
      .catch(() => {
        // Registration failures are non-fatal: the app works, just not offline.
      });

    const onControllerChange = () => setReady(true);
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    return () => {
      cancelled = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    waiting?.postMessage("SKIP_WAITING");
    // The new worker takes over, then a reload picks up the new assets.
    setTimeout(() => window.location.reload(), 250);
  }, [waiting]);

  return <Ctx.Provider value={{ online, ready, updateReady, applyUpdate }}>{children}</Ctx.Provider>;
}

/** Small status line shown in the header. */
export function OfflineBadge() {
  const { online, ready, updateReady, applyUpdate } = useOffline();

  if (updateReady) {
    return (
      <button className="offline-badge badge-update" onClick={applyUpdate}>
        Update available — tap to reload
      </button>
    );
  }
  if (!online) {
    return <span className="offline-badge badge-offline">Offline — showing saved data</span>;
  }
  if (ready) {
    return <span className="offline-badge badge-ready">Saved for offline use</span>;
  }
  return null;
}
