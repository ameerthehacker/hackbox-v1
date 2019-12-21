import React from 'react';
import { Flex, Image, Text, Button } from '@chakra-ui/core';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');

function AppStatusCardComponent({ app }) {
  const isContainerRunning = app.container.State === 'running';
  
  return (
    <Flex alignItems="center" direction="column" p={4} borderWidth="1px" rounded="lg">
      <Image w={60} src={app.icon} />
      <Text mt={2}>{app.name}</Text>
      {
        isContainerRunning?
        (
          <Button
            mt={2}
            w="100%"
            variantColor="red"
            onClick={() => {
              docker.stopApp(app.container.Id);
            }}
          >
           Stop
          </Button>
        ): (
          <Button
            mt={2}
            w="100%"
            variantColor="green"
            onClick={() => {
              docker.startApp(app.container.Id);
            }}
          >
           Start
          </Button>
        )
      }
    </Flex>
  );
}

export default AppStatusCardComponent;
