import React, { useState, useEffect } from 'react';
import CreateNewComponent from './components/create-new';
import { Flex, Spinner, Box, useToast } from '@chakra-ui/core';
import AppStatusCardComponent from '../../components/app-status-card';
import { connect } from 'react-redux';
import { getAllApps } from '../../redux/selectors/app';

function Home({ apps }) {
  console.log(apps);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    
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
            apps.map((app) => {
              console.log(app);
              return (
                <Box key={app.appId} p={1}>
                  <AppStatusCardComponent 
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

const mapStateToProps = (state) => {
  return {
    apps: getAllApps(state.apps)
  }
}

export default connect(mapStateToProps)(Home);
