import * as fsSW from './fs-sw';

/* eslint-disable no-undef */
System.config({
  baseURL: '/fs',
  map: {
    traceur: 'https://cdn.jsdelivr.net/npm/traceur@0.0.111/bin/traceur.js'
  }
});

System.import('main.js');

const files = {
  'main.js': `
    import hello from './modules/hello'

    hello();
  `,
  'modules/hello': `
    export default function hello() {
      console.log('hello world from sandbox');
    }
  `
};

// register the file system service worker
fsSW.register().then(() => {
  navigator.serviceWorker.controller.postMessage({
    type: 'files',
    content: files
  });
});
document.writeln('Hello world from sandbox!');
