import { SYNC_FILES, FILES_SYNCED } from './src/events';

const FS_PREFIX = '/fs/';
let files = {};

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('fetch', (evt) => {
  let requestUrl = evt.request.url;
  let fsPrefixIndex = requestUrl.search(FS_PREFIX);

  if (fsPrefixIndex !== -1) {
    let fsPath = requestUrl.substring(fsPrefixIndex + FS_PREFIX.length);

    if (files[fsPath] === undefined) {
      evt.respondWith(
        new Response(null, {
          status: 404
        })
      );

      return;
    }

    evt.respondWith(
      new Response(files[fsPath], {
        ContentType: 'application/javascript'
      })
    );
  }
});

self.addEventListener('message', (evt) => {
  let { type, content } = evt.data;

  if (type === SYNC_FILES) {
    files = content;

    evt.ports[0].postMessage({ type: FILES_SYNCED });
  }
});
