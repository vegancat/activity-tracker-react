import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import classes from "./SignIn.module.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import * as actions from "../../../store/actions/index";

class SignIn extends Component {
    state = {
        form: {
            email: {
                touched: false,
                value: "",
                htmlFor: "email",
                elementConfig: {
                    required: true,
                    name: "email",
                    type: "email",
                    placeholder: "Your E-mail",
                    id: "email"
                }
            },
            password: {
                touched: false,
                value: "",
                htmlFor: "password",
                elementConfig: {
                    required: true,
                    name: "password",
                    type: "password",
                    placeholder: "Your password",
                    id: "password"
                }
            }
        }
    };

    render() {
        let button = (
            <div className={classes.Buttons}>
                <button className={classes.Button}>Sign In</button>
                <div>
                    <Link to="/auth" className={classes.SignUp}>
                        Sign Up
                    </Link>
                </div>
            </div>
        );
        if (this.props.showSpinner) {
            button = (
                <div className={classes.Spinner}>
                    <Spinner />
                </div>
            );
        }
        return (
            <div className={classes.Container}>
                <form
                    className={classes.Form}
                    onSubmit={this.submitFormHandler}
                >
                    {Object.keys(this.state.form).map(formElement => {
                        return (
                            <Aux key={formElement}>
                                <label
                                    htmlFor={
                                        this.state.form[formElement].htmFor
                                    }
                                    className={classes.Label}
                                >
                                    {formElement}
                                </label>
                                <input
                                    {...this.state.form[formElement]
                                        .elementConfig}
                                    value={this.state.form[formElement].value}
                                    onChange={e =>
                                        this.inputChangeHandler(e, formElement)
                                    }
                                    className={classes.Input}
                                />
                            </Aux>
                        );
                    })}
                    {button}
                </form>
            </div>
        );
    }

    inputChangeHandler = (e, formElement) => {
        const value = e.target.value;
        const updatedstate = {
            ...this.state,
            form: {
                ...this.state.form,
                [formElement]: {
                    ...this.state.form[formElement],
                    value: value,
                    touched: true
                }
            }
        };

        this.setState({ form: updatedstate.form });
    };

    submitFormHandler = e => {
        e.preventDefault();
        this.props.submitFormHandler({
            email: this.state.form.email.value,
            password: this.state.form.password.value
        });
    };
}

const mapStateToProps = state => {
    return {
        showSpinner: state.auth.showSpinner
    };
};

const mapDispatchToProps = dispatch => {
    return {
        submitFormHandler: signInData => dispatch(actions.signIn(signInData))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);
