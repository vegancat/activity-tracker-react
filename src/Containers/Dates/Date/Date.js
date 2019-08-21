import React from "react";

import classes from "./Date.module.css";

const date = props => {
    return (
        <div className={classes.Date}>
            <div className={classes.Date__MonthDay}>
                {props.date.month} {props.date.dayOfMonth}
            </div>
            <div className={classes.Date__DayOfWeek}>
                {props.date.dayOfWeek[1]}
            </div>
        </div>
    );
};

export default date;
