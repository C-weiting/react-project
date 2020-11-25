import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';
import message from './message';
import clientId from './clientId';

const rootReducer = combineReducers({
  counter,
  userInfo,
  message,
  clientId
});

export default rootReducer;
