import React from "react";

import classes from "./Contacts.module.css";
import Contact from "./Contact/Contact";
import Telegram from "../../../assets/logo/telegram.svg";
import Instagram from "../../../assets/logo/instagram.svg";
import Github from "../../../assets/logo/github-logo.svg";

const contacts = () => {
    return (
        <div className={classes.Container}>
            <h1>Contact with Mahdi</h1>
            <div className={classes.Contacts}>
                <Contact
                    info="@mahdi_ftp"
                    logo={Telegram}
                    link="https://telegram.me/mahdi_ftp"
                />
                <Contact
                    info="@mahdi_ftp"
                    logo={Instagram}
                    link="https://www.instagram.com/mahdi_ftp/"
                />
                <Contact
                    info="mmostafavi"
                    logo={Github}
                    link="https://github.com/mmostafavi"
                />
            </div>
        </div>
    );
};

export default contacts;
