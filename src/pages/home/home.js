import React, { useState, useEffect } from 'react';
import CreateNewComponent from './components/create-new';
import { Flex, Spinner, Box, useToast } from '@chakra-ui/core';
import AppStatusCardComponent from '../../components/app-status-card';
import APPS from '../../data/apps';
const docker = window.require('./services/docker');

function Home() {
  const [apps, setApps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

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
          .catch(() => {
            setIsLoading(false);
          });    
  }, []);

  return (
    isLoading?
      <Flex>
        <Spinner size="lg" />
      </Flex>
    : (
      apps.length > 0?
      (
        <Flex mt={1} wrap="wrap">
          {
            apps.map((app, index) => {
              return (
                <Box key={index} p={1}>
                  <AppStatusCardComponent 
                    onAppDeleteClick={(containerId) => {
                      docker.deleteApp(containerId)
                            .then(() => {
                              const newApps = apps.filter(app => app.containerId !== containerId);
                              setApps(newApps);

                              toast({
                                title: 'Deleted!',
                                description: `The app was deleted`,
                                status: 'success',
                                duration: 3000,
                                isClosable: true
                              });
                            })
                            .catch(err => {
                              toast({
                                title: 'Failed to delete!',
                                description: `${err}`,
                                status: 'error',
                                duration: 3000,
                                isClosable: true
                              });
                            });
                    }} 
                    app={app} 
                  />
                </Box>
              )
            })
          }
        </Flex>
      )
      : <CreateNewComponent />
    )    
  );
}

export default Home;
