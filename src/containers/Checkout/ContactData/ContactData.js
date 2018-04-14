import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: 'Billy',
        email: 'billy@bill.bill',
        address: {
            street: '817 Bill ave',
            postalCode: '36509'
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then((response) => console.log(response))
            .catch((error) => console.log(error))
            .finally(() => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            });
    };

    getFormOrSpinner = () => {
        if (this.state.loading) {
            return <Spinner/>
        } else {
            return (
                <form>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" name="name" placeholder="Billy"/>

                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" placeholder="billy@bill.bill"/>

                    <label htmlFor="street">Street:</label>
                    <input id="street" type="text" name="street" placeholder="817 Bill ave"/>

                    <label htmlFor="postal">Postal:</label>
                    <input id="postal" type="text" name="postal" placeholder="36509"/>

                    <Button buttonType="Success" onClick={this.orderHandler}>ORDER</Button>
                </form>
            );
        }
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {this.getFormOrSpinner()}
            </div>
        );
    }
}

export default ContactData;