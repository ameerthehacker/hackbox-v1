import React, { useState, useEffect } from 'react';
import CreateNewComponent from './components/create-new';
import { Flex, Spinner, Box, Text } from '@chakra-ui/core';
import AppStatusCardComponent from '../../components/app-status-card';
import APPS from '../../data/apps';
const docker = window.require('./services/docker');

function Home() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    docker.listApps()
          .then(containers => {
            const hackboxApps = containers.map(container => {
              const app = APPS.find(e => e.image === container.Image);

              return {
                ...app,
                containerId: container.Id
              }
            })

            setApps(hackboxApps);
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
          });
    
    setApps(apps);
  }, []);

  return (
    isLoading?
      <Flex>
        <Spinner size="lg" />
      </Flex>
    : (
      apps.length > 0?
      (
        <>
          <Text textAlign="center" fontSize="2xl">Apps</Text>
          <Flex mt={1} wrap="wrap">
            {
              apps.map((app, index) => {
                return (
                  <Box key={index} p={1}>
                    <AppStatusCardComponent app={app} />
                  </Box>
                )
              })
            }
          </Flex>
        </>
      )
      : <CreateNewComponent />
    )    
  );
}

export default Home;
