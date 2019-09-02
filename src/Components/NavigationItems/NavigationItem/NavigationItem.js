import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = props => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink
                to={props.path}
                className={classes.Link}
                activeClassName={classes.Active}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;
