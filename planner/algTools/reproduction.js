const _= require("lodash");
const MealPlanSelection = require('./MealPlanSelection');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes


//TODO: refactor elitism to return more then one best chromosome
function elitism(population) {
  let newPopulation = [];
  let bestChromosome = _.minBy(population, 'fitness');
  newPopulation.push(_.cloneDeep( bestChromosome ));

  let index = population.indexOf(temp);
  if (index > -1) {
    population.splice(index, 1); //remove best solutions from orig generation
  }
  return newPopulation;
}


function populationReproduction(population){
  const selectionOperator = new  MealPlanSelection(population);
  const selectionType = process.env.SELECTION_TYPE;
  const mutationRate = process.env.MUTATION_RATE;
  let newPopulation = [];

  for(let i=0; i<population.length; i++){
    //selection
    let parentA = selectionOperator[selectionType];
    let parentB = selectionOperator[selectionType];
    //crossover
    newPopulation.push(crossover(parentA,parentB));
  }

  //mutate population
  newPopulation.forEach((chromosome) => {
    if (Math.random() <= mutationRate) {
      mutate(chromosome)
    }
  });
  return newPopulation;
}


/**
 * adds a random new product (gene) into the mealPlan (chromosome)
 * @param chromosome
 */
function mutate(chromosome) {

  return chromosome;
}

/**
 * parent1, parent2 - existing solutions to act as parents for new one
 */
function crossover(parentA, parentB) {

  //TODO: to make sure products are not inserted to a meal plan more
  // times than they exist in "product bag".
  // think about the "products bag", maybe as singletone?


  let msg = `parentA: ${JSON.stringify(parentA)}, parentB: ${JSON.stringify(parentB)}`;
  let locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.debug(msg, {'meta': locationMeta});

  const uniformRate = process.env.UNIFORM_RATE;
  let child = {
    genes:[],
    fitness:null
  };

  // Loop through genes
  for (let i = 0; i < parentA.length; i++) {
    // Crossover
    child.genes[i] = (i < parentA.length * uniformRate)? parentA.genes[i] : child.genes[i];
  }

  msg = `child: ${JSON.stringify(child)}`;
  locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.debug(msg, {'meta': locationMeta});

  return child;

}




module.exports = {
  elitism,
 populationReproduction
};


process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });