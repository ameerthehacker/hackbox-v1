import React, { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import FileExplorer from './components/file-explorer';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

function Editor({ vol, monacoOptions = {} }) {
  const editorRef = useRef();

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  return (
    <Grid container>
      <Grid item xs={2}>
        <FileExplorer
          vol={vol}
          onFileSelected={(filePath) => {
            let fileContent = vol.readFileSync(filePath, 'utf-8');

            editorRef.current.setValue(fileContent);
          }}
        />
      </Grid>
      <Grid item xs={10}>
        <MonacoEditor
          options={monacoOptions}
          theme="vs-dark"
          height="100vh"
          language="javascript"
          editorDidMount={handleEditorDidMount}
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
