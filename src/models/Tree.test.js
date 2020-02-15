import Tree from "./Tree";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.3;
global.Math = mockMath;

const animal = function(sex, fertility) { this.sex = sex; this.fertility = fertility; };

describe('Tree', function () {
  it('throws an an error when an invalid animal is provided', () => {
    expect(() => new Tree(0, 0.5)).toThrow('Animal provided is invalid');
  });

  it('throws an an error when an invalid probability is provided', () => {
    expect(() => new Tree(animal, 0)).toThrow('Probability must be greater than zero');
  });

  it('populates the tree with the supplied animals', () => {
    expect(new Tree(
      animal,
      1,
      [
        new animal(true, 0.95),
        new animal(true, 0.95),
        new animal(true, 0.95)
      ]
    ).getAnimals().length).toEqual(3);
  });

  it('populates the tree with an animal as hasAnimal returns true', () => {
    expect(new Tree(animal, 1).getAnimals()[0])
      .toMatchObject(expect.objectContaining({ sex: false, fertility: 0.3 }));
  });

  it('does not populate the tree with an animal as hasAnimal returns false', () => {
    expect(new Tree(animal, 0.2).getAnimals()).toEqual([]);
  });

  it('trigger useTimeout', () => {

    expect(new Tree(animal, 0.2).getAnimals()).toEqual([]);
  });
});
