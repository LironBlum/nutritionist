'use strict';
require('../utils/stackTraceInfo');
const _ = require('lodash');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const MongoClient = require('mongodb').MongoClient;
const env = process.env;

const url = `mongodb://${env.MONGO_HOST}:${env.MONGO_PORT}/`;
const dbName = 'nutritionist';
const collection = 'nutritionValues';

class GetProductNutrients {
  constructor(req) {
    this.productsNames = req.body.body.products;
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

    let productsFromDB;
    const db = await MongoClient.connect(url);
    const nutritionDb = db.db(dbName);
    try {
      const dbData = await nutritionDb.collection(collection)
        .find({ 'name.long': { $in: this.productsNames } }, { 'name.long': 1, nutrients: 1 });
      productsFromDB = await dbData.toArray();
    }catch(err){
      console.log(err); //TODO write err to log
    } finally {
      db.close();
    }

    return this.assembleResponse(productsFromDB);
  }


  assembleResponse(productsFromDB){
    const resultsArr = [];
    productsFromDB.forEach(product => {
      const obj = {
        id: product._id,
        name: product.name.long,
        nutrients: GetProductNutrients.filterNutrient(product.nutrients)
      };
      resultsArr.push(obj);
    });

    return resultsArr;
  }



  static filterNutrient(nuts){

    const filtered= [];
    nuts.forEach(nut => {
      switch (nut.abbr){
      case 'PROCNT':
        filtered.push({ name: 'proteins', value: nut.value });
        break;
      case 'FAT':
        filtered.push({ name: 'fats', value: nut.value });
        break;
      case 'CHOCDF':
        filtered.push({ name: 'carbs', value: nut.value });
        break;
      case 'ENERC_KCAL':
        filtered.push({ name: 'calories', value: nut.value });
        break;
      }
    });

    return filtered;
  }



}
module.exports = GetProductNutrients;

