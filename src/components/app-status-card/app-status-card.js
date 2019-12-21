import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Image, Text, Button, useToast, Box, Icon } from '@chakra-ui/core';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');

function AppStatusCardComponent({ app, onAppDeleteClick }) {
  const containerId = app.containerId;
  const [container, setContainer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const updateContainerInfo = useCallback((containerId) => {
    docker
      .getContainer(containerId)
      .inspect()
      .then((container) => {
        setContainer(container);
      });
  }, []);

  useEffect(() => {
    updateContainerInfo(containerId);
  }, [containerId, updateContainerInfo]);

  return (
    <Flex
      alignItems="center"
      direction="column"
      p={4}
      borderWidth="1px"
      rounded="lg"
    >
      <Image w={60} src={app.icon} />
      <Text mt={2}>{app.name}</Text>
      {container ? (
        <Flex mt={2}>
          {
            <Box p={1}>
              {
                container.State.Running? (
                  <Button
                    w="100%"
                    variant="outline"
                    variantColor="red"
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
  
                      docker
                        .stopApp(containerId)
                        .then(() => {
                          updateContainerInfo(containerId);
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
                        .startApp(containerId)
                        .then(() => {
                          updateContainerInfo(containerId);
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
              }
            </Box>
          }
          <Box p={1}>
            <Button 
              variantColor="red" 
              variant="outline" 
              isActive={isLoading}
              onClick={() => onAppDeleteClick(containerId)}
            >
              <Icon name="delete" />
            </Button>
          </Box>
        </Flex>
      ) : (
        <Button variant="outline" variantColor="teal" isLoading={true}></Button>
      )}
    </Flex>
  );
}

export default AppStatusCardComponent;
