//gene = 1 food product
//chromosome = solution = meals plan for one day - constructed of 6 genes
//population = several chromosomes  = possible solutions


/**
 * returns a chromosome = meals plan for one day
 * products are randomly chosen
 */
function createChromosome(genes, chromosomeSize){
    let chromosome = [];
    let gene;

    while(chromosome.length < chromosomeSize)
    {
        gene = genes[Math.floor(Math.random()*genes.length)]; //get random gene
        if(!chromosome.includes(gene)){
            chromosome.push(gene);
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
 * return fitness of a given solution
 * @param solution
 */

function fitness(solution) {

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

};