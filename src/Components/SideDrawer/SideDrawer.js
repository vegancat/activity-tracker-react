import React from "react";
import { Link } from "react-router-dom";

import classes from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import logo from "../../assets/logo/logo.png";

const sideDrawer = props => {
    const sideClasses = [classes.SideDrawer];

    if (!props.show) {
        sideClasses.push(classes.Close);
    }
    return (
        <div
            className={sideClasses.join(" ")}
            onClick={props.onSideDrawerHandler}
        >
            <Link to="/" className={classes.LogoContainer}>
                <img className={classes.Logo} src={logo} alt="logo" />
            </Link>
            <div className={classes.NavLinks}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default sideDrawer;
