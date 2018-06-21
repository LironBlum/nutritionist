
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes



function bluePrintExample(req,res) {

  const msg = `incoming dbGateWay request`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg, { 'meta': `${locationMeta}` });

  res.status(200).json({ dbGateWay: 'dbGateWay' });
}

module.exports = {
  bluePrintExample
};
