'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const uuid4 = require('uuid/v4')
//const { sendRequest } = require('../../api/handlers/httpRequest')
const env = process.env

class Orchestrator {
  constructor(constrains, products) {
    this.plannerData= {
      metadata: {
        service: 'userData',
        uuid: uuid4(),
      },
      body: {
        constraints:{
            maxCalories: constrains.maxCal,
            macroMolecules:{
                carbs: constrains.carbs,
                proteins: constrains.proteins,
                fats: constrains.fats
            }
        },
        products: []
      }
    };

    console.log(this.plannerData)
  }

  /**
   * Execute service
   * @return {Promise<void>}
   */
  async execute() {
    //const productsWithNuts = await this.sendToDbGw(products)
  }

  /**
   * Send request to CCO => credit card orchestrator
   * @return {Promise<void>}
   */
  async sendToDbGw(products){
    //const url = `${env.CCO_PROTOCOL}://${env.CCO_HOST}:${env.CCO_PORT}${env.CCO_CCC_URI}`
    //const opt = {url, data: body}
  
    try {
      //return await sendRequest('post', opt, this.uuid)
    }catch (err) {
      return err
    }
  }
}
module.exports = Orchestrator;