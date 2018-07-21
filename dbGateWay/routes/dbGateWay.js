
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const GetProductNutrients = require('../models/GetProductNutrients');

const getNutritionValues = async (req,res) => {

  const msg = `incoming dbGateWay request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg, { 'meta': `${locationMeta}` },{ request: req.body });

  const inst = new GetProductNutrients(req);
  const results = await inst.execute();
  res.status(200).json({ results });

};

module.exports = {
  getNutritionValues
};
