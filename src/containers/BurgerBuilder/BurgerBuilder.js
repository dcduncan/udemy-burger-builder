import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildsControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';

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
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false
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

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'DJ',
                address: {
                    street: 'test street 1',
                    zipCode: '30584',
                    country: 'Poland'
                },
                email: 'dcduncan.code@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
            .finally(() => this.setState({
                loading: false,
                purchasing: false
            }));
    };

    getOrderSummaryOrLoading = () => {
        if (this.state.loading) {
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

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {this.getOrderSummaryOrLoading()}
                </Modal>
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
    }
}

export default BurgerBuilder;