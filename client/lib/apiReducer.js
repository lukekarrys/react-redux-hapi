import ActionNames from 'action-names';

const initialState = {
  syncing: false,
  entities: {}
};

export default (schema) => (state = initialState, action) => {
  const types = ActionNames(schema.key);

  switch (action.type) {
  case types.fetchStart:
    return {
      ...state,
      syncing: true
    };

  case types.fetchSuccess:
    return {
      ...state,
      syncing: false,
      entities: {
        ...state.entities,
        ...action.payload.entities
      }
    };

  default:
    return state;
  }
};
