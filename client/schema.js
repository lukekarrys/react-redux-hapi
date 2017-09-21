import { schema } from 'normalizr';

export const location = new schema.Entity('locations', {}, {
  idAttribute: 'woeid'
});
