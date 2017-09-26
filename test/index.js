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
    const data = Fixtures.locations();
    Fixtures.nockApi().get('/location/search/?lattlong=34.316800,-111.132717').reply(200, data);

    return server.inject('/locations').then((res) => {
      expect(res.statusCode).to.equal(200);
      data.forEach((l) => {
        expect(res.result).to.include(`<li><a href="/locations/${l.woeid}">${l.title}</a></li>`);
        expect(res.result).to.include(`,"title":"${l.title}",`);
        expect(res.result).to.include(`,"woeid":${l.woeid},`);
      });
      return res.result;
    });
  });

  it('renders a location page', () => {
    const id = 2;
    const data = Fixtures.location({ woeid: id });
    Fixtures.nockApi().get(`/location/${id}`).reply(200, data);

    return server.inject(`/locations/${id}`).then((res) => {
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.include(`<h1>${data.title}</h1>`);
      expect(res.result).to.include(`,"title":"${data.title}",`);
      return res.result;
    });
  });
});
