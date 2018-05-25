//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions

const _= require("lodash");
const populationReproduction  = require("./reproduction").populationReproduction;
const elitism = require("./mealPlanElitism").elitism;
let MealPlanChromosome = require("./MealPlanChromosome");



/*genes are a map */
function generateInitPopulation(genes, chromosomeSize, popSize){
    let population =[];

    while(population.length < popSize){
        population.push(new MealPlanChromosome(genes, chromosomeSize));
    }
    return population;
}

/**
 * set fitness score for each chromosome for population
 * @param population arr of optional meal plans
 * @param constraints
 * @param fitness function to calc fitness
 */

function populationFitness(population, constraints, fitness) {
    population.forEach(function (chromosome) {
        chromosome.fitness = fitness(chromosome.genes, constraints);
    });
}


function evolvePopulation(population) {
    let eliteChromosomes;
    let childChromosomes;

    if(process.env.IS_ELITISM === 'true'){
      eliteChromosomes = elitism(population);
    }

    const reproductionSize = parseInt(process.env.POPULATION_SIZE) - eliteChromosomes.length;

    childChromosomes = populationReproduction(reproductionSize, population);

    //elite chromosomes + reproduced chromosomes are the NEW POPULATION
    return eliteChromosomes.concat(childChromosomes);
}







process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
});



module.exports = {
  generateInitPopulation,
  populationFitness,
  evolvePopulation
};