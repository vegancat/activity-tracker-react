import React from "react";
import { Link } from "react-router-dom";

import classes from "./Footer.module.css";

const footer = props => {
    return (
        <footer className={classes.Footer}>
            <nav>
                <ul>
                    <li>
                        <Link to="/auth">Authentication</Link>
                    </li>
                    <li>
                        <Link to="/terms">Terms of use</Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
};

export default footer;
