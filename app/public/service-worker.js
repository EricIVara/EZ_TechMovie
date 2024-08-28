const CACHE_NAME = "streamlist-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/download-solid.svg",
  "/index.css", // Global CSS
  "/index.js", // Main JavaScript file
  "/image.png", // Example image file

  // Components and related CSS modules
  "/src/components/About.js",
  "/src/components/Cart.js",
  "/src/components/Home.js",
  "/src/components/Layout.js",
  "/src/components/MovieDetails.js",
  "/src/components/Movies.js",
  "/src/components/Navigation.js",
  "/src/components/SignIn.js",
  "/src/components/SignUp.js",
  "/src/components/StreamList.js",
  "/src/components/App.js",

  "/src/components/styles/About.module.css",
  "/src/components/styles/Cart.module.css",
  "/src/components/styles/Home.module.css",
  "/src/components/styles/Layout.module.css",
  "/src/components/styles/MovieDetails.module.css",
  "/src/components/styles/Movies.module.css",
  "/src/components/styles/Navigation.module.css",
  "/src/components/styles/SignIn.module.css",
  "/src/components/styles/SignUp.module.css",
  "/src/components/styles/StreamList.module.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
