import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chains: null,
    showSpinner: false,
    shouldInitSelectedChain: true,
    showSignInForm: false,
    showEditForm: false
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

        case actionTypes.SHOW_EDIT_FORM:
            return {
                ...state,
                showEditForm: true
            };

        case actionTypes.HIDE_EDIT_FORM:
            return {
                ...state,
                showEditForm: false
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

        case actionTypes.EDIT_CHAIN_START:
            return {
                ...state,
                showSpinner: true
            };

        case actionTypes.EDIT_CHAIN_SUCCEED:
            return {
                ...state,
                chains: action.updatedChains,
                showSpinner: false
            };

        case actionTypes.EDIT_CHAIN_FAILED:
            return {
                ...state,
                showSpinner: false
            };

        case actionTypes.DELETE_CHAIN_START:
            return {
                ...state,
                showSpinner: true
            };

        case actionTypes.DELETE_CHAIN_SUCCEED:
            return {
                ...state,
                showSpinner: false,
                chains: action.updatedChains
            };

        case actionTypes.DELETE_CHAIN_FAILED:
            return {
                ...state,
                showSpinner: false
            };

        default:
            return state;
    }
};

export default reducer;
