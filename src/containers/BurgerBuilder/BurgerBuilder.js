import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BASE_BURGER_PRICE = 4;

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 1,
    cheese: 0.75,
    meat: 1.25
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    addIngredientHandler = (type) => {
        this.setState((previousState) => {
            const updatedIngredients = {
                ...previousState.ingredients
            };
            updatedIngredients[type] = previousState.ingredients[type] + 1;
            const newTotalPrice = previousState.totalPrice + INGREDIENT_PRICES[type];
            return {
                ingredients: updatedIngredients,
                totalPrice: newTotalPrice,
                purchasable: newTotalPrice > BASE_BURGER_PRICE
            }
        })
    };

    removeIngredientHandler = (type) => {
        this.setState((previousState, props) => {
            const updatedIngredients = {
                ...previousState.ingredients
            };
            updatedIngredients[type] = previousState.ingredients[type] - 1;

            // Don't deduct if empty
            if (updatedIngredients[type] < 0) {
                return;
            }

            const newTotalPrice = previousState.totalPrice - INGREDIENT_PRICES[type];
            return {
                ingredients: updatedIngredients,
                totalPrice: newTotalPrice,
                purchasable: newTotalPrice > BASE_BURGER_PRICE
            }
        })
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        const query =
            Object.entries(this.state.ingredients)
                .map((entry) => encodeURIComponent(entry[0]) + '=' + encodeURIComponent(entry[1]))
                .join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + query
        })
    };

    getOrderSummaryOrLoading = () => {
        if (this.state.loading || !this.state.ingredients) {
            return <Spinner/>
        } else {
            return <OrderSummary
                ingredients={this.state.ingredients}
                cancel={this.purchaseCancelHandler}
                purchase={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}
            />
        }
    };

    componentDidMount = () => {
        axios.get('/ingredients.json')
            .then((response) => {
                this.setState({
                    ingredients: response.data
                })
            }).catch((error) => this.setState({
                error: true
            }));
    };

    getBurgerAndControlsOrSpinnerOrErrorMessage = () => {
        if (this.state.ingredients) {
            const disabledInfo = {
                ...this.state.ingredients
            };

            for (let key in disabledInfo) {
                disabledInfo[key] = disabledInfo[key] === 0;
            }
            return (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        addIngredientHandler={this.addIngredientHandler}
                        removeIngredientHandler={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler} />
                </Aux>
            );
        } else if (this.state.error) {
            return <p>Can't Load Ingredients!!</p>
        } else {
            return <Spinner/>;
        }
    };

    render() {
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.getOrderSummaryOrLoading()}
                </Modal>
                {this.getBurgerAndControlsOrSpinnerOrErrorMessage()}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);