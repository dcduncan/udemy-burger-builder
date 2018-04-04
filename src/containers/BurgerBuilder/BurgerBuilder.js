import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';

const BASE_BURGER_PRICE = 4;

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.75,
    meat: 1.25
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: BASE_BURGER_PRICE
    };

    addIngredientHandler = (type) => {
        this.setState((previousState, props) => {
            const updatedIngredients = {
                ...previousState.ingredients
            };
            updatedIngredients[type] = previousState.ingredients[type] + 1;
            const newTotalPrice = previousState.totalPrice + INGREDIENT_PRICES[type];

            return {
                ingredients: updatedIngredients,
                totalPrice: newTotalPrice
            }
        })
    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <p>Total Price: ${this.state.totalPrice}</p>
                <BuildControls
                    addIngredientHandler={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;