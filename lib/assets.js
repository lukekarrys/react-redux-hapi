'use strict';

const Config = require('getconfig');

module.exports = () => {
  if (Config.getconfig.env === 'production') {
    try {
      // eslint-disable-next-line import/no-unresolved
      return require('../webpack-assets.json');
    } catch (e) {
      throw new Error('Missing webpack assets file. Before starting in production run: `npm run build`');
    }
  }

  // This is easier than needing to wait for the webpack compiler to run
  // once before the server has started in dev and testing. This will take all
  // the entries from webpack, but still requires manual updating when new entry
  // types or names are added (css and stuff like that)
  const { entry } = require('../webpack.config.js');
  return Object.keys(entry).reduce((acc, name) => {
    acc[name] = { js: `${name}.js` };
    return acc;
  }, {});
};
