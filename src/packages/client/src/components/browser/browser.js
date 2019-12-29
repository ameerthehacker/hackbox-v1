import React, { useRef } from 'react';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: '100%'
  },
  iframe: {
    border: 0,
    height: '100%',
    width: '100%'
  },
  navBar: {
    background: '#2b2828'
  }
});

function Browser({ vol }) {
  let classes = useStyles();
  const iframeRef = useRef(null);

  window.addEventListener('message', (evt) => {
    let { type } = evt.data;

    if (type === 'READY') {
      iframeRef.current.contentWindow.postMessage(
        {
          type: 'SYNC_FILES',
          files: vol.toJSON()
        },
        'http://localhost:3001'
      );
    }
  });

  function handleRefreshBtnClick() {
    iframeRef.current.contentWindow.postMessage(
      {
        type: 'RELOAD'
      },
      'http://localhost:3001'
    );
  }

  return (
    <Box className={classes.container}>
      <Box className={classes.navBar} height={50}>
        <IconButton onClick={handleRefreshBtnClick} color="default">
          <RefreshIcon color="secondary" />
        </IconButton>
      </Box>
      <iframe
        title="hackbox"
        ref={iframeRef}
        className={classes.iframe}
        sandbox="allow-forms allow-scripts allow-same-origin allow-modals allow-popups allow-presentation"
        allow="geolocation; microphone; camera;midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
        src="http://localhost:3001"
      ></iframe>
    </Box>
  );
}

Browser.propTypes = {
  vol: PropTypes.object.isRequired
};

export default Browser;
