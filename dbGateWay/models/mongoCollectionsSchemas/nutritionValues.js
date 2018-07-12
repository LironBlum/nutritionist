'use strict';
const Mongo = require('../Mongo');
const mongo = new Mongo();
const uuid4 = require('uuid/v4');
const { cloneDeep }= require('lodash');

const nutritionValuesSchema = new mongo.mongoose.Schema({
  personId: {
    type: String,
    trim: true,
    required: true,
    max: 9
  },
  idType: {
    type: String,
    trim: true,
    required: true,
    max: 2
  },
  countryCode: {
    type: String,
    trim: true,
    required: true,
    max: 4
  },
  currentMonth: {
    type: String,
    trim: true,
    required: true,
    max: 2
  },
  currentYear: {
    type: String,
    trim: true,
    required: true,
    max: 4
  },
  creditCardCoinsNo: {
    type: Number,
    trim: true,
    required: true
  },
  creditCardCoinsStatus: {
    type: String,
    trim: true,
    required: true,
    max: 1
  },
  creditCardCoinsUpdateDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});



const nutritionValuesModel = mongo.mongoose.model('NutritionValuesSchema', nutritionValuesSchema, process.env.NUTRITIONVALUES_COLLECTION);


CCCHistoryModel.insertOrUpdate = async function(customer) {

  const customerInst = CCCHistoryModel.formatPersonId(customer);
  return await this.findOneAndUpdate(
    {
      personId: customerInst.personId,
      idType: customerInst.idType,
      countryCode: customerInst.countryCode,
      currentMonth: customerInst.currentMonth,
      currentYear: customerInst.currentYear
    },
    {
      $set: customerInst
    },
    { upsert: true, new: true, rawResult: true });
};



CCCHistoryModel.formatPersonId = function(data) {
  data.personId = data.personId.replace(/^0+/, '');
  return data;
};


module.exports = CCCHistoryModel;