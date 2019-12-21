import React from 'react';
import { Flex, Button, Text, Box } from '@chakra-ui/core';

function CreateNewComponent() {
  return (
    <Flex w="100%" direction="column" justifyContent="center">
      <Box textAlign="center">
        <Text fontSize="4xl">You have no apps</Text>
        <Button
          mt="5"
          variantColor="pink" 
          variant="outline"
          onClick={() => {}}
        >
          Create new app
        </Button>
      </Box>
    </Flex>
  );
}

export default CreateNewComponent;
