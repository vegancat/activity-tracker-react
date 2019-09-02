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

export const showForm = () => {
    return {
        type: actionTypes.SHOW_FORM
    };
};

export const hideForm = () => {
    return {
        type: actionTypes.HIDE_FORM
    };
};

export const addChain = chainConfig => {
    return dispatch => {
        dispatch(addChainStart());
        axios
            .post(
                `https://activity-checker.firebaseio.com/users/${chainConfig.firebaseId}/chains.json`,
                {
                    name: chainConfig.name,
                    color: chainConfig.color,
                    ings: [
                        {
                            color: "#ccc",
                            condition: "None",
                            state: false,
                            ingKey: "ing2019Aug25"
                        }
                    ]
                }
            )
            .then(res => {
                dispatch(hideForm());
                dispatch(addChainSucceed());
                axios
                    .get(
                        `https://activity-checker.firebaseio.com/users/${chainConfig.firebaseId}/chains.json`
                    )
                    .then(({ data: chains }) => {
                        dispatch(storeNewChain(chains));
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                dispatch(addChainFailed());
            });
    };
};

// init Chains
export const initChains = chains => {
    localStorage.setItem("chains", JSON.stringify(chains));
    return {
        type: actionTypes.INIT_CHAINS,
        chains: chains
    };
};

export const initSelectedChainStart = () => {
    return {
        type: actionTypes.INIT_SELECTED_CHAIN_START
    };
};

export const initSelectedChainSucceed = () => {
    return {
        type: actionTypes.INIT_SELECTED_CHAIN_SUCCEED
    };
};

// store chain
export const storeChain = (firebaseId, chainKey, ings) => {
    return dispatch => {
        axios
            .put(
                `https://activity-checker.firebaseio.com/users/${firebaseId}/chains/${chainKey}/ings.json`,
                ings
            )
            .catch(err => console.log(err));
    };
};

// store new chain
export const storeNewChain = chains => {
    localStorage.setItem("chains", JSON.stringify(chains));
    return {
        type: actionTypes.STORE_NEW_CHAIN,
        chains: chains
    };
};

export const updateSelectedChain = (updatedChain, fetchedChains, chainKey) => {
    const updatedChains = {
        ...fetchedChains,
        [chainKey]: {
            ...fetchedChains[chainKey],
            ings: [...fetchedChains[chainKey].ings]
        }
    };

    for (let i in fetchedChains[chainKey].ings) {
        updatedChains[chainKey].ings[i] = {
            ...fetchedChains[chainKey].ings[i]
        };
    }

    for (let i in updatedChain) {
        let flag = false;
        for (let ii in updatedChains[chainKey].ings) {
            if (
                updatedChains[chainKey].ings[ii].ingKey ===
                updatedChain[i].ingKey
            ) {
                updatedChains[chainKey].ings[ii] = {
                    ...updatedChain[i]
                };
                break;
            }
        }
        if (!flag) {
            updatedChains[chainKey].ings.push(updatedChain[i]);
        }
    }

    localStorage.setItem("chains", JSON.stringify(updatedChains));

    return {
        type: actionTypes.UPDATE_SELECTED_CHAIN,
        updatedChains: updatedChains
    };
};

//edit chain
export const editChainStart = () => {
    return {
        type: actionTypes.EDIT_CHAIN_START
    };
};

export const editChainSucceed = updatedChains => {
    localStorage.setItem("chains", JSON.stringify(updatedChains));
    return {
        type: actionTypes.EDIT_CHAIN_SUCCEED,
        updatedChains: updatedChains
    };
};

export const editChainFailed = () => {
    return {
        type: actionTypes.EDIT_CHAIN_FAILED
    };
};

export const showEditForm = () => {
    return {
        type: actionTypes.SHOW_EDIT_FORM
    };
};

export const hideEditForm = () => {
    return {
        type: actionTypes.HIDE_EDIT_FORM
    };
};

export const editChain = (updatedChain, chains, firebaseId) => {
    return dispatch => {
        const updatedChains = {
            ...chains,
            [updatedChain.chainKey]: { ...chains[updatedChain.chainKey] }
        };
        updatedChains[updatedChain.chainKey].name = updatedChain.name;
        updatedChains[updatedChain.chainKey].color = updatedChain.color;

        dispatch(editChainStart());
        axios
            .put(
                `https://activity-checker.firebaseio.com/users/${firebaseId}/chains.json`,
                updatedChains
            )
            .then(res => {
                dispatch(hideEditForm());
                dispatch(editChainSucceed(updatedChains));
            })
            .catch(err => {
                dispatch(hideEditForm());
                dispatch(editChainFailed());
            });
    };
};

export const deleteChainStart = () => {
    return {
        type: actionTypes.DELETE_CHAIN_START
    };
};

export const deleteChainSucceed = updatedChains => {
    localStorage.setItem("chains", JSON.stringify(updatedChains));
    return {
        type: actionTypes.DELETE_CHAIN_SUCCEED,
        updatedChains: updatedChains
    };
};

export const deleteChainFailed = () => {
    return {
        type: actionTypes.DELETE_CHAIN_FAILED
    };
};

export const deleteChain = (selectedChain, chains, firebaseId) => {
    return dispatch => {
        const updatedKeys = Object.keys(chains).filter(
            key => key !== selectedChain
        );
        const updatedChains = {};
        for (let key of updatedKeys) {
            updatedChains[key] = chains[key];
        }
        dispatch(deleteChainStart());
        axios
            .put(
                `https://activity-checker.firebaseio.com/users/${firebaseId}/chains.json`,
                updatedChains
            )
            .then(res => {
                dispatch(deleteChainSucceed(updatedChains));
            })
            .catch(err => {
                dispatch(deleteChainFailed());
            });
    };
};
