import React from "react";

import classes from "./Home.module.css";
import SignIn from "../../Containers/Auth/SignIn/SignIn";

import kafka from "../../assets/images/faces/kafka_face.jpg";
import clinton from "../../assets/images/faces/bill_clinton_face.jpg";
import truman from "../../assets/images/faces/truman_capote_face.jpg";

const home = props => {
    return (
        <div className={classes.Container}>
            <SignIn />
            <div className={classes.IntroBackground}>
                Welcome to activity tracker!
            </div>
            <div className={classes.Description}>
                <h1 className={classes.Title}>What it is ?</h1>
                <p className={classes.Text}>
                    Chains.cc is an online motivational tool based on the "don't
                    break the chain" method that helps you build good habits and
                    break bad ones. Each day you complete a task you want to
                    keep up, a visual streak grows. The streak will grow longer
                    with each day and soon your main motivation is to keep the
                    chain from breaking. You can choose from several fun skins
                    to match your activity and join groups to find motivation
                    from other users.
                </p>

                <br />
                <h2 className={classes.Title}>What They say:</h2>
                <div className={classes.Peoples}>
                    <div className={classes.People}>
                        <div className={classes.People__Intro}>
                            <div className={classes.People_Image}>
                                <img src={kafka} />
                            </div>
                            <div className={classes.People__Name}>Kafka</div>
                        </div>
                        <div className={classes.People__Message__Container}>
                            <p className={classes.People__Message}>
                                I was in trouble with procastination and
                                activity tracker was my jesus in writing and
                                abandoning bad habits 😃
                            </p>
                        </div>
                    </div>
                    <div className={classes.People}>
                        <div className={classes.People__Intro}>
                            <div className={classes.People_Image}>
                                <img src={clinton} />
                            </div>
                            <div className={classes.People__Name}>Clinton</div>
                        </div>
                        <div className={classes.People__Message__Container}>
                            <p className={classes.People__Message}>
                                I was in White house 🏛 and my wife was in
                                "around the world" tour and I found{" "}
                                <strong>activity tracker</strong> right in
                                there, to abandon a really bad habit, I mean
                                checking her profile pictures
                            </p>
                        </div>
                    </div>
                    <div className={classes.People}>
                        <div className={classes.People__Intro}>
                            <div className={classes.People_Image}>
                                <img src={truman} />
                            </div>
                            <div className={classes.People__Name}>Truman</div>
                        </div>
                        <div className={classes.People__Message__Container}>
                            <p className={classes.People__Message}>
                                It's amazing and minimal and great and ... like
                                all of my writings. peace✌
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default home;
