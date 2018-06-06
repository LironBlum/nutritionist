const _= require('lodash');
const MealPlanSelection = require('./MealPlanSelection');
const MealPlanChromosome = require('./MealPlanChromosome');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const env = process.env;
function populationReproduction(newPopSize, population, genesPool){

  const selectionObj = new MealPlanSelection(population); //this is the obj of selection
  const selectionType = selectionObj.selectionType;
  const mutationRate = parseFloat(env.MUTATION_RATE);

  const newPopulation = [];

  while(newPopulation.length < newPopSize){
    //selection
    const mom = selectionObj[selectionType]();
    let dad = selectionObj[selectionType](); 
    while(_.isEqual(mom, dad)){    //  eliminate if identical parents
      dad = selectionObj[selectionType](); 
    }
    //crossover
    const child = crossover(mom,dad);
    newPopulation.push(child);
   
  }

  //mutate population
   newPopulation.forEach((chromosome) => {
     if ( Math.random() <= mutationRate) {
      mutate(chromosome, genesPool);
     }
   });
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

    if (child.isGeneUnique(genesPool[randGene])) {
      child.genes.push(_.cloneDeep(genesPool[randGene]));
    }
  }
  return child;
}

/**
 * adds a random new product (gene) into the mealPlan (chromosome)
 * @param chromosome
 */
function mutate(chromosome, genesPool) {

  if(chromosome.chromosomeSize === genesPool.length ){
    return chromosome; 
  }

  const sizeBeforeMutation = chromosome.chromosomeSize;

  while(sizeBeforeMutation === chromosome.chromosomeSize){
    let randGene =  Math.floor(Math.random() * genesPool.length);
    if (chromosome.isGeneUnique(genesPool[randGene])) {
      chromosome.genes.push(_.cloneDeep(genesPool[randGene]));
      ++chromosome.chromosomeSize ;
    }
  }
  return chromosome;
}


function printChromosome(who, genes) {

  console.log(`***** ${who} ***** `);
  console.log(`{ ${genes.forEach(MealPlanChromosome.logChromosomeGenes)} }  `);

}

module.exports = {
  populationReproduction
};

process.on('unhandledRejection', error => {
  // Won’t execute
  console.log('unhandledRejection', error);
});