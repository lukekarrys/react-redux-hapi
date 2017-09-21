import configureStore from './index';

export default ({ initialState = {} } = {}) => {
  const middleware = [];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(require('redux-logger').createLogger({ collapsed: true }));
  }

  return configureStore({ initialState, middleware });
};
