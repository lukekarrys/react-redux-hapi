import ActionNames from 'action-names';
import { combineReducers } from 'redux';
import { merge } from 'lodash';

const syncing = (types) => (state = {}, action) => {
  switch (action.type) {
  case types.fetchStart:
    return {
      ...state,
      ...{ [action.meta.key]: true }
    };

  case types.fetchSuccess:
  case types.fetchError:
    return {
      ...state,
      ...{ [action.meta.key]: false }
    };

  default:
    return state;
  }
};

const error = (types) => (state = {}, action) => {
  switch (action.type) {
  case types.fetchSuccess:
    return {
      ...state,
      ...{ [action.meta.key]: null }
    };

  case types.fetchError:
    return {
      ...state,
      ...{ [action.meta.key]: action.payload }
    };

  default:
    return state;
  }
};

const lastSynced = (types) => (state = {}, action) => {
  switch (action.type) {
  case types.fetchError:
    return {
      ...state,
      ...{ [action.meta.key]: null }
    };

  case types.fetchSuccess:
    return {
      ...state,
      ...{ [action.meta.key]: Date.now() }
    };

  default:
    return state;
  }
};

const entities = (types) => (state = {}, action) => {
  switch (action.type) {
  case types.fetchSuccess:
    return merge({}, state, action.payload.entities);

  default:
    return state;
  }
};

export default (schema) => {
  const types = ActionNames(schema.key);
  return combineReducers({
    syncing: syncing(types),
    error: error(types),
    lastSynced: lastSynced(types),
    entities: entities(types)
  });
};

