const expect = require('chai').expect;
const selector = require('../../../algTools/reproduction');

describe('mealPlanSelection ', () => {
  describe('test ~ rouletteWheel', () => {

    it('return array of selected chromosomes (meal plans)', () => {
      selector.rouletteWheel();

      expect((bestScore < tooMuchScoreWorst) &&  (bestScore < malnutritionWorst)).to.be.true;
      expect((tooMuchScoreWorst < malnutritionWorst)).to.be.true;
    });
  });
});





