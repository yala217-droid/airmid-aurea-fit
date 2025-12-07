// 💛 Airmid Áurea Fit — Service Worker actualizado SOLO con lo importante

// ⚠️ Cambia el número cuando hagas cambios grandes en la app
const CACHE_NAME = 'airmid-v11';

// Archivos que queremos disponibles offline
const APP_FILES = [
  '/',                     // raíz
  '/index.html',           // pantalla principal con el menú
  '/styles.css',           // estilos generales
  '/app.js',               // lógica de la app
  '/manifest.json',        // manifest de la PWA

  // Iconos de la app
  '/assets/icon-192.png',
  '/assets/icon-512.png',

  // Frases / posts motivacionales
  '/content/posts.json',

  // Páginas que quieres tener offline 💛
  '/content/inicio.html',
  '/content/frases.html',
  '/content/meditacion.html',
  '/content/ejercicios-casa.html',
  '/content/ejercicios-gym.html'
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
  // Solo manejamos peticiones GET dentro del mismo origen
  if (event.request.method !== 'GET') return;

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

