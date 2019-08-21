import * as actionTypes from "./actionTypes";
import axios from "axios";

export const convertToColor = (dates, chainId) => {
    let lenghts = [];

    let max = 0;
    for (let i = 0; i < dates.lenghts; i++) {
        if (dates[i] === 0) {
            if (max !== 0) {
                lenghts.push(max);
            }
            max = 0;
            lenghts.push(0);
        } else {
            max++;
        }
    }

    return {
        type: actionTypes.CONVERT_TO_COLOR,
        lenghts,
        chainId
    };
};

//add chain
export const addChainStart = () => {
    return {
        type: actionTypes.ADD_CHAIN_START
    };
};

export const addChainSucceed = () => {
    return {
        type: actionTypes.ADD_CHAIN_SUCCEED
    };
};

export const addChainFailed = () => {
    return {
        type: actionTypes.ADD_CHAIN_FAILED
    };
};

export const addChain = chainConfig => {
    return dispatch => {
        axios
            .post(
                `https://activity-checker.firebaseio.com/users/${
                    chainConfig.firebaseId
                }/chains.json`,
                {
                    name: chainConfig.name,
                    color: chainConfig.color,
                    ingredients: null
                }
            )
            .then(res => {
                dispatch(addChainSucceed);
            })
            .catch(err => {
                console.log(err);
            });
    };
};
