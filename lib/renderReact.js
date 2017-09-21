'use strict';

const Path = require('path');
const Config = require('getconfig');
const { createElement: h } = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter, matchPath, Switch } = require('react-router-dom');
const { Provider } = require('react-redux');

// Transforms client code in ./client using babel and options from ./client/.babelrc
const isClient = (p) => p.startsWith(Path.resolve(__dirname, '..', 'client'));
require('babel-register')({ ignore: (p) => !isClient(p) });

// Set node env if its not set since the client code assumes that it is always set
const env = Config.getconfig.env === 'dev' ? 'development' : Config.getconfig.env;
process.env.NODE_ENV = process.env.NODE_ENV || env;

// Delete require cache for all clientside requires in dev mode so that
// they do not require a server restart
const uncacheClient = (path) => {
  if (Config.getconfig.isDev) {
    Object.keys(require.cache).filter(isClient).forEach((p) => {
      delete require.cache[p];
    });
  }
};

// Return an array of promise actions which have been dispatched to the stoer
// based on the path matching any of the react-router routes
const mapRouteToActions = ({ routes, path, store }) => {
  const actions = [];
  routes.some((route) => {
    const { fetchData } = route.component;
    const match = matchPath(path, route);
    if (match && fetchData) {
      const fetchDataActions = Array.isArray(fetchData) ? fetchData : [fetchData];
      fetchDataActions.forEach((action) => {
        actions.push(store.dispatch(action(match.params)));
      });
    }
    return match;
  });
  return actions;
};

module.exports = (request, reply) => {
  uncacheClient();

  const configureStore = require('../client/store');
  const App = require('../client/components/app');
  const { default: routes, Routes } = require('../client/routes');

  const { path } = request;
  const routerContext = {};
  const store = configureStore();
  const actions = mapRouteToActions({ routes, path, store });

  return Promise.all(actions).then(() => {
    const output = h(
      Provider,
      { store },
      h(
        StaticRouter,
        { location: path, context: routerContext },
        h(
          App,
          {},
          h(
            Switch,
            {},
            Routes
          )
        )
      )
    );

    reply.view('client', {
      html: renderToString(output),
      initialData: store.getState()
    });
  });
};
