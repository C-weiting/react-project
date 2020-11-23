import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';
import message from './message';

const rootReducer = combineReducers({
  counter,
  userInfo,
  message
});

export default rootReducer;
