import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';
import message from './message';
import client from './client';
import third from './third';

const rootReducer = combineReducers({
  counter,
  userInfo,
  message,
  client,
  third
});

export default rootReducer;
