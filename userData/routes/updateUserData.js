
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes

function updateUserData(req,res) {

    const msg = `updateUserData`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg, {'meta': `${locationMeta}`});
    console.log(req.body)    

	res.status(200).json({ updateUserData: 'meals options :) <3 :) <3 :) <3'});
  }

  module.exports = {
    updateUserData
  };
