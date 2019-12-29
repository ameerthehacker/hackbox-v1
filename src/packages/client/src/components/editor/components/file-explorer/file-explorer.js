import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FolderTree from './components/folder-tree';
import PropTypes from 'prop-types';

function FileExplorer({ vol }) {
  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <FolderTree vol={vol} />
    </TreeView>
  );
}

FileExplorer.propTypes = {
  vol: PropTypes.object.isRequired
};

export default FileExplorer;
