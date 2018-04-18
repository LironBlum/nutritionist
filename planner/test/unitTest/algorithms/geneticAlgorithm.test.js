const expect = require("chai").expect;
const geneticAlgorithm = require("../../../algorithms/geneticAlgorithm");
const request = require("../../testData/request.json");
const tstHelp = require("../../testHelpFunctions");
const chromosomeSize = 6;

describe("genetic Algorithm", function() {
    describe("test ~ createChromosome", function() {
        it("Create a new chromosome (meal plan) with chromosomeSize of genes (products)", function() {
            const chromosome = geneticAlgorithm.createChromosome(request.body.products,chromosomeSize);
            expect(chromosome.length).to.equal(chromosomeSize);
            expect(tstHelp.isUniqInArr(chromosome)).to.be.true;
        });

    });


});





