import React from "react";

import classes from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = props => {
    const sideClasses = [classes.SideDrawer];

    if (!props.show) {
        sideClasses.push(classes.Close);
    }
    return (
        <div
            className={sideClasses.join(" ")}
            onClick={props.onSideDrawerHandler}
        >
            <div className={classes.Logo}>Logo</div>
            <div className={classes.NavLinks}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default sideDrawer;
