import React, { useState } from 'react';
import { Button, Stack, useToast } from '@chakra-ui/core';
const docker = window.require('./services/docker');

function AppActionComponent({ app, container, onUpdate, onAppDeleteClick }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const btnStartOrStop = (container) => (
    container.State.Running? (
      <Button
        w="100%"
        variant="outline"
        variantColor="red"
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);

          docker
            .stopApp(container.containerId)
            .then(() => {
              onUpdate(container.containerId);
              setIsLoading(false);
            })
            .catch((err) => {
              toast({
                title: 'Failed to stop!',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true
              });
              setIsLoading(false);
            });
        }}
      >
        Stop
      </Button>
      ): (
      <Button
        w="100%"
        variant="outline"
        variantColor="green"
        isLoading={isLoading}
        onClick={() => {
          setIsLoading(true);

          docker
            .startApp(container.containerId)
            .then(() => {
              onUpdate(container.containerId);
              docker.openPortsInBrowser(container, app.ports);
              setIsLoading(false);
            })
            .catch((err) => {
              toast({
                title: 'Failed to start!',
                description: `${err}`,
                status: 'error',
                duration: 3000,
                isClosable: true
              });
              setIsLoading(false);
            });
        }}
      >
        Start
      </Button>
    )
  );

  return (
    <Stack direction="row" spacing={1} mt={2}>
      {container ? (
        btnStartOrStop(container)
      ) : (
        <Button variant="outline" variantColor="teal" isLoading={true}></Button>
      )}
    </Stack>
  );
}

export default AppActionComponent;
