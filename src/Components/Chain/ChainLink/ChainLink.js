import React from "react";

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
                {props.name.length > 5
                    ? props.name.slice(0, 5) + "..."
                    : props.name}
            </div>
        </div>
    );
};

export default chianLink;
