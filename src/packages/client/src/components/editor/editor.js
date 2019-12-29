import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import FileExplorer from './components/file-explorer';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

function Editor({ vol, monacoOptions = {} }) {
  return (
    <Grid container>
      <Grid item xs={2}>
        <FileExplorer vol={vol} />
      </Grid>
      <Grid item xs={10}>
        <MonacoEditor
          options={monacoOptions}
          theme="vs-dark"
          height="100vh"
          language="javascript"
        />
      </Grid>
    </Grid>
  );
}

Editor.propTypes = {
  vol: PropTypes.object.isRequired,
  monacoOptions: PropTypes.object
};

export default Editor;
