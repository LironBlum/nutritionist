/** LOGGER **/
// winston logger levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

'use strict';
const winston = require('winston');
const tsFormat = () => (new Date()).toLocaleTimeString();


/**
 * exports to test only
 * @return {Array}
 */
const getTransportsList = () => {
  const transports = [];
  if (process.env.TOFILE === 'true') {
    transports.push(new winston.transports.File({
      name: `${process.env.LOGLEVEL}file`,
      filename: `${process.env.LOGDIR}/${process.env.LOGLEVEL}Logs.log`,
      json: true,
      timestamp: tsFormat,
      level: process.env.LOGLEVEL
    }));
  }
  if (process.env.TOCONSOLE === 'true') {
    transports.push(new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: process.env.LOGLEVEL,
      json: process.env.LOG_CONSOLE_JSON_STYLE === 'true'
    }));
  }
  //error logs will ALWAYS be written to file!
  transports.push(new winston.transports.File({
    name: `${process.env.ERORFILE}file`,
    filename: `${process.env.LOGDIR}/${process.env.ERORFILE}Logs.log`,
    json: true,
    timestamp: tsFormat,
    level: 'error'
  }));
  return transports;
};

winston.loggers.add('logger', {
  transports: getTransportsList()
});


module.exports = {
  logger: winston.loggers.get('logger'),
  getTransportsList
};