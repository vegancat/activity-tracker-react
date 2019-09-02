import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../../store/actions/index";
import Ingredient from "../../../../Components/Chain/Ingredient/Ingredient";
import clickIngredient from "../../../../utils/clickIngredient";
import initSelectedChain from "../../../../utils/initSelectedChain";

class SelectedChain extends Component {
    state = {
        ingredients: null
    };

    componentDidMount() {
        let ingredients = [];
        let ingKey;
        for (let date of this.props.dates.slice(0, this.props.count)) {
            ingKey = `ing${date.year}${date.month[1]}${date.dayOfMonth}`;
            ingredients.push({
                ingKey: ingKey,
                state: false,
                color: "#ccc",
                condition: "None"
            });
        }
        this.setState({
            ingredients: ingredients
        });
    }

    componentDidUpdate() {
        if (this.props.shouldInitChain) {
            let ingredients = [...this.state.ingredients];
            for (let i in ingredients) {
                ingredients[i] = {
                    ...this.state.ingredients[i]
                };
            }

            let updatedIngs = initSelectedChain(ingredients, this.props.ings);
            this.setState({ ingredients: updatedIngs });
            this.props.initSucceed();
        }

        if (this.props.shouldAddDates) {
            let ingredients = [];
            let ingKey;
            for (let date of this.props.dates.slice(0, this.props.count)) {
                ingKey = `ing${date.year}${date.month[1]}${date.dayOfMonth}`;
                ingredients.push({
                    ingKey: ingKey,
                    state: false,
                    color: "#ccc",
                    condition: "None"
                });
            }
            let updatedIngs = initSelectedChain(ingredients, this.props.ings);
            this.setState({ ingredients: updatedIngs });
            this.props.addDatesSucceed();
        }
    }

    render() {
        let ingredients = null;
        if (this.state.ingredients) {
            ingredients = this.state.ingredients
                .slice(0, this.props.count)
                .map(ingredient => {
                    return (
                        <Ingredient
                            key={ingredient.ingKey}
                            ingKey={ingredient.ingKey}
                            color={ingredient.color}
                            condition={ingredient.condition}
                            onIngredientClick={this.ingredientClickHandler}
                        />
                    );
                });
        }
        return ingredients;
    }

    ingredientClickHandler = key => {
        const ingredients = this.state.ingredients;
        const updatedIngredients = clickIngredient(ingredients, key);
        this.props.storeChain(
            this.props.firebaseId,
            this.props.chainKey,
            updatedIngredients
        );
        this.props.updateSelectedChain(
            updatedIngredients,
            this.props.chains,
            this.props.chainKey
        );
        this.setState({ ingredients: updatedIngredients });
    };
}

const mapStateToProps = state => {
    return {
        shouldInitChain: state.chains.shouldInitSelectedChain,
        firebaseId: state.auth.firebaseId,
        chains: state.chains.chains,
        shouldAddDates: state.dates.shouldAddDates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initSucceed: () => dispatch(actions.initSelectedChainSucceed()),
        storeChain: (firebaseId, chianKey, ings) =>
            dispatch(actions.storeChain(firebaseId, chianKey, ings)),
        updateSelectedChain: (updatedChain, fetchedChains, chainKey) =>
            dispatch(
                actions.updateSelectedChain(
                    updatedChain,
                    fetchedChains,
                    chainKey
                )
            ),
        addDatesSucceed: () => dispatch(actions.addDatesSucceed())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedChain);
