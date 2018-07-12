'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const uuid4 = require('uuid/v4');
const { sendHttpRequest } = require('../utils/httpRequestHandler');
const env = process.env;

class Orchestrator {
  constructor(constrains, products) {
    this.products = products;
    this.constrains = {
      maxCalories: constrains.maxCal,
      macroMolecules:
      {
        carbs: constrains.carbs,
        proteins: constrains.proteins,
        fats: constrains.fats
      }
    };
    this.meta = {
      service: 'userData',
      uuid: uuid4()
    };
  }


  /**
   * Execute service
   * @return {Promise<void>}
   */
  async execute() {
    const reqToDbGw = {
      meta: this.meta,
      body: { products: this.products }
    };
    const productsWithNuts = await this.sendToDbGw(reqToDbGw);

  }

  /**
   * Send request to CCO => credit card orchestrator
   * @return {Promise<void>}
   */
  async sendToDbGw(products){
    const url = `${env.DB_GW_PROTOCOL}://${env.DB_GW_HOST}:${env.DB_GW_PORT}${env.DB_GW_URI}`;

    const opt = { url, data: products };

    try {
      return await sendHttpRequest('post', opt);
    }catch (err) {
      return err;
    }
  }
}
module.exports = Orchestrator;