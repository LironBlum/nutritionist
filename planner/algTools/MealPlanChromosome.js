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
      this.insertNewGenes(genesPool);
    }
    //else create an empty chromosome
  }

  /**
   * adds a new VALID gene to list of genes
   * products are randomly chosen
   */

  insertNewGenes(pool){

    while(this.genes.length < this.chromosomeSize)
    {
      const randGene = Math.floor(Math.random() * pool.length);

      //avoid duplicates of genes
      if (this.isValidGene(pool[randGene])) {
        this.genes.push(_.cloneDeep(pool[randGene]));
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

  /**
   * returns TRUE if the id of gene doesn't exist in chromosome
   * @param gene
   * @returns {boolean}
   */
  isValidGene(gene){
    return ( _.findIndex(this.genes, ['id', gene.id])) === -1;
  }

  logChromosomeGenes(){
    this.genes.forEach( g => {
      console.log(`${g.name},${g.amount.numOfUnits}`);
    });
  }
}



module.exports = MealPlanChromosome;