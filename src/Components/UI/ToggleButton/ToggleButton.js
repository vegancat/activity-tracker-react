import React from "react";

import classes from "./ToggleButton.module.css";

const toggleButton = () => {
    return (
        <div className={classes.ToggleButton}>
            <div className={classes.Slice} />
            <div className={classes.Slice} />
            <div className={classes.Slice} />
        </div>
    );
};

export default toggleButton;
