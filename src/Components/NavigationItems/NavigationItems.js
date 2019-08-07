import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => {
    return (
        <nav>
            <ul className={classes.NavigationItems}>
                <NavigationItem path="/auth">Authentication</NavigationItem>
                <NavigationItem path="/logout">Logout</NavigationItem>
            </ul>
        </nav>
    );
};

export default navigationItems;
