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
        console.log(this.props.count);
        let dates = null;
        if (this.props.dates) {
            dates = (
                <div className={classes.Dates}>
                    {this.props.dates.slice(0, this.props.count).map(date => {
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
        localZone: state.auth.localZone
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
