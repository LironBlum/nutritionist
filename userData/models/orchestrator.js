'use strict';
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const uuid4 = require('uuid/v4');
const _ = require('lodash');
const { sendHttpRequest } = require('../utils/httpRequestHandler');
const env = process.env;

class Orchestrator {
  constructor(constrains, products) {
    this.productsFromClient = products;
    this.constraints = {
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
      body: { products: _.map(this.productsFromClient, 'name') }
    };


    const dbGwResponse = await Orchestrator.sendToDbGw(reqToDbGw);

    const productsFromDB =  dbGwResponse.body.results;


    console.log(' ------------------- productsWithNuts ---------------------------', dbGwResponse.body.results);

    const reqToPlanner = this.buildPlannerRequest(productsFromDB);


    console.log('-------------------  reqToPlanner --------------', reqToPlanner);

    const plannerResponse =  await Orchestrator.sendToPlanner(reqToPlanner);


    console.log('-------------------  plannerResponse --------------', plannerResponse.body);

  }

  /**
   * Send request to dbGateway
   * @return {Promise<void>}
   */
  static async sendToDbGw(products){
    const url = `${env.DB_GW_PROTOCOL}://${env.DB_GW_HOST}:${env.DB_GW_PORT}${env.DB_GW_URI}`;

    const opt = { url, data: products };

    try {
      return await sendHttpRequest('post', opt);
    }catch (err) {
      return err;
    }
  }


  static async sendToPlanner(data){
    const url = `${env.PLANNER_PROTOCOL}://${env.PLANNER_HOST}:${env.PLANNER_PORT}${env.PLANNER_URI}`;

    const opt = { url, data };

    try {
      return await sendHttpRequest('post', opt);
    }catch (err) {
      return err;
    }

  }

  buildPlannerRequest(productsFromDB){
    const reqToPlanner = {
      meta: this.meta,
      body: { constraints: this.constraints, products: [] }
    };

    productsFromDB.forEach(product => {
      const obj = {
        id: product.id,
        name: product.name,
        quantity: parseInt(this.findProductByName(product.name).quantity),
        units: 'grams'
      };

      const resolvedNutrients = this.calcNutrientsValueByAmount(product.nutrients, obj.quantity);
      reqToPlanner.body.products.push(Object.assign(obj, resolvedNutrients));
    });

    return reqToPlanner;
  }


  findProductByName(name){
    return this.productsFromClient.find(product => product.name === name);
  }

  /**
   * converts nutrition values from 100gr to the input gr
   * @param nutrientsValuesInGr
   * @param amountInGr
   */
  calcNutrientsValueByAmount(nutrientsValuesInGr, amountInGr ){
    const results = {};
    nutrientsValuesInGr.forEach(nutrient => {
      results[nutrient.name] = (nutrient.value * amountInGr) / 100.0;
    });
    return results;
  }




}
module.exports = Orchestrator;