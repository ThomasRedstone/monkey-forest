/**
 * This forest will come into being with a square grid, with a width as specified, the type of animal
 * is passed in, and as the grid is populated, the an appropriate probability is used which would
 * allow the supplied animalCount to be created, on average. This provides a slightly more natural forest,
 * but there is always a risk that there are no animals in it.
 */
class Forest {
  constructor(width, animal, habitat, animalCount) {
    this.width = width;
    this.animal = animal;
    this.habitat = habitat;
    this.animalCount = animalCount;
    this.validationResult = this.validate();
    this.grid = this.populate();
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

  populate = () => {
    const animalProbability = this.animalCount / (this.width * this.width);
    return [...Array(this.width)].map(() =>
      [...Array(this.width)].map(() => new this.habitat(this.animal, animalProbability)));
  }
}

export default Forest;
