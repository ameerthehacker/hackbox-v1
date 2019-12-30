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

    let mimeType = null;
    let fileName = fsPath.split('/').pop();
    let extension = fileName.split('.').pop();

    switch (extension) {
      case 'js':
        mimeType = 'application/javascript';
        break;
      case 'css':
        mimeType = 'text/css';
        break;
    }

    evt.respondWith(
      new Response(vol.readFileSync(fsPath), {
        ContentType: mimeType
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
