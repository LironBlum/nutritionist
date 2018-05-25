const _= require("lodash");

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


module.exports = {
  elitism
};