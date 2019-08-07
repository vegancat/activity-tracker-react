import React from "react";
import { Link } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = props => {
    return (
        <li>
            <Link to={props.path} className={classes.Link}>
                {props.children}
            </Link>
        </li>
    );
};

export default navigationItem;
