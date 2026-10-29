// Jurnal Kripto 1R: menyimpan file aplikasi di HP agar bisa dibuka tanpa internet.
// Ganti angka versi setiap kali file aplikasi diperbarui.
const CACHE = 'jurnal-1r-v3';
const FILES = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

self.addEventListener('install', (e) => {
  // cache: 'reload' memastikan file terbaru, bukan salinan lama dari cache browser.
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pakai salinan di HP lebih dulu (cepat dan jalan offline), lalu perbarui diam-diam dari internet.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const net = fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }).then((res) => {
    if (!res || !res.ok) return res;
    const copy = res.clone();
    return caches.open(CACHE).then((c) => c.put(req, copy)).then(() => res);
  });
  e.waitUntil(net.then(() => {}, () => {}));
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) =>
      hit || net.catch(() => caches.match('./index.html'))
    )
  );
});
