import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientsSummary =
        Object.entries(props.ingredients)
            .map(entry =>
                <li key={entry[0]}>
                    <span style={{textTransform: 'capitalize'}}>{entry[0]}</span>: {entry[1]}
                </li>
            );

    return (
        <Aux>
            <h3>Your Order:</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button buttonType='Danger' onClick={props.cancel}>CANCEL</Button>
            <Button buttonType='Success' onClick={props.purchase}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;