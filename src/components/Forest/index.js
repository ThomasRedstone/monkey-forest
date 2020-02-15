import React, {useState} from "react";

import ForestModel from "../../models/Forest";
import Monkey from "../../models/Monkey";
import Tree from "../../models/Tree";

import styles from "./Forest.module.css";
import {useInterval} from "../../helpers/useInterval";

const Forest = () => {
  const [forest, setForest] = useState(new ForestModel(5, Monkey, Tree, 25));
  const [delay, setDelay] = useState(1000);
  useInterval(() => setForest(forest.shuffle()), delay);
  return (
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
                <div className={styles.column}>
                  <img className={styles.habitat} src={column.getGraphic()}/>
                  {column.getAnimals().length ? column.getAnimals().map((animal, key) =>
                    <img
                      className={styles.animal}
                      src={animal.getGraphic()}
                      key={key}
                      style={{marginLeft: `${key * 25}%`}}
                    />) : null}
                </div>
              </div>
            )
          }
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Forest;
