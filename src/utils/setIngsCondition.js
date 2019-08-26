const setIngsCondition = (list, ings) => {
    for (let i = 0; i < list.length; i++) {
        //
        // calculating new conditons //
        //

        // start of array
        if (i === 0) {
            if (list[0] === false) {
                ings[0].condition = "None";
            } else {
                ings[0].condition = list[1] ? "Start" : "StartEnd";
            }
        }

        // end of array
        else if (i === list.length - 1) {
            if (list[list.length - 1] === false) {
                ings[list.length - 1].condition = "None";
            } else {
                ings[list.length - 1].condition = list[list.length - 2]
                    ? "End"
                    : "StartEnd";
            }
        }

        //among the array
        else {
            if (list[i] === false) {
                ings[i].condition = "None";
            } else {
                if (list[i - 1] && list[i + 1]) {
                    ings[i].condition = "Between";
                } else if (list[i - 1]) {
                    ings[i].condition = "End";
                } else if (list[i + 1]) {
                    ings[i].condition = "Start";
                } else {
                    ings[i].condition = "StartEnd";
                }
            }
        }
    }
    return ings;
};

export default setIngsCondition;
