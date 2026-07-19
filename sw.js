const CACHE_PREFIX = "portal-imigrante-";
const CACHE = CACHE_PREFIX + "v35";
const CORE = [
  "./",
  "index.html",
  "styles.css",
  "steps.css",
  "language.css",
  "app.js",
  "manifest.webmanifest",
  "assets/logo.png",
  "assets/brand.css",
  "assets/flags/br.svg",
  "assets/flags/us.svg",
  "assets/flags/es.svg",
  "guia/",
  "guia/index.html",
  "guia/guide.css",
  "guia/guide.js",
  "data/services.json",
  "data/services.js",
  "data/",
  "data/index.html",
  "data/data-page.css",
  "data/data-page.js",
  "research-desk/",
  "research-desk/index.html",
  "research-desk/styles.css",
  "research-desk/app.js",
  "research-desk/data.js",
];

const CORE_URLS = new Set(CORE.map(function (path) {
  return new URL(path, self.registration.scope).href;
}));

function cacheKey(request) {
  const url = new URL(request.url);
  url.hash = "";
  url.search = "";
  return url.href;
}

function canCache(response) {
  return response && response.ok && response.type === "basic";
}

async function networkFirst(request, key, fallbackKey) {
  try {
    const response = await fetch(request);
    if (CORE_URLS.has(key) && canCache(response)) {
      const cache = await caches.open(CACHE);
      await cache.put(key, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(key);
    if (cached) return cached;
    if (fallbackKey) return caches.match(fallbackKey);
    throw error;
  }
}

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(Array.from(CORE_URLS));
    }),
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) {
            return key.startsWith(CACHE_PREFIX) && key !== CACHE;
          })
          .map(function (key) {
            return caches.delete(key);
          }),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (!url.href.startsWith(self.registration.scope)) return;

  const key = cacheKey(request);
  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, key, new URL("./", self.registration.scope).href));
    return;
  }

  if (CORE_URLS.has(key)) {
    event.respondWith(networkFirst(request, key));
  }
});
