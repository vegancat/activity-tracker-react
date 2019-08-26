const initSelectedChain = (currentIngs, fetchedIngs) => {
    for (let i in currentIngs) {
        let flag = false;
        for (let ii in fetchedIngs) {
            if (fetchedIngs[ii].ingKey === currentIngs[i].ingKey) {
                currentIngs[i] = {
                    ...fetchedIngs[ii]
                };
                flag = true;
                break;
            }
        }
        if (!flag) {
            currentIngs[i] = {
                state: false,
                condition: "None",
                color: "#ccc",
                ingKey: currentIngs[i].ingKey
            };
        }
    }
    return currentIngs;
};

export default initSelectedChain;
