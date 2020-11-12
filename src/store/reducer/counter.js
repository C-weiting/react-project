import * as actionTypes from '../action-types';

function reducer (state = { count: 0 }, action) {
    switch (action.type) {
        case actionTypes.ADD:
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
}

export default reducer;