const expect = require("chai").expect;
const grader = require("../../../algTools/mealPlanFitness");
const graderParams = require("../../testData/graderParams.json")


describe("mealPlanFitnessGrader ", function() {
    describe("test ~ planFitness", function() {

        it("return grade chromosome (meal plan) ", function() {
          const bestScore = grader.planFitness(graderParams.bestScore.plan, graderParams.bestScore.goals);
          const tooMuchScoreWorst = grader.planFitness(graderParams.tooMuchScoreWorst.plan, graderParams.tooMuchScoreWorst.goals);
          const malnutritionWorst = grader.planFitness(graderParams.malnutritionWorst.plan, graderParams.malnutritionWorst.goals);
          expect((bestScore < tooMuchScoreWorst) &&  (bestScore < malnutritionWorst)).to.be.true;
          expect((tooMuchScoreWorst < malnutritionWorst)).to.be.true;
         });
    });
});





