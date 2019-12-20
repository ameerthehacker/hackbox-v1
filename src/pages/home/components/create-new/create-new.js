import React from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

function CreateNewComponent() {
  const history = useHistory();
  
  return (
    <Flex w="100%" direction="column" justifyContent="center">
      <Box textAlign="center">
        <Text fontSize="4xl">You have no apps</Text>
        <Button
          mt="5"
          variantColor="pink" 
          variant="outline"
          onClick={() => history.push('/new')}
        >
          Create new app
        </Button>
      </Box>
    </Flex>
  );
}

export default CreateNewComponent;
