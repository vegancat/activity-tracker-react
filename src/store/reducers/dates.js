import * as actionTypes from "../actions/actionTypes";

const initialState = {
    dates: null,
    shouldAddDates: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_DATES_SUCCEED:
            return {
                ...state,
                dates: action.dates
            };
        case actionTypes.ADD_DATES_START:
            return {
                ...state,
                shouldAddDates: true
            };
        case actionTypes.ADD_DATES_SUCCEED:
            return {
                ...state,
                shouldAddDates: false
            };
        default:
            return state;
    }
};

export default reducer;
