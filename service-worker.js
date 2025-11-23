// 💛 Airmid Áurea Fit — Service Worker actualizado
const CACHE_NAME = 'airmid-v5'; // cambia el número cuando hagas una actualización grande

// Archivos base que queremos que estén disponibles offline
const APP_FILES = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/content/posts.json'
];

// 📦 INSTALACIÓN — guarda los archivos base en caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(APP_FILES);
    })
  );
  self.skipWaiting(); // fuerza a que este SW nuevo reemplace al anterior
});

// 🚀 ACTIVACIÓN — borra versiones antiguas del caché
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // activa inmediatamente la nueva versión para todas las pestañas
});

// 🔄 FETCH — intenta primero desde la red y, si falla, usa caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // guardamos la respuesta nueva en caché
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, res.clone());
          return res;
        });
      })
      .catch(() => {
        // si no hay red, tiramos de lo que haya en caché
        return caches.match(event.request);
      })
  );
});
