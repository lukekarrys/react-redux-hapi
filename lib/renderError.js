'use strict';

const Config = require('getconfig');

module.exports = (request, reply) => {
  const { response } = request;

  if (response.isBoom) {
    let statusCode = 404;
    let errorName = 'Not Found';
    let stack = null;

    if (Config.getconfig.isDev) {
      const { payload } = response.output;
      statusCode = payload.statusCode;
      errorName = payload.error;
      stack = response.stack;
    }

    return reply.view('error', { statusCode, errorName, stack }).code(statusCode);
  }

  return reply.continue();
};
