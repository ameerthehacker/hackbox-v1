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
        {
          process.env.NODE_ENV === 'development'?
          (
            <>
              <Link 
                ml={5} 
                onClick={() => window.location.reload()}
              >
                Reload
              </Link>
              <Link 
                ml={5} 
                onClick={() => history.push('/')}
              >
               Home
              </Link>
            </>
          ): null
        }
      </Box>
    ): null
  );
}

export default BackLink;
