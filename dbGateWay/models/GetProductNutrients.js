'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const env = process.env;

class GetProductNutrients {
  constructor(req) {
    this.products = req.body.body.products;
    this.meta = {
      service: 'dbGateWay',
      uuid: req.body.meta.uuid
    };

  }


  /**
   * Execute service
   * @return {Promise<void>}
   */
  async execute() {



  }



}
module.exports = GetProductNutrients;