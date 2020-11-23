import * as actionTypes from '../action-types';

function reducer (state = { cacheMessageList: [], pushMessageList: [] }, action) {
    switch (action.type) {
        case actionTypes.GET_CACHE_MESSAGELIST:
            return { ...state, cacheMessageList: action.payload };
        case actionTypes.PUSH_MESSAGE:
            return { ...state, pushMessageList: [...state.pushMessageList, action.payload] };
        case actionTypes.READ_MESSAGE:
            let cacheMessageIndex = state.cacheMessageList.findIndex((item)=>{
                return item.messageId === action.payload
            })
            
            let pushMessageIndex = state.pushMessageList.findIndex((item)=>{
                return item.messageId === action.payload
            })

            if(cacheMessageIndex > -1) {
                state.cacheMessageList[cacheMessageIndex].isRead = true;
                return { ...state, cacheMessageList: [...state.cacheMessageList] };
            }

            if(pushMessageIndex > -1) {
                state.pushMessageList[pushMessageIndex].isRead = true;
                return { ...state, pushMessageList: [...state.pushMessageList] };
            }
            break;
        default:
            return state;
    }
}

export default reducer;