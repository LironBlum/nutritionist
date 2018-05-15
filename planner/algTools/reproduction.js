const _= require("lodash");
const MealPlanSelection = require('./MealPlanSelection');
const MealPlanChromosome = require('./MealPlanChromosome');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes



function elitism(population) {
  let eliteChromosomes = [];
  const elitismSize = parseInt(process.env.ELITISM_SIZE);

  population =  _.sortBy(population, 'fitness');

  while (eliteChromosomes.length < elitismSize) {
    let bestChromosome = population[0];
    eliteChromosomes.push(bestChromosome);
    population.splice(0, 1); //remove best solutions from orig generation
  }

  return eliteChromosomes;
}


function populationReproduction(population , allGenes){
  const selectionOperator = new  MealPlanSelection(population);

  const mutationRate = parseInt(process.env.MUTATION_RATE);
  const newPopSize = parseInt(process.env.POPULATION_SIZE) - parseInt(process.env.ELITISM_SIZE);
  let newPopulation = [];
  let i=0;

  while(i<newPopSize){
    //selection
    let parentA = selectionOperator[selectionOperator.selectionType]();
    let parentB = selectionOperator[selectionOperator.selectionType]();

    //crossover
    let child = crossover(parentA,parentB);
    if(child.validateChromosome(allGenes)) { //if crossover didn't create a valid child repeat steps
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
  let child = new MealPlanChromosome([],parentA.chromosomeSize, false);
  let i = 0;
  let genePool;
  let randGene;

  // Loop through genes
  while (i < parentA.chromosomeSize) {
    genePool = (i < parentA.genes.size * uniformRate)? parentA.genes :parentB.genes;
    randGene = MealPlanChromosome.getRandomKey(genePool);

    if(!child.genes.has(randGene)){ //set new
       child.genes.set(randGene, _.cloneDeep(genePool.get(randGene)));
    }else { // add amount
      child.genes.get(randGene).amount.numOfUnits =  child.genes.get(randGene).amount.numOfUnits + genePool.get(randGene).amount.numOfUnits ;
    }
    i++;
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
  elitism,
 populationReproduction
};


process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });