import * as actionTypes from "../actions/actionTypes";

const initialState = {
    dates: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_DATES_SUCCEED:
            return {
                ...state,
                dates: action.dates
            };
        default:
            return state;
    }
};

export default reducer;
