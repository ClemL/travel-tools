/*
 * Offline support for Asia Trip Tools.
 *
 * The reference tabs (phrases, tipping, emergency numbers, plugs, food,
 * neighborhoods) are static data baked into the JS bundle, so caching the app
 * shell makes them work with no connection at all — which is the point, since
 * you need them underground on the MTR and Seoul Metro.
 *
 * Strategy:
 *   navigation  -> network first, fall back to the cached shell
 *   /api/*      -> network first, fall back to the last good response,
 *                  tagged so the UI can say how stale it is
 *   static      -> stale-while-revalidate
 */

const VERSION = "v6";
const SHELL_CACHE = `shell-${VERSION}`;
const DATA_CACHE = `data-${VERSION}`;
const STATIC_CACHE = `static-${VERSION}`;

const SHELL_URLS = ["/", "/icon.svg", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      // Individually so one 404 cannot fail the whole install.
      .then((cache) => Promise.allSettled(SHELL_URLS.map((url) => cache.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const keep = new Set([SHELL_CACHE, DATA_CACHE, STATIC_CACHE]);
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => !keep.has(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/** Adds headers telling the page this body came from cache, and when. */
function tagAsCached(response) {
  const headers = new Headers(response.headers);
  headers.set("x-from-cache", "1");
  const cachedAt = headers.get("x-cached-at");
  if (!cachedAt) headers.set("x-cached-at", "unknown");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** Stores a copy with the time it was fetched, so staleness can be reported. */
async function putWithTimestamp(cacheName, request, response) {
  const cache = await caches.open(cacheName);
  const headers = new Headers(response.headers);
  headers.set("x-cached-at", new Date().toISOString());
  const body = await response.clone().arrayBuffer();
  await cache.put(request, new Response(body, { status: response.status, headers }));
}

async function networkFirstData(request) {
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      await putWithTimestamp(DATA_CACHE, request, fresh);
    }
    return fresh;
  } catch {
    const cached = await caches.match(request, { cacheName: DATA_CACHE });
    if (cached) return tagAsCached(cached);
    return new Response(
      JSON.stringify({
        error: "You are offline and no cached copy of this data is available.",
        offline: true,
      }),
      { status: 503, headers: { "content-type": "application/json", "x-from-cache": "0" } }
    );
  }
}

async function networkFirstShell(request) {
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      const cache = await caches.open(SHELL_CACHE);
      cache.put("/", fresh.clone());
    }
    return fresh;
  } catch {
    const cached = (await caches.match(request, { cacheName: SHELL_CACHE })) ||
      (await caches.match("/", { cacheName: SHELL_CACHE }));
    if (cached) return cached;
    return new Response("<h1>Offline</h1><p>Open the app once while online to enable offline use.</p>", {
      status: 503,
      headers: { "content-type": "text/html" },
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);
  return cached || (await network) || new Response("", { status: 504 });
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstShell(request));
    return;
  }

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirstData(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || /\.(css|js|svg|png|webmanifest|woff2?)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Lets the page trigger an immediate update after a new version is deployed.
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
