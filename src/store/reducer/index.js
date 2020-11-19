import { combineReducers } from 'redux';
import counter from './counter';
import userInfo from './userInfo';

const rootReducer = combineReducers({
  counter,
  userInfo,
});

export default rootReducer;
