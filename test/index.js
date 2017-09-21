'use strict';

const { describe, it, before } = exports.lab = require('lab').script();
const { expect } = require('code');
const Server = require('../server').server;
const Fixtures = require('./fixtures');

describe('Basic page tests', () => {
  let server;

  before(() => Server.then((s) => {
    server = s;
  }));

  it('renders the index page', () => {
    const data = Fixtures.locations();
    Fixtures.nockApi().get('/locations').reply(200, { data });

    return server.inject('/').then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.include('<script>__INITIAL_DATA__=');
      expect(res.result).to.include('data-react-checksum');
      return res.result;
    });
  });
});
