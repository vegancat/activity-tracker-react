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
import Plus from "../../../assets/icons/plus.svg";

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
            }
        },
        chainColors: [
            "rgba(6,136,204,0.8)",
            "rgba(146,6,204,0.8)",
            "rgba(6,204,108,0.8)",
            "rgba(193,168,3,0.8)",
            "rgba(200,13,70,0.8)"
        ],
        activeColor: "rgba(6,136,204,0.8)",
        selectedChain: null,
        ingsCount: 100
    };

    render() {
        let selectedChain = null;
        if (this.state.selectedChain) {
            selectedChain = (
                <>
                    <div className={classes.Title}>
                        <Title
                            showEditForm={this.props.showEditForm}
                            showForm={this.props.editFormShow}
                            addChainForm={this.state.addChainForm}
                            activeColor={this.state.activeColor}
                            chainColors={this.state.chainColors}
                            onFormColorChange={this.formColorChangeHandler}
                            onChainNameChange={this.chainNameChangeHandler}
                            onBackDrop={this.editFormCloseHandler}
                            onEditChain={this.onEditChain}
                            onDeleteChain={this.deleteChainHandler}
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
                            dates={this.props.dates}
                            count={this.state.ingsCount}
                        />
                    </div>
                </>
            );
        }

        let chains = this.props.chains;
        let chainLinks = (
            <div
                style={{
                    fontFamily: "Open Sans,sans-serif",
                    fontSize: "1.2rem",
                    marginLeft: "2.5rem"
                }}
            >
                No chains added yet!
            </div>
        );
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
                <div className={classes.ChainBackground}>
                    <div className={classes.Description}>
                        <h2>Welcome Dear {this.props.username}</h2>
                        Please select a chain or create a new one !
                        <div className={classes.ChainCartoonContainer}>
                            <img
                                className={classes.ChainCartoon}
                                src={chainCartoon}
                                alt="chain"
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
                        type="add"
                    />
                    <div className={classes.SelectChain}>
                        <div className={classes.Chains}>{chainLinks}</div>
                        <div
                            className={classes.SelectButtonContainer}
                            onClick={this.addChainHandler}
                        >
                            <div className={classes.SelectButton}>
                                <img
                                    className={classes.PlusSign}
                                    src={Plus}
                                    alt="plus sign"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );

            let selectChainClasses = [classes.SelectChain];
            if (this.state.selectedChain) {
                selectChainClasses.push(classes.SelectChainSelected);
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
                            type="add"
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
                                <Dates
                                    count={this.state.ingsCount}
                                    dates={this.props.dates}
                                />
                            </div>
                            {selectedChain}
                        </div>
                        <button
                            className={classes.ShowMore}
                            onClick={this.ShowMoreHandler}
                        >
                            Show More
                        </button>
                        <div className={selectChainClasses.join(" ")}>
                            <div className={classes.Chains}>{chainLinks}</div>
                            <div
                                className={classes.SelectButtonContainer}
                                onClick={this.addChainHandler}
                            >
                                <div className={classes.SelectButton}>
                                    <img
                                        className={classes.PlusSign}
                                        src={Plus}
                                        alt="plus sign"
                                    />
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

        this.setState(prevState => {
            return {
                addChainForm: {
                    ...prevState.addChainForm,
                    chainName: {
                        ...prevState.addChainForm.chainName,
                        value: ""
                    }
                }
            };
        });
    };

    chainLinkClickHandler = chainKey => {
        this.setState({
            selectedChain: chainKey,
            ingsCount: 100
        });

        this.props.initSelectedChainStart();
    };

    backDropHandler = () => {
        this.props.hideForm();
    };

    ShowMoreHandler = () => {
        this.props.addDates(
            this.props.localZone,
            this.props.dates.length + 100
        );
        this.setState({ ingsCount: this.state.ingsCount + 100 });
    };

    onEditChain = e => {
        e.preventDefault();
        const updatedChain = {
            chainKey: this.state.selectedChain,
            name: this.state.addChainForm.chainName.value,
            color: this.state.activeColor
        };
        this.props.editChain(
            updatedChain,
            this.props.chains,
            this.props.firebaseId
        );

        this.setState(prevState => {
            return {
                addChainForm: {
                    ...prevState.addChainForm,
                    chainName: {
                        ...prevState.addChainForm.chainName,
                        value: ""
                    }
                }
            };
        });
    };

    editFormCloseHandler = () => {
        this.props.editFormClose();
    };

    editFormShowHandler = () => {
        this.props.editFormShow();
    };

    deleteChainHandler = () => {
        console.log("hello");
        this.props.deleteChain(
            this.state.selectedChain,
            this.props.chains,
            this.props.firebaseId
        );

        this.setState({ selectedChain: "" });
    };
}
const mapStateToProps = state => {
    return {
        firebaseId: state.auth.firebaseId,
        chains: state.chains.chains,
        dates: state.dates.dates,
        showSignInForm: state.chains.showSignInForm,
        localZone: state.auth.localZone,
        username: state.auth.username,
        showEditForm: state.chains.showEditForm
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addChainFormHandler: chainConfig =>
            dispatch(actions.addChain(chainConfig)),
        initSelectedChainStart: () =>
            dispatch(actions.initSelectedChainStart()),
        showForm: () => dispatch(actions.showForm()),
        hideForm: () => dispatch(actions.hideForm()),
        addDates: (localZone, count) =>
            dispatch(actions.addDates(localZone, count)),
        editChain: (updatedChain, chains, firebaseId) =>
            dispatch(actions.editChain(updatedChain, chains, firebaseId)),
        editFormClose: () => dispatch(actions.hideEditForm()),
        editFormShow: () => dispatch(actions.showEditForm()),
        deleteChain: (selectedChain, chains, firebaseId) =>
            dispatch(actions.deleteChain(selectedChain, chains, firebaseId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mobile);
