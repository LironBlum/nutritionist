//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions

const _= require("lodash");
const reproduction = require("./reproduction");
let MealPlanChromosome = require("./MealPlanChromosome");



/*genes are a map */
function generateInitPopulation(genes, chromosomeSize, popSize){
    let population =[];

    while(population.length < popSize){
        population.push(new MealPlanChromosome(genes,chromosomeSize));
    }
    return population;
}

/**
 * set fitness score for each chromosome for population
 * @param population arr of optional meal plans
 * @param constraints
 * @param fitness function to calc fitness
 */

function populationFitness(population, constraints, fitness) {
    population.forEach(function (chromosome) {
        chromosome.fitness = fitness(chromosome.genes, constraints);
    });
}


function evolvePopulation(population, allGenes) {
    let newPopulation;
    let eliteChromosomes;
    let childChromosomes;

    if(process.env.ELITISM === 'true'){
      eliteChromosomes = reproduction.elitism(population);
    }

    childChromosomes = reproduction.populationReproduction(population,allGenes);

    newPopulation  = eliteChromosomes.concat(childChromosomes);
    return newPopulation;
}







process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
});


function printPop(pop) {
  console.log(`#####################################################`);

  for(let i=0; i<pop.length; i++){
    console.log(`{ ${pop[i].genes[0].name} } , { ${pop[i].genes[1].name} } , { ${pop[i].genes[2].name} } `);
    console.log(`{ ${pop[i].genes[3].name} } , { ${pop[i].genes[4].name} } , { ${pop[i].genes[5].name} } , fitness: ${pop[i].fitness}\n`);
  }

  console.log(`#####################################################`);


}


module.exports = {
  generateInitPopulation,
  populationFitness,
  evolvePopulation
};