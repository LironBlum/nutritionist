const _= require("lodash");
const MealPlanSelection = require('./MealPlanSelection');
const MealPlanChromosome = require('./MealPlanChromosome');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes



function populationReproduction(newPopSize, population){


  const selectionObj = new  MealPlanSelection(population); //this is the obj of selection
  const selectionType = selectionObj.selectionType;
  const mutationRate = parseInt(process.env.MUTATION_RATE);
  let newPopulation = [];
  let i=0;

  //TODO get rid of i
  while(i<newPopSize){
    //selection
    let mom = selectionObj[selectionType]();
    let dad = selectionObj[selectionType]();

    //crossover
    let child = crossover(mom,dad);
    if(child.validateChromosome()) { //if crossover didn't create a valid child repeat steps
      newPopulation.push(child);
      i++;
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
function crossover(parentA, parentB) {

  const uniformRate = process.env.UNIFORM_RATE;
  const childChromosomeSize = (parentA.genes.length * uniformRate) + (parentB.genes.length * uniformRate);

  let child = new MealPlanChromosome([], childChromosomeSize);

  let genesPool;
  console.log(' -----------------------------------------------------------------');

  console.log(' ----------- parentA -----------------');
  parentA.logChromosomeGenes();

  console.log(' ----------- parentB -----------------');
  parentB.logChromosomeGenes();


  // Loop through genes
  while (child.genes.length < child.chromosomeSize) {
    genesPool = (child.genes.length < parentA.genes.length * uniformRate)? parentA.genes : parentB.genes;

    let i =  Math.floor(Math.random() * genesPool.length);

    if ((_.findIndex(child.genes, ['id', genesPool[i].id])) === -1) {
      child.genes.push(_.cloneDeep(genesPool[i]));
    }

  }

  console.log(' ----------- child -----------------');
  child.logChromosomeGenes();

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


process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });