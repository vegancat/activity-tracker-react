import React from "react";
import { Link } from "react-router-dom";

import classes from "./Terms.module.css";

const term = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.Terms}>
                <h1>Terms of use</h1>
                <p>
                    This service isn't a tough one! I mean we don't use your
                    data and we dont provide a high security for that sooo..
                    please
                    <strong>
                        {" "}
                        DONT put your high risk info in our service
                    </strong>
                    .
                </p>
                <p>after all, it's just a tiny app not an official service.</p>
                <p>
                    so, it should be clear that there is no difference between
                    click on Accept or Deny ;{")"}
                </p>
                <p>Thank you for browsing this app ❤</p>
            </div>
            <div className={classes.ButtonContainer}>
                <Link
                    to="/"
                    className={classes.Button}
                    style={{ background: "#4aeb45" }}
                >
                    Accept
                </Link>
                <Link
                    to="/"
                    className={classes.Button}
                    style={{ background: "#e46858" }}
                >
                    Deny
                </Link>
            </div>
        </div>
    );
};

export default term;
