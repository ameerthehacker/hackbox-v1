import React, { useEffect, useState, useCallback } from 'react';
import { Flex, Image, Text, useToast } from '@chakra-ui/core';
import AppActionComponent from './components/app-action';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');
function AppStatusCardComponent({ app, onAppDeleteClick }) {
  const containerId = app.containerId;
  const [container, setContainer] = useState(null);
  
  const updateContainerInfo = useCallback((containerId) => {
   
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
      <AppActionComponent 
        app={app} 
        container={container} 
        onAppDeleteClick={onAppDeleteClick}
        onUpdate={(containerId) => updateContainerInfo(containerId)}
      />
    </Flex>
  );
}

export default AppStatusCardComponent;
