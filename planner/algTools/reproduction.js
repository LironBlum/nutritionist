const _= require("lodash");


/**
 * This is reproduction stage: selection + cross + mutation
 * The reproduction functions differ by the type of selection
 */



function reproductionRouletteWheel(population) {

  let newPopulation = [];
  let matingPool = [];


  /*  --- create mating pool -- */
  for (let i = 0; i < population.length; i++) {

   // Add each member n times according to its fitness score.
    let n = int(population[i].fitness * 100);
    for (let j = 0; j < n; j++) {
      matingPool[i] = population[i];
    }
  }

  /** -- selection + crossover  -- **/

  for (let i = 0; i < population.length; i++) {
    let a = parseInt(random(matingPool.length()));
    let b = parseInt(random(matingPool.length()));
    let parentA = matingPool[a];
    let parentB = matingPool[b];
    let child = crossover(parentA, parentB);
    newPopulation[i] = child;
  }

  /* -- mutate population -- */
  for (let i = 0; i < newPopulation.length(); i++) {
    newPopulation[i] = mutate(newPopulation[i]);
  }

  return newPopulation;
}


function reproductionRankRouletteWheel(population){
    let fitnessSum = 0;
    let prevProbability = 0;
    let pop = _.cloneDeep(population);

    pop.forEach(chromosome => {
        fitnessSum += chromosome.fitness;
    });

    pop = _.sortBy(pop, 'fitness').reverse();
    pop.forEach(chromosome => {
        chromosome.prob = prevProbability + (chromosome.fitness/fitnessSum);
        prevProbability = chromosome.prob;
    });

    //LAST SESSION STOPPED HERE. NOW GET A RANDOM NUMBER AND CHOOSE A CR BY IT (BY WIKIPEDIA)

}


function reproductionTournament(population) {

  let newPopulation = [];

  console.log(`in reproductionTournament`);
  /** -- selection + crossover  -- **/
  for (let i = 0; i < population.length; i++) {
    const parentA  = tournamentSelection(population);
    const parentB = tournamentSelection(population);
    newPopulation[i] = crossover(parentA, parentB);
  }

  /* -- mutate population -- */
  for (let i = 0; i < newPopulation.length(); i++) {
    newPopulation[i] = mutate(newPopulation[i]);
  }

  return newPopulation;
}

function tournamentSelection(population) {

  let tournamentPop = [];
  const tournamentSize = process.env.TOURNAMENT_SIZE;

  console.log("tournamentSelection");

  /* -- create tournament population -- */
  for(let i=0; i< tournamentSize ; i++){
    tournamentPop[i] = (Math.random() * population.length);
  }

  /* -- select the fittest (lowest is best) -- */
 return _.minBy(tournamentPop, 'fitness');

}

function random (low, high) {
    return Math.random() * (high - low) + low;
}


/**
 * returns a NEW solution constructed of the old solution with a slight change (probably random change)
 * @param chromosome
 */
function mutate(chromosome) {

  console.log(`in MUTATE (line 112), chromosome: ${JSON.stringify(chromosome)}`);
  return chromosome;
}

/**
 * parent1, parent2 - existing solutions to act as parents for new one
 */
function crossover(parentA, parentB) {
  console.log(`in crossover (line 112), parentA: ${JSON.stringify(parentA)}, parentB: ${JSON.stringify(parentB)}`);
  const uniformRate = process.env.UNIFORM_RATE;
  let child = {
    genes:[],
    fitness:null
  };

  // Loop through genes
  for (let i = 0; i < parentA.length; i++) {
    // Crossover
    child.genes[i] = (i < parentA.length * uniformRate)? parentA.genes[i] : child.genes[i];
  }

  console.log(`in crossover (line 132), child: ${JSON.stringify(child)}`);
  return child;


}




module.exports = {
  reproductionRouletteWheel,
  reproductionRankRouletteWheel,
  reproductionTournament
};


process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });