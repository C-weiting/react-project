import * as actionTypes from '../action-types';

function reducer (state = { cacheMessageList: [], pushMessageList: [] }, action) {
    switch (action.type) {
        case actionTypes.GET_CACHE_MESSAGELIST:
            return { ...state, cacheMessageList: action.payload };
        case actionTypes.PUSH_MESSAGE:
            return { ...state, pushMessageList: [...state.pushMessageList, action.payload] };
        case actionTypes.CLEAR_MESSAGELIST:
            return { cacheMessageList: [], pushMessageList: [] };
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
        case actionTypes.SET_MEG_REMOVE:
            let cacheMessageRemoveIndex = state.cacheMessageList.findIndex((item)=>{
                return item.messageId === action.payload
            })
            
            let pushMessageRemoveIndex = state.pushMessageList.findIndex((item)=>{
                return item.messageId === action.payload
            })
            
            if(cacheMessageRemoveIndex > -1) {
                state.cacheMessageList[cacheMessageRemoveIndex].isRemove = true;
                return { ...state, cacheMessageList: [...state.cacheMessageList] };
            }

            if(pushMessageRemoveIndex > -1) {
                state.pushMessageList[pushMessageRemoveIndex].isRemove = true;
                return { ...state, pushMessageList: [...state.pushMessageList] };
            }
            break;
        default:
            return state;
    }
}

export default reducer;