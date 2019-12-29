import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import PropTypes from 'prop-types';

function FolderTree({ vol, parentFolder = '.' }) {
  let folderContents = vol.readdirSync(parentFolder);
  let folders = folderContents.filter(
    (content) => !vol.lstatSync(`${parentFolder}/${content}`).isFile()
  );
  let files = folderContents.filter((content) =>
    vol.lstatSync(`${parentFolder}/${content}`).isFile()
  );

  let folderTree = folders.map((folder) => {
    let folderPath = `${parentFolder}/${folder}`;

    return (
      <TreeItem key={folderPath} nodeId={folderPath} label={folder}>
        <FolderTree vol={vol} parentFolder={folderPath} />
      </TreeItem>
    );
  });

  let fileTree = files.map((file) => {
    let filePath = `${parentFolder}/${file}`;

    return <TreeItem key={filePath} nodeId={filePath} label={file} />;
  });

  return (
    <>
      {folderTree}
      {fileTree}
    </>
  );
}

FolderTree.propTypes = {
  vol: PropTypes.object.isRequired,
  parentFolder: PropTypes.string
};

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
