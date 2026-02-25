// Service Worker — FreeCell Online
// Strategy: Network-first for everything except card images
// This ensures users always get the latest code on deploy

const CACHE_NAME = 'freecell-v2';

const PRECACHE_URLS = [
  '/',
  '/manifest.json',
  '/icons/icon.svg',
];

// Install: precache essential assets, immediately take over
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean ALL old caches, claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and external
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  // Skip API routes entirely
  if (url.pathname.startsWith('/api/')) return;

  // Card images: cache-first (large files, rarely change)
  if (url.pathname.startsWith('/cards/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // Everything else: network-first (always get latest code)
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
