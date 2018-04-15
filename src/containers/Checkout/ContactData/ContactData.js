import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component {

    createInputObject(elementType, type, placeholder, value) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: value
        }
    }

    state = {
        orderForm: {
            name: this.createInputObject('input', 'text', 'Name', ''),
            email: this.createInputObject('input', 'email', 'Email', ''),
            street: this.createInputObject('input', 'text', 'Street', ''),
            postalCode: this.createInputObject('input', 'text', 'Zip Code', ''),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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

    inputChangeHandler = (event, key) => {
        const updatedForm = {...this.state.orderForm};
        const updatedValue = {...updatedForm[key]};
        updatedValue.value = event.target.value;
        updatedForm[key] = updatedValue;
        this.setState({
            orderForm: updatedForm
        });
    };

    getFormOrSpinner = () => {
        if (this.state.loading) {
            return <Spinner/>
        } else {
            const inputs = Object.entries(this.state.orderForm)
                .map((entry) => {
                    const [key, value] = entry;
                    return <Input
                        key={key}
                        elementType={value.elementType}
                        elementConfig={value.elementConfig}
                        value={value.value}
                        onChange={(event) => this.inputChangeHandler(event, key)}/>
                });
            return (
                <form>
                    {inputs}
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