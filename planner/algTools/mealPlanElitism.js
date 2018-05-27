const _= require("lodash");
const env = process.env

function elitism(population) {

  let eliteChromosomes = [];
  const elitismSize = parseInt(env.ELITISM_SIZE);
  let best;

  population = _.sortBy(population, 'fitness');

  while (eliteChromosomes.length < elitismSize) {
    best = population[0];
    eliteChromosomes.push(best);
    population.splice(0, 1); //remove best solutions from orig population
  }

  return eliteChromosomes;
}


module.exports = {
  elitism
};