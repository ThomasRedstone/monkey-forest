import MonkeyIcon from '../icons/monkey.svg';

/**
 * The Monkeys are simple creatures, they have two sexes, true and false, when they attempt to breed
 * the monkeys must be of opposite sexes. If they are, then each of their fertility scores, and
 * a bit of randomness will be used to determine the result, returning the new baby if breeding succeeds.
 */
class Monkey {
  constructor(sex, fertility) {
    this.sex = !!sex;
    this.fertility = fertility;
  }

  copy = () => new Monkey(this.sex, this.fertility);

  getSex = () => this.sex;

  getGraphic = () => MonkeyIcon;

  breed(potentialMate) {
    const breedingThreshold = 0.3;
    if(this.sex === potentialMate.sex) {
      throw Error(`Potential mate is of ${potentialMate.sex}, as is this monkey, cannot breed`);
    }
    const multiplier = Math.random() + 1.5;
    const combinedFertility = this.fertility * potentialMate.fertility;
    const breedingOutcome = (combinedFertility * multiplier);
    if(breedingOutcome < breedingThreshold) {
      throw Error(`Breeding outcome is less than ${breedingThreshold}, combined fertility was ${combinedFertility}, ` +
        `multiplier was ${multiplier}, and breeding outcome was ${breedingOutcome}`);
    }
    return new Monkey(Math.random() > 0.5, Math.random());
  }
}

export default Monkey;
