
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes



function bluePrintExample(req,res) {

  const msg = `bluePrintExample`;
  const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
  logger.info(msg, { 'meta': `${locationMeta}` });

  res.status(200).json({ bluePrintExample: 'bluePrintExample' });
}

module.exports = {
  bluePrintExample
};
