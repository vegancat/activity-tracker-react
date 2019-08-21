import * as actionTypes from "../actions/actionTypes";

const initialState = {
    localZone: null,
    timeZones: null,
    idToken: null,
    localId: null,
    username: null,
    firebaseId: null
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
                localId: action.userData.userId,
                username: action.userData.username
            };
        case actionTypes.SIGN_IN_SUCCEED: {
            return {
                ...state,
                localZone: action.localZone,
                idToken: action.idToken,
                localId: action.localId,
                username: action.username,
                firebaseId: action.firebaseId
            };
        }

        case actionTypes.RE_SIGN_IN:
            return {
                ...state,
                localZone: action.localZone,
                idToken: action.idToken,
                localId: action.localId,
                username: action.username,
                firebaseId: action.firebaseId
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                idToken: null,
                localId: null,
                username: null,
                localZone: null,
                firebaseId: null
            };
        default:
            return state;
    }
};

export default reducer;
