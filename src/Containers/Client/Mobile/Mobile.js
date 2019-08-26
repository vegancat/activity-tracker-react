import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Mobile.module.css";
import * as actions from "../../../store/actions/index";
import checkValidity from "../../../utils/checkValidity";
import Dates from "../../../Components/Dates/Dates";
import ChainLink from "../../../Components/Chain/ChainLink/ChainLink";
import SelectedChain from "./SelectedChain/SelectedChain";
import Title from "../../../Components/Chain/Title/Title";
import AddChainForm from "../../../Components/AddChainForm/AddChainForm";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import chainCartoon from "../../../assets/images/chain/link.svg";

class Mobile extends Component {
    state = {
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
        activeColor: "rgba(6,136,204,0.8)",
        selectedChain: null
    };

    render() {
        console.log(this.props.showSignInForm);
        let selectedChain = null;
        if (this.state.selectedChain) {
            selectedChain = (
                <>
                    <div className={classes.Title}>
                        <Title
                            title={
                                this.props.chains[this.state.selectedChain].name
                            }
                            color={
                                this.props.chains[this.state.selectedChain]
                                    .color
                            }
                        />
                    </div>
                    <div className={classes.SelectedChain}>
                        <SelectedChain
                            ings={
                                this.props.chains[this.state.selectedChain].ings
                            }
                            chainKey={this.state.selectedChain}
                        />
                    </div>
                </>
            );
        }

        let chains = this.props.chains;
        let chainLinks = <div>No chains added yet!</div>;
        if (chains) {
            chainLinks = Object.keys(chains).map(chainKey => {
                return (
                    <ChainLink
                        name={chains[chainKey].name}
                        color={chains[chainKey].color}
                        key={chainKey}
                        chainKey={chainKey}
                        onLinkClick={this.chainLinkClickHandler}
                    />
                );
            });
        }

        let container = (
            <div className={classes.Container}>
                <Spinner />
            </div>
        );

        if (this.props.dates) {
            container = (
                <div className={classes.Container}>
                    <div className={classes.Description}>
                        Please select a chain or create a new one !
                        <div className={classes.ChainCartoonContainer}>
                            <img
                                className={classes.ChainCartoon}
                                src={chainCartoon}
                                alt="chain image"
                            />
                        </div>
                    </div>
                    <AddChainForm
                        showForm={this.props.showSignInForm}
                        addChainForm={this.state.addChainForm}
                        activeColor={this.state.activeColor}
                        chainColors={this.state.chainColors}
                        onSubmitAddChainForm={this.submitAddChainFormHandler}
                        onFormColorChange={this.formColorChangeHandler}
                        onChainNameChange={this.chainNameChangeHandler}
                        onBackDrop={this.backDropHandler}
                    />
                    <div className={classes.SelectChain}>
                        <div className={classes.Chains}>{chainLinks}</div>
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

            let selectChainClasses = [classes.SelectChain];
            if (this.state.selectedChain) {
                selectChainClasses.push(classes.IsSelectedSelectChain);
                container = (
                    <div className={classes.Container}>
                        <AddChainForm
                            showForm={this.props.showSignInForm}
                            addChainForm={this.state.addChainForm}
                            activeColor={this.state.activeColor}
                            chainColors={this.state.chainColors}
                            onSubmitAddChainForm={
                                this.submitAddChainFormHandler
                            }
                            onFormColorChange={this.formColorChangeHandler}
                            onChainNameChange={this.chainNameChangeHandler}
                            onBackDrop={this.backDropHandler}
                        />
                        <div className={classes.DatesChainsContainer}>
                            <div className={classes.LogoContainer}>
                                <img
                                    className={classes.Logo}
                                    src={chainCartoon}
                                    alt="logo"
                                />
                            </div>
                            <div className={classes.Dates}>
                                <Dates />
                            </div>
                            {selectedChain}
                        </div>
                        <div className={selectChainClasses.join(" ")}>
                            <div className={classes.Chains}>{chainLinks}</div>
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
        }

        return container;
    }

    addChainHandler = () => {
        this.props.showForm();
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
        this.props.addChainFormHandler({
            name: this.state.addChainForm.chainName.value,
            color: this.state.activeColor,
            firebaseId: this.props.firebaseId
        });

        // this.setState({ showForm: false });
    };

    chainLinkClickHandler = chainKey => {
        this.setState({
            selectedChain: chainKey
        });

        this.props.initSelectedChainStart();
    };

    backDropHandler = () => {
        this.props.hideForm();
    };
}
const mapStateToProps = state => {
    return {
        firebaseId: state.auth.firebaseId,
        chains: state.chains.chains,
        dates: state.dates.dates,
        showSignInForm: state.chains.showSignInForm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addChainFormHandler: chainConfig =>
            dispatch(actions.addChain(chainConfig)),
        initSelectedChainStart: () =>
            dispatch(actions.initSelectedChainStart()),
        showForm: () => dispatch(actions.showForm()),
        hideForm: () => dispatch(actions.hideForm())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mobile);
