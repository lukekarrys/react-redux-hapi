'use strict';

const Fs = require('fs');
const Path = require('path');
const Config = require('getconfig');

const staticDev = (request, reply) => {
  const publicPath = Path.resolve(__dirname, 'public', request.params.path);

  if (Fs.existsSync(publicPath)) {
    return reply.file(publicPath);
  }

  return reply.proxy(Object.assign({}, Config.webpackDev, {
    protocol: 'http',
    passThrough: true
  }));
};

// In production assets (including from webpack) are all compiled to public dir
module.exports = Config.getconfig.isDev ? staticDev : { directory: { path: './public', listing: false } };
