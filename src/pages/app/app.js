import React from 'react';
import Home from '../home';
import NewApp from '../new-app';
import { Tabs, TabList, TabPanels, TabPanel, Tab } from '@chakra-ui/core';

function App() {
  return (
    <>
      <Tabs variant="soft-rounded" mt={5} variantColor="pink">
        <TabList p={5}>
          <Tab>
            My Apps
          </Tab>
          <Tab>
            Available Apps
          </Tab>
        </TabList>
        <TabPanels p={5} pt={0}>
          <TabPanel>
            <Home />
          </TabPanel>
          <TabPanel>
            <NewApp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

export default App;
