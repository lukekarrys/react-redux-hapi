import ActionNames from 'action-names';
import { normalize } from 'normalizr';
import { each, omit } from 'lodash';
import Api from './api';

export default ({ schema, resource, request }) => (params) => (dispatch, getState) => {
  const types = ActionNames(resource);

  dispatch({
    type: types.fetchStart
  });

  const requestOptions = request(params);
  const url = typeof requestOptions === 'string' ? requestOptions : requestOptions.url;
  const options = typeof requestOptions === 'string' ? {} : omit(requestOptions, 'url');

  return Api.get(url, options)
    .then((response) => {
      const { data } = response;
      const { entities, result } = normalize(data, schema);

      each(entities, (values, key) => {
        if (key !== resource) {
          dispatch({
            type: ActionNames(key).fetchSuccess,
            payload: { entities: entities[key] }
          });
        }
      });

      dispatch({
        type: types.fetchSuccess,
        payload: { entities: entities[resource] }
      });

      return { entities, result };
    })
    .catch((err) => {
      dispatch({
        type: types.fetchError,
        payload: err
      });
    });
};
