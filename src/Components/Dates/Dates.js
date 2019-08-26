import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";
import classes from "./Dates.module.css";
import DateIn from "./Date/Date";

class Dates extends Component {
    state = {
        dates: null
    };

    componentDidMount() {
        this.props.initDates(this.props.localZone);
    }

    render() {
        let dates = null;
        if (this.props.dates) {
            dates = (
                <div className={classes.Dates}>
                    {this.props.dates.map(date => {
                        return <DateIn key={date.date} date={date} />;
                    })}
                </div>
            );
        }
        return dates;
    }
}

const mapStateToProps = state => {
    return {
        localZone: state.auth.localZone,
        dates: state.dates.dates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initDates: localZone => dispatch(actions.initDates(localZone))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dates);
