import React from "react";

import classes from "./SideBar.module.css";

const sideBar = props => {
    const sideBarClasses = [classes.SideBar];
    if (!props.show) {
        sideBarClasses.push(classes.Hide);
    }
    return (
        <div className={sideBarClasses.join(" ")}>
            <div>stickers</div>
            <div>stickers</div>
            <div>stickers</div>
        </div>
    );
};

export default sideBar;
