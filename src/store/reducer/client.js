import * as actionTypes from '../action-types';

function reducer(state = {clientId: '', isUpgrade: '0'}, action) {
  switch (action.type) {
    case actionTypes.SET_PUSH_CLIENTID:
      return { ...state, clientId: action.payload };
    case actionTypes.SET_IS_UPDATE:
        return { ...state, isUpgrade: action.payload };
    default:
      return state;
  }
}

export default reducer;