const expect = require("chai").expect;
const geneticAlgorithm = require("../../../algTools/geneticAlgorithm");
const request = require("../../testData/request.json");
const tstHelp = require("../../testHelpFunctions");
const fitFunc = require("../../../algTools/mealPlanFitnessGrader").planFitness
const fitParams = require("../../testData/fitnessParams.json")
const chromosomeSize = 6;
const popSize = 6;

describe("genetic Algorithm", function() {
    describe("test ~ createChromosome", function() {
        it("Create a new chromosome (meal plan) with chromosomeSize of genes (products)", function() {
            const chromosome = geneticAlgorithm.createChromosome(request.body.products,chromosomeSize);
            expect(chromosome).to.have.property("genes");
            expect(chromosome).to.have.property("fitness");
            expect(chromosome.genes.length).to.equal(chromosomeSize);
            expect(tstHelp.isUniqInArr(chromosome.genes)).to.be.true;
        });
    });

    describe("test ~ generateInitPopulation", function() {
        it("Create a new Population (meal plan options) with popSize of chromosomes (meal plans) ", function() {
            const pop = geneticAlgorithm.generateInitPopulation(request.body.products,chromosomeSize, popSize);
            expect(pop.length).to.equal(popSize);
        });
    });

    describe("test ~ populationFitness", function() {
        it("grades each chromosome (meal plan) by given constraints", function() {

            const population = fitParams.population
            const initialPopSize = population.length;
            const constraints = fitParams.constraints
            geneticAlgorithm.populationFitness(population, constraints, fitFunc)
            
            expect(population.length).to.equal(initialPopSize);
            population.forEach(chromosome => {
                expect(chromosome.fitness!=null);
                expect(chromosome.fitness).to.be.above(0);
               
            });
        });
    });
});





