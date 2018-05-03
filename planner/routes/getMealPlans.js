'use strict';
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const genAlg = require('../algTools/geneticAlgorithm');
const planGrader = require('../algTools/mealPlanGrader');
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
    const firstPop = genAlg.generateInitPopulation(products, chromosomeSize, popSize);
    genAlg.populationFitness(firstPop, constraints, planGrader.getPlanGrade);
    //now all plans has fitness score

    //activate algorithm
}




module.exports = {
      getMealPlans
  };








