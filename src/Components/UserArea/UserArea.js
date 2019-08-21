import React from "react";

import classes from "./UserArea.module.css";
import MobileView from "../../Containers/Client/Mobile/Mobile";

const userArea = props => {
    return (
        <div className={classes.Container}>
            <div className={classes.MobileView}>
                <MobileView />
            </div>
            <div className={classes.Landscape} />
        </div>
    );
};

export default userArea;
