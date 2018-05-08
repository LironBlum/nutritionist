
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes

function updateUserData(req,res) {

    const msg = `updateUserData`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg, {'meta': `${locationMeta}`});

	res.status(200).json({ updateUserData: 'updateUserData'});
  }

  module.exports = {
    updateUserData
  };
