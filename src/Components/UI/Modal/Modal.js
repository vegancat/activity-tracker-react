import React from "react";

import Aux from "../../../hoc/Auxilliary/Auxilliary";
import classes from "./Modal.module.css";

const modal = props => {
    const classArray = [classes.Modal];
    if (props.show) {
        classArray.push(classes.Open);
    }

    return (
        <Aux>
            <div className={classArray.join(" ")}>{props.children}</div>
        </Aux>
    );
};

export default modal;
