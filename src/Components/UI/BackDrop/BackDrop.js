import React from "react";

import classes from "./BackDrop.module.css";

const backDrop = props => {
    const classArray = [classes.BackDrop];
    if (props.show) {
        classArray.push(classes.Open);
    }

    return (
        <div
            className={classArray.join(" ")}
            onClick={props.onBackDropHandler}
        />
    );
};

export default backDrop;
