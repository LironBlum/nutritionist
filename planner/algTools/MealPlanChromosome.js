const _ = require('lodash');
require('../logging/stackTraceInfo');
const logger = require('../logging/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes


class MealPlanChromosome{


  constructor(genesPool, chromosomeSize){
    this.genes = [];
    this.fitness = null;
    this.chromosomeSize = chromosomeSize;

    if(genesPool.length > 0){
      while(this.genes.length < chromosomeSize)
      {
        this.addNewGene(genesPool);
      }
    }
  }


  /**
   * adds a new VALID gene to list of genes
   * products are randomly chosen
   */

  addNewGene(genesPool){

    let added = false;

    while(!added) {
      let i = Math.floor(Math.random() * genesPool.length);

      //avoid duplicates of genes
      if ((_.findIndex(this.genes, ['id', genesPool[i].id])) === -1) {
        this.genes.push(_.cloneDeep(genesPool[i]));
        added = true;
      }
    }
  }

  /**
   * valid chromosome doesn't have duplicates
   * return true if all id's in chromosome are unique
   * @returns {boolean}
   */
  validateChromosome(){
    const uniqArrLen = _.uniq(this.genes).length;
    return uniqArrLen === this.genes.length;
  }

  logChromosomeGenes(){
    this.genes.forEach( (g) =>{
      console.log(`${g.name},${g.amount.numOfUnits}`)
    });
  }
}



module.exports = MealPlanChromosome;