import Monkey from "./Monkey";

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.3;
global.Math = mockMath;

const primary = new Monkey(true, 0.7);
const partner = new Monkey(false, 0.7);
const poorPartner = new Monkey(false, 0.01);
const incompatible = new Monkey(true, 0.8);

describe('Monkey', function () {
  it('Throws an error when two monkeys of the same sex attempt to breed', () => {
    expect(() => primary.breed(incompatible)).toThrow(/as is this monkey, cannot breed/);
  });

  it('Throws an error when two monkeys attempt to breed but fail', () => {
    mockMath.random = () => 0.001;
    expect(() => primary.breed(poorPartner)).toThrow(/Breeding outcome is less than /);
  });

  it('returns a new monkey when two monkeys attempt to breed and succeed', () => {
    mockMath.random = () => 0.95;
    expect(primary.breed(partner))
      .toMatchObject(expect.objectContaining({ sex: true, fertility: 0.95, getSex: expect.anything() }));
  });

  it('returns the monkeys sex correctly', () => {
    expect(primary.getSex()).toEqual(true);
  })
});
