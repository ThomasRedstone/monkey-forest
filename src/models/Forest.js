/**
 * This forest will come into being with a square grid, with a width as specified, the type of animal
 * is passed in, and as the grid is populated, the an appropriate probability is used which would
 * allow the supplied animalCount to be created, on average. This provides a slightly more natural forest,
 * but there is always a risk that there are no animals in it.
 * To try to allow for immutability, new forest can be instantiated with an existing grid.
 */
class Forest {
  constructor(width, animal, habitat, animalCount, grid = undefined) {
    this.width = width;
    this.animal = animal;
    this.habitat = habitat;
    this.animalCount = animalCount;
    this.validationResult = this.validate();
    this.animalProbability = this.animalCount / (this.width * this.width);
    this.grid = grid || this.populate();
  }

  validate = () => {
    if(this.width <= 0) {
      throw Error('Width must be a positive number');
    }
    if(this.animalCount <= 0 ) {
      throw Error('There must be one or more animals');
    }
    if(typeof this.habitat !== 'function') {
      throw Error('The habitat must be an object');
    }
    if(typeof this.animal !== 'function') {
      throw Error('The animal must be an object');
    }
    return true;
  };

  getGrid = () => this.grid;

  getValidationResult = () => this.validationResult;

  /**
   * This can be used to build a grid, filled with new animals, or one with the list of animals provided,
   * which is generally going to be empty, as this allows us an easy way to build a fresh grid which we can
   * populate, to give us the next iteration of the grid.
   * @param animals
   * @returns {unknown[][]}
   */
  populate = (animals = undefined) => {
    return [...Array(this.width)].map(() =>
      [...Array(this.width)].map(() => new this.habitat(this.animal, this.animalProbability, animals)));
  };

  shuffle = () => {
    const grid = this.populate(undefined);
    const oldGrid = this.getGrid();
    // this would be more pure using a reducer, but this is easier to write out for now
    oldGrid.forEach((row, rowId) => {
      row.forEach((column, columnId) => {
        const animals = column.getAnimals();
        animals.forEach(animal => {
          const direction = Math.random();
          let newRow = rowId;
          let newColumn = columnId;
          if(direction <= 0.25) {
            newRow--;
          } else if(direction <= 0.5) {
            newRow++;
          } else if(direction <= 0.75) {
            newColumn--;
          } else {
            newColumn++;
          }
          if(newRow < this.width && newRow >= 0 && newColumn < this.width && newColumn >= 0) {
            grid[newRow][newColumn].addAnimal(animal);
          }
        });
      });
    });
    return new Forest(this.width, this.animal, this.habitat, this.animalCount, grid);
  }
}

export default Forest;
