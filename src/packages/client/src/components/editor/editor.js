import React, { useRef, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import FileExplorer from './components/file-explorer';
import { Grid } from '@material-ui/core';
import fs from '../../services/fs';
import PropTypes from 'prop-types';

function Editor({
  monacoOptions = {},
  autoSave = true,
  autoSaveInterval = 1000
}) {
  const editorRef = useRef();
  const selectedFilePathRef = useRef(null);
  const vol = fs.getVol();

  useEffect(() => {
    if (autoSave) {
      let timer = setInterval(saveSelectedFile, autoSaveInterval);

      return () => clearInterval(timer);
    }
  }, []);

  function saveSelectedFile() {
    if (selectedFilePathRef.current) {
      fs.createOrUpdateFileSync(
        selectedFilePathRef.current,
        editorRef.current.getValue()
      );
    }
  }

  function handleEditorDidMount(_, editor) {
    editorRef.current = editor;
  }

  function handleKeyDown(evt) {
    let charCode = String.fromCharCode(evt.which).toLowerCase();

    if ((evt.ctrlKey || evt.metaKey) && charCode === 's') {
      evt.preventDefault();

      saveSelectedFile();
    }
  }

  return (
    <Grid container onKeyDown={handleKeyDown}>
      <Grid item xs={2}>
        <FileExplorer
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
  monacoOptions: PropTypes.object,
  autoSave: PropTypes.bool,
  autoSaveInterval: PropTypes.number
};

export default Editor;
