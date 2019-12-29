import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import FileExplorer from './components/file-explorer';
import { Grid } from '@material-ui/core';

function Editor() {
  return (
    <Grid container>
      <Grid item xs={2}>
        <FileExplorer />
      </Grid>
      <Grid item xs={10}>
        <MonacoEditor theme="vs-dark" height="100vh" language="javascript" />
      </Grid>
    </Grid>
  );
}

export default Editor;
