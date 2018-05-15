const _ = require('lodash');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes


class MealPlanChromosome{

  constructor(allGenes, chromosomeSize, randGenes = true){

    this.genes = new Map();
    this.fitness = null;
    this.chromosomeSize = chromosomeSize;
    if(randGenes){
      this.createChromosome(allGenes);
    }
  }


  /**
   * returns a chromosome = meals plan
   * products are randomly chosen
   */

  createChromosome(allGenes){

    let randGene;
    let i = 0;
    while(i < this.chromosomeSize)
    {
      randGene = MealPlanChromosome.getRandomKey(allGenes);
      if(!this.genes.has(randGene)){
        this.genes.set(randGene, _.cloneDeep(allGenes.get(randGene)));
        this.genes.get(randGene).amount.numOfUnits = 1;
        i++;
      }else if( this.genes.get(randGene).amount.numOfUnits < allGenes.get(randGene).amount.numOfUnits){
        this.genes.get(randGene).amount.numOfUnits = this.genes.get(randGene).amount.numOfUnits  + 1;
        i++;
      }
    }

  }

  /**
   * returns true if chromosome has less or equal to amount like in allGenes
   * @param allGenes
   */
  validateChromosome(allGenes){

    //go over map of genes, if amount of gene is more than if fridge ,return false
    this.genes.forEach((geneInfo, key ) =>{
      if (geneInfo.amount.numOfUnits > allGenes.get(key).amount.numOfUnits){
        return false;
      }
    });

    return true;

  }


   static getRandomKey(genes) {
    let index = Math.floor(Math.random() * genes.size);
    let cntr = 0;
    for (let key of genes.keys()) {
      if (cntr++ === index) {
        return key;
      }
    }
  }

 static logChromosomeGenes(value, key, map) {
    console.log(`genes[${key}] = ${JSON.stringify(value)}`);
  }

}



module.exports = MealPlanChromosome;