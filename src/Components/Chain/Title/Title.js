import React from "react";

import classes from "./Title.module.css";

const title = props => {
    let title = (
        <div className={classes.Title} style={{ backgroundColor: props.color }}>
            {props.title}
        </div>
    );
    if (props.title.length > 10) {
        title = (
            <div
                className={classes.Title}
                style={{ backgroundColor: props.color }}
            >
                <div>{props.title.slice(0, 11)}</div>
                <div>{props.title.slice(11)}</div>
            </div>
        );
    }
    return title;
};

export default title;
