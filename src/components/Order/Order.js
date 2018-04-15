import React from 'react';

import classes from './Order.css';

const order = (props) => {

    const ingredients =
        Object.entries(props.ingredients)
            .map((entry) =>
                entry[1] === 0
                    ? null
                    : <span
                        key={entry[0]}
                        style={{
                            textTransform: 'capitalize',
                            display: 'inline-block',
                            margin: '0 8px',
                            border: '1px solid #ccc',
                            padding: '5px'
                        }}>
                        {entry[0]} ({entry[1]})
                    </span>
            );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default order;