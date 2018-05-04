'use strict';
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const genAlg = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanFitnessGrader');
const plansSelection = require('../algTools/mealPlanSelection');
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
    const firstPop = genAlg.generateInitPopulation(products, chromosomeSize, popSize);
    
    genAlg.populationFitness(firstPop, constraints, planGrader.planFitness);
    genAlg.selection(firstPop, selectionSize, plansSelection.rouletteWheel)
}

module.exports = {
      getMealPlans
};








  process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });