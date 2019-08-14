import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";

import classes from "./App.module.css";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Dates from "./Components/Dates/Dates";
import Chains from "./Containers/Chains/Chains";
import Auth from "./Containers/Auth/Auth";
import UserArea from "./Components/UserArea/UserArea";
import Home from "./Components/Home/Home";

class App extends Component {
    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                </Switch>
            </Layout>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch(actions.checkAuthState())
    };
};

export default connect(
    null,
    mapDispatchToProps
)(App);
