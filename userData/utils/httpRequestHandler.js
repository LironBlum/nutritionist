`use strict`;
const Promise = require(`bluebird`);
const rp = require(`request-promise`);
const logger = require('../models/logger').logger;
require('../utils/stackTraceInfo');

/**
 * @param method string post/put/get/delete
 * @param requestParams object
 * { url: string
 *  data: object
 *  headers: object }
 * @return Promise
 */
const sendHttpRequest = (method, requestParams) => {
  const options = {
    resolveWithFullResponse: true,
    method,
    url: requestParams.url,
    body: requestParams.data ? requestParams.data : null,
    headers: requestParams.headers ? requestParams.headers : null,
    json: requestParams.data ? true : null,
  };

  return rp(options)
    .then(response => {
      return response;
    }).catch(err => {
      console.error(err)
      return Promise.reject(err);
    });
};

module.exports = {
  sendHttpRequest
};
