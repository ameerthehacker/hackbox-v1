import React, { useState } from 'react';
import { Flex, Image, Text, Button, useToast, Link } from '@chakra-ui/core';
import { addApp } from '../../redux/actions/app';
import { connect } from 'react-redux';
// This is to avoid webpack bundling native node modules
const docker = window.require('./services/docker');

function AppCard({ app, addApp }) {
  const toast = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const onAddClick = () => {
    setIsAdding(true);
    addApp(app);

    docker.createApp(app)
    .then((container) => {
      toast({
        title: `${app.name} added`,
        description: (
          <>
            <Link onClick={() => {
              container.start()
                       .then(() => {
                         toast({
                           title: `${app.name} started`,
                           status: 'info',
                           duration: 2000,
                           isClosable: true
                         })
                         
                       })
                       .catch(err => {
                          toast({
                            title: 'Failed to start!',
                            description: `${err}`,
                            status: 'error',
                            duration: 3000,
                            isClosable: true
                          });
                       });
            }}>
              Click Here
            </Link> to start it now
          </>
        ),
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      setIsAdding(false);
    })
    .catch(err => {
      toast({
        title: 'Failed to add!',
        description: `${err}`,
        status: 'error',
        duration: 3000,
        isClosable: true
      });

      setIsAdding(false);
    });
  }

  return (
    <Flex alignItems="center" direction="column" p={4} borderWidth="1px" rounded="lg">
      <Image w={60} src={app.icon} />
      <Text mt={2}>{app.name}</Text>
      <Button 
        mt={2} 
        w="100%"
        variantColor="pink"
        isLoading={isAdding}
        onClick={onAddClick}
      >
        Add
      </Button>
    </Flex>
  );
}

const mapDispatchToProps = { addApp };

export default connect(null, mapDispatchToProps)(AppCard);
