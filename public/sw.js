// const CACHE_NAME = "tattoo-calc-v1";
// const ASSETS_TO_CACHE = ["/", "/index.html", "/manifest.json", "/icon.svg"];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(ASSETS_TO_CACHE);
//     }),
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) {
//             return caches.delete(key);
//           }
//         }),
//       );
//     }),
//   );
//   self.clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches
//       .match(event.request)
//       .then((cachedResponse) => {
//         if (cachedResponse) {
//           return cachedResponse;
//         }
//         return fetch(event.request).then((networkResponse) => {
//           if (
//             !networkResponse ||
//             networkResponse.status !== 200 ||
//             networkResponse.type !== "basic"
//           ) {
//             return networkResponse;
//           }
//           const responseToCache = networkResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });
//           return networkResponse;
//         });
//       })
//       .catch(() => {
//         return caches.match("/");
//       }),
//   );
// });

//
//
//
// const CACHE_NAME = 'tattoo-calc-v2';

// self.addEventListener('install', () => {
//   self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) {
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
//   self.clients.claim();
// });

// self.addEventListener('fetch', (event) => {
//   // 1. For HTML/Navigation requests: Always try Network FIRST to get fresh app updates
//   if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
//     event.respondWith(
//       fetch(event.request)
//         .then((networkResponse) => {
//           return caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, networkResponse.clone());
//             return networkResponse;
//           });
//         })
//         .catch(() => {
//           // If offline, return cached version
//           return caches.match(event.request).then((cached) => cached || caches.match('/'));
//         })
//     );
//     return;
//   }

//   // 2. For other static assets (JS, CSS, SVGs): Cache First, fallback to Network
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse;
//       }
//       return fetch(event.request).then((networkResponse) => {
//         if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
//           const responseToCache = networkResponse.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, responseToCache);
//           });
//         }
//         return networkResponse;
//       });
//     })
//   );
// });

const CACHE_NAME = "tattoo-calc-v2";
// Повертаємо pre-caching, щоб додаток гарантовано працював в офлайні з першої секунди
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon.svg", // Переконайтеся, що шлях збігається з вашим проектом
];

// Інсталяція: завантажуємо базові файли в кеш
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }),
  );
});

// Активація: очищення старих версій кешу (v1 тощо)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});

// Перехоплення запитів
self.addEventListener("fetch", (event) => {
  // 1. Для HTML/Навігації: Спочатку Мережа (Network First)
  if (
    event.request.mode === "navigate" ||
    event.request.headers.get("accept")?.includes("text/html")
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            // Оновлюємо кеш свіжою копією з мережі
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // Якщо мережі немає — віддаємо точну сторінку або корінь додатка
          return caches
            .match(event.request)
            .then((cached) => cached || caches.match("/"));
        }),
    );
    return;
  }

  // 2. Для статичних ресурсів: Спочатку Кеш (Cache First)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        // Дозволяємо кешувати власні ('basic') та CORS-запити (шрифти/іконки з CDN)
        if (
          networkResponse.type === "basic" ||
          networkResponse.type === "cors"
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    }),
  );
});
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
