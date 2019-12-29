import React from 'react';
import TreeItem from '@material-ui/lab/TreeItem';
import fs from '../../../../../../services/fs';
import PropTypes from 'prop-types';

function FolderTree({ onFileSelected, parentFolder = '.' }) {
  const vol = fs.getVol();
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
        <FolderTree
          vol={vol}
          onFileSelected={onFileSelected}
          parentFolder={folderPath}
        />
      </TreeItem>
    );
  });

  let fileTree = files.map((file) => {
    let filePath = `${parentFolder}/${file}`;

    return (
      <TreeItem
        onClick={() => onFileSelected(filePath)}
        key={filePath}
        nodeId={filePath}
        label={file}
      />
    );
  });

  return (
    <>
      {folderTree}
      {fileTree}
    </>
  );
}

FolderTree.propTypes = {
  parentFolder: PropTypes.string,
  onFileSelected: PropTypes.func.isRequired
};

export default FolderTree;
