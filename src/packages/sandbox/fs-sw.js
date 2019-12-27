self.addEventListener('activate', (evt) => evt.skipWaiting());

self.addEventListener('fetch', (evt) => {
  console.log(evt);
});
