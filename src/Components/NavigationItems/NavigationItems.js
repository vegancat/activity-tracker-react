import React from "react";
import { connect } from "react-redux";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
    let navItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem path="/auth">Sign up</NavigationItem>
            <NavigationItem path="/get-started">Get Started</NavigationItem>
            <NavigationItem path="/home">Home</NavigationItem>
        </ul>
    );
    if (props.loggedIn) {
        navItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem path="/get-started">Get Started</NavigationItem>
                <NavigationItem path="/logout">Logout</NavigationItem>
                <NavigationItem path="/user">Chains</NavigationItem>
            </ul>
        );
    }
    return <nav className={classes.Nav}>{navItems}</nav>;
};

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.idToken !== null
    };
};

export default connect(mapStateToProps)(navigationItems);
