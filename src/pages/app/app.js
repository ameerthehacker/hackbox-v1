import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../home';
import NewApp from '../new-app';
import { Box } from '@chakra-ui/core';
import BackLink from '../../components/back-link';

function App() {
  return (
    <>
      <Box p={10} pt={5}>
        <HashRouter>
          <BackLink />
          <Switch>
            <Route path="/" component={Home}  exact />
            <Route path="/new" component={NewApp} exact />
          </Switch>
        </HashRouter>
      </Box>
    </>
  );
}

export default App;
