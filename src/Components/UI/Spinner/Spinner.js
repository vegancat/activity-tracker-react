import React from "react";

import classes from "./Spinner.module.css";

const spinner = props => (
    <div className={classes.Container}>
        <div className={classes.Spinner}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);

export default spinner;
