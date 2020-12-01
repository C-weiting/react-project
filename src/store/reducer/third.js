import * as actionTypes from '../action-types';

function reducer (state = { weatherInfo: {} }, action) {
    switch (action.type) {
        case actionTypes.SET_WEATHER_INFO:
            return { ...state, weatherInfo: action.payload };
        default:
            return state;
    }
}

export default reducer;