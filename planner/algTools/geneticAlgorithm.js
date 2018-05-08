//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions

const _= require("lodash");
const reproduction = require("./reproduction");

/**
 * returns a chromosome = meals plan
 * products are randomly chosen
 */

function createChromosome(allGenes, chromosomeSize){
    let chromosome = {
        genes:[],
        fitness:null
    };
    let randGene;

    while(chromosome.genes.length < chromosomeSize)
    {
        randGene = allGenes[Math.floor(Math.random()*allGenes.length)]; //get random gene
        if(!chromosome.genes.includes(randGene)){
            chromosome.genes.push(randGene);
        }
    }
    return chromosome;
}

function generateInitPopulation(genes, chromosomeSize, popSize){
    let population =[];

    while(population.length < popSize){
        population.push(createChromosome(genes,chromosomeSize));
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


function evolvePopulation(population) {
    let newPopulation = [];

    console.log(`line 56, population: `);
    printPop(population);

    if(process.env.ELITISM === 'true'){
      console.log("here")

      let temp = _.minBy(population, 'fitness');
        newPopulation[0] = _.cloneDeep( temp );
      console.log(`newPopulation[0]: ${JSON.stringify(newPopulation[0])}`);
      let index = population.indexOf(temp);
      if (index > -1) {
        population.splice(index, 1); //remove best solutions from orig generation
      }

      printPop(population)
    }

    const reproductionFunction = `reproduction${process.env.SELECTION_TYPE}`;
   newPopulation = reproduction["reproductionTournament"](population);
  //newPopulation = reproduction.reproductionTournament(population);

    console.log(`line 64, newPopulation: `);
    printPop(newPopulation);
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
  createChromosome,
  generateInitPopulation,
  populationFitness,
  evolvePopulation
};