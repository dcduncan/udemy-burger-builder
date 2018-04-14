import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {

    state = {
        ingredients: null
    };

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let entry of query) {
            ingredients[entry[0]] = +entry[1];
        }
        this.setState({
            ingredients: ingredients
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
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;