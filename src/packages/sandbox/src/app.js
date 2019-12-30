import * as fsSW from './fs-sw';
import { SYNC_FILES, FILES_SYNCED } from './events';
import 'systemjs/dist/system';
import 'systemjs/dist/extras/transform';
import 'systemjs-transform-babel';
import 'systemjs-css-extra/dist/css';

// register the file system service worker
fsSW.register().then(() => {
  if (navigator.serviceWorker.controller) {
    // tell parent that we are ready
    window.parent.postMessage(
      {
        type: 'READY'
      },
      'http://localhost:3000'
    );

    let channel = new MessageChannel();

    channel.port1.onmessage = (evt) => {
      let { type } = evt.data;

      if (type === FILES_SYNCED) {
        /* eslint-disable no-undef */
        System.import('./fs/main.js');
      }
    };

    window.addEventListener('message', (evt) => {
      let { type } = evt.data;

      switch (type) {
        case 'RELOAD': {
          location.reload();
          break;
        }
        case 'SYNC_FILES': {
          let { files } = evt.data;

          navigator.serviceWorker.controller.postMessage(
            {
              type: SYNC_FILES,
              content: files
            },
            [channel.port2]
          );
          break;
        }
      }
    });
  } else {
    location.reload();
  }
});
