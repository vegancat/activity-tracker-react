import React from "react";

import classes from "./BehindScene.module.css";
import Mahdi from "../../../assets/images/faces/mahdi-tiny.jpg";

const behindScene = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.Title}>Behind the Scene!</div>

            <div className={classes.Paragraphs}>
                <div className={classes.FaceContainer}>
                    <img
                        src={Mahdi}
                        className={classes.Face}
                        alt="developer's face"
                    />
                </div>
                <p className={classes.Paragraph}>
                    The boy behind this app is... is... <strong>Mahdi</strong>,
                    but wait! you dont even know him so let me give you a little
                    more information:
                </p>
                <p className={classes.Paragraph}>
                    Mahdi loves the{" "}
                    <strong>
                        nature, cats, science, Space, computers, DNA, evolution,
                        books, dance, adventures and himself
                        <span role="img" aria-label="cool">
                            😎
                        </span>
                    </strong>
                </p>
                <p className={classes.Paragraph}>
                    He is really <strong>curious</strong> and this helped him
                    alot in his life.{" "}
                    <strong>
                        in the seeking of solutions for his problems, in
                        learning new things and etc.
                    </strong>
                </p>
                <p className={classes.Paragraph}>"Towel and my clothes !!!"</p>
                <p className={classes.Paragraph}>
                    He is in bathroom right now and I'm typing what he's telling
                    me , oh he says this app is just a tiny one I'll develop
                    bi... . hmm I closed the bathroom's door he always repeats
                    those dreams. I will write about them when he made those
                    real.
                </p>

                <p className={classes.Paragraph}>
                    Now I can hardly hear that he says "Wish you the best dear
                    visitor, contact with me if you have something to say or to
                    do with me ❤ ".
                </p>
            </div>
        </div>
    );
};

export default behindScene;
