import React from "react";

import classes from "./Title.module.css";
import AddChainForm from "../../../Components/AddChainForm/AddChainForm";
import EditIcon from "../../../assets/icons/pencil.svg";

const title = props => {
    let title = props.title;

    if (props.title.length > 10) {
        title = (
            <>
                <div>{props.title.slice(0, 11)}</div>
                <div>{props.title.slice(11)}</div>
            </>
        );
    }
    return (
        <div className={classes.Title} style={{ backgroundColor: props.color }}>
            <AddChainForm
                showForm={props.showEditForm}
                addChainForm={props.addChainForm}
                activeColor={props.activeColor}
                chainColors={props.chainColors}
                onSubmitAddChainForm={props.onEditChain}
                onDeleteChain={props.onDeleteChain}
                onFormColorChange={props.onFormColorChange}
                onChainNameChange={props.onChainNameChange}
                onBackDrop={props.onBackDrop}
                type="edit"
            />
            <div className={classes.EditIconContainer} onClick={props.showForm}>
                {
                    <img
                        src={EditIcon}
                        className={classes.EditIcon}
                        alt="edit icon"
                    />
                }
            </div>
            {title}
        </div>
    );
};

export default title;
