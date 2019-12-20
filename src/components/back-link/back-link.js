import React from 'react';
import { Box, Icon, Link } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

function BackLink() {
  const history = useHistory();

  return (
    history.location.pathname !== '/'?
    (
      <Box pb={5}>
        <Link onClick={() => history.goBack()}>
          <Icon name="arrow-back" /> 
          Back
        </Link>
      </Box>
    ): null
  );
}

export default BackLink;
