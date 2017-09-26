import ActionNames from 'action-names';
import { normalize } from 'normalizr';
import ms from 'ms';
import Api from './api';

export default ({ schema, resource, request }) => (params, urlOnly) => {
  const types = ActionNames(resource);
  const url = request(params);

  if (urlOnly) return url;

  return (dispatch, getState) => {
    const lastSynced = getState()[resource].lastSynced[url];

    if (lastSynced && Date.now() - lastSynced <= ms('5m')) {
      return Promise.resolve();
    }

    dispatch({
      type: types.fetchStart,
      meta: { key: url }
    });

    return Api.get(url)
      .then((response) => {
        const { data } = response;
        const { entities, result } = normalize(data, schema);

        dispatch({
          type: types.fetchSuccess,
          payload: { entities: entities[resource] },
          meta: { key: url }
        });

        return { entities, result };
      })
      .catch((err) => {
        dispatch({
          type: types.fetchError,
          payload: err,
          meta: { key: url }
        });
      });
  };
};
