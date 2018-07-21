require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const Orchestrator = require('../models/orchestrator');

function updateUserData(req,res) {

  const msg = `incoming updateUserData request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg, { 'meta': `${locationMeta}` });

  // const feData = JSON.parse(Object.keys(req.body)[0]); //input as key becouse of cors problem (find a fix that includes swagger)
  const feData = {
    constrains: { maxCal: 1700, carbs: 60, fats: 15, proteins: 20 },
    products:
    [ { name: 'Cheese, cheddar', quantity: '100', unit: 'g' },
      { name: 'Fish, tuna, light, canned in oil, drained solids', quantity: '100', unit: 'g' },
      { name: 'Broccoli, raw', quantity: '100', unit: 'g' },
      { name: 'Tofu, raw, firm, prepared with calcium sulfate', quantity: '100', unit: 'g' },
      { name: 'Rice, white, long-grain', quantity: '100', unit: 'g' },
      { name: 'Apples, raw, without skin', quantity: '100', unit: 'g' },
      { name: 'Chicken breast, roll, oven-roasted', quantity: '100', unit: 'g' },
      { name: 'Yogurt, plain, low fat', quantity: '100', unit: 'g' },
      { name: 'Tomatoes, green, raw', quantity: '100', unit: 'g' },
      { name: 'Carrots, raw', quantity: '100', unit: 'g' },
      { name: 'Peppers, sweet, green, raw', quantity: '100', unit: 'g' },
      { name: 'Bread, white, commercially prepared, toasted, low sodium no salt', quantity: '100', unit: 'g' },
      { name: 'Blueberries, raw', quantity: '100', unit: 'g' },
      { name: 'Bananas, raw', quantity: '200', unit: 'g' },
      { name: 'Eggs, scrambled, frozen mixture', quantity: '100', unit: 'g' }] };



  const inst = new Orchestrator(feData.constrains, feData.products);
  inst.execute();
  res.status(200).json({ updateUserData: ['meals options :) <3 :) <3 :) <3','dsfghjf'] });
}

module.exports = {
  updateUserData
};