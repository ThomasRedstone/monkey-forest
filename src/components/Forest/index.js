import React from "react";

import ForestModel from "../../models/Forest";
import Monkey from "../../models/Monkey";
import Tree from "../../models/Tree";

import styles from "./Forest.module.css";

const forest = new ForestModel(5, Monkey, Tree, 10);

const Forest = () => (
  <React.Fragment>
    <header className="Forest-header">
      <h1>This is a forest, within it, there are trees and monkeys</h1>
      <p>
        Welcome to the Monkey Forest
      </p>
    </header>
    <div className={styles.container}>
      {forest.getGrid().map(
        (row, key) => <div className={styles.row} key={key}>{
          row.map((column, key) =>
            <div className={styles.square} key={key}>
              <div className={styles.habitat}>
                <img src={column.getGraphic()} />
                {column.getAnimals().length ? column.getAnimals().map((animal, key) =>
                  <img className={styles.animal} src={animal.getGraphic()} key={key} />) : null }
              </div>
            </div>
          )
        }
        </div>
      )}
    </div>
  </React.Fragment>
);

export default Forest;
