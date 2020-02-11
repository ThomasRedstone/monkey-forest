import React from 'react';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import routes from './config/routes';
import './App.css';
import Home from "./Home";

const App = () => (
  <Router>
    <div className="App">
      <Switch>
        <Route path={routes.forest}>
          <h1>Forest goes here</h1>
        </Route>
        <Route path={routes.home}>
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
