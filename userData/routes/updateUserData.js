
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const Orchestrator = require('../models/orchestrator')

function updateUserData(req,res) {

    const msg = `updateUserData`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg, {'meta': `${locationMeta}`});

    const feData = JSON.parse(Object.keys(req.body)[0]) //input as key becouse of cors problem (find a fix that includes swagger)
    const inst = new Orchestrator(feData.constrains, feData.products);

	  res.status(200).json({ updateUserData:['meals options :) <3 :) <3 :) <3','dsfghjf']});
  }

  module.exports = {
    updateUserData
  };
