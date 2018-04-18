
require('../utils/stackTraceInfo');
const logger = require('../models/logger').logger;
const location = `directory: ${__dirname}, file: ${ __filename}`; //for logging purposes
const MealPlanner = require("../models/MealPlanner");

function getMealPlans(req,res) {

    const msg = `incoming getMealPlans request`;
    const locationMeta = `${location}, func: ${ __func},line:${ __line}`;
    logger.info(msg,{'meta': locationMeta, 'request': req.body}); //TODO insert uuid : req.body.uuid
    const instance = new MealPlanner(req.body.body);
    instance.execute();

	res.status(200).json({ getMealPlans: 'getMealPlans'});
  }

process.on('unhandledRejection', error => {
    // Won’t execute
    console.log('unhandledRejection', error);
});


module.exports = {
      getMealPlans
  };
