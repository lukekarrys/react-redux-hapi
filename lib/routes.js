'use strict';

const Joi = require('joi');
const RenderReact = require('./renderReact');
const Static = require('./static');

const id = Joi.number().description('id');

module.exports = [
  { method: 'GET', path: '/', config: { handler: RenderReact } },
  // These routes should be kept in sync with client/routes
  { method: 'GET', path: '/locations', config: { handler: RenderReact } },
  { method: 'GET', path: '/locations/{id}', config: { handler: RenderReact, validate: { params: { id } } } },
  // End routes to keep in sync
  { method: 'GET', path: '/{path*}', config: { handler: Static } }
];
