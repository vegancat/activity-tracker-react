import React from "react";

import classes from "./UserArea.module.css";
import SignIn from "../../Containers/Auth/SignIn/SignIn";

const userArea = props => {
    return (
        <div className={classes.Container}>
            <SignIn />
        </div>
    );
};

export default userArea;
