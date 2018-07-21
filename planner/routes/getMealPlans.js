'use strict';
const _= require('lodash');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const { generateInitPopulation, populationFitness, evolvePopulation } = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanFitness');

const env = process.env;

const chromosomeSize = parseInt(env.CHROMOSOME_SIZE);
const popSize = parseInt(env.POPULATION_SIZE);
let constraints, products;

function getMealPlans(req,res) {

  const msg = `incoming getMealPlans request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg,{ 'meta': locationMeta, 'request': req.body }); //TODO insert uuid : req.body.uuid

  constraints = req.body.body.constraints; //diatery constraints
  products = req.body.body.products;

  const mealPlans = executeAlgorithm(constraints, products);

  res.status(200).json({ mealPlans });
}

/*-----------------------------------------------------------------------------------------------*/

function executeAlgorithm(constraints, products) {

  let population = generateInitPopulation(products, chromosomeSize, popSize);

  populationFitness(population, constraints, planGrader.planFitness); //TODO move fitness function call

  let generationCntr = 1;
  const generations = parseInt(env.NUMBER_OF_GENERATIONS);
  while(generationCntr <= generations){ //algorithm loop

    population = evolvePopulation(population, products);
    populationFitness(population, constraints, planGrader.planFitness);
    ++generationCntr;
  }

  printPopulation(population);
  return population;
}

function printPopulation(pop) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

  for(let i=0; i<pop.length; i++){
    console.log(`----------------------------${i}------------------------------------`);

    //  console.log(` ${pop[i].logChromosomeGenes()}  \n`);
    console.log('fitness', pop[i].fitness);
    console.log('------------------------------------------------------------------');
  }

  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);
}

module.exports = {
  getMealPlans,
  printPopulation
};
