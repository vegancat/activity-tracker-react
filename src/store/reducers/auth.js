import * as actionTypes from "../actions/actionTypes";

const initialState = {
    localZone: null,
    timeZones: null,
    idToken: null,
    localId: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TIME_ZONES:
            return {
                ...state,
                timeZones: action.timeZones
            };

        case actionTypes.SIGN_UP_SUCCEED:
            return {
                ...state,
                localZone: action.userData.localZone,
                idToken: action.userData.idToken,
                localId: action.userData.userId
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                idToken: null,
                localId: null
            };
        default:
            return state;
    }
};

export default reducer;
