'use strict';

const Config = require('getconfig');
const Hapi = require('hapi');
const RenderError = require('./lib/renderError');
const Routes = require('./lib/routes');
const Assets = require('./lib/assets');

Config.hapi.cache.engine = require(Config.hapi.cache.engine);
const server = new Hapi.Server(Config.hapi);

// $PORT is not set during install processes, so we don't
// include it in the config, hence this if statement
// $lab:coverage:off$
if (Config.getconfig.env === 'production') {
  Config.connection.public.port = process.env.PORT;
}
// $lab:coverage:on$

server.connection(Config.connection.public);

// $lab:coverage:off$
process.on('SIGTERM', () => {
  server.log(['info', 'shutdown'], 'Graceful shutdown');
  // eslint-disable-next-line no-process-exit
  server.stop({ timeout: Config.shutdownTimeout }).then(() => process.exit(0));
});

server.on('request-error', (__, m) => console.log(m.stack));
// $lab:coverage:on$

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
  // coverage disabled because module.parent is always defined in tests
  // $lab:coverage:off$
  if (module.parent) {
    return server.initialize().then(() => server);
  }

  return server.start().then(() => {
    server.connections.forEach((connection) => {
      server.log(['info', 'startup'], `${connection.info.uri} ${connection.settings.labels}`);
    });
  });
  // $lab:coverage:on$
}).catch((err) => {
  // coverage disabled due to difficulty in faking a throw
  // $lab:coverage:off$
  console.error(err.stack || err);
  process.exit(1); // eslint-disable-line no-process-exit
  // $lab:coverage:on$
});
