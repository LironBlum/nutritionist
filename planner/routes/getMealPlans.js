'use strict';
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const genAlg = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanFitness');

let env = process.env;

const chromosomeSize = parseInt(env.CHROMOSOME_SIZE);
const popSize = parseInt(env.POPULATION_SIZE);
const selectionSize = parseInt(env.SELECTION_SIZE);
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


  let pop = genAlg.generateInitPopulation(products, chromosomeSize, popSize);

  console.log(`FIRST POPULATION:  `);
  printPopulation(pop);

    //loop
    while(generationCounter <= generations){
      genAlg.populationFitness(pop, constraints, planGrader.planFitness);
      let newPop = genAlg.evolvePopulation(pop);

      console.log('NEW POPULATION');
      printPopulation(newPop);
      pop = newPop;

    }

    return pop;
}

function printPopulation(pop) {
  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);

  for(let i=0; i<pop.length; i++){
    console.log(`{ ${pop[i].genes[0].name} } , { ${pop[i].genes[1].name} } , { ${pop[i].genes[2].name} } `);
    console.log(`{ ${pop[i].genes[3].name} } , { ${pop[i].genes[4].name} } , { ${pop[i].genes[5].name} } \n`);
  }

  console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@`);



}

module.exports = {
      getMealPlans

};








  process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });