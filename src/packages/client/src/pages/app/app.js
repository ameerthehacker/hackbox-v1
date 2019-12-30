import React from 'react';
import Editor from '../../components/editor';
import Browser from '../../components/browser';
import { Grid } from '@material-ui/core';
import fs from '../../services/fs';

const main = `import hello from './modules/hello.js';
import './modules/index.css';

hello('Ameer Jhan there');
`;
const hello = `export default function hello(name) {
  const div = document.getElementById('output');

  div.innerHTML = \`Hi \${name}\`;
}`;

const css = `
h1 {
  color: red;
}
`;

const vol = fs.getVol();

fs.createOrUpdateFileSync('main.js', main);
vol.mkdirSync('modules');
fs.createOrUpdateFileSync('modules/hello.js', hello);
fs.createOrUpdateFileSync('modules/index.css', css);

export default function App() {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Editor autoSave={false} monacoOptions={{ fontSize: '20rem' }} />
      </Grid>
      <Grid item xs={4}>
        <Browser />
      </Grid>
    </Grid>
  );
}
