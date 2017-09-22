/* eslint no-process-exit:0 */

'use strict';

const Config = require('getconfig');
const Hapi = require('hapi');
const RenderError = require('./lib/renderError');
const Routes = require('./lib/routes');
const Assets = require('./lib/assets');

Config.hapi.cache.engine = require(Config.hapi.cache.engine);
const server = new Hapi.Server(Config.hapi);

process.on('SIGTERM', () => {
  server.log(['info', 'shutdown'], 'Graceful shutdown');
  server.stop({ timeout: Config.shutdownTimeout }).then(() => process.exit(0));
});

server.connection(Object.assign({ port: process.env.PORT || 3000 }, Config.connection.public));
server.on('request-error', (__, m) => console.log(m.stack));
server.ext('onPreResponse', RenderError);

exports.server = server.register([{
  register: require('inert')
}, {
  register: require('vision')
}, {
  register: require('good'),
  options: Config.good
}, {
  register: require('h2o2')
}]).then(() => {
  server.views({
    engines: { pug: require('pug') },
    path: `${__dirname}/lib/views`,
    isCached: !Config.getconfig.isDev,
    context: { assets: Assets() }
  });

  server.route(Routes);
}).then(() => {
  if (module.parent) {
    return server.initialize().then(() => server);
  }

  return server.start().then(() =>
    server.connections.forEach((connection) =>
      server.log(['info', 'startup'], `${connection.info.protocol}://${connection.info.address}:${connection.info.port} ${connection.settings.labels}`)
    )
  );
}).catch((err) => {
  console.error(err.stack || err);
  process.exit(1);
});
