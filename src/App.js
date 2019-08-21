import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import classes from "./App.module.css";
import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Auth from "./Containers/Auth/Auth";
import UserArea from "./Components/UserArea/UserArea";
import Home from "./Components/Home/Home";

class App extends Component {
    componentDidMount() {
        this.props.checkAuthState();
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Redirect to="/" />
            </Switch>
        );
        if (this.props.isSignedIn) {
            routes = (
                <Switch>
                    <Route path="/user" exact component={UserArea} />
                    <Redirect to="/user" />
                </Switch>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.idToken !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch(actions.checkAuthState())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
