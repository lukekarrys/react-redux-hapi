'use strict';

const Config = require('getconfig');

module.exports = () => {
  if (Config.getconfig.env === 'production') {
    let assets = {};
    try {
      // eslint-disable-next-line import/no-unresolved
      assets = require('../webpack-assets.json');
    } catch (e) {
      throw new Error('Missing webpack assets file. Before starting in production run: `npm run build`');
    }

    return assets;
  }

  // This is easier than needing to wait for the webpack compiler to run
  // once before the server has started in dev and testing. This should be kept
  // up to date manually with other entries that are compiled by webpack
  return {
    app: { js: 'app.js' }
  };
};
