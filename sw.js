const CACHE = "portal-imigrante-v32";
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

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(CORE);
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
            return key !== CACHE;
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

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response.ok) {
            const copy = response.clone();
            event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.put(request, copy); }));
          }
          return response;
        })
        .catch(function () {
          return caches.match(request).then(function (hit) {
            return hit || caches.match("index.html");
          });
        }),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (hit) {
      if (hit) return hit;
      return fetch(request).then(function (response) {
        if (response.ok) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then(function (cache) { return cache.put(request, copy); }));
        }
        return response;
      });
    }),
  );
});
