import * as actionTypes from '../action-types';

const action = {
  addUserInfo(userInfo) {
    return { type: actionTypes.ADD_USER_INFO, data: userInfo };
  },
};

export default action;
