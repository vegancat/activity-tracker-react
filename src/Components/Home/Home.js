import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Home.module.css";
import SignIn from "../../Containers/Auth/SignIn/SignIn";
import kafka from "../../assets/images/faces/kafka_face.jpg";
import clinton from "../../assets/images/faces/bill_clinton_face.jpg";
import truman from "../../assets/images/faces/truman_capote_face.jpg";
import Logo from "../../assets/logo/logo_transparent.png";
import Modal from "../UI/Modal/Modal";
import BackDrop from "../UI/BackDrop/BackDrop";
import * as actions from "../../store/actions/index";

class Home extends Component {
    state = {
        show: false
    };
    render() {
        return (
            <>
                <Modal show={this.props.err !== null}>
                    Email or Password is Invalid
                </Modal>
                <BackDrop
                    show={this.props.err !== null}
                    onBackDropHandler={this.backDropHandler}
                />
                <div className={classes.Container}>
                    <div className={classes.IntroBackground}>
                        Welcome to activity checker!
                        <SignIn />
                    </div>
                    <div className={classes.Description}>
                        <h1 className={classes.Title}>What is it ?</h1>
                        <div className={classes.Text}>
                            <div className={classes.LogoContainer}>
                                <img
                                    src={Logo}
                                    className={classes.Logo}
                                    alt="logo"
                                />
                            </div>
                            <strong>Acticity Checker</strong> is an online
                            motivational tool based on the "
                            <strong>don't break the chain</strong>" method that
                            helps you build good habits and break bad ones. Each
                            day you complete a task you want to keep up, a
                            visual streak grows. The streak will grow longer
                            with each day and soon your main motivation is to
                            keep the chain from breaking.
                            <br />
                            <p className={classes.CoreIdea}>
                                Core idea is from chains.cc
                            </p>
                        </div>

                        <br />
                        <h2 className={classes.Title}>
                            What They say: (
                            <a
                                className={classes.LinkToThey}
                                target="blank"
                                href="https://www.careeraddict.com/top-10-most-famous-procrastinators-in-the-world"
                            >
                                why they?
                            </a>
                            )
                        </h2>
                        <div className={classes.Peoples}>
                            <div className={classes.People}>
                                <div className={classes.People__Intro}>
                                    <div
                                        className={
                                            classes.People_ImageContainer
                                        }
                                    >
                                        <img
                                            src={kafka}
                                            className={classes.People__Image}
                                            alt="kafka"
                                        />
                                    </div>
                                    <div className={classes.People__Name}>
                                        Kafka
                                    </div>
                                </div>
                                <div
                                    className={
                                        classes.People__Message__Container
                                    }
                                >
                                    <p className={classes.People__Message}>
                                        I was in trouble with focusing and
                                        activity checker was my jesus in writing
                                        and abandoning bad habits{" "}
                                        <span
                                            role="img"
                                            aria-label="smily face"
                                        >
                                            😃
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className={classes.People}>
                                <div className={classes.People__Intro}>
                                    <div
                                        className={
                                            classes.People_ImageContainer
                                        }
                                    >
                                        <img
                                            src={clinton}
                                            className={classes.People__Image}
                                            alt="clinton"
                                        />
                                    </div>
                                    <div className={classes.People__Name}>
                                        Clinton
                                    </div>
                                </div>
                                <div
                                    className={
                                        classes.People__Message__Container
                                    }
                                >
                                    <p className={classes.People__Message}>
                                        I was in White house and my wife was in
                                        "around the world" tour and I found{" "}
                                        <strong>activity checker</strong> right
                                        in there, to abandon a really bad habit,
                                        I mean checking her profile pictures
                                    </p>
                                </div>
                            </div>
                            <div className={classes.People}>
                                <div className={classes.People__Intro}>
                                    <div
                                        className={
                                            classes.People_ImageContainer
                                        }
                                    >
                                        <img
                                            src={truman}
                                            className={classes.People__Image}
                                            alt="truman"
                                        />
                                    </div>
                                    <div className={classes.People__Name}>
                                        Truman
                                    </div>
                                </div>
                                <div
                                    className={
                                        classes.People__Message__Container
                                    }
                                >
                                    <p className={classes.People__Message}>
                                        It's amazing and minimal and great and
                                        ... like all of my writings. peace
                                        <span
                                            role="img"
                                            aria-label="smily face"
                                        >
                                            ✌
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    backDropHandler = () => {
        this.props.clearError();
    };
}

const mapStateToProps = state => {
    return {
        err: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        clearError: () => dispatch(actions.clearError())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
