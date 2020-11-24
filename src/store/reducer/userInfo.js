import * as actionTypes from '../action-types';

function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.ADD_USER_INFO:
      return { ...state, ...action.data };
    case actionTypes.CLEAR_USER_INFO:
      return {};
    default:
      return state;
  }
}

export default reducer;
