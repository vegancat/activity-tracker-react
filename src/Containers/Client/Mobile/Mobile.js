import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import classes from "./Mobile.module.css";
import * as actions from "../../../store/actions/index";
import Dates from "../../Dates/Dates";
import Modal from "../../../Components/UI/Modal/Modal";
import BackDrop from "../../../Components/UI/BackDrop/BackDrop";
import checkValidity from "../../../utils/checkValidity";

class Mobile extends Component {
    state = {
        showForm: false,
        chainSelected: false,
        addChainForm: {
            chainName: {
                value: "",
                valid: false,
                elementConfig: {
                    type: "text",
                    id: "chain-name",
                    placeholder: "Chain's name"
                },
                validation: {
                    isChainName: true
                }
            },
            chainColor: ""
        },
        chainColors: [
            "rgba(6,136,204,0.8)",
            "rgba(146,6,204,0.8)",
            "rgba(6,204,108,0.8)",
            "rgba(193,168,3,0.8)",
            "rgba(200,13,70,0.8)"
        ],
        activeColor: "rgba(6,136,204,0.8)"
    };

    render() {
        let form = null;
        if (this.state.showForm) {
            form = (
                <Fragment>
                    <BackDrop show={this.state.showForm} />
                    <Modal show={this.state.showForm}>
                        <form
                            className={classes.AddChainForm}
                            onSubmit={this.submitAddChainFormHandler}
                        >
                            <input
                                className={classes.ChainName}
                                {...this.state.addChainForm.chainName
                                    .elementConfig}
                                value={this.state.addChainForm.chainName.value}
                                onChange={this.chainNameChangeHandler}
                            />
                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: "2rem",
                                    fontFamily: '"Open Sans", sans-serif',
                                    fontSize: "1.4rem"
                                }}
                            >
                                Color :
                            </div>
                            <div className={classes.ChainColors}>
                                {this.state.chainColors.map(color => {
                                    let colorClasses = [classes.ChainColor];
                                    if (color === this.state.activeColor) {
                                        colorClasses.push(classes.ActiveColor);
                                    }
                                    return (
                                        <div
                                            onClick={() =>
                                                this.formColorChangeHandler(
                                                    color
                                                )
                                            }
                                            style={{ backgroundColor: color }}
                                            className={colorClasses.join(" ")}
                                            key={color}
                                        />
                                    );
                                })}
                            </div>
                            <button
                                className={classes.AddChainSubmitButton}
                                style={{
                                    border: `2px solid ${
                                        this.state.activeColor
                                    }`,
                                    backgroundColor: this.state.activeColor
                                }}
                                disabled={
                                    !this.state.addChainForm.chainName.valid
                                }
                            >
                                Add
                            </button>
                        </form>
                    </Modal>
                </Fragment>
            );
        }
        return (
            <div className={classes.Container}>
                {form}
                <div className={classes.DatesChainsContainer}>
                    <Dates />
                </div>
                <div className={classes.SelectChain}>
                    <div className={classes.Chains}>chains</div>
                    <div
                        className={classes.SelectButtonContainer}
                        onClick={this.addChainHandler}
                    >
                        <div className={classes.SelectButton}>
                            <div className={classes.PlusSign}>+</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    addChainHandler = () => {
        this.setState({ showForm: true });
    };

    chainNameChangeHandler = e => {
        const value = e.target.value;
        let updatedChainName = { ...this.state.addChainForm.chainName };
        updatedChainName.value = value;
        updatedChainName.valid = checkValidity(
            value,
            updatedChainName.validation
        );

        this.setState({
            addChainForm: {
                ...this.state.AddChainForm,
                chainName: { ...updatedChainName }
            }
        });
    };

    formColorChangeHandler = color => {
        this.setState({ activeColor: color });
    };

    submitAddChainFormHandler = e => {
        e.preventDefault();
        console.log(this.props.firebaseId);
        this.props.addChainFormHandler({
            name: this.state.addChainForm.chainName.value,
            color: this.state.activeColor,
            firebaseId: this.props.firebaseId
        });
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addChainFormHandler: chainConfig =>
            dispatch(actions.addChain(chainConfig))
    };
};

const mapStateToProps = state => {
    return {
        firebaseId: state.auth.firebaseId
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mobile);
