const expect = require("chai").expect;
const selector = require("../../../algTools/reproduction");

describe("mealPlanSelection ", function() {
    describe("test ~ rouletteWheel", function() {

        it("return array of selected chromosomes (meal plans)", function() {
            selector.rouletteWheel()

          expect((bestScore < tooMuchScoreWorst) &&  (bestScore < malnutritionWorst)).to.be.true;
          expect((tooMuchScoreWorst < malnutritionWorst)).to.be.true;
         });
    });
});





