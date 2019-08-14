import * as actionTypes from "../actions/actionTypes";

const initialState = {
    chains: {
        chain1: {
            colors: ["blue", "black", "red", "black", "green"],
            lengths: [2, 0, 3, 0, 5]
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CONVERT_TO_COLOR:
            return {
                ...state,
                chains: {
                    ...state.chains,
                    [action.chainId]: {
                        ...state.chains[action.chainId],
                        lengths: action.lengths
                    }
                }
            };
        default:
            return state;
    }
};

export default reducer;
