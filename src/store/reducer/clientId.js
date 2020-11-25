import * as actionTypes from '../action-types';

function reducer(state = {clientId: ''}, action) {
  switch (action.type) {
    case actionTypes.SET_PUSH_CLIENTID:
      return { ...state, clientId: action.payload };
    default:
      return state;
  }
}

export default reducer;