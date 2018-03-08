const monitoring = require('../utils/monitoring');
const helpers = require('../utils/helpers');
const Logger = require('../logger/loggerClient');
const logger = new Logger(process.env.SERVICENAME);
require('../utils/stackTraceInfo');
const uuid4 = require('uuid/v4');
const location = `directory: ${__dirname}, file: ${ __filename}`;
const serviceVitality = require('../models/vitalityModels/serviceVitality');
const jstoxml = require('jstoxml');

function version(req, res) {
  logger.debug(`new version request`,uuid4(),100);
  res.status(200).json({ version: `${process.env.VERSION}` });
}

function ping(req,res) {
  res.status(200).json({ ping: '✔'});
  logger.info(`new ping request`, uuid4(), 100,{'meta':`directory: ${__dirname}, file: ${ __filename},func: ${ __func},line:${ __line}`});
}

async function vitality(req,res) {
	let msg = `new vitality request`;
	let locationMeta = `${location}, func: ${ __func},line:${ __line}`;
	logger.info(msg, uuid4(), 100, {'meta':locationMeta});

  try{
  	const services = ["logger"];
  	const vitalityObjects = [];

  	services.forEach(service =>{
  		vitalityObjects.push(new serviceVitality(service,uuid4()));
	});

	let contents;
	let results = [];
	await Promise.all(vitalityObjects.map(async (checkVitalityObject) => {
		 contents = await checkVitalityObject.execute();
		results.push(contents);
	}));

	const resXML = jstoxml.toXML({
		 ROOT: results
	}, {header: false, indent: '  '});

	res.set('content-type', 'application/xml');
	res.send(resXML);

  }catch (err){
  	console.log(err);
  }

}

function getenv(req,res) {
  let info = monitoring.getenv(req,res);
  res.status(200).json({ environmentsInfo: info });
  logger.info(`new get env request`,uuid4, 100,{'meta':`directory: ${__dirname}, file: ${ __filename},func: ${ __func},line:${ __line}`});
}

module.exports = {
  version,
  ping,
  vitality,
  getenv
};

