'use strict';

const Joi = require('joi');
const RenderReact = require('./renderReact');
const Static = require('./static');

const id = Joi.number().description('id');

module.exports = [
  { method: 'GET', path: '/', config: { handler: RenderReact } },
  { method: 'GET', path: '/locations', config: { handler: RenderReact } },
  { method: 'GET', path: '/locations/{id}', config: { handler: RenderReact, validate: { params: { id } } } },
  { method: 'GET', path: '/{path*}', config: { handler: Static } }
];
