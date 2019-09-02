import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import * as actions from "./store/actions/index";
import Layout from "./hoc/Layout/Layout";
import Home from "./Components/Home/Home";

const Auth = lazy(() => import("./Containers/Auth/Auth"));
const Terms = lazy(() => import("./Components/StaticPages/Terms/Terms"));
const Logout = lazy(() => import("./Components/Logout/Logout"));
const UserArea = lazy(() => import("./Components/UserArea/UserArea"));
const Contacts = lazy(() =>
    import("./Components/StaticPages/Contacts/Contacts")
);
const BehindScene = lazy(() =>
    import("./Components/StaticPages/BehindScene/BehindScene")
);
const GetStarted = lazy(() =>
    import("./Components/StaticPages/GetStarted/GetStarted")
);

class App extends Component {
    componentDidMount() {
        this.props.checkAuthState(this.props.isChainsNull);
    }

    render() {
        let routes = (
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/home" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/terms" component={Terms} />
                    <Route path="/contacts" component={Contacts} />
                    <Route path="/behind-scene" component={BehindScene} />
                    <Route path="/get-started" component={GetStarted} />
                    <Redirect to="/home" />
                </Switch>
            </Suspense>
        );
        if (this.props.isSignedIn) {
            routes = (
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path="/user" exact component={UserArea} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/terms" component={Terms} />
                        <Route path="/contacts" component={Contacts} />
                        <Route path="/behind-scene" component={BehindScene} />
                        <Route path="/get-started" component={GetStarted} />
                        <Redirect to="/user" />
                    </Switch>
                </Suspense>
            );
        }

        return <Layout>{routes}</Layout>;
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.idToken !== null,
        isChainsNull: state.chains.chains === null
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState: isChainsNull =>
            dispatch(actions.checkAuthState(isChainsNull))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
