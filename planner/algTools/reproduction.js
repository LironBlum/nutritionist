const _= require('lodash');
const MealPlanSelection = require('./MealPlanSelection');
const MealPlanChromosome = require('./MealPlanChromosome');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const env = process.env;
function populationReproduction(newPopSize, population){

  const selectionObj = new MealPlanSelection(population); //this is the obj of selection
  const selectionType = selectionObj.selectionType;
  const mutationRate = parseInt(env.MUTATION_RATE);

  const newPopulation = [];

  while(newPopulation.length < newPopSize){
    //selection

    const mom = selectionObj[selectionType]();
    const dad = selectionObj[selectionType](); //TODO: consider eliminate if identical parents

    //crossover
    const child = crossover(mom,dad);
    if(child.validateChromosome()) { //if crossover didn't create a valid child repeat steps
      newPopulation.push(child);
    }
  }

  //mutate population
  /* newPopulation.forEach((chromosome) => {
     if (Math.random() <= mutationRate) {
       mutate(chromosome)

     }
   });*/

  return newPopulation;
}




/**
 * parent1, parent2 - existing solutions to act as parents for new one
 */
function crossover(mom, dad) {

  const uniformRate = parseInt(env.UNIFORM_RATE);
  const childChromosomeSize = (mom.genes.length * uniformRate) + (dad.genes.length * (1 - uniformRate));

  const child = new MealPlanChromosome([], childChromosomeSize);

  let genesPool;

  while (child.genes.length < child.chromosomeSize) {

    genesPool = (child.genes.length < mom.genes.length * uniformRate)? mom.genes : dad.genes;

    const randGene =  Math.floor(Math.random() * genesPool.length);

    if (child.isValidGene(genesPool[randGene])) {
      child.genes.push(_.cloneDeep(genesPool[randGene]));
    }

  }

  return child;
}



/**
 * adds a random new product (gene) into the mealPlan (chromosome)
 * @param chromosome
 */
function mutate(chromosome) {

  //make sure mutation creates a valid chrosome.
  //only if it does, copy into original chromosome and done
  return chromosome;
}


function printChromosome(who, genes) {

  console.log(`***** ${who} ***** `);
  console.log(`{ ${genes.forEach(MealPlanChromosome.logChromosomeGenes)} }  `);

}

module.exports = {
  populationReproduction
};

