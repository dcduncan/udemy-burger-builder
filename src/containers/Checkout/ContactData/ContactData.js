import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends Component {

    createInputObject(elementType, type, placeholder, rules) {
        return {
            elementType: elementType,
            elementConfig: {
                type: type,
                placeholder: placeholder
            },
            value: '',
            validation: {
                rules: rules
            },
            valid: false,
            touched: false
        }
    }

    state = {
        orderForm: {
            name: this.createInputObject('input', 'text', 'Name', { required: true, minLength: 3 }),
            email: this.createInputObject('input', 'email', 'Email', { required: true, minLength: 4 } ),
            street: this.createInputObject('input', 'text', 'Street', { required: true, minLength: 4 } ),
            postalCode: this.createInputObject('input', 'text', 'Zip Code', { required: true, minLength: 5, maxLength:10 }),
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: '',
                validation: {
                    rules: {}
                },
                valid: true
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = Object.entries(this.state.orderForm)
            .reduce((acc, entry) => {
                const [key, value] = entry;
                acc[key] = value.value;
                return acc;
            }, {});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    checkValidity(element, rules) {
        const value = element.value ? element.value.trim() : '';
        if (rules.required && value === '') {
            return false;
        }

        if (rules.minLength && value.length < rules.minLength) {
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return false;
        }

        return true;
    }

    inputChangeHandler = (event, key) => {
        const updatedForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedForm[key]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement, updatedFormElement.validation.rules);
        updatedFormElement.touched = true;
        updatedForm[key] = updatedFormElement;
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
                        valid={value.valid}
                        elementType={value.elementType}
                        elementConfig={value.elementConfig}
                        value={value.value}
                        touched={value.touched}
                        onChange={(event) => this.inputChangeHandler(event, key)}/>
                });
            return (
                <form onSubmit={this.orderHandler}>
                    {inputs}
                    <Button buttonType="Success">ORDER</Button>
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