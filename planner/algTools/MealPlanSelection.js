const _ = require('lodash');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
//TODO: insert logger.debug, print content of selectionPool


class MealPlanSelection {

  constructor(population) {
    this.selectionType = process.env.SELECTION_TYPE;
    this.selectionPool = [];  //this is either mating pool or population with ranks

    //call preparation function
    if (this.selectionType === 'RouletteWheel') {
      this.generateMatingPool(population);
    }else if(this.selectionType === 'Tournament'){
      this.selectionPool = _.cloneDeep(population);
    }

    //insert rankRouletteWheel as an option here
  }



/* ----- TODO:  rankRouletteWheel NOT FINISHED!!!!! --------- */
   rankRouletteWheel(population){
    let fitnessSum = 0;
    let prevProbability = 0;
    this.selectionPool = _.cloneDeep(population);

     this.selectionPool.forEach(chromosome => {
      fitnessSum += chromosome.fitness;
    });

     this.selectionPool = _.sortBy(population, 'fitness').reverse();
     this.selectionPool.forEach(chromosome => {
      chromosome.prob = prevProbability + (chromosome.fitness/fitnessSum);
      prevProbability = chromosome.prob;
    });

  }

  /**
   * tournament selection, returns one selected chromosome
   * @param population
   * @returns {*}
   */
  Tournament() {

     let tournamentPop = [];
     const tournamentSize = parseInt(process.env.TOURNAMENT_SIZE);


     /* -- create tournament population -- */
     while( tournamentPop.length < tournamentSize){
       let randIndex = parseInt(Math.random() * this.selectionPool.length);
       if(randIndex < this.selectionPool.length){
       tournamentPop.push(this.selectionPool[randIndex]);
       }
     }

     /* -- select the fittest (lowest is best) -- */
     return _.minBy(tournamentPop, 'fitness');
  }

  /**
   * rouletteWheel selection, returns one selected chromosome
   * @returns {*}
   */
  rouletteWheel(){
     const index = parseInt(random(this.selectionPool.length));
     return this.selectionPool[index];
  }

  /**
   * helper function for rouletteWheel selection.
   * generates the array chromosome will be selected from
   * @param population
   */
  generateMatingPool(population){

    /*  --- create mating pool -- */
    for (let i = 0; i < population.length; i++) {
      let n = int(population[i].fitness * 100);
      for (let j = 0; j < n; j++) {  // Add each member n times according to its fitness score.
        this.selectionPool[i] = population[i];
      }
    }
  }

  random (low, high) {
    return Math.random() * (high - low) + low;
  }

}


module.exports = MealPlanSelection;