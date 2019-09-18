import React, { Fragment } from "react";
import { connect } from "react-redux";

import classes from "./AddChainForm.module.css";
import BackDrop from "../UI/BackDrop/BackDrop";
import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";

const addChainForm = props => {
    let form = null;
    if (props.showForm) {
        let button = props.type === "add" ? "add" : "edit";
        let deleteButton =
            props.type === "add" ? null : (
                <button
                    className={classes.DeleteButton}
                    onClick={() => {
                        props.onDeleteChain();
                        props.onBackDrop();
                    }}
                >
                    Delete
                </button>
            );
        form = (
            <Fragment>
                <BackDrop
                    show={props.showForm}
                    onBackDropHandler={props.onBackDrop}
                />
                <Modal show={props.showForm}>
                    <form
                        className={classes.AddChainForm}
                        onSubmit={props.onSubmitAddChainForm}
                    >
                        <input
                            className={classes.ChainName}
                            {...props.addChainForm.chainName.elementConfig}
                            placeholder={
                                props.type === "edit"
                                    ? "New Name"
                                    : "Chain Name"
                            }
                            value={props.addChainForm.chainName.value}
                            onChange={props.onChainNameChange}
                        />
                        <div
                            style={{
                                textAlign: "center",
                                marginTop: "0.2rem",
                                fontFamily: '"Open Sans", sans-serif',
                                fontSize: "1.4rem"
                            }}
                        >
                            Color :
                        </div>
                        <div className={classes.ChainColors}>
                            {props.chainColors.map(color => {
                                let colorClasses = [classes.ChainColor];
                                if (color === props.activeColor) {
                                    colorClasses.push(classes.ActiveColor);
                                }
                                return (
                                    <div
                                        onClick={() =>
                                            props.onFormColorChange(color)
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
                                border: `2px solid ${props.activeColor}`,
                                backgroundColor: props.activeColor
                            }}
                            disabled={!props.addChainForm.chainName.valid}
                        >
                            {button}
                        </button>
                    </form>
                    {deleteButton}
                </Modal>
            </Fragment>
        );
        if (props.showSpinner) {
            form = (
                <Modal show={props.showForm}>
                    <div className={classes.FormSpinner}>
                        <Spinner />
                    </div>
                </Modal>
            );
        }
    }
    return form;
};

const mapStateToProps = state => {
    return {
        showSpinner: state.chains.showSpinner
    };
};

export default connect(mapStateToProps)(addChainForm);
