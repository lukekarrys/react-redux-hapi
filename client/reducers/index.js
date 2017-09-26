import { combineReducers } from 'redux';
import { transform } from 'lodash';
import apiReducer from '../lib/apiReducer';
import * as Schema from '../schema';

// All exported schemas get set as a top level key on state
export default combineReducers(transform(Schema, (res, value) => {
  res[value.key] = apiReducer(value);
}, {}));
