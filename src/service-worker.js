const APP_CACHE_NAME = 'howcani-cache-v2';
const GITHUB_CACHE_NAME = 'github-cache';

const filesToCache = [
  './index.html',
  './images/howcani.png',
  './images/favicon/favicon-16x16.png',
  './styles/styles.css',
  './service-worker.js',
  './scripts/vendor.js',
  './scripts/bundle.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v21/2fcrYFNaTjcS6g4U3t-Y5ZjZjT5FdEJ140U2DJYC3mY.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/fonts/roboto/Roboto-Bold.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/fonts/roboto/Roboto-Regular.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/fonts/roboto/Roboto-Light.woff2'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_CACHE_NAME).then(cache => {
      return cache.addAll(filesToCache).catch(error => console.log('Error while adding files to cache', error));
    })
  );
});

self.addEventListener('activate', event => {
  const appCaches = [APP_CACHE_NAME, GITHUB_CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return !appCaches.some(c => c === cacheName);
        }).map(cacheName => {
          console.log(`Remove old version ${cacheName} from ServiceWorker cache`);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  let cacheName = APP_CACHE_NAME;
  let cacheStrategy = cacheFirst;

  if (event.request.url.indexOf('api.github.com') >= 0) {
    cacheName = GITHUB_CACHE_NAME;
    cacheStrategy = networkFirst;
  }

  event.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(event.request).then(response => {
        return cacheStrategy(event.request, cache, response);
      });
    })
  );
});

function networkFirst(request, cache, cacheResponse) {
  return fetch(request)
    .then(networkResponse => {
      cache.put(request, networkResponse.clone());
      return networkResponse;
    })
    .catch(() => {
      return cacheResponse;
    });
}

function cacheFirst(request, cache, cacheResponse) {
  if (cacheResponse) {
    return cacheResponse;
  }

  return fetch(request).then(networkResponse => {
    cache.put(request, networkResponse.clone());
    return networkResponse;
  });
}

