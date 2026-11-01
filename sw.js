// Kegel Fit service worker: omogućava rad bez interneta.
// Kad izmeniš index.html, ne moraš ništa da diraš ovde (HTML se uvek prvo traži sa mreže).
// Povećaj verziju samo ako menjaš spisak PRECACHE fajlova.
const CACHE = 'kegel-fit-v4';

const LOCAL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon/android-chrome-192x192.png',
  './favicon/android-chrome-512x512.png',
  './favicon/favicon.ico',
  './favicon/favicon-16x16.png',
  './favicon/favicon-32x32.png',
  './favicon/apple-touch-icon.png'
];

const CDN = [
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
  'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Samo ovi izvori se keširaju. Firestore/Auth API pozivi nikad ne prolaze kroz keš.
function isCacheable(url) {
  if (url.origin === self.location.origin) return true;
  switch (url.hostname) {
    case 'cdn.tailwindcss.com':
    case 'fonts.googleapis.com':
    case 'fonts.gstatic.com':
    case 'cdnjs.cloudflare.com':
      return true;
    case 'www.gstatic.com':
      return url.pathname.startsWith('/firebasejs/');
    default:
      return false;
  }
}

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // Svaki fajl posebno: ako jedan ne uspe, ostali se svejedno keširaju
    await Promise.all([...LOCAL, ...CDN].map(async url => {
      let res = null;
      // Tailwind CDN ne šalje CORS zaglavlje, pa ga odmah tražimo u no-cors režimu (dovoljno za <script>)
      if (url.startsWith('https://cdn.tailwindcss.com')) {
        try { res = await fetch(url, { mode: 'no-cors', cache: 'reload' }); } catch (e) { res = null; }
      } else try {
        res = await fetch(url, { cache: 'reload' });
      } catch (e) {
        // Neki CDN-ovi (npr. Tailwind) ne šalju CORS zaglavlje; za <script>/<link> je dovoljan i no-cors
        try { res = await fetch(url, { mode: 'no-cors', cache: 'reload' }); } catch (e2) { res = null; }
      }
      if (res && (res.ok || res.type === 'opaque')) {
        try { await cache.put(url, res); } catch (e) { /* nastavi */ }
      }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (!isCacheable(url)) return;

  // Stranica: prvo mreža (da uvek dobiješ najnoviju verziju), pa keš kad si offline
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await Promise.race([
          fetch(req),
          new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000))
        ]);
        if (res && res.ok) cache.put('./index.html', res.clone());
        return res;
      } catch (e) {
        return (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
      }
    })());
    return;
  }

  // Ostalo: odmah iz keša, a u pozadini osveži
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req);
    const network = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => null);
    return cached || (await network) || Response.error();
  })());
});
