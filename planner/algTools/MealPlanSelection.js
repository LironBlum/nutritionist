const _ = require('lodash');
const env = process.env;
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
//TODO: insert logger.debug, print content of pool

class MealPlanSelection {
  constructor(population) {
    this.selectionType = env.SELECTION_TYPE;
    this.pool = [];  //selection pool

    //call preparation function
    if (this.selectionType === 'RouletteWheel') { //TODO: not complete
       this.pool = this.generateMatingPool(population);

    }else if(this.selectionType === 'Tournament'){
      this.pool = _.cloneDeep(population);

    }

    //TODO: (optional) insert rankRouletteWheel as an option here
  }

  /**
   * tournament selection, returns one selected chromosome
   * @param population
   * @returns {*}
   */
  Tournament() {
     let tournamentPop = [];
    // const tournamentSize = parseInt(env.TOURNAMENT_SIZE);
     const tournamentSize = env.TOURNAMENT_SIZE;

     while( tournamentPop.length < tournamentSize){ //create tournament population
       let randIndex = parseInt(Math.random() * this.pool.length);
       tournamentPop.push(this.pool[randIndex]);
     }

     return _.minBy(tournamentPop, 'fitness'); // select fittest (lowest = best)
  }

  /**
   * rouletteWheel selection, returns one selected chromosome
   * @returns {*}
   */
  rouletteWheel(){
     const index = parseInt(random(this.pool.length));
     return this.pool[index];
  }

  /**
   * helper function for rouletteWheel selection.
   * generates the array chromosome will be selected from
   * @param population
   */
  generateMatingPool(population){ //TODO clean
    let pool = [];
    for (let i = 0; i < population.length; i++) {
      let n = int(population[i].fitness * 100);
      for (let j = 0; j < n; j++) {  // Add each member n times according to its fitness score.
        pool[i] = population[i];
      }
    }
    return pool;
  }

  /* ----- TODO:  rankRouletteWheel NOT FINISHED!!!!! --------- */
  rankRouletteWheel(population){
    let fitnessSum = 0;
    let prevProbability = 0;
    this.pool = _.cloneDeep(population);

    this.pool.forEach(chromosome => {
      fitnessSum += chromosome.fitness;
    });

    this.pool = _.sortBy(population, 'fitness').reverse();
    this.pool.forEach(chromosome => {
      chromosome.prob = prevProbability + (chromosome.fitness/fitnessSum);
      prevProbability = chromosome.prob;
    });
  }
}


module.exports = MealPlanSelection;