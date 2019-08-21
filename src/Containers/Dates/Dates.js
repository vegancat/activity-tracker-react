import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import classes from "./Dates.module.css";
import DateIn from "./Date/Date";

class Dates extends Component {
    state = {
        dates: null
    };

    componentDidMount() {
        if (this.state.dates === null) {
            axios
                .get(
                    `http://worldtimeapi.org/api/timezone/${
                        this.props.localZone
                    }`
                )
                .then(res => {
                    const currentTime = new Date(res.data.datetime);
                    const currentDayOfWeek = res.data.day_of_week;
                    const arrayOfDates = [];
                    const oneDay = 24 * 60 * 60 * 1000;
                    const week = [
                        "Sunday",
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday"
                    ];

                    const months = [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec"
                    ];
                    for (let i = 0; i < 100; i++) {
                        let newTime = new Date(
                            currentTime.getTime() - i * oneDay
                        );

                        let temp = (currentDayOfWeek - i) % 7;

                        arrayOfDates.push({
                            date: newTime,
                            dayOfWeek:
                                temp < 0
                                    ? [temp + 7, week[temp + 7]]
                                    : [temp, week[temp]],
                            dayOfMonth: newTime.getDate(),
                            month: months[newTime.getMonth()]
                        });
                    }

                    this.setState({ dates: arrayOfDates });
                });
        }
    }

    render() {
        let dates = null;
        if (this.state.dates) {
            dates = (
                <div className={classes.Dates}>
                    {this.state.dates.map(date => {
                        return <DateIn key={date.date.getTime()} date={date} />;
                    })}
                </div>
            );
        }
        return dates;
    }
}

const mapStateToProps = state => {
    return {
        localZone: state.auth.localZone
    };
};

export default connect(mapStateToProps)(Dates);
