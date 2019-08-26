import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chains: null,
    showSpinner: false,
    shouldInitSelectedChain: true,
    showSignInForm: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_CHAINS:
            return {
                ...state,
                chains: action.chains
            };

        case actionTypes.SHOW_FORM:
            return {
                ...state,
                showSignInForm: true
            };

        case actionTypes.HIDE_FORM:
            return {
                ...state,
                showSignInForm: false
            };

        case actionTypes.ADD_CHAIN_START:
            return {
                ...state,
                showSpinner: true
            };

        case actionTypes.ADD_CHAIN_SUCCEED:
            return {
                ...state,
                showSpinner: false
            };
        case actionTypes.ADD_CHAIN_FAILED:
            return {
                ...state,
                showSpinner: false
            };
        case actionTypes.INIT_SELECTED_CHAIN_START:
            return {
                ...state,
                shouldInitSelectedChain: true
            };
        case actionTypes.INIT_SELECTED_CHAIN_SUCCEED:
            return {
                ...state,
                shouldInitSelectedChain: false
            };
        case actionTypes.STORE_NEW_CHAIN:
            return {
                ...state,
                chains: action.chains
            };

        case actionTypes.UPDATE_SELECTED_CHAIN:
            return {
                ...state,
                chains: action.updatedChains
            };
        default:
            return state;
    }
};

export default reducer;
