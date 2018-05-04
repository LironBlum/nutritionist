const _= require("lodash")

function rouletteWheel(population, selectionSize){
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

function random (low, high) {
    return Math.random() * (high - low) + low;
}


module.exports = {
    rouletteWheel
};


process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
  });