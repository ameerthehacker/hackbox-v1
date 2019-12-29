import React from 'react';
import Editor from '../../components/editor';
import Browser from '../../components/browser';
import { Grid } from '@material-ui/core';
import fs from '../../services/fs';

const main = `import hello from './modules/hello';

hello();
`;
const hello = `export default function hello() {
  console.log('hello world from sandbox');
}`;
const vol = fs.getVol();

fs.createOrUpdateFileSync('main.js', main);
vol.mkdirSync('modules');
fs.createOrUpdateFileSync('modules/hello.js', hello);

export default function App() {
  return (
    <Grid container>
      <Grid item xs={8}>
        <Editor monacoOptions={{ fontSize: '20rem' }} />
      </Grid>
      <Grid item xs={4}>
        <Browser />
      </Grid>
    </Grid>
  );
}
