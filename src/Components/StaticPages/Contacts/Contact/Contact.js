import React from "react";

import classes from "./Contact.module.css";

const contact = props => {
    return (
        <div className={classes.Contact}>
            <a
                className={classes.LogoContainer}
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={props.logo} className={classes.Logo} alt="logo" />
            </a>
            <div className={classes.Info}>{props.info}</div>
        </div>
    );
};

export default contact;
