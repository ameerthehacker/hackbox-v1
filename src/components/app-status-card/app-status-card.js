import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Image, Text, Button, useToast } from '@chakra-ui/core';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');

function AppStatusCardComponent({ app }) {
  const containerId = app.containerId;
  const [container, setContainer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const updateContainerInfo = useCallback((containerId) => {
    docker.getContainer(containerId)
          .inspect()
          .then(container => {
            setContainer(container);
          })
  }, []);

  useEffect(() => {
    updateContainerInfo(containerId);
  }, [containerId, updateContainerInfo]);

  return (
    <Flex alignItems="center" direction="column" p={4} borderWidth="1px" rounded="lg">
      <Image w={60} src={app.icon} />
      <Text mt={2}>{app.name}</Text>
      {
        container? (
          container.State.Running?
          (
            <Button
              mt={2}
              w="100%"
              variant="outline"
              variantColor="red"
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);    

                docker.stopApp(containerId)
                      .then(() => {
                        updateContainerInfo(containerId);
                        setIsLoading(false);    
                      })
                      .catch(err => {
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
              mt={2}
              w="100%"
              variant="outline"
              variantColor="green"
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);

                docker.startApp(containerId)
                      .then(() => {
                        updateContainerInfo(containerId);
                        setIsLoading(false);
                      })
                      .catch(err => {
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
        ): (
          <Button variant="outline" variantColor="teal" isLoading={true}></Button>
        )
      }
    </Flex>
  );
}

export default AppStatusCardComponent;
