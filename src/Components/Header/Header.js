import React from "react";
import { Link } from "react-router-dom";

import NavigationItems from "../NavigationItems/NavigationItems";
import ToggleButton from "../UI/ToggleButton/ToggleButton";
import classes from "./Header.module.css";
import Logo from "../../assets/images/logo/logo_transparent.png";

const header = props => {
    return (
        <div className={classes.Header}>
            <div className={classes.LogoContainer}>
                <div
                    className={classes.ToggleButton}
                    onClick={props.onToggleButton}
                >
                    <ToggleButton />
                </div>
                <div className={classes.LogoMainContainer}>
                    <Link to="/" className={classes.LogoLink}>
                        <img src={Logo} className={classes.Logo} />
                    </Link>
                </div>
            </div>

            <div className={classes.Links}>
                <NavigationItems />
            </div>
        </div>
    );
};

export default header;
