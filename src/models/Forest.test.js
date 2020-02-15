import Forest from "./Forest";
import useInterval from '../helpers/useInterval';
jest.mock('../helpers/useInterval');

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.3;
global.Math = mockMath;
const defaultAnimal = function(sex, fertility) {
  this.sex = sex;
  this.fertility = fertility;
  this.copy = () => new defaultAnimal(this.sex, this.fertility);
  this.breed = (partner) => {
    if (partner.sex === this.sex) {
      throw Error('Same sex');
    }
    return new defaultAnimal(true, 0.95);
  }
};
const defaultHabitat = function(animal, probability, makeAnimals = true) {
  this.animal = animal;
  this.probability = probability;
  this.animals = makeAnimals ? [new defaultAnimal(false, 0.5)] : [];
  this.getAnimals = () => this.animals;
  this.addAnimal = (animal) => this.animals.push(animal);
};

const makeForest = (
  width = 2,
  animal = defaultAnimal,
  habitat = defaultHabitat,
  animalCount = 1,
  grid = undefined
) => new Forest(width, animal, habitat, animalCount, grid);

describe('Forest', function () {
  it ('sets validationResult to true when acceptable values are provided', () => {
    expect(makeForest().getValidationResult()).toEqual(true);
  });

  it ('throws an error when width is invalid', () => {
    expect(() => makeForest(0)).toThrow('Width must be a positive number');
  });

  it ('throws an error when animal is invalid', () => {
    expect(() => makeForest(undefined, false)).toThrow('The animal must be an object');
  });

  it ('throws an error when habitat is invalid', () => {
    expect(() => makeForest(undefined, undefined, false)).toThrow('The habitat must be an object');
  });

  it ('throws an error when animalCount is invalid', () => {
    expect(() => makeForest(undefined, undefined, undefined, 0)).toThrow('There must be one or more animals');
  });

  it ('generates the correct size grid', () => {
    const forest = makeForest(10);
    const grid = forest.getGrid();
    expect(grid.length).toEqual(10);
    expect(grid[0].length).toEqual(10);
  });

  it ('shuffles the grid correctly', () => {
    const grid = [
      [new defaultHabitat(defaultAnimal, 0.5, false), new defaultHabitat(defaultAnimal, 0.5)],
      [new defaultHabitat(defaultAnimal, 0.5), new defaultHabitat(defaultAnimal, 0.5)]
    ];
    grid[0][1].addAnimal(new defaultAnimal(true, 0.99));
    const forest = makeForest(
      2,
      undefined,
      undefined,
      undefined,
      grid
    );
    const newGrid = forest.shuffle().getGrid();
    expect(newGrid[0][0].animals.length).toEqual(0);
    expect(newGrid[0][1].animals.length).toEqual(1);
    expect(newGrid[1][0].animals.length).toEqual(0);
    expect(newGrid[1][1].animals.length).toEqual(2);
  });

  it ('fails to breed if the couple are of the same sex', () => {
    const grid = [
      [new defaultHabitat(defaultAnimal, 0.5, false), new defaultHabitat(defaultAnimal, 0.5)],
      [new defaultHabitat(defaultAnimal, 0.5), new defaultHabitat(defaultAnimal, 0.5)]
    ];
    grid[0][1].addAnimal(new defaultAnimal(false, 0.99));
    const forest = makeForest(
      2,
      undefined,
      undefined,
      undefined,
      grid
    );
    const newGrid = forest.shuffle().getGrid();
    expect(newGrid[0][0].animals.length).toEqual(0);
    expect(newGrid[0][1].animals.length).toEqual(0);
    expect(newGrid[1][0].animals.length).toEqual(0);
    expect(newGrid[1][1].animals.length).toEqual(2);
  });

  it('counts the monkeys in a grid', () => {
    const forest = makeForest(
      2
    );
    const grid = [
      [new defaultHabitat(defaultAnimal, 0.5, false), new defaultHabitat(defaultAnimal, 0.5)],
      [new defaultHabitat(defaultAnimal, 0.5), new defaultHabitat(defaultAnimal, 0.5)]
    ];
    grid[0][1].addAnimal(new defaultAnimal(true, 0.99));
    expect(forest.monkeyCounter(grid)).toEqual(4);
  });

  it('generates locations based on random numbers', () => {
    const forest = makeForest(
      2
    );
    mockMath.random = () => 0.15;
    expect(forest.getLocation(1, 1)).toMatchObject({ newRow: 0, newColumn: 1 });
    mockMath.random = () => 0.35;
    expect(forest.getLocation(1, 1)).toMatchObject({ newRow: 2, newColumn: 1 });
    mockMath.random = () => 0.55;
    expect(forest.getLocation(1, 1)).toMatchObject({ newRow: 1, newColumn: 0 });
    mockMath.random = () => 0.85;
    expect(forest.getLocation(1, 1)).toMatchObject({ newRow: 1, newColumn: 2 });
  });
});
