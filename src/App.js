import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import routes from './config/routes';
import './App.css';
import Home from './components/Home';
import Forest from "./components/Forest";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path={routes.forest}>
          <Forest />
        </Route>
        <Route path={routes.home}>
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
