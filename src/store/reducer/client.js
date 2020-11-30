import * as actionTypes from '../action-types';
const initState = {
  clientId: '', 
  isUpgrade: '0',
  networkStatus: 1 // 1,有网络 0,网络断开
}

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_PUSH_CLIENTID:
      return { ...state, clientId: action.payload };
    case actionTypes.SET_IS_UPDATE:
        return { ...state, isUpgrade: action.payload };
    case actionTypes.GET_NETWORK_STATUS:
      return { ...state, networkStatus: parseInt(action.payload) };
    default:
      return state;
  }
}

export default reducer;