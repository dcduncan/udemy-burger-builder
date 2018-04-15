import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {

    state = {
        ingredients: null,
        price: null
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = null;
        for (let entry of query) {
            if (entry[0] === 'price') {
                price = +entry[1];
            } else {
                ingredients[entry[0]] = +entry[1];
            }
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });
    };

    cancelCheckout = () => {
        this.props.history.goBack();
    };

    continueCheckout = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancelCheckout={this.cancelCheckout}
                    continueCheckout={this.continueCheckout}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.price}
                            {...props} />
                    )}
                />
            </div>
        );
    }
}

export default Checkout;