import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import FolderIcon from '@material-ui/icons/Folder';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderTree from './components/folder-tree';
import { Box, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    height: '100%',
    color: '#fff',
    background: '#1c1c1c'
  }
});

function FileExplorer({ vol }) {
  let classes = useStyles();

  return (
    <Box pl={2} padding={1} className={classes.container}>
      <TreeView
        defaultCollapseIcon={<FolderOpenIcon />}
        defaultExpandIcon={<FolderIcon />}
      >
        <FolderTree vol={vol} />
      </TreeView>
    </Box>
  );
}

FileExplorer.propTypes = {
  vol: PropTypes.object.isRequired
};

export default FileExplorer;
