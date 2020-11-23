import * as actionTypes from '../action-types';

const action = {
  getCacheMessageList(payload) {
    return { type: actionTypes.GET_CACHE_MESSAGELIST, payload };
  },
  pushMessage(payload) {
    return { type: actionTypes.PUSH_MESSAGE, payload };
  }
};

export default action;