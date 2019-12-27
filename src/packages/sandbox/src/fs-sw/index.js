export function register() {
  if (!('serviceWorker' in navigator)) {
    // service worker is not supported
    return Promise.resolve(false);
  }

  // register the service worker
  return new Promise((resolve, reject) => {
    navigator.serviceWorker
      .register('../../fs-sw.js')
      .then((registration) => {
        console.log(
          `fs service worker registered successfully with scope ${registration.scope}`
        );

        resolve(true);
      })
      .catch((err) => {
        console.error(`unable to register fs service worker ${err}`);

        reject(false);
      });
  });
}
