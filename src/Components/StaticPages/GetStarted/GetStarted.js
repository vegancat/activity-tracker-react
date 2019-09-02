import React from "react";

import classes from "./GetStarted.module.css";
import colorsMeaning from "../../../assets/images/getStarted/colorsMeaning.png";
import addChain from "../../../assets/images/getStarted/addChain.png";
import editChain from "../../../assets/images/getStarted/editChain.png";
import deleteChain from "../../../assets/images/getStarted/deleteChain.png";
import showMore from "../../../assets/images/getStarted/showMore.png";
import myChain from "../../../assets/images/getStarted/myChain.png";

const getStarted = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.SideBar}>
                <h1>Contents</h1>
                <ul>
                    <li>
                        <a href="#colors" className={classes.Link}>
                            Colors
                        </a>
                    </li>
                    <li>
                        <a href="#add-chain" className={classes.Link}>
                            Add chain
                        </a>
                    </li>
                    <li>
                        <a href="#edit-chain" className={classes.Link}>
                            Edit chain
                        </a>
                    </li>
                    <li>
                        <a href="#delete-chain" className={classes.Link}>
                            Delete chain
                        </a>
                    </li>
                    <li>
                        <a href="#more" className={classes.Link}>
                            How to generate more days
                        </a>
                    </li>
                    <li>
                        <a href="#circles" className={classes.Link}>
                            Tap on circles!
                        </a>
                    </li>
                </ul>
            </div>
            <div className={classes.Description}>
                <div className={classes.MainTitle}>Get started</div>
                <section className={classes.Section} id="colors">
                    <h2 className={classes.Title}>Colors</h2>
                    <hr />
                    <div className={classes.Text}>
                        When you click on a circle its color changes to one of
                        four possible color, yellow, green, purple and red.
                        <br />
                        yellow is for weak streaks, green is for medium streaks,
                        purple is for strong streaks and red is for very strong
                        streaks, you can call them habits now!
                        <img
                            className={classes.Image}
                            src={colorsMeaning}
                            alt="colors"
                        />
                    </div>
                </section>
                <section className={classes.Section} id="add-chain">
                    <h2>Add Chain</h2>
                    <hr />
                    <div className={classes.Text}>
                        Every thing that you want to track your activity on it,
                        is chain that you should keep it as long as possible.
                        <br />
                        for adding a chain you should click on plus button in
                        right bottom corner and choose a name and a color for
                        it!
                        <img
                            src={addChain}
                            className={classes.Image}
                            alt="add chain"
                        />
                    </div>
                </section>
                <section className={classes.Section} id="edit-chain">
                    <h2>Edit Chain</h2>
                    <hr />
                    <div className={classes.Text}>
                        you created a chain and now you think its name or color
                        should change!
                        <br />
                        you can simply do that with clicking on Pencil sign in
                        right bottom corner of title of selected chain.
                        <img
                            src={editChain}
                            className={classes.Image}
                            alt="edit chain"
                        />
                    </div>
                </section>
                <section className={classes.Section} id="delete-chain">
                    <h2>Delete Chain</h2>
                    <hr />
                    <div className={classes.Text}>
                        You can delete a chain from your chains same as edit.
                        <br />
                        click on pencil sign and click on delete button.
                        <img
                            src={deleteChain}
                            className={classes.Image}
                            alt="delete chain"
                        />
                    </div>
                </section>
                <section className={classes.Section} id="more">
                    <h2>You need more days !</h2>
                    <hr />
                    <div className={classes.Text}>
                        go to bottom of the chain you should see a "show more"
                        button.
                        <br />
                        if you click on it it generates 100 more days for you to
                        fill them if you need more of them.
                        <img
                            src={showMore}
                            className={classes.Image}
                            alt="more days"
                        />
                    </div>
                </section>
                <section className={classes.Section} id="circles">
                    <h2>Tap on circles!</h2>
                    <hr />
                    <div className={classes.Text}>
                        tap on circles each day and let the chain grows!
                        <br />
                        look at my chain it reached to red color so it seems I'm
                        calm as HELL!
                        <img
                            src={myChain}
                            className={classes.Image}
                            alt="overview"
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default getStarted;
