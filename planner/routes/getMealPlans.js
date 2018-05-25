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
  let generations = parseInt(process.env.NUMBER_OF_GENERATIONS);

  let population = genAlg.generateInitPopulation(products, chromosomeSize, popSize);
  genAlg.populationFitness(population, constraints, planGrader.planFitness);

 // console.log("first population!!!!!!!!");
  //printPopulation(population);


    //algorithm loop
    while(generationCounter <= generations){

      population = genAlg.evolvePopulation(population, products);
      genAlg.populationFitness(population, constraints, planGrader.planFitness);
      generationCounter++;

    }

  //  console.log("last population!!!!!!!!!!");

  //  printPopulation(population);
    return population;
}

function printPopulation(pop) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

  for(let i=0; i<pop.length; i++){
    console.log(`----------------------------${i}------------------------------------`);

   console.log(` ${pop[i].logChromosomeGenes()}  \n`);
   console.log("fitness", pop[i].fitness);
   console.log('------------------------------------------------------------------')
  }

  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

}



module.exports = {
      getMealPlans,
  printPopulation

};





/*


  process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });*/