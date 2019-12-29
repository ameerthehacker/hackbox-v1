import React, { useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import FileExplorer from './components/file-explorer';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

function Editor({ vol, monacoOptions = {} }) {
  const editorRef = useRef();
  const selectedFilePathRef = useRef(null);

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  function handleKeyDown(evt) {
    let charCode = String.fromCharCode(evt.which).toLowerCase();

    if ((evt.ctrlKey || evt.metaKey) && charCode === 's') {
      evt.preventDefault();

      if (selectedFilePathRef.current) {
        vol.writeFileSync(
          selectedFilePathRef.current,
          editorRef.current.getValue()
        );
      }
    }
  }

  return (
    <Grid container onKeyDown={handleKeyDown}>
      <Grid item xs={2}>
        <FileExplorer
          vol={vol}
          onFileSelected={(filePath) => {
            let fileContent = vol.readFileSync(filePath, 'utf-8');
            selectedFilePathRef.current = filePath;

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
