import TreeIcon from '../icons/tree-palm.svg';

/**
 * A tree is where animals can live, we can either populate them based on the probability that any given
 * tree will have an animal in it, or we can be given our list of animals
 */
class Tree {
  constructor(animal, probability, animals = undefined) {
    this.animal = animal;
    this.probability = probability;
    this.validate();
    this.animals = animals || [];
    if(!animals && this.hasAnimal()) {
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

  addAnimal = animal => this.animals.push(animal);

  getGraphic = () => TreeIcon;
}

export default Tree;
