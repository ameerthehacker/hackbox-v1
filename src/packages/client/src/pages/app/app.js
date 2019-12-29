import React from 'react';
import Editor from '../../components/editor';
import Browser from '../../components/browser';
import { Grid } from '@material-ui/core';
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
  return (
    <Grid container>
      <Grid item xs={8}>
        <Editor vol={vol} monacoOptions={{ fontSize: '20rem' }} />
      </Grid>
      <Grid item xs={4}>
        <Browser vol={vol} />
      </Grid>
    </Grid>
  );
}
