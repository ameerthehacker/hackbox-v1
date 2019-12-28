import { SYNC_FILES, FILES_SYNCED } from './src/events';
import { vol } from 'memfs';

const FS_PREFIX = '/fs/';

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('fetch', (evt) => {
  let requestUrl = evt.request.url;
  let fsPrefixIndex = requestUrl.search(FS_PREFIX);

  if (fsPrefixIndex !== -1) {
    let fsPath = requestUrl.substring(fsPrefixIndex + FS_PREFIX.length);

    if (!vol.existsSync(fsPath)) {
      evt.respondWith(
        new Response(null, {
          status: 404
        })
      );

      return;
    }

    evt.respondWith(
      new Response(vol.readFileSync(fsPath), {
        ContentType: 'application/javascript'
      })
    );
  }
});

self.addEventListener('message', (evt) => {
  let { type, content } = evt.data;

  if (type === SYNC_FILES) {
    vol.fromJSON(content);

    evt.ports[0].postMessage({ type: FILES_SYNCED });
  }
});
