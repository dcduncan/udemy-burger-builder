import React from 'react';

import classes from './Input.css';

function getInputElement(props) {
    switch (props.inputType) {
        case ('input'):
            return <input className={classes.InputElement} {...props.inputAttributes} />;
        case ('textarea'):
            return <textarea className={classes.InputElement} {...props.inputAttributes}/>;
        default:
            throw new Error('unknow input type' + props.inputType);
    }
}

const input = (props) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Label} htmlFor={props.inputAttributes.id} style={{textTransform: 'capitalize'}}></label>
            {getInputElement(props)}
        </div>
    );
};

export default input;