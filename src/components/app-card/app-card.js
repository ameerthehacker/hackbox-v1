import React from 'react';
import { Flex, Image, Text, Button } from '@chakra-ui/core';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');

function AppCard({ app }) {
  return (
    <Flex alignItems="center" direction="column" p={4} borderWidth="1px" rounded="lg">
      <Image w={60} src={app.icon} />
      <Text mt={2}>{app.name}</Text>
      <Button 
        mt={2} 
        w="100%"
        variantColor="pink"
        onClick={() => {
          docker.createApp(app);
        }}
      >
        Add
      </Button>
    </Flex>
  );
}

export default AppCard;
