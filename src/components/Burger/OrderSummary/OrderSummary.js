import React from 'react';
import Aux from '../../../hoc/Aux';

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
            <p>Continue to Checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    );
};

export default orderSummary;