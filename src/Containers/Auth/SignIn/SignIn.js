import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./SignIn.module.css";
import Aux from "../../../hoc/Auxilliary/Auxilliary";
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
                    <button>Sign In</button>
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

const mapDispatchToProps = dispatch => {
    return {
        submitFormHandler: signInData => dispatch(actions.signIn(signInData))
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SignIn);
