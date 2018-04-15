import React from 'react';

import classes from './Button.css';

const button = (props) => (
    <button
        className={[classes.Button, classes[props.buttonType]].join(' ')}
        disabled={props.disabled}
        onClick={props.onClick}>
        {props.children}
    </button>
);

export default button;