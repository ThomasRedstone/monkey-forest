class Tree {
  constructor(animal, probability) {
    this.animal = animal;
    this.probability = probability;
    this.validate();
    this.animals = [];
    if(this.hasAnimal()) {
      this.animals.push(new this.animal(Math.random() > 0.5, Math.random()));
    }
  }

  validate = () => {
    if(typeof this.animal !== 'function') {
      throw Error('Animal provided is invalid');
    }

    if(this.probability <= 0) {
      throw Error('Probability must be greater than zero');
    }
  };

  getAnimals = () => this.animals;

  hasAnimal = () => this.probability > Math.random();
}

export default Tree;
