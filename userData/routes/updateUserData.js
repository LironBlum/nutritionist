
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const Orchestrator = require('../models/orchestrator');

function updateUserData(req,res) {

  const msg = `incoming updateUserData request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg, { 'meta': `${locationMeta}` });

  //const feData = JSON.parse(Object.keys(req.body)[0]); //input as key becouse of cors problem (find a fix that includes swagger)
  const feData = {
    constrains: { maxCal: 1700, carbs: 60, fats: 15, proteins: 20 },
    products:
    [ { name: 'milk', quantity: '1', unit: 'cup' },
      { name: 'egg', quantity: '300', unit: 'g' },
      { name: 'tofu', quantity: '300', unit: 'g' },
      { name: 'chicken', quantity: '500', unit: 'g' },
      { name: 'green beans', quantity: '100', unit: 'g' },
      { name: 'broccoli', quantity: '50', unit: 'g' },
      { name: 'tuna can', quantity: '100', unit: 'g' },
      { name: 'rice', quantity: '350', unit: 'g' },
      { name: 'yogurt', quantity: '300', unit: 'g' },
      { name: 'h', quantity: 'h', unit: 'h' } ] };

  const inst = new Orchestrator(feData.constrains, feData.products);
  inst.execute();
  res.status(200).json({ updateUserData: ['meals options :) <3 :) <3 :) <3','dsfghjf'] });
}

module.exports = {
  updateUserData
};
