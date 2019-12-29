import React from 'react';
import Editor from '../../components/editor';
import { vol } from 'memfs';

const main = `import hello from './modules/hello';

hello();
`;
const hello = `export default function hello() {
  console.log('hello world from sandbox');
}`;

vol.writeFileSync('main.js', main);
vol.mkdirSync('modules');
vol.writeFileSync('modules/hello.js', hello);

export default function App() {
  return <Editor vol={vol} monacoOptions={{ fontSize: '20rem' }} />;
}
