import monkey from "../../icons/monkey.svg";
import {Link} from "react-router-dom";
import routes from "../../config/routes";
import React from "react";

const Home = () => (
  <header className="App-header">
    <img src={monkey} className="App-logo" alt="logo" />
    <p>
      Welcome to the Monkey Forest
    </p>
    <Link to={routes.forest}>
      Enter, if you dare
    </Link>
    <p>Or checkout the <a href={routes.coverage}>code coverage results</a></p>
  </header>
);

export default Home;
