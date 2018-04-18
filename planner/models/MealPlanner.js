'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const genAlg = require('../algorithms/geneticAlgorithm');
let env = process.env;

const genAlgOpt = {
    chromosomeSize: parseInt(env.CHROMOSOME_SIZE),
    popSize: parseInt(env.POPULATION_SIZE)
};

class MealPlanner {
    constructor(input) {
      this.constraints = input.constraints;
      this.products = input.products;
    }

    execute() {
       const firstPop = genAlg.generateInitPopulation(this.products, genAlgOpt.chromosomeSize, genAlgOpt.popSize);
       console.log(firstPop);
    }



}

process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
});

module.exports = MealPlanner;