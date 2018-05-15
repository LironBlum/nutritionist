'use strict';
const _= require("lodash");
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const genAlg = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanFitness');
let MealPlanChromosome = require("../algTools/MealPlanChromosome");

let env = process.env;

const chromosomeSize = parseInt(env.CHROMOSOME_SIZE);
const popSize = parseInt(env.POPULATION_SIZE);
let constraints, products;

function getMealPlans(req,res) {

    const msg = `incoming getMealPlans request`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg,{'meta': locationMeta, 'request': req.body}); //TODO insert uuid : req.body.uuid

    constraints = req.body.body.constraints; //diatery constraints
    products = req.body.body.products;

    const mealPlans = executeAlgorithm(constraints, products);
    res.status(200).json({ getMealPlans: 'getMealPlans'});
}

/*-----------------------------------------------------------------------------------------------*/

function executeAlgorithm(constraints, products) {
  let generationCounter = 1;
  let generations = process.env.NUMBER_OF_GENERATIONS;
  let mappedProducts = new Map(products.map((i) => [i.name, i.info]));

  let pop = genAlg.generateInitPopulation(mappedProducts, chromosomeSize, popSize);
  genAlg.populationFitness(pop, constraints, planGrader.planFitness);

  console.log("first population!!!!!!!!");
  printPopulation(pop);


    //algorithm loop
    while(generationCounter <= generations){

      pop = genAlg.evolvePopulation(pop, mappedProducts);
      genAlg.populationFitness(pop, constraints, planGrader.planFitness);
      generationCounter++;
    }

    console.log("last population!!!!!!!!!!");
    pop =  _.sortBy(pop, 'fitness');
    printPopulation(pop);
    return pop;
}

function printPopulation(pop) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

  for(let i=0; i<pop.length; i++){
    console.log(`----------------------------${i}------------------------------------`);

   console.log(`{ ${pop[i].genes.forEach(MealPlanChromosome.logChromosomeGenes)} }  `);
   console.log("fitness", pop[i].fitness);
   console.log('------------------------------------------------------------------')
  }

  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

}

function logProducts(value, key, map) {
  console.log(`products[${key}] = ${JSON.stringify(value)}`);
}

module.exports = {
      getMealPlans

};





/*


  process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });*/