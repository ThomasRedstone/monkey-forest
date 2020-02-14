import React from "react";

import ForestModel from "../../models/Forest";
import Monkey from "../../models/Monkey";
import Tree from "../../models/Tree";

const forest = new ForestModel(10, Monkey, Tree, 30);

const Forest = () => (
  <React.Fragment>
    <header className="Forest-header">
      <h1>This is a forest, within it, there are trees and monkeys</h1>
      <p>
        Welcome to the Monkey Forest
      </p>
    </header>
    <div>
      <table>
      {forest.getGrid().map(
        row => <tr>{ row.map(column => <td>{column.getAnimals().length}</td>) }</tr>
      )}
      </table>
    </div>
  </React.Fragment>
);

export default Forest;
