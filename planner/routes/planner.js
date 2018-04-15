
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes



function getMealPlans(req,res) {

    const msg = `incoming getMealPlans request`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg,{'meta': locationMeta, 'request': req.body}); //TODO insert uuid : req.body.uuid

	res.status(200).json({ bluePrintExample: 'bluePrintExample'});
  }

  module.exports = {
      getMealPlans
  };
