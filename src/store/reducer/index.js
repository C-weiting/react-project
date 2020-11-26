import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';
import message from './message';
import client from './client';

const rootReducer = combineReducers({
  counter,
  userInfo,
  message,
  client
});

export default rootReducer;
