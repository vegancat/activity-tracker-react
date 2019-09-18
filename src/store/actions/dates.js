import * as actionTypes from "./actionTypes";
import axios from "axios";

export const initDatesStart = () => {
    return {
        type: actionTypes.INIT_DATES_START
    };
};

export const initDatesSucceed = dates => {
    localStorage.setItem("dates", JSON.stringify(dates));
    return {
        type: actionTypes.INIT_DATES_SUCCEED,
        dates: dates
    };
};

export const initDatesFailed = () => {
    return {
        type: actionTypes.INIT_DATES_FAILED
    };
};

export const createDates = (startDate, timeData, count = 100, dateList) => {
    const currentDayOfWeek = timeData.day_of_week;
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
    for (let i = 0; i < count; i++) {
        let newTime = new Date(startDate.getTime() - i * oneDay);

        let temp = (currentDayOfWeek - i) % 7;

        arrayOfDates.push({
            date: newTime,
            dayOfWeek:
                temp < 0 ? [temp + 7, week[temp + 7]] : [temp, week[temp]],
            dayOfMonth: newTime.getDate(),
            month: [newTime.getMonth(), months[newTime.getMonth()]],
            year: newTime.getFullYear()
        });
    }

    for (let date of arrayOfDates) {
        dateList.push(date);
    }

    return dateList;
};

export const addDatesStart = () => {
    return {
        type: actionTypes.ADD_DATES_START
    };
};

export const addDatesSucceed = () => {
    return {
        type: actionTypes.ADD_DATES_SUCCEED
    };
};

export const addDates = (localZone, count) => {
    return dispatch => {
        axios
            .get(`https://worldtimeapi.org/api/timezone/${localZone}`)
            .then(res => {
                const currentTime = new Date(res.data.datetime);
                const newDateList = createDates(
                    currentTime,
                    res.data,
                    count,
                    []
                );
                dispatch(initDatesSucceed(newDateList));
                dispatch(addDatesStart());
            });
    };
};

export const initDates = localZone => {
    return dispatch => {
        axios
            .get(`https://worldtimeapi.org/api/timezone/${localZone}`)
            .then(res => {
                const currentTime = new Date(res.data.datetime);
                const newDateList = createDates(currentTime, res.data, 100, []);
                dispatch(initDatesSucceed(newDateList));
            });
    };
};
