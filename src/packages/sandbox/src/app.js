import * as fsSW from './fs-sw';

// register the file system service worker
fsSW.register();
document.writeln('Hello world from sandbox!');
