import { combineReducers } from 'redux';
import apiReducer from '../lib/apiReducer';
import * as Schema from '../schema';

export default combineReducers({
  locations: apiReducer(Schema.location)
});
