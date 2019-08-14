import * as actionTypes from "./actionTypes";

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
