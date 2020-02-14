import Forest from "./Forest";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.3;
global.Math = mockMath;

const makeForest = (
  width = 2,
  animal = function(sex, fertility) { this.sex = sex; this.fertility = fertility; },
  habitat = function(animal, probability) { this.animal = animal; this.probability = probability; },
  animalCount = 1
) => new Forest(width, animal, habitat, animalCount);

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
  })

});
