import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Should taste okay</h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                buttonType="Danger"
                onClick={props.cancelCheckout}>
                CANCEL
            </Button>
            <Button
                buttonType="Success"
                onClick={props.continueCheckout}>
                CONTINUE
            </Button>
        </div>
    );
};

export default checkoutSummary;