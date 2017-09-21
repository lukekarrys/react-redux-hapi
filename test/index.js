'use strict';

const { describe, it, before, afterEach } = exports.lab = require('lab').script();
const { expect } = require('code');
const Server = require('../server').server;
const Fixtures = require('./fixtures');

describe('Basic page tests', () => {
  let server;

  before(async () => (server = await Server));
  afterEach(async () => await Fixtures.nockDone());

  it('renders the locations page', () => {
    Fixtures.nockApi().get('/location/search/?lattlong=34.316800,-111.132717').reply(200, Fixtures.locations());

    return server.inject('/locations').then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.include('<script>__INITIAL_DATA__=');
      expect(res.result).to.include('data-react-checksum');
      return res.result;
    }).then(console.log);
  });

  it('renders a location page', () => {
    const id = 2;
    Fixtures.nockApi().get(`/location/${id}`).reply(200, Fixtures.location({ woeid: id }));

    return server.inject(`/locations/${id}`).then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.include('<script>__INITIAL_DATA__=');
      expect(res.result).to.include('data-react-checksum');
      return res.result;
    }).then(console.log);
  });
});
