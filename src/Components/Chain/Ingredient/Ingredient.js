import React, { Component } from "react";

import classes from "./Ingredient.module.css";

class Ingredient extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.condition !== this.props.condition ||
            nextProps.color !== this.props.color
        );
    }

    render() {
        const ingClasses = [classes.Ingredient, classes[this.props.condition]];
        return (
            <div
                className={ingClasses.join(" ")}
                onClick={() => this.props.onIngredientClick(this.props.ingKey)}
                style={{ backgroundColor: this.props.color }}
            />
        );
    }
}

export default Ingredient;
