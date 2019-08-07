import React from "react";

import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import classes from "./Header.module.css";

const header = props => {
    return (
        <div className={classes.Header}>
            <div className={classes.LogoContainer}>
                <div
                    className={classes.ToggleButton}
                    onClick={props.onToggleButton}
                >
                    <ToggleButton />
                </div>
                <div>Logo</div>
            </div>

            <div className={classes.Links}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default header;
