import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import Aux from "../../hoc/Auxilliary/Auxilliary";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Auth extends Component {
    state = {
        form: {
            name: {
                touched: false,
                valid: false,
                value: "",
                htmlFor: "name",
                validation: {
                    isUserName: true
                },
                elementConfig: {
                    required: true,
                    name: "name",
                    type: "text",
                    placeholder: "Your Name",
                    id: "name"
                }
            },
            email: {
                touched: false,
                valid: false,
                value: "",
                htmlFor: "email",
                validation: {
                    isEmail: true
                },
                elementConfig: {
                    required: true,
                    name: "email",
                    type: "email",
                    placeholder: "Your E-mail",
                    id: "email"
                }
            },
            localTime: {
                touched: false,
                valid: false,
                htmlFor: "local-time",
                value: "Asia/Tehran",
                validation: {},
                elementConfig: {
                    required: true,
                    name: "local-time",
                    type: "select",
                    id: "local-time"
                }
            },
            password: {
                touched: false,
                valid: false,
                value: "",
                htmlFor: "pass",
                validation: {
                    isPass: true
                },
                elementConfig: {
                    required: true,
                    name: "pass",
                    type: "password",
                    placeholder: "Your Pass",
                    id: "pass"
                }
            },
            confirmPassword: {
                touched: false,
                valid: false,
                value: "",
                htmlFor: "repass",
                validation: {
                    isSame: true
                },
                elementConfig: {
                    required: true,
                    name: "repass",
                    type: "password",
                    placeholder: "Repeat your pass",
                    id: "repass"
                }
            }
        },
        formIsValid: false
    };

    componentDidMount() {
        this.props.fetchZones();
    }

    render() {
        const formElementsArray = Object.keys(this.state.form);
        let form = (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        );
        if (this.props.timeZones !== null) {
            const localTimeSelect = (
                <Aux key="localtimelabel">
                    <label htmlFor="local-time">Local Time-Zone</label>
                    <select
                        {...this.state.form.localTime.elementConfig}
                        value={this.state.form.localTime.value}
                        onChange={e => this.inputChangeHandler(e, "localTime")}
                    >
                        {this.props.timeZones.map(timeZone => {
                            return (
                                <option key={timeZone} value={timeZone}>
                                    {timeZone}
                                </option>
                            );
                        })}
                    </select>
                </Aux>
            );

            form = (
                <div className={classes.Container}>
                    <form
                        className={classes.Form}
                        onSubmit={this.submitHandler}
                    >
                        {formElementsArray.map(formElement => {
                            if (formElement !== "localTime") {
                                const inputClasses = [classes.Input];
                                if (this.state.form[formElement].touched) {
                                    if (this.state.form[formElement].valid) {
                                        inputClasses.push(classes.Valid);
                                    } else {
                                        inputClasses.push(classes.InValid);
                                    }
                                }

                                return (
                                    <Aux key={formElement}>
                                        <label
                                            htmlFor={
                                                this.state.form[formElement]
                                                    .htmlFor
                                            }
                                        >
                                            {formElement}
                                        </label>
                                        <input
                                            {...this.state.form[formElement]
                                                .elementConfig}
                                            value={
                                                this.state.form[formElement]
                                                    .value
                                            }
                                            onChange={e =>
                                                this.inputChangeHandler(
                                                    e,
                                                    formElement
                                                )
                                            }
                                            className={inputClasses.join(" ")}
                                        />
                                    </Aux>
                                );
                            } else {
                                return localTimeSelect;
                            }
                        })}
                        <button
                            className={classes.SignUp}
                            disabled={!this.state.formIsValid}
                        >
                            Sign Up
                        </button>
                        <div className={classes.Description}>
                            <p>
                                1-Your (user)name should be{" "}
                                <strong>
                                    at least 5 characters and not more than 20
                                </strong>
                                . and should not start or end with{" "}
                                <strong>white-space</strong>.
                            </p>
                            <p>
                                2-Your password should Contain{" "}
                                <strong>
                                    at least 8 characters and a digit and a
                                    Capital
                                </strong>{" "}
                                .
                                <br /> (can be more than one capital or digit)
                            </p>
                        </div>
                    </form>
                </div>
            );
        }

        return <Aux>{form}</Aux>;
    }

    inputChangeHandler = (e, formElement) => {
        const value = e.target.value;
        console.log(value);
        const form = {
            ...this.state.form,
            [formElement]: {
                ...this.state.form[formElement],
                touched: true,
                value: value
            }
        };
        form[formElement].valid = this.checkValidty(
            value,
            this.state.form[formElement].validation
        );
        console.log(form[formElement].valid);

        let formIsValid = true;
        for (let key in form) {
            formIsValid = formIsValid && form[key].valid;
        }

        this.setState({ formIsValid: formIsValid, form: form });
    };

    checkValidty = (value, validation) => {
        let isValid = true;

        if (validation.isUserName) {
            const userReg = /^[a-z0-9_\s]{5,20}$/gi;
            const startReg = /^\s|\s$/;
            const result = userReg.test(value) && !startReg.test(value);
            isValid = isValid && result;
        }

        if (validation.isEmail) {
            const emailReg = /^\w+@[a-zA-Z]+\.[a-z]{2,5}$/;
            const result = emailReg.test(value);
            isValid = isValid && result;
        }

        if (validation.isPass) {
            const passReg = /[\w]{8,}/;
            const hasNumReg = /[0-9]+/;
            const hasCapital = /[A-Z]+/;
            const result =
                passReg.test(value) &&
                hasNumReg.test(value) &&
                hasCapital.test(value);
            isValid = isValid && result;
        }

        if (validation.isSame) {
            isValid =
                isValid &&
                this.state.form.password.valid &&
                this.state.form.password.value === value;
        }
        return isValid;
    };

    submitHandler = e => {
        e.preventDefault();
        this.props.signUpUser(
            this.state.form.email.value,
            this.state.form.password.value,
            this.state.form.name.value,
            this.state.form.localTime.value
        );
    };
}

const mapStateToProps = state => {
    return {
        localTime: state.auth.localTime,
        timeZones: state.auth.timeZones
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchZones: () => dispatch(actions.fetchZones()),
        signUpUser: (email, password, username, localZone) =>
            dispatch(
                actions.signUpUser({
                    email: email,
                    password: password,
                    username: username,
                    localZone: localZone
                })
            )
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
