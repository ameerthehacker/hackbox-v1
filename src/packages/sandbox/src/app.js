import * as fsSW from './fs-sw';
import { SYNC_FILES, FILES_SYNCED } from './events';
import { vol } from 'memfs';

/* eslint-disable no-undef */
System.config({
  baseURL: '/fs',
  defaultJSExtensions: true,
  map: {
    traceur: 'https://cdn.jsdelivr.net/npm/traceur@0.0.111/bin/traceur.js'
  }
});

const main = `
  import hello from './hello'

  hello();
`;
const hello = `
  export default function hello() {
    console.log('hello world from sandbox');
  }
`;

vol.writeFileSync('main.js', main);
vol.writeFileSync('hello.js', hello);

// register the file system service worker
fsSW.register().then(() => {
  if (navigator.serviceWorker.controller) {
    let channel = new MessageChannel();

    channel.port1.onmessage = (evt) => {
      let { type } = evt.data;

      if (type === FILES_SYNCED) {
        System.import('main.js');
      }
    };

    navigator.serviceWorker.controller.postMessage(
      {
        type: SYNC_FILES,
        content: vol.toJSON()
      },
      [channel.port2]
    );
  } else {
    location.reload();
  }
});

document.writeln('Hello world from sandbox!');
