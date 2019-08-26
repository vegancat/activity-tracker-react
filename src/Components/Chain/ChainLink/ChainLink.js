import React from "react";
import { Link } from "react-router-dom";

import classes from "./ChainLink.module.css";

const chianLink = props => {
    return (
        <div
            className={classes.Container}
            onClick={() => props.onLinkClick(props.chainKey)}
        >
            <div
                className={classes.Link}
                style={{ backgroundColor: props.color }}
            />
            <div className={classes.Name}>
                {props.name.length > 6
                    ? props.name.slice(0, 6) + "..."
                    : props.name}
            </div>
        </div>
    );
};

export default chianLink;
