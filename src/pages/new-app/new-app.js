import React from 'react';
import APPS from '../../data/apps';
import AppCard from '../../components/app-card';
import { Flex } from '@chakra-ui/core';

function NewApp() {
  return (
    APPS.map(app => (
      <Flex>
        <AppCard app={app} />
      </Flex>
    ))
  );
}

export default NewApp;
