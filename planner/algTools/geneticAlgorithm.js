//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions



/**
 * returns a chromosome = meals plan
 *
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
 * @param population
 * @param constraints
 * @param fitness
 */

function populationFitness(population, constraints, fitness) {
    population.forEach(function (chromosome) {
        chromosome.fitness = fitness(chromosome.genes, constraints);
    });
}


/**
 * returns a NEW solution constructed of the old solution with a slight change (probably random change)
 * @param solution
 */
function mutate(solution) {

}

/**
 * parent1, parent2 - existing solutions to act as parents for new one
 * @param solution
 */
function crossover(parent1, parent2) {

}

process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
});


module.exports = {
    createChromosome,
    generateInitPopulation,
    populationFitness

};