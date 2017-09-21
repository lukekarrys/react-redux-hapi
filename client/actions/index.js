import apiAction from '../lib/apiAction';
import * as Schema from '../schema';

export const fetchLocations = apiAction({
  request: ({ latitude = 34.316800, longitude = -111.132717 }) => `/location/search/?lattlong=${latitude},${longitude}`,
  resource: Schema.location.key,
  schema: [Schema.location]
});

export const fetchLocation = apiAction({
  request: ({ id }) => `/location/${id}`,
  resource: Schema.location.key,
  schema: Schema.location
});
