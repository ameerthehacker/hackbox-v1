import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Home from '../home';
import NewApp from '../new-app';

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home}  exact />
        <Route path="/new" component={NewApp} exact />
      </Switch>
    </HashRouter>
  );
}

export default App;
