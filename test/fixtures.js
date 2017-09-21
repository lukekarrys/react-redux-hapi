'use strict';

const Faker = require('faker');
const Nock = require('nock');
const Config = require('getconfig');
const { expect } = require('code');

exports.nockApi = () => Nock(Config.api.baseURL);

exports.nockDone = () => new Promise((resolve) => {
  expect(Nock.activeMocks().length).to.equal(0);
  expect(Nock.pendingMocks().length).to.equal(0);
  resolve();
});

exports.locations = (count = 7) => [...Array(count)].map(() => ({
  distance: Faker.random.number(),
  title: Faker.address.city(),
  location_type: 'City',
  woeid: Faker.random.number(),
  latt_long: `${Faker.address.latitude()},${Faker.address.longitude()}`
}));

exports.location = (attrs = {}) => Object.assign({
  time: Faker.date.recent().toJSON(),
  sun_rise: Faker.date.recent().toJSON(),
  sun_set: Faker.date.recent().toJSON(),
  title: Faker.address.city(),
  location_type: 'City',
  woeid: Faker.random.number(),
  latt_long: `${Faker.address.latitude()},${Faker.address.longitude()}`,
  consolidated_weather: [...Array(5)].map(() => ({
    id: Faker.random.number(),
    applicable_date: Faker.date.recent().toJSON().split('T')[0],
    min_temp: Faker.random.number(),
    max_temp: Faker.random.number(),
    the_temp: Faker.random.number()
  }))
}, attrs);
