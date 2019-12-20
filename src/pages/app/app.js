import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../home';
import NewApp from '../new-app';
import { Flex } from '@chakra-ui/core';

function App() {
  return (
    <Flex p={10}>
      <HashRouter>
        <Switch>
          <Route path="/" component={Home}  exact />
          <Route path="/new" component={NewApp} exact />
        </Switch>
      </HashRouter>
    </Flex>
  );
}

export default App;
