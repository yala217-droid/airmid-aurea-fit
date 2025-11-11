const CACHE_NAME = 'airmid-fit-v1';
const ASSETS = [
  '/', '/index.html','/styles.css','/app.js','/manifest.json',
  '/assets/icon-192.png','/assets/icon-512.png',
  '/content/posts.json','/assets/post-1.jpg','/assets/post-2.jpg','/assets/post-3.jpg'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('activate', e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k))))
  );
});
self.addEventListener('fetch', e=>{
  const url = new URL(e.request.url);
  if(url.origin === location.origin){
    e.respondWith(
      caches.match(e.request).then(resp=> resp || fetch(e.request))
    );
  }
});