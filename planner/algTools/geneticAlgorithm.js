//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions

const _= require("lodash");
let env = process.env;
const populationReproduction = require("./reproduction").populationReproduction;
const elitism = require("./mealPlanElitism").elitism;
const MealPlanChromosome = require("./MealPlanChromosome");

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
    let eliteChromosomes = [];

    if(env.IS_ELITISM === 'true'){
       eliteChromosomes = elitism(population);
    }
    const numChrmsToGenerate = parseInt(env.POPULATION_SIZE) - eliteChromosomes.length;
    const generatedChromosomes = populationReproduction(numChrmsToGenerate, population);

    //new population = elite chromosomes + reproduced chromosomes

    return eliteChromosomes.concat(generatedChromosomes);
}


module.exports = {
  generateInitPopulation,
  populationFitness,
  evolvePopulation
};