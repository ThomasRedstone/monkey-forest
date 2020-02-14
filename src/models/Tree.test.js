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

  it('populates the tree with an animal as hasAnimal returns true', () => {
    expect(new Tree(animal, 1).getAnimals()[0])
      .toMatchObject(expect.objectContaining({ sex: false, fertility: 0.3 }));
  });

  it('does not populate the tree with an animal as hasAnimal returns false', () => {
    expect(new Tree(animal, 0.2).getAnimals()).toEqual([]);
  });
  //
  // it('Throws an error when two monkeys attempt to breed but fail', () => {
  //   expect(() => primary.breed(partner)).toThrow(/Breeding outcome is less than 1/);
  // });
  //
  // it('Returns a new monkey when two monkeys attempt to breed and succeed', () => {
  //   mockMath.random = () => 0.95;
  //   expect(primary.breed(partner))
  //     .toMatchObject(expect.objectContaining({ sex: true, fertility: 0.95, getSex: expect.anything() }));
  // });
});
