import React from 'react';

import classes from './Input.css';

function getInputElement(props) {
    switch (props.elementType) {
        case ('input'):
            return <input className={classes.InputElement} {...props.elementConfig} value={props.value} />;
        case ('textarea'):
            return <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} />;
        case ('select'):
            return <select className={classes.InputElement} {...props.elementConfig} value={props.value} />;
        default:
            throw new Error('unknow input type' + props.inputType);
    }
}

const input = (props) => {
    return (
        <div className={classes.Input}>
            <label className={classes.Label} style={{textTransform: 'capitalize'}}></label>
            {getInputElement(props)}
        </div>
    );
};

export default input;