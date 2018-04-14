import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                <form>
                    <label htmlFor="name">Name:</label>
                    <input id="name" type="text" name="name" placeholder="Billy"/>

                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" name="email" placeholder="billy@bill.bill"/>

                    <label htmlFor="street">Street:</label>
                    <input id="street" type="text" name="street" placeholder="817 Bill ave"/>

                    <label htmlFor="postal">Postal:</label>
                    <input id="postal" type="text" name="postal" placeholder="36509"/>
                </form>
                <Button buttonType="Success">ORDER</Button>
            </div>
        );
    }
}

export default ContactData;